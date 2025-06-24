/**
 * System Monitor Hook - Server health and system-level monitoring
 * Features: Server ping, memory tracking, crash detection, log parsing
 * File size: ~280 lines | Robust monitoring with auto-recovery detection
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { addError } from './useMonitoringStore';
import monitoringStore from './useMonitoringStore';

interface ServerHealth {
  isOnline: boolean;
  responseTime: number;
  lastChecked: number;
  consecutiveFailures: number;
  status: 'healthy' | 'degraded' | 'down' | 'recovering';
}

interface SystemStatus {
  server: ServerHealth;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  performance: {
    navigation: number;
    domContentLoaded: number;
    loadComplete: number;
  };
  connectivity: {
    type: string;
    downlink: number;
    rtt: number;
  };
}

const SERVER_CHECK_INTERVAL = 30000; // 30 seconds - reduced monitoring overhead
const MAX_CONSECUTIVE_FAILURES = 3;
const HEALTH_CHECK_TIMEOUT = 3000; // 3 seconds

export function useSystemMonitor() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    server: {
      isOnline: true,
      responseTime: 0,
      lastChecked: Date.now(),
      consecutiveFailures: 0,
      status: 'healthy'
    },
    memory: { used: 0, total: 0, percentage: 0 },
    performance: { navigation: 0, domContentLoaded: 0, loadComplete: 0 },
    connectivity: { type: 'unknown', downlink: 0, rtt: 0 }
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastServerCheck = useRef(Date.now());

  // Server health check
  const checkServerHealth = useCallback(async (): Promise<ServerHealth> => {
    const startTime = Date.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), HEALTH_CHECK_TIMEOUT);

      const response = await fetch('http://localhost:5173/api/health', {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-cache'
      }).catch(() => {
        // Fallback to main page if health endpoint doesn't exist
        return fetch('http://localhost:5173/', {
          method: 'HEAD',
          signal: controller.signal,
          cache: 'no-cache'
        });
      });

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;

      const isOnline = response.ok;
      const currentFailures = isOnline ? 0 : systemStatus.server.consecutiveFailures + 1;

      return {
        isOnline,
        responseTime,
        lastChecked: Date.now(),
        consecutiveFailures: currentFailures,
        status: determineServerStatus(isOnline, currentFailures, responseTime)
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      const currentFailures = systemStatus.server.consecutiveFailures + 1;

      // Log server connectivity issues
      addError(`Server health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);

      return {
        isOnline: false,
        responseTime,
        lastChecked: Date.now(),
        consecutiveFailures: currentFailures,
        status: determineServerStatus(false, currentFailures, responseTime)
      };
    }
  }, [systemStatus.server.consecutiveFailures]);

  // Determine server status based on health metrics
  const determineServerStatus = (
    isOnline: boolean, 
    failures: number, 
    responseTime: number
  ): 'healthy' | 'degraded' | 'down' | 'recovering' => {
    if (!isOnline && failures >= MAX_CONSECUTIVE_FAILURES) return 'down';
    if (!isOnline) return 'degraded';
    if (failures > 0 && isOnline) return 'recovering';
    if (responseTime > 2000) return 'degraded';
    return 'healthy';
  };

  // Collect memory metrics
  const collectMemoryMetrics = useCallback(() => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return { used: 0, total: 0, percentage: 0 };
    }

    const performance = window.performance as any;
    const memory = performance.memory;

    if (!memory) {
      return { used: 0, total: 0, percentage: 0 };
    }

    const used = memory.usedJSHeapSize;
    const total = memory.totalJSHeapSize;
    const percentage = total > 0 ? Math.round((used / total) * 100) : 0;

    // Alert on high memory usage
    if (percentage > 80) {
      addError(`High memory usage detected: ${percentage}% (${Math.round(used / 1024 / 1024)}MB)`);
    }

    return { used, total, percentage };
  }, []);

  // Collect performance metrics
  const collectPerformanceMetrics = useCallback(() => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return { navigation: 0, domContentLoaded: 0, loadComplete: 0 };
    }

    const timing = window.performance.timing;
    const navigation = timing.navigationStart;

    return {
      navigation: navigation,
      domContentLoaded: timing.domContentLoadedEventEnd - navigation,
      loadComplete: timing.loadEventEnd - navigation
    };
  }, []);

  // Collect connectivity information
  const collectConnectivityMetrics = useCallback(() => {
    if (typeof window === 'undefined' || !('navigator' in window)) {
      return { type: 'unknown', downlink: 0, rtt: 0 };
    }

    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;

    if (!connection) {
      return { type: 'unknown', downlink: 0, rtt: 0 };
    }

    return {
      type: connection.effectiveType || 'unknown',
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0
    };
  }, []);

  // Main monitoring cycle
  const runMonitoringCycle = useCallback(async () => {
    const serverHealth = await checkServerHealth();
    const memory = collectMemoryMetrics();
    const performance = collectPerformanceMetrics();
    const connectivity = collectConnectivityMetrics();

    const newStatus: SystemStatus = {
      server: serverHealth,
      memory,
      performance,
      connectivity
    };

    setSystemStatus(newStatus);

    // Update monitoring store with system metrics
    monitoringStore.addSystemMetric({
      memory: memory.used,
      requests: 0, // Will be updated by API interceptor
      errors: 0, // Will be updated by error tracking
      serverStatus: serverHealth.status === 'healthy' ? 'healthy' : 
                   serverHealth.status === 'down' ? 'down' : 'degraded'
    });

    // Log status changes
    if (serverHealth.status !== systemStatus.server.status) {
      const message = `Server status changed: ${systemStatus.server.status} → ${serverHealth.status}`;
      if (serverHealth.status === 'down') {
        addError(`🚨 ${message}`);
      } else if (serverHealth.status === 'recovering') {
        addError(`🔄 ${message}`);
      } else if (serverHealth.status === 'healthy') {
        addError(`✅ ${message}`);
      }
    }

    lastServerCheck.current = Date.now();
  }, [checkServerHealth, collectMemoryMetrics, collectPerformanceMetrics, collectConnectivityMetrics, systemStatus.server.status]);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    if (isMonitoring) return;

    setIsMonitoring(true);
    
    // Initial check
    runMonitoringCycle();

    // Set up interval
    intervalRef.current = setInterval(runMonitoringCycle, SERVER_CHECK_INTERVAL);

    addError('🎯 System monitoring started');
  }, [isMonitoring, runMonitoringCycle]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    if (!isMonitoring) return;

    setIsMonitoring(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    addError('🛑 System monitoring stopped');
  }, [isMonitoring]);

  // Auto-start monitoring when hook is used
  useEffect(() => {
    startMonitoring();
    
    return () => {
      stopMonitoring();
    };
  }, [startMonitoring, stopMonitoring]);

  // Network status detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      addError('🌐 Network connection restored');
      // Trigger immediate health check
      runMonitoringCycle();
    };

    const handleOffline = () => {
      addError('🚫 Network connection lost');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [runMonitoringCycle]);

  // Visibility change detection (tab switching)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      if (!document.hidden && isMonitoring) {
        // Tab became visible, run immediate check
        runMonitoringCycle();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMonitoring, runMonitoringCycle]);

  return {
    systemStatus,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    lastCheck: lastServerCheck.current,
    forceCheck: runMonitoringCycle
  };
}