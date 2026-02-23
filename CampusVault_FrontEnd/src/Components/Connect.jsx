
import { useState } from "react";
import IdeasBoard from "./IdeasBoard";
import Club from "./Clubs/Club";

export default function Connect() {
  const [activeTab, setActiveTab] = useState("ideas");

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-4 px-10">


    <div className="mt-10 mb-10 px-6">
   <div
    className="max-w-4xl mx-auto rounded-2xl border border-white/10 
               bg-gradient-to-r from-[#0b0b0b]/80 to-[#141414]/80
               backdrop-blur-xl p-6 shadow-lg relative
               shadow-[0_0_25px_rgba(38,242,208,0.12)]
               transition-all duration-300
               hover:-translate-y-1
               hover:shadow-[0_0_40px_rgba(38,242,208,0.25)]
               hover:border-[#26F2D0]/40"
  >

    <div className="flex flex-col items-center text-center">
      <h2 className="text-xl font-semibold text-white">
        Connect with our campus
      </h2>

      <p className="text-gray-400 text-sm max-w-2xl mt-1">
        Share ideas, discuss college topics, and collaborate with fellow students —
        all in one place.
      </p>
    </div>

  </div>
</div>


      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("ideas")}
          className={activeTab === "ideas" ? "bg-[#26F2D0] text-black px-6 py-2 rounded" : "bg-[#222] px-6 py-2 rounded"}
        >
          Ideas Board
        </button>

        <button
          onClick={() => setActiveTab("club")}
          className={activeTab === "club" ? "bg-[#26F2D0] text-black px-6 py-2 rounded" : "bg-[#222] px-6 py-2 rounded"}
        >
          Clubs
        </button>
      </div>

      {activeTab === "ideas" ? <IdeasBoard /> : <Club />}
    </div>
  );
}
