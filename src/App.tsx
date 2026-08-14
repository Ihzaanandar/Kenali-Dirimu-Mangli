import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { WorkbookSession } from './components/WorkbookSession';
import { PersonalSummary } from './components/PersonalSummary';
import { AdminDashboard } from './components/AdminDashboard';
import { SafetyDisclaimerModal } from './components/SafetyDisclaimerModal';
import { HelplineModal } from './components/HelplineModal';

import {
  Home,
  BookOpen,
  Heart,
  User,
  LayoutDashboard,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentUser,
    currentView,
    workbooks,
    startWorkbook,
    setCurrentView
  } = useApp();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const publishedWorkbooks = workbooks.filter(wb => wb.status === 'published');
  const activePublishedWb = publishedWorkbooks[0] || workbooks[0];

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  const handleStartReflection = (workbookId: string) => {
    if (!currentUser) {
      setIsAuthOpen(true);
    } else {
      startWorkbook(workbookId);
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('workbook-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f2ee] text-slate-800 font-sans selection:bg-slate-300">
      
      {/* NAVBAR NAVIGASI ATAS GLASSMORPHISM */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenHelpline={() => setIsHelplineOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
      />

      {/* TAMPILAN KONTEN UTAMA */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
        
        {currentView === 'session' && <WorkbookSession />}

        {currentView === 'summary' && (
          <PersonalSummary onOpenHelpline={() => setIsHelplineOpen(true)} />
        )}

        {currentView === 'admin' && <AdminDashboard />}

        {currentView === 'landing' && (
          <div className="max-w-5xl mx-auto space-y-12 pb-16 animate-fadeIn">
            
            {/* HER0 COVER DEPAN ELEGAN & MODERN */}
            <section className="bg-white rounded-3xl p-8 sm:p-14 shadow-lg border border-slate-300 relative overflow-hidden text-center space-y-8">
              
              {/* Aksen Selotip Kertas Atas */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-7 tape-strip rounded-sm transform rotate-1 pointer-events-none" />

              {/* Judul & Subjudul */}
              <div className="space-y-3 pt-4">
                <h1 className="font-heading-hand text-5xl sm:text-7xl font-extrabold text-slate-900 leading-tight">
                  Jurnal Refleksi Diri
                </h1>
                <div className="w-48 h-1 bg-slate-800 mx-auto rounded-full opacity-80" />
                <p className="font-handwriting text-lg sm:text-xl text-slate-600 max-w-lg mx-auto leading-relaxed pt-2">
                  Tempat aman untuk mengenal diri, memahami perasaan, dan bertumbuh setiap hari.
                </p>
              </div>

              {/* Tombol Utama (Scroll Halus ke Katalog) */}
              <div className="pt-2">
                <button
                  onClick={scrollToCatalog}
                  className="btn-charcoal px-8 py-4 text-sm sm:text-base font-bold tracking-wide shadow-lg flex items-center justify-center gap-2 mx-auto"
                >
                  <span>Mulai Refleksi Sekarang ↓</span>
                </button>
              </div>

              {/* Gambar Sketsa Pensil */}
              <div className="py-4 flex justify-center">
                <div className="max-w-md w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50/60 p-2 shadow-xs">
                  <img
                    src="/assets/teen_scribble_bullying.png"
                    alt="Ilustrasi Pensil Refleksi Diri"
                    className="w-full h-72 sm:h-80 object-contain rounded-xl"
                  />
                </div>
              </div>

              {/* Catatan Sticky Note Selotip */}
              <div className="sm:absolute sm:bottom-6 sm:left-6 w-full sm:w-56 p-4 bg-yellow-50/90 border border-yellow-200 shadow-sm rounded-xl text-left relative transform sm:-rotate-3">
                <div className="absolute -top-2.5 left-4 w-16 h-5 tape-strip rounded-xs" />
                <p className="font-handwriting text-sm text-slate-800 font-bold leading-snug">
                  Ceritamu berharga. Kamu penting. ♡
                </p>
              </div>

              {/* Pesan Penutup */}
              <p className="font-handwriting text-base text-slate-500 pt-4">
                Kamu berharga apa adanya. ♡
              </p>

            </section>

            {/* KATALOG BOOKLET WORKBOOK */}
            <section id="workbook-catalog" className="space-y-6 scroll-mt-24">
              <div className="text-center space-y-1">
                <h2 className="font-heading-hand text-3xl font-bold text-slate-900">
                  Daftar Booklet Refleksi Diri
                </h2>
                <p className="font-handwriting text-sm text-slate-500">
                  Pilih topik refleksi yang sedang kamu rasakan hari ini.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {publishedWorkbooks.map((wb) => (
                  <div
                    key={wb.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-300 space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300">
                          {wb.sections.length} Section • {wb.sections.reduce((acc, s) => acc + s.questions.length, 0)} Soal
                        </span>
                        <span className="text-xs font-handwriting text-slate-400">Versi {wb.version}</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-heading-hand text-2xl font-bold text-slate-900">
                          {wb.title}
                        </h3>
                        <p className="font-handwriting text-sm text-slate-600 leading-relaxed">
                          {wb.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartReflection(wb.id)}
                      className="btn-charcoal w-full py-3.5 px-5 font-bold text-xs shadow flex items-center justify-center gap-2"
                    >
                      <span>Buka Workbook Ini →</span>
                    </button>
                  </div>
                ))}

                {publishedWorkbooks.length === 0 && (
                  <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-slate-300 p-8 font-handwriting text-base text-slate-500">
                    Belum ada workbook yang diaktifkan oleh Psikolog Admin.
                  </div>
                )}
              </div>
            </section>

          </div>
        )}

      </main>

      {/* FOOTER BAWAH BERSERTA MODAL */}
      <footer className="py-6 px-4 text-center border-t border-slate-300/70 text-xs font-handwriting text-slate-500 bg-[#f8f7f3]">
        <p>© 2026 Kenali Dirimu • Interactive Psychological Workbook & Self-Talk Journal Remaja</p>
      </footer>

      {/* MODAL DIALOG */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <SafetyDisclaimerModal isOpen={isDisclaimerOpen} onClose={() => setIsDisclaimerOpen(false)} />
      <HelplineModal isOpen={isHelplineOpen} onClose={() => setIsHelplineOpen(false)} />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
