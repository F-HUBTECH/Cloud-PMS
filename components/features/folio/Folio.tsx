import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Separator } from '@/components/ui/separator';
import { Search, Plus, FileText, CreditCard, Printer, Send } from 'lucide-react';

export function Folio() {
  const folioCharges = [
    {
      id: 1,
      date: '10/06/2025',
      description: 'Room Charge - Night 1',
      category: 'Accommodation',
      amount: 150.0,
    },
    {
      id: 2,
      date: '10/07/2025',
      description: 'Room Charge - Night 2',
      category: 'Accommodation',
      amount: 150.0,
    },
    {
      id: 3,
      date: '10/06/2025',
      description: 'Restaurant - Dinner',
      category: 'Food & Beverage',
      amount: 45.5,
    },
    {
      id: 4,
      date: '10/07/2025',
      description: 'Mini Bar',
      category: 'Food & Beverage',
      amount: 18.0,
    },
    {
      id: 5,
      date: '10/06/2025',
      description: 'Laundry Service',
      category: 'Services',
      amount: 25.0,
    },
    {
      id: 6,
      date: '10/07/2025',
      description: 'Spa Treatment',
      category: 'Services',
      amount: 85.0,
    },
  ];

  const payments = [
    {
      id: 1,
      date: '10/06/2025',
      method: 'Credit Card',
      reference: '****1234',
      amount: 200.0,
    },
  ];

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Accommodation':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Food & Beverage':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'Services':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const subtotal = folioCharges.reduce((sum, charge) => sum + charge.amount, 0);
  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  const balance = total - totalPayments;

  return (
    <div className="space-y-6">
      {/* Guest Selection */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Guest Folio & Billing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by guest name, room, or reservation ID..."
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="hover:bg-indigo-50 hover:border-indigo-300">Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Guest Information</CardTitle>
            <Badge className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm">Room 310</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-muted-foreground text-sm">Guest Name</p>
              <p>Mike Brown</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Reservation ID</p>
              <p>RES003</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Check-in Date</p>
              <p>10/06/2025</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Check-out Date</p>
              <p>10/08/2025</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Room Type</p>
              <p>Suite</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Status</p>
              <Badge className="bg-blue-100 text-blue-700 border border-blue-200">Checked In</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Charges & Transactions */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Charges</CardTitle>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Charge
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {folioCharges.map((charge) => (
                      <TableRow key={charge.id}>
                        <TableCell>{charge.date}</TableCell>
                        <TableCell>{charge.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getCategoryBadge(charge.category)}
                          >
                            {charge.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          ${charge.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Payments</CardTitle>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Record Payment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{payment.reference}</TableCell>
                        <TableCell className="text-right">
                          ${payment.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total Charges</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Payments</span>
                  <span className="text-green-600">-${totalPayments.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span>Balance Due</span>
                  <span className={balance > 0 ? 'text-red-600' : 'text-green-600'}>
                    ${balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Payment Method</Label>
                <Select defaultValue="credit">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="debit">Debit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  defaultValue={balance.toFixed(2)}
                />
              </div>
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Process Payment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View Full Folio
              </Button>
              <Button variant="outline" className="w-full">
                <Printer className="mr-2 h-4 w-4" />
                Print Invoice
              </Button>
              <Button variant="outline" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Email to Guest
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}