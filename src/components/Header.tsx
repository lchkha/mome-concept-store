'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, Store, ArrowRight, Coffee, UtensilsCrossed } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES, STORE_INFO } from '@/data/products';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, cartSubtotal, wishlist, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'E-Shop', href: '/catalogue' },
    { label: 'Mode Femme', href: '/catalogue?cat=mode' },
    { label: 'Déco & Papeterie', href: '/catalogue?cat=deco' },
    { label: 'Café & Brunch', href: '/cafe-brunch', isSpecial: true },
    { label: 'La Boutique Habsheim', href: '/la-boutique' },
  ];

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#E7E1D7]'
          : 'bg-[#FAF8F5] border-b border-[#EAE4DC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#1E1E1E] hover:text-[#C86D51] transition-colors"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 ml-1 text-[#1E1E1E] hover:text-[#C86D51] transition-colors"
              aria-label="Recherche rapide"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link href="/" className="inline-block group text-center lg:text-left">
              <span className="block font-serif text-2xl sm:text-3xl tracking-widest text-[#1E1E1E] group-hover:text-[#C86D51] transition-colors font-medium">
                MÔME
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.28em] text-[#6E685F] uppercase font-sans font-medium -mt-1 group-hover:text-[#1E1E1E] transition-colors">
                by print line • habsheim
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href.includes('?') && pathname.includes(link.href.split('?')[0]));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors flex items-center gap-1.5 ${
                    link.isSpecial
                      ? 'text-[#C86D51] font-semibold bg-[#FAF3ED] px-3 py-1 rounded-full border border-[#F2D7C5] hover:bg-[#F4E6DC]'
                      : isActive
                      ? 'text-[#C86D51] font-semibold'
                      : 'text-stone-700 hover:text-[#C86D51]'
                  }`}
                >
                  {link.isSpecial && <Coffee className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                  {isActive && !link.isSpecial && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C86D51] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Desktop search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2EDE4] hover:bg-[#EAE3D6] text-xs text-stone-600 transition-colors cursor-pointer mr-2"
              title="Rechercher (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span>Rechercher...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] bg-white rounded border border-stone-300 text-stone-500 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Boutique Click & Collect Indicator */}
            <Link
              href="/la-boutique"
              className="hidden xl:flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#C86D51] transition-colors py-1.5 px-2.5 rounded-md hover:bg-[#F2EDE4]"
              title="Retrait gratuit à la boutique de Habsheim"
            >
              <Store className="w-3.5 h-3.5 text-[#4A5D4E]" />
              <span className="text-[11px] font-medium text-[#4A5D4E]">Habsheim 68440</span>
            </Link>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-stone-700 hover:text-[#C86D51] relative transition-colors"
              aria-label="Voir mes coups de cœur"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C86D51] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-full bg-[#1E1E1E] text-[#FAF8F5] hover:bg-[#C86D51] transition-all duration-200 shadow-xs group"
              aria-label="Ouvrir le panier"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#C86D51] group-hover:bg-[#1E1E1E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
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
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F5] shadow-xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-in">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E1D7]">
                <div>
                  <span className="font-serif text-2xl tracking-widest text-[#1E1E1E] font-medium">
                    MÔME
                  </span>
                  <p className="text-[9px] tracking-widest text-[#6E685F] uppercase">
                    concept store & brunch • habsheim
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-stone-500 hover:text-stone-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 space-y-1">
                <Link
                  href="/cafe-brunch"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-lg text-base font-semibold bg-[#FAF3ED] text-[#C86D51] border border-[#F2D7C5]"
                >
                  <span className="flex items-center gap-2">
                    <Coffee className="w-4 h-4" /> Le Café & Brunch
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium text-stone-800 hover:bg-[#F2EDE4] hover:text-[#C86D51] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E7E1D7]">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 px-3">
                  Univers Boutique
                </p>
                <div className="grid grid-cols-2 gap-2 px-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalogue?cat=${cat.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-3 bg-[#F2EDE4] rounded-lg text-xs font-medium text-stone-800 hover:bg-[#EAE3D6] text-center"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7E1D7] text-xs text-stone-600 space-y-2">
              <div className="flex items-center gap-2 text-stone-800 font-medium">
                <Store className="w-4 h-4 text-[#4A5D4E]" />
                <span>{STORE_INFO.address}, {STORE_INFO.city}</span>
              </div>
              <p className="text-stone-500">Mercredi - Dimanche • Salon & E-Shop</p>
              <div className="pt-2">
                <Link
                  href="/cafe-brunch"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#C86D51] font-medium flex items-center gap-1 hover:underline"
                >
                  Réserver une table de Brunch →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
