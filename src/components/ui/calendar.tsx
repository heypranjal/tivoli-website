import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: CalendarProps) {
  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-4",
    month: "w-full",
    month_caption: "relative mx-10 mb-4 flex h-9 items-center justify-center z-10 text-center border-b border-[#CD9F59]/10 pb-2",
    caption_label: "text-sm font-medium w-full text-center font-serif text-[#CD9F59] uppercase tracking-wider",
    nav: "absolute -top-1 flex w-full justify-between z-0",
    button_previous: cn(
      buttonVariants({ variant: "ghost" }),
      "size-9 text-[#CD9F59] hover:text-[#B88D47] p-0 -ml-2",
    ),
    button_next: cn(
      buttonVariants({ variant: "ghost" }),
      "size-9 text-[#CD9F59] hover:text-[#B88D47] p-0 -mr-2",
    ),
    weekday: "size-9 p-0 text-xs font-medium text-[#CD9F59]/70 mb-2 uppercase tracking-wider font-sans",
    day_button:
      "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg p-0 text-neutral-600 outline-offset-2 transition-all duration-300 focus:outline-none group-data-[disabled]:pointer-events-none focus-visible:z-10 hover:bg-[#CD9F59]/10 group-data-[selected]:bg-[#CD9F59] hover:text-neutral-900 group-data-[selected]:text-white group-data-[disabled]:text-neutral-300 group-data-[disabled]:line-through group-data-[outside]:text-neutral-400 group-data-[outside]:group-data-[selected]:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#CD9F59]/70 group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-data-[selected]:group-[.range-middle]:bg-[#CD9F59]/20 group-data-[selected]:group-[.range-middle]:text-neutral-900 hover:scale-110 group-data-[selected]:shadow-lg group-data-[selected]:shadow-[#CD9F59]/20",
    day: "group size-9 px-0 text-sm",
    range_start: "range-start",
    range_end: "range-end",
    range_middle: "range-middle",
    today:
      "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-[#CD9F59] [&[data-selected]:not(.range-middle)>*]:after:bg-white [&[data-disabled]>*]:after:bg-neutral-300 *:after:transition-colors",
    outside: "text-muted-foreground data-selected:bg-accent/50 data-selected:text-muted-foreground",
    hidden: "invisible",
    week_number: "size-9 p-0 text-xs font-medium text-neutral-400",
  };

  const mergedClassNames: typeof defaultClassNames = Object.keys(defaultClassNames).reduce(
    (acc, key) => ({
      ...acc,
      [key]: classNames?.[key as keyof typeof classNames]
        ? cn(
            defaultClassNames[key as keyof typeof defaultClassNames],
            classNames[key as keyof typeof classNames],
          )
        : defaultClassNames[key as keyof typeof defaultClassNames],
    }),
    {} as typeof defaultClassNames,
  );

  const defaultComponents = {
    Chevron: (props: any) => {
      if (props.orientation === "left") {
        return <ChevronLeft size={16} strokeWidth={2} {...props} aria-hidden="true" />;
      }
      return <ChevronRight size={16} strokeWidth={2} {...props} aria-hidden="true" />;
    },
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit", className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };