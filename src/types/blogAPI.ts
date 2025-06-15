// src/services/blogAPI.ts
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

const BLOG_API_URL = 'https://script.google.com/macros/s/AKfycbxe79AXKSCWmuiFG81hvIqOPRbb1Aa9QwoZJfh6AQdEVyiVrVl7bJf1S4hA6xlH-KAOOA/exec';

export class BlogAPI {
  private apiUrl = BLOG_API_URL;

  async fetchBlogPosts(): Promise<BlogPost[]> {
    try {
      const res = await fetch(this.apiUrl);
      const result: APIResponse = await res.json();
      if (!result.success) throw new Error(result.error || 'API error');
      return result.data;
    } catch (err) {
      console.error('Greška u fetchBlogPosts:', err);
      return [];
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.fetchBlogPosts();
    return posts.find((p) => p.slug === slug) || null;
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    return posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  async getLatestPosts(limit = 5): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    return posts
      .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
      .slice(0, limit);
  }
}

export const blogAPI = new BlogAPI();
