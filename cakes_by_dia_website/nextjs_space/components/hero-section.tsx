
"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#F3DBDF' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #A94A58 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            style={{ fontFamily: 'Cinzel Decorative, serif', color: '#A94A58' }}
          >
            {t('hero.title')}
          </h1>
          
          <p 
            className="text-xl sm:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto"
            style={{ fontFamily: 'Questrial, sans-serif' }}
          >
            {t('hero.subtitle')}
          </p>

          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#A94A58' }}
          >
            <a href="#gallery" className="inline-flex items-center gap-2">
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full"
          style={{ backgroundColor: '#DDC0A8', opacity: 0.3 }}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: '#AE8877', opacity: 0.2 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
