import React from 'react';

const Header: React.FC = () => {
  // Check if API Key is available to determine service status
  const isServiceActive = typeof process !== 'undefined' && process.env && process.env.API_KEY;

  return (
    <header className="mb-8 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            ProLens <span className="text-primary">AI 이미지 생성기</span>
          </h1>
          <p className="text-slate-400">
            조명, 카메라 앵글, 색상, 세부 프롬프트를 조합하여 완벽한 AI 이미지를 생성하세요.
          </p>
          <div className="mt-2 text-xs text-slate-500 text-left">
            <b>영상 제작에 필요한 소스 이미지 만들기</b>
            <ul className="mt-1 list-disc list-inside space-y-0.5">
              <li><b>컷(Cut)</b>: 카메라가 멈추지 않고 한 번에 촬영하는 연속된 영상의 단위, 영상의 한 장면을 구성</li>
              <li><b>씬(Scene)</b>: 동일한 시간, 장소, 상황에서 촬영된 여러 컷이 모여 하나의 이야기를 이루는 더 큰 단위</li>
              <li><b>소스 이미지</b>: 컷과 씬을 구체적으로 설계할 때 필요한 배경, 인물, 사물 등 다양한 요소 이미지</li>
            </ul>
          </div>
        </div>
        <div className={`mt-4 sm:mt-0 flex items-center space-x-2 text-xs font-mono px-3 py-1 rounded-full border transition-all duration-300 shadow-lg ${
          isServiceActive 
            ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-emerald-500/10' 
            : 'text-rose-400 border-rose-500/30 bg-rose-500/10 shadow-rose-500/10'
        }`}>
          <span className={`w-2 h-2 rounded-full ${isServiceActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`}></span>
          <span className="uppercase tracking-wider font-bold">
            {isServiceActive ? 'SYSTEM READY' : 'SERVICE DISCONNECTED'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;