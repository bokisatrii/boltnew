// src/services/blogApi.ts - VERZIJA SA CACHING-OM I MULTI-CATEGORY SUPPORT
const ORIGINAL_API_URL = 'https://script.google.com/macros/s/AKfycbxjHgFozJT6Uo8gK4jd-YL2wFLohKsu2pwzCsJ0N0KVCGrb6FR5mgwgYK5eD8HHpeNaDA/exec';

const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest='
];

const CORS_PROXY = CORS_PROXIES[0];
const API_URL = CORS_PROXY + encodeURIComponent(ORIGINAL_API_URL);

import { BlogPost, RawBlogPost } from '../types/blog';

interface APIResponse {
  success: boolean;
  data: RawBlogPost[];
  count: number;
  timestamp: string;
  error?: string;
}

// Function to process raw posts and convert comma-separated categories to arrays
const processRawPosts = (rawPosts: RawBlogPost[]): BlogPost[] => {
  return rawPosts.map(post => ({
    ...post,
    category: post.category 
      ? post.category.split(',').map(cat => cat.trim().toLowerCase()).filter(cat => cat.length > 0)
      : []
  }));
};

export class BlogAPI {
  private apiUrl = API_URL;
  private cache: BlogPost[] | null = null;
  private cacheTimestamp: number = 0;
  private cacheTimeout = 5 * 60 * 1000; // 5 minuta cache
  
  async fetchBlogPosts(): Promise<BlogPost[]> {
    // Proverava cache
    const now = Date.now();
    if (this.cache && (now - this.cacheTimestamp) < this.cacheTimeout) {
      console.log('📦 Using cached blog posts');
      return this.cache;
    }

    try {
      console.log('🔄 Fetching blog posts from:', this.apiUrl);
      
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: APIResponse = await response.json();
      console.log('✅ API Response:', result);
      
      if (!result.success) {
        throw new Error(result.error || 'API greška');
      }
      
      // Process raw posts to handle multi-categories
      const processedPosts = processRawPosts(result.data || []);
      
      // Čuva u cache
      this.cache = processedPosts;
      this.cacheTimestamp = now;
      
      return this.cache;
      
    } catch (error) {
      console.error('❌ Error fetching blog posts:', error);
      
      // Ako imamo stari cache, koristi ga
      if (this.cache) {
        console.log('📦 Using stale cache due to error');
        return this.cache;
      }
      
      // Inače vraća mock podatke
      return this.getMockData();
    }
  }
  
  // Mock podaci za testiranje
  private getMockData(): BlogPost[] {
    const rawMockData: RawBlogPost[] = [
      {
        id: "1",
        naslov: "BasketLiga počinje!",
        datum: "2025-06-19T22:00:00.000Z",
        tekst: "Nakon pauze od nekoliko meseci, BasketLiga se vraća u velikom stilu!",
        slika: "https://www.rockstaracademy.com/lib/images/news/basketball.jpeg",
        slug: "utakmica-pod-reflektorima",
        autor: "Bogdan Terzic",
        category: "fantasy, youth"
      },
      {
        id: "2",
        naslov: "Noćna utakmica",
        datum: "2025-06-04T22:00:00.000Z",
        tekst: "Spektakl pod reflektorima! BasketLiga organizuje noćnu utakmicu na otvorenom u centru grada.",
        slika: "https://i.postimg.cc/qRZ7rBJ4/nocnibasket.jpg",
        slug: "mvp-igrac-sezone",
        autor: "BasketLiga UO",
        category: "nba, ncaa, featured"
      }
    ];
    
    return processRawPosts(rawMockData);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.fetchBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  }
  
  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    const searchCategory = category.toLowerCase();
    
    return posts.filter(post => 
      post.category.some(cat => cat.includes(searchCategory))
    );
  }
  
  async getLatestPosts(limit: number = 5): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    
    return posts
      .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
      .slice(0, limit);
  }

  // Metoda za brisanje cache-a
  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
  }
}

export const blogAPI = new BlogAPI();