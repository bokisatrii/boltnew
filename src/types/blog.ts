export interface RawBlogPost {
  id: string;
  naslov: string;
  datum: string;
  tekst: string;
  slika: string;
  slug: string;
  autor: string;
  category: string; // comma-separated string from API
}

export interface BlogPost {
  id: string;
  naslov: string;
  datum: string;
  tekst: string;
  slika: string;
  slug: string;
  autor: string;
  category: string[]; // processed array of categories
}

export interface BlogApiResponse {
  success: boolean;
  data: RawBlogPost[];
}