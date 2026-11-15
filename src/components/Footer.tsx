'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Heart, Coffee, UtensilsCrossed } from 'lucide-react';
import { STORE_INFO, CATEGORIES } from '@/data/products';

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-[#FAF8F5] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand & Concept Store Intro */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-3xl tracking-widest font-medium text-white">
                MÔME
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-[#C98A3C] uppercase font-sans font-medium">
                by print line • habsheim
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Le concept store hybride fondé par Angela & Daniela à Habsheim (Alsace). Prêt-à-porter féminin, céramiques, créations Print Line et salon de thé / brunch gourmand maison.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/mome_boutique"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 hover:text-white hover:bg-[#C86D51] transition-colors"
                aria-label="Suivez-nous sur Instagram @mome_boutique"
                title="@mome_boutique"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <span className="text-xs text-stone-400">@mome_boutique</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C98A3C] mb-4">
              L’Univers Môme
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/cafe-brunch" className="text-amber-200 hover:text-white transition-colors flex items-center gap-1 font-semibold">
                  <UtensilsCrossed className="w-3.5 h-3.5" /> Le Café & Brunch
                </Link>
              </li>
              <li>
                <Link href="/cafe-brunch#carte" className="hover:text-white transition-colors">
                  Carte des douceurs & boissons
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogue?cat=${cat.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catalogue" className="hover:text-white transition-colors font-medium text-stone-300">
                  Toutes les nouveautés
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Client */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C98A3C] mb-4">
              Service & Retrait
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/la-boutique" className="hover:text-white transition-colors">
                  Click & Collect à Habsheim (2h)
                </Link>
              </li>
              <li>
                <Link href="/cafe-brunch#reserver" className="hover:text-white transition-colors">
                  Réserver une table de brunch
                </Link>
              </li>
              <li>
                <span className="text-stone-400">Livraison Colissimo dès 60€</span>
              </li>
              <li>
                <span className="text-stone-400">Retours & échanges (14 jours)</span>
              </li>
              <li>
                <span className="text-stone-400">Paiement 100% sécurisé</span>
              </li>
            </ul>
          </div>

          {/* Physical Store Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#C98A3C] mb-4">
              La Boutique à Habsheim
            </h4>
            <div className="flex items-start gap-2 text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
              <span>
                {STORE_INFO.address}<br />
                {STORE_INFO.city} (Alsace)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Phone className="w-4 h-4 text-[#C86D51] shrink-0" />
              <span>{STORE_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Mail className="w-4 h-4 text-[#C86D51] shrink-0" />
              <span>{STORE_INFO.email}</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-stone-400 pt-1">
              <Clock className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
              <span>
                Mer - Sam : 09h30 - 17h00<br />
                Dimanche (Brunch) : 10h00 - 15h00
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Môme by Print Line • Habsheim 68440. Tous droits réservés.</p>
          <p className="flex items-center gap-1 text-stone-400">
            Fait avec <Heart className="w-3 h-3 text-[#C86D51] fill-[#C86D51]" /> par Angela & Daniela
          </p>
          <div className="flex items-center gap-3 text-stone-400 font-medium">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
            <span>CB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
