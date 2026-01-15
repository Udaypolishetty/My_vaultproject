// import React from "react";

// const About = () => (
//   <div id="about" className="max-w-4xl mx-auto bg-[#232323] p-6 rounded-lg mt-10">
//     <h2 className="text-3xl font-bold mb-4">About Campus Vault</h2>
//     <p className="mb-4">
//       Campus Vault is a dedicated platform for students to access and share academic resources such as question papers and notes.
//     </p>
//     <h3 className="text-2xl font-semibold mb-2">Features:</h3>
//     <ul className="list-disc list-inside mb-4">
//       <li>Extensive collection of question papers from various semesters and courses.</li>
//       <li>Comprehensive notes covering key topics and concepts.</li>
//       <li>User-friendly interface for easy navigation and resource discovery.</li>
//       <li>Secure upload system for verified users to contribute resources.</li>
//     </ul>
//     <h3 className="text-2xl font-semibold mb-2">Contact Us:</h3>
//     <p>
//       Reach out at <a href="mailto:info@campusvault.com" className="text-blue-400 underline">info@campusvault.com</a>.
//     </p>
//   </div>
// );

// export default About;


import React from "react";

const About = () => {
  return (
    <div className="-mt-20 bg-black text-white">

      {/* ===== 1. HERO / ABOUT HEADER ===== */}
      {/* <section className="min-h-screen flex flex-col justify-center items-center text-center px-6"> */}
      {/* <section className="min-h-screen flex flex-col items-center text-center px-6 pt-32"> */}
      <section className="flex flex-col items-center text-center px-6 pt-32 pb-12">


        <p className="tracking-widest text-gray-400 mb-4">
          ABOUT 
        </p>

        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          Campus Vault
        </h1>

        <div className="relative mt-4">
         <span className="block h-[2px] w-24 bg-white mx-auto
                   origin-center scale-x-0
                   animate-underline"></span>
              </div>

      </section>


      <style>{`
  @keyframes underlineGrow {
    from {
      transform: scaleX(0);
      opacity: 0;
    }
    to {
      transform: scaleX(1);
      opacity: 1;
    }
  }
  .animate-underline {
    animation: underlineGrow 0.6s ease-out forwards;
  }
`}</style>


      {/* ===== 2. INFORMATION CARD ===== */}
      {/* <section className="py-20 flex justify-center items-center px-6"> */}
    <section className="pt-4 pb-16 flex justify-center px-6">
  <div className="max-w-3xl bg-[#0f0f0f] p-10 rounded-2xl shadow-2xl text-left">
    <h2 className="text-3xl font-bold mb-6">
      Our Vision
    </h2>

    <p className="text-gray-300 leading-relaxed mb-6">
      Campus Vault is a centralized digital platform built to simplify access to
      academic resources and strengthen collaboration within our college
      community.
    </p>

    <h3 className="text-xl font-semibold mb-3">Key Features</h3>
    <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
      <li>Access to previous years’ college question papers</li>
      <li>Connecting students through shared academic resources</li>
      <li>Encouraging idea sharing and true collaboration</li>
      <li>Student-friendly UI with easy and fast access</li>
      <li>Designed to support learning beyond classrooms</li>
    </ul>

    <p className="text-gray-300 leading-relaxed">
      Built by students, for students — Campus Vault focuses on making academic
      life more organized, collaborative, and accessible for everyone.
    </p>
  </div>
</section>


      {/* ===== 3. CONTACT + FEEDBACK ===== */}
      <section className="py-24 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Contact Us
        </h2>

        <p className="text-gray-400 mb-2 underline">
          📧 info@campusvault.com
        </p>

       <p className="text-gray-400 mb-6 max-w-xl">
  We are continuously looking to expand Campus Vault by building a stronger
  student community, encouraging collaboration, and exploring opportunities
  like sponsorships and partnerships to grow the platform further.
</p>

<p className="text-gray-400 mb-10 max-w-xl">
  If you have ideas, suggestions, or queries, feel free to share your feedback
  using the form below.
</p>

        <div className="w-full max-w-xl space-y-4">
          <input
            type="text"
            placeholder="Your name or roll.no"
            className="w-full p-4 rounded-lg bg-[#232323] outline-none"
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-4 rounded-lg bg-[#232323] outline-none"
          />
          <textarea
            placeholder="Your message"
            rows="4"
            className="w-full p-4 rounded-lg bg-[#232323] outline-none"
          ></textarea>

          <button className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
             Submit 
          </button>
        </div>
      </section>

      {/* ===== 4. INITIATED BY + FOOTER ===== */}
 <section className="py-28 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-3xl font-bold mb-10">
          Connect Us
        </h2>

        <div className="flex gap-12 mb-16">
  {/* Uday */}
  <div className="flex flex-col items-center">
    <a
      href="https://www.linkedin.com/in/uday-polishetty-bb7026261"
      target="_blank"
      rel="noopener noreferrer"
      className="w-16 h-16 rounded-full bg-[#0A66C2]
                 flex items-center justify-center
                 hover:scale-110 transition"
      aria-label="Uday LinkedIn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        className="w-8 h-8"
      >
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-8.5c0-2 0-4.5-2.8-4.5s-3.2 2.1-3.2 4.3V24H8z" />
      </svg>
    </a>
    <p className="mt-2 text-sm text-gray-300">UdayPolishetty</p>
  </div>

  {/* Mauthi */}
  <div className="flex flex-col items-center">
    <a
      href="https://www.linkedin.com/in/vemulamaruthi/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-16 h-16 rounded-full bg-[#0A66C2]
                 flex items-center justify-center
                 hover:scale-110 transition"
      aria-label="Mauthi LinkedIn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        className="w-8 h-8"
      >
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.1c.5-1 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-8.5c0-2 0-4.5-2.8-4.5s-3.2 2.1-3.2 4.3V24H8z" />
      </svg>
    </a>
    <p className="mt-2 text-sm text-gray-300">MaruthiVemula</p>
  </div>
</div>


        <div className="border-t border-gray-700 w-full pt-8">
          <p className="text-gray-400 tracking-widest text-sm mb-2">
          For the student community at
        </p>
          <h1 className="text-5xl font-bold tracking-widest mb-4  drop-shadow-[0_4px_10px_rgba(255,255,255,0.25)]">
            ELLENKI
          </h1>
          <p className="text-gray-400 text-sm">
            © 2026 Campus Vault. All rights reserved.
          </p>
        </div>
      </section>

    </div>   

  );
};

export default About;
