import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Save, CheckCircle2, Heart, Sparkles, Send } from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const { currentUser, userProfileData, saveUserProfile } = useApp();

  const [comfortableWhen, setComfortableWhen] = useState(userProfileData?.comfortableWhen || '');
  const [smallHappiness, setSmallHappiness] = useState(userProfileData?.smallHappiness || '');
  const [wantToLearn, setWantToLearn] = useState(userProfileData?.wantToLearn || '');
  const [wantToChange, setWantToChange] = useState(userProfileData?.wantToChange || '');
  const [wantToMaintain, setWantToMaintain] = useState(userProfileData?.wantToMaintain || '');
  const [futureLetter, setFutureLetter] = useState(userProfileData?.futureLetter || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile({
      comfortableWhen,
      smallHappiness,
      wantToLearn,
      wantToChange,
      wantToMaintain,
      futureLetter
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-200/70 border border-slate-300 text-xs font-bold font-handwriting text-slate-800">
          <span>♙ PROFIL</span>
        </div>
        <h2 className="font-heading-hand text-4xl sm:text-5xl font-extrabold text-slate-900">
          Tentang Diriku
        </h2>
        <p className="font-handwriting text-base text-slate-600">
          Kenali lebih dekat siapa dirimu, hal-hal yang membuatmu nyaman, dan pesan harapan untuk masa depan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-xs space-y-6 relative">
          
          {/* Masking Tape Decoration */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-strip rounded-sm transform rotate-1 pointer-events-none" />

          {/* User Name Badge */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              {currentUser?.displayName.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h3 className="font-heading-hand text-2xl font-bold text-slate-900">
                Nama panggilan: {currentUser?.displayName || 'Sahabat Remaja'}
              </h3>
              <p className="font-handwriting text-xs text-slate-500">
                Usia: {currentUser?.age ? `${currentUser.age} tahun` : '15 tahun'}
              </p>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="block font-handwriting text-base font-bold text-slate-800">
                Aku paling nyaman ketika:
              </label>
              <input
                type="text"
                value={comfortableWhen}
                onChange={(e) => setComfortableWhen(e.target.value)}
                placeholder="Misal: Menyendiri di kamar sambil mendengar lagu favorit..."
                className="w-full p-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 font-handwriting text-base bg-[#fcfbf9]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-handwriting text-base font-bold text-slate-800">
                Hal kecil yang membuatku bahagia:
              </label>
              <input
                type="text"
                value={smallHappiness}
                onChange={(e) => setSmallHappiness(e.target.value)}
                placeholder="Misal: Diminumkan teh hangat saat sore atau disapa teman..."
                className="w-full p-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 font-handwriting text-base bg-[#fcfbf9]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-handwriting text-base font-bold text-slate-800">
                Hal yang sedang ingin aku pelajari:
              </label>
              <input
                type="text"
                value={wantToLearn}
                onChange={(e) => setWantToLearn(e.target.value)}
                placeholder="Misal: Belajar lebih tenang saat menghadapi masalah..."
                className="w-full p-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 font-handwriting text-base bg-[#fcfbf9]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-handwriting text-base font-bold text-slate-800">
                  Satu hal yang ingin aku ubah:
                </label>
                <input
                  type="text"
                  value={wantToChange}
                  onChange={(e) => setWantToChange(e.target.value)}
                  placeholder="Misal: Kebiasaan memendam kekesalan..."
                  className="w-full p-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 font-handwriting text-base bg-[#fcfbf9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-handwriting text-base font-bold text-slate-800">
                  Satu hal yang ingin aku pertahankan:
                </label>
                <input
                  type="text"
                  value={wantToMaintain}
                  onChange={(e) => setWantToMaintain(e.target.value)}
                  placeholder="Misal: Kebiasaan mendengarkan teman..."
                  className="w-full p-3.5 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 font-handwriting text-base bg-[#fcfbf9]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* ✉️ KEREN: SURAT UNTUK DIRIKU */}
        <div className="bg-[#fcfbf9] rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-xs space-y-4 relative">
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-handwriting">
                ✉️ Fitur Khusus
              </span>
              <h3 className="font-heading-hand text-2xl font-bold text-slate-900">
                SURAT UNTUK DIRIKU
              </h3>
            </div>
            <span className="text-2xl">💌</span>
          </div>

          <p className="font-handwriting text-sm text-slate-600">
            Tuliskan surat pendek untuk dirimu di masa depan. Kata-kata ini akan menjadi pengingat hangat saat kamu membukanya nanti.
          </p>

          <div className="relative">
            <textarea
              rows={5}
              value={futureLetter}
              onChange={(e) => setFutureLetter(e.target.value)}
              placeholder="Untuk diriku di masa depan... Semoga nanti aku sudah tidak terlalu takut dengan apa yang orang lain pikirkan tentangku..."
              className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:border-slate-800 font-handwriting text-lg leading-relaxed bg-white shadow-inner"
            />
          </div>

        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {isSaved && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profil & Surat Tersimpan!</span>
            </span>
          )}

          <button
            type="submit"
            className="btn-charcoal px-8 py-3.5 text-sm font-bold shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Profil & Surat</span>
          </button>
        </div>

      </form>

    </div>
  );
};
