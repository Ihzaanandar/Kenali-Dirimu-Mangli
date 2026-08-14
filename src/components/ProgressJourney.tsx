import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, RotateCcw, Sparkles, Heart, BookOpen, ArrowLeft } from 'lucide-react';

interface ProgressJourneyProps {
  onStartJournaling: () => void;
}

export const ProgressJourney: React.FC<ProgressJourneyProps> = ({ onStartJournaling }) => {
  const { activeWorkbook, responses, currentUser, moodEntries, addMoodEntry, setCurrentView } = useApp();

  // If participant has not opened / selected a workbook yet, prompt to open Journal page first
  if (!activeWorkbook) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 sm:p-12 text-center bg-white rounded-3xl shadow-xs border border-slate-300 space-y-6 font-handwriting animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 border border-slate-300 flex items-center justify-center text-3xl mx-auto shadow-2xs">
          📖
        </div>
        <div className="space-y-2">
          <h2 className="font-heading-hand text-3xl font-extrabold text-slate-900">
            Kamu Belum Memilih Workbook Refleksi
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-md mx-auto">
            Silakan pilih salah satu jurnal terlebih dahulu di halaman Journal untuk mulai mengisi dan melihat peta perjalananmu.
          </p>
        </div>
        <button
          onClick={() => setCurrentView('session')}
          className="btn-charcoal px-8 py-3.5 text-sm font-bold shadow-md w-full sm:w-auto"
        >
          Ke Halaman Journal & Pilih Workbook →
        </button>
      </div>
    );
  }

  const sections = activeWorkbook.sections || [];

  // Calculate answered count per section
  const sectionStats = sections.map(sec => {
    const questions = sec.questions || [];
    const totalQ = questions.length;
    const answeredCount = questions.filter(q => !!responses[q.id]?.answerText || !!responses[q.id]?.answerJson).length;
    const isCompleted = answeredCount === totalQ && totalQ > 0;
    return {
      section: sec,
      totalQ,
      answeredCount,
      isCompleted
    };
  });

  const totalQuestions = sections.reduce((acc, s) => acc + (s.questions?.length || 0), 0);
  const totalAnswered = sectionStats.reduce((acc, s) => acc + s.answeredCount, 0);
  const isAllCompleted = totalAnswered === totalQuestions && totalQuestions > 0;

  // Mood options for Jejak Perasaanku
  const moodOptions = [
    { label: 'Bahagia', icon: '😄' },
    { label: 'Tenang', icon: '😌' },
    { label: 'Bersyukur', icon: '🥰' },
    { label: 'Sedih', icon: '😔' },
    { label: 'Cemas', icon: '😟' },
    { label: 'Marah', icon: '😡' },
    { label: 'Biasa saja', icon: '😐' },
    { label: 'Campur aduk', icon: '🤍' },
  ];

  // Calculate mood counts
  const moodCounts: Record<string, number> = {};
  (currentUser?.moodEntries || moodEntries || []).forEach(m => {
    moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Bar with Switch Workbook Action */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentView('session')}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 rounded-2xl text-xs font-bold font-handwriting border border-slate-300 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Pilih Workbook Lain</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200/80 px-3 py-1 rounded-full">
          Workbook Aktif: {activeWorkbook.title}
        </span>
      </div>

      {/* Header Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-200/70 border border-slate-300 text-xs font-bold font-handwriting text-slate-800">
          <span>◔ PROGRES PERJALANAN</span>
        </div>
        <h2 className="font-heading-hand text-4xl sm:text-5xl font-extrabold text-slate-900">
          Peta Progres: {activeWorkbook.title}
        </h2>
        <p className="font-handwriting text-base text-slate-600 max-w-lg mx-auto">
          Pelan-pelan, kamu sedang mengenal dirimu sendiri. Setiap cerita yang kamu tulis adalah satu langkah kecil untuk mendengar hatimu.
        </p>
      </div>

      {/* Progress Counter Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-300 space-y-4 text-center relative overflow-hidden">
        <div className="space-y-1">
          <p className="font-heading-hand text-3xl font-bold text-slate-900">
            PERJALANANMU ({activeWorkbook.title})
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-wider">
            {totalAnswered} / {totalQuestions} <span className="text-sm font-handwriting font-normal text-slate-500">pertanyaan selesai</span>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-slate-900 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${totalQuestions > 0 ? (totalAnswered / totalQuestions) * 100 : 0}%` }}
          />
        </div>

        <p className="font-handwriting text-sm text-slate-500 italic">
          Setiap cerita yang kamu tulis adalah satu langkah kecil untuk mengenal dirimu sendiri.
        </p>
      </div>

      {/* 🌟 KETIKA ALL COMPLETED ENDING SCREEN */}
      {isAllCompleted ? (
        <div className="bg-amber-50/80 border border-amber-300 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-sm relative">
          <div className="text-5xl">🌻</div>
          <div className="space-y-2">
            <h3 className="font-heading-hand text-3xl sm:text-4xl font-extrabold text-slate-900">
              Kamu sudah sampai di akhir perjalanan.
            </h3>
            <p className="font-mono text-sm font-bold text-slate-700">
              {totalQuestions} / {totalQuestions} pertanyaan selesai
            </p>
          </div>

          <p className="font-handwriting text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Kamu sudah meluangkan waktu untuk mendengarkan dirimu sendiri—tentang hal yang membuatmu bahagia, hal yang pernah menyakitimu, hal yang kamu takutkan, orang-orang yang berarti, sampai mimpi yang ingin kamu kejar.
          </p>

          <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 font-handwriting text-base text-slate-800 italic max-w-xl mx-auto">
            "Tapi mengenal diri sendiri tidak berhenti di sini. Kamu akan terus berubah, tumbuh, belajar, dan menemukan sisi lain dari dirimu."
            <br />
            <span className="font-bold font-heading-hand text-xl not-italic text-slate-900 mt-2 block">
              “Sampai jumpa di cerita berikutnya.”
            </span>
          </div>

          <button
            onClick={() => setCurrentView('session')}
            className="btn-charcoal px-8 py-3.5 text-sm font-bold shadow-md inline-flex items-center gap-2"
          >
            <span>[ KEMBALI KE JURNAL ]</span>
          </button>
        </div>
      ) : null}

      {/* 🖤 VISUAL ROADMAP PATH (START -> STOPS -> FINISH) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-300 shadow-xs space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <span className="font-handwriting font-bold text-sm text-slate-500 uppercase tracking-widest">
            📍 Peta Perjalanan {sections.length} Titik ({activeWorkbook.title})
          </span>
          <span className="font-handwriting text-xs text-slate-400">
            Jalan Kecil Refleksi
          </span>
        </div>

        {/* Vertical Visual Road */}
        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-9 sm:before:left-13 before:top-4 before:bottom-4 before:w-1 before:bg-slate-300 before:border-dashed before:border-r">
          
          {/* START Point */}
          <div className="relative flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs z-10">
              ▶
            </div>
            <span className="font-handwriting font-bold text-base text-slate-900 tracking-wider">
              START — Mulai Perjalanan
            </span>
          </div>

          {/* Section Stopping Points */}
          {sectionStats.map((stat, idx) => {
            const { section, totalQ, answeredCount, isCompleted } = stat;
            return (
              <div key={section.id} className="relative flex items-start gap-4 group">
                
                {/* Node Stop Point Marker */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg z-10 transition-all border ${
                    isCompleted
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-xs scale-105'
                      : answeredCount > 0
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'bg-slate-100 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? '✓' : section.icon || '🌱'}
                </div>

                {/* Section Info Card */}
                <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : answeredCount > 0
                    ? 'bg-amber-50/30 border-amber-200'
                    : 'bg-[#fcfbf9] border-slate-200'
                }`}>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-heading-hand text-xl font-bold text-slate-900">
                      {section.title}
                    </h4>
                    <span className="text-xs font-mono font-bold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200 shrink-0">
                      {answeredCount} / {totalQ} selesai
                    </span>
                  </div>

                  <p className="font-handwriting text-sm text-slate-600 mt-1">
                    {section.description}
                  </p>

                  {isCompleted && (
                    <div className="mt-2 text-xs font-handwriting font-bold text-emerald-700 flex items-center gap-1">
                      <span>🌱 Satu langkah sudah kamu lewati.</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}

          {/* FINISH Point */}
          <div className="relative flex items-center gap-4 pt-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base z-10 ${
              isAllCompleted ? 'bg-amber-400 text-slate-900 animate-bounce' : 'bg-slate-300 text-slate-600'
            }`}>
              🌻
            </div>
            <span className="font-handwriting font-bold text-base text-slate-900 tracking-wider">
              FINISH — Akhir Perjalanan
            </span>
          </div>

        </div>
      </div>

      {/* 💖 FITUR MOOD TRACKER: JEJAK PERASAANKU */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-xs space-y-6">
        <div className="space-y-1">
          <h3 className="font-heading-hand text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
            <span>Jejak Perasaanku</span>
          </h3>
          <p className="font-handwriting text-sm text-slate-600">
            Setiap selesai journaling, pilih bagaimana perasaanmu hari ini untuk mencatat jejak emosimu.
          </p>
        </div>

        {/* Mood Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {moodOptions.map(m => (
            <button
              key={m.label}
              onClick={() => addMoodEntry(m.label)}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 flex items-center justify-center gap-2 font-handwriting text-sm transition-all"
            >
              <span>{m.icon}</span>
              <span className="font-bold text-slate-800">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Mood Stats Counter */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-handwriting">
            Perasaan yang paling sering kamu pilih:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.keys(moodCounts).length > 0 ? (
              Object.entries(moodCounts).map(([mood, count]) => (
                <div key={mood} className="p-3 rounded-2xl bg-[#f8f7f3] border border-slate-200 text-center space-y-0.5">
                  <p className="font-handwriting font-bold text-sm text-slate-800">{mood}</p>
                  <p className="font-mono text-xs text-slate-500 font-semibold">{count} kali</p>
                </div>
              ))
            ) : (
              <p className="font-handwriting text-xs text-slate-400 italic col-span-4">
                Belum ada jejak perasaanku yang tersimpan. Klik emoji di atas untuk menambah catatan perasaanmu!
              </p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
