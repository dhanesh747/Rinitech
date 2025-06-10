import React from 'react';
import { X, Shield, Lock, FileText, Award, CheckCircle, Eye, Users, Globe } from 'lucide-react';

interface TrustCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrustCenterModal: React.FC<TrustCenterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const certifications = [
    {
      icon: Award,
      title: 'ISO 9001:2015',
      description: 'Quality Management System certification ensuring consistent service delivery'
    },
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'GDPR compliant data handling and privacy protection measures'
    },
    {
      icon: Lock,
      title: 'Security Standards',
      description: 'Industry-standard security protocols for all client projects'
    }
  ];

  const policies = [
    {
      icon: FileText,
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information'
    },
    {
      icon: Users,
      title: 'Terms of Service',
      description: 'Our service terms and conditions for all client engagements'
    },
    {
      icon: Globe,
      title: 'Cookie Policy',
      description: 'Information about cookies and tracking technologies we use'
    }
  ];

  const commitments = [
    'Client data confidentiality and security',
    'Transparent pricing and project timelines',
    'Quality assurance on all deliverables',
    'Regular security audits and updates',
    'Compliance with international standards',
    '24/7 support for critical issues'
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
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Trust Center</h2>
                  <p className="text-green-100 mt-1">Your security and privacy are our top priorities</p>
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
            <div className="space-y-8">
              {/* Overview */}
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Building Trust Through Transparency
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto">
                  At RoniTech, we understand that trust is the foundation of every successful partnership. 
                  Our Trust Center provides comprehensive information about our security practices, 
                  certifications, and commitment to protecting your data and privacy.
                </p>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Certifications & Standards</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {certifications.map((cert, index) => {
                    const IconComponent = cert.icon;
                    return (
                      <div key={index} className="bg-green-50 rounded-xl p-6 text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h4>
                        <p className="text-gray-600 text-sm">{cert.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Our Commitments */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Commitments</h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {commitments.map((commitment, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{commitment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Policies & Documentation */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Policies & Documentation</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {policies.map((policy, index) => {
                    const IconComponent = policy.icon;
                    return (
                      <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{policy.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{policy.description}</p>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          View Document
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Measures */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Security Measures</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Protection</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• End-to-end encryption for all data transfers</li>
                      <li>• Secure cloud storage with regular backups</li>
                      <li>• Access controls and authentication protocols</li>
                      <li>• Regular security audits and penetration testing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Operational Security</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Employee background checks and training</li>
                      <li>• Secure development practices</li>
                      <li>• Incident response and recovery procedures</li>
                      <li>• Compliance monitoring and reporting</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-900 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">Questions About Security?</h3>
                <p className="text-gray-300 mb-6">
                  If you have any questions about our security practices, certifications, or need to report a security concern, 
                  please don't hesitate to contact our security team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:security@ronitech.in"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    Contact Security Team
                  </a>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                  >
                    General Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustCenterModal;