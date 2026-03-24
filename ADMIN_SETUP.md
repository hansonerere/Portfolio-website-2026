# Admin CMS Setup

后台入口已经集成到项目里：

- 本地开发：`/admin`
- 线上部署：`https://your-domain/admin`

## 1. 需要的环境变量

在本地 `.env.local` 或部署平台环境变量中确认以下值存在：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_STORAGE_BUCKET=site-assets
```

## 2. 创建 Storage Bucket

在 Supabase Storage 中创建一个公开 bucket：

- Bucket name: `site-assets`
- Public bucket: `true`

如果你想改名字，也可以修改 `VITE_SUPABASE_STORAGE_BUCKET`。

## 3. 建议的 Storage Policy

下面这段 SQL 用于给 `site-assets` 开放上传、更新、删除和读取能力。  
请注意：这适合你当前这种“项目内置后台”的快速管理模式，但安全性依赖你自己的 Supabase 策略设计。

```sql
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy "Public read site assets"
on storage.objects
for select
to public
using (bucket_id = 'site-assets');

create policy "Public upload site assets"
on storage.objects
for insert
to public
with check (bucket_id = 'site-assets');

create policy "Public update site assets"
on storage.objects
for update
to public
using (bucket_id = 'site-assets')
with check (bucket_id = 'site-assets');

create policy "Public delete site assets"
on storage.objects
for delete
to public
using (bucket_id = 'site-assets');
```

## 4. 数据表写入权限

后台会写入这些表：

- `homepage`
- `service_cards`
- `about_page`
- `about_cards`
- `projects`
- `project_sections`
- `project_gallery`

如果你启用了 RLS，需要为这些表补充 `select / insert / update / delete` 策略。

示例快速策略：

```sql
alter table homepage enable row level security;
alter table service_cards enable row level security;
alter table about_page enable row level security;
alter table about_cards enable row level security;
alter table projects enable row level security;
alter table project_sections enable row level security;
alter table project_gallery enable row level security;

create policy "Public full access homepage" on homepage for all to public using (true) with check (true);
create policy "Public full access service_cards" on service_cards for all to public using (true) with check (true);
create policy "Public full access about_page" on about_page for all to public using (true) with check (true);
create policy "Public full access about_cards" on about_cards for all to public using (true) with check (true);
create policy "Public full access projects" on projects for all to public using (true) with check (true);
create policy "Public full access project_sections" on project_sections for all to public using (true) with check (true);
create policy "Public full access project_gallery" on project_gallery for all to public using (true) with check (true);
```

## 5. 安全提醒

当前这套后台是“快速可用版”：

- 只要能访问 `/admin`，并且你的 Supabase anon key 对表和 storage 有写权限，就可以修改内容
- 它适合你自己或小团队内部管理
- 如果后面要正式上线并对外开放，建议下一步加入真正的登录系统

推荐后续升级路径：

1. Supabase Auth 登录
2. 仅管理员可访问 `/admin`
3. RLS 按用户角色限制写权限
4. Storage 只允许管理员上传

