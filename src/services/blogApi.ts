import { BlogPost, RawBlogPost } from '../types/blog';

const ORIGINAL_API_URL = 'https://script.google.com/macros/s/AKfycbwF3no5_3qdGcyaVzC_5jVcGNHESD8yLGLyKRvpYbt4XtJgV95ODDwGlqNb3abZPpjj/exec';

interface APIResponse {
  success: boolean;
  data: RawBlogPost[];
  count: number;
  timestamp: string;
  error?: string;
}

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
  private cacheTimeout = 5 * 60 * 1000;

  private async fetchWithTimeout(url: string, timeout: number = 15000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async fetchBlogPosts(): Promise<BlogPost[]> {
    const now = Date.now();
    if (this.cache && (now - this.cacheTimestamp) < this.cacheTimeout) {
      console.log('📦 Using cached blog posts');
      return this.cache;
    }

    // allorigins /get endpoint - ne radi preflight, radi na svim hostovima
    const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(ORIGINAL_API_URL);

    try {
      console.log('🌐 Fetching blog posts...');
      const response = await this.fetchWithTimeout(proxyUrl);

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const wrapper = await response.json();
      const result: APIResponse = JSON.parse(wrapper.contents);

      if (!result.success) throw new Error(result.error || 'API error');

      const posts = processRawPosts(result.data || []);
      this.cache = posts;
      this.cacheTimestamp = now;

      console.log(`✅ Fetched ${posts.length} posts`);
      return posts;

    } catch (error) {
      console.error('❌ Blog fetch failed:', error);
      if (this.cache) return this.cache;
      return this.getMockData();
    }
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

  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
  }

  private getMockData(): BlogPost[] {
    return [
      {
        id: "1",
        naslov: "Corner Three Returns in Style!",
        datum: "2025-06-17T10:00:00.000Z",
        tekst: "After extensive preparation, Corner Three is back in a big way!",
        slika: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
        slug: "corner-three-returns-in-style",
        autor: "Corner Three Team",
        category: ["fantasy", "featured"]
      },
      {
        id: "2",
        naslov: "MVP of the Season - Who Will Win?",
        datum: "2025-06-12T14:30:00.000Z",
        tekst: "Analysis of the best MVP candidates this season.",
        slika: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80",
        slug: "mvp-of-the-season",
        autor: "Corner Three Team",
        category: ["nba", "featured"]
      }
    ];
  }
}

export const blogAPI = new BlogAPI();