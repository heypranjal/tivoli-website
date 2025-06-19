import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const hotelGroups = [
  {
    brand: 'THE TIVOLI',
    description: 'Timeless Luxury & Sophistication',
    hotels: [
      { id: 't1', name: 'Tivoli Grand Palace', location: 'Delhi' },
      { id: 't2', name: 'Tivoli Lake Palace', location: 'Noida' },
      { id: 't3', name: 'Tivoli Mountain Resort', location: 'Ambala' }
    ]
  },
  {
    brand: 'WEDCATION',
    description: 'Extraordinary Venues for Unforgettable Moments',
    hotels: [
      { id: 'w1', name: 'Wedcation Villa Tuscany', location: 'Tuscany' },
      { id: 'w2', name: 'Wedcation Château', location: 'Loire Valley' },
      { id: 'w3', name: 'Wedcation Island Resort', location: 'Santorini' }
    ]
  },
  {
    brand: 'THE UPPER HSE',
    description: 'Elevated Living, Refined Experiences',
    hotels: [
      { id: 'upper-1', name: 'The Upper HSE Downtown', location: 'Delhi' },
      { id: 'upper-2', name: 'The Upper HSE Riverside', location: 'Noida' },
      { id: 'upper-3', name: 'The Upper HSE Heights', location: 'Ambala' }
    ]
  },
  {
    brand: 'OMNIA',
    description: 'Where Nature Meets Opulence',
    hotels: [
      { id: 'o1', name: 'Omnia Beachfront Resort', location: 'Israna' },
      { id: 'o2', name: 'Omnia Mountain Lodge', location: 'Israna' },
      { id: 'o3', name: 'Omnia Desert Oasis', location: 'Abu Dhabi' }
    ]
  }
];

interface HotelSelectProps {
  value?: string;
  onChange: (value: string) => void;
  selectedLocation?: string;
  selectedBrand?: string;
}

export default function HotelSelect({ value, onChange, selectedLocation, selectedBrand }: HotelSelectProps) {
  const filteredGroups = hotelGroups
    .filter(group => !selectedBrand || group.brand.toLowerCase() === selectedBrand.toLowerCase())
    .map(group => ({
      ...group,
      hotels: group.hotels.filter(hotel => !selectedLocation || hotel.location.toLowerCase() === selectedLocation.toLowerCase())
    }))
    .filter(group => group.hotels.length > 0);

  const selectedHotel = hotelGroups
    .flatMap(group => group.hotels)
    .find(hotel => hotel.id === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between bg-transparent border-0 font-normal hover:bg-transparent focus-visible:ring-[#CD9F59]/30 font-serif group",
            !value && "text-neutral-500"
          )}
        >
          <span className={cn("truncate", !value && "text-neutral-500")}>
            {selectedHotel ? selectedHotel.name : "Select a Hotel"}
          </span>
          <ChevronDown className="w-4 h-4 ml-2 text-[#CD9F59] transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[400px] p-0 border-[#CD9F59]/20 bg-white/95 backdrop-blur-sm" 
        align="start"
      >
        <div className="p-4 border-b border-[#CD9F59]/10">
          <span className="text-sm uppercase tracking-[0.2em] text-[#CD9F59] font-sans">
            Select Your Destination
          </span>
        </div>
        <div className="max-h-[300px] overflow-auto">
          {filteredGroups.length > 0 ? filteredGroups.map((group, index) => (
            <div key={group.brand} className={cn("py-4", index !== 0 && "border-t border-[#CD9F59]/10")}>
              <div className="px-4 mb-2">
                <h3 className="font-serif text-lg text-neutral-800 mb-1">{group.brand}</h3>
                <p className="text-sm text-neutral-500 font-light">{group.description}</p>
              </div>
              <div className="space-y-1">
                {group.hotels.map((hotel) => (
                  <button
                    key={hotel.id}
                    onClick={() => onChange(hotel.id)}
                    className={cn(
                      "w-full px-4 py-2 text-left transition-colors hover:bg-[#CD9F59]/5 group/item",
                      value === hotel.id && "bg-[#CD9F59]/10"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-serif text-neutral-700 group-hover/item:text-[#CD9F59] transition-colors">
                          {hotel.name}
                        </p>
                        <p className="text-sm text-neutral-500 font-light">
                          {hotel.location}
                        </p>
                      </div>
                      {value === hotel.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CD9F59]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )) : (
            <div className="p-4 text-center text-neutral-500">
              No hotels found for the selected filters
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}