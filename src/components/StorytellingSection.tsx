'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Sparkles, MapPin, ArrowRight, Coffee, UtensilsCrossed } from 'lucide-react';
import { STORE_INFO } from '@/data/products';

export default function StorytellingSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F2EDE4]/60 border-y border-[#E7E1D7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photos Grid */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo */}
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80"
                  alt="Le concept store et salon Môme by Print Line à Habsheim"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Inset Photo (Brunch / Coffee) */}
              <div className="absolute -bottom-8 -left-6 sm:-bottom-10 sm:-left-10 w-48 sm:w-60 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
                  alt="Brunch et cafés gourmands de Môme"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white p-4 rounded-2xl shadow-lg border border-[#E7E1D7] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3ED] flex items-center justify-center text-[#C86D51]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif text-sm font-semibold text-stone-900">Angela & Daniela</p>
                  <p className="text-[11px] text-stone-500">Fondatrices • Habsheim (Alsace)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Storytelling */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E1D7] text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
              <Heart className="w-3.5 h-3.5 fill-[#C86D51]" />
              L’Aventure Familiale
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium leading-tight">
              De l’atelier d’impression textile Print Line au concept store & brunch gourmand.
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                À l’origine, il y a <strong className="text-stone-900 font-semibold">Print Line</strong>, entreprise alsacienne créée en 1996 par deux sœurs complices, <strong className="text-stone-900 font-semibold">Angela et Daniela</strong>, expertes en création visuelle et impression sur-mesure (notamment de papiers peints de créateurs).
              </p>
              <p>
                Animées par la passion de l’art de vivre, de la mode féminine et de la bonne cuisine inspirée de leurs racines, elles ont transformé leur espace à <strong className="text-stone-900 font-semibold">Habsheim</strong> en un concept store hybride unique : <strong className="text-stone-900 font-semibold">Môme</strong>.
              </p>
              <p>
                Ici, on vient dénicher une blouse en coton bio, une bougie au parfum délicat, mais aussi s’attabler pour déguster des <em>Pofferts</em> croustillants, une brioche <em>Carbomôme</em> au parmesan et un latte crémeux préparé minute.
              </p>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E7E1D7]">
                <p className="font-serif text-2xl font-bold text-[#C86D51]">Boutique</p>
                <p className="text-xs text-stone-600 mt-1">Prêt-à-porter féminin, déco & papeterie d’artisanat</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E7E1D7]">
                <p className="font-serif text-2xl font-bold text-[#4A5D4E]">Café / Brunch</p>
                <p className="text-xs text-stone-600 mt-1">Recettes maison gourmandes, cafés & lattes de spécialité</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/cafe-brunch"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1E1E] hover:bg-[#C86D51] text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Découvrir le Café & Brunch</span>
              </Link>
              <Link
                href="/la-boutique"
                className="inline-flex items-center gap-1.5 text-xs text-stone-700 hover:text-[#C86D51] font-semibold"
              >
                <MapPin className="w-4 h-4 text-[#C86D51]" />
                <span>Habsheim, 17 rue du Maréchal Foch / rue du Général de Gaulle</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
