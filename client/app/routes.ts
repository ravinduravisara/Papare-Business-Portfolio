import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services.tsx"),
  route("services/:slug", "routes/service-detail.tsx"),
  route("projects", "routes/projects.tsx"),
  route("projects/:slug", "routes/project-detail.tsx"),
  route("studios", "routes/studios.tsx"),
  route("our-approach", "routes/approach.tsx"),
  route("contact", "routes/contact.tsx"),
  route("privacy", "routes/privacy.tsx"),

  // Administration Console Routes
  route("admin/login", "routes/admin/login.tsx"),
  route("admin/dashboard", "routes/admin/dashboard.tsx"),
  route("admin/projects", "routes/admin/projects.tsx"),
  route("admin/services", "routes/admin/services.tsx"),
  route("admin/clients", "routes/admin/clients.tsx"),
  route("admin/inquiries", "routes/admin/inquiries.tsx"),
  route("admin/media", "routes/admin/media.tsx"),
  route("admin/settings", "routes/admin/settings.tsx"),
] satisfies RouteConfig;

