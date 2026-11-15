'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-3xl border border-[#EBE3D8] overflow-hidden shadow-mome hover:shadow-xl hover:border-[#DACCC0] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F3ECE2]">
        {/* Main Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ease-out ${
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image on Hover */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover absolute inset-0 transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#2C211B] text-white shadow-xs">
              Nouveau
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#C86D51] text-white shadow-xs">
              Coup de cœur
            </span>
          )}
          {product.isLastPieces && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#536B58] text-white shadow-xs">
              Dernières pièces
            </span>
          )}
          {discountPercent && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#A94E35] text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-200 ${
            inWishlist
              ? 'bg-[#FAF3ED] text-[#C86D51] shadow-xs'
              : 'bg-white/85 hover:bg-white text-stone-600 hover:text-[#C86D51] shadow-2xs'
          }`}
          aria-label="Ajouter aux coups de cœur"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C86D51]' : ''}`} />
        </button>

        {/* Overlay Quick Actions on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/95 backdrop-blur-xs text-[#2C211B] hover:text-white hover:bg-[#2C211B] text-xs font-semibold shadow-sm transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Aperçu</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="flex items-center justify-center p-2.5 rounded-xl bg-[#C86D51] text-white hover:bg-[#B5583E] shadow-sm transition-all"
            title="Ajout rapide au panier"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#786C63] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[#536B58]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#C98A3C] fill-[#C98A3C]" />
              <span className="font-semibold text-[#2C211B]">{product.rating}</span>
            </div>
          </div>

          <Link href={`/produit/${product.slug}`} className="block group-hover:text-[#C86D51] transition-colors">
            <h3 className="font-serif text-base font-medium text-[#2C211B] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-[#786C63] line-clamp-1 mt-0.5 font-light">{product.tagline}</p>
        </div>

        {/* Price & Colors preview */}
        <div className="mt-4 pt-3 border-t border-[#F3ECE2] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#2C211B]">{product.price} €</span>
            {product.compareAtPrice && (
              <span className="text-xs text-stone-400 line-through">
                {product.compareAtPrice} €
              </span>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center -space-x-1">
              {product.colors.slice(0, 3).map((c, i) => (
                <span
                  key={i}
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs inline-block"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-stone-400 pl-1.5 font-medium">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
