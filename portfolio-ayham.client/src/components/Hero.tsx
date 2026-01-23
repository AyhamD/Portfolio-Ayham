import { useState, useEffect } from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import react from '../assets/images/svg/reactjs-icon.svg';
import angular from '../assets/images/svg/angular-3.svg';
import dotnet from '../assets/images/svg/dotnet-ar21.svg';
import azure from '../assets/images/svg/azure-1.svg';
import type { personal } from "../interface/interfaces";

const Hero = ({ data }: { data: personal | null }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Animated glow effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Name and Title */}
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
              {data?.name}
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
              <p className="text-2xl md:text-3xl text-cyan-400 font-light">
                {data?.title}
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            {data?.tagline}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400">3+</div>
              <div className="text-sm text-slate-400 mt-1">
                {t("header.experience_year")}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400">15+</div>
              <div className="text-sm text-slate-400 mt-1">
                {t("header.project")}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400">30+</div>
              <div className="text-sm text-slate-400 mt-1">
                {t("header.technologies")}
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400">3</div>
              <div className="text-sm text-slate-400 mt-1">
                {t("header.languages")}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-6 text-lg group transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              {t("header.myWork")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-600 hover:border-cyan-500 text-slate-200 hover:text-cyan-400 px-8 py-6 text-lg bg-transparent transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              {t("header.contactMe")}
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center mt-12">
            <a
              href="https://www.linkedin.com/in/ayham-darwish-0580a9181/"
              target="_blank"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/AyhamD"
              target="_blank"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${data?.email}`}
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        {/* Technology Logos */}
        <div className="flex gap-8 justify-center mt-10">
          <img
            src={react}
            alt="React"
            className="h-14 w-14"
            title="React"
          />
          <img
            src={angular}
            alt="Angular"
            className="h-14 w-14"
            title="Angular"
          />
          <img
            src={dotnet}
            alt=".NET"
            className="h-14 w-14"
            title=".NET"
          />
          <img
            src={azure}
            alt="Azure"
            className="h-14 w-14"
            title="Azure"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
