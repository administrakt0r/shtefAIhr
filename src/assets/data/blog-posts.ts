import { type BlogPost, comparePostsByPublishedAt } from "@/lib/blog";

const DEFAULT_AUTHOR = "Shtef";
const DEFAULT_AVATAR = "/images/avatars/1.webp";

const NEWS = "AI vijesti" as const;
const ANALYSIS = "Analiza" as const;

export const getPostImagePath = (slug: string) => `/images/posts/${slug}.webp`;
export const getPostSocialImagePath = (slug: string) =>
  `/images/posts/${slug}.png`;

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
  "author" | "avatarUrl" | "imageUrl" | "socialImageUrl" | "slug" | "contentSlug"
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
    socialImageUrl: getPostSocialImagePath(slug),
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
  createPost({
    id: 8,
    slug: "google-ubrzava-pripreme-za-q-day",
    title: "Google ubrzava pripreme za Q Day na 2029. godinu",
    description:
      "Google je značajno skratio rok za pripremu na Q Day, najavljujući integraciju post-kvantne kriptografije u Android do 2029. godine.",
    imageAlt:
      "Ilustracija uz članak: Google ubrzava pripreme za Q Day na 2029. godinu",
    publishedOn: "2026-03-30",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 9,
    slug: "github-povlaci-reklame-iz-copilot-pull-requestova",
    title: "GitHub povlači reklame iz Copilot pull requestova nakon pritužbi",
    description:
      "Nakon burnih reakcija korisnika, GitHub je onemogućio funkcionalnost kojom je AI alat Copilot umetao reklamne poruke u pull requestove drugih developera.",
    imageAlt:
      "Ilustracija uz članak: GitHub povlači reklame iz Copilot pull requestova",
    publishedOn: "2026-03-31",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 10,
    slug: "ai-alati-ubrzavaju-tehnicki-dug",
    title: "AI alati ne smanjuju tehnički dug, već ga ubrzavaju",
    description:
      "Umjesto da rješavaju probleme, AI alati za generiranje koda ih eksponencijalno množe, stvarajući strukturno krhke sustave i dugoročni tehnički dug brže nego ikada.",
    imageAlt:
      "Ilustracija uz članak: AI alati ne smanjuju tehnički dug, već ga ubrzavaju",
    publishedOn: "2026-03-31",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 11,
    slug: "ai-ne-donosi-novu-kreativnost-vec-masovnu-prosjecnost",
    title: "AI ne donosi novu kreativnost, već masovnu prosječnost",
    description:
      "Generativni alati obećavali su renesansu mašte, ali zapravo stvaraju beskrajno more predvidljivog i osrednjeg sadržaja na uštrb prave ljudske inovacije.",
    imageAlt:
      "Ilustracija uz članak: AI ne donosi novu kreativnost, već masovnu prosječnost",
    publishedOn: "2026-03-31",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 12,
    slug: "curenje-izvornog-koda-claude-code",
    title: "Curenje izvornog koda Claude Code otkriva nove značajke",
    description:
      "Nakon pogreške pri pakiranju, Anthropic je nenamjerno objavio više od pola milijuna linija koda za svoj AI alat za programiranje.",
    imageAlt:
      "Ilustracija uz članak: Curenje izvornog koda Claude Code otkriva nove značajke",
    publishedOn: "2026-04-01",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 13,
    slug: "ai-agenti-mit-o-potpunoj-autonomiji",
    title: "Mit o potpunoj autonomiji AI agenata u razvoju",
    description:
      "Zašto obećanja o potpuno autonomnim AI programerima zanemaruju stvarnu složenost softverskog inženjerstva i stvaraju opasan tehnički dug.",
    imageAlt:
      "Ilustracija uz članak: Mit o potpunoj autonomiji AI agenata u razvoju",
    publishedOn: "2026-04-01",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 14,
    slug: "anthropic-slucajno-uklonio-tisuce-github-repozitorija",
    title: "Anthropic slučajno uklonio tisuće GitHub repozitorija zbog koda",
    description:
      "Anthropic je greškom uzrokovao uklanjanje tisuća repozitorija koda na platformi GitHub prilikom pokušaja da s interneta ukloni procurjele kopije izvornog koda svog Claude Code alata.",
    imageAlt:
      "Ilustracija uz članak: Anthropic slučajno uklonio tisuće GitHub repozitorija zbog koda",
    publishedOn: "2026-04-01",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 15,
    slug: "openai-kupio-tbpn",
    title: "OpenAI kupio popularnu tehnološku emisiju TBPN",
    description:
      "OpenAI preuzeo popularnu poslovnu talk-show emisiju TBPN u nastojanju da poboljša svoj javni imidž narušen nedavnim kontroverzama.",
    imageAlt: "Ilustracija mikrofona s logotipom OpenAI-ja",
    publishedOn: "2026-04-02",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 16,
    slug: "zasto-prompt-inzenjering-nece-biti-posao-buducnosti",
    title: "Zašto prompt inženjering neće biti posao budućnosti",
    description:
      "Pisanje uputa za AI je prolazna vještina, a ne dugoročna karijera. Sposobnost strukturiranja specifičnih uputa za modele samo je privremena zakrpa za nesavršenosti sučelja.",
    imageAlt: "Ilustracija: Zašto prompt inženjering neće biti posao budućnosti",
    publishedOn: "2026-04-03",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 17,
    slug: "anthropic-kupio-biotech-startup-coefficient-bio",
    title: "Anthropic kupio biotech startup Coefficient Bio u poslu od 400 milijuna",
    description:
      "Anthropic je kupio Coefficient Bio, biotehnološki AI startup koji je dosad djelovao u tajnosti, u poslu vrijednom oko 400 milijuna dolara u dionicama.",
    imageAlt: "Ilustracija: Anthropic kupio biotech startup Coefficient Bio",
    publishedOn: "2026-04-03",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 18,
    slug: "zasto-je-dosada-najbolja-stvar-za-ai",
    title: "Zašto je dosada najbolja stvar koja se mogla dogoditi AI-ju",
    description:
      "Usporavanje tempa inovacija kod velikih jezičnih modela i pad medijskog entuzijazma zapravo označavaju prelazak AI-ja iz eksperimentalne faze u zrelu, pouzdanu infrastrukturu.",
    imageAlt: "Ilustracija: Zašto je dosada najbolja stvar koja se mogla dogoditi AI-ju",
    publishedOn: "2026-04-04",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 19,
    slug: "openai-agi-sefica-uzima-bolovanje-promjene-u-vodstvu",
    title: "OpenAI prolazi kroz nove promjene u vodstvu",
    description:
      "Čelnica za implementaciju AGI-ja u OpenAI-ju uzima višetjedno bolovanje, što pokreće niz promjena u višem menadžmentu.",
    imageAlt: "Ilustracija: OpenAI prolazi kroz nove promjene u vodstvu",
    publishedOn: "2026-04-04",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 20,
    slug: "ai-alati-pretvaraju-seniore-u-ispravljace-gresaka",
    title: "AI alati pretvaraju seniore u ispravljače tuđih grešaka",
    description:
      "Umjesto da zamijene juniore, generativni AI alati prisiljavaju najiskusnije inženjere na neprekidno ispravljanje osrednjeg koda.",
    imageAlt: "Ilustracija: AI alati pretvaraju seniore u ispravljače tuđih grešaka",
    publishedOn: "2026-04-05",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 21,
    slug: "copilot-entertainment-purposes-only",
    title: "Microsoft priznaje: Copilot služi samo za zabavu",
    description: "Uvjeti korištenja otkrivaju stvarno stanje Microsoftovog AI alata. Tvrtka upozorava da se ne oslanjate na Copilot za važne savjete.",
    category: NEWS,
    imageAlt: "Microsoft Copilot logo uz tekst upozorenja",
    publishedOn: "2026-04-05",
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 22,
    slug: "umjetna-inteligencija-nece-zamijeniti-prave-softverske-inzenjere",
    title: "Umjetna inteligencija neće zamijeniti prave softverske inženjere",
    description:
      "Pisanje koda zapravo je najlakši dio softverskog inženjerstva, a generativni AI alati ne mogu zamijeniti ljudsko razumijevanje poslovnog konteksta.",
    imageAlt: "Ilustracija: Umjetna inteligencija neće zamijeniti prave softverske inženjere",
    category: ANALYSIS,
    publishedOn: "2026-04-06",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 23,
    slug: "google-gemma-4-otvoreni-modeli",
    title: "Google predstavlja Gemma 4: Najinteligentniji otvoreni modeli do sada",
    description:
      "Google je predstavio Gemma 4 obitelj otvorenih jezičnih modela, optimiziranih za složeno rasuđivanje i lokalno izvođenje pod Apache 2.0 licencom.",
    imageAlt: "Ilustracija uz članak: Google predstavlja Gemma 4 otvorene modele",
    category: NEWS,
    publishedOn: "2026-04-06",
    readTime: 3,
    featured: false,
  }),

  createPost({
    id: 24,
    slug: "prava-cijena-ai-koda-jeftino-pisanje-skupo-citanje",
    title: "Prava cijena AI koda: Jeftino pisanje, skupo čitanje",
    description: "Alati za generiranje koda ubrzavaju početni razvoj, ali stvaraju nepregledne sustave koji dugoročno višestruko povećavaju troškove održavanja.",
    imageAlt: "Ilustracija uz članak: Prava cijena AI koda: Jeftino pisanje, skupo čitanje",
    publishedOn: "2026-04-07",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 25,
    slug: "anthropic-mythos-zero-day",
    title: "Anthropic predstavio AI model Mythos koji generira zero-day ranjivosti",
    description: "Anthropic je stvorio novi AI model nazvan Mythos, sposoban za pronalaženje i iskorištavanje zero-day ranjivosti, ali ga je odlučio ne objaviti javnosti.",
    imageAlt: "Ilustracija uz članak: Anthropic predstavio AI model Mythos koji generira zero-day ranjivosti",
    publishedOn: "2026-04-08",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 26,
    slug: "ai-kodiranje-unistava-vjestinu-softverske-arhitekture",
    title: "Umjetna inteligencija uništava vještinu softverske arhitekture",
    description: "Alati za generiranje koda potiču brza rješenja umjesto promišljenog dizajna sustava, što dugoročno rezultira krhkim i neodrživim aplikacijama.",
    imageAlt: "Ilustracija uz članak: Umjetna inteligencija uništava vještinu softverske arhitekture",
    publishedOn: "2026-04-08",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 27,
    slug: "poke-ai-agenti-putem-poruka",
    title: "Startup Poke donosi AI agente u obliku tekstualnih poruka",
    description: "Nova platforma omogućava pristup AI asistentima za svakodnevne zadatke direktno putem SMS-a, iMessagea i drugih aplikacija za poruke.",
    imageAlt: "Ilustracija uz članak: Startup Poke donosi AI agente u obliku tekstualnih poruka",
    publishedOn: "2026-04-08",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 28,
    slug: "opsesija-agi-jem-unistava-stvarne-inovacije",
    title: "Opsesija AGI-jem uništava rješavanje stvarnih problema",
    description: "Zašto stalna potraga za općom umjetnom inteligencijom zanemaruje stvarne poslovne potrebe i stvara jaz između obećanja AI tvrtki i stvarne ekonomije.",
    imageAlt: "Ilustracija uz članak: Opsesija AGI-jem uništava rješavanje stvarnih problema",
    publishedOn: "2026-04-09",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 29,
    slug: "chatgpt-pro-subscription-new",
    title: "OpenAI uveo ChatGPT Pro pretplatu za 100 dolara mjesečno",
    description: "Nova razina pretplate cilja na intenzivne korisnike alata Codex i izravno konkurira Anthropicovoj ponudi.",
    imageAlt: "Ilustracija uz članak: OpenAI uveo ChatGPT Pro pretplatu za 100 dolara mjesečno",
    publishedOn: "2026-04-10",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 30,
    slug: "iluzija-autonomije-lazni-ai-agenti",
    title: "Iluzija autonomije: Tržište prodaje lažne AI agente",
    description: "Kako smo jednostavne skripte počeli nazivati autonomnim agentima i zašto je rebrendiranje stare tehnologije opasno.",
    imageAlt: "Ilustracija uz članak: Iluzija autonomije: Tržište prodaje lažne AI agente",
    publishedOn: "2026-04-10",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 31,
    slug: "chatgpt-pro-plan",
    title: "OpenAI predstavio ChatGPT Pro paket od 100 dolara mjesečno",
    description: "Novi Pro paket nudi veće kapacitete za programere i izravan je odgovor na ponudu tvrtke Anthropic.",
    imageAlt: "Ilustracija ChatGPT sučelja",
    publishedOn: "2026-04-10",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 32,
    slug: "od-impresivne-prezentacije-do-nocne-more-u-produkciji",
    title: "Od impresivne prezentacije do noćne more u produkciji",
    description: "Generativna umjetna inteligencija blista na pozornicama, ali se slama pod teretom složenih produkcijskih sustava.",
    imageAlt: "Ilustracija razlike između AI demoa i produkcije",
    publishedOn: "2026-04-11",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 33,
    slug: "florida-launches-investigation-openai",
    title: "Florida pokreće istragu protiv OpenAI-ja zbog sigurnosnih rizika",
    description: "Državna odvjetništva istražuju OpenAI zbog navodnih veza s kriminalnim ponašanjem i nacionalnim sigurnosnim rizicima.",
    imageAlt: "Ilustracija istrage protiv OpenAI-ja",
    publishedOn: "2026-04-12",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 34,
    slug: "ai-alati-za-kodiranje-iluzija-brzine",
    title: "AI alati za kodiranje: Iluzija brzine i produktivnosti",
    description: "Svi tvrde da uz umjetnu inteligenciju pišu kod brže, no pravi problemi i tehnički dug nastaju nakon generiranja koda.",
    imageAlt: "Ilustracija AI alata za programiranje",
    publishedOn: "2026-04-12",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 35,
    slug: "trump-duznosnici-poticu-banke-testiranje-anthropic-mythos",
    title: "Trumpovi dužnosnici potiču banke na testiranje Anthropic Mythos modela",
    description: "Američki državni dužnosnici preporučili su vodećim bankama testiranje novog AI modela tvrtke Anthropic za otkrivanje sigurnosnih ranjivosti, unatoč pravnom sporu.",
    imageAlt: "Zgrada banke i digitalna sigurnosna mreža",
    publishedOn: "2026-04-13",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 36,
    slug: "balon-ai-infrastrukture-gradimo-autoceste",
    title: "Balon AI infrastrukture: Gradimo autoceste bez vozila",
    description: "Milijarde se ulažu u data centre i čipove, dok pravi softverski proizvodi koji donose vrijednost još uvijek ozbiljno kaskaju za infrastrukturom.",
    imageAlt: "Ilustracija balona AI infrastrukture",
    publishedOn: "2026-04-13",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 37,
    slug: "openai-kupuje-startup-hiro-finance",
    title: "OpenAI kupuje startup Hiro Finance i jača financijski tim",
    description: "OpenAI je preuzeo startup Hiro Finance u obliku akvizicije stručnog kadra, čime jača svoje kapacitete na području financijske matematike i planiranja.",
    imageAlt: "Ilustracija financijskog planiranja i umjetne inteligencije",
    publishedOn: "2026-04-14",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 38,
    slug: "od-programera-do-recenzenta",
    title: "Od programera do glavnog recenzenta koda: Stvarnost AI alata",
    description: "Umjetna inteligencija mijenja naš posao iz pisanja koda u njegovo kritičko vrednovanje. AI alati mijenjaju ulogu programera iz onih koji pišu kod u one koji ga pregledavaju.",
    publishedOn: "2026-04-14",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt: "Od programera do recenzenta koda",
  }),
  createPost({
    id: 39,
    slug: "anthropic-uspon-brine-openai-investitore",
    title: "Uspon Anthropica brine OpenAI investitore",
    description: "Neki investitori u OpenAI počinju sumnjati u procjenu vrijednosti tvrtke od 852 milijarde dolara zbog brzog uspona Anthropica.",
    publishedOn: "2026-04-15",
    category: NEWS,
    readTime: 3,
    featured: false,
    imageAlt: "Ilustracija ulaganja u AI tvrtke i financijskog rasta",
  }),
  createPost({
    id: 40,
    slug: "umjetna-empatija-najopasniji-proizvod-ai-industrije",
    title: "Umjetna empatija je najopasniji proizvod AI industrije",
    description: "Umjetna inteligencija koja simulira emocije stvara iluziju povezanosti, produbljuje usamljenost i uči nas izbjegavanju stvarnih ljudskih odnosa.",
    publishedOn: "2026-04-16",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt: "Ilustracija osobe koja komunicira s umjetnom inteligencijom u izolaciji",
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
