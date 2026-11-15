'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Coffee,
  UtensilsCrossed,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  Phone,
  MapPin,
  Heart,
  ArrowRight,
  Flame,
  Star
} from 'lucide-react';
import { STORE_INFO, BRUNCH_MENU } from '@/data/products';
import { useShop } from '@/context/ShopContext';

export default function CafeBrunchPage() {
  const { showToast } = useShop();
  const [activeMenuTab, setActiveMenuTab] = useState<'sales' | 'sucres' | 'boissons'>('sales');

  // Booking Form State
  const [bookingDate, setBookingDate] = useState('2026-11-22');
  const [bookingTime, setBookingTime] = useState('12h00 - 13h45');
  const [bookingGuests, setBookingGuests] = useState('2');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) {
      showToast('Veuillez renseigner votre nom et votre numéro de téléphone', 'error');
      return;
    }
    setIsBooked(true);
    showToast(`Table réservée pour le Brunch Môme le ${bookingDate} à ${bookingTime} !`, 'success');
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. HERO BANNER CAFÉ & BRUNCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white min-h-[480px] flex items-center p-8 sm:p-14 lg:p-20 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1600&q=80"
            alt="Le Brunch gourmand chez Môme à Habsheim"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-amber-200">
              <Coffee className="w-3.5 h-3.5" />
              Salon de Thé & Brunch à Habsheim (68440)
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.15]">
              Le Café & Brunch Gourmand de Môme
            </h1>

            <p className="text-base sm:text-lg text-stone-200 font-light leading-relaxed">
              Des assiettes généreuses préparées minute avec amour, des recettes inspirées de nos racines italiennes, du bon café de spécialité et des pâtisseries réconfortantes au cœur de Habsheim.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#reserver"
                className="px-8 py-3.5 rounded-full bg-[#C86D51] hover:bg-[#B55B40] text-white text-xs sm:text-sm font-medium transition-all shadow-lg flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver une table de Brunch</span>
              </a>
              <a
                href="#carte"
                className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-stone-900 text-xs sm:text-sm font-medium transition-all"
              >
                Voir la carte gourmande
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-stone-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-300" /> Du mercredi au dimanche
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-300" /> Habsheim (Haut-Rhin)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ATMOSPHÈRE & INSPIRATION (ANGELA & DANIELA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C86D51]">
              L’Âme de notre coffee shop
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium leading-tight">
              Un lieu pensé par Angela & Daniela pour faire vibrer Habsheim.
            </h2>
            <div className="space-y-4 text-stone-600 text-sm leading-relaxed font-light">
              <p>
                Chez Môme, nous voulions dépasser la simple boutique. En plein cœur du village de Habsheim, nous avons créé un havre de convivialité où l’on vient savourer un latte fumant en feuilletant un magazine, partager une brioche perdue caramélisée entre amies ou bruncher en famille le dimanche matin.
              </p>
              <p>
                Toutes nos préparations salées et sucrées sont cuisinées sur place avec des produits frais. Nos plats phares – la brioche <em>Carbomôme</em> au guanciale croustillant, notre pita <em>Tartufo</em> à la stracciatella ou nos fameux <em>Pofferts</em> – réconcilient gourmandise et fraîcheur.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-[#E7E1D7] shadow-2xs">
                <p className="font-serif text-2xl font-bold text-[#C86D51]">Fait Maison</p>
                <p className="text-xs text-stone-500 mt-0.5">Pains briochés, sauces & pâtisseries du jour</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E7E1D7] shadow-2xs">
                <p className="font-serif text-2xl font-bold text-[#4A5D4E]">2h de Plaisir</p>
                <p className="text-xs text-stone-500 mt-0.5">Créneaux confortables pour savourer sans stress</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80"
                alt="Pofferts pancakes de Môme"
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-md mt-6">
              <Image
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
                alt="Brioche salée Carbomome"
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. LA CARTE GOURMANDE INTERACTIVE */}
      <section id="carte" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C86D51]">
            Menu de Saison
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 mt-1">
            La Carte du Café & Brunch
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-light">
            Disponible au café de Habsheim. Servi en continu pendant les horaires de brunch.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-[#F2EDE4] p-1.5 rounded-full gap-1">
            <button
              onClick={() => setActiveMenuTab('sales')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeMenuTab === 'sales'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Les Plats Salés (Brunch)
            </button>
            <button
              onClick={() => setActiveMenuTab('sucres')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeMenuTab === 'sucres'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Les Douceurs Sucrées
            </button>
            <button
              onClick={() => setActiveMenuTab('boissons')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeMenuTab === 'boissons'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Cafés, Lattes & Boissons
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        {activeMenuTab === 'sales' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {(BRUNCH_MENU?.sales || []).map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-white rounded-2xl border border-[#E7E1D7] shadow-2xs hover:border-[#DACFC0] transition-colors"
              >
                <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-[#F2EDE4]">
                  <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-medium text-stone-900">{item.name}</h3>
                      <span className="text-sm font-bold text-[#C86D51] shrink-0">{item.price}</span>
                    </div>
                    {item.badge && (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FAF3ED] text-[#C86D51] mt-0.5">
                        {item.badge}
                      </span>
                    )}
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMenuTab === 'sucres' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {(BRUNCH_MENU?.sucres || []).map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-white rounded-2xl border border-[#E7E1D7] shadow-2xs hover:border-[#DACFC0] transition-colors"
              >
                <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-[#F2EDE4]">
                  <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-medium text-stone-900">{item.name}</h3>
                      <span className="text-sm font-bold text-[#C86D51] shrink-0">{item.price}</span>
                    </div>
                    {item.badge && (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FAF3ED] text-[#C86D51] mt-0.5">
                        {item.badge}
                      </span>
                    )}
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMenuTab === 'boissons' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E1D7] max-w-3xl mx-auto shadow-2xs animate-fade-in divide-y divide-[#E7E1D7]">
            {(BRUNCH_MENU?.boissons || []).map((boisson, i) => (
              <div key={i} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-900">{boisson.name}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{boisson.desc}</p>
                </div>
                <span className="text-sm font-bold text-[#C86D51] shrink-0">{boisson.price}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. MODULE DE RÉSERVATION DE TABLE DE BRUNCH */}
      <section id="reserver" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E1D7] shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4A5D4E]">
              Réservation en direct
            </span>
            <h2 className="font-serif text-3xl font-medium text-stone-900 mt-1">
              Réserver votre Brunch à Habsheim
            </h2>
            <p className="text-xs text-stone-500 mt-2">
              Les tables partent vite pour le week-end ! Réservez votre créneau de 1h45 pour savourer notre carte en toute sérénité.
            </p>
          </div>

          {isBooked ? (
            <div className="p-8 bg-[#FAF8F5] rounded-2xl border border-[#4A5D4E]/30 text-center space-y-3 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#EBF0EC] text-[#4A5D4E] flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">
                Demande de réservation enregistrée !
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Merci {bookingName}, votre table pour <strong>{bookingGuests} personne(s)</strong> le <strong>{bookingDate}</strong> sur le créneau <strong>{bookingTime}</strong> est bien notée.
              </p>
              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 max-w-sm mx-auto text-left">
                <p>📍 <strong>Lieu :</strong> Môme by Print Line, 17 rue du Maréchal Foch, 68440 Habsheim</p>
                <p className="mt-1">📞 <strong>Contact boutique :</strong> 03 89 44 67 92</p>
              </div>
              <button
                onClick={() => setIsBooked(false)}
                className="mt-4 text-xs text-[#C86D51] font-semibold underline"
              >
                Faire une autre réservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C86D51]" /> Date souhaitée
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C86D51]" /> Créneau de service
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51] bg-white cursor-pointer"
                  >
                    {STORE_INFO.brunchSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C86D51]" /> Nombre de personnes
                  </label>
                  <select
                    value={bookingGuests}
                    onChange={(e) => setBookingGuests(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51] bg-white cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} convive{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Nom et Prénom
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Élodie Meyer"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Numéro de portable
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 06 12 34 56 78"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Allergies ou remarques particulières (optionnel)
                </label>
                <textarea
                  rows={2}
                  placeholder="Végétarien, sans gluten, chaise haute pour bébé..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#C86D51] hover:bg-[#B55B40] text-white font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Confirmer ma table de Brunch</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
            <span>📞 Réservations également possibles par téléphone au <strong>{STORE_INFO.phone}</strong></span>
            <span className="text-[#4A5D4E] font-medium">Réponse et accueil chaleureux garantis</span>
          </div>
        </div>
      </section>
    </div>
  );
}
