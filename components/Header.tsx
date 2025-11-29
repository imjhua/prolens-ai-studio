import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            ProLens <span className="text-primary">AI Studio</span>
          </h1>
          <p className="text-slate-400 max-w-lg">
            전문적인 카메라 앵글, 조명, 시점을 조합하여 완벽한 AI 이미지를 생성하세요.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-xs font-mono text-slate-500 bg-card px-3 py-1 rounded-full border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>SYSTEM READY</span>
        </div>
      </div>
    </header>
  );
};

export default Header;