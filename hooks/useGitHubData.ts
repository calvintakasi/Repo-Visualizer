import { useState, useEffect } from "react";

export const useGitHubData = (owner: string, repo: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!owner || !repo) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const MY_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

        const headers = MY_TOKEN ? { Authorization: `Bearer ${MY_TOKEN}` } : {};

        const repoRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
          { headers },
        );

        if (repoRes.status === 403) {
          console.warn("GitHub API Rate limit exceeded.");
          setLoading(false);
          return;
        }

        const repoJson = await repoRes.json();

        const jsPaths = [
          "package.json",
          "frontend/package.json",
          "client/package.json",
          "web/package.json",
        ];
        const pyPaths = [
          "requirements.txt",
          "backend/requirements.txt",
          "api/requirements.txt",
          "pyproject.toml",
        ];
        const allPaths = [...jsPaths, ...pyPaths];

        const fileResponses = await Promise.all(
          allPaths.map((path) =>
            fetch(
              `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
              { headers },
            )
              .then((res) => (res.ok ? { path, data: res.json() } : null))
              .catch(() => null),
          ),
        );

        let allTech: string[] = [];
        const jsKeywords = [
          "react",
          "tailwind",
          "tailwindcss",
          "typescript",
          "next",
          "vite",
          "mongodb",
          "express",
          "prisma",
          "framer-motion",
        ];
        const pyKeywords = [
          "fastapi",
          "django",
          "flask",
          "celery",
          "sqlalchemy",
          "pandas",
          "numpy",
          "tensorflow",
          "pytorch",
        ];

        for (const file of fileResponses) {
          if (!file) continue;

          const fileData = await file.data;
          if (!fileData || !fileData.content) continue;

          try {
            const decodedContent = atob(fileData.content);

            if (file.path.endsWith(".json")) {
              const contentObj = JSON.parse(decodedContent);
              const deps = {
                ...contentObj.dependencies,
                ...contentObj.devDependencies,
              };
              const found = Object.keys(deps).filter((d) =>
                jsKeywords.includes(d.toLowerCase()),
              );
              allTech.push(...found);
            } else {
              const textContent = decodedContent.toLowerCase();
              pyKeywords.forEach((kw) => {
                if (textContent.includes(kw)) {
                  allTech.push(kw);
                }
              });
            }
          } catch (e) {
            console.log(`Error parsing ${file.path}`, e);
          }
        }

        const normalizedTech = allTech.map((t) =>
          t === "tailwindcss" ? "tailwind" : t,
        );
        const uniqueTech = [...new Set(normalizedTech)];

        setData({
          stars: repoJson.stargazers_count || 0,
          issues: repoJson.open_issues_count || 0,
          lastUpdate: new Date(repoJson.pushed_at).toLocaleDateString(),
          tech: uniqueTech,
        });
      } catch (err) {
        console.error("Visualizer Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [owner, repo]);

  return { data, loading };
};
