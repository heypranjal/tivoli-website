import { Calendar } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateSelectorProps {
  label: string;
  selected?: Date;
  onSelect: (date?: Date) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  minDate?: Date;
}

export function DateSelector({
  label,
  selected,
  onSelect,
  isOpen,
  onOpenChange,
  minDate
}: DateSelectorProps) {
  return (
    <div>
      <div className="text-sm uppercase tracking-wider text-neutral-700 mb-2">{label}</div>
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <button className="w-full h-[42px] px-3 text-left border border-neutral-800/20 rounded-lg hover:border-[#CD9F59] transition-colors text-sm bg-white/50 flex items-center justify-between">
            <span>{selected ? format(selected, "MMM d, yyyy") : "Select date"}</span>
            <Calendar className="w-4 h-4 text-neutral-500" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm border-[#CD9F59]/20">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={onSelect}
            disabled={{ before: minDate || new Date() }}
            className="border-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}