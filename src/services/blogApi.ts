// src/services/blogApi.ts - Enhanced Version
const ORIGINAL_API_URL = 'https://script.google.com/macros/s/AKfycbxjHgFozJT6Uo8gK4jd-YL2wFLohKsu2pwzCsJ0N0KVCGrb6FR5mgwgYK5eD8HHpeNaDA/exec';

// Multiple CORS proxy options - try different ones if one fails
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest=',
  // Direct access as fallback
  ''
];

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
  private cache: BlogPost[] | null = null;
  private cacheTimestamp: number = 0;
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
  private currentProxyIndex = 0;
  
  private async fetchWithTimeout(url: string, timeout: number = 10000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
  
  private async tryFetchWithProxy(proxyIndex: number): Promise<BlogPost[]> {
    const proxy = CORS_PROXIES[proxyIndex];
    const apiUrl = proxy ? proxy + encodeURIComponent(ORIGINAL_API_URL) : ORIGINAL_API_URL;
    
    console.log(`🔄 Attempting fetch with proxy ${proxyIndex}: ${proxy || 'direct access'}`);
    
    const response = await this.fetchWithTimeout(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: APIResponse = await response.json();
    console.log('✅ API Response:', result);
    
    if (!result.success) {
      throw new Error(result.error || 'API error');
    }
    
    return processRawPosts(result.data || []);
  }
  
  async fetchBlogPosts(): Promise<BlogPost[]> {
    // Check cache
    const now = Date.now();
    if (this.cache && (now - this.cacheTimestamp) < this.cacheTimeout) {
      console.log('📦 Using cached blog posts');
      return this.cache;
    }

    // Try all proxies in order
    for (let i = 0; i < CORS_PROXIES.length; i++) {
      const proxyIndex = (this.currentProxyIndex + i) % CORS_PROXIES.length;
      
      try {
        const posts = await this.tryFetchWithProxy(proxyIndex);
        
        // Successfully fetched - update cache and remember which proxy works
        this.cache = posts;
        this.cacheTimestamp = now;
        this.currentProxyIndex = proxyIndex;
        
        console.log(`✅ Successfully fetched ${posts.length} posts with proxy ${proxyIndex}`);
        return posts;
        
      } catch (error) {
        console.warn(`❌ Proxy ${proxyIndex} failed:`, error);
        
        // If last proxy, continue to error handling
        if (i === CORS_PROXIES.length - 1) {
          console.error('❌ All proxies failed');
          break;
        }
      }
    }
    
    // If all proxies fail, try using old cache
    if (this.cache) {
      console.log('📦 Using old cache due to API errors');
      return this.cache;
    }
    
    // Last fallback - mock data
    console.log('📝 Using mock data');
    const mockData = this.getMockData();
    this.cache = mockData;
    this.cacheTimestamp = now;
    return mockData;
  }
  
  // Mock data for testing and fallback
  private getMockData(): BlogPost[] {
    const rawMockData: RawBlogPost[] = [
      {
        id: "1",
        naslov: "Corner Three Returns in Style!",
        datum: "2025-06-17T10:00:00.000Z",
        tekst: "After extensive preparation, Corner Three is back in a big way! Expect an unforgettable season full of excitement, new players, and incredible matchups. Register your teams and be part of the biggest fantasy basketball league in the region.",
        slika: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        slug: "corner-three-returns-in-style",
        autor: "Corner Three Team",
        category: "fantasy,featured"
      },
      {
        id: "2",
        naslov: "Night Game Under the Lights",
        datum: "2025-06-15T20:00:00.000Z",
        tekst: "Spectacular night game under the lights! Corner Three is organizing a special outdoor game in the city center. This will be a unique experience for all basketball lovers - atmosphere, music, and the best players in one place.",
        slika: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        slug: "night-game-under-the-lights",
        autor: "Corner Three Team",
        category: "events,nba"
      },
      {
        id: "3",
        naslov: "MVP of the Season - Who Will Win?",
        datum: "2025-06-12T14:30:00.000Z",
        tekst: "Analysis of the best MVP candidates this season. Which players dominate the statistics and who has the best chances to win the prestigious award? We'll take a detailed look at the top 5 candidates.",
        slika: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        slug: "mvp-of-the-season",
        autor: "Corner Three Team",
        category: "analysis,nba,featured"
      },
      {
        id: "4",
        naslov: "Fantasy Tips for Beginners",
        datum: "2025-06-10T09:00:00.000Z",
        tekst: "New to fantasy basketball? Here are the basic tips that will help you start your fantasy adventure the right way. From player selection to draft strategy - everything you need to know!",
        slika: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        slug: "fantasy-tips-for-beginners",
        autor: "Corner Three Team",
        category: "tips,fantasy"
      }
    ];
    
    return processRawPosts(rawMockData);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const posts = await this.fetchBlogPosts();
      return posts.find(post => post.slug === slug) || null;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
    }
  }
  
  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const posts = await this.fetchBlogPosts();
      const searchCategory = category.toLowerCase();
      
      return posts.filter(post => 
        post.category.some(cat => cat.includes(searchCategory))
      );
    } catch (error) {
      console.error('Error fetching blog posts by category:', error);
      return [];
    }
  }
  
  async getLatestPosts(limit: number = 5): Promise<BlogPost[]> {
    try {
      const posts = await this.fetchBlogPosts();
      
      return posts
        .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      return [];
    }
  }

  // Method to clear cache
  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
    console.log('🗑️ Cache cleared');
  }
  
  // Method for debug information
  getDebugInfo(): object {
    return {
      cacheSize: this.cache?.length || 0,
      cacheAge: Date.now() - this.cacheTimestamp,
      currentProxy: CORS_PROXIES[this.currentProxyIndex] || 'direct access',
      proxyIndex: this.currentProxyIndex
    };
  }
}

export const blogAPI = new BlogAPI();
