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
    id: "transport-control-center",
    title: "Transport Control Center",
    description:
      "gRPC services and MQTT-based real-time messaging delivering vehicle and dispatch events to hundreds of concurrent clients with sub-second latency, for Swiss public transport operators.",
    category: "work",
    tags: ["C#", "gRPC", "MQTT", "ASP.NET Core", "OpenTelemetry"],
    featured: true,
    accentColor: "#0ea5e9",
    icon: "🚌",
  },
  {
    id: "vdv-452-itcs-worker",
    title: "VDV-452 Journey-Planning Pipeline",
    description:
      "Background worker that parses and transforms VDV-452 timetable data for a Swiss Intermodal Transport Control System, syncing journeys to the Drive App via Couchbase and rendering OSRM routes with caching (3s to 1s).",
    category: "work",
    tags: ["C#", "VDV-452", "Couchbase", "OSRM"],
    featured: true,
    accentColor: "#a855f7",
    icon: "🗺️",
  },
  {
    id: "cross-tenant-cicd",
    title: "Cross-Tenant CI/CD",
    description:
      "Azure Pipelines automation across 2 tenants that cut release cycle time by 50% and removed manual deployment steps.",
    category: "work",
    tags: ["Azure Pipelines", "CI/CD", "Docker", "IIS"],
    featured: false,
    accentColor: "#f59e0b",
    icon: "🚀",
  },
  {
    id: "sap-printer-leasing",
    title: "Printer Leasing & SAP Sync Automation",
    description:
      "Automated printer-leasing management and meter-reading sync to SAP with Azure Functions, Logic Apps and Power Automate, replacing 32 hours/month of manual entry.",
    category: "work",
    tags: ["Azure Functions", "Logic Apps", "Power Automate", "SAP"],
    featured: false,
    accentColor: "#ff1a7c",
    icon: "⚡",
  },
  {
    id: "business-document-processor",
    title: "Business Document Processor",
    description:
      "Azure AI classification and extraction pipeline reaching 95% extraction accuracy across 3 document types.",
    category: "work",
    tags: ["Azure AI", "C#", "ASP.NET Core"],
    featured: false,
    accentColor: "#10b981",
    icon: "🤖",
  },
  {
    id: "landlord",
    title: "Landlord",
    description:
      "Land-plot mapping and management PWA with boundary capture, document storage, offline sync and payments.",
    category: "personal",
    liveUrl: "https://www.landlordsbd.com/",
    tags: ["Next.js", "Supabase", "OpenStreetMap", "Dexie"],
    featured: true,
    accentColor: "#22d3ee",
    icon: "📍",
  },
  {
    id: "shopneel",
    title: "Shopneel",
    description:
      "Offline-first Point of Sale (POS) and inventory management system designed for small to medium shops.",
    category: "personal",
    liveUrl: "https://shopneel.app/",
    tags: ["Avalonia UI", "ASP.NET Core", "Blazor", "MAUI"],
    featured: true,
    accentColor: "#0ea5e9",
    icon: "🛍️",
  },
  {
    id: "finance-os",
    title: "Finance-OS",
    description:
      "Local-first, offline-capable personal finance PWA with optional cloud sync.",
    category: "personal",
    liveUrl: "https://finance-operating-system.vercel.app/",
    tags: ["Next.js", "Dexie", "Supabase"],
    featured: false,
    accentColor: "#10b981",
    icon: "💰",
  },
  {
    id: "ytvidshare",
    title: "YTVidShare",
    description:
      "Video-sharing platform with JWT auth, response caching and rate limiting.",
    category: "personal",
    githubUrl: "https://github.com/NafisianCastle/YTVidShare",
    tags: ["ASP.NET Web API", "SQL Server", "React"],
    featured: false,
    accentColor: "#ff1a7c",
    icon: "🎬",
  },
  {
    id: "simplychat",
    title: "SimplyChat",
    description: "Real-time chat app built on SignalR.",
    category: "personal",
    githubUrl: "https://github.com/NafisianCastle/SimplyChat",
    tags: ["SignalR", "ASP.NET Core", "EF Core"],
    featured: false,
    accentColor: "#a855f7",
    icon: "💬",
  },
  {
    id: "portfolio-site",
    title: "Personal Portfolio Website",
    description:
      "This site — built with Next.js, Tailwind CSS, Framer Motion, and Notion as a CMS for blog posts. Deployed on Vercel.",
    category: "personal",
    githubUrl: "https://github.com/NafisianCastle/personal-portfolio",
    liveUrl: "/",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Notion API"],
    featured: false,
    accentColor: "#f59e0b",
    icon: "🌐",
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  all: "All Projects",
  work: "Work",
  personal: "Personal",
};
