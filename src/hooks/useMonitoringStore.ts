/**
 * Monitoring Store Hook - Central state management for API tracking and system monitoring
 * Features: API hit tracking, throttling detection, error logging, performance metrics
 * File size: ~280 lines | Simple query structure with in-memory storage
 */

import { useState, useCallback, useEffect, useRef } from 'react';

// Core monitoring interfaces
export interface ApiHit {
  id: string;
  timestamp: number;
  url: string;
  method: string;
  status?: number;
  duration?: number;
  error?: string;
  source: 'supabase' | 'external' | 'internal';
}

export interface SystemMetric {
  timestamp: number;
  memory: number;
  cpu?: number;
  requests: number;
  errors: number;
  serverStatus: 'healthy' | 'degraded' | 'down';
}

export interface ThrottleEvent {
  timestamp: number;
  endpoint: string;
  hitCount: number;
  timeWindow: number;
  action: 'warning' | 'throttled' | 'blocked';
}

export interface MonitoringState {
  apiHits: ApiHit[];
  systemMetrics: SystemMetric[];
  throttleEvents: ThrottleEvent[];
  errors: string[];
  isRecording: boolean;
  startTime: number;
  sessionId: string;
  sessionStartTime: number;
}

// Configuration constants
const MAX_API_HITS = 1000; // Keep last 1000 API hits
const MAX_SYSTEM_METRICS = 500; // Keep last 500 system snapshots
const MAX_ERRORS = 200; // Keep last 200 errors
const THROTTLE_WINDOW = 60000; // 1 minute window
const THROTTLE_LIMIT = 100; // Max 100 requests per minute per endpoint

class MonitoringStore {
  private state: MonitoringState = {
    apiHits: [],
    systemMetrics: [],
    throttleEvents: [],
    errors: [],
    isRecording: false,
    startTime: 0,
    sessionId: this.generateSessionId(),
    sessionStartTime: Date.now()
  };

  private listeners: Set<() => void> = new Set();
  private intervalId: NodeJS.Timeout | null = null;

