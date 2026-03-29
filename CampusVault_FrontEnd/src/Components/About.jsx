
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




// import React, { useState } from "react";

// const About = () => {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setForm({ name: "", email: "", message: "" });
//     setTimeout(() => setSubmitted(false), 3000);
//   };

//   return (
//     <div className="bg-[#0f0f0f] text-white">

//       {/* ===== HERO ===== */}
//       <section className="flex flex-col items-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
//         {/* Glow behind title */}
//         <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[200px]
//                         bg-[#26F2D0]/10 blur-[80px] rounded-full pointer-events-none" />

//         <p className="tracking-[4px] text-[#26F2D0] text-sm mb-4 uppercase">About</p>

//         <h1 className="text-5xl md:text-7xl font-bold mb-4 relative">
//           Campus Vault
//         </h1>

//         <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#26F2D0] to-transparent mx-auto mt-2 mb-6" />

//         <p className="text-gray-400 max-w-xl text-base leading-relaxed">
//           A student-built platform to share resources, spark ideas, and strengthen campus community.
//         </p>
//       </section>

//       {/* ===== VISION CARD ===== */}
//       <section className="pb-16 flex justify-center px-6">
//         <div className="max-w-3xl w-full bg-[#111] border border-white/10
//                         rounded-2xl p-10 shadow-[0_0_40px_rgba(38,242,208,0.08)]
//                         hover:border-[#26F2D0]/30 hover:shadow-[0_0_60px_rgba(38,242,208,0.15)]
//                         transition-all duration-300">

//           <h2 className="text-3xl font-bold mb-6 text-white">Our Vision</h2>

//           <p className="text-gray-300 leading-relaxed mb-8">
//             Campus Vault is a centralized digital platform built to simplify access to
//             academic resources and strengthen collaboration within our college community.
//           </p>

//           <h3 className="text-lg font-semibold mb-4 text-[#26F2D0]">Key Features</h3>
//           <ul className="space-y-3 mb-8">
//             {[
//               "Access to previous years' college question papers",
//               "Connecting students through shared academic resources",
//               "Encouraging idea sharing and true collaboration",
//               "Student-friendly UI with easy and fast access",
//               "Designed to support learning beyond classrooms"
//             ].map((item, i) => (
//               <li key={i} className="flex items-start gap-3 text-gray-300">
//                 <span className="text-[#26F2D0] mt-1">✓</span>
//                 {item}
//               </li>
//             ))}
//           </ul>

//           <p className="text-gray-300 leading-relaxed border-t border-white/10 pt-6">
//             Built by students, for students — Campus Vault focuses on making academic
//             life more organized, collaborative, and accessible for everyone.
//           </p>
//         </div>
//       </section>

//       {/* ===== TEAM ===== */}
//       <section className="py-16 flex flex-col items-center px-6 text-center">
//         <p className="tracking-[4px] text-[#26F2D0] text-sm mb-2 uppercase">The Team</p>
//         <h2 className="text-4xl font-bold mb-12">Built By</h2>

//         <div className="flex flex-col md:flex-row gap-8 justify-center">
//           {[
//             { name: "Uday Polishetty", role: "Connect", url: "https://www.linkedin.com/in/uday-polishetty-bb7026261" },
//             { name: "Maruthi Vemula", role: "Connect", url: "https://www.linkedin.com/in/vemulamaruthi/" }
//           ].map((person, i) => (
//             <a
//               key={i}
//               href={person.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#111] border border-white/10 rounded-2xl p-8 w-64
//                          hover:border-[#26F2D0]/50 hover:shadow-[0_0_30px_rgba(38,242,208,0.1)]
//                          transition-all duration-300 group"
//             >
//               <div className="w-16 h-16 rounded-full bg-[#0A66C2] flex items-center justify-center mx-auto mb-4
//                               group-hover:scale-110 transition">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
//                   <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-8.5c0-2 0-4.5-2.8-4.5s-3.2 2.1-3.2 4.3V24H8z" />
//                 </svg>
//               </div>
//               <h3 className="font-bold text-white text-lg">{person.name}</h3>
//               <p className="text-[#26F2D0] text-sm mt-1">{person.role}</p>
//               <p className="text-gray-500 text-xs mt-3">View LinkedIn →</p>
//             </a>
//           ))}
//         </div>
//       </section>

