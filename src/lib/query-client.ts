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
      // Optimized defaults for hotel data
      staleTime: 10 * 60 * 1000, // 10 minutes - hotel data doesn't change often
      gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer for better UX
      retry: (failureCount, error: any) => {
        // Don't retry for 404s or authentication errors
        if (error?.status === 404 || error?.status === 401) {
          return false
        }
        // Reduced retries to prevent API spam
        return failureCount < 2
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000), // Faster retries
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnMount: false, // Use cached data when possible
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