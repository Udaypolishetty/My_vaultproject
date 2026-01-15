<<<<<<< HEAD

=======
<<<<<<< HEAD
import React from "react";

const Home = () => (
  <div id="Home" className="max-w-2xl mx-auto mt-10 p-6 rounded-lg transition-all duration-300 cursor-pointer hover:bg-white hover:text-black">
    <h1 className="text-3xl font-bold mb-4">Welcome to Our College Paper Portal</h1>
    <p className="text-lg">Select "Resources" from above to begin</p>
  </div>
);
=======

>>>>>>> 58c1648 (update all)
import { useState, useEffect } from "react";


const Home = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH COUNT ON PAGE LOAD
  useEffect(() => {
    fetch("http://localhost:8081/student/count")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch count");
        }
        return res.json();
      })
      .then((data) => {
        setCount(data);
      })
      .catch((err) => {
        console.error("Count fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    // <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#181818] text-white ">
    <section className="min-h-[calc(100vh-64px)]  flex flex-col items-center  justify-center text-center px-6 bg-[#181818] text-white pt-8">


      {/* Welcome pill */}
         {/* <div className="mb-4 px-5 py-2 rounded-full
                border border-[#F4A261]/40
                bg-[#F4A261]/10
                text-sm text-[#F4A261]
                shadow-[0_0_18px_rgba(244,162,97,0.35)]
                backdrop-blur-sm"
                >
  ✨ Your Complete Campus Platform
</div>
    */}

            {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
        Sharing{" "}
        <span className="text-[#457B9D]">Resources</span>.
        <br />
        Building{" "}
        <span className="text-[#F4A261]">Community</span>.
      </h1>
      {/* Description */}
      <p className="text-gray-400 max-w-2xl mb-12 text-base md:text-lg">
        Access resources from above and connect with fellow students to share ideas and build a strong campus community.
      </p>

      {/* Stats */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full">

        <div className="bg-[#232323] rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold">1,200+</h2>
          <p className="text-gray-400 text-sm mt-1">Active Members</p>
        </div>

        <div className="bg-[#232323] rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold">150+</h2>
          <p className="text-gray-400 text-sm mt-1">Ideas Shared</p>
        </div> */}


        <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-6 max-w-xl w-full">
          <div className="bg-[#232323] rounded-xl p-6 text-center border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <h2 className="text-2xl font-bold"> {loading ? "—" : count}+</h2>
            <p className="text-gray-400 text-sm mt-1">Active Members</p>
          </div>
          <div className="bg-[#232323] rounded-xl p-6 text-center  border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <h2 className="text-2xl font-bold">15+</h2>
            <p className="text-gray-400 text-sm mt-1">Ideas Shared</p>
          </div>
        </div>

{/* 
        <div className="bg-[#232323] rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold">12</h2>
          <p className="text-gray-400 text-sm mt-1">Events This Month</p>
        </div>

        <div className="bg-[#232323] rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold">80+</h2>
          <p className="text-gray-400 text-sm mt-1">Discussions</p>
        </div>
         */}

      </div>
      
    </section>
  
  );
};
<<<<<<< HEAD
=======
>>>>>>> ed0b59a (updated all changes like url and home etc)
>>>>>>> 58c1648 (update all)

export default Home;
