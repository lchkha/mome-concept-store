'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md transition-all animate-fade-in ${
              isSuccess
                ? 'bg-[#1E1E1E] text-white border-stone-800'
                : isError
                ? 'bg-red-900 text-white border-red-800'
                : 'bg-white text-stone-800 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs font-medium">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0" />}
              {isError && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-[#4A5D4E] shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white p-0.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
