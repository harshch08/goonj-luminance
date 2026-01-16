# Implementation Plan: Instagram Feed Integration

- [x] 1. Set up Instagram configuration and environment




  - Create `.env.example` file with Instagram configuration template
  - Create `src/config/instagram.config.ts` with configuration module and validation
  - Create `src/types/instagram.types.ts` with TypeScript interfaces for Instagram data models



  - _Requirements: 3.1, 3.2, 3.3, 3.4_






- [ ] 2. Implement Instagram API service layer
  - [ ] 2.1 Create core Instagram service class
    - Write `src/services/instagram.service.ts` with InstagramService class
    - Implement constructor with configuration


    - Implement base API request method with error handling
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 2.2 Implement caching mechanism

    - Add cache read/write methods to InstagramService

    - Implement TTL-based cache validation
    - Add localStorage integration for persistent caching
    - _Requirements: 4.3_

  - [x] 2.3 Implement user profile fetching

    - Add `getUserProfile()` method to fetch follower count and username
    - Implement response parsing and error handling
    - Add caching for profile data
    - _Requirements: 1.1, 1.2, 1.3, 1.4_




  - [ ] 2.4 Implement media fetching and hashtag extraction
    - Add `getMediaItems()` method to fetch Instagram images
    - Implement `extractHashtags()` utility to parse captions
    - Filter media to include only IMAGE type posts
    - Add caching for media data
    - _Requirements: 2.1, 2.2, 2.3, 2.4_


  - [x]* 2.5 Write unit tests for Instagram service




    - Create `src/services/instagram.service.test.ts`
    - Test API request construction and response parsing
    - Test caching behavior and TTL validation
    - Test hashtag extraction with various caption formats
    - Test error handling for different API failure scenarios


    - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2_




- [ ] 3. Create custom React hooks for Instagram data
  - [ ] 3.1 Implement useInstagramFollowers hook
    - Create `src/hooks/useInstagramFollowers.ts`
    - Implement data fetching with loading and error states
    - Add automatic refresh with configurable interval (default 5 minutes)
    - Add manual refetch capability
    - _Requirements: 1.1, 1.2, 1.3, 1.4_


  - [-] 3.2 Implement useInstagramMedia hook

    - Create `src/hooks/useInstagramMedia.ts`
    - Implement media fetching with tag extraction




    - Aggregate all unique tags from media items
    - Add automatic refresh with configurable interval
    - Add manual refetch capability
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.1, 4.3_




  - [ ]* 3.3 Write tests for custom hooks
    - Create `src/hooks/useInstagramFollowers.test.ts`
    - Create `src/hooks/useInstagramMedia.test.ts`


    - Test loading, success, and error states
    - Test refresh functionality and intervals
    - Mock Instagram service responses
    - _Requirements: 1.1, 1.3, 2.1, 4.1, 4.2_

- [ ] 4. Create Instagram follower widget for Home page
  - [ ] 4.1 Implement InstagramFollowerWidget component
    - Create `src/components/sections/InstagramFollowerWidget.tsx`
    - Use useInstagramFollowers hook for data



    - Implement loading skeleton state
    - Implement error state with user-friendly message





    - Add stale data indicator when showing cached data
    - Format follower count with K/M suffixes for large numbers
    - Style with Instagram branding (gradient or icon)
    - _Requirements: 1.1, 1.2, 1.4, 4.1, 4.2, 6.4_

  - [x] 4.2 Integrate follower widget into Home page

    - Modify `src/pages/Index.tsx` to include InstagramFollowerWidget
    - Position widget in appropriate section (likely IntroSection or new section)
    - Ensure responsive layout on mobile devices
    - _Requirements: 1.1, 1.2, 6.4_


  - [ ]* 4.3 Write component tests for follower widget
    - Create `src/components/sections/InstagramFollowerWidget.test.tsx`
    - Test loading state rendering





    - Test follower count display and formatting
    - Test error state rendering
    - Test stale data indicator
    - _Requirements: 1.1, 1.2, 1.4, 4.1, 4.2_



