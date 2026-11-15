'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Calendar,
  Coffee,
  UtensilsCrossed,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  ChevronRight,
  Star,
  ShoppingBag
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRUNCH_MENU, STORE_INFO } from '@/data/products';
import ProductCard from '@/components/ProductCard';
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
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. HERO SECTION HYBRIDE SPECTACULAIRE */}
      <section className="relative overflow-hidden pt-4 sm:pt-8 pb-12 sm:pb-16 bg-linear-to-b from-[#FBF8F3] via-[#F6EEE4] to-[#FBF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF0E8] border border-[#E8D4C8] text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Habsheim (68440) • Création Angela & Daniela</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2C211B] font-medium tracking-tight leading-[1.12]">
              Concept Store Chaleureux & <br />
              <span className="italic font-normal text-[#C86D51]">Café Brunch Gourmand</span>
            </h1>

            <p className="text-base sm:text-lg text-[#63554B] font-light leading-relaxed max-w-2xl mx-auto">
              Une adresse unique en Alsace où l’on vient pour déguster les meilleurs <em>Pofferts</em> et brioches salées de la région, flâner parmi une sélection soignée de mode féminine, de déco et de créations d’imprimerie <em>Print Line</em>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/cafe-brunch#reserver"
                className="px-7 py-3.5 rounded-full bg-[#C86D51] hover:bg-[#B5583E] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver une table de Brunch</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/catalogue"
                className="px-7 py-3.5 rounded-full bg-[#2C211B] hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Découvrir l’E-Shop Boutique</span>
              </Link>
            </div>
          </div>

          {/* TWO MAIN DESTINATIONS : BRUNCH vs BOUTIQUE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8">
            {/* DESTINATION 1 : LE CAFÉ & BRUNCH */}
            <div className="group relative rounded-3xl overflow-hidden shadow-mome bg-[#FAF4ED] border border-[#EAE0D6] flex flex-col justify-between p-6 sm:p-8 hover:border-[#C86D51]/50 transition-all duration-300">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-6 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80"
                  alt="Le brunch chez Môme à Habsheim"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#C86D51] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  Salon de Thé & Brunch
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2C211B]">
                    L’Espace Coffee Shop
                  </h2>
                  <span className="text-xs font-semibold text-[#4A5D4E] bg-[#EBF0EC] px-2.5 py-0.5 rounded-full">
                    Mercredi au Dimanche
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#63554B] leading-relaxed font-light">
                  Tartines Avocado & Feta, brioches <em>Carbomôme</em> au guanciale, pitas <em>Tartufo</em>, mini pancakes <em>Pofferts</em> fondants et lattes de spécialité cuisinés maison.
                </p>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#EAE0D6]">
                  <Link
                    href="/cafe-brunch"
                    className="text-xs font-bold text-[#C86D51] hover:underline flex items-center gap-1"
                  >
                    <span>Voir toute la carte du Brunch</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/cafe-brunch#reserver"
                    className="px-4 py-2 rounded-full bg-white border border-[#D8C7B8] hover:border-[#C86D51] text-xs font-semibold text-[#2C211B] transition-colors"
                  >
                    Réserver un créneau →
                  </Link>
                </div>
              </div>
            </div>

            {/* DESTINATION 2 : LA BOUTIQUE & E-SHOP */}
            <div className="group relative rounded-3xl overflow-hidden shadow-mome bg-[#F7F2EB] border border-[#EAE0D6] flex flex-col justify-between p-6 sm:p-8 hover:border-[#C86D51]/50 transition-all duration-300">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-6 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80"
                  alt="La boutique concept store Môme à Habsheim"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#4A5D4E] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  Concept Store Lifestyle
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2C211B]">
                    La Boutique Mode & Déco
                  </h2>
                  <span className="text-xs font-semibold text-[#C86D51] bg-[#FAF3ED] px-2.5 py-0.5 rounded-full">
                    Click & Collect 2h
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#63554B] leading-relaxed font-light">
                  Blouses romantiques, pulls alpagas, céramiques uniques, bijoux dorés, bougies végétales et papiers peints exclusifs issus de l’atelier <em>Print Line</em>.
                </p>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#EAE0D6]">
                  <Link
                    href="/catalogue"
                    className="text-xs font-bold text-[#C86D51] hover:underline flex items-center gap-1"
                  >
                    <span>Explorer le catalogue ({PRODUCTS.length} pièces)</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/la-boutique"
                    className="px-4 py-2 rounded-full bg-white border border-[#D8C7B8] hover:border-[#C86D51] text-xs font-semibold text-[#2C211B] transition-colors"
                  >
                    La boutique à Habsheim →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LE BRUNCH EN VEDETTE : LES SAVEURS DE MÔME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF3ED] rounded-3xl p-8 sm:p-12 border border-[#F0DDCF] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C86D51] mb-2">
                <Coffee className="w-4 h-4" />
                Cuisiné Minute avec Amour à Habsheim
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2C211B] font-medium">
                Les Incontournables du Brunch
              </h2>
              <p className="mt-1 text-sm text-[#63554B] font-light">
                Une cuisine généreuse, colorée et gourmande à savourer du mercredi au dimanche.
              </p>
            </div>

            <Link
              href="/cafe-brunch"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C86D51] text-white text-xs font-semibold hover:bg-[#B5583E] transition-colors shadow-xs"
            >
              <span>Voir toute la carte & réserver</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dish 1: Avocado */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBDCD0] shadow-2xs space-y-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
                  alt="Tartine Avocado & Feta"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-base font-semibold text-[#2C211B]">Tartine Avocado</h3>
                  <span className="text-xs font-bold text-[#C86D51]">13.50 €</span>
                </div>
                <p className="text-[11px] text-[#786C63] mt-1 line-clamp-2">
                  Pain de campagne toasté, avocat écrasé au citron vert, feta AOP & grenade.
                </p>
              </div>
            </div>

            {/* Dish 2: Carbomome */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBDCD0] shadow-2xs space-y-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
                  alt="Brioche Carbomome"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-base font-semibold text-[#2C211B]">Brioche Carbomôme</h3>
                  <span className="text-xs font-bold text-[#C86D51]">15.00 €</span>
                </div>
                <p className="text-[11px] text-[#786C63] mt-1 line-clamp-2">
                  Brioche snackée, crème onctueuse au parmesan, guanciale croustillant & œuf.
                </p>
              </div>
            </div>

            {/* Dish 3: Pofferts */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBDCD0] shadow-2xs space-y-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80"
                  alt="Pofferts pancakes Mome"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-base font-semibold text-[#2C211B]">Les Pofferts Môme</h3>
                  <span className="text-xs font-bold text-[#C86D51]">9.50 €</span>
                </div>
                <p className="text-[11px] text-[#786C63] mt-1 line-clamp-2">
                  Mini pancakes hollandais dorés au coulis de chocolat noir noisette maison.
                </p>
              </div>
            </div>

            {/* Dish 4: Brioche perdue */}
            <div className="bg-white rounded-2xl p-4 border border-[#EBDCD0] shadow-2xs space-y-3">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80"
                  alt="Brioche Perdue Caramel"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-base font-semibold text-[#2C211B]">Brioche Perdue</h3>
                  <span className="text-xs font-bold text-[#C86D51]">10.50 €</span>
                </div>
                <p className="text-[11px] text-[#786C63] mt-1 line-clamp-2">
                  Caramélisée au beurre salé maison & crème fouettée à la vanille bourbon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LES 4 UNIVERS DE LA BOUTIQUE CONCEPT STORE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#C86D51] mb-2">
            La Boutique en Ligne & à Habsheim
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C211B] font-medium">
            Quatre univers de créateurs & coups de cœur
          </h2>
          <p className="mt-2 text-sm text-[#63554B] font-light">
            Pièces sélectionnées une à une par Angela & Daniela pour enrichir votre quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogue?cat=${cat.id}`}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-mome hover:shadow-xl transition-all duration-300 border border-[#EAE0D6] flex flex-col justify-end p-6"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/25 to-transparent group-hover:from-stone-950/90 transition-all" />

              <div className="relative z-10 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-xs mb-2">
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

      {/* 4. LES COUPS DE CŒUR DE LA SÉLECTION BOUTIQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C86D51] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              La Sélection Exclusive
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2C211B] font-medium">
              Les Pépites du Moment
            </h2>
            <p className="mt-1 text-sm text-[#63554B] font-light">
              Mode femme douce, créations d’atelier et objets d’artisanat disponibles en livraison ou retrait boutique.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-[#F3ECE2] p-1.5 rounded-full self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-[#2C211B] shadow-xs font-semibold'
                  : 'text-[#63554B] hover:text-[#2C211B]'
              }`}
            >
              Tous ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'new'
                  ? 'bg-white text-[#2C211B] shadow-xs font-semibold'
                  : 'text-[#63554B] hover:text-[#2C211B]'
              }`}
            >
              Nouveautés
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'bestsellers'
                  ? 'bg-white text-[#2C211B] shadow-xs font-semibold'
                  : 'text-[#63554B] hover:text-[#2C211B]'
              }`}
            >
              Best-sellers
            </button>
            <button
              onClick={() => setActiveTab('under50')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'under50'
                  ? 'bg-white text-[#2C211B] shadow-xs font-semibold'
                  : 'text-[#63554B] hover:text-[#2C211B]'
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#F3ECE2] border border-[#D8C7B8] text-[#2C211B] text-xs sm:text-sm font-semibold transition-all shadow-xs"
          >
            <span>Explorer tous nos {PRODUCTS.length} articles</span>
            <ChevronRight className="w-4 h-4 text-[#C86D51]" />
          </Link>
        </div>
      </section>

      {/* 5. L'ESPRIT DE LA MAISON À HABSHEIM & PRINT LINE */}
      <section className="py-16 sm:py-20 bg-[#F5EEE5]/70 border-y border-[#EAE0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80"
                  alt="La maison Môme à Habsheim"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-4 bg-white rounded-2xl shadow-lg border border-[#EAE0D6] max-w-[240px] hidden sm:block">
                <p className="font-serif text-sm font-semibold text-[#2C211B]">Angela & Daniela</p>
                <p className="text-[11px] text-[#786C63] mt-0.5">À votre rencontre chaque semaine à Habsheim.</p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE0D6] text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
                <Heart className="w-3.5 h-3.5 fill-[#C86D51]" />
                L’Histoire de Deux Sœurs
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#2C211B] font-medium leading-tight">
                Une création alsacienne née de la passion du beau et du bon.
              </h2>

              <div className="space-y-4 text-[#63554B] text-sm leading-relaxed font-light">
                <p>
                  Depuis 1996, l’entreprise <strong className="text-[#2C211B] font-semibold">Print Line</strong> imagine et imprime des créations visuelles d’exception. Avec <strong className="text-[#2C211B] font-semibold">Môme</strong> à Habsheim, les deux sœurs ont voulu prolonger cette aventure en ouvrant leurs portes au public.
                </p>
                <p>
                  Dans cette maison conviviale du 17 rue du Maréchal Foch, on vient pour la douceur d’un café matinal, la générosité d’un brunch partagé entre proches, ou pour dénicher la pièce coup de cœur qui apportera de la lumière à votre garde-robe ou votre intérieur.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/la-boutique"
                  className="px-6 py-3 rounded-full bg-[#2C211B] hover:bg-[#C86D51] text-white text-xs sm:text-sm font-medium transition-colors shadow-xs"
                >
                  Visiter la boutique à Habsheim
                </Link>
                <a
                  href="tel:0389446792"
                  className="px-6 py-3 rounded-full bg-white hover:bg-stone-50 border border-[#D8C7B8] text-[#2C211B] text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C86D51]" />
                  <span>03 89 44 67 92</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANDEAU DE RÉASSURANCE */}
      <ReassuranceSection />

      {/* 7. NEWSLETTER PRIVILÈGE */}
      <NewsletterSection />
    </div>
  );
}
