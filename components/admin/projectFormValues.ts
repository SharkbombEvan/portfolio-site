// Plain module (no "use client") so server pages can import the defaults.
export type Img = { url: string; alt?: string };

export type ProjectFormValues = {
  title: string;
  slug: string;
  summary: string;
  content: string;
  audioSummary: string;
  audioContent: string;
  tech: string[];
  coverImage: string;
  demoUrl: string;
  repoUrl: string;
  shopUrl: string;
  price: string;
  isProduct: boolean;
  areas: string[];
  featured: boolean;
  featuredOrder: string;
  audioFeatured: boolean;
  role: string;
  year: string;
  context: string;
  highlights: string[];
  images: Img[];
};

export const EMPTY_PROJECT: ProjectFormValues = {
  title: "", slug: "", summary: "", content: "", audioSummary: "", audioContent: "",
  tech: [], coverImage: "", demoUrl: "", repoUrl: "", shopUrl: "", price: "",
  isProduct: false, areas: [], featured: false, featuredOrder: "", audioFeatured: false,
  role: "", year: "", context: "", highlights: [], images: [],
};
