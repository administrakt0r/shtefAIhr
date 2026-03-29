import { type BlogPost, comparePostsByPublishedAt } from "@/lib/blog";

const DEFAULT_AUTHOR = "Shtef";
const DEFAULT_AVATAR = "/images/avatars/1.webp";

const NEWS = "AI vijesti" as const;
const ANALYSIS = "Analiza" as const;

export const getPostImagePath = (slug: string) => `/images/posts/${slug}.png`;

export const slugifyCroatian = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replaceAll("đ", "dj")
    .normalize("NFKD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .replaceAll(/-{2,}/g, "-");

type SourcePost = Omit<
  BlogPost,
  "author" | "avatarUrl" | "imageUrl" | "slug" | "contentSlug"
> & {
  slug: string;
} & Partial<Pick<BlogPost, "author" | "avatarUrl" | "imageUrl">>;

const createPost = (post: SourcePost): BlogPost => {
  const {
    slug: contentSlug,
    author = DEFAULT_AUTHOR,
    avatarUrl = DEFAULT_AVATAR,
    imageUrl,
    ...rest
  } = post;

  const slug = slugifyCroatian(post.title);

  return {
    author,
    avatarUrl,
    contentSlug,
    slug,
    imageUrl: imageUrl ?? getPostImagePath(slug),
    ...rest,
  };
};

export const blogPosts: BlogPost[] = [
  createPost({
    id: 2,
    slug: "zasto-je-agi-obicna-distrakcija-od-stvarnih-problema",
    title: "Zašto je AGI obična distrakcija od stvarnih problema",
    description:
      "Opsesija umjetnom općom inteligencijom (AGI) skreće pozornost s ključnih problema današnjih modela, poput pouzdanosti, sigurnosti i stvarne primjenjivosti.",
    imageAlt: "Ilustracija uz članak: Zašto je AGI obična distrakcija od stvarnih problema",
    publishedOn: "2026-03-29",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 1,
    slug: "google-predstavlja-gemini-3-1-flash-live-za-glasovni-ai",
    title: "Google predstavlja Gemini 3.1 Flash Live za glasovni AI",
    description:
      "Novi Googleov audio model ubrzava razgovor s AI-jem, bolje prati ton govora i cilja agente koji moraju pouzdano odraditi složenije zadatke.",
    imageAlt:
      "Ilustracija uz članak: Google predstavlja Gemini 3.1 Flash Live za glasovni AI",
    publishedOn: "2026-03-28",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 2,
    slug: "zasto-je-openai-ugasio-soru",
    title: "Zašto je OpenAI iznenada ugasio Soru",
    description:
      "OpenAI odustaje od svog modela za generiranje videa zbog visokih troškova i snažne konkurencije, fokusirajući se na poslovne alate.",
    imageAlt:
      "Ilustracija uz članak: Zašto je OpenAI iznenada ugasio Soru",
    publishedOn: "2026-03-29",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
];

export const assertUniqueSlugs = (posts: BlogPost[]) => {
  const postSlugs = new Set<string>()

  for (const post of posts) {
    if (postSlugs.has(post.slug)) {
      throw new Error(`Duplicate Croatian post slug detected: ${post.slug}`)
    }

    postSlugs.add(post.slug)
  }
}

assertUniqueSlugs(blogPosts)

export const sortedBlogPosts = [...blogPosts].sort(comparePostsByPublishedAt)
