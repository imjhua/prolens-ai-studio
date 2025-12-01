
import { LightingOption, CameraOption, ColorOption } from './types';
import type { Example } from './types';


// General Lighting Option
const GENERAL_LIGHTING_OPTIONS: LightingOption[] = [
  {
    id: 'random',
    label: '랜덤 (Random)',
    value: 'Random',
    description: 'AI가 영상의 분위기와 목적에 맞는 조명을 자동으로 선택합니다. 다양한 연출을 시도하거나 특별한 조명 효과가 필요할 때 활용하세요.',
    examples: [
      { label: '창의적인 아이디어가 필요할 때' },
      { label: '예상치 못한 조명 효과를 원할 때' }
    ]
  },
];

// Natural Lighting Options
export const NATURAL_LIGHTING_OPTIONS: LightingOption[] = [
  {
    id: 'morning',
    label: '아침 (Morning)',
    value: 'Morning',
    category: 'Natural',
    description: '따뜻하고 부드러운 아침 햇살이 공간을 감싸는 느낌. 상쾌하고 희망적인 분위기의 영상에 적합합니다.',
    previewUrl: '/images/lighting/natural/morning.png',
    examples: [
      { label: '아침 드라마' },
      { label: '건강 식품 광고' },
      { label: '희망적인 시작 장면' }
    ]
  },
  {
    id: 'noon',
    label: '정오 (Noon)',
    value: 'Noon',
    category: 'Natural',
    description: '정오의 강렬한 태양빛이 선명한 그림자와 높은 대비를 만들어내는 조명. 사실적이고 생동감 있는 장면에 적합합니다.',
    previewUrl: '/images/lighting/natural/noon.png',
    examples: [
      { label: '여행 사진' },
      { label: '야외 활동' },
      { label: '건축물 촬영' }
    ]
  },
  {
    id: 'sunset',
    label: '석양 (Sunset)',
    value: 'Sunset',
    category: 'Natural',
    description: '붉은빛과 오렌지빛이 어우러진 낭만적인 석양 조명. 감성적이고 드라마틱한 영상 연출에 활용됩니다.',
    previewUrl: '/images/lighting/natural/sunset.png'
    ,examples: [
      { label: '로맨틱 영화 포스터' },
      { label: '감성 룩북' },
      { label: '여행 브이로그' }
    ]
  },
  {
    id: 'silhouette',
    label: '실루엣 (Silhouette)',
    value: 'Silhouette',
    category: 'Natural',
    description: '밝은 배경과 어두운 피사체의 윤곽이 강조되는 조명. 신비롭고 극적인 장면이나 인상적인 오프닝에 적합합니다.',
    previewUrl: '/images/lighting/natural/silhouette.png'
    ,examples: [
      { label: '앨범 커버' },
      { label: '미스터리 스릴러' },
      { label: '예술 사진' }
    ]
  },
  {
    id: 'night',
    label: '밤 (Night)',
    value: 'Night',
    category: 'Natural',
    description: '달빛 또는 인공광에 의존하는 어두운 밤 조명. 고요함, 신비로움, 혹은 미스터리한 분위기의 영상에 어울립니다.',
    previewUrl: '/images/lighting/natural/night.png'
    ,examples: [
      { label: '공포 영화' },
      { label: '느와르' },
      { label: '감성적인 야경 사진' }
    ]
  },
  {
    id: 'moonlight',
    label: '달빛 (Moonlight)',
    value: 'Moonlight',
    category: 'Natural',
    description: '맑은 밤하늘의 은은한 달빛이 공간을 감싸는 조명. 몽환적이고 서정적인 영상미를 연출할 때 사용합니다.',
    previewUrl: '/images/lighting/natural/moonlight.png'
    ,examples: [
      { label: '동화' },
      { label: '로맨틱 영화' },
      { label: '밤의 정원' }
    ]
  },
  {
    id: 'cloudy',
    label: '흐린날 (Cloudy)',
    value: 'Cloudy',
    category: 'Natural',
    description: '구름에 의해 부드럽게 확산된 자연광. 그림자가 약하고 차분한 분위기의 영상에 적합합니다.',
    previewUrl: '/images/lighting/natural/cloudy.png',
    examples: [
      { label: '인물 프로필' },
      { label: '차분한 분위기의 패션 화보' }
    ]
  },
  {
    id: 'rainy',
    label: '비오는날 (Rainy)',
    value: 'Rainy',
    category: 'Natural',
    description: '흐린 하늘과 젖은 지면의 반사가 어우러진 조명. 감성적이고 우울한 영상 분위기 연출에 활용됩니다.',
    previewUrl: '/images/lighting/natural/rainy.png'
    ,examples: [
      { label: '이별 노래 뮤직비디오' },
      { label: '범죄 영화' },
      { label: '감성 에세이 표지' }
    ]
  },
  {
    id: 'snowy',
    label: '눈오는날 (Snowy)',
    value: 'Snowy',
    category: 'Natural',
    description: '눈이 내리는 밝고 청명한 분위기의 조명. 겨울 특유의 몽환적이고 깨끗한 영상미에 적합합니다.',
    previewUrl: '/images/lighting/natural/snowy.png'
    ,examples: [
      { label: '겨울 광고' },
      { label: '로맨틱 영화' },
      { label: '감성적인 풍경 사진' }
    ]
  },
];

