
"use client";

import React, { useState } from 'react';
import { Mail, User, Phone, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function ContactSection() {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    setStatus('loading');

    try {
      // For static hosting (GitHub Pages), we'll directly open Gmail compose
      // No API call needed since GitHub Pages doesn't support server-side routes
      setStatus('success');

      // Open Gmail compose
      const subject = language === 'es' ? 'Consulta sobre tortas' : 'Consulta sobre bolos';
      const body = `Nombre: ${formData?.name ?? ''}\nEmail: ${formData?.email ?? ''}\nTeléfono: ${formData?.phone ?? ''}\n\nMensaje:\n${formData?.message ?? ''}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contato@cakesbydia.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window?.open(gmailUrl, '_blank');

      // Reset form
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-24" style={{ backgroundColor: '#F3DBDF' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Cinzel Decorative, serif', color: '#A94A58' }}
          >
            {t('contact.title')}
          </h2>
          <p 
            className="text-xl text-gray-700"
            style={{ fontFamily: 'Questrial, sans-serif' }}
          >
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium mb-2 text-gray-700"
              style={{ fontFamily: 'Questrial, sans-serif' }}
            >
              {t('contact.name')}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="name"
                type="text"
                required
                value={formData?.name ?? ''}
                onChange={(e) => setFormData({ ...formData, name: e?.target?.value ?? '' })}
                placeholder={t('contact.name.placeholder')}
                className="pl-12 h-12"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium mb-2 text-gray-700"
              style={{ fontFamily: 'Questrial, sans-serif' }}
            >
              {t('contact.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                required
                value={formData?.email ?? ''}
                onChange={(e) => setFormData({ ...formData, email: e?.target?.value ?? '' })}
                placeholder={t('contact.email.placeholder')}
                className="pl-12 h-12"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label 
              htmlFor="phone" 
              className="block text-sm font-medium mb-2 text-gray-700"
              style={{ fontFamily: 'Questrial, sans-serif' }}
            >
              {t('contact.phone')}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={formData?.phone ?? ''}
                onChange={(e) => setFormData({ ...formData, phone: e?.target?.value ?? '' })}
                placeholder={t('contact.phone.placeholder')}
                className="pl-12 h-12"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label 
              htmlFor="message" 
              className="block text-sm font-medium mb-2 text-gray-700"
              style={{ fontFamily: 'Questrial, sans-serif' }}
            >
              {t('contact.message')}
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Textarea
                id="message"
                required
                value={formData?.message ?? ''}
                onChange={(e) => setFormData({ ...formData, message: e?.target?.value ?? '' })}
                placeholder={t('contact.message.placeholder')}
                rows={6}
                className="pl-12 resize-none"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="w-full h-12 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#A94A58' }}
          >
            {status === 'loading' ? (
              t('contact.sending')
            ) : status === 'success' ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {t('contact.success')}
              </span>
            ) : status === 'error' ? (
              <span className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {t('contact.error')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                {t('contact.submit')}
              </span>
            )}
          </Button>

          {/* Direct Email */}
          <p className="text-center text-sm text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {t('contact.email.direct')}{' '}
            <a href="mailto:contato@cakesbydia.com" className="font-semibold hover:underline" style={{ color: '#A94A58' }}>
              contato@cakesbydia.com
            </a>
          </p>
        </motion.form>
      </div>
    </section>
  );
}
