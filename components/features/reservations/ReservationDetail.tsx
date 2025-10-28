"use client";

import React,{ useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ArrowLeft, Trash2, Save, X, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface Guest {
  id: string;
  roomType: string;
  roomNumber: string;
  rateCode: string;
  arrivalDate: string;
  departureDate: string;
  nights: number;
  rateAmount: number;
  title: string;
  firstName: string;
  lastName: string;
  guestType: string;
  nationality: string;
  passportNumber: string;
  phone: string;
  email: string;
  paxAdult: number;
  paxChild: number;
}

interface ReservationDetailProps {
  reservationId: string;
  onBack: () => void;
}

export function ReservationDetail({ reservationId, onBack }: ReservationDetailProps) {
  const [activeGuestTab, setActiveGuestTab] = useState('guest1');

  // Mock data - in real app, this would be fetched based on reservationId
  const reservationData = {
    id: 'RES001',
    reservationName: 'John Smith',
    contactPhone: '+66 81-234-5678',
    contactEmail: 'john.smith@email.com',
    bookingSource: 'Direct',
    market: 'Leisure',
    paymentCode: 'Cash',
    remark: 'Early check-in requested',
  };

  const initialGuests: Guest[] = [
    {
      id: 'guest1',
      roomType: 'Standard/Double',
      roomNumber: '101',
      rateCode: 'BAR - Best Available Rate',
      arrivalDate: '2025-10-15',
      departureDate: '2025-10-17',
      nights: 2,
      rateAmount: 1500,
      title: 'Mr',
      firstName: 'John',
      lastName: 'Smith',
      guestType: 'Individual',
      nationality: 'Thai',
      passportNumber: 'AA1234567',
      phone: '+66 81-234-5678',
      email: 'john.smith@email.com',
      paxAdult: 2,
      paxChild: 0,
    },
    {
      id: 'guest2',
      roomType: 'Deluxe/Double',
      roomNumber: '205',
      rateCode: 'BAR - Best Available Rate',
      arrivalDate: '2025-10-15',
      departureDate: '2025-10-17',
      nights: 2,
      rateAmount: 2000,
      title: 'Mrs',
      firstName: 'Jane',
      lastName: 'Doe',
      guestType: 'Individual',
      nationality: 'American',
      passportNumber: 'US9876543',
      phone: '+1 555-1234',
      email: 'jane.doe@email.com',
      paxAdult: 2,
      paxChild: 1,
    },
    {
      id: 'guest3',
      roomType: 'Suite',
      roomNumber: '310',
      rateCode: 'CORP - Corporate Rate',
      arrivalDate: '2025-10-15',
      departureDate: '2025-10-17',
      nights: 2,
      rateAmount: 3500,
      title: 'Dr',
      firstName: 'Michael',
      lastName: 'Brown',
      guestType: 'Corporate',
      nationality: 'British',
      passportNumber: 'GB5432109',
      phone: '+44 20-1234-5678',
      email: 'michael.brown@company.com',
      paxAdult: 1,
      paxChild: 0,
    },
  ];

  const [guests, setGuests] = useState<Guest[]>(initialGuests);

  const handleSave = () => {
    toast.success('Reservation saved successfully');
  };

  const handleRemoveGuest = (guestId: string) => {
    if (guests.length === 1) {
      toast.error('Cannot remove the last guest');
      return;
    }
    
    setGuests(guests.filter(g => g.id !== guestId));
    toast.success('Guest removed from reservation');
    
    // Switch to first guest tab if removing current tab
    if (activeGuestTab === guestId) {
      setActiveGuestTab('guest1');
    }
  };

  const handleAddGuest = () => {
    const newGuestNumber = guests.length + 1;
    const newGuest: Guest = {
      id: `guest${newGuestNumber}`,
      roomType: '',
      roomNumber: '',
      rateCode: '',
      arrivalDate: '',
      departureDate: '',
      nights: 0,
      rateAmount: 0,
      title: 'Mr',
      firstName: '',
      lastName: '',
      guestType: 'Individual',
      nationality: '',
      passportNumber: '',
      phone: '',
      email: '',
      paxAdult: 1,
      paxChild: 0,
    };
    
    setGuests([...guests, newGuest]);
    setActiveGuestTab(`guest${newGuestNumber}`);
    toast.success(`Guest ${newGuestNumber} added`);
  };

  const getGuestLabel = (index: number) => {
    return `Guest ${index + 1}`;
  };

  const isPrimary = (index: number) => {
    return index === 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="border-primary/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <CardTitle className="text-primary">Individual Reservation</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  {reservationData.id}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-sm px-4 py-1">
                {reservationId}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Reservation Info */}
      <Card className="shadow-lg">
        <CardHeader className="bg-accent/30 border-b">
          <CardTitle className="text-primary">Reservation Info</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="reservation-name">Reservation Name</Label>
              <Input
                id="reservation-name"
                defaultValue={reservationData.reservationName}
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Contact Phone</Label>
              <Input
                id="contact-phone"
                defaultValue={reservationData.contactPhone}
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                defaultValue={reservationData.contactEmail}
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-source">Booking Source</Label>
              <Select defaultValue={reservationData.bookingSource}>
                <SelectTrigger id="booking-source" className="bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Direct">Direct</SelectItem>
                  <SelectItem value="OTA">OTA</SelectItem>
                  <SelectItem value="Travel Agent">Travel Agent</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Walk-in">Walk-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="market">Market</Label>
              <Select defaultValue={reservationData.market}>
                <SelectTrigger id="market" className="bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leisure">Leisure</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Group">Group</SelectItem>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-code">Payment Code</Label>
              <Select defaultValue={reservationData.paymentCode}>
                <SelectTrigger id="payment-code" className="bg-muted/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Deposit">Deposit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-3 space-y-2">
              <Label htmlFor="remark">Remark</Label>
              <Textarea
                id="remark"
                defaultValue={reservationData.remark}
                rows={2}
                className="bg-muted/30"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information (Share Room) */}
      <Card className="shadow-lg">
        <CardHeader className="bg-accent/30 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">Guest Information (Share Room)</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddGuest}
              className="border-primary/20"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Guest
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeGuestTab} onValueChange={setActiveGuestTab}>
            <TabsList className="bg-muted flex-wrap h-auto">
              {guests.map((guest, index) => (
                <TabsTrigger
                  key={guest.id}
                  value={guest.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
                >
                  {getGuestLabel(index)}
                  {isPrimary(index) && (
                    <Badge className="bg-secondary text-secondary-foreground border-0 ml-1 px-2 py-0 text-xs">
                      Primary
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {guests.map((guest) => (
              <TabsContent key={guest.id} value={guest.id} className="space-y-6 mt-6">
                {/* Booking Info */}
                <div className="space-y-4">
                  <h3 className="text-foreground">Booking Info</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`room-type-${guest.id}`}>Room Type</Label>
                      <Select defaultValue={guest.roomType || undefined}>
                        <SelectTrigger id={`room-type-${guest.id}`} className="bg-muted/30">
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Standard/Single">Standard/Single</SelectItem>
                          <SelectItem value="Standard/Double">Standard/Double</SelectItem>
                          <SelectItem value="Deluxe/Single">Deluxe/Single</SelectItem>
                          <SelectItem value="Deluxe/Double">Deluxe/Double</SelectItem>
                          <SelectItem value="Suite">Suite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`room-number-${guest.id}`}>Room Number</Label>
                      <Select defaultValue={guest.roomNumber || undefined}>
                        <SelectTrigger id={`room-number-${guest.id}`} className="bg-muted/30">
                          <SelectValue placeholder="Select room" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="101">101</SelectItem>
                          <SelectItem value="102">102</SelectItem>
                          <SelectItem value="103">103</SelectItem>
                          <SelectItem value="201">201</SelectItem>
                          <SelectItem value="202">202</SelectItem>
                          <SelectItem value="203">203</SelectItem>
                          <SelectItem value="204">204</SelectItem>
                          <SelectItem value="205">205</SelectItem>
                          <SelectItem value="301">301</SelectItem>
                          <SelectItem value="302">302</SelectItem>
                          <SelectItem value="303">303</SelectItem>
                          <SelectItem value="304">304</SelectItem>
                          <SelectItem value="310">310</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor={`rate-code-${guest.id}`}>Rate Code</Label>
                      <Select defaultValue={guest.rateCode || undefined}>
                        <SelectTrigger id={`rate-code-${guest.id}`} className="bg-muted/30">
                          <SelectValue placeholder="Select rate code" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BAR - Best Available Rate">BAR - Best Available Rate</SelectItem>
                          <SelectItem value="CORP - Corporate Rate">CORP - Corporate Rate</SelectItem>
                          <SelectItem value="GOV - Government Rate">GOV - Government Rate</SelectItem>
                          <SelectItem value="PKG - Package Rate">PKG - Package Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`arrival-${guest.id}`}>Arrival Date</Label>
                      <Input
                        id={`arrival-${guest.id}`}
                        type="date"
                        defaultValue={guest.arrivalDate}
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`departure-${guest.id}`}>Departure Date</Label>
                      <Input
                        id={`departure-${guest.id}`}
                        type="date"
                        defaultValue={guest.departureDate}
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`nights-${guest.id}`}>Nights</Label>
                      <Input
                        id={`nights-${guest.id}`}
                        type="number"
                        defaultValue={guest.nights}
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`rate-amount-${guest.id}`}>Rate Amount</Label>
                      <Input
                        id={`rate-amount-${guest.id}`}
                        type="number"
                        defaultValue={guest.rateAmount}
                        className="bg-muted/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Info */}
                <div className="space-y-4">
                  <h3 className="text-foreground">Guest Info</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${guest.id}`}>Title</Label>
                      <Select defaultValue={guest.title || undefined}>
                        <SelectTrigger id={`title-${guest.id}`} className="bg-muted/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                          <SelectItem value="Ms">Ms</SelectItem>
                          <SelectItem value="Dr">Dr</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`first-name-${guest.id}`}>First Name</Label>
                      <Input
                        id={`first-name-${guest.id}`}
                        defaultValue={guest.firstName}
                        placeholder="First Name"
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`last-name-${guest.id}`}>Last Name</Label>
                      <Input
                        id={`last-name-${guest.id}`}
                        defaultValue={guest.lastName}
                        placeholder="Last Name"
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`guest-type-${guest.id}`}>Guest Type</Label>
                      <Select defaultValue={guest.guestType || undefined}>
                        <SelectTrigger id={`guest-type-${guest.id}`} className="bg-muted/30">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Group">Group</SelectItem>
                          <SelectItem value="VIP">VIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`nationality-${guest.id}`}>Nationality</Label>
                      <Input
                        id={`nationality-${guest.id}`}
                        defaultValue={guest.nationality}
                        placeholder="Nationality"
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`passport-${guest.id}`}>Passport Number</Label>
                      <Input
                        id={`passport-${guest.id}`}
                        defaultValue={guest.passportNumber}
                        placeholder="Passport Number"
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`phone-${guest.id}`}>Phone</Label>
                      <Input
                        id={`phone-${guest.id}`}
                        defaultValue={guest.phone}
                        placeholder="Phone Number"
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`email-${guest.id}`}>Email</Label>
                      <Input
                        id={`email-${guest.id}`}
                        type="email"
                        defaultValue={guest.email}
                        placeholder="Email Address"
                        className="bg-muted/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`pax-adult-${guest.id}`}>Pax Adult</Label>
                      <Input
                        id={`pax-adult-${guest.id}`}
                        type="number"
                        defaultValue={guest.paxAdult}
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`pax-child-${guest.id}`}>Pax Child</Label>
                      <Input
                        id={`pax-child-${guest.id}`}
                        type="number"
                        defaultValue={guest.paxChild}
                        className="bg-muted/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Remove Guest Button */}
                {guests.length > 1 && (
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveGuest(guest.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Guest
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-muted-foreground/20"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Reservation
        </Button>
      </div>
    </div>
  );
}
