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
    company: "WellDev Ltd",
    companyUrl: "https://welldev.io",
    location: "Dhaka, Bangladesh (clients in Switzerland/EU)",
    startDate: "Oct 2022",
    endDate: "Present",
    type: "full-time",
    summary:
      "Promoted from Trainee (Oct 2022) to Junior (May 2023), Software Engineer (Jul 2024) and Senior (Jul 2025). Building real-time, event-driven .NET backends and Azure automation for Swiss public transport operators and enterprise clients.",
    highlights: [
      "Built the background worker that parses and transforms VDV-452 journey-planning data for a Swiss Intermodal Transport Control System (ITCS), processing thousands of timetable records per run",
      "Designed and shipped gRPC services and MQTT-based real-time messaging in the Transport Control Center app, delivering vehicle and dispatch events to hundreds of concurrent clients with sub-second latency",
      "Designed a centralized OpenTelemetry Collector pipeline fanning out logs and traces from multiple services to Loki and Tempo, enabling zero-code-change telemetry backend swaps",
      "Visualised bus journey routes on a map UI from planning data and OSRM-generated coordinates, adding a caching layer that cut route load time from 3s to 1s",
      "Implemented automated journey-planning data sync to the Drive App via Couchbase, keeping hundreds of journeys up to date without manual intervention",
      "Automated cross-tenant CI/CD with Azure Pipelines across 2 tenants, reducing release cycle time by 50% and removing manual deployment steps",
      "Automated printer-leasing management and meter-reading sync to SAP using Azure Functions, Logic Apps and Power Automate, replacing 32 hours/month of manual entry",
      "Built a Business Document Processor using Azure AI classification and extraction, reaching 95% extraction accuracy across 3 document types",
      "Maintained and extended a legacy Abacus ERP master-data sync over SOAP with zero data-loss incidents",
      "Mentored 2 engineers through onboarding and code review; awarded Employee of the Month (Feb 2024) for mentorship and delivery",
    ],
    tags: [
      "C#",
      "ASP.NET Core",
      "gRPC",
      "MQTT",
      "OpenTelemetry",
      "Couchbase",
      "Azure Pipelines",
      "Azure Functions",
      "Logic Apps",
      "Power Automate",
      "Azure AI",
      "SOAP",
    ],
  },
];
