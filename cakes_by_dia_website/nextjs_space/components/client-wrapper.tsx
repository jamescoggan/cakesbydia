
"use client";

import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { GallerySection } from '@/components/gallery-section';
import { MenuSection } from '@/components/menu-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export function ClientWrapper() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <MenuSection />
      <ContactSection />
      <Footer />
    </>
  );
}
