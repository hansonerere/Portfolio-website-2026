CREATE TABLE IF NOT EXISTS homepage (
  id INTEGER PRIMARY KEY AUTOINCREMENT, hero_video_url TEXT NOT NULL DEFAULT '', hero_video_poster TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS service_cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT, homepage_id INTEGER REFERENCES homepage(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL, number TEXT NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, image_url TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS about_page (
  id INTEGER PRIMARY KEY AUTOINCREMENT, hero_title TEXT NOT NULL DEFAULT 'Hanson',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS about_cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT, about_page_id INTEGER REFERENCES about_page(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL, number TEXT NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL, image_url TEXT,
  contact_info TEXT, clients TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, year TEXT NOT NULL, category TEXT NOT NULL,
  cover_image TEXT NOT NULL, hero_video_url TEXT, hero_video_poster TEXT, is_active INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0,1)),
  order_index INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS project_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT, project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS project_gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT, project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL, type TEXT NOT NULL CHECK(type IN ('image','video')), url TEXT NOT NULL, alt_text TEXT,
  layout_span TEXT NOT NULL DEFAULT 'half' CHECK(layout_span IN ('full','half')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS service_cards_order ON service_cards(homepage_id, order_index, id);
CREATE INDEX IF NOT EXISTS about_cards_order ON about_cards(about_page_id, order_index, id);
CREATE INDEX IF NOT EXISTS projects_order ON projects(is_active, order_index, id);
CREATE INDEX IF NOT EXISTS project_sections_order ON project_sections(project_id, order_index, id);
CREATE INDEX IF NOT EXISTS project_gallery_order ON project_gallery(project_id, order_index, id);
CREATE TABLE IF NOT EXISTS admin_login_attempts (
  bucket TEXT PRIMARY KEY, attempts INTEGER NOT NULL, expires_at INTEGER NOT NULL
);
