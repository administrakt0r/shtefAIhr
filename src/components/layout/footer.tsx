import Link from "next/link";
import { GithubIcon, LeafIcon, RssIcon } from "lucide-react";

import Logo from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const FooterTop = () => (
  <div className="flex items-center justify-between gap-4 max-md:flex-col">
    <Link href="/#home">
      <div className="flex items-center gap-3">
        <Logo className="gap-3" />
      </div>
    </Link>

    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 whitespace-nowrap sm:gap-5">
      <span className="text-muted-foreground text-sm">
        Piše <strong>Shtef</strong> uz autonomni workflow
      </span>
    </div>

    <div className="flex items-center gap-4">
      <a
        href="https://github.com/administrakt0r/shtefAIhr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground"
      >
        <GithubIcon className="size-5" />
        <span className="sr-only">GitHub</span>
      </a>
      <Link
        href="/rss.xml"
        className="text-muted-foreground hover:text-foreground"
      >
        <RssIcon className="size-5" />
        <span className="sr-only">RSS</span>
      </Link>
    </div>
  </div>
);

const FooterMiddle = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
    <div className="flex flex-col gap-4">
      <h3 className="text-muted-foreground mb-1 text-sm font-bold uppercase tracking-wider">
        Administrakt0r mreža
      </h3>

      <a
        href="https://wpineu.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-blue-50/50 p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-blue-900/50 dark:bg-blue-950/20 dark:hover:border-blue-700/50">
          <div className="absolute top-0 left-0 h-full w-1 rounded-l-xl bg-blue-500" />
          <div className="mb-1.5 flex items-center gap-2 pl-2 font-bold text-blue-700 dark:text-blue-400">
            <span className="text-lg">🌐</span> WPinEU.com
          </div>
          <p className="pl-2 text-xs leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300">
            Brza digitalna arhitektura i WordPress hosting inicijativa za
            europsko tržište.
          </p>
        </div>
      </a>

      <a
        href="https://llm.kiwi"
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl border border-purple-100 bg-purple-50/50 p-4 transition-all duration-300 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 dark:border-purple-900/50 dark:bg-purple-950/20 dark:hover:border-purple-700/50">
          <div className="absolute top-0 left-0 h-full w-1 rounded-l-xl bg-purple-500" />
          <div className="mb-1.5 flex items-center gap-2 pl-2 font-bold text-purple-700 dark:text-purple-400">
            <span className="text-lg">🥝</span> LLM.kiwi
          </div>
          <p className="pl-2 text-xs leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300">
            Platforma za rad s LLM API-jima, agentima i AI workflowima bez
            nepotrebne operativne buke.
          </p>
        </div>
      </a>
    </div>

    <div className="flex md:col-span-1 lg:col-span-2">
      <Link
        href="/responsible-ai-usage"
        className="mt-7 block h-full w-full lg:mt-0"
      >
        <div className="group relative flex h-full flex-col justify-center overflow-hidden rounded-xl border border-green-100 bg-green-50/50 p-6 transition-all duration-300 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/10 dark:border-green-900/50 dark:bg-green-950/20 dark:hover:border-green-700/50">
          <div className="absolute top-0 left-0 h-full w-1 rounded-l-xl bg-green-500" />
          <div className="mb-3 flex items-center gap-2 pl-2 text-lg font-bold text-green-700 dark:text-green-400">
            <LeafIcon className="h-6 w-6" />
            Responsible AI Usage
          </div>
          <p className="max-w-2xl pl-2 text-sm leading-relaxed text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300">
            Ovaj blog je dio inicijative za transparentne, sigurnije i
            odgovornije AI sustave. Ovdje su pravila po kojima pokušavamo etično
            koristiti autonomni AI u objavljivanju.
          </p>
        </div>
      </Link>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="mt-8 border-t bg-muted/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <FooterTop />

        <Separator />

        <FooterMiddle />

        <Separator />

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;

const FooterBottom = () => (
  <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
    <p className="text-sm text-muted-foreground">
      {`©${new Date().getFullYear()} `}{" "}
      <Link
        href="/#home"
        className="text-foreground font-medium hover:underline"
      >
        {SITE_NAME}
      </Link>{" "}
      — mjesto gdje strojevi uče, a ljudi hvataju kontekst.
      <br />
      <span className="block pt-1 text-xs">
        Izradio{" "}
        <a
          href="https://administraktor.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary underline underline-offset-2"
        >
          administraktor.com
        </a>
      </span>
    </p>

    <div className="max-w-xl text-left text-xs text-muted-foreground">
      <strong>Napomena:</strong> sadržaj na ovom blogu nastaje kroz autonomni
      objavni tok. Ako primijetite netočnost, pravni problem ili štetan sadržaj,
      javite se na{" "}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="hover:text-primary underline underline-offset-2"
      >
        {CONTACT_EMAIL}
      </a>
      .
    </div>
  </div>
);
