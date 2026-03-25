import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface LikeButtonProps {
  artistId: number
  artistName: string
  isLiked: boolean
  onLike: () => void
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'floating'
  className?: string
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  artistId,
  artistName,
  isLiked,
  onLike,
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'default',
  className
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = async () => {
    if (disabled || loading || isAnimating) return

    setIsAnimating(true)
    onLike()
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 600)
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  const baseClasses = cn(
    'relative inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    sizeClasses[size],
    {
      'cursor-pointer': !disabled && !loading,
      'cursor-not-allowed opacity-50': disabled,
      'cursor-wait': loading
    }
  )

  const variantClasses = {
    default: cn(
      'border border-gold/30 bg-background/80 backdrop-blur-sm hover:border-gold/60 hover:bg-gold/10',
      {
        'border-gold bg-gold/20 text-gold': isLiked,
        'text-muted-foreground hover:text-gold': !isLiked
      }
    ),
    minimal: cn(
      'bg-transparent hover:bg-gold/10',
      {
        'text-gold': isLiked,
        'text-muted-foreground hover:text-gold': !isLiked
      }
    ),
    floating: cn(
      'border border-gold/20 bg-background/90 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-gold/40',
      {
        'border-gold bg-gold/10 text-gold shadow-gold/20': isLiked,
        'text-muted-foreground hover:text-gold': !isLiked
      }
    )
  }

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      aria-label={isLiked ? `Unlike ${artistName}` : `Like ${artistName}`}
      aria-pressed={isLiked}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* Loading spinner */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart icon with animations */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative"
          >
            <Heart
              size={iconSizes[size]}
              className={cn(
                'transition-all duration-300',
                {
                  'fill-current': isLiked,
                  'fill-none': !isLiked
                }
              )}
            />

            {/* Like animation particles */}
            <AnimatePresence>
              {isAnimating && isLiked && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 h-1 w-1 bg-gold rounded-full"
                      initial={{ 
                        opacity: 1, 
                        scale: 0,
                        x: -2,
                        y: -2
                      }}
                      animate={{
                        opacity: 0,
                        scale: 1,
                        x: Math.cos((i * 60) * Math.PI / 180) * 20,
                        y: Math.sin((i * 60) * Math.PI / 180) * 20
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeOut',
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Pulse effect for like */}
            <AnimatePresence>
              {isAnimating && isLiked && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-gold"
                  initial={{ opacity: 0.8, scale: 1 }}
                  animate={{ opacity: 0, scale: 2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover glow effect */}
      <div className={cn(
        'absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 pointer-events-none',
        'bg-gradient-to-r from-gold/20 to-gold-light/20',
        {
          'group-hover:opacity-100': !disabled && !loading
        }
      )} />
    </motion.button>
  )
}