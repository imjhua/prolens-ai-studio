import React from 'react';

export type UsedOptions = {
  lighting: string;
  pov: string;
  color: string;
  details: string;
  scene: string;
  effect: string;
  aspectRatio: string;
};

type UsedOptionsSummaryProps = { options: UsedOptions };
const UsedOptionsSummary = ({ options }: UsedOptionsSummaryProps) => (
  <div className="pt-6">
    <div className="p-4 bg-card rounded-xl border border-slate-700/50">
      <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Selected Configuration</h4>
      <div className="flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
          장면: {options.scene}
        </span>
        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
          조명: {options.lighting}
        </span>
        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
          시점: {options.pov}
        </span>
        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
          특수효과: {options.effect}
        </span>
        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
          색상: {options.color}
        </span>
        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
          비율: {options.aspectRatio}
        </span>
        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">
          추가 정보: {options.details || '-'}
        </span>
      </div>
    </div>
  </div>
);

export default UsedOptionsSummary;
