export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  type: "full-time" | "contract" | "part-time";
  summary: string;
  highlights: string[];
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "welldev-senior",
    role: "Senior Software Engineer",
    company: "WellDev",
    companyUrl: "https://welldev.io",
    location: "Remote",
    startDate: "2023",
    endDate: "Present",
    type: "full-time",
    summary:
      "Leading full-stack development of enterprise applications, cloud infrastructure design, and workflow automation initiatives across multiple client engagements.",
    highlights: [
      "Architected and delivered cross-tenant Azure Pipeline deployment pipelines, enabling seamless multi-environment releases across client organisations",
      "Built end-to-end workflow automation solutions using Azure Logic Apps and Power Automate, eliminating manual processes and reducing operational overhead significantly",
      "Developed ASP.NET Core REST APIs integrated with Azure AI services, enabling intelligent document processing and data extraction features",
      "Implemented Microsoft Power Apps solutions for internal tooling, replacing spreadsheet-driven workflows with structured, auditable applications",
      "Contributed to Shopify theme and plugin development, delivering custom storefronts and checkout extensions for e-commerce clients",
      "Led Azure DevOps pipeline setup for CI/CD across multiple projects, standardising build, test, and deployment processes",
    ],
    tags: [
      "ASP.NET Core",
      "Azure DevOps",
      "Azure Logic Apps",
      "Power Automate",
      "Power Apps",
      "Azure AI",
      "Next.js",
      "PostgreSQL",
      "Shopify",
    ],
  },
  {
    id: "welldev-mid",
    role: "Software Engineer",
    company: "WellDev",
    companyUrl: "https://welldev.io",
    location: "Remote",
    startDate: "2021",
    endDate: "2023",
    type: "full-time",
    summary:
      "Full-stack development with a focus on .NET Core backend services, Azure cloud integrations, and database design for enterprise clients.",
    highlights: [
      "Built scalable REST APIs using ASP.NET Core backed by PostgreSQL and Microsoft SQL Server, serving thousands of daily active users",
      "Designed and maintained Azure infrastructure including App Services, Azure Functions, Service Bus, and Blob Storage",
      "Implemented complex business logic using Azure Logic Apps for automated data synchronisation between third-party platforms",
      "Developed Next.js frontends consuming internal APIs, delivering responsive, high-performance user interfaces",
      "Collaborated in Agile sprints, participating in architecture reviews, code reviews, and technical planning sessions",
    ],
    tags: [
      "ASP.NET Core",
      "C#",
      "Azure",
      "PostgreSQL",
      "MSSQL",
      "Next.js",
      "Azure Functions",
      "Service Bus",
    ],
  },
];
