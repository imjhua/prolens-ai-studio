
import React, { useEffect, useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import OptionSelector from './components/OptionSelector';
import { LIGHTING_OPTIONS, ANGLE_OPTIONS, COLOR_OPTIONS, SCENE_OPTIONS, SPECIAL_EFFECTS_OPTIONS, ASPECT_RATIO_OPTIONS } from './constants';

import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  // Default to 'random' as requested
  // const [selectedLighting, setSelectedLighting] = useState<string>('random');
  // const [selectedPov, setSelectedPov] = useState<string>('random');
  // const [selectedColor, setSelectedColor] = useState<string>('random');
  // const [additionalDetails, setAdditionalDetails] = useState<string>('');

  // 장면 설정
  const [selectedScene, setSelectedScene] = useState<string>('random');
  const [customScene, setCustomScene] = useState<string>('random');

  const [selectedLighting, setSelectedLighting] = useState<string>('random');
  const [selectedPov, setSelectedPov] = useState<string>('random');
  const [selectedColor, setSelectedColor] = useState<string>('random');
  const [selectedEffect, setSelectedEffect] = useState<string>('random');
  const [additionalDetails, setAdditionalDetails] = useState<string>('물방울');

  // 특수효과
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [koreanPrompt, setKoreanPrompt] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 비율(Aspect Ratio) 상태
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('random');

  // Track the resolved options used for the last generation to display them
  const [usedOptions, setUsedOptions] = useState<{
    lighting: string,
    pov: string,
    color: string,
    details: string,
    scene: string,
    effect: string,
    aspectRatio: string
  } | null>(null);



  // 옵션/상세정보 변경 시마다 usedOptions 동기화 (ko 제거)
  useEffect(() => {
    setUsedOptions({
      lighting: selectedLighting,
      pov: selectedPov,
      color: selectedColor,
      details: additionalDetails,
      scene: selectedScene === 'random' ? selectedScene : customScene,
      effect: selectedEffect,
      aspectRatio: selectedAspectRatio,
    });
  }, [selectedLighting, selectedPov, selectedColor, additionalDetails, selectedScene, customScene, selectedEffect, selectedAspectRatio]);
 

  const resultRef = useRef<HTMLDivElement>(null);


  // --- 옵션별 분리 함수 (ko 제거) ---
  const resolveLighting = () => {
    let option = LIGHTING_OPTIONS.find(o => o.id === selectedLighting);
    if (selectedLighting === 'random') {
      const candidates = LIGHTING_OPTIONS.filter(o => o.id !== 'random');
      option = candidates[Math.floor(Math.random() * candidates.length)];
    }
    let en = 'Not Specified';
    if (option) {
      en = option.value;
      if (option.category === 'Natural' || option.category === 'Artificial') {
        en = `${option.category} Light - ${en}`;
      }
    }
    return { en };
  };

  const resolvePov = () => {
    let povId = selectedPov;
    let povEn = selectedPov;
    if (povId === 'random') {
      const candidates = ANGLE_OPTIONS.filter(o => o.id !== 'random');
      const randomOption = candidates[Math.floor(Math.random() * candidates.length)];
      povId = randomOption.id;
      povEn = randomOption.value;
    } else {
      const opt = ANGLE_OPTIONS.find(o => o.id === povId);
      if (opt) {
        povEn = opt.value;
      }
    }
    return { en: povEn };
  };

  const resolveColor = () => {
    let option = COLOR_OPTIONS.find(o => o.id === selectedColor);
    if (selectedColor === 'random') {
      const candidates = COLOR_OPTIONS.filter(o => o.id !== 'random');
      option = candidates[Math.floor(Math.random() * candidates.length)];
    }
    return {
      en: option ? option.value : selectedColor
    };
  };

  const resolveEffect = () => {
    if (selectedEffect === 'random') {
      const candidates = SPECIAL_EFFECTS_OPTIONS.filter(o => o.id !== 'random');
      const randomOption = candidates[Math.floor(Math.random() * candidates.length)];
      return randomOption.value;
    }
    const effectOption = SPECIAL_EFFECTS_OPTIONS.find(o => o.id === selectedEffect);
    return effectOption ? effectOption.value : selectedEffect;
  };

  const checkValidation = () => {
    const sceneValue = selectedScene === 'custom' ? customScene.trim() : '';
    if (selectedScene === 'custom' && !sceneValue) {
      setError("장면을 입력해주세요. (예: 황량한 사막, 뜨거운 태양 아래 먼지가 날리는 장면)");
      return false;
    }
    if (!additionalDetails.trim()) {
      setError("추가 세부 정보를 입력해주세요. (예: 숲속의 사슴, 미래 도시의 자동차)");
      return false;
    }
    return true;
  };

  const resetStates = () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    setGeneratedPrompt(null);
    setKoreanPrompt(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!checkValidation()) return;
    resetStates();

    const sceneValue = selectedScene === 'random' ? selectedScene : customScene;
    const lighting = resolveLighting();
    const pov = resolvePov();
    const color = resolveColor();
    const effectValue = resolveEffect();

    try {
      const { imageUrl, fullPrompt, koreanPrompt } = await generateImage(
        lighting.en,
        pov.en,
        color.en,
        additionalDetails,
        sceneValue,
        effectValue,
        selectedAspectRatio
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
  }, [selectedLighting, selectedPov, selectedColor, additionalDetails, selectedScene, customScene, selectedEffect]);

  return (
    <div className="min-h-screen w-full bg-darker text-slate-200 selection:bg-primary selection:text-white p-2 md:p-12 overflow-x-hidden">
      <div className="w-full max-w-none px-0 py-8 box-border">
        <Header />


        <div className="w-full">

          {/* Left Column: Controls */}
          <div className="space-y-2">

            <div className="bg-dark/50 p-6 rounded-2xl border border-slate-800/60 shadow-xl backdrop-blur-sm">
              <OptionSelector
                title="장면 설정 (Scene)"
                options={SCENE_OPTIONS}
                selectedId={selectedScene}
                onSelect={setSelectedScene}
                extraElement={
                  <input
                    className="flex-1 p-2 rounded border border-slate-700 bg-card text-slate-200 disabled:bg-slate-800/50 disabled:text-slate-500 w-full"
                    type="text"
                    placeholder="황량한 사막, 뜨거운 태양 아래 먼지가 날리는 장면"
                    value={selectedScene === 'random' ? '-' : customScene === 'random' ? '' : customScene}
                    onChange={e => setCustomScene(e.target.value === '-' ? 'random' : e.target.value)}
                    disabled={selectedScene !== 'custom'}
                  />
                }
              />
              <OptionSelector
                title="조명 (Lighting) - 영상의 분위기와 감정, 시간대, 공간감 설정"
                options={LIGHTING_OPTIONS}
                selectedId={selectedLighting}
                onSelect={setSelectedLighting}
              />

              <OptionSelector
                title="카메라 앵글 (Camera Angle) - 시각적 스토리텔링과 몰입, 인물·공간의 관계 표현"
                options={ANGLE_OPTIONS}
                selectedId={selectedPov}
                onSelect={setSelectedPov}
              />

              <OptionSelector
                title="색상 (Color Grading)"
                options={COLOR_OPTIONS}
                selectedId={selectedColor}
                onSelect={setSelectedColor}
              />


              <OptionSelector
                title="특수효과 (Special Effects)"
                options={SPECIAL_EFFECTS_OPTIONS}
                selectedId={selectedEffect}
                onSelect={setSelectedEffect}
              />

              <OptionSelector
                title="비율 (Aspect Ratio)"
                options={ASPECT_RATIO_OPTIONS}
                selectedId={selectedAspectRatio}
                onSelect={setSelectedAspectRatio}
              />

              <div className="mb-1">
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-secondary rounded-full mr-2"></span>
                  추가 세부 정보 (Prompt Details)
                </h3>
                <textarea
                  className="w-full h-32 bg-card border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none transition-all"
                  placeholder="추가 설명을 입력하세요. (예: 고풍스러운 책상 / 오래된 책 또는 주인공이 고풍스러운 책상을 앞에 두고, 손에는 오래된 책을 쥐고 있다.)"
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
                    장면: {usedOptions ? usedOptions.scene : ''}
                  </span>
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
                    특수효과: {usedOptions ? usedOptions.effect : ''}
                  </span>
                  <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
                    비율: {usedOptions ? (ASPECT_RATIO_OPTIONS.find(opt => opt.id === usedOptions.aspectRatio)?.value || '') : ''}
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
