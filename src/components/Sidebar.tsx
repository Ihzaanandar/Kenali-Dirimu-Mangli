import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, BookOpen, Heart, BarChart3, User, Info, LayoutDashboard, LogOut } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  onOpenAuth: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAuth }) => {
  const { currentView, setCurrentView, currentUser, logout, workbooks, startWorkbook } = useApp();

  const publishedWb = workbooks.find(w => w.status === 'published') || workbooks[0];

  const handleJournalClick = () => {
    if (!currentUser) {
      onOpenAuth();
    } else {
      setCurrentView('session');
    }
  };

  const navItems: { id: ViewType; label: string; icon: React.FC<{ className?: string }>; onClick?: () => void }[] = [
    { id: 'landing', label: 'Beranda', icon: Home, onClick: () => setCurrentView('landing') },
    { id: 'session', label: 'Journal', icon: BookOpen, onClick: handleJournalClick },
    { id: 'favorites', label: 'Favorit', icon: Heart, onClick: () => setCurrentView('favorites') },
    { id: 'progress', label: 'Progres', icon: BarChart3, onClick: () => setCurrentView('progress') },
    { id: 'profile', label: 'Profil', icon: User, onClick: () => setCurrentView('profile') },
    { id: 'about', label: 'Tentang', icon: Info, onClick: () => setCurrentView('about') },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#f8f7f3] border-r border-slate-300/80 p-6 flex flex-col justify-between hidden md:flex shrink-0 z-30 select-none">
      
      {/* Brand Header */}
      <div className="space-y-6">
        <div 
          onClick={() => setCurrentView('landing')}
          className="cursor-pointer group flex flex-col items-start gap-1"
        >
          <div className="flex items-center gap-2">
            <h1 className="font-heading-hand text-3xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:scale-102 transition-transform">
              My Unsaid Journal
            </h1>
            <span className="text-slate-800 text-sm">♡</span>
          </div>
          <p className="font-handwriting text-xs text-slate-500 italic">
            Jurnal untuk semua hal yang belum pernah kamu katakan.
          </p>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1.5 pt-4">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'session' && currentView === 'summary');
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold font-handwriting text-base transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300 translate-x-1'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setCurrentView('admin')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all mt-4 ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-200/80 text-slate-800 hover:bg-slate-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Panel Admin</span>
            </button>
          )}
        </nav>
      </div>

      {/* Footer & User / Sticky Note Box */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        
        {currentUser ? (
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-300/80 shadow-2xs">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser.displayName.charAt(0).toUpperCase()}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-900 truncate">{currentUser.displayName}</p>
                <p className="text-[10px] text-slate-500 font-handwriting">{currentUser.role === 'admin' ? 'Psikolog Admin' : 'Jurnal Remaja'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
              title="Keluar Akun"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="btn-charcoal w-full py-2.5 px-4 text-xs font-bold shadow-xs flex items-center justify-center gap-2"
          >
            <span>Masuk / Buat PIN →</span>
          </button>
        )}

        {/* Sticky Note Decoration matching Reference Image */}
        <div className="p-3 bg-yellow-50/90 border border-yellow-200/80 rounded-xl text-left relative transform -rotate-1 shadow-2xs">
          <div className="absolute -top-2 left-4 w-12 h-4 tape-strip rounded-xs" />
          <p className="font-handwriting text-xs text-slate-700 font-bold leading-snug">
            Tidak apa-apa untuk tidak baik-baik saja. ♡
          </p>
        </div>

      </div>

    </aside>
  );
};
