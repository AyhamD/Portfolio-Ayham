export const portfolioData = {
  personal: {
    name: "Ayham Darwish",
    title: "System Developer",
    tagline: "Building scalable web applications with modern technologies",
    email: "ayhamdarwish1993@gmail.com",
    location: "Sweden",
    yearsExperience: 3,
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "Swedish", level: "Fluent" },
      { name: "English", level: "Fluent" }
    ]
  },
  
  about: {
    summary: "Passionate system developer with three years of experience specializing in modern web technologies. With a strong foundation in web development and a degree in computer engineering, I thrive in both independent and collaborative environments. I have successfully delivered numerous projects using frameworks like Angular and React, and I'm deeply committed to agile processes, continuous learning, and knowledge sharing.",
    highlights: [
      "3+ years of professional development experience",
      "Expert in TypeScript, Angular, React, and C# .NET",
      "Strong advocate for agile methodologies and clean code",
      "Active contributor to design meetings and architecture decisions"
    ]
  },
  
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Delivered", value: "15+" },
    { label: "Technologies", value: "30+" },
    { label: "Languages Spoken", value: "3" }
  ],
  
  skills: {
    "Frontend": [
      "TypeScript", "JavaScript", "Angular", "React", "Redux",
      "HTML5", "CSS3", "SCSS", "Blazor",
      "Angular Material", "Fluent UI", "Bootstrap", "Responsive Design"
    ],
    "Backend": [
      "C# .NET", ".NET Core", "Node.js", "Express",
      "REST API", "Java"
    ],
    "Tools & Platforms": [
      "Git", "GitHub", "Bitbucket", "Jira",
      "Azure DevOps", "Microsoft Azure", "AWS",
      "SharePoint", "Power Automate"
    ],
    "Methodologies": [
      "Agile", "Scrum", "Unit Testing",
      "Component-Based Architecture", "WCAG 2.1"
    ],
    "Design Tools": [
      "Figma", "Adobe XD"
    ]
  },
  
  experience: [
    {
      id: 1,
      company: "Sweco",
      role: "System Developer",
      startDate: "2024-02-01",
      endDate: null,
      description: "Leading development of SharePoint solutions and full-stack applications for various clients.",
      technologies: ["React", "TypeScript", "SharePoint", "C# .NET", "Azure"]
    },
    {
      id: 2,
      company: "Epical",
      role: "System Developer & Web Developer",
      startDate: "2023-04-01",
      endDate: "2023-09-01",
      description: "Developed frontend solutions and led teams in implementing communication systems for data collection.",
      technologies: ["Angular", "TypeScript", "Azure", "RxJS"]
    },
    {
      id: 3,
      company: "Devize AB",
      role: "System Developer & Web Developer",
      startDate: "2021-08-01",
      endDate: "2023-04-01",
      description: "Built web applications using modern frameworks, focusing on accessibility and user experience.",
      technologies: ["Angular", "React", "TypeScript", "Node.js"]
    }
  ],
  
  projects: [
    {
      id: 1,
      title: "Working@Sweco Filter Table",
      client: "Sweco",
      year: "2024-2025",
      description: "Custom SharePoint Framework (SPFx) solution to improve search functionality and filtering capabilities in document library tables. Streamlined document access through advanced search filters.",
      role: "SharePoint Developer",
      technologies: ["React", "TypeScript", "SharePoint", "SPFx", "Fluent UI"],
      category: "enterprise"
    },
    {
      id: 2,
      title: "SWAMP 2",
      client: "Sweco AB",
      year: "2024",
      description: "Sensor data visualization platform displaying real-time data on interactive maps and graphs. Built to help visualize and analyze sensor information.",
      role: "Full-Stack Developer",
      technologies: ["React", ".NET Core", "Blazor", "Redux", "Leaflet", "Azure"],
      category: "fullstack"
    },
    {
      id: 3,
      title: "GeoTools, GeoServer",
      client: "Eskilstuna kommun",
      year: "2024",
      description: "Enhanced open-source GeoTools project with features to dynamically show/hide legend texts. Implemented automated rule naming for thematic styles.",
      role: "System Developer",
      technologies: ["Java", "Oracle", "Git", "GeoTools"],
      category: "backend"
    },
    {
      id: 4,
      title: "Portal - Sensor Communication System",
      client: "Ramboll Sweden AB",
      year: "2023",
      description: "Communication system for collecting and representing data from various sensors. Provided clear visualization of water levels, vibrations, and energy consumption with risk level estimates.",
      role: "Frontend Developer",
      technologies: ["Angular", "TypeScript", "Azure", "Leaflet", "RxJS"],
      category: "frontend"
    },
    {
      id: 5,
      title: "Tivoli Payment System",
      client: "Epical",
      year: "2023",
      description: "QR code-based payment application for events and festivals. Streamlined payment process to reduce queue times and improve customer experience.",
      role: "Frontend Developer & Team Lead",
      technologies: ["Angular", "AWS", "RxJS", "Angular Material"],
      category: "frontend"
    },
    {
      id: 6,
      title: "Biometria External Website",
      client: "Biometria ek för",
      year: "2022-2023",
      description: "Complete rebuild of biometria.se, replacing several older sites. New platform helps customers purchase and order Biometria services efficiently.",
      role: "Frontend Developer",
      technologies: ["Angular", "TypeScript", "Azure", "Angular Material"],
      category: "frontend"
    },
    {
      id: 7,
      title: "Fleet System Migration",
      client: "Permobil Aktiebolag",
      year: "2021-2022",
      description: "Migrated legacy AngularJS application to modern Angular. Added new features, improved design, and ensured WCAG 2.1 accessibility compliance.",
      role: "Frontend Developer",
      technologies: ["Angular", "TypeScript", "Node.js", "Chart.js"],
      category: "frontend"
    },
    {
      id: 8,
      title: "Language Learning Platform",
      client: "Devize AB (Thesis)",
      year: "2021",
      description: "Interactive website for language learning using audio. Users can practice vocabulary in various languages using the MERN stack.",
      role: "System Developer",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Redux"],
      category: "fullstack"
    }
  ],
  
  education: {
    degree: "Bachelor's Degree in Computer Engineering",
    school: "Mittuniversitetet",
    period: "2018 - 2021",
    description: "Comprehensive education in computer engineering, data communication, and information systems. Foundation in full-stack development, system programming, and project management."
  }
};