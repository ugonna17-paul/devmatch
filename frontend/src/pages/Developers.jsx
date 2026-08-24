import { useEffect, useState } from "react";
import api from "../services/api";

export default function Developers({ onView }) {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDevelopers() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/developers");

        setDevelopers(response.data.data || []);
      } catch (error) {
        console.error("Failed to load developers:", error);
        setError("Unable to load developers.");
      } finally {
        setLoading(false);
      }
    }

    loadDevelopers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <h1
          className="text-4xl font-semibold tracking-tight mb-3"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Developers
        </h1>

        <p className="text-base text-black/55 leading-relaxed">
          Explore developers, their skills, experience, and availability.
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
              className="border border-black/10 rounded-lg p-5 h-56 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && developers.length === 0 && !error && (
        <div className="border border-black/10 rounded-lg p-10 text-center">
          <p className="text-sm text-black/50">
            No developers found.
          </p>
        </div>
      )}

      {/* Developers */}
      {!loading && developers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {developers.map((developer) => (
            <div
              key={developer.name}
              className="border border-black/10 rounded-lg p-5 flex flex-col gap-4 hover:border-black/30 transition-colors"
            >
              {/* Name + Availability */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-sm">
                      {developer.name}
                    </h2>

                    {developer.available && (
                      <span className="text-[10px] font-mono bg-black text-white px-1.5 py-0.5 rounded">
                        AVAILABLE
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-black/50 mt-1">
                    {developer.role}
                  </p>
                </div>

                <span className="text-[11px] text-black/40 font-mono text-right">
                  {developer.location}
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-black/60 leading-relaxed line-clamp-3">
                {developer.bio}
              </p>

              {/* View Profile */}
              <div className="mt-auto pt-3 border-t border-black/8">
                <button
                  onClick={() => onView(developer.name)}
                  className="w-full text-xs font-medium px-3 py-2 border border-black rounded hover:bg-black hover:text-white transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}