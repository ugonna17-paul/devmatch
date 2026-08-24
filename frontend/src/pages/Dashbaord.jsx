import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashbaord({ onNav }) {
    const [developers, setDevelopers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [connections, setConnections] = useState([]);
    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);
    const [skillsLoading, setSkillsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);
                setError("");

                const [
                    developersResponse,
                    projectsResponse,
                    connectionsResponse,
                ] = await Promise.all([
                    api.get("/developers"),
                    api.get("/projects"),
                    api.get("/developers/connections"),
                ]);

                setDevelopers(developersResponse.data.data || []);
                setProjects(projectsResponse.data.data || []);
                setConnections(connectionsResponse.data.data || []);
            } catch (error) {
                console.error("Failed to load dashboard:", error);
                setError("Unable to load dashboard data.");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    // Load skills directly from CognoDB
    useEffect(() => {
        async function loadSkills() {
            try {
                setSkillsLoading(true);

                const response = await api.get("/skills");

                setSkills(response.data.data || []);
            } catch (error) {
                console.error("Failed to load skills:", error);
            } finally {
                setSkillsLoading(false);
            }
        }

        loadSkills();
    }, []);

    const featuredDevelopers = developers.slice(0, 3);

    return (
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-20">
            {/* Hero */}
            <section className="flex flex-col gap-6 max-w-2xl">
                <div>
                    <h1
                        className="text-5xl font-semibold tracking-tight leading-[1.1] mb-4"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                    >
                        Find the right developer through connected skills and experience.
                    </h1>

                    <p className="text-base text-black/55 leading-relaxed max-w-xl">
                        DevMatch maps developers, skills, and projects into a graph so you
                        can discover hidden expertise, surface relevant matches, and
                        understand team capabilities at a glance.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => onNav("find")}
                        className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded hover:bg-black/85 transition-colors"
                    >
                        Find Developers
                    </button>

                    <button
                        onClick={() => onNav("developers")}
                        className="px-5 py-2.5 border border-black/20 text-sm font-medium rounded hover:border-black/50 transition-colors"
                    >
                        Browse All
                    </button>
                </div>
            </section>

            {/* Error */}
            {error && (
                <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg px-5 py-4 text-sm">
                    {error}
                </div>
            )}

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10 rounded-lg overflow-hidden">
                {/* Developers */}
                <div className="bg-white px-6 py-5">
                    <div className="text-3xl font-semibold tracking-tight">
                        {loading ? "..." : developers.length}
                    </div>

                    <div className="text-xs text-black/45 mt-1 font-mono">
                        DEVELOPERS
                    </div>
                </div>

                {/* Projects */}
                <div className="bg-white px-6 py-5">
                    <div className="text-3xl font-semibold tracking-tight">
                        {loading ? "..." : projects.length}
                    </div>

                    <div className="text-xs text-black/45 mt-1 font-mono">
                        PROJECTS
                    </div>
                </div>

                {/* Connections */}
                <div className="bg-white px-6 py-5">
                    <div className="text-3xl font-semibold tracking-tight">
                        {loading ? "..." : connections.length}
                    </div>

                    <div className="text-xs text-black/45 mt-1 font-mono">
                        CONNECTIONS
                    </div>
                </div>

                {/* Featured */}
                <div className="bg-white px-6 py-5">
                    <div className="text-3xl font-semibold tracking-tight">
                        {loading ? "..." : featuredDevelopers.length}
                    </div>

                    <div className="text-xs text-black/45 mt-1 font-mono">
                        FEATURED
                    </div>
                </div>
            </section>

            {/* Popular Skills */}
            <section>
                <div className="flex items-baseline justify-between mb-6">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Popular Skills
                    </h2>

                    <button
                        onClick={() => onNav("skills")}
                        className="text-xs text-black/45 hover:text-black transition-colors"
                    >
                        View all skills →
                    </button>
                </div>

                {skillsLoading ? (
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
                                onClick={() => onNav("skills")}
                                className="flex items-center gap-2 px-3 py-2 border border-black/12 rounded-lg hover:border-black/40 hover:bg-black/3 transition-all text-sm"
                            >
                                <span>{skill.name}</span>

                                {skill.category && (
                                    <span
                                        className="text-[10px] font-mono text-black/35"
                                        style={{
                                            fontFamily: "JetBrains Mono, monospace",
                                        }}
                                    >
                                        {skill.category}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-black/40">
                        No skills found.
                    </p>
                )}
            </section>

            {/* Featured Developers */}
            <section>
                <div className="flex items-baseline justify-between mb-6">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Featured Developers
                    </h2>

                    <button
                        onClick={() => onNav("developers")}
                        className="text-xs text-black/45 hover:text-black transition-colors"
                    >
                        View all →
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="border border-black/10 rounded-lg p-5 h-52 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Empty */}
                {!loading && featuredDevelopers.length === 0 && !error && (
                    <div className="border border-black/10 rounded-lg p-8 text-center text-sm text-black/50">
                        No developers found.
                    </div>
                )}

                {/* Developers */}
                {!loading && featuredDevelopers.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {featuredDevelopers.map((developer) => (
                            <div
                                key={developer.name}
                                className="border border-black/10 rounded-lg p-5 flex flex-col gap-4 hover:border-black/30 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-sm">
                                                {developer.name}
                                            </h3>

                                            {developer.available && (
                                                <span className="text-[10px] font-mono bg-black text-white px-1.5 py-0.5 rounded">
                                                    AVAILABLE
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-black/50 mt-0.5">
                                            {developer.role}
                                        </p>
                                    </div>

                                    <span
                                        className="text-[11px] text-black/40 font-mono shrink-0 mt-0.5"
                                        style={{
                                            fontFamily: "JetBrains Mono, monospace",
                                        }}
                                    >
                                        {developer.location}
                                    </span>
                                </div>

                                <p className="text-xs text-black/60 leading-relaxed line-clamp-2">
                                    {developer.bio}
                                </p>

                                <div className="flex items-center justify-between pt-1 border-t border-black/8">
                                    <span
                                        className="text-[11px] text-black/40 font-mono"
                                        style={{
                                            fontFamily: "JetBrains Mono, monospace",
                                        }}
                                    >
                                        Developer
                                    </span>

                                    <button
                                        onClick={() =>
                                            onNav("developer", developer.name)
                                        }
                                        className="text-xs font-medium px-3 py-1.5 border border-black rounded hover:bg-black hover:text-white transition-colors"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}