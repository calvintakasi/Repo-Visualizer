export const GITHUB_API_BASE = "https://api.github.com/repos";

export const fetchFromGitHub = async (endpoint: string) => {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`GitHub API Error: ${response.statusText}`);
  }
  return response.json();
};
