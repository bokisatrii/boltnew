import { useState, useEffect } from 'react';
import { BlogPost, blogAPI } from '../services/blogApi';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);
        const fetchedPosts = await blogAPI.fetchBlogPosts();
        setPosts(fetchedPosts);
      } catch (e) {
        console.error('Error loading blog posts:', e);
        setError('Greška pri učitavanju vesti');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await blogAPI.fetchBlogPosts();
      setPosts(fetchedPosts);
    } catch (e) {
      console.error('Error refetching blog posts:', e);
      setError('Greška pri učitavanju vesti');
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, refetch };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedPost = await BlogAPI.getBlogPostBySlug(slug);
        setPost(fetchedPost);
        
        if (!fetchedPost) {
          setError('Članak nije pronađen');
        }
      } catch (e) {
        console.error('Error loading blog post:', e);
        setError('Greška pri učitavanju članka');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  return { post, loading, error };
}

export function useBlogPostsByCategory(category: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPostsByCategory() {
      try {
        setLoading(true);
        setError(null);
        const fetchedPosts = await blogAPI.getBlogPostsByCategory(category);
        setPosts(fetchedPosts);
      } catch (e) {
        console.error('Error loading posts by category:', e);
        setError('Greška pri učitavanju vesti');
      } finally {
        setLoading(false);
      }
    }

    if (category) {
      loadPostsByCategory();
    }
  }, [category]);

  return { posts, loading, error };
}