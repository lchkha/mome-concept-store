'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS, CATEGORIES } from '@/data/products';

const POPULAR_SEARCHES = ['Blouse brodée', 'Céramique', 'Cabas velours', 'Bougie ambre', 'Pull alpaga', 'Lin lavé'];

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = searchTerm.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query)
        );
      });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E7E1D7] overflow-hidden z-10 animate-fade-in mt-12 sm:mt-16">
        {/* Search Input Bar */}
        <div className="relative border-b border-[#E7E1D7] bg-white flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une pièce, une matière, une bougie..."
            className="w-full px-3 py-2 text-base text-stone-800 placeholder-stone-400 bg-transparent focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-stone-400 hover:text-stone-600 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-stone-400 hover:text-stone-700 px-2 py-1 rounded bg-[#F2EDE4]"
          >
            Échap
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {searchTerm.trim() === '' ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#C86D51]" />
                  Recherches populaires
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#E7E1D7] text-xs text-stone-700 hover:border-[#C86D51] hover:text-[#C86D51] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                  Explorer par univers
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalogue?cat=${cat.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="p-3 bg-white border border-[#E7E1D7] rounded-xl hover:border-[#C86D51] transition-colors text-center group"
                    >
                      <p className="text-xs font-medium text-stone-800 group-hover:text-[#C86D51]">
                        {cat.name}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{cat.count} pièces</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="font-serif text-lg text-stone-800 mb-1">
                Aucun résultat pour &ldquo;{searchTerm}&rdquo;
              </p>
              <p className="text-xs text-stone-400 mb-4">
                Vérifiez l’orthographe ou découvrez toutes nos nouveautés
              </p>
              <Link
                href="/catalogue"
                onClick={() => setIsSearchOpen(false)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1E1E1E] text-white text-xs font-medium hover:bg-[#C86D51] transition-colors"
              >
                Voir tout le catalogue <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-medium text-stone-500">
                {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
              </p>
              <div className="divide-y divide-[#E7E1D7] bg-white rounded-xl border border-[#E7E1D7] overflow-hidden">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produit/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <div className="relative w-14 h-16 rounded-md overflow-hidden bg-[#F2EDE4] shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="60px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-stone-900 group-hover:text-[#C86D51] transition-colors truncate">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate">{product.tagline}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2EDE4] text-stone-700">
                        {product.categoryLabel}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-stone-900">{product.price} €</span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#C86D51] group-hover:translate-x-1 transition-all mt-1 ml-auto" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
