import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, User, KeyRound, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginStudent, loginAdmin } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState<string>('15');
  const [pin, setPin] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStudentAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!displayName.trim()) {
      setErrorMsg('Silakan masukkan nama panggilanmu.');
      return;
    }
    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setErrorMsg('PIN harus terdiri dari 4 angka.');
      return;
    }

    const ageNum = age ? parseInt(age, 10) : undefined;
    const res = loginStudent(displayName, pin, ageNum);
    if (res.success) {
      onClose();
      setDisplayName('');
      setPin('');
    } else {
      setErrorMsg(res.message || 'Gagal masuk. Periksa kembali nama & PIN.');
    }
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const res = loginAdmin(adminPin);
    if (res.success) {
      onClose();
      setAdminPin('');
    } else {
      setErrorMsg(res.message || 'PIN Admin salah.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-300 relative overflow-hidden space-y-6">

        {/* Masking Tape Top Decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-strip rounded-sm transform rotate-1 pointer-events-none" />

        {/* Prominent Round Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-2xs z-10"
          title="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab Switcher */}
        <div className="flex bg-[#eae7df] p-1.5 rounded-2xl border border-slate-300 mt-2">
          <button
            type="button"
            onClick={() => { setActiveTab('student'); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'student'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Akses Remaja (Siswa)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('admin'); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'admin'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Psikolog / Admin
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Student Form */}
        {activeTab === 'student' ? (
          <form onSubmit={handleStudentAuth} className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="font-heading-hand text-2xl font-extrabold text-slate-900">Ruang Refleksi Remaja</h2>
              <p className="font-handwriting text-xs text-slate-500">
                Gunakan Nama Panggilan, Umur, & PIN 4-digit. Tanpa email, privat & aman.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-600" />
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Alex, Maya"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={25}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 text-sm font-semibold bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-slate-600" />
                  Umur
                </label>
                <input
                  type="number"
                  placeholder="15"
                  min={10}
                  max={25}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 text-sm font-bold text-center bg-slate-50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-slate-600" />
                PIN 4 Digit Rahasia
              </label>
              <input
                type="password"
                placeholder="• • • •"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 text-center font-mono text-xl tracking-[0.5em] bg-slate-50"
                required
              />
              <p className="text-[11px] font-handwriting text-slate-400 mt-1">
                *Jika ini pertama kali, PIN di atas akan didaftarkan sebagai kunci akunmu.
              </p>
            </div>

            <button
              type="submit"
              className="btn-charcoal w-full py-3.5 text-sm font-bold shadow-md"
            >
              Masuk / Mulai Sesi Refleksi
            </button>
          </form>
        ) : (
          /* Admin Form */
          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="font-heading-hand text-2xl font-extrabold text-slate-900">Portal Pengelola & Psikolog</h2>
              <p className="font-handwriting text-xs text-slate-500">
                Masuki panel manajemen materi workbook & pemantauan progress.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                PIN Akses Admin / Psikolog
              </label>
              <input
                type="password"
                placeholder="• • • •"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value.slice(0, 6))}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 text-center font-mono text-lg tracking-widest bg-slate-50"
                required
              />
              <p className="text-[11px] text-slate-400 mt-1 text-center font-handwriting">
                (PIN Admin Demo: <span className="font-bold text-slate-800">1234</span>)
              </p>
            </div>

            <button
              type="submit"
              className="btn-charcoal w-full py-3.5 text-sm font-bold shadow-md"
            >
              Masuk Panel Admin
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
