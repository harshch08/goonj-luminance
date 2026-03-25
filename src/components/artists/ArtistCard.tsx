import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LikeButton, LikeCounter, LikeCounterSkeleton } from '@/components/likes'
import { useLikes } from '@/hooks'
import type { ArtistLikeData } from '@/hooks'

export interface Artist {
  id: number
  name: string
  category: string
  genre: string
  image: string
  bio: string
  performances: string
  rating: number
}

export interface ArtistCardProps {
  artist: Artist
  index: number
  bulkData?: ArtistLikeData | null
  isLoading?: boolean
  onBookingClick: (artist: Artist) => void
}

export const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  index,
  bulkData,
  isLoading = false,
  onBookingClick
}) => {
  // Use individual hook for like actions, but display bulk data for counts
  const { isLiked: individualIsLiked, handleLike, isLoading: actionLoading } = useLikes(
    artist.id, 
    artist.name,
    { enableOptimisticUpdates: true, enableToasts: true }
  )

  // Determine display values - prefer bulk data when available
  const displayLikeCount = bulkData?.likeCount ?? 0
  const displayIsLiked = bulkData?.isLiked ?? individualIsLiked
  const showLoading = isLoading || actionLoading

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
    >
      {/* Artist Image */}
      <img 
        src={artist.image} 
        alt={artist.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Artist Info - Repositioned to Bottom Left */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Basic Info - Always at Bottom Left */}
        <div className="absolute bottom-6 left-6 right-6 transform transition-all duration-500 group-hover:relative group-hover:bottom-auto group-hover:left-auto group-hover:right-auto group-hover:-translate-y-20">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h3 className="font-display text-2xl font-bold text-foreground">
              {artist.name}
            </h3>
            
            {/* Like Button beside name */}
            <div className="flex-shrink-0">
              <LikeButton
                artistId={artist.id}
                artistName={artist.name}
                isLiked={displayIsLiked}
                onLike={handleLike}
                loading={actionLoading}
                size="lg"
                variant="floating"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs uppercase tracking-luxury text-gold-light">
              {artist.category}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-gold fill-gold" />
              <span className="text-xs text-foreground">{artist.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {artist.genre}
          </p>
        </div>

        {/* Hover Content - Slides in from bottom */}
        <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 mt-1">
          <p className="text-sm text-body mb-4 line-clamp-3">
            {artist.bio}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold text-gold-light">{artist.performances}</span> Performances
              </div>
              
              {/* Inline Like Counter for hover state */}
              {showLoading && !bulkData ? (
                <LikeCounterSkeleton
                  size="sm"
                  variant="inline"
                  showIcon={true}
                />
              ) : (
                <LikeCounter
                  artistId={artist.id}
                  likeCount={displayLikeCount}
                  loading={false}
                  size="sm"
                  variant="inline"
                  showIcon={true}
                  animated={false}
                />
              )}
            </div>
            
            <Button 
              variant="hero" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onBookingClick(artist)
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}