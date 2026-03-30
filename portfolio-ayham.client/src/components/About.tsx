import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { aboutProps } from "../interface/interfaces";

export const About = ({ data }: { data: aboutProps }) => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("about_view.about")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Summary */}
          <div className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              {data.summary}
            </p>

            <div className="space-y-3">
              {data.highlights?.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Languages & Info */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t("about_view.languages")}
              </h3>
              <div className="space-y-3">
                {data.languages?.map((lang, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-slate-300">{lang.name}</span>
                    <span className="text-cyan-400 text-sm font-medium">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t("about_view.location")}
              </h3>
              <p className="text-slate-300">{data.location}</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">
                {t("about_view.availability")}
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-slate-300">{t("about_view.working_at_sweco")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
