-- Yap wall (joinpizza.fun/wall): messages from people who were at Hack & Yap.
-- Hide one with: UPDATE wall SET hidden = 1 WHERE id = ?;
CREATE TABLE IF NOT EXISTS wall (
  id INTEGER PRIMARY KEY,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT,
  msg TEXT NOT NULL,
  thing TEXT NOT NULL,
  hidden INTEGER NOT NULL DEFAULT 0
);
