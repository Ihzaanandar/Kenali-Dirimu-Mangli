import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionCard } from './QuestionCard';
import { ChevronLeft, Save, Lightbulb, CheckCircle2, BookOpen, ArrowLeft, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WorkbookSession: React.FC = () => {
  const { activeWorkbook, activeSession, responses, allResponses, currentUser, saveAnswer, completeSession, setCurrentView, workbooks, startWorkbook } = useApp();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isChoosingWorkbook, setIsChoosingWorkbook] = useState(true);

  const publishedWorkbooks = (workbooks || []).filter(w => w.status === 'published');
  const sections = (activeWorkbook && activeWorkbook.sections) ? activeWorkbook.sections : [];

  // ALL HOOKS DECLARED AT THE TOP OF THE COMPONENT BEFORE ANY CONDITIONAL RETURN

  // Hook 1: Auto start session if activeWorkbook exists but activeSession is missing
  useEffect(() => {
    if (!activeSession && activeWorkbook) {
      startWorkbook(activeWorkbook.id);
    }
  }, [activeSession, activeWorkbook]);

  // Hook 2: Reset section & question index if out of bounds
  useEffect(() => {
    if (currentSectionIndex >= sections.length && sections.length > 0) {
      setCurrentSectionIndex(0);
      setCurrentQuestionIndex(0);
    }
  }, [sections.length, currentSectionIndex]);

  // Hook 3: Auto scroll to top on section or question change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentSectionIndex, currentQuestionIndex]);

  // CONDITIONAL RETURNS BELOW ALL HOOKS FOR 100% HOOK SAFETY
  if (isChoosingWorkbook || !activeWorkbook) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-200/70 border border-slate-300 text-xs font-bold font-handwriting text-slate-800">
            <span>📖 PILIH WORKBOOK REFLEKSI</span>
          </div>
          <h2 className="font-heading-hand text-4xl sm:text-5xl font-extrabold text-slate-900">
            Pilih Journal Yang Ingin Kamu Fokuskan
          </h2>
          <p className="font-handwriting text-base text-slate-600 max-w-lg mx-auto">
            Pilih salah satu jurnal refleksi di bawah ini untuk memulai atau melanjutkan sesi tulismu.
          </p>
        </div>

        {/* Workbook Cards Grid */}
        {publishedWorkbooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publishedWorkbooks.map(wb => {
              const wbSections = wb.sections || [];
              const totalQ = wbSections.reduce((acc, s) => acc + (s.questions?.length || 0), 0);
              
              const allQIds = wbSections.flatMap(s => (s.questions || []).map(q => q.id));
              const studentRes = (allResponses || []).filter(r => r.studentId === (currentUser?.id || 'guest_user'));
              const answeredInWb = studentRes.filter(r => allQIds.includes(r.questionId) && (!!r.answerText || !!r.answerJson)).length;
              
              const progress = totalQ > 0 ? Math.round((answeredInWb / totalQ) * 100) : 0;
              const isSelected = activeWorkbook?.id === wb.id;

              return (
                <div
                  key={wb.id}
                  onClick={() => {
                    startWorkbook(wb.id);
                    setIsChoosingWorkbook(false);
                    setCurrentSectionIndex(0);
                    setCurrentQuestionIndex(0);
                  }}
                  className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xs border transition-all cursor-pointer space-y-5 relative flex flex-col justify-between group ${
                    isSelected
                      ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-md'
                      : 'border-slate-300 hover:border-slate-500 hover:shadow-md'
                  }`}
                >
                  {/* Masking Tape Decoration */}
                  <div className="absolute -top-3 left-8 w-24 h-5 tape-strip rounded-sm transform -rotate-2 pointer-events-none" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold font-handwriting border border-slate-300">
                        {wbSections.length} Section • {totalQ} Pertanyaan
                      </span>
                      {progress > 0 && (
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {progress}% Selesai
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-heading-hand text-3xl font-extrabold text-slate-900 group-hover:scale-101 transition-transform">
                        {wb.title}
                      </h3>
                      {wb.subtitle && (
                        <p className="font-handwriting text-sm text-slate-700 font-bold italic">
                          "{wb.subtitle}"
                        </p>
                      )}
                      <p className="font-handwriting text-sm text-slate-600 leading-relaxed pt-1">
                        {wb.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      className="btn-charcoal w-full py-3 px-5 font-bold text-xs shadow flex items-center justify-center gap-2"
                    >
                      <span>{progress > 0 ? 'Lanjutkan Journaling Ini →' : 'Fokus & Kerjakan Journal Ini →'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-300 space-y-3 font-handwriting">
            <p className="text-base text-slate-600">Belum ada workbook yang diaktifkan oleh Psikolog Admin.</p>
            <button
              onClick={() => setCurrentView('landing')}
              className="btn-charcoal px-6 py-2.5 text-xs font-bold"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}

      </div>
    );
  }

  const currentSection = sections[currentSectionIndex] || sections[0] || { id: 'sec_def', title: 'Section', icon: '🌱', questions: [] };
  const questions = currentSection.questions || [];
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const allQuestions = sections.flatMap(s => s.questions || []);
  const totalQuestions = allQuestions.length;
  const answeredCount = Object.keys(responses || {}).length;
  const progressPercentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Find absolute question index out of totalQuestions
  let globalQuestionIndex = 0;
  for (let sIdx = 0; sIdx < currentSectionIndex; sIdx++) {
    globalQuestionIndex += (sections[sIdx]?.questions?.length || 0);
  }
  globalQuestionIndex += currentQuestionIndex + 1;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      const prevSecIdx = currentSectionIndex - 1;
      setCurrentSectionIndex(prevSecIdx);
      setCurrentQuestionIndex((sections[prevSecIdx]?.questions?.length || 1) - 1);
    }
  };

  const handleFinish = () => {
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
    completeSession();
  };

  const isFirstQuestion = currentSectionIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion =
    currentSectionIndex === sections.length - 1 &&
    currentQuestionIndex === questions.length - 1;

  let sketchIllustration = currentQuestion?.imageUrl || '/assets/teen_scribble_reflection.png';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      
      {/* TOP TRACKER & NAVIGATION BAR */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-300 flex items-center justify-between gap-4">
        
        {/* Switch Workbook Button */}
        <button
          onClick={() => setIsChoosingWorkbook(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold font-handwriting border border-slate-300 shrink-0"
          title="Ganti ke workbook lain"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Pilih Workbook Lain</span>
        </button>

        {/* Center Tracker & Progress Bar */}
        <div className="flex-1 max-w-xl mx-auto space-y-1.5 text-center">
          <div className="flex justify-between items-center font-handwriting text-sm text-slate-700 font-bold px-1">
            <span>Pertanyaan {globalQuestionIndex} dari {totalQuestions}</span>
            <span>{progressPercentage}%</span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-slate-900 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Top Right Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCurrentView('progress')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold font-handwriting border border-slate-300"
          >
            <span>Peta Progres →</span>
          </button>
        </div>

      </div>

      {/* SECTION TABS / DROPDOWN SELECTOR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {sections.map((sec, idx) => {
          const isActive = idx === currentSectionIndex;
          const secQuestions = sec.questions || [];
          const secAnswered = secQuestions.filter(q => !!responses[q.id]?.answerText || !!responses[q.id]?.answerJson).length;
          const isDone = secAnswered === secQuestions.length && secQuestions.length > 0;
          return (
            <button
              key={sec.id}
              onClick={() => {
                setCurrentSectionIndex(idx);
                setCurrentQuestionIndex(0);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold font-handwriting whitespace-nowrap shrink-0 transition-all border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs scale-102'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span>{sec.icon || '🌱'} {sec.title}</span>
              {isDone && <span className="ml-1 text-emerald-600">✓</span>}
            </button>
          );
        })}
      </div>

      {/* DUAL COLUMN JOURNAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Question Sticky Note Card & Illustration */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          
          {/* TAPED STICKY NOTE QUESTION CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-300 relative space-y-6">
            
            {/* Masking Tape Strips Top Edge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-strip rounded-sm transform -rotate-1 pointer-events-none" />

            {/* Section & Question Tag */}
            <div className="text-center pt-2 flex items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold font-handwriting border border-slate-300">
                {currentSection?.icon || '🌱'} {currentSection?.title}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-xs font-bold font-handwriting shadow-2xs">
                Soal #{String(globalQuestionIndex).padStart(2, '0')}
              </span>
            </div>

            {/* Question Text in Realistic Handwriting Font */}
            <div className="text-center space-y-2">
              <h2 className="font-heading-hand text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                "{currentQuestion?.questionText}"
              </h2>
              {currentQuestion?.helperText && (
                <p className="font-handwriting text-sm text-slate-500">{currentQuestion.helperText}</p>
              )}
            </div>

            {/* Pencil Sketch Artwork Frame */}
            <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-2 shadow-inner group relative">
              <img
                src={sketchIllustration}
                onError={(e) => {
                  const target = e.currentTarget;
                  const padNum = String(globalQuestionIndex).padStart(2, '0');
                  target.src = `/assets/${padNum}.png`;
                }}
                alt={currentQuestion?.questionText}
                className="w-full h-52 sm:h-60 object-contain rounded-xl transform group-hover:scale-102 transition-transform duration-500"
              />
            </div>

          </div>

          {/* TIPS BOX */}
          <div className="p-4 rounded-2xl bg-white border border-slate-300 shadow-xs flex items-start gap-3 text-xs text-slate-700">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold font-handwriting text-sm text-slate-900">Tips Refleksi</p>
              <p className="font-handwriting text-xs text-slate-600 leading-relaxed mt-0.5">
                Tidak ada jawaban salah. Ceritakan dengan jujur dan sesuai kenyamananmu.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Notebook Input Area */}
        <div className="lg:col-span-7 space-y-6">
          
          {currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              existingResponse={responses[currentQuestion.id]}
              onAnswerChange={saveAnswer}
            />
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-300 text-center font-handwriting text-slate-500">
              Belum ada pertanyaan pada section ini.
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirstQuestion}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold transition-all ${
                isFirstQuestion
                  ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs font-handwriting text-sm'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {isLastQuestion ? (
              <button
                type="button"
                onClick={handleFinish}
                className="btn-charcoal px-7 py-3.5 flex items-center gap-2 font-bold text-xs shadow-md animate-bounce-short"
              >
                <span>Selesaikan & Lihat Ringkasan →</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="btn-charcoal px-7 py-3.5 flex items-center gap-2 font-bold text-xs shadow-md"
              >
                <span>Selanjutnya →</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
