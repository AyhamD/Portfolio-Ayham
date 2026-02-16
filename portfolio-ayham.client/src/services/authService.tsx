import type { SetupCheckResponse, TokenResponse, personal, aboutProps, TechnicalSkills, projectProps, experienceProps, educationProps } from "../interface/interfaces";
import { httpClient } from "./httpClient";

// Auth API
export const authAPI = {
  checkSetup: (id: string) => httpClient.get<SetupCheckResponse>(`/auth/${id}`),
  register: (email: string, password: string) =>
    httpClient.post<TokenResponse>("/auth/register", { email, password }),
  login: (email: string, password: string) =>
    httpClient.post<TokenResponse>("/auth/login", { email, password }),
  verify: () => httpClient.get<{ createdDate: string; id: string; valid: boolean; email: string }>("/auth/profile"),
};

// Content API
export const contentAPI = {
  // Personal
  getPersonal: (language: string) => httpClient.get<personal>(`/personal?lang=${language}`),
  updatePersonal: (data: Partial<personal> & { language: string }) =>
    httpClient.put<personal>("/personal", data),

  // About
  getAbout: (language: string) =>
    httpClient.get<aboutProps>(`/Profile/about?lang=${language}`),
  updateAbout: (data: Partial<aboutProps> & { language: string }) =>
    httpClient.post<aboutProps>("/Profile/about", data),
  
  // Skills
  getSkills: () => httpClient.get<TechnicalSkills>(`/Profile/Skills`),
  updateSkills: (data: { skills: Record<string, string[]> }) =>
    httpClient.post<TechnicalSkills>("/Profile/Skills", data),

  // Projects
  getProjects: (language: string) => httpClient.get<projectProps[]>(`/Profile/projects?lang=${language}`),
  createProject: (data: Omit<projectProps, "id"> & { language: string }) =>
    httpClient.post<projectProps>("/Profile/projects", data),
  updateProject: (id: string, data: Partial<projectProps> & { language: string }) =>
    httpClient.put<projectProps>(`/Profile/projects/${id}`, data),
  deleteProject: (id: string) => httpClient.delete(`/Profile/projects/${id}`),

  // Experience
  getExperience: (language: string) => httpClient.get<experienceProps[]>(`/Profile/experience?lang=${language}`),
  createExperience: (data: Omit<experienceProps, "id"> & { language: string }) =>
    httpClient.post<experienceProps>("/Profile/experience", data),
  updateExperience: (id: string, data: Partial<experienceProps> & { language: string }) =>
    httpClient.put<experienceProps>(`/Profile/experience/${id}`, data),
  deleteExperience: (id: string) => httpClient.delete(`/Profile/experience/${id}`),

  // Education
  getEducation: (language: string) => httpClient.get<educationProps[]>(`/Profile/education?lang=${language}`),
  createEducation: (data: Omit<educationProps, "id"> & { language: string }) =>
    httpClient.post<educationProps>("/Profile/education", data),
  updateEducation: (id: string, data: Partial<educationProps> & { language: string }) =>
    httpClient.put<educationProps>(`/Profile/education/${id}`, data),
  deleteEducation: (id: string) =>
    httpClient.delete(`/Profile/education/${id}`),
};

export default httpClient;

