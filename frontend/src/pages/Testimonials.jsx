import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Star } from 'lucide-react';
import { testimonials } from '../mock';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Testimonials = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Customer Testimonials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about Fresh Start Property Care.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-[#3d6e3a]">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#3d6e3a] text-[#3d6e3a]" />
                    ))}
                  </div>
                  <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                  <div className="text-sm text-gray-500">
                    {testimonial.service}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                  <p className="text-xs text-gray-400">
                    {new Date(testimonial.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#3d6e3a] mb-2">500+</div>
              <div className="text-xl text-gray-700">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#3d6e3a] mb-2">5.0</div>
              <div className="text-xl text-gray-700">Average Rating</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#3d6e3a] mb-2">50+</div>
              <div className="text-xl text-gray-700">Jobs Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#3d6e3a] to-[#2d5e2a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Our Happy Customers
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Experience the Fresh Start difference for yourself. Get your free estimate today!
          </p>
          <Link to="/booking">
            <Button size="lg" className="bg-white text-[#3d6e3a] hover:bg-gray-100">
              Get Free Estimate
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;