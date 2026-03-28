import { useState } from 'react';
import { Instagram, AlertCircle, ImageIcon } from 'lucide-react';
import { processInstagramPosts } from '@/lib/instagram.utils';
import { cn } from '@/lib/utils';
import type { InstagramPost } from '@/types/instagram';

// Import InstagramPostCard - will be available after it's created
import { InstagramPostCard } from './InstagramPostCard';

interface InstagramPostGridProps {
  posts: InstagramPost[];
  loading?: boolean;
  error?: Error | null;
  maxPosts?: number;
  className?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
  showEmptyState?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export function InstagramPostGrid({
  posts = [],
  loading = false,
  error = null,
  maxPosts = 6,
  className,
  columns = 3,
  showEmptyState = true,
  aspectRatio = 'square'
}: InstagramPostGridProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Process and filter posts
  const processedPosts = processInstagramPosts(posts, maxPosts);

  // Handle image load errors
  const handleImageError = (postId: string) => {
    setImageErrors(prev => new Set(prev).add(postId));
  };

  // Grid column classes
  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[5/4]'
  };

  // Error state
  if (error && processedPosts.length === 0) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-8 rounded-lg bg-destructive/10 border border-destructive/20 text-center",
        className
      )}>
        <AlertCircle className="w-8 h-8 text-destructive mb-3" />
        <h3 className="text-lg font-semibold text-destructive mb-2">
          Failed to Load Posts
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Unable to load Instagram posts. Please check your connection and try again.
        </p>
      </div>
    );
  }

  // Loading state
  if (loading && processedPosts.length === 0) {
    return (
      <div className={cn(
        "grid gap-4",
        gridClasses[columns],
        className
      )}>
        {Array.from({ length: maxPosts }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className={cn(
              "rounded-lg bg-muted animate-pulse",
              aspectRatioClasses[aspectRatio]
            )}
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (processedPosts.length === 0 && showEmptyState) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-8 rounded-lg bg-muted/30 border border-border/30 text-center",
        className
      )}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 flex items-center justify-center mb-4">
          <Instagram className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Posts Available
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Instagram posts will appear here once they're loaded from your feed.
        </p>
      </div>
    );
  }

  // Main grid display
  return (
    <div className={cn(
      "grid gap-4",
      gridClasses[columns],
      className
    )}>
      {processedPosts.map((post) => (
        <InstagramPostCard
          key={post.id}
          post={post}
          aspectRatio={aspectRatio}
          onImageError={() => handleImageError(post.id)}
          hasError={imageErrors.has(post.id)}
        />
      ))}
      
      {/* Loading indicators for additional posts */}
      {loading && processedPosts.length > 0 && processedPosts.length < maxPosts && (
        <>
          {Array.from({ length: Math.min(3, maxPosts - processedPosts.length) }).map((_, index) => (
            <div
              key={`loading-${index}`}
              className={cn(
                "rounded-lg bg-muted animate-pulse",
                aspectRatioClasses[aspectRatio]
              )}
            />
          ))}
        </>
      )}
    </div>
  );
}

// Skeleton component for loading states
export function InstagramPostGridSkeleton({
  columns = 3,
  maxPosts = 6,
  aspectRatio = 'square',
  className
}: Pick<InstagramPostGridProps, 'columns' | 'maxPosts' | 'aspectRatio' | 'className'>) {
  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[5/4]'
  };

  return (
    <div className={cn(
      "grid gap-4",
      gridClasses[columns],
      className
    )}>
      {Array.from({ length: maxPosts }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className={cn(
            "rounded-lg bg-muted animate-pulse",
            aspectRatioClasses[aspectRatio]
          )}
        />
      ))}
    </div>
  );
}