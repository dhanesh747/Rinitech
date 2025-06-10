import React from 'react';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">RoniTech</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted digital solutions provider, specializing in comprehensive services 
              to enhance your business's digital presence and drive meaningful growth.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:techservices@ronitech.in" className="text-gray-300 hover:text-blue-400 transition-colors">
                  techservices@ronitech.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+918452021168" className="text-gray-300 hover:text-blue-400 transition-colors">
                  +91 84520 21168
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">DTP Localization</span></li>
              <li><span className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">Graphic Designing</span></li>
              <li><span className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">Website Development</span></li>
              <li><span className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">Reels Editing</span></li>
              <li><span className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">Digital Marketing</span></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-blue-400 transition-colors">Gallery</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                14, Suraj Residency, Plot #15, Sector #10E, Kalamboli, Navi Mumbai-410 218
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 RoniTech. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;