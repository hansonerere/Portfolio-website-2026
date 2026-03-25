# Admin CMS Setup (Secure)

后台路径：

- 登录页：`/admin/login`
- 管理页：`/admin`

## 1. 环境变量

在本地 `.env.local` 和部署平台都配置：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_STORAGE_BUCKET=site-assets
VITE_ADMIN_EMAILS=you@example.com,teammate@example.com
```

`VITE_ADMIN_EMAILS` 是前端白名单，逗号分隔，必须与 Supabase Auth 用户邮箱一致。

## 2. 创建后台账号（Supabase Auth）

在 Supabase 控制台：

1. 打开 `Authentication -> Users`
2. 创建用户（邮箱 + 密码）
3. 确认该邮箱已经写入 `VITE_ADMIN_EMAILS`

## 3. Storage Bucket

创建 bucket：

- 名称：`site-assets`
- Public bucket: `true`（用于前台读取图片/视频）

## 4. 关键安全策略（必须）

只做前端登录还不够，真正的安全要靠 RLS。  
请在 Supabase SQL Editor 执行并按你的管理员邮箱修改：

```sql
create or replace function public.is_admin_user()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) in (
    'you@example.com',
    'teammate@example.com'
  );
$$;

alter table homepage enable row level security;
alter table service_cards enable row level security;
alter table about_page enable row level security;
alter table about_cards enable row level security;
alter table projects enable row level security;
alter table project_sections enable row level security;
alter table project_gallery enable row level security;

create policy "Public read homepage" on homepage for select to anon, authenticated using (true);
create policy "Public read service_cards" on service_cards for select to anon, authenticated using (true);
create policy "Public read about_page" on about_page for select to anon, authenticated using (true);
create policy "Public read about_cards" on about_cards for select to anon, authenticated using (true);
create policy "Public read projects" on projects for select to anon, authenticated using (true);
create policy "Public read project_sections" on project_sections for select to anon, authenticated using (true);
create policy "Public read project_gallery" on project_gallery for select to anon, authenticated using (true);

create policy "Admin write homepage" on homepage for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user());
create policy "Admin write service_cards" on service_cards for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user());
create policy "Admin write about_page" on about_page for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user());
create policy "Admin write about_cards" on about_cards for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user());
create policy "Admin write projects" on projects for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user());
create policy "Admin write project_sections" on project_sections for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user());
create policy "Admin write project_gallery" on project_gallery for all to authenticated using (public.is_admin_user()) with check (public.is_admin_user());

create policy "Public read site assets"
on storage.objects
for select
to public
using (bucket_id = 'site-assets');

create policy "Admin upload site assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-assets' and public.is_admin_user());

create policy "Admin update site assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-assets' and public.is_admin_user())
with check (bucket_id = 'site-assets' and public.is_admin_user());

create policy "Admin delete site assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-assets' and public.is_admin_user());
```

如果你之前使用过 `to public` 的写入策略，建议删除旧策略，避免绕过登录直接写库。

## 5. 访问行为说明

- 未登录访问 `/admin`：会跳转到 `/admin/login`
- 已登录但邮箱不在白名单：拒绝访问
- 只有白名单邮箱 + RLS 允许的账号，才能写入后台内容
