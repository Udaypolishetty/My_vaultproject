import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Access = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChecks = async () => {
    const roll = inputValue.trim().toUpperCase();

    if (!roll) { setError("Please enter your roll number"); return; }
    if (!/^[A-Z0-9]+$/.test(roll)) { setError("Roll number must contain only CAPITAL letters and numbers"); return; }
    if (roll.length < 4 || roll[2] !== "C" || roll[3] !== "7") { setError("Invalid roll number format — capital letters"); return; }

    setError("");
    setLoading(true);

    try {
      // STEP 1: Check if roll number exists
      const existsRes = await fetch(`http://localhost:8081/student/exists/${roll}`);
      const exists = await existsRes.json();

      if (!exists) {
        navigate("/profile", { state: { rollNumber: roll } });
        return;
      }

      // STEP 2: Login
      const loginRes = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber: roll }),
      });

      if (!loginRes.ok) { setError("Login failed. Please try again."); return; }

      const data = await loginRes.json();

      // ✅ Clear old student's data before saving new
      localStorage.clear();

      // ✅ Save new student's data
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("rollNumber", data.rollNumber);
      localStorage.setItem("name", data.name);
      localStorage.setItem("id", data.id);

      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate(`/profile/${data.id}/home`);
      }

    } catch {
      setError("Backend not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="
          min-h-screen flex items-center justify-center
          bg-black
          bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.75)),url('/vault-bg.jpeg')]
          bg-no-repeat bg-center
          bg-[length:75%_auto]
        "
      >
        <div
          className="
            w-[360px] max-w-[90%]
            rounded-[18px]
            px-8 py-9
            text-center
            shadow-[0_25px_50px_rgba(0,0,0,1)]
          "
        >
          <h1 className="text-white text-[18px] tracking-[1.6px] mb-4">
            ENTER YOUR ROLL NUMBER
          </h1>

          {error && (
            <p className="text-red-500 text-sm font-semibold mb-3">{error}</p>
          )}

          <form onSubmit={(e) => { e.preventDefault(); if (!loading) handleChecks(); }}>
            <div className="relative w-[70%] mx-auto mb-4">
              <img
                src="/lock.jpeg"
                alt="lock"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-5 pointer-events-none"
              />
              <input
                className="
                  w-full py-3 pl-14 pr-10
                  rounded-full text-center
                  outline-none
                  shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                "
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className={`
                  w-10 h-10 rounded-full text-2xl
                  flex items-center justify-center transition
                  ${loading || !inputValue.trim()
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:scale-105"
                  }
                `}
              >
                {loading ? "…" : "→"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Access;