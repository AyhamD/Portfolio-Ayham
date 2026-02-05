import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TechnicalSkills } from "../interface/interfaces";

export const Skills = ({ skills }: { skills: TechnicalSkills }) => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const categories = Object.keys(skills?.skills || {});

  const { t } = useTranslation();
  return (
    <section id="skills" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("skills_view.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              {category.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(skills?.skills?.[activeCategory] || []).map((skill, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center">
                <span className="text-slate-200 font-medium group-hover:text-cyan-400 transition-colors">
                  {skill}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
