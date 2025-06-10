import React, { useState, useEffect } from 'react';
import { 
  X, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Mail, 
  Phone, 
  Calendar,
  Download,
  Trash2,
  Eye,
  Filter,
  Search,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Database,
  Upload
} from 'lucide-react';
import { Quote, AdminStats } from '../types';
import { 
  getQuotes, 
  updateQuote, 
  deleteQuote, 
  getStats, 
  clearDatabase, 
  exportDatabase, 
  importDatabase 
} from '../utils/database';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('quotes');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [stats, setStats] = useState<AdminStats>({ totalQuotes: 0, newQuotes: 0, activeProjects: 0, totalRevenue: '₹0' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    try {
      const quotesData = getQuotes();
      const statsData = getStats();
      setQuotes(quotesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuoteStatus = (id: string, status: Quote['status']) => {
    updateQuote(id, { status });
    loadData(); // Refresh data
  };

  const handleUpdateQuotePriority = (id: string, priority: Quote['priority']) => {
    updateQuote(id, { priority });
    loadData(); // Refresh data
  };

  const handleDeleteQuote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      deleteQuote(id);
      loadData(); // Refresh data
      setSelectedQuote(null);
    }
  };

  const handleClearDatabase = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearDatabase();
      loadData();
    }
  };

  const handleExportDatabase = () => {
    const data = exportDatabase();
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ronitech_database_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportDatabase = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (importDatabase(content)) {
          loadData();
          alert('Database imported successfully!');
        } else {
          alert('Failed to import database. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Mail className="w-4 h-4" />;
      case 'reviewed': return <Eye className="w-4 h-4" />;
      case 'responded': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const exportQuotes = () => {
    const csvContent = [
      ['Name', 'Email', 'Service', 'Subject', 'Message', 'Status', 'Priority', 'Date'],
      ...filteredQuotes.map(quote => [
        quote.name,
        quote.email,
        quote.service,
        quote.subject,
        quote.message.replace(/,/g, ';'), // Replace commas to avoid CSV issues
        quote.status,
        quote.priority,
        quote.date
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ronitech_quotes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'quotes', name: 'Quote Requests', icon: MessageSquare },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'clients', name: 'Clients', icon: Users },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img 
                src="/Untitleddesign2.png" 
                alt="RoniTech Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">RoniTech Admin Panel</h1>
              <p className="text-gray-400">Manage your business operations</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={loadData}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 min-h-screen border-r border-gray-700">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'quotes' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Quotes</p>
                      <p className="text-2xl font-bold text-white">{stats.totalQuotes}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">New Quotes</p>
                      <p className="text-2xl font-bold text-white">{stats.newQuotes}</p>
                    </div>
                    <Mail className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Active Projects</p>
                      <p className="text-2xl font-bold text-white">{stats.activeProjects}</p>
                    </div>
                    <Users className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Revenue</p>
                      <p className="text-2xl font-bold text-white">{stats.totalRevenue}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>

              {/* Filters and Actions */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="relative flex-1">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search quotes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="responded">Responded</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={exportQuotes}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Quotes Table */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                {filteredQuotes.length === 0 ? (
                  <div className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">No quotes found</h3>
                    <p className="text-gray-500">
                      {quotes.length === 0 
                        ? "No quote requests have been submitted yet." 
                        : "Try adjusting your search or filter criteria."
                      }
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Client</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Service</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Priority</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredQuotes.map((quote) => (
                          <tr key={quote.id} className="hover:bg-gray-700 transition-colors duration-200">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-white font-medium">{quote.name}</div>
                                <div className="text-gray-400 text-sm">{quote.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">{quote.service || 'General Inquiry'}</td>
                            <td className="px-6 py-4 text-gray-300">{quote.date}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(quote.status)}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                                  {quote.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(quote.priority)}`}>
                                {quote.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedQuote(quote)}
                                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4 text-white" />
                                </button>
                                <button
                                  onClick={() => handleDeleteQuote(quote.id)}
                                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                                  title="Delete Quote"
                                >
                                  <Trash2 className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Quote Status Distribution</h3>
                  <div className="space-y-3">
                    {['new', 'reviewed', 'responded', 'closed'].map(status => {
                      const count = quotes.filter(q => q.status === status).length;
                      const percentage = quotes.length > 0 ? (count / quotes.length) * 100 : 0;
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <span className="text-gray-300 capitalize">{status}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getStatusColor(status).replace('text-', 'bg-').replace('100', '600')}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-white text-sm w-8">{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Service Requests</h3>
                  <div className="space-y-3">
                    {Array.from(new Set(quotes.map(q => q.service).filter(Boolean))).map(service => {
                      const count = quotes.filter(q => q.service === service).length;
                      return (
                        <div key={service} className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">{service}</span>
                          <span className="text-white font-medium">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Client Management</h2>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Clients</h3>
                <div className="space-y-4">
                  {Array.from(new Set(quotes.map(q => q.email))).slice(0, 10).map(email => {
                    const clientQuotes = quotes.filter(q => q.email === email);
                    const latestQuote = clientQuotes.sort((a, b) => b.createdAt - a.createdAt)[0];
                    return (
                      <div key={email} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{latestQuote.name}</div>
                          <div className="text-gray-400 text-sm">{email}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white">{clientQuotes.length} quotes</div>
                          <div className="text-gray-400 text-sm">Last: {latestQuote.date}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Database Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Export Database</h3>
                  <p className="text-gray-400 text-sm mb-4">Download a complete backup of your database.</p>
                  <button
                    onClick={handleExportDatabase}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Database</span>
                  </button>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Import Database</h3>
                  <p className="text-gray-400 text-sm mb-4">Restore database from a backup file.</p>
                  <label className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Import Database</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportDatabase}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Settings</h2>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
                <div className="space-y-4">
                  <button
                    onClick={handleClearDatabase}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Clear All Data
                  </button>
                  <p className="text-gray-400 text-sm">This will permanently delete all quotes and statistics.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-700">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Quote Details</h3>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Client Name</label>
                    <p className="text-white font-medium">{selectedQuote.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white font-medium">{selectedQuote.email}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Service</label>
                    <p className="text-white font-medium">{selectedQuote.service || 'General Inquiry'}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Date</label>
                    <p className="text-white font-medium">{selectedQuote.date}</p>
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Subject</label>
                  <p className="text-white font-medium">{selectedQuote.subject}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Message</label>
                  <p className="text-gray-300 leading-relaxed">{selectedQuote.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <select
                      value={selectedQuote.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as Quote['status'];
                        handleUpdateQuoteStatus(selectedQuote.id, newStatus);
                        setSelectedQuote({ ...selectedQuote, status: newStatus });
                      }}
                      className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="responded">Responded</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Priority</label>
                    <select
                      value={selectedQuote.priority}
                      onChange={(e) => {
                        const newPriority = e.target.value as Quote['priority'];
                        handleUpdateQuotePriority(selectedQuote.id, newPriority);
                        setSelectedQuote({ ...selectedQuote, priority: newPriority });
                      }}
                      className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <a
                    href={`mailto:${selectedQuote.email}?subject=Re: ${selectedQuote.subject}&body=Dear ${selectedQuote.name},%0D%0A%0D%0AThank you for your inquiry about ${selectedQuote.service}. We have reviewed your requirements and would like to discuss your project further.%0D%0A%0D%0ABest regards,%0D%0ARoniTech Team`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                  >
                    Send Email
                  </a>
                  <button
                    onClick={() => handleDeleteQuote(selectedQuote.id)}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;