import { useEffect, useState } from "react";
import { About } from "../components/About";
import { Contacts } from "../components/Contact";
import { Education } from "../components/Education";
import { Experience } from "../components/Experience";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import Hero from "../components/Hero";
import { Projects } from "../components/Project";
import { Skills } from "../components/Skills";
import { contentAPI } from "../services/authService";
import { portfolioData } from "../data/mock";
import type {
  aboutProps,
  educationProps,
  experienceProps,
  personal,
  projectProps,
  TechnicalSkills,
} from "../interface/interfaces";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const [aboutData, setAboutData] = useState<aboutProps | null>(null);
  const [personalData, setPersonalData] = useState<personal | null>(null);
  const [skillsData, setSkillsData] = useState<TechnicalSkills | null>(null);
  const [projectsData, setProjectsData] = useState<projectProps[] | null>(null);
  const [experienceData, setExperienceData] = useState<
    experienceProps[] | null
  >(null);
  const [educationData, setEducationData] = useState<educationProps[] | null>(
    null,
  );
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          aboutRes,
          personalRes,
          skillsRes,
          projectsRes,
          experienceRes,
          educationRes,
        ] = await Promise.all([
          contentAPI.getAbout(currentLang),
          contentAPI.getPersonal(currentLang),
          contentAPI.getSkills(),
          contentAPI.getProjects(currentLang),
          contentAPI.getExperience(currentLang),
          contentAPI.getEducation(currentLang),
        ]);

        setAboutData(aboutRes.data);
        setPersonalData(personalRes.data);
        setSkillsData(skillsRes.data);
        setProjectsData(projectsRes.data);
        setExperienceData(experienceRes.data);
        setEducationData(educationRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [currentLang]);
  return (
    <>
      <Header />
      <Hero data={personalData ?? portfolioData.personal} />
      <About
        data={{
          summary: aboutData?.summary ?? portfolioData.about.summary,
          highlights: aboutData?.highlights ?? portfolioData.about.highlights,
          languages: aboutData?.languages ?? portfolioData.personal.languages,
          location: personalData?.location ?? portfolioData.personal.location,
        }}
      />
      <Skills
        skills={
          skillsData ?? {
            skills: portfolioData.skills,
          }
        }
      />
      <Projects
        projects={
          projectsData ??
          portfolioData.projects.map((p) => ({
            ...p,
            id: String(p.id),
            category: p.category as
              | "enterprise"
              | "fullstack"
              | "backend"
              | "frontend",
          }))
        }
      />
      <Experience
        experience={
          experienceData ??
          portfolioData.experience.map((e) => ({
            ...e,
            id: String(e.id),
            position: e.role,
          }))
        }
      />
      <Education education={educationData ?? [portfolioData.education]} />
      <Contacts
        personal={{
          email: personalData?.email ?? portfolioData.personal.email,
          location: personalData?.location ?? portfolioData.personal.location,
          cvUrl: personalData?.cvUrl,
        }}
      />
      <Footer email={personalData?.email ?? portfolioData.personal.email} />
    </>
  );
};
