'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Truck, ChevronRight, Coffee, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { STORE_INFO } from '@/data/products';

const ANNOUNCEMENTS = [
  {
    text: 'Brunch du week-end & salon de thé à Habsheim • Pofferts, brioches & lattes maison',
    icon: UtensilsCrossed,
    badge: 'Brunch Môme',
    link: '/cafe-brunch',
  },
  {
    text: 'Concept store au 17 rue du Maréchal Foch / rue du Général de Gaulle, 68440 Habsheim',
    icon: MapPin,
    badge: 'Habsheim',
    link: '/la-boutique',
  },
  {
    text: 'Livraison offerte dès 60€ • Retrait gratuit sous 2h en boutique à Habsheim',
    icon: Truck,
    badge: 'Click & Collect',
    link: '/catalogue',
  },
  {
    text: '10% offerts avec le code BIENVENUE10 ou le code HABSHEIM pour les voisins !',
    icon: Sparkles,
    badge: 'Offre',
    link: '/catalogue',
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-[#1E1E1E] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#2C2C2C] relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-[#C98A3C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51] animate-ping" />
          <span className="font-serif italic text-stone-300">Concept store & Coffee shop • Habsheim (Alsace)</span>
        </div>

        <Link
          href={current.link}
          className="flex-1 flex items-center justify-center gap-2 transition-opacity duration-300 hover:text-amber-200"
        >
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium tracking-wider uppercase bg-[#C86D51] text-white">
            {current.badge}
          </span>
          <Icon className="w-3.5 h-3.5 text-[#E4D8C4] shrink-0" />
          <span className="truncate tracking-wide text-stone-200 hover:text-white">
            {current.text}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3 text-stone-400">
          <Link
            href="/cafe-brunch"
            className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
          >
            Réserver un brunch <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
