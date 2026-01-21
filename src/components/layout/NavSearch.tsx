import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Searchable content with keywords and their routes
const searchableContent = [
  // Main pages
  { title: 'Home', keywords: ['home', 'main', 'goonj', 'entertainment'], route: '/' },
  { title: 'About Us', keywords: ['about', 'company', 'who we are', 'team', 'story'], route: '/about' },
  { title: 'Services', keywords: ['services', 'offerings', 'what we do'], route: '/services' },
  { title: 'Artists', keywords: ['artists', 'performers', 'musicians', 'talent'], route: '/artists' },
  { title: 'Gallery', keywords: ['gallery', 'photos', 'images', 'portfolio', 'pictures'], route: '/gallery' },
  { title: 'Contact', keywords: ['contact', 'book', 'enquiry', 'inquiry', 'reach', 'call'], route: '/contact' },
  
  // Service categories
  { title: 'Live Music', keywords: ['live music', 'bands', 'solo artists', 'dj', 'acoustic', 'live performance'], route: '/services/live-music' },
  { title: 'Events', keywords: ['events', 'corporate', 'product launch', 'award ceremony', 'private party'], route: '/services/events' },
  { title: 'Instrumentalists', keywords: ['instrumentalists', 'classical', 'jazz', 'fusion', 'session musicians', 'piano', 'guitar', 'violin'], route: '/services/instrumentalists' },
  { title: 'Celebrity Concerts', keywords: ['celebrity', 'bollywood', 'playback singers', 'comedians', 'international artists', 'stars'], route: '/services/celebrity' },
  { title: 'Open Mics', keywords: ['open mic', 'comedy', 'poetry', 'talent show', 'emerging talent'], route: '/services/openmic' },
  { title: 'Karaoke Nights', keywords: ['karaoke', 'singing', 'fun', 'team building', 'birthday'], route: '/services/karaoke' },
  { title: 'Bandhan (Wedding)', keywords: ['wedding', 'bandhan', 'sangeet', 'mehendi', 'reception', 'marriage', 'shaadi'], route: '/bandhan' },
];

interface NavSearchProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export const NavSearch = ({ isMobile = false, onClose }: NavSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof searchableContent>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle search
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = searchableContent.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
    setResults(filtered);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    onClose?.();
  };

  const handleResultClick = (route: string) => {
    navigate(route);
    handleClose();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  // Mobile full-screen search
  if (isMobile) {
    return (
      <>
        <button
          onClick={handleOpen}
          className="text-foreground p-2"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-xl"
            >
              <div className="container mx-auto px-6 py-6" ref={containerRef}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Search services, events..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-12 pr-4 py-6 text-lg bg-secondary/50 border-border/50"
                    />
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-foreground p-2"
                    aria-label="Close search"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Results */}
                <div className="space-y-2">
                  {query.trim() !== '' && results.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      No such service found
                    </p>
                  )}
                  {results.map((result) => (
                    <motion.button
                      key={result.route}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleResultClick(result.route)}
                      className="w-full text-left px-4 py-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <span className="text-foreground font-medium">{result.title}</span>
                      <span className="block text-sm text-muted-foreground mt-1">
                        {result.keywords.slice(0, 3).join(' • ')}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop inline search
  return (
    <div ref={containerRef} className="relative">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="search-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOpen}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Search"
          >
            <Search size={18} />
          </motion.button>
        ) : (
          <motion.div
            key="search-input"
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-8 py-2 text-sm bg-secondary/50 border-border/50 h-9"
              />
              <button
                onClick={handleClose}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Close search"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Results Dropdown */}
      <AnimatePresence>
        {isOpen && query.trim() !== '' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-80 bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-xl overflow-hidden"
          >
            {results.length === 0 ? (
              <p className="text-muted-foreground text-center py-6 text-sm">
                No such service found
              </p>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {results.map((result) => (
                  <button
                    key={result.route}
                    onClick={() => handleResultClick(result.route)}
                    className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border/30 last:border-0"
                  >
                    <span className="text-foreground font-medium text-sm">{result.title}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {result.keywords.slice(0, 3).join(' • ')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
