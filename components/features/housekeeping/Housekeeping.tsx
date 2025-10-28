"use client";

import { useState } from 'react';
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Sparkles,
    AlertTriangle,
    XCircle,
    Archive,
    MessageSquare,
    CheckCircle2,
    Clock,
    Bed,
    Building2,
    Filter,
    ClipboardCheck,
} from 'lucide-react';
import { toast } from 'sonner';

interface Room {
    number: string;
    type: string;
    floor: number;
    status: 'clean' | 'dirty' | 'inspected' | 'out-of-order' | 'out-of-inventory' | 'cleaning';
    hkStatus: 'vacant-clean' | 'vacant-dirty' | 'occupied-clean' | 'occupied-dirty' | 'out-of-order' | 'out-of-inventory';
    guest?: string;
    lastCleaned?: string;
    assignedTo?: string;
    priority?: 'low' | 'medium' | 'high';
    remark?: string;
}

export function Housekeeping() {
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<string>('');
    const [discrepancyDialogOpen, setDiscrepancyDialogOpen] = useState(false);
    const [remarkDialogOpen, setRemarkDialogOpen] = useState(false);

    const [rooms, setRooms] = useState<Room[]>([
        { number: '101', type: 'Standard', floor: 1, status: 'clean', hkStatus: 'vacant-clean', lastCleaned: '10:30 AM' },
        { number: '102', type: 'Standard', floor: 1, status: 'dirty', hkStatus: 'occupied-dirty', guest: 'John Smith', assignedTo: 'Maria', priority: 'high' },
        { number: '103', type: 'Deluxe', floor: 1, status: 'cleaning', hkStatus: 'vacant-dirty', assignedTo: 'Maria', priority: 'medium' },
        { number: '104', type: 'Deluxe', floor: 1, status: 'out-of-order', hkStatus: 'out-of-order', remark: 'AC maintenance' },
        { number: '201', type: 'Standard', floor: 2, status: 'inspected', hkStatus: 'vacant-clean', lastCleaned: '09:15 AM' },
        { number: '202', type: 'Suite', floor: 2, status: 'clean', hkStatus: 'occupied-clean', guest: 'Sarah Johnson', lastCleaned: '11:00 AM' },
        { number: '203', type: 'Deluxe', floor: 2, status: 'dirty', hkStatus: 'vacant-dirty', assignedTo: 'Linda', priority: 'high' },
        { number: '204', type: 'Standard', floor: 2, status: 'clean', hkStatus: 'vacant-clean', lastCleaned: '10:45 AM' },
        { number: '301', type: 'Suite', floor: 3, status: 'clean', hkStatus: 'occupied-clean', guest: 'Emily Davis', lastCleaned: '08:30 AM' },
        { number: '302', type: 'Standard', floor: 3, status: 'dirty', hkStatus: 'vacant-dirty', priority: 'medium' },
        { number: '303', type: 'Deluxe', floor: 3, status: 'out-of-inventory', hkStatus: 'out-of-inventory', remark: 'Renovation' },
        { number: '304', type: 'Suite', floor: 3, status: 'clean', hkStatus: 'vacant-clean', lastCleaned: '09:00 AM' },
    ]);

    const getStatusConfig = (status: string) => {
        const configs: Record<string, { bg: string; text: string; border: string }> = {
            'clean': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
            'vacant-clean': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
            'occupied-clean': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
            'dirty': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
            'vacant-dirty': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
            'occupied-dirty': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
            'inspected': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
            'cleaning': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
            'out-of-order': { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },
            'out-of-inventory': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
        };
        return configs[status] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'clean':
            case 'vacant-clean':
            case 'occupied-clean':
                return <CheckCircle2 className="h-5 w-5" />;
            case 'dirty':
            case 'vacant-dirty':
            case 'occupied-dirty':
                return <AlertTriangle className="h-5 w-5" />;
            case 'inspected':
                return <ClipboardCheck className="h-5 w-5" />;
            case 'cleaning':
                return <Clock className="h-5 w-5" />;
            case 'out-of-order':
                return <XCircle className="h-5 w-5" />;
            case 'out-of-inventory':
                return <Archive className="h-5 w-5" />;
            default:
                return <CheckCircle2 className="h-5 w-5" />;
        }
    };

    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            'vacant-clean': 'Vacant Clean',
            'vacant-dirty': 'Vacant Dirty',
            'occupied-clean': 'Occupied Clean',
            'occupied-dirty': 'Occupied Dirty',
            'out-of-order': 'Out of Order',
            'out-of-inventory': 'Out of Inventory',
        };
        return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
    };

    const getPriorityBadge = (priority?: string) => {
        if (!priority) return null;
        const configs: Record<string, string> = {
            high: 'bg-red-100 text-red-700 border border-red-200',
            medium: 'bg-amber-100 text-amber-700 border border-amber-200',
            low: 'bg-blue-100 text-blue-700 border border-blue-200',
        };
        return configs[priority] || 'bg-gray-100 text-gray-700 border border-gray-200';
    };
    const handleQuickClean = (room: Room) => {
        setSelectedRoom(room);
        setCurrentAction('clean');
        setActionDialogOpen(true);
    };

    const handleSetOutOfOrder = (room: Room) => {
        setSelectedRoom(room);
        setCurrentAction('out-of-order');
        setActionDialogOpen(true);
    };

    const handleSetOutOfInventory = (room: Room) => {
        setSelectedRoom(room);
        setCurrentAction('out-of-inventory');
        setActionDialogOpen(true);
    };

    const handleDiscrepancy = (room: Room) => {
        setSelectedRoom(room);
        setDiscrepancyDialogOpen(true);
    };

    const handleRemark = (room: Room) => {
        setSelectedRoom(room);
        setRemarkDialogOpen(true);
    };

    const handleActionSubmit = () => {
        if (!selectedRoom) return;

        const updatedRooms = rooms.map((room) => {
            if (room.number === selectedRoom.number) {
                if (currentAction === 'clean') {
                    return {
                        ...room,
                        status: 'clean' as const,
                        hkStatus: room.guest ? ('occupied-clean' as const) : ('vacant-clean' as const),
                        lastCleaned: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    };
                } else if (currentAction === 'out-of-order') {
                    return { ...room, status: 'out-of-order' as const, hkStatus: 'out-of-order' as const };
                } else if (currentAction === 'out-of-inventory') {
                    return { ...room, status: 'out-of-inventory' as const, hkStatus: 'out-of-inventory' as const };
                }
            }
            return room;
        });

        setRooms(updatedRooms);
        toast.success(`Room ${selectedRoom.number} status updated successfully`);
        setActionDialogOpen(false);
        setSelectedRoom(null);
    };

    const floorRooms = rooms.filter((room) => room.floor === selectedFloor);

    const stats = {
        clean: rooms.filter((r) => r.status === 'clean' || r.status === 'inspected').length,
        dirty: rooms.filter((r) => r.status === 'dirty').length,
        cleaning: rooms.filter((r) => r.status === 'cleaning').length,
        outOfOrder: rooms.filter((r) => r.status === 'out-of-order').length,
        outOfInventory: rooms.filter((r) => r.status === 'out-of-inventory').length,
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card className="bg-primary/10 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Clean Rooms</p>
                                <p className="text-2xl">{stats.clean}</p>
                            </div>
                            <div className="rounded-lg bg-primary p-2">
                                <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-destructive/10 border-destructive/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Dirty Rooms</p>
                                <p className="text-2xl">{stats.dirty}</p>
                            </div>
                            <div className="rounded-lg bg-destructive p-2">
                                <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-secondary/10 border-secondary/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">In Progress</p>
                                <p className="text-2xl">{stats.cleaning}</p>
                            </div>
                            <div className="rounded-lg bg-secondary p-2">
                                <Clock className="h-6 w-6 text-secondary-foreground" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-destructive/10 border-destructive/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Out of Order</p>
                                <p className="text-2xl">{stats.outOfOrder}</p>
                            </div>
                            <div className="rounded-lg bg-destructive p-2">
                                <XCircle className="h-6 w-6 text-destructive-foreground" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-muted border-border">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm">Out of Inventory</p>
                                <p className="text-2xl">{stats.outOfInventory}</p>
                            </div>
                            <div className="rounded-lg bg-muted-foreground p-2">
                                <Archive className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Card */}
            <Card className="shadow-lg">
                <CardHeader className="border-b bg-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-primary">
                                Housekeeping Management
                            </CardTitle>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Floor plan and room status management
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="border-primary/20">
                                <Filter className="mr-2 h-4 w-4 text-primary" />
                                Filter
                            </Button>
                            <Button variant="outline" className="border-primary/20">
                                <ClipboardCheck className="mr-2 h-4 w-4 text-primary" />
                                Reports
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {/* Floor Selector & Legend */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-2">
                            {[1, 2, 3].map((floor) => (
                                <Button
                                    key={floor}
                                    variant={selectedFloor === floor ? 'default' : 'outline'}
                                    className={
                                        selectedFloor === floor
                                            ? ''
                                            : 'border-primary/20'
                                    }
                                    onClick={() => setSelectedFloor(floor)}
                                >
                                    <Building2 className="mr-2 h-4 w-4" />
                                    Floor {floor}
                                </Button>
                            ))}
                        </div>

                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-primary" />
                                <span>Clean</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-destructive" />
                                <span>Dirty</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-secondary" />
                                <span>Cleaning</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-destructive" />
                                <span>OO</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded bg-muted-foreground" />
                                <span>OI</span>
                            </div>
                        </div>
                    </div>

                    {/* Floor Plan Grid */}
                    <div className="grid grid-cols-4 gap-4">
                        {floorRooms.map((room) => {
                            const statusConfig = getStatusConfig(room.hkStatus);
                            return (
                                <Card
                                    key={room.number}
                                    className="cursor-pointer transition-all hover:shadow-lg border-2 relative overflow-hidden"
                                >
                                    {/* Priority Badge */}
                                    {room.priority && (
                                        <div className="absolute top-2 right-2 z-10">
                                            <Badge className={`${getPriorityBadge(room.priority)} text-xs px-2 py-0.5`}>
                                                {room.priority.toUpperCase()}
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Header with Status Color */}
                                    <CardHeader className={`${statusConfig.bg} ${statusConfig.text} pb-3`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Bed className="h-5 w-5" />
                                                <CardTitle className={statusConfig.text + " text-lg"}>{room.number}</CardTitle>
                                            </div>
                                            {getStatusIcon(room.hkStatus)}
                                        </div>
                                        <Badge className="bg-white/20 border-0 w-fit mt-2" style={{ color: 'inherit' }}>
                                            {room.type}
                                        </Badge>
                                    </CardHeader>

                                    <CardContent className="pt-4 pb-3 space-y-3">
                                        {/* Status Info */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">Status:</span>
                                                <Badge className={`${statusConfig.bg} ${statusConfig.text} text-xs border-0`}>
                                                    {getStatusLabel(room.hkStatus)}
                                                </Badge>
                                            </div>

                                            {room.guest && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground">Guest:</span>
                                                    <span className="text-xs text-foreground truncate ml-2">{room.guest}</span>
                                                </div>
                                            )}

                                            {room.assignedTo && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground">Assigned:</span>
                                                    <span className="text-xs text-primary">{room.assignedTo}</span>
                                                </div>
                                            )}

                                            {room.lastCleaned && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground">Last Clean:</span>
                                                    <span className="text-xs text-primary">{room.lastCleaned}</span>
                                                </div>
                                            )}

                                            {room.remark && (
                                                <div className="p-2 rounded bg-secondary/10 border border-secondary/20">
                                                    <p className="text-xs text-secondary-foreground">{room.remark}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="grid grid-cols-2 gap-1 pt-2 border-t border-border">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 text-xs border-primary/20 hover:bg-primary/10"
                                                onClick={() => handleQuickClean(room)}
                                                disabled={room.status === 'out-of-order' || room.status === 'out-of-inventory'}
                                            >
                                                <Sparkles className="h-3 w-3 mr-1 text-primary" />
                                                Clean
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 text-xs border-secondary/20 hover:bg-secondary/10"
                                                onClick={() => handleDiscrepancy(room)}
                                            >
                                                <AlertTriangle className="h-3 w-3 mr-1 text-secondary" />
                                                Disc.
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 text-xs border-destructive/20 hover:bg-destructive/10"
                                                onClick={() => handleSetOutOfOrder(room)}
                                            >
                                                <XCircle className="h-3 w-3 mr-1 text-destructive" />
                                                OO
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 text-xs border-muted hover:bg-muted"
                                                onClick={() => handleSetOutOfInventory(room)}
                                            >
                                                <Archive className="h-3 w-3 mr-1 text-muted-foreground" />
                                                OI
                                            </Button>
                                        </div>

                                        {/* Remark Button */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full h-8 text-xs border-accent-foreground/20 hover:bg-accent"
                                            onClick={() => handleRemark(room)}
                                        >
                                            <MessageSquare className="h-3 w-3 mr-1 text-accent-foreground" />
                                            Remark
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Action Dialog (Clean, OO, OI) */}
            <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-primary flex items-center gap-2">
                            {currentAction === 'clean' && <Sparkles className="h-5 w-5 text-primary" />}
                            {currentAction === 'out-of-order' && <XCircle className="h-5 w-5 text-destructive" />}
                            {currentAction === 'out-of-inventory' && <Archive className="h-5 w-5 text-muted-foreground" />}
                            {currentAction === 'clean' && 'Mark Room as Clean'}
                            {currentAction === 'out-of-order' && 'Set Out of Order'}
                            {currentAction === 'out-of-inventory' && 'Set Out of Inventory'}
                        </DialogTitle>
                        <DialogDescription>
                            {selectedRoom && `Room ${selectedRoom.number} - ${selectedRoom.type}`}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="p-4 rounded-lg bg-accent border border-border">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <Label className="text-xs text-muted-foreground">Current Status</Label>
                                    <p>{selectedRoom && getStatusLabel(selectedRoom.hkStatus)}</p>
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Room Number</Label>
                                    <p>{selectedRoom?.number}</p>
                                </div>
                            </div>
                        </div>

                        {currentAction === 'clean' && (
                            <div className="space-y-2">
                                <Label htmlFor="assigned-to">Assigned Housekeeper</Label>
                                <Select>
                                    <SelectTrigger id="assigned-to">
                                        <SelectValue placeholder="Select housekeeper" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="maria">Maria</SelectItem>
                                        <SelectItem value="linda">Linda</SelectItem>
                                        <SelectItem value="sofia">Sofia</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {(currentAction === 'out-of-order' || currentAction === 'out-of-inventory') && (
                            <div className="space-y-2">
                                <Label htmlFor="reason">Reason</Label>
                                <Textarea
                                    id="reason"
                                    placeholder="Enter reason..."
                                    rows={3}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Optional notes..."
                                rows={2}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleActionSubmit}
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Discrepancy Dialog */}
            <Dialog open={discrepancyDialogOpen} onOpenChange={setDiscrepancyDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-secondary flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-secondary" />
                            Report Discrepancy
                        </DialogTitle>
                        <DialogDescription>
                            {selectedRoom && `Room ${selectedRoom.number} - ${selectedRoom.type}`}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="discrepancy-type">Discrepancy Type</Label>
                            <Select>
                                <SelectTrigger id="discrepancy-type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="status">Status Mismatch</SelectItem>
                                    <SelectItem value="occupancy">Occupancy Issue</SelectItem>
                                    <SelectItem value="damage">Damage Found</SelectItem>
                                    <SelectItem value="missing">Missing Items</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expected-status">Expected Status</Label>
                            <Select>
                                <SelectTrigger id="expected-status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vacant-clean">Vacant Clean</SelectItem>
                                    <SelectItem value="vacant-dirty">Vacant Dirty</SelectItem>
                                    <SelectItem value="occupied-clean">Occupied Clean</SelectItem>
                                    <SelectItem value="occupied-dirty">Occupied Dirty</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="actual-status">Actual Status</Label>
                            <Select>
                                <SelectTrigger id="actual-status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vacant-clean">Vacant Clean</SelectItem>
                                    <SelectItem value="vacant-dirty">Vacant Dirty</SelectItem>
                                    <SelectItem value="occupied-clean">Occupied Clean</SelectItem>
                                    <SelectItem value="occupied-dirty">Occupied Dirty</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="discrepancy-details">Details</Label>
                            <Textarea
                                id="discrepancy-details"
                                placeholder="Describe the discrepancy..."
                                rows={4}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="reported-by">Reported By</Label>
                            <Input
                                id="reported-by"
                                placeholder="Your name"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDiscrepancyDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                toast.success('Discrepancy report submitted');
                                setDiscrepancyDialogOpen(false);
                            }}
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Submit Report
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Remark Dialog */}
            <Dialog open={remarkDialogOpen} onOpenChange={setRemarkDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-primary flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Add Remark
                        </DialogTitle>
                        <DialogDescription>
                            {selectedRoom && `Room ${selectedRoom.number} - ${selectedRoom.type}`}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="remark-category">Category</Label>
                            <Select>
                                <SelectTrigger id="remark-category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                    <SelectItem value="cleaning">Cleaning</SelectItem>
                                    <SelectItem value="guest">Guest Request</SelectItem>
                                    <SelectItem value="general">General</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="remark-text">Remark</Label>
                            <Textarea
                                id="remark-text"
                                placeholder="Enter remark..."
                                rows={4}
                                defaultValue={selectedRoom?.remark}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="urgent" className="rounded" />
                            <Label htmlFor="urgent">Mark as urgent</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRemarkDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                toast.success('Remark added successfully');
                                setRemarkDialogOpen(false);
                            }}
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Save Remark
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
