import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Users, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  artistCategory: string;
  artistGenre: string;
  artistRating: number;
}

export const BookingModal = ({ 
  isOpen, 
  onClose, 
  artistName, 
  artistCategory, 
  artistGenre, 
  artistRating 
}: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    venue: '',
    guestCount: '',
    budget: '',
    additionalRequirements: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const message = `🎵 *ARTIST BOOKING REQUEST* 🎵

*Artist Details:*
• Name: ${artistName}
• Category: ${artistCategory}
• Genre: ${artistGenre}
• Rating: ${artistRating}⭐

*Client Information:*
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

*Event Details:*
• Event Type: ${formData.eventType}
• Date: ${formData.eventDate}
• Time: ${formData.eventTime}
• Venue: ${formData.venue}
• Expected Guests: ${formData.guestCount}
• Budget Range: ${formData.budget}

*Additional Requirements:*
${formData.additionalRequirements || 'None specified'}

---
*Sent via Goonj Entertainment Website*`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '+919897642145';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Close modal and reset form
    onClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      eventTime: '',
      venue: '',
      guestCount: '',
      budget: '',
      additionalRequirements: ''
    });
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-background border border-gold/20 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gold/20">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Book {artistName}
                  </h2>
                  <p className="text-sm text-body mt-1">
                    {artistCategory} • {artistGenre} • {artistRating}⭐
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gold/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <User size={18} className="text-gold" />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="goonjentertainment3@gmail.com"
                    />
                  </div>
                </div>

                {/* Event Information */}
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <Calendar size={18} className="text-gold" />
                    Event Details
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Event Type *
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground"
                      >
                        <option value="">Select event type</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Concert">Concert</option>
                        <option value="Festival">Festival</option>
                        <option value="Private Party">Private Party</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Expected Guests *
                      </label>
                      <select
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground"
                      >
                        <option value="">Select guest count</option>
                        <option value="50-100">50-100 guests</option>
                        <option value="100-200">100-200 guests</option>
                        <option value="200-500">200-500 guests</option>
                        <option value="500-1000">500-1000 guests</option>
                        <option value="1000+">1000+ guests</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Event Time *
                      </label>
                      <input
                        type="time"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Venue/Location *
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground"
                      placeholder="Event venue or city"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground"
                    >
                      <option value="">Select budget range</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                      <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                      <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                      <option value="₹10,00,000+">₹10,00,000+</option>
                      <option value="Discuss over call">Discuss over call</option>
                    </select>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:border-gold transition-colors text-foreground resize-none"
                    placeholder="Any specific songs, equipment needs, or special requests..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="heroFilled"
                    className="flex-1"
                  >
                    Send WhatsApp Message
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};