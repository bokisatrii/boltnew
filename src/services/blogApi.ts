// src/services/blogApi.ts - ISPRAVLJENA VERZIJA

const ORIGINAL_API_URL = 'https://script.google.com/macros/s/AKfycbxjHgFozJT6Uo8gK4jd-YL2wFLohKsu2pwzCsJ0N0KVCGrb6FR5mgwgYK5eD8HHpeNaDA/exec';

// Alternativni CORS proxy servisi (probajte jedan po jedan)
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest='
];

// Koristimo prvi proxy
const CORS_PROXY = CORS_PROXIES[0];
const API_URL = CORS_PROXY + encodeURIComponent(ORIGINAL_API_URL);

export interface BlogPost {
  id: string;
  naslov: string;
  datum: string;
  tekst: string;
  slika: string;
  slug: string;
  autor: string;
  category: string;
}

interface APIResponse {
  success: boolean;
  data: BlogPost[];
  count: number;
  timestamp: string;
  error?: string;
}

export class BlogAPI {
  private apiUrl = API_URL;
  
  async fetchBlogPosts(): Promise<BlogPost[]> {
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
      
      return result.data || [];
      
    } catch (error) {
      console.error('❌ Error fetching blog posts:', error);
      
      // Fallback - vraćamo mock podatke ako API ne radi
      return this.getMockData();
    }
  }
  
  // Mock podaci za testiranje
  private getMockData(): BlogPost[] {
    return [
      {
        id: "1",
        naslov: "BasketLiga počinje!",
        datum: "2025-06-19T22:00:00.000Z",
        tekst: "Nakon pauze od nekoliko meseci, BasketLiga se vraća u velikom stilu!",
        slika: "https://www.rockstaracademy.com/lib/images/news/basketball.jpeg",
        slug: "utakmica-pod-reflektorima",
        autor: "Bogdan Terzic",
        category: "fantasy"
      },
      {
        id: "2",
        naslov: "Noćna utakmica",
        datum: "2025-06-04T22:00:00.000Z",
        tekst: "Spektakl pod reflektorima! BasketLiga organizuje noćnu utakmicu na otvorenom u centru grada.",
        slika: "https://i.postimg.cc/qRZ7rBJ4/nocnibasket.jpg",
        slug: "mvp-igrac-sezone",
        autor: "BasketLiga UO",
        category: "ncaa"
      }
    ];
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.fetchBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  }
  
  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    return posts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  async getLatestPosts(limit: number = 5): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    
    return posts
      .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
      .slice(0, limit);
  }
}

export const blogAPI = new BlogAPI();