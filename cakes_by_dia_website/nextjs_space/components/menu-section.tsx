
"use client";

import React from 'react';
import { Heart, Cake, Sparkles, Cookie } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function MenuSection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const menuItems = [
    {
      icon: Heart,
      title: t('menu.wedding'),
      description: t('menu.wedding.desc'),
      color: '#A94A58'
    },
    {
      icon: Cake,
      title: t('menu.celebration'),
      description: t('menu.celebration.desc'),
      color: '#AE8877'
    },
    {
      icon: Sparkles,
      title: t('menu.custom'),
      description: t('menu.custom.desc'),
      color: '#DDC0A8'
    },
    {
      icon: Cookie,
      title: t('menu.flavors'),
      description: t('menu.flavors.desc'),
      color: '#A94A58'
    }
  ];

  return (
    <section id="menu" className="py-24 bg-white">
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
            {t('menu.title')}
          </h2>
          <p 
            className="text-xl text-gray-600"
            style={{ fontFamily: 'Questrial, sans-serif' }}
          >
            {t('menu.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {menuItems?.map((item, index) => {
            const Icon = item?.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#F3DBDF' }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-4 rounded-full shrink-0"
                    style={{ backgroundColor: item?.color }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-2xl font-semibold mb-3"
                      style={{ fontFamily: 'Questrial, sans-serif', color: '#A94A58' }}
                    >
                      {item?.title}
                    </h3>
                    <p 
                      className="text-gray-700 leading-relaxed"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {item?.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center space-y-6">
          <p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {t('menu.note')}
          </p>
          
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#A94A58' }}
          >
            <a href="#contact">
              {t('menu.consult')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
