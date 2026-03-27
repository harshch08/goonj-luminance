import { useState } from 'react';
import { Send, Check, ChevronDown } from 'lucide-react';

const inputClass =
  'w-full bg-background/50 backdrop-blur-sm border border-accent/20 hover:border-accent/50 focus:border-accent focus:outline-none rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all duration-300 text-sm';

const MAJOR_SERVICES = [
  'Decoration', 'Themed Decor', 'Catering', 'Branded Catering',
  'Starter Stall', 'Branded Starter Stall',
];

const LIVE_COUNTERS = [
  'Live Chaat Counter', 'Live Panipuri Counter', 'Live Dosa Counter',
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

const DestinationWeddingEnquiryForm = () => {
  const [form, setForm] = useState({
    groomName: '', brideName: '', phone: '', email: '',
    date: '', venue: '', guestCount: '', message: '',
    weddingType: 'Normal',
  });
  const [majorServices, setMajorServices] = useState<string[]>([]);
  const [liveCounters, setLiveCounters] = useState<string[]>([]);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hi Bandhan! I'd like to enquire about *Destination Weddings*.`,
      '',
      `*Groom Name:* ${form.groomName}`,
      `*Bride Name:* ${form.brideName}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : '',
      `*Wedding Type:* ${form.weddingType}`,
      form.date ? `*Event Date:* ${form.date}` : '',
      form.venue ? `*Venue / Location:* ${form.venue}` : '',
      form.guestCount ? `*Guest Count:* ${form.guestCount}` : '',
      majorServices.length ? `*Major Services:* ${majorServices.join(', ')}` : '',
      liveCounters.length ? `*Live Counters:* ${liveCounters.join(', ')}` : '',
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

            {/* Groom & Bride */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Groom Name *</label>
                <input required value={form.groomName} onChange={e => set('groomName', e.target.value)} placeholder="Groom's name" className={inputClass} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Bride Name *</label>
                <input required value={form.brideName} onChange={e => set('brideName', e.target.value)} placeholder="Bride's name" className={inputClass} />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Phone *</label>
                <input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputClass} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Email</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" className={inputClass} />
              </div>
            </div>

            {/* Wedding Type */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Wedding Type</label>
              <select value={form.weddingType} onChange={e => set('weddingType', e.target.value)} className={inputClass}>
                <option>Normal</option>
                <option>Destination</option>
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

            {/* Major Services */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Major Services</label>
              <MultiSelect label="Major Services" options={MAJOR_SERVICES} value={majorServices} onChange={setMajorServices} />
            </div>

            {/* Live Counter */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Live Counter</label>
              <MultiSelect label="Live Counter" options={LIVE_COUNTERS} value={liveCounters} onChange={setLiveCounters} />
            </div>

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

export default DestinationWeddingEnquiryForm;
