import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Instagram, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InstagramFollowerCount } from '@/components/instagram/InstagramFollowerCount';
import { InstagramPostGrid } from '@/components/instagram/InstagramPostGrid';
import { useInstagramSection } from '@/hooks/useInstagram';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface InstagramSectionProps {
  className?: string;
  maxPosts?: number;
  showHeader?: boolean;
  showFollowerCount?: boolean;
  showInstagramLink?: boolean;
}

export const InstagramSection = ({
  className,
  maxPosts = 6,
  showHeader = true,
  showFollowerCount = true,
  showInstagramLink = true
}: InstagramSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  // Fetch Instagram data using the combined hook
  const {
    followerData,
    posts,
    isLoading,
    isLoadingFollowers,
    isLoadingPosts,
    error,
    followerError,
    postsError,
    refetch
  } = useInstagramSection();

  // Animation variants with improved timing
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  // Handle retry action
  const handleRetry = () => {
    refetch();
  };

  // Handle refresh action - calls Edge Function to update database
  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      // Show loading toast
      toast({
        title: "Refreshing Instagram data...",
        description: "Fetching latest posts and follower count",
      });

      // Call the main Instagram data fetch function to update database
      const { data, error } = await supabase.functions.invoke('fetch-instagram-data', {
        method: 'POST'
      });

      if (error) {
        console.error('Failed to refresh Instagram data:', error);
        toast({
          title: "Refresh failed",
          description: "Unable to update Instagram data. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      console.log('Instagram data refreshed successfully:', data);
      
      // Show success toast
      toast({
        title: "Instagram data updated!",
        description: `${data.data?.followers_count || 0} followers • ${data.data?.posts_count || 0} posts`,
      });
      
      // Wait a moment for the database to update, then refetch the UI data
      setTimeout(() => {
        refetch();
      }, 1000);
      
    } catch (error) {
      console.error('Error refreshing Instagram data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Check if we have any data to show
  const hasData = followerData || posts.length > 0;
  const hasError = error && !hasData;

  return (
    <section 
      ref={ref} 
      className={cn(
        "py-12 sm:py-16 lg:py-24 bg-secondary/30",
        className
      )} 
      id="instagram"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16 relative"
          >
            {/* Subtle Refresh Button */}
            <div className="absolute top-0 right-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className={cn(
                  "opacity-60 hover:opacity-100 transition-all duration-200 text-muted-foreground hover:text-foreground",
                  "w-8 h-8 p-0 rounded-full",
                  (isRefreshing || isLoading) && "cursor-not-allowed"
                )}
                title="Refresh Instagram data"
              >
                <RefreshCw className={cn(
                  "w-4 h-4",
                  (isRefreshing || isLoading) && "animate-spin"
                )} />
              </Button>
            </div>

            <span className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-3 sm:mb-4">
              Follow Our Journey
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-4">
              Connect With Us
            </h2>
            <div className="section-divider mb-6 sm:mb-8" />
            <p className="text-body text-sm sm:text-base max-w-2xl mx-auto px-4">
              Stay updated with our latest performances, behind-the-scenes moments, and upcoming events.
            </p>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6 sm:space-y-8 lg:space-y-12"
        >
          {/* Error State */}
          {hasError && (
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 sm:p-8 text-center max-w-md mx-auto"
            >
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-destructive mb-4 mx-auto" />
              <h3 className="text-base sm:text-lg font-semibold text-destructive mb-2">
                Unable to Load Instagram Content
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                We're having trouble connecting to Instagram. Please check your connection and try again.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                disabled={isLoading}
                className="gap-2 text-xs sm:text-sm"
              >
                <RefreshCw className={cn("w-3 h-3 sm:w-4 sm:h-4", isLoading && "animate-spin")} />
                Try Again
              </Button>
            </motion.div>
          )}

          {/* Follower Count Section */}
          {showFollowerCount && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center px-4"
            >
              <InstagramFollowerCount
                count={followerData?.followers_count}
                followingCount={followerData?.follows_count}
                postsCount={followerData?.media_count ?? posts?.length}
                username={followerData?.username}
                name={followerData?.name}
                profilePictureUrl={followerData?.profile_picture_url}
                loading={isLoadingFollowers}
                error={followerError}
                lastUpdated={followerData?.last_updated}
                className="w-full max-w-md"
                showIcon={true}
                showLabel={true}
                variant="instagram"
              />
            </motion.div>
          )}

          {/* Posts Grid Section */}
          <motion.div variants={itemVariants} className="px-2 sm:px-0">
            <InstagramPostGrid
              posts={posts}
              loading={isLoadingPosts}
              error={postsError}
              maxPosts={maxPosts}
              columns={3}
              showEmptyState={true}
              aspectRatio="square"
              className="mb-4 sm:mb-6"
            />
            {posts.length > 0 && (
              <div className="flex justify-center mt-4">
                <a
                  href="https://www.instagram.com/goonj_entertainment__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
                >
                  <Instagram className="w-4 h-4" />
                  View all posts
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Modern Instagram Follow Button */}
          {showInstagramLink && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center px-4"
            >
              <a
                href="https://www.instagram.com/goonj_entertainment__?igsh=MTZuYno5eHY5bjJ0"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden w-full sm:w-auto max-w-sm sm:max-w-none"
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                {/* Content */}
                <div className="relative flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300 flex-shrink-0">
                    <Instagram className="w-5 h-5 sm:w-7 sm:h-7 flex-shrink-0" />
                  </div>
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-xs sm:text-sm font-medium opacity-90">Follow us on Instagram</span>
                    <span className="text-base sm:text-xl font-bold truncate">@goonj_entertainment__</span>
                  </div>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};