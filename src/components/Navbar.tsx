import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShieldAlert, CheckCircle2, RefreshCw, LogOut, User, LayoutDashboard, Sparkles, BookOpen, Home, CheckSquare, PlayCircle } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenHelpline: () => void;
  onOpenDisclaimer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenHelpline, onOpenDisclaimer }) => {
  const {
    currentUser,
    logout,
    isAutosaving,
    autosaveTime,
    currentView,
    setCurrentView,
    workbooks,
    allSessions,
    startWorkbook
  } = useApp();

  const publishedWb = workbooks.find(w => w.status === 'published') || workbooks[0];

  // Cek status sesi pengerjaan pengguna saat ini secara dinamis
  const completedSession = currentUser && publishedWb
    ? allSessions.find(s => s.studentId === currentUser.id && s.workbookId === publishedWb.id && s.status === 'completed')
    : null;

  const inProgressSession = currentUser && publishedWb
    ? allSessions.find(s => s.studentId === currentUser.id && s.workbookId === publishedWb.id && s.status === 'in_progress')
    : null;

  // Label & Ikon Dinamis berdasarkan status pengerjaan
  let dynamicActionLabel = 'Mulai Refleksi';
  let ActionIcon = PlayCircle;

  if (completedSession && !inProgressSession) {
    dynamicActionLabel = 'Hasil Refleksi Saya';
    ActionIcon = CheckSquare;
  } else if (inProgressSession) {
    dynamicActionLabel = 'Lanjutkan Refleksi';
    ActionIcon = BookOpen;
  }

  const handleOpenAction = () => {
    if (!currentUser) {
      onOpenAuth();
    } else if (publishedWb) {
      startWorkbook(publishedWb.id);
    }
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-[#f8f7f3]/95 backdrop-blur-md border-b border-slate-300/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo & Judul Utama Clean Without Dark Circles or Overlapping Text */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-[#eae6d8] border border-[#d8d2c0] text-slate-800 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
            <Heart className="w-4.5 h-4.5 fill-slate-800/20 text-slate-800" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading-hand text-2xl font-extrabold text-slate-900 leading-none">
              Jurnal Refleksi Diri
            </h1>
            <span className="text-[10px] font-sans font-bold bg-[#eae6d8] text-slate-800 px-2 py-0.5 rounded-full border border-[#d8d2c0] shrink-0">
              Kenali Dirimu
            </span>
          </div>
        </div>

        {/* Tab Navigasi Tengah Dinamis (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ede9dd] p-1 rounded-2xl border border-slate-300/80 text-xs font-bold">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              currentView === 'landing'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </button>

          <button
            onClick={handleOpenAction}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              currentView === 'session' || currentView === 'summary'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ActionIcon className="w-3.5 h-3.5" />
            <span>{dynamicActionLabel}</span>
          </button>

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-800 hover:bg-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Panel Admin</span>
            </button>
          )}
        </nav>

        {/* Tombol Aksi Kanan */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Indikator Menyimpan Otomatis */}
          {isAutosaving ? (
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-700 font-bold bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
              <span>Menyimpan...</span>
            </div>
          ) : autosaveTime ? (
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-700 font-bold bg-[#f0ece1] px-3 py-1.5 rounded-full border border-[#e0d9c8]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tersimpan {autosaveTime}</span>
            </div>
          ) : null}

          {/* Tombol Bantuan Hotline */}
          <button
            onClick={onOpenHelpline}
            className="flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3.5 py-2 rounded-2xl transition-colors shadow-2xs"
            title="Layanan Bantuan & Hotline Psikologi"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Layanan Bantuan</span>
          </button>

          {/* Status Akun Pengguna */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-2xl pl-3 pr-1.5 py-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.displayName.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-slate-800 max-w-[90px] truncate">
                  {currentUser.displayName}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Keluar Akun"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-charcoal px-4 py-2 text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Masuk / Buat PIN</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
