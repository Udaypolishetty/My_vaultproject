import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import ClubForm from "../ClubForm";

function AddClub() {
  const [club, setClub] = useState(null);
  const [agree, setAgree] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1️⃣ Fetch existing club on page load
  useEffect(() => {
    fetch("http://localhost:8081/clubs")
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setClub(data[0]); // user can create only one club
        }
      })
      .catch(err => console.error(err));
  }, []);

  // 2️⃣ Create club (REAL)
  const handleCreateClub = async (data) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8081/clubs/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create club");

      const createdClub = await res.json();
      setClub(createdClub);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Club creation failed");
    } finally {
      setLoading(false);
    }
  };

  // 3️⃣ Delete club (REAL)
  const handleDeleteClub = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Token missing. Login again.");
    return;
  }

  const res = await fetch(
    `http://localhost:8081/clubs/${club.clubId}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.error("Delete failed:", res.status);
    return;
  }

  setClub(null);
};

  return (
    <div className="flex flex-col relative">

      {club && (
        <button
          onClick={handleDeleteClub}
          className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xl"
        >
          <MdDelete />
        </button>
      )}

      <h1 className="mt-4 font-bold text-center">
        {club ? club.title : "Create New Club"}
      </h1>

      <section className="mt-10 flex flex-col gap-4">
        {club ? (
          <p>{club.description}</p>
        ) : (
          <>
            <p>
              Clubs help students improve technical skills, teamwork,
              leadership, and real-world problem solving.
            </p>
            <p>
              You can create only one club. Once created, you may delete it.
            </p>
          </>
        )}
      </section>

      {!club && (
        <form className="mt-6">
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>I agree</span>
          </label>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              disabled={!agree || loading}
              className={`rounded-xl px-5 py-2 text-black
                ${agree ? "bg-[#26F2D0]" : "bg-[#26F2D0]/20 cursor-not-allowed"}
              `}
            >
              {loading ? "Creating..." : "Create Club"}
            </button>
          </div>
        </form>
      )}

      {showForm && (
        <ClubForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreateClub}
        />
      )}
    </div>
  );
}

export default AddClub;
