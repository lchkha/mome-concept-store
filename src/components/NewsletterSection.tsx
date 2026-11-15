'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Veuillez entrer une adresse email valide', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Bienvenue au Club Môme ! Votre code BIENVENUE10 (-10%) est actif.', 'success');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3ED] border border-[#F2D7C5] text-xs font-semibold uppercase tracking-wider text-[#C86D51] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Le Club Privé Môme
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 tracking-tight">
          Recevez nos inspirations & 10% sur votre première commande
        </h2>

        <p className="mt-3 text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          Inscrivez-vous à notre lettre d’inspiration pour découvrir en avant-première nos arrivages confidentiels, les portraits de nos artisans et recevoir le code de bienvenue immédiat.
        </p>

        {isSubmitted ? (
          <div className="mt-8 p-6 bg-white rounded-2xl border border-[#C86D51]/30 max-w-md mx-auto shadow-sm animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#FAF3ED] text-[#C86D51] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="font-serif text-lg font-medium text-stone-900">
              Merci pour votre confiance !
            </p>
            <p className="text-xs text-stone-600 mt-1">
              Votre bon de bienvenue de 10% est disponible. Utilisez le code :
            </p>
            <div className="mt-3 inline-block px-4 py-2 bg-[#F2EDE4] rounded-lg font-mono font-bold text-sm text-[#1E1E1E] tracking-wider border border-stone-300">
              BIENVENUE10
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email (ex: clemence@domaine.fr)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white text-stone-900 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#C86D51] transition-colors shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#C86D51] hover:bg-[#B55B40] text-white text-xs sm:text-sm font-medium transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Rejoindre</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-stone-400 mt-3">
              Promis, nous n’envoyons que des courriers doux. Désabonnement en un clic à tout moment.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
