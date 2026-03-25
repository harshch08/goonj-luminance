import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CommentInputProps {
  onSubmit: (text: string, userName?: string) => Promise<void>
  isSubmitting?: boolean
  placeholder?: string
  namePlaceholder?: string
  className?: string
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  isSubmitting = false,
  placeholder = 'Add a comment...',
  namePlaceholder = 'Your name (optional)',
  className
}) => {
  const [text, setText] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!text.trim() || isSubmitting) return

    await onSubmit(text, name.trim() || undefined)
    setText('') // Clear inputs after successful submission
    setName('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-2', className)}>
      {/* Name Input */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={namePlaceholder}
        disabled={isSubmitting}
        maxLength={50}
        className="w-full px-3 py-2 text-sm bg-secondary/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      />
      
      {/* Comment Input with Send Button */}
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isSubmitting}
          rows={2}
          className="flex-1 px-3 py-2 text-sm bg-secondary/30 border border-border/50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!text.trim() || isSubmitting}
          className="h-auto self-end bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
        >
          <Send size={16} />
        </Button>
      </div>
    </form>
  )
}
