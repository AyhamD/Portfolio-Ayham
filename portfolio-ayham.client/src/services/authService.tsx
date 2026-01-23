import axios, { type AxiosInstance } from "axios";
import type { SetupCheckResponse, TokenResponse, personal, aboutProps, TechnicalSkills, projectProps, experienceProps, educationProps } from "../interface/interfaces";

// For Vite: use import.meta.env.VITE_BACKEND_URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API,
});

// Add token to requests if available
api.interceptors.request.use((config:any) => {
  const token = localStorage.getItem("admin_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  checkSetup: (id: string) => api.get<SetupCheckResponse>(`/auth/${id}`),
  register: (email: string, password: string) =>
    api.post<TokenResponse>("/auth/register", { email, password }),
  login: (email: string, password: string) =>
    api.post<TokenResponse>("/auth/login", { email, password }),
  verify: () => api.get<{ createdDate: string; id: string; valid: boolean; email: string }>("/auth/profile"),
};

// Content API
export const contentAPI = {
  // Personal
  getPersonal: () => api.get<personal>("/personal"),
  updatePersonal: (data: Partial<personal>) =>
    api.put<personal>("/personal", data),

  // About
  getAbout: () => api.get<aboutProps>("/Profile/about"),
  updateAbout: (data: Partial<aboutProps>) =>
    api.post<aboutProps>("/Profile/about", data),
  
  // Skills
  getSkills: () => api.get<TechnicalSkills>("/Profile/Skills"),
  updateSkills: (data: { skills: Record<string, string[]> }) =>
    api.post<TechnicalSkills>("/Profile/Skills", data),

  // Projects
  getProjects: () => api.get<projectProps[]>("/Profile/projects"),
  createProject: (data: Omit<projectProps, "id">) =>
    api.post<projectProps>("/Profile/projects", data),
  updateProject: (id: string, data: Partial<projectProps>) =>
    api.put<projectProps>(`/Profile/projects/${id}`, data),
  deleteProject: (id: string) => api.delete(`/Profile/projects/${id}`),

  // Experience
  getExperience: () => api.get<experienceProps[]>("/Profile/experience"),
  createExperience: (data: Omit<experienceProps, "id">) =>
    api.post<experienceProps>("/Profile/experience", data),
  updateExperience: (id: string, data: Partial<experienceProps>) =>
    api.put<experienceProps>(`/Profile/experience/${id}`, data),
  deleteExperience: (id: string) => api.delete(`/Profile/experience/${id}`),

  // Education
  getEducation: () => api.get<educationProps[]>("/Profile/education"),
  updateEducation: (data: Partial<educationProps>) =>
    api.post<educationProps>("/Profile/education", data),
};

export default api;

