import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Wifi, WifiOff, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface LikeSystemStatusProps {
  isOnline?: boolean
  hasError?: boolean
  isLoading?: boolean
  errorMessage?: string
  onRetry?: () => void
  className?: string
}

export const LikeSystemStatus: React.FC<LikeSystemStatusProps> = ({
  isOnline = true,
  hasError = false,
  isLoading = false,
  errorMessage,
  onRetry,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [autoHideTimeout, setAutoHideTimeout] = useState<NodeJS.Timeout | null>(null)

  // Show status when there are issues
  useEffect(() => {
    const shouldShow = !isOnline || hasError || isLoading
    setIsVisible(shouldShow)

    // Auto-hide success states after 3 seconds
    if (isOnline && !hasError && !isLoading && isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      setAutoHideTimeout(timeout)
    }

    return () => {
      if (autoHideTimeout) {
        clearTimeout(autoHideTimeout)
      }
    }
  }, [isOnline, hasError, isLoading, isVisible, autoHideTimeout])

  const getStatusConfig = () => {
    if (isLoading) {
      return {
        icon: RefreshCw,
        iconClass: 'text-blue-400 animate-spin',
        bgClass: 'bg-blue-500/10 border-blue-500/20',
        textClass: 'text-blue-400',
        message: 'Loading like data...'
      }
    }

    if (!isOnline) {
      return {
        icon: WifiOff,
        iconClass: 'text-red-400',
        bgClass: 'bg-red-500/10 border-red-500/20',
        textClass: 'text-red-400',
        message: 'No internet connection'
      }
    }

    if (hasError) {
      return {
        icon: AlertCircle,
        iconClass: 'text-yellow-400',
        bgClass: 'bg-yellow-500/10 border-yellow-500/20',
        textClass: 'text-yellow-400',
        message: errorMessage || 'Like system error'
      }
    }

    return {
      icon: CheckCircle,
      iconClass: 'text-green-400',
      bgClass: 'bg-green-500/10 border-green-500/20',
      textClass: 'text-green-400',
      message: 'Like system ready'
    }
  }

  const config = getStatusConfig()
  const IconComponent = config.icon

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm shadow-lg',
            config.bgClass,
            className
          )}
        >
          <IconComponent size={16} className={config.iconClass} />
          
          <div className="flex-1">
            <p className={cn('text-sm font-medium', config.textClass)}>
              {config.message}
            </p>
          </div>

          {/* Retry button for error states */}
          {(hasError || !isOnline) && onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRetry}
              className={cn('h-6 px-2 text-xs', config.textClass)}
            >
              <RefreshCw size={12} className="mr-1" />
              Retry
            </Button>
          )}

          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className={cn('h-6 w-6 p-0 text-xs', config.textClass)}
          >
            ×
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}