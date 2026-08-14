import React from 'react';
import { Question, ResponseItem } from '../types';
import { HelpCircle, Star, Heart, Check, Lightbulb, Lock, Sparkles, Pencil } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  existingResponse?: ResponseItem;
  onAnswerChange: (questionId: string, text?: string, json?: any) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  existingResponse,
  onAnswerChange
}) => {
  const currentText = existingResponse?.answerText || '';
  const currentJson = existingResponse?.answerJson;

  // Handler jawaban pilihan tunggal
  const handleSingleChoice = (val: string) => {
    onAnswerChange(question.id, val, { selected: val });
  };

  // Handler jawaban pilihan ganda
  const handleMultipleChoice = (val: string) => {
    const prevList: string[] = Array.isArray(currentJson?.selected) ? currentJson.selected : [];
    let updated: string[];
    if (prevList.includes(val)) {
      updated = prevList.filter(item => item !== val);
    } else {
      updated = [...prevList, val];
    }
    onAnswerChange(question.id, updated.join(', '), { selected: updated });
  };

  // Handler pilihan emoji
  const handleEmojiSelect = (val: string) => {
    const prevList: string[] = Array.isArray(currentJson?.selected) ? currentJson.selected : [];
    let updated: string[];
    if (prevList.includes(val)) {
      updated = prevList.filter(item => item !== val);
    } else {
      updated = [...prevList, val];
    }
    onAnswerChange(question.id, updated.join(', '), { selected: updated });
  };

  // Handler skala likert
  const handleLikertSelect = (rating: number) => {
    onAnswerChange(question.id, rating.toString(), { rating });
  };

  // Handler bintang rating
  const handleRatingSelect = (score: number) => {
    onAnswerChange(question.id, score.toString(), { score });
  };

  // Handler Ya / Tidak
  const handleYesNoSelect = (val: 'Ya' | 'Tidak') => {
    onAnswerChange(question.id, val, { val });
  };

  return (
    <div className="bg-[#fcfbf9] rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-300/80 relative overflow-hidden space-y-6">
      
      {/* DEKORASI BINDING RING SPIRAL ATAS */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-slate-200/60 border-b border-slate-300 flex justify-around items-center px-6">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2.5 h-4 bg-slate-700/80 rounded-full border border-slate-900 shadow-xs -mt-2" />
        ))}
      </div>

      <div className="pt-2">

        {/* 1. INPUT TEKS SINGKAT */}
        {question.type === 'short_text' && (
          <div className="relative">
            <input
              type="text"
              value={currentText}
              onChange={(e) => onAnswerChange(question.id, e.target.value, null)}
              placeholder="Tuliskan jawaban singkatmu di sini..."
              className="w-full px-5 py-4 bg-transparent border-b-2 border-slate-400 text-slate-800 focus:outline-none focus:border-slate-800 text-base sm:text-lg font-handwriting leading-loose placeholder:text-slate-400 transition-all"
            />
            <Pencil className="w-4 h-4 text-slate-400 absolute right-3 bottom-4 pointer-events-none opacity-60" />
          </div>
        )}

        {/* 2. JURNAL TEKS PANJANG (GARIS BUKU TULIS) */}
        {question.type === 'long_text' && (
          <div className="relative rounded-2xl p-4 bg-[#fdfdfb] ruled-notebook border border-slate-300/70 shadow-inner">
            <textarea
              value={currentText}
              onChange={(e) => onAnswerChange(question.id, e.target.value, null)}
              rows={7}
              placeholder="Tuliskan cerita atau refleksi jujurmu di sini..."
              className="w-full bg-transparent text-slate-800 focus:outline-none text-base sm:text-lg font-handwriting leading-[32px] resize-y placeholder:text-slate-400"
            />
            <div className="flex items-center justify-end gap-1.5 text-xs font-handwriting text-slate-400 pt-2 border-t border-slate-200/60">
              <Pencil className="w-3.5 h-3.5" />
              <span>Jurnal Refleksi Diri</span>
            </div>
          </div>
        )}

        {/* 3. PILIHAN GANDA (SATU JAWABAN) */}
        {question.type === 'single_choice' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {question.options?.map((opt) => {
              const isSelected = currentText === opt.value;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSingleChoice(opt.value)}
                  className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md font-bold'
                      : 'bg-white border-slate-300 text-slate-800 hover:border-slate-500 hover:bg-slate-50/80 shadow-xs'
                  }`}
                >
                  {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                  <span className="font-handwriting text-sm flex-1 leading-snug">{opt.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {/* 4. PILIHAN GANDA (LEBIH DARI SATU) */}
        {question.type === 'multiple_choice' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {question.options?.map((opt) => {
              const selectedList: string[] = Array.isArray(currentJson?.selected) ? currentJson.selected : [];
              const isSelected = selectedList.includes(opt.value);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleMultipleChoice(opt.value)}
                  className={`p-4 rounded-2xl border text-left flex items-center gap-3.5 transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md font-bold'
                      : 'bg-white border-slate-300 text-slate-800 hover:border-slate-500 hover:bg-slate-50/80 shadow-xs'
                  }`}
                >
                  {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                  <span className="font-handwriting text-sm flex-1 leading-snug">{opt.label}</span>
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-white border-white text-slate-900' : 'border-slate-400 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 5. PILIHAN EMOJI */}
        {question.type === 'emoji_selector' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {question.options?.map((opt) => {
              const selectedList: string[] = Array.isArray(currentJson?.selected) ? currentJson.selected : [];
              const isSelected = selectedList.includes(opt.value);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleEmojiSelect(opt.value)}
                  className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2.5 text-center transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.04]'
                      : 'bg-white border-slate-300 text-slate-800 hover:border-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl animate-bounce-short">{opt.icon || '😊'}</span>
                  <span className="font-handwriting text-sm font-bold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 6. SKALA PENILAIAN (1 - 5) */}
        {question.type === 'likert_scale' && (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2 sm:gap-3.5">
              {[1, 2, 3, 4, 5].map((num) => {
                const isSelected = currentJson?.rating === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleLikertSelect(num)}
                    className={`py-4 sm:py-5 rounded-2xl border font-extrabold text-base sm:text-xl transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-md scale-105'
                        : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-xs font-handwriting text-slate-500 px-1">
              <span>1 = Sangat Ringan / Jarang</span>
              <span>5 = Sangat Berat / Selalu</span>
            </div>
          </div>
        )}

        {/* 7. RATING BINTANG */}
        {question.type === 'rating' && (
          <div className="flex items-center justify-center gap-3 py-6">
            {[1, 2, 3, 4, 5].map((score) => {
              const active = (currentJson?.score || 0) >= score;
              return (
                <button
                  key={score}
                  type="button"
                  onClick={() => handleRatingSelect(score)}
                  className="p-2 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-9 h-9 sm:w-11 sm:h-11 transition-colors ${
                      active ? 'fill-slate-900 text-slate-900' : 'text-slate-300 hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* 8. YA / TIDAK */}
        {question.type === 'yes_no' && (
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {(['Ya', 'Tidak'] as const).map((choice) => {
              const isSelected = currentJson?.val === choice;
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => handleYesNoSelect(choice)}
                  className={`py-4 px-6 rounded-2xl border font-bold text-sm transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
