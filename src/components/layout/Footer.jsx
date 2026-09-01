import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-900 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900">PrepAura</span>
        </div>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} PrepAura Technologies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};