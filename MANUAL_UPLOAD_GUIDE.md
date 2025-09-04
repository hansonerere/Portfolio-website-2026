# 📤 手动上传GitHub指南

## 🎯 目标
将代码手动上传到您的GitHub仓库：[https://github.com/hansonerere/hansonpage](https://github.com/hansonerere/hansonpage)

## 📦 方法一：使用GitHub网页界面（推荐）

### 第一步：准备文件
使用我们已经创建的轻量级部署包：

```bash
# 进入部署包目录
cd /Users/hanwu/Desktop/hansonpage-deploy

# 查看文件列表
ls -la
```

### 第二步：通过GitHub网页上传
1. 访问您的仓库：[https://github.com/hansonerere/hansonpage](https://github.com/hansonerere/hansonpage)
2. 点击 "uploading an existing file" 链接
3. 将 `hansonpage-deploy` 文件夹中的所有文件拖拽到上传区域
4. 或者点击 "choose your files" 选择文件

### 第三步：提交更改
1. 在页面底部填写提交信息：
   - **Commit message**: `Initial commit: Hanson portfolio website`
   - **Description**: `Portfolio website with Supabase integration`
2. 选择 "Commit directly to the main branch"
3. 点击 "Commit changes"

## 📦 方法二：使用ZIP包上传

### 第一步：创建ZIP包
```bash
# 进入部署包目录
cd /Users/hanwu/Desktop/hansonpage-deploy

# 创建ZIP文件
zip -r hansonpage-upload.zip . -x "*.DS_Store" "*.git*"
```

### 第二步：上传ZIP
1. 在GitHub仓库页面点击 "uploading an existing file"
2. 上传 `hansonpage-upload.zip`
3. GitHub会自动解压文件

## 📦 方法三：单个文件上传

如果文件太多，可以分批上传：

### 核心文件优先级：
1. **必需文件**：
   - `package.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - `index.html`
   - `.gitignore`
   - `vercel.json`

2. **源代码**：
   - `App.tsx`
   - `src/` 文件夹
   - `components/` 文件夹
   - `hooks/` 文件夹
   - `lib/` 文件夹
   - `styles/` 文件夹

3. **配置文件**：
   - `tailwind.config.js`
   - `postcss.config.js`
   - `vite-env.d.ts`

## 🚀 上传完成后的下一步

### 1. 验证文件上传
确保以下关键文件已上传：
- ✅ `package.json`
- ✅ `App.tsx`
- ✅ `components/` 文件夹
- ✅ `vercel.json`
- ✅ `.gitignore`

### 2. 连接Vercel
1. 访问 [Vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择您的 `hansonpage` 仓库
5. 配置项目设置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. 添加环境变量
在Vercel项目设置中添加：

```
VITE_SUPABASE_URL = https://skccgzdelwvujfzphfur.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrY2NnemRlbHd2dWpmenBoZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjM2NTIsImV4cCI6MjA2ODEzOTY1Mn0.FYtY4RurLm-aT5-B0eAgqJuEsCl__R4LIATATxTouHc
```

### 4. 部署
1. 点击 "Deploy"
2. 等待构建完成
3. 获得您的网站链接！

## 📝 重要提示

### ✅ 要上传的文件：
- 所有 `.tsx`、`.ts`、`.js` 文件
- `package.json` 和配置文件
- `styles/` 文件夹
- `public/` 文件夹（如果有）
- `.gitignore`
- `vercel.json`

### ❌ 不要上传的文件：
- `node_modules/` 文件夹（已在.gitignore中排除）
- `.env.local` 文件（已在.gitignore中排除）
- `.DS_Store` 文件
- 构建输出 `dist/` 文件夹

## 🎉 成功标志

上传成功后，您的GitHub仓库应该包含：
- 📁 `components/` - React组件
- 📁 `hooks/` - 自定义hooks
- 📁 `lib/` - 工具库
- 📁 `styles/` - 样式文件
- 📄 `App.tsx` - 主应用组件
- 📄 `package.json` - 依赖管理
- 📄 `vercel.json` - 部署配置

一旦文件上传完成，Vercel会自动检测到更改并开始构建部署！

## 🔧 如果遇到问题

1. **文件太多无法一次上传**：使用ZIP方法或分批上传
2. **上传失败**：检查网络连接，重试上传
3. **缺少文件**：参考轻量级部署包 `/Users/hanwu/Desktop/hansonpage-deploy`

完成上传后，请告诉我，我将帮您配置Vercel部署！
