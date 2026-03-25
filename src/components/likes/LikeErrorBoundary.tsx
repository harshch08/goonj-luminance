import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class LikeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Log error for debugging
    console.error('Like system error:', error, errorInfo)
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
        >
          <AlertTriangle className="h-8 w-8 text-red-400 mb-2" />
          <h3 className="text-sm font-medium text-red-400 mb-1">
            Like System Error
          </h3>
          <p className="text-xs text-red-300 mb-3">
            Something went wrong with the like feature
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={this.handleRetry}
            className="text-red-400 border-red-400 hover:bg-red-400/10"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        </motion.div>
      )
    }

    return this.props.children
  }
}