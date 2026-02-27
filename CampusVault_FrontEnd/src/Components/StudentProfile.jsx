import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    year: "",
    branch: "",
    degree: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputChange = (e) => {
    const value = e.target.value;
    if (value.length >= 13 && !isValidRoll(value)) {
      setError("The roll number is incorrect");
      return;
    }
    setError("");
    setForm({ ...form, roll: value });
  };

  const isValidRoll = (roll) => {
    return roll.length >= 4 && roll[2] === "C" && roll[3] === "7";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.roll || !form.year || !form.branch) {
      setError("Please fill all fields");
      return;
    }

    if (!isValidRoll(form.roll)) {
      setError("Invalid roll number. Must contain all characters uppercase");
      return;
    }

    setError("");

    try {
      // STEP 1: Register student
      const response = await fetch("http://localhost:8081/student-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          rollNumber: form.roll,
          year: form.year,
          branch: form.branch,
          degree: form.degree
        })
      });

      if (!response.ok) {
        const message = await response.text();
        setError(message);
        return;
      }

      // ✅ STEP 2: Auto-login after registration
      const loginRes = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNumber: form.roll }),
      });

      if (!loginRes.ok) {
        setError("Registered but login failed. Please go back and login.");
        return;
      }

      const data = await loginRes.json();

      // ✅ Clear old session and save new student's data
      localStorage.clear();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("rollNumber", data.rollNumber);
      localStorage.setItem("name", data.name);
      localStorage.setItem("id", data.id);

      // ✅ Navigate with MongoDB id
      navigate(`/profile/${data.id}/home`);

    } catch (err) {
      setError("Backend not reachable. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black
                    bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.8)),url('/vault-bg.jpeg')]
                    bg-no-repeat bg-center bg-[length:75%_auto]">

      <div className="w-[420px] max-w-[95%] bg-[#0b0b0b]/80 backdrop-blur-xl
                      border border-white/10 rounded-2xl p-8 shadow-[0_0_60px_rgba(38,242,208,0.15)]
                      hover:shadow-[0_0_80px_rgba(38,242,208,0.25)] transition">

        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Set up your Campus Profile
        </h2>

        {error ? (
          <p className="text-red-500 text-center font-semibold mb-2">{error}</p>
        ) : (
          <p className="text-gray-400 text-center text-sm mb-6">
            This will be used when you post ideas or start discussions
          </p>
        )}

        <div className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#111] border border-white/10
                       text-white placeholder-gray-500 focus:border-[#26F2D0]
                       focus:outline-none"
          />

          <select
            value={form.degree}
            onChange={(e) => setForm({ ...form, degree: e.target.value })}
            className="w-full p-3 bg-[#111] text-white rounded-lg border border-white/10"
          >
            <option value="">Select Degree</option>
            <option value="Web B.Tech">B.Tech</option>
            <option value="Diploma">Diploma</option>
            <option value="MBA">MBA</option>
            <option value="M.Tech">M.Tech</option>
          </select>

          <input
            name="roll"
            placeholder="Roll Number"
            value={form.roll}
            onChange={inputChange}
            className="w-full p-3 rounded-lg bg-[#111] border border-white/10
                       text-white placeholder-gray-500 focus:border-[#26F2D0]
                       focus:outline-none"
          />

          <div className="flex gap-3">
            <select
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              className="w-full p-3 bg-[#111] text-white rounded-lg border border-white/10"
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>

            <select
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              className="w-full p-3 bg-[#111] text-white rounded-lg border border-white/10"
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="CSE-AI">CSE (AI)</option>
              <option value="CSE-DS">CSE (DS)</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">Mechanical</option>
              <option value="CIVIL">Civil</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-[#26F2D0] text-black py-3 rounded-xl
                       font-semibold text-lg hover:scale-[1.02]
                       hover:shadow-[0_0_30px_rgba(38,242,208,0.5)]
                       transition"
          >
            Enter Campus Vault →
          </button>
        </div>

      </div>
    </div>
  );
}