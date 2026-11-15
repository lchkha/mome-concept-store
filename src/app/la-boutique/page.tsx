'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Store,
  Sparkles,
  ArrowRight,
  Coffee,
  ShoppingBag,
  UtensilsCrossed
} from 'lucide-react';
import { STORE_INFO } from '@/data/products';

export default function LaBoutiquePage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF3ED] border border-[#F2D7C5] text-xs font-semibold text-[#C86D51] uppercase tracking-wider mb-4">
          <Store className="w-3.5 h-3.5" />
          Habsheim (68440) • Alsace
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 font-medium tracking-tight">
          La Boutique Môme by Print Line
        </h1>
        <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
          Le concept store lifestyle & coffee shop fondé par Angela et Daniela au cœur de Habsheim, à deux pas de Mulhouse.
        </p>
      </section>

      {/* 2. Visual Atmospheric Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-md border-4 border-white bg-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=80"
              alt="Façade de la boutique Môme à Habsheim"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6 text-white">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-200 font-semibold">17 Rue du Maréchal Foch</p>
                <p className="font-serif text-lg font-medium">Boutique & Atelier à Habsheim</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden shadow-md border-4 border-white bg-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80"
              alt="Le coin café et brunch de Môme"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6 text-white">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-200 font-semibold">L’Espace Coffee Shop</p>
                <p className="font-serif text-lg font-medium">Brunch du week-end & lattes maison</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden shadow-md border-4 border-white bg-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80"
              alt="Le dressing prêt-à-porter féminin"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6 text-white">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-200 font-semibold">Le Dressing Môme</p>
                <p className="font-serif text-lg font-medium">Mode femme, maroquinerie & bijoux</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Story & Spirit */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E7E1D7] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C86D51]">
                Notre Histoire
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
                Une création de deux sœurs passionnées : Angela et Daniela.
              </h2>
              <div className="space-y-4 text-stone-600 text-sm leading-relaxed font-light">
                <p>
                  Fondée en 1996 sous le nom de <strong className="text-stone-900 font-medium">Print Line</strong>, notre maison alsacienne s’est d’abord fait connaître pour ses créations graphiques et impressions personnalisées haut de gamme (notamment des papiers peints d’artistes et supports textiles).
                </p>
                <p>
                  Animées par l’envie de créer un véritable lieu de vie et de partage à Habsheim, Angela et Daniela ont imaginé <strong className="text-stone-900 font-medium">Môme</strong> : un concept store où l’on vient pour le plaisir des yeux (prêt-à-porter, bijoux, déco, papeterie) et celui des papilles (brunch savoureux, tartines avocado, pofferts et cafés de spécialité).
                </p>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
                  <Coffee className="w-5 h-5 text-[#C86D51] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900">Coffee Shop & Brunch</h3>
                    <p className="text-[11px] text-stone-500">Service continu du mercredi au dimanche.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
                  <ShoppingBag className="w-5 h-5 text-[#4A5D4E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-stone-900">Click & Collect 2h</h3>
                    <p className="text-[11px] text-stone-500">Retirez gratuitement vos commandes en boutique.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical info card */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E7E1D7] space-y-6">
              <h3 className="font-serif text-xl font-medium text-stone-900 border-b border-[#E7E1D7] pb-3">
                Coordonnées & Accès
              </h3>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C86D51] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">Adresse</p>
                    <p>{STORE_INFO.address}</p>
                    <p>{STORE_INFO.city} • Alsace</p>
                    <p className="text-stone-400 mt-1">À 10 min de Mulhouse • A35 sortie Habsheim • Parking facile</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C86D51] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-900">Horaires Boutique & Café</p>
                    {STORE_INFO.hours.map((h, i) => (
                      <div key={i} className="flex justify-between gap-4 mt-0.5">
                        <span className="text-stone-600">{h.days} :</span>
                        <span className="font-medium">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C86D51] shrink-0" />
                  <div>
                    <p className="font-bold text-stone-900">Téléphone (Boutique & Brunch)</p>
                    <p>{STORE_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C86D51] shrink-0" />
                  <div>
                    <p className="font-bold text-stone-900">Email</p>
                    <p>{STORE_INFO.email}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(STORE_INFO.address + ' ' + STORE_INFO.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E1E1E] hover:bg-[#C86D51] text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Ouvrir dans Google Maps</span>
                </a>

                <Link
                  href="/cafe-brunch#reserver"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C86D51] hover:bg-[#B55B40] text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Réserver une table de Brunch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Click & Collect Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4A5D4E]">
            Retrait Immédiat à Habsheim
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 mt-1">
            Le Click & Collect en 3 étapes simples
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-light">
            Commandez en ligne et venez récupérer vos pièces lors de votre pause café à Habsheim.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#E7E1D7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF3ED] text-[#C86D51] font-bold text-lg flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Choisissez sur l’E-Shop
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sélectionnez l’option &ldquo;Click & Collect Retrait Habsheim&rdquo; au checkout. C’est 100% gratuit, sans minimum.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7E1D7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#EBF0EC] text-[#4A5D4E] font-bold text-lg flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Préparation sous 2 heures
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Angela ou Daniela prépare votre pochon avec soin. Vous recevez un SMS dès que votre commande est disponible.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7E1D7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F2EDE4] text-stone-800 font-bold text-lg flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Retrait & Moment Détente
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Passez récupérer votre colis au 17 rue du Maréchal Foch et profitez-en pour déguster un café ou un cookie maison !
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
