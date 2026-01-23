import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Ayham Darwish<span className="text-cyan-400">.</span>
            </h3>
            <p className="text-slate-400 text-sm">
              {t("system_developer_specializing")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">{t("quick_links")}</h4>
            <div className="space-y-2">
              <a
                href="#about"
                className="block text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                {t("header.about")}
              </a>
              <a
                href="#projects"
                className="block text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                {t("header.project")}
              </a>
              <a
                href="#skills"
                className="block text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                {t("header.skills")}
              </a>
              <a
                href="#contact"
                className="block text-slate-400 hover:text-cyan-400 transition-colors text-sm"
              >
                {t("header.contact")}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">{t("connect")}</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-slate-800 p-3 rounded-lg hover:bg-cyan-500 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-3 rounded-lg hover:bg-cyan-500 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-3 rounded-lg hover:bg-cyan-500 transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-slate-400 text-sm flex items-center justify-center gap-2">
            © {currentYear} Ayham Darwish. {t("built_with")}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            {t("and")} React
          </p>
        </div>
      </div>
    </footer>
  );
};
