import { Minus, Plus } from 'lucide-react';

interface GuestSelectorProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function GuestSelector({
  label,
  description,
  value,
  onChange,
  min = 0,
  max = 10
}: GuestSelectorProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-serif text-neutral-800">{label}</div>
        <div className="text-xs text-neutral-500 mt-0.5">{description}</div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4 text-neutral-600" />
        </button>
        <span className="w-8 text-center font-serif text-lg text-neutral-800">{value}</span>
        <button 
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4 text-neutral-600" />
        </button>
      </div>
    </div>
  );
}