// Artificial Lighting Options
export const ARTIFICIAL_LIGHTING_OPTIONS: LightingOption[] = [
  {
    id: 'highkey',
    label: '하이키 (High Key)',
    value: 'High Key',
    category: 'Artificial',
    description: '밝고 부드러운 조명으로 그림자를 최소화해 쾌활하고 긍정적인 분위기를 연출합니다. 밝은 광고, 인물, 패션 영상에 적합합니다.',
    previewUrl: '/images/lighting/artificial/highkey.png',
    examples: [
      { label: '밝은 화장품 광고' },
      { label: '패션 화보' },
      { label: '쾌활한 가족 영상' }
    ]
  },
  {
    id: 'lowkey',
    label: '로우키 (Low Key)',
    value: 'Low Key',
    category: 'Artificial',
    description: '어두운 조명과 강한 대비로 미스터리하고 진지한 분위기를 강조합니다. 드라마, 스릴러, 예술 영상에 활용됩니다.',
    previewUrl: '/images/lighting/artificial/lowkey.png',
    examples: [
      { label: '느와르 영화' },
      { label: '스릴러 예고편' },
      { label: '예술 사진' }
    ]
  },
  {
    id: 'hard',
    label: '하드 (Hard Light)',
    value: 'Hard Light',
    category: 'Artificial',
    description: '경계가 뚜렷한 강한 조명으로 강렬하고 드라마틱한 인상을 줍니다. 카리스마, 액션, 스포츠 영상에 적합합니다.',
    previewUrl: '/images/lighting/artificial/hard.png',
    examples: [
      { label: '액션 영화 포스터' },
      { label: '스포츠 광고' },
      { label: '강렬한 인물 사진' }
    ]
  },
  {
    id: 'soft',
    label: '소프트 (Soft Light)',
    value: 'Soft Light',
    category: 'Artificial',
    description: '경계가 흐릿하고 부드러운 조명으로 인물의 피부와 표정을 자연스럽고 화사하게 표현합니다. 뷰티, 웨딩, 가족 영상에 활용됩니다.',
    previewUrl: '/images/lighting/artificial/soft.png',
    examples: [
      { label: '웨딩 사진' },
      { label: '뷰티 유튜브 영상' },
      { label: '가족 사진' }
    ]
  },
  {
    id: 'key',
    label: '키 라이트 (Key Light)',
    value: 'Key Light',
    category: 'Artificial',
    description: '피사체의 형태와 입체감을 결정하는 주조명. 인물, 제품 등 주요 피사체를 강조하는 영상에 필수적입니다.',
    previewUrl: '/images/lighting/artificial/key.png',
    examples: [
      { label: '제품 광고' },
      { label: '인물 인터뷰' },
      { label: '유튜브 토크쇼' }
    ]
  },
  {
    id: 'fill',
    label: '필 라이트 (Fill Light)',
    value: 'Fill Light',
    category: 'Artificial',
    description: '그림자 부분을 밝혀주어 전체적인 밝기와 디테일을 조절하는 보조 조명. 자연스러운 영상미와 디테일 강조에 적합합니다.',
    previewUrl: '/images/lighting/artificial/fill.png',
    examples: [
      { label: '인물 사진' },
      { label: '제품 촬영' },
      { label: '실내 인터뷰' }
    ]
  },
  {
    id: 'back',
    label: '백 라이트 (Back Light)',
    value: 'Back Light',
    category: 'Artificial',
    description: '피사체 뒤에서 비추는 조명으로 인물이나 사물을 배경과 분리하고 윤곽을 강조합니다. 입체감과 공간감을 더하는 영상에 활용됩니다.',
    previewUrl: '/images/lighting/artificial/back.png',
    examples: [
      { label: '뮤직비디오' },
      { label: '무대 공연' },
      { label: '입체감 강조 영상' }
    ]
  },
  {
    id: 'rim',
    label: '림 라이트 (Rim Light)',
    value: 'Rim Light',
    category: 'Artificial',
    description: '피사체의 가장자리를 밝게 비추어 실루엣과 입체감을 강조하는 조명. 역동적이고 세련된 영상 연출에 적합합니다.',
    previewUrl: '/images/lighting/artificial/rim.png',
    examples: [
      { label: '패션 영상' },
      { label: '스포츠 광고' },
      { label: '실루엣 강조 영상' }
    ]
  },
  {
    id: 'top',
    label: '탑 라이트 (Top Light)',
    value: 'Top Light',
    category: 'Artificial',
    description: '머리 위에서 수직으로 비추는 조명으로 신비롭거나 위압적인 분위기, 고립감을 연출할 때 사용합니다.',
    previewUrl: '/images/lighting/artificial/top.png',
    examples: [
      { label: '공포 영화' },
      { label: '고립감 연출' },
      { label: '신비로운 장면' }
    ]
  },
  {
    id: 'color',
    label: '컬러 라이팅 (Color)',
    value: 'Color Lighting',
    category: 'Artificial',
    description: '다양한 색상의 조명으로 독특하고 예술적인 분위기를 연출합니다. 뮤직비디오, 예술 영상, 파티 신 등에 적합합니다.',
    previewUrl: '/images/lighting/artificial/color.png',
    examples: [
      { label: '뮤직비디오' },
      { label: '파티 신' },
      { label: '예술 단편' }
    ]
  },
  {
    id: 'ring',
    label: '링 라이팅 (Ring)',
    value: 'Ring Lighting',
    category: 'Artificial',
    description: '렌즈 주위를 감싸는 원형 조명으로 그림자 없이 인물의 얼굴을 밝게 비추고 눈동자에 캐치라이트를 더합니다. 뷰티, 메이크업 영상에 활용됩니다.',
    previewUrl: '/images/lighting/artificial/ring.png',
    examples: [
      { label: '메이크업 튜토리얼' },
      { label: '뷰티 유튜브' },
      { label: '셀카 촬영' }
    ]
  },
  {
    id: 'silhouette',
    label: '실루엣 (Silhouette)',
    value: 'Silhouette',
    category: 'Artificial',
    description: '강한 인공광을 배경에 비추어 피사체를 검은 윤곽으로 표현합니다. 인상적이고 극적인 오프닝, 댄스 영상에 적합합니다.',
    previewUrl: '/images/lighting/artificial/silhouette.png',
    examples: [
      { label: '댄스 영상' },
      { label: '뮤직비디오 오프닝' },
      { label: '극적인 광고' }
    ]
  },
  {
    id: 'flare',
    label: '렌즈 플레어 (Lens Flare)',
    value: 'Lens Flare',
    category: 'Artificial',
    description: '강한 빛이 렌즈에 들어와 생기는 번짐 효과로 몽환적이고 영화 같은 분위기를 연출합니다. 회상, 로맨스, 야외 영상에 활용됩니다.',
    previewUrl: '/images/lighting/artificial/flare.png',
    examples: [
      { label: '로맨스 영화' },
      { label: '회상 장면' },
      { label: '야외 촬영' }
    ]
  },
  {
    id: 'diffused',
    label: '디퓨즈드 (Diffused)',
    value: 'Diffused Lighting',
    category: 'Artificial',
    description: '부드럽고 고르게 퍼지는 빛으로 그림자를 최소화해 온화하고 편안한 분위기를 만듭니다. 인터뷰, 실내, 인테리어 영상에 적합합니다.',
    previewUrl: '/images/lighting/artificial/diffused.png',
    examples: [
      { label: '실내 인테리어 영상' },
      { label: '인터뷰 촬영' },
      { label: '편안한 분위기 연출' }
    ]
  },
];

