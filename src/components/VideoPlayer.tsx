/**
 * Custom VideoPlayer Component
 * Uses react-player for YouTube integration with custom styling
 * Hides YouTube branding and provides elegant controls
 */
import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Play, Pause, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  className = ''
}) => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const handlePlayClick = () => {
    setLoading(true);
    setPlaying(true);
    setShowOverlay(false);
  };

  const handleReady = () => {
    setLoading(false);
    setPlayerReady(true);
  };

  const handlePause = () => {
    setPlaying(false);
    setShowOverlay(true);
    setLoading(false); // Reset loading state when paused
  };

  const handleEnded = () => {
    setPlaying(false);
    setShowOverlay(true);
    setLoading(false); // Reset loading state when video ends
  };

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  const videoId = getVideoId(url);
  // Start with hqdefault for better compatibility, especially for the problematic videos
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Add styles to hide YouTube branding
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Hide YouTube logo and branding */
      .video-player-wrapper .ytp-watermark,
      .video-player-wrapper .ytp-chrome-top,
      .video-player-wrapper .ytp-show-cards-title,
      .video-player-wrapper .ytp-pause-overlay,
      .video-player-wrapper .ytp-branded-watermark {
        display: none !important;
      }
      
      /* Hide YouTube logo in controls */
      .video-player-wrapper .ytp-youtube-button {
        display: none !important;
      }
      
      /* Hide watch later and share buttons */
      .video-player-wrapper .ytp-button:not(.ytp-play-button):not(.ytp-volume-area):not(.ytp-fullscreen-button):not(.ytp-settings-button) {
        display: none !important;
      }
      
      /* Clean up control bar */
      .video-player-wrapper .ytp-chrome-bottom {
        background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.7)) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`group relative overflow-hidden rounded-xl shadow-lg bg-black ${className}`}>
      <div className="relative aspect-video video-player-wrapper">
        {/* Custom Thumbnail */}
        {showOverlay && (
          <div className="absolute inset-0 z-10">
            {!thumbnailError ? (
              <img 
                src={thumbnailUrl} 
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('hqdefault')) {
                    // First fallback: medium quality
                    target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                  } else if (target.src.includes('mqdefault')) {
                    // Second fallback: default thumbnail (most compatible)
                    target.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                  } else if (target.src.includes('default.jpg')) {
                    // Third fallback: try maxres (in case it's now available)
                    target.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                  } else if (target.src.includes('maxresdefault')) {
                    // Fourth fallback: standard quality
                    target.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
                  } else {
                    // All thumbnails failed, show custom background
                    setThumbnailError(true);
                  }
                }}
              />
            ) : (
              // Custom elegant background when no thumbnail is available
              <div className="w-full h-full bg-gradient-to-br from-[#CD9F59]/20 via-neutral-800 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#CD9F59]/20 flex items-center justify-center">
                    <Play className="w-8 h-8 text-[#CD9F59]" />
                  </div>
                  <h4 className="text-white text-lg font-serif">{title}</h4>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          controls={false}
          light={false} // Changed to false to prevent double-click
          onReady={handleReady}
          onPlay={() => {
            setPlaying(true);
            setLoading(false); // Ensure loading is false when playing
          }}
          onPause={handlePause}
          onEnded={handleEnded}
          onStart={() => {
            setLoading(false); // Clear loading when video starts
          }}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                controls: 1, // Show basic controls
                disablekb: 0,
                fs: 1,
                autoplay: 0,
                cc_load_policy: 0,
                color: 'white',
                hl: 'en',
                playsinline: 1
              }
            }
          }}
          style={{ 
            opacity: showOverlay ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
        
        {/* Custom Play Button Overlay */}
        {showOverlay && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button
              onClick={handlePlayClick}
              className="w-11 h-11 md:w-14 md:h-14 bg-[#CD9F59] hover:bg-[#B88D47] rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-2xl"
              aria-label={`Play ${title}`}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 md:w-7 md:h-7 text-white animate-spin" />
              ) : (
                <Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" />
              )}
            </button>
          </div>
        )}

        {/* YouTube Logo Blocker - covers the logo area */}
        {!showOverlay && (
          <>
            {/* Top right YouTube logo blocker during pause */}
            <div className="absolute top-2 right-2 w-28 h-16 bg-black/90 z-40 pointer-events-none rounded" />
            {/* Bottom right watermark blocker */}
            <div className="absolute bottom-14 right-2 w-24 h-12 bg-gradient-to-t from-black/80 to-transparent z-40 pointer-events-none" />
            {/* Additional blocker for share/watch later buttons */}
            <div className="absolute top-2 right-32 w-20 h-16 bg-black/70 z-40 pointer-events-none" />
          </>
        )}

        {/* Video Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pointer-events-none">
          <h3 className="text-white font-serif text-lg md:text-xl font-medium">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;