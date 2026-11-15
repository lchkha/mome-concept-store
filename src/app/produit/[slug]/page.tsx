'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  Store,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Check,
  Share2,
  Sparkles,
  Ruler,
  Clock,
  Gift
} from 'lucide-react';
import { PRODUCTS, STORE_INFO } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { addToCart, isInWishlist, toggleWishlist, showToast } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0] || undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('desc');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Lien de la pièce copié dans le presse-papier !', 'info');
    }
  };

  // Cross-sell items
  const crossSellItems = PRODUCTS.filter((p) =>
    product.crossSellProductIds?.includes(p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
        <Link href={`/catalogue?cat=${product.category}`} className="hover:text-stone-900 transition-colors">
          {product.categoryLabel}
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
        <span className="text-stone-900 font-medium truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left : Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual */}
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-[#F2EDE4] border border-[#E7E1D7] shadow-xs">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-all duration-300"
            />
            {product.isLastPieces && (
              <span className="absolute top-4 left-4 bg-[#C86D51] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider shadow-sm">
                Dernières pièces
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-xs transition-colors"
              title="Partager"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === index
                      ? 'border-[#C86D51] ring-2 ring-[#C86D51]/20 scale-102'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="100px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right : Product Purchase & Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="uppercase tracking-widest font-semibold text-[#4A5D4E] bg-[#EBF0EC] px-2.5 py-0.5 rounded-full">
                {product.categoryLabel}
              </span>
              <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                <div className="flex text-[#C98A3C]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#C98A3C]'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span>{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount} avis)</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-stone-500 mt-2 italic font-light">
              {product.tagline}
            </p>

            {/* Price Box */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-900">{product.price} €</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-stone-400 line-through">
                    {product.compareAtPrice} €
                  </span>
                  <span className="text-xs font-bold text-[#C86D51] bg-[#FAF3ED] px-2 py-0.5 rounded">
                    Économisez {product.compareAtPrice - product.price} €
                  </span>
                </>
              )}
            </div>

            {/* Stock indicator badge */}
            <div className="mt-4 flex items-center gap-2 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {product.stock <= 4 ? (
                <span className="text-[#C86D51] font-semibold">
                  Plus que {product.stock} pièces en stock à la boutique !
                </span>
              ) : (
                <span className="text-[#4A5D4E]">
                  En stock • Expédié sous 24h ou retrait boutique immédiat
                </span>
              )}
            </div>

            {/* Color variants selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E7E1D7]">
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-stone-600 font-medium">Couleur :</span>
                  <span className="text-stone-900 font-semibold">{selectedColor}</span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === c.name
                          ? 'border-[#1E1E1E] scale-110 shadow-sm'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check
                          className={`w-4 h-4 ${
                            c.hex === '#F6F5F0' || c.hex === '#ECE8DF' || c.hex === '#FAF7F0'
                              ? 'text-stone-900'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size variants selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E7E1D7]">
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-stone-600 font-medium">Taille :</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[#C86D51] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Guide des tailles</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 text-xs rounded-xl border font-medium transition-all ${
                        selectedSize === s
                          ? 'bg-[#1E1E1E] text-white border-[#1E1E1E] shadow-xs'
                          : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {showSizeGuide && (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1 animate-fade-in">
                    <p className="font-semibold text-stone-900">Conseil taille :</p>
                    <p>Cette pièce taille normalement. Prenez votre taille habituelle pour une silhouette élégante et décontractée.</p>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="mt-8 pt-6 border-t border-[#E7E1D7] space-y-3">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-200 rounded-xl bg-white px-2 shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-stone-500 hover:text-stone-900 text-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-stone-500 hover:text-stone-900 text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#C86D51] hover:bg-[#B55B40] text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier • {(product.price * quantity).toFixed(2)} €</span>
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    inWishlist
                      ? 'bg-[#FAF3ED] border-[#F2D7C5] text-[#C86D51] shadow-xs'
                      : 'bg-white border-stone-200 text-stone-600 hover:text-[#C86D51] hover:border-[#C86D51]'
                  }`}
                  aria-label="Coup de cœur"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#C86D51]' : ''}`} />
                </button>
              </div>

              {/* Click & Collect highlight */}
              <div className="p-3 bg-[#F2EDE4]/70 rounded-xl border border-[#E7E1D7] flex items-center gap-3 text-xs text-stone-700">
                <Store className="w-5 h-5 text-[#4A5D4E] shrink-0" />
                <div>
                  <p className="font-semibold text-stone-900">Retrait Click & Collect gratuit</p>
                  <p className="text-[11px] text-stone-500">
                    Prêt en 2h à notre boutique au 17 Rue du Maréchal Foch / Rue du Général de Gaulle, 68440 Habsheim
                  </p>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-8 border-t border-[#E7E1D7] divide-y divide-[#E7E1D7]">
              {/* Accordion 1 : Description & Story */}
              <div>
                <button
                  onClick={() => toggleAccordion('desc')}
                  className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-stone-900"
                >
                  <span>Description & Histoire</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      activeAccordion === 'desc' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'desc' && (
                  <div className="pb-4 text-xs text-stone-600 leading-relaxed space-y-2 animate-fade-in">
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2 : Composition & Care */}
              <div>
                <button
                  onClick={() => toggleAccordion('comp')}
                  className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-stone-900"
                >
                  <span>Composition & Entretien</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      activeAccordion === 'comp' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'comp' && (
                  <div className="pb-4 text-xs text-stone-600 leading-relaxed space-y-2 animate-fade-in">
                    <p>
                      <strong>Composition :</strong> {product.composition}
                    </p>
                    <p>
                      <strong>Conseil d’entretien :</strong> {product.care}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3 : Delivery & Returns */}
              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-stone-900"
                >
                  <span>Livraison, Retours & Paquet Cadeau</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      activeAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="pb-4 text-xs text-stone-600 leading-relaxed space-y-2 animate-fade-in">
                    <p>
                      <strong>Livraison :</strong> {product.deliveryInfo}. Frais de port offerts dès 60€ d’achat.
                    </p>
                    <p>
                      <strong>Retours :</strong> Vous disposez de 14 jours pour échanger ou retourner un article.
                    </p>
                    <p>
                      <strong>Emballage :</strong> Chaque commande est soigneusement enveloppée dans du papier de soie parfumé. Paquet cadeau disponible gratuitement lors du paiement.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Selling "Complétez le Look" */}
      {crossSellItems.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E7E1D7]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C86D51]">
              Harmonie de style
            </span>
            <h2 className="font-serif text-3xl font-medium text-stone-900 mt-1">
              Complétez le look & l’ambiance
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Des associations inspirées imaginées par notre équipe en boutique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crossSellItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      <section className="mt-20 pt-12 border-t border-[#E7E1D7]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Avis de nos clientes vérifiées
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Note moyenne globale de {product.rating}/5 basée sur {product.reviewsCount} retours d’expérience
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-[#C98A3C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C98A3C]" />
              ))}
            </div>
            <span className="text-sm font-bold text-stone-900">{product.rating} / 5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-[#E7E1D7] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Camille B.</span>
              <span className="text-[10px] text-stone-400">Il y a 3 jours</span>
            </div>
            <div className="flex text-[#C98A3C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#C98A3C]" />
              ))}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              &ldquo;La qualité est tout simplement exceptionnelle ! Le tombé est parfait, et le petit mot glissé dans le colis fait toute la différence. Une vraie boutique coup de cœur.&rdquo;
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E7E1D7] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Juliette M.</span>
              <span className="text-[10px] text-stone-400">Il y a 2 semaines</span>
            </div>
            <div className="flex text-[#C98A3C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#C98A3C]" />
              ))}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              &ldquo;Retiré en Click & Collect à la boutique de Habsheim après un délicieux brunch le dimanche ! L’accueil d’Angela et Daniela est adorable et l’emballage était superbe.&rdquo;
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E7E1D7] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Sophie L.</span>
              <span className="text-[10px] text-stone-400">Le mois dernier</span>
            </div>
            <div className="flex text-[#C98A3C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#C98A3C]" />
              ))}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              &ldquo;Matière noble, coupe flatteuse. On sent immédiatement la différence avec la fast-fashion. Je recommande les yeux fermés !&rdquo;
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
