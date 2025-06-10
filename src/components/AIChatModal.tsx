import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Settings, Key, MessageSquare, Loader, AlertCircle, X } from 'lucide-react';
import { initializeGemini, sendMessage, isGeminiInitialized } from '../utils/gemini';
import { ChatMessage } from '../types';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Check if API key exists in localStorage
      const savedApiKey = localStorage.getItem('gemini_api_key');
      if (savedApiKey) {
        setApiKey(savedApiKey);
        const initialized = initializeGemini(savedApiKey);
        setIsInitialized(initialized);
        if (initialized && messages.length === 0) {
          addWelcomeMessage();
        }
      } else {
        setShowApiKeyInput(true);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addWelcomeMessage = () => {
    const welcomeMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      content: "Hello! I'm RoniTech AI Assistant. I can help you with information about our digital solutions, services, and answer any questions about RoniTech. How can I assist you today?",
      role: 'assistant',
      timestamp: Date.now()
    };
    setMessages([welcomeMessage]);
  };

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) return;
    
    const initialized = initializeGemini(apiKey);
    if (initialized) {
      localStorage.setItem('gemini_api_key', apiKey);
      setIsInitialized(true);
      setShowApiKeyInput(false);
      addWelcomeMessage();
    } else {
      alert('Invalid API key. Please check and try again.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !isInitialized) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      content: inputMessage,
      role: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendMessage(inputMessage);
      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_assistant`,
        content: response,
        role: 'assistant',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_error`,
        content: 'Sorry, I encountered an error. Please try again or check your API key.',
        role: 'assistant',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showApiKeyInput) {
        handleApiKeySubmit();
      } else {
        handleSendMessage();
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
    if (isInitialized) {
      addWelcomeMessage();
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsInitialized(false);
    setMessages([]);
    setShowApiKeyInput(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">RoniTech AI Assistant</h2>
                  <p className="text-blue-100 text-sm">Powered by Google Gemini</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {isInitialized && (
                  <>
                    <button
                      onClick={clearChat}
                      className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm rounded-lg hover:bg-opacity-30 transition-all duration-200"
                    >
                      Clear
                    </button>
                    <button
                      onClick={resetApiKey}
                      className="p-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all duration-200"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* API Key Setup */}
            {!isInitialized && (
              <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <Key className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-semibold text-white">Setup Required</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  To use the AI chat, please provide your Google Gemini API key. 
                  <a 
                    href="https://makersuite.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 ml-1"
                  >
                    Get your API key here
                  </a>
                </p>
                <div className="flex space-x-3">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your Gemini API key..."
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleApiKeySubmit}
                    disabled={!apiKey.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Setup
                  </button>
                </div>
              </div>
            )}

            {/* Chat Interface */}
            {isInitialized && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Start a conversation with RoniTech AI Assistant</p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.role === 'assistant' && (
                            <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                          )}
                          {message.role === 'user' && (
                            <User className="w-4 h-4 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-700 text-gray-100 px-4 py-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4" />
                          <Loader className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-700 p-4">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about RoniTech services..."
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-6 bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">How to use AI Chat</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Get your free Gemini API key from Google AI Studio</li>
                    <li>• Ask about RoniTech services, pricing, or project requirements</li>
                    <li>• Get instant answers about digital solutions and business inquiries</li>
                    <li>• Your API key is stored locally and never shared</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatModal;