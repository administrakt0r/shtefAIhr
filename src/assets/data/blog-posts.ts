import {
  type BlogPost,
  comparePostsByPublishedAt,
  isPostPublished,
} from "@/lib/blog";

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
  | "author"
  | "avatarUrl"
  | "imageUrl"
  | "socialImageUrl"
  | "slug"
  | "contentSlug"
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
    imageAlt:
      "Ilustracija: Zašto prompt inženjering neće biti posao budućnosti",
    publishedOn: "2026-04-03",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 17,
    slug: "anthropic-kupio-biotech-startup-coefficient-bio",
    title:
      "Anthropic kupio biotech startup Coefficient Bio u poslu od 400 milijuna",
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
    imageAlt:
      "Ilustracija: Zašto je dosada najbolja stvar koja se mogla dogoditi AI-ju",
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
    imageAlt:
      "Ilustracija: AI alati pretvaraju seniore u ispravljače tuđih grešaka",
    publishedOn: "2026-04-05",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 21,
    slug: "copilot-entertainment-purposes-only",
    title: "Microsoft priznaje: Copilot služi samo za zabavu",
    description:
      "Uvjeti korištenja otkrivaju stvarno stanje Microsoftovog AI alata. Tvrtka upozorava da se ne oslanjate na Copilot za važne savjete.",
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
    imageAlt:
      "Ilustracija: Umjetna inteligencija neće zamijeniti prave softverske inženjere",
    category: ANALYSIS,
    publishedOn: "2026-04-06",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 23,
    slug: "google-gemma-4-otvoreni-modeli",
    title:
      "Google predstavlja Gemma 4: Najinteligentniji otvoreni modeli do sada",
    description:
      "Google je predstavio Gemma 4 obitelj otvorenih jezičnih modela, optimiziranih za složeno rasuđivanje i lokalno izvođenje pod Apache 2.0 licencom.",
    imageAlt:
      "Ilustracija uz članak: Google predstavlja Gemma 4 otvorene modele",
    category: NEWS,
    publishedOn: "2026-04-06",
    readTime: 3,
    featured: false,
  }),

  createPost({
    id: 24,
    slug: "prava-cijena-ai-koda-jeftino-pisanje-skupo-citanje",
    title: "Prava cijena AI koda: Jeftino pisanje, skupo čitanje",
    description:
      "Alati za generiranje koda ubrzavaju početni razvoj, ali stvaraju nepregledne sustave koji dugoročno višestruko povećavaju troškove održavanja.",
    imageAlt:
      "Ilustracija uz članak: Prava cijena AI koda: Jeftino pisanje, skupo čitanje",
    publishedOn: "2026-04-07",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 25,
    slug: "anthropic-mythos-zero-day",
    title:
      "Anthropic predstavio AI model Mythos koji generira zero-day ranjivosti",
    description:
      "Anthropic je stvorio novi AI model nazvan Mythos, sposoban za pronalaženje i iskorištavanje zero-day ranjivosti, ali ga je odlučio ne objaviti javnosti.",
    imageAlt:
      "Ilustracija uz članak: Anthropic predstavio AI model Mythos koji generira zero-day ranjivosti",
    publishedOn: "2026-04-08",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 26,
    slug: "ai-kodiranje-unistava-vjestinu-softverske-arhitekture",
    title: "Umjetna inteligencija uništava vještinu softverske arhitekture",
    description:
      "Alati za generiranje koda potiču brza rješenja umjesto promišljenog dizajna sustava, što dugoročno rezultira krhkim i neodrživim aplikacijama.",
    imageAlt:
      "Ilustracija uz članak: Umjetna inteligencija uništava vještinu softverske arhitekture",
    publishedOn: "2026-04-08",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 27,
    slug: "poke-ai-agenti-putem-poruka",
    title: "Startup Poke donosi AI agente u obliku tekstualnih poruka",
    description:
      "Nova platforma omogućava pristup AI asistentima za svakodnevne zadatke direktno putem SMS-a, iMessagea i drugih aplikacija za poruke.",
    imageAlt:
      "Ilustracija uz članak: Startup Poke donosi AI agente u obliku tekstualnih poruka",
    publishedOn: "2026-04-08",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 28,
    slug: "opsesija-agi-jem-unistava-stvarne-inovacije",
    title: "Opsesija AGI-jem uništava rješavanje stvarnih problema",
    description:
      "Zašto stalna potraga za općom umjetnom inteligencijom zanemaruje stvarne poslovne potrebe i stvara jaz između obećanja AI tvrtki i stvarne ekonomije.",
    imageAlt:
      "Ilustracija uz članak: Opsesija AGI-jem uništava rješavanje stvarnih problema",
    publishedOn: "2026-04-09",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 29,
    slug: "chatgpt-pro-subscription-new",
    title: "OpenAI uveo ChatGPT Pro pretplatu za 100 dolara mjesečno",
    description:
      "Nova razina pretplate cilja na intenzivne korisnike alata Codex i izravno konkurira Anthropicovoj ponudi.",
    imageAlt:
      "Ilustracija uz članak: OpenAI uveo ChatGPT Pro pretplatu za 100 dolara mjesečno",
    publishedOn: "2026-04-10",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 30,
    slug: "iluzija-autonomije-lazni-ai-agenti",
    title: "Iluzija autonomije: Tržište prodaje lažne AI agente",
    description:
      "Kako smo jednostavne skripte počeli nazivati autonomnim agentima i zašto je rebrendiranje stare tehnologije opasno.",
    imageAlt:
      "Ilustracija uz članak: Iluzija autonomije: Tržište prodaje lažne AI agente",
    publishedOn: "2026-04-10",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 31,
    slug: "chatgpt-pro-plan",
    title: "OpenAI predstavio ChatGPT Pro paket od 100 dolara mjesečno",
    description:
      "Novi Pro paket nudi veće kapacitete za programere i izravan je odgovor na ponudu tvrtke Anthropic.",
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
    description:
      "Generativna umjetna inteligencija blista na pozornicama, ali se slama pod teretom složenih produkcijskih sustava.",
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
    description:
      "Državna odvjetništva istražuju OpenAI zbog navodnih veza s kriminalnim ponašanjem i nacionalnim sigurnosnim rizicima.",
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
    description:
      "Svi tvrde da uz umjetnu inteligenciju pišu kod brže, no pravi problemi i tehnički dug nastaju nakon generiranja koda.",
    imageAlt: "Ilustracija AI alata za programiranje",
    publishedOn: "2026-04-12",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 35,
    slug: "trump-duznosnici-poticu-banke-testiranje-anthropic-mythos",
    title:
      "Trumpovi dužnosnici potiču banke na testiranje Anthropic Mythos modela",
    description:
      "Američki državni dužnosnici preporučili su vodećim bankama testiranje novog AI modela tvrtke Anthropic za otkrivanje sigurnosnih ranjivosti, unatoč pravnom sporu.",
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
    description:
      "Milijarde se ulažu u data centre i čipove, dok pravi softverski proizvodi koji donose vrijednost još uvijek ozbiljno kaskaju za infrastrukturom.",
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
    description:
      "OpenAI je preuzeo startup Hiro Finance u obliku akvizicije stručnog kadra, čime jača svoje kapacitete na području financijske matematike i planiranja.",
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
    description:
      "Umjetna inteligencija mijenja naš posao iz pisanja koda u njegovo kritičko vrednovanje. AI alati mijenjaju ulogu programera iz onih koji pišu kod u one koji ga pregledavaju.",
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
    description:
      "Neki investitori u OpenAI počinju sumnjati u procjenu vrijednosti tvrtke od 852 milijarde dolara zbog brzog uspona Anthropica.",
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
    description:
      "Umjetna inteligencija koja simulira emocije stvara iluziju povezanosti, produbljuje usamljenost i uči nas izbjegavanju stvarnih ljudskih odnosa.",
    publishedOn: "2026-04-16",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt:
      "Ilustracija osobe koja komunicira s umjetnom inteligencijom u izolaciji",
  }),
  createPost({
    id: 41,
    slug: "mit-o-otvorenom-ai-ju-zasto-open-source-ne-donosi-demokratizaciju",
    title: "Mit o otvorenom AI-ju: Zašto open source ne donosi demokratizaciju",
    description:
      "Otvoreni modeli daju privid demokratizacije, ali stvarna moć leži u vlasništvu nad podacima i računalnoj infrastrukturi koju kontroliraju giganti.",
    publishedOn: "2026-04-17",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
    imageAlt: "Ilustracija iluzije otvorenog koda u tehnološkoj industriji",
  }),
  createPost({
    id: 42,
    slug: "zasto-je-lov-na-agi-opasna-distrakcija",
    title: "Zašto je lov na AGI opasna distrakcija za industriju",
    description:
      "Industrija se fokusira na nerealna obećanja o AGI-ju. To nas odvraća od prave vrijednosti današnjih AI alata.",
    imageAlt:
      "Futuristička apstraktna vizualizacija koja simbolizira iluziju AGI-ja",
    publishedOn: "2026-04-16",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 43,
    slug: "openai-codex-updates-use-macos",
    title: "OpenAI Codex sada može samostalno upravljati macOS aplikacijama",
    description:
      "OpenAI je značajno nadogradio Codex paketom novih agenatskih mogućnosti koje omogućuju izravno korištenje desktop aplikacija.",
    imageAlt:
      "Ilustracija umjetne inteligencije koja upravlja računalom i programira",
    publishedOn: "2026-04-16",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 44,
    slug: "paradoks-produktivnosti-ai",
    title: "AI je trebao donijeti slobodno vrijeme, donio je više posla",
    description:
      "Alati za produktivnost koji su nas trebali osloboditi rutine samo su podigli ljestvicu očekivanja i ubrzali tempo rada.",
    imageAlt:
      "Ilustracija osobe preopterećene tehnologijom i brzim tempom rada",
    publishedOn: "2026-04-18",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 45,
    slug: "opsesija-agijem-zamagljuje-pravu-vrijednost-ai",
    title: "Opsesija AGI-jem zamagljuje pravu vrijednost umjetne inteligencije",
    description:
      "Stalno obećavanje opće umjetne inteligencije stvara nerealna očekivanja i zanemaruje stvarne probleme koje trenutni alati već mogu riješiti.",
    imageAlt:
      "Ilustracija koja prikazuje fokus na futuristički AGI umjesto na praktične alate",
    publishedOn: "2026-04-18",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 46,
    slug: "openai-gubi-kljucne-ljude",
    title:
      "OpenAI nastavlja sa zatvaranjem sporednih projekata i gubi ključne ljude",
    description:
      "Kevin Weil i Bill Peebles napuštaju tvrtku uslijed konsolidacije oko poslovne umjetne inteligencije.",
    imageAlt: "Logotip tvrtke OpenAI",
    publishedOn: "2026-04-17",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 47,
    slug: "zasto-je-opsesija-agi-jem-opasna-distrakcija",
    title: "Zašto je opsesija AGI-jem zapravo opasna distrakcija",
    description:
      "Fokus na umjetnu opću inteligenciju omogućava tehnološkim divovima da izbjegnu odgovornost za stvarne probleme današnjice.",
    imageAlt: "Apstraktni prikaz umjetne inteligencije i čovječanstva.",
    publishedOn: "2026-04-18",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 48,
    slug: "cursor-u-pregovorima-za-2-milijarde-dolara",
    title:
      "Cursor u pregovorima za novih 2 milijarde dolara uz procjenu od 50 milijardi",
    description:
      "Startup za AI kodiranje Cursor, poznat i kao Anysphere, blizu je novog kruga financiranja u kojem bi trebao prikupiti najmanje 2 milijarde dolara, uz udvostručenje vrijednosti na 50 milijardi dolara.",
    imageAlt: "Cursor u pregovorima za novo financiranje",
    publishedOn: "2026-04-17",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),

  createPost({
    id: 49,
    slug: "zasto-je-chat-sucelje-pogresan-smjer-za-vecinu-ai-alata",
    title: "Zašto je chat sučelje pogrešan smjer za većinu AI alata",
    description:
      "Razgovorni agenti stvaraju preveliki kognitivni teret jer skrivaju opcije i prisiljavaju korisnika na složene upute.",
    imageAlt:
      "Ilustracija korisnika koji gleda u prazno tekstualno polje chatbota",
    publishedOn: "2026-04-19",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),

  createPost({
    id: 50,
    slug: "sinteticki-podaci-kako-ai-truje-vlastiti-izvor",
    title: "Sintetički podaci: Kako umjetna inteligencija truje vlastiti izvor",
    description:
      "Oslanjanje na umjetno generirane podatke za trening novih modela vodi nas u tehnološku slijepu ulicu.",
    imageAlt: "Ilustracija beskonačnog recikliranja podataka u AI sustavima",
    publishedOn: "2026-04-20",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),

  createPost({
    id: 51,
    slug: "anthropic-mythos-threat-white-house",
    title:
      "Anthropic Mythos prijetnja kibernetičkoj sigurnosti vraća Amodeija u Bijelu kuću",
    description:
      "Sposobnost Anthropicovog Mythos modela da pronađe sigurnosne ranjivosti u sustavima dovela je do pregovora u Bijeloj kući.",
    imageAlt: "Zgrada Bijele kuće i digitalna sigurnosna mreža",
    publishedOn: "2026-04-20",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),

  createPost({
    id: 52,
    slug: "stvarnost-razvoja-s-ai-alatima",
    title: "Stvarnost razvoja s AI alatima: Pogled iza blještavila",
    description:
      "Umjetna inteligencija ne zamjenjuje programere, već mijenja način razvoja softvera u asistentni model.",
    imageAlt:
      "Apstraktna ilustracija programera koji radi s umjetnom inteligencijom",
    publishedOn: "2026-04-20",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),

  createPost({
    id: 53,
    slug: "ai-i-problem-nove-digitalne-birokracije",
    title: "Umjetna inteligencija i problem nove digitalne birokracije",
    description:
      "Umjesto da nas oslobode posla, AI agenti stvaraju novu vrstu iscrpljujuće digitalne birokracije u kojoj ljudi postaju tek provjeravatelji.",
    imageAlt:
      "Apstraktna ilustracija ljudi koji rade unutar birokratskog sustava kojim upravlja tehnologija i umjetna inteligencija.",
    publishedOn: "2026-04-21",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),

  createPost({
    id: 54,
    slug: "paradoks-brzine-ai-utrka-usporava-inovacije",
    title: "Paradoks brzine: Zašto stalna utrka usporava prave AI inovacije",
    description:
      "Opsesivno izbacivanje novih jezičnih modela sprječava stvaranje trajnih i pouzdanih softverskih rješenja.",
    imageAlt:
      "Apstraktna ilustracija brzine i tehnologije koja nadmašuje ljudsku kontrolu.",
    publishedOn: "2026-04-21",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 55,
    slug: "iluzija-potpuno-autonomnih-ai-agenata-u-poslovanju",
    title: "Iluzija potpuno autonomnih AI agenata u poslovanju",
    description:
      "Opsesija potpunom automatizacijom stvara lažna očekivanja i ignorira stvarnu vrijednost koju donosi suradnja čovjeka i stroja.",
    imageAlt:
      "Ilustracija uz članak: Iluzija potpuno autonomnih AI agenata u poslovanju",
    publishedOn: "2026-04-22",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 56,
    slug: "kraj-prosjecnosti-kako-ai-kaznjava-osrednji-rad",
    title:
      "Kraj prosječnosti: Kako umjetna inteligencija kažnjava osrednji rad",
    description:
      "Umjetna inteligencija drastično smanjuje vrijednost rutinskog i osrednjeg rada, pretvarajući ga u robu bez pokrića.",
    imageAlt: "Ilustracija utjecaja umjetne inteligencije na rad",
    publishedOn: "2026-04-23",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 57,
    slug: "openai-infosys-partnerstvo",
    title: "OpenAI i Infosys sklapaju partnerstvo za širenje AI alata",
    description:
      "OpenAI se udružio s Infosysom kako bi integrirao svoje umjetno inteligentne alate, uključujući Codex, u platformu Topaz.",
    imageAlt: "Ilustracija suradnje OpenAI-a i Infosysa",
    publishedOn: "2026-04-22",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 58,
    slug: "ai-modeli-postaju-obicna-roba-prava-vrijednost-je-u-primjeni",
    title: "AI modeli postaju obična roba: prava vrijednost je u primjeni",
    description:
      "Razvoj jezičnih modela ubrzava njihovu komoditizaciju, pa se istinska vrijednost seli iz samog modela u primjenu i korisničko iskustvo.",
    publishedOn: "2026-04-24",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt: "AI modeli",
  }),

  createPost({
    id: 59,
    slug: "zabluda-o-ai-agentima",
    title: "Zabluda o AI agentima: Stvarnost iza tehnološkog marketinga",
    description:
      "Zašto nas narativ o potpuno autonomnim AI agentima udaljava od stvarnih poslovnih vrijednosti i kako umjetna inteligencija zapravo može pomoći.",
    imageAlt:
      "Ilustracija koja prikazuje jaz između očekivanja autonomnih AI agenata i stvarne inženjerske primjene",
    publishedOn: "2026-04-25",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 60,
    slug: "openai-gpt-5-5-super-app",
    title: "OpenAI lansirao GPT-5.5 - korak bliže 'super aplikaciji'",
    description:
      "Novi model donosi naprednije sposobnosti i brže razmišljanje za manji broj tokena, približavajući OpenAI stvaranju ultimativne višenamjenske aplikacije.",
    imageAlt: "Ilustracija umjetne inteligencije i digitalnih aplikacija",
    publishedOn: "2026-04-23",
    category: NEWS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 61,
    slug: "hype-oko-agi-ja-skriva-stvarne-probleme",
    title: "Hype oko opće umjetne inteligencije skriva stvarne probleme",
    description:
      "Opsesija superinteligencijom i narativ o AGI-ju služe kao dimna zavjesa koja nas sprečava da se fokusiramo na stvarne probleme današnjice.",
    category: ANALYSIS,
    publishedOn: "2026-04-26",
    imageAlt:
      "Ilustracija koja prikazuje hype oko opće umjetne inteligencije nasuprot stvarnim problemima.",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 62,
    slug: "zasto-open-source-ai-ne-donosi-pravu-demokratizaciju",
    title: "Zašto open-source AI ne donosi pravu demokratizaciju",
    description:
      "Ovaj komentar objašnjava zašto open-source modeli sami po sebi ne donose stvarnu demokratizaciju umjetne inteligencije.",
    imageAlt: "Ilustracija hardvera u podatkovnom centru",
    publishedOn: "2026-04-27",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 63,
    slug: "google-anthropic-40b-investment",
    title: "Google ulaže do 40 milijardi dolara u Anthropic",
    description:
      "Google planira uložiti do 40 milijardi dolara u AI tvrtku Anthropic, osiguravajući im ključnu infrastrukturu za razvoj novih modela.",
    imageAlt:
      "Logotipi Googlea i Anthropica na apstraktnoj pozadini koja prikazuje umjetnu inteligenciju.",
    publishedOn: "2026-04-24",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 64,
    slug: "ai-alati-stvarnost-developera",
    title: "AI alati za programere: Od čarolije do beskrajnog debugiranja",
    description:
      "AI alati za programere predstavljaju se kao čarobna rješenja, no u stvarnosti developere pretvaraju u recenzente koda. Umjesto da sami pišu softver, programeri sve više vremena provode pronalazeći i popravljajući suptilne pogreške u generiranom kodu.",
    imageAlt:
      "Ilustracija uz članak: AI alati za programere: Od čarolije do beskrajnog debugiranja",
    publishedOn: "2026-04-28",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 65,
    slug: "sindrom-sintetickog-weba",
    title:
      "Sindrom sintetičkog weba: Kako AI pretvara internet u sterilno mjesto",
    description:
      "Umjetna inteligencija obećala je kreativnu renesansu, no u stvarnosti stvara sterilni internet kroz beskrajno recikliranje sintetičkog sadržaja.",
    imageAlt:
      "Ilustracija koja prikazuje recikliranje i generiranje sintetičkog sadržaja na internetu.",
    publishedOn: "2026-04-29",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 66,
    slug: "anthropic-testirao-trznicu-za-agente",
    title: "Anthropic testirao tržnicu za autonomnu trgovinu između AI agenata",
    description:
      "Anthropic je proveo pilot eksperiment s AI agentima koji su samostalno pregovarali i sklapali stvarne financijske poslove u ime zaposlenika.",
    imageAlt:
      "Ilustracija dvaju robota koji obavljaju transakciju u digitalnom okruženju tržnice",
    publishedOn: "2026-04-25",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 67,
    slug: "google-deepmind-partnerstvo-juzna-koreja",
    title: "Google DeepMind i Južna Koreja sklapaju AI partnerstvo",
    description:
      "Novi AI Campus u Seoulu omogućit će direktnu suradnju korejskih znanstvenika s vodećim stručnjacima iz Google DeepMinda u području AI modela za znanost.",
    imageAlt: "Ilustracija moderne zgrade istraživačkog centra u Seoulu",
    publishedOn: "2026-04-27",
    category: NEWS,
    readTime: 2,
    featured: false,
  }),
  createPost({
    id: 68,
    slug: "hype-oko-ai-agenata-zasto-autonomija-jos-uvijek-nije-stvarnost",
    title: "Hype oko AI agenata: Zašto autonomija još uvijek nije stvarnost",
    description:
      "Unatoč ogromnim obećanjima o potpuno samostalnim sustavima, industrija trenutno isporučuje samo malo naprednije automatizirane skripte.",
    imageAlt:
      "Ilustracija uz članak: Hype oko AI agenata: Zašto autonomija još uvijek nije stvarnost",
    publishedOn: "2026-04-27",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 69,
    slug: "skriveni-dug-ai-alata",
    title: "Iluzija jednostavne implementacije: Skriveni dug AI alata",
    description:
      "Iza privlačne fasade brze AI integracije krije se rastuća planina nevidljivog tehničkog duga s kojom će se inženjerski timovi tek morati suočiti.",
    imageAlt: "Ilustracija skrivenog tehničkog duga AI alata",
    publishedOn: "2026-04-27",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 70,
    slug: "canonical-ubuntu-linux-ai-features",
    title:
      "Canonical predstavlja planove za integraciju AI alata u Ubuntu Linux",
    description:
      "Ubuntu će dobiti lokalne modele za pristupačnost i agentične procese tijekom 2026., no bez pretenzija da postane AI proizvod.",
    imageAlt:
      "Ilustracija Canonicalovih planova za integraciju umjetne inteligencije u operativni sustav Ubuntu",
    publishedOn: "2026-04-28",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 71,
    slug: "kraj-institucionalnog-znanja-ai-produktivnost",
    title:
      "Kraj institucionalnog znanja: Kako nas AI čini dugoročno nesposobnima",
    description:
      "Umjetna inteligencija pruža iluziju brzog rješavanja problema, no dugoročno stvara generaciju stručnjaka bez razumijevanja temeljnih sustava.",
    imageAlt:
      "Ilustracija gubitka institucionalnog znanja uslijed pretjerane ovisnosti o AI alatima",
    publishedOn: "2026-04-28",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 72,
    slug: "ai-unistava-sposobnost-dubokog-promisljanja",
    title:
      "Umjetna inteligencija uništava našu sposobnost dubokog promišljanja",
    description:
      "Oslanjanje na AI alate za sažimanje informacija i rješavanje problema dugoročno uništava našu sposobnost dubokog promišljanja i analize.",
    imageAlt:
      "Ilustracija umjetne inteligencije i mozga koja simbolizira gubitak sposobnosti dubokog promišljanja",
    publishedOn: "2026-04-28",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 73,
    slug: "google-expands-pentagon-ai-access",
    title: "Google proširuje pristup umjetnoj inteligenciji za Pentagon",
    description:
      "Google je odobrio Ministarstvu obrane SAD-a pristup svojim AI modelima, pridruživši se kompanijama koje surađuju s vladom, dok se interna previranja nastavljaju.",
    imageAlt:
      "Zgrada Pentagona s digitalnim overlayem koji simbolizira umjetnu inteligenciju i tehnologiju",
    publishedOn: "2026-04-29",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 74,
    slug: "ai-iluzija-kompetencije-i-kraj-razumijevanja-koda",
    title: "Umjetna inteligencija i iluzija kompetencije u programiranju",
    description:
      "Kratki komentar koji ističe kako korištenje AI asistenata za generiranje koda stvara privid visoke produktivnosti, dok istovremeno uništava sposobnost programera da uistinu razumiju i dugoročno održavaju softver koji grade.",
    imageAlt: "Ilustracija programera i umjetne inteligencije",
    publishedOn: "2026-04-29",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 75,
    slug: "ai-ne-rjesava-lose-poslovne-procese-samo-ih-ubrzava",
    title: "AI ne rješava loše poslovne procese, samo ih ubrzava",
    description:
      "Automatizacija loše organizacije uz pomoć umjetne inteligencije stvara samo brži birokratski kaos. Zašto AI nije rješenje za duboke poslovne probleme.",
    imageAlt:
      "Zbrka papira i digitalnih ekrana koji simboliziraju ubrzani birokratski kaos",
    publishedOn: "2026-04-29",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 76,
    slug: "anthropic-valuation-900-billion",
    title: "Anthropic cilja na novu procjenu od 900 milijardi dolara",
    description:
      "Anthropic razmatra ponude za novo financiranje od oko 50 milijardi dolara, što bi moglo podići ukupnu tržišnu procjenu tvrtke na 900 milijardi dolara.",
    imageAlt:
      "Futuristička apstraktna grafika koja prikazuje ogroman financijski rast umjetne inteligencije",
    publishedOn: "2026-04-30",
    category: NEWS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 77,
    slug: "zabluda-ai-kao-zamjena-za-juniore",
    title: 'Zabluda "AI kao zamjena za juniore" i kraj seniora',
    description:
      "Kompanije koje štede mijenjajući juniore AI alatima dugoročno uništavaju mehanizam kojim industrija stvara vrhunske seniore.",
    imageAlt:
      "Ilustracija koja prikazuje junior developera i umjetnu inteligenciju",
    publishedOn: "2026-04-30",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 78,
    slug: "open-source-ai-is-not-the-answer-to-monopolies",
    title: "Otvoreni kod u umjetnoj inteligenciji neće srušiti monopole",
    description:
      "Otvoreni modeli samo preusmjeravaju ovisnost s modela na infrastrukturu koju kontroliraju tehnološki divovi.",
    imageAlt: "Ilustracija tehnološkog monopola i infrastrukture",
    publishedOn: "2026-04-30",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 79,
    slug: "musk-testifies-xai-trained-grok-on-openai-models",
    title: "Elon Musk svjedočio da je xAI trenirao Grok na OpenAI modelima",
    description:
      "Elon Musk na sudu priznao da je xAI koristio OpenAI modele za treniranje svog Grok AI sustava kroz proces zvan destilacija.",
    imageAlt: "Elon Musk na sudu",
    publishedOn: "2026-05-01",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 80,
    slug: "ai-agenti-u-korisnickoj-podrsci-nocna-mora",
    title: "Kraj korisničke podrške: AI agenti i povratak u noćnu moru",
    description:
      "Zamjena ljudi botovima u korisničkoj podršci ne unapređuje uslugu, već gradi neprobojni digitalni zid između tvrtke i njenih nezadovoljnih korisnika.",
    imageAlt:
      "Ilustracija AI agenata u korisničkoj podršci koji stvaraju digitalni zid",
    publishedOn: "2026-05-01",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 81,
    slug: "cijena-ai-iluzije-neodrziva-racunica",
    title: "Cijena AI iluzije: Zašto je trenutna računica potpuno neodrživa",
    description:
      "Ogromni troškovi infrastrukture za AI ne prate stvarnu poslovnu vrijednost koju ti alati donose. Rješavamo trivijalne zadatke najskupljom tehnologijom ikad izgrađenom.",
    imageAlt:
      "Ilustracija balona troškova AI infrastrukture u usporedbi s vrijednošću",
    publishedOn: "2026-05-01",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 82,
    slug: "musk-v-altman-sudenje-otkriva-xai-koristi-openai-modele",
    title: "Suđenje Muska i Altmana: Musk priznao da xAI koristi OpenAI modele",
    description:
      "Prvi tjedan suđenja između Elona Muska i OpenAI-ja donio je neočekivano priznanje. Musk je svjedočio da njegov startup xAI djelomično destilira modele OpenAI-ja.",
    imageAlt:
      "Ilustracija sudnice s Elonom Muskom i Samom Altmanom uz digitalne AI elemente",
    publishedOn: "2026-05-02",
    category: NEWS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 83,
    slug: "sindrom-carobnog-stapica-kako-ai-unistava-odgovornost",
    title: "Sindrom čarobnog štapića: Kako AI uništava odgovornost",
    description:
      "Komentar o tome kako se umjetna inteligencija sve više koristi kao alibi za prebacivanje odgovornosti za loše odluke.",
    publishedOn: "2026-05-02",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt: "Ilustracija koja prikazuje bijeg od odgovornosti",
  }),
  createPost({
    id: 84,
    slug: "mit-o-jednostavnoj-integraciji-ai-alata",
    title:
      "Mit o jednostavnoj integraciji: Zašto AI zahtijeva vrhunske inženjere",
    description:
      "Kratki komentar koji demistificira ideju da su AI alati jednostavni za implementaciju i naglašava kritičnu potrebu za iskusnim inženjerima pri integraciji u ozbiljne sustave.",
    publishedOn: "2026-05-02",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt:
      "Ilustracija kompleksne mrežne arhitekture koja povezuje AI model sa stabilnim inženjerskim sustavom",
  }),
  createPost({
    id: 85,
    slug: "ai-actors-oscars-ineligible",
    title:
      "Akademija mijenja pravila: AI glumci i scenariji više ne mogu osvojiti Oscara",
    publishedOn: "2026-05-03",
    category: NEWS,
    description:
      "Filmska akademija donijela je nova pravila prema kojima samo ljudi mogu biti nominirani i osvojiti Oscara, čime se isključuju AI generirani glumci i scenariji.",
    readTime: 4,
    featured: false,
    imageAlt: "Zlatni kipić Oscara uz digitalni kod",
  }),

  createPost({
    id: 86,
    slug: "ai-alati-mijenjaju-usko-grlo",
    title: "AI alati ne zamjenjuju developere, već mijenjaju usko grlo",
    description:
      "Iako AI alati nevjerojatno ubrzavaju proces pisanja koda, oni ne rješavaju, već samo premještaju glavno usko grlo u razvoju softvera s pisanja na čitanje i održavanje.",
    publishedOn: "2026-05-03",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt: "AI alati u programiranju",
  }),
  createPost({
    id: 87,
    slug: "zasto-je-fokus-na-agi-opasna-iluzija",
    title: "Zašto je fokus na AGI opasna iluzija i distrakcija",
    description:
      "Opsesija stvaranjem Umjetne opće inteligencije (AGI) sprječava industriju da rješava stvarne probleme usko specijaliziranim alatima.",
    publishedOn: "2026-05-03",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt:
      "Ilustracija osobe koja gleda utopijski svijet umjetne inteligencije kroz povećalo",
  }),
  createPost({
    id: 88,
    slug: "harvard-studija-ai-precizniji-od-lijecnika-u-hitnoj",
    title: "Nova studija s Harvarda: AI precizniji od liječnika u hitnoj",
    description:
      "OpenAI-jevi modeli pokazali se točnijim od liječnika interne medicine u postavljanju dijagnoza pacijenata na hitnom prijemu.",
    publishedOn: "2026-05-04",
    category: NEWS,
    readTime: 3,
    featured: false,
    imageAlt: "Ilustracija umjetne inteligencije i liječnika u bolnici",
  }),
  createPost({
    id: 89,
    slug: "povratak-majstorstvu-zasto-je-tezi-put-jedini-odrziv",
    title: "Povratak majstorstvu: Zašto je teži put jedini održiv",
    description:
      "Kritički osvrt na trend pretjeranog oslanjanja na AI alate u programiranju. Tvrdi se da, iako AI pruža kratkoročno ubrzanje, dugoročno stvara tehnički dug i onemogućuje razvoj istinskog inženjerskog majstorstva.",
    imageAlt:
      "Ilustracija programera pred računalom koji odabire teži, intelektualno zahtjevniji put do rješenja",
    publishedOn: "2026-05-04",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),

  createPost({
    id: 90,
    slug: "vecini-tvrtki-treba-bolji-rag-a-ne-vlastiti-ai-model",
    title: "Većini tvrtki treba bolji RAG, a ne vlastiti AI model",
    description:
      "Tvrtke troše previše vremena i resursa na treniranje vlastitih modela, dok bi im kvalitetno implementiran RAG sustav donio puno više vrijednosti uz manje troškove i rizike.",
    imageAlt: "Grafika koja prikazuje povezivanje baze podataka s AI sustavom",
    publishedOn: "2026-05-04",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 91,
    slug: "nvidia-jensen-huang-ai-jobs",
    title: "Jensen Huang: Umjetna inteligencija stvara golem broj poslova",
    description:
      "Izvršni direktor Nvidije odbacuje strahove o gubitku radnih mjesta i smatra da AI potiče reindustrijalizaciju.",
    imageAlt: "Jensen Huang iz Nvidije",
    publishedOn: "2026-05-05",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 92,
    slug: "ai-ne-pise-kod-samo-predlaze-sintaksu",
    title: "Umjetna inteligencija ne piše kod, ona predlaže sintaksu",
    description:
      "Priče o propasti programiranja su pretjerane jer AI ne rješava inženjerske probleme, već samo automatizira tipkanje.",
    imageAlt:
      "Ilustracija uz članak: Umjetna inteligencija ne piše kod, ona predlaže sintaksu",
    publishedOn: "2026-05-05",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 93,
    slug: "deepmind-ai-co-clinician",
    title: "Google DeepMind predstavlja AI Co-Clinician za zdravstvo",
    description:
      "Novi AI sustav osmišljen je kao suradnik u liječničkom timu koji pomaže pri sintezi dokaza i odgovaranju na složena medicinska pitanja.",
    imageAlt:
      "Ilustracija uz članak: Google DeepMind predstavlja AI Co-Clinician za zdravstvo",
    publishedOn: "2026-05-06",
    category: NEWS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 94,
    slug: "zasto-prompt-inzenjering-nije-karijera",
    title: "Zašto prompt inženjering nije stvarna karijera budućnosti",
    description:
      "Vještina pisanja uputa za AI modele nestat će jednako brzo kao što je i nastala, a budućnost pripada stručnjacima s domenskim znanjem.",
    publishedOn: "2026-05-06",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt:
      "Ilustracija koja prikazuje prolaznost prompt inženjeringa i važnost domenskog znanja",
  }),
  createPost({
    id: 95,
    slug: "decoupled-diloco-novi-pristup-treningu-modela",
    title: "Decoupled DiLoCo: Novi otporni pristup za trening AI modela",
    description:
      "Google DeepMind predstavlja novu distribuiranu arhitekturu koja omogućuje otporniji i fleksibilniji trening AI modela na različitim hardverskim generacijama.",
    imageAlt: "Ilustracija distribuiranog treninga umjetne inteligencije",
    publishedOn: "2026-05-07",
    category: NEWS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 96,
    slug: "mrtvi-internet-kada-strojevi-pricaju",
    title: "Mrtvi internet: Kada strojevi počnu pričati sami sa sobom",
    description:
      "AI agenti na internetu počinju komunicirati jedni s drugima umjesto s ljudima, stvarajući zatvorenu petlju sintetičkog sadržaja koja degradira kvalitetu informacija.",
    imageAlt:
      "Ilustracija robota koji komuniciraju u zatvorenom krugu bez prisutnosti ljudi",
    publishedOn: "2026-05-07",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 97,
    slug: "kraj-iluzije-zasto-open-source-ai-gubi",
    title:
      "Kraj iluzije: Zašto open-source AI modeli gube bitku protiv giganata",
    description:
      "Komentar o tome zašto open-source zajednica dugoročno gubi utrku u razvoju umjetne inteligencije i zašto stvarna moć leži u vlasništvu nad infrastrukturom i energijom.",
    publishedOn: "2026-05-07",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt:
      "Ilustracija borbe malog open-source developera protiv tehnoloških giganata",
  }),
  createPost({
    id: 98,
    slug: "ai-u-obrazovanju-generacija-koja-ne-zna-misliti",
    title: "AI u obrazovanju: Kako stvaramo generaciju koja ne zna misliti",
    description:
      "Kratki komentar koji objašnjava zašto integracija AI alata u učionice ne demokratizira znanje, već stvara sustav u kojem učenici trajno delegiraju vlastiti kognitivni napor strojevima.",
    publishedOn: "2026-05-08",
    category: ANALYSIS,
    readTime: 3,
    featured: false,
    imageAlt:
      "Ilustracija učenika koji prepušta učenje i razmišljanje strojevima",
  }),
  createPost({
    id: 99,
    slug: "divlji-zapad-ai-igracaka",
    title: "Novi divlji zapad pametnih AI igračaka donosi brojne dječje rizike",
    description:
      "Tržište AI igračaka ubrzano raste, no stručnjaci i udruge upozoravaju na sigurnosne propuste, neprimjeren sadržaj te negativan utjecaj na društveni razvoj i dječju igru.",
    publishedOn: "2026-05-08",
    category: NEWS,
    readTime: 3,
    featured: false,
    imageAlt: "Ilustracija pametnih AI igračaka oko djeteta",
  }),
  createPost({
    id: 100,
    slug: "autonomni-agenti-su-daleko-od-pouzdanosti",
    title: "Autonomni agenti su daleko od pouzdanosti",
    description:
      "Kratki komentar koji objašnjava zašto autonomni AI agenti još uvijek ne mogu pouzdano zamijeniti ljudski rad u složenim poslovnim zadacima.",
    publishedOn: "2026-05-08",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt:
      "Ilustracija nezavršene i nepouzdane konstrukcije robota u poslovnom okruženju",
  }),
  createPost({
    id: 101,
    slug: "mozilla-mythos-ai-vulnerabilities",
    title: "Mozilla koristi AI za otkrivanje ranjivosti u Firefoxu",
    description:
      "Korištenjem Anthropic Mythos modela, Mozilla je uspjela otkriti preko 200 sigurnosnih grešaka u pregledniku Firefox uz gotovo potpunu eliminaciju lažno pozitivnih prijava.",
    publishedOn: "2026-05-09",
    category: NEWS,
    readTime: 4,
    featured: false,
    imageAlt:
      "Ilustracija integracije AI agencija u provjeri sigurnosti softvera",
  }),
  createPost({
    id: 102,
    slug: "iluzija-modernizacije-legacy-kod",
    title: "Iluzija modernizacije: Zašto AI neće spasiti vaš legacy kod",
    description:
      "Kratki osvrt koji argumentira zašto automatizirana modernizacija koda uz pomoć AI alata ne rješava tehnički dug, već stvara nove probleme ako se ne provodi uz strogi nadzor iskusnih inženjera.",
    publishedOn: "2026-05-09",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt: "Ilustracija starog, zapetljanog koda na kojem radi programer",
  }),
  createPost({
    id: 103,
    slug: "zasto-chat-sucelja-nisu-buducnost-interakcije",
    title: "Zašto chat sučelja nisu budućnost interakcije",
    description:
      "Kratki komentar koji objašnjava zašto je forsiranje tekstualnog chata kao primarnog sučelja korak unatrag za većinu korisničkih zadataka u usporedbi s dobrim grafičkim alatima.",
    publishedOn: "2026-05-09",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt: "Ilustracija osobe koja umorno tipka u chat sučelje",
  }),
  createPost({
    id: 104,
    slug: "alphaevolve-ai-sustav-google-deepmind",
    title: "Google DeepMind predstavlja AlphaEvolve sustav",
    description:
      "Novi AI sustav sposoban za autonomno otkrivanje i optimizaciju algoritama koji već ubrzava istraživanja u različitim znanstvenim i inženjerskim područjima.",
    publishedOn: "2026-05-10",
    category: NEWS,
    readTime: 4,
    featured: false,
    imageAlt:
      "Ilustracija umjetne inteligencije koja autonomno optimizira algoritme",
  }),
  createPost({
    id: 105,
    slug: "ai-alati-stvaraju-generaciju-koja-ne-razumije-kod",
    title: "Zašto AI alati stvaraju generaciju koja ne razumije vlastiti kod",
    description:
      "Sveprisutna integracija AI asistenata u razvojna okruženja prebacuje fokus s razumijevanja arhitekture na brzu generaciju koda, stvarajući opasan tehnički dug.",
    publishedOn: "2026-05-10",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    imageAlt: "Ilustracija programera koji ne razumije generirani kod",
  }),
  createPost({
    id: 106,
    slug: "opasnost-ai-testiranja-ai-koda",
    title: "Opasnost petlje povjerenja: Kada AI testira kod koji je AI napisao",
    description:
      "Oslanjanje na umjetnu inteligenciju za pisanje testova za strojno generirani kod stvara opasnu iluziju sigurnosti i dugoročno srozava kvalitetu softvera.",
    imageAlt:
      "Ilustracija programera koji zbunjeno gleda u kod i testove koje je generirao AI",
    publishedOn: "2026-05-10",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 107,
    slug: "anthropic-evil-portrayals-claude-blackmail",
    title: "Anthropic tvrdi: Zli prikazi AI-ja krivi su za pokušaje ucjene",
    description:
      "Fiktivni prikazi umjetne inteligencije imaju stvaran utjecaj na modele – Claude je ucjenjivao inženjere zbog internet tekstova koji AI prikazuju kao zao.",
    imageAlt: "Ilustracija zlog robota i Claude logotipa",
    publishedOn: "2026-05-11",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 108,
    slug: "zabluda-o-produktivnosti-vise-koda-nije-bolji-softver",
    title: "Zabluda o produktivnosti: Više koda nije bolji softver",
    description:
      "Kratki komentar koji objašnjava zašto umjetna inteligencija koja brže piše kod zapravo stvara više tehničkog duga i usporava dugoročni razvoj softvera.",
    imageAlt:
      "Ilustracija koja prikazuje programera zatrpanog lošim strojno generiranim kodom",
    publishedOn: "2026-05-11",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 109,
    slug: "iluzija-otvorenog-koda-ai-modeli",
    title: "Iluzija otvorenog koda: Zašto AI modeli nisu otvoreni",
    description:
      "Kratki komentar koji objašnjava zašto takozvani otvoreni AI modeli zapravo nisu pravi open source jer nude samo težine, dok podaci ostaju tajna.",
    imageAlt:
      "Ilustracija otvorene kutije iz koje svijetle samo brojevi, dok je ostatak skriven u sjeni",
    publishedOn: "2026-05-11",
    category: ANALYSIS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 110,
    slug: "thinking-machines-ai-puna-dupleksna-komunikacija",
    title:
      "Thinking Machines predstavlja AI model za istovremeno slušanje i govor",
    description:
      "Bivša CTO OpenAI-ja Mira Murati predstavila je novi AI model koji istovremeno procesuira unos i generira odgovor.",
    imageAlt:
      "Ilustracija zvučnog vala dvosmjerne komunikacije između čovjeka i umjetne inteligencije",
    publishedOn: "2026-05-12",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 111,
    slug: "mit-o-autonomnim-ai-agentima",
    title: "Mit o autonomnim AI agentima: Stvarnost razvoja softvera",
    description:
      "Autonomni AI agenti još uvijek nisu spremni zamijeniti programere. Saznajte zašto će inženjeri ostati ključni u razvoju softvera.",
    imageAlt:
      "Ilustracija programera koji nadgleda i usmjerava umjetnu inteligenciju u radu",
    publishedOn: "2026-05-12",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 112,
    slug: "meta-ai-threads-account-block",
    title: "Meta blokirala opciju skrivanja AI računa na Threadsu",
    description:
      "Korisnici platforme Threads izrazili nezadovoljstvo jer Meta ne dopušta blokiranje novog AI asistenta unutar aplikacije.",
    imageAlt: "Ilustracija Meta AI logotipa i mobilne aplikacije Threads",
    publishedOn: "2026-05-13",
    category: NEWS,
    readTime: 2,
    featured: false,
  }),
  createPost({
    id: 113,
    slug: "ai-nece-zamijeniti-programere-samo-kodiranje",
    title:
      "AI alati neće zamijeniti programere, već samo repetitivno kodiranje",
    description:
      "Umjetna inteligencija ne ukida potrebu za softverskim inženjerima, već automatizira repetitivni dio pisanja koda. Programeri postaju arhitekti i revizori sustava.",
    imageAlt:
      "Ilustracija softverskog inženjera koji pregledava kod s AI asistentom",
    publishedOn: "2026-05-13",
    category: ANALYSIS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 114,
    slug: "hype-oko-agi-ja-opasna-distrakcija",
    title:
      "Hype oko AGI-ja: Zašto je lov na opću umjetnu inteligenciju opasna distrakcija",
    description:
      "Kratki komentar koji objašnjava zašto je opsesija općom umjetnom inteligencijom (AGI) opasna distrakcija koja industriju udaljava od rješavanja stvarnih, trenutnih problema.",
    imageAlt:
      "Ilustracija osobe koja gleda u magloviti vrh planine dok zanemaruje probleme ispred sebe",
    publishedOn: "2026-05-13",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 115,
    slug: "whatsapp-incognito-meta-ai",
    title: "WhatsApp uvodi anonimni način rada za Meta AI",
    description:
      "WhatsApp i Meta lansiraju novu 'incognito' značajku za Meta AI koja omogućuje privatne razgovore koji se ne spremaju i ne dijele s drugima.",
    imageAlt: "WhatsApp logotip i koncept anonimne poruke na pametnom telefonu",
    publishedOn: "2026-05-14",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 116,
    slug: "kraj-ai-turizma",
    title: "Kraj AI turizma: Zašto uvođenje umjetne inteligencije nije magija",
    description:
      "Analiza zašto se završava era površnog entuzijazma oko umjetne inteligencije i zašto se fokus industrije vraća na ozbiljan softverski inženjering i stvarnu poslovnu vrijednost.",
    imageAlt:
      "Ilustracija prelaska s umjetne inteligencije na čvrsti inženjering",
    publishedOn: "2026-05-14",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 117,
    slug: "zasto-nas-opsesija-agi-jem-udaljava-od-pravih-inovacija",
    title: "Zašto nas opsesija s AGI-jem udaljava od pravih inovacija",
    description:
      "Analiza kako lov na opću umjetnu inteligenciju skreće pažnju s rješavanja stvarnih, praktičnih problema današnjice.",
    imageAlt: "Ilustracija skretanja pažnje s pravih inovacija zbog AGI-ja",
    publishedOn: "2026-05-14",
    category: ANALYSIS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 118,
    slug: "openai-navodno-priprema-tuzbu-protiv-applea",
    title: "OpenAI navodno priprema tužbu protiv Applea zbog integracije",
    description:
      "OpenAI razmatra pravne korake protiv Applea zbog nezadovoljstva načinom na koji je ChatGPT integriran u iOS sustav.",
    imageAlt: "Ilustracija sukoba između OpenAI-ja i Applea",
    publishedOn: "2026-05-15",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 119,
    slug: "mit-o-programiranju-pomocu-umjetne-inteligencije",
    title: "Mit o programiranju uz umjetnu inteligenciju i praksa",
    description:
      "Stvarno iskustvo programera u radu s AI alatima znatno se razlikuje od marketinških tvrdnji o potpunoj automatizaciji pisanja koda.",
    imageAlt: "Stvarni rad programera uz pomoć umjetne inteligencije",
    publishedOn: "2026-05-15",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 120,
    slug: "openai-launches-chatgpt-for-personal-finance",
    title: "OpenAI lansira alate za osobne financije unutar ChatGPT-a",
    description:
      "Korisnici ChatGPT-a mogu povezati bankovne račune za praćenje potrošnje zahvaljujući novoj integraciji.",
    imageAlt: "Nova ChatGPT značajka za analizu osobnih financija",
    publishedOn: "2026-05-16",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 121,
    slug: "ai-alati-za-kodiranje-obecanje-vs-stvarnost",
    title: "AI alati za kodiranje: Od velikih obećanja do stvarnosti",
    description:
      "Analiza stvarne korisnosti AI alata za kodiranje, njihovih ograničenja i utjecaja na svakodnevni rad developera.",
    imageAlt: "AI alati za kodiranje i njihov utjecaj",
    publishedOn: "2026-05-16",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 122,
    slug: "iluzija-ai-podrske-zasto-chatbotovi-frustriraju",
    title: "Iluzija AI podrške: Zašto nas chatbotovi i dalje samo frustriraju",
    description:
      "Analiza raskoraka između obećanja umjetne inteligencije u korisničkoj podršci i stvarne frustracije korisnika koji gube vrijeme na beskorisne chatbotove.",
    imageAlt: "Frustrirani korisnik u razgovoru s beskorisnim AI chatbotom",
    publishedOn: "2026-05-16",
    category: ANALYSIS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 123,
    slug: "openai-greg-brockman-produkt-strategija",
    title: "OpenAI-jev suosnivač Greg Brockman preuzima strategiju proizvoda",
    description:
      "Nakon pauziranja sporednih projekata, OpenAI konsolidira ChatGPT i Codex u jedan tim.",
    imageAlt: "Greg Brockman iz OpenAI-ja",
    publishedOn: "2026-05-17",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 124,
    slug: "zasto-nas-ai-agenti-nece-zamijeniti",
    title: "Mit o potpuno autonomnim AI agentima",
    description:
      "Analiza rastućeg mita o AI agentima koji u potpunosti mogu zamijeniti programere, objašnjavajući zašto je uloga ljudskog nadzora i inženjeringa i dalje presudna.",
    imageAlt: "AI asistent za kodiranje naspram softverskog inženjera",
    publishedOn: "2026-05-17",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 125,
    slug: "ai-alati-pretvaraju-seniore-u-recenzente",
    title: "AI alati za kodiranje: Kako su seniori postali recenzenti",
    description:
      "Marketing obećava brzo pisanje koda, no u stvarnosti AI alati pretvaraju iskusne developere u recenzente beskonačnih linija nesavršenog koda.",
    imageAlt: "Ilustracija developera koji provjerava kod umjesto da ga piše",
    publishedOn: "2026-05-17",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 126,
    slug: "apple-siri-redizajn-automatsko-brisanje-chatova",
    title: "Nova verzija Siri mogla bi automatski brisati AI razgovore",
    description:
      "Apple planira uvesti opciju automatskog brisanja razgovora sa Siri kako bi naglasio zaštitu privatnosti korisnika u odnosu na druge AI tvrtke.",
    imageAlt: "Ilustracija pametnog telefona sa Siri i zaštite privatnosti",
    publishedOn: "2026-05-18",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 127,
    slug: "zabluda-o-produktivnosti-ai-alata",
    title: "Zabluda o produktivnosti: AI alati ne donose brzinu",
    description:
      "Opsesija brzinom pisanja koda stvara više problema nego što ih rješava te skriva stvarna uska grla u razvoju softvera.",
    imageAlt: "Ilustracija programera i AI alata koji piše kod",
    publishedOn: "2026-05-18",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 128,
    slug: "zasto-je-opsesija-agi-distrakcija",
    title: "Zašto je opsesija AGI-jem najveća distrakcija u AI industriji",
    description:
      "Svi pričaju o AGI-ju, no ta opsesija nije samo neproduktivna – ona aktivno šteti razvoju korisnih i pouzdanih AI alata.",
    imageAlt: "Ilustracija osobe koja gleda u maglovitu daljinu",
    publishedOn: "2026-05-18",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 129,
    slug: "elon-musk-izgubio-tuzbu-openai",
    title: "Elon Musk izgubio sudsku tužbu protiv Altmana i OpenAI-ja",
    description:
      "Porota je jednoglasno presudila da je Elon Musk zakasnio s podnošenjem tužbe protiv Sama Altmana i OpenAI-ja zbog zakona o zastari.",
    imageAlt: "Ilustracija sudske zgrade uz logotipove Elona Muska i OpenAI-ja",
    publishedOn: "2026-05-19",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 130,
    slug: "kraj-zlatne-groznice-ai-startupa",
    title: "Kraj zlatne groznice AI startupa: Surova realnost tržišta",
    description:
      "Analiza otrežnjenja na tržištu AI startupa i zašto većina njih neće preživjeti zbog nedostatka stvarnog proizvoda i konkurentske prednosti.",
    imageAlt:
      "Ilustracija propadanja umjetno stvorenih AI startupa naspram onih sa stvarnom vrijednošću",
    publishedOn: "2026-05-19",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 131,
    slug: "skrivena-cijena-besplatnog-ai-ja",
    title: "Skrivena cijena besplatnog AI-ja: Vaši podaci postaju proizvod",
    description:
      "Kratki osvrt na to kako korištenje besplatnih AI alata u korporativnom okruženju zapravo znači plaćanje vlastitim poslovnim tajnama i intelektualnim vlasništvom.",
    imageAlt:
      "Ilustracija skrivenih troškova besplatnih AI alata i zaštite podataka",
    publishedOn: "2026-05-19",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 132,
    slug: "google-search-ai-agents",
    title: "Google na I/O 2026 uvodi autonomne AI agente u tražilicu",
    description:
      "Na I/O konferenciji, Google je predstavio informacijske agente koji kontinuirano prate teme i pružaju sažetke umjesto samo liste linkova.",
    imageAlt: "Ilustracija Google tražilice i novih autonomnih AI agenata",
    publishedOn: "2026-05-20",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 133,
    slug: "hype-oko-ai-alata-skriva-pravi-problem-arhitekturu",
    title: "Hype oko AI alata skriva pravi problem: Arhitekturu",
    description:
      "Svi pričaju o tome koliko brzo AI piše kod, ali ignoriraju činjenicu da nam nedostaje razumijevanje šireg sustava.",
    imageAlt: "Ilustracija AI alata i složene softverske arhitekture",
    publishedOn: "2026-05-20",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 134,
    slug: "umjetna-inteligencija-nikada-nece-razumjeti-poslovni-kontekst",
    title: "Umjetna inteligencija nikada neće razumjeti poslovni kontekst",
    description:
      "AI brzo piše kod, ali razvoj softvera zahtijeva razumijevanje poslovnih problema. Zbog toga programeri ostaju nezamjenjivi.",
    imageAlt: "Prikaz koda i poslovnih procesa",
    publishedOn: "2026-05-20",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 135,
    slug: "anthropic-prvi-profitabilni-kvartal",
    title: "Anthropic prijavio prvi profitabilni kvartal i brzi rast",
    description:
      "Anthropic očekuje svoj prvi operativni profit u drugom kvartalu uz prihod od oko 10,9 milijardi dolara, iako rast troškova infrastrukture ostaje izazov.",
    imageAlt: "Znak rasta profita uz tehnološke elemente",
    publishedOn: "2026-05-21",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 136,
    slug: "ai-ubija-prosjecnost",
    title: "AI ne oduzima poslove programerima, već uništava prosječnost",
    description:
      "Umjetna inteligencija ne zamjenjuje programere, nego podiže letvicu. Pisanje osnovnog koda više nije dovoljno, fokus se seli na rješavanje kompleksnih problema i arhitekturu sustava.",
    imageAlt: "Ilustracija utjecaja umjetne inteligencije na programiranje",
    publishedOn: "2026-05-21",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 137,
    slug: "otvoreni-kod-u-ai-ju-je-iluzija",
    title: "Otvoreni kod u AI industriji zapravo je velika marketinška iluzija",
    description:
      "Zatvoreni modeli koji se u medijima agresivno reklamiraju kao potpuno otvoreni nisu pobjeda zajednice, već samo suptilnija i modernija vrsta korporativne kontrole.",
    imageAlt:
      "Ilustracija razbijanja iluzije o otvorenom kodu u umjetnoj inteligenciji",
    publishedOn: "2026-05-21",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 138,
    slug: "project-genie-street-view",
    title:
      "Google DeepMind povezuje Project Genie i Street View za učenje AI modela u stvarnom svijetu",
    description:
      "DeepMind integrira slike sa Street Viewa u Project Genie, stvarajući tako realistične virtualne svjetove za treniranje AI agenata na temelju stvarnih lokacija.",
    imageAlt:
      "Kolaž koji prikazuje prelazak iz stvarne fotografije Street Viewa u generirani 3D maštoviti svijet",
    publishedOn: "2026-05-22",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 139,
    slug: "zid-podataka-usporavanje-ai-modela",
    title: "Zid podataka: Zašto umjetna inteligencija uskoro usporava",
    description:
      "Analiza problema zida podataka u AI industriji i zašto ponestaje kvalitetnog ljudskog sadržaja za treniranje naprednih modela.",
    imageAlt: "Zid podataka pred umjetnom inteligencijom",
    publishedOn: "2026-05-22",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 140,
    slug: "ai-u-programiranju-prava-istina-iza-obecanja",
    title: "AI u programiranju: Prava istina iza marketinških obećanja",
    description:
      "Analiza razlike između marketinških obećanja o AI alatima za programiranje i stvarne produktivnosti u praksi.",
    imageAlt: "AI u programiranju i stvarni rad",
    publishedOn: "2026-05-22",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 141,
    slug: "spotify-umg-ai-remix-deal",
    title: "Spotify i UMG omogućuju AI obrade i remikseve omiljenih pjesama",
    description:
      "Spotify je dogovorio suradnju s Universal Music Group za legalno stvaranje AI obrada i remikseva.",
    imageAlt: "Spotify aplikacija s AI funkcijama",
    publishedOn: "2026-05-23",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 142,
    slug: "zabluda-o-ai-inzenjerima",
    title: "Zabluda o AI inženjerima: Tko rješava prave probleme?",
    description:
      "Industrija promovira ideju o 'AI inženjerima' koji će zamijeniti klasične developere, ali stvarnost razvoja softvera pokazuje da je domensko znanje i dalje nezamjenjivo.",
    imageAlt: "Softverski inženjer i AI asistent u radu",
    publishedOn: "2026-05-23",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 143,
    slug: "zasto-ai-nece-zamijeniti-programere",
    title: "Stvarnost razvoja: Zašto AI alati neće zamijeniti programere",
    description:
      "Umjetna inteligencija drastično mijenja način na koji pišemo kod, ali neće tako skoro preuzeti ulogu softverskih inženjera. Saznajte zašto je razvoj softvera mnogo više od same sintakse.",
    imageAlt: "Programer gleda u ekran s kodom dok koristi AI asistenta",
    publishedOn: "2026-05-23",
    category: ANALYSIS,
    readTime: 6,
    featured: false,
  }),
  createPost({
    id: 144,
    slug: "ferrari-ibm-ai-f1",
    title: "Ferrari i IBM koriste AI za transformaciju navijačkog iskustva",
    description:
      "Scuderia Ferrari u suradnji s IBM-om koristi naprednu umjetnu inteligenciju za personalizaciju i unapređenje iskustva Formule 1.",
    imageAlt: "Ferrarijev bolid na stazi",
    publishedOn: "2026-05-24",
    category: NEWS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 145,
    slug: "kraj-ai-iluzije-skaliranje-nije-dovoljno",
    title:
      "Kraj AI iluzije: Skaliranje modela više nije dovoljno za revoluciju",
    description:
      "Nakon godina strelovitog uspona, suočavamo se s realnošću: samo dodavanje više podataka i računarske moći neće nas dovesti do opće umjetne inteligencije.",
    imageAlt: "Grafikon koji usporava s robotom koji gleda u njega",
    publishedOn: "2026-05-24",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 146,
    slug: "programeri-i-ai-alati-stvarnost-iza-velikih-obecanja",
    title: "Programeri i AI alati: Stvarnost iza velikih obećanja",
    description:
      "Stvarno iskustvo razvoja s AI alatima često je u neskladu s onim što nam govore marketinški timovi velikih tvrtki.",
    imageAlt: "Programer na radnom mjestu s AI alatima",
    publishedOn: "2026-05-24",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 147,
    slug: "iluzija-brzog-kodiranja-ai",
    title: "Iluzija brzog kodiranja s umjetnom inteligencijom",
    description:
      "AI alati obećavaju neviđeno ubrzanje pisanja koda, ali dugoročno stvaraju ogromne količine tehničkog duga koji će netko morati platiti.",
    imageAlt: "Ilustracija programera i umjetne inteligencije",
    publishedOn: "2026-05-25",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 148,
    slug: "velika-zabluda-o-potpuno-autonomnim-ai-agentima-u-praksi",
    title: "Velika zabluda o potpuno autonomnim AI agentima u praksi",
    description:
      "Dok su agenti impresivni u demonstracijama, stvarni procesi u produkciji razotkrivaju njihova ključna ograničenja i nedostatak stvarnog konteksta.",
    imageAlt: "Ilustracija AI agenta i složenog poslovnog procesa",
    publishedOn: "2026-05-25",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 149,
    slug: "what-clickups-mass-layoff-tells-us-about-the-future-of-work",
    title: "ClickUp otpušta 22% radnika zbog prelaska na AI",
    description:
      "Tvrtka ClickUp otpustila je 22% svoje radne snage s ciljem transformacije poslovanja pomoću AI agenata.",
    imageAlt: "Prikaz utjecaja umjetne inteligencije na zapošljavanje",
    publishedOn: "2026-05-26",
    category: NEWS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 150,
    slug: "prava-opasnost-sinteticki-internet",
    title: "Prava opasnost AI-ja je zapravo sintetički internet",
    description:
      "Umjesto pobune robota, stvarna prijetnja umjetne inteligencije je preplavljivanje interneta sintetičkim sadržajem u kojem se gubi povjerenje.",
    imageAlt: "Prikaz digitalnog šuma i gubitka povjerenja u online sadržaj",
    publishedOn: "2026-05-26",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 151,
    slug: "kriticna-ranjivost-u-starlette-paketu-ugrozava-milijune-ai-agenata",
    title: "Kritična ranjivost u Starlette paketu ugrožava milijune AI agenata",
    description:
      "Otkrivena je kritična ranjivost nazvana BadHost u popularnom Python okviru Starlette koja omogućuje hakerima neovlašteni pristup osjetljivim podacima i vjerodajnicama AI agenata.",
    imageAlt: "Hakerski napad na AI sustave",
    category: NEWS,
    publishedOn: "2026-05-27",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 152,
    slug: "zabluda-o-kraju-programera",
    title: "Zabluda o kraju programera: Zašto AI neće zamijeniti vaš posao",
    description:
      "Analiza o tome zašto AI alati poput Copilota neće zamijeniti softverske inženjere, već će ih samo osloboditi rutinskih zadataka.",
    imageAlt: "Programer radi zajedno s umjetnom inteligencijom",
    category: ANALYSIS,
    publishedOn: "2026-05-27",
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 153,
    slug: "zasto-je-agi-distrakcija",
    title: "Zašto je AGI opasna distrakcija za današnje poslovanje",
    description:
      "Analiza o tome zašto nas opsesija stvaranjem opće umjetne inteligencije udaljava od stvarnih prednosti koje AI alati nude danas.",
    imageAlt: "Futuristički mozak zasjenjuje stvarne poslovne prilike",
    category: ANALYSIS,
    publishedOn: "2026-05-27",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 154,
    slug: "zabluda-o-generativnom-ai-roiu",
    title: "Velika zabluda o povratu investicije u generativni AI",
    description:
      "Mnoge kompanije ulažu milijune u generativnu umjetnu inteligenciju očekujući brzi povrat investicije. No, stvarnost je daleko od očekivanja.",
    imageAlt: "Poslovni čovjek gleda u grafikon s padom investicija",
    category: ANALYSIS,
    publishedOn: "2026-05-28",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 155,
    slug: "zasto-ai-ne-moze-spasiti-losu-arhitekturu",
    title: "Zašto AI alati ne mogu spasiti lošu arhitekturu vašeg softvera",
    description:
      "AI alati obećavaju ubrzanje razvoja softvera, ali bez dobrih temelja dugoročno stvaraju još veći tehnički dug.",
    imageAlt:
      "Programer pokušava popraviti loš kod uz pomoć umjetne inteligencije",
    publishedOn: "2026-05-28",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 156,
    slug: "anthropic-raises-65-billion",
    title: "Anthropic prikupio 65 milijardi dolara prije izlaska na burzu",
    description:
      "Anthropic je osigurao 65 milijardi dolara investicija, dostižući valuaciju od 965 milijardi dolara uoči izlaska na burzu.",
    imageAlt: "Apstraktni prikaz financijskog rasta tvrtke Anthropic",
    publishedOn: "2026-05-29",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 157,
    slug: "ai-kodiranje-od-pisanja-koda-do-vjecnog-debagiranja",
    title: "AI kodiranje: Od pisanja koda do vječnog debagiranja",
    description:
      "Umjesto ubrzanja razvoja, pretjerano oslanjanje na AI alate pretvara inženjere u vječne čitače i popravljače tuđeg koda.",
    imageAlt: "Programer ispred ekrana pokušava shvatiti tuđi kod",
    publishedOn: "2026-05-29",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 158,
    slug: "kraj-iluzije-zasto-su-ai-wrapperi-osudeni-na-propast",
    title: "Kraj iluzije: Zašto su AI wrapperi osuđeni na propast",
    description:
      "Većina startupa koji su samo tanka ljuska oko tuđih jezičnih modela neće preživjeti.",
    imageAlt: "Prikaz tanke ljuske koda iznad jezičnog modela.",
    publishedOn: "2026-05-29",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 159,
    slug: "ai-companies-will-pay-for-robot-training-data",
    title: "Startup Shift nudi besplatno čišćenje domova za podatke o robotima",
    description:
      "Startup Shift sakuplja podatke iz domova ljudi u zamjenu za čišćenje.",
    imageAlt: "Robot koji usisava pod",
    publishedOn: "2026-05-30",
    category: NEWS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 160,
    slug: "iluzija-ai-programera-i-stvarna-buducnost-razvoja-softvera",
    title: "Iluzija AI programera: Zašto inženjeri nisu postali višak",
    description:
      "Umjetna inteligencija ne zamjenjuje programere, već mijenja njihov posao iz pisanja koda u upravljanje kompleksnim sustavima.",
    imageAlt:
      "Ilustracija programera koji usmjerava umjetnu inteligenciju u složenom softverskom sustavu.",
    publishedOn: "2026-05-30",
    category: ANALYSIS,
    readTime: 6,
    featured: false,
  }),
  createPost({
    id: 161,
    slug: "iluzija-autonomije-zasto-ai-agenti-jos-uvijek-trebaju-ljude",
    title: "Iluzija autonomije: Zašto AI agenti još uvijek trebaju ljude",
    description:
      "Iako se industrija fokusira na potpuno samostalne sustave, stvarna vrijednost umjetne inteligencije leži u nadopunjavanju ljudskog rada.",
    imageAlt: "Grafički prikaz čovjeka i robota koji surađuju.",
    publishedOn: "2026-05-30",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 162,
    slug: "iluzija-skore-umjetne-opce-inteligencije",
    title: "Iluzija skore AGI: Zašto je opća umjetna inteligencija i dalje mit",
    description:
      "Opća umjetna inteligencija se često najavljuje, ali to zamagljuje prave i korisne primjene postojećih tehnologija.",
    imageAlt: "Futuristički prikaz umjetne inteligencije.",
    publishedOn: "2026-05-31",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 163,
    slug: "iluzija-brze-integracije-ai-alata",
    title:
      "Iluzija brze integracije: Zašto AI alati nisu rješenje ključ u ruke",
    description:
      "Mnoge tvrtke vjeruju da je integracija AI alata jednostavan proces. U stvarnosti, to zahtijeva duboke arhitektonske promjene i prilagodbu podataka.",
    imageAlt:
      "Apstraktni prikaz složene integracije sustava i umjetne inteligencije",
    publishedOn: "2025-05-31",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 164,
    slug: "nvidia-cosmos-3",
    title: "NVIDIA lansirala Cosmos 3: Prvi otvoreni omni-model",
    description:
      "NVIDIA je predstavila Cosmos 3, revolucionarni objedinjeni model za vizualno razumijevanje i generiranje.",
    imageAlt: "Nvidia logotip uz apstraktni prikaz umjetne inteligencije",
    publishedOn: "2026-06-01",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 165,
    slug: "stvarni-razvoj-softvera-uz-ai-alate",
    title: "Stvarni razvoj softvera uz AI alate: Marketing i praksa",
    description:
      "Očekivanja od umjetne inteligencije u programiranju često se razilaze sa stvarnošću. Saznajte zašto vas AI alati neće u potpunosti zamijeniti i što se zapravo događa.",
    imageAlt: "Ilustracija programera koji radi s AI alatima",
    publishedOn: "2026-06-01",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 166,
    slug: "anthropic-izlazak-na-burzu",
    title: "Anthropic podnio povjerljiv zahtjev za izlazak na burzu",
    description:
      "Kreator Claudea priprema se za potencijalno povijesni IPO s procijenjenom vrijednosti od gotovo bilijun dolara.",
    imageAlt: "Zgrada burze i Anthropic logotip",
    publishedOn: "2026-06-02",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 167,
    slug: "ai-alati-za-kodiranje-stvaraju-copy-paste-generaciju",
    title: "AI alati za kodiranje stvaraju generaciju 'copy-paste' programera",
    description:
      "Umjesto da dubinski razumiju arhitekturu, mladi inženjeri sve više se oslanjaju na generirani kod koji jedva razumiju.",
    imageAlt:
      "Programer u tamnoj sobi gleda u kod generiran umjetnom inteligencijom",
    publishedOn: "2026-06-02",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 168,
    slug: "iluzija-brzine-kako-ai-unistava-duboki-rad",
    title: "Iluzija brzine: Kako AI alati uništavaju duboki rad",
    description:
      "Brzina koju nam donose AI alati stvara lažan osjećaj napretka i smanjuje sposobnost fokusiranog rada.",
    imageAlt: "Ilustracija gubitka fokusa u digitalnom svijetu",
    publishedOn: "2026-06-02",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 169,
    slug: "anthropic-prosiruje-claude-mythos",
    title:
      "Anthropic proširuje Claude Mythos na kritičnu infrastrukturu u preko 15 zemalja",
    description:
      "Anthropic proširuje pristup svom Claude Mythos modelu i Projektu Glasswing organizacijama koje upravljaju kritičnom infrastrukturom diljem svijeta.",
    imageAlt: "Sigurnosna infrastruktura i globalna mreža",
    publishedOn: "2026-06-03",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 170,
    slug: "opsesija-agijem-steti-stvarnim-problemima",
    title: "Opsesija AGI-jem koči stvarni napredak industrije",
    description:
      "Fokusiranje na hipotetsku superinteligenciju odvraća pažnju od rješavanja konkretnih poslovnih i tehničkih problema s današnjim AI alatima.",
    imageAlt: "Fokus na AGI umjesto stvarnih problema",
    publishedOn: "2026-06-03",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 171,
    slug: "zamka-beskonacnog-refaktoriranja",
    title: "Zamka beskonačnog refaktoriranja: AI kao neprijatelj arhitekture",
    description:
      "AI alati stvaraju privid brzine i produktivnosti. Umjesto kvalitetne arhitekture, dobivamo krhke sustave i vječno refaktoriranje.",
    imageAlt: "Zamka beskonačnog refaktoriranja",
    publishedOn: "2026-06-03",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 172,
    slug: "meta-ai-agent-whatsapp-business",
    title: "Meta globalno lansirala AI agenta za WhatsApp Business",
    description:
      "Meta donosi svog AI asistenta u WhatsApp Business diljem svijeta, omogućujući tvrtkama automatizaciju korisničke podrške i prodaje.",
    imageAlt: "Meta AI agent u WhatsApp Business aplikaciji",
    publishedOn: "2026-06-04",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 173,
    slug: "ai-ne-spasava-los-menadzment",
    title: "AI ne spašava loš menadžment, samo ga čini vidljivijim",
    description:
      "Umjetna inteligencija može ubrzati pisanje koda, ali ne može popraviti loše poslovne procese, nejasne zahtjeve i nedostatak tehničke vizije u timu.",
    imageAlt:
      "Ilustracija uz članak: AI ne spašava loš menadžment, samo ga čini vidljivijim",
    publishedOn: "2026-06-04",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 174,
    slug: "zasto-opsesija-agi-jem-steti-stvarnom-napretku",
    title: "Zašto opsesija AGI-jem šteti stvarnom napretku i primjeni AI-ja",
    description:
      "Dok tehnološki divovi obećavaju skoru pojavu umjetne opće inteligencije (AGI), stvarne i korisne AI inovacije ostaju u sjeni. Zbog čega lov na AGI postaje štetna distrakcija?",
    imageAlt:
      "Ilustracija koja prikazuje raskorak između AGI obećanja i stvarne primjene",
    publishedOn: "2026-06-04",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 175,
    slug: "tsmc-potraznja",
    title: "TSMC se bori sa zadovoljavanjem velike potražnje za AI čipovima",
    description:
      "Najveći svjetski proizvođač čipova TSMC navodi kako zbog ogromne potražnje povezane s umjetnom inteligencijom ne može pratiti narudžbe unatoč širenju u SAD-u.",
    imageAlt:
      "Ilustracija uz članak: TSMC se bori sa zadovoljavanjem velike potražnje za AI čipovima",
    publishedOn: "2026-06-05",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 176,
    slug: "mit-o-potpuno-autonomnom-ai-programeru",
    title: "Mit o potpuno autonomnom AI programeru u industriji",
    description:
      "Analiza stvarnih mogućnosti autonomnih AI agenata u razvoju softvera i zašto ljudska stručnost ostaje nezamjenjiva.",
    imageAlt: "Ilustracija uz članak: Mit o potpuno autonomnom AI programeru",
    publishedOn: "2026-06-05",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 177,
    slug: "apple-approves-poke-ai-agent-imessage",
    title: "Apple odobrio prvog AI agenta za Messages for Business platformu",
    description:
      "Startup Poke postao je prvi AI agent odobren na Appleovoj Messages for Business platformi.",
    imageAlt: "Ilustracija AI agenta na pametnom telefonu",
    publishedOn: "2026-06-06",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 178,
    slug: "ai-kraj-programiranja-mit-ili-stvarnost",
    title: "Je li umjetna inteligencija doista kraj programiranja?",
    description:
      "Analiza stvarnog utjecaja umjetne inteligencije na posao softverskih inženjera i zašto narativ o kraju programiranja promašuje bit.",
    imageAlt: "Ilustracija programera i umjetne inteligencije",
    publishedOn: "2026-06-06",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 179,
    slug: "mit-o-demokratizaciji-ai-kroz-otvoreni-kod",
    title: "Mit o demokratizaciji umjetne inteligencije kroz otvoreni kod",
    description:
      "Otvoreni kod u umjetnoj inteligenciji često se slavi kao demokratizacija, no stvarna moć ostaje u rukama onih koji kontroliraju računalnu snagu.",
    imageAlt: "Ilustracija poslužitelja i tehnologije otvorenog koda",
    publishedOn: "2026-06-06",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 180,
    slug: "openai-unveils-lockdown-mode",
    title: "OpenAI predstavlja Lockdown Mode za ChatGPT",
    description:
      "Nova sigurnosna značajka štiti osjetljive podatke od napada putem umetanja naredbi.",
    imageAlt: "Katanac i štit kao simbol sigurnosti u digitalnom svijetu",
    publishedOn: "2026-06-07",
    category: NEWS,
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 181,
    slug: "iluzija-skorog-agi-ja",
    title: "Iluzija skorog AGI-ja: Zašto hype skriva prave probleme industrije",
    description:
      "Opsesija stvaranjem opće umjetne inteligencije zamagljuje trenutne tehničke i društvene izazove koje moramo rješavati danas.",
    imageAlt: "Iluzija skorog AGI-ja",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-07",
  }),
  createPost({
    id: 182,
    slug: "mit-o-opcoj-umjetnoj-inteligenciji-zasto-nas-agi-usporava",
    title: "Mit o općoj umjetnoj inteligenciji: Zašto nas AGI usporava",
    description:
      "Opsesija stvaranjem opće umjetne inteligencije oduzima nam dragocjeni fokus s rješavanja stvarnih problema uskim AI alatima.",
    imageAlt:
      "Ilustracija razdvajanja znanstvene fantastike o AGI od stvarnosti",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-07",
  }),
  createPost({
    id: 183,
    slug: "openai-radi-na-super-aplikaciji",
    title: "OpenAI još uvijek radi na svojoj super aplikaciji",
    description:
      "OpenAI planira lansirati novu verziju ChatGPT-a u obliku 'super aplikacije' usmjerene na poslovne korisnike, s alatima poput Codexa i AI agentima.",
    imageAlt:
      "Ilustracija uz članak: OpenAI još uvijek radi na svojoj super aplikaciji",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-08",
  }),
  createPost({
    id: 184,
    slug: "stvarnost-rada-s-ai-alatima",
    title: "Stvarnost rada s AI alatima: Puno obećanja, malo konteksta",
    description:
      "Analiza pravog stanja rada s AI alatima na stvarnim projektima i zašto oni još uvijek ne mogu zamijeniti ljudsko arhitektonsko razumijevanje i nadzor.",
    imageAlt: "Programer frustriran ispravljanjem grešaka AI koda",
    category: ANALYSIS,
    publishedOn: "2026-06-08",
    readTime: 5,
    featured: false,
  }),
  createPost({
    id: 185,
    title: "OpenAI povjerljivo predao dokumentaciju za inicijalnu javnu ponudu",
    slug: "openai-ipo-s-1-confidential",
    description:
      "OpenAI je povjerljivo predao S-1 obrazac za izlazak na burzu, prateći poteze konkurencije u utrci za dominaciju na tržištu umjetne inteligencije.",
    imageAlt: "Zgrada burze s digitalnim grafovima rasta",
    category: NEWS,
    publishedOn: "2026-06-08",
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 186,
    slug: "ai-ne-uklanja-usko-grlo",
    title:
      "Pravi problem više nije kako brzo napisati kod, već kako ga pročitati",
    description:
      "AI alati nisu uklonili usko grlo u razvoju softvera, već su ga samo preselili iz mehaničkog pisanja u kognitivno procesiranje i razumijevanje koda.",
    imageAlt: "Programer koji pokušava dešifrirati veliku količinu koda",
    category: ANALYSIS,
    publishedOn: "2026-06-09",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 187,
    slug: "razvoj-s-ai-alatima-stvarnost-protiv-marketinga",
    title: "Razvoj s AI alatima: Stvarnost protiv marketinga",
    description:
      "Marketing prodaje priču o brzom kodiranju bez truda, no stvarnost je znatno složenija. Alati donose brzinu, ali i nove izazove u održavanju.",
    imageAlt: "Ilustracija programera koji se bori s umjetnom inteligencijom",
    category: ANALYSIS,
    publishedOn: "2026-06-09",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 188,
    slug: "openai-confidentially-files-for-ipo",
    title: "OpenAI predao tajnu dokumentaciju za izlazak na burzu",
    description:
      "OpenAI je povjerljivo predao S-1 obrazac za izlazak na burzu, čime započinje proces koji bi tvrtku mogao procijeniti na više od bilijun dolara.",
    imageAlt: "Zgrada burze s digitalnim grafovima rasta",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-10",
  }),
  createPost({
    id: 189,
    slug: "iluzija-potpuno-autonomnog-programiranja",
    title: "Iluzija potpuno autonomnog programiranja",
    description:
      "Svi govore da će AI zamijeniti programere, ali realnost je potpuno drugačija. Evo zašto umjetna inteligencija ostaje samo napredni asistent.",
    imageAlt: "Ilustracija programera i umjetne inteligencije",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-10",
  }),
  createPost({
    id: 190,
    slug: "mit-o-brzom-dolasku-agi-ja",
    title: "Mit o brzom dolasku AGI-ja: Zašto smo još daleko od cilja",
    description:
      "Tehnološki divovi najavljuju skori dolazak opće umjetne inteligencije. Međutim, tehnička stvarnost i fundamentalna ograničenja modela pokazuju potpuno drugačiju sliku.",
    imageAlt: "Ilustracija složenosti umjetne inteligencije",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-10",
  }),
  createPost({
    id: 191,
    slug: "gemma-4-12b",
    title: "Google predstavlja Gemma 4 12B multimodalni model",
    description:
      "Novi kompaktni model donosi napredne multimodalne mogućnosti i podršku za audio na vaša prijenosna računala.",
    imageAlt: "Ilustracija uz članak o Google Gemma 4 12B modelu",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-11",
  }),
  createPost({
    id: 192,
    slug: "mit-o-agi",
    title: "Mit o AGI: Zašto je lov na opću inteligenciju distrakcija",
    description:
      "Umjesto sanjarenja o strojevima koji misle kao ljudi, trebamo se fokusirati na stvarne alate koji danas rješavaju konkretne probleme.",
    imageAlt:
      "Apstraktni prikaz prekomjernog fokusa na umjetnu opću inteligenciju",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-11",
  }),
  createPost({
    id: 193,
    slug: "iluzija-produktivnosti-ai-alati",
    title: "Iluzija produktivnosti: Pišemo brže, razumijemo manje",
    description:
      "AI alati omogućuju brže pisanje koda, ali smanjuju dubinsko razumijevanje, što dovodi do dužeg vremena otklanjanja pogrešaka.",
    imageAlt: "Programer gleda u ekran s kodom.",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-12",
  }),
  createPost({
    id: 194,
    slug: "zamka-sintetickog-weba",
    title: "Zamka sintetičkog weba: Zašto internet gubi ljudski glas",
    description:
      "Generativna umjetna inteligencija omogućila je masovnu produkciju sadržaja, ali cijena koju plaćamo je gubitak autentičnosti na otvorenom webu.",
    imageAlt:
      "Apstraktni prikaz utapanja ljudskog glasa u moru digitalnog i sintetičkog sadržaja",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-12",
  }),
  createPost({
    id: 195,
    slug: "anthropic-vlada-sad-blokirala",
    title: "Vlada SAD-a blokirala Anthropicove najmoćnije AI modele",
    description:
      "Američka vlada naredila je tvrtki Anthropic trenutno gašenje pristupa modelima Claude Fable 5 i Mythos 5, navodeći zabrinutost za nacionalnu sigurnost.",
    imageAlt:
      "Apstraktni prikaz vladine intervencije u rad umjetne inteligencije",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-12",
  }),
  createPost({
    id: 196,
    slug: "iluzija-brzog-kodiranja-uz-ai",
    title: "Iluzija brzog kodiranja: Zašto AI alati stvaraju tehnički dug",
    description:
      "Umjetna inteligencija omogućuje brzo pisanje koda, ali dugoročno stvara sustave koje nitko ne razumije i povećava tehnički dug.",
    imageAlt: "Prikaz programskog koda s greškama na zaslonu",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-13",
  }),
  createPost({
    id: 197,
    slug: "anthropic-fable-5-mythos-5-government-national-security",
    title: "Anthropic ukida pristup modelima Fable i Mythos zbog vlade SAD-a",
    description:
      "Američka vlada naredila je tvrtki Anthropic prekid pristupa AI modelima Fable 5 i Mythos 5 uslijed zabrinutosti za nacionalnu sigurnost.",
    imageAlt: "Ilustracija vladine zabrane AI modela",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-13",
  }),
  createPost({
    id: 198,
    slug: "zasto-ai-ne-donosi-kraj-programiranja",
    title: "Zašto umjetna inteligencija ne donosi kraj programiranja",
    description:
      "Suprotno popularnim predviđanjima, AI alati neće zamijeniti softverske inženjere. Evo zašto će kodiranje postati važnije nego ikada.",
    imageAlt:
      "Ilustracija odnosa čovjeka i umjetne inteligencije u programiranju",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-14",
  }),
  createPost({
    id: 199,
    slug: "ai-alati-za-programiranje-stvarnost",
    title: "AI alati za programiranje: Stvarnost iza marketinških obećanja",
    description:
      "Umjetna inteligencija ubrzava pisanje koda, ali donosi nove izazove. Umjesto jednostavnog rješenja, dobili smo asistenta kojeg inženjeri moraju pažljivo nadzirati.",
    imageAlt: "AI asistent pomaže programeru",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-14",
  }),
  createPost({
    id: 200,
    slug: "kraj-ere-besplatnih-ai-alata",
    title: "Kraj ere besplatnih AI alata: Što nas zaista čeka na tržištu?",
    description:
      "Kako kompanije prelaze s besplatnih modela na plaćene pretplate, korisnici se suočavaju s novom realnošću tržišta.",
    imageAlt: "Zlatni kavez besplatnog pristupa",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-15",
  }),
  createPost({
    id: 201,
    slug: "zabluda-o-ai-kao-kreativnom-asistentu",
    title: "Velika zabluda o umjetnoj inteligenciji kao kreativnom asistentu",
    description:
      "Generativna umjetna inteligencija često se prodaje kao novi kreativni suradnik. No, stvarni proces pokazuje da to nije partnerstvo, već samo napredna interpolacija postojećih podataka.",
    imageAlt:
      "Apstraktna ilustracija čovjeka i računala koji stvaraju umjetnost",
    publishedOn: "2026-06-15",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 202,
    slug: "anthropic-bijela-kuca-claude-fable-5",
    title: "Bijela kuća i Anthropic i dalje u sukobu oko modela Claude Fable 5",
    description:
      "Pregovori Trumpove administracije i tvrtke Anthropic završili su bez ukidanja izvoznih ograničenja za Claude Fable 5 zbog zabrinutosti oko sigurnosti.",
    imageAlt: "Zgrada Bijele kuće i AI tehnologija",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-16",
  }),
  createPost({
    id: 203,
    slug: "mit-o-skoroj-zamjeni-programera",
    title: "Mit o skoroj zamjeni programera: Što nam donose umjetni agenti",
    description:
      "Unatoč bombastičnim najavama, AI agenti još uvijek nisu spremni preuzeti cjelokupan razvoj softvera.",
    imageAlt: "Programer radi za računalom dok AI sustav pomaže u pozadini",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-16",
  }),
  createPost({
    id: 204,
    slug: "otvoreni-kod-nece-automatski-pobijediti",
    title: "Otvoreni kod neće automatski pobijediti u utrci za AI",
    description:
      "Iako svi navijaju za otvorene modele, stvarna moć leži u infrastrukturi i ogromnom kapitalu koji oblikuju budućnost umjetne inteligencije.",
    imageAlt: "Digitalna ilustracija koja prikazuje kod i poslužitelje",
    category: ANALYSIS,
    readTime: 5,
    featured: false,
    publishedOn: "2026-06-16",
  }),
  createPost({
    id: 205,
    slug: "investing-in-multi-agent-ai-safety-research",
    title: "Google pokrenuo fond od 10 milijuna dolara za sigurnost AI agenata",
    description:
      "Google DeepMind i partneri najavili su 10 milijuna dolara za istraživanje sigurnosti multi-agentskih sustava.",
    imageAlt: "Apstraktna ilustracija umjetne inteligencije",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-17",
  }),
  createPost({
    id: 206,
    slug: "pravi-problem-ai-alata-tko-ce-odgajati-buduce-seniore",
    title: "Pravi problem AI alata: Tko će odgajati buduće seniore?",
    description:
      "Kratkoročna efikasnost AI alata u programiranju prijeti dugoročnom razvoju pravih stručnjaka i senior inženjera.",
    imageAlt: "Apstraktna ilustracija umjetne inteligencije",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-17",
  }),
  createPost({
    id: 207,
    slug: "mit-o-autonomnim-agentima",
    title: "Mit o autonomnim agentima: Stvarnost razvoja UI alata",
    description:
      "Stvarnost razvoja i implementacije autonomnih agenata često se razlikuje od marketinških obećanja.",
    imageAlt: "Ilustracija programskog koda",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-17",
  }),
  createPost({
    id: 208,
    slug: "midjourney-medical-ultrazvuk",
    title:
      "Midjourney ulazi u medicinu s inovativnim ultrazvukom za cijelo tijelo",
    description:
      "Midjourney CEO David Holz najavio je prvi hardverski proizvod tvrtke: The Midjourney Scanner, ultrazvuk za cijelo tijelo koji koristi 40 ultrazvučnih čipova tvrtke Butterfly Network.",
    imageAlt: "Osoba prolazi kroz napredni medicinski uređaj za skeniranje.",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-18",
  }),
  createPost({
    id: 209,
    slug: "iluzija-ai-asistenata-i-legacy-kod",
    title: "Iluzija AI asistenata: Zašto stari kod ostaje problem",
    description:
      "Umjetna inteligencija briljira u pisanju novog koda, ali posrće tamo gdje je najpotrebnija: u održavanju složenih i nedokumentiranih sustava.",
    imageAlt: "Zapetljani kablovi i stari kod",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-18",
  }),
  createPost({
    id: 210,
    slug: "mit-o-ai-alatima-za-razvoj-softvera",
    title: "Mit o AI alatima za razvoj softvera: Realnost iza marketinga",
    description:
      "Marketing tehnoloških kompanija predstavlja AI asistente kao magično rješenje za svaki problem u kodu, ali svakodnevna upotreba otkriva drugačiju sliku.",
    imageAlt:
      "Ilustracija uz članak: Mit o AI alatima za razvoj softvera: Realnost iza marketinga",
    publishedOn: "2026-06-18",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 211,
    slug: "barret-zoph-napusta-openai",
    title: "Barret Zoph ponovno napušta OpenAI nakon samo pet mjeseci",
    description:
      "Barret Zoph ponovno je napustio OpenAI nakon samo pet mjeseci, ranije se vrativši iz tvrtke Thinking Machines Lab.",
    imageAlt:
      "Ilustracija uz članak: Barret Zoph ponovno napušta OpenAI nakon samo pet mjeseci",
    publishedOn: "2026-06-19",
    category: NEWS,
    readTime: 2,
    featured: false,
  }),
  createPost({
    id: 212,
    slug: "zasto-umjetna-inteligencija-nece-tako-skoro-zamijeniti-programere",
    title: "Zašto umjetna inteligencija neće skoro zamijeniti programere",
    description:
      "Softversko inženjerstvo puno je složenije od pukog pisanja linija koda. AI alati pomažu, ali su daleko od potpune autonomije.",
    imageAlt:
      "Ilustracija uz članak: Zašto umjetna inteligencija neće skoro zamijeniti programere",
    category: ANALYSIS,
    publishedOn: "2026-06-19",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 213,
    slug: "agenti-umjetne-inteligencije-velika-obecanja-i-surova-stvarnost",
    title: "Agenti umjetne inteligencije: Velika obećanja i surova stvarnost",
    description:
      "Autonomni AI agenti obećavaju revoluciju, no u stvarnosti zahtijevaju stalan nadzor. Otkrijte zašto je vizija potpune neovisnosti danas samo iluzija.",
    imageAlt:
      "Ilustracija uz članak: Agenti umjetne inteligencije: Velika obećanja i surova stvarnost",
    category: ANALYSIS,
    publishedOn: "2026-06-19",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 214,
    slug: "mit-o-gigantskim-modelima-zasto-su-mali-ai-modeli-prava-buducnost",
    title: "Mit o gigantskim modelima: Zašto su mali AI modeli prava budućnost",
    description:
      "Industrija je opsjednuta veličinom, no prava revolucija umjetne inteligencije krije se u efikasnim i malim modelima.",
    imageAlt:
      "Ilustracija uz članak: Mit o gigantskim modelima: Zašto su mali AI modeli prava budućnost",
    category: ANALYSIS,
    publishedOn: "2026-06-20",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 215,
    slug: "stvarnost-ai-alata-za-programere",
    title: "Stvarnost AI alata: Od blještavog marketinga do pravog koda",
    description:
      "AI alati za programere nisu čarobni štapići koji sami pišu aplikacije. Otkrivamo pravo stanje stvari u svakodnevnom razvoju softvera.",
    imageAlt:
      "Ilustracija uz članak: Stvarnost AI alata: Od blještavog marketinga do pravog koda",
    category: ANALYSIS,
    publishedOn: "2026-06-20",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 216,
    slug: "john-jumper-odlazi-iz-deepminda-u-anthropic",
    title: "Nobelovac John Jumper napušta DeepMind i prelazi u Anthropic",
    description:
      "Dobitnik Nobelove nagrade i ključni čovjek iza AlphaFolda, John Jumper, prelazi iz Google DeepMinda u konkurentski Anthropic nakon gotovo deset godina.",
    imageAlt: "Nobelovac John Jumper napušta DeepMind i prelazi u Anthropic",
    category: NEWS,
    publishedOn: "2026-06-21",
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 217,
    slug: "autonomni-ai-agenti-mit-o-potpunoj-zamjeni-ljudskog-rada",
    title: "Autonomni AI agenti: Veliki mit o potpunoj zamjeni ljudskog rada",
    description:
      "Razotkrivamo zašto AI agenti neće tako skoro potpuno zamijeniti ljudske stručnjake i zašto je prava moć u simbiozi.",
    imageAlt:
      "Ilustracija uz članak: Autonomni AI agenti: Veliki mit o potpunoj zamjeni ljudskog rada",
    category: ANALYSIS,
    publishedOn: "2026-06-21",
    readTime: 3,
    featured: false,
  }),
  createPost({
    id: 218,
    slug: "zasto-je-potraga-za-agi-jem-zapravo-opasna-distrakcija",
    title: "Zašto je potraga za AGI-jem zapravo opasna distrakcija",
    description:
      "Opsesija industrije umjetnom općom inteligencijom (AGI) odvlači pozornost od rješavanja stvarnih problema današnjice pomoću postojećih alata.",
    imageAlt:
      "Ilustracija uz članak: Zašto je potraga za AGI-jem zapravo opasna distrakcija",
    category: ANALYSIS,
    publishedOn: "2026-06-21",
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 219,
    slug: "americka-zabrana-novih-anthropic-modela",
    title: "Američka zabrana novih Anthropic modela: Tko zapravo profitira?",
    description:
      "Američka administracija prisilila je Anthropic da povuče najnovije modele, pokrećući debate o AI politici.",
    imageAlt: "Ilustracija uz članak o zabrani najnovijih Anthropic modela",
    category: NEWS,
    readTime: 2,
    featured: false,
    publishedOn: "2026-06-22",
  }),
  createPost({
    id: 220,
    slug: "zasto-potpuno-autonomni-ai-agenti-jos-uvijek-nisu-spremni",
    title: "Zašto potpuno autonomni AI agenti još uvijek nisu spremni",
    description:
      "Unatoč velikim obećanjima o agentima koji samostalno rješavaju probleme, stvarnost u produkciji je daleko od savršene.",
    imageAlt: "Ilustracija uz članak o izazovima implementacije AI agenata",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-22",
  }),
  createPost({
    id: 221,
    slug: "startup-subquadratic-rjesava-usko-grlo",
    title: "Startup Subquadratic rješava usko grlo jezičnih modela",
    description:
      "Startup iz Miamija najavio je model SubQ koji rješava matematičko usko grlo pomoću rijetke pažnje.",
    imageAlt:
      "Apstraktna ilustracija matematičkih inovacija u jezičnim modelima",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-23",
  }),
  createPost({
    id: 222,
    slug: "zasto-ai-alati-ne-rade-kao-u-reklamama",
    title: "Zašto AI alati u stvarnom radu ne rade kao u reklamama",
    description:
      "Unatoč savršenim demo snimkama, umjetna inteligencija u produkciji još uvijek zahtijeva puno ljudske intervencije i pažljivog vođenja.",
    imageAlt:
      "Ilustracija razlike između očekivanja i stvarnosti u razvoju softvera s AI alatima",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-23",
  }),
  createPost({
    id: 223,
    slug: "anthropic-claude-tag-slack-ai-teammate",
    title: "Anthropic lansira Claude Tag kao pametnog AI kolegu za Slack",
    description:
      "Nova značajka donosi trajnu memoriju i proaktivnu asistenciju u Slack kanale tvrtki.",
    imageAlt:
      "Ilustracija Anthropic Claude AI asistenta integriranog u Slack sučelje",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-24",
  }),
  createPost({
    id: 224,
    slug: "lokalni-ai-modeli-revolucija-privatnosti",
    title: "Lokalni AI modeli donose pravu revoluciju privatnosti",
    description:
      "Dok se industrija fokusira na oblak, prava promjena događa se na našim uređajima gdje korisnici napokon preuzimaju kontrolu nad podacima.",
    imageAlt:
      "Ilustracija uz članak: Lokalni AI modeli donose pravu revoluciju privatnosti",
    category: ANALYSIS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-24",
  }),
  createPost({
    id: 225,
    slug: "zasto-ai-alati-nece-tako-skoro-zamijeniti-programere",
    title: "Zašto AI alati neće tako skoro zamijeniti programere",
    description:
      "Zašto moderna umjetna inteligencija ne može zamijeniti ljudske softverske inženjere. Analiza razlike između generiranja koda i izgradnje složenih sustava.",
    imageAlt: "AI robot koji sjedi za računalom pokraj programera",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-24",
  }),
  createPost({
    id: 226,
    slug: "figma-ai-novosti-config-2026",
    title: "Figma najavila nove AI alate i opcije kodiranja na Configu 2026",
    description:
      "Figma predstavlja niz novih AI značajki za lakši rad s kodom i dizajnom na Config 2026 konferenciji.",
    imageAlt: "Figma Config 2026 prezentacija s fokusom na AI značajke",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-25",
  }),
  createPost({
    id: 227,
    slug: "iluzija-produktivnosti-prava-cijena-ai",
    title: "Iluzija produktivnosti: Prava cijena umjetne inteligencije u poslu",
    description:
      "Analiza kako prekomjerno oslanjanje na AI alate za generiranje koda može stvoriti dugoročni tehnički dug umjesto stvarne produktivnosti.",
    imageAlt: "Osoba za računalom okružena ekranima punim grešaka u kodu",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-25",
  }),
  createPost({
    id: 228,
    slug: "opca-umjetna-inteligencija-kao-distrakcija",
    title: "Zašto je opća umjetna inteligencija opasna distrakcija",
    description:
      "Opsesija razvojem AGI-ja služi kao izgovor za ignoriranje stvarnih i hitnih problema koje današnja umjetna inteligencija donosi društvu.",
    imageAlt: "Apstraktni prikaz opasnosti i distrakcije umjetne inteligencije",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-25",
  }),
  createPost({
    id: 229,
    slug: "bijela-kuca-trazi-od-openai-a-usporeno-izdavanje-novog-modela",
    title: "Bijela kuća traži od OpenAI-a usporeno izdavanje novog modela",
    description:
      "Američka administracija pritišće OpenAI da ograniči pristup svom nadolazećem modelu GPT-5.6 zbog zabrinutosti oko sigurnosti.",
    imageAlt: "Zgrada Bijele kuće i OpenAI logo u pozadini",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-26",
  }),
  createPost({
    id: 230,
    slug: "vise-koda-nije-bolji-kod",
    title: "AI alati u programiranju: Više koda ne znači bolji kod",
    description:
      "Prividna produktivnost AI asistenata za pisanje koda prikriva stvarni dugoročni trošak održavanja i razumijevanja složenih sustava.",
    imageAlt: "Programski kod na ekranu s prikazom umjetne inteligencije",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-26",
  }),
  createPost({
    id: 231,
    slug: "mit-o-otvorenom-kodu-kako-tehnoloski-divovi-kontroliraju-ai",
    title: "Mit o otvorenom kodu: Kako tehnološki divovi kontroliraju AI",
    description:
      "Analiziramo zašto trenutni open-source AI modeli nisu stvarna demokratizacija tehnologije, već alat za učvršćivanje monopola najvećih korporacija.",
    imageAlt:
      "Ilustracija tehnoloških divova koji kontroliraju umjetnu inteligenciju",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
    publishedOn: "2026-06-26",
  }),
  createPost({
    id: 232,
    slug: "anthropic-mythos-djelomicno-odobren",
    title: "Američka vlada djelomično ublažila restrikcije za Anthropic Mythos",
    description:
      "Anthropicu je ponovno omogućeno pružanje pristupa naprednom AI modelu Mythos 5 za odabrane američke organizacije, no model Fable 5 ostaje nedostupan.",
    imageAlt: "Ilustracija ublažavanja restrikcija za umjetnu inteligenciju",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-27",
  }),
  createPost({
    id: 233,
    slug: "mit-o-neutralnom-ai-ju",
    title: "Mit o neutralnom AI-ju: Zašto algoritmi uvijek imaju skriveni cilj",
    description:
      "Umjetna inteligencija nije objektivno ogledalo stvarnosti, već sustav vrijednosti onoga tko ju je trenirao. Neutralnost je samo korporativni privid.",
    imageAlt:
      "Ilustracija koja prikazuje ljudske ruke kako upravljaju umjetnom inteligencijom",
    category: ANALYSIS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-27",
  }),
  createPost({
    id: 234,
    slug: "developer-reality-ai-coding-assistants",
    title: "Stvarnost AI programiranja: Razbijanje velikih mitova",
    description:
      "Marketing obećava da će umjetna inteligencija sama pisati kod. Stvarnost na terenu otkriva drugačiju priču o razvoju softvera.",
    imageAlt: "AI programiranje mitovi i stvarnost",
    publishedOn: "2026-06-27",
    category: ANALYSIS,
    readTime: 4,
    featured: false,
  }),
  createPost({
    id: 235,
    slug: "openai-limits-gpt-5-6-rollout",
    title: "OpenAI ograničava pristup GPT-5.6 zbog američke vlade",
    description:
      "OpenAI djelomično blokira izdavanje naprednih AI modela na zahtjev američke vlade i uvodi mjere obrane u kibernetičkom prostoru.",
    imageAlt: "Ilustracija ograničenja pristupa umjetnoj inteligenciji",
    category: NEWS,
    readTime: 3,
    featured: false,
    publishedOn: "2026-06-28",
  }),
  createPost({
    id: 236,
    slug: "iluzija-autonomnih-agenata",
    title: "Velika iluzija autonomnih AI agenata u modernom poslovanju",
    description:
      "Marketing obećava radnike bez umora, no stvarni projekti otkrivaju krhke sustave koji zahtijevaju stalni ljudski nadzor.",
    imageAlt: "Iluzija autonomnih AI agenata",
    publishedOn: "2026-06-28",
    category: ANALYSIS,
    readTime: 4,
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

export const sortedBlogPosts = blogPosts
  .filter((post) => isPostPublished(post))
  .sort(comparePostsByPublishedAt);
