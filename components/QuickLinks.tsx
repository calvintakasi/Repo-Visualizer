import React from 'react';
import { FileText, FileJson, Package, Zap, Settings2 } from 'lucide-react';

interface QuickLinksProps {
  owner: string;
  repo: string;
  quickLinks: string[];
}

const getFileIcon = (fileName: string) => {
  if (fileName === 'package.json') return <FileJson className="w-4 h-4" />;
  if (fileName === 'requirements.txt') return <FileText className="w-4 h-4" />;
  if (fileName === 'Dockerfile') return <Package className="w-4 h-4" />;
  if (fileName === 'docker-compose.yml') return <Package className="w-4 h-4" />;
  if (fileName.includes('config') || fileName.includes('tsconfig')) return <Settings2 className="w-4 h-4" />;
  if (fileName === 'Makefile') return <Zap className="w-4 h-4" />;
  return <FileText className="w-4 h-4" />;
};

const getFileColor = (fileName: string) => {
  if (fileName === 'package.json' || fileName.includes('config')) return 'text-yellow-400';
  if (fileName === 'Dockerfile' || fileName === 'docker-compose.yml') return 'text-blue-400';
  if (fileName === 'requirements.txt' || fileName === 'pyproject.toml') return 'text-blue-300';
  if (fileName === '.env.example') return 'text-red-400';
  return 'text-gray-300';
};

export const QuickLinks: React.FC<QuickLinksProps> = ({ owner, repo, quickLinks }) => {
  if (!quickLinks || quickLinks.length === 0) return null;

  return (
    <div className="pt-3 border-t border-white/10">
      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">Quick Links</span>
      <div className="flex flex-wrap gap-2">
        {quickLinks.map((file) => (
          <a
            key={file}
            href={`https://github.com/${owner}/${repo}/blob/HEAD/${file}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all hover:border-white/20 text-[11px] font-medium tracking-wide ${getFileColor(file)}`}
            title={`View ${file}`}
          >
            {getFileIcon(file)}
            <span>{file.split('/').pop()}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
