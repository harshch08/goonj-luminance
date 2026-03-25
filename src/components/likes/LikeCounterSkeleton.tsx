import React from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LikeCounterSkeletonProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'badge' | 'inline'
  showIcon?: boolean
  className?: string
}

export const LikeCounterSkeleton: React.FC<LikeCounterSkeletonProps> = ({
  size = 'md',
  variant = 'default',
  showIcon = true,
  className
}) => {
  const sizeConfig = {
    sm: {
      container: 'h-6 px-2 gap-1',
      icon: 12,
      textWidth: 'w-6'
    },
    md: {
      container: 'h-8 px-3 gap-1.5',
      icon: 14,
      textWidth: 'w-8'
    },
    lg: {
      container: 'h-10 px-4 gap-2',
      icon: 16,
      textWidth: 'w-10'
    }
  }

  const config = sizeConfig[size]

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-full animate-pulse',
    config.container
  )

  const variantClasses = {
    default: 'border border-gold/20 bg-background/60 backdrop-blur-sm',
    minimal: 'bg-transparent',
    badge: 'bg-gold/10 border border-gold/20',
    inline: 'bg-transparent'
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {/* Heart icon skeleton */}
      {showIcon && (
        <div className="animate-pulse">
          <Heart size={config.icon} className="fill-none text-muted-foreground/50" />
        </div>
      )}

      {/* Count skeleton */}
      <div className={cn(
        'h-3 bg-muted-foreground/20 rounded animate-pulse',
        config.textWidth
      )} />
    </div>
  )
}