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
import type {
  aboutProps,
  educationProps,
  experienceProps,
  personal,
  TechnicalSkills,
} from "../interface/interfaces";
import { useTranslation } from "react-i18next";
import { useProjects } from "../features/projects/hooks";

export const HomePage = () => {
  const [aboutData, setAboutData] = useState<aboutProps | null>(null);
  const [personalData, setPersonalData] = useState<personal | null>(null);
  const [skillsData, setSkillsData] = useState<TechnicalSkills | null>(null);
  const [experienceData, setExperienceData] = useState<
    experienceProps[] | null
  >(null);
  const [educationData, setEducationData] = useState<educationProps[] | null>(
    null,
  );
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const { projects: projectsData } = useProjects();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          aboutRes,
          personalRes,
          skillsRes,
          experienceRes,
          educationRes,
        ] = await Promise.all([
          contentAPI.getAbout(currentLang),
          contentAPI.getPersonal(currentLang),
          contentAPI.getSkills(),
          contentAPI.getExperience(currentLang),
          contentAPI.getEducation(currentLang),
        ]);

        setAboutData(aboutRes.data);
        setPersonalData(personalRes.data);
        setSkillsData(skillsRes.data);
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
      <Hero data={personalData ?? {}} />
      <About
        data={{
          summary: aboutData?.summary ?? "",
          highlights: aboutData?.highlights ?? [],
          languages: aboutData?.languages ?? [],
          location: personalData?.location ?? "",
        }}
      />
      <Skills
        skills={
          skillsData ?? {
            skills: {},
          }
        }
      />
      <Projects
        projects={
          projectsData ?? []
        }
      />
      <Experience
        experience={
          experienceData ??
          []
        }
      />
      <Education education={educationData ?? []} />
      <Contacts
        personal={{
          email: personalData?.email ?? "",
          location: personalData?.location ?? "",
          cvUrl: personalData?.cvUrl,
        }}
      />
      <Footer email={personalData?.email ?? ""} />
    </>
  );
};
