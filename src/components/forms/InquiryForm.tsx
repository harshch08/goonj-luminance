import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InquiryFormProps {
  serviceType?: string;
  compact?: boolean;
  hideEventType?: boolean;
}

// Service-specific options mapping - using exact options from ServiceDetail page
const serviceOptions: Record<string, string[]> = {
  'Live Music': [
    'Live Music',
    'Solo Performance',
    'Duo Performance',
    'Trio Performance',
    'Band Performance'
  ],
  'Events': [
    'Corporate Events',
    'Product Launches',
    'Award Ceremonies',
    'Private Parties'
  ],
  'Instrumentalists': [
    'Instrumentalist',
    'Acoustic',
    'Pianist',
    'Flutist',
    'Harmonica'
  ],
  'Celebrity Concerts': [
    'Bollywood Stars',
    'Playback Singers',
    'Stand-up Comedians',
    'International Artists'
  ],
  'Open Mics': [
    'Comedy Nights',
    'Poetry Slams',
    'Music Open Mics',
    'Talent Shows'
  ],
  'Karaoke Nights': [
    'Private Karaoke',
    'Corporate Fun',
    'Birthday Parties',
    'Theme Nights'
  ],
  'Bandhan': [
    'Sangeet Night',
    'Wedding Bands',
    'Mehendi Artists',
    'Reception Entertainment'
  ],
  'Destination Weddings': [
    'Beach Weddings',
    'Mountain Retreats',
    'Palace Weddings',
    'International Destinations'
  ],
  'Catering & Decor': [
    'Multi-Cuisine Catering',
    'Theme-Based Decor',
    'Floral Arrangements',
    'Lighting Design'
  ],
  'Photography': [
    'Wedding Photography',
    'Cinematic Videography',
    'Pre-Wedding Shoots',
    'Drone Coverage'
  ],
  'Stage Setup & Lighting / Sound': [
    'Stage Design',
    'LED Walls',
    'Sound Systems',
    'Lighting Effects'
  ],
  'Artist Booking': [
    'Khullar G',
    'Kamakshi',
    'Ananya Mishra',
    'Priyanka Mehar',
    'Sid K',
    'Vijay Jammer',
    'Yashraj',
    'Khushboo Grewal',
    'Sandeep Batraa',
    'Charu Semwal',
    'Jyotica Tangri',
    'Usha Uthup',
    'Paradox',
    'MC Square',
    'Shaarib & Toshi',
    'Badshah'
  ]
};

const allServices = [
  'Live Music',
  'Events',
  'Instrumentalists',
  'Celebrity Concerts',
  'Open Mics',
  'Karaoke Nights',
  'Bandhan (Wedding)',
  'Destination Weddings',
  'Catering & Decor',
  'Photography',
  'Stage Setup & Lighting / Sound'
];

