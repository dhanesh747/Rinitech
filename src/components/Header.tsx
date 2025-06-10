import React, { useState } from 'react';
import { Menu, X, Bot, Cuboid as Cube, Shield } from 'lucide-react';
import ThreeDPrintingModal from './ThreeDPrintingModal';
import TrustCenterModal from './TrustCenterModal';

interface HeaderProps {
  onSecretCode: () => void;
  onAIChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSecretCode, onAIChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [show3DModal, setShow3DModal] = useState(false);
  const [showTrustModal, setShowTrustModal] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount === 4) { // 5 clicks total (0-4)
      onSecretCode();
      setClickCount(0);
    }
    // Reset counter after 3 seconds
    setTimeout(() => setClickCount(0), 3000);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={handleLogoClick}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="/Untitleddesign2.png" 
                  alt="RoniTech Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                RoniTech
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group"
                >
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
              
              {/* 3D Printing Button */}
              <button
                onClick={() => setShow3DModal(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Cube className="w-4 h-4" />
                <span>3D Printing</span>
              </button>

              {/* Trust Center Button */}
              <button
                onClick={() => setShowTrustModal(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Shield className="w-4 h-4" />
                <span>Trust Center</span>
              </button>
              
              {/* AI Chat Button */}
              <button
                onClick={onAIChat}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Bot className="w-4 h-4" />
                <span>AI</span>
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => setShow3DModal(true)}
                className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <Cube className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowTrustModal(true)}
                className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
              >
                <Shield className="w-5 h-5" />
              </button>
              <button
                onClick={onAIChat}
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                <Bot className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2 text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <ThreeDPrintingModal 
        isOpen={show3DModal} 
        onClose={() => setShow3DModal(false)} 
      />
      <TrustCenterModal 
        isOpen={showTrustModal} 
        onClose={() => setShowTrustModal(false)} 
      />
    </>
  );
};

export default Header;