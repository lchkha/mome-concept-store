'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF8F5] shadow-2xl flex flex-col z-50 animate-slide-in">
        <div className="p-5 border-b border-[#E7E1D7] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C86D51] fill-[#C86D51]" />
            <h2 className="font-serif text-xl font-medium text-stone-900">
              Mes Coups de Cœur
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 bg-[#F2EDE4] text-stone-700 rounded-full">
              {wishlistProducts.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-[#F2EDE4] transition-colors"
            aria-label="Fermer la liste d'envies"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#F2EDE4] flex items-center justify-center text-[#C86D51] mb-4">
                <Heart className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif text-lg font-medium text-stone-800 mb-1">
                Aucun coup de cœur enregistré
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Cliquez sur le petit cœur sur vos pièces favorites pour les retrouver ici à tout moment.
              </p>
              <Link
                href="/catalogue"
                onClick={() => setIsWishlistOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1E1E] text-white text-xs font-medium hover:bg-[#C86D51] transition-colors"
              >
                Explorer la boutique <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-white rounded-xl border border-[#EBE5DB] shadow-2xs hover:border-[#DACFC0] transition-colors"
              >
                <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-[#F2EDE4]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <Link
                        href={`/produit/${product.slug}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="text-xs font-medium text-stone-900 hover:text-[#C86D51] line-clamp-1 transition-colors"
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-stone-400 hover:text-red-500 p-0.5 transition-colors"
                        title="Retirer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">{product.categoryLabel}</p>
                    <p className="text-xs font-bold text-stone-900 mt-1">{product.price} €</p>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        setIsWishlistOpen(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#FAF8F5] hover:bg-[#C86D51] hover:text-white text-[#1E1E1E] border border-stone-200 text-xs font-medium transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Ajouter au panier</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