// LIGHTING_OPTIONS를 카테고리별로 재구성
export const LIGHTING_OPTIONS: LightingOption[] = [
  // General 카테고리
  ...GENERAL_LIGHTING_OPTIONS,
  // Natural 카테고리 (id prefix 적용)
  ...NATURAL_LIGHTING_OPTIONS.map(opt => ({
    ...opt,
    id: `natural-${opt.id.replace(/^natural-/, '')}`,
    category: 'Natural',
    label: opt.label,
    value: opt.value,
    description: opt.description,
    previewUrl: opt.previewUrl
  })),
  // Artificial 카테고리 (id prefix 적용)
  ...ARTIFICIAL_LIGHTING_OPTIONS.map(opt => ({
    ...opt,
    id: `art-${opt.id.replace(/^art-/, '')}`,
    category: 'Artificial',
    label: opt.label,
    value: opt.value,
    description: opt.description,
    previewUrl: opt.previewUrl
  })),
];


const POV_ANGLE_OPTIONS: CameraOption[] = [
  {
    id: 'random',
    label: '랜덤 (Random)',
    value: 'Random',
    description: 'AI가 영상의 분위기와 목적에 맞는 카메라 앵글을 자동으로 선택합니다. 다양한 연출을 시도하거나 특별한 시점이 필요할 때 활용하세요.',
    examples: [
      { label: '다양한 연출 시도' },
      { label: '특별한 시점 필요 시' }
    ]
  },
  {
    id: 'fpv',
    label: '1인칭 시점 (FPV)',
    value: 'First Person View',
    category: 'POV',
    description: '인물의 눈 위치에서 촬영해 몰입감과 현장감을 극대화하는 시점. 체험형, 게임, 브이로그 영상에 적합합니다.',
    previewUrl: '/images/angle/fpv.png',
    examples: [
      { label: '게임 플레이 영상' },
      { label: '체험형 광고' },
      { label: '브이로그' }
    ]
  },
  {
    id: 'ots',
    label: '오버 더 숄더 (OTS)',
    value: 'Over The Shoulder',
    category: 'POV',
    description: '인물의 어깨 너머로 상대방을 바라보는 시점. 관계, 대화, 상호작용을 강조하는 영상에 활용됩니다.',
    previewUrl: '/images/angle/ots.png',
    examples: [
      { label: '영화 대화 장면' },
      { label: '상호작용 강조' },
      { label: '관계 중심 영상' }
    ]
  },
  {
    id: 'drone',
    label: '드론/항공 (Drone View)',
    value: 'Drone View',
    category: 'POV',
    description: '하늘에서 내려다보는 항공 시점으로 공간의 스케일과 역동성을 강조합니다. 여행, 행사, 액션 영상에 적합합니다.',
    previewUrl: '/images/angle/drone.png',
    examples: [
      { label: '여행 영상' },
      { label: '행사 스케일 강조' },
      { label: '액션 장면' }
    ]
  },
  {
    id: 'handheld',
    label: '핸드헬드 (Handheld)',
    value: 'Handheld',
    category: 'POV',
    description: '손으로 직접 들고 촬영한 듯한 자연스러운 흔들림이 특징. 리얼리티, 다큐, 현장감 있는 영상에 활용됩니다.',
    previewUrl: '/images/angle/handheld.png',
    examples: [
      { label: '현장감 있는 다큐' },
      { label: '리얼리티 프로그램' },
      { label: '현장 촬영' }
    ]
  },
];

