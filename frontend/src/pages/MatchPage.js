import { useState } from "react";
import axios from "axios";

export default function MatchPage() {
  const [role, setRole] = useState("recruiter");
  const [skills, setSkills] = useState("");
  const [results, setResults] = useState([]);

  const handleMatch = async () => {
    try {
      const endpoint =
        role === "recruiter"
          ? "/api/match/freelancers"
          : "/api/match/projects";

      const res = await axios.post(endpoint, {
        requiredSkills: role === "recruiter" ? skills.split(",") : undefined,
        skills: role === "freelancer" ? skills.split(",") : undefined,
      });

      setResults(res.data);
    } catch (err) {
      console.error("Matching error:", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Système de Matching</h2>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${role === "recruiter" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setRole("recruiter")}
        >
          Recruteur
        </button>
        <button
          className={`px-4 py-2 rounded ${role === "freelancer" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setRole("freelancer")}
        >
          Freelance
        </button>
      </div>

      <input
        type="text"
        placeholder="Entrez les compétences séparées par des virgules"
        className="w-full border p-2 rounded mb-4"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <button
        onClick={handleMatch}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Lancer le matching
      </button>

      <div className="mt-6">
        {results.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-2">Résultats :</h3>
            <ul className="space-y-2">
              {results.map((item) => (
                <li key={item.id} className="p-3 border rounded shadow">
                  <strong>{item.name || item.title}</strong> – Score de match :{" "}
                  <span className="font-bold">{item.matchScore}%</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
