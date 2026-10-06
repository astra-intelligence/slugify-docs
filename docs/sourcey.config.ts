import { defineConfig } from "sourcey";

export default defineConfig({
  name: "slugify",
  theme: {
    preset: "default",
    colors: {
      primary: "#0F766E",
      light: "#14B8A6",
      dark: "#115E59",
    },
    fonts: {
      sans: "Inter",
      mono: "JetBrains Mono",
    },
  },
  repo: "https://github.com/simov/slugify",
  editBranch: "master",
  editBasePath: "docs",
  navigation: {
    tabs: [
      {
        tab: "Documentation",
        slug: "",
        groups: [
          {
            group: "Getting Started",
            pages: ["introduction", "quickstart"],
          },
          {
            group: "Reference",
            pages: ["api", "options", "locales", "charmap", "extend", "browser-modules"],
          },
          {
            group: "Guides",
            pages: ["url-slugs-seo", "filenames-and-ids", "multilingual-slugs", "troubleshooting"],
          },
        ],
      },
    ],
  },
  navbar: {
    links: [
      { type: "github", href: "https://github.com/simov/slugify" },
      { type: "npm", href: "https://www.npmjs.com/package/slugify" },
    ],
    primary: { type: "button", label: "Quickstart", href: "/quickstart" },
  },
  footer: {
    links: [{ type: "github", href: "https://github.com/simov/slugify" }],
  },
  search: {
    featured: ["introduction", "quickstart", "options", "locales"],
  },
});
