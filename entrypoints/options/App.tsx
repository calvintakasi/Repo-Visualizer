import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');

  // Load the saved token when the page opens
  useEffect(() => {
    chrome.storage.local.get('gh_token', (res) => {
      if (res.gh_token) setToken(res.gh_token);
    });
  }, []);

  const saveToken = () => {
    chrome.storage.local.set({ gh_token: token }, () => {
      setStatus('Token saved securely! 🚀');
      setTimeout(() => setStatus(''), 3000);
    });
  };

  return (
    <div className="glass-card p-8 w-[500px] flex flex-col gap-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>

      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
          <span className="text-blue-500">⚡</span> Settings
        </h1>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          Configure your GitHub API limits for seamless, concurrent monorepo scanning.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-300">Personal Access Token (PAT)</label>
        <p className="text-xs text-gray-500 mb-2 leading-relaxed">
          Adding a token increases your rate limit from 60 to 5,000 requests per hour. It is stored completely locally in your browser and never leaves your device.
        </p>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
          className="w-full bg-[#0d1117] border border-blue-500/30 rounded-xl p-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all shadow-inner"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-blue-400 font-medium animate-pulse">{status}</span>
        <button
          onClick={saveToken}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}

export default App;