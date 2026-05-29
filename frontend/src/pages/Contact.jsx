import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import { companyInfo } from '../mock';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? Need a quote? We're here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3d6e3a] rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Call Us</CardTitle>
                      <CardDescription>Available 7 days a week</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a
                    href={`tel:${companyInfo.phones[0]}`}
                    className="block text-lg font-semibold text-[#3d6e3a] hover:text-[#2d5e2a] transition-colors"
                  >
                    {companyInfo.phones[0]}
                  </a>
                  <a
                    href={`tel:${companyInfo.phones[1]}`}
                    className="block text-lg font-semibold text-[#3d6e3a] hover:text-[#2d5e2a] transition-colors"
                  >
                    {companyInfo.phones[1]}
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3d6e3a] rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Email Us</CardTitle>
                      <CardDescription>We respond within 24 hours</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-lg text-[#3d6e3a] hover:text-[#2d5e2a] transition-colors break-all"
                  >
                    {companyInfo.email}
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#3d6e3a] rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Service Area</CardTitle>
                      <CardDescription>Proudly serving</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-gray-900">{companyInfo.location}</p>
                  <p className="text-gray-600 mt-2">and surrounding areas</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Action Card */}
            <div>
              <Card className="bg-gradient-to-br from-[#3d6e3a] to-[#2d5e2a] text-white h-full">
                <CardHeader>
                  <CardTitle className="text-3xl mb-4">Ready to Get Started?</CardTitle>
                  <CardDescription className="text-gray-100 text-base">
                    Request a free estimate and let us transform your property!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">What We Offer:</h3>
                    <ul className="space-y-2 text-gray-100">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                        Free, no-obligation estimates
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                        Fast response times
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                        Flexible scheduling
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                        Professional service
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                        Satisfaction guaranteed
                      </li>
                    </ul>
                  </div>

                  <Link to="/booking">
                    <Button size="lg" className="w-full bg-white text-[#3d6e3a] hover:bg-gray-100">
                      Request Free Estimate
                    </Button>
                  </Link>

                  <div className="text-center pt-4 border-t border-white/20">
                    <p className="text-sm text-gray-100 mb-3">Or call us now:</p>
                    <a
                      href={`tel:${companyInfo.phones[0]}`}
                      className="text-2xl font-bold hover:text-gray-200 transition-colors block"
                    >
                      {companyInfo.phones[0]}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Follow Us on Instagram</h2>
          <p className="text-lg text-gray-600 mb-6">
            See our latest projects and customer transformations!
          </p>
          <a
            href="https://instagram.com/freshstartpropertycare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <span>@freshstartpropertycare</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;