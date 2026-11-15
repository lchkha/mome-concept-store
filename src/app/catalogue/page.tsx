'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, X, RotateCcw, ChevronDown, Check, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { SortOption } from '@/types';
import ProductCard from '@/components/ProductCard';

function CatalogueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state
  const initialCat = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Extract all available colors and sizes
  const allColors = useMemo(() => {
    const colorSet = new Map<string, string>();
    PRODUCTS.forEach((p) => {
      p.colors?.forEach((c) => colorSet.set(c.name, c.hex));
    });
    return Array.from(colorSet.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  const allSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    PRODUCTS.forEach((p) => {
      p.sizes?.forEach((s) => sizeSet.add(s));
    });
    return Array.from(sizeSet);
  }, []);

  const toggleColor = (name: string) => {
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(150);
    setSelectedColors([]);
    setSelectedSizes([]);
    setInStockOnly(false);
    setSortBy('featured');
    router.push('/catalogue');
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price
      if (product.price > maxPrice) {
        return false;
      }
      // In stock
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      // Colors
      if (
        selectedColors.length > 0 &&
        !product.colors?.some((c) => selectedColors.includes(c.name))
      ) {
        return false;
      }
      // Sizes
      if (
        selectedSizes.length > 0 &&
        !product.sizes?.some((s) => selectedSizes.includes(s))
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' keeps original curated order
    });
  }, [selectedCategory, maxPrice, inStockOnly, selectedColors, selectedSizes, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (maxPrice < 150 ? 1 : 0) +
    selectedColors.length +
    selectedSizes.length +
    (inStockOnly ? 1 : 0);

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C86D51]">
          Le Catalogue Môme
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-stone-900 mt-1">
          {currentCategoryObj ? currentCategoryObj.name : 'Toutes les Créations'}
        </h1>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed font-light">
          {currentCategoryObj
            ? currentCategoryObj.description
            : 'Explorez l’ensemble de notre vestiaire intemporel, nos céramiques façonnées à la main et nos objets réconfortants.'}
        </p>
      </div>

      {/* Top Filter Bar & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E7E1D7]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setSelectedCategory('all');
              router.push('/catalogue');
            }}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#1E1E1E] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-[#F2EDE4] border border-[#E7E1D7]'
            }`}
          >
            Tous ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                router.push(`/catalogue?cat=${cat.id}`);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#C86D51] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-[#F2EDE4] border border-[#E7E1D7]'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Right side : Mobile Filter Trigger & Sort dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-[#E7E1D7] rounded-xl text-xs font-medium text-stone-800 shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Filtres</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C86D51] text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="relative flex items-center gap-2">
            <span className="text-xs text-stone-500 hidden sm:inline">Trier par :</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Trier les produits"
                className="appearance-none bg-white border border-[#E7E1D7] text-xs font-medium text-stone-800 py-2 pl-3 pr-8 rounded-xl focus:outline-hidden focus:border-[#C86D51] cursor-pointer shadow-2xs"
              >
                <option value="featured">Sélection du moment</option>
                <option value="newest">Nouveautés d’abord</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Les mieux notés</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-[#E7E1D7] shadow-2xs h-fit sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E1D7]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#C86D51]" />
              <h3 className="font-serif text-lg font-medium text-stone-900">Filtres</h3>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#C86D51] hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Réinitialiser
              </button>
            )}
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-stone-800 mb-2">
              <span>Budget maximum</span>
              <span className="text-[#C86D51] font-bold text-sm">{maxPrice} €</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Budget maximum"
              className="w-full accent-[#C86D51] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>20 €</span>
              <span>150 €</span>
            </div>
          </div>

          {/* Availability */}
          <div className="pt-4 border-t border-[#E7E1D7]">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-stone-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#C86D51] focus:ring-[#C86D51] w-4 h-4"
              />
              <span>Pièces en stock uniquement</span>
            </label>
          </div>

          {/* Colors Filter */}
          <div className="pt-4 border-t border-[#E7E1D7]">
            <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
              Nuances & Matières
            </h4>
            <div className="flex flex-wrap gap-2">
              {allColors.map((color) => {
                const isSelected = selectedColors.includes(color.name);
                return (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-all ${
                      isSelected
                        ? 'border-[#1E1E1E] bg-[#F2EDE4] font-semibold text-stone-900 shadow-xs'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-stone-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[11px] truncate max-w-[120px]">{color.name}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#1E1E1E]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sizes Filter */}
          {allSizes.length > 0 && (
            <div className="pt-4 border-t border-[#E7E1D7]">
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
                Tailles Vêtements
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 text-xs rounded-lg border font-medium transition-colors ${
                        isSelected
                          ? 'bg-[#1E1E1E] text-white border-[#1E1E1E]'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-[#E7E1D7] text-xs">
              <span className="text-stone-400 font-medium mr-1">Filtres actifs :</span>

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF3ED] text-[#C86D51] font-medium border border-[#F2D7C5]">
                  {currentCategoryObj?.name}
                  <button onClick={() => setSelectedCategory('all')} aria-label="Supprimer le filtre de catégorie">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {maxPrice < 150 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF3ED] text-[#C86D51] font-medium border border-[#F2D7C5]">
                  Max {maxPrice} €
                  <button onClick={() => setMaxPrice(150)} aria-label="Supprimer le filtre de prix maximum">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {inStockOnly && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF3ED] text-[#C86D51] font-medium border border-[#F2D7C5]">
                  En stock
                  <button onClick={() => setInStockOnly(false)} aria-label="Supprimer le filtre en stock">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedColors.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF3ED] text-[#C86D51] font-medium border border-[#F2D7C5]"
                >
                  {c}
                  <button onClick={() => toggleColor(c)} aria-label={`Supprimer le filtre couleur ${c}`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedSizes.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF3ED] text-[#C86D51] font-medium border border-[#F2D7C5]"
                >
                  Taille {s}
                  <button onClick={() => toggleSize(s)} aria-label={`Supprimer le filtre taille ${s}`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <button
                onClick={resetFilters}
                className="text-stone-500 hover:text-stone-900 underline text-xs ml-auto"
              >
                Tout effacer
              </button>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>
              Affichage de <strong className="text-stone-900">{filteredProducts.length}</strong> pièce{filteredProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Grid or Empty state */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-[#E7E1D7] p-8">
              <div className="w-16 h-16 rounded-full bg-[#FAF3ED] text-[#C86D51] flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
                Aucun article ne correspond à vos critères
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                Essayez d’élargir vos filtres de prix ou d’effacer certaines couleurs sélectionnées.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1E1E] text-white text-xs font-medium hover:bg-[#C86D51] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF8F5] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-in">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E1D7]">
                <h3 className="font-serif text-xl font-medium text-stone-900">Filtres</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full text-stone-500 hover:text-stone-900"
                  aria-label="Fermer les filtres"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price */}
              <div className="py-6 border-b border-[#E7E1D7]">
                <div className="flex justify-between items-center text-xs font-semibold text-stone-800 mb-2">
                  <span>Budget max :</span>
                  <span className="text-[#C86D51] font-bold text-sm">{maxPrice} €</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  aria-label="Budget maximum"
                  className="w-full accent-[#C86D51]"
                />
              </div>

              {/* Stock */}
              <div className="py-4 border-b border-[#E7E1D7]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-[#C86D51]"
                  />
                  <span>En stock uniquement</span>
                </label>
              </div>

              {/* Colors */}
              <div className="py-6 border-b border-[#E7E1D7]">
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
                  Couleurs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => {
                    const isSelected = selectedColors.includes(color.name);
                    return (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border ${
                          isSelected
                            ? 'border-[#1E1E1E] bg-[#F2EDE4] font-semibold text-stone-900'
                            : 'border-stone-200 bg-white text-stone-600'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[11px]">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E7E1D7] flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-700"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#C86D51] text-white text-xs font-medium"
              >
                Voir ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-stone-500">
          Chargement du catalogue...
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
