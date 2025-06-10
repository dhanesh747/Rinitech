import React from 'react';
import { CheckCircle, Award, Users, Zap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Commitment to delivering exceptional results with every project.',
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Focused on understanding and exceeding client expectations.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Efficient processes ensuring timely project completion.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Empowering Businesses Through 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                  {' '}Digital Innovation
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Based in Navi Mumbai, RoniTech is a trusted digital solutions provider 
                specializing in enhancing businesses' digital presence and communication. 
                Our comprehensive range of services bridges the gap between technology and creativity.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Our Commitment</h3>
              </div>
              <p className="text-gray-700">
                With over 626 successful projects and 68+ satisfied clients, we're dedicated 
                to delivering innovative solutions that drive real business results.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
              <div className="text-4xl font-bold mb-2">626+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-8 text-white text-center">
              <div className="text-4xl font-bold mb-2">68+</div>
              <div className="text-teal-100">Happy Clients</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-8 text-white text-center">
              <div className="text-4xl font-bold mb-2">7+</div>
              <div className="text-purple-100">Core Services</div>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-8 text-white text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-orange-100">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;