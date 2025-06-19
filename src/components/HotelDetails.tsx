import React from 'react';
import { Building, Users, Wifi, MapPin } from 'lucide-react';

interface HotelDetailsProps {
  totalRooms: number;
  roomCategories: { type: string; count: number }[];
  venues: string[];
  roomAmenities: string[];
  banquetCapacity: { theatre: number; classroom: number; uShape: number };
  outdoorVenue: { name: string; sizeSqFt: number };
  otherVenues: string[];
}

const HotelDetails: React.FC<HotelDetailsProps> = ({
  totalRooms,
  roomCategories,
  venues,
  roomAmenities,
  banquetCapacity,
  outdoorVenue,
  otherVenues,
}) => {
  return (
    <div className="mt-8">
      <h3 className="font-serif text-xl text-neutral-800 mb-6">Property Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#CD9F59]/10 flex items-center justify-center">
              <Building className="w-5 h-5 text-[#CD9F59]" />
            </div>
            <h4 className="font-serif text-lg text-neutral-800">Room Information</h4>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-neutral-600 font-medium">Total Rooms: {totalRooms}</p>
              <div className="mt-2 space-y-1">
                {roomCategories.map((category, index) => (
                  <p key={index} className="text-neutral-600 text-sm">
                    • {category.type}: {category.count}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-neutral-600 font-medium mb-2">Room Amenities</p>
              <div className="flex flex-wrap gap-2">
                {roomAmenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Venue Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#CD9F59]/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#CD9F59]" />
            </div>
            <h4 className="font-serif text-lg text-neutral-800">Venue Information</h4>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-neutral-600 font-medium mb-2">Indoor Venues</p>
              <div className="space-y-1">
                {venues.map((venue, index) => (
                  <p key={index} className="text-neutral-600 text-sm">
                    • {venue}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-neutral-600 font-medium mb-2">Outdoor Venue</p>
              <p className="text-neutral-600 text-sm">
                • {outdoorVenue.name}: {outdoorVenue.sizeSqFt.toLocaleString()} Sq. Ft.
              </p>
            </div>
            <div>
              <p className="text-neutral-600 font-medium mb-2">Other Venues</p>
              <div className="space-y-1">
                {otherVenues.map((venue, index) => (
                  <p key={index} className="text-neutral-600 text-sm">
                    • {venue}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Banquet Capacity */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#CD9F59]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#CD9F59]" />
            </div>
            <h4 className="font-serif text-lg text-neutral-800">Banquet Capacity</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p className="text-neutral-600 font-medium">Theatre Style</p>
              <p className="text-2xl font-serif text-[#CD9F59]">{banquetCapacity.theatre} Pax</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p className="text-neutral-600 font-medium">Classroom Style</p>
              <p className="text-2xl font-serif text-[#CD9F59]">{banquetCapacity.classroom} Pax</p>
            </div>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p className="text-neutral-600 font-medium">U-Shape Style</p>
              <p className="text-2xl font-serif text-[#CD9F59]">{banquetCapacity.uShape} Pax</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;