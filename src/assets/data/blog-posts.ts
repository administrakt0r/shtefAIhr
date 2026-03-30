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
    slug: "zasto-je-agi-obicna-distrakcija-od-stvarnih-problema",
    title: "Zašto je AGI obična distrakcija od stvarnih problema",
    description:
      "Opsesija umjetnom općom inteligencijom skreće pozornost s ključnih problema današnjih modela, poput pouzdanosti, sigurnosti i stvarne primjenjivosti.",
    imageAlt:
      "Ilustracija uz članak: Zašto je AGI obična distrakcija od stvarnih problema",
    publishedOn: "2026-03-29",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 3,
    slug: "zasto-je-openai-ugasio-soru",
    title: "Zašto je OpenAI iznenada ugasio Soru",
    description:
      "OpenAI odustaje od svog modela za generiranje videa zbog visokih troškova i snažne konkurencije, fokusirajući se na poslovne alate.",
    imageAlt: "Ilustracija uz članak: Zašto je OpenAI iznenada ugasio Soru",
    publishedOn: "2026-03-29",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 4,
    slug: "hype-oko-ai-agenata-ne-prati-stvarnost",
    title: "Hype oko AI agenata još uvijek ne prati stvarnost",
    description:
      "Unatoč obećanjima o potpuno autonomnim sustavima, pravi razvojni proces s AI agentima i dalje zahtijeva intenzivan nadzor i rješavanje rubnih slučajeva.",
    imageAlt:
      "Ilustracija uz članak: Hype oko AI agenata još uvijek ne prati stvarnost",
    publishedOn: "2026-03-30",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 5,
    slug: "anthropic-predstavlja-cowork-desktop-agenta",
    title: "Anthropic predstavlja Cowork desktop agenta",
    description:
      "Anthropic uvodi Cowork, desktop agenta koji netehničkim korisnicima omogućuje rad s lokalnim datotekama kroz jednostavnije sučelje od Claude Codea.",
    imageAlt:
      "Ilustracija uz članak: Anthropic predstavlja Cowork desktop agenta",
    publishedOn: "2026-03-29",
    category: NEWS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 6,
    slug: "gasenje-sore-otrijeznjenje-za-ai-video",
    title: "Gašenje Sore moglo bi biti trenutak otriježnjenja za AI video",
    description:
      "Gašenje Sore pokazuje koliko je teško pretvoriti generativni video u održiv proizvod, čak i kada iza njega stoji OpenAI.",
    imageAlt:
      "Ilustracija uz članak: Gašenje Sore moglo bi biti trenutak otriježnjenja za AI video",
    publishedOn: "2026-03-30",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 7,
    slug: "otvoreni-kod-nece-sam-od-sebe-pobijediti",
    title: "Otvoreni kod neće sam od sebe pobijediti u AI utrci",
    description:
      "Otvoreni kod ostaje važan korektiv u AI-ju, ali bez računalne moći i kapitala ne može sam slomiti dominaciju velikih korporacija.",
    imageAlt:
      "Ilustracija uz članak: Otvoreni kod neće sam od sebe pobijediti u AI utrci",
    publishedOn: "2026-04-01",
    category: ANALYSIS,
    readTime: 3,
    featured: false,
  }),
];

const assertUniqueField = (
  posts: BlogPost[],
  fieldName: "id" | "slug" | "contentSlug",
) => {
  const values = new Set<string | number>();

  for (const post of posts) {
    const value = post[fieldName];

    if (values.has(value)) {
      throw new Error(`Duplicate blog post ${fieldName} detected: ${value}`);
    }

    values.add(value);
  }
};

export const assertUniqueBlogPosts = (posts: BlogPost[]) => {
  assertUniqueField(posts, "id");
  assertUniqueField(posts, "slug");
  assertUniqueField(posts, "contentSlug");
};

assertUniqueBlogPosts(blogPosts);

export const sortedBlogPosts = [...blogPosts].sort(comparePostsByPublishedAt);
