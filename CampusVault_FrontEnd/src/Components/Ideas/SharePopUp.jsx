import { useState, useEffect } from "react";
import { Link2 } from "lucide-react";

export default function SharePopup({ idea }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/idea/${idea.id}`;

  useEffect(() => {
    const close = () => setShareOpen(false);
    if (shareOpen) window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [shareOpen]);

  const handleCopyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setShareOpen(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this idea on Campus Vault: ${idea.title}\n${shareUrl}`)}`, "_blank");
    setShareOpen(false);
  };

  const handleEmailShare = (e) => {
    e.stopPropagation();
    const subject = encodeURIComponent(`Interesting idea: ${idea.title}`);
    const body = encodeURIComponent(`Hey, check out this idea on Campus Vault!\n\n"${idea.title}"\n${idea.description}\n\nView it here: ${shareUrl}`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`, "_blank");
    setShareOpen(false);
  };

  const handleInstagram = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setShareOpen(false);
    setTimeout(() => setCopied(false), 2000);
    window.open("https://www.instagram.com/direct/inbox/", "_blank");
  };

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>

      {/* Copied toast */}
            {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]
                        flex items-center gap-2
                        bg-[#26F2D0] text-black text-sm font-bold
                        px-5 py-2.5 rounded-2xl shadow-2xl
                        animate-bounce">
            🔗 Link copied to clipboard!
        </div>
        )}

      {/* Share icon button */}
      <button
        onClick={(e) => { e.stopPropagation(); setShareOpen(prev => !prev); }}
        className={`flex items-center gap-1 transition-all
          ${shareOpen ? "text-[#26F2D0]" : "text-gray-500 hover:text-[#26F2D0]"}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
      </button>

            {/* Popup */}
            {shareOpen && (
                <div className="absolute bottom-8 right-0 z-50
                                bg-[#1a1a1a] border border-white/10 rounded-2xl
                                shadow-2xl p-3 w-52 flex flex-col gap-1">

                <p className="text-xs text-gray-500 px-2 pb-1 border-b border-white/10 mb-1">
                    Share this idea
                </p>

                <button onClick={handleCopyLink}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition w-full">
        <span className="w-7 h-7 rounded-lg bg-[#26F2D0]/10 flex items-center justify-center shrink-0">
            <Link2 size={14} className="text-[#26F2D0]" />
        </span>
        <span className="text-sm text-gray-200">Copy Link</span>
        </button>

        
         <button onClick={handleEmailShare}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition w-full">
            <span className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg"
                    className="w-5 h-5"
                    style={{ filter: "invert(29%) sepia(93%) saturate(1283%) hue-rotate(343deg) brightness(97%) contrast(97%)" }}
                    alt="Gmail" />
            </span>
            <span className="text-sm text-gray-200">Email</span>
            </button>

            <button onClick={handleWhatsApp}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition w-full">
            <span className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg"
                    className="w-5 h-5"
                    style={{ filter: "invert(48%) sepia(79%) saturate(476%) hue-rotate(86deg) brightness(95%) contrast(90%)" }}
                    alt="WhatsApp" />
            </span>
            <span className="text-sm text-gray-200">WhatsApp</span>
            </button>

           

            <button onClick={handleInstagram}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition w-full">
            <span className="w-7 h-7 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg"
                    className="w-5 h-5"
                    style={{ filter: "invert(29%) sepia(93%) saturate(1500%) hue-rotate(290deg) brightness(90%) contrast(95%)" }}
                    alt="Instagram" />
            </span>
            <span className="text-sm text-gray-200">Instagram DM</span>
            </button>

        </div>
      )}
    </div>
  );
}