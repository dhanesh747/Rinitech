export interface Quote {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  service: string;
  date: string;
  status: 'new' | 'reviewed' | 'responded' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface AdminStats {
  totalQuotes: number;
  newQuotes: number;
  activeProjects: number;
  totalRevenue: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: number;
}

export interface ServiceInfo {
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  pricing: string;
  timeline: string;
}