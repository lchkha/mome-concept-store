'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Truck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const ANNOUNCEMENTS = [
  {
    text: 'Livraison Colissimo offerte dès 60€ • Retrait gratuit sous 2h en boutique à Nantes',
    icon: Truck,
    badge: 'Livraison',
  },
  {
    text: '10% offerts sur votre première commande avec le code BIENVENUE10',
    icon: Sparkles,
    badge: 'Offre',
  },
  {
    text: 'Retrouvez notre sélection déco & mode au 14 rue des Carmélites',
    icon: MapPin,
    badge: 'La Boutique',
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
          <span className="font-serif italic text-stone-300">Concept store lifestyle indépendant</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 transition-opacity duration-300">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium tracking-wider uppercase bg-[#C86D51] text-white">
            {current.badge}
          </span>
          <Icon className="w-3.5 h-3.5 text-[#E4D8C4] shrink-0" />
          <span className="truncate tracking-wide text-stone-200">
            {current.text}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 text-stone-400">
          <Link
            href="/la-boutique"
            className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
          >
            Horaires boutique <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
