import { BlogPost, BlogApiResponse } from '../types/blog';

const API_URL = 'https://script.google.com/macros/s/AKfycbxjHgFozJT6Uo8gK4jd-YL2wFLohKsu2pwzCsJ0N0KVCGrb6FR5mgwgYK5eD8HHpeNaDA/exec';

// Cache configuration
interface CacheEntry {
  data: BlogPost[];
  timestamp: number;
}

let cache: CacheEntry | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const BlogAPI = {
  async fetchBlogPosts(): Promise<BlogPost[]> {
    // Return cached data if still valid
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      console.log('📰 Returning cached blog posts');
      return cache.data;
    }

    try {
      console.log('🌐 Fetching blog posts from Google Apps Script...');
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: BlogApiResponse = await response.json();
      
      if (!json.success || !Array.isArray(json.data)) {
        console.error('❌ Invalid response format:', json);
        return [];
      }

      // Validate and clean the data
      const validPosts = json.data.filter(post => 
        post && 
        post.naslov && 
        post.tekst && 
        post.slug
      );

      console.log(`✅ Successfully loaded ${validPosts.length} blog posts`);
      
      // Update cache
      cache = { 
        data: validPosts, 
        timestamp: Date.now() 
      };
      
      return validPosts;

    } catch (error) {
      console.error('❌ Error fetching blog posts:', error);
      return [];
    }
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.fetchBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  },

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    return posts.filter(post => 
      post.category?.toLowerCase() === category.toLowerCase()
    );
  },

  async getLatestPosts(limit = 5): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    return posts
      .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
      .slice(0, limit);
  },

  async getFeaturedPosts(): Promise<BlogPost[]> {
    const posts = await this.fetchBlogPosts();
    return posts.filter(post => post.category?.toLowerCase() === 'featured');
  }
};