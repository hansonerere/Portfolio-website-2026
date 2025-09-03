# Supabase 集成设置指南

## 概述

您的网站现在支持使用 Supabase 作为内容管理系统（CMS）来管理所有动态内容，包括：

1. **首页内容**：顶部视频、服务卡片文字和图片
2. **About 页面**：文字信息和图片
3. **项目详情页**：顶部视频、中间卡片的文字描述和底部图片/视频瀑布流

## 快速开始

### 1. 设置 Supabase 项目

1. 访问 [Supabase.com](https://supabase.com) 创建账户
2. 创建新项目
3. 在项目设置 > API 中获取：
   - `Project URL`
   - `Project API Key (anon key)`

### 2. 配置环境变量

1. 在项目根目录创建 `.env.local` 文件：
```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. 创建数据库表

在 Supabase 项目的 SQL Editor 中运行 `supabase-schema.sql` 文件中的所有 SQL 语句。

### 4. 切换模式

- **默认模式**：使用静态数据 (ProjectData.tsx)
- **Supabase 模式**：使用数据库数据
- **切换方法**：按 `Cmd+S` (Mac) 或 `Ctrl+S` (Windows)

## 数据库结构

### 首页数据

#### homepage 表
- `hero_video_url`: 顶部视频链接
- `hero_video_poster`: 视频封面图

#### service_cards 表
- `number`: 服务编号 (/01, /02, etc.)
- `title`: 服务标题
- `description`: 服务描述
- `image_url`: 服务图片链接

### About 页面数据

#### about_page 表
- `hero_title`: 大标题文字

#### about_cards 表
- `number`: 卡片编号 (/01, /02, etc.)
- `title`: 卡片标题
- `content`: 卡片内容
- `image_url`: 卡片图片
- `contact_info`: 联系信息 (JSON)
- `clients`: 客户信息 (JSON)

### 项目数据

#### projects 表
- `title`: 项目标题
- `description`: 项目描述
- `year`: 项目年份
- `category`: 项目类别
- `cover_image`: 封面图
- `hero_video_url`: 顶部视频
- `hero_video_poster`: 视频封面

#### project_sections 表
- `title`: 内容段标题
- `content`: 内容段文字

#### project_gallery 表
- `type`: 'image' 或 'video'
- `url`: 媒体文件链接
- `alt_text`: 图片描述

## 功能特性

### 1. 实时数据加载
- 骨架屏加载状态
- 错误处理和重试机制
- 响应式图片加载

### 2. 内容管理
- 支持图片和视频
- 富文本内容
- 排序和显示控制

### 3. 性能优化
- 懒加载图片
- 数据缓存
- 优化的查询

## 组件说明

### Supabase 版本组件
- `LandingPageWithSupabase.tsx`: 首页
- `AboutPageWithSupabase.tsx`: About 页面
- `ContentAreaWithSupabase.tsx`: 项目详情页
- `SidebarWithSupabase.tsx`: 侧边栏

### 数据 Hooks
- `useHomepage()`: 获取首页数据
- `useAboutPage()`: 获取 About 页面数据
- `useProjects()`: 获取项目列表
- `useProject(id)`: 获取单个项目详情

## 使用流程

1. **设置 Supabase 项目和数据库**
2. **配置环境变量**
3. **上传内容到数据库**
4. **按 Cmd+S 切换到 Supabase 模式**
5. **编辑和管理内容**

## 注意事项

- 确保图片和视频链接可访问
- JSON 字段格式要正确
- 定期备份数据库
- 监控 API 使用量

## 故障排除

### 常见问题

1. **环境变量未生效**
   - 重启开发服务器
   - 检查 `.env.local` 文件名和格式

2. **数据加载失败**
   - 检查 Supabase 项目状态
   - 验证 API 密钥权限

3. **图片不显示**
   - 确认图片链接有效
   - 检查 CORS 设置

需要帮助？查看 Supabase 官方文档或联系开发团队。