const FRAMING_ANGLE_OPTIONS: CameraOption[] = [
  {
    id: 'extreme-long',
    label: '익스트림 롱샷 (Extreme Long Shot)',
    value: 'Extreme Long Shot',
    category: 'Framing',
    description: '매우 먼 거리에서 촬영해 배경과 공간의 스케일을 강조합니다. 오프닝, 대자연, 전경 영상에 적합합니다.',
    previewUrl: '/images/angle/extreme-long.png',
    examples: [
      { label: '영화 오프닝' },
      { label: '대자연 풍경' },
      { label: '전경 강조 영상' }
    ]
  },
  {
    id: 'full',
    label: '풀샷 (Full Shot)',
    value: 'Full Shot',
    category: 'Framing',
    description: '피사체의 전신이 프레임에 들어오도록 촬영해 동작과 배경을 함께 보여줍니다. 패션, 무용, 단체 영상에 활용됩니다.',
    previewUrl: '/images/angle/full.png',
    examples: [
      { label: '패션쇼 영상' },
      { label: '무용 공연' },
      { label: '단체 사진' }
    ]
  },
  {
    id: 'waist',
    label: '웨이스트샷 (Waist Shot)',
    value: 'Waist Shot',
    category: 'Framing',
    description: '허리 위부터 머리까지 프레임에 담아 상반신 동작과 표정을 강조합니다. 토크쇼, 일상 대화 영상에 적합합니다.',
    previewUrl: '/images/angle/waist.png',
    examples: [
      { label: '토크쇼' },
      { label: '일상 대화' },
      { label: '상반신 인터뷰' }
    ]
  },
  {
    id: 'bust',
    label: '바스트샷 (Bust Shot)',
    value: 'Bust Shot',
    category: 'Framing',
    description: '가슴 위부터 머리까지 프레임에 담아 감정과 표정을 집중적으로 보여줍니다. 인터뷰, 인물 중심 영상에 활용됩니다.',
    previewUrl: '/images/angle/bust.png',
    examples: [
      { label: '인물 인터뷰' },
      { label: '감정 연기' },
      { label: '프로필 영상' }
    ]
  },
  {
    id: 'closeup',
    label: '클로즈업 (Close-up)',
    value: 'Close-up',
    category: 'Framing',
    description: '피사체에 가까이 다가가 감정과 디테일을 강조하는 앵글. 감정 연기, 광고, 인물 영상에 적합합니다.',
    previewUrl: '/images/angle/closeup.png',
    examples: [
      { label: '감정 연기' },
      { label: '화장품 광고' },
      { label: '인물 집중 영상' }
    ]
  },
  {
    id: 'extreme-closeup',
    label: '익스트림 클로즈업 (Extreme Close-up)',
    value: 'Extreme Close-up',
    category: 'Framing',
    description: '눈, 입 등 극히 일부분을 극적으로 강조해 긴장감과 디테일을 극대화합니다. 감정, 서스펜스 영상에 활용됩니다.',
    previewUrl: '/images/angle/extreme-closeup.png',
    examples: [
      { label: '서스펜스 영화' },
      { label: '눈물 연기' },
      { label: '디테일 강조' }
    ]
  },
  {
    id: 'micro',
    label: '마이크로 (Micro Cinematography)',
    value: 'Micro Cinematography',
    category: 'Framing',
    description: '초접사로 미세한 질감과 패턴을 강조하는 앵글. 과학, 화장품, 자연 다큐 영상에 적합합니다.',
    previewUrl: '/images/angle/micro.png',
    examples: [
      { label: '자연 다큐멘터리' },
      { label: '화장품 광고' },
      { label: '과학 실험 영상' }
    ]
  },
];

