"use client";

import { useEffect } from "react";
import { addToHistory } from "@/lib/core/history";

interface HistoryTrackerProps {
  game: {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
  };
}

export function HistoryTracker({ game }: HistoryTrackerProps) {
  useEffect(() => {
    addToHistory(game);
  }, [game]);

  return null; // This component doesn't render anything
}
