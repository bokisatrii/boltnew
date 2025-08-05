// src/services/blogApi.ts - POBOLJŠANA VERZIJA
const ORIGINAL_API_URL = 'https://script.google.com/macros/s/AKfycbxjHgFozJT6Uo8gK4jd-YL2wFLohKsu2pwzCsJ0N0KVCGrb6FR5mgwgYK5eD8HHpeNaDA/exec';

// Nekoliko CORS proxy opcija - probaj različite ako jedan ne radi
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest=',
  // Dodaj direktan pristup kao fallback
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
  private cacheTimeout = 5 * 60 * 1000; // 5 minuta cache
  private currentProxyIndex = 0; // Trenutni proxy indeks
  
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
    
    console.log(`🔄 Pokušavam fetch sa proxy ${proxyIndex}: ${proxy || 'direktan pristup'}`);
    
    const response = await this.fetchWithTimeout(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: APIResponse = await response.json();
    console.log('✅ API Response:', result);
    
    if (!result.success) {
      throw new Error(result.error || 'API greška');
    }
    
    return processRawPosts(result.data || []);
  }
  
  async fetchBlogPosts(): Promise<BlogPost[]> {
    // Proverava cache
    const now = Date.now();
    if (this.cache && (now - this.cacheTimestamp) < this.cacheTimeout) {
      console.log('📦 Using cached blog posts');
      return this.cache;
    }

    // Pokušava sa svim proxy-jima redom
    for (let i = 0; i < CORS_PROXIES.length; i++) {
      const proxyIndex = (this.currentProxyIndex + i) % CORS_PROXIES.length;
      
      try {
        const posts = await this.tryFetchWithProxy(proxyIndex);
        
        // Uspešno dohvatanje - ažurira cache i pamti koji proxy radi
        this.cache = posts;
        this.cacheTimestamp = now;
        this.currentProxyIndex = proxyIndex;
        
        console.log(`✅ Uspešno dohvaćeno ${posts.length} postova sa proxy ${proxyIndex}`);
        return posts;
        
      } catch (error) {
        console.warn(`❌ Proxy ${proxyIndex} neuspešan:`, error);
        
        // Ako je poslednji proxy, nastavi sa error handling-om
        if (i === CORS_PROXIES.length - 1) {
          console.error('❌ Svi proxy-ji neuspešni');
          break;
        }
      }
    }
    
    // Ako sve proxy-je ne rade, pokušaj sa starim cache-om
    if (this.cache) {
      console.log('📦 Koristim stari cache zbog grešaka sa API-jem');
      return this.cache;
    }
    
    // Poslednji fallback - mock podaci
    console.log('📝 Koristim mock podatke');
    const mockData = this.getMockData();
    this.cache = mockData;
    this.cacheTimestamp = now;
    return mockData;
  }
  
  // Mock podaci za testiranje i fallback
  private getMockData(): BlogPost[] {
    const rawMockData: RawBlogPost[] = [
      {
        id: "1",
        naslov: "BasketLiga počinje spektakularno!",
        datum: "2025-06-17T10:00:00.000Z",
        tekst: "Nakon dugotrajne pripreke, BasketLiga se vraća u velikom stilu! Očekuje nas nezaboravna sezona puna uzbuđenja, novih igrača i neverovatnih utakmica. Prijavite svoje timove i budite deo najveće fantasy košarkaške lige u regionu.",
        slika: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        slug: "basketliga-pocinje-spektakularno",
        autor: "Bogdan Terzic",
        category: "fantasy,featured"
      },
      {
        id: "2",
        naslov: "Noćna utakmica pod reflektorima",
        datum: "2025-06-15T20:00:00.000Z",
        tekst: "Spektakl pod reflektorima! BasketLiga organizuje posebnu noćnu utakmicu na otvorenom u centru grada. Ovo će biti jedinstveno iskustvo za sve ljubitelje košarke - atmosfera, muzika i najbolji igrači na jednom mestu.",
        slika: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        slug: "nocna-utakmica-pod-reflektorima",
        autor: "BasketLiga UO",
        category: "events,nba"
      },
      {
        id: "3",
        naslov: "MVP igrač sezone - ko će pobediti?",
        datum: "2025-06-12T14:30:00.000Z",
        tekst: "Analiza najboljih kandidata za MVP nagradu ove sezone. Koji igrači dominiraju statistikama i ko ima najveće šanse da ponese prestižnu nagradu? Detaljno razmotrićemo top 5 kandidata.",
        slika: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        slug: "mvp-igrac-sezone",
        autor: "Marko Petrovic",
        category: "analysis,nba,featured"
      },
      {
        id: "4",
        naslov: "Fantasy saveti za početnike",
        datum: "2025-06-10T09:00:00.000Z",
        tekst: "Novi u fantasy košarci? Evo osnovnih saveta koji će vam pomoći da započnete svoju fantasy avanturu na pravi način. Od izbora igrača do strategije drafta - sve što treba da znate!",
        slika: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        slug: "fantasy-saveti-za-pocetnike",
        autor: "Ana Jovanovic",
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

  // Metoda za brisanje cache-a
  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
    console.log('🗑️ Cache obrishan');
  }
  
  // Metoda za debug informacije
  getDebugInfo(): object {
    return {
      cacheSize: this.cache?.length || 0,
      cacheAge: Date.now() - this.cacheTimestamp,
      currentProxy: CORS_PROXIES[this.currentProxyIndex] || 'direktan pristup',
      proxyIndex: this.currentProxyIndex
    };
  }
}

export const blogAPI = new BlogAPI();