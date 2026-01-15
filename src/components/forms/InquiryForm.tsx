import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface InquiryFormProps {
  serviceType?: string;
  compact?: boolean;
}

export const InquiryForm = ({ serviceType, compact = false }: InquiryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: serviceType || '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Inquiry Submitted!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', eventType: serviceType || '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center"
      >
        <CheckCircle size={48} className="text-gold mx-auto mb-4" />
        <h3 className="font-display text-xl text-foreground mb-2">Thank You!</h3>
        <p className="text-body">We'll be in touch soon.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`glass-card ${compact ? 'p-6' : 'p-8'}`}
    >
      <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground mb-6">
        {serviceType ? `Inquire About ${serviceType}` : 'Make an Inquiry'}
      </h3>
      
      <div className={`grid gap-4 ${compact ? '' : 'md:grid-cols-2'}`}>
        <div className={compact ? '' : 'md:col-span-2 md:grid md:grid-cols-2 md:gap-4'}>
          <Input
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-secondary/50 border-border/50 focus:border-gold/50 text-foreground placeholder:text-muted-foreground"
          />
          {!compact && (
            <Input
              name="email"
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-secondary/50 border-border/50 focus:border-gold/50 text-foreground placeholder:text-muted-foreground mt-4 md:mt-0"
            />
          )}
        </div>
        
        {compact && (
          <Input
            name="email"
            type="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-secondary/50 border-border/50 focus:border-gold/50 text-foreground placeholder:text-muted-foreground"
          />
        )}
        
        <div className={compact ? '' : 'md:col-span-2 md:grid md:grid-cols-2 md:gap-4'}>
          <Input
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            required
            className="bg-secondary/50 border-border/50 focus:border-gold/50 text-foreground placeholder:text-muted-foreground"
          />
          {!compact && (
            <Input
              name="eventType"
              placeholder="Event Type"
              value={formData.eventType}
              onChange={handleChange}
              className="bg-secondary/50 border-border/50 focus:border-gold/50 text-foreground placeholder:text-muted-foreground mt-4 md:mt-0"
            />
          )}
        </div>
        
        <div className={compact ? '' : 'md:col-span-2'}>
          <Textarea
            name="message"
            placeholder="Tell us about your event..."
            value={formData.message}
            onChange={handleChange}
            rows={compact ? 3 : 4}
            className="bg-secondary/50 border-border/50 focus:border-gold/50 text-foreground placeholder:text-muted-foreground resize-none"
          />
        </div>
      </div>
      
      <Button
        type="submit"
        variant="heroFilled"
        size="lg"
        className="w-full mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-background border-t-transparent rounded-full"
            />
            Submitting...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={18} />
            Submit Inquiry
          </span>
        )}
      </Button>
    </motion.form>
  );
};
