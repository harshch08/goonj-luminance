import React from 'react'
import { Heart, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface LikeFallbackProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'button' | 'counter' | 'inline'
  showIcon?: boolean
  message?: string
  className?: string
}

export const LikeFallback: React.FC<LikeFallbackProps> = ({
  size = 'md',
  variant = 'button',
  showIcon = true,
  message,
  className
}) => {
  const sizeConfig = {
    sm: { container: 'h-8 w-8', icon: 14, text: 'text-xs' },
    md: { container: 'h-10 w-10', icon: 18, text: 'text-sm' },
    lg: { container: 'h-12 w-12', icon: 22, text: 'text-base' }
  }

  const config = sizeConfig[size]

  const baseClasses = cn(
    'inline-flex items-center justify-center transition-all duration-300',
    config.text
  )

  if (variant === 'button') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          baseClasses,
          'rounded-full border border-muted bg-muted/20 text-muted-foreground cursor-not-allowed',
          config.container,
          className
        )}
        title={message || 'Like feature unavailable'}
      >
        {showIcon && (
          <Heart size={config.icon} className="fill-none opacity-50" />
        )}
      </motion.div>
    )
  }

  if (variant === 'counter') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          baseClasses,
          'rounded-full border border-muted bg-muted/20 text-muted-foreground px-3 gap-1.5',
          config.container.replace('w-', 'min-w-'),
          className
        )}
        title={message || 'Like counts unavailable'}
      >
        {showIcon && (
          <Heart size={config.icon - 2} className="fill-none opacity-50" />
        )}
        <span className="opacity-50">--</span>
      </motion.div>
    )
  }

  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          baseClasses,
          'text-muted-foreground gap-1',
          className
        )}
        title={message || 'Like feature unavailable'}
      >
        {showIcon && (
          <AlertTriangle size={config.icon - 2} className="opacity-50" />
        )}
        <span className="opacity-50 text-xs">Unavailable</span>
      </motion.div>
    )
  }

  return null
}