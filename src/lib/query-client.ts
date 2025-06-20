/**
 * React Query Client Configuration
 * Phase 1: Foundation Setup
 * Created: 2025-06-20
 * 
 * Centralized React Query configuration for Tivoli Hotels
 */

import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global defaults for all queries
      staleTime: 1 * 60 * 1000, // 1 minute default
      gcTime: 5 * 60 * 1000, // 5 minutes default
      retry: (failureCount, error: any) => {
        // Don't retry for 404s or authentication errors
        if (error?.status === 404 || error?.status === 401) {
          return false
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Global defaults for mutations
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error)
        // Here you could add global error handling/notifications
      },
    },
  },
})

// Error boundary fallback for React Query errors
export const queryErrorHandler = (error: Error) => {
  console.error('React Query Error:', error)
  
  // You can add error reporting here (e.g., Sentry)
  // In production, you might want to show a user-friendly error message
  
  return error
}