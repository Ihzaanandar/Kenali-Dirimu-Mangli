import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Heart, Printer, RotateCcw, ShieldAlert, Award, MessageCircleHeart, CheckCircle2 } from 'lucide-react';

interface PersonalSummaryProps {
  onOpenHelpline: () => void;
}

export const PersonalSummary: React.FC<PersonalSummaryProps> = ({ onOpenHelpline }) => {
  const { studentSummary, activeWorkbook, startWorkbook, setCurrentView } = useApp();

  if (!studentSummary) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl shadow">
        <p className="text-slate-600 font-semibold mb-4">Ringkasan refleksi belum tersedia.</p>
        <button
          onClick={() => setCurrentView('landing')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleRestart = () => {
    if (activeWorkbook && window.confirm('Apakah kamu ingin memulai sesi refleksi baru dari awal?')) {
      startWorkbook(activeWorkbook.id, true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Action Header */}
      <div className="flex items-center justify-between print:hidden gap-2">
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-4 py-2 rounded-2xl border border-slate-300 shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold border border-slate-300 transition-colors"
            title="Mulai Sesi Baru dari Awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refleksi Ulang</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn-charcoal px-5 py-2.5 flex items-center gap-2 text-xs font-bold shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* Main Reflection Certificate Paper Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-300 relative overflow-hidden space-y-8 print:shadow-none print:border-none">
        
        {/* Masking Tape Top Decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 tape-strip rounded-sm transform rotate-1 pointer-events-none" />

        {/* Header Title */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#f3f0e6] text-slate-800 border border-[#e2dccb] mb-2 shadow-xs">
            <Award className="w-7 h-7" />
          </div>
          
          <h2 className="font-heading-hand text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ringkasan Refleksi Pribadi
          </h2>
          
          <p className="font-handwriting text-sm text-slate-600">
            Ditulis oleh <span className="font-bold text-slate-900">{studentSummary.studentName}</span> pada{' '}
            {new Date(studentSummary.completedAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>

        {/* Non-Diagnostic Psychological Disclaimer Notice */}
        <div className="p-4 rounded-2xl bg-[#f8f7f3] border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900">Catatan Refleksi Edukatif</p>
            <p className="mt-0.5 font-handwriting text-sm text-slate-600">
              Ringkasan ini merangkum hal-hal yang kamu bagikan secara mandiri selama sesi workbook. Ringkasan ini bersifat edukatif dan bukan merupakan diagnosis psikologis medis.
            </p>
          </div>
        </div>

        {/* Section 1: Frequent Emotions */}
        {studentSummary.frequentEmotions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-slate-700" />
              <span>Emosi Yang Sering Hadir</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {studentSummary.frequentEmotions.map((emo, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-2xl bg-[#f2eee3] border border-[#dfd9c7] text-slate-800 font-bold font-handwriting text-sm capitalize flex items-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {emo}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Key Personal Reflections */}
        {studentSummary.keyReflections.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MessageCircleHeart className="w-4 h-4 text-slate-700" />
              <span>Catatan & Refleksi Menarikmu</span>
            </h3>

            <div className="space-y-3">
              {studentSummary.keyReflections.slice(0, 4).map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#f9f8f4] border border-slate-200 space-y-1.5"
                >
                  <p className="text-xs font-bold text-slate-800">{item.question}</p>
                  <p className="font-handwriting text-base text-slate-800 italic bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                    "{item.answer}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affirmation Kraft Paper Card */}
        <div className="p-6 rounded-3xl bg-[#f4efe4] border border-[#e0d9c8] text-slate-900 space-y-2 shadow-sm relative">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-700">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Pesan Apresiasi Untukmu</span>
          </div>
          <p className="font-handwriting text-lg sm:text-xl font-bold leading-relaxed text-slate-900">
            {studentSummary.insightNote}
          </p>
        </div>

        {/* Support Helpline Footer inside summary */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 font-handwriting text-sm text-center sm:text-left">
            Butuh seseorang untuk diajak berbagi cerita?
          </p>
          <button
            onClick={onOpenHelpline}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 text-rose-700 font-bold border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Lihat Kontak Layanan Konseling</span>
          </button>
        </div>

      </div>
    </div>
  );
};
