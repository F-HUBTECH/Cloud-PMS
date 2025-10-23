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
  DialogTrigger,
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
  Eye, 
  Edit, 
  Trash2,
  Users,
  UserPlus,
  CreditCard,
  Split,
  Copy,
  X,
  DollarSign,
  Calendar,
  Bed,
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { ReservationDetail } from '@/components/features/reservations/ReservationDetail';

export function ReservationList() {
  const [activeTab, setActiveTab] = useState('individual');
  const [newReservationOpen, setNewReservationOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<string | null>(null);

  const reservations = [
    {
      id: 'RES001',
      guest: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+66 81-234-5678',
      room: '101',
      roomType: 'Deluxe',
      checkIn: '10/07/2025',
      checkOut: '10/10/2025',
      nights: 3,
      status: 'confirmed',
      amount: '$450.00',
      deposit: '$150.00',
      balance: '$300.00',
      type: 'individual',
    },
    {
      id: 'RES002',
      guest: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+66 82-345-6789',
      room: '205',
      roomType: 'Suite',
      checkIn: '10/08/2025',
      checkOut: '10/12/2025',
      nights: 4,
      status: 'pending',
      amount: '$680.00',
      deposit: '$0.00',
      balance: '$680.00',
      type: 'individual',
    },
    {
      id: 'RES003',
      guest: 'Mike Brown',
      email: 'mbrown@email.com',
      phone: '+66 83-456-7890',
      room: '310',
      roomType: 'Standard',
      checkIn: '10/06/2025',
      checkOut: '10/08/2025',
      nights: 2,
      status: 'checked-in',
      amount: '$340.00',
      deposit: '$340.00',
      balance: '$0.00',
      type: 'individual',
    },
  ];

  const groupReservations = [
    {
      id: 'GRP001',
      groupName: 'Corporate Event - Tech Summit 2025',
      groupCode: 'TECH2025',
      coordinator: 'Michael Chen',
      email: 'michael.chen@techsummit.com',
      phone: '+66 85-123-4567',
      checkIn: '10/15/2025',
      checkOut: '10/18/2025',
      nights: 3,
      totalRooms: 15,
      status: 'confirmed',
      breakdown: {
        single: 8,
        twin: 5,
        triple: 2,
      },
      totalAmount: '$6,750.00',
    },
    {
      id: 'GRP002',
      groupName: 'Wedding Party - Smith & Jones',
      groupCode: 'WED001',
      coordinator: 'Jennifer Smith',
      email: 'jenny.smith@email.com',
      phone: '+66 86-234-5678',
      checkIn: '10/20/2025',
      checkOut: '10/22/2025',
      nights: 2,
      totalRooms: 10,
      status: 'pending',
      breakdown: {
        single: 2,
        twin: 6,
        triple: 2,
      },
      totalAmount: '$3,400.00',
    },
  ];

  // ปรับ badge status ให้ใช้โทนเดียวกับ dashboard
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
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
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const handleDeposit = (type: 'payment' | 'refund') => {
    toast.success(`Deposit ${type} processed successfully`);
    setDepositDialogOpen(false);
  };

  const handleSplitBooking = () => {
    toast.success('Booking split successfully');
    setSplitDialogOpen(false);
  };

  // Show detail view if a reservation is selected
  if (selectedReservation) {
    return (
      <ReservationDetail
        reservationId={selectedReservation}
        onBack={() => setSelectedReservation(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="border-b bg-accent/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-indigo-600 dark:text-indigo-400">
                Reservation Management
              </CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">
                Manage individual and group reservations
              </p>
            </div>
            <Button 
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => setNewReservationOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Reservation
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted dark:bg-secondary/10 mb-6">
              <TabsTrigger 
                value="individual" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <User className="mr-2 h-4 w-4" />
                Individual
              </TabsTrigger>
              <TabsTrigger 
                value="group"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="mr-2 h-4 w-4" />
                Group
              </TabsTrigger>
            </TabsList>

            {/* Individual Reservation Tab */}
            <TabsContent value="individual" className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input 
                    placeholder="Search by guest name, ID..." 
                    className="pl-9" 
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="checked-out">Checked Out</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-accent/10">
                    <TableRow>
                      <TableHead className="text-foreground">Reservation ID</TableHead>
                      <TableHead className="text-foreground">Guest</TableHead>
                      <TableHead className="text-foreground">Room</TableHead>
                      <TableHead className="text-foreground">Check-in</TableHead>
                      <TableHead className="text-foreground">Check-out</TableHead>
                      <TableHead className="text-foreground">Nights</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-foreground">Amount</TableHead>
                      <TableHead className="text-right text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.id} className="hover:bg-accent/20 transition-colors">
                        <TableCell>
                          <span className="text-indigo-600 dark:text-indigo-400">
                            {reservation.id}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-primary" />
                              {reservation.guest}
                            </div>
                            <div className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {reservation.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary w-fit">
                              <Bed className="h-3 w-3 mr-1 text-indigo-600" />
                              {reservation.room}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{reservation.roomType}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-primary" />
                            {reservation.checkIn}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-primary" />
                            {reservation.checkOut}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-secondary/30 bg-secondary/10 text-secondary">
                            {reservation.nights}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(reservation.status)}>
                            {reservation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-secondary">
                              {reservation.amount}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Balance: {reservation.balance}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover:bg-indigo-100" 
                              title="View"
                              onClick={() => setSelectedReservation(reservation.id)}
                            >
                              <Eye className="h-4 w-4 text-indigo-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-secondary/10" title="Edit">
                              <Edit className="h-4 w-4 text-violet-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover:bg-emerald-100"
                              onClick={() => setDepositDialogOpen(true)}
                              title="Deposit"
                            >
                              <CreditCard className="h-4 w-4 text-emerald-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover:bg-violet-100"
                              onClick={() => setSplitDialogOpen(true)}
                              title="Split/Share"
                            >
                              <Split className="h-4 w-4 text-violet-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-secondary/10" title="Copy">
                              <Copy className="h-4 w-4 text-indigo-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-destructive/10" title="Delete">
                              <Trash2 className="h-4 w-4 text-rose-600" />
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
                  Showing {reservations.length} of {reservations.length} reservations
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Group Reservation Tab */}
            <TabsContent value="group" className="space-y-4">
              <div className="flex justify-end mb-4">
                <Button 
                  variant="secondary"
                  onClick={() => setGroupDialogOpen(true)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  New Group
                </Button>
              </div>

              {/* Group Reservations Cards */}
              <div className="grid gap-4">
                {groupReservations.map((group) => (
                  <Card key={group.id} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3 bg-accent/10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-primary">
                              {group.groupName}
                            </CardTitle>
                            <Badge className={getStatusBadge(group.status)}>
                              {group.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-4 w-4 text-primary" />
                              Group Code: <span className="text-primary">{group.groupCode}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4 text-secondary" />
                              {group.coordinator}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                            <Eye className="h-4 w-4 text-primary" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-secondary/10">
                            <Edit className="h-4 w-4 text-secondary" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Left: Dates and Contact */}
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Check-in / Check-out</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4 text-indigo-500" />
                              <span className="text-sm">{group.checkIn} - {group.checkOut}</span>
                            </div>
                            <Badge variant="outline" className="mt-1 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700">
                              {group.nights} nights
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Contact</Label>
                            <div className="space-y-1 mt-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3 text-indigo-500" />
                                <span className="text-xs">{group.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3 text-violet-500" />
                                <span className="text-xs">{group.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Middle: Room Allocation */}
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Room Allocation</Label>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
                              <div className="flex items-center gap-2">
                                <Bed className="h-4 w-4 text-indigo-600" />
                                <span className="text-sm">Single</span>
                              </div>
                              <Badge variant="outline" className="border-indigo-300 bg-white text-indigo-700">
                                {group.breakdown.single}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100">
                              <div className="flex items-center gap-2">
                                <Bed className="h-4 w-4 text-violet-600" />
                                <span className="text-sm">Twin</span>
                              </div>
                              <Badge variant="outline" className="border-violet-300 bg-white text-violet-700">
                                {group.breakdown.twin}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                              <div className="flex items-center gap-2">
                                <Bed className="h-4 w-4 text-purple-600" />
                                <span className="text-sm">Triple</span>
                              </div>
                              <Badge variant="outline" className="border-purple-300 bg-white text-purple-700">
                                {group.breakdown.triple}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Right: Summary */}
                        <div className="space-y-3">
                          <div className="p-4 rounded-xl bg-indigo-50 text-indigo-700 shadow-lg">
                            <Label className="text-xs text-indigo-600 block mb-1">Total Rooms</Label>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-5 w-5 text-indigo-500" />
                              <span className="text-2xl font-bold">{group.totalRooms}</span>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-rose-50 text-rose-700 shadow-lg">
                            <Label className="text-xs text-rose-600 block mb-1">Total Amount</Label>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-5 w-5 text-rose-500" />
                              <span className="text-2xl font-bold">{group.totalAmount}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4 pt-4 border-t border-indigo-100">
                        <Button variant="outline" size="sm" className="border-indigo-200 hover:bg-indigo-50">
                          <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                          Rooming List
                        </Button>
                        <Button variant="outline" size="sm" className="border-violet-200 hover:bg-violet-50">
                          <Split className="h-4 w-4 mr-2 text-violet-600" />
                          Split Room
                        </Button>
                        <Button variant="outline" size="sm" className="border-amber-200 hover:bg-amber-50">
                          <Edit className="h-4 w-4 mr-2 text-amber-600" />
                          Update Allocation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* New Reservation Dialog */}
      <Dialog open={newReservationOpen} onOpenChange={setNewReservationOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              New Reservation
            </DialogTitle>
            <DialogDescription>
              Create a new individual reservation with guest and room information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Guest Information */}
            <div className="space-y-4">
              <h3 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-600" />
                Guest Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Guest Name</Label>
                  <Input id="guest-name" placeholder="John Smith" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-email">Email</Label>
                  <Input id="guest-email" type="email" placeholder="john@email.com" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-phone">Phone</Label>
                  <Input id="guest-phone" placeholder="+66 81-234-5678" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest-nationality">Nationality</Label>
                  <Input id="guest-nationality" placeholder="Thai" className="border-indigo-200" />
                </div>
              </div>
            </div>

            {/* Room Information */}
            <div className="space-y-4">
              <h3 className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <Bed className="h-5 w-5 text-violet-600" />
                Room Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="room-type">Room Type</Label>
                  <Select>
                    <SelectTrigger id="room-type" className="border-indigo-200">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-number">Room Number</Label>
                  <Select>
                    <SelectTrigger id="room-number" className="border-indigo-200">
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="101">101</SelectItem>
                      <SelectItem value="102">102</SelectItem>
                      <SelectItem value="201">201</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check-in">Check-in Date</Label>
                  <Input id="check-in" type="date" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check-out">Check-out Date</Label>
                  <Input id="check-out" type="date" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adults">Adults</Label>
                  <Input id="adults" type="number" defaultValue="1" min="1" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="children">Children</Label>
                  <Input id="children" type="number" defaultValue="0" min="0" className="border-indigo-200" />
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="space-y-4">
              <h3 className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Additional Services
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="breakfast" className="rounded border-indigo-300" />
                  <Label htmlFor="breakfast">Breakfast</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="airport-pickup" className="rounded border-indigo-300" />
                  <Label htmlFor="airport-pickup">Airport Pickup</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="late-checkout" className="rounded border-indigo-300" />
                  <Label htmlFor="late-checkout">Late Checkout</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="extra-bed" className="rounded border-indigo-300" />
                  <Label htmlFor="extra-bed">Extra Bed</Label>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="special-requests">Special Requests</Label>
              <Textarea 
                id="special-requests" 
                placeholder="Any special requests or notes..." 
                className="border-indigo-200"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewReservationOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700"
              onClick={() => {
                toast.success('Reservation created successfully');
                setNewReservationOpen(false);
              }}
            >
              Create Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deposit Dialog */}
      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-emerald-600" />
              Deposit Management
            </DialogTitle>
            <DialogDescription>
              Process deposit payment or refund for reservation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">Reservation ID</Label>
                  <p>RES001</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Guest</Label>
                  <p>John Smith</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Total Amount</Label>
                  <p className="text-indigo-600">$450.00</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Current Deposit</Label>
                  <p className="text-emerald-600">$150.00</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit-type">Transaction Type</Label>
              <Select defaultValue="payment">
                <SelectTrigger id="deposit-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount</Label>
              <Input id="deposit-amount" type="number" placeholder="0.00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deposit-note">Note</Label>
              <Textarea id="deposit-note" placeholder="Optional note..." rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDepositDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
              onClick={() => handleDeposit('payment')}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Process
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Split/Share Dialog */}
      <Dialog open={splitDialogOpen} onOpenChange={setSplitDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <Split className="h-5 w-5 text-violet-600" />
              Split / Share Room
            </DialogTitle>
            <DialogDescription>
              Split booking or share room with family members
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <Label className="text-xs text-muted-foreground">Reservation ID</Label>
                  <p>RES001</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Room</Label>
                  <p>101 - Deluxe</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Nights</Label>
                  <p>3 nights</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="split" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="split">Split Booking</TabsTrigger>
                <TabsTrigger value="share">Share Room</TabsTrigger>
              </TabsList>
              
              <TabsContent value="split" className="space-y-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  Split this reservation into multiple bookings
                </p>
                <div className="space-y-2">
                  <Label>Split Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select split method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dates">Split by Dates</SelectItem>
                      <SelectItem value="rooms">Split by Rooms</SelectItem>
                      <SelectItem value="guests">Split by Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>New Room for Second Guest</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="102">102</SelectItem>
                      <SelectItem value="103">103</SelectItem>
                      <SelectItem value="201">201</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="share" className="space-y-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  Add family members or additional guests to share this room
                </p>
                <div className="space-y-2">
                  <Label>Additional Guest Name</Label>
                  <Input placeholder="Enter guest name" />
                </div>
                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="extra-charge" className="rounded border-violet-300" />
                  <Label htmlFor="extra-charge">Apply extra guest charge</Label>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSplitDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
              onClick={handleSplitBooking}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Group Dialog */}
      <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-600" />
              New Group Reservation
            </DialogTitle>
            <DialogDescription>
              Create a new group reservation with master information and room allocation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Group Master Info */}
            <div className="space-y-4">
              <h3 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Group Master Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group-name">Group Name</Label>
                  <Input id="group-name" placeholder="Corporate Event - Tech Summit 2025" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group-code">Group Code</Label>
                  <Input id="group-code" placeholder="TECH2025" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coordinator">Coordinator Name</Label>
                  <Input id="coordinator" placeholder="Michael Chen" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coordinator-email">Email</Label>
                  <Input id="coordinator-email" type="email" placeholder="coordinator@email.com" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coordinator-phone">Phone</Label>
                  <Input id="coordinator-phone" placeholder="+66 85-123-4567" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input id="company" placeholder="Tech Summit Inc." className="border-indigo-200" />
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h3 className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Stay Dates
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group-checkin">Check-in Date</Label>
                  <Input id="group-checkin" type="date" className="border-indigo-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group-checkout">Check-out Date</Label>
                  <Input id="group-checkout" type="date" className="border-indigo-200" />
                </div>
              </div>
            </div>

            {/* Room Allocation */}
            <div className="space-y-4">
              <h3 className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Room Allocation
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="single-rooms">Single Rooms</Label>
                  <Input id="single-rooms" type="number" defaultValue="0" min="0" className="border-indigo-200" />
                  <p className="text-xs text-muted-foreground">1 guest per room</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twin-rooms">Twin Rooms</Label>
                  <Input id="twin-rooms" type="number" defaultValue="0" min="0" className="border-indigo-200" />
                  <p className="text-xs text-muted-foreground">2 guests per room</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="triple-rooms">Triple Rooms</Label>
                  <Input id="triple-rooms" type="number" defaultValue="0" min="0" className="border-indigo-200" />
                  <p className="text-xs text-muted-foreground">3 guests per room</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Rooms:</span>
                  <span className="text-lg bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    0
                  </span>
                </div>
              </div>
            </div>

            {/* Special Requirements */}
            <div className="space-y-2">
              <Label htmlFor="group-notes">Special Requirements / Notes</Label>
              <Textarea 
                id="group-notes" 
                placeholder="Any special requirements for the group..." 
                className="border-indigo-200"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGroupDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700"
              onClick={() => {
                toast.success('Group reservation created successfully');
                setGroupDialogOpen(false);
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}