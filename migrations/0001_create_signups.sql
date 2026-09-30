CREATE TABLE IF NOT EXISTS signups (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT    NOT NULL UNIQUE,
  roles      TEXT    NOT NULL DEFAULT '',
  -- Free text: which other barbershop events they plan to attend in 2027
  events     TEXT    NOT NULL DEFAULT '',
  created_at TEXT    NOT NULL,
  updated_at TEXT    NOT NULL
);
