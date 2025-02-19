import fs from "node:fs/promises";
import path from "node:path";
import type { GitHubRepo } from "../types";

const cacheDir = path.join(process.cwd(), "src", "data");
const cacheExpiry = 60 * 60; // 1 hour

interface GitHubAPIOptions {
  apiUrl: string;
  cacheFile: string;
  transform?: (data: any) => GitHubRepo[]; // Optional transform function
}

/**
 * Fetches data from a GitHub API endpoint, with caching.
 *
 * @param {GitHubAPIOptions} options - Configuration options for the API request and caching.
 * @returns {Promise<GitHubRepo[]>} - A promise that resolves to an array of GitHubRepo objects.
 */
async function fetchGitHubData(
  options: GitHubAPIOptions,
): Promise<GitHubRepo[]> {
  const { apiUrl, cacheFile, transform } = options;

  try {
    // Check if the cache file exists and is still valid
    try {
      const stats = await fs.stat(cacheFile);
      const cacheAge = (Date.now() - stats.mtimeMs) / 1000;

      if (cacheAge < cacheExpiry) {
        const cacheData = await fs.readFile(cacheFile, "utf-8");
        console.log(`Retrieving data from cache: ${cacheFile}`);
        let parsedData = JSON.parse(cacheData);

        // Apply transform if it exists
        if (transform) {
          parsedData = transform(parsedData);
        }
        return parsedData;
      }
    } catch (cacheError: any) {
      // If the cache file doesn't exist or there's an error reading it, fetch from the API
      if (cacheError.code !== "ENOENT") {
        // ENOENT is "Error No Entity", meaning file not found
        console.error(`Error reading cache file ${cacheFile}:`, cacheError);
      }
    }

    // Fetch from the GitHub API
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(
        `GitHub API error: ${res.status} ${res.statusText} for URL: ${apiUrl}`,
      );
    }
    const data = await res.json();

    let transformedData = data; // Assume data is already in the correct format
    if (transform) {
      transformedData = transform(data);
    }

    // Write the data to the cache file
    await fs.writeFile(cacheFile, JSON.stringify(transformedData), "utf-8");
    console.log(`Fetching data from API and writing to cache: ${cacheFile}`);
    return transformedData;
  } catch (error) {
    console.error("Failed to fetch or process GitHub data:", error);
    return []; // Return an empty array to avoid crashing the page
  }
}

/**
 * Helper function to build the API URL for organization repos
 * @param org
 * @param perPage
 */
function buildOrgRepoApiUrl(org: string, perPage: number): string {
  return `https://api.github.com/orgs/${org}/repos?sort=updated&direction=desc&per_page=${perPage}`;
}

/**
 * Helper function to build the API URL for user repos
 * @param username
 * @param perPage
 */
function buildUserRepoApiUrl(username: string, perPage: number): string {
  return `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${perPage}`;
}

export { fetchGitHubData, buildOrgRepoApiUrl, buildUserRepoApiUrl, cacheDir };
