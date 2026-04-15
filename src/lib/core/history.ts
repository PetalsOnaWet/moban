"use client";

import { Game } from "./games";

const HISTORY_KEY = "geometry_dash_history";

export interface GameHistoryItem extends Game {
  playedAt: number;
}

export function addToHistory(game: Game) {
  if (typeof window === "undefined") return;

  const rawHistory = localStorage.getItem(HISTORY_KEY);
  let history: GameHistoryItem[] = rawHistory ? JSON.parse(rawHistory) : [];

  // Remove duplicate if exists
  history = history.filter(item => item.slug !== game.slug);

  // Add to front
  const newItem: GameHistoryItem = {
    ...game,
    playedAt: Date.now()
  };

  history.unshift(newItem);

  // Limit to 100 items for performance
  const limitedHistory = history.slice(0, 100);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
}

export function getHistory(): GameHistoryItem[] {
  if (typeof window === "undefined") return [];
  const rawHistory = localStorage.getItem(HISTORY_KEY);
  return rawHistory ? JSON.parse(rawHistory) : [];
}
