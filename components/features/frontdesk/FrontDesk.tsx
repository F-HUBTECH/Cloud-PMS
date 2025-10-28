"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Search,
  Plus,
  UserCheck,
  UserX,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Bed,
  Building2,
  FileText,
  Printer,
  Mail,
  Phone,
  CreditCard,
  Clock,
  CheckCircle2,
  Settings,
  Home,
  Eye,
  Edit,
  Filter,
  Download,
} from 'lucide-react';
import { toast } from 'sonner';

export function FrontDesk() {
  const [activeTab, setActiveTab] = useState('room-chart');
  const [walkInDialogOpen, setWalkInDialogOpen] = useState(false);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Room data
  const rooms = [
    { number: '101', type: 'Standard', floor: 1, status: 'available', price: 150 },
    { number: '102', type: 'Standard', floor: 1, status: 'occupied', price: 150, guest: 'John Smith' },
    { number: '103', type: 'Deluxe', floor: 1, status: 'available', price: 200 },
    { number: '104', type: 'Deluxe', floor: 1, status: 'maintenance', price: 200 },
    { number: '201', type: 'Standard', floor: 2, status: 'occupied', price: 150, guest: 'Sarah Johnson' },
    { number: '202', type: 'Suite', floor: 2, status: 'available', price: 350 },
    { number: '203', type: 'Deluxe', floor: 2, status: 'occupied', price: 200, guest: 'Mike Brown' },
    { number: '204', type: 'Standard', floor: 2, status: 'available', price: 150 },
    { number: '301', type: 'Suite', floor: 3, status: 'occupied', price: 350, guest: 'Emily Davis' },
    { number: '302', type: 'Standard', floor: 3, status: 'available', price: 150 },
    { number: '303', type: 'Deluxe', floor: 3, status: 'available', price: 200 },
    { number: '304', type: 'Suite', floor: 3, status: 'dirty', price: 350 },
  ];

  // Timeline data (14 days)
  const days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(2025, 9, 9 + i); // October 9, 2025 + i days
    return {
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  // Simulated booking data for timeline
  const getBookingStatus = (roomNumber: string, dayIndex: number) => {
    const bookings: Record<string, number[]> = {
      '101': [0, 1, 2, 3],
      '102': [5, 6, 7, 8, 9],
      '103': [2, 3, 4, 5, 6, 7],
      '201': [1, 2],
      '202': [8, 9, 10, 11, 12, 13],
      '203': [0, 1, 2],
      '301': [4, 5, 6, 7, 8],
      '302': [],
      '303': [10, 11, 12, 13],
      '304': [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
    return bookings[roomNumber]?.includes(dayIndex);
  };

  // Check-in/out data
  const fitArrivals = [
    {
      id: 'RES001',
      guest: 'John Smith',
      email: 'john@email.com',
      phone: '+66 81-234-5678',
      room: '101',
      roomType: 'Standard',
      time: '2:00 PM',
      status: 'pending',
      nights: 3,
      amount: '$450.00',
      deposit: '$150.00',
    },
    {
      id: 'RES004',
      guest: 'Emily Davis',
      email: 'emily@email.com',
      phone: '+66 84-567-8901',
      room: '112',
      roomType: 'Deluxe',
      time: '4:00 PM',
      status: 'pending',
      nights: 6,
      amount: '$900.00',
      deposit: '$300.00',
    },
  ];

  const fitDepartures = [
    {
      id: 'RES003',
      guest: 'Mike Brown',
      room: '310',
      roomType: 'Standard',
      time: '11:00 AM',
      status: 'pending',
      balance: '$0.00',
      nights: 2,
    },
    {
      id: 'RES005',
      guest: 'Robert Wilson',
      room: '203',
      roomType: 'Deluxe',
      time: '10:30 AM',
      status: 'completed',
      balance: '$0.00',
      nights: 2,
    },
  ];

  // Group reservations
  const groupArrivals = [
    {
      id: 'GRP001',
      groupName: 'Corporate Event - Tech Summit',
      groupCode: 'TECH2025',
      coordinator: 'Michael Chen',
      email: 'michael@techsummit.com',
      phone: '+66 85-123-4567',
      rooms: 15,
      status: 'pending',
      checkIn: '10/15/2025',
      time: '3:00 PM',
    },
  ];

  // In-house guests
  const inHouseGuests = [
    {
      id: 'RES102',
      guest: 'Sarah Johnson',
      room: '205',
      roomType: 'Suite',
      checkIn: '10/08/2025',
      checkOut: '10/12/2025',
      nights: 4,
      status: 'in-house',
      balance: '$340.00',
    },
    {
      id: 'RES103',
      guest: 'David Lee',
      room: '301',
      roomType: 'Suite',
      checkIn: '10/07/2025',
      checkOut: '10/11/2025',
      nights: 4,
      status: 'in-house',
      balance: '$0.00',
    },
  ];


  // Unified status badge color (same as dashboard/reservation)
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
      case 'in-house':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'confirmed':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'checked-out':
        return 'bg-slate-100 text-slate-700 border border-slate-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'no-show':
        return 'bg-pink-100 text-pink-700 border border-pink-200';
      case 'reserved':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'dirty':
        return 'bg-slate-100 text-slate-700 border border-slate-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  // Unified room status color for card header
  // const getRoomStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'available':
  //       return 'from-green-500 to-emerald-500';
  //     case 'occupied':
  //     case 'in-house':
  //       return 'from-blue-500 to-indigo-500';
  //     case 'confirmed':
  //       return 'from-green-500 to-green-600';
  //     case 'pending':
  //       return 'from-amber-500 to-orange-500';
  //     case 'checked-out':
  //       return 'from-slate-400 to-slate-500';
  //     case 'cancelled':
  //       return 'from-red-500 to-red-600';
  //     case 'no-show':
  //       return 'from-pink-500 to-pink-600';
  //     case 'reserved':
  //       return 'from-purple-500 to-purple-600';
  //     case 'maintenance':
  //       return 'from-amber-500 to-orange-500';
  //     case 'dirty':
  //       return 'from-slate-400 to-slate-500';
  //     default:
  //       return 'from-gray-400 to-gray-500';
  //   }
  // };

  const handleCheckIn = (reservationId: string) => {
    toast.success(`Guest checked in successfully - ${reservationId}`);
  };

  const handleCheckOut = (reservationId: string) => {
    toast.success(`Guest checked out successfully - ${reservationId}`);
  };

  const handlePrintRegistration = () => {
    toast.success('Registration card sent to printer');
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border border-border overflow-hidden">
        <CardHeader className="border-b bg-accent/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Front Desk Operations
              </CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">
                Manage room timeline, check-in/out, and in-house guests
              </p>
            </div>
            <Button
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => setWalkInDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Walk-in
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-muted dark:bg-secondary/10 mb-6">
              <TabsTrigger
                value="room-chart"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Room Chart
              </TabsTrigger>
              <TabsTrigger
                value="fit-checkin"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <UserCheck className="mr-2 h-4 w-4" />
                FIT C/I-O
              </TabsTrigger>
              <TabsTrigger
                value="group-checkin"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="mr-2 h-4 w-4" />
                Group C/I-O
              </TabsTrigger>
              <TabsTrigger
                value="registration"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="mr-2 h-4 w-4" />
                Registration
              </TabsTrigger>
              <TabsTrigger
                value="in-house"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Home className="mr-2 h-4 w-4" />
                In-House
              </TabsTrigger>
              <TabsTrigger
                value="floor-plan"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Floor Plan
              </TabsTrigger>
            </TabsList>

            {/* Room Chart Tab */}
            <TabsContent value="room-chart" className="space-y-4">
              {/* Legend & Controls */}
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm" />
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-gradient-to-r from-indigo-500 to-violet-500 shadow-sm" />
                    <span className="text-sm">Occupied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm" />
                    <span className="text-sm">Maintenance</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-indigo-200 hover:bg-indigo-50">
                    <ChevronLeft className="h-4 w-4 text-indigo-600" />
                  </Button>
                  <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent px-4">
                    October 2025
                  </span>
                  <Button variant="outline" size="sm" className="border-indigo-200 hover:bg-indigo-50">
                    <ChevronRight className="h-4 w-4 text-indigo-600" />
                  </Button>
                </div>
              </div>

              {/* Timeline Grid */}
              <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
                <div className="min-w-[1200px]">
                  {/* Header Row */}
                  <div className="flex border-b bg-accent/10">
                    <div className="w-32 shrink-0 border-r border-border p-3">
                      <span className="text-indigo-900">Room</span>
                    </div>
                    <div className="flex flex-1">
                      {days.map((day, i) => (
                        <div
                          key={i}
                          className="flex flex-1 flex-col items-center border-r border-border p-2 last:border-r-0"
                        >
                          <span className="text-muted-foreground text-xs">{day.weekday}</span>
                          <span className="text-sm text-indigo-900">{day.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Room Rows */}
                  {rooms.slice(0, 8).map((room) => (
                    <div key={room.number} className="flex border-b border-border last:border-b-0 hover:bg-accent/20 transition-colors">
                      <div className="w-32 shrink-0 space-y-1 border-r border-border bg-accent/10 p-3">
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-indigo-500" />
                          <span className="text-foreground">{room.number}</span>
                        </div>
                        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-xs">
                          {room.type}
                        </Badge>
                        <div className="text-xs text-muted-foreground">${room.price}/night</div>
                      </div>
                      <div className="flex flex-1">
                        {days.map((_, dayIndex) => {
                          const isOccupied = getBookingStatus(room.number, dayIndex);
                          return (
                            <div
                              key={dayIndex}
                              className={`flex-1 border-r border-border p-2 last:border-r-0 cursor-pointer transition-all hover:scale-105 hover:shadow-inner ${
                                isOccupied
                                  ? 'bg-blue-50'
                                  : 'bg-green-50'
                              }`}
                              title={isOccupied ? 'Occupied' : 'Available - Click to book'}
                              onClick={() => {
                                if (!isOccupied) {
                                  setWalkInDialogOpen(true);
                                  toast.info(`Selected Room ${room.number} for ${days[dayIndex].fullDate}`);
                                }
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="border-primary/30">
                  <Plus className="mr-2 h-4 w-4 text-primary" />
                  New Reservation
                </Button>
                <Button variant="outline" className="border-primary/30">
                  <Filter className="mr-2 h-4 w-4 text-primary" />
                  Filter Rooms
                </Button>
                <Button variant="outline" className="border-primary/30">
                  <Download className="mr-2 h-4 w-4 text-primary" />
                  Export Timeline
                </Button>
              </div>
            </TabsContent>

            {/* FIT Check-in/Check-out Tab */}
            <TabsContent value="fit-checkin" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border border-primary/20 bg-primary/10 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">Expected Arrivals</p>
                        <p className="text-2xl">12</p>
                      </div>
                      <div className="rounded-lg bg-primary/20 p-2">
                        <UserCheck className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-accent/20 bg-accent/10 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">Completed Check-ins</p>
                        <p className="text-2xl">5</p>
                      </div>
                      <div className="rounded-lg bg-accent/20 p-2">
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-amber-200 bg-amber-50 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">Expected Departures</p>
                        <p className="text-2xl">8</p>
                      </div>
                      <div className="rounded-lg bg-amber-100 p-2">
                        <UserX className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-pink-200 bg-pink-50 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">Completed Check-outs</p>
                        <p className="text-2xl">2</p>
                      </div>
                      <div className="rounded-lg bg-pink-100 p-2">
                        <Clock className="h-6 w-6 text-pink-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Arrivals & Departures */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Arrivals */}
                <Card className="shadow-md border-indigo-100">
                  <CardHeader className="bg-primary/10 border-b border-primary/20">
                    <CardTitle className="text-primary flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-primary" />
                      Today&apos;s Arrivals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {fitArrivals.map((arrival) => (
                      <div
                        key={arrival.id}
                        className="p-4 rounded-lg border border-primary/20 bg-primary/10 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-foreground">{arrival.guest}</span>
                              <Badge variant="outline" className="border-indigo-300 bg-white text-indigo-700">
                                {arrival.id}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {arrival.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {arrival.phone}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 mb-3 text-sm">
                          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                            <Bed className="h-3 w-3 mr-1" />
                            {arrival.room}
                          </Badge>
                          <span className="text-muted-foreground">{arrival.roomType}</span>
                          <span className="text-muted-foreground">{arrival.nights}N</span>
                          <span className="text-amber-600">
                            {arrival.amount}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/80"
                            onClick={() => handleCheckIn(arrival.id)}
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Check In
                          </Button>
                          <Button variant="outline" size="sm" className="border-indigo-200 hover:bg-indigo-50">
                            <Eye className="h-4 w-4 text-indigo-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Departures */}
                <Card className="shadow-md border border-amber-200 bg-amber-50">
                  <CardHeader className="bg-amber-50 border-b border-amber-200">
                    <CardTitle className="text-amber-600 flex items-center gap-2">
                      <UserX className="h-5 w-5 text-amber-600" />
                      Today&apos;s Departures
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    {fitDepartures.map((departure) => (
                      <div
                        key={departure.id}
                        className="p-4 rounded-lg border border-amber-200 bg-amber-50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-foreground">{departure.guest}</span>
                              <Badge variant="outline" className="border-indigo-300 bg-white text-indigo-700">
                                {departure.id}
                              </Badge>
                              {departure.status === 'completed' && (
                                <Badge className="bg-primary/10 text-primary border border-primary/30">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Done
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 mb-3 text-sm">
                          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                            <Bed className="h-3 w-3 mr-1" />
                            {departure.room}
                          </Badge>
                          <span className="text-muted-foreground">{departure.roomType}</span>
                          <span className="text-muted-foreground">{departure.nights}N</span>
                          <span className="text-emerald-600">Balance: {departure.balance}</span>
                        </div>
                        {departure.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-amber-600 text-white hover:bg-amber-700"
                              onClick={() => handleCheckOut(departure.id)}
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Check Out
                            </Button>
                            <Button variant="outline" size="sm" className="border-indigo-200 hover:bg-indigo-50">
                              <CreditCard className="h-4 w-4 text-indigo-600" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Group Check-in/Check-out Tab */}
            <TabsContent value="group-checkin" className="space-y-6">
              <Card className="shadow-md border border-accent/20 bg-accent/10">
                <CardHeader className="bg-accent/10 border-b border-accent/20">
                  <CardTitle className="text-accent flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Group Arrivals & Departures
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {groupArrivals.map((group) => (
                    <div
                      key={group.id}
                      className="p-6 rounded-xl border border-accent/20 bg-accent/10 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-accent">
                              {group.groupName}
                            </h3>
                            <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
                              {group.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-indigo-500" />
                              <span>Group Code: <span className="text-indigo-600">{group.groupCode}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-violet-500" />
                              <span>Coordinator: {group.coordinator}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {group.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {group.phone}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-white border border-accent/20">
                          <Label className="text-xs text-muted-foreground">Total Rooms</Label>
                          <p className="text-2xl text-indigo-600">{group.rooms}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-accent/20">
                          <Label className="text-xs text-muted-foreground">Check-in Date</Label>
                          <p className="text-sm mt-1">{group.checkIn}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-white border border-amber-200">
                          <Label className="text-xs text-muted-foreground">Expected Time</Label>
                          <p className="text-sm mt-1">{group.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/80"
                          onClick={() => toast.success(`Group ${group.groupCode} checked in`)}
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          Check In Group
                        </Button>
                        <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50">
                          <FileText className="mr-2 h-4 w-4 text-indigo-600" />
                          Rooming List
                        </Button>
                        <Button variant="outline" className="border-violet-200 hover:bg-violet-50">
                          <Eye className="h-4 w-4 text-violet-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Registration Tab */}
            <TabsContent value="registration" className="space-y-4">
              <Card className="shadow-md border border-primary/20 bg-primary/10">
                <CardHeader className="bg-primary/10 border-b border-primary/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-primary flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Guest Registration Cards
                    </CardTitle>
                    <Button
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/20"
                      onClick={() => setRegistrationDialogOpen(true)}
                    >
                      <Printer className="mr-2 h-4 w-4 text-primary" />
                      Print Template
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
                    <Input
                      placeholder="Search by reservation ID or guest name..."
                      className="pl-9 border-indigo-200"
                    />
                  </div>

                  {/* Registration List */}
                  <div className="space-y-3">
                    {fitArrivals.map((guest) => (
                      <div
                        key={guest.id}
                        className="p-4 rounded-lg border border-primary/20 bg-primary/10 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-foreground">{guest.guest}</span>
                              <Badge variant="outline" className="border-indigo-300 bg-white text-indigo-700">
                                {guest.id}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Bed className="h-3 w-3 text-violet-500" />
                                Room {guest.room} - {guest.roomType}
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {guest.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {guest.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-indigo-500" />
                                {guest.nights} nights
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-indigo-200 hover:bg-indigo-50"
                              onClick={() => {
                                setRegistrationDialogOpen(true);
                                toast.info(`Opening registration card for ${guest.guest}`);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4 text-indigo-600" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700"
                              onClick={handlePrintRegistration}
                            >
                              <Printer className="mr-2 h-4 w-4" />
                              Print
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* In-House Tab */}
            <TabsContent value="in-house" className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
                  <Input
                    placeholder="Search in-house guests..."
                    className="pl-9 border-indigo-200"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] border-indigo-200">
                    <SelectValue placeholder="Floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Floors</SelectItem>
                    <SelectItem value="1">Floor 1</SelectItem>
                    <SelectItem value="2">Floor 2</SelectItem>
                    <SelectItem value="3">Floor 3</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] border-indigo-200">
                    <SelectValue placeholder="Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* In-House Table */}
              <div className="rounded-lg border border-border shadow-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-accent/10">
                    <TableRow className="border-border">
                      <TableHead className="text-primary">Reservation ID</TableHead>
                      <TableHead className="text-primary">Guest</TableHead>
                      <TableHead className="text-primary">Room</TableHead>
                      <TableHead className="text-primary">Check-in</TableHead>
                      <TableHead className="text-primary">Check-out</TableHead>
                      <TableHead className="text-primary">Nights</TableHead>
                      <TableHead className="text-primary">Balance</TableHead>
                      <TableHead className="text-right text-primary">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inHouseGuests.map((guest) => (
                      <TableRow key={guest.id} className="border-border hover:bg-accent/20 transition-colors">
                        <TableCell>
                          <span className="text-primary">
                            {guest.id}
                          </span>
                        </TableCell>
                        <TableCell>{guest.guest}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary w-fit">
                              <Bed className="h-3 w-3 mr-1" />
                              {guest.room}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{guest.roomType}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-primary" />
                            {guest.checkIn}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-primary" />
                            {guest.checkOut}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                            {guest.nights}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={guest.balance === '$0.00' ? 'text-primary' : 'text-amber-600'}>
                            {guest.balance}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="sm" className="hover:bg-accent/20" title="View">
                              <Eye className="h-4 w-4 text-primary" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-accent/20" title="Edit">
                              <Edit className="h-4 w-4 text-primary" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-accent/20" title="Folio">
                              <CreditCard className="h-4 w-4 text-primary" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-muted-foreground text-sm">
                  Showing {inHouseGuests.length} of {inHouseGuests.length} in-house guests
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled className="border-indigo-200">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled className="border-indigo-200">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Floor Plan Tab */}
            <TabsContent value="floor-plan" className="space-y-4">
              {/* Floor Selector */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                    Floor 1
                  </Button>
                  <Button variant="outline" className="border-primary/30">
                    Floor 2
                  </Button>
                  <Button variant="outline" className="border-primary/30">
                    Floor 3
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-green-200" />
                    <span className="text-sm">Available ({rooms.filter(r => r.status === 'available').length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-blue-200" />
                    <span className="text-sm">Occupied ({rooms.filter(r => r.status === 'occupied').length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-amber-200" />
                    <span className="text-sm">Maintenance ({rooms.filter(r => r.status === 'maintenance').length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-slate-200" />
                    <span className="text-sm">Dirty ({rooms.filter(r => r.status === 'dirty').length})</span>
                  </div>
                </div>
              </div>

              {/* Floor Plan Grid */}
              <div className="grid grid-cols-4 gap-4">
                {rooms.filter(room => room.floor === 1).map((room) => (
                  <Card
                    key={room.number}
                    className={`cursor-pointer transition-all hover:shadow-xl border-2 ${
                      selectedRoom === room.number ? 'ring-4 ring-indigo-400 shadow-lg' : ''
                    }`}
                    onClick={() => setSelectedRoom(room.number)}
                  >
                    <CardHeader className="bg-accent/10 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bed className="h-5 w-5 text-primary" />
                          <CardTitle className="text-primary">{room.number}</CardTitle>
                        </div>
                        <Badge className="border-primary/30 bg-primary/10 text-primary">
                          {room.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <Badge className={getStatusBadge(room.status)}>
                            {room.status}
                          </Badge>
                        </div>
                        {room.guest && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Guest:</span>
                            <span className="text-sm text-foreground">{room.guest}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Rate:</span>
                          <span className="text-sm bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            ${room.price}/night
                          </span>
                        </div>
                        <div className="flex gap-1 mt-3">
                          <Button variant="outline" size="sm" className="flex-1 border-indigo-200 hover:bg-indigo-50">
                            <Eye className="h-3 w-3 mr-1 text-indigo-600" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 border-violet-200 hover:bg-violet-50">
                            <Settings className="h-3 w-3 mr-1 text-violet-600" />
                            Set
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Walk-in Dialog */}
      <Dialog open={walkInDialogOpen} onOpenChange={setWalkInDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent flex items-center gap-2">
              <Plus className="h-5 w-5 text-indigo-600" />
              Walk-in Guest Registration
            </DialogTitle>
            <DialogDescription>
              Register a new walk-in guest and assign a room
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="walkin-name">Guest Name</Label>
                <Input id="walkin-name" placeholder="John Smith" className="border-indigo-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="walkin-email">Email</Label>
                <Input id="walkin-email" type="email" placeholder="john@email.com" className="border-indigo-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="walkin-phone">Phone</Label>
                <Input id="walkin-phone" placeholder="+66 81-234-5678" className="border-indigo-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="walkin-id">ID/Passport</Label>
                <Input id="walkin-id" placeholder="Passport number" className="border-indigo-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="walkin-room">Room</Label>
                <Select>
                  <SelectTrigger id="walkin-room" className="border-indigo-200">
                    <SelectValue placeholder="Select available room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.filter(r => r.status === 'available').map((room) => (
                      <SelectItem key={room.number} value={room.number}>
                        {room.number} - {room.type} (${room.price}/night)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="walkin-nights">Nights</Label>
                <Input id="walkin-nights" type="number" defaultValue="1" min="1" className="border-indigo-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="walkin-checkin">Check-in Date</Label>
                <Input id="walkin-checkin" type="date" className="border-indigo-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="walkin-adults">Adults</Label>
                <Input id="walkin-adults" type="number" defaultValue="1" min="1" className="border-indigo-200" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="walkin-notes">Notes</Label>
              <Textarea id="walkin-notes" placeholder="Any special requests..." className="border-indigo-200" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWalkInDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700"
              onClick={() => {
                toast.success('Walk-in guest registered and checked in');
                setWalkInDialogOpen(false);
              }}
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Register & Check In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Registration Card Preview Dialog */}
      <Dialog open={registrationDialogOpen} onOpenChange={setRegistrationDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              Guest Registration Card
            </DialogTitle>
          </DialogHeader>
          {/* Registration Card Template */}
          <div className="p-8 bg-white border-2 border-indigo-200 rounded-lg">
            <div className="text-center mb-6 pb-4 border-b-2 border-indigo-100">
              <h2 className="text-2xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-1">
                HotelSys PMS
              </h2>
              <p className="text-sm text-muted-foreground">Guest Registration Card</p>
            </div>

            <div className="space-y-4">
              {/* Guest Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Guest Name</Label>
                  <p className="text-sm mt-1">John Smith</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Reservation ID</Label>
                  <p className="text-sm mt-1">RES001</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p className="text-sm mt-1">john@email.com</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Phone</Label>
                  <p className="text-sm mt-1">+66 81-234-5678</p>
                </div>
              </div>

              <div className="border-t border-indigo-100 pt-4"></div>

              {/* Reservation Details */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Room Number</Label>
                  <p className="text-sm mt-1">101</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Room Type</Label>
                  <p className="text-sm mt-1">Standard</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Rate</Label>
                  <p className="text-sm mt-1">$150/night</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Check-in</Label>
                  <p className="text-sm mt-1">10/07/2025</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Check-out</Label>
                  <p className="text-sm mt-1">10/10/2025</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Nights</Label>
                  <p className="text-sm mt-1">3</p>
                </div>
              </div>

              <div className="border-t border-indigo-100 pt-4"></div>

              {/* Payment Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Total Amount</Label>
                  <p className="text-sm mt-1">$450.00</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Deposit Paid</Label>
                  <p className="text-sm mt-1">$150.00</p>
                </div>
              </div>

              <div className="border-t border-indigo-100 pt-4 mt-6"></div>

              {/* Signature */}
              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-8">Guest Signature</p>
                  <div className="border-b border-gray-300"></div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-8">Date</p>
                  <div className="border-b border-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRegistrationDialogOpen(false)}>
              Close
            </Button>
            <Button
              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700"
              onClick={handlePrintRegistration}
            >
              <Printer className="mr-2 h-4 w-4" />
              Print PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
