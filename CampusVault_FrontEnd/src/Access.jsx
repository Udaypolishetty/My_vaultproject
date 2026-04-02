// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Access = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChecks = async () => {
//     const roll = inputValue.trim().toUpperCase();

//     if (!roll) { setError("Please enter your roll number"); return; }
//     if (!/^[A-Z0-9]+$/.test(roll)) { setError("Roll number must contain only CAPITAL letters and numbers"); return; }
//     if (roll.length < 4 || roll[2] !== "C" || roll[3] !== "7") { setError("Invalid roll number format — capital letters"); return; }

//     setError("");
//     setLoading(true);

//     try {
//       // STEP 1: Check if roll number exists
//       const existsRes = await fetch(`http://localhost:8081/student/exists/${roll}`);
//       const exists = await existsRes.json();

//       if (!exists) {
//         navigate("/profile", { state: { rollNumber: roll } });
//         return;
//       }

//       // STEP 2: Login
//       const loginRes = await fetch("http://localhost:8081/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rollNumber: roll }),
//       });

//       if (!loginRes.ok) { setError("Login failed. Please try again."); return; }

//       const data = await loginRes.json();

//       // ✅ Clear old student's data before saving new
//       localStorage.clear();

//       // ✅ Save new student's data
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("rollNumber", data.rollNumber);
//       localStorage.setItem("name", data.name);
//       localStorage.setItem("id", data.id);

//       if (data.role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate(`/profile/${data.id}/home`);
//       }

//     } catch {
//       setError("Backend not reachable. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div
//         className="
//           min-h-screen flex items-center justify-center
//           bg-black
//           bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.75)),url('/vault-bg.jpeg')]
//           bg-no-repeat bg-center
//           bg-[length:75%_auto]
//         "
//       >
//         <div
//           className="
//             w-[360px] max-w-[90%]
//             rounded-[18px]
//             px-8 py-9
//             text-center
//             shadow-[0_25px_50px_rgba(0,0,0,1)]
//           "
//         >
//           <h1 className="text-white text-[18px] tracking-[1.6px] mb-4">
//             ENTER YOUR ROLL NUMBER
//           </h1>

//           {error && (
//             <p className="text-red-500 text-sm font-semibold mb-3">{error}</p>
//           )}

//           <form onSubmit={(e) => { e.preventDefault(); if (!loading) handleChecks(); }}>
//             <div className="relative w-[70%] mx-auto mb-4">
//               <img
//                 src="/lock.jpeg"
//                 alt="lock"
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-5 pointer-events-none"
//               />
//               <input
//                 className="
//                   w-full py-3 pl-14 pr-10
//                   rounded-full text-center
//                   outline-none
//                   shadow-[0_8px_20px_rgba(0,0,0,0.35)]
//                 "
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 autoFocus
//               />
//             </div>

//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 disabled={loading || !inputValue.trim()}
//                 className={`
//                   w-10 h-10 rounded-full text-2xl
//                   flex items-center justify-center transition
//                   ${loading || !inputValue.trim()
//                     ? "bg-gray-500 cursor-not-allowed"
//                     : "bg-white text-black hover:scale-105"
//                   }
//                 `}
//               >
//                 {loading ? "…" : "→"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Access;


//claude...


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Access = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // ✅ show password field for admin
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const isAdmin = inputValue.trim().toUpperCase() === "ADMIN001"; // ✅ detect admin

//   const handleChecks = async () => {
//     const roll = inputValue.trim().toUpperCase();

//     if (!roll) { setError("Please enter your roll number"); return; }

//     // ✅ Skip format validation for admin
//     if (!isAdmin) {
//       if (!/^[A-Z0-9]+$/.test(roll)) { setError("Roll number must contain only CAPITAL letters and numbers"); return; }
//       if (roll.length < 4 || roll[2] !== "C" || roll[3] !== "7") { setError("Invalid roll number format — capital letters"); return; }
//     }

//     // ✅ Admin must enter password
//     if (isAdmin && !password) { setError("Please enter admin password"); return; }

//     setError("");
//     setLoading(true);

//     try {
//       if (isAdmin) {
//         // ✅ Admin login with password
//         const loginRes = await fetch("http://localhost:8081/api/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ rollNumber: roll, password: password }),
//         });

//         if (!loginRes.ok) { setError("Invalid admin credentials."); return; }

