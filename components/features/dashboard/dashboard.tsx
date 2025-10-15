import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, DoorOpen, DollarSign, Calendar } from 'lucide-react';

export function Dashboard() {
    const stats = [
        {
            title: 'Total Rooms',
            value: '120',
            subtext: '85 Occupied',
            icon: DoorOpen,
            color: 'bg-indigo-500',
            bg: 'bg-indigo-50',
        },
        {
            title: 'Check-ins Today',
            value: '12',
            subtext: '5 pending',
            icon: Users,
            color: 'bg-emerald-500',
            bg: 'bg-emerald-50',
        },
        {
            title: 'Check-outs Today',
            value: '8',
            subtext: '2 completed',
            icon: Calendar,
            color: 'bg-amber-500',
            bg: 'bg-amber-50',
        },
        {
            title: 'Revenue Today',
            value: '$8,450',
            subtext: '+12% from yesterday',
            icon: DollarSign,
            color: 'bg-rose-500',
            bg: 'bg-rose-50',
        },
    ];

    const recentReservations = [
        { id: 'RES001', guest: 'John Smith', room: '101', status: 'confirmed', checkIn: '10/15/2025' },
        { id: 'RES002', guest: 'Sarah Johnson', room: '205', status: 'pending', checkIn: '10/16/2025' },
        { id: 'RES003', guest: 'Mike Brown', room: '310', status: 'checked-in', checkIn: '10/14/2025' },
        { id: 'RES004', guest: 'Emily Davis', room: '112', status: 'confirmed', checkIn: '10/17/2025' },
    ];

    const roomStatus = [
        { status: 'Occupied', count: 85, color: 'bg-emerald-500' },
        { status: 'Available', count: 25, color: 'bg-indigo-500' },
        { status: 'Maintenance', count: 7, color: 'bg-amber-500' },
        { status: 'Reserved', count: 3, color: 'bg-rose-500' },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className={`border-none ${stat.bg} shadow-lg`}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm text-foreground">{stat.title}</CardTitle>
                                <div className={`rounded-lg ${stat.color} p-2`}>
                                    <Icon className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl">{stat.value}</div>
                                <p className="text-muted-foreground text-xs">{stat.subtext}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Room Status Overview */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-indigo-600">Room Status Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {roomStatus.map((room) => (
                                <div key={room.status} className="flex items-center justify-between rounded-lg bg-accent/20 p-3 transition-all hover:shadow-md">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-4 w-4 rounded-full ${room.color}`} />
                                        <span>{room.status}</span>
                                    </div>
                                    <span className="text-foreground">{room.count} rooms</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Reservations */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-indigo-600">Recent Reservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentReservations.map((reservation) => (
                                <div
                                    key={reservation.id}
                                    className="flex items-center justify-between rounded-lg border border-border bg-accent/10 p-3 transition-all hover:shadow-md"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span>{reservation.guest}</span>
                                            <Badge variant="outline" className="border-indigo-300 bg-indigo-50 text-indigo-700 text-xs">
                                                Room {reservation.room}
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground text-xs">{reservation.checkIn}</p>
                                    </div>
                                    <Badge
                                        className={
                                            reservation.status === 'checked-in'
                                                ? 'bg-emerald-500 text-white'
                                                : reservation.status === 'confirmed'
                                                    ? 'bg-amber-500 text-white'
                                                    : 'bg-slate-400 text-white'
                                        }
                                    >
                                        {reservation.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Occupancy Chart Placeholder */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-indigo-600">7-Day Occupancy Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[200px] items-end justify-around gap-2">
                        {[72, 85, 68, 90, 85, 78, 85].map((height, i) => (
                            <div key={i} className="flex flex-1 flex-col items-center gap-2">
                                <div
                                    className="w-full rounded-t-lg bg-indigo-600 transition-all hover:bg-indigo-700"
                                    style={{ height: `${height}%` }}
                                />
                                <span className="text-muted-foreground text-xs">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
