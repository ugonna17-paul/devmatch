import { useState } from "react";
import Nav from "./components/Nav";

import Dashboard from "./pages/Dashbaord";
import Developers from "./pages/Developers";
import DeveloperProfile from "./pages/DeveloperProfile";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Skills from "./pages/Skills";
import FindDevelopers from "./pages/FindDevelopers";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  function navigate(page, value = "") {
    setCurrentPage(page);

    if (page === "developer") {
      setSelectedDeveloper(value);
    }

    if (page === "project") {
      setSelectedProject(value);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav
        current={currentPage}
        onNav={navigate}
      />

      <main>
        {/* Dashboard */}
        {currentPage === "dashboard" && (
          <Dashboard onNav={navigate} />
        )}

        {/* Developers */}
        {currentPage === "developers" && (
          <Developers
            onView={(name) => navigate("developer", name)}
          />
        )}

        {/* Developer Profile */}
        {currentPage === "developer" && (
          <DeveloperProfile
            developerName={selectedDeveloper}
            onBack={() => navigate("developers")}
          />
        )}

        {/* Projects */}
        {currentPage === "projects" && (
          <Projects
            onView={(name) => navigate("project", name)}
          />
        )}

        {/* Project Detail */}
        {currentPage === "project" && (
          <ProjectDetail
            projectName={selectedProject}
            onBack={() => navigate("projects")}
            onDeveloper={(name) =>
              navigate("developer", name)
            }
          />
        )}

        {/* Skills */}
        {currentPage === "skills" && (
          <Skills />
        )}

        {/* Find Developers */}
        {currentPage === "find" && (
          <FindDevelopers
            onDeveloper={(name) =>
              navigate("developer", name)
            }
          />
        )}
      </main>
    </div>
  );
}

export default App;