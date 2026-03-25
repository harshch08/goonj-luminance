import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LikeButton, LikeCounter, LikeCounterSkeleton } from '@/components/likes'
import { ShareButton } from './ShareButton'
import { CommentInput, CommentList } from '@/components/comments'
import { useLikes, useComments } from '@/hooks'
import type { ArtistLikeData } from '@/hooks'

export interface LiveArtist {
  id: number
  name: string
  genre: string
  tag: string
  bio: string
  image: string
}

export interface LiveArtistCardProps {
  artist: LiveArtist
  index: number
  bulkData?: ArtistLikeData | null
  isLoading?: boolean
  variant?: 'solo' | 'duo'
  forceOpenModal?: boolean
  onModalClose?: () => void
  onLiked?: (artistId: number) => void
}

export const LiveArtistCard: React.FC<LiveArtistCardProps> = ({
  artist,
  index,
  bulkData,
  isLoading = false,
  variant = 'solo',
  forceOpenModal = false,
  onModalClose,
  onLiked
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { isLiked: individualIsLiked, handleLike: rawHandleLike, isLoading: actionLoading } = useLikes(
    artist.id, 
    artist.name,
    { enableOptimisticUpdates: true, enableToasts: true, skipInitialLoad: !!bulkData }
  )

  const handleLike = async () => {
    await rawHandleLike()
    onLiked?.(artist.id)
  }

  // Comments hook - only load when modal is open
  const { 
    comments, 
    commentCount,
    isLoading: commentsLoading, 
    isSubmitting: commentSubmitting,
    addComment, 
    deleteComment 
  } = useComments(artist.id, artist.name, { 
    autoLoad: isModalOpen,
    enableToasts: true 
  })

  // Determine display values - prefer bulk data when available
  const displayLikeCount = bulkData?.likeCount ?? 0
  const displayIsLiked = bulkData?.isLiked ?? individualIsLiked
  const showLoading = isLoading || actionLoading

  const handleBooking = () => {
    const message = `Hi! I would like to book ${artist.name} (${artist.tag}) for my event. Please provide more details about availability and pricing.`
    const whatsappUrl = `https://wa.me/919897642145?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent opening modal if clicking on interactive elements
    const target = e.target as HTMLElement
    if (
      target.closest('button') || 
      target.closest('[role="button"]') ||
      target.closest('a')
    ) {
      return
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    onModalClose?.()
  }

  // Handle forceOpenModal prop
  React.useEffect(() => {
    if (forceOpenModal) {
      setIsModalOpen(true)
    }
  }, [forceOpenModal])

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <>
      {/* Regular Card View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
        viewport={{ once: true }}
        className="glass-card overflow-hidden group hover:border-gold/30 transition-all duration-500 relative flex flex-col cursor-pointer"
        onClick={handleCardClick}
      >
      {/* Artist Image */}
      <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold-light/20 relative overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          loading={index < 4 ? 'eager' : 'lazy'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <div className="hidden absolute inset-0 bg-gradient-to-br from-gold/20 to-gold-light/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gold/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Music size={20} className="text-gold" />
            </div>
            <p className="text-gold font-medium text-sm">{artist.name}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block px-2 py-1 bg-gold/20 backdrop-blur-sm rounded text-xs text-gold-light mb-2">
            {artist.tag}
          </span>
        </div>
      </div>

      {/* Artist Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-1">
          {artist.name}
        </h3>
        
        <p className="text-gold-light text-xs font-medium mb-2">
          {artist.genre}
        </p>
        
        <p className="text-body text-xs leading-relaxed mb-2 sm:mb-3 flex-1 line-clamp-3">
          {artist.bio}
        </p>
        
        {/* Like Button, Counter, Comment, and Share Button Row */}
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          {/* Like Button and Counter with Background */}
          <div className="flex items-center gap-1 sm:gap-2 bg-secondary/50 backdrop-blur-sm rounded-full px-1.5 sm:px-3 py-1 sm:py-2 border border-border/50 flex-shrink-0">
            <LikeButton
              artistId={artist.id}
              artistName={artist.name}
              isLiked={displayIsLiked}
              onLike={handleLike}
              loading={actionLoading}
              size="sm"
              variant="floating"
            />
            
            <div className="w-px h-3.5 sm:h-5 bg-border/50"></div>
            
            {showLoading && !bulkData ? (
              <LikeCounterSkeleton
                size="sm"
                variant="inline"
                showIcon={false}
              />
            ) : (
              <LikeCounter
                artistId={artist.id}
                likeCount={displayLikeCount}
                loading={false}
                size="sm"
                variant="inline"
                showIcon={false}
                animated={false}
              />
            )}
          </div>
          
          {/* Comment Button with its own Background */}
          <div className="bg-secondary/50 backdrop-blur-sm rounded-full p-0.5 border border-border/50 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsModalOpen(true)}
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background hover:border-gold/30 transition-all duration-300"
              aria-label={`Comment on ${artist.name}`}
            >
              <MessageCircle size={11} className="sm:hidden text-foreground" />
              <MessageCircle size={14} className="hidden sm:block text-foreground" />
            </Button>
          </div>
          
          {/* Share Button with its own Background */}
          <div className="bg-secondary/50 backdrop-blur-sm rounded-full p-0.5 border border-border/50 flex-shrink-0">
            <ShareButton
              artistId={artist.id}
              artistName={artist.name}
              size="sm"
              variant="floating"
            />
          </div>
        </div>

        {/* Book Button Row */}
        <Button 
          variant="heroFilled" 
          size="sm"
          onClick={handleBooking}
          className="w-full text-xs sm:text-sm py-2"
        >
          Book Now
        </Button>
      </div>
    </motion.div>

      {/* Modal/Overlay View */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
              onClick={handleCloseModal}
            />

            {/* Modal Card */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, type: "spring", damping: 25 }}
                className="glass-card overflow-hidden relative w-full h-full md:h-[90vh] md:max-w-5xl pointer-events-auto flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-background hover:border-gold/30 transition-all duration-300 flex items-center justify-center shadow-lg"
                  aria-label="Close"
                >
                  <X size={20} className="text-foreground" />
                </button>

                {/* Left: Artist Image with Book Button */}
                <div className="w-full h-[40vh] md:h-full md:w-2/5 lg:w-1/3 bg-gradient-to-br from-gold/20 to-gold-light/20 relative flex-shrink-0">
                  <div className="h-full relative overflow-hidden">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-gold/20 to-gold-light/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gold/30 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Music size={24} className="text-gold" />
                        </div>
                        <p className="text-gold font-medium">{artist.name}</p>
                      </div>
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    
                    {/* Tag at top */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-2 md:px-3 py-1 md:py-1.5 bg-gold/20 backdrop-blur-sm rounded text-xs md:text-sm text-gold-light">
                        {artist.tag}
                      </span>
                    </div>
                    
                    {/* Book Button at bottom right */}
                    <div className="absolute bottom-4 right-4">
                      <Button 
                        variant="heroFilled" 
                        size="sm"
                        onClick={handleBooking}
                        className="shadow-lg text-xs md:text-sm"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right: Artist Details and Comments */}
                <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                  {/* Artist Details - Fixed at top */}
                  <div className="p-4 md:p-6 lg:p-8 flex-shrink-0 border-b border-border/50">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      {artist.name}
                    </h3>
                    
                    <p className="text-gold-light text-sm font-medium mb-4">
                      {artist.genre}
                    </p>
                    
                    <p className="text-body text-sm leading-relaxed mb-6">
                      {artist.bio}
                    </p>
                    
                    {/* Like Button, Counter, Comment, and Share Button Row */}
                    <div className="flex items-center gap-2">
                      {/* Like Button and Counter with Background */}
                      <div className="flex items-center gap-2 bg-secondary/50 backdrop-blur-sm rounded-full px-3 py-2 border border-border/50">
                        <LikeButton
                          artistId={artist.id}
                          artistName={artist.name}
                          isLiked={displayIsLiked}
                          onLike={handleLike}
                          loading={actionLoading}
                          size="sm"
                          variant="floating"
                        />
                        
                        <div className="w-px h-5 bg-border/50"></div>
                        
                        {showLoading && !bulkData ? (
                          <LikeCounterSkeleton
                            size="sm"
                            variant="inline"
                            showIcon={false}
                          />
                        ) : (
                          <LikeCounter
                            artistId={artist.id}
                            likeCount={displayLikeCount}
                            loading={false}
                            size="sm"
                            variant="inline"
                            showIcon={false}
                            animated={false}
                          />
                        )}
                      </div>
                      
                      {/* Comment Button with its own Background */}
                      <div className="bg-secondary/50 backdrop-blur-sm rounded-full p-1 border border-border/50">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 opacity-50 cursor-default"
                          aria-label={`${commentCount} comments`}
                        >
                          <MessageCircle size={14} className="text-foreground" />
                        </Button>
                      </div>
                      
                      {/* Share Button with its own Background */}
                      <div className="bg-secondary/50 backdrop-blur-sm rounded-full p-1 border border-border/50">
                        <ShareButton
                          artistId={artist.id}
                          artistName={artist.name}
                          size="sm"
                          variant="floating"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Comments Section - Scrollable */}
                  <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 min-h-0">
                    <div className="pt-4 md:pt-6">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <h4 className="font-display text-sm md:text-base font-semibold text-foreground">
                          Comments {commentCount > 0 && `(${commentCount})`}
                        </h4>
                      </div>
                      
                      {/* Comment Input - Always visible */}
                      <div className="mb-4 md:mb-6">
                        <CommentInput
                          onSubmit={async (text, userName) => {
                            await addComment(text, userName)
                          }}
                          isSubmitting={commentSubmitting}
                          placeholder="Share your thoughts..."
                          namePlaceholder="Your name (optional)"
                        />
                      </div>
                      
                      {/* Comments List */}
                      <CommentList
                        comments={comments}
                        isLoading={commentsLoading}
                        onDelete={deleteComment}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}