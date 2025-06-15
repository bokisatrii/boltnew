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

export interface BlogApiResponse {
  success: boolean;
  data: BlogPost[];
}