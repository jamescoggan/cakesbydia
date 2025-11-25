
"use client";

import React from 'react';
import { Heart, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function AboutSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    { icon: Heart, title: 'Sofisticada', color: '#A94A58' },
    { icon: Award, title: 'Moderna', color: '#AE8877' },
    { icon: Sparkles, title: 'Elegante', color: '#DDC0A8' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Cinzel Decorative, serif', color: '#A94A58' }}
          >
            {t('about.title')}
          </h2>
          <p 
            className="text-xl text-gray-600"
            style={{ fontFamily: 'Questrial, sans-serif' }}
          >
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features?.map((feature, index) => {
            const Icon = feature?.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: '#F3DBDF' }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: feature?.color }}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: 'Questrial, sans-serif', color: '#A94A58' }}
                >
                  {feature?.title}
                </h3>
              </motion.div>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <p 
            className="text-lg text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {t('about.text1')}
          </p>
          <p 
            className="text-lg text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {t('about.text2')}
          </p>
          <p 
            className="text-lg text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {t('about.text3')}
          </p>

          <div className="pt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#A94A58' }}
            >
              <a href="#contact">
                {t('about.cta')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