//         const data = await loginRes.json();
//         // Access.jsx — admin login block
//       sessionStorage.setItem("token", data.token);
//       sessionStorage.setItem("role", data.role);
//       sessionStorage.setItem("rollNumber", data.rollNumber);
//       sessionStorage.setItem("name", data.name);
//       sessionStorage.setItem("id", data.id);
//         navigate("/admin/dashboard");
//         return;
//       }

//       // ✅ Student flow — unchanged
//       const existsRes = await fetch(`http://localhost:8081/student/exists/${roll}`);
//       const exists = await existsRes.json();

//       if (!exists) {
//         // navigate("/profile/setup", { state: { rollNumber: roll } });
//         navigate("/profile");
//         return;
//       }

//       const loginRes = await fetch("http://localhost:8081/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rollNumber: roll }),
//       });

//       if (!loginRes.ok) { setError("Login failed. Please try again."); return; }

//       const data = await loginRes.json();
//      // change all these setItems
//       sessionStorage.setItem("token", data.token);
//       sessionStorage.setItem("role", data.role);
//       sessionStorage.setItem("rollNumber", data.rollNumber);
//       sessionStorage.setItem("name", data.name);
//       sessionStorage.setItem("id", data.id);
//       sessionStorage.setItem("Email", data.email);
//       window.dispatchEvent(new Event("userLoggedIn")); // ✅ add this

//       navigate(`/profile/${data.id}/home`);

//     } catch {
//       setError("Backend not reachable. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-black
//           bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.75)),url('/vault-bg.jpeg')]
//           bg-no-repeat bg-center bg-[length:75%_auto]">
//         <div className="w-[360px] max-w-[90%] rounded-[18px] px-8 py-9 text-center
//             shadow-[0_25px_50px_rgba(0,0,0,1)]">

//           <h1 className="text-white text-[18px] tracking-[1.6px] mb-4">
//             ENTER YOUR ROLL NUMBER
//           </h1>

//           {error && (
//             <p className="text-red-500 text-sm font-semibold mb-3">{error}</p>
//           )}

//           <form onSubmit={(e) => { e.preventDefault(); if (!loading) handleChecks(); }}>

//             {/* Roll Number Input */}
//             <div className="relative w-[70%] mx-auto mb-4">
//               <img src="/lock.jpeg" alt="lock"
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-5 pointer-events-none" />
//               <input
//                 className="w-full py-3 pl-14 pr-10 rounded-full text-center outline-none
//                     shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 autoFocus
//               />
//             </div>

//             {/* ✅ Password field — only shown for ADMIN001 */}
//             {isAdmin && (
//               <div className="relative w-[70%] mx-auto mb-4">
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full py-3 px-4 rounded-full text-center outline-none
//                       shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             )}

//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 disabled={loading || !inputValue.trim()}
//                 className={`w-10 h-10 rounded-full text-2xl flex items-center justify-center transition
//                     ${loading || !inputValue.trim()
//                       ? "bg-gray-500 cursor-not-allowed"
//                       : "bg-white text-black hover:scale-105"
//                     }`}
//               >
//                 {loading ? "…" : "→"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Access;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Access = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const isAdmin = inputValue.trim().toUpperCase() === "ADMIN001";

//   const handleChecks = async () => {
//     const roll = inputValue.trim().toUpperCase();
//     if (!roll) { setError("Please enter your roll number"); return; }
//     if (!isAdmin) {
//       if (!/^[A-Z0-9]+$/.test(roll)) { setError("Roll number must contain only CAPITAL letters and numbers"); return; }
//       if (roll.length < 4 || roll[2] !== "C" || roll[3] !== "7") { setError("Invalid roll number format — capital letters"); return; }
//     }
//     if (isAdmin && !password) { setError("Please enter admin password"); return; }
//     setError("");
//     setLoading(true);

//     try {
//       if (isAdmin) {
//         const loginRes = await fetch("http://localhost:8081/api/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ rollNumber: roll, password: password }),
//         });
//         if (!loginRes.ok) { setError("Invalid admin credentials."); setLoading(false); return; }
//         const data = await loginRes.json();
//         sessionStorage.setItem("token", data.token);
//         sessionStorage.setItem("role", data.role);
//         sessionStorage.setItem("rollNumber", data.rollNumber);
//         sessionStorage.setItem("name", data.name);
//         sessionStorage.setItem("id", data.id);
//         navigate("/admin/dashboard");
//         return;
//       }

