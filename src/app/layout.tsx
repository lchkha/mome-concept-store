import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import SearchModal from '@/components/SearchModal';
import QuickViewModal from '@/components/QuickViewModal';
import ToastContainer from '@/components/ToastContainer';
import Footer from '@/components/Footer';

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Môme by Print Line | Concept Store & Café Brunch à Habsheim (68440)',
  description: 'Concept store lifestyle & Coffee shop fondé par Angela & Daniela à Habsheim : prêt-à-porter féminin, céramiques, créations Print Line, lattes gourmands et brunch du week-end.',
  keywords: 'concept store habsheim, mome by print line, brunch habsheim, cafe alsace, mode femme habsheim, ceramique mulhouse, coffee shop 68440',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1E1E] antialiased selection:bg-[#C86D51] selection:text-white">
        <ShopProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Interactive Global Drawers & Modals */}
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <QuickViewModal />
          <ToastContainer />
        </ShopProvider>
      </body>
    </html>
  );
}
