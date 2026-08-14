import React from 'react';
import { X, PhoneCall, HeartHandshake, ShieldAlert, ExternalLink } from 'lucide-react';

interface HelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelplineModal: React.FC<HelplineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const helplines = [
    {
      name: 'Layanan Sejiwa (Kemenkes RI)',
      number: '119 ext 8',
      desc: 'Layanan dukungan kesehatan jiwa dan konseling krisis gratis dari Kemenkes RI.',
      badge: 'Bebas Pulsa / 24 Jam'
    },
    {
      name: 'HIMPSI (Himpunan Psikologi Indonesia)',
      number: '0811-3855-472',
      desc: 'Konseling psikologi profesional untuk remaja dan keluarga.',
      badge: 'WhatsApp Konseling'
    },
    {
      name: 'Into The Light Indonesia',
      number: 'intothelightid.org',
      desc: 'Pendampingan pencegahan krisis emosional dan kesehatan mental remaja.',
      badge: 'Website & Resources'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative space-y-6">
        
        {/* Prominent Round Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all shadow-2xs z-10"
          title="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Layanan Bantuan & Hotline</h2>
            <p className="text-xs text-slate-500 font-medium">Kamu tidak sendirian. Bantuan selalu tersedia.</p>
          </div>
        </div>

        <div className="space-y-3">
          {helplines.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-rose-50/50 hover:border-rose-200 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{item.name}</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500">{item.desc}</p>
              <div className="pt-1 flex items-center gap-2 font-mono font-bold text-rose-700 text-sm">
                <PhoneCall className="w-4 h-4 text-rose-500" />
                <span>{item.number}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 text-xs text-brand-900 leading-relaxed">
          <p className="font-bold">Tips Pendampingan:</p>
          <p className="mt-0.5">
            Kamu juga dapat bercerita kepada Guru Bimbingan Konseling (BK) di sekolahmu, orang tua, atau wali yang kamu percayai.
          </p>
        </div>

      </div>
    </div>
  );
};