const ANGLE_ANGLE_OPTIONS: CameraOption[] = [
  {
    id: 'high',
    label: '하이 앵글 (High Angle)',
    value: 'High Angle',
    category: 'Angle',
    description: '위에서 아래로 내려다보는 각도로 피사체의 약함, 귀여움, 위축된 느낌을 강조합니다. 동물, 아이, 공포 영상에 활용됩니다.',
    previewUrl: '/images/angle/high.png',
    examples: [
      { label: '동물 영상' },
      { label: '공포 영화' },
      { label: '아이 촬영' }
    ]
  },
  {
    id: 'low',
    label: '로우 앵글 (Low Angle)',
    value: 'Low Angle',
    category: 'Angle',
    description: '아래에서 위로 올려다보는 각도로 위엄, 힘, 영웅성을 강조합니다. 영웅, 건축물, 웅장한 영상에 적합합니다.',
    previewUrl: '/images/angle/low.png',
    examples: [
      { label: '영웅 영화' },
      { label: '건축물 촬영' },
      { label: '웅장한 장면' }
    ]
  },
  {
    id: 'overhead',
    label: '오버헤드 (Overhead)',
    value: 'Overhead',
    category: 'Angle',
    description: '수직으로 내려다보는 각도로 패턴, 배치, 공간 구성을 강조합니다. 음식, 도시, 테이블 영상에 활용됩니다.',
    previewUrl: '/images/angle/overhead.png',
    examples: [
      { label: '음식 촬영' },
      { label: '도시 항공샷' },
      { label: '테이블 연출' }
    ]
  },
  {
    id: 'dutch',
    label: '더치 앵글 (Dutch Angle)',
    value: 'Dutch Angle',
    category: 'Angle',
    description: '카메라를 기울여 불안, 혼란, 긴장감을 연출하는 앵글. 스릴러, 심리극, 액션 영상에 적합합니다.',
    previewUrl: '/images/angle/dutch.png',
    examples: [
      { label: '스릴러 영화' },
      { label: '심리극' },
      { label: '액션 장면' }
    ]
  },
];

