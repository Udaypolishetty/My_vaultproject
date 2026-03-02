
// import React from "react";

// const About = () => {
//   return (
//     <div className="-mt-20 bg-black text-white">

//       {/* ===== 1. HERO / ABOUT HEADER ===== */}
//       {/* <section className="min-h-screen flex flex-col justify-center items-center text-center px-6"> */}
//       {/* <section className="min-h-screen flex flex-col items-center text-center px-6 pt-32"> */}
//       <section className="flex flex-col items-center text-center px-6 pt-32 pb-12">


//         <p className="tracking-widest text-gray-400 mb-4">
//           ABOUT 
//         </p>

//         <h1 className="text-6xl md:text-7xl font-bold mb-6">
//           Campus Vault
//         </h1>

//         <div className="relative mt-4">
//          <span className="block h-[2px] w-24 bg-white mx-auto
//                    origin-center scale-x-0
//                    animate-underline"></span>
//               </div>

//       </section>


//       <style>{`
//   @keyframes underlineGrow {
//     from {
//       transform: scaleX(0);
//       opacity: 0;
//     }
//     to {
//       transform: scaleX(1);
//       opacity: 1;
//     }
//   }
//   .animate-underline {
//     animation: underlineGrow 0.6s ease-out forwards;
//   }
// `}</style>


//       {/* ===== 2. INFORMATION CARD ===== */}
//       {/* <section className="py-20 flex justify-center items-center px-6"> */}
//     <section className="pt-4 pb-16 flex justify-center px-6">
//   <div className="max-w-3xl bg-[#0f0f0f] p-10 rounded-2xl shadow-2xl text-left">
//     <h2 className="text-3xl font-bold mb-6">
//       Our Vision
//     </h2>

//     <p className="text-gray-300 leading-relaxed mb-6">
//       Campus Vault is a centralized digital platform built to simplify access to
//       academic resources and strengthen collaboration within our college
//       community.
//     </p>

//     <h3 className="text-xl font-semibold mb-3">Key Features</h3>
//     <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
//       <li>Access to previous years’ college question papers</li>
//       <li>Connecting students through shared academic resources</li>
//       <li>Encouraging idea sharing and true collaboration</li>
//       <li>Student-friendly UI with easy and fast access</li>
//       <li>Designed to support learning beyond classrooms</li>
//     </ul>

//     <p className="text-gray-300 leading-relaxed">
//       Built by students, for students — Campus Vault focuses on making academic
//       life more organized, collaborative, and accessible for everyone.
//     </p>
//   </div>
// </section>


//       {/* ===== 3. CONTACT + FEEDBACK ===== */}
//       <section className="py-24 flex flex-col items-center justify-center px-6 text-center">
//         <h2 className="text-4xl font-bold mb-4">
//           Contact Us
//         </h2>

//         <p className="text-gray-400 mb-2 underline">
//           📧 info@campusvault.com
//         </p>

//        <p className="text-gray-400 mb-6 max-w-xl">
//   We are continuously looking to expand Campus Vault by building a stronger
//   student community, encouraging collaboration, and exploring opportunities
//   like sponsorships and partnerships to grow the platform further.
// </p>

// <p className="text-gray-400 mb-10 max-w-xl">
//   If you have ideas, suggestions, or queries, feel free to share your feedback
//   using the form below.
// </p>

//         <div className="w-full max-w-xl space-y-4">
//           <input
//             type="text"
//             placeholder="Your name or roll.no"
//             className="w-full p-4 rounded-lg bg-[#232323] outline-none"
//           />
//           <input
//             type="email"
//             placeholder="Your email"
//             className="w-full p-4 rounded-lg bg-[#232323] outline-none"
//           />
//           <textarea
//             placeholder="Your message"
//             rows="4"
//             className="w-full p-4 rounded-lg bg-[#232323] outline-none"
//           ></textarea>

//           <button className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
//              Submit 
//           </button>
//         </div>
//       </section>

//       {/* ===== 4. INITIATED BY + FOOTER ===== */}
//  <section className="py-28 flex flex-col justify-center items-center text-center px-6">
//         <h2 className="text-3xl font-bold mb-10">
//           Connect Us
//         </h2>

//         <div className="flex gap-12 mb-16">
//   {/* Uday */}
//   <div className="flex flex-col items-center">
//     <a
//       href="https://www.linkedin.com/in/uday-polishetty-bb7026261"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="w-16 h-16 rounded-full bg-[#0A66C2]
//                  flex items-center justify-center
//                  hover:scale-110 transition"
//       aria-label="Uday LinkedIn"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="white"
//         viewBox="0 0 24 24"
//         className="w-8 h-8"
//       >
//         <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-8.5c0-2 0-4.5-2.8-4.5s-3.2 2.1-3.2 4.3V24H8z" />
//       </svg>
//     </a>
//     <p className="mt-2 text-sm text-gray-300">UdayPolishetty</p>
//   </div>

//   {/* Mauthi */}
//   <div className="flex flex-col items-center">
//     <a
//       href="https://www.linkedin.com/in/vemulamaruthi/"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="w-16 h-16 rounded-full bg-[#0A66C2]
//                  flex items-center justify-center
//                  hover:scale-110 transition"
//       aria-label="Mauthi LinkedIn"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="white"
//         viewBox="0 0 24 24"
//         className="w-8 h-8"
//       >
//         <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-8.5c0-2 0-4.5-2.8-4.5s-3.2 2.1-3.2 4.3V24H8z" />
//       </svg>
//     </a>
//     <p className="mt-2 text-sm text-gray-300">MaruthiVemula</p>
//   </div>
// </div>