//       {/* ===== CONTACT ===== */}
//       <section className="py-16 flex flex-col items-center px-6 text-center">
//         <p className="tracking-[4px] text-[#26F2D0] text-sm mb-2 uppercase">Get In Touch</p>
//         <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
//         <p className="text-gray-400 mb-2">📧 info@campusvault.com</p>
//         <p className="text-gray-400 mb-10 max-w-xl">
//           Have ideas, suggestions, or queries? We'd love to hear from you.
//         </p>

//         <div className="w-full max-w-xl space-y-4">
//           {submitted && (
//             <div className="bg-[#26F2D0]/10 border border-[#26F2D0]/30 text-[#26F2D0] p-3 rounded-lg">
//               ✅ Message sent successfully!
//             </div>
//           )}

//           <input
//             type="text"
//             placeholder="Your name or roll number"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             className="w-full p-4 rounded-lg bg-[#111] border border-white/10 outline-none
//                        focus:border-[#26F2D0] transition text-white placeholder-gray-500"
//           />
//           <input
//             type="email"
//             placeholder="Your email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full p-4 rounded-lg bg-[#111] border border-white/10 outline-none
//                        focus:border-[#26F2D0] transition text-white placeholder-gray-500"
//           />
//           <textarea
//             placeholder="Your message"
//             rows="4"
//             value={form.message}
//             onChange={(e) => setForm({ ...form, message: e.target.value })}
//             className="w-full p-4 rounded-lg bg-[#111] border border-white/10 outline-none
//                        focus:border-[#26F2D0] transition text-white placeholder-gray-500"
//           />
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-[#26F2D0] text-black py-3 rounded-lg font-semibold
//                        hover:shadow-[0_0_30px_rgba(38,242,208,0.4)] hover:scale-[1.01] transition"
//           >
//             Send Message →
//           </button>
//         </div>
//       </section>

//       {/* ===== FOOTER ===== */}
//       <section className="py-20 flex flex-col items-center text-center px-6 border-t border-white/10">
//         <p className="text-gray-400 tracking-widest text-sm mb-3">
//           For the student community at
//         </p>
//         <h1 className="text-5xl md:text-6xl font-bold tracking-widest mb-4
//                        text-transparent bg-clip-text bg-gradient-to-r from-white via-[#26F2D0] to-white
//                        drop-shadow-[0_0_30px_rgba(38,242,208,0.4)]">
//           ELLENKI
//         </h1>
//         <p className="text-gray-500 text-sm">© 2026 Campus Vault. All rights reserved.</p>
//       </section>

//     </div>
//   );
// };

// export default About;










// import React, { useState } from "react";

// const About = () => {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setForm({ name: "", email: "", message: "" });
//     setTimeout(() => setSubmitted(false), 3000);
//   };

//   return (
//     <div className="bg-[#0b0b0b] text-white relative min-h-screen overflow-hidden font-sans">
      
//       {/* CSS Injection for Animations */}
//       <style>
//         {`
//           @keyframes float-slow {
//             0% { transform: translate(0, 0) rotate(0deg); }
//             33% { transform: translate(30px, -50px) rotate(10deg); }
//             66% { transform: translate(-20px, 20px) rotate(-10deg); }
//             100% { transform: translate(0, 0) rotate(0deg); }
//           }
//           @keyframes pulse-glow {
//             0%, 100% { opacity: 0.3; transform: scale(1); }
//             50% { opacity: 0.6; transform: scale(1.2); }
//           }
//           .animate-float { animation: float-slow 15s infinite ease-in-out; }
//           .animate-pulse-slow { animation: pulse-glow 8s infinite ease-in-out; }
//         `}
//       </style>

//       {/* ===== 3D DYNAMIC BACKGROUND ===== */}
//       <div className="fixed inset-0 pointer-events-none">
//         {/* Floating Glass Orb 1 */}
//         <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-[#26F2D0]/20 rounded-full blur-[100px] animate-pulse-slow" />
        
//         {/* Floating 3D-like Shape (Triangle/Prism style) */}
//         <div className="absolute top-[20%] right-[10%] animate-float" style={{ animationDelay: '0s' }}>
//             <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-30">
//                 <path d="M50 10L90 80H10L50 10Z" stroke="#26F2D0" strokeWidth="1" fill="url(#grad1)" />
//                 <defs>
//                     <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
//                         <stop offset="0%" style={{stopColor:'#26F2D0', stopOpacity:0.5}} />
//                         <stop offset="100%" style={{stopColor:'transparent', stopOpacity:0}} />
//                     </linearGradient>
//                 </defs>
//             </svg>
//         </div>

//         {/* Floating Orb 2 */}
//         <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-[#26F2D0]/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

//         {/* 3D Wireframe Cube (Simplified) */}
//         <div className="absolute bottom-[10%] left-[10%] animate-float" style={{ animationDuration: '20s', animationDelay: '4s' }}>
//              <div className="w-20 h-20 border border-[#26F2D0]/40 rotate-45 backdrop-blur-sm bg-white/5 rounded-lg" />
//         </div>

//         {/* Floating Rings */}
//         <div className="absolute top-[50%] left-[5%] animate-float opacity-20" style={{ animationDuration: '12s' }}>
//             <div className="w-32 h-32 border-2 border-[#26F2D0] rounded-full border-dashed" />
//         </div>
//       </div>

//       {/* ===== HERO ===== */}
//       <section className="flex flex-col items-center text-center px-6 pt-32 pb-16 relative z-10">
//         <p className="tracking-[6px] text-[#26F2D0] text-xs mb-4 uppercase font-bold drop-shadow-[0_0_10px_rgba(38,242,208,0.5)]">
//             Establish . Access . Collaborate
//         </p>

//         <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">
//           Campus <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#26F2D0] to-[#148673]">Vault</span>
//         </h1>

//         <div className="h-[1px] w-32 bg-[#26F2D0] shadow-[0_0_15px_#26F2D0] mx-auto mt-2 mb-8" />

//         <p className="text-gray-400 max-w-2xl text-lg leading-relaxed font-light italic">
//           The ultimate digital treasury for college resources. Designed for the high-pace student life.
//         </p>
//       </section>

//       {/* ===== VISION CARD (Glassmorphism) ===== */}
//       <section className="pb-20 flex justify-center px-6 z-10 relative">
//         <div className="max-w-4xl w-full bg-white/5 border border-white/10 backdrop-blur-xl
//                         rounded-[2rem] p-12 shadow-2xl relative overflow-hidden group">
          
//           {/* Subtle inner glow */}
//           <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#26F2D0]/10 rounded-full blur-3xl group-hover:bg-[#26F2D0]/20 transition-all" />

//           <h2 className="text-4xl font-bold mb-8 text-white">Our Vision</h2>

//           <div className="grid md:grid-cols-2 gap-10">
//             <div>
//                 <p className="text-gray-300 text-lg leading-relaxed mb-6">
//                     Campus Vault is a centralized digital platform built to simplify access to
//                     academic resources and strengthen collaboration within our college community.
//                 </p>
//                 <div className="p-4 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20 italic text-sm text-[#26F2D0]">
//                     "Built by students, for students — making academic life organized."
//                 </div>
//             </div>

//             <div className="space-y-4">
//                 {[
//                 "Previous Year Papers",
//                 "Shared Academic Resources",
//                 "Idea Exchange Hub",
//                 "Ultra-fast UI / UX",
//                 "Beyond Classroom Support"
//                 ].map((item, i) => (
//                 <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-[#26F2D0]/50 transition-all cursor-default group">
//                     <div className="w-2 h-2 rounded-full bg-[#26F2D0] group-hover:shadow-[0_0_10px_#26F2D0]" />
//                     <span className="text-gray-200 font-medium">{item}</span>
//                 </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== TEAM ===== */}
//       <section className="py-20 flex flex-col items-center px-6 text-center z-10 relative">
//         <p className="tracking-[4px] text-[#26F2D0] text-sm mb-2 uppercase">The Minds Behind</p>
//         <h2 className="text-5xl font-extrabold mb-16">THE TEAM</h2>

//         <div className="flex flex-col md:flex-row gap-12 justify-center">
//           {[
//             { name: "Uday Polishetty", role: "Connect", url: "https://www.linkedin.com/in/uday-polishetty-bb7026261" },
//             { name: "Maruthi Vemula", role: "Connect", url: "https://www.linkedin.com/in/vemulamaruthi/" }
//           ].map((person, i) => (
//             <a
//               key={i}
//               href={person.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="relative group w-72"
//             >
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-[#26F2D0] to-transparent rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
//               <div className="relative bg-[#0d0d0d] rounded-2xl p-10 flex flex-col items-center">
//                 <div className="w-20 h-20 rounded-2xl bg-[#0A66C2] flex items-center justify-center mb-6
//                                 shadow-[0_10px_30px_rgba(10,102,194,0.3)] group-hover:-translate-y-2 transition duration-500">
//                     <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10">
//                     <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
//                     </svg>
//                 </div>
//                 <h3 className="font-black text-white text-xl uppercase tracking-tight">{person.name}</h3>
//                 <p className="text-[#26F2D0] font-mono text-xs mt-2 uppercase tracking-widest">{person.role}</p>
//                 <div className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-white transition-colors duration-300">
//                     <span className="text-xs font-bold uppercase">LinkedIn Profile</span>
//                     <span className="group-hover:translate-x-1 transition-transform">→</span>
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>
//       </section>

//       {/* ===== CONTACT (Glass Form) ===== */}
//       <section className="py-24 flex flex-col items-center px-6 text-center z-10 relative">
//         <div className="max-w-2xl w-full bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-md">
//             <h2 className="text-4xl font-black mb-2">Join the Vault.</h2>
//             <p className="text-gray-400 mb-8">Drop us a line for collaborations or feedback.</p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//             {submitted && (
//                 <div className="bg-[#26F2D0] text-black p-3 rounded-xl font-bold text-sm animate-bounce">
//                 MESSAGE VAULTED SUCCESSFULLY!
//                 </div>
//             )}

//             <input
//                 type="text"
//                 placeholder="Name or Roll No"
//                 required
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="w-full p-5 rounded-2xl bg-black/50 border border-white/10 outline-none
//                         focus:border-[#26F2D0] focus:ring-1 focus:ring-[#26F2D0] transition text-white placeholder-white/20"
//             />
//             <input
//                 type="email"
//                 placeholder="College Email"
//                 required
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="w-full p-5 rounded-2xl bg-black/50 border border-white/10 outline-none
//                         focus:border-[#26F2D0] focus:ring-1 focus:ring-[#26F2D0] transition text-white placeholder-white/20"
//             />
//             <textarea
//                 placeholder="Your Idea or Query..."
//                 rows="4"
//                 required
//                 value={form.message}
//                 onChange={(e) => setForm({ ...form, message: e.target.value })}
//                 className="w-full p-5 rounded-2xl bg-black/50 border border-white/10 outline-none
//                         focus:border-[#26F2D0] focus:ring-1 focus:ring-[#26F2D0] transition text-white placeholder-white/20"
//             />
//             <button
//                 type="submit"
//                 className="w-full bg-[#26F2D0] text-black py-5 rounded-2xl font-black uppercase tracking-widest
//                         hover:bg-white hover:scale-[0.98] transition-all duration-300 shadow-[0_20px_40px_rgba(38,242,208,0.2)]"
//             >
//                 Transmit Message
//             </button>
//             </form>
//         </div>
//       </section>

//       {/* ===== FOOTER ===== */}
//       <footer className="py-20 flex flex-col items-center text-center px-6 border-t border-white/5 z-10 relative">
//         <p className="text-gray-500 font-mono text-xs mb-4 uppercase tracking-[5px]">Built For</p>
//         <h1 className="text-7xl md:text-9xl font-black tracking-tighter opacity-10 absolute -bottom-5 select-none pointer-events-none">
//           ELLENKI
//         </h1>
//         <div className="bg-gradient-to-r from-white via-[#26F2D0] to-white bg-clip-text text-transparent font-black text-5xl md:text-6xl tracking-widest">
//             ELLENKI
//         </div>
//         <p className="text-white/20 text-[10px] mt-10 uppercase tracking-widest font-mono">© 2026 Campus Vault Deployment // v2.0</p>
//       </footer>

//     </div>
//   );
// };

// export default About;






import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Footer from "./FooterFiles/Footer";

/* ─────────────────────────────────────────────
   EmailJS config — your actual keys
───────────────────────────────────────────── */
const EJ_SERVICE  = "service_nzys8qi";
const EJ_TEMPLATE = "template_axnzsz7";
const EJ_PUBLIC   = "REgM7dQQ8Hzs68xhz";

/* ─────────────────────────────────────────────
   Rate limit — 1 submission per 24 hours
   stored in localStorage so it survives refresh
───────────────────────────────────────────── */
const RL_KEY      = "vault_join_last_sent";   // ISO timestamp of last send
const COOLDOWN_MS = 24 * 60 * 60 * 1000;     // 24 hours in ms

function getLastSent() {
  try { return localStorage.getItem(RL_KEY); } catch { return null; }
}
function saveLastSent() {
  try { localStorage.setItem(RL_KEY, new Date().toISOString()); } catch {}
}
function cooldownRemaining() {
  const last = getLastSent();
  if (!last) return 0;
  return Math.max(0, new Date(last).getTime() + COOLDOWN_MS - Date.now());
}
function formatCountdown(ms) {
  if (ms <= 0) return "";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  if (h > 0) return `${h}h ${m}m remaining`;
  if (m > 0) return `${m}m ${s}s remaining`;
  return `${s}s remaining`;
}

/* ─────────────────────────────────────────────
   Razorpay / UPI — swap after setup
───────────────────────────────────────────── */
const RAZORPAY_LINK = "https://rzp.io/l/campusvault";
const UPI_ID        = "yourupi@bank";
const AMOUNTS = [
  { label: "₹20",  value: 20,  note: "Every bit helps us grow"        },
  { label: "₹50",  value: 50,  note: "Covers a day of hosting"  },
  { label: "₹100", value: 100, note: "A week of server uptime"  },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const About = () => {
  const [form,      setForm]      = useState({ name: "", email: "", message: "" });
  const [cardMode,  setCardMode]  = useState("join");  // "join" | "support"
  const [sendState, setSendState] = useState("idle");  // idle | sending | success | error
  const [errMsg,    setErrMsg]    = useState("");
  const [countdown, setCountdown] = useState(cooldownRemaining());
  const [copied,    setCopied]    = useState(false);

  /* live countdown tick */
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => {
      const rem = cooldownRemaining();
      setCountdown(rem);
      if (rem <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const isLocked = countdown > 0;

  /* ── EmailJS send ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked || sendState === "sending") return;

    setSendState("sending");
    setErrMsg("");

   try {
      await emailjs.send(
        EJ_SERVICE,
        EJ_TEMPLATE,
        {
          name:       "Campus Vault Admin",   // {{name}} — "Hello to {{name}}"
          from_name:  form.name.trim(),       // {{from_name}}
          from_email: form.email.trim(),      // {{from_email}}
          message:    form.message.trim(),    // {{message}}
          time:       new Date().toLocaleString("en-IN", {
                        dateStyle: "medium", timeStyle: "short"
                      }),                     // {{time}}
          reply_to:   form.email.trim(),
        },
        EJ_PUBLIC
      );

      /* success — lock for 24h */
      saveLastSent();
      setCountdown(COOLDOWN_MS);
      setSendState("success");
      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      console.error("EmailJS error:", err);
      setErrMsg("Failed to send. Check your connection and try again.");
      setSendState("error");
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
<div className="bg-[#0b0b0b] text-white relative min-h-screen overflow-hidden font-sans">
      {/* ── Animations ── */}
      <style>{`
        @keyframes float-slow {
          0%   { transform: translate(0,0) rotate(0deg); }
          33%  { transform: translate(30px,-50px) rotate(10deg); }
          66%  { transform: translate(-20px,20px) rotate(-10deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        @keyframes pulse-glow {
          0%,100% { opacity:0.3; transform:scale(1); }
          50%     { opacity:0.6; transform:scale(1.2); }
        }
        @keyframes fadeSwitch {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes bounceIn {
          0%   { transform:scale(0.92); opacity:0; }
          60%  { transform:scale(1.03); }
          100% { transform:scale(1);    opacity:1; }
        }
        .animate-float      { animation: float-slow 15s infinite ease-in-out; }
        .animate-pulse-slow { animation: pulse-glow 8s infinite ease-in-out; }
        .fade-in            { animation: fadeSwitch 0.3s ease both; }
        .bounce-in          { animation: bounceIn 0.4s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-[#26F2D0]/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[10%] animate-float" style={{ animationDelay: "0s" }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-30">
            <path d="M50 10L90 80H10L50 10Z" stroke="#26F2D0" strokeWidth="1" fill="url(#grad1)" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#26F2D0", stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: "transparent", stopOpacity: 0 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-[#26F2D0]/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[10%] left-[10%] animate-float" style={{ animationDuration: "20s", animationDelay: "4s" }}>
          <div className="w-20 h-20 border border-[#26F2D0]/40 rotate-45 backdrop-blur-sm bg-white/5 rounded-lg" />
        </div>
        <div className="absolute top-[50%] left-[5%] animate-float opacity-20" style={{ animationDuration: "12s" }}>
          <div className="w-32 h-32 border-2 border-[#26F2D0] rounded-full border-dashed" />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center px-6 pt-32 pb-16 relative z-10">
        <p className="tracking-[6px] text-[#26F2D0] text-xs mb-4 uppercase font-bold drop-shadow-[0_0_10px_rgba(38,242,208,0.5)]">
          Establish . Access . Collaborate
        </p>
        <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">
          Campus{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#26F2D0] to-[#148673]">
            Vault
          </span>
        </h1>
        <div className="h-[1px] w-32 bg-[#26F2D0] shadow-[0_0_15px_#26F2D0] mx-auto mt-2 mb-8" />
        <p className="text-gray-400 max-w-2xl text-lg leading-relaxed font-light italic">
          The ultimate digital treasury for college resources. Designed for the high-pace student life.
        </p>
      </section>

      {/* ── Vision Card ── */}
      <section className="pb-20 flex justify-center px-6 z-10 relative">
        <div className="max-w-4xl w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#26F2D0]/10 rounded-full blur-3xl group-hover:bg-[#26F2D0]/20 transition-all" />
          <h2 className="text-4xl font-bold mb-8 text-white">Our Vision</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Campus Vault is a centralized digital platform built to simplify access to
                academic resources and strengthen collaboration within our college community.
              </p>
              <div className="p-4 rounded-xl bg-[#26F2D0]/10 border border-[#26F2D0]/20 italic text-sm text-[#26F2D0]">
                "Built by students, for students — making academic life organized."
              </div>
              <div className="p-10  italic text-sm text-[#26F2D0]">
                "To Know Completely about Vault Usage Go through the footer Guidelines..⤵︎"
              </div>
            </div>
            <div className="space-y-4">
              {["Previous Year Papers", "Shared Academic Resources/Notes", "Idea Exchange Hub", "Building Community thorugh Clubs", "Beyond Classroom Support" ,"User Freiendly UI"].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-[#26F2D0]/50 transition-all cursor-default group">
                  <div className="w-2 h-2 rounded-full bg-[#26F2D0] group-hover:shadow-[0_0_10px_#26F2D0]" />
                  <span className="text-gray-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 flex flex-col items-center px-6 text-center z-10 relative">
        <p className="tracking-[4px] text-[#26F2D0] text-sm mb-2 uppercase">The Minds Behind</p>
        <h2 className="text-5xl font-extrabold mb-16">THE TEAM</h2>
        <div className="flex flex-col md:flex-row gap-12 justify-center">
          {[
            { name: "Uday Polishetty", role: "Connect", url: "https://www.linkedin.com/in/uday-polishetty-bb7026261" },
            { name: "Maruthi Vemula",  role: "Connect", url: "https://www.linkedin.com/in/vemulamaruthi/" },
          ].map((person, i) => (
            <a key={i} href={person.url} target="_blank" rel="noopener noreferrer" className="relative group w-72">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#26F2D0] to-transparent rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-1000" />
              <div className="relative bg-[#0d0d0d] rounded-2xl p-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-[#0A66C2] flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(10,102,194,0.3)] group-hover:-translate-y-2 transition duration-500">
                  <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <h3 className="font-black text-white text-xl uppercase tracking-tight">{person.name}</h3>
                <p className="text-[#26F2D0] font-mono text-xs mt-2 uppercase tracking-widest">{person.role}</p>
                <div className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-white transition-colors duration-300">
                  <span className="text-xs font-bold uppercase">LinkedIn Profile</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT + SUPPORT CARD — toggled
      ══════════════════════════════════════════ */}
      <section className="py-24 flex flex-col items-center px-6 text-center z-10 relative">
        <div className="max-w-2xl w-full bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-md">

          {/* ── Toggle pill ── */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex bg-black/40 border border-white/10 rounded-full p-1 gap-1">
              {[
                { key: "join",    label: "Join the Vault" },
                { key: "support", label: "Support Us"     },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setCardMode(opt.key)}
                  className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-300"
                  style={{
                    background: cardMode === opt.key ? "#26F2D0"             : "transparent",
                    color:      cardMode === opt.key ? "#000"                : "rgba(255,255,255,0.4)",
                    boxShadow:  cardMode === opt.key ? "0 0 16px rgba(38,242,208,0.35)" : "none",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ══ JOIN THE VAULT ══ */}
          {cardMode === "join" && (
            <div className="fade-in">
              <h2 className="text-4xl font-black mb-2">Join the Vault.</h2>
              <p className="text-gray-400 mb-8">Drop us a line for collaborations or feedback.</p>

              {/* ── SUCCESS state ── */}
              {sendState === "success" && (
                <div className="bounce-in mb-6 p-5 rounded-2xl bg-[#26F2D0]/10 border border-[#26F2D0]/30">
                  <p className="text-[#26F2D0] font-black text-lg mb-1">MESSAGE VAULTED! ✓</p>
                  <p className="text-gray-400 text-sm">
                    We got it. You can send again in{" "}
                    <span className="text-[#26F2D0] font-bold">{formatCountdown(countdown)}</span>
                  </p>
                </div>
              )}

              {/* ── LOCKED state ── */}
              {isLocked && sendState !== "success" && (
                <div className="bounce-in mb-6 p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-yellow-400">
                    {/* clock icon inline */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span className="font-bold text-sm">Already sent today</span>
                  </div>
                  <p className="text-gray-500 text-xs">
                    Available again in{" "}
                    <span className="text-yellow-400 font-bold">{formatCountdown(countdown)}</span>
                  </p>
                </div>
              )}

              {/* ── FORM — hidden when locked or success ── */}
              {!isLocked && sendState !== "success" && (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* error banner */}
                  {sendState === "error" && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-left">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" className="shrink-0">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <p className="text-red-400 text-xs">{errMsg}</p>
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="Name or Roll No"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full p-5 rounded-2xl bg-black/50 border border-white/10 outline-none
                               focus:border-[#26F2D0] focus:ring-1 focus:ring-[#26F2D0] transition
                               text-white placeholder-white/20"
                  />
                  <input
                    type="email"
                    placeholder="College Email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full p-5 rounded-2xl bg-black/50 border border-white/10 outline-none
                               focus:border-[#26F2D0] focus:ring-1 focus:ring-[#26F2D0] transition
                               text-white placeholder-white/20"
                  />
                  <textarea
                    placeholder="Your Idea or Query..."
                    rows="4"
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full p-5 rounded-2xl bg-black/50 border border-white/10 outline-none
                               focus:border-[#26F2D0] focus:ring-1 focus:ring-[#26F2D0] transition
                               text-white placeholder-white/20"
                  />

                  <button
                    type="submit"
                    disabled={sendState === "sending"}
                    className="w-full bg-[#26F2D0] text-black py-5 rounded-2xl font-black uppercase
                               tracking-widest transition-all duration-300
                               shadow-[0_20px_40px_rgba(38,242,208,0.2)]
                               disabled:opacity-60 disabled:cursor-not-allowed
                               hover:bg-white hover:scale-[0.98]"
                  >
                    {sendState === "sending" ? "TRANSMITTING..." : "Transmit Message"}
                  </button>

                </form>
              )}
            </div>
          )}

          {/* ══ SUPPORT US ══ */}
          {cardMode === "support" && (
            <div className="fade-in">
              <h2 className="text-4xl font-black mb-2">Support the Vault.</h2>
              <p className="text-gray-400 mb-2">
                Campus Vault runs on passion — and a little bit of server fees.
              </p>
              <p className="text-gray-600 text-sm mb-8">
                Every rupee keeps the platform alive for every student.
              </p>

              {/* preset amounts */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {AMOUNTS.map(({ label, value, note }) => (
                  <a
                    key={value}
                    href={`${RAZORPAY_LINK}?amount=${value * 100}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-1 p-4 rounded-2xl
                               bg-black/40 border border-white/10
                               hover:border-[#26F2D0]/50 hover:bg-[#26F2D0]/5
                               transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-2xl font-black text-white group-hover:text-[#26F2D0] transition-colors">
                      {label}
                    </span>
                    <span className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors leading-tight">
                      {note}
                    </span>
                  </a>
                ))}
              </div>

              {/* custom amount CTA */}
              <a
                href={RAZORPAY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#26F2D0] text-black py-5 rounded-2xl font-black uppercase
                           tracking-widest hover:bg-white hover:scale-[0.98] transition-all duration-300
                           shadow-[0_20px_40px_rgba(38,242,208,0.2)] mb-6"
              >
                Choose Your Amount →
              </a>

              {/* UPI fallback */}
              <div className="flex flex-col items-center gap-2 pt-4 border-t border-white/5">
                <p className="text-gray-500 text-xs uppercase tracking-widest">or pay via UPI</p>
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-5 py-3 mt-1">
                  <span className="text-[#26F2D0] font-mono font-bold text-sm">{UPI_ID}</span>
                  <button
                    onClick={handleCopyUPI}
                    className="text-gray-500 hover:text-white transition text-xs border border-white/10
                               hover:border-white/30 px-2 py-0.5 rounded-lg ml-2"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <p className="text-gray-600 text-xs mt-1">
                  Google Pay · PhonePe · Paytm · any UPI app
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-20 flex flex-col items-center text-center px-6 border-t border-white/5 z-10 relative">
        <p className="text-gray-500 font-mono text-xs mb-4 uppercase tracking-[5px]">Built For</p>
        <h1
          onClick={() => window.open("https://ellenkicet.ac.in/", "_blank")}
          className="text-7xl md:text-9xl font-black tracking-tighter opacity-10 absolute -bottom-5 select-none cursor-pointer hover:opacity-20 transition duration-300"
          style={{ pointerEvents: "none" }}
        >
          ELLENKI
        </h1>
<div className="relative z-10 mb-6 text-[#26F2D0]/70 font-medium text-lg md:text-xl tracking-wide">
  Students Community At : 
</div>
      </footer>
<Footer/>
    </div>
  );
};

export default About;