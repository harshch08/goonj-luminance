import { useState } from 'react';
import { ExternalLink, Instagram, ImageIcon, AlertCircle, Play } from 'lucide-react';
import { generatePostAltText, getRelativeTime, extractTitle } from '@/lib/instagram.utils';
import { cn } from '@/lib/utils';
import type { InstagramPost } from '@/types/instagram';

interface InstagramPostCardProps {
  post: InstagramPost;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  className?: string;
  showOverlay?: boolean;
  showCaption?: boolean;
  onImageError?: () => void;
  hasError?: boolean;
}

export function InstagramPostCard({
  post,
  aspectRatio = 'square',
  className,
  showOverlay = true,
  showCaption = false,
  onImageError,
  hasError = false
}: InstagramPostCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(hasError);
  const [isHovered, setIsHovered] = useState(false);

  // Handle click to open Instagram post
  const handleClick = () => {
    if (post.permalink) {
      window.open(post.permalink, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle image load events
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageLoadError = () => {
    setIsImageLoading(false);
    setImageError(true);
    onImageError?.();
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[5/4]'
  };

  // Extract post metadata
  const title = extractTitle(post.caption);
  const timeAgo = getRelativeTime(post.timestamp);
  const altText = generatePostAltText(post);
  const isVideo = post.media_type === 'VIDEO';
  const isCarousel = post.media_type === 'CAROUSEL_ALBUM';

  // Error state
  if (imageError) {
    return (
      <div
        className={cn(
          "relative rounded-lg border border-border/30 bg-muted/30 overflow-hidden cursor-pointer group",
          "hover:border-border/50 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          aspectRatioClasses[aspectRatio],
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View Instagram post: ${title || 'Untitled'} on Instagram`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Failed to load image
          </p>
          <ExternalLink className="w-4 h-4 text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden cursor-pointer group",
        "hover:shadow-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        aspectRatioClasses[aspectRatio],
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={altText}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        {isImageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
        
        <img
          src={post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url}
          alt={altText}
          className={cn(
            "w-full h-full object-cover transition-transform duration-200",
            "group-hover:scale-105",
            isImageLoading && "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={handleImageLoadError}
          loading="lazy"
        />

        {/* Media type indicators */}
        {isVideo && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center">
            <Play className="w-3 h-3 text-white fill-white" />
          </div>
        )}
        
        {isCarousel && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full ml-0.5" />
          </div>
        )}

        {/* Hover overlay */}
        {showOverlay && (
          <div className={cn(
            "absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 flex items-center justify-center",
            isHovered && "opacity-100"
          )}>
            <div className="flex items-center gap-2 text-white">
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium">View on Instagram</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        {showCaption && title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-white text-sm font-medium line-clamp-2">
              {title}
            </p>
            <p className="text-white/80 text-xs mt-1">
              {timeAgo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton component for loading states
export function InstagramPostCardSkeleton({
  aspectRatio = 'square',
  className
}: Pick<InstagramPostCardProps, 'aspectRatio' | 'className'>) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[5/4]'
  };

  return (
    <div
      className={cn(
        "rounded-lg bg-muted animate-pulse",
        aspectRatioClasses[aspectRatio],
        className
      )}
    />
  );
}