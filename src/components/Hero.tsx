import React from 'react';
import { ArrowRight, Star, Sparkles, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200 shadow-sm">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                Digital Solutions Provider
                <Zap className="w-4 h-4 ml-2 text-orange-500" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Elevate Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 animate-pulse">
                  {' '}Digital Presence
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                RoniTech specializes in comprehensive digital solutions from DTP localization to 
                digital marketing, helping businesses thrive in the digital landscape with cutting-edge technology.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                Our Services
              </a>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center sm:text-left group">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 group-hover:scale-110 transition-transform duration-300">626+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center sm:text-left group">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600 group-hover:scale-110 transition-transform duration-300">68+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Enhanced Visual */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
              <div className="space-y-4">
                <div className="h-4 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-blue-300 to-teal-300 rounded-full w-3/4 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="h-4 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full w-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg transform hover:scale-110 transition-transform duration-300 cursor-pointer"></div>
                  <div className="h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg transform hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ transitionDelay: '0.1s' }}></div>
                  <div className="h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg transform hover:scale-110 transition-transform duration-300 cursor-pointer" style={{ transitionDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl transform rotate-6 opacity-20 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl transform -rotate-3 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;