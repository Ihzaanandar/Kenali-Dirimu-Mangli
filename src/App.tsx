import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { WorkbookSession } from './components/WorkbookSession';
import { PersonalSummary } from './components/PersonalSummary';
import { AdminDashboard } from './components/AdminDashboard';
import { ProgressJourney } from './components/ProgressJourney';
import { ProfileSection } from './components/ProfileSection';
import { AboutSection } from './components/AboutSection';
import { FavoritesSection } from './components/FavoritesSection';
import { SafetyDisclaimerModal } from './components/SafetyDisclaimerModal';
import { HelplineModal } from './components/HelplineModal';

import {
  Menu,
  X,
  Heart,
  BookOpen,
  User,
  BarChart3,
  Info,
  ShieldAlert,
  ChevronDown,
  Home,
  LogOut
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentUser,
    currentView,
    workbooks,
    startWorkbook,
    setCurrentView,
    logout
  } = useApp();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const publishedWorkbooks = workbooks.filter(wb => wb.status === 'published');
  const activeWb = publishedWorkbooks[0] || workbooks[0];

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsMobileMenuOpen(false);
  }, [currentView]);

  const handleStartJournaling = () => {
    if (!currentUser) {
      setIsAuthOpen(true);
    } else {
      setCurrentView('session');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-slate-800 font-sans flex flex-col md:flex-row selection:bg-slate-300">
      
      {/* SIDEBAR NAVIGATION (DESKTOP) */}
      <Sidebar onOpenAuth={() => setIsAuthOpen(true)} />

      {/* MOBILE TOP BAR NAVIGATION */}
      <header className="md:hidden sticky top-0 z-40 bg-[#f8f7f3]/95 backdrop-blur-md border-b border-slate-300/80 p-4 flex items-center justify-between">
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <h1 className="font-heading-hand text-2xl font-extrabold text-slate-900 leading-none">
            My Unsaid Journal
          </h1>
          <span className="text-slate-800 text-xs">♡</span>
        </div>

        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentView('profile')}
                className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-xs"
                title="Buka Profil"
              >
                {currentUser.displayName.charAt(0).toUpperCase()}
              </button>
              <button
                onClick={logout}
                className="p-1.5 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-300 bg-white transition-colors"
                title="Keluar Akun"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-full"
            >
              Masuk
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-xl text-slate-700 hover:bg-slate-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-[#f8f7f3] border-b border-slate-300 p-4 z-40 space-y-2 shadow-lg animate-fadeIn">
          {[
            { id: 'landing', label: 'Beranda', icon: '🏠' },
            { id: 'session', label: 'Journal', icon: '📖' },
            { id: 'favorites', label: 'Favorit', icon: '🤍' },
            { id: 'progress', label: 'Progres', icon: '📊' },
            { id: 'profile', label: 'Profil', icon: '👤' },
            { id: 'about', label: 'Tentang', icon: 'ℹ️' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'session') handleStartJournaling();
                else setCurrentView(item.id as any);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left p-3 rounded-xl font-handwriting text-base font-bold text-slate-800 hover:bg-white flex items-center gap-3 border border-transparent hover:border-slate-200"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => {
                setCurrentView('admin');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left p-3 rounded-xl font-bold text-xs bg-slate-900 text-white"
            >
              Panel Admin
            </button>
          )}

          {currentUser && (
            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl font-handwriting text-base font-bold text-rose-600 bg-rose-50/70 hover:bg-rose-100 flex items-center gap-3 border border-rose-200 transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Keluar Akun ({currentUser.displayName})</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 px-3 py-2 sm:p-8 max-w-6xl w-full mx-auto pb-20 md:pb-8">
        
        {/* VIEW CONDITIONAL ROUTING */}
        {currentView === 'session' && <WorkbookSession />}
        {currentView === 'progress' && <ProgressJourney onStartJournaling={handleStartJournaling} />}
        {currentView === 'profile' && <ProfileSection />}
        {currentView === 'about' && <AboutSection />}
        {currentView === 'favorites' && <FavoritesSection />}
        {currentView === 'summary' && <PersonalSummary onOpenHelpline={() => setIsHelplineOpen(true)} />}
        {currentView === 'admin' && <AdminDashboard />}

        {/* 🏠 LANDING PAGE (HERO MATCHING REFERENCE SCREENSHOT) */}
        {currentView === 'landing' && (
          <div className="space-y-12 pb-12 animate-fadeIn">
            
            {/* HERO CARD MATCHING REFERENCE SCREENSHOT */}
            <section className="bg-white rounded-3xl p-6 sm:p-12 shadow-xs border border-slate-300 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Masking Tape Decoration */}
              <div className="absolute -top-3 left-10 w-28 h-6 tape-strip rounded-sm transform -rotate-2 pointer-events-none" />

              {/* LEFT HERO COLUMN: Title, Tagline, Scribble CTA, Subtext */}
              <div className="lg:col-span-6 space-y-6 text-left">
                
                {/* Handwritten Big Title */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2">
                    <h1 className="font-heading-hand text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight leading-none">
                      My Unsaid Journal
                    </h1>
                    <span className="text-slate-900 text-3xl font-extrabold">♡</span>
                  </div>

                  {/* Subtagline Quote */}
                  <div className="pt-2">
                    <p className="font-handwriting text-xl sm:text-2xl text-slate-700 italic">
                      “ A journal for everything you never got to say. ”
                    </p>
                    <p className="font-handwriting text-base text-slate-600 mt-1">
                      Jurnal untuk semua hal yang belum pernah kamu katakan.
                    </p>
                  </div>
                </div>

                {/* Primary Scribble CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={handleStartJournaling}
                    className="btn-charcoal px-8 py-4 text-base sm:text-lg font-bold font-handwriting tracking-wide shadow-lg flex items-center justify-center gap-3 w-full sm:w-auto"
                  >
                    <span>Mulai Journaling</span>
                    <span className="text-xl">→</span>
                  </button>
                </div>

                {/* Subtext Quote Box */}
                <div className="p-4 rounded-2xl bg-[#fcfbf9] border-l-4 border-slate-900 border-slate-200 text-slate-700 font-handwriting text-base leading-relaxed space-y-1">
                  <p>Di sini, kamu boleh jujur.</p>
                  <p>Nggak harus kuat.</p>
                  <p>Nggak harus punya jawaban.</p>
                  <p className="font-bold text-slate-900">Cukup jadi dirimu sendiri.</p>
                </div>

              </div>

              {/* RIGHT HERO COLUMN: Sketch Illustration of Sitting Teen in Window & Thought Bubbles */}
              <div className="lg:col-span-6 relative flex flex-col items-center justify-center pt-6 lg:pt-0">
                
                {/* Thought Bubbles Array */}
                <div className="w-full space-y-2 max-w-sm mb-4 relative z-10">
                  <div className="thought-bubble text-xs sm:text-sm text-slate-800 w-fit ml-auto">
                    Kenapa aku selalu merasa kurang?
                  </div>
                  <div className="thought-bubble text-xs sm:text-sm text-slate-800 w-fit mx-auto">
                    Aku sebenarnya capek.
                  </div>
                  <div className="thought-bubble text-xs sm:text-sm text-slate-800 w-fit mr-auto">
                    Aku bilang gapapa, padahal...
                  </div>
                  <div className="thought-bubble text-xs sm:text-sm text-slate-800 w-fit ml-auto">
                    Aku takut mengecewakan mereka.
                  </div>
                  <div className="thought-bubble text-xs sm:text-sm text-slate-800 w-fit mx-auto">
                    Aku kangen diriku yang dulu.
                  </div>
                </div>

                {/* Pencil Sketch Teen Artwork Frame */}
                <div className="w-full max-w-md rounded-3xl overflow-hidden border border-slate-300 bg-slate-50 p-2 shadow-xs relative">
                  <img
                    src="/assets/teen_scribble_reflection.png"
                    alt="My Unsaid Journal Pencil Sketch"
                    className="w-full h-64 sm:h-80 object-contain rounded-2xl grayscale contrast-125"
                  />

                  {/* Torn Paper Overlay Effect */}
                  <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-slate-400 rounded-tr-2xl pointer-events-none opacity-40" />
                </div>

                {/* Bottom Right Sticky Note */}
                <div className="mt-4 sm:absolute sm:-bottom-4 sm:-right-2 w-full sm:w-56 p-3 bg-yellow-50/95 border border-yellow-200 shadow-md rounded-xl text-left relative transform rotate-2 z-20">
                  <div className="absolute -top-2 left-4 w-12 h-4 tape-strip rounded-xs" />
                  <p className="font-handwriting text-xs sm:text-sm text-slate-800 font-bold leading-snug">
                    Beberapa pikiran hanya membutuhkan tempat untuk dituangkan. ♡
                  </p>
                </div>

              </div>

            </section>

            {/* SCROLL INDICATOR */}
            <div className="text-center font-handwriting text-xs text-slate-400 flex flex-col items-center gap-1">
              <span>Scroll untuk tahu lebih banyak</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </div>

            {/* QUICK OVERVIEW SECTIONS CATALOG */}
            <section className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="font-heading-hand text-3xl font-bold text-slate-900">
                  10 Bagian Refleksi Diri
                </h2>
                <p className="font-handwriting text-sm text-slate-600">
                  Setiap bagian berisi 5 pertanyaan sederhana untuk mendengarkan isi hatimu.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeWb.sections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    onClick={() => {
                      if (!currentUser) setIsAuthOpen(true);
                      else {
                        startWorkbook(activeWb.id);
                        setCurrentView('session');
                      }
                    }}
                    className="group bg-white rounded-3xl p-5 sm:p-6 border border-slate-300 shadow-xs hover:border-slate-500 hover:shadow-md transition-all cursor-pointer flex items-start gap-3 sm:gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-2xl shrink-0">
                      {sec.icon || '🌱'}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading-hand text-xl font-bold text-slate-900 group-hover:scale-101 transition-transform">
                          {sec.title}
                        </h3>
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          5 Pertanyaan
                        </span>
                      </div>
                      <p className="font-handwriting text-sm text-slate-600 leading-relaxed">
                        {sec.description}
                      </p>
                      <div className="pt-2 text-xs font-handwriting font-bold text-slate-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Kerjakan section ini</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

      </main>

      {/* 📱 MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#f8f7f3]/95 backdrop-blur-md border-t border-slate-300/80 flex items-center justify-around py-1.5 px-1 safe-area-bottom">
        {[
          { id: 'landing', label: 'Beranda', Icon: Home },
          { id: 'session', label: 'Journal', Icon: BookOpen },
          { id: 'favorites', label: 'Favorit', Icon: Heart },
          { id: 'progress', label: 'Progres', Icon: BarChart3 },
          { id: 'profile', label: 'Profil', Icon: User },
        ].map(item => {
          const isActive = currentView === item.id || (item.id === 'session' && currentView === 'summary');
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'session') handleStartJournaling();
                else setCurrentView(item.id as any);
              }}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl min-w-[56px] transition-all ${
                isActive
                  ? 'text-slate-900 font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <item.Icon className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
              <span className={`text-[10px] font-handwriting leading-none ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && <div className="w-4 h-0.5 bg-slate-900 rounded-full mt-0.5" />}
            </button>
          );
        })}
      </nav>

      {/* MODAL DIALOGS */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <SafetyDisclaimerModal isOpen={isDisclaimerOpen} onClose={() => setIsDisclaimerOpen(false)} />
      <HelplineModal isOpen={isHelplineOpen} onClose={() => setIsHelplineOpen(false)} />

    </div>
  );
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('kd_active_session');
      localStorage.removeItem('kd_active_workbook');
      localStorage.removeItem('kd_workbooks');
    } catch {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-300 max-w-lg space-y-4 font-handwriting">
            <h2 className="font-heading-hand text-3xl font-bold text-slate-900">Terjadi Kesalahan Tampilan</h2>
            <p className="text-sm text-slate-600">Sistem mendeteksi pembaruan data. Silakan klik tombol di bawah untuk memuat ulang jurnalmu.</p>
            {this.state.error && (
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-left space-y-1">
                <p className="text-[11px] font-bold text-rose-800 uppercase font-mono">Pesan Error:</p>
                <p className="text-xs text-rose-700 font-mono break-all leading-relaxed">
                  {this.state.error.message || String(this.state.error)}
                </p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="btn-charcoal px-6 py-3 font-bold text-xs shadow-md w-full"
            >
              Muat Ulang Jurnal →
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
