
import { LightingOption, CameraOption, ColorOption } from './types';


// General Lighting Option
const GENERAL_LIGHTING_OPTIONS: LightingOption[] = [
  {
    id: 'random',
    label: '랜덤 (Random)',
    value: 'Random',
    description: 'AI가 가장 적절하거나 창의적인 조명을 무작위로 선택합니다. (활용: 창의적인 아이디어가 필요할 때)',
    previewUrl: '/images/lighting/general/random.png'
  },
];

// Natural Lighting Options
export const NATURAL_LIGHTING_OPTIONS: LightingOption[] = [
  {
    id: 'morning',
    label: '아침 (Morning)',
    value: 'Morning',
    category: 'Natural',
    description: '부드럽고 따뜻한 황금빛이 감도는 아침 햇살. 희망차고 상쾌한 분위기 연출. (활용: 아침 드라마, 건강 식품 광고, 희망적인 시작)',
    previewUrl: '/images/lighting/natural/morning.png'
  },
  {
    id: 'noon',
    label: '정오 (Noon)',
    value: 'Noon',
    category: 'Natural',
    description: '머리 위에서 내리쬐는 강렬하고 대비가 뚜렷한 직사광선. 생생하고 사실적인 느낌. (활용: 여행 사진, 야외 활동, 건축물 촬영)',
    previewUrl: '/images/lighting/natural/noon.png'
  },
  {
    id: 'sunset',
    label: '석양 (Sunset)',
    value: 'Sunset',
    category: 'Natural',
    description: '붉고 오렌지빛으로 물드는 낭만적인 골든 아워. 감성적이고 드라마틱한 분위기. (활용: 로맨틱 영화 포스터, 감성 룩북, 여행 브이로그)',
    previewUrl: '/images/lighting/natural/sunset.png'
  },
  {
    id: 'silhouette',
    label: '실루엣 (Silhouette)',
    value: 'Silhouette',
    category: 'Natural',
    description: '피사체를 어둡게 처리하고 배경을 밝게 하여 윤곽선을 강조. 신비롭고 극적인 효과. (활용: 앨범 커버, 미스터리 스릴러, 예술 사진)',
    previewUrl: '/images/lighting/natural/silhouette.png'
  },
  {
    id: 'night',
    label: '밤 (Night)',
    value: 'Night',
    category: 'Natural',
    description: '달빛이나 가로등에 의존하는 어두운 조명. 차분하고 고요하거나 미스터리한 분위기. (활용: 공포 영화, 느와르, 감성적인 야경 사진)',
    previewUrl: '/images/lighting/natural/night.png'
  },
  {
    id: 'moonlight',
    label: '달빛 (Moonlight)',
    value: 'Moonlight',
    category: 'Natural',
    description: '맑은 밤하늘에서 달빛이 은은하게 비추는 조명. 신비롭고 몽환적이며 서정적인 분위기. (활용: 동화, 로맨틱 영화, 밤의 정원, 감성적인 장면)',
    previewUrl: '/images/lighting/natural/moonlight.png'
  },
  {
    id: 'cloudy',
    label: '흐린날 (Cloudy)',
    value: 'Cloudy',
    category: 'Natural',
    description: '구름에 분산되어 그림자가 부드러운 확산광. 차분하고 우울하거나 부드러운 느낌. (활용: 인물 프로필, 차분한 분위기의 패션 화보)',
    previewUrl: '/images/lighting/natural/cloudy.png',
  },
  {
    id: 'rainy',
    label: '비오는날 (Rainy)',
    value: 'Rainy',
    category: 'Natural',
    description: '젖은 지면의 반사와 흐린 하늘의 조명. 우울하고 감성적인 느와르 분위기. (활용: 이별 노래 뮤직비디오, 범죄 영화, 감성 에세이 표지)',
    previewUrl: '/images/lighting/natural/rainy.png'
  },
  {
    id: 'snowy',
    label: '눈오는날 (Snowy)',
    value: 'Snowy',
    category: 'Natural',
    description: '하얗게 내리는 눈과 밝은 반사광이 만들어내는 청명하고 몽환적인 분위기. (활용: 겨울 광고, 로맨틱 영화, 감성적인 풍경 사진)',
    previewUrl: '/images/lighting/natural/snowy.png'
  },
];

