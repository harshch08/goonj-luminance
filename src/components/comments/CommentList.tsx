import React from 'react'
import { MessageCircle, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import { useSession } from '@/lib/session'
import type { Comment } from '@/lib/services/comments-service'
import { cn } from '@/lib/utils'

export interface CommentListProps {
  comments: Comment[]
  isLoading?: boolean
  onDelete?: (commentId: number) => Promise<void>
  className?: string
}

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  isLoading = false,
  onDelete,
  className
}) => {
  const { sessionId } = useSession()

  if (isLoading) {
    return (
      <div className={cn('space-y-3 md:space-y-4', className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-secondary/30 animate-pulse">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/20 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 md:h-4 bg-gold/20 rounded w-1/4" />
              <div className="h-2.5 md:h-3 bg-gold/20 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className={cn('text-center py-8 md:py-12', className)}>
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-2 md:mb-3">
          <MessageCircle size={20} className="md:hidden text-muted-foreground" />
          <MessageCircle size={24} className="hidden md:block text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-xs md:text-sm">
          No comments yet
        </p>
        <p className="text-muted-foreground text-[10px] md:text-xs mt-1">
          Be the first to share your thoughts!
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-3 md:space-y-4', className)}>
      {comments.map((comment) => {
        const isOwnComment = comment.session_id === sessionId
        
        // Parse the timestamp and format it
        let timeAgo = 'just now'
        try {
          const commentDate = new Date(comment.created_at)
          if (!isNaN(commentDate.getTime())) {
            timeAgo = formatDistanceToNow(commentDate, { addSuffix: true })
          }
        } catch (error) {
          console.error('Error parsing comment date:', error)
        }

        return (
          <div 
            key={comment.id} 
            className="flex gap-3 p-3 md:p-4 rounded-lg bg-secondary/30 hover:bg-secondary/40 transition-colors group"
          >
            {/* Avatar */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/20 flex-shrink-0 flex items-center justify-center">
              <span className="text-gold text-xs md:text-sm font-medium">
                {(comment.user_name || 'Guest').charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Comment Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-medium text-xs md:text-sm text-foreground">
                  {comment.user_name || 'Guest'}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground">
                  {timeAgo}
                </span>
                {isOwnComment && (
                  <span className="text-[10px] md:text-xs text-gold/70 bg-gold/10 px-1.5 md:px-2 py-0.5 rounded">
                    You
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-body whitespace-pre-wrap break-words">
                {comment.comment_text}
              </p>
            </div>

            {/* Delete Button (only for own comments) */}
            {isOwnComment && onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(comment.id)}
                className="h-7 w-7 md:h-8 md:w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive flex-shrink-0"
                aria-label="Delete comment"
              >
                <Trash2 size={12} className="md:hidden" />
                <Trash2 size={14} className="hidden md:block" />
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}
