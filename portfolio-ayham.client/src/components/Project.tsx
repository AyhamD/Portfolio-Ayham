import { Briefcase } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { projectProps } from "../interface/interfaces";

export const Projects = ({ projects }: { projects: projectProps[] }) => {
  const [filter, setFilter] = useState("all");
  const { t } = useTranslation();
  const categories = [
    { id: "all", label: t("projects.all") },
    { id: "fullstack", label: t("projects.fullstack") },
    { id: "frontend", label: t("projects.frontend") },
    { id: "backend", label: t("projects.backend") },
    { id: "enterprise", label: t("projects.enterprise") },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("projects.featuredProjects")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto mb-6"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t("projects.description")}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === cat.id
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Header */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <Briefcase className="w-8 h-8 text-cyan-400" />
                  <span className="text-xs text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full">
                    {project.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-cyan-400 font-medium">
                  {project.client}
                </p>
              </div>

              {/* Project Body */}
              <div className="p-6 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">
                    {t("projects.role")}: {project.role}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-700/50 px-3 py-1 rounded-md text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors text-xs"
                    >
                      {tech}
                    </div>
                  ))}
                  {project.technologies.length > 4 && (
                    <div className="bg-slate-700/50 px-3 py-1 rounded-md text-slate-400 text-xs">
                      +{project.technologies.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              {t("projects.noProjectsFound")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
