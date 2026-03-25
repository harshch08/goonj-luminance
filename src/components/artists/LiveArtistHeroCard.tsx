import React from 'react'
import { Music } from 'lucide-react'

export interface LiveArtistHero {
  id: number
  name: string
  genre: string
  tag: string
  image: string
}

export interface LiveArtistHeroCardProps {
  artist: LiveArtistHero
  isActive: boolean
  isMobile?: boolean
  bulkData?: any
  isLoading?: boolean
}

export const LiveArtistHeroCard: React.FC<LiveArtistHeroCardProps> = ({
  artist,
  isActive,
  isMobile = false,
  bulkData,
  isLoading = false
}) => {
  if (isMobile) {
    return (
      <div className="w-full h-full relative overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <div className="hidden absolute inset-0 bg-gradient-to-br from-gold/30 to-gold-light/30 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music size={32} className="text-gold" />
            </div>
            <p className="text-gold font-semibold text-xl">{artist.name}</p>
          </div>
        </div>
        
        {/* Mobile: Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Mobile: Artist info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h3 className="font-display text-3xl font-bold text-white mb-2 leading-tight">
            {artist.name}
          </h3>
          <p className="text-gold-light text-sm font-medium uppercase tracking-wide mb-2">
            {artist.tag}
          </p>
          <p className="text-white/80 text-sm">
            {artist.genre}
          </p>
        </div>
      </div>
    )
  }

  // Desktop layout
  return (
    <div className="flex flex-row h-full">
      {/* Desktop: Left - Artist Image */}
      <div className="w-1/2 h-full relative overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            target.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <div className="hidden absolute inset-0 bg-gradient-to-br from-gold/30 to-gold-light/30 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/40 rounded-full flex items-center justify-center mx-auto mb-3">
              <Music size={28} className="text-gold" />
            </div>
            <p className="text-gold font-semibold text-lg">{artist.name}</p>
          </div>
        </div>
        
        {/* Desktop: Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
      </div>

      {/* Desktop: Right - Artist Details */}
      <div className="w-1/2 p-8 lg:p-10 flex flex-col justify-center relative">
        <div className="space-y-6">
          {/* Artist Name */}
          <div>
            <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 leading-tight">
              {artist.name}
            </h3>
            
            {/* Tag/Category */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-gold-light rounded-full"></div>
              <p className="text-gold-light text-base font-medium uppercase tracking-wide">
                {artist.tag}
              </p>
            </div>
          </div>
          
          {/* Genre/Specialization */}
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
            <p className="text-white/70 text-xs uppercase tracking-wider mb-2 font-semibold">
              Specializes in
            </p>
            <p className="text-white text-base lg:text-lg font-medium">
              {artist.genre}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}