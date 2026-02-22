import { useEffect, useState } from 'react';
import { useGitHubData } from '../../hooks/useGitHubData.ts';

function App() {
  const [urlInfo, setUrlInfo] = useState({ owner: '', repo: '' });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const currentTab = tabs[0];
      if (currentTab?.url?.includes('github.com')) {
        const url = new URL(currentTab.url);
        const pathParts = url.pathname.split('/').filter(Boolean);
        if (pathParts.length >= 2) {
          setUrlInfo({ owner: pathParts[0], repo: pathParts[1] });
        }
      }
    });
  }, []);

  const { data, loading } = useGitHubData(urlInfo.owner, urlInfo.repo);

  return (
    <div className="flex flex-col h-full font-sans">
      
      <header className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <h1 className="text-base font-bold tracking-wide text-gray-100 flex items-center gap-2">
          <span className="text-blue-500 text-lg">⚡</span> Repo Visualizer
        </h1>
        <span className="text-[10px] uppercase tracking-widest text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/10 shadow-sm">
          v1.0
        </span>
      </header>
      
      <main className="flex-grow flex flex-col justify-center">
        {!urlInfo.owner ? (
          <div className="glass-card p-6 text-center flex flex-col items-center justify-center gap-3">
            <span className="text-2xl opacity-80">🔭</span>
            <p className="text-sm text-gray-400 font-medium">Navigate to a GitHub repository to reveal insights.</p>
          </div>
        ) : loading ? (
          <div className="glass-card p-8 flex flex-col items-center justify-center gap-4">
            <div className="w-6 h-6 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="text-xs text-blue-300/70 uppercase tracking-widest font-semibold animate-pulse">Scanning Architecture</div>
          </div>
        ) : data ? (
          <div className="glass-card p-6 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
            
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight truncate leading-tight">{urlInfo.repo}</h2>
              <p className="text-xs text-blue-400/80 truncate mt-0.5 font-medium">@{urlInfo.owner}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.06] transition-colors">
                <span className="text-lg">⭐</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-100 leading-none">{data.stars}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Stars</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.06] transition-colors">
                <span className="text-lg">❗</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-100 leading-none">{data.issues}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Issues</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3 block">Detected Stack</span>
              <div className="flex flex-wrap gap-2">
                {data.tech.length > 0 ? (
                  data.tech.map((t: string) => (
                    <span key={t} className="text-[11px] px-2.5 py-1.5 bg-blue-500/10 text-blue-300 rounded-lg border border-blue-500/20 uppercase font-semibold tracking-wide">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500 italic">No recognized stack</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-4 text-center border-red-500/30">
            <p className="text-sm text-red-400">Could not load repo data.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;