import { useEffect, useState } from "react";
import api from "../services/api";

export default function DeveloperProfile({ developerName, onBack }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/developers/profile/${encodeURIComponent(developerName)}`
        );

        setProfile(response.data.data);
      } catch (error) {
        console.error("Failed to load developer profile:", error);
        setError("Unable to load developer profile.");
      } finally {
        setLoading(false);
      }
    }

    if (developerName) {
      loadProfile();
    }
  }, [developerName]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 bg-black/10 rounded" />
          <div className="h-10 w-72 bg-black/10 rounded" />
          <div className="h-4 w-48 bg-black/10 rounded" />
          <div className="h-24 max-w-2xl bg-black/5 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <button
          onClick={onBack}
          className="text-sm text-black/50 hover:text-black mb-8"
        >
          ← Back to Developers
        </button>

        <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg px-5 py-4">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const { developer, skills, projects } = profile;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Back */}
      <button
        onClick={onBack}
        className="text-sm text-black/50 hover:text-black transition-colors mb-10"
      >
        ← Back to Developers
      </button>

      {/* Profile Header */}
      <section className="border-b border-black/10 pb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1
                className="text-4xl font-semibold tracking-tight"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {developer.name}
              </h1>

              {developer.available && (
                <span className="text-[10px] font-mono bg-black text-white px-2 py-1 rounded">
                  AVAILABLE
                </span>
              )}
            </div>

            <p className="text-base text-black/55">
              {developer.role}
            </p>

            <p
              className="text-xs text-black/40 font-mono mt-2"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {developer.location}
            </p>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-10 border-b border-black/10 max-w-3xl">
        <h2 className="text-sm font-semibold mb-4">
          About
        </h2>

        <p className="text-sm text-black/60 leading-relaxed">
          {developer.bio}
        </p>
      </section>

      {/* Skills */}
      <section className="py-10 border-b border-black/10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Skills
          </h2>

          <span
            className="text-xs text-black/40 font-mono"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {skills.length} skill{skills.length !== 1 ? "s" : ""}
          </span>
        </div>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="border border-black/10 rounded-lg px-4 py-2.5"
              >
                <div className="text-sm font-medium">
                  {skill.name}
                </div>

                {skill.category && (
                  <div
                    className="text-[10px] text-black/40 mt-0.5 font-mono"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {skill.category}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-black/40">
            No skills listed.
          </p>
        )}
      </section>

      {/* Projects */}
      <section className="py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Projects
          </h2>

          <span
            className="text-xs text-black/40 font-mono"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.name}
                className="border border-black/10 rounded-lg p-5 hover:border-black/30 transition-colors"
              >
                <h3 className="font-semibold text-sm mb-2">
                  {project.name}
                </h3>

                <p className="text-xs text-black/55 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-black/40">
            No projects listed.
          </p>
        )}
      </section>
    </div>
  );
}