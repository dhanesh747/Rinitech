import React from 'react';
import { X, CheckCircle, Clock, Users, Star } from 'lucide-react';

interface ServiceModalProps {
  service: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    color: string;
    details: {
      overview: string;
      features: string[];
      benefits: string[];
      process: string[];
      deliverables: string[];
      timeline: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null;

  const IconComponent = service.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className={`bg-gradient-to-r ${service.color} px-8 py-6 text-white relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                  <p className="text-white text-opacity-90 mt-1">{service.description}</p>
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
                  <p className="text-gray-600 leading-relaxed text-lg">{service.details.overview}</p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {service.details.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Process</h3>
                  <div className="space-y-4">
                    {service.details.process.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-8 h-8 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
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
                {/* Benefits */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    Benefits
                  </h3>
                  <ul className="space-y-3">
                    {service.details.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {benefit}
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
                  <p className="text-gray-700">{service.details.timeline}</p>
                </div>

                {/* Deliverables */}
                <div className="bg-teal-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 text-teal-600 mr-2" />
                    Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {service.details.deliverables.map((deliverable, index) => (
                      <li key={index} className="text-gray-700 text-sm">
                        • {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact CTA */}
                <div className={`bg-gradient-to-r ${service.color} rounded-xl p-6 text-white`}>
                  <h3 className="text-xl font-semibold mb-3">Get a Custom Quote</h3>
                  <p className="text-white text-opacity-90 text-sm mb-4">
                    Contact us for personalized pricing based on your specific requirements and project scope.
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
                  className={`inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  Get Started
                </a>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
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

export default ServiceModal;