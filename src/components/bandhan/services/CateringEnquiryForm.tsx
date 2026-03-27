import { useState } from 'react';
import { Send, Check, ChevronDown } from 'lucide-react';

const inputClass =
  'w-full bg-background/50 backdrop-blur-sm border border-accent/20 hover:border-accent/50 focus:border-accent focus:outline-none rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all duration-300 text-sm';

const VEG_ITEMS = [
  'Welcome Drink x1', 'Welcome Drink x3', 'Welcome Drink x5',
  'Veg Soup x1', 'Veg Soup x2',
  'Salad (Salad Bar) x2', 'Salad (Salad Bar) x4', 'Salad (Salad Bar) x8',
  'Aachar, Papad, Chutney',
  'Curd Preparation x1', 'Curd Preparation x2',
  'Veg Starter x3', 'Veg Starter x5', 'Veg Starter x8',
  'Paneer Dish x1',
  'Seasonal Veg (Main Course) x2', 'Seasonal Veg (Main Course) x3',
  'Dal Preparation x1', 'Dal Preparation x2',
  'Chinese Dish (Main Course) x1', 'Chinese Dish (Main Course) x2',
  'Veg Western Dish x1',
  'Rice Preparation x1', 'Rice Preparation x2',
  'Indian Breads x3', 'Indian Breads x5', 'Indian Breads x8',
  'Dessert x2', 'Dessert x4', 'Dessert x6',
];

const NON_VEG_ITEMS = [
  'Welcome Drink x2', 'Welcome Drink x4', 'Welcome Drink x5',
  'Veg Soup x1',
  'Non-Veg Soup x1',
  'Veg & Non-Veg Soup x1 each',
  'Salad (Salad Bar) x2', 'Salad (Salad Bar) x4', 'Salad (Salad Bar) x8',
  'Aachar, Papad, Chutney',
  'Curd x1', 'Curd x2',
  'Veg Starter x2', 'Veg Starter x3', 'Veg Starter x4',
  'Non-Veg Starter x2', 'Non-Veg Starter x3', 'Non-Veg Starter x4',
  'Paneer Dish x1',
  'Seasonal Veg (Main Course) x2', 'Seasonal Veg (Main Course) x3',
  'Dal Preparation x1', 'Dal Preparation x2',
  'Chinese Dish (Main Course) x1',
  'Veg Western Dish x1',
  'Non-Veg Chicken (Main) x1',
  'Non-Veg (Main Course) x1', 'Non-Veg (Main Course) x4',
  'Rice Preparation x1', 'Rice Preparation x2',
  'Indian Breads x5', 'Indian Breads x8',
  'Dessert x3', 'Dessert x4', 'Dessert x6',
];

