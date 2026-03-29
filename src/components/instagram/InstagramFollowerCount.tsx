import { Instagram, Clock, AlertCircle, Loader2, User } from 'lucide-react';
import { formatFollowerCount } from '@/lib/instagram.utils';
import { cn } from '@/lib/utils';

interface InstagramFollowerCountProps {
  count?: number | null;
  followingCount?: number | null;
  postsCount?: number | null;
  username?: string;
  name?: string;
  profilePictureUrl?: string;
  loading?: boolean;
  error?: Error | null;
  lastUpdated?: string;
  className?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  variant?: 'default' | 'compact' | 'minimal' | 'instagram';
}

export function InstagramFollowerCount({
  count,
  followingCount,
  postsCount,
  username,
  name,
  profilePictureUrl,
  loading = false,
  error = null,
  lastUpdated,
  className,
  showIcon = true,
  showLabel = true,
  variant = 'default'
}: InstagramFollowerCountProps) {
  // Check if data is stale (older than 10 minutes)
  const isStale = lastUpdated && 
    Date.now() - new Date(lastUpdated).getTime() > 10 * 60 * 1000;

  // Error state
  if (error && !count) {
    return (
      <div className={cn(
        "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20",
        variant === 'compact' && "p-2",
        variant === 'minimal' && "p-1 bg-transparent border-none",
        className
      )}>
        <AlertCircle className={cn(
          "w-4 h-4 text-destructive flex-shrink-0",
          variant === 'compact' && "w-3 h-3"
        )} />
        <span className={cn(
          "text-sm text-destructive",
          variant === 'compact' && "text-xs",
          variant === 'minimal' && "text-xs"
        )}>
          Failed to load followers
        </span>
      </div>
    );
  }

  // Loading state (only show if no cached data)
  if (loading && !count) {
    return (
      <div className={cn(
        "flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-border/30",
        variant === 'compact' && "gap-2 p-3",
        variant === 'minimal' && "gap-2 p-2 bg-transparent border-none",
        className
      )}>
        {showIcon && (
          <div className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 animate-pulse flex items-center justify-center",
            variant === 'compact' && "w-8 h-8",
            variant === 'minimal' && "w-6 h-6"
          )}>
            <Loader2 className={cn(
              "w-5 h-5 text-white animate-spin",
              variant === 'compact' && "w-4 h-4",
              variant === 'minimal' && "w-3 h-3"
            )} />
          </div>
        )}
        <div className="flex-1 space-y-1">
          <div className={cn(
            "h-4 w-20 bg-muted animate-pulse rounded",
            variant === 'compact' && "h-3 w-16",
            variant === 'minimal' && "h-3 w-12"
          )} />
          {showLabel && (
            <div className={cn(
              "h-3 w-16 bg-muted animate-pulse rounded",
              variant === 'compact' && "h-2 w-12",
              variant === 'minimal' && "h-2 w-10"
            )} />
          )}
        </div>
      </div>
    );
  }

  // Main display state
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-border/30 hover:border-border/50 transition-all duration-200",
      variant === 'compact' && "gap-2 p-3",
      variant === 'minimal' && "gap-2 p-2 bg-transparent border-none hover:border-none",
      variant === 'instagram' && "gap-4 p-4 sm:p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/30 overflow-hidden",
      className
    )}>
      {/* Instagram-style layout */}
      {variant === 'instagram' ? (
        <>
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-0.5">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                {profilePictureUrl ? (
                  <img
                    src={profilePictureUrl}
                    alt={`${username || 'Instagram'} profile`}
                    className="w-full h-full rounded-full object-cover"
                    onLoad={() => console.log('Profile picture loaded successfully')}
                    onError={(e) => {
                      console.log('Profile picture failed to load (likely CORS), showing logo');
                      e.currentTarget.style.display = 'none';
                      const logoDiv = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (logoDiv) {
                        logoDiv.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div 
                  className="w-full h-full rounded-full bg-black flex items-center justify-center"
                  style={{ display: profilePictureUrl ? 'none' : 'flex' }}
                >
                  <img src="/logo.png" alt="Goonj Logo" className="w-12 h-12 object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            {/* Username */}
            <div className="flex items-center gap-2 mb-2 min-w-0">
              <h3 className="text-base sm:text-xl font-semibold text-foreground truncate">
                {username || 'goonj_entertainment__'}
              </h3>
              {isStale && (
                <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
              {loading && count && (
                <Loader2 className="w-4 h-4 text-muted-foreground animate-spin flex-shrink-0" />
              )}
            </div>

            {/* Name */}
            {name && (
              <p className="text-sm text-muted-foreground mb-3">
                {name}
              </p>
            )}

            {/* Stats Row */}
            <div className="flex items-center gap-3 sm:gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground">
                  {postsCount != null ? postsCount : '—'}
                </span>
                <span className="text-muted-foreground">
                  {postsCount === 1 ? 'post' : 'posts'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground">
                  {count ? formatFollowerCount(count) : '—'}
                </span>
                <span className="text-muted-foreground">
                  {count === 1 ? 'follower' : 'followers'}
                </span>
              </div>
              {followingCount != null && (
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-foreground">
                    {followingCount}
                  </span>
                  <span className="text-muted-foreground">following</span>
                </div>
              )}
            </div>

            {/* Last Updated Indicator */}
            {lastUpdated && (
              <div className="flex items-center gap-1 mt-2">
                <Clock className="w-3 h-3 text-muted-foreground/60" />
                <span className="text-xs text-muted-foreground/60">
                  Updated {new Date(lastUpdated).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Original layout for other variants */}
          {showIcon && (
            <div className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0",
              variant === 'compact' && "w-8 h-8",
              variant === 'minimal' && "w-6 h-6"
            )}>
              {profilePictureUrl ? (
                <img
                  src={profilePictureUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to Instagram icon if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <Instagram className={cn(
                "w-5 h-5 text-white",
                variant === 'compact' && "w-4 h-4",
                variant === 'minimal' && "w-3 h-3",
                profilePictureUrl && "hidden"
              )} />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-2xl font-bold text-foreground tabular-nums",
                variant === 'compact' && "text-xl",
                variant === 'minimal' && "text-lg"
              )}>
                {count ? formatFollowerCount(count) : '—'}
              </span>
              {isStale && (
                <Clock className={cn(
                  "w-4 h-4 text-muted-foreground flex-shrink-0",
                  variant === 'compact' && "w-3 h-3",
                  variant === 'minimal' && "w-3 h-3"
                )} />
              )}
              {loading && count && (
                <Loader2 className={cn(
                  "w-4 h-4 text-muted-foreground animate-spin flex-shrink-0",
                  variant === 'compact' && "w-3 h-3",
                  variant === 'minimal' && "w-3 h-3"
                )} />
              )}
            </div>
            {showLabel && (
              <p className={cn(
                "text-xs text-muted-foreground",
                variant === 'minimal' && "text-xs"
              )}>
                Followers
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}