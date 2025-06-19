import { cn } from "@/lib/utils"
import { ElementType, ComponentPropsWithoutRef } from "react"

interface MobileBookingButtonProps<T extends ElementType> {
  as?: T
  className?: string
  children: React.ReactNode
}

export function MobileBookingButton<T extends ElementType = "button">({
  as,
  className,
  children,
  ...props
}: MobileBookingButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof MobileBookingButtonProps<T>>) {
  const Component = as || "button"

  return (
    <Component 
      className={cn(
        "relative w-[200px] overflow-hidden",
        className
      )} 
      {...props}
    >
      <div className="relative bg-[#CD9F59] rounded-xl shadow-lg hover:bg-[#B88D47] transition-all duration-300">
        {children}
      </div>
    </Component>
  )
}