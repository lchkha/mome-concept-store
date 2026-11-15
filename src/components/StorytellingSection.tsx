'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Sparkles, MapPin, ArrowRight } from 'lucide-react';

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
                  alt="La boutique Môme by Print Line à Nantes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Inset Photo */}
              <div className="absolute -bottom-8 -left-6 sm:-bottom-10 sm:-left-10 w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                  alt="Détails céramiques et bougies"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white p-4 rounded-2xl shadow-lg border border-[#E7E1D7] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3ED] flex items-center justify-center text-[#C86D51]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif text-sm font-semibold text-stone-900">Boutique & Atelier</p>
                  <p className="text-[11px] text-stone-500">Depuis 2018 à Nantes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Storytelling */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E1D7] text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
              <Heart className="w-3.5 h-3.5 fill-[#C86D51]" />
              L’Esprit du Concept Store
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium leading-tight">
              Des objets choisis avec le cœur, pensés pour embellir votre quotidien.
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                Née d’une passion pour l’artisanat sincère, les matières naturelles et l’art de vivre méditerranéen,{' '}
                <strong className="text-stone-900 font-semibold">Môme by Print Line</strong> est bien plus qu’une simple boutique en ligne.
              </p>
              <p>
                Dans notre écrin situé au cœur du quartier historique des Carmélites à Nantes, nous sélectionnons chaque pièce une à une auprès de créateurs indépendants, de petits ateliers de confection textile éthique et de céramistes passionnés.
              </p>
              <p>
                Du lin lavé français aux bougies coulées à la cire végétale de soja, chaque trésor raconte une histoire : celle du temps pris pour bien faire les choses, de la douceur des couleurs apaisantes et du plaisir d’offrir.
              </p>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E7E1D7]">
                <p className="font-serif text-2xl font-bold text-[#C86D51]">100%</p>
                <p className="text-xs text-stone-600 mt-1">Curation indépendante & coups de cœur authentiques</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E7E1D7]">
                <p className="font-serif text-2xl font-bold text-[#4A5D4E]">2h</p>
                <p className="text-xs text-stone-600 mt-1">Click & Collect express gratuit en boutique physique</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/la-boutique"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1E1E] hover:bg-[#C86D51] text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm"
              >
                <span>Visiter notre boutique à Nantes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <MapPin className="w-4 h-4 text-[#C86D51]" />
                <span>14 Rue des Carmélites, Nantes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
