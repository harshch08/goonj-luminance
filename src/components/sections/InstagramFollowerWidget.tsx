import { Instagram, Clock, AlertCircle } from 'lucide-react';
import { useInstagramFollowers } from '@/hooks/useInstagramFollowers';
import { formatFollowerCount } from '@/lib/instagram.utils';
import { ERROR_MESSAGES } from '@/types/instagram.types';

interface InstagramFollowerWidgetProps {
  className?: string;
  showUsername?: boolean;
  refreshInterval?: number;
}

export function InstagramFollowerWidget({
  className = '',
  showUsername = true,
  refreshInterval,
}: InstagramFollowerWidgetProps) {
  const { followersCount, username, isLoading, error, lastUpdated } = 
    useInstagramFollowers(refreshInterval);

  const isStale = lastUpdated && Date.now() - lastUpdated.getTime() > 10 * 60 * 1000;

  if (error) {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 ${className}`}>
        <AlertCircle className="w-5 h-5 text-destructive" />
        <div className="flex-1">
          <p className="text-sm text-destructive">{ERROR_MESSAGES.GENERIC}</p>
        </div>
      </div>
    );
  }

  if (isLoading && !followersCount) {
    return (
      <div className={`flex items-center gap-4 p-6 rounded-lg bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-border/30 ${className}`}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-6 w-16 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 p-6 rounded-lg bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-border/30 hover:border-border/50 transition-all ${className}`}>
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
        <Instagram className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex-1">
        {showUsername && username && (
          <p className="text-sm text-muted-foreground">@{username}</p>
        )}
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold text-foreground">
            {followersCount ? formatFollowerCount(followersCount) : '—'}
          </p>
          {isStale && (
            <Clock className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">Followers</p>
      </div>
    </div>
  );
}
