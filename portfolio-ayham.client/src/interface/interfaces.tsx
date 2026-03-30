import type { User } from "./user";

export interface personal {
  name?: string;
  title?: string;
  tagline?: string;
  email?: string;
  location?: string;
  yearsExperience?: number;
  languages?: languages[];
  cvUrl?: string;
  id?: string;
}

export interface languages {
  name: string;
  level: string;
}

export interface aboutProps {
  id?: string;
  summary?: string;
  highlights?: string[];
  languages?: languages[];
  location?: string;
  tagline?: string;
}

export interface TechnicalSkills {
  id?: string;
  skills: Record<string, string[]>;
}

export interface projectProps {
  id?: string;
  title: string;
  client: string;
  year: string;
  description: string;
  role: string;
  technologies: string[];
  category: "frontend" | "backend" | "fullstack" | "enterprise";
  order?: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

export interface experienceProps {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  technologies: string[];
  order?: number;
}
export interface educationProps {
  id?: string;
  degree: string;
  school: string;
  period: string;
  description: string;
  order?: number;
}

export interface SetupCheckResponse {
  setup_complete: boolean;
}

export interface TokenResponse {
  token: string;
  token_type: string;
}
