import type { ReactNode } from "react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import type { NavigationSection } from "@/components/blocks/menu-navigation";

const navigationData: NavigationSection[] = [
  {
    title: "Početna",
    href: "/#home",
  },
  {
    title: "Najnovije",
    href: "/#categories",
  },
  {
    title: "O blogu",
    href: "/about",
  },
];

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <Header navigationData={navigationData} />
      <main id="main-content" tabIndex={-1} className="flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PagesLayout;
