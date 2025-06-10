import React from 'react';
import { X, Cube, CheckCircle, Clock, Users, Star, Printer, Layers, Zap } from 'lucide-react';

interface ThreeDPrintingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThreeDPrintingModal: React.FC<ThreeDPrintingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    'Rapid Prototyping',
    'Custom Design Services',
    'Multiple Material Options',
    'High Precision Printing',
    'Post-Processing Services',
    'Quality Assurance Testing'
  ];

  const materials = [
    { name: 'PLA', description: 'Biodegradable, easy to print, perfect for prototypes' },
    { name: 'ABS', description: 'Durable, heat-resistant, ideal for functional parts' },
    { name: 'PETG', description: 'Chemical resistant, food-safe, crystal clear' },
    { name: 'TPU', description: 'Flexible, rubber-like, perfect for gaskets and phone cases' }
  ];

  const applications = [
    'Product Prototyping',
    'Custom Parts Manufacturing',
    'Architectural Models',
    'Educational Models',
    'Art and Sculptures',
    'Replacement Parts'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Cube className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">3D Printing Services</h2>
                  <p className="text-purple-100 mt-1">Transform your ideas into reality with precision 3D printing</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Service Overview</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Our state-of-the-art 3D printing services bring your concepts to life with precision and quality. 
                    From rapid prototyping to custom manufacturing, we offer comprehensive solutions using the latest 
                    3D printing technologies and materials.
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Available Materials</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {materials.map((material, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{material.name}</h4>
                        <p className="text-gray-600 text-sm">{material.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Process</h3>
                  <div className="space-y-4">
                    {[
                      'Design consultation and file preparation',
                      'Material selection and printing setup',
                      'High-precision 3D printing process',
                      'Post-processing and quality control',
                      'Final inspection and delivery'
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Applications */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 text-purple-600 mr-2" />
                    Applications
                  </h3>
                  <ul className="space-y-3">
                    {applications.map((app, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    Timeline
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Simple prints:</span>
                      <span className="font-medium">1-3 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Complex models:</span>
                      <span className="font-medium">3-7 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Large projects:</span>
                      <span className="font-medium">1-2 weeks</span>
                    </div>
                  </div>
                </div>

                {/* Technology */}
                <div className="bg-teal-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Printer className="w-5 h-5 text-teal-600 mr-2" />
                    Technology
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-teal-600" />
                      <span className="text-sm text-gray-700">FDM/FFF Printing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-teal-600" />
                      <span className="text-sm text-gray-700">0.1mm Layer Resolution</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Cube className="w-4 h-4 text-teal-600" />
                      <span className="text-sm text-gray-700">300x300x400mm Build Volume</span>
                    </div>
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-3">Get a Quote</h3>
                  <p className="text-purple-100 text-sm mb-4">
                    Ready to bring your ideas to life? Contact us for a custom quote based on your specific requirements.
                  </p>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-200 text-sm font-medium"
                  >
                    Request Quote
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Project
                </a>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDPrintingModal;