import { useEffect, useState } from "react";
import api from "../services/api";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [developersLoading, setDevelopersLoading] = useState(false);
  const [error, setError] = useState("");

  // Load skills directly from CognoDB
  useEffect(() => {
    async function loadSkills() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/skills");

        setSkills(response.data.data || []);
      } catch (error) {
        console.error("Failed to load skills:", error);
        setError("Unable to load skills.");
      } finally {
        setLoading(false);
      }
    }

    loadSkills();
  }, []);

  // Find developers connected to a selected skill
  async function handleSkillClick(skill) {
    try {
      setSelectedSkill(skill);
      setDevelopersLoading(true);
      setDevelopers([]);
      setError("");

      const response = await api.get(
        `/developers/by-skill?skill=${encodeURIComponent(skill)}`
      );

      setDevelopers(response.data.data || []);
    } catch (error) {
      console.error("Failed to find developers by skill:", error);
      setError("Unable to find developers for this skill.");
    } finally {
      setDevelopersLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1
          className="text-4xl font-semibold tracking-tight mb-3"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Skills
        </h1>

        <p className="text-base text-black/55 leading-relaxed">
          Explore skills and discover developers connected to them.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg px-5 py-4 text-sm mb-8">
          {error}
        </div>
      )}

      {/* Skills */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Available Skills
          </h2>

          <span
            className="text-xs text-black/40 font-mono"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {skills.length} skill{skills.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-10 w-24 bg-black/5 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                key={skill.name}
                onClick={() => handleSkillClick(skill.name)}
                className={`px-4 py-2.5 border rounded-lg text-sm transition-all ${
                  selectedSkill === skill.name
                    ? "bg-black text-white border-black"
                    : "border-black/10 hover:border-black/40 hover:bg-black/5"
                }`}
              >
                <span>{skill.name}</span>

                {skill.category && (
                  <span
                    className={`ml-2 text-[10px] font-mono ${
                      selectedSkill === skill.name
                        ? "text-white/60"
                        : "text-black/35"
                    }`}
                  >
                    {skill.category}
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="border border-black/10 rounded-lg p-8 text-center">
            <p className="text-sm text-black/50">
              No skills found.
            </p>
          </div>
        )}
      </section>

      {/* Developers */}
      {selectedSkill && (
        <section className="mt-16 pt-10 border-t border-black/10">

          <div className="flex items-baseline justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Developers with {selectedSkill}
              </h2>

              <p className="text-sm text-black/45 mt-1">
                Developers connected to this skill in CognoDB.
              </p>
            </div>

            <span
              className="text-xs text-black/40 font-mono"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {developers.length} developer
              {developers.length !== 1 ? "s" : ""}
            </span>
          </div>

          {developersLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border border-black/10 rounded-lg p-5 h-48 animate-pulse"
                />
              ))}
            </div>
          ) : developers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {developers.map((developer) => (
                <div
                  key={developer.name}
                  className="border border-black/10 rounded-lg p-5 hover:border-black/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-sm">
                        {developer.name}
                      </h3>

                      <p className="text-xs text-black/50 mt-1">
                        {developer.role}
                      </p>
                    </div>

                    {developer.available && (
                      <span className="text-[10px] font-mono bg-black text-white px-1.5 py-0.5 rounded">
                        AVAILABLE
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-black/40 font-mono mt-4">
                    {developer.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-black/10 rounded-lg p-8 text-center">
              <p className="text-sm text-black/50">
                No developers found with this skill.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}