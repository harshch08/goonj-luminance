import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, TrendingUp, Users, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface LikeCounterAdvancedProps {
  artistId: number
  artistName: string
  likeCount: number
  loading?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'badge' | 'inline' | 'detailed'
  showIcon?: boolean
  showTrending?: boolean
  showTooltip?: boolean
  clickable?: boolean
  animated?: boolean
  recentLikes?: number // likes in last 24h
  totalUsers?: number // total unique users who liked
  lastLikedAt?: Date
  onCountClick?: () => void
  className?: string
}

/**
 * Format numbers for display with more granular control
 */
const formatCount = (count: number, detailed: boolean = false): string => {
  if (count === 0) return '0'
  
  if (detailed && count < 1000) {
    return count.toString()
  }
  
  if (count < 1000) {
    return count.toString()
  }
  
  if (count < 1000000) {
    const k = count / 1000
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`
  }
  
  const m = count / 1000000
  return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`
}

/**
 * Get relative time string
 */
const getRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

/**
 * Get trending status with more granular levels
 */
const getTrendingStatus = (count: number, recentLikes?: number): {
  level: 'viral' | 'hot' | 'trending' | 'rising' | 'normal'
  color: string
  icon: React.ReactNode
} => {
  const recent = recentLikes || 0
  
  if (count >= 100000 || recent >= 1000) {
    return { 
      level: 'viral', 
      color: 'text-purple-400', 
      icon: <TrendingUp className="animate-bounce" />
    }
  }
  
  if (count >= 10000 || recent >= 100) {
    return { 
      level: 'hot', 
      color: 'text-red-400', 
      icon: <TrendingUp className="animate-pulse" />
    }
  }
  
  if (count >= 1000 || recent >= 50) {
    return { 
      level: 'trending', 
      color: 'text-orange-400', 
      icon: <TrendingUp />
    }
  }
  
  if (recent >= 10) {
    return { 
      level: 'rising', 
      color: 'text-yellow-400', 
      icon: <TrendingUp />
    }
  }
  
  return { 
    level: 'normal', 
    color: 'text-muted-foreground', 
    icon: null
  }
}

export const LikeCounterAdvanced: React.FC<LikeCounterAdvancedProps> = ({
  artistId,
  artistName,
  likeCount,
  loading = false,
  error = false,
  size = 'md',
  variant = 'default',
  showIcon = true,
  showTrending = false,
  showTooltip = true,
  clickable = false,
  animated = true,
  recentLikes,
  totalUsers,
  lastLikedAt,
  onCountClick,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const formattedCount = formatCount(likeCount, variant === 'detailed')
  const trending = getTrendingStatus(likeCount, recentLikes)
  const isPopular = trending.level !== 'normal'

  const sizeConfig = {
    sm: {
      container: 'h-6 px-2 gap-1',
      text: 'text-xs',
      icon: 12
    },
    md: {
      container: 'h-8 px-3 gap-1.5',
      text: 'text-sm',
      icon: 14
    },
    lg: {
      container: 'h-10 px-4 gap-2',
      text: 'text-base',
      icon: 16
    }
  }

  const config = sizeConfig[size]

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-full transition-all duration-300',
    config.container,
    config.text,
    {
      'cursor-pointer hover:scale-105': clickable && !loading && !error,
      'cursor-default': !clickable || loading || error
    }
  )

  const variantClasses = {
    default: cn(
      'border border-gold/30 bg-background/80 backdrop-blur-sm text-muted-foreground',
      {
        'border-gold/50 bg-gold/10 text-gold': isPopular,
        'border-red-500/50 bg-red-500/10 text-red-400': error,
        'hover:border-gold/60 hover:bg-gold/15': clickable && !error
      }
    ),
    minimal: cn(
      'bg-transparent text-muted-foreground',
      {
        'text-gold': isPopular,
        'text-red-400': error,
        'hover:text-gold': clickable && !error
      }
    ),
    badge: cn(
      'bg-gold/20 border border-gold/40 text-gold font-medium',
      {
        'bg-red-500/20 border-red-500/40 text-red-400': error,
        'hover:bg-gold/30': clickable && !error
      }
    ),
    inline: cn(
      'bg-transparent text-muted-foreground font-medium',
      {
        'text-gold': isPopular,
        'text-red-400': error,
        'hover:text-gold': clickable && !error
      }
    ),
    detailed: cn(
      'border border-gold/30 bg-background/90 backdrop-blur-md text-muted-foreground px-4 gap-2',
      {
        'border-gold/50 bg-gold/10 text-gold': isPopular,
        'border-red-500/50 bg-red-500/10 text-red-400': error,
        'hover:border-gold/60 hover:bg-gold/15': clickable && !error
      }
    )
  }

  // Create tooltip content
  const tooltipContent = () => {
    if (error) return 'Failed to load like count'
    if (loading) return 'Loading likes...'
    
    const parts = [`${likeCount.toLocaleString()} ${likeCount === 1 ? 'like' : 'likes'}`]
    
    if (recentLikes && recentLikes > 0) {
      parts.push(`${recentLikes} in last 24h`)
    }
    
    if (totalUsers && totalUsers > 0) {
      parts.push(`${totalUsers} unique users`)
    }
    
    if (lastLikedAt) {
      parts.push(`Last liked ${getRelativeTime(lastLikedAt)}`)
    }
    
    return parts.join(' • ')
  }

  const handleClick = () => {
    if (clickable && !loading && !error && onCountClick) {
      onCountClick()
    }
  }

  if (loading) {
    return (
      <div className={cn(baseClasses, variantClasses[variant], className)}>
        {showIcon && (
          <div className="animate-pulse">
            <Heart size={config.icon} className="fill-none" />
          </div>
        )}
        <div className="flex items-center gap-1">
          <div className="h-3 w-8 bg-muted animate-pulse rounded" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn(baseClasses, variantClasses[variant], className)}>
        {showIcon && (
          <Heart size={config.icon} className="fill-none" />
        )}
        <span>--</span>
      </div>
    )
  }

  const counterContent = (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      initial={animated ? { opacity: 0, scale: 0.9 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Heart icon */}
      {showIcon && (
        <motion.div
          animate={animated && (isPopular || isHovered) ? { 
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ 
            duration: 0.6, 
            ease: 'easeInOut'
          }}
        >
          <Heart 
            size={config.icon} 
            className={cn(
              'transition-all duration-300',
              {
                'fill-current': isPopular,
                'fill-none': !isPopular
              }
            )}
          />
        </motion.div>
      )}

      {/* Count with animation */}
      <AnimatePresence mode="wait">
        <motion.span
          key={formattedCount}
          initial={animated ? { opacity: 0, y: 10 } : {}}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          exit={animated ? { opacity: 0, y: -10 } : {}}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="font-medium tabular-nums"
        >
          {formattedCount}
        </motion.span>
      </AnimatePresence>

      {/* Trending indicator */}
      {showTrending && trending.icon && (
        <motion.div
          initial={animated ? { opacity: 0, scale: 0 } : {}}
          animate={animated ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={trending.color}
        >
          {React.cloneElement(trending.icon as React.ReactElement, { 
            size: config.icon - 2 
          })}
        </motion.div>
      )}

      {/* Additional info for detailed variant */}
      {variant === 'detailed' && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {totalUsers && (
            <div className="flex items-center gap-1">
              <Users size={10} />
              <span>{totalUsers}</span>
            </div>
          )}
          {lastLikedAt && (
            <div className="flex items-center gap-1">
              <Clock size={10} />
              <span>{getRelativeTime(lastLikedAt)}</span>
            </div>
          )}
        </div>
      )}

      {/* Glow effect */}
      {isPopular && variant !== 'minimal' && variant !== 'inline' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/20 to-gold-light/20 opacity-0 pointer-events-none"
          animate={{ 
            opacity: isHovered ? 0.4 : [0, 0.2, 0] 
          }}
          transition={{ 
            duration: isHovered ? 0.3 : 3, 
            repeat: isHovered ? 0 : Infinity, 
            repeatDelay: 2,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.div>
  )

  if (!showTooltip) {
    return counterContent
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {counterContent}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}