import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { CheckCircle2, Phone, Mail } from 'lucide-react';
import { services, companyInfo } from '../mock';
import { useToast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [],
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceName) => {
    setFormData(prev => {
      const services = prev.services.includes(serviceName)
        ? prev.services.filter(s => s !== serviceName)
        : [...prev.services, serviceName];
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one service is selected
    if (formData.services.length === 0) {
      toast({
        title: "Please select at least one service",
        description: "You must choose at least one service to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Make API call to backend
      const response = await axios.post(`${API}/bookings`, formData);
      
      if (response.data.success) {
        toast({
          title: "Request Submitted!",
          description: "We'll contact you within 24 hours with a free estimate.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          services: [],
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Submission Failed",
        description: error.response?.data?.detail || "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#3d6e3a] to-[#2d5e2a] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Request Your Free Estimate
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Fill out the form below and we'll get back to you within 24 hours with a free, no-obligation estimate.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="md:col-span-2">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Get Started</CardTitle>
                  <CardDescription>
                    Tell us about your property care needs and we'll provide a customized estimate.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="832-291-9876"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Services Needed * <span className="text-sm text-gray-500">(Select all that apply)</span></Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <div key={service.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:border-[#3d6e3a] transition-colors">
                            <Checkbox
                              id={`service-${service.id}`}
                              checked={formData.services.includes(service.name)}
                              onCheckedChange={() => handleServiceToggle(service.name)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor={`service-${service.id}`}
                                className="font-semibold cursor-pointer"
                              >
                                {service.name}
                              </Label>
                              <p className="text-xs text-gray-600 mt-1">
                                {service.description.split('.')[0]}.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Details (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your property care needs..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#3d6e3a] hover:bg-[#2d5e2a] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-[#3d6e3a] to-[#2d5e2a] text-white">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Us Directly</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-100 mb-2">Call us now:</p>
                    <a href={`tel:${companyInfo.phones[0]}`} className="flex items-center text-lg font-semibold hover:text-gray-200 transition-colors">
                      <Phone className="w-5 h-5 mr-2" />
                      {companyInfo.phones[0]}
                    </a>
                    <a href={`tel:${companyInfo.phones[1]}`} className="flex items-center text-lg font-semibold hover:text-gray-200 transition-colors mt-2">
                      <Phone className="w-5 h-5 mr-2" />
                      {companyInfo.phones[1]}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-100 mb-2">Email us:</p>
                    <a href={`mailto:${companyInfo.email}`} className="flex items-center hover:text-gray-200 transition-colors">
                      <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="text-sm break-all">{companyInfo.email}</span>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#3d6e3a] rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">We Review Your Request</h4>
                      <p className="text-sm text-gray-600">Our team reviews your information within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#3d6e3a] rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Free Estimate Provided</h4>
                      <p className="text-sm text-gray-600">We contact you with a detailed, no-obligation estimate</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#3d6e3a] rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Schedule Service</h4>
                      <p className="text-sm text-gray-600">Choose a convenient time and we get to work</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-[#3d6e3a] mr-2" />
                      <span className="text-sm text-gray-700">Free Estimates</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-[#3d6e3a] mr-2" />
                      <span className="text-sm text-gray-700">Fast Response Time</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-[#3d6e3a] mr-2" />
                      <span className="text-sm text-gray-700">Licensed & Insured</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-[#3d6e3a] mr-2" />
                      <span className="text-sm text-gray-700">Satisfaction Guaranteed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;