import { useState } from "react";

export default function IdeaRulesModal({ onClose, onContinue }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-[#161616] border border-white/10 rounded-2xl p-8 max-w-md w-full">

        <div className="text-center mb-6">
          <p className="text-4xl mb-3">💡</p>
          <h3 className="text-xl font-bold text-white">Before You Post</h3>
          <p className="text-gray-400 text-sm mt-1">Please read the guidelines before sharing your idea</p>
        </div>
<div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 space-y-3 text-sm text-gray-300">

  <div className="flex gap-3">
    <span className="text-yellow-400">⭐</span>
    <p>
      High-quality ideas may be pinned to the top and recognized by faculty for possible implementation.
    </p>
  </div>

  <div className="flex gap-3">
    <span className="text-[#26F2D0]">📌</span>
    <p>Your idea must be relevant to campus life or student development.</p>
  </div>

  <div className="flex gap-3">
    <span className="text-[#26F2D0]">⏳</span>
    <p>You can only post one idea every 48 hours.</p>
  </div>

  <div className="flex gap-3">
    <span className="text-[#26F2D0]">🚫</span>
    <p>Duplicate titles are not allowed. Make your idea unique.</p>
  </div>

  <div className="flex gap-3">
    <span className="text-[#26F2D0]">💬</span>
    <p>Each student can post one response per idea — make it count.</p>
  </div>

  <div className="flex gap-3">
    <span className="text-red-400">⚠️</span>
    <p className="text-red-300">
      Misuse may result in restrictions on your account.
    </p>
  </div>

  <div className="flex gap-3">
    <span className="text-red-400">🏫</span>
    <p className="text-red-300">
      Any inappropriate, abusive, or irrelevant content may be reported directly to the college administration.
    </p>
  </div>

</div>

        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer mb-6 group">
          <div
            onClick={() => setAgreed(!agreed)}
            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center
                        shrink-0 transition-all duration-200
                        ${agreed
                          ? "bg-[#26F2D0] border-[#26F2D0]"
                          : "border-white/30 group-hover:border-[#26F2D0]/60"
                        }`}
          >
            {agreed && <span className="text-black text-xs font-bold">✓</span>}
          </div>
          <span className="text-gray-300 text-sm leading-relaxed">
            I have read and agree to the idea posting guidelines.
          </span>
        </label>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={() => agreed && onContinue()}
            disabled={!agreed}
            className={`flex-1 py-2 rounded-xl font-semibold transition-all
                        ${agreed
                          ? "bg-[#26F2D0] text-black hover:brightness-110"
                          : "bg-[#26F2D0]/20 text-gray-500 cursor-not-allowed"
                        }`}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}