export type ProjectCategory = "all" | "work" | "personal";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: Exclude<ProjectCategory, "all">;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  accentColor: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: "workflow-automation-platform",
    title: "Enterprise Workflow Automation Platform",
    description:
      "Designed and built an end-to-end workflow automation system using Azure Logic Apps and Power Automate, eliminating manual data entry and approvals across multiple departments.",
    longDescription:
      "Architected a comprehensive automation platform connecting ERP, CRM, and HR systems through Azure Logic Apps. Replaced 15+ manual processes with automated workflows, reducing processing time from days to minutes.",
    category: "work",
    tags: ["Azure Logic Apps", "Power Automate", "ASP.NET Core", "PostgreSQL", "Azure Service Bus"],
    featured: true,
    accentColor: "#ff1a7c",
    icon: "⚡",
  },
  {
    id: "cross-tenant-pipeline",
    title: "Cross-Tenant Azure Pipeline Framework",
    description:
      "Built a reusable Azure DevOps pipeline framework enabling deployments across multiple client tenants from a single source, with environment-specific configuration and approval gates.",
    category: "work",
    tags: ["Azure DevOps", "Azure Pipelines", "YAML", "ARM Templates", "Key Vault"],
    featured: true,
    accentColor: "#0ea5e9",
    icon: "🚀",
  },
  {
    id: "ai-document-processor",
    title: "AI-Powered Document Processing API",
    description:
      "ASP.NET Core API integrating Azure AI Document Intelligence to extract, classify, and structure data from invoices, contracts, and forms — replacing a fully manual review process.",
    category: "work",
    tags: ["ASP.NET Core", "Azure AI", "Azure Functions", "PostgreSQL", "C#"],
    featured: true,
    accentColor: "#a855f7",
    icon: "🤖",
  },
  {
    id: "power-apps-portal",
    title: "Internal Operations Power Apps Portal",
    description:
      "Microsoft Power Apps canvas app providing a structured interface for operational workflows, replacing a collection of spreadsheets and email chains with a governed, auditable system.",
    category: "work",
    tags: ["Power Apps", "Power Automate", "SharePoint", "Dataverse"],
    featured: false,
    accentColor: "#f59e0b",
    icon: "📊",
  },
  {
    id: "shopify-custom-theme",
    title: "Custom Shopify Theme & Checkout Extension",
    description:
      "Built a bespoke Shopify theme from scratch with a custom checkout extension, loyalty points display, and product bundling UI for an e-commerce client.",
    category: "work",
    tags: ["Shopify", "Liquid", "JavaScript", "Shopify CLI", "GraphQL"],
    featured: false,
    accentColor: "#10b981",
    icon: "🛒",
  },
  {
    id: "portfolio-site",
    title: "Personal Portfolio Website",
    description:
      "This site — built with Next.js 16, Tailwind CSS v4, Framer Motion, and Notion as a CMS for blog posts. Deployed on Vercel with automated rebuilds.",
    longDescription:
      "A performant, bold portfolio site using Next.js App Router with SSG. Blog content is powered by the Notion API with react-notion-x for rendering. Features animated sections, dark theme, and a contact form via EmailJS.",
    category: "personal",
    githubUrl: "https://github.com/nafisurrahman/portfolio",
    liveUrl: "/",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Notion API", "Vercel"],
    featured: true,
    accentColor: "#22d3ee",
    icon: "🌐",
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  all: "All Projects",
  work: "Work",
  personal: "Personal",
};
