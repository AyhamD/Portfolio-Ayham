import { Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { experienceProps } from "../interface/interfaces";

export const Experience = ({
  experience,
}: {
  experience: experienceProps[];
}) => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("experience_view.experience")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-teal-500 to-transparent hidden md:block"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {experience
              .slice() // don’t mutate original
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((exp) => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-5 h-5 bg-cyan-500 rounded-full border-4 border-slate-950 hidden md:block z-10"></div>

                  {/* Content */}
                  <div className="md:ml-20 bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-cyan-400 font-medium">
                          <Briefcase className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="text-slate-400 bg-slate-900/50 px-4 py-2 rounded-lg text-sm font-medium">
                        {new Date(exp.startDate).toLocaleDateString()} -
                        {" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString()
                          : "Present"}
                      </div>
                    </div>

                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
