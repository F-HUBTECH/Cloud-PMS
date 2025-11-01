"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2, TrendingUp, Users, Tag, Search, PieChart } from 'lucide-react';
import { toast } from 'sonner';

interface Market {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  discount: number;
  status: string;
  bookingCount: number;
}

export function MarketSettings() {
  const [markets, setMarkets] = useState<Market[]>([
    {
      id: '1',
      code: 'CORP',
      name: 'Corporate',
      category: 'Business',
      description: 'Corporate clients and business travelers',
      discount: 10,
      status: 'Active',
      bookingCount: 245,
    },
    {
      id: '2',
      code: 'LEIS',
      name: 'Leisure',
      category: 'Individual',
      description: 'Individual travelers and tourists',
      discount: 0,
      status: 'Active',
      bookingCount: 532,
    },
    {
      id: '3',
      code: 'GRP',
      name: 'Group',
      category: 'Group',
      description: 'Group bookings and events',
      discount: 15,
      status: 'Active',
      bookingCount: 87,
    },
    {
      id: '4',
      code: 'GOV',
      name: 'Government',
      category: 'Business',
      description: 'Government officials and agencies',
      discount: 20,
      status: 'Active',
      bookingCount: 43,
    },
    {
      id: '5',
      code: 'WHO',
      name: 'Wholesale',
      category: 'Business',
      description: 'Travel agencies and wholesalers',
      discount: 25,
      status: 'Active',
      bookingCount: 156,
    },
    {
      id: '6',
      code: 'PROM',
      name: 'Promotion',
      category: 'Special',
      description: 'Special promotional rates',
      discount: 30,
      status: 'Inactive',
      bookingCount: 12,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMarket, setEditingMarket] = useState<Market | null>(null);
  const [marketToDelete, setMarketToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'Business',
    description: '',
    discount: 0,
    status: 'Active',
  });

  const categories = ['Business', 'Individual', 'Group', 'Special'];
  const statuses = ['Active', 'Inactive'];

  const getCategoryColor = (category: string) => {
    const categoryMap: Record<string, { bg: string; text: string; border: string }> = {
      Business: {
        bg: 'bg-[#dbeafe]',
        text: 'text-[#1e40af]',
        border: 'border-[#93c5fd]',
      },
      Individual: {
        bg: 'bg-[#dcfce7]',
        text: 'text-[#15803d]',
        border: 'border-[#86efac]',
      },
      Group: {
        bg: 'bg-[#fae8ff]',
        text: 'text-[#a21caf]',
        border: 'border-[#f0abfc]',
      },
      Special: {
        bg: 'bg-[#fff7ed]',
        text: 'text-[#c2410c]',
        border: 'border-[#fed7aa]',
      },
    };
    return categoryMap[category] || categoryMap.Business;
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; border: string }> = {
      Active: {
        bg: 'bg-[#dcfce7]',
        text: 'text-[#15803d]',
        border: 'border-[#86efac]',
      },
      Inactive: {
        bg: 'bg-[#f1f5f9]',
        text: 'text-[#475569]',
        border: 'border-[#cbd5e1]',
      },
    };
    return statusMap[status] || statusMap.Active;
  };

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch =
      market.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || market.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || market.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenDialog = (market?: Market) => {
    if (market) {
      setEditingMarket(market);
      setFormData({
        code: market.code,
        name: market.name,
        category: market.category,
        description: market.description,
        discount: market.discount,
        status: market.status,
      });
    } else {
      setEditingMarket(null);
      setFormData({
        code: '',
        name: '',
        category: 'Business',
        description: '',
        discount: 0,
        status: 'Active',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingMarket(null);
  };

  const handleSubmit = () => {
    if (!formData.code || !formData.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    const marketData: Market = {
      id: editingMarket?.id || String(Date.now()),
      code: formData.code,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      discount: formData.discount,
      status: formData.status,
      bookingCount: editingMarket?.bookingCount || 0,
    };

    if (editingMarket) {
      setMarkets(markets.map((m) => (m.id === editingMarket.id ? marketData : m)));
      toast.success('Market segment updated successfully');
    } else {
      setMarkets([...markets, marketData]);
      toast.success('Market segment added successfully');
    }

    handleCloseDialog();
  };

  const handleDeleteClick = (id: string) => {
    setMarketToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (marketToDelete) {
      setMarkets(markets.filter((m) => m.id !== marketToDelete));
      toast.success('Market segment deleted successfully');
      setMarketToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const totalBookings = markets.reduce((acc, m) => acc + m.bookingCount, 0);
  const activeMarkets = markets.filter((m) => m.status === 'Active').length;
  const avgDiscount = markets.reduce((acc, m) => acc + m.discount, 0) / markets.length || 0;

  const stats = [
    {
      title: 'Total Segments',
      value: markets.length,
      subtext: 'Market segments',
      icon: PieChart,
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    },
    {
      title: 'Active',
      value: activeMarkets,
      subtext: 'Currently active',
      icon: Tag,
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      title: 'Total Bookings',
      value: totalBookings.toLocaleString(),
      subtext: 'All segments',
      icon: Users,
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
    {
      title: 'Avg. Discount',
      value: `${avgDiscount.toFixed(1)}%`,
      subtext: 'Average discount rate',
      icon: TrendingUp,
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`border-0 shadow-lg ${stat.bg}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="mt-2 text-primary">{stat.value}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.subtext}</p>
                  </div>
                  <div className={`rounded-xl p-3 shadow-md ${stat.iconBg}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div> */}

      {/* Market Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Market Segment Management</CardTitle>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Segment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by code or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Markets Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMarkets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No market segments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMarkets.map((market) => (
                    <TableRow key={market.id}>
                      <TableCell className="font-medium">{market.code}</TableCell>
                      <TableCell>{market.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getCategoryColor(market.category).bg} ${
                            getCategoryColor(market.category).text
                          } ${getCategoryColor(market.category).border}`}
                        >
                          {market.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {market.description}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-muted/50">
                          {market.discount}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(market.status).bg} ${
                            getStatusColor(market.status).text
                          } ${getStatusColor(market.status).border}`}
                        >
                          {market.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{market.bookingCount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(market)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(market.id)}
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingMarket ? 'Edit Market Segment' : 'Add New Market Segment'}
            </DialogTitle>
            <DialogDescription>
              Please fill in all the market segment details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  placeholder="CORP"
                  maxLength={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Corporate"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Default Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter market segment description..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingMarket ? 'Save Changes' : 'Add Segment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Market Segment Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this market segment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Segment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
