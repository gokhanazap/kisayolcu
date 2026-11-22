CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_key TEXT NOT NULL,
  ms INTEGER NOT NULL,
  raw INTEGER NOT NULL,
  mouse INTEGER NOT NULL DEFAULT 0,
  passes INTEGER NOT NULL DEFAULT 0,
  hints INTEGER NOT NULL DEFAULT 0,
  grid TEXT,
  nonce TEXT NOT NULL UNIQUE,
  ip_hash TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_scores_ms ON scores (ms);
CREATE INDEX IF NOT EXISTS idx_scores_key ON scores (name_key, ms);
CREATE INDEX IF NOT EXISTS idx_scores_ip ON scores (ip_hash, created_at);

-- İsim başına en iyi süre (liderlik tablosu buradan okunur)
CREATE TABLE IF NOT EXISTS best (
  name_key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  ms INTEGER NOT NULL,
  runs INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_best_ms ON best (ms);
