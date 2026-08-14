import React from 'react';
import { X, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface SafetyDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyDisclaimerModal: React.FC<SafetyDisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-300 relative space-y-6">
        
        {/* Masking Tape Top Decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-strip rounded-sm transform rotate-1 pointer-events-none" />

        {/* Prominent Round Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-2xs z-10"
          title="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#f3f0e6] text-slate-800 border border-[#e2dccb] flex items-center justify-center font-bold shrink-0">
            <ShieldAlert className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <h2 className="font-heading-hand text-2xl font-extrabold text-slate-900">Batas Layanan & Privasi</h2>
            <p className="font-handwriting text-xs text-slate-500">Informasi Penting Sebelum Pengisian</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-handwriting text-sm">
          <div className="p-4 rounded-2xl bg-[#f9f8f4] border border-slate-200 space-y-1.5">
            <h4 className="font-bold text-slate-900 font-sans text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-slate-700" />
              <span>Media Refleksi & Journaling Mandiri</span>
            </h4>
            <p>
              Aplikasi web ini dirancang sebagai wadah interaktif untuk membantu remaja berhenti sejenak, mengenali emosi, dan menuliskan pikiran pribadi secara privat.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5 text-rose-900">
            <h4 className="font-bold text-rose-900 font-sans text-xs flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Bukan Diagnosis Medis atau Terapi Online</span>
            </h4>
            <p>
              Sistem ini <strong>TIDAK memberikan diagnosis klinis atau terapi medis profesional</strong>. Jika kamu mengalami tekanan emosional berat, sangat disarankan untuk menghubungi tenaga profesional (Psikolog, Konselor Sekolah, atau layanan bantuan darurat).
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-charcoal w-full py-3.5 text-xs font-bold shadow-md"
        >
          Saya Memahami & Melanjutkan
        </button>

      </div>
    </div>
  );
};
