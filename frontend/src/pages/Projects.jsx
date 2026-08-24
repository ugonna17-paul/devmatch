import { useEffect, useState } from "react";
import api from "../services/api";

export default function Projects({ onView }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/projects");

        setProjects(response.data.data || []);
      } catch (error) {
        console.error("Failed to load projects:", error);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1
          className="text-4xl font-semibold tracking-tight mb-3"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Projects
        </h1>

        <p className="text-base text-black/55 leading-relaxed">
          Explore projects and discover the developers and skills connected
          to them.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg px-5 py-4 text-sm mb-8">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border border-black/10 rounded-lg p-5 h-48 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && projects.length === 0 && !error && (
        <div className="border border-black/10 rounded-lg p-10 text-center">
          <p className="text-sm text-black/50">
            No projects found.
          </p>
        </div>
      )}

      {/* Projects */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.name}
              className="border border-black/10 rounded-lg p-5 flex flex-col gap-5 hover:border-black/30 transition-colors"
            >
              <div>
                <h2 className="font-semibold text-sm mb-2">
                  {project.name}
                </h2>

                <p className="text-xs text-black/55 leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto pt-3 border-t border-black/8">
                <button
                  onClick={() => onView(project.name)}
                  className="w-full text-xs font-medium px-3 py-2 border border-black rounded hover:bg-black hover:text-white transition-colors"
                >
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}