import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { contentAPI } from "../../services/authService";
import type { projectProps } from "../../interface/interfaces";

interface UseProjectsResult {
  projects: projectProps[] | null;
  loading: boolean;
  error: unknown;
}

export const useProjects = (): UseProjectsResult => {
  const { i18n } = useTranslation();
  const language = i18n.language || "en";

  const [projects, setProjects] = useState<projectProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await contentAPI.getProjects(language);
        if (!cancelled) {
          setProjects(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [language]);

  return { projects, loading, error };
};
