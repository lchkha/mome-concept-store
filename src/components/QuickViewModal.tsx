'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, isInWishlist, toggleWishlist } = useShop();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(0);
      setSelectedColor(quickViewProduct.colors?.[0]?.name || '');
      setSelectedSize(quickViewProduct.sizes?.[0] || undefined);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E7E1D7] overflow-hidden z-10 animate-fade-in my-8">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full text-stone-500 hover:text-stone-900 transition-colors shadow-xs"
          aria-label="Fermer la vue rapide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery */}
          <div className="p-6 bg-white border-b md:border-b-0 md:border-r border-[#E7E1D7] flex flex-col justify-between">
            <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-[#F2EDE4]">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {product.isLastPieces && (
                <span className="absolute top-3 left-3 bg-[#C86D51] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-xs">
                  Dernières pièces
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-20 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === idx ? 'border-[#C86D51] ring-1 ring-[#C86D51]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-widest font-semibold text-[#4A5D4E]">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-[#C98A3C]">
                  <Star className="w-3.5 h-3.5 fill-[#C98A3C]" />
                  <span className="font-bold text-stone-800">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif text-2xl font-medium text-stone-900 leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 mt-1 italic">{product.tagline}</p>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-bold text-stone-900">{product.price} €</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {product.compareAtPrice} €
                  </span>
                )}
                {product.stock <= 5 && (
                  <span className="text-xs font-semibold text-[#C86D51] bg-[#FAF3ED] px-2 py-0.5 rounded">
                    Plus que {product.stock} en stock
                  </span>
                )}
              </div>

              {/* Description excerpt */}
              <p className="text-xs text-stone-600 leading-relaxed mt-4 line-clamp-3">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-stone-600 font-medium">Couleur :</span>
                    <span className="text-stone-900 font-semibold">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === c.name ? 'border-[#1E1E1E] scale-110 shadow-xs' : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className={`w-3.5 h-3.5 ${c.hex === '#F6F5F0' || c.hex === '#ECE8DF' || c.hex === '#FAF7F0' ? 'text-stone-900' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-stone-600 font-medium">Taille :</span>
                    <span className="text-stone-900 font-semibold">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                          selectedSize === s
                            ? 'bg-[#1E1E1E] text-white border-[#1E1E1E]'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-[#E7E1D7]">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-200 rounded-xl bg-white px-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-stone-500 hover:text-stone-900"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 text-stone-500 hover:text-stone-900"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#C86D51] hover:bg-[#B55B40] text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier • {(product.price * quantity).toFixed(2)} €</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    inWishlist
                      ? 'bg-[#FAF3ED] border-[#F2D7C5] text-[#C86D51]'
                      : 'bg-white border-stone-200 text-stone-500 hover:text-[#C86D51] hover:border-[#C86D51]'
                  }`}
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C86D51]' : ''}`} />
                </button>
              </div>

              {/* View Full Product Link */}
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2">
                <span className="flex items-center gap-1 text-[#4A5D4E]">
                  <Truck className="w-3.5 h-3.5" /> Retrait sous 2h à Nantes
                </span>
                <Link
                  href={`/produit/${product.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-stone-800 hover:text-[#C86D51] font-medium flex items-center gap-1 group"
                >
                  <span>Voir la fiche complète</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
