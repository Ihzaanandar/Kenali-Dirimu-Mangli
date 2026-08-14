import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, BookOpen, Trash2, ArrowRight } from 'lucide-react';

export const FavoritesSection: React.FC = () => {
  const { favorites, toggleFavorite, workbooks, responses, setCurrentView } = useApp();

  // Search ALL workbooks for favorited questions, not just activeWorkbook
  const allQuestions = (workbooks || []).flatMap(wb =>
    (wb.sections || []).flatMap(s => (s.questions || []))
  );
  const favoriteQuestions = allQuestions.filter(q => favorites.includes(q.id));

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold font-handwriting text-rose-800">
          <span>🤍 FAVORIT SAYA</span>
        </div>
        <h2 className="font-heading-hand text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
          Pertanyaan & Refleksi Bermakna
        </h2>
        <p className="font-handwriting text-sm sm:text-base text-slate-600">
          Kumpulan pertanyaan dan cerita yang pernah kamu tandai sebagai favorit.
        </p>
      </div>

      {favoriteQuestions.length > 0 ? (
        <div className="space-y-4">
          {favoriteQuestions.map(q => {
            const userResponse = responses[q.id];
            return (
              <div key={q.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-300 shadow-xs space-y-3 relative">
                
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-heading-hand text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      "{q.questionText}"
                    </h3>
                    {q.helperText && (
                      <p className="font-handwriting text-xs sm:text-sm text-slate-500">{q.helperText}</p>
                    )}
                  </div>

                  <button
                    onClick={() => toggleFavorite(q.id)}
                    className="p-2.5 rounded-xl text-rose-500 bg-rose-50 hover:bg-rose-100 transition-colors shrink-0"
                    title="Hapus dari favorit"
                  >
                    <Heart className="w-5 h-5 fill-rose-500" />
                  </button>
                </div>

                {/* Response Item if answered */}
                {userResponse?.answerText ? (
                  <div className="p-3 sm:p-4 rounded-2xl bg-[#fcfbf9] border border-slate-200 space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-handwriting">
                      Refleksimu:
                    </p>
                    <p className="font-handwriting text-base sm:text-lg text-slate-800 italic leading-relaxed">
                      "{userResponse.answerText}"
                    </p>
                  </div>
                ) : (
                  <p className="font-handwriting text-xs text-slate-400 italic">
                    Belum dijawab. Buka Journal untuk menulis refleksi soal ini.
                  </p>
                )}

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-300 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-3xl">
            🤍
          </div>
          <div className="space-y-1">
            <h3 className="font-heading-hand text-2xl font-bold text-slate-900">
              Belum ada favorit yang disimpan.
            </h3>
            <p className="font-handwriting text-sm sm:text-base text-slate-600 max-w-md mx-auto">
              Saat mengisi journal, kamu bisa menekan ikon hati 🤍 pada pertanyaan yang paling berkesan untuk menyimpannya di sini.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('session')}
            className="btn-charcoal px-6 py-3 text-sm font-bold shadow-md inline-flex items-center gap-2"
          >
            <span>Mulai Journaling →</span>
          </button>
        </div>
      )}

    </div>
  );
};
