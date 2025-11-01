"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Plus, Edit, Trash2, Bed, Users, DollarSign, Search, DoorOpen } from 'lucide-react';
import { toast } from 'sonner';

interface Room {
  id: string;
  number: string;
  floor: string;
  type: string;
  status: string;
  capacity: number;
  price: number;
  features: string[];
}

export function RoomSettings() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      number: '101',
      floor: '1',
      type: 'Standard',
      status: 'Available',
      capacity: 2,
      price: 1500,
      features: ['Wi-Fi', 'TV', 'Air Conditioning'],
    },
    {
      id: '2',
      number: '102',
      floor: '1',
      type: 'Standard',
      status: 'Occupied',
      capacity: 2,
      price: 1500,
      features: ['Wi-Fi', 'TV', 'Air Conditioning'],
    },
    {
      id: '3',
      number: '201',
      floor: '2',
      type: 'Deluxe',
      status: 'Available',
      capacity: 3,
      price: 2500,
      features: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View'],
    },
    {
      id: '4',
      number: '202',
      floor: '2',
      type: 'Deluxe',
      status: 'Maintenance',
      capacity: 3,
      price: 2500,
      features: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View'],
    },
    {
      id: '5',
      number: '301',
      floor: '3',
      type: 'Suite',
      status: 'Available',
      capacity: 4,
      price: 4500,
      features: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View', 'Jacuzzi', 'Living Room'],
    },
    {
      id: '6',
      number: '302',
      floor: '3',
      type: 'Suite',
      status: 'Reserved',
      capacity: 4,
      price: 4500,
      features: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View', 'Jacuzzi', 'Living Room'],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    number: '',
    floor: '',
    type: 'Standard',
    status: 'Available',
    capacity: 2,
    price: 0,
    features: '',
  });

  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Presidential'];
  const roomStatuses = ['Available', 'Occupied', 'Maintenance', 'Reserved', 'Cleaning'];

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; border: string }> = {
      Available: {
        bg: 'bg-[#dcfce7]',
        text: 'text-[#15803d]',
        border: 'border-[#86efac]',
      },
      Occupied: {
        bg: 'bg-[#dbeafe]',
        text: 'text-[#1e40af]',
        border: 'border-[#93c5fd]',
      },
      Maintenance: {
        bg: 'bg-[#fee2e2]',
        text: 'text-[#b91c1c]',
        border: 'border-[#fecaca]',
      },
      Reserved: {
        bg: 'bg-[#fef3c7]',
        text: 'text-[#b45309]',
        border: 'border-[#fde68a]',
      },
      Cleaning: {
        bg: 'bg-[#e0e7ff]',
        text: 'text-[#4338ca]',
        border: 'border-[#c7d2fe]',
      },
    };
    return statusMap[status] || statusMap.Available;
  };

  const getTypeColor = (type: string) => {
    const typeMap: Record<string, { bg: string; text: string; border: string }> = {
      Standard: {
        bg: 'bg-[#f0fdf4]',
        text: 'text-[#166534]',
        border: 'border-[#bbf7d0]',
      },
      Deluxe: {
        bg: 'bg-[#fef3e2]',
        text: 'text-[#c2410c]',
        border: 'border-[#fed7aa]',
      },
      Suite: {
        bg: 'bg-[#fae8ff]',
        text: 'text-[#a21caf]',
        border: 'border-[#f0abfc]',
      },
      Presidential: {
        bg: 'bg-[#fef2f2]',
        text: 'text-[#991b1b]',
        border: 'border-[#fecaca]',
      },
    };
    return typeMap[type] || typeMap.Standard;
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || room.type === filterType;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleOpenDialog = (room?: Room) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        number: room.number,
        floor: room.floor,
        type: room.type,
        status: room.status,
        capacity: room.capacity,
        price: room.price,
        features: room.features.join(', '),
      });
    } else {
      setEditingRoom(null);
      setFormData({
        number: '',
        floor: '',
        type: 'Standard',
        status: 'Available',
        capacity: 2,
        price: 0,
        features: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRoom(null);
  };

  const handleSubmit = () => {
    if (!formData.number || !formData.floor || formData.price <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const roomData: Room = {
      id: editingRoom?.id || String(Date.now()),
      number: formData.number,
      floor: formData.floor,
      type: formData.type,
      status: formData.status,
      capacity: formData.capacity,
      price: formData.price,
      features: formData.features
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f !== ''),
    };

    if (editingRoom) {
      setRooms(rooms.map((r) => (r.id === editingRoom.id ? roomData : r)));
      toast.success('Room updated successfully');
    } else {
      setRooms([...rooms, roomData]);
      toast.success('Room added successfully');
    }

    handleCloseDialog();
  };

  const handleDeleteClick = (id: string) => {
    setRoomToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (roomToDelete) {
      setRooms(rooms.filter((r) => r.id !== roomToDelete));
      toast.success('Room deleted successfully');
      setRoomToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const stats = [
    {
      title: 'Total Rooms',
      value: rooms.length,
      subtext: 'All rooms in the hotel',
      icon: Bed,
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    },
    {
      title: 'Available',
      value: rooms.filter((r) => r.status === 'Available').length,
      subtext: 'Ready for booking',
      icon: DoorOpen,
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      title: 'Occupied',
      value: rooms.filter((r) => r.status === 'Occupied').length,
      subtext: 'Currently in use',
      icon: Users,
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
    {
      title: 'Avg. Price',
      value: `$${Math.round(rooms.reduce((acc, r) => acc + r.price, 0) / rooms.length || 0)}`,
      subtext: 'Average room rate',
      icon: DollarSign,
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

      {/* Room Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Room Management</CardTitle>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Room
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by room number or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {roomTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
                {roomStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rooms Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Number</TableHead>
                  <TableHead>Floor</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No rooms found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.number}</TableCell>
                      <TableCell>{room.floor}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getTypeColor(room.type).bg} ${
                            getTypeColor(room.type).text
                          } ${getTypeColor(room.type).border}`}
                        >
                          {room.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(room.status).bg} ${
                            getStatusColor(room.status).text
                          } ${getStatusColor(room.status).border}`}
                        >
                          {room.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {room.capacity}
                        </div>
                      </TableCell>
                      <TableCell>${room.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {room.features.slice(0, 2).map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-muted/50"
                            >
                              {feature}
                            </Badge>
                          ))}
                          {room.features.length > 2 && (
                            <Badge variant="secondary" className="text-xs bg-muted/50">
                              +{room.features.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(room)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(room.id)}
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
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </DialogTitle>
            <DialogDescription>
              Please fill in all the room details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Room Number</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  placeholder="101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Input
                  id="floor"
                  value={formData.floor}
                  onChange={(e) =>
                    setFormData({ ...formData, floor: e.target.value })
                  }
                  placeholder="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
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
                    {roomStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (guests)</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: parseInt(e.target.value) || 1 })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Features (comma separated)</Label>
              <Input
                id="features"
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                placeholder="Wi-Fi, TV, Air Conditioning"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingRoom ? 'Save Changes' : 'Add Room'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Room Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this room? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Room
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
