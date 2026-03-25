import React, { useState, useCallback } from 'react'
import { Heart, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface LikeButtonAdvancedProps {
  artistId: number
  artistName: string
  isLiked: boolean
  onLike: () => Promise<void>
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'floating' | 'compact'
  showTooltip?: boolean
  enableSoundEffects?: boolean
  className?: string
  'aria-label'?: string
}

export const LikeButtonAdvanced: React.FC<LikeButtonAdvancedProps> = ({
  artistId,
  artistName,
  isLiked,
  onLike,
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'default',
  showTooltip = true,
  enableSoundEffects = false,
  className,
  'aria-label': ariaLabel
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [localLoading, setLocalLoading] = useState(false)

  const playSound = useCallback((type: 'like' | 'unlike') => {
    if (!enableSoundEffects) return
    
    try {
      // Create a simple audio context for sound effects
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Different frequencies for like/unlike
      oscillator.frequency.setValueAtTime(type === 'like' ? 800 : 400, audioContext.currentTime)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (error) {
      // Silently fail if audio context is not supported
      console.debug('Audio context not supported:', error)
    }
  }, [enableSoundEffects])

  const handleClick = async () => {
    if (disabled || loading || localLoading || isAnimating) return

    setIsAnimating(true)
    setLocalLoading(true)
    
    try {
      await onLike()
      playSound(isLiked ? 'unlike' : 'like')
    } catch (error) {
      console.error('Failed to toggle like:', error)
    } finally {
      setLocalLoading(false)
      // Keep animation state for visual feedback
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  const isDisabled = disabled || loading || localLoading
  const isLoading = loading || localLoading

  const sizeConfig = {
    sm: { button: 'h-8 w-8', icon: 14, particles: 12 },
    md: { button: 'h-10 w-10', icon: 18, particles: 16 },
    lg: { button: 'h-12 w-12', icon: 22, particles: 20 }
  }

  const config = sizeConfig[size]

  const baseClasses = cn(
    'group relative inline-flex items-center justify-center rounded-full transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    config.button,
    {
      'cursor-pointer': !isDisabled,
      'cursor-not-allowed opacity-50': disabled,
      'cursor-wait': isLoading && !disabled
    }
  )

  const variantClasses = {
    default: cn(
      'border border-gold/30 bg-background/80 backdrop-blur-sm',
      'hover:border-gold/60 hover:bg-gold/10 hover:shadow-md',
      {
        'border-gold bg-gold/20 text-gold shadow-gold/20': isLiked,
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
      'border border-gold/20 bg-background/95 backdrop-blur-md shadow-lg',
      'hover:shadow-xl hover:border-gold/40 hover:shadow-gold/10',
      {
        'border-gold bg-gold/15 text-gold shadow-gold/25': isLiked,
        'text-muted-foreground hover:text-gold': !isLiked
      }
    ),
    compact: cn(
      'border border-transparent bg-gold/10',
      'hover:border-gold/30 hover:bg-gold/20',
      {
        'bg-gold/30 text-gold': isLiked,
        'text-muted-foreground hover:text-gold': !isLiked
      }
    )
  }

  const tooltipText = isLiked 
    ? `Unlike ${artistName}` 
    : `Like ${artistName}`

  const buttonContent = (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={handleClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      aria-label={ariaLabel || tooltipText}
      aria-pressed={isLiked}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* Loading spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Loader2 size={config.icon} className="animate-spin text-gold" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart icon with animations */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative z-10"
          >
            <motion.div
              animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Heart
                size={config.icon}
                className={cn(
                  'transition-all duration-300',
                  {
                    'fill-current': isLiked,
                    'fill-none': !isLiked
                  }
                )}
              />
            </motion.div>

            {/* Floating hearts animation */}
            <AnimatePresence>
              {isAnimating && isLiked && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 pointer-events-none"
                      initial={{ 
                        opacity: 1, 
                        scale: 0,
                        x: -1,
                        y: -1
                      }}
                      animate={{
                        opacity: 0,
                        scale: [0, 1, 0.8],
                        x: Math.cos((i * 45) * Math.PI / 180) * config.particles,
                        y: Math.sin((i * 45) * Math.PI / 180) * config.particles
                      }}
                      transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                        delay: i * 0.05
                      }}
                    >
                      <Heart size={6} className="fill-gold text-gold" />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Ripple effect */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-gold pointer-events-none"
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 2.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glow effect */}
      <motion.div 
        className={cn(
          'absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 pointer-events-none',
          'bg-gradient-to-r from-gold/20 via-gold-light/20 to-gold/20'
        )}
        animate={{
          opacity: isLiked ? 0.3 : 0
        }}
      />
    </motion.button>
  )

  if (!showTooltip) {
    return buttonContent
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {buttonContent}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}