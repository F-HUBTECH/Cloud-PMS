"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Calendar, TrendingUp, Bed, DollarSign, Users } from 'lucide-react';

export function Forecast() {
  const [activeTab, setActiveTab] = useState('forecast');
  const [selectedMonth, setSelectedMonth] = useState('october');
  const [selectedYear, setSelectedYear] = useState('2025');

  // Mock forecast data
  const forecastData = [
    {
      date: '10/16/2025',
      day: 'Thu',
      in: 12,
      out: 8,
      sto: 85,
      occupied: 89,
      pax: 156,
      revenue: 18450,
      occ: 74.2,
    },
    {
      date: '10/17/2025',
      day: 'Fri',
      in: 15,
      out: 10,
      sto: 89,
      occupied: 94,
      pax: 168,
      revenue: 21300,
      occ: 78.3,
    },
    {
      date: '10/18/2025',
      day: 'Sat',
      in: 22,
      out: 12,
      sto: 94,
      occupied: 104,
      pax: 192,
      revenue: 28600,
      occ: 86.7,
    },
    {
      date: '10/19/2025',
      day: 'Sun',
      in: 18,
      out: 15,
      sto: 104,
      occupied: 107,
      pax: 198,
      revenue: 29850,
      occ: 89.2,
    },
    {
      date: '10/20/2025',
      day: 'Mon',
      in: 10,
      out: 20,
      sto: 107,
      occupied: 97,
      pax: 172,
      revenue: 22100,
      occ: 80.8,
    },
    {
      date: '10/21/2025',
      day: 'Tue',
      in: 8,
      out: 14,
      sto: 97,
      occupied: 91,
      pax: 158,
      revenue: 19500,
      occ: 75.8,
    },
    {
      date: '10/22/2025',
      day: 'Wed',
      in: 11,
      out: 9,
      sto: 91,
      occupied: 93,
      pax: 164,
      revenue: 20700,
      occ: 77.5,
    },
    {
      date: '10/23/2025',
      day: 'Thu',
      in: 13,
      out: 11,
      sto: 93,
      occupied: 95,
      pax: 170,
      revenue: 21850,
      occ: 79.2,
    },
    {
      date: '10/24/2025',
      day: 'Fri',
      in: 16,
      out: 8,
      sto: 95,
      occupied: 103,
      pax: 186,
      revenue: 27400,
      occ: 85.8,
    },
    {
      date: '10/25/2025',
      day: 'Sat',
      in: 24,
      out: 10,
      sto: 103,
      occupied: 117,
      pax: 215,
      revenue: 34200,
      occ: 97.5,
    },
  ];

  // Mock availability data
  const roomTypes = [
    { id: 1, name: 'Standard Single', total: 30 },
    { id: 2, name: 'Standard Double', total: 25 },
    { id: 3, name: 'Deluxe Single', total: 20 },
    { id: 4, name: 'Deluxe Double', total: 15 },
    { id: 5, name: 'Suite', total: 10 },
    { id: 6, name: 'Family Room', total: 12 },
    { id: 7, name: 'Executive Suite', total: 8 },
  ];

  const availabilityDates = [
    '10/16', '10/17', '10/18', '10/19', '10/20', '10/21', '10/22',
    '10/23', '10/24', '10/25', '10/26', '10/27', '10/28', '10/29',
  ];

  // Generate mock availability data
  const generateAvailability = (total: number) => {
    const baseOccupancy = Math.random() * 0.6 + 0.2; // 20-80% occupancy
    const occupied = Math.floor(total * baseOccupancy);
    const available = total - occupied;
    return available;
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage >= 50) return 'bg-primary/10 text-primary';
    if (percentage >= 25) return 'bg-secondary/10 text-secondary';
    if (percentage > 0) return 'bg-destructive/10 text-destructive';
    return 'bg-muted text-muted-foreground';
  };

  const totals = forecastData.reduce(
    (acc, day) => ({
      in: acc.in + day.in,
      out: acc.out + day.out,
      sto: 0, // STO doesn't sum
      occupied: 0, // Occupied is daily snapshot
      pax: acc.pax + day.pax,
      revenue: acc.revenue + day.revenue,
      occ: 0, // Occupancy will be averaged
    }),
    { in: 0, out: 0, sto: 0, occupied: 0, pax: 0, revenue: 0, occ: 0 }
  );

  const avgOcc = forecastData.reduce((sum, day) => sum + day.occ, 0) / forecastData.length;

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg Occupancy</p>
                <p className="text-2xl">{avgOcc.toFixed(1)}%</p>
              </div>
              <div className="rounded-lg bg-primary p-2">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/10 border-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <p className="text-2xl">${(totals.revenue / 1000).toFixed(1)}k</p>
              </div>
              <div className="rounded-lg bg-secondary p-2">
                <DollarSign className="h-6 w-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent/10 border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Pax</p>
                <p className="text-2xl">{totals.pax}</p>
              </div>
              <div className="rounded-lg bg-accent-foreground p-2">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Check-ins</p>
                <p className="text-2xl">{totals.in}</p>
              </div>
              <div className="rounded-lg bg-primary p-2">
                <Bed className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-accent/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-primary">Forecast & Availability</CardTitle>
              <p className="text-muted-foreground text-sm mt-1">
                View occupancy forecast and room availability
              </p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="october">October</SelectItem>
                  <SelectItem value="november">November</SelectItem>
                  <SelectItem value="december">December</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-muted mb-6">
              <TabsTrigger
                value="forecast"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Forecast
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Bed className="h-4 w-4 mr-2" />
                Availability
              </TabsTrigger>
            </TabsList>

            {/* Forecast Tab */}
            <TabsContent value="forecast" className="space-y-4">
              <div className="rounded-lg border shadow-sm overflow-auto">
                <Table>
                  <TableHeader className="bg-accent/50">
                    <TableRow>
                      <TableHead className="text-foreground">Date</TableHead>
                      <TableHead className="text-foreground text-center">Day</TableHead>
                      <TableHead className="text-foreground text-center">In</TableHead>
                      <TableHead className="text-foreground text-center">Out</TableHead>
                      <TableHead className="text-foreground text-center">STO</TableHead>
                      <TableHead className="text-foreground text-center">Occupied</TableHead>
                      <TableHead className="text-foreground text-center">Pax</TableHead>
                      <TableHead className="text-foreground text-right">Revenue</TableHead>
                      <TableHead className="text-foreground text-center">Occ%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forecastData.map((day, index) => (
                      <TableRow key={index} className="hover:bg-accent/30">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{day.date}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                            {day.day}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-primary text-primary-foreground">
                            {day.in}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-secondary text-secondary-foreground">
                            {day.out}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {day.sto}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-foreground">{day.occupied}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Users className="h-3 w-3 text-accent-foreground" />
                            <span>{day.pax}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-secondary">
                            ${day.revenue.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            className={
                              day.occ >= 90
                                ? 'bg-primary text-primary-foreground'
                                : day.occ >= 75
                                ? 'bg-secondary text-secondary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }
                          >
                            {day.occ.toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Total Row */}
                    <TableRow className="bg-accent/50 border-t-2 border-primary/20">
                      <TableCell className="text-foreground">
                        <strong>Total / Avg</strong>
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">
                        <strong className="text-primary">{totals.in}</strong>
                      </TableCell>
                      <TableCell className="text-center">
                        <strong className="text-secondary">{totals.out}</strong>
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">
                        <strong>{totals.pax}</strong>
                      </TableCell>
                      <TableCell className="text-right">
                        <strong className="text-secondary">
                          ${totals.revenue.toLocaleString()}
                        </strong>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-primary text-primary-foreground">
                          {avgOcc.toFixed(1)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability" className="space-y-4">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-primary/10" />
                  <span className="text-sm text-muted-foreground">High Availability (50%+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-secondary/10" />
                  <span className="text-sm text-muted-foreground">Medium (25-50%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-destructive/10" />
                  <span className="text-sm text-muted-foreground">Low ({"<"}25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-muted" />
                  <span className="text-sm text-muted-foreground">Sold Out</span>
                </div>
              </div>

              <div className="rounded-lg border shadow-sm overflow-auto">
                <Table>
                  <TableHeader className="bg-accent/50">
                    <TableRow>
                      <TableHead className="text-foreground sticky left-0 bg-accent/50 min-w-[180px]">
                        Room Type
                      </TableHead>
                      <TableHead className="text-foreground text-center">Total</TableHead>
                      {availabilityDates.map((date) => (
                        <TableHead key={date} className="text-foreground text-center min-w-[70px]">
                          {date}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomTypes.map((roomType) => (
                      <TableRow key={roomType.id} className="hover:bg-accent/30">
                        <TableCell className="sticky left-0 bg-background">
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4 text-primary" />
                            <span>{roomType.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                            {roomType.total}
                          </Badge>
                        </TableCell>
                        {availabilityDates.map((date) => {
                          const available = generateAvailability(roomType.total);
                          return (
                            <TableCell key={date} className="text-center p-2">
                              <div
                                className={`rounded px-2 py-1 text-sm ${getAvailabilityColor(
                                  available,
                                  roomType.total
                                )}`}
                              >
                                {available}
                              </div>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
