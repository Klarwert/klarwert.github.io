import { REPO_API_URL } from "./repo";

export interface GithubStats {
  stars: string | number;
  lastRelease: string;
  lastCommit: string;
}

const FALLBACK: GithubStats = { stars: "—", lastRelease: "—", lastCommit: "—" };

// Astro re-executes each page's frontmatter once per page during a build (6 pages here),
// and every navigation during `astro dev`. Without caching, a component fetching GitHub's
// API in its frontmatter re-fetches for every page/reload, which burns through the
// unauthenticated 60-requests/hour rate limit within minutes during local dev and can
// also throttle a build calling it from too many pages. Cache once per process instead.
let cached: Promise<GithubStats> | null = null;

export function getGithubStats(): Promise<GithubStats> {
  if (!cached) {
    cached = fetchGithubStats();
  }
  return cached;
}

async function fetchGithubStats(): Promise<GithubStats> {
  try {
    const [repoRes, releaseRes, commitRes] = await Promise.all([
      fetch(REPO_API_URL),
      fetch(`${REPO_API_URL}/releases/latest`),
      fetch(`${REPO_API_URL}/commits?per_page=1`),
    ]);

    const stats: GithubStats = { ...FALLBACK };
    if (repoRes.ok) {
      const d = await repoRes.json();
      stats.stars = d.stargazers_count ?? "—";
    }
    if (releaseRes.ok) {
      const d = await releaseRes.json();
      stats.lastRelease = d.tag_name ?? "—";
    }
    if (commitRes.ok) {
      const d = await commitRes.json();
      stats.lastCommit = (d[0]?.sha as string | undefined)?.slice(0, 7) ?? "—";
    }
    return stats;
  } catch {
    return FALLBACK;
  }
}
