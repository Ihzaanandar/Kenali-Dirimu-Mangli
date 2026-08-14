import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionCard } from './QuestionCard';
import { ChevronLeft, ChevronRight, ArrowLeft, Send, Sparkles, Heart, Lightbulb, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WorkbookSession: React.FC = () => {
  const { activeWorkbook, activeSession, responses, saveAnswer, completeSession, setCurrentView } = useApp();

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!activeWorkbook || !activeSession) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl shadow border">
        <p className="text-slate-600 font-semibold mb-4">Sesi tidak ditemukan atau telah berakhir.</p>
        <button
          onClick={() => setCurrentView('landing')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const sections = activeWorkbook.sections;
  const currentSection = sections[currentSectionIndex] || sections[0];
  const questions = currentSection.questions;
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  // Calculate total questions & total answered
  const allQuestions = sections.flatMap(s => s.questions);
  const totalQuestions = allQuestions.length;
  const answeredCount = Object.keys(responses).length;
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  // Find absolute question index out of totalQuestions
  let globalQuestionIndex = 0;
  for (let sIdx = 0; sIdx < currentSectionIndex; sIdx++) {
    globalQuestionIndex += sections[sIdx].questions.length;
  }
  globalQuestionIndex += currentQuestionIndex + 1;

  // Auto scroll to top of page whenever session mounts or question changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentSectionIndex, currentQuestionIndex]);

  // Auto resume to last unanswered question on initial load
  useEffect(() => {
    let foundSecIdx = 0;
    let foundQIdx = 0;
    let foundUnanswered = false;

    for (let sIdx = 0; sIdx < sections.length; sIdx++) {
      const qList = sections[sIdx].questions;
      for (let qIdx = 0; qIdx < qList.length; qIdx++) {
        if (!responses[qList[qIdx].id]) {
          foundSecIdx = sIdx;
          foundQIdx = qIdx;
          foundUnanswered = true;
          break;
        }
      }
      if (foundUnanswered) break;
    }

    setCurrentSectionIndex(foundSecIdx);
    setCurrentQuestionIndex(foundQIdx);
  }, []);

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
      setCurrentQuestionIndex(sections[prevSecIdx].questions.length - 1);
    }
  };

  const handleFinish = () => {
    try {
      confetti({
        particleCount: 140,
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

  // Determine pencil sketch illustration based on question / section topic
  let sketchIllustration = currentQuestion.imageUrl || '/assets/teen_scribble_reflection.png';
  if (!currentQuestion.imageUrl) {
    if (currentSection.title.toLowerCase().includes('perundungan') || currentSection.title.toLowerCase().includes('perteman')) {
      sketchIllustration = '/assets/teen_scribble_bullying.png';
    } else if (currentSection.title.toLowerCase().includes('sekolah') || currentSection.title.toLowerCase().includes('tekanan')) {
      sketchIllustration = '/assets/teen_scribble_school.png';
    } else if (currentSection.title.toLowerCase().includes('media sosial')) {
      sketchIllustration = '/assets/teen_social_media.png';
    } else if (currentSection.title.toLowerCase().includes('perasaan') || currentSection.title.toLowerCase().includes('emosi')) {
      sketchIllustration = '/assets/teen_emotions_moods.png';
    } else if (currentSection.title.toLowerCase().includes('masa depan')) {
      sketchIllustration = '/assets/teen_future_hopes.png';
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fadeIn">
      
      {/* TOP HEADER TRACKER BAR (MATCHING REFERENCE SCREENSHOT TOP BAR) */}
      <div className="bg-white/90 rounded-2xl p-4 shadow-xs border border-slate-200 flex items-center justify-between gap-4">
        
        {/* Back Button */}
        <button
          onClick={handlePrev}
          disabled={isFirstQuestion}
          className={`p-2 rounded-xl text-slate-700 transition-colors ${
            isFirstQuestion ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100'
          }`}
          title="Pertanyaan Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
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

        {/* Top Right Save Status */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-300/80"
          >
            <Save className="w-3.5 h-3.5 text-slate-600" />
            <span>Simpan</span>
          </button>
        </div>

      </div>

      {/* DUAL COLUMN JOURNAL LAYOUT (MATCHING REFERENCE SCREENSHOT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Taped Sticky Note Question Card & Pencil Sketch Illustration */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          
          {/* TAPED STICKY NOTE QUESTION CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-300/80 relative space-y-6">
            
            {/* Masking Tape Strips Top Edge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-strip rounded-sm transform -rotate-1 pointer-events-none" />

            {/* Question Text in Realistic Handwriting Font */}
            <div className="pt-2 text-center space-y-2">
              <h2 className="font-heading-hand text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                "{currentQuestion.questionText}"
              </h2>
              {currentQuestion.helperText && (
                <p className="font-handwriting text-sm text-slate-500">{currentQuestion.helperText}</p>
              )}
            </div>

            {/* Pencil Sketch Artwork Illustration Frame */}
            <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-2 shadow-inner group relative">
              <img
                src={sketchIllustration}
                alt={currentQuestion.questionText}
                className="w-full h-56 sm:h-64 object-contain rounded-xl transform group-hover:scale-102 transition-transform duration-500"
              />
            </div>

          </div>

          {/* TIPS BOX (MATCHING REFERENCE SCREENSHOT TIPS BOX) */}
          <div className="p-4 rounded-2xl bg-white/90 border border-slate-300/80 shadow-xs flex items-start gap-3 text-xs text-slate-700">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold font-handwriting text-sm text-slate-900">Tips</p>
              <p className="font-handwriting text-xs text-slate-600 leading-relaxed mt-0.5">
                Tidak ada jawaban salah. Ceritakan dengan jujur dan sesuai kenyamananmu.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Ring-Bound Spiral Notebook Interactive Input Area */}
        <div className="lg:col-span-7 space-y-6">
          
          <QuestionCard
            question={currentQuestion}
            existingResponse={responses[currentQuestion.id]}
            onAnswerChange={saveAnswer}
          />

          {/* Action Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirstQuestion}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold transition-all ${
                isFirstQuestion
                  ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
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
