export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
  fork: boolean;
  owner: {
    login: string;
  };
  source?: {
    owner: {
      login: string;
    };
    name: string;
  };
  tags?: string[]; // Optional tags for each repository
  metadata?: Record<string, any>; // Optional metadata for each repository
  category?: string; // Add category
  context?: string; // Add context
  githubLink?: string; // Add githubLink
}
