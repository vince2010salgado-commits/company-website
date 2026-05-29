import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Wrench, Leaf, Trash2, Droplets, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { services, testimonials, companyInfo } from '../mock';

const Home = () => {
  const serviceIcons = {
    'Gutter Cleaning': Wrench,
    'Landscaping': Leaf,
    'Junk Removal': Trash2,
    'Power Washing': Droplets
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#3d6e3a] hover:bg-[#2d5e2a] text-white">
                {companyInfo.tagline}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {companyInfo.slogan}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Professional property care services in {companyInfo.location}. From gutter cleaning to landscaping, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <Button size="lg" className="bg-[#3d6e3a] hover:bg-[#2d5e2a] text-white w-full sm:w-auto">
                    Get Free Estimate
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href={`tel:${companyInfo.phones[0]}`}>
                  <Button size="lg" variant="outline" className="border-[#3d6e3a] text-[#3d6e3a] hover:bg-[#3d6e3a] hover:text-white w-full sm:w-auto">
                    Call Now: {companyInfo.phones[0]}
                  </Button>
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#3d6e3a] mr-2" />
                  <span className="text-sm text-gray-600">Free Estimates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#3d6e3a] mr-2" />
                  <span className="text-sm text-gray-600">Fast Service</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#3d6e3a] mr-2" />
                  <span className="text-sm text-gray-600">Licensed & Insured</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl shadow-2xl overflow-hidden bg-white border-4 border-[#3d6e3a]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url('https://customer-assets.emergentagent.com/job_freshstart-book/artifacts/1w2q0xue_image.png')",
                    backgroundSize: '200% 200%',
                    backgroundPosition: 'top left',
                    backgroundRepeat: 'no-repeat'
                  }}
                  aria-label="Fresh Start Property Care logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive property care solutions tailored to your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = serviceIcons[service.name];
              return (
                <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-[#3d6e3a] group">
                  <CardHeader>
                    <div className="w-14 h-14 bg-[#3d6e3a] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to="/services">
                      <Button variant="ghost" className="text-[#3d6e3a] hover:text-[#2d5e2a] p-0">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#3d6e3a] to-[#2d5e2a] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Fresh Start?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Local & Reliable</h3>
                    <p className="text-gray-100">Proudly serving Katy, TX with dependable service you can count on.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
                    <p className="text-gray-100">Competitive rates with no hidden fees. Free estimates for all services.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                    <p className="text-gray-100">We take pride in our work and ensure customer satisfaction every time.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to Get Started?</h3>
              <div className="space-y-4">
                <Link to="/booking">
                  <Button size="lg" className="w-full bg-white text-[#3d6e3a] hover:bg-gray-100">
                    Request Free Estimate
                  </Button>
                </Link>
                <p className="text-center text-sm text-gray-100">Or call us directly:</p>
                <div className="text-center space-y-2">
                  <a href={`tel:${companyInfo.phones[0]}`} className="block text-2xl font-bold hover:text-gray-200 transition-colors">
                    {companyInfo.phones[0]}
                  </a>
                  <a href={`tel:${companyInfo.phones[1]}`} className="block text-xl hover:text-gray-200 transition-colors">
                    {companyInfo.phones[1]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#3d6e3a] text-[#3d6e3a]" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-sm">{testimonial.service}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/testimonials">
              <Button variant="outline" className="border-[#3d6e3a] text-[#3d6e3a] hover:bg-[#3d6e3a] hover:text-white">
                Read More Reviews <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Give Your Property a Fresh Start Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Fast, friendly service with free estimates. Contact us now to schedule your appointment!
          </p>
          <Link to="/booking">
            <Button size="lg" className="bg-[#3d6e3a] hover:bg-[#2d5e2a] text-white text-lg px-8 py-6">
              Get Your Free Estimate
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;