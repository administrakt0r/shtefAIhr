"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

import { blogPosts } from "@/assets/data/blog-posts";
import {
  comparePostsByPublishedAt,
  formatPostDisplayDate,
  type BlogPost,
} from "@/lib/blog";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const getAvailableBlogPosts = () => blogPosts;

const BlogGrid = ({
  posts,
  onCategoryClick,
}: {
  posts: BlogPost[];
  onCategoryClick: (category: string) => void;
}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="group h-full cursor-pointer overflow-hidden shadow-none transition-all duration-300"
        >
          <CardContent className="space-y-3.5">
            <Link href={`/blog-detail/${post.slug}`} className="block">
              <div className="mb-6 aspect-[1200/630] overflow-hidden rounded-lg sm:mb-12">
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  width={1200}
                  height={630}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="flex items-center justify-between gap-1.5">
              <div className="text-muted-foreground flex items-center gap-1.5">
                <CalendarDaysIcon className="size-5" />
                <span>{formatPostDisplayDate(post)}</span>
              </div>
              <Badge
                className="bg-primary/10 text-primary rounded-full border-0 text-sm"
                onClick={(event) => {
                  event.stopPropagation();
                  onCategoryClick(post.category);
                }}
              >
                {post.category}
              </Badge>
            </div>
            <Link href={`/blog-detail/${post.slug}`} className="block">
              <h3 className="line-clamp-2 text-lg font-medium md:text-xl">
                {post.title}
              </h3>
            </Link>
            <p className="text-muted-foreground line-clamp-2">
              {post.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{post.author}</span>
              <Button
                size="icon"
                className="group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground border group-hover:border-transparent hover:border-transparent"
                asChild
              >
                <Link href={`/blog-detail/${post.slug}`}>
                  <ArrowRightIcon className="size-4 -rotate-45" />
                  <span className="sr-only">Pročitaj više: {post.title}</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const BlogFilters = ({
  categories,
  selectedTab,
  searchQuery,
  onTabChange,
  onSearchChange,
  onClearSearch
}: {
  categories: string[]
  selectedTab: string
  searchQuery: string
  onTabChange: (tab: string) => void
  onSearchChange: (query: string) => void
  onClearSearch: () => void
}) => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      <ScrollArea className='bg-muted w-full rounded-lg sm:w-auto'>
        <div className='flex p-1'>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedTab === category ? 'secondary' : 'ghost'}
              size='sm'
              onClick={() => onTabChange(category)}
              className={`h-9 px-4 text-base ${selectedTab === category ? 'bg-background shadow-sm' : ''}`}
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>

      <div className='relative max-md:w-full'>
        <Label htmlFor='blog-search' className='sr-only'>
          Pretraži objave
        </Label>
        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
          <SearchIcon className='size-4' />
          <span className='sr-only'>Pretraga</span>
        </div>
        <Input
          id='blog-search'
          type='text'
          placeholder='Pretraži naslov ili sažetak'
          value={searchQuery}
          aria-describedby='blog-results-summary'
          onChange={event => onSearchChange(event.target.value)}
          className='peer h-10 px-9'
        />
        {searchQuery ? (
          <button
            type='button'
            aria-label='Očisti pretragu'
            onClick={onClearSearch}
            className='text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center justify-center pr-3'
          >
            <XIcon className='size-4' />
            <span className='sr-only'>Očisti pretragu</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}

const BlogHeader = ({
  selectedTab,
  allCategoryLabel,
  searchQuery,
  onReset
}: {
  selectedTab: string
  allCategoryLabel: string
  searchQuery: string
  onReset: () => void
}) => {
  return (
    <div className='space-y-4'>
      {selectedTab === allCategoryLabel && !searchQuery ? (
        <p className='text-sm'>Objave</p>
      ) : (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href='#'
                onClick={event => {
                  event.preventDefault()
                  onReset()
                }}
              >
                Objave
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{searchQuery ? `Pretraga: ${searchQuery}` : selectedTab}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>AI priče koje oblikuju ono što dolazi.</h2>

      <p className='text-muted-foreground text-lg md:text-xl'>
        Dnevni AI proboji, istraživanja i tržišni pomaci, uredno odabrani i objavljeni od Shtefa.
      </p>
    </div>
  )
}

const BlogEmptyState = ({ onClearFilters }: { onClearFilters: () => void }) => {
  return (
    <div className='flex flex-col items-center justify-center py-20 text-center'>
      <div className='bg-muted mb-4 flex size-16 items-center justify-center rounded-full'>
        <SearchIcon className='text-muted-foreground size-8' />
      </div>
      <h3 className='text-xl font-medium'>Nema pronađenih objava</h3>
      <p className='text-muted-foreground mt-2 max-w-xs'>
        Trenutačno ne nalazimo članke koji odgovaraju ovoj pretrazi ili filtrima.
      </p>
      <Button variant='link' className='mt-4' onClick={onClearFilters}>
        Očisti sve filtere
      </Button>
    </div>
  )
}

const BlogPagination = ({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => {
  if (totalPages <= 1) return null

  return (
    <div className='flex items-center justify-center gap-2 pt-8'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className='size-4' />
        <span className='sr-only'>Prethodna stranica</span>
      </Button>

      <div className='flex items-center gap-1'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size='icon'
            onClick={() => onPageChange(page)}
            className='hidden sm:flex'
          >
            {page}
          </Button>
        ))}
        <span className='text-muted-foreground mx-2 text-sm sm:hidden'>
          Stranica {currentPage} od {totalPages}
        </span>
      </div>

      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className='size-4' />
        <span className='sr-only'>Sljedeća stranica</span>
      </Button>
    </div>
  )
}

const Blog = () => {
  const allCategoryLabel = "Sve";
  const [selectedTab, setSelectedTab] = useState(allCategoryLabel);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  const availableBlogPosts = getAvailableBlogPosts();

  const nonFeaturedPosts = availableBlogPosts
    .filter((post) => !post.featured)
    .sort(comparePostsByPublishedAt);

  const uniqueCategories = [
    ...new Set(nonFeaturedPosts.map((post) => post.category)),
  ];

  const categories = [allCategoryLabel, ...uniqueCategories.sort()];

  const filteredPosts = nonFeaturedPosts.filter((post) => {
    const matchesCategory =
      selectedTab === allCategoryLabel || post.category === selectedTab;

    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return matchesCategory;
    }

    const matchesSearch =
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.description.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const resultsSummary =
    filteredPosts.length === 0
      ? "Nijedna objava ne odgovara trenutačnoj pretrazi i filtrima."
      : `Prikazujemo ${paginatedPosts.length} od ${filteredPosts.length} ${
          filteredPosts.length === 1 ? "objave" : "objava"
        }${selectedTab !== allCategoryLabel ? ` u kategoriji ${selectedTab}` : ""}${searchQuery ? ` za "${searchQuery}"` : ""}.`;

  const handleTabChange = (tab: string) => {
    setCurrentPage(1);
    setSelectedTab(tab);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const element = document.getElementById("categories");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 sm:py-16 lg:py-24" id="categories">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="space-y-4">
          {selectedTab === allCategoryLabel && !searchQuery ? (
            <p className="text-sm">Objave</p>
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setSelectedTab(allCategoryLabel);
                      setSearchQuery("");
                    }}
                  >
                    Objave
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {searchQuery ? `Pretraga: ${searchQuery}` : selectedTab}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}

          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            AI priče koje oblikuju ono što dolazi.
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl">
            Dnevni AI proboji, istraživanja i tržišni pomaci, uredno odabrani i
            objavljeni od Shtefa.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:gap-16">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <ScrollArea className="bg-muted w-full rounded-lg sm:w-auto">
              <div className="flex p-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedTab === category ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => handleTabChange(category)}
                    className={`h-9 px-4 text-base ${selectedTab === category ? "bg-background shadow-sm" : ""}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="relative max-md:w-full">
              <Label htmlFor="blog-search" className="sr-only">
                Pretraži objave
              </Label>
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <SearchIcon className="size-4" />
                <span className="sr-only">Pretraga</span>
              </div>
              <Input
                id="blog-search"
                type="text"
                placeholder="Pretraži naslov ili sažetak"
                value={searchQuery}
                aria-describedby="blog-results-summary"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                className="peer h-10 px-9"
              />
              {searchQuery ? (
                <button
                  type="button"
                  aria-label="Očisti pretragu"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center justify-center pr-3"
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">Očisti pretragu</span>
                </button>
              ) : null}
            </div>
          </div>

          <p
            id="blog-results-summary"
            className="text-muted-foreground text-sm"
            aria-live="polite"
          >
            {resultsSummary}
          </p>

          {paginatedPosts.length > 0 ? (
            <div className="space-y-12">
              <BlogGrid
                posts={paginatedPosts}
                onCategoryClick={handleTabChange}
              />

              {totalPages > 1 ? (
                <div className="flex items-center justify-center gap-2 pt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className="size-4" />
                    <span className="sr-only">Prethodna stranica</span>
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => handlePageChange(page)}
                        className="hidden sm:flex"
                      >
                        {page}
                      </Button>
                    ))}
                    <span className="text-muted-foreground mx-2 text-sm sm:hidden">
                      Stranica {currentPage} od {totalPages}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className="size-4" />
                    <span className="sr-only">Sljedeća stranica</span>
                  </Button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-muted mb-4 flex size-16 items-center justify-center rounded-full">
                <SearchIcon className="text-muted-foreground size-8" />
              </div>
              <h3 className="text-xl font-medium">Nema pronađenih objava</h3>
              <p className="text-muted-foreground mt-2 max-w-xs">
                Trenutačno ne nalazimo članke koji odgovaraju ovoj pretrazi ili
                filtrima.
              </p>
              <Button
                variant="link"
                className="mt-4"
                onClick={() => {
                  setSelectedTab(allCategoryLabel);
                  setSearchQuery("");
                }}
              >
                Očisti sve filtere
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