//       const existsRes = await fetch(`http://localhost:8081/student/exists/${roll}`);
//       const exists = await existsRes.json();
//       if (!exists) { navigate("/profile"); return; }

//       const loginRes = await fetch("http://localhost:8081/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rollNumber: roll }),
//       });
//       if (!loginRes.ok) { setError("Login failed. Please try again."); setLoading(false); return; }
//       const data = await loginRes.json();
//       sessionStorage.setItem("token", data.token);
//       sessionStorage.setItem("role", data.role);
//       sessionStorage.setItem("rollNumber", data.rollNumber);
//       sessionStorage.setItem("name", data.name);
//       sessionStorage.setItem("id", data.id);
//       sessionStorage.setItem("Email", data.email);
//       window.dispatchEvent(new Event("userLoggedIn"));
//       navigate(`/profile/${data.id}/home`);
//     } catch {
//       setError("Backend not reachable. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden font-sans text-[16px]">
//       <div 
//         className="absolute inset-0 bg-[url('/vault-bg.jpeg')] bg-no-repeat bg-center bg-cover md:bg-[length:80%_auto] opacity-30"
//       />

//       <div className="relative z-10 w-full max-w-[360px] mx-auto px-6">
//         <div className="bg-[#0f0f0f] border border-[#222] rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,1)]">
          
//           <h1 className="text-white text-center text-sm font-bold tracking-[0.25em] mb-10 uppercase">
//             ENTER CAMPUS VAULT
//           </h1>

//           {error && (
//             <div className="mb-6">
//               <p className="text-red-500 text-[11px] font-bold text-center uppercase tracking-widest bg-red-500/10 py-2.5 rounded-lg border border-red-500/20">
//                 {error}
//               </p>
//             </div>
//           )}

//           <form 
//             onSubmit={(e) => { e.preventDefault(); if (!loading) handleChecks(); }}
//             className="flex flex-col items-center gap-6"
//           >
//             {/* Input width at 92% for better balance */}
//             <div className="w-[92%] space-y-4">
//               <div className="relative group">
//                 <div className="absolute left-4 top-1/2 -translate-y-1/2">
//                   <svg 
//                     width="16" height="16" viewBox="0 0 24 24" 
//                     fill="none" stroke="currentColor" strokeWidth="2" 
//                     strokeLinecap="round" strokeLinejoin="round" 
//                     className="text-gray-500 group-focus-within:text-white transition-colors"
//                   >
//                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//                     <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="ROLL NUMBER"
//                   className="w-full bg-[#1a1a1a] border border-[#333] text-white text-center py-3.5 pl-10 pr-4 
//                              rounded-xl outline-none focus:border-gray-500 transition-all tracking-widest text-sm"
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   autoFocus
//                 />
//               </div>

//               {isAdmin && (
//                 <div className="animate-in fade-in slide-in-from-top-2">
//                   <input
//                     type="password"
//                     placeholder="PASSWORD"
//                     className="w-full bg-[#1a1a1a] border border-[#333] text-white text-center py-3.5 px-4 
//                                rounded-xl outline-none focus:border-gray-500 transition-all tracking-widest text-sm"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !inputValue.trim()}
//               className={`w-14 h-14 rounded-full flex items-center justify-center transition-all mt-2
//                   ${loading || !inputValue.trim()
//                     ? "bg-[#222] text-[#444] cursor-not-allowed border border-white/5"
//                     : "bg-white text-black hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
//                   }`}
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <span className="text-2xl">→</span>
//               )}
//             </button>
//           </form>

//           <div className="mt-12 flex flex-col items-center gap-2 opacity-20">
//             <div className="h-[1px] w-10 bg-white" />
//             <p className="text-[9px] text-white tracking-[0.4em] font-black uppercase">
//               Secure
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Access;


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// /* ─── Roll validation ── */
// function getRollError(roll) {
//   if (!roll) return "";
//   if (!/^[A-Z0-9]*$/.test(roll))          return "Capital letters and numbers only";
//   if (roll.length >= 3 && roll[2] !== "C") return "3rd character must be 'C'  (e.g. 22C71A0577)";
//   if (roll.length >= 4 && roll[3] !== "7") return "4th character must be '7'  (e.g. 22C71A0577)";
//   return "";
// }
// function isValidRoll(roll) {
//   return roll.length === 10 && /^[A-Z0-9]+$/.test(roll) && roll[2] === "C" && roll[3] === "7";
// }

