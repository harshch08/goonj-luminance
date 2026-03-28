import { useState } from 'react';
import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import BandhanPageTransition from '@/components/bandhan/BandhanPageTransition';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import FloralDecor from '@/components/bandhan/services/FloralDecor';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import '@/components/bandhan/bandhan-theme.css';

const contactInfo = [
  {
    icon: Phone,
    title: 'Mr. Ayush Gupta — CEO',
    details: ['+91 9760813704', '+91 9897642145'],
  },
  {
    icon: Phone,
    title: 'Ms. Sapna Das — Partner',
    details: ['+91 8923192218'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['bandhan.cr@gmail.com','ceo@goonjentertainment.com'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon – Sat: 10:00 AM – 8:00 PM', 'Sunday: By Appointment'],
  },
];

const BandhanContact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', eventType: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Bandhan! I'd like to plan my wedding.%0AName: ${form.name}%0APhone: ${form.phone}%0AEvent: ${form.eventType}%0AMessage: ${form.message}`;
    window.open('https://wa.me/919897642145?text=' + msg, '_blank');
    setSubmitted(true);
  };

  const inputClass = "w-full bg-background/50 backdrop-blur-sm border border-border/40 hover:border-accent/40 focus:border-accent focus:outline-none rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all duration-300 text-sm";

  return (
    <BandhanPageTransition>
    <div className="min-h-screen bandhan-theme" style={{ backgroundColor: 'hsl(40, 40%, 97%)' }}>
      <BandhanNav />
      <BandhanCategoryNav />
      <FloatingFlowers />

      <main className="relative -mt-[140px] pt-[140px]">

        {/* ── Hero ── */}
        <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1920&h=900&fit=crop&q=80"
            alt="Contact Bandhan"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 tracking-tight">
              Let's Connect
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto font-body">
              Your dream wedding begins with a conversation
            </p>
          </div>
        </section>

        {/* ── Contact Cards ── */}
        <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
          <div className="absolute top-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14 animate-fade-in">
                <div className="w-16 h-1 bg-accent mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight">
                  Get in Touch
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className="animate-fade-in-up bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 group text-center"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                      <info.icon size={20} className="text-accent" />
                    </div>
                    <h3 className="text-sm font-heading font-semibold text-primary mb-3 pb-2 border-b border-accent/20">
                      {info.title}
                    </h3>
                    {info.details.map((d, i) => (
                      <p key={i} className="text-sm text-muted-foreground leading-relaxed break-all">{d}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* ── Two-column: intro + form ── */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">

                {/* Left */}
                <div className="animate-fade-in">
                  <div className="w-12 h-1 bg-accent mb-5" />
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 tracking-tight leading-tight">
                    Plan Your Dream Wedding
                  </h2>
                  <p className="text-accent font-medium mb-5">We'd love to hear your vision</p>
                  <p className="text-foreground/90 leading-relaxed mb-8">
                    Whether you have every detail planned or are just beginning to dream, our team is here to guide you. Fill in the form and we'll get back to you within 24 hours — or reach us instantly on WhatsApp.
                  </p>

                  {/* WhatsApp quick CTA */}
                  <button
                    onClick={() => window.open('https://wa.me/919897642145?text=' + encodeURIComponent('Hi Bandhan! I would like to plan my wedding.'), '_blank')}
                    className="flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group mb-6"
                  >
                    <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                    Chat on WhatsApp
                  </button>

                  {/* Address */}
                  <div className="flex items-start gap-3 bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border/30">
                    <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      78/2 Chukhuwala Behind GPO, Near Madhav Niwas,<br />
                      Dehradun, Uttarakhand 248001
                    </p>
                  </div>
                </div>

                {/* Right — Form */}
                <div className="animate-fade-in-up">
                  {submitted ? (
                    <div className="bg-background/50 backdrop-blur-sm p-10 rounded-xl border border-accent/30 text-center">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <Send size={28} className="text-accent" />
                      </div>
                      <div className="w-12 h-1 bg-accent mx-auto mb-4" />
                      <h3 className="text-2xl font-heading font-bold text-primary mb-3">Thank You!</h3>
                      <p className="text-muted-foreground">We've received your enquiry and will be in touch within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/30 space-y-5">
                      <div className="w-12 h-1 bg-accent mb-2" />
                      <h3 className="text-xl font-heading font-semibold text-primary mb-4">Send an Enquiry</h3>

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

                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Event Type *</label>
                        <select name="eventType" required value={form.eventType} onChange={handleChange} className={inputClass}>
                          <option value="">Select event type</option>
                          <option>Destination Wedding</option>
                          <option>Catering & Decor</option>
                          <option>Photography & Videography</option>
                          <option>Stage Setup & Sound</option>
                          <option>Full Wedding Planning</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">Message</label>
                        <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your dream wedding..." className={inputClass + ' resize-none'} />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-4 rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 transform hover:scale-[1.02] group"
                      >
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        Send Enquiry via WhatsApp
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <FloralDecor />
        </section>

      </main>
      <BandhanFooter />
    </div>
    </BandhanPageTransition>
  );
};

export default BandhanContact;
