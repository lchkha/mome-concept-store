'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Store,
  ArrowRight,
  Coffee,
  Calendar,
  Sparkles,
  Phone
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { STORE_INFO } from '@/data/products';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, cartSubtotal, wishlist, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Le Brunch & Café', href: '/cafe-brunch', isBrunch: true },
    { label: 'Boutique & E-Shop', href: '/catalogue' },
    { label: 'Mode Femme', href: '/catalogue?cat=mode' },
    { label: 'Déco & Papeterie', href: '/catalogue?cat=deco' },
    { label: 'La Maison à Habsheim', href: '/la-boutique' },
  ];

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF8F3]/95 backdrop-blur-md shadow-xs border-b border-[#EADFD4]'
          : 'bg-[#FBF8F3] border-b border-[#EFE6DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Mobile hamburger & search */}
          <div className="flex items-center lg:hidden gap-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#2C211B] hover:text-[#C86D51] transition-colors"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#2C211B] hover:text-[#C86D51] transition-colors"
              aria-label="Recherche rapide"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo - Chic, Warm, Editorial */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block group">
              <span className="block font-serif text-2xl sm:text-3xl tracking-widest text-[#2C211B] group-hover:text-[#C86D51] transition-colors font-medium">
                MÔME
              </span>
              <span className="block text-[10px] tracking-[0.26em] text-[#786C63] uppercase font-sans font-medium -mt-1 group-hover:text-[#2C211B] transition-colors">
                by Print Line • Habsheim 68440
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href.includes('?') && pathname.includes(link.href.split('?')[0]));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-all flex items-center gap-1.5 ${
                    link.isBrunch
                      ? 'text-[#C86D51] font-semibold bg-[#F7EBE5] px-3.5 py-1 rounded-full border border-[#EED7CD] hover:bg-[#F2DFD5]'
                      : isActive
                      ? 'text-[#C86D51] font-semibold'
                      : 'text-[#4A3E37] hover:text-[#C86D51]'
                  }`}
                >
                  {link.isBrunch && <Coffee className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                  {isActive && !link.isBrunch && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C86D51] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions & Brunch Booking CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE2] hover:bg-[#EAE1D5] text-xs text-[#5D5148] transition-colors cursor-pointer"
              title="Rechercher (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-[#786C63]" />
              <span>Rechercher...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white rounded border border-[#DACDC0] text-[#786C63]">
                ⌘K
              </kbd>
            </button>

            {/* Direct Brunch Reservation Button */}
            <Link
              href="/cafe-brunch#reserver"
              className="hidden sm:inline-flex items-center gap-1.5 py-2 px-4 rounded-full bg-[#C86D51] hover:bg-[#B5583E] text-white text-xs font-semibold shadow-xs transition-all duration-200"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Réserver Brunch</span>
            </Link>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-[#4A3E37] hover:text-[#C86D51] relative transition-colors"
              aria-label="Voir mes coups de cœur"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C86D51] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-full bg-[#2C211B] text-[#FAF8F5] hover:bg-[#C86D51] transition-all duration-200 shadow-xs group"
              aria-label="Ouvrir le panier"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#C86D51] group-hover:bg-[#2C211B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-medium tracking-wide">
                {cartSubtotal > 0 ? `${cartSubtotal.toFixed(2)} €` : 'Panier'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FBF8F3] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-in">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#EADFD4]">
                <div>
                  <span className="font-serif text-2xl tracking-widest text-[#2C211B] font-medium">
                    MÔME
                  </span>
                  <p className="text-[9px] tracking-widest text-[#786C63] uppercase">
                    by print line • habsheim
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-stone-500 hover:text-stone-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Special CTA Mobile Brunch */}
              <div className="mt-5">
                <Link
                  href="/cafe-brunch#reserver"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C86D51] text-white text-xs font-semibold shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Réserver une table de Brunch</span>
                </Link>
              </div>

              <div className="mt-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-[#2C211B] hover:bg-[#F3ECE2] hover:text-[#C86D51] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {link.isBrunch && <Coffee className="w-4 h-4 text-[#C86D51]" />}
                      {link.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#EADFD4] text-xs text-[#5D5148] space-y-2">
                <p className="font-bold text-[#2C211B]">Môme by Print Line</p>
                <p>17 Rue du Maréchal Foch / Rue du Général de Gaulle, 68440 Habsheim</p>
                <p className="text-[#C86D51] font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> 03 89 44 67 92
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EADFD4]">
              <p className="text-[11px] text-[#786C63] text-center">
                Fondé par Angela & Daniela • Alsace
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