// export default function Access() {
//   const [roll,     setRoll]     = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [error,    setError]    = useState("");
//   const [loading,  setLoading]  = useState(false);
//   const navigate = useNavigate();

//   const isAdmin = roll.trim().toUpperCase() === "ADMIN001";

//   const handleRollChange = (e) => {
//     const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
//     setRoll(val);
//     setError(getRollError(val));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const rollUp = roll.trim().toUpperCase();

//     if (!rollUp)   { setError("Enter your roll number"); return; }
//     if (!isAdmin) {
//       const re = getRollError(rollUp);
//       if (re)                   { setError(re); return; }
//       if (!isValidRoll(rollUp)) { setError("Roll number must be exactly 10 characters"); return; }
//     }
//     if (!password) { setError("Enter your password"); return; }

//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:8081/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rollNumber: rollUp, password }),
//       });

//       if (!res.ok) {
//         const txt = await res.text();
//         // ✅ Give helpful error messages
//         if (txt.toLowerCase().includes("not found") || txt.toLowerCase().includes("no student")) {
//           setError("No account found. Please register first.");
//         } else if (txt.toLowerCase().includes("bad credentials") || txt.toLowerCase().includes("password")) {
//           setError("Incorrect password. Try again.");
//         } else if (txt.toLowerCase().includes("invalid admin")) {
//           setError("Invalid admin credentials.");
//         } else {
//           setError("Login failed. Check your credentials and try again.");
//         }
//         setLoading(false);
//         return;
//       }

//       const d = await res.json();

//       // ✅ Store all needed session values
//       sessionStorage.setItem("token",      d.token);
//       sessionStorage.setItem("role",       d.role);
//       sessionStorage.setItem("rollNumber", d.rollNumber);
//       sessionStorage.setItem("name",       d.name);
//       sessionStorage.setItem("id",         d.id);
//       sessionStorage.setItem("Email",      d.email || "");

//       window.dispatchEvent(new Event("userLoggedIn"));

//       // ✅ Route based on role
//       if (d.role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate(`/profile/${d.id}/home`);
//       }

//     } catch {
//       setError("Server not reachable. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: "100vh", width: "100%",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       background: "#000", position: "relative", overflow: "hidden",
//       padding: "24px 16px", boxSizing: "border-box",
//       fontFamily: "sans-serif",
//     }}>

//       {/* Background */}
//       <div style={{
//         position: "absolute", inset: 0,
//         backgroundImage: "url('/vault-bg.jpeg')",
//         backgroundSize: "cover", backgroundPosition: "center",
//         opacity: 0.3, pointerEvents: "none",
//       }} />

//       <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 360 }}>
//         <div style={{
//           background: "#0f0f0f", border: "1px solid #222",
//           borderRadius: 32, padding: "40px 32px",
//           boxShadow: "0 20px 60px rgba(0,0,0,1)",
//         }}>

//           {/* Title */}
//           <p style={{
//             color: "white", textAlign: "center", fontSize: 11,
//             fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase",
//             margin: "0 0 32px",
//           }}>
//             CAMPUS VAULT
//           </p>

//           {/* Error */}
//           {error && (
//             <div style={{
//               background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
//               borderRadius: 10, padding: "10px 14px", marginBottom: 20, textAlign: "center",
//             }}>
//               <p style={{ color: "#f87171", fontSize: 11, fontWeight: 700,
//                 textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
//                 {error}
//               </p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

