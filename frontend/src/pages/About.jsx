import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Users, Award, MapPin, Heart } from 'lucide-react';
import { companyInfo } from '../mock';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Fresh Start Property Care
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {companyInfo.tagline}
          </p>
          <p className="text-lg text-gray-700">
            We're a local property care company based in {companyInfo.location}, dedicated to helping homeowners maintain beautiful, well-kept properties. Founded by {companyInfo.owners}, we bring professionalism, quality, and care to every job.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="space-y-6 text-gray-700 text-lg">
            <p>
              Fresh Start Property Care was born from a simple idea: every homeowner deserves professional, affordable property care services they can trust. {companyInfo.owners} founded our company with a commitment to excellence and a passion for helping our community.
            </p>
            <p>
              What started as a small operation has grown into a trusted name in {companyInfo.location}. We've built our reputation on quality workmanship, honest pricing, and treating every property as if it were our own.
            </p>
            <p>
              Today, we're proud to serve hundreds of satisfied customers throughout the Katy area, offering comprehensive property care services from gutter cleaning and landscaping to power washing and junk removal. We're not just about maintaining properties – we're about giving them a fresh start.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#3d6e3a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Local</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We're your neighbors, deeply rooted in the Katy community and committed to local excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#3d6e3a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  When we commit to a job, we deliver. On time, every time, with consistent quality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#3d6e3a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Affordable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quality doesn't have to break the bank. We offer competitive pricing with transparent estimates.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#3d6e3a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Customer First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We're not done until you're happy with the results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Connection */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Local Student-Athletes</h2>
          <p className="text-xl text-gray-600 mb-8">
            Owen & Noah are proud members of the Katy High School Football team. When you book with Fresh Start, you're supporting two hardworking student-athletes building their futures right here in our community.
          </p>
          <div className="inline-block bg-[#3d6e3a] text-white px-6 py-3 rounded-lg font-semibold">
            Katy High School Football
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#3d6e3a] to-[#2d5e2a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Let's give your property the fresh start it deserves. Contact us today for a free estimate!
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

export default About;