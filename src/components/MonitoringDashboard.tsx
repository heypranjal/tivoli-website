/**
 * Monitoring Dashboard - Real-time API and system monitoring interface
 * Features: Live metrics, throttling alerts, error logs, performance charts
 * File size: ~290 lines | Clean responsive UI with minimal dependencies
 */

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Zap,
  BarChart3,
  Settings,
  Trash2,
  Play,
  Pause,
  FileText,
  RotateCcw
} from 'lucide-react';
import { useMonitoringStore } from '@/hooks/useMonitoringStore';
import { useApiInterceptor, installAllInterceptors } from '@/hooks/useApiInterceptor';
import { startNewSession } from '@/hooks/useMonitoringStore';
import { useSystemMonitor } from '@/hooks/useSystemMonitor';
import LogViewer from './LogViewer';

const MonitoringDashboard: React.FC = () => {
  const {
    apiHits,
    systemMetrics,
    throttleEvents,
    errors,
    isRecording,
    startRecording,
    stopRecording,
    getAnalytics,
    clearData,
    clearOldData,
    getCurrentSessionStats,
    startNewSession
  } = useMonitoringStore();

  const [showDetails, setShowDetails] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'api' | 'errors' | 'throttle'>('overview');
  const [showLogViewer, setShowLogViewer] = useState(false);

  // System monitoring
  const { systemStatus, isMonitoring } = useSystemMonitor();
  
  // Install interceptors on mount
  useApiInterceptor();
  
  useEffect(() => {
    const cleanup = installAllInterceptors();
    
    // Start fresh session when dashboard opens
    startNewSession();
    
    return cleanup;
  }, []);

  const analytics = getAnalytics();
  const sessionStats = getCurrentSessionStats(); // Current session only

  // Status indicator component
  const StatusIndicator: React.FC<{ status: 'healthy' | 'degraded' | 'down' }> = ({ status }) => {
    const statusConfig = {
      healthy: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
      degraded: { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-100' },
      down: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100' }
    };

    const { icon: Icon, color, bg } = statusConfig[status];

    return (
      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${bg}`}>
        <Icon className={`w-4 h-4 ${color}`} />
        <span className={`text-sm font-medium ${color} capitalize`}>{status}</span>
      </div>
    );
  };

  // Metric card component
  const MetricCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: React.ElementType;
    color?: string;
    trend?: 'up' | 'down' | 'stable';
    subtitle?: string;
  }> = ({ title, value, icon: Icon, color = 'text-blue-500', trend, subtitle }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      {trend && (
        <div className="mt-2">
          <span className={`text-xs ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→'} Trend
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Floating monitor button */}
      {!showDetails && (
        <button
          onClick={() => {
            setShowDetails(true);
            // Start new session when opening dashboard
            startNewSession();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Open Monitoring Dashboard"
        >
          <Activity className="w-6 h-6" />
        </button>
      )}

      {/* Full dashboard */}
      {showDetails && (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-[800px] max-h-[600px] overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">System Monitor</h3>
              <StatusIndicator status={systemStatus.server.status === 'healthy' ? 'healthy' : systemStatus.server.status === 'down' ? 'down' : 'degraded'} />
              {isMonitoring && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full animate-pulse">
                  Live
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium ${
                  isRecording 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isRecording ? 'Stop' : 'Start'}</span>
              </button>
              <button
                onClick={() => setShowLogViewer(true)}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                title="View system logs"
              >
                <FileText className="w-4 h-4" />
              </button>
              <button
                onClick={startNewSession}
                className="flex items-center space-x-1 px-3 py-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded text-sm"
                title="Start new monitoring session"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Session</span>
              </button>
              <button
                onClick={clearData}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                title="Clear all data"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex border-b border-gray-200">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'api', label: 'API Hits', icon: Zap },
              { key: 'errors', label: 'Errors', icon: AlertTriangle },
              { key: 'throttle', label: 'Throttling', icon: Clock }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedTab(key as any)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === key
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {key === 'errors' && errors.length > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                    {errors.length}
                  </span>
                )}
                {key === 'throttle' && throttleEvents.length > 0 && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                    {throttleEvents.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-4 max-h-[400px] overflow-y-auto">
            {selectedTab === 'overview' && (
              <div className="space-y-4">
                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard
                    title="Server Status"
                    value={systemStatus.server.isOnline ? 'Online' : 'Offline'}
                    icon={systemStatus.server.isOnline ? CheckCircle : XCircle}
                    color={systemStatus.server.isOnline ? "text-green-500" : "text-red-500"}
                  />
                  <MetricCard
                    title="Response Time"
                    value={`${systemStatus.server.responseTime}ms`}
                    icon={Clock}
                    color="text-blue-500"
                  />
                  <MetricCard
                    title="Memory Usage"
                    value={`${systemStatus.memory.percentage}%`}
                    icon={Activity}
                    color={systemStatus.memory.percentage > 80 ? "text-red-500" : "text-green-500"}
                  />
                  <MetricCard
                    title="Session API Hits"
                    value={sessionStats.sessionApiHits}
                    icon={Zap}
                    color={sessionStats.sessionApiHits > 50 ? "text-red-500" : "text-green-500"}
                    subtitle={`Since session start (${Math.round(sessionStats.sessionDuration / 1000)}s ago)`}
                  />
                </div>

                {/* Session info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      🎯 Current Session: {sessionStats.sessionApiHits} API calls
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Session ID: {sessionStats.sessionId.split('-')[1]} • Duration: {Math.round(sessionStats.sessionDuration / 1000)}s • 
                    Started: {new Date(sessionStats.sessionStartTime).toLocaleTimeString()}
                  </p>
                </div>

                {/* Performance status */}
                {sessionStats.sessionApiHits <= 20 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        ✅ Excellent Performance!
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Low API usage indicates efficient React Query caching and optimized data fetching.
                    </p>
                  </div>
                )}

                {/* Top endpoints */}
                {analytics.topEndpoints.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Top Endpoints</h4>
                    <div className="space-y-1">
                      {analytics.topEndpoints.slice(0, 5).map((endpoint, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600 truncate">{endpoint.endpoint}</span>
                          <span className="text-gray-900 font-medium">{endpoint.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'api' && (
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  Showing last {Math.min(apiHits.length, 100)} API requests
                </div>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {apiHits.slice(-100).reverse().map((hit) => (
                    <div key={hit.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded font-medium ${
                          hit.status ? (hit.status < 400 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')
                          : 'bg-gray-100 text-gray-800'
                        }`}>
                          {hit.method}
                        </span>
                        <span className="text-gray-600 truncate max-w-md">{hit.url}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {hit.duration && <span className="text-gray-500">{hit.duration}ms</span>}
                        <span className="text-gray-400">{new Date(hit.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'errors' && (
              <div className="space-y-2">
                {errors.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                    <p>No errors detected</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {errors.slice(-50).reverse().map((error, index) => (
                      <div key={index} className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                        {error}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'throttle' && (
              <div className="space-y-2">
                {throttleEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Zap className="w-12 h-12 mx-auto mb-2 text-green-500" />
                    <p>No throttling detected</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {throttleEvents.slice(-20).reverse().map((event, index) => (
                      <div key={index} className={`p-3 rounded border ${
                        event.action === 'blocked' ? 'bg-red-50 border-red-200' :
                        event.action === 'throttled' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium">{event.endpoint}</p>
                            <p className="text-xs text-gray-600">
                              {event.hitCount} hits in {event.timeWindow/1000}s
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            event.action === 'blocked' ? 'bg-red-100 text-red-800' :
                            event.action === 'throttled' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {event.action}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Log Viewer Modal */}
      <LogViewer
        isVisible={showLogViewer}
        onClose={() => setShowLogViewer(false)}
      />
    </div>
  );
};

export default MonitoringDashboard;