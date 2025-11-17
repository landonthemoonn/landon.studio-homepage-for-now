import { motion } from 'motion/react';
import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

interface ContactFormProps {
  inView: boolean;
}

export function ContactForm({ inView }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d740ea3c/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({ name: '', email: '', message: '', newsletter: false });
      } else {
        toast.error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="relative z-20 w-full max-w-[600px] mx-auto px-4"
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-white/20 rounded-[30px] p-8 lg:p-12"
        initial={{ scale: 0.9 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.h2
          className="font-['Inter:Black',sans-serif] font-black text-white text-[32px] lg:text-[40px] text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          GET IN TOUCH
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-white/10 border border-white/30 rounded-[15px] px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b9f61] focus:border-transparent transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full bg-white/10 border border-white/30 rounded-[15px] px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b9f61] focus:border-transparent transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="w-full bg-white/10 border border-white/30 rounded-[15px] px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#9b9f61] focus:border-transparent transition-all resize-none"
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <input
              type="checkbox"
              id="newsletter"
              checked={formData.newsletter}
              onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
              className="w-5 h-5 rounded border-white/30 bg-white/10 text-[#9b9f61] focus:ring-2 focus:ring-[#9b9f61] cursor-pointer"
            />
            <label htmlFor="newsletter" className="text-white/80 cursor-pointer select-none">
              Subscribe to newsletter
            </label>
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#9b9f61] rounded-[20px] px-8 py-4 font-['Inter:Black',sans-serif] font-black text-[16px] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={!isSubmitting ? { 
              scale: 1.02, 
              backgroundColor: '#8a8e55',
              boxShadow: '0 10px 40px rgba(155, 159, 97, 0.4)'
            } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
