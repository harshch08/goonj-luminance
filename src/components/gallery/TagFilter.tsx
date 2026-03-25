import { X } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  tagCounts: Record<string, number>;
}

export function TagFilter({ tags, selectedTags, onTagsChange, tagCounts }: TagFilterProps) {
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleClearAll = () => {
    onTagsChange([]);
  };

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-luxury text-muted-foreground">
        Filter by tags:
      </span>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const count = tagCounts[tag] || 0;
          
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gold/20 text-gold-light border border-gold/50'
                  : 'text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50'
              }`}
            >
              <span>{tag}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-gold/30' : 'bg-muted'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedTags.length > 0 && (
        <button
          onClick={handleClearAll}
          className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <X size={14} />
          Clear all
        </button>
      )}
    </div>
  );
}
