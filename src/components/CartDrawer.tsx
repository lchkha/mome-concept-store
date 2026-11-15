'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, Check, Truck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { STORE_INFO } from '@/data/products';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    finalTotal,
    freeShippingRemaining,
    isFreeShipping,
    appliedPromo,
    applyPromo,
    removePromo,
    cartCount,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const progressPercentage = Math.min(100, (cartSubtotal / STORE_INFO.freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF8F5] shadow-2xl flex flex-col z-50 animate-slide-in">
        {/* Header */}
        <div className="p-5 border-b border-[#E7E1D7] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C86D51]" />
            <h2 className="font-serif text-xl font-medium text-stone-900">
              Mon Panier
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 bg-[#F2EDE4] text-stone-700 rounded-full">
              {cartCount} {cartCount > 1 ? 'articles' : 'article'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-[#F2EDE4] transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3.5 bg-[#F7F4EE] border-b border-[#E7E1D7]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-stone-700">
              <Truck className="w-4 h-4 text-[#C86D51]" />
              {isFreeShipping ? (
                <span className="text-[#4A5D4E] font-semibold">
                  Félicitations ! La livraison vous est offerte ! 🎉
                </span>
              ) : (
                <span>
                  Plus que <strong className="text-[#C86D51]">{freeShippingRemaining.toFixed(2)} €</strong> pour la livraison offerte
                </span>
              )}
            </span>
            <span className="text-stone-500">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-[#E5DFD4] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#C86D51] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#F2EDE4] flex items-center justify-center text-[#C86D51] mb-4">
                <ShoppingBag className="w-8 h-8 opacity-70" />
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-800 mb-1">
                Votre panier est encore vide
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Laissez-vous tenter par notre sélection mode, céramiques artisanales et senteurs délicates.
              </p>
              <Link
                href="/catalogue"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1E1E] text-white text-xs font-medium hover:bg-[#C86D51] transition-colors"
              >
                Découvrir la boutique <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex gap-4 p-3 bg-white rounded-xl border border-[#EBE5DB] shadow-2xs hover:border-[#DACFC0] transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-[#F2EDE4]">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <Link
                        href={`/produit/${item.product.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-medium text-stone-900 hover:text-[#C86D51] line-clamp-1 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-stone-400 hover:text-red-500 p-0.5 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-1 text-[11px] text-stone-500">
                      {item.selectedColor && (
                        <span className="bg-[#FAF8F5] px-2 py-0.5 rounded border border-stone-200">
                          {item.selectedColor}
                        </span>
                      )}
                      {item.selectedSize && (
                        <span className="bg-[#FAF8F5] px-2 py-0.5 rounded border border-stone-200 font-semibold text-stone-700">
                          {item.selectedSize}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                        className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-l-md transition-colors"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-stone-800 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                        className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-r-md transition-colors"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-stone-900">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[10px] text-stone-400">
                          ({item.product.price} € / unité)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals and checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E7E1D7] space-y-4">
            {/* Promo code box */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 bg-[#FAF3ED] rounded-lg border border-[#F2D7C5] text-xs">
                  <div className="flex items-center gap-2 text-[#C86D51]">
                    <Tag className="w-4 h-4" />
                    <div>
                      <span className="font-semibold tracking-wider uppercase">{appliedPromo.code}</span>
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
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
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

            {/* Calculations summary */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="text-stone-900 font-medium">{cartSubtotal.toFixed(2)} €</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C86D51]">
                  <span>Remise code promo</span>
                  <span>-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Livraison</span>
                <span className="text-stone-900 font-medium">
                  {isFreeShipping ? (
                    <span className="text-[#4A5D4E] font-semibold">Offerte</span>
                  ) : (
                    'Calculée au checkout'
                  )}
                </span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between text-sm font-bold text-stone-900">
                <span>Total estimé TTC</span>
                <span className="text-base text-[#1E1E1E]">{finalTotal.toFixed(2)} €</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C86D51] hover:bg-[#B55B40] text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span>Passer la commande</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-xs text-stone-500 hover:text-stone-800 py-1 transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
