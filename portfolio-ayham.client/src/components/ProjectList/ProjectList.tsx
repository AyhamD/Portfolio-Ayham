import { useTranslation } from "react-i18next";
import ProjectCard from "./ProjectCard/ProjectCard";
import { useEffect, useState } from "react";
import projectService from "../../services/projectService";
import { Project } from "../../interface/project";

const ProjectList: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    const getProjects = async () => {
      const allProjects = await projectService.getAllProject();
      console.log(allProjects);
      setProjects(allProjects);
    };

    getProjects();
  }, []);

  return (
    <>
      <section id="projects" className="container mx-auto py-12 lg:py-32">
        <div className="px-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("my_project")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("working_project")}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <ProjectCard
              key={project.id}
              projectName={project.projectName}
              company={project.company}
              description={project.description}
              projectEndDate={project.projectEndDate}
              projectStartDate={project.projectStartDate}
              role={project.role}
              competencies={project.competencies}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProjectList;
