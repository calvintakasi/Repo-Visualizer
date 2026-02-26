import React, { useEffect, useState } from 'react';
import { useGitHubData } from '../hooks/useGitHubData';
import { TechBadge } from './TechBadge';
import { StatItem } from './StatItem';
import { QuickLinks } from './QuickLinks';

export const SummaryCard = () => {
  const [urlInfo, setUrlInfo] = useState({ owner: '', repo: '' });

  const updatePathInfo = () => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length >= 2) {
      setUrlInfo({ owner: pathParts[0], repo: pathParts[1] });
    }
  };

  useEffect(() => {
    updatePathInfo();

    const observer = new MutationObserver(() => {
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      if (pathParts[0] !== urlInfo.owner || pathParts[1] !== urlInfo.repo) {
        updatePathInfo();
      }
    });

    observer.observe(document.querySelector('body')!, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [urlInfo.owner, urlInfo.repo]);

  const { data, loading } = useGitHubData(urlInfo.owner, urlInfo.repo);

  if (loading) return (
    <div className="my-4 p-4 bg-[#0d1117] border border-[#30363d] rounded-xl animate-pulse text-gray-400">
      Loading Repo Insights...
    </div>
  );

  if (!data || (!data.stars && !data.issues && data.tech.length === 0)) return null;

  return (
    <div className="my-4 p-4 bg-[#0d1117] border border-[#30363d] rounded-xl text-gray-200 shadow-xl font-sans">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Project Health</h2>
        <span className="text-[10px] text-gray-500 italic">Last Sync: {data.lastUpdate}</span>
      </div>
      
      <div className="flex gap-6 mb-4">
        <StatItem label="Stars" value={data.stars} icon="⭐" />
        <StatItem label="Issues" value={data.issues} icon="❗" />
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-[#30363d]">
        {data.tech.length > 0 ? (
          data.tech.map((t: string) => <TechBadge key={t} name={t} />)
        ) : (
          <span className="text-xs text-gray-500">No major framework detected</span>
        )}
      </div>

      <QuickLinks owner={urlInfo.owner} repo={urlInfo.repo} quickLinks={data.quickLinks || []} />
    </div>
  );
};