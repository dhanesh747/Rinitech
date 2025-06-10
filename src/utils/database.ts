import { Quote, AdminStats } from '../types';

// Database file path (simulated with localStorage for web compatibility)
const DATABASE_KEY = 'ronitech_database';

interface Database {
  quotes: Quote[];
  stats: AdminStats;
  lastUpdated: string;
}

// Initialize database
const initializeDatabase = (): Database => {
  return {
    quotes: [],
    stats: {
      totalQuotes: 0,
      newQuotes: 0,
      activeProjects: 0,
      totalRevenue: '₹0'
    },
    lastUpdated: new Date().toISOString()
  };
};

// Load database
export const loadDatabase = (): Database => {
  try {
    const stored = localStorage.getItem(DATABASE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return initializeDatabase();
  } catch (error) {
    console.error('Error loading database:', error);
    return initializeDatabase();
  }
};

// Save database
export const saveDatabase = (database: Database): void => {
  try {
    database.lastUpdated = new Date().toISOString();
    localStorage.setItem(DATABASE_KEY, JSON.stringify(database, null, 2));
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

// Calculate stats from quotes
const calculateStats = (quotes: Quote[]): AdminStats => {
  const completedProjects = quotes.filter(q => q.status === 'closed').length;
  const avgProjectValue = 25000; // Average project value in INR
  const totalRevenue = completedProjects * avgProjectValue;

  return {
    totalQuotes: quotes.length,
    newQuotes: quotes.filter(q => q.status === 'new').length,
    activeProjects: quotes.filter(q => q.status === 'reviewed' || q.status === 'responded').length,
    totalRevenue: `₹${totalRevenue.toLocaleString('en-IN')}`
  };
};

// Quote operations
export const saveQuote = (quote: Quote): void => {
  const db = loadDatabase();
  db.quotes.push(quote);
  db.stats = calculateStats(db.quotes);
  saveDatabase(db);
};

export const getQuotes = (): Quote[] => {
  const db = loadDatabase();
  return db.quotes;
};

export const updateQuote = (id: string, updates: Partial<Quote>): void => {
  const db = loadDatabase();
  db.quotes = db.quotes.map(quote => 
    quote.id === id ? { ...quote, ...updates } : quote
  );
  db.stats = calculateStats(db.quotes);
  saveDatabase(db);
};

export const deleteQuote = (id: string): void => {
  const db = loadDatabase();
  db.quotes = db.quotes.filter(quote => quote.id !== id);
  db.stats = calculateStats(db.quotes);
  saveDatabase(db);
};

export const getStats = (): AdminStats => {
  const db = loadDatabase();
  return db.stats;
};

export const generateQuoteId = (): string => {
  return `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Database management
export const clearDatabase = (): void => {
  const db = initializeDatabase();
  saveDatabase(db);
};

export const exportDatabase = (): string => {
  const db = loadDatabase();
  return JSON.stringify(db, null, 2);
};

export const importDatabase = (data: string): boolean => {
  try {
    const db = JSON.parse(data);
    if (db.quotes && Array.isArray(db.quotes)) {
      saveDatabase(db);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing database:', error);
    return false;
  }
};