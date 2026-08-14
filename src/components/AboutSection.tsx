import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Heart, BarChart3, MessageSquareQuote, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setCurrentView, currentUser, startWorkbook, workbooks } = useApp();

  const handleStart = () => {
    if (workbooks.length > 0) {
      startWorkbook(workbooks[0].id);
      setCurrentView('session');
    } else {
      setCurrentView('session');
    }
  };

  const featureCards = [
    {
      icon: '📖',
      title: 'Menulis',
      desc: 'Menuangkan cerita melalui pertanyaan reflektif yang aman dan tanpa penghakiman.'
    },
    {
      icon: '♡',
      title: 'Menyimpan',
      desc: 'Menyimpan pertanyaan dan tulisan yang bermakna di halaman Favoritmu.'
    },
    {
      icon: '◔',
      title: 'Melihat Perjalanan',
      desc: 'Melihat proses journaling dan perkembangan refleksi diri melalui Peta Perjalanan 10 Titik.'
    },
    {
      icon: '💭',
      title: 'Mengenal Diri',
      desc: 'Mengenali pikiran, emosi, dan harapan melalui tulisan sederhana sehari-hari.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-200/70 border border-slate-300 text-xs font-bold font-handwriting text-slate-800">
          <span>ⓘ TENTANG</span>
        </div>
        
        <h2 className="font-heading-hand text-4xl sm:text-5xl font-extrabold text-slate-900">
          Tentang My Unsaid Journal
        </h2>

        <div className="p-4 rounded-2xl bg-white border border-slate-300 font-handwriting text-xl text-slate-800 italic max-w-xl mx-auto shadow-2xs">
          “Some thoughts need a place to land.”
          <br />
          <span className="text-base text-slate-600 font-normal not-italic block mt-1">
            “Beberapa pikiran hanya membutuhkan tempat untuk dituangkan.”
          </span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-300 shadow-xs space-y-8 relative">
        
        {/* Masking Tape Decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 tape-strip rounded-sm transform -rotate-1 pointer-events-none" />

        {/* Section 1: Apa itu My Unsaid Journal? */}
        <div className="space-y-3">
          <h3 className="font-heading-hand text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>🌱 Apa itu My Unsaid Journal?</span>
          </h3>
          <p className="font-handwriting text-lg text-slate-700 leading-relaxed">
            <strong>My Unsaid Journal</strong> adalah ruang journaling digital yang dirancang untuk membantu remaja menuangkan pikiran, perasaan, pengalaman, dan harapan melalui pertanyaan-pertanyaan reflektif. 
          </p>
        </div>

        {/* Section 2: Mengapa dibuat? */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="font-heading-hand text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>💡 Mengapa dibuat?</span>
          </h3>
          <div className="p-5 rounded-2xl bg-[#fcfbf9] border border-slate-200 font-handwriting text-base text-slate-700 space-y-2 leading-relaxed">
            <p>
              Kadang kita punya banyak hal di kepala, tetapi bingung harus bercerita kepada siapa. Di sini, kamu tidak perlu punya jawaban yang sempurna.
            </p>
            <p className="font-bold text-slate-900">
              Cukup jujur pada dirimu sendiri.
            </p>
          </div>
        </div>

        {/* Section 3: Apa yang bisa kamu lakukan di sini? */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="font-heading-hand text-2xl font-bold text-slate-900">
            ✨ Apa yang bisa kamu lakukan di sini?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureCards.map((f, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#fcfbf9] border border-slate-200 space-y-2 hover:border-slate-400 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{f.icon}</span>
                  <h4 className="font-heading-hand text-xl font-bold text-slate-900">{f.title}</h4>
                </div>
                <p className="font-handwriting text-sm text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-slate-200 text-center space-y-3">
          <p className="font-handwriting text-base text-slate-600">
            Siap untuk mendengarkan isi hatimu hari ini?
          </p>
          <button
            onClick={handleStart}
            className="btn-charcoal px-8 py-3.5 text-sm font-bold shadow-md inline-flex items-center gap-2"
          >
            <span>Mulai Journaling Sekarang →</span>
          </button>
        </div>

      </div>

      {/* Footer KKN Note */}
      <div className="text-center font-handwriting text-xs text-slate-400 space-y-1">
        <p>© 2026 My Unsaid Journal • Program Kerja KKN Refleksi Diri Remaja</p>
        <p>Dirancang sebagai alat bantu refleksi diri edukatif non-diagnostik.</p>
      </div>

    </div>
  );
};
