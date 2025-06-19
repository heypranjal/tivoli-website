/**
 * HotelBookingWidget Component
 * A reusable booking widget for hotel rooms that includes:
 * - Price display
 * - Date range selection
 * - Guest count selection
 * - Room count selection
 * - Booking actions
 */
import React, { useState, useCallback } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { Plus, Minus, Calendar, X, Hotel } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, addDays, isBefore, isAfter } from 'date-fns';

interface HotelBookingWidgetProps {
  price: number;
  currency?: string;
  roomCount?: number;
  onBookingSubmit?: () => void;
  isMobile?: boolean;
  isPortrait?: boolean;
}

export default function HotelBookingWidget({
  price,
  currency = '₹',
  roomCount = 1,
  onBookingSubmit,
  isMobile = false,
  isPortrait = false
}: HotelBookingWidgetProps) {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });
  const [rooms, setRooms] = useState(roomCount);
  const [isRoomSelectorOpen, setIsRoomSelectorOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRoomChange = (increment: boolean) => {
    setRooms(prev => {
      const newValue = increment ? prev + 1 : prev - 1;
      return Math.min(Math.max(1, newValue), 10); // Limit between 1 and 10 rooms
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      document.body.style.overflow = 'visible';
    } else {
      document.body.style.overflow = '';
    }
  };

  const handleCheckInSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setDateRange(prev => {
      // If selected date is after current check-out, reset check-out
      if (prev?.to && isAfter(date, prev.to)) {
        return { from: date };
      }
      return { ...prev, from: date };
    });
    setIsCheckInOpen(false);
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setDateRange(prev => {
      // If selected date is before check-in, update check-in
      if (prev?.from && isBefore(date, prev.from)) {
        return { from: date };
      }
      return { ...prev, to: date };
    });
    setIsCheckOutOpen(false);
  };

  const handleBookingSubmit = () => {
    if (onBookingSubmit) {
      onBookingSubmit();
    }
  };

  return (
    <>
      {isMobile && isPortrait ? (
        <>
          {/* Mobile Booking Button */}
          <button
            onClick={toggleExpanded}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#CD9F59] text-white rounded-xl shadow-lg hover:bg-[#B88D47] transition-colors"
          >
            <span className="font-serif text-base tracking-wide text-white px-6 py-2 block">
              Book Now
            </span>
          </button>

          {/* Mobile Booking Panel */}
          <div
            className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleExpanded}
          />
          <div
            className={`fixed inset-x-0 bottom-0 bg-[#F8F4CB] rounded-t-3xl z-50 transition-transform duration-500 ease-out max-h-[90vh] overflow-y-auto ${
              isExpanded ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="sticky top-0 bg-[#F8F4CB] px-4 py-3 border-b border-[#CD9F59]/10 flex items-center justify-between">
              <h3 className="font-serif text-lg text-neutral-800">Book Your Stay</h3>
              <button
                onClick={toggleExpanded}
                className="w-full bg-[#CD9F59] text-white py-3.5 rounded-lg hover:bg-[#B88D47] transition-all duration-300 font-serif text-base tracking-wide transform hover:scale-[1.02] hover:shadow-lg"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm uppercase tracking-wider text-neutral-700 mb-2">Check-in</div>
                    <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                      <PopoverTrigger asChild>
                        <button className="w-full h-[42px] px-3 text-left border border-neutral-800/20 rounded-lg hover:border-[#CD9F59] transition-colors text-sm bg-white/50 flex items-center justify-between">
                          <span>{dateRange?.from ? format(dateRange.from, "MMM d, yyyy") : "Select date"}</span>
                          <Calendar className="w-4 h-4 text-neutral-500" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm border-[#CD9F59]/20">
                        <DayPicker
                          mode="single"
                          selected={dateRange?.from}
                          onSelect={handleCheckInSelect}
                          disabled={{ before: new Date() }}
                          className="border-0"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <div className="text-sm uppercase tracking-wider text-neutral-700 mb-2">Check-out</div>
                    <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
                      <PopoverTrigger asChild>
                        <button className="w-full h-[42px] px-3 text-left border border-neutral-800/20 rounded-lg hover:border-[#CD9F59] transition-colors text-sm bg-white/50 flex items-center justify-between">
                          <span>{dateRange?.to ? format(dateRange.to, "MMM d, yyyy") : "Select date"}</span>
                          <Calendar className="w-4 h-4 text-neutral-500" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm border-[#CD9F59]/20">
                        <DayPicker
                          mode="single"
                          selected={dateRange?.to}
                          onSelect={handleCheckOutSelect}
                          disabled={{ before: dateRange?.from || new Date() }}
                          className="border-0"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm uppercase tracking-wider text-neutral-700 mb-2">Guests</div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="w-full h-[42px] px-3 text-left border border-neutral-800/20 rounded-lg text-neutral-800 hover:border-[#CD9F59] transition-colors text-sm bg-white/50">
                          {guests.adults} Adults, {guests.children} Child, {guests.infants} Infant
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-6 bg-white/95 backdrop-blur-sm border-[#CD9F59]/20">
                        <div className="space-y-6">
                          <div className="text-center mb-2">
                            <h3 className="font-serif text-lg text-neutral-800">Guest Selection</h3>
                            <div className="w-12 h-[1px] bg-[#CD9F59]/50 mx-auto mt-2" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-serif text-neutral-800">Adults</div>
                              <div className="text-xs text-neutral-500 mt-0.5">Age 13+</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                              >
                                <Minus className="w-4 h-4 text-neutral-600" />
                              </button>
                              <span className="w-8 text-center font-serif text-lg text-neutral-800">{guests.adults}</span>
                              <button 
                                onClick={() => setGuests(prev => ({ ...prev, adults: Math.min(10, prev.adults + 1) }))}
                                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                              >
                                <Plus className="w-4 h-4 text-neutral-600" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-serif text-neutral-800">Children</div>
                              <div className="text-xs text-neutral-500 mt-0.5">Ages 2-12</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                              >
                                <Minus className="w-4 h-4 text-neutral-600" />
                              </button>
                              <span className="w-8 text-center font-serif text-lg text-neutral-800">{guests.children}</span>
                              <button 
                                onClick={() => setGuests(prev => ({ ...prev, children: Math.min(6, prev.children + 1) }))}
                                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                              >
                                <Plus className="w-4 h-4 text-neutral-600" />
                              </button>
                            </div>
                          </div>
                          <div className="h-[1px] bg-neutral-100" />
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-serif text-neutral-800">Infants</div>
                              <div className="text-xs text-neutral-500 mt-0.5">Under 2</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => setGuests(prev => ({ ...prev, infants: Math.max(0, prev.infants - 1) }))}
                                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                              >
                                <Minus className="w-4 h-4 text-neutral-600" />
                              </button>
                              <span className="w-8 text-center font-serif text-lg text-neutral-800">{guests.infants}</span>
                              <button 
                                onClick={() => setGuests(prev => ({ ...prev, infants: Math.min(4, prev.infants + 1) }))}
                                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                              >
                                <Plus className="w-4 h-4 text-neutral-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-wider text-neutral-700 mb-2">No. of Rooms</div>
                    <Popover open={isRoomSelectorOpen} onOpenChange={setIsRoomSelectorOpen}>
                      <PopoverTrigger asChild>
                        <button className="w-full h-[42px] px-3 text-left border border-neutral-800/20 rounded-lg text-neutral-800 hover:border-[#CD9F59] transition-colors text-sm bg-white/50 flex items-center justify-between">
                          <span>{rooms} Room{rooms !== 1 ? 's' : ''}</span>
                          <Hotel className="w-4 h-4 text-neutral-500" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-6 bg-white/95 backdrop-blur-sm border-[#CD9F59]/20">
                        <div className="space-y-6">
                          <div className="text-center mb-2">
                            <h3 className="font-serif text-lg text-neutral-800">Select Rooms</h3>
                            <div className="w-12 h-[1px] bg-[#CD9F59]/50 mx-auto mt-2" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-serif text-neutral-800">Number of Rooms</div>
                              <div className="text-xs text-neutral-500 mt-0.5">Maximum 10 rooms per booking</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => handleRoomChange(false)}
                                disabled={rooms <= 1}
                                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-4 h-4 text-neutral-600" />
                              </button>
                              <span className="w-8 text-center font-serif text-lg text-neutral-800">{rooms}</span>
                              <button 
                                onClick={() => handleRoomChange(true)}
                                disabled={rooms >= 10}
                                className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus className="w-4 h-4 text-neutral-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <button 
                  onClick={handleBookingSubmit}
                  className="w-full bg-[#CD9F59] text-white py-3.5 rounded-lg hover:bg-[#B88D47] transition-all duration-300 font-serif text-base tracking-wide"
                >
                  Select Dates
                </button>
                
                <div className="flex items-center justify-between pt-4 border-t border-neutral-800/10">
                  <button className="text-neutral-800 hover:text-[#CD9F59] transition-colors">
                    Connect with Host
                  </button>
                  <button className="px-4 py-2 border border-neutral-800/20 rounded-lg text-neutral-800 hover:border-[#CD9F59] transition-colors">
                    Request Callback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-[#F8F4CB] backdrop-blur-sm rounded-xl shadow-lg p-8 h-fit sticky top-28 text-neutral-800 z-10">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm uppercase tracking-wider text-neutral-700 mb-2">Check-in</div>
                <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                  <PopoverTrigger asChild>
                    <button className="w-full h-[42px] px-3 text-left border border-neutral-800/20 rounded-lg hover:border-[#CD9F59] transition-colors text-sm bg-white/50 flex items-center justify-between">
                      <span>{dateRange?.from ? format(dateRange.from, "MMM d, yyyy") : "Select date"}</span>
                      <Calendar className="w-4 h-4 text-neutral-500" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm border-[#CD9F59]/20">
                    <DayPicker
                      mode="single"
                      selected={dateRange?.from}
                      onSelect={handleCheckInSelect}
                      disabled={{ before: new Date() }}
                      className="border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <div className="text-sm uppercase tracking-wider text-neutral-700 mb-2">Check-out</div>
                <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
                  <PopoverTrigger asChild>
                    <button className="w-full h-[42px] px-3 text-left border border-neutral-800/20 rounded-lg hover:border-[#CD9F59] transition-colors text-sm bg-white/50 flex items-center justify-between">
                      <span>{dateRange?.to ? format(dateRange.to, "MMM d, yyyy") : "Select date"}</span>
                      <Calendar className="w-4 h-4 text-neutral-500" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm border-[#CD9F59]/20">
                    <DayPicker
                      mode="single"
                      selected={dateRange?.to}
                      onSelect={handleCheckOutSelect}
                      disabled={{ before: dateRange?.from || new Date() }}
                      className="border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm uppercase tracking-wider text-neutral-700 mb-2">Guests</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full h-[42px] px-3 text-left border border-neutral-800/20 rounded-lg text-neutral-800 hover:border-[#CD9F59] transition-colors text-sm bg-white/50">
                      {guests.adults} Adults, {guests.children} Child, {guests.infants} Infant
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-6 bg-white/95 backdrop-blur-sm border-[#CD9F59]/20">
                    <div className="space-y-6">
                      <div className="text-center mb-2">
                        <h3 className="font-serif text-lg text-neutral-800">Guest Selection</h3>
                        <div className="w-12 h-[1px] bg-[#CD9F59]/50 mx-auto mt-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-serif text-neutral-800">Adults</div>
                          <div className="text-xs text-neutral-500 mt-0.5">Age 13+</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                          >
                            <Minus className="w-4 h-4 text-neutral-600" />
                          </button>
                          <span className="w-8 text-center font-serif text-lg text-neutral-800">{guests.adults}</span>
                          <button 
                            onClick={() => setGuests(prev => ({ ...prev, adults: Math.min(10, prev.adults + 1) }))}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                          >
                            <Plus className="w-4 h-4 text-neutral-600" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-serif text-neutral-800">Children</div>
                          <div className="text-xs text-neutral-500 mt-0.5">Ages 2-12</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                          >
                            <Minus className="w-4 h-4 text-neutral-600" />
                          </button>
                          <span className="w-8 text-center font-serif text-lg text-neutral-800">{guests.children}</span>
                          <button 
                            onClick={() => setGuests(prev => ({ ...prev, children: Math.min(6, prev.children + 1) }))}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                          >
                            <Plus className="w-4 h-4 text-neutral-600" />
                          </button>
                        </div>
                      </div>
                      <div className="h-[1px] bg-neutral-100" />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-serif text-neutral-800">Infants</div>
                          <div className="text-xs text-neutral-500 mt-0.5">Under 2</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setGuests(prev => ({ ...prev, infants: Math.max(0, prev.infants - 1) }))}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                          >
                            <Minus className="w-4 h-4 text-neutral-600" />
                          </button>
                          <span className="w-8 text-center font-serif text-lg text-neutral-800">{guests.infants}</span>
                          <button 
                            onClick={() => setGuests(prev => ({ ...prev, infants: Math.min(4, prev.infants + 1) }))}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors"
                          >
                            <Plus className="w-4 h-4 text-neutral-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <div className="text-sm uppercase tracking-wider text-neutral-700 mb-2">No. of Rooms</div>
                <Popover open={isRoomSelectorOpen} onOpenChange={setIsRoomSelectorOpen}>
                  <PopoverTrigger asChild>
                    <button className="w-full h-[42px] px-3 text-left border border-neutral-800/20 rounded-lg text-neutral-800 hover:border-[#CD9F59] transition-colors text-sm bg-white/50 flex items-center justify-between">
                      <span>{rooms} Room{rooms !== 1 ? 's' : ''}</span>
                      <Hotel className="w-4 h-4 text-neutral-500" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-6 bg-white/95 backdrop-blur-sm border-[#CD9F59]/20">
                    <div className="space-y-6">
                      <div className="text-center mb-2">
                        <h3 className="font-serif text-lg text-neutral-800">Select Rooms</h3>
                        <div className="w-12 h-[1px] bg-[#CD9F59]/50 mx-auto mt-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-serif text-neutral-800">Number of Rooms</div>
                          <div className="text-xs text-neutral-500 mt-0.5">Maximum 10 rooms per booking</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleRoomChange(false)}
                            disabled={rooms <= 1}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4 text-neutral-600" />
                          </button>
                          <span className="w-8 text-center font-serif text-lg text-neutral-800">{rooms}</span>
                          <button 
                            onClick={() => handleRoomChange(true)}
                            disabled={rooms >= 10}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full hover:border-[#CD9F59] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4 text-neutral-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <button 
              onClick={handleBookingSubmit}
              className="w-full bg-[#CD9F59] text-white py-3.5 rounded-lg hover:bg-[#B88D47] transition-all duration-300 font-serif text-base tracking-wide"
            >
              Select Dates
            </button>
            
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800/10">
              <button className="text-neutral-800 hover:text-[#CD9F59] transition-colors">
                Connect with Host
              </button>
              <button className="px-4 py-2 border border-neutral-800/20 rounded-lg text-neutral-800 hover:border-[#CD9F59] transition-colors">
                Request Callback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}