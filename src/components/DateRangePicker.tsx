import React from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  date?: DateRange;
  onChange: (date: DateRange | undefined) => void;
  numberOfMonths?: number;
}

export default function DateRangePicker({ date, onChange, numberOfMonths = 2 }: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between bg-transparent border-0 font-normal hover:bg-transparent focus-visible:ring-[#CD9F59]/30 font-serif",
            !date && "text-neutral-500"
          )}
        >
          <span className={cn("truncate w-full text-left", !date && "text-neutral-500")}>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              "Check-in - Check-out"
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-6 border-[#CD9F59]/20 bg-white/95 backdrop-blur-sm" 
        align="start"
      >
        <div className="mb-4 text-center">
          <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans">
            Select Your Stay
          </span>
        </div>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={onChange}
          numberOfMonths={numberOfMonths}
          className="border-0"
        />
      </PopoverContent>
    </Popover>
  );
}