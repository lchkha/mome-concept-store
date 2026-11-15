'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Store,
  ChevronRight,
  Coffee,
  UtensilsCrossed,
  Calendar,
  MapPin
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRUNCH_MENU, STORE_INFO } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import StorytellingSection from '@/components/StorytellingSection';
import ReassuranceSection from '@/components/ReassuranceSection';
import NewsletterSection from '@/components/NewsletterSection';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'bestsellers' | 'under50'>('all');

  const filteredCoupsDeCoeur = PRODUCTS.filter((p) => {
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'bestsellers') return p.isBestseller;
    if (activeTab === 'under50') return p.price <= 50;
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION ÉDITORIALE */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column : Editorial Headline & CTA */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF3ED] border border-[#F2D7C5] text-xs font-semibold text-[#C86D51] tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Concept Store & Café Brunch • Habsheim (Alsace)</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 font-medium tracking-tight leading-[1.12]">
                L’art de vivre, la mode douce & <br />
                <span className="italic font-normal text-[#C86D51]">le brunch gourmand</span>.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Le concept store d’Angela & Daniela à Habsheim : une sélection pointue de prêt-à-porter féminin, céramiques, créations Print Line et un salon de thé convivial pour savourer le meilleur brunch d’Alsace.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  href="/cafe-brunch"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C86D51] hover:bg-[#B55B40] text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Le Café & Brunch</span>
                </Link>

                <Link
                  href="/catalogue"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#1E1E1E] hover:bg-stone-800 text-white text-sm font-medium transition-colors shadow-2xs"
                >
                  <span>L’E-Shop Boutique</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Micro-Badges */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-stone-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>Habsheim 68440</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#4A5D4E]" />
                  <span>Click & Collect sous 2h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C86D51]" />
                  <span>Brunch du mercredi au dimanche</span>
                </div>
              </div>
            </div>

            {/* Right Column : Lifestyle Image Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
                {/* Main Large Visual */}
                <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-stone-200">
                  <Image
                    src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80"
                    alt="Collection mode femme et salon Môme à Habsheim"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase tracking-widest text-amber-200 font-semibold mb-1">
                      Concept Store Hybride
                    </p>
                    <p className="font-serif text-xl sm:text-2xl font-medium">
                      Boutique & Salon de Thé Gourmand
                    </p>
                  </div>
                </div>

                {/* Overlapping Floating Card 1 : Brunch */}
                <div className="absolute -top-6 -left-4 sm:-top-8 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#E7E1D7] max-w-[210px] hidden sm:block animate-fade-in">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Coffee className="w-4 h-4 text-[#C86D51]" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">Brunch Maison</span>
                  </div>
                  <p className="font-serif text-sm font-semibold text-stone-900 leading-snug">
                    Pofferts, Carbomôme & Lattes d’exception
                  </p>
                </div>

                {/* Overlapping Floating Card 2 : Rating */}
                <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#E7E1D7] max-w-[220px] hidden sm:block animate-fade-in">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="w-4 h-4 text-[#C86D51] fill-[#C86D51]" />
                    <span className="text-xs font-bold text-stone-800">4.9 / 5</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    Une adresse incontournable adorée à Habsheim et dans le Haut-Rhin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION DÉDIÉE : L'ESPACE CAFÉ & BRUNCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF3ED] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#F2D7C5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-semibold uppercase tracking-wider text-[#C86D51] shadow-2xs">
                <Coffee className="w-3.5 h-3.5" />
                Le Coffee Shop Môme
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
                Installez-vous pour le brunch le plus gourmand de la région.
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                Tartines généreuses à l’avocat et feta AOP, brioches salées <em>Carbomôme</em> au parmesan et guanciale croustillant, mini pancakes <em>Pofferts</em> au chocolat coulant et lattes parfumés à la pistache : venez vous régaler dans une ambiance chaleureuse et lumineuse.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/cafe-brunch#reserver"
                  className="px-6 py-3 rounded-full bg-[#C86D51] hover:bg-[#B55B40] text-white text-xs sm:text-sm font-medium transition-colors shadow-md flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Réserver ma table de Brunch</span>
                </Link>
                <Link
                  href="/cafe-brunch#carte"
                  className="px-6 py-3 rounded-full bg-white text-stone-800 text-xs sm:text-sm font-medium border border-stone-300 hover:bg-stone-50 transition-colors"
                >
                  Consulter la carte complète
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80"
                    alt="Tartine Avocado Brunch Mome Habsheim"
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-white rounded-2xl border border-stone-200">
                  <p className="font-serif text-base font-semibold text-stone-900">La Tartine Avocado & Feta</p>
                  <p className="text-xs text-stone-500 mt-0.5">Pain de campagne toasté, grenade & graines torréfiées</p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80"
                    alt="Pofferts pancakes Mome Habsheim"
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-white rounded-2xl border border-stone-200">
                  <p className="font-serif text-base font-semibold text-stone-900">Les Pofferts Signature</p>
                  <p className="text-xs text-stone-500 mt-0.5">Baby pancakes moelleux & chocolat noir noisette</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UNIVERS & CATÉGORIES BOUTIQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C86D51] mb-2">
            La Sélection E-Shop
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
            Quatre univers choisis avec passion
          </h2>
          <p className="mt-2 text-sm text-stone-600 font-light">
            Découvrez nos pièces exclusives disponibles en livraison ou en Click & Collect à Habsheim.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogue?cat=${cat.id}`}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E7E1D7] flex flex-col justify-end p-6"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/30 to-transparent group-hover:from-stone-950/90 transition-all" />

              <div className="relative z-10 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-xs mb-2">
                  {cat.count} articles
                </span>
                <h3 className="font-serif text-2xl font-medium mb-1 group-hover:text-amber-200 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 font-light leading-relaxed mb-3">
                  {cat.tagline}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-amber-200 transition-colors">
                  <span>Découvrir l’univers</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. LES COUPS DE CŒUR BOUTIQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C86D51] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              La Sélection Exclusive
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              Les Coups de Cœur de la Boutique
            </h2>
            <p className="mt-1 text-sm text-stone-600 font-light">
              Des créations authentiques sélectionnées par Angela & Daniela pour embellir votre quotidien.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-[#F2EDE4] p-1.5 rounded-full self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tous ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'new'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Nouveautés
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'bestsellers'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Best-sellers
            </button>
            <button
              onClick={() => setActiveTab('under50')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'under50'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Moins de 50€
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredCoupsDeCoeur.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#F2EDE4] border border-stone-300 text-stone-800 text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-sm"
          >
            <span>Explorer tous nos {PRODUCTS.length} articles</span>
            <ChevronRight className="w-4 h-4 text-[#C86D51]" />
          </Link>
        </div>
      </section>

      {/* 5. STORYTELLING ANGELA & DANIELA (HABSHEIM) */}
      <StorytellingSection />

      {/* 6. BANDEAU DE RÉASSURANCE */}
      <ReassuranceSection />

      {/* 7. NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
}
