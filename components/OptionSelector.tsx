
import React from 'react';

interface OptionSelectorProps {
  title: string;
  options: { id: string; label: string; category?: string; description?: string; previewUrl?: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  groupByCategory?: boolean;
}


const OptionSelector: React.FC<OptionSelectorProps> = ({ 
  title, 
  options, 
  selectedId, 
  onSelect,
  groupByCategory // 더 이상 사용하지 않음, 하위 호환만 유지
}) => {
  const renderOptions = (opts: typeof options) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {opts.map((opt) => (
        <div key={opt.id} className="relative group flex">
          <button
            onClick={() => onSelect(opt.id)}
            className={`
              w-full px-3 py-2 text-sm rounded-lg border transition-all duration-200 text-left truncate relative
              ${selectedId === opt.id 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25 ring-1 ring-primary z-10' 
                : 'bg-card border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700'}
            `}
          >
            {opt.label}
          </button>
          {/* Custom Tooltip */}
          {opt.description && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-72 p-3 bg-slate-900/95 backdrop-blur text-xs text-slate-200 rounded-lg border border-slate-700 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none text-center">
              {opt.previewUrl && (
                <div className="w-full h-40 mb-3 rounded-md overflow-hidden bg-slate-800 border border-slate-700">
                  <img src={opt.previewUrl} alt={opt.label} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="px-1 font-medium leading-relaxed">
                {opt.description}
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-900/95"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // 카테고리별 그룹핑 로직: 조명/시점/기타 (General 그룹 우선, 나머지 카테고리별)
  const renderGroupedOptions = () => {
    // General 그룹(랜덤/없음 등) 우선 노출
    const generalOptions = options.filter(o => !o.category);
    const otherCategories = Array.from(new Set(options.map(o => o.category).filter(cat => cat && cat !== 'General')));
    return (
      <div className="space-y-4">
        {generalOptions.length > 0 && (
          <div>
            {renderOptions(generalOptions)}
          </div>
        )}
        {otherCategories.map((cat) => (
          <div key={cat}>
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2 ml-1">{cat}</h4>
            {renderOptions(options.filter(o => o.category === cat))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
        <span className="w-1 h-6 bg-primary rounded-full mr-2"></span>
        {title}
      </h3>
      {renderGroupedOptions()}
    </div>
  );
};

export default OptionSelector;