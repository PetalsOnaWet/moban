"use client";

import { useEffect } from "react";
import { Game } from "@/lib/core/games";
import { addToHistory } from "@/lib/core/history";

interface HistoryTrackerProps {
  game: Game;
}

export function HistoryTracker({ game }: HistoryTrackerProps) {
  useEffect(() => {
    addToHistory(game);
  }, [game]);

  return null; // This component doesn't render anything
}
