// automations.courtrightco.com now lives on courtrightco.com/services/*.
// Every path gets a permanent redirect to the closest service page;
// anything unknown (including /, /sitemap.xml, /robots.txt) goes to email automation.
const BASE = "https://courtrightco.com/services/";
const DEFAULT = "email-automation";

const SERVICES = [
  "email-automation",
  "business-reports",
  "reports-analytics",
  "financial-trackers",
  "asset-tracking",
  "website-creation",
  "application-creation",
];

const ALIASES = {
  email: "email-automation",
  "email-triage": "email-automation",
  inbox: "email-automation",
  reports: "business-reports",
  dashboards: "business-reports",
  analytics: "reports-analytics",
  financial: "financial-trackers",
  finance: "financial-trackers",
  assets: "asset-tracking",
  inventory: "asset-tracking",
  website: "website-creation",
  websites: "website-creation",
  app: "application-creation",
  apps: "application-creation",
};

export default {
  fetch(request) {
    const segments = new URL(request.url).pathname
      .toLowerCase()
      .replace(/\.html$/, "")
      .split("/")
      .filter(Boolean);
    // "/email-automation" or "/services/email-automation" both resolve on the last segment
    const key = segments[segments.length - 1] || "";
    const slug = SERVICES.includes(key) ? key : ALIASES[key] || DEFAULT;
    return Response.redirect(BASE + slug, 301);
  },
};