//             {/* Roll number */}
//             <div style={{ position: "relative" }}>
//               <input
//                 type="text"
//                 placeholder="ROLL NUMBER"
//                 value={roll}
//                 onChange={handleRollChange}
//                 maxLength={10}
//                 autoFocus
//                 style={{
//                   width: "100%", boxSizing: "border-box",
//                   background: "#1a1a1a", border: "1px solid #333",
//                   color: "white", textAlign: "center",
//                   padding: "14px 44px 14px 14px",
//                   borderRadius: 12, outline: "none",
//                   fontSize: 13, letterSpacing: "0.2em",
//                   fontFamily: "monospace",
//                 }}
//                 onFocus={e  => e.target.style.borderColor = "#555"}
//                 onBlur={e   => e.target.style.borderColor = "#333"}
//               />
//               <span style={{
//                 position: "absolute", right: 12, top: "50%",
//                 transform: "translateY(-50%)",
//                 fontSize: 10, fontFamily: "monospace",
//                 color: isAdmin ? "#a855f7" : (roll.length === 10 && isValidRoll(roll)) ? "#26F2D0" : "#444",
//               }}>
//                 {isAdmin ? "ADMIN" : `${roll.length}/10`}
//               </span>
//             </div>

//             {/* Password */}
//             <div style={{ position: "relative" }}>
//               <input
//                 type={showPass ? "text" : "password"}
//                 placeholder={isAdmin ? "ADMIN PASSWORD" : "PASSWORD"}
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 style={{
//                   width: "100%", boxSizing: "border-box",
//                   background: "#1a1a1a", border: "1px solid #333",
//                   color: "white", textAlign: "center",
//                   padding: "14px 44px 14px 14px",
//                   borderRadius: 12, outline: "none",
//                   fontSize: 13, letterSpacing: "0.15em",
//                   fontFamily: "monospace",
//                 }}
//                 onFocus={e  => e.target.style.borderColor = "#555"}
//                 onBlur={e   => e.target.style.borderColor = "#333"}
//               />
//               <button type="button" tabIndex={-1} onClick={() => setShowPass(s => !s)}
//                 style={{
//                   position: "absolute", right: 12, top: "50%",
//                   transform: "translateY(-50%)",
//                   background: "none", border: "none",
//                   cursor: "pointer", color: "#555", fontSize: 14, padding: 0,
//                 }}>
//                 {showPass ? "🙈" : "👁"}
//               </button>
//             </div>

//             {/* Submit */}
//             <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
//               <button type="submit"
//                 disabled={loading || !roll.trim() || !password.trim()}
//                 style={{
//                   width: 56, height: 56, borderRadius: "50%",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   border: "none",
//                   cursor: loading || !roll.trim() || !password.trim() ? "not-allowed" : "pointer",
//                   background: loading || !roll.trim() || !password.trim() ? "#222" : "white",
//                   color:      loading || !roll.trim() || !password.trim() ? "#444" : "black",
//                   fontSize: 22, transition: "all 0.2s",
//                   boxShadow: !loading && roll.trim() && password.trim()
//                     ? "0 0 20px rgba(255,255,255,0.2)" : "none",
//                 }}
//                 onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.1)"; }}
//                 onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
//               >
//                 {loading
//                   ? <div style={{ width: 20, height: 20, border: "2px solid #666",
//                       borderTopColor: "transparent", borderRadius: "50%",
//                       animation: "spin 0.8s linear infinite" }} />
//                   : "→"
//                 }
//               </button>
//             </div>
//           </form>

//           {/* New user link */}
//           {!isAdmin && (
//             <div style={{ textAlign: "center", marginTop: 24 }}>
//               <span style={{ color: "#444", fontSize: 12 }}>New to Campus Vault? </span>
//               <Link to="/profile"
//                 style={{ color: "#26F2D0", fontSize: 12, fontWeight: 700, textDecoration: "none" }}
//                 onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
//                 onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>
//                 Register here →
//               </Link>
//             </div>
//           )}

//           <div style={{
//             display: "flex", flexDirection: "column", alignItems: "center",
//             gap: 6, marginTop: 28, opacity: 0.15,
//           }}>
//             <div style={{ height: 1, width: 32, background: "white" }} />
//             <p style={{ color: "white", fontSize: 9, fontWeight: 900,
//               letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>
//               Secure
//             </p>
//           </div>
//         </div>
//       </div>

//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react"; // Add this import

// /* ─── Roll validation ── */
// function getRollError(roll) {
//   if (!roll) return "";
//   if (!/^[A-Z0-9]*$/.test(roll)) return "Capital letters and numbers only";
//   if (roll.length >= 3 && roll[2] !== "C") return "3rd character must be C";
//   if (roll.length >= 4 && roll[3] !== "7") return "4th character must be 7";
//   return "";
// }

// function isValidRoll(roll) {
//   return (
//     roll.length === 10 &&
//     /^[A-Z0-9]+$/.test(roll) &&
//     roll[2] === "C" &&
//     roll[3] === "7"
//   );
// }

// export default function Access() {
//   const [roll,     setRoll]     = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [error,    setError]    = useState("");
//   const [loading,  setLoading]  = useState(false);
//   const navigate = useNavigate();

//   const isAdmin = roll.trim().toUpperCase() === "ADMIN001";

//   const handleRollChange = (e) => {
//     const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
//     setRoll(val);
//     setError(getRollError(val));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const rollUp = roll.trim().toUpperCase();

//     if (!rollUp)   { setError("Enter your roll number"); return; }
//     if (!isAdmin) {
//       const re = getRollError(rollUp);
//       if (re)                   { setError(re); return; }
//       if (!isValidRoll(rollUp)) { setError("Roll number must be exactly 10 characters"); return; }
//     }
//     if (!password) { setError("Enter your password"); return; }

//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:8081/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rollNumber: rollUp, password }),
//       });

//       if (!res.ok) {
//         const txt = await res.text();
//         if (txt.toLowerCase().includes("not found") || txt.toLowerCase().includes("no student")) {
//          setError("No account found. Please register first.");
//         } else if (txt.toLowerCase().includes("bad credentials") || txt.toLowerCase().includes("password")) {
//          setError("Incorrect password. Try again.");
//         } else if (txt.toLowerCase().includes("invalid admin")) {
//          setError("Invalid admin credentials.");
//         } else {
//          setError("Login failed. Check your credentials and try again.");
//         }
//         setLoading(false);
//         return;
//       }

//       const d = await res.json();

//       sessionStorage.setItem("token",      d.token);
//       sessionStorage.setItem("role",       d.role);
//       sessionStorage.setItem("rollNumber", d.rollNumber);
//       sessionStorage.setItem("name",       d.name);
//       sessionStorage.setItem("id",         d.id);
//       sessionStorage.setItem("Email",      d.email || "");

//       window.dispatchEvent(new Event("userLoggedIn"));

//       if (d.role === "ADMIN") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate(`/profile/${d.id}/home`);
//       }

//     } catch {
//       setError("Server not reachable. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: "100vh", width: "100%",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       background: "#000", position: "relative", overflow: "hidden",
//       padding: "24px 16px", boxSizing: "border-box",
//       fontFamily: "sans-serif",
//     }}>

//       {/* Background */}
//       <div style={{
//         position: "absolute", inset: 0,
//         backgroundImage: "url('/vault-bg.jpeg')",
//         backgroundSize: "cover", backgroundPosition: "center",
//         opacity: 0.3, pointerEvents: "none",
//       }} />

//       <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 360 }}>
//         <div style={{
//           background: "#0f0f0f", border: "1px solid #222",
//           borderRadius: 32, padding: "40px 32px",
//           boxShadow: "0 20px 60px rgba(0,0,0,1)",
//         }}>

//           {/* Title */}
//           <p style={{
//             color: "white", textAlign: "center", fontSize: 11,
//             fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase",
//             margin: "0 0 32px",
//           }}>
//             CAMPUS VAULT
//           </p>

//           {/* Error */}
//           {error && (
//             <div style={{
//               background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
//               borderRadius: 10, padding: "10px 14px", marginBottom: 20, textAlign: "center",
//             }}>
//               <p style={{ color: "#f87171", fontSize: 11, fontWeight: 700,
//                 textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
//                 {error}
//               </p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

//             {/* Roll number */}
//            <div style={{ position: "relative" }}>
//   <input
//     type="text"
//     placeholder="ROLL NUMBER"
//     value={roll}
//     onChange={handleRollChange}
//     maxLength={10}
//     autoFocus
//     style={{
//       width: "100%",
//       boxSizing: "border-box",
//       background: "#1a1a1a",
//       border: "1px solid #333",
//       color: "white",
//       textAlign: "center",
//       padding: "14px 14px",
//       borderRadius: 12,
//       outline: "none",
//       fontSize: 13,
//       letterSpacing: "0.2em",
//       fontFamily: "monospace",
//     }}
//     onFocus={e => e.target.style.borderColor = "#555"}
//     onBlur={e => e.target.style.borderColor = "#333"}
//   />
//               <span style={{
//                 position: "absolute", right: 12, top: "50%",
//                 transform: "translateY(-50%)",
//                 fontSize: 10, fontFamily: "monospace",
//                 color: isAdmin ? "#a855f7" : (roll.length === 10 && isValidRoll(roll)) ? "#26F2D0" : "#444",
//               }}>
//                 {isAdmin ? "ADMIN" : `${roll.length}/10`}
//               </span>
//             </div>

//             {/* Password */}
//             <div style={{ position: "relative" }}>
//               <input
//                 type={showPass ? "text" : "password"}
//                 placeholder={isAdmin ? "ADMIN PASSWORD" : "PASSWORD"}
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 style={{
//                   width: "100%", boxSizing: "border-box",
//                   background: "#1a1a1a", border: "1px solid #333",
//                   color: "white", textAlign: "center",
//                   padding: "14px 44px 14px 14px",
//                   borderRadius: 12, outline: "none",
//                   fontSize: 13, letterSpacing: "0.15em",
//                   fontFamily: "monospace",
//                 }}
//                 onFocus={e  => e.target.style.borderColor = "#555"}
//                 onBlur={e   => e.target.style.borderColor = "#333"}
//               />
//               <button 
//                 type="button" 
//                 tabIndex={-1} 
//                 onClick={() => setShowPass(s => !s)}
//                 style={{
//                   position: "absolute", right: 12, top: "50%",
//                   transform: "translateY(-50%)",
//                   background: "none", border: "none",
//                   cursor: "pointer", color: "#555", 
//                   padding: 0, display: "flex", alignItems: "center",
//                   width: 20, height: 20,
//                 }}
//               >
//                 {showPass ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
//               </button>
//             </div>

//             {/* Submit */}
//             <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
//               <button type="submit"
//                 disabled={loading || !roll.trim() || !password.trim()}
//                 style={{
//                   width: 56, height: 56, borderRadius: "50%",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   border: "none",
//                   cursor: loading || !roll.trim() || !password.trim() ? "not-allowed" : "pointer",
//                   background: loading || !roll.trim() || !password.trim() ? "#222" : "white",
//                   color:      loading || !roll.trim() || !password.trim() ? "#444" : "black",
//                   fontSize: 22, transition: "all 0.2s",
//                   boxShadow: !loading && roll.trim() && password.trim()
//                     ? "0 0 20px rgba(255,255,255,0.2)" : "none",
//                 }}
//                 onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.1)"; }}
//                 onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
//               >
//                 {loading
//                   ? <div style={{ width: 20, height: 20, border: "2px solid #666",
//                       borderTopColor: "transparent", borderRadius: "50%",
//                       animation: "spin 0.8s linear infinite" }} />
//                   : "→"
//                 }
//               </button>
//             </div>
//           </form>

//           {/* New user link */}
//           {!isAdmin && (
//             <div style={{ textAlign: "center", marginTop: 24 }}>
//               <span style={{ color: "#444", fontSize: 12 }}>New to Campus Vault? </span>
//               <Link to="/profile"
//                 style={{ color: "#26F2D0", fontSize: 12, fontWeight: 700, textDecoration: "none" }}
//                 onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
//                 onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>
//                 Register here →
//               </Link>
//             </div>
//           )}

//           <div style={{
//             display: "flex", flexDirection: "column", alignItems: "center",
//             gap: 6, marginTop: 28, opacity: 0.15,
//           }}>
//             <div style={{ height: 1, width: 32, background: "white" }} />
//             <p style={{ color: "white", fontSize: 9, fontWeight: 900,
//               letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>
//               Secure
//             </p>
//           </div>
//         </div>
//       </div>

//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// }




import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Access() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRollChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setRoll(val);
    if (error) setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rollUp = roll.trim().toUpperCase();

    if (!rollUp || !password.trim()) {
      setError("Enter roll number and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber: rollUp, password }),
      });

      // if (!res.ok) {
      //   const txt = await res.text();
      //   // Backend handles all validation - show generic error
      //   if (txt.toLowerCase().includes("not found") || txt.toLowerCase().includes("no student")) {
      //     setError("No account found. Please register first.");
      //   } else if (txt.toLowerCase().includes("bad credentials") || txt.toLowerCase().includes("password")) {
      //     setError("Incorrect password. Try again.");
      //   } else if (txt.toLowerCase().includes("invalid admin")) {
      //     setError("Invalid admin credentials.");
      //   } else {
      //     setError("Invalid roll number or password");
      //   }
      //   setLoading(false);
      //   return;
      // }

          if (!res.ok) {
      setError("Invalid roll number or password"); // ← ALWAYS this message
      setLoading(false);
      return;
    }

      const d = await res.json();

      sessionStorage.setItem("token", d.token);
      sessionStorage.setItem("role", d.role);
      sessionStorage.setItem("rollNumber", d.rollNumber);
      sessionStorage.setItem("name", d.name);
      sessionStorage.setItem("id", d.id);
      sessionStorage.setItem("Email", d.email || "");

      window.dispatchEvent(new Event("userLoggedIn"));

      if (d.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate(`/profile/${d.id}/home`);
      }
    } catch {
      setError("Server not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#000", position: "relative", overflow: "hidden",
      padding: "24px 16px", boxSizing: "border-box",
      fontFamily: "sans-serif",
    }}>

      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/vault-bg.jpeg')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.3, pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 360 }}>
        <div style={{
          background: "#0f0f0f", border: "1px solid #222",
          borderRadius: 32, padding: "40px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,1)",
        }}>

          {/* Title */}
          <p style={{
            color: "white", textAlign: "center", fontSize: 11,
            fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase",
            margin: "0 0 32px",
          }}>
            CAMPUS VAULT
          </p>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 10, padding: "10px 14px", marginBottom: 20, textAlign: "center",
            }}>
              <p style={{ color: "#f87171", fontSize: 11, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Roll number - NO HINTS */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="ROLL NUMBER"
                value={roll}
                onChange={handleRollChange}
                maxLength={10}
                autoFocus
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  color: "white",
                  textAlign: "center",
                  padding: "14px 14px",
                  borderRadius: 12,
                  outline: "none",
                  fontSize: 13,
                  letterSpacing: "0.2em",
                  fontFamily: "monospace",
                }}
                onFocus={e => e.target.style.borderColor = "#555"}
                onBlur={e => e.target.style.borderColor = "#333"}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="PASSWORD"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "#1a1a1a", border: "1px solid #333",
                  color: "white", textAlign: "center",
                  padding: "14px 44px 14px 14px",
                  borderRadius: 12, outline: "none",
                  fontSize: 13, letterSpacing: "0.15em",
                  fontFamily: "monospace",
                }}
                onFocus={e => e.target.style.borderColor = "#555"}
                onBlur={e => e.target.style.borderColor = "#333"}
              />
              <button 
                type="button" 
                tabIndex={-1} 
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", color: "#555", 
                  padding: 0, display: "flex", alignItems: "center",
                  width: 20, height: 20,
                }}
              >
                {showPass ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
              </button>
            </div>

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
              <button type="submit"
                disabled={loading || !roll.trim() || !password.trim()}
                style={{
                  width: 56, height: 56, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "none",
                  cursor: loading || !roll.trim() || !password.trim() ? "not-allowed" : "pointer",
                  background: loading || !roll.trim() || !password.trim() ? "#222" : "white",
                  color: loading || !roll.trim() || !password.trim() ? "#444" : "black",
                  fontSize: 22, transition: "all 0.2s",
                  boxShadow: !loading && roll.trim() && password.trim()
                    ? "0 0 20px rgba(255,255,255,0.2)" : "none",
                }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                {loading
                  ? <div style={{ width: 20, height: 20, border: "2px solid #666",
                      borderTopColor: "transparent", borderRadius: "50%",
                      animation: "spin 0.8s linear infinite" }} />
                  : "→"
                }
              </button>
            </div>
          </form>

          {/* New user link */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <span style={{ color: "#444", fontSize: 12 }}>New to Campus Vault? </span>
            <Link to="/profile"
              style={{ color: "#26F2D0", fontSize: 12, fontWeight: 700, textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>
              Register here →
            </Link>
          </div>

          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 6, marginTop: 28, opacity: 0.15,
          }}>
            <div style={{ height: 1, width: 32, background: "white" }} />
            <p style={{ color: "white", fontSize: 9, fontWeight: 900,
              letterSpacing: "0.4em", textTransform: "uppercase", margin: 0 }}>
              Secure
            </p>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}