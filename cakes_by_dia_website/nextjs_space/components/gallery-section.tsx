
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CakeImage {
  id: number;
  url: string;
  source?: string;
  style?: string;
  dimensions?: string;
}

export function GallerySection() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [images, setImages] = useState<CakeImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<CakeImage | null>(null);

  useEffect(() => {
    fetch('/cakes-gallery.json')
      .then(res => res?.json())
      .then(data => {
        // Handle different JSON structures
        if (data?.images && Array.isArray(data.images)) {
          setImages(data.images);
        } else if (data?.elegant_wedding_cake_images_found && Array.isArray(data.elegant_wedding_cake_images_found)) {
          setImages(data.elegant_wedding_cake_images_found);
        } else if (Array.isArray(data)) {
          setImages(data);
        } else {
          setImages([]);
        }
      })
      .catch(() => setImages([]));
  }, []);

  return (
    <section id="gallery" className="py-24" style={{ backgroundColor: '#F3DBDF' }}>
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
            {t('gallery.title')}
          </h2>
          <p 
            className="text-xl text-gray-700"
            style={{ fontFamily: 'Questrial, sans-serif' }}
          >
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images?.map((image, index) => (
            <motion.div
              key={image?.id ?? index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-[3/4] bg-white/50 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                <Image
                  src={image?.url ?? ''}
                  alt={`${t('gallery.alt')} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
              <Image
                src={selectedImage?.url ?? ''}
                alt={t('gallery.alt')}
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-[#F3DBDF] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
