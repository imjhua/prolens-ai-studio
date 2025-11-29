import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import OptionSelector from './components/OptionSelector';
import { LIGHTING_OPTIONS, ANGLE_OPTIONS, POV_OPTIONS, COLOR_OPTIONS } from './constants';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  // Default to 'random' as requested
  const [selectedLighting, setSelectedLighting] = useState<string>('random');
  const [selectedAngle, setSelectedAngle] = useState<string>('random');
  const [selectedPov, setSelectedPov] = useState<string>('random');
  const [selectedColor, setSelectedColor] = useState<string>('random');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Track the resolved options used for the last generation to display them
  const [usedOptions, setUsedOptions] = useState<{lighting: string, angle: string, pov: string, color: string} | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(async () => {
    if (!additionalDetails.trim()) {
      setError("추가 세부 정보를 입력해주세요. (예: 숲속의 사슴, 미래 도시의 자동차)");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    setGeneratedPrompt(null);
    setUsedOptions(null);

    // --- Resolve Lighting ---
    let activeLightingOption = LIGHTING_OPTIONS.find(o => o.id === selectedLighting);
    if (selectedLighting === 'random') {
      const candidates = LIGHTING_OPTIONS.filter(o => o.id !== 'random' && o.id !== 'none');
      activeLightingOption = candidates[Math.floor(Math.random() * candidates.length)];
    }
    
    // Construct Lighting Prompt String
    let lightingPrompt = "Not Specified";
    if (activeLightingOption && activeLightingOption.id !== 'none') {
        lightingPrompt = activeLightingOption.label;
        if (activeLightingOption.category === 'Natural' || activeLightingOption.category === 'Artificial') {
             lightingPrompt = `${activeLightingOption.category} Light: ${lightingPrompt}`;
        }
    }

    // --- Resolve Angle ---
    let activeAngleOption = ANGLE_OPTIONS.find(o => o.id === selectedAngle);
    if (selectedAngle === 'random') {
       const candidates = ANGLE_OPTIONS.filter(o => o.id !== 'random');
       activeAngleOption = candidates[Math.floor(Math.random() * candidates.length)];
    }
    const anglePrompt = activeAngleOption ? activeAngleOption.label : selectedAngle;

    // --- Resolve POV ---
    let activePovOption = POV_OPTIONS.find(o => o.id === selectedPov);
    if (selectedPov === 'random') {
       const candidates = POV_OPTIONS.filter(o => o.id !== 'random');
       activePovOption = candidates[Math.floor(Math.random() * candidates.length)];
    }
    const povPrompt = activePovOption ? activePovOption.label : selectedPov;

    // --- Resolve Color ---
    let activeColorOption = COLOR_OPTIONS.find(o => o.id === selectedColor);
    if (selectedColor === 'random') {
       const candidates = COLOR_OPTIONS.filter(o => o.id !== 'random');
       activeColorOption = candidates[Math.floor(Math.random() * candidates.length)];
    }
    const colorPrompt = activeColorOption ? activeColorOption.label : selectedColor;


    try {
      const { imageUrl, fullPrompt } = await generateImage(
        activeLightingOption && activeLightingOption.id === 'none' ? '' : lightingPrompt, 
        anglePrompt, 
        povPrompt, 
        colorPrompt,
        additionalDetails
      );
      setGeneratedImage(imageUrl);
      setGeneratedPrompt(fullPrompt);
      setUsedOptions({
        lighting: activeLightingOption ? activeLightingOption.label : selectedLighting,
        angle: anglePrompt,
        pov: povPrompt,
        color: colorPrompt
      });
      // Scroll to result on mobile
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      // Gemini API quota 등 상세 에러 메시지는 사용자에게 노출하지 않음
      setError('이미지 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsGenerating(false);
    }
  }, [selectedLighting, selectedAngle, selectedPov, selectedColor, additionalDetails]);

  return (
    <div className="min-h-screen bg-darker text-slate-200 selection:bg-primary selection:text-white pb-24">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-7 space-y-2">
            
            <div className="bg-dark/50 p-6 rounded-2xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
              <OptionSelector 
                title="조명 (Lighting)" 
                options={LIGHTING_OPTIONS} 
                selectedId={selectedLighting} 
                onSelect={setSelectedLighting}
                groupByCategory={true}
              />


              {/* 시점(POV)도 조명과 같은 그룹 UI 제공, 3인칭 선택 시 카메라 앵글 옵션을 3인칭 그룹에 합쳐서 노출 */}
              <OptionSelector 
                title="시점 (Point of View)"
                options={(() => {
                  // 랜덤만 맨 위, 나머지 그룹(3인칭+앵글/1인칭/드론 등) 뒤에 오도록 정렬
                  const random = POV_OPTIONS.find(o => o.id === 'random');
                  // 3인칭 그룹에 카메라 앵글 옵션만 추가, 3인칭(3rd) 자체는 중복 노출하지 않음
                  const povs = POV_OPTIONS.filter(o => o.id !== 'random' && o.id !== '3rd');
                  const angleItems = ANGLE_OPTIONS
                    .filter(opt => opt.id !== 'random')
                    .map(opt => ({
                      ...opt,
                      id: `3rd-angle-${opt.id}`,
                      label: opt.label,
                      category: '3인칭',
                      description: opt.description,
                      previewUrl: opt.previewUrl
                    }));
                  const grouped = [
                    ...povs,
                    ...angleItems
                  ];
                  return random ? [random, ...grouped] : grouped;
                })()}
                selectedId={selectedPov}
                onSelect={setSelectedPov}
                groupByCategory={true}
              />

              <OptionSelector 
                title="색상 (Color Grading)" 
                options={COLOR_OPTIONS} 
                selectedId={selectedColor} 
                onSelect={setSelectedColor}
              />

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-secondary rounded-full mr-2"></span>
                  추가 세부 정보 (Prompt Details)
                </h3>
                <textarea 
                  className="w-full h-32 bg-card border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none transition-all"
                  placeholder="이미지에 대한 자세한 설명을 입력하세요. (예: 비가 내리는 사이버펑크 도시의 네온 사인 아래 서 있는 로봇)"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                />
                 {error && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Mobile/Desktop Action */}
            <div className="sticky bottom-4 z-10 pt-4 lg:pt-0">
               <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`
                  w-full py-4 px-6 rounded-xl font-bold text-lg text-white shadow-2xl transition-all transform active:scale-[0.98]
                  flex items-center justify-center space-x-2
                  ${isGenerating 
                    ? 'bg-slate-700 cursor-not-allowed opacity-80' 
                    : 'bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-500 hover:to-primary shadow-primary/30'}
                `}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>생성 중 (Generating)...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span>이미지 생성하기</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Result */}
          <div className="lg:col-span-5" ref={resultRef}>

            {/* Options Summary Pill */}
            {generatedImage && usedOptions && (
               <div className="mt-4 p-4 bg-card rounded-xl border border-slate-700/50">
                 <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Applied Configuration</h4>
                 <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                       {usedOptions.lighting}
                    </span>
                    <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                       {usedOptions.angle}
                    </span>
                    <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                       {usedOptions.pov}
                    </span>
                    <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                       {usedOptions.color}
                    </span>
                 </div>
               </div>
            )}
            
            <div className={`
              h-full min-h-[400px] rounded-2xl border-2 border-dashed 
              flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500
              ${generatedImage ? 'border-transparent bg-black' : 'border-slate-700 bg-card/30'}
            `}>
              
              {!generatedImage && !isGenerating && (
                <div className="text-center p-8 text-slate-500">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">왼쪽의 옵션을 선택하고<br/>이미지를 생성해보세요.</p>
                </div>
              )}

              {isGenerating && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-darker/80 z-20 backdrop-blur-sm">
                   <div className="relative w-24 h-24 mb-4">
                     <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
                     <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin"></div>
                   </div>
                   <p className="text-primary font-medium animate-pulse">AI가 픽셀을 그리고 있습니다...</p>
                 </div>
              )}

              {generatedImage && (
                <div className="relative group w-full h-full flex items-center justify-center bg-black">
                  <img 
                    src={generatedImage} 
                    alt="Generated Art" 
                    className="w-full h-auto max-h-[80vh] object-contain shadow-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end">
                    <span className="text-xs text-slate-300 font-mono">Generative AI Output</span>
                    <a 
                      href={generatedImage} 
                      download={`prolens-ai-${Date.now()}.png`}
                      className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
                    >
                      다운로드
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* Full Prompt Display */}
            {generatedPrompt && (
              <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                 <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Generated Prompt</h4>
                 <div className="text-xs text-slate-400 font-mono whitespace-pre-wrap break-words leading-relaxed">
                   {generatedPrompt}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;