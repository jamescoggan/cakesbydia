
import type { Metadata } from 'next';
import { Cinzel_Decorative, Questrial, Montserrat } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/language-context';

const cinzelDecorative = Cinzel_Decorative({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const questrial = Questrial({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-questrial',
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cakes by Dia - Repostería Sofisticada',
  description: 'Tortas artesanales elegantes y modernas para bodas y celebraciones especiales. Diseños sofisticados que hacen realidad tus sueños.',
  keywords: 'tortas, repostería, bodas, celebraciones, tortas elegantes, cakes, wedding cakes',
  authors: [{ name: 'Cakes by Dia' }],
  openGraph: {
    title: 'Cakes by Dia - Repostería Sofisticada',
    description: 'Tortas artesanales elegantes y modernas para bodas y celebraciones especiales',
    url: 'https://cakesbydia.com',
    siteName: 'Cakes by Dia',
    images: ['/og-image.png'],
    locale: 'es_ES',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${cinzelDecorative?.variable ?? ''} ${questrial?.variable ?? ''} ${montserrat?.variable ?? ''} antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
