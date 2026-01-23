import React from "react";
import styles from "./ProjectCard.module.css";
import { Project } from "../../../interface/project";
import moment from "moment";
import { useTranslation } from "react-i18next";

const ProjectCard: React.FC<Project> = (project: Project) => {
  const { t } = useTranslation();
  console.log(project)
  const formattedStartDate = moment(project.projectStartDate).format("YYYY-MM");
  const formattedEndDate = moment(project.projectEndDate).format("YYYY-MM");

  const projectDate = formattedStartDate + " - " + formattedEndDate;
  const competenciesString = project.competencies.map(c => c.competencyName).join(' - ');
  return (
    <div
      className={`w-full  cursor-pointer mx-auto border border-input bg-background`}
    >
      <div className={`${styles.cardContainer} relative w-full h-64`}>
        <div
          className={`${styles.card} absolute w-full h-full  transition-transform duration-700 ease-in-out transform hover:rotate-y-180`}
        >
          <div
            className={`${styles.cardFace} ${styles.frontFace}  p-6 shadow-lg rounded-lg overflow-hidden`}
          >
            <h3 className="text-lg font-semibold">{t("project_view.customer_name")}: {project.company}</h3>
            <h4 className="text-lg font-semibold pb-4">{t("project_view.project_name")}: {project.projectName}</h4>
            <p className="text-sm">{t("project_view.project_date")}: {projectDate}</p>
            <p className="text-sm">{t("project_view.project_role")}: {t(`project_view.${project.role}` )}</p>
            <p className="text-sm">{t("project_view.project_competency")}: {competenciesString}</p>
          </div>
          <div
            className={`${styles.cardFace} ${styles.backFace} shadow-lg rounded-lg overflow-hidden flex items-center justify-center p-4`}
          >
            <p className="text-sm">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
