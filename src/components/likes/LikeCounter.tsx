import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LikeCounterProps {
  artistId: number
  likeCount: number
  loading?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'badge' | 'inline'
  showIcon?: boolean
  showTrending?: boolean
  animated?: boolean
  className?: string
}

/**
 * Format numbers for display (e.g., 1000 -> 1K, 1500000 -> 1.5M)
 */
const formatCount = (count: number): string => {
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
 * Get trending status based on like count
 */
const getTrendingStatus = (count: number): 'hot' | 'trending' | 'normal' => {
  if (count >= 10000) return 'hot'
  if (count >= 1000) return 'trending'
  return 'normal'
}

export const LikeCounter: React.FC<LikeCounterProps> = ({
  artistId,
  likeCount,
  loading = false,
  error = false,
  size = 'md',
  variant = 'default',
  showIcon = true,
  showTrending = false,
  animated = true,
  className
}) => {
  const formattedCount = formatCount(likeCount)
  const trendingStatus = getTrendingStatus(likeCount)
  const isPopular = trendingStatus !== 'normal'

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
    config.text
  )

  const variantClasses = {
    default: cn(
      'border border-gold/30 bg-background/80 backdrop-blur-sm text-muted-foreground',
      {
        'border-gold/50 bg-gold/10 text-gold': isPopular,
        'border-red-500/50 bg-red-500/10 text-red-400': error
      }
    ),
    minimal: cn(
      'bg-transparent text-muted-foreground',
      {
        'text-gold': isPopular,
        'text-red-400': error
      }
    ),
    badge: cn(
      'bg-gold/20 border border-gold/40 text-gold font-medium',
      {
        'bg-red-500/20 border-red-500/40 text-red-400': error
      }
    ),
    inline: cn(
      'bg-transparent text-muted-foreground font-medium',
      {
        'text-gold': isPopular,
        'text-red-400': error
      }
    )
  }

  const trendingColors = {
    hot: 'text-red-400',
    trending: 'text-orange-400',
    normal: 'text-muted-foreground'
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

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      initial={animated ? { opacity: 0, scale: 0.9 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Heart icon */}
      {showIcon && (
        <motion.div
          animate={animated && isPopular ? { 
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0]
          } : {}}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
        >
          <Heart 
            size={config.icon} 
            className={cn(
              'transition-colors duration-300',
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
      {showTrending && isPopular && (
        <motion.div
          initial={animated ? { opacity: 0, scale: 0 } : {}}
          animate={animated ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <TrendingUp 
            size={config.icon - 2} 
            className={cn('ml-1', trendingColors[trendingStatus])}
          />
        </motion.div>
      )}

      {/* Glow effect for popular items */}
      {isPopular && variant !== 'minimal' && variant !== 'inline' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/20 to-gold-light/20 opacity-0 pointer-events-none"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatDelay: 2,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.div>
  )
}