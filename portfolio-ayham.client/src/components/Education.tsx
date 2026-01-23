import { GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { educationProps } from "../interface/interfaces";

export const Education = ({ education }: { education: educationProps[] }) => {
  const { t } = useTranslation();
  return (
    <section id="education" className="py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Education & Courses
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto"></div>
        </div>

        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id ?? `${edu.school}-${edu.degree}`}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex items-start gap-6">
                <div className="bg-cyan-500/10 p-4 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-cyan-400 font-medium text-lg">
                        {edu.school}
                      </p>
                    </div>
                    <div className="text-slate-400 bg-slate-900/50 px-4 py-2 rounded-lg text-sm font-medium mt-2 md:mt-0">
                      {edu.period}
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
