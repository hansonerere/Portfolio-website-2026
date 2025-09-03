-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 首页数据表
CREATE TABLE homepage (
  id SERIAL PRIMARY KEY,
  hero_video_url TEXT NOT NULL,
  hero_video_poster TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 服务卡片表
CREATE TABLE service_cards (
  id SERIAL PRIMARY KEY,
  homepage_id INTEGER REFERENCES homepage(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  number VARCHAR(10) NOT NULL, -- /01, /02, etc.
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About页面数据表
CREATE TABLE about_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(100) NOT NULL DEFAULT 'Hanson',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About页面卡片表
CREATE TABLE about_cards (
  id SERIAL PRIMARY KEY,
  about_page_id INTEGER REFERENCES about_page(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  number VARCHAR(10) NOT NULL, -- /01, /02, etc.
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  contact_info JSONB, -- 存储联系信息数组
  clients JSONB, -- 存储客户信息数组
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 项目表
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  year VARCHAR(10) NOT NULL,
  category VARCHAR(50) NOT NULL,
  cover_image TEXT NOT NULL,
  hero_video_url TEXT,
  hero_video_poster TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 项目内容部分表
CREATE TABLE project_sections (
  id SERIAL PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 项目画廊表
CREATE TABLE project_gallery (
  id SERIAL PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  alt_text VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引优化查询性能
CREATE INDEX idx_service_cards_homepage_order ON service_cards(homepage_id, order_index);
CREATE INDEX idx_about_cards_page_order ON about_cards(about_page_id, order_index);
CREATE INDEX idx_project_sections_project_order ON project_sections(project_id, order_index);
CREATE INDEX idx_project_gallery_project_order ON project_gallery(project_id, order_index);
CREATE INDEX idx_projects_active_order ON projects(is_active, order_index);

-- 更新时间戳触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 为所有表添加自动更新时间戳触发器
CREATE TRIGGER update_homepage_updated_at BEFORE UPDATE ON homepage FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_cards_updated_at BEFORE UPDATE ON service_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_page_updated_at BEFORE UPDATE ON about_page FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_cards_updated_at BEFORE UPDATE ON about_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_sections_updated_at BEFORE UPDATE ON project_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_gallery_updated_at BEFORE UPDATE ON project_gallery FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入示例数据

-- 1. 首页数据
INSERT INTO homepage (hero_video_url, hero_video_poster) VALUES 
('https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop');

-- 2. 服务卡片数据
INSERT INTO service_cards (homepage_id, order_index, number, title, description, image_url) VALUES 
(1, 1, '/01', 'Web design', 'Responsive, editorial-driven sites that balance form and function. Built to scale and stand out.', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=450&fit=crop'),
(1, 2, '/02', 'Branding', 'From logo to launch, we craft brand systems that speak with confidence.', 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?w=600&h=450&fit=crop'),
(1, 3, '/03', 'Art Direction', 'Conceptual direction for photo shoots, campaigns, and digital experiences. Visual storytelling with precision.', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=450&fit=crop'),
(1, 4, '/04', 'Campaigns', 'Ideas that travel across mediums. From social to print to outdoor.', 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=450&fit=crop'),
(1, 5, '/05', 'UX/UI', 'User-centered interfaces, informed by research and made to feel intuitive.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop'),
(1, 6, '/06', 'Copywriting', 'Messaging, tone of voice, and product copy that speaks like a human — not a brochure.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=450&fit=crop');

-- 3. About页面数据
INSERT INTO about_page (hero_title) VALUES ('Hanson');

-- 4. About页面卡片数据 (确保每行都有8个值对应8个字段)
INSERT INTO about_cards (about_page_id, order_index, number, title, content, image_url, contact_info, clients) VALUES 
(1, 1, '/01', 'Our studio', 'Our studio centers on contemporary design studio creating thoughtful, modern brands and experiences that stand out and stand for something. Rooted in collaboration, clarity and experimentation, we work closely with companies, creatives, and culture-makers to bring ideas into sharp visual focus. From early-stage startups to established institutions, our work lives across digital products, brand identities, editorial systems, campaigns, and cultural platforms.', 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=450&fit=crop&crop=faces', NULL, NULL),
(1, 2, '/02', 'Background', 'Founded by a team with diverse design, art direction, visual identity, and digital projects STUDIO KOLLEKTIV brings strategic and craft to build flexible design systems for ambitious ideas. Our studio was shaped by real-world constraints — tight timelines, lean teams, and the need to punch above our weight.', 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=450&fit=crop', NULL, NULL),
(1, 3, '/03', 'Clients', 'Our valued clients and their project years.', NULL, NULL, '[{"name": "[Start-up Client Name]", "year": "2025"}, {"name": "[Independent Creator Work]", "year": "2025"}, {"name": "[Culture-focused Brand]", "year": "2024"}]'),
(1, 4, '/04', 'Contact', 'Get in touch with us for your next project.', NULL, '[{"label": "General enquiries", "value": "hello@studiokollektiv.co", "type": "email"}, {"label": "Business enquiries", "value": "projects@studiokollektiv.co", "type": "email"}, {"label": "Social media", "value": "Linkedin", "type": "social"}, {"label": "Social media", "value": "Twitter", "type": "social"}]', NULL);

-- 5. 示例项目数据
INSERT INTO projects (id, title, description, year, category, cover_image, hero_video_url, hero_video_poster, is_active, order_index) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Casablanco', 'Rebranding for Californian luxurious furniture maker, Casablanco.', '2025', 'Project', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop', 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop', true, 1),
('550e8400-e29b-41d4-a716-446655440001', 'Drowning in Dusk', 'Brand new identity for a renowned fashion designer.', '2025', 'Project', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=800&fit=crop', NULL, NULL, true, 2),
('550e8400-e29b-41d4-a716-446655440002', 'About me', 'We are a studio founded by Scandinavian expats in sunny Los Angeles. We work with globally recognized brands, as well as local creatives. Reach out to us for your next campaign or rebranding!', '2025', 'Info', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop', NULL, NULL, true, 0);

-- 6. 项目内容段落
INSERT INTO project_sections (project_id, order_index, title, content) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 1, 'Process', 'We began by stripping the brand back to its foundations. The previous identity leaned heavily on ornament — we replaced it with structural elegance, minimal type, and a calming, sun-washed palette.'),
('550e8400-e29b-41d4-a716-446655440001', 1, 'Concept', 'A complete visual identity for an emerging fashion designer, focusing on the intersection of darkness and light, creating a mysterious yet approachable brand presence.');

-- 7. 项目画廊
INSERT INTO project_gallery (project_id, order_index, type, url, alt_text) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 1, 'image', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=700&fit=crop', 'Casablanco furniture piece'),
('550e8400-e29b-41d4-a716-446655440000', 2, 'image', 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=800&fit=crop', 'Casablanco brand materials'),
('550e8400-e29b-41d4-a716-446655440000', 3, 'image', 'https://images.unsplash.com/photo-1622020886177-239ee6e69b39?w=600&h=600&fit=crop', 'Casablanco workspace'),
('550e8400-e29b-41d4-a716-446655440001', 1, 'image', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop', 'Fashion design concept'),
('550e8400-e29b-41d4-a716-446655440001', 2, 'image', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=900&fit=crop', 'Fashion collection piece'),
('550e8400-e29b-41d4-a716-446655440002', 1, 'image', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=800&fit=crop', 'Studio workspace'),
('550e8400-e29b-41d4-a716-446655440002', 2, 'image', 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=600&fit=crop', 'Design process');