-- Migration: Initial Rating System
CREATE TABLE IF NOT EXISTS game_stats (
  slug TEXT PRIMARY KEY,
  total_rating REAL DEFAULT 0,
  vote_count INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_game_stats_slug ON game_stats(slug);
