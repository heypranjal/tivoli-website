/**
 * Progressive Loading Hook
 * Controls staged loading of page sections for optimal performance
 */

import { useState, useEffect } from 'react';

interface ProgressiveLoadingConfig {
  immediate?: string[];  // Load immediately (0ms)
  priority?: string[];   // Load after hero (100ms)
  secondary?: string[];  // Load after priority (300ms)
  tertiary?: string[];   // Load after secondary (500ms)
  background?: string[]; // Load in background (1000ms)
}

const defaultConfig: ProgressiveLoadingConfig = {
  immediate: ['navigation', 'hero'],
  priority: ['overview'],
  secondary: ['accommodations', 'virtual-tour'],
  tertiary: ['experiences', 'spaces', 'dining', 'gallery'],
  background: ['wedding', 'contact', 'booking-form']
};

// Staggered loading to prevent frame drops
const STAGGER_DELAY = 150; // ms between each component load

export function useProgressiveLoading(config: ProgressiveLoadingConfig = defaultConfig) {
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load immediate sections
    const immediateTimeouts: NodeJS.Timeout[] = [];
    
    // Immediate sections (0ms)
    if (config.immediate) {
      config.immediate.forEach(section => {
        setLoadedSections(prev => new Set([...prev, section]));
      });
    }

    // Priority sections (100ms)
    if (config.priority) {
      const priorityTimeout = setTimeout(() => {
        setLoadedSections(prev => {
          const newSet = new Set(prev);
          config.priority!.forEach(section => newSet.add(section));
          return newSet;
        });
      }, 100);
      immediateTimeouts.push(priorityTimeout);
    }

    // Secondary sections (300ms)
    if (config.secondary) {
      const secondaryTimeout = setTimeout(() => {
        setLoadedSections(prev => {
          const newSet = new Set(prev);
          config.secondary!.forEach(section => newSet.add(section));
          return newSet;
        });
      }, 300);
      immediateTimeouts.push(secondaryTimeout);
    }

    // Tertiary sections (500ms) - Staggered loading to prevent frame drops
    if (config.tertiary) {
      config.tertiary.forEach((section, index) => {
        const staggeredDelay = 500 + (index * STAGGER_DELAY);
        const tertiaryTimeout = setTimeout(() => {
          setLoadedSections(prev => new Set([...prev, section]));
        }, staggeredDelay);
        immediateTimeouts.push(tertiaryTimeout);
      });
    }

    // Background sections (1000ms) - Staggered loading
    if (config.background) {
      config.background.forEach((section, index) => {
        const staggeredDelay = 1000 + (index * STAGGER_DELAY);
        const backgroundTimeout = setTimeout(() => {
          setLoadedSections(prev => new Set([...prev, section]));
          // Mark as initialized after the last background section
          if (index === config.background!.length - 1) {
            setIsInitialized(true);
          }
        }, staggeredDelay);
        immediateTimeouts.push(backgroundTimeout);
      });
    } else {
      // If no background sections, mark as initialized after tertiary
      const lastTertiaryDelay = config.tertiary ? 500 + ((config.tertiary.length - 1) * STAGGER_DELAY) + 100 : 600;
      const initTimeout = setTimeout(() => {
        setIsInitialized(true);
      }, lastTertiaryDelay);
      immediateTimeouts.push(initTimeout);
    }

    // Cleanup timeouts on unmount
    return () => {
      immediateTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const shouldLoad = (section: string): boolean => {
    return loadedSections.has(section);
  };

  const getSectionDelay = (section: string): number => {
    if (config.immediate?.includes(section)) return 0;
    if (config.priority?.includes(section)) return 100;
    if (config.secondary?.includes(section)) return 300;
    if (config.tertiary?.includes(section)) return 500;
    if (config.background?.includes(section)) return 1000;
    return 0;
  };

  return {
    shouldLoad,
    loadedSections: Array.from(loadedSections),
    isInitialized,
    getSectionDelay
  };
}

/**
 * Intersection Observer based progressive loading
 * For sections that should load when they come into view
 */
export function useViewportProgressiveLoading() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const observeSection = (element: Element, sectionName: string) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, sectionName]));
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px'
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  };

  const isVisible = (section: string): boolean => {
    return visibleSections.has(section);
  };

  return {
    observeSection,
    isVisible,
    visibleSections: Array.from(visibleSections)
  };
}