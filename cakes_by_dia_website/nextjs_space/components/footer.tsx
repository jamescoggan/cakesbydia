
"use client";

import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date()?.getFullYear() ?? 2024;

  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div 
            className="text-2xl font-bold"
            style={{ fontFamily: 'Cinzel Decorative, serif', color: '#A94A58' }}
          >
            Cakes by Dia
          </div>
          
          <p 
            className="text-gray-600"
            style={{ fontFamily: 'Questrial, sans-serif' }}
          >
            {t('footer.tagline')}
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>© {currentYear} Cakes by Dia</span>
            <Heart className="w-4 h-4" style={{ color: '#A94A58' }} />
            <span>{t('footer.rights')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