export const InquiryForm = ({ serviceType, compact = false, hideEventType = false }: InquiryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: serviceType || '',
    specificService: '',
    message: '',
  });

  // Get specific options based on selected service
  const getServiceOptions = (service: string) => {
    // Handle different service name variations
    let cleanService = service;
    if (service === 'Bandhan (Wedding)') cleanService = 'Bandhan';
    if (service === 'Celebrity Concerts') cleanService = 'Celebrity Concerts';
    
    return serviceOptions[cleanService] || [];
  };

  const currentServiceOptions = formData.eventType ? getServiceOptions(formData.eventType) : [];

  // Reset form when serviceType prop changes (when navigating between service pages)
  useEffect(() => {
    if (serviceType) {
      setFormData(prev => ({
        ...prev,
        eventType: serviceType,
        specificService: '' // Reset specific service when service type changes
      }));
    }
  }, [serviceType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || (!formData.eventType && !hideEventType)) {
      toast({
        title: "Missing Required Fields",
        description: hideEventType ? "Please fill in Name and Mobile." : "Please fill in Name, Mobile, and Event Type.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Format message for WhatsApp
    const whatsappMessage = `
*New Service Inquiry*

*Name:* ${formData.name}
*Mobile:* ${formData.phone}
${formData.eventType ? `*Event Type:* ${formData.eventType}` : ''}
${formData.specificService ? `*${formData.eventType === 'Artist Booking' ? 'Artist Requested' : 'Specific Service'}:* ${formData.specificService}` : ''}
${formData.email ? `*Email:* ${formData.email}` : ''}
${formData.message ? `\n*Message:*\n${formData.message}` : ''}
    `.trim();
    
    // Send to WhatsApp
    const whatsappNumber = '919897642145';
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Inquiry Submitted!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', eventType: serviceType || '', specificService: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (value: string, field: 'eventType' | 'specificService') => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      // Reset specific service when event type changes
      ...(field === 'eventType' && { specificService: '' })
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 text-center relative overflow-hidden"
      >
        {/* Premium background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-light/5" />
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle size={56} className="text-gold mx-auto mb-4" />
          </motion.div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</h3>
          <p className="text-body text-lg">We'll be in touch soon with the perfect options for your event.</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gold-light">
            <Sparkles size={16} />
            <span className="text-sm uppercase tracking-luxury">Premium Service Awaits</span>
            <Sparkles size={16} />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`glass-card relative overflow-hidden ${compact ? 'p-6' : 'p-8'}`}
    >
      {/* Premium background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/3 via-transparent to-gold-light/3 opacity-50" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
            <Sparkles size={20} className="text-gold" />
          </div>
          <div>
            <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground">
              {serviceType ? `Inquire About ${serviceType}` : 'Make an Inquiry'}
            </h3>
          </div>
        </div>
        
        <div className={`grid gap-6 ${compact ? '' : 'md:grid-cols-2'}`}>
          {/* Name and Email Row */}
          <div className={compact ? 'space-y-4' : 'md:col-span-2 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 space-y-4'}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                Full Name *
              </label>
              <Input
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 bg-background/50 border-border/30 focus:border-gold/50 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 hover:border-gold/30"
              />
            </div>
            {!compact && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 bg-background/50 border-border/30 focus:border-gold/50 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 hover:border-gold/30"
                />
              </div>
            )}
          </div>
          
          {compact && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="h-12 bg-background/50 border-border/30 focus:border-gold/50 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 hover:border-gold/30"
              />
            </div>
          )}
          
          {/* Phone and Event Type Row */}
          <div className={compact ? 'space-y-4' : `md:col-span-2 ${serviceType || hideEventType ? 'md:grid md:grid-cols-1' : 'md:grid md:grid-cols-2'} md:gap-6 md:space-y-0 space-y-4`}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                Mobile Number *
              </label>
              <Input
                name="phone"
                placeholder="+91 9897642145"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-12 bg-background/50 border-border/30 focus:border-gold/50 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground/60 transition-all duration-300 hover:border-gold/30"
              />
            </div>
            {!compact && !serviceType && !hideEventType && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                  Event Type *
                </label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) => handleSelectChange(value, 'eventType')}
                  required
                >
                  <SelectTrigger className="h-12 bg-background/50 border-border/30 focus:border-gold/50 focus:ring-gold/20 text-foreground transition-all duration-300 hover:border-gold/30">
                    <SelectValue placeholder="Select your event type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                    {allServices.map((service) => (
                      <SelectItem 
                        key={service} 
                        value={service}
                        className="focus:bg-gold/10 focus:text-gold-light cursor-pointer"
                      >
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          {compact && !serviceType && !hideEventType && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                Event Type *
              </label>
              <Select
                value={formData.eventType}
                onValueChange={(value) => handleSelectChange(value, 'eventType')}
                required
              >
                <SelectTrigger className="h-12 bg-background/50 border-border/30 focus:border-gold/50 focus:ring-gold/20 text-foreground transition-all duration-300 hover:border-gold/30">
                  <SelectValue placeholder="Select your event type" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                  {allServices.map((service) => (
                    <SelectItem 
                      key={service} 
                      value={service}
                      className="focus:bg-gold/10 focus:text-gold-light cursor-pointer"
                    >
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Specific Service Options */}
          {currentServiceOptions.length > 0 && (
            <div className={`space-y-2 ${compact ? '' : 'md:col-span-2'}`}>
              <label className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                {formData.eventType === 'Artist Booking' ? 'Select Artist' : 'Specific Service'}
              </label>
              <Select
                value={formData.specificService}
                onValueChange={(value) => handleSelectChange(value, 'specificService')}
              >
                <SelectTrigger className="h-12 bg-background/50 border-border/30 focus:border-gold/50 focus:ring-gold/20 text-foreground transition-all duration-300 hover:border-gold/30">
                  <SelectValue placeholder={
                    formData.eventType === 'Artist Booking' 
                      ? 'Choose an artist to book' 
                      : `Choose from ${formData.eventType} options`
                  } />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-md border-border/50">
                  {currentServiceOptions.map((option) => (
                    <SelectItem 
                      key={option} 
                      value={option}
                      className="focus:bg-gold/10 focus:text-gold-light cursor-pointer"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Message */}
          <div className={`space-y-2 ${compact ? '' : 'md:col-span-2'}`}>
            <label className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
              Event Details
            </label>
            <Textarea
              name="message"
              placeholder="Tell us about your event - date, venue, guest count, special requirements..."
              value={formData.message}
              onChange={handleChange}
              rows={compact ? 4 : 5}
              className="bg-background/50 border-border/30 focus:border-gold/50 focus:ring-gold/20 text-foreground placeholder:text-muted-foreground/60 resize-none transition-all duration-300 hover:border-gold/30"
            />
          </div>
        </div>
        
        <Button
          type="submit"
          variant="heroFilled"
          size="lg"
          className="w-full mt-8 h-14 text-lg font-semibold bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold transition-all duration-300 shadow-lg hover:shadow-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
              />
              Submitting Your Inquiry...
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <Send size={20} />
              Submit
              <Sparkles size={16} />
            </span>
          )}
        </Button>
        
        <p className="text-center text-xs text-muted-foreground/60 mt-4 uppercase tracking-wide">
          We respond within 24 hours • Premium service guaranteed
        </p>
      </div>
    </motion.form>
  );
};