// Artificial Lighting Options
export const ARTIFICIAL_LIGHTING_OPTIONS: LightingOption[] = [
  {
    id: 'highkey',
    label: '하이키 (High Key)',
    value: 'High Key',
    category: 'Artificial',
    description: '전체적으로 밝고 부드러운 조명을 사용하여 그림자를 최소화하는 스타일. 쾌활하고 긍정적인 분위기. (활용: 화장품 광고, 아기 사진, 웨딩 촬영)',
    previewUrl: '/images/lighting/artificial/highkey.png'
  },
  {
    id: 'lowkey',
    label: '로우키 (Low Key)',
    value: 'Low Key',
    category: 'Artificial',
    description: '어두운 톤을 주조로 하여 대비를 강조하고 그림자를 많이 사용하는 스타일. 진지하고 미스터리한 분위기. (활용: 연극, 공연, 범죄 스릴러)',
    previewUrl: '/images/lighting/artificial/lowkey.png'
  },
  {
    id: 'hard',
    label: '하드 (Hard Light)',
    value: 'Hard Light',
    category: 'Artificial',
    description: '그림자가 뚜렷하고 경계가 선명한 강한 조명. 강렬하고 드라마틱한 인상을 줌. (활용: 스포츠 사진, 강한 카리스마가 필요한 인물 사진)',
    previewUrl: '/images/lighting/artificial/hard.png'
  },
  {
    id: 'soft',
    label: '소프트 (Soft Light)',
    value: 'Soft Light',
    category: 'Artificial',
    description: '그림자의 경계가 흐릿하고 부드러운 조명. 인물을 화사하고 자연스럽게 표현. (활용: 뷰티 유튜버 썸네일, 웨딩 스냅, 가족 사진)',
    previewUrl: '/images/lighting/artificial/soft.png'
  },
  {
    id: 'key',
    label: '키 라이트 (Key Light)',
    value: 'Key Light',
    category: 'Artificial',
    description: '피사체의 형태와 입체감을 결정하는 가장 주된 광원. (활용: 모든 스튜디오 촬영의 기본 조명 설정)',
    previewUrl: '/images/lighting/artificial/key.png'
  },
  {
    id: 'fill',
    label: '필 라이트 (Fill Light)',
    value: 'Fill Light',
    category: 'Artificial',
    description: '그림자 부분을 밝혀 대비를 줄여주는 보조 조명. 디테일을 살리는 데 사용. (활용: 제품의 디테일을 명확히 보여줘야 하는 쇼핑몰 촬영)',
    previewUrl: '/images/lighting/artificial/fill.png'
  },
  {
    id: 'back',
    label: '백 라이트 (Back Light)',
    value: 'Back Light',
    category: 'Artificial',
    description: '피사체 뒤에서 비추는 조명. 배경과 분리하고 윤곽을 강조(헤어 라이트). (활용: 인물과 배경을 분리할 때, 헤어 제품 광고)',
    previewUrl: '/images/lighting/artificial/back.png'
  },
  {
    id: 'rim',
    label: '림 라이트 (Rim Light)',
    value: 'Rim Light',
    category: 'Artificial',
    description: '피사체의 가장자리를 밝게 빛나게 하여 입체감을 주는 조명. 실루엣 강조. (활용: 스포츠 프로필, 자동차 광고, 피사체 라인 강조)',
    previewUrl: '/images/lighting/artificial/rim.png'
  },
  {
    id: 'top',
    label: '탑 라이트 (Top Light)',
    value: 'Top Light',
    category: 'Artificial',
    description: '머리 바로 위에서 비추는 조명. 신비롭거나 위압적인 느낌, 또는 고립된 느낌. (활용: 심문 장면, 공포 영화, 신적인 존재 표현)',
    previewUrl: '/images/lighting/artificial/top.png'
  },
  {
    id: 'color',
    label: '컬러 라이팅 (Color)',
    value: 'Color Lighting',
    category: 'Artificial',
    description: '다채로운 색상의 빛을 투사하여 예술적이고 창의적인 분위기를 연출. (활용: 뮤직비디오, 사이버펑크 스타일, 예술 화보)',
    previewUrl: '/images/lighting/artificial/color.png'
  },
  {
    id: 'ring',
    label: '링 라이팅 (Ring)',
    value: 'Ring Lighting',
    category: 'Artificial',
    description: '렌즈 주위를 감싸는 원형 조명. 눈동자에 캐치라이트를 만들고 그림자 없는 뷰티 촬영에 적합. (활용: 메이크업 튜토리얼, 눈동자 강조 근접 촬영)',
    previewUrl: '/images/lighting/artificial/ring.png'
  },
  {
    id: 'silhouette',
    label: '실루엣 (Silhouette)',
    value: 'Silhouette',
    category: 'Artificial',
    description: '인공광을 배경에 비추어 피사체를 검은 윤곽으로 표현. (활용: 댄스 영상, 실루엣 애니메이션, 오프닝 시퀀스)',
    previewUrl: '/images/lighting/artificial/silhouette.png'
  },
  {
    id: 'flare',
    label: '렌즈 플레어 (Lens Flare)',
    value: 'Lens Flare',
    category: 'Artificial',
    description: '렌즈에 강한 빛이 들어와 생기는 빛 번짐 효과. 몽환적이고 영화 같은 느낌. (활용: 로맨틱 드라마, 회상 장면, 야외 인물 촬영)',
    previewUrl: '/images/lighting/artificial/flare.png'
  },
  {
    id: 'diffused',
    label: '디퓨즈드 (Diffused)',
    value: 'Diffused Lighting',
    category: 'Artificial',
    description: '부드럽고 고르게 퍼지는 빛을 제공하여, 그림자를 최소화하는 조명. 온화하고 편안한 느낌. (활용: 인터뷰 영상, 실내 인테리어 촬영)',
    previewUrl: '/images/lighting/artificial/diffused.png'
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

export const ANGLE_OPTIONS: CameraOption[] = [
  { 
    id: 'random', 
    label: '랜덤 (Random)',
    value: 'Random',
    description: 'AI가 상황에 맞는 가장 드라마틱한 앵글을 선택합니다. (활용: 의외의 결과를 얻고 싶을 때)',
    previewUrl: '/images/angle/random.png'
  },
  {
    id: 'fpv',
    label: 'FPV (First Person View)',
    value: 'FPV',
    description: '1인칭 전방카메라를 도입해 시각 정보 처리. 캐릭터의 눈을 통해 세상을 바라봄. 강한 몰입감과 주관적인 경험. (활용: FPS 게임, 체험형 콘텐츠, 브이로그)',
    previewUrl: '/images/angle/fpv.png'
  },
  {
    id: 'drone',
    label: '드론 (Drone View)',
    value: 'Drone View',
    description: '하늘을 나는 드론에서 내려다보는 시점. 광활한 풍경이나 역동적인 항공 샷. (활용: 여행 홍보 영상, 대규모 행사 전경, 추격전)',
    previewUrl: '/images/angle/drone.png'
  },
  { 
    id: 'low', 
    label: '로우 앵글 (Low Angle)',
    value: 'Low Angle',
    description: '피사체를 아래에서 위로 올려다보는 각도. 피사체를 웅장하고 위압적으로 보이게 함. (활용: 영웅 캐릭터, 거대한 건축물, 권위적인 인물 묘사)',
    previewUrl: '/images/angle/low.png'
  },
  { 
    id: 'high', 
    label: '하이 앵글 (High Angle)',
    value: 'High Angle',
    description: '피사체를 위에서 아래로 내려다보는 각도. 피사체를 작고 약해 보이게 하거나 귀여움을 강조. (활용: 반려동물 사진, 아이들 촬영, 공포 영화의 피해자 시점)',
    previewUrl: '/images/angle/high.png'
  },
  { 
    id: 'overhead', 
    label: '오버헤드 (Overhead)',
    value: 'Overhead',
    description: '머리 바로 위 수직에서 내려다보는 갓 뷰(God\'s view). 전체적인 배치나 패턴 강조. (활용: 음식 항공샷, 도시 계획 조감도, 테이블 세팅)',
    previewUrl: '/images/angle/overhead.png'
  },
  { 
    id: 'handheld', 
    label: '핸드헬드 (Hand Held)',
    value: 'Hand Held',
    description: '손으로 카메라를 들고 찍은 듯한 흔들림. 현장감, 생동감 있고 현실에서 바라보는 느낌. (활용: 재난 영화, 전쟁 다큐멘터리, 뉴스 현장)',
    previewUrl: '/images/angle/handheld.png'
  },
  { 
    id: 'wide', 
    label: '와이드 (Wide)',
    value: 'Wide Angle',
    description: '넓은 화각으로 배경과 피사체를 함께 담음. 공간감을 강조. (활용: 풍경 사진, 부동산 내부 촬영, 대규모 군중 씬)',
    previewUrl: '/images/angle/wide.png'
  },
  { 
    id: 'closeup', 
    label: '클로즈업 (Close-up)',
    value: 'Close-up',
    description: '피사체에 가깝게 다가가 세부 묘사에 집중. 감정 표현이나 디테일 강조. (활용: 감정 연기 포착, 보석 광고, 곤충 접사)',
    previewUrl: '/images/angle/closeup.png'
  },
  { 
    id: 'micro', 
    label: '마이크로 시네마그래피',
    value: 'Micro Cinematography',
    description: '초근접 촬영. 눈으로 보기 힘든 미세한 질감과 패턴을 거대하게 표현. (활용: 과학 다큐멘터리, 화장품 제형 강조, 자연의 미세 패턴)',
    previewUrl: '/images/angle/micro.png'
  },
  { 
    id: 'ots', 
    label: '오버 더 숄더 (OTS)',
    value: 'Over The Shoulder',
    description: '어깨 너머로 상대방을 바라보는 앵글. 대화 장면에서 관계성을 보여줌. (활용: 영화 대화 장면, 인터뷰, 드라마틱한 대치 상황)',
    previewUrl: '/images/angle/ots.png'
  },
  { 
    id: 'tracking', 
    label: '트래킹 (Tracking)',
    value: 'Tracking Shot',
    description: '움직이는 피사체를 따라가며 촬영. 속도감과 이동의 흐름을 표현. (활용: 자동차 경주, 마라톤 중계, 액션 추격신)',
    previewUrl: '/images/angle/tracking.png'
  },
  { 
    id: '50mm', 
    label: '50mm 렌즈',
    value: '50mm Lens',
    description: '사람의 눈과 가장 유사한 원근감. 왜곡 없이 자연스럽고 편안한 시각. (활용: 일상 스냅, 인물 포트레이트, 여행 기록)',
    previewUrl: '/images/angle/50mm.png'
  },
  { 
    id: 'snorricam', 
    label: '스노리캠 (SnorriCam)',
    value: 'SnorriCam',
    description: '배우의 몸에 카메라를 부착하여 배우는 고정되고 배경이 움직이는 기법. 심리적 불안감 표현. (활용: 술 취한 장면, 심리적 공황 상태 묘사, 뮤직비디오)',
    previewUrl: '/images/angle/snorricam.png'
  },
  { 
    id: 'docu', 
    label: '리얼리스틱 다큐멘터리',
    value: 'Realistic Documentary',
    description: '꾸미지 않은 사실적인 시선. 있는 그대로의 현실을 관찰하는 느낌. (활용: 휴먼 다큐, 뉴스 보도 영상, 사실주의 영화)',
    previewUrl: '/images/angle/docu.png'
  },
  { 
    id: 'camcorder', 
    label: '캠코더 (Camcorder)',
    value: 'Camcorder',
    description: '90년대 홈비디오 캠코더로 찍은 듯한 레트로하고 거친 질감. 추억 회상 느낌. (활용: 90년대 회상 씬, 홈비디오 컨셉 뮤비, 레트로 광고)',
    previewUrl: '/images/angle/camcorder.png'
  },
];

export const COLOR_OPTIONS: ColorOption[] = [
  { 
    id: 'random', 
    label: '랜덤 (Random)',
    value: 'Random',
    description: 'AI가 분위기에 맞는 색감을 자유롭게 선택합니다. (활용: 예상치 못한 예술적 효과를 원할 때)',
    previewUrl: '/images/color/random.png'
  },
  {
    id: 'none',
    label: '없음 (None)',
    value: 'None',
    description: '색상 보정이나 톤 조정 없이 원본 그대로의 색감을 사용합니다. (활용: 원본 비교, 색상 효과 미적용)',
    previewUrl: '/images/color/none.png'
  },
  { 
    id: 'natural', 
    label: '자연스러움 (Natural)',
    value: 'Natural',
    description: '눈에 보이는 그대로의 자연스러운 색감. 사실적이고 편안한 느낌. (활용: 뉴스 보도, 다큐멘터리, 상품 상세 페이지)',
    previewUrl: '/images/color/natural.png'
  },
  { 
    id: 'bw', 
    label: '흑백 (Black & White)',
    value: 'Black & White',
    description: '색을 배제하고 명암으로만 표현. 형태와 질감, 감정에 집중. (활용: 예술 사진, 느와르 영화, 보도 사진, 인물 영정)',
    previewUrl: '/images/color/bw.png'
  },
  { 
    id: 'cinematic', 
    label: '시네마틱 (Teal & Orange)',
    value: 'Teal & Orange',
    description: '틸(Teal)과 오렌지(Orange) 색상을 강조하여 영화 같은 깊이감을 연출. (활용: 헐리우드 블록버스터 스타일, 시네마틱 브이로그)',
    previewUrl: '/images/color/cinematic.png'
  },
  { 
    id: 'cyberpunk', 
    label: '사이버펑크 (Neon)',
    value: 'Neon',
    description: '네온 핑크, 퍼플, 블루 등 인공적이고 강렬한 색채. 미래적이고 몽환적인 분위기. (활용: SF 영화, 게임 포스터, 클럽 사진)',
    previewUrl: '/images/color/cyberpunk.png'
  },
  { 
    id: 'pastel', 
    label: '파스텔 (Pastel)',
    value: 'Pastel',
    description: '채도가 낮고 명도가 높은 부드러운 색조. 꿈같고 사랑스러운 동화적인 분위기. (활용: 디저트 광고, 아이돌 뮤직비디오, 팬시 용품)',
    previewUrl: '/images/color/pastel.png'
  },
  { 
    id: 'vintage', 
    label: '빈티지 (Vintage)',
    value: 'Vintage',
    description: '빛바랜 듯한 색감과 노이즈. 오래된 사진이나 영화 같은 향수 어린 느낌. (활용: 레트로 패션 화보, 카페 홍보, 추억 회상)',
    previewUrl: '/images/color/vintage.png'
  },
  { 
    id: 'muted', 
    label: '채도 낮음 (Muted)',
    value: 'Muted',
    description: '채도를 낮추어 차분하고 정적인 느낌. 세련되고 우울한 분위기. (활용: 킨포크 스타일 감성 사진, 미니멀리즘 인테리어)',
    previewUrl: '/images/color/muted.png'
  },
  { 
    id: 'vivid', 
    label: '선명함 (Vivid)',
    value: 'Vivid',
    description: '채도를 높여 색상이 뚜렷하고 생동감 넘침. 활기차고 강렬한 인상. (활용: 스포츠 의류 광고, 음식 사진, 축제 현장)',
    previewUrl: '/images/color/vivid.png'
  },
  { 
    id: 'sepia', 
    label: '세피아 (Sepia)',
    value: 'Sepia',
    description: '갈색 톤의 단색조. 오래된 기록물이나 회상 장면 같은 고전적인 느낌. (활용: 서부 영화, 역사적 자료 재현, 몽타주)',
    previewUrl: '/images/color/sepia.png'
  },
  { 
    id: 'noir', 
    label: '누아르 (Film Noir)',
    value: 'Film Noir',
    description: '대비가 강한 흑백이나 어두운 톤. 범죄 영화나 미스터리물의 음울한 분위기. (활용: 탐정물, 미스터리 소설 삽화, 공포 게임)',
    previewUrl: '/images/color/noir.png'
  },
  { 
    id: 'warm', 
    label: '따뜻함 (Warm Tone)',
    value: 'Warm Tone',
    description: '붉은색, 주황색, 노란색 계열이 주를 이룸. 따뜻하고 포근하며 친근한 느낌. (활용: 가족 식사 장면, 베이커리 광고, 가을 풍경)',
    previewUrl: '/images/color/warm.png'
  },
  { 
    id: 'cool', 
    label: '차가움 (Cool Tone)',
    value: 'Cool Tone',
    description: '푸른색, 청록색 계열이 주를 이룸. 차갑고 이성적이며 고독한 느낌. (활용: 병원/실험실 배경, IT 제품 광고, 겨울 풍경)',
    previewUrl: '/images/color/cool.png'
  },
];