const MOVEMENT_ANGLE_OPTIONS: CameraOption[] = [
  {
    id: 'pan',
    label: '팬샷 (Pan Shot)',
    value: 'Pan Shot',
    category: 'Movement',
    description: '카메라를 좌우로 회전시켜 공간감, 움직임, 장면 전환을 강조합니다. 스포츠, 풍경, 액션 영상에 활용됩니다.',
    previewUrl: '/images/angle/pan.png',
    examples: [
      { label: '스포츠 중계' },
      { label: '풍경 영상' },
      { label: '장면 전환' }
    ]
  },
  {
    id: 'tilt',
    label: '틸트 (Tilt Shot)',
    value: 'Tilt Shot',
    category: 'Movement',
    description: '카메라를 상하로 기울여 높이감, 위압감, 시선 이동을 표현합니다. 건물, 인물, 시점 전환 영상에 적합합니다.',
    previewUrl: '/images/angle/tilt.png',
    examples: [
      { label: '건물 촬영' },
      { label: '시선 이동 연출' },
      { label: '위압감 강조' }
    ]
  },
  {
    id: 'tracking',
    label: '트래킹 (Tracking Shot)',
    value: 'Tracking Shot',
    category: 'Movement',
    description: '카메라가 피사체를 따라 이동해 속도감과 역동성을 강조합니다. 경주, 추격, 액션 영상에 활용됩니다.',
    previewUrl: '/images/angle/tracking.png',
    examples: [
      { label: '추격 장면' },
      { label: '경주 영상' },
      { label: '액션 영화' }
    ]
  },
  {
    id: 'crane',
    label: '크레인샷 (Crane Shot)',
    value: 'Crane Shot',
    category: 'Movement',
    description: '크레인 등 장비로 카메라를 입체적으로 이동시켜 웅장함과 공간감, 극적인 전환을 연출합니다. 오프닝, 군중, 뮤직비디오에 적합합니다.',
    previewUrl: '/images/angle/crane.png',
    examples: [
      { label: '영화 오프닝' },
      { label: '군중 장면' },
      { label: '뮤직비디오' }
    ]
  },
  {
    id: 'snorricam',
    label: '스노리캠 (SnorriCam)',
    value: 'SnorriCam',
    category: 'Movement',
    description: '배우 몸에 카메라를 부착해 배경이 움직이는 독특한 시점. 심리적 불안, 몰입감을 주는 영상에 활용됩니다.',
    previewUrl: '/images/angle/snorricam.png',
    examples: [
      { label: '심리 스릴러' },
      { label: '몰입감 연출' },
      { label: '특이한 시점 영상' }
    ]
  },
  {
    id: 'camcorder',
    label: '캠코더 (Camcorder)',
    value: 'Camcorder',
    category: 'Movement',
    description: '90년대 홈비디오 특유의 질감과 레트로 감성을 연출합니다. 회상, 가족, 레트로 영상에 적합합니다.',
    previewUrl: '/images/angle/camcorder.png',
    examples: [
      { label: '가족 홈비디오' },
      { label: '회상 장면' },
      { label: '레트로 영상' }
    ]
  },
  {
    id: '50mm',
    label: '50mm 렌즈 (50mm Lens)',
    value: '50mm Lens',
    category: 'Movement',
    description: '사람 눈과 유사한 원근감과 왜곡 없는 시각을 제공하는 렌즈. 스냅, 인물, 여행 영상에 활용됩니다.',
    previewUrl: '/images/angle/50mm.png',
    examples: [
      { label: '여행 스냅' },
      { label: '인물 사진' },
      { label: '일상 영상' }
    ]
  },
  {
    id: 'wide',
    label: '와이드 (Wide Angle)',
    value: 'Wide Angle',
    category: 'Movement',
    description: '광각 렌즈로 넓은 공간감과 거리감을 강조합니다. 풍경, 실내, 군중 영상에 적합합니다.',
    previewUrl: '/images/angle/wide.png',
    examples: [
      { label: '풍경 사진' },
      { label: '실내 촬영' },
      { label: '군중 장면' }
    ]
  },
  {
    id: 'docu',
    label: '리얼 다큐 (Realistic Documentary)',
    value: 'Realistic Documentary',
    category: 'Movement',
    description: '관찰자 시점으로 사실적이고 자연스러운 연출을 강조합니다. 다큐멘터리, 뉴스, 사실주의 영상에 활용됩니다.',
    previewUrl: '/images/angle/docu.png',
    examples: [
      { label: '다큐멘터리' },
      { label: '뉴스 리포트' },
      { label: '사실주의 영상' }
    ]
  },
];

