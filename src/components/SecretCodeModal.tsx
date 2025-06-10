import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff } from 'lucide-react';

interface SecretCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SecretCodeModal: React.FC<SecretCodeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const SECRET_CODE = 'RONITECH2025';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === SECRET_CODE) {
      onSuccess();
      setCode('');
      setError('');
      setAttempts(0);
    } else {
      setAttempts(prev => prev + 1);
      setError(`Invalid code. Attempt ${attempts + 1}/3`);
      setCode('');
      
      if (attempts >= 2) {
        setError('Too many failed attempts. Access denied.');
        setTimeout(() => {
          onClose();
          setAttempts(0);
          setError('');
        }, 2000);
      }
    }
  };

  const handleClose = () => {
    setCode('');
    setError('');
    setAttempts(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300" />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Admin Access</h2>
                  <p className="text-red-100 text-sm">Restricted Area</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="secretCode" className="block text-sm font-medium text-gray-300 mb-2">
                  Enter Secret Code
                </label>
                <div className="relative">
                  <input
                    type={showCode ? 'text' : 'password'}
                    id="secretCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 pr-12"
                    placeholder="Enter code..."
                    maxLength={20}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={!code || attempts >= 3}
                  className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Access Admin
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-xs text-center">
                Unauthorized access is prohibited. All attempts are logged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretCodeModal;