import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProjectDetail({ projectName, onBack, onDeveloper }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/projects/by-name?name=${encodeURIComponent(projectName)}`
        );

        setData(response.data.data);
      } catch (error) {
        console.error("Failed to load project:", error);
        setError("Unable to load project.");
      } finally {
        setLoading(false);
      }
    }

    if (projectName) {
      loadProject();
    }
  }, [projectName]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 bg-black/10 rounded" />
          <div className="h-10 w-72 bg-black/10 rounded" />
          <div className="h-4 w-96 bg-black/10 rounded" />
          <div className="h-24 w-full bg-black/5 rounded" />
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
          ← Back to Projects
        </button>

        <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg px-5 py-4">
          {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { project, developers, skills } = data;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Back */}
      <button
        onClick={onBack}
        className="text-sm text-black/50 hover:text-black transition-colors mb-10"
      >
        ← Back to Projects
      </button>

      {/* Project Header */}
      <section className="border-b border-black/10 pb-10">
        <h1
          className="text-4xl font-semibold tracking-tight mb-4"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {project.name}
        </h1>

        <p className="text-base text-black/55 leading-relaxed max-w-2xl">
          {project.description}
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
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                    }}
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

      {/* Developers */}
      <section className="py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Developers
          </h2>

          <span
            className="text-xs text-black/40 font-mono"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {developers.length} developer
            {developers.length !== 1 ? "s" : ""}
          </span>
        </div>

        {developers.length > 0 ? (
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

                <p className="text-xs text-black/50 mt-4">
                  {developer.location}
                </p>

                <button
                  onClick={() => onDeveloper(developer.name)}
                  className="w-full mt-5 text-xs font-medium px-3 py-2 border border-black rounded hover:bg-black hover:text-white transition-colors"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-black/40">
            No developers connected to this project.
          </p>
        )}
      </section>
    </div>
  );
}