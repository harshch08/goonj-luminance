import { useState } from 'react';
import { Send } from 'lucide-react';

interface ServiceEnquiryFormProps {
  serviceName: string;
  extraFields?: { name: string; label: string; type?: string; options?: string[] }[];
}

const inputClass =
  'w-full bg-background/50 backdrop-blur-sm border border-accent/20 hover:border-accent/50 focus:border-accent focus:outline-none rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all duration-300 text-sm';

const ServiceEnquiryForm = ({ serviceName, extraFields = [] }: ServiceEnquiryFormProps) => {
  const [form, setForm] = useState<Record<string, string>>({
    name: '', phone: '', email: '', date: '', venue: '', message: '',
    ...Object.fromEntries(extraFields.map(f => [f.name, ''])),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hi Bandhan! I'd like to enquire about *${serviceName}*.`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : '',
      form.date ? `*Event Date:* ${form.date}` : '',
      form.venue ? `*Venue/Location:* ${form.venue}` : '',
      ...extraFields.filter(f => form[f.name]).map(f => `*${f.label}:* ${form[f.name]}`),
      form.message ? `*Message:* ${form.message}` : '',
    ].filter(Boolean).join('\n');

    window.open('https://wa.me/919897642145?text=' + encodeURIComponent(lines), '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 via-accent/5 to-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

      {/* Floral */}
      <div className="absolute top-12 right-8 opacity-25 pointer-events-none hidden md:block">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
          <circle cx="50" cy="30" r="15" fill="#D4AF37" opacity="0.3" />
          <circle cx="65" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <circle cx="35" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <path d="M50 50 L50 110" stroke="#8B7355" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3">
              Enquire Now
            </h2>
            <p className="text-muted-foreground">
              Fill in your details and we'll get back to you on WhatsApp within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-accent/20 space-y-5 animate-fade-in-up"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Full Name *</label>
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Phone *</label>
                <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Event Date</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Venue / Location</label>
                <input name="venue" value={form.venue} onChange={handleChange} placeholder="City or venue name" className={inputClass} />
              </div>
            </div>

            {/* Extra service-specific fields */}
            {extraFields.map(field => (
              <div key={field.name}>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">{field.label}</label>
                {field.options ? (
                  <select name={field.name} value={form[field.name]} onChange={handleChange} className={inputClass}>
                    <option value="">Select an option</option>
                    {field.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input name={field.name} type={field.type || 'text'} value={form[field.name]} onChange={handleChange} placeholder={field.label} className={inputClass} />
                )}
              </div>
            ))}

            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Message</label>
              <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us more about your requirements..." className={inputClass + ' resize-none'} />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-4 rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              Enquire via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ServiceEnquiryForm;
