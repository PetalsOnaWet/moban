import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGameBySlug, getGamesByCategory, getCategories, getRelatedGames, getGames } from "@/lib/core/games";
import { CategoryPageUI } from "@/components/pages/CategoryPageUI";
import { GamePageUI } from "@/components/pages/GamePageUI";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  const decodedSlug = decodeURIComponent(slug);
  
  // 1. Check if it's a category
  const validCategories = ["new-games", "hot-games", ...getCategories().map(c => c.slug)];
  if (validCategories.includes(decodedSlug)) {
    let cleanTitle = decodedSlug.replace(/-games$/, '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    cleanTitle += " Games";
    const pageNum = parseInt(page || '1', 10);
    const pageSuffix = pageNum > 1 ? ` - Page ${pageNum}` : "";
    return {
      title: `${cleanTitle}${pageSuffix} - Play Free Online`,
      description: `Play the best ${cleanTitle.toLowerCase()} for free online.`,
    };
  }

  // 2. Check if it's a game
  const game = await getGameBySlug(decodedSlug);
  if (game) {
    return {
      title: `${game.title} - Play Unblocked Online`,
      description: game.description,
    };
  }

  return { title: "Not Found" };
}

export default async function DynamicPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page } = await searchParams;
  const decodedSlug = decodeURIComponent(slug);
  const currentPage = parseInt(page || '1', 10);

  // 1. Is it a Special Category?
  if (decodedSlug === "new-games" || decodedSlug === "hot-games") {
    const lookupSlug = decodedSlug.replace(/-games$/, '');
    const { games, totalCount } = await getGamesByCategory(lookupSlug, currentPage, 24);
    return <CategoryPageUI slug={decodedSlug} games={games} totalCount={totalCount} currentPage={currentPage} />;
  }

  // 2. Is it a Regular Category?
  const categories = getCategories();
  const foundCategory = categories.find(cat => cat.slug === decodedSlug);
  if (foundCategory) {
    const lookupSlug = decodedSlug.replace(/-games$/, '');
    const { games, totalCount } = await getGamesByCategory(lookupSlug, currentPage, 24);
    return <CategoryPageUI slug={decodedSlug} games={games} totalCount={totalCount} currentPage={currentPage} />;
  }

  // 3. Is it a Game?
  const game = await getGameBySlug(decodedSlug);
  if (game) {
    const relatedGames = await getRelatedGames(game.slug, game.category, 60);
    return <GamePageUI game={game} relatedGames={relatedGames} />;
  }

  // 4. Neither - 404
  notFound();
}
