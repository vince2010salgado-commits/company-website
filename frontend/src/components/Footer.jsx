import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { companyInfo } from '../mock';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-[#5fa85c]">FRESH START</span>
              <div className="text-sm font-normal">PROPERTY CARE</div>
            </div>
            <p className="text-gray-400 text-sm mb-4">{companyInfo.tagline}</p>
            <p className="text-[#5fa85c] font-semibold text-sm">{companyInfo.slogan}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#5fa85c] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#5fa85c] transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-[#5fa85c] transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#5fa85c] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-[#5fa85c] transition-colors text-sm">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Gutter Cleaning</li>
              <li>Landscaping</li>
              <li>Junk Removal</li>
              <li>Power Washing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-[#5fa85c] mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a href={`tel:${companyInfo.phones[0]}`} className="text-gray-400 hover:text-[#5fa85c] transition-colors block">
                    {companyInfo.phones[0]}
                  </a>
                  <a href={`tel:${companyInfo.phones[1]}`} className="text-gray-400 hover:text-[#5fa85c] transition-colors block">
                    {companyInfo.phones[1]}
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[#5fa85c] mr-3 flex-shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="text-gray-400 hover:text-[#5fa85c] transition-colors text-sm">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 text-[#5fa85c] mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{companyInfo.location}</span>
              </li>
              <li className="flex items-center">
                <Instagram className="w-5 h-5 text-[#5fa85c] mr-3 flex-shrink-0" />
                <a
                  href="https://instagram.com/freshstartpropertycare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#5fa85c] transition-colors text-sm"
                >
                  {companyInfo.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Fresh Start Property Care. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Proudly serving Katy, TX and surrounding areas
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;