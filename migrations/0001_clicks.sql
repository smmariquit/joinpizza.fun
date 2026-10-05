CREATE TABLE IF NOT EXISTS clicks (
  id INTEGER PRIMARY KEY,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  link TEXT NOT NULL,
  ref TEXT,
  referer TEXT,
  country TEXT
);
CREATE INDEX IF NOT EXISTS clicks_link_ts ON clicks (link, ts);
