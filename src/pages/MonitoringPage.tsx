/**
 * Dedicated Monitoring Page - System Performance and API Monitoring
 * Accessible via /monitoring route - separate from main website
 */

import React, { useEffect } from 'react';
import { Activity, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import MonitoringDashboard from '@/components/MonitoringDashboard';
import { useMonitoringStore } from '@/hooks/useMonitoringStore';
import { useApiInterceptor, installAllInterceptors } from '@/hooks/useApiInterceptor';
import { useSystemMonitor } from '@/hooks/useSystemMonitor';

const MonitoringPage: React.FC = () => {
  const { startNewSession } = useMonitoringStore();
  const { systemStatus, isMonitoring } = useSystemMonitor();
  
  // Install interceptors for this page
  useApiInterceptor();
  
  useEffect(() => {
    const cleanup = installAllInterceptors();
    
    // Auto-start fresh session when accessing monitoring page
    startNewSession();
    
    return cleanup;
  }, [startNewSession]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Activity className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
                <p className="text-sm text-gray-500">Real-time API and performance monitoring</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Status indicator */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  systemStatus.server.isOnline ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-gray-600">
                  {systemStatus.server.isOnline ? 'System Online' : 'System Offline'}
                </span>
                {isMonitoring && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full animate-pulse ml-2">
                    Live Monitoring
                  </span>
                )}
              </div>
              
              {/* Navigation */}
              <Link 
                to="/" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Back to Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">API Monitoring</h3>
                <p className="text-sm text-gray-600">Track database calls and performance</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className={`w-6 h-6 rounded-full ${
                  systemStatus.server.isOnline ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Server Status</h3>
                <p className="text-sm text-gray-600">
                  {systemStatus.server.isOnline ? 'All systems operational' : 'System issues detected'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-purple-600">{systemStatus.memory.percentage}%</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Memory Usage</h3>
                <p className="text-sm text-gray-600">Browser memory consumption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📊 How to Use This Monitoring System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">API Monitoring:</h4>
              <ul className="space-y-1">
                <li>• Tracks only real Supabase database calls</li>
                <li>• Click "New Session" for fresh counting</li>
                <li>• Excludes images, fonts, and static assets</li>
                <li>• Shows session-based metrics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Performance Monitoring:</h4>
              <ul className="space-y-1">
                <li>• Real-time server health checks</li>
                <li>• Memory usage tracking</li>
                <li>• Error detection and logging</li>
                <li>• Network connectivity monitoring</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Monitoring Dashboard */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Live Monitoring Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1">Real-time system performance and API tracking</p>
          </div>
          
          {/* Full monitoring dashboard without floating UI */}
          <div className="relative">
            <MonitoringDashboard embedded={true} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Monitoring system optimized for accurate API tracking • Session-based counting • Real-time updates</p>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;