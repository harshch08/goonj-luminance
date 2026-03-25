import React, { createContext, useContext, useCallback, ReactNode } from 'react'
import { toast } from 'sonner'
import { Heart, AlertCircle, CheckCircle, Info } from 'lucide-react'

interface LikeToastContextType {
  showLikeSuccess: (artistName: string) => void
  showLikeError: (message: string, artistName?: string) => void
  showLikeInfo: (message: string) => void
  showLikeWarning: (message: string) => void
}

const LikeToastContext = createContext<LikeToastContextType | undefined>(undefined)

export const useLikeToast = () => {
  const context = useContext(LikeToastContext)
  if (!context) {
    throw new Error('useLikeToast must be used within a LikeToastProvider')
  }
  return context
}

interface LikeToastProviderProps {
  children: ReactNode
}

export const LikeToastProvider: React.FC<LikeToastProviderProps> = ({ children }) => {
  const showLikeSuccess = useCallback((artistName: string) => {
    toast.success(
      <div className="flex items-center gap-2">
        <Heart className="h-4 w-4 text-gold fill-gold" />
        <span>Liked {artistName}!</span>
      </div>,
      {
        duration: 2000,
        className: 'border-gold/20 bg-gold/5',
      }
    )
  }, [])

  const showLikeError = useCallback((message: string, artistName?: string) => {
    const displayMessage = artistName 
      ? `Failed to like ${artistName}: ${message}`
      : `Like failed: ${message}`

    toast.error(
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-red-400" />
        <span>{displayMessage}</span>
      </div>,
      {
        duration: 4000,
        action: {
          label: 'Retry',
          onClick: () => {
            // This will be handled by the component that triggered the error
            console.log('Retry like action')
          }
        }
      }
    )
  }, [])

  const showLikeInfo = useCallback((message: string) => {
    toast.info(
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-blue-400" />
        <span>{message}</span>
      </div>,
      {
        duration: 3000,
      }
    )
  }, [])

  const showLikeWarning = useCallback((message: string) => {
    toast.warning(
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-yellow-400" />
        <span>{message}</span>
      </div>,
      {
        duration: 3000,
      }
    )
  }, [])

  const value: LikeToastContextType = {
    showLikeSuccess,
    showLikeError,
    showLikeInfo,
    showLikeWarning
  }

  return (
    <LikeToastContext.Provider value={value}>
      {children}
    </LikeToastContext.Provider>
  )
}