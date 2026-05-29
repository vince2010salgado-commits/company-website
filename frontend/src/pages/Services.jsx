import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Wrench, Leaf, Trash2, Droplets, CheckCircle2, ArrowRight } from 'lucide-react';
import { services } from '../mock';

const Services = () => {
  const serviceIcons = {
    'Gutter Cleaning': Wrench,
    'Landscaping': Leaf,
    'Junk Removal': Trash2,
    'Power Washing': Droplets
  };

  const serviceColors = {
    'Gutter Cleaning': 'from-gray-600 to-gray-800',
    'Landscaping': 'from-[#3d6e3a] to-[#5fa85c]',
    'Junk Removal': 'from-gray-700 to-gray-900',
    'Power Washing': 'from-[#2d5e2a] to-[#3d6e3a]'
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional property care services designed to keep your home looking its best. Quality workmanship, affordable prices, and reliable service.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-20">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.name];
            const isEven = index % 2 === 0;

            return (
              <div key={service.id} className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:grid-flow-dense' : ''}`}>
                {/* Service Image/Icon */}
                <div className={isEven ? '' : 'md:col-start-2'}>
                  <div className={`aspect-square bg-gradient-to-br ${serviceColors[service.name]} rounded-3xl shadow-2xl flex items-center justify-center text-white transform hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-32 h-32 opacity-90" />
                  </div>
                </div>

                {/* Service Details */}
                <div className={isEven ? '' : 'md:col-start-1 md:row-start-1'}>
                  <Card className="border-2 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-[#3d6e3a] rounded-xl flex items-center justify-center">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-3xl">{service.name}</CardTitle>
                      </div>
                      <CardDescription className="text-base text-gray-700">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold text-lg mb-4 text-[#3d6e3a]">What's Included:</h4>
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle2 className="w-5 h-5 text-[#3d6e3a] mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/booking">
                        <Button className="bg-[#3d6e3a] hover:bg-[#2d5e2a] text-white w-full">
                          Request Free Estimate
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#3d6e3a] to-[#2d5e2a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Get your free estimate today. No obligation, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" className="bg-white text-[#3d6e3a] hover:bg-gray-100 w-full sm:w-auto">
                Get Free Estimate
              </Button>
            </Link>
            <a href="tel:832-291-9876">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#3d6e3a] w-full sm:w-auto">
                Call: 832-291-9876
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;