- [ ] 5. Implement tag filtering component for Gallery
  - [ ] 5.1 Create TagFilter component
    - Create `src/components/gallery/TagFilter.tsx`
    - Implement tag pill display with counts
    - Add multi-select functionality


    - Add "Clear all" button
    - Style with gold accent for selected tags
    - Make responsive (scrollable on mobile, wrapping on desktop)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_



  - [x]* 5.2 Write tests for TagFilter component


    - Create `src/components/gallery/TagFilter.test.tsx`
    - Test tag rendering with counts




    - Test selection and deselection


    - Test multi-select behavior
    - Test clear all functionality

    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 6. Enhance Gallery page with Instagram integration
  - [ ] 6.1 Integrate Instagram media fetching
    - Modify `src/pages/Gallery.tsx` to use useInstagramMedia hook

    - Transform Instagram media items to GalleryItem format
    - Merge Instagram items with existing galleryItems array
    - Add "Instagram" category to categories array
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 6.2 Implement tag-based filtering logic
    - Add TagFilter component to Gallery page
    - Implement filtering logic to support both category and tag filters
    - Update filtered items to respect both category and selected tags
    - Handle "All" category with tag filtering
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 6.3 Add visual indicators for Instagram content
    - Add Instagram icon badge to Instagram-sourced images
    - Ensure Instagram images open permalink in new tab when clicked in lightbox
    - Maintain existing gallery functionality for local images
    - _Requirements: 2.5, 6.1, 6.2, 6.3_

  - [x] 6.4 Implement loading and error states

    - Add loading skeleton for Instagram images while fetching


    - Display error message if Instagram API fails

    - Show cached data with stale indicator when network unavailable
    - Ensure graceful degradation (show local gallery if Instagram fails)


    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ] 6.5 Optimize performance
    - Implement lazy loading for Instagram images using Intersection Observer






    - Add proper aspect ratios to prevent layout shift
    - Ensure responsive grid maintains layout with Instagram images
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]* 6.6 Write integration tests for Gallery
    - Create `src/pages/Gallery.integration.test.tsx`
    - Test Instagram images display in gallery grid
    - Test tag filtering with Instagram tags
    - Test mixed local and Instagram content
    - Test lightbox with Instagram images
    - Mock Instagram service responses
    - _Requirements: 2.1, 2.2, 2.5, 5.1, 5.2, 6.1, 6.2, 6.3_

- [ ] 7. Add utility functions and helpers
  - [ ] 7.1 Create number formatting utility
    - Create `src/lib/instagram.utils.ts`
    - Implement `formatFollowerCount()` to format large numbers (10500 → "10.5K")
    - Implement `extractTitle()` to get title from Instagram caption
    - Implement `isInstagramUrl()` to validate Instagram URLs
    - _Requirements: 1.2, 2.2_

  - [ ]* 7.2 Write tests for utility functions
    - Create `src/lib/instagram.utils.test.ts`
    - Test number formatting with various inputs
    - Test title extraction from captions
    - Test URL validation
    - _Requirements: 1.2, 2.2_

- [ ] 8. Error handling and logging
  - [ ] 8.1 Create custom error classes
    - Add error classes to `src/types/instagram.types.ts`
    - Implement InstagramAPIError, InstagramAuthError, InstagramRateLimitError
    - Add error message constants
    - _Requirements: 4.2_

  - [ ] 8.2 Implement error boundaries
    - Create `src/components/ErrorBoundary.tsx` for Instagram components
    - Add fallback UI for component errors
    - Log errors appropriately
    - _Requirements: 4.2_

  - [ ] 8.3 Add logging utility
    - Create `src/lib/instagram.logger.ts`
    - Implement logging for API requests, errors, and cache operations
    - Add development vs production logging behavior
    - _Requirements: 4.2_
