import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    name: "Repo Visualizer",
    description: "Instantly see tech stack and health of GitHub repos.",
    version: "1.0.0",
    // Add "activeTab" and "tabs" here:
    permissions: ["storage", "activeTab", "tabs"],
    host_permissions: ["https://api.github.com/*"],
  },
});
