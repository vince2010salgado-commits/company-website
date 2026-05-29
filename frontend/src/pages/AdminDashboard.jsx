import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { CheckCircle2, XCircle, Clock, Trash2, Calendar, Phone, Mail, MessageSquare } from 'lucide-react';
import { mockBookings } from '../mock';
import { useToast } from '../hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load bookings from localStorage (mock data)
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    // Combine with initial mock bookings
    const allBookings = [...mockBookings, ...storedBookings];
    setBookings(allBookings);
  }, []);

  const updateBookingStatus = (id, newStatus) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "Status Updated",
      description: `Booking #${id} marked as ${newStatus}`,
    });
  };

  const deleteBooking = (id) => {
    const updatedBookings = bookings.filter(booking => booking.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    toast({
      title: "Booking Deleted",
      description: `Booking #${id} has been removed`,
    });
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500 hover:bg-yellow-600',
      approved: 'bg-green-500 hover:bg-green-600',
      completed: 'bg-blue-500 hover:bg-blue-600',
      declined: 'bg-red-500 hover:bg-red-600'
    };
    return styles[status] || 'bg-gray-500';
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    approved: bookings.filter(b => b.status === 'approved').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3d6e3a] to-[#2d5e2a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-100">Manage your bookings and appointments</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Bookings</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Approved</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.approved}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{stats.completed}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                No bookings found
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl">{booking.name}</CardTitle>
                        <Badge className={`${getStatusBadge(booking.status)} text-white`}>
                          {booking.status.toUpperCase()}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {Array.isArray(booking.services) ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {booking.services.map((service, idx) => (
                              <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#3d6e3a] text-white">
                                {service}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span>Service: <span className="font-semibold text-gray-700">{booking.service || 'N/A'}</span></span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center justify-end gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs mt-1">
                        {new Date(booking.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-[#3d6e3a]" />
                        <a href={`tel:${booking.phone}`} className="hover:text-[#3d6e3a] transition-colors">
                          {booking.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-[#3d6e3a]" />
                        <a href={`mailto:${booking.email}`} className="hover:text-[#3d6e3a] transition-colors">
                          {booking.email}
                        </a>
                      </div>
                    </div>
                    {booking.message && (
                      <div className="flex items-start">
                        <MessageSquare className="w-4 h-4 mr-2 text-[#3d6e3a] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700 italic">"{booking.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => updateBookingStatus(booking.id, 'approved')}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                          onClick={() => updateBookingStatus(booking.id, 'declined')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                      </>
                    )}
                    {booking.status === 'approved' && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => updateBookingStatus(booking.id, 'completed')}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Mark Completed
                      </Button>
                    )}
                    {booking.status === 'completed' && (
                      <Badge className="bg-blue-500 text-white">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Service Completed
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50 ml-auto"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;