
import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import OptionSelector from './components/OptionSelector';
import { LIGHTING_OPTIONS, ANGLE_OPTIONS, COLOR_OPTIONS } from './constants';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  // Default to 'random' as requested
  // const [selectedLighting, setSelectedLighting] = useState<string>('random');
  // const [selectedPov, setSelectedPov] = useState<string>('random');
  // const [selectedColor, setSelectedColor] = useState<string>('random');
  // const [additionalDetails, setAdditionalDetails] = useState<string>('');

  const [selectedLighting, setSelectedLighting] = useState<string>('natural-noon');
  const [selectedPov, setSelectedPov] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('none');
  const [additionalDetails, setAdditionalDetails] = useState<string>('축구장에서 축구하는 선수들');


  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [koreanPrompt, setKoreanPrompt] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Track the resolved options used for the last generation to display them
  const [usedOptions, setUsedOptions] = useState<{ lighting: string, pov: string, color: string, details: string } | null>(null);

  // Helper to extract Korean text from "Korean (English)" format
  const getKo = (label: string) => label.split('(')[0].trim();

  // 옵션/상세정보 변경 시마다 usedOptions 동기화
  React.useEffect(() => {
    // Lighting
    let lightingOption = LIGHTING_OPTIONS.find(o => o.id === selectedLighting);
    if (selectedLighting === 'random') lightingOption = LIGHTING_OPTIONS.find(o => o.id === 'random');
    let lightingKo = lightingOption ? getKo(lightingOption.label) : selectedLighting;
    // POV
    let povOption = ANGLE_OPTIONS.find(o => o.id === selectedPov);
    if (selectedPov === 'random') povOption = ANGLE_OPTIONS.find(o => o.id === 'random');
    let povKo = povOption ? getKo(povOption.label) : selectedPov;
    // Color
    let colorOption = COLOR_OPTIONS.find(o => o.id === selectedColor);
    if (selectedColor === 'random') colorOption = COLOR_OPTIONS.find(o => o.id === 'random');
    let colorKo = colorOption ? getKo(colorOption.label) : selectedColor;
    setUsedOptions({
      lighting: lightingKo,
      pov: povKo,
      color: colorKo,
      details: additionalDetails
    });
  }, [selectedLighting, selectedPov, selectedColor, additionalDetails]);

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
    setKoreanPrompt(null);
    // setUsedOptions(null); // 삭제: 옵션 요약은 항상 실시간 반영

    // Helper to extract Korean text from "Korean (English)" format
    const getKo = (label: string) => label.split('(')[0].trim();

    // --- Resolve Lighting ---
    let activeLightingOption = LIGHTING_OPTIONS.find(o => o.id === selectedLighting);
    if (selectedLighting === 'random') {
      const candidates = LIGHTING_OPTIONS.filter(o => o.id !== 'random');
      activeLightingOption = candidates[Math.floor(Math.random() * candidates.length)];
    }

    // Prompt Strings
    let lightingPromptEn = "Not Specified";
    let lightingPromptKo = "선택 안함";

    if (activeLightingOption) {
      // English Prompt
      lightingPromptEn = activeLightingOption.value;
      if (activeLightingOption.category === 'Natural' || activeLightingOption.category === 'Artificial') {
        lightingPromptEn = `${activeLightingOption.category} Light - ${lightingPromptEn}`;
      }
      // Korean Prompt (Display)
      lightingPromptKo = activeLightingOption.category === 'Natural'
        ? `자연광: ${getKo(activeLightingOption.label)}`
        : activeLightingOption.category === 'Artificial'
          ? `인공광: ${getKo(activeLightingOption.label)}`
          : getKo(activeLightingOption.label);
    }

    // --- Resolve POV (3인칭 표기 개선) ---
    let povPromptEn = selectedPov;
    let povPromptKo = selectedPov;
    let effectivePovId = selectedPov;

    // 1. Handle Random POV logic
    if (effectivePovId === 'random') {
      const candidates = ANGLE_OPTIONS.filter(o => o.id !== 'random');
      const randomOption = candidates[Math.floor(Math.random() * candidates.length)];
      effectivePovId = randomOption.id;
      povPromptEn = randomOption.value;
      povPromptKo = getKo(randomOption.label);
    } else {
      // 2. Resolve label from ID
      const opt = ANGLE_OPTIONS.find(o => o.id === effectivePovId);
      if (opt) {
        povPromptEn = opt.value;
        // 자연광/인공광 구분처럼 3인칭은 "3인칭: ..."으로 표기
        povPromptKo = opt.category === '3인칭' ? `3인칭: ${getKo(opt.label)}` : getKo(opt.label);
      }
    }

    // POV만 프롬프트로 사용
    const cameraPromptEn = povPromptEn;
    const cameraPromptKo = povPromptKo;

    // --- Resolve Color ---
    let activeColorOption = COLOR_OPTIONS.find(o => o.id === selectedColor);
    if (selectedColor === 'random') {
      const candidates = COLOR_OPTIONS.filter(o => o.id !== 'random');
      activeColorOption = candidates[Math.floor(Math.random() * candidates.length)];
    }
    const colorPromptEn = activeColorOption ? activeColorOption.value : selectedColor;
    const colorPromptKo = activeColorOption ? getKo(activeColorOption.label) : selectedColor;

    try {
      // 서비스에서 한글 프롬프트를 바로 받아서 사용
      const { imageUrl, fullPrompt, koreanPrompt } = await generateImage(
        lightingPromptEn,
        cameraPromptEn,
        colorPromptEn,
        additionalDetails
      );
      
      setGeneratedPrompt(fullPrompt);
      setKoreanPrompt(koreanPrompt);

      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {      
        setError('이미지 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setError('에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsGenerating(false);
    }
  }, [selectedLighting, selectedPov, selectedColor, additionalDetails]);

  return (
    <div className="min-h-screen w-full bg-darker text-slate-200 selection:bg-primary selection:text-white p-2 md:p-12 overflow-x-hidden">
      <div className="w-full max-w-none px-0 py-8 box-border">
        <Header />

        <div className="w-full">

          {/* Left Column: Controls */}
          <div className="space-y-2">

            <div className="bg-dark/50 p-6 rounded-2xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
              <OptionSelector
                title="조명 (Lighting)"
                options={LIGHTING_OPTIONS}
                selectedId={selectedLighting}
                onSelect={setSelectedLighting}
                groupByCategory={true}
              />


              <OptionSelector
                title="카메라 앵글 (Camera Angle)"
                options={ANGLE_OPTIONS}
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

              <div className="mb-1">
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

            {/* Options Summary Pill */}
            <div className="pt-6">
              <div className="p-4 bg-card rounded-xl border border-slate-700/50">
                <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Selected Configuration</h4>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                    조명: {usedOptions ? usedOptions.lighting : ''}
                  </span>
                  <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                    시점: {usedOptions ? usedOptions.pov : ''}
                  </span>
                  <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                    색상: {usedOptions ? usedOptions.color : ''}
                  </span>
                  <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                    추가 정보: {usedOptions ? usedOptions.details : ''}
                  </span>
                </div>
              </div>
            </div>

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
            {generatedImage && (
              <div className="bg-black m-4">
                <img
                  src={generatedImage}
                  alt="Generated Art"
                  className="max-w-[90%] h-auto object-contain mx-auto block shadow-2xl"
                />
                {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-100 transition-opacity flex justify-between items-end">
                  <span className="text-xs text-slate-300 font-mono">Generative AI Output</span>
                  <a
                    href={generatedImage}
                    download={`prolens-ai-${Date.now()}.png`}
                    className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors"
                  >
                    다운로드
                  </a>
                </div> */}
              </div>
            )}

            {/* English Prompt (Actual Input) */}
            {generatedPrompt && (
              <div className="mt-4 p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
                <h4 className="text-xs text-primary uppercase font-bold tracking-wider mb-3 flex items-center">
                  AI 프롬프트
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(generatedPrompt);
                      } else {
                        // fallback for very old browsers
                        const textarea = document.createElement('textarea');
                        textarea.value = generatedPrompt;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                      }
                    }}
                    className="ml-2 px-2 py-1 text-xs font-semibold rounded bg-primary text-white hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ marginLeft: 'auto' }}
                    title="프롬프트 복사"
                  >
                    복사
                  </button>
                </h4>
                <div className="text-xs text-slate-400 font-mono whitespace-pre-wrap break-words leading-relaxed opacity-80">
                  {generatedPrompt}
                </div>
              </div>
            )}

            {/* Korean Prompt (Summary) */}
            {koreanPrompt && (
              <div className="mt-4 p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
                <h4 className="text-xs text-primary uppercase font-bold tracking-wider mb-3 flex items-center">
                  한글 프롬프트
                </h4>
                <div className="text-sm text-slate-200 font-sans whitespace-pre-wrap break-words leading-relaxed">
                  {koreanPrompt}
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
