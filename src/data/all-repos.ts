import type { GitHubRepo } from "../types"; // Import the type

export const manualRepos: Omit<
  GitHubRepo,
  "owner" | "fork" | "html_url" | "language" | "updated_at" | "description"
>[] = [
  {
    category: "Software for Personal Use and Community Contribution",
    name: "SweetHome3D (Archived)",
    context:
      "This was intended to be a fork when Git was starting to gain popularity, but the maintainer was still using SVNForge. My goal was to port the project to SWT, believing it was well-suited for supporting multiple GUI toolkits, aiming to expand its accessibility and usability.",
    githubLink: "https://github.com/vanuan/sweethome3d",
    tags: ["java", "swt"],
    metadata: { status: "archived" },
  },
  {
    category: "Software for Personal Use and Community Contribution",
    name: "PocketBook Free Software Update",
    context:
      "Discovered PocketBook in 2011, attracted by its affordable, quality e-ink hardware. I explored the possibility of installing custom software but ultimately chose the Barnes & Noble Nook for its Android support, which offered easier book management through cloud services. This project never fully materialized due to my switch to more user-friendly devices.",
    githubLink: "https://github.com/vanuan/pocketbook_free_swupdate",
    tags: ["c++", "embedded"],
    metadata: { status: "archived" },
  },
  // ... Add other manual repos here
];
