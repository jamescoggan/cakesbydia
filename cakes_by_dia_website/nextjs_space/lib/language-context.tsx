
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Nosotros',
    'nav.gallery': 'Galería',
    'nav.menu': 'Menú',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.title': 'Tortas Artesanales',
    'hero.subtitle': 'Creaciones Elegantes para Momentos Especiales',
    'hero.cta': 'Ver Galería',
    
    // About
    'about.title': 'Sobre Cakes by Dia',
    'about.subtitle': 'Repostería Sofisticada y Moderna',
    'about.text1': 'Bienvenidos a Cakes by Dia, donde la elegancia se encuentra con el sabor exquisito. Nos especializamos en crear tortas sofisticadas y modernas para bodas, celebraciones y eventos especiales.',
    'about.text2': 'Cada torta es una obra de arte única, cuidadosamente diseñada y elaborada con ingredientes de la más alta calidad. Nuestra pasión es transformar tus sueños en realidad, creando momentos inolvidables para ti y tus seres queridos.',
    'about.text3': 'Con años de experiencia en repostería artesanal, nos enorgullecemos de ofrecer diseños contemporáneos que reflejan tu estilo personal. Desde elegantes tortas de boda hasta creaciones personalizadas para cualquier celebración.',
    'about.cta': 'Contáctanos',
    
    // Gallery
    'gallery.title': 'Nuestra Galería',
    'gallery.subtitle': 'Creaciones que Inspiran',
    'gallery.alt': 'Torta elegante de Cakes by Dia',
    
    // Menu
    'menu.title': 'Nuestras Especialidades',
    'menu.subtitle': 'Sabores Exquisitos',
    'menu.wedding': 'Tortas de Boda',
    'menu.wedding.desc': 'Diseños elegantes y sofisticados para tu día especial, personalizados según tus preferencias.',
    'menu.celebration': 'Tortas de Celebración',
    'menu.celebration.desc': 'Perfectas para cumpleaños, aniversarios y momentos especiales, con diseños únicos.',
    'menu.custom': 'Diseños Personalizados',
    'menu.custom.desc': 'Creaciones únicas adaptadas a tu visión, desde lo clásico hasta lo contemporáneo.',
    'menu.flavors': 'Sabores Disponibles',
    'menu.flavors.desc': 'Chocolate belga, vainilla premium, red velvet, dulce de leche, frutas frescas y más.',
    'menu.note': 'Todos nuestros productos son elaborados con ingredientes de primera calidad.',
    'menu.consult': 'Consultar Disponibilidad',
    
    // Contact
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Hagamos Realidad tu Torta Soñada',
    'contact.name': 'Nombre',
    'contact.name.placeholder': 'Tu nombre completo',
    'contact.email': 'Correo Electrónico',
    'contact.email.placeholder': 'tu@email.com',
    'contact.phone': 'Teléfono (Opcional)',
    'contact.phone.placeholder': '+34 000 000 000',
    'contact.message': 'Mensaje',
    'contact.message.placeholder': 'Cuéntanos sobre tu evento y la torta que imaginas...',
    'contact.submit': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': '¡Mensaje enviado! Nos pondremos en contacto pronto.',
    'contact.error': 'Error al enviar. Por favor, intenta nuevamente.',
    'contact.email.direct': 'O escríbenos directamente a',
    
    // Footer
    'footer.tagline': 'Repostería Sofisticada para Momentos Especiales',
    'footer.rights': 'Todos los derechos reservados',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.gallery': 'Galeria',
    'nav.menu': 'Menu',
    'nav.contact': 'Contato',
    
    // Hero
    'hero.title': 'Bolos Artesanais',
    'hero.subtitle': 'Criações Elegantes para Momentos Especiais',
    'hero.cta': 'Ver Galeria',
    
    // About
    'about.title': 'Sobre Cakes by Dia',
    'about.subtitle': 'Confeitaria Sofisticada e Moderna',
    'about.text1': 'Bem-vindos à Cakes by Dia, onde a elegância encontra o sabor requintado. Somos especializados em criar bolos sofisticados e modernos para casamentos, celebrações e eventos especiais.',
    'about.text2': 'Cada bolo é uma obra de arte única, cuidadosamente projetado e elaborado com ingredientes da mais alta qualidade. Nossa paixão é transformar seus sonhos em realidade, criando momentos inesquecíveis para você e seus entes queridos.',
    'about.text3': 'Com anos de experiência em confeitaria artesanal, orgulhamo-nos de oferecer designs contemporâneos que refletem seu estilo pessoal. Desde elegantes bolos de casamento até criações personalizadas para qualquer celebração.',
    'about.cta': 'Contate-nos',
    
    // Gallery
    'gallery.title': 'Nossa Galeria',
    'gallery.subtitle': 'Criações que Inspiram',
    'gallery.alt': 'Bolo elegante da Cakes by Dia',
    
    // Menu
    'menu.title': 'Nossas Especialidades',
    'menu.subtitle': 'Sabores Requintados',
    'menu.wedding': 'Bolos de Casamento',
    'menu.wedding.desc': 'Designs elegantes e sofisticados para o seu dia especial, personalizados segundo suas preferências.',
    'menu.celebration': 'Bolos de Celebração',
    'menu.celebration.desc': 'Perfeitos para aniversários, comemorações e momentos especiais, com designs únicos.',
    'menu.custom': 'Designs Personalizados',
    'menu.custom.desc': 'Criações únicas adaptadas à sua visão, do clássico ao contemporâneo.',
    'menu.flavors': 'Sabores Disponíveis',
    'menu.flavors.desc': 'Chocolate belga, baunilha premium, red velvet, doce de leite, frutas frescas e mais.',
    'menu.note': 'Todos os nossos produtos são elaborados com ingredientes de primeira qualidade.',
    'menu.consult': 'Consultar Disponibilidade',
    
    // Contact
    'contact.title': 'Contate-nos',
    'contact.subtitle': 'Vamos Realizar o Bolo dos Seus Sonhos',
    'contact.name': 'Nome',
    'contact.name.placeholder': 'Seu nome completo',
    'contact.email': 'E-mail',
    'contact.email.placeholder': 'seu@email.com',
    'contact.phone': 'Telefone (Opcional)',
    'contact.phone.placeholder': '+351 000 000 000',
    'contact.message': 'Mensagem',
    'contact.message.placeholder': 'Conte-nos sobre seu evento e o bolo que imagina...',
    'contact.submit': 'Enviar Mensagem',
    'contact.sending': 'Enviando...',
    'contact.success': 'Mensagem enviada! Entraremos em contato em breve.',
    'contact.error': 'Erro ao enviar. Por favor, tente novamente.',
    'contact.email.direct': 'Ou escreva-nos diretamente para',
    
    // Footer
    'footer.tagline': 'Confeitaria Sofisticada para Momentos Especiais',
    'footer.rights': 'Todos os direitos reservados',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage?.getItem('language') as Language;
      if (savedLang && (savedLang === 'es' || savedLang === 'pt')) {
        setLanguage(savedLang);
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage?.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    const langTranslations = translations?.[language] as Record<string, string> | undefined;
    return langTranslations?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
