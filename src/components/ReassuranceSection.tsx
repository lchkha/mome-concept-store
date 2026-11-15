'use client';

import React from 'react';
import { Truck, Store, Gift, ShieldCheck } from 'lucide-react';

const REASSURANCE_ITEMS = [
  {
    icon: Truck,
    title: 'Livraison offerte dès 60€',
    description: 'Expédition rapide et soignée sous 24 à 48h partout en France métropolitaine.',
  },
  {
    icon: Store,
    title: 'Click & Collect sous 2h',
    description: 'Commandez en ligne et retirez gratuitement vos achats à notre boutique à Nantes.',
  },
  {
    icon: Gift,
    title: 'Emballage cadeau délicat',
    description: 'Papier de soie parfumé, ruban en sergé de coton et petit mot personnalisé offert.',
  },
  {
    icon: ShieldCheck,
    title: 'Paiement sécurisé & retours',
    description: 'Transactions chiffrées SSL, CB, Apple Pay et retours possibles sous 14 jours.',
  },
];

export default function ReassuranceSection() {
  return (
    <section className="py-12 bg-white border-y border-[#E7E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASSURANCE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-2">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E7E1D7] flex items-center justify-center text-[#C86D51] shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
