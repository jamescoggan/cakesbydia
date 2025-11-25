
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window?.scrollY > 20);
    };
    
    window?.addEventListener('scroll', handleScroll);
    return () => window?.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#menu', label: t('nav.menu') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/#home" className="flex items-center space-x-2">
            <div className="text-2xl font-bold" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#A94A58' }}>
              Cakes by Dia
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                className="text-gray-700 hover:text-[#A94A58] transition-colors font-medium"
                style={{ fontFamily: 'Questrial, sans-serif' }}
                onClick={() => setIsOpen(false)}
              >
                {link?.label}
              </a>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-l pl-4 ml-4">
              <Globe className="w-4 h-4 text-gray-500" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage('es')}
                className={`${language === 'es' ? 'bg-[#A94A58] text-white' : 'text-gray-600'}`}
              >
                ES
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage('pt')}
                className={`${language === 'pt' ? 'bg-[#A94A58] text-white' : 'text-gray-600'}`}
              >
                PT
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                className="block px-4 py-2 text-gray-700 hover:bg-[#F3DBDF] rounded-lg transition-colors"
                style={{ fontFamily: 'Questrial, sans-serif' }}
                onClick={() => setIsOpen(false)}
              >
                {link?.label}
              </a>
            ))}
            
            <div className="flex items-center gap-2 px-4 pt-2 border-t">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Idioma:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage('es')}
                className={`${language === 'es' ? 'bg-[#A94A58] text-white' : 'text-gray-600'}`}
              >
                ES
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage('pt')}
                className={`${language === 'pt' ? 'bg-[#A94A58] text-white' : 'text-gray-600'}`}
              >
                PT
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
