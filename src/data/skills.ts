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
    id: "cloud-azure",
    label: "Cloud & Azure",
    icon: "☁️",
    color: "#0ea5e9",
    skills: [
      { name: "Azure Services", level: "expert" },
      { name: "Azure DevOps", level: "expert" },
      { name: "Azure AI", level: "proficient" },
      { name: "Azure Logic Apps", level: "expert" },
      { name: "Azure Pipelines", level: "expert" },
      { name: "Azure Static Web Apps", level: "proficient" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙️",
    color: "#a855f7",
    skills: [
      { name: "ASP.NET Core", level: "expert" },
      { name: "C#", level: "expert" },
      { name: "REST APIs", level: "expert" },
      { name: "Entity Framework Core", level: "proficient" },
      { name: "SignalR", level: "proficient" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    color: "#22d3ee",
    skills: [
      { name: "Next.js", level: "expert" },
      { name: "React", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "Tailwind CSS", level: "proficient" },
      { name: "Shopify Themes", level: "proficient" },
      { name: "Shopify Plugins", level: "proficient" },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    icon: "⚡",
    color: "#ff1a7c",
    skills: [
      { name: "Power Automate", level: "expert" },
      { name: "Microsoft Power Apps", level: "expert" },
      { name: "Azure Logic Apps", level: "expert" },
      { name: "Workflow Design", level: "expert" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Deployment",
    icon: "🚀",
    color: "#f59e0b",
    skills: [
      { name: "Azure Pipelines", level: "expert" },
      { name: "Cross-Tenant Deployment", level: "expert" },
      { name: "CI/CD", level: "expert" },
      { name: "Docker", level: "proficient" },
      { name: "Git", level: "expert" },
    ],
  },
  {
    id: "database",
    label: "Databases",
    icon: "🗄️",
    color: "#10b981",
    skills: [
      { name: "PostgreSQL", level: "expert" },
      { name: "Microsoft SQL Server", level: "expert" },
      { name: "Redis", level: "familiar" },
    ],
  },
];

export const levelLabel: Record<Skill["level"], string> = {
  expert: "Expert",
  proficient: "Proficient",
  familiar: "Familiar",
};
