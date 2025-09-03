# 📝 网站内容管理指南

## 🎯 概述

您的网站现在完全通过Supabase数据库驱动，您可以随时在线编辑内容，无需重新部署网站。

## 🔗 访问Supabase Dashboard

1. **登录**: [Supabase Dashboard](https://supabase.com/dashboard)
2. **选择项目**: skccgzdelwvujfzphfur
3. **进入**: Table Editor

## 📊 数据表结构

### 1. Homepage（首页内容）
**表名**: `homepage`
- `hero_video_url` - 首页顶部视频链接
- `created_at`, `updated_at` - 时间戳

### 2. Service Cards（服务卡片）
**表名**: `service_cards`
- `number` - 编号（如"/01"）
- `title` - 服务标题
- `description` - 服务描述
- `image_url` - 图片链接
- `order_index` - 排序顺序
- `is_active` - 是否显示

### 3. About Page（关于页面）
**表名**: `about_page`
- `hero_title` - 大标题（如"POD"）

### 4. About Cards（关于页面卡片）
**表名**: `about_cards`
- `number` - 编号（如"/01"）
- `title` - 卡片标题
- `content` - 文字内容
- `image_url` - 图片链接（可选）
- `contact_info` - 联系信息（JSON格式）
- `clients` - 客户列表（JSON格式）
- `order_index` - 排序顺序

### 5. Projects（项目列表）
**表名**: `projects`
- `title` - 项目标题
- `category` - 项目类别
- `year` - 年份
- `client` - 客户名称
- `thumbnail_url` - 缩略图
- `is_active` - 是否显示
- `order_index` - 排序顺序

### 6. Project Sections（项目详情页面）
**表名**: `project_sections`
- `project_id` - 关联的项目ID
- `hero_video_url` - 顶部视频
- `description` - 项目描述
- `order_index` - 排序顺序

### 7. Project Gallery（项目画廊）
**表名**: `project_gallery`
- `project_id` - 关联的项目ID
- `media_url` - 媒体文件链接
- `media_type` - 类型（'image' 或 'video'）
- `caption` - 说明文字（可选）
- `order_index` - 排序顺序

## ✏️ 编辑内容步骤

### 📝 修改文字内容
1. 在Table Editor中选择相应的表
2. 点击要编辑的行
3. 修改文字内容
4. 点击"Save"
5. 网站内容会立即更新

### 🖼️ 更换图片/视频
1. 将图片/视频上传到图床或云存储
2. 获取公开访问链接
3. 在相应表的`image_url`或`video_url`字段中更新链接
4. 保存更改

### ➕ 添加新项目
1. 进入`projects`表
2. 点击"Insert" → "Insert row"
3. 填写项目信息：
   - `title`: 项目名称
   - `category`: 项目类别
   - `year`: 年份
   - `client`: 客户
   - `thumbnail_url`: 缩略图链接
   - `is_active`: 设为`true`
   - `order_index`: 排序编号
4. 保存后，进入`project_sections`表添加项目详情
5. 进入`project_gallery`表添加项目图片/视频

### 🔄 调整显示顺序
- 修改`order_index`字段的数值
- 数值越小排在越前面
- 建议使用10, 20, 30...便于后续插入

### 👁️ 隐藏/显示内容
- 将`is_active`字段设为`false`隐藏内容
- 设为`true`显示内容
- 隐藏的内容不会在网站上显示

## 🎨 图片建议

### 尺寸建议：
- **服务卡片**: 400x600px (4:6比例)
- **项目缩略图**: 400x300px
- **项目画廊**: 最大宽度1200px
- **About页面图片**: 400x300px

### 格式建议：
- 图片：JPG, PNG, WebP
- 视频：MP4, WebM
- 建议压缩图片以提高加载速度

## 🔧 技术提示

### JSON格式示例
**联系信息** (`contact_info`):
```json
[
  {"label": "Email", "value": "hello@example.com"},
  {"label": "Phone", "value": "+1 234 567 8900"},
  {"label": "Address", "value": "New York, NY"}
]
```

**客户列表** (`clients`):
```json
[
  {"name": "Client Name 1", "year": "2025"},
  {"name": "Client Name 2", "year": "2024"}
]
```

## 🚨 注意事项

1. **图片链接**: 确保使用HTTPS链接
2. **文件大小**: 建议单个图片不超过2MB
3. **备份**: 重要更改前建议导出数据备份
4. **权限**: 只有您有数据库编辑权限
5. **即时更新**: 所有更改立即在网站上生效

## 🎉 内容更新完成！

编辑完成后，访问您的网站查看效果。所有更改都会实时反映在网站上，无需重新部署！

