import React, { useState } from 'react';
import { X, Download, Check, Mail } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations['modal'];
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, t }) => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  if (!isOpen) return null;

  const handleDownloadApk = () => {
    setDownloadTriggered(true);
    const content = `HUMMINGBIRD ANDROID ALARM (PRD v0.1 Release Candidate)
Package: com.hummingbird.alarm
Version: 0.1.0-alpha
Built With: Flutter 3.24 + Dart 3.5
Min SDK: Android 8.0 (API 26)
Architecture: Local-First / Zero Cloud Audio

INSTALLATION INSTRUCTIONS:
1. Copy or download this package to your Android device.
2. Tap the file in your notification drawer or Files app.
3. If prompted, toggle "Allow from this source" in Chrome/Files settings.
4. Launch Hummingbird and complete the 5-second vocal calibration test.
5. Create your first morning alarm!

VERIFICATION CHECKSUM (SHA-256):
3a9f7e8b210c4d8e5b6a7c9f1e2d3c4b5a6f7e8d9c0b1a2e3f4a5b6c7d8e9f0a
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hummingbird-v0.1-alpha-release.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setEmailSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#023047]/85 backdrop-blur-md animate-fadeIn">
      <div className="liquid-glass-dark rounded-3xl max-w-lg w-full border border-white/20 shadow-2xl overflow-hidden relative text-white">
        
        {/* Header */}
        <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/logo.svg"
              alt="Hummingbird"
              className="w-10 h-10 rounded-xl object-contain bg-[#013252] border border-white/15 shadow-sm"
            />
            <div>
              <div className="text-base font-bold font-['Outfit',sans-serif]">
                {t.title}
              </div>
              <div className="text-xs text-[#8ecae6] font-mono">
                {t.subtitle}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* APK Package Specs */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-white/60">{t.packageId}</span>
              <span className="font-mono font-semibold text-white">com.hummingbird.alarm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">{t.minAndroid}</span>
              <span className="font-mono text-white">API 26 (Android 8.0+)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">{t.permissions}</span>
              <span className="font-mono text-white">RECORD_AUDIO (Local Only)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">SHA-256:</span>
              <span className="font-mono text-[10px] text-white/50 truncate max-w-[200px]">
                3a9f7e8b210c4d8e5b6a7c9f...
              </span>
            </div>
          </div>

          {/* Download Action */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadApk}
              className="w-full py-4 bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] hover:text-white font-bold text-sm rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{downloadTriggered ? t.btnDownloading : t.btnDownload}</span>
            </button>
            <p className="text-[11px] text-white/60 text-center">
              {t.sideloadNote}
            </p>
          </div>

          {/* Google Play Waitlist Section */}
          <div className="pt-4 border-t border-white/10">
            <div className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#ffb703]" />
              <span>{t.playStorePrompt}</span>
            </div>

            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.inputPlaceholder}
                  required
                  className="flex-1 px-4 py-2.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#219ebc]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#219ebc] hover:bg-[#8ecae6] hover:text-[#023047] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  {t.btnNotify}
                </button>
              </form>
            ) : (
              <div className="p-3 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t.successMessage}</span>
              </div>
            )}
          </div>

          {/* Sideload Instruction Steps */}
          <div className="space-y-2 text-[11px] text-white/70 bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="font-bold text-white block mb-1">{t.guideTitle}</span>
            <div className="space-y-1">
              <div>{t.step1}</div>
              <div>{t.step2}</div>
              <div>{t.step3}</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
