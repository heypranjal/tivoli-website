import React from 'react';
import { MapPin, Hotel } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const locations = [
  { id: 'delhi', name: 'Delhi' },
  { id: 'noida', name: 'Noida' },
  { id: 'ambala', name: 'Ambala' },
  { id: 'israna', name: 'Israna' }
];

const brands = [
  { id: 'tivoli', name: 'THE TIVOLI', description: 'Timeless Luxury & Sophistication' },
  { id: 'wedcation', name: 'WEDCATION', description: 'Extraordinary Venues for Unforgettable Moments' },
  { id: 'upper-hse', name: 'THE UPPER HSE', description: 'Elevated Living, Refined Experiences' },
  { id: 'omnia', name: 'OMNIA', description: 'Where Nature Meets Opulence' }
];

interface LocationBrandFilterProps {
  selectedLocation?: string;
  selectedBrand?: string;
  onLocationChange: (location: string) => void;
  onBrandChange: (brand: string) => void;
}

export default function LocationBrandFilter({
  selectedLocation,
  selectedBrand,
  onLocationChange,
  onBrandChange
}: LocationBrandFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between bg-transparent border-0 font-normal hover:bg-transparent focus-visible:ring-[#CD9F59]/30 font-serif group",
            !selectedLocation && !selectedBrand && "text-neutral-500"
          )}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#CD9F59]" />
            <span className={cn("truncate", (!selectedLocation && !selectedBrand) && "text-neutral-500")}>
              {selectedLocation && selectedBrand 
                ? `${locations.find(l => l.id === selectedLocation)?.name} - ${brands.find(b => b.id === selectedBrand)?.name}`
                : selectedLocation
                ? locations.find(l => l.id === selectedLocation)?.name
                : selectedBrand
                ? brands.find(b => b.id === selectedBrand)?.name
                : "Select Location & Brand"}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[400px] p-0 border-[#CD9F59]/20 bg-white/95 backdrop-blur-sm" 
        align="start"
      >
        <div className="p-4 border-b border-[#CD9F59]/10">
          <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans">
            Filter by Location & Brand
          </span>
        </div>
        
        {/* Locations */}
        <div className="p-4 border-b border-[#CD9F59]/10">
          <h3 className="font-serif text-lg text-neutral-800 mb-3">Location</h3>
          <div className="grid grid-cols-2 gap-2">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => onLocationChange(location.id)}
                className={cn(
                  "px-4 py-2 text-left rounded-lg transition-colors hover:bg-[#CD9F59]/5",
                  selectedLocation === location.id && "bg-[#CD9F59]/10"
                )}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#CD9F59]" />
                  <span className="font-serif text-neutral-700">
                    {location.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Brands */}
        <div className="p-4">
          <h3 className="font-serif text-lg text-neutral-800 mb-3">Brand</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => onBrandChange(brand.id)}
                className={cn(
                  "w-full px-4 py-3 text-left rounded-lg transition-colors hover:bg-[#CD9F59]/5",
                  selectedBrand === brand.id && "bg-[#CD9F59]/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <Hotel className="w-5 h-5 text-[#CD9F59]" />
                  <div>
                    <p className="font-serif text-neutral-700">{brand.name}</p>
                    <p className="text-sm text-neutral-500">{brand.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}