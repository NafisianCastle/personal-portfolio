export interface Skill {
  name: string;
  level: "expert" | "proficient" | "familiar";
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string; // emoji icon
  color: string; // tailwind accent color class for the card glow
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    icon: "💻",
    color: "#a855f7",
    skills: [
      { name: "C#", level: "expert" },
      { name: "TypeScript", level: "proficient" },
      { name: "JavaScript", level: "proficient" },
      { name: "Python", level: "familiar" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙️",
    color: "#0ea5e9",
    skills: [
      { name: "ASP.NET Core Web API", level: "expert" },
      { name: "Entity Framework Core", level: "proficient" },
      { name: "gRPC", level: "expert" },
      { name: "MQTT", level: "expert" },
      { name: "SignalR", level: "proficient" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    color: "#22d3ee",
    skills: [
      { name: "Next.js", level: "proficient" },
      { name: "React", level: "proficient" },
      { name: "Avalonia UI", level: "proficient" },
      { name: "PowerApps", level: "familiar" },
      { name: "WinForms", level: "familiar" },
    ],
  },
  {
    id: "architecture",
    label: "Architecture & Integration",
    icon: "🏗️",
    color: "#ff1a7c",
    skills: [
      { name: "Clean Architecture", level: "expert" },
      { name: "CQRS", level: "proficient" },
      { name: "Repository Pattern", level: "proficient" },
      { name: "REST", level: "expert" },
      { name: "OData", level: "familiar" },
      { name: "SOAP", level: "proficient" },
      { name: "GraphQL", level: "familiar" },
      { name: "JWT Auth", level: "proficient" },
    ],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    icon: "☁️",
    color: "#f59e0b",
    skills: [
      { name: "Azure Pipelines (CI/CD)", level: "expert" },
      { name: "Azure Functions", level: "expert" },
      { name: "Logic Apps", level: "expert" },
      { name: "Power Automate", level: "expert" },
      { name: "Docker", level: "familiar" },
      { name: "IIS", level: "familiar" },
    ],
  },
  {
    id: "database",
    label: "Data",
    icon: "🗄️",
    color: "#10b981",
    skills: [
      { name: "SQL Server", level: "proficient" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "Couchbase", level: "proficient" },
      { name: "Supabase", level: "proficient" },
    ],
  },
];

export const levelLabel: Record<Skill["level"], string> = {
  expert: "Expert",
  proficient: "Proficient",
  familiar: "Familiar",
};
