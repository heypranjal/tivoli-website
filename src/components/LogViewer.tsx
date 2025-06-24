/**
 * Log Viewer Component - Real-time system log display and analysis
 * Features: Auto-refresh, filtering, export, crash detection
 * File size: ~250 lines | Focused on log parsing and display
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download, 
  RefreshCw, 
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2
} from 'lucide-react';

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source?: string;
  raw: string;
}

interface LogViewerProps {
  isVisible: boolean;
  onClose: () => void;
}

const LogViewer: React.FC<LogViewerProps> = ({ isVisible, onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'error' | 'warn' | 'info'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Parse log line into structured format
  const parseLogLine = (line: string): LogEntry | null => {
    // Try to extract timestamp and message from various log formats
    const patterns = [
      // Format: "Tue Jun 24 17:10:30 IST 2025: message"
      /^(\w{3}\s+\w{3}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}\s+\w+\s+\d{4}):\s*(.+)$/,
      // Format: "[2025-06-24T17:10:30.000Z] message"
      /^\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)\]\s*(.+)$/,
      // Format: "2025-06-24 17:10:30 message"
      /^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\s+(.+)$/
    ];

    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        const [, timestamp, message] = match;
        
        // Determine log level
        let level: LogEntry['level'] = 'info';
        if (message.includes('❌') || message.includes('ERROR') || message.includes('FAILED') || message.includes('💥')) {
          level = 'error';
        } else if (message.includes('⚠️') || message.includes('WARNING') || message.includes('🚨')) {
          level = 'warn';
        } else if (message.includes('DEBUG')) {
          level = 'debug';
        }

        return {
          timestamp,
          level,
          message: message.trim(),
          raw: line
        };
      }
    }

    // Fallback for unparseable lines
    return {
      timestamp: new Date().toISOString(),
      level: 'info',
      message: line,
      raw: line
    };
  };

  // Load logs from monitoring store and external sources
  const loadLogs = async () => {
    setIsLoading(true);
    const newLogs: LogEntry[] = [];

    try {
      // Get logs from monitoring store
      const monitoringStore = await import('@/hooks/useMonitoringStore');
      const state = monitoringStore.default.getState();
      
      // Add monitoring errors as log entries
      state.errors.forEach(error => {
        const parsed = parseLogLine(error);
        if (parsed) {
          parsed.source = 'monitoring';
          newLogs.push(parsed);
        }
      });

      // Try to fetch server logs if available
      try {
        const response = await fetch('/api/logs').catch(() => null);
        if (response?.ok) {
          const serverLogs = await response.text();
          serverLogs.split('\n').forEach(line => {
            if (line.trim()) {
              const parsed = parseLogLine(line);
              if (parsed) {
                parsed.source = 'server';
                newLogs.push(parsed);
              }
            }
          });
        }
      } catch (e) {
        // Server logs not available
      }

      // Sort by timestamp
      newLogs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      setLogs(newLogs);
    } catch (error) {
      console.error('Failed to load logs:', error);
    }

    setIsLoading(false);
  };

  // Filter logs based on level and search term
  useEffect(() => {
    let filtered = logs;

    if (filter !== 'all') {
      filtered = filtered.filter(log => log.level === filter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(term) ||
        log.timestamp.toLowerCase().includes(term)
      );
    }

    setFilteredLogs(filtered);
  }, [logs, filter, searchTerm]);

  // Auto-refresh logs
  useEffect(() => {
    if (!isAutoRefresh || !isVisible) return;

    const interval = setInterval(loadLogs, 3000); // Refresh every 3 seconds
    return () => clearInterval(interval);
  }, [isAutoRefresh, isVisible]);

  // Load logs on mount
  useEffect(() => {
    if (isVisible) {
      loadLogs();
    }
  }, [isVisible]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredLogs]);

  // Export logs
  const exportLogs = () => {
    const logText = filteredLogs.map(log => 
      `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${new Date().toISOString().slice(0, 19)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get level icon and color
  const getLevelIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return { icon: AlertCircle, color: 'text-red-500' };
      case 'warn': return { icon: AlertCircle, color: 'text-yellow-500' };
      case 'info': return { icon: CheckCircle, color: 'text-blue-500' };
      case 'debug': return { icon: Clock, color: 'text-gray-500' };
      default: return { icon: CheckCircle, color: 'text-gray-500' };
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">System Logs</h2>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {filteredLogs.length} entries
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${
                isAutoRefresh 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isAutoRefresh ? 'animate-spin' : ''}`} />
              <span>Auto</span>
            </button>
            
            <button
              onClick={loadLogs}
              disabled={isLoading}
              className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-50"
              title="Refresh logs"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={exportLogs}
              className="p-2 text-gray-500 hover:text-green-600"
              title="Export logs"
            >
              <Download className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setLogs([])}
              className="p-2 text-gray-500 hover:text-red-600"
              title="Clear logs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="all">All Levels</option>
                <option value="error">Errors Only</option>
                <option value="warn">Warnings Only</option>
                <option value="info">Info Only</option>
              </select>
            </div>
            
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm flex-1 max-w-md"
            />
          </div>
        </div>

        {/* Logs display */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900 text-gray-100 font-mono text-sm">
          {filteredLogs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {isLoading ? 'Loading logs...' : 'No logs to display'}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredLogs.map((log, index) => {
                const { icon: Icon, color } = getLevelIcon(log.level);
                return (
                  <div key={index} className="flex items-start space-x-2 hover:bg-gray-800 px-2 py-1 rounded">
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
                    <span className="text-gray-400 text-xs w-20 flex-shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                      log.level === 'error' ? 'bg-red-900 text-red-200' :
                      log.level === 'warn' ? 'bg-yellow-900 text-yellow-200' :
                      log.level === 'info' ? 'bg-blue-900 text-blue-200' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="flex-1 break-words">{log.message}</span>
                    {log.source && (
                      <span className="text-xs text-gray-500 flex-shrink-0">[{log.source}]</span>
                    )}
                  </div>
                );
              })}
              <div ref={logsEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogViewer;