import { useState, useEffect } from 'react';
import { BlogPost, blogAPI } from '../services/blogApi'; // Make sure this path matches your actual file

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);
        const fetchedPosts = await blogAPI.fetchBlogPosts();
        
        // Prevent setting state if component was unmounted
        if (!isCancelled) {
          setPosts(fetchedPosts);
        }
      } catch (e) {
        if (!isCancelled) {
          console.error('Error loading blog posts:', e);
          setError('Greška pri učitavanju vesti');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    // Cleanup function
    return () => {
      isCancelled = true;
    };
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
    let isCancelled = false;

    async function loadPost() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedPost = await blogAPI.getBlogPostBySlug(slug);
        
        if (!isCancelled) {
          setPost(fetchedPost);
          
          if (!fetchedPost) {
            setError('Članak nije pronađen');
          }
        }
      } catch (e) {
        if (!isCancelled) {
          console.error('Error loading blog post:', e);
          setError('Greška pri učitavanju članka');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadPost();

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, [slug]);

  return { post, loading, error };
}

export function useBlogPostsByCategory(category: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadPostsByCategory() {
      try {
        setLoading(true);
        setError(null);
        const fetchedPosts = await blogAPI.getBlogPostsByCategory(category);
        
        if (!isCancelled) {
          setPosts(fetchedPosts);
        }
      } catch (e) {
        if (!isCancelled) {
          console.error('Error loading posts by category:', e);
          setError('Greška pri učitavanju vesti');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    if (category) {
      loadPostsByCategory();
    }

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, [category]);

  return { posts, loading, error };
}