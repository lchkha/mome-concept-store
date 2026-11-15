'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  Store,
  MapPin,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Gift,
  Tag,
  ChevronLeft,
  Clock,
  Sparkles
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { STORE_INFO } from '@/data/products';

type DeliveryMethod = 'click_collect' | 'domicile' | 'relais';
type PaymentMethod = 'card' | 'apple_pay' | 'klarna';

export default function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    finalTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    clearCart,
    isFreeShipping,
  } = useShop();

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('click_collect');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');

  // Form inputs
  const [formData, setFormData] = useState({
    email: 'claire.valentin@gmail.com',
    firstName: 'Claire',
    lastName: 'Valentin',
    phone: '06 12 34 56 78',
    address: '28 Rue Crébillon',
    city: 'Nantes',
    postalCode: '44000',
    pickupTime: 'Aujourd’hui à partir de 14h30',
    cardNumber: '4970 •••• •••• 8821',
    cardExpiry: '09/28',
    cardCvc: '842',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculate Shipping fee
  let shippingCost = 0;
  if (deliveryMethod === 'click_collect') {
    shippingCost = 0;
  } else if (deliveryMethod === 'domicile') {
    shippingCost = isFreeShipping ? 0 : 5.90;
  } else if (deliveryMethod === 'relais') {
    shippingCost = isFreeShipping ? 0 : 3.90;
  }

  const grandTotal = Math.max(0, finalTotal + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoCodeInput.trim()) return;
    const res = applyPromo(promoCodeInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoCodeInput('');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderNum = `MOME-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderNumber(generatedOrderNum);
      setOrderConfirmed(true);
      setIsSubmitting(false);
      clearCart();

      // Launch celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C86D51', '#4A5D4E', '#E4D8C4', '#1E1E1E'],
        });
      } catch {
        // Ignore in environments where canvas is unavailable
      }
    }, 1200);
  };

  // If order is completed
  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-[#FAF3ED] text-[#C86D51] flex items-center justify-center mx-auto mb-6 shadow-md border border-[#F2D7C5]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-[#C86D51]">
          Commande confirmée avec succès
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-900 mt-2">
          Merci pour votre commande, {formData.firstName} !
        </h1>

        <p className="mt-3 text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
          Votre commande numéro <strong className="text-stone-900 font-mono">{orderNumber}</strong> est bien enregistrée. Un email de confirmation a été envoyé à <strong>{formData.email}</strong>.
        </p>

        {deliveryMethod === 'click_collect' ? (
          <div className="mt-8 p-6 bg-white rounded-2xl border border-[#E7E1D7] text-left max-w-lg mx-auto shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#4A5D4E] font-semibold text-sm">
              <Store className="w-5 h-5" />
              <span>Retrait Click & Collect en boutique</span>
            </div>
            <p className="text-xs text-stone-600">
              Votre commande sera soigneusement préparée sous 2 heures par Angela ou Daniela. Vous recevrez un SMS dès que votre pochon sera prêt.
            </p>
            <div className="pt-2 border-t border-stone-200 text-xs text-stone-700 space-y-1">
              <p><strong>Lieu de retrait :</strong> {STORE_INFO.name}</p>
              <p>{STORE_INFO.address}, {STORE_INFO.city}</p>
              <p><strong>Horaires :</strong> Mercredi au Samedi de 09h30 à 17h00 • Dimanche de 10h00 à 15h00</p>
            </div>
          </div>
        ) : (
          <div className="mt-8 p-6 bg-white rounded-2xl border border-[#E7E1D7] text-left max-w-lg mx-auto shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#4A5D4E] font-semibold text-sm">
              <Truck className="w-5 h-5" />
              <span>Expédition sous 24-48h</span>
            </div>
            <p className="text-xs text-stone-600">
              Votre colis est en cours de préparation par notre équipe. Vous recevrez un numéro de suivi dès son expédition.
            </p>
            <div className="pt-2 border-t border-stone-200 text-xs text-stone-700">
              <p><strong>Adresse de livraison :</strong></p>
              <p>{formData.firstName} {formData.lastName}</p>
              <p>{formData.address}, {formData.postalCode} {formData.city}</p>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-[#1E1E1E] hover:bg-[#C86D51] text-white text-xs sm:text-sm font-medium transition-colors shadow-sm"
          >
            Retourner à l’accueil
          </Link>
          <Link
            href="/catalogue"
            className="px-8 py-3 rounded-full bg-white hover:bg-[#F2EDE4] text-stone-800 text-xs sm:text-sm font-medium border border-stone-300 transition-colors"
          >
            Continuer la découverte
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-medium text-stone-900 mb-2">
          Votre panier est vide
        </h1>
        <p className="text-sm text-stone-600 mb-6">
          Ajoutez des articles à votre panier avant de procéder au règlement.
        </p>
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E1E1E] text-white text-xs font-medium hover:bg-[#C86D51] transition-colors"
        >
          Découvrir le catalogue <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continuer mes achats</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 mt-2">
          Finalisation de la commande
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left column : Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">
          {/* 1. Coordonnées */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E1D7] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D7]">
              <h2 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E1E1E] text-white text-xs flex items-center justify-center font-sans">
                  1
                </span>
                Vos Coordonnées
              </h2>
              <span className="text-xs text-stone-400">Étape 1 sur 3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Adresse email (pour le suivi)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Numéro de portable (SMS notification)
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                />
              </div>
            </div>
          </div>

          {/* 2. Mode de Réception */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E1D7] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D7]">
              <h2 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E1E1E] text-white text-xs flex items-center justify-center font-sans">
                  2
                </span>
                Mode de livraison ou retrait
              </h2>
              <span className="text-xs text-stone-400">Étape 2 sur 3</span>
            </div>

            <div className="space-y-3">
              {/* Option 1: Click & Collect */}
              <label
                onClick={() => setDeliveryMethod('click_collect')}
                className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  deliveryMethod === 'click_collect'
                    ? 'border-[#4A5D4E] bg-[#EBF0EC]/40 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'click_collect'}
                    onChange={() => setDeliveryMethod('click_collect')}
                    className="mt-1 accent-[#4A5D4E]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">
                        Click & Collect • Retrait en Boutique à Habsheim
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#4A5D4E] text-white">
                        Prêt sous 2h
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      17, Rue du Maréchal Foch / Rue du Général de Gaulle, 68440 Habsheim
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#4A5D4E]">Gratuit</span>
              </label>

              {/* Option 2: Domicile */}
              <label
                onClick={() => setDeliveryMethod('domicile')}
                className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  deliveryMethod === 'domicile'
                    ? 'border-[#C86D51] bg-[#FAF3ED]/40 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'domicile'}
                    onChange={() => setDeliveryMethod('domicile')}
                    className="mt-1 accent-[#C86D51]"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900">
                      Livraison à Domicile • Colissimo Suivi
                    </span>
                    <p className="text-xs text-stone-600 mt-1">
                      Remis contre signature sous 48h dans toute la France
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-900">
                  {isFreeShipping ? (
                    <span className="text-[#4A5D4E]">Offerte</span>
                  ) : (
                    '5.90 €'
                  )}
                </span>
              </label>

              {/* Option 3: Relais */}
              <label
                onClick={() => setDeliveryMethod('relais')}
                className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  deliveryMethod === 'relais'
                    ? 'border-[#C86D51] bg-[#FAF3ED]/40 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'relais'}
                    onChange={() => setDeliveryMethod('relais')}
                    className="mt-1 accent-[#C86D51]"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900">
                      Point Relais • Mondial Relay
                    </span>
                    <p className="text-xs text-stone-600 mt-1">
                      Livraison sous 3 à 4 jours ouvrés dans le commerce de votre choix
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-stone-900">
                  {isFreeShipping ? (
                    <span className="text-[#4A5D4E]">Offerte</span>
                  ) : (
                    '3.90 €'
                  )}
                </span>
              </label>
            </div>

            {/* Address fields if delivery */}
            {deliveryMethod !== 'click_collect' && (
              <div className="pt-4 border-t border-stone-200 space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Adresse de livraison
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Code Postal
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Ville
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Gift Wrapping Checkbox */}
            <div className="pt-4 border-t border-stone-200">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-stone-800">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  className="rounded text-[#C86D51] focus:ring-[#C86D51] w-4 h-4"
                />
                <span className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-[#C86D51]" />
                  <span>Emballage cadeau soigné & ruban de coton (Offert)</span>
                </span>
              </label>

              {giftWrapping && (
                <div className="mt-3 animate-fade-in">
                  <textarea
                    rows={2}
                    placeholder="Votre petit mot personnalisé manuscrit à joindre dans le paquet..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 3. Règlement Sécurisé */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E1D7] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D7]">
              <h2 className="font-serif text-lg font-medium text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1E1E1E] text-white text-xs flex items-center justify-center font-sans">
                  3
                </span>
                Paiement Sécurisé
              </h2>
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chiffré SSL 256-bit</span>
              </div>
            </div>

            {/* Payment Choice */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-2 rounded-xl border-2 text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#1E1E1E] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-stone-800" />
                <span>Carte Bancaire</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`py-3 px-2 rounded-xl border-2 text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'border-[#1E1E1E] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="font-serif text-lg leading-none"> Pay</span>
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('klarna')}
                className={`py-3 px-2 rounded-xl border-2 text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'klarna'
                    ? 'border-[#1E1E1E] bg-[#FAF8F5]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="font-bold text-pink-600">Klarna.</span>
                <span>3x sans frais</span>
              </button>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2 animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Date d’expiration
                    </label>
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Code de sécurité (CVC)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation CTA */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#C86D51] hover:bg-[#B55B40] text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Validation du paiement en cours...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Régler ma commande • {grandTotal.toFixed(2)} €</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-stone-400 mt-2">
                En confirmant, vous acceptez nos conditions générales de vente.
              </p>
            </div>
          </div>
        </form>

        {/* Right column : Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E7E1D7] shadow-2xs sticky top-28 space-y-5">
            <h3 className="font-serif text-lg font-medium text-stone-900 pb-3 border-b border-[#E7E1D7]">
              Récapitulatif ({cart.length} article{cart.length > 1 ? 's' : ''})
            </h3>

            {/* Item list */}
            <div className="divide-y divide-[#E7E1D7] max-h-72 overflow-y-auto pr-1 space-y-3">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="pt-3 first:pt-0 flex gap-3 items-center"
                >
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-[#F2EDE4] shrink-0 border border-stone-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-stone-900 truncate">
                      {item.product.name}
                    </p>
                    <div className="flex gap-2 text-[11px] text-stone-500">
                      <span>Qté : {item.quantity}</span>
                      {item.selectedSize && <span>• T. {item.selectedSize}</span>}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-stone-900 shrink-0">
                    {(item.product.price * item.quantity).toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="pt-3 border-t border-[#E7E1D7]">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 bg-[#FAF3ED] rounded-lg border border-[#F2D7C5] text-xs">
                  <div className="flex items-center gap-2 text-[#C86D51]">
                    <Tag className="w-4 h-4" />
                    <div>
                      <span className="font-semibold uppercase">{appliedPromo.code}</span>
                      <span className="text-[11px] block text-stone-600">
                        -{appliedPromo.discountPercent}% ({appliedPromo.description})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-stone-400 hover:text-stone-700 text-xs underline p-1"
                  >
                    Retirer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Code promo (ex: BIENVENUE10)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 bg-[#FAF8F5] border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#C86D51]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors"
                    >
                      Appliquer
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-red-600 px-1">{promoError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-3 border-t border-[#E7E1D7] text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Sous-total articles</span>
                <span className="text-stone-900 font-medium">{cartSubtotal.toFixed(2)} €</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C86D51]">
                  <span>Remise code promo</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span className="text-stone-900 font-medium">
                  {shippingCost === 0 ? (
                    <span className="text-[#4A5D4E] font-semibold">Gratuit</span>
                  ) : (
                    `${shippingCost.toFixed(2)} €`
                  )}
                </span>
              </div>

              {giftWrapping && (
                <div className="flex justify-between text-[#4A5D4E]">
                  <span>Emballage cadeau soigné</span>
                  <span>Offert</span>
                </div>
              )}

              <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900">
                <span>Total TTC à régler</span>
                <span className="text-lg text-[#1E1E1E]">{grandTotal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Reassurance pills */}
            <div className="pt-2 text-[11px] text-stone-500 space-y-1.5 border-t border-stone-100">
              <p className="flex items-center gap-1.5 text-stone-700">
                <Store className="w-3.5 h-3.5 text-[#4A5D4E]" />
                Retrait possible aujourd’hui au 14 rue des Carmélites
              </p>
              <p className="flex items-center gap-1.5 text-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C86D51]" />
                Retours gratuits sous 14 jours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