const MultiSelect = ({ label, options, value, onChange }: {
  label: string; options: string[]; value: string[]; onChange: (v: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const toggle = (o: string) =>
    onChange(value.includes(o) ? value.filter(v => v !== o) : [...value, o]);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`${inputClass} flex items-center justify-between gap-2 text-left`}>
        <span className="text-muted-foreground truncate">
          {value.length === 0 ? `Select ${label}` : value.join(', ')}
        </span>
        <ChevronDown size={16} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-background border border-accent/20 rounded-xl shadow-lg overflow-auto max-h-56">
          {options.map(o => (
            <button key={o} type="button" onMouseDown={e => { e.preventDefault(); toggle(o); }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent/10 transition-colors text-left">
              <span>{o}</span>
              {value.includes(o) && <Check size={14} className="text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ChipSelect = ({ items, values, onChange }: {
  items: string[]; values: string[]; onChange: (v: string[]) => void;
}) => (
  <div className="flex flex-wrap gap-2 mt-2">
    {items.map(item => {
      const active = values.includes(item);
      return (
        <button key={item} type="button"
          onClick={() => onChange(active ? values.filter(v => v !== item) : [...values, item])}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 whitespace-nowrap ${
            active
              ? 'bg-accent text-white border-accent shadow-sm'
              : 'bg-background/60 text-foreground/70 border-accent/20 hover:border-accent/60 hover:text-primary'
          }`}>
          {item}
        </button>
      );
    })}
  </div>
);

const CateringEnquiryForm = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', venue: '', guestCount: '', message: '',
    eventType: '',
  });
  const [diet, setDiet] = useState<'veg' | 'nonveg'>('veg');
  const [vegPlatter, setVegPlatter] = useState<string[]>([]);
  const [nonVegPlatter, setNonVegPlatter] = useState<string[]>([]);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hi Bandhan! I'd like to enquire about *Catering & Decor*.`,
      '',
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : '',
      form.eventType ? `*Event Type:* ${form.eventType}` : '',
      form.date ? `*Event Date:* ${form.date}` : '',
      form.venue ? `*Venue / Location:* ${form.venue}` : '',
      form.guestCount ? `*Guest Count:* ${form.guestCount}` : '',
      `*Diet Preference:* ${diet === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}`,
      vegPlatter.length ? `*Veg Platter:* ${vegPlatter.join(', ')}` : '',
      diet === 'nonveg' && nonVegPlatter.length ? `*Non-Veg Platter:* ${nonVegPlatter.join(', ')}` : '',
      form.message ? `*Message:* ${form.message}` : '',
    ].filter(Boolean).join('\n');
    window.open('https://wa.me/919897642145?text=' + encodeURIComponent(lines), '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 via-accent/5 to-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3">Enquire Now</h2>
            <p className="text-muted-foreground">Fill in your details and we'll get back to you on WhatsApp within 24 hours.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-accent/20 space-y-5 animate-fade-in-up">

            {/* Name & Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Full Name *</label>
                <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Phone *</label>
                <input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputClass} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" className={inputClass} />
            </div>

            {/* Event Type */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Event Type</label>
              <select value={form.eventType} onChange={e => set('eventType', e.target.value)} className={inputClass}>
                <option value="">Select an option</option>
                {['Wedding', 'Sangeet', 'Haldi', 'Reception', 'Corporate', 'Other'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* Date & Venue */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Event Date</label>
                <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Venue / Location</label>
                <input value={form.venue} onChange={e => set('venue', e.target.value)} placeholder="City or venue name" className={inputClass} />
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Approximate Guest Count</label>
              <input value={form.guestCount} onChange={e => set('guestCount', e.target.value)} placeholder="e.g. 200" className={inputClass} />
            </div>

            {/* Diet toggle */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Diet Preference</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setDiet('veg')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                    diet === 'veg' ? 'bg-green-50 border-green-500 text-green-700 shadow-sm' : 'border-accent/20 text-muted-foreground hover:border-green-400'
                  }`}>
                  <span className="w-4 h-4 rounded-sm border-2 border-green-600 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                  </span>
                  Veg
                  {diet === 'veg' && <Check size={14} className="text-green-600" />}
                </button>
                <button type="button" onClick={() => setDiet('nonveg')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                    diet === 'nonveg' ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' : 'border-accent/20 text-muted-foreground hover:border-red-400'
                  }`}>
                  <span className="w-4 h-4 rounded-sm border-2 border-red-600 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                  </span>
                  Non-Veg
                  {diet === 'nonveg' && <Check size={14} className="text-red-600" />}
                </button>
              </div>
            </div>

            {/* Veg Platter */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Veg Platter</label>
              <p className="text-xs text-muted-foreground mb-1">Tap to select items</p>
              <ChipSelect items={VEG_ITEMS} values={vegPlatter} onChange={setVegPlatter} />
            </div>

            {/* Non-Veg Platter */}
            {diet === 'nonveg' && (
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Non-Veg Platter</label>
                <p className="text-xs text-muted-foreground mb-1">Tap to select items</p>
                <ChipSelect items={NON_VEG_ITEMS} values={nonVegPlatter} onChange={setNonVegPlatter} />
              </div>
            )}

            {/* Message */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Message</label>
              <textarea rows={4} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us more about your requirements..." className={inputClass + ' resize-none'} />
            </div>

            <button type="submit"
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-4 rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 transform hover:scale-[1.02] group">
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              Enquire via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CateringEnquiryForm;