  // Generate unique session ID
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // State management
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): MonitoringState {
    return { ...this.state };
  }

  private emit() {
    this.listeners.forEach(listener => listener());
  }

  // API Hit tracking
  addApiHit(hit: Omit<ApiHit, 'id' | 'timestamp'>): string {
    const apiHit: ApiHit = {
      ...hit,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    this.state.apiHits.push(apiHit);
    
    // Keep only recent hits
    if (this.state.apiHits.length > MAX_API_HITS) {
      this.state.apiHits = this.state.apiHits.slice(-MAX_API_HITS);
    }

    // Check for throttling
    this.checkThrottling(hit.url);
    this.emit();
    
    return apiHit.id;
  }

  // Update existing API hit with response details
  updateApiHit(id: string, updates: Partial<Pick<ApiHit, 'status' | 'duration' | 'error'>>) {
    const hitIndex = this.state.apiHits.findIndex(hit => hit.id === id);
    if (hitIndex !== -1) {
      Object.assign(this.state.apiHits[hitIndex], updates);
      this.emit();
    }
  }

  // Throttling detection
  private checkThrottling(url: string) {
    const now = Date.now();
    const windowStart = now - THROTTLE_WINDOW;
    
    // Count recent hits to this endpoint
    const recentHits = this.state.apiHits.filter(hit => 
      hit.url === url && hit.timestamp > windowStart
    ).length;

    if (recentHits >= THROTTLE_LIMIT) {
      const throttleEvent: ThrottleEvent = {
        timestamp: now,
        endpoint: url,
        hitCount: recentHits,
        timeWindow: THROTTLE_WINDOW,
        action: recentHits > THROTTLE_LIMIT * 1.5 ? 'blocked' : 'throttled'
      };

      this.state.throttleEvents.push(throttleEvent);
      this.addError(`Throttling detected: ${recentHits} hits to ${url} in ${THROTTLE_WINDOW/1000}s`);
    }
  }

  // System metrics
  addSystemMetric(metric: Omit<SystemMetric, 'timestamp'>) {
    const systemMetric: SystemMetric = {
      ...metric,
      timestamp: Date.now()
    };

    this.state.systemMetrics.push(systemMetric);
    
    if (this.state.systemMetrics.length > MAX_SYSTEM_METRICS) {
      this.state.systemMetrics = this.state.systemMetrics.slice(-MAX_SYSTEM_METRICS);
    }

    this.emit();
  }

  // Error logging
  addError(error: string) {
    const errorEntry = `[${new Date().toISOString()}] ${error}`;
    this.state.errors.push(errorEntry);
    
    if (this.state.errors.length > MAX_ERRORS) {
      this.state.errors = this.state.errors.slice(-MAX_ERRORS);
    }

    this.emit();
  }

  // Recording control
  startRecording() {
    this.state.isRecording = true;
    this.state.startTime = Date.now();
    
    // Start system monitoring
    this.intervalId = setInterval(() => {
      this.collectSystemMetrics();
    }, 5000); // Every 5 seconds

    this.emit();
  }

  stopRecording() {
    this.state.isRecording = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.emit();
  }

  // System metrics collection
  private collectSystemMetrics() {
    // Collect browser performance metrics
    if (typeof window !== 'undefined' && 'performance' in window) {
      const performance = window.performance as any;
      const memory = performance.memory;
      
      const recentErrors = this.state.errors.filter(
        error => Date.now() - new Date(error.split(']')[0].slice(1)).getTime() < 60000
      ).length;

      const recentApiHits = this.state.apiHits.filter(
        hit => Date.now() - hit.timestamp < 60000
      ).length;

      this.addSystemMetric({
        memory: memory ? memory.usedJSHeapSize : 0,
        requests: recentApiHits,
        errors: recentErrors,
        serverStatus: this.determineServerStatus(recentErrors, recentApiHits)
      });
    }
  }

  private determineServerStatus(errors: number, requests: number): 'healthy' | 'degraded' | 'down' {
    if (errors > 10) return 'down';
    if (errors > 5 || requests > 200) return 'degraded';
    return 'healthy';
  }

  // Analytics
  getAnalytics() {
    const now = Date.now();
    const lastHour = now - 3600000;
    const lastMinute = now - 60000;

    return {
      totalApiHits: this.state.apiHits.length,
      hitsLastHour: this.state.apiHits.filter(hit => hit.timestamp > lastHour).length,
      hitsLastMinute: this.state.apiHits.filter(hit => hit.timestamp > lastMinute).length,
      errorCount: this.state.errors.length,
      throttleEvents: this.state.throttleEvents.length,
      averageResponseTime: this.calculateAverageResponseTime(),
      topEndpoints: this.getTopEndpoints(),
      currentStatus: this.getCurrentStatus()
    };
  }

  private calculateAverageResponseTime(): number {
    const hitsWithDuration = this.state.apiHits.filter(hit => hit.duration);
    if (hitsWithDuration.length === 0) return 0;
    
    const total = hitsWithDuration.reduce((sum, hit) => sum + (hit.duration || 0), 0);
    return Math.round(total / hitsWithDuration.length);
  }

  private getTopEndpoints(): Array<{ endpoint: string; count: number }> {
    const counts: Record<string, number> = {};
    
    this.state.apiHits.forEach(hit => {
      const endpoint = new URL(hit.url).pathname;
      counts[endpoint] = (counts[endpoint] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([endpoint, count]) => ({ endpoint, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private getCurrentStatus(): 'healthy' | 'degraded' | 'down' {
    const latest = this.state.systemMetrics[this.state.systemMetrics.length - 1];
    return latest?.serverStatus || 'healthy';
  }

  // Clear data
  clearData() {
    this.state.apiHits = [];
    this.state.systemMetrics = [];
    this.state.throttleEvents = [];
    this.state.errors = [];
    this.state.startTime = Date.now(); // Reset session start time
    this.emit();
  }

  // Start new session - clears all data and creates fresh session ID
  startNewSession() {
    this.state.apiHits = [];
    this.state.systemMetrics = [];
    this.state.throttleEvents = [];
    this.state.errors = [];
    this.state.sessionId = this.generateSessionId();
    this.state.sessionStartTime = Date.now();
    this.state.startTime = Date.now();
    this.emit();
  }

  // Clear only old data (older than X minutes) to keep recent session data
  clearOldData(minutesThreshold: number = 10) {
    const cutoffTime = Date.now() - (minutesThreshold * 60 * 1000);
    
    this.state.apiHits = this.state.apiHits.filter(hit => hit.timestamp > cutoffTime);
    this.state.systemMetrics = this.state.systemMetrics.filter(metric => metric.timestamp > cutoffTime);
    this.state.throttleEvents = this.state.throttleEvents.filter(event => event.timestamp > cutoffTime);
    
    // Keep recent errors (last 50 instead of all)
    this.state.errors = this.state.errors.slice(-50);
    
    this.emit();
  }

  // Get current session stats (since session started)
  getCurrentSessionStats() {
    // Only count hits since current session started
    const sessionHits = this.state.apiHits.filter(hit => hit.timestamp >= this.state.sessionStartTime);
    const sessionErrors = this.state.errors.filter(error => {
      try {
        const errorTime = new Date(error.split(']')[0].slice(1)).getTime();
        return errorTime >= this.state.sessionStartTime;
      } catch {
        return true; // Include errors without timestamps
      }
    });
    
    return {
      sessionApiHits: sessionHits.length,
      sessionErrors: sessionErrors.length,
      sessionId: this.state.sessionId,
      sessionStartTime: this.state.sessionStartTime,
      sessionDuration: Date.now() - this.state.sessionStartTime
    };
  }
}

// Singleton instance
const monitoringStore = new MonitoringStore();

// Export methods for direct access (needed for API interceptor)
export const addApiHit = monitoringStore.addApiHit.bind(monitoringStore);
export const updateApiHit = monitoringStore.updateApiHit.bind(monitoringStore);
export const addError = monitoringStore.addError.bind(monitoringStore);
export const startNewSession = monitoringStore.startNewSession.bind(monitoringStore);

// React hook
export function useMonitoringStore() {
  const [state, setState] = useState(monitoringStore.getState());

  useEffect(() => {
    return monitoringStore.subscribe(() => {
      setState(monitoringStore.getState());
    });
  }, []);

  return {
    ...state,
    addApiHit: monitoringStore.addApiHit.bind(monitoringStore),
    updateApiHit: monitoringStore.updateApiHit.bind(monitoringStore),
    addSystemMetric: monitoringStore.addSystemMetric.bind(monitoringStore),
    addError: monitoringStore.addError.bind(monitoringStore),
    startRecording: monitoringStore.startRecording.bind(monitoringStore),
    stopRecording: monitoringStore.stopRecording.bind(monitoringStore),
    getAnalytics: monitoringStore.getAnalytics.bind(monitoringStore),
    clearData: monitoringStore.clearData.bind(monitoringStore),
    clearOldData: monitoringStore.clearOldData.bind(monitoringStore),
    getCurrentSessionStats: monitoringStore.getCurrentSessionStats.bind(monitoringStore),
    startNewSession: monitoringStore.startNewSession.bind(monitoringStore)
  };
}

export default monitoringStore;