export const ANGLE_OPTIONS: CameraOption[] = [
  ...POV_ANGLE_OPTIONS,
  ...FRAMING_ANGLE_OPTIONS,
  ...ANGLE_ANGLE_OPTIONS,
  ...MOVEMENT_ANGLE_OPTIONS,
];

export const COLOR_OPTIONS: ColorOption[] = [
  { 
    id: 'random', 
    label: '랜덤 (Random)',
    value: 'Random',
    description: 'AI가 영상의 분위기와 목적에 맞는 색감을 자동으로 선택합니다. 다양한 색상 연출을 시도하거나 특별한 효과가 필요할 때 활용하세요.',
    examples: [
      { label: '다양한 색상 실험' },
      { label: '특별한 효과 필요 시' }
    ]
  },
  {
    id: 'none',
    label: '없음 (None)',
    value: 'None',
    description: '색상 보정이나 톤 조정 없이 원본 그대로의 색감을 사용합니다. 비교 영상이나 색상 효과가 필요 없는 장면에 적합합니다.',
    previewUrl: '/images/color/none.png',
    examples: [
      { label: '비교 영상' },
      { label: '색상 효과 미사용' }
    ]
  },
  { 
    id: 'natural', 
    label: '자연스러움 (Natural)',
    value: 'Natural',
    description: '눈에 보이는 그대로의 자연스러운 색감을 재현합니다. 사실적이고 편안한 영상미에 적합합니다.',
    previewUrl: '/images/color/natural.png',
    examples: [
      { label: '자연 풍경' },
      { label: '일상 영상' }
    ]
  },
  { 
    id: 'bw', 
    label: '흑백 (Black & White)',
    value: 'Black & White',
    description: '색을 배제하고 명암만으로 형태와 감정을 표현합니다. 예술, 느와르, 보도 영상에 활용됩니다.',
    previewUrl: '/images/color/bw.png',
    examples: [
      { label: '예술 사진' },
      { label: '느와르 영화' },
      { label: '보도 영상' }
    ]
  },
  { 
    id: 'cinematic', 
    label: '시네마틱 (Teal & Orange)',
    value: 'Teal & Orange',
    description: '틸(Teal)과 오렌지(Orange) 색상 대비로 영화 같은 깊이감과 분위기를 연출합니다. 시네마틱 영상에 적합합니다.',
    previewUrl: '/images/color/cinematic.png',
    examples: [
      { label: '영화 트레일러' },
      { label: '시네마틱 광고' }
    ]
  },
  { 
    id: 'cyberpunk', 
    label: '사이버펑크 (Neon)',
    value: 'Neon',
    description: '네온 핑크, 퍼플, 블루 등 강렬한 인공색으로 미래적이고 몽환적인 분위기를 연출합니다. SF, 게임, 클럽 영상에 적합합니다.',
    previewUrl: '/images/color/cyberpunk.png',
    examples: [
      { label: 'SF 영화' },
      { label: '게임 트레일러' },
      { label: '클럽 영상' }
    ]
  },
  { 
    id: 'pastel', 
    label: '파스텔 (Pastel)',
    value: 'Pastel',
    description: '채도가 낮고 밝은 부드러운 색조로 꿈같고 사랑스러운 분위기를 연출합니다. 동화, 뮤직비디오, 팬시 영상에 활용됩니다.',
    previewUrl: '/images/color/pastel.png',
    examples: [
      { label: '동화 영상' },
      { label: '뮤직비디오' },
      { label: '팬시 광고' }
    ]
  },
  { 
    id: 'vintage', 
    label: '빈티지 (Vintage)',
    value: 'Vintage',
    description: '빛바랜 색감과 노이즈로 오래된 사진이나 영화 같은 향수와 감성을 연출합니다. 레트로, 추억 영상에 적합합니다.',
    previewUrl: '/images/color/vintage.png',
    examples: [
      { label: '레트로 영상' },
      { label: '추억 회상' },
      { label: '빈티지 광고' }
    ]
  },
  { 
    id: 'muted', 
    label: '채도 낮음 (Muted)',
    value: 'Muted',
    description: '채도를 낮춰 차분하고 정적인 분위기를 연출합니다. 세련되고 우울한 감성, 미니멀리즘 영상에 활용됩니다.',
    previewUrl: '/images/color/muted.png',
    examples: [
      { label: '미니멀리즘 영상' },
      { label: '우울한 감성' },
      { label: '세련된 광고' }
    ]
  },
  { 
    id: 'vivid', 
    label: '선명함 (Vivid)',
    value: 'Vivid',
    description: '채도를 높여 색상이 뚜렷하고 생동감 넘치는 화면을 연출합니다. 스포츠, 음식, 축제 영상에 적합합니다.',
    previewUrl: '/images/color/vivid.png',
    examples: [
      { label: '스포츠 영상' },
      { label: '음식 광고' },
      { label: '축제 영상' }
    ]
  },
  { 
    id: 'sepia', 
    label: '세피아 (Sepia)',
    value: 'Sepia',
    description: '갈색 톤의 단색조로 고전적이고 회상 장면 같은 분위기를 연출합니다. 서부, 역사, 몽타주 영상에 활용됩니다.',
    previewUrl: '/images/color/sepia.png',
    examples: [
      { label: '서부 영화' },
      { label: '역사 다큐' },
      { label: '몽타주 영상' }
    ]
  },
  { 
    id: 'noir', 
    label: '누아르 (Film Noir)',
    value: 'Film Noir',
    description: '대비가 강한 흑백 또는 어두운 톤으로 범죄, 미스터리, 공포 영상의 음울한 분위기를 연출합니다.',
    previewUrl: '/images/color/noir.png',
    examples: [
      { label: '범죄 영화' },
      { label: '미스터리 영상' },
      { label: '공포 영화' }
    ]
  },
  { 
    id: 'warm', 
    label: '따뜻함 (Warm Tone)',
    value: 'Warm Tone',
    description: '붉은색, 주황색, 노란색 계열로 따뜻하고 포근하며 친근한 분위기를 연출합니다. 가족, 베이커리, 가을 영상에 적합합니다.',
    previewUrl: '/images/color/warm.png',
    examples: [
      { label: '가족 영상' },
      { label: '베이커리 광고' },
      { label: '가을 풍경' }
    ]
  },
  { 
    id: 'cool', 
    label: '차가움 (Cool Tone)',
    value: 'Cool Tone',
    description: '푸른색, 청록색 계열로 차갑고 이성적이며 고독한 분위기를 연출합니다. 병원, IT, 겨울 영상에 활용됩니다.',
    previewUrl: '/images/color/cool.png',
    examples: [
      { label: '병원 영상' },
      { label: 'IT 광고' },
      { label: '겨울 풍경' }
    ]
  },
];
