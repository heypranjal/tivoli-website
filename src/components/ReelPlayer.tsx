/**
 * ReelPlayer Component
 * Displays YouTube Shorts in vertical reel format with elegant styling
 */
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Play, Pause, Loader2 } from 'lucide-react';

interface ReelPlayerProps {
  url: string;
  title: string;
  className?: string;
}

export const ReelPlayer: React.FC<ReelPlayerProps> = ({
  url,
  title,
  className = ''
}) => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);

  const handlePlayClick = () => {
    setLoading(true);
    setPlaying(true);
    setShowOverlay(false);
  };

  const handleReady = () => {
    setLoading(false);
  };

  const handlePause = () => {
    setPlaying(false);
    setShowOverlay(true);
    setLoading(false);
  };

  const handleEnded = () => {
    setPlaying(false);
    setShowOverlay(true);
    setLoading(false);
  };

  // Extract video ID from YouTube Shorts URL
  const getVideoId = (url: string) => {
    const match = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  const videoId = getVideoId(url);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Add styles to hide YouTube branding for shorts
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .reel-player-wrapper .ytp-watermark,
      .reel-player-wrapper .ytp-chrome-top,
      .reel-player-wrapper .ytp-show-cards-title,
      .reel-player-wrapper .ytp-pause-overlay,
      .reel-player-wrapper .ytp-branded-watermark {
        display: none !important;
      }
      
      .reel-player-wrapper .ytp-youtube-button {
        display: none !important;
      }
      
      .reel-player-wrapper .ytp-chrome-bottom {
        background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`group relative overflow-hidden rounded-xl shadow-xl bg-black ${className}`}>
      {/* Vertical aspect ratio for reels */}
      <div className="relative aspect-[9/16] reel-player-wrapper">
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
                    target.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                  } else if (target.src.includes('mqdefault')) {
                    target.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
                  } else {
                    setThumbnailError(true);
                  }
                }}
              />
            ) : (
              // Custom elegant background for reels
              <div className="w-full h-full bg-gradient-to-b from-[#CD9F59]/10 via-neutral-900 to-black flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#CD9F59]/20 flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#CD9F59]" />
                  </div>
                  <h4 className="text-white text-sm font-serif leading-tight">{title}</h4>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          </div>
        )}

        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          controls={false}
          light={false}
          onReady={handleReady}
          onPlay={() => {
            setPlaying(true);
            setLoading(false);
          }}
          onPause={handlePause}
          onEnded={handleEnded}
          onStart={() => {
            setLoading(false);
          }}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                controls: 1,
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
              className="w-12 h-12 bg-[#CD9F59] hover:bg-[#B88D47] rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-2xl"
              aria-label={`Play ${title}`}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              ) : (
                <Play className="w-6 h-6 text-white ml-0.5" />
              )}
            </button>
          </div>
        )}

        {/* YouTube Logo Blockers for shorts */}
        {!showOverlay && (
          <>
            <div className="absolute top-2 right-2 w-20 h-12 bg-black/90 z-40 pointer-events-none rounded" />
            <div className="absolute bottom-12 right-2 w-16 h-8 bg-gradient-to-t from-black/80 to-transparent z-40 pointer-events-none" />
          </>
        )}

        {/* Reel Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pointer-events-none">
          <h3 className="text-white font-serif text-sm font-medium leading-tight">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ReelPlayer;