//         <div className="border-t border-gray-700 w-full pt-8">
//           <p className="text-gray-400 tracking-widest text-sm mb-2">
//           For the student community at
//         </p>
//           <h1 className="text-5xl font-bold tracking-widest mb-4  drop-shadow-[0_4px_10px_rgba(255,255,255,0.25)]">
//             ELLENKI
//           </h1>
//           <p className="text-gray-400 text-sm">
//             © 2026 Campus Vault. All rights reserved.
//           </p>
//         </div>
//       </section>

//     </div>   

//   );
// };

// export default About;




import React, { useState } from "react";

const About = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-[#0f0f0f] text-white">

      {/* ===== HERO ===== */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
        {/* Glow behind title */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[200px]
                        bg-[#26F2D0]/10 blur-[80px] rounded-full pointer-events-none" />

        <p className="tracking-[4px] text-[#26F2D0] text-sm mb-4 uppercase">About</p>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 relative">
          Campus Vault
        </h1>

        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#26F2D0] to-transparent mx-auto mt-2 mb-6" />

        <p className="text-gray-400 max-w-xl text-base leading-relaxed">
          A student-built platform to share resources, spark ideas, and strengthen campus community.
        </p>
      </section>

      {/* ===== VISION CARD ===== */}
      <section className="pb-16 flex justify-center px-6">
        <div className="max-w-3xl w-full bg-[#111] border border-white/10
                        rounded-2xl p-10 shadow-[0_0_40px_rgba(38,242,208,0.08)]
                        hover:border-[#26F2D0]/30 hover:shadow-[0_0_60px_rgba(38,242,208,0.15)]
                        transition-all duration-300">

          <h2 className="text-3xl font-bold mb-6 text-white">Our Vision</h2>

          <p className="text-gray-300 leading-relaxed mb-8">
            Campus Vault is a centralized digital platform built to simplify access to
            academic resources and strengthen collaboration within our college community.
          </p>

          <h3 className="text-lg font-semibold mb-4 text-[#26F2D0]">Key Features</h3>
          <ul className="space-y-3 mb-8">
            {[
              "Access to previous years' college question papers",
              "Connecting students through shared academic resources",
              "Encouraging idea sharing and true collaboration",
              "Student-friendly UI with easy and fast access",
              "Designed to support learning beyond classrooms"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <span className="text-[#26F2D0] mt-1">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-gray-300 leading-relaxed border-t border-white/10 pt-6">
            Built by students, for students — Campus Vault focuses on making academic
            life more organized, collaborative, and accessible for everyone.
          </p>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-16 flex flex-col items-center px-6 text-center">
        <p className="tracking-[4px] text-[#26F2D0] text-sm mb-2 uppercase">The Team</p>
        <h2 className="text-4xl font-bold mb-12">Built By</h2>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {[
            { name: "Uday Polishetty", role: "Full Stack Developer", url: "https://www.linkedin.com/in/uday-polishetty-bb7026261" },
            { name: "Maruthi Vemula", role: "Full Stack Developer", url: "https://www.linkedin.com/in/vemulamaruthi/" }
          ].map((person, i) => (
            <a
              key={i}
              href={person.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111] border border-white/10 rounded-2xl p-8 w-64
                         hover:border-[#26F2D0]/50 hover:shadow-[0_0_30px_rgba(38,242,208,0.1)]
                         transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#0A66C2] flex items-center justify-center mx-auto mb-4
                              group-hover:scale-110 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-8.5c0-2 0-4.5-2.8-4.5s-3.2 2.1-3.2 4.3V24H8z" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg">{person.name}</h3>
              <p className="text-[#26F2D0] text-sm mt-1">{person.role}</p>
              <p className="text-gray-500 text-xs mt-3">View LinkedIn →</p>
            </a>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-16 flex flex-col items-center px-6 text-center">
        <p className="tracking-[4px] text-[#26F2D0] text-sm mb-2 uppercase">Get In Touch</p>
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-400 mb-2">📧 info@campusvault.com</p>
        <p className="text-gray-400 mb-10 max-w-xl">
          Have ideas, suggestions, or queries? We'd love to hear from you.
        </p>

        <div className="w-full max-w-xl space-y-4">
          {submitted && (
            <div className="bg-[#26F2D0]/10 border border-[#26F2D0]/30 text-[#26F2D0] p-3 rounded-lg">
              ✅ Message sent successfully!
            </div>
          )}

          <input
            type="text"
            placeholder="Your name or roll number"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-4 rounded-lg bg-[#111] border border-white/10 outline-none
                       focus:border-[#26F2D0] transition text-white placeholder-gray-500"
          />
          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-4 rounded-lg bg-[#111] border border-white/10 outline-none
                       focus:border-[#26F2D0] transition text-white placeholder-gray-500"
          />
          <textarea
            placeholder="Your message"
            rows="4"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-4 rounded-lg bg-[#111] border border-white/10 outline-none
                       focus:border-[#26F2D0] transition text-white placeholder-gray-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-[#26F2D0] text-black py-3 rounded-lg font-semibold
                       hover:shadow-[0_0_30px_rgba(38,242,208,0.4)] hover:scale-[1.01] transition"
          >
            Send Message →
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section className="py-20 flex flex-col items-center text-center px-6 border-t border-white/10">
        <p className="text-gray-400 tracking-widest text-sm mb-3">
          For the student community at
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-widest mb-4
                       text-transparent bg-clip-text bg-gradient-to-r from-white via-[#26F2D0] to-white
                       drop-shadow-[0_0_30px_rgba(38,242,208,0.4)]">
          ELLENKI
        </h1>
        <p className="text-gray-500 text-sm">© 2026 Campus Vault. All rights reserved.</p>
      </section>

    </div>
  );
};

export default About;