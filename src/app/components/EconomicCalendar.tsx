'use client'
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ChevronLeft,
  ChevronRight,
  Filter,
  BarChart3,
  ChevronDown
} from "lucide-react";

interface EconomicEvent {
  id: number;
  date: string;
  time: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  event: string;
  importance: 'low' | 'medium' | 'high';
  forecast: string;
  previous: string;
  actual?: string;
  category: 'economic' | 'earnings' | 'revenue' | 'dividends';
}

export function EconomicCalendar() {
  const [activeFilter, setActiveFilter] = useState<'economic' | 'earnings' | 'revenue' | 'dividends'>('economic');
  const [selectedDate, setSelectedDate] = useState('2025-08-25');

  // Mock data for the week - exactly matching the image
  const weekDays = [
    { date: '2025-08-25', day: 'Mon 25', economic: 31, earnings: 25, dividends: 319 },
    { date: '2025-08-26', day: 'Tue 26', economic: 30, earnings: 477, dividends: 499 },
    { date: '2025-08-27', day: 'Wed 27', economic: 40, earnings: 1427, dividends: 305 },
    { date: '2025-08-28', day: 'Thu 28', economic: 53, earnings: 1317, dividends: 1030 },
    { date: '2025-08-29', day: 'Fri 29', economic: 104, earnings: 276, dividends: 2291 },
    { date: '2025-08-30', day: 'Sat 30', economic: 4, earnings: 10, dividends: 1 },
    { date: '2025-08-31', day: 'Sun 31', economic: 3, earnings: 4, dividends: 2 }
  ];

  // Economic events matching the exact data from the image
  const economicEvents: EconomicEvent[] = [
    {
      id: 1,
      date: '2025-08-25',
      time: '07:00',
      country: 'United Kingdom',
      countryCode: 'GB',
      countryFlag: '🇬🇧',
      event: 'Late Summer Bank Holiday',
      importance: 'low',
      forecast: '—',
      previous: '—',
      actual: '—',
      category: 'economic'
    },
    {
      id: 2,
      date: '2025-08-25',
      time: '09:30',
      country: 'South Korea',
      countryCode: 'KR',
      countryFlag: '🇰🇷',
      event: '5-Year KTB Auction',
      importance: 'low',
      forecast: '—',
      previous: '2.625%',
      actual: '2.58%',
      category: 'economic'
    },
    {
      id: 3,
      date: '2025-08-25',
      time: '12:00',
      country: 'Japan',
      countryCode: 'JP',
      countryFlag: '🇯🇵',
      event: 'Coincident Index Final',
      importance: 'medium',
      forecast: '—',
      previous: '116',
      actual: '116.7',
      category: 'economic'
    },
    {
      id: 4,
      date: '2025-08-25',
      time: '12:00',
      country: 'Japan',
      countryCode: 'JP',
      countryFlag: '🇯🇵',
      event: 'Leading Economic Index Final',
      importance: 'medium',
      forecast: '106.1',
      previous: '104.8',
      actual: '105.6',
      category: 'economic'
    },
    {
      id: 5,
      date: '2025-08-25',
      time: '13:00',
      country: 'Saudi Arabia',
      countryCode: 'SA',
      countryFlag: '🇸🇦',
      event: 'Balance of Trade',
      importance: 'medium',
      forecast: '—',
      previous: '6.7 Bln',
      actual: '22.1 Bln',
      category: 'economic'
    },
    {
      id: 6,
      date: '2025-08-25',
      time: '13:00',
      country: 'Saudi Arabia',
      countryCode: 'SA',
      countryFlag: '🇸🇦',
      event: 'Exports',
      importance: 'low',
      forecast: '—',
      previous: '—',
      actual: '92.1 Bln',
      category: 'economic'
    },
    {
      id: 7,
      date: '2025-08-25',
      time: '13:00',
      country: 'Saudi Arabia',
      countryCode: 'SA',
      countryFlag: '🇸🇦',
      event: 'Imports',
      importance: 'low',
      forecast: '—',
      previous: '—',
      actual: '70 Bln',
      category: 'economic'
    }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredEvents = economicEvents.filter(event => 
    event.category === activeFilter && event.date === selectedDate
  );

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-cyan-400/30 backdrop-blur-sm shadow-lg">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
            <h3 className="text-xl font-bold text-white">Calendar</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700/50">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-700/50">
              Today
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700/50">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <div className="text-sm text-slate-400 ml-2">Aug 25 — Aug 31, 2025</div>
          </div>
        </div>

        {/* Week Days Header */}
        {/* Week selector: show 4 columns on mobile with horizontal scroll; full 7 on md+ */}
        <div className="flex md:grid md:grid-cols-7 overflow-x-auto md:overflow-visible gap-1 mb-6 bg-gradient-to-r from-slate-700/40 to-slate-600/40 rounded-lg p-2 snap-x snap-mandatory">
          {weekDays.map((day) => (
            <div
              key={day.date}
              className={`p-3 rounded-md text-center text-sm cursor-pointer transition-all basis-1/4 shrink-0 md:basis-auto md:shrink snap-start ${
                selectedDate === day.date
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'text-slate-300 hover:bg-slate-600/50'
              }`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className="font-semibold mb-2">{day.day}</div>
              <div className="space-y-1 text-[11px] sm:text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 whitespace-nowrap">Economic</span>
                  <span className={selectedDate === day.date ? 'text-white' : 'text-cyan-400'}>{day.economic}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 whitespace-nowrap">Earnings</span>
                  <span className={selectedDate === day.date ? 'text-white' : 'text-cyan-400'}>{day.earnings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 whitespace-nowrap">Dividends</span>
                  <span className={selectedDate === day.date ? 'text-white' : 'text-cyan-400'}>{day.dividends}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 md:gap-2 mb-6 bg-gradient-to-r from-slate-700/40 to-slate-600/40 rounded-lg p-1 overflow-x-auto md:overflow-visible flex-nowrap">
          {(['economic', 'earnings', 'revenue', 'dividends'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all capitalize shrink-0 whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-600/50'
              }`}
            >
              {filter}
            </button>
          ))}
          <div className="w-full md:w-auto md:ml-auto mt-2 md:mt-0 flex items-center gap-2 justify-end">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-600/50">
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-600/50">
              <Filter className="w-4 h-4" />
            </Button>
            <div className="text-sm text-slate-400">All categories</div>
          </div>
        </div>

        {/* Selected Date Info */}
        <div className="mb-4 text-sm text-slate-400">
          Monday, August 25
        </div>

        {/* Events Table - Exact format matching the image */}
        <div className="bg-gradient-to-r from-slate-700/20 to-slate-600/20 rounded-lg border border-blue-400/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-blue-400/20 hover:bg-transparent">
                <TableHead className="text-slate-400 text-xs font-medium w-16 text-left pl-4">Time</TableHead>
                <TableHead className="text-slate-400 text-xs font-medium w-8"></TableHead>
                <TableHead className="text-slate-400 text-xs font-medium text-left">Event</TableHead>
                <TableHead className="text-slate-400 text-xs font-medium text-center w-20">Actual</TableHead>
                <TableHead className="text-slate-400 text-xs font-medium text-center w-20">Forecast</TableHead>
                <TableHead className="text-slate-400 text-xs font-medium text-center w-20">Prior</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow 
                  key={event.id} 
                  className="border-b border-blue-400/10 hover:bg-slate-600/20 transition-colors"
                >
                  <TableCell className="text-slate-300 text-sm py-4 pl-4">
                    {event.time}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{event.countryFlag}</span>
                      <div className={`w-2 h-2 rounded-full ${getImportanceColor(event.importance)}`}></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-200 text-sm py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{event.event}</span>
                      <ChevronDown className="w-3 h-3 text-slate-500" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <span className={`text-sm ${
                      event.actual && event.actual !== '—' 
                        ? 'text-white font-medium' 
                        : 'text-slate-500'
                    }`}>
                      {event.actual}
                    </span>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <span className="text-sm text-slate-400">
                      {event.forecast}
                    </span>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <span className="text-sm text-slate-400">
                      {event.previous}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="mt-4 text-xs text-slate-500 text-center">
          All times are in UTC-7 • {filteredEvents.length} events • Powered by Economic Calendar API
        </div>
      </CardContent>
    </Card>
  );
}
