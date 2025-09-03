# 🐙 GitHub + Vercel 部署指南

## 📋 准备工作清单

### ✅ 已完成:
- [x] 项目代码准备完成
- [x] 生产模式配置完成
- [x] Supabase数据库设置完成
- [x] 轻量级部署包创建

### 🔧 需要完成:
- [ ] 安装Git命令行工具
- [ ] 创建GitHub账号（如果没有）
- [ ] 初始化Git仓库
- [ ] 推送代码到GitHub
- [ ] 连接Vercel到GitHub

## 🛠️ 第一步: 安装Git工具

如果看到 "xcrun: error" 错误，需要安装Xcode命令行工具：

```bash
# 运行此命令会弹出安装对话框
xcode-select --install
```

**安装完成后，重新打开终端验证**：
```bash
git --version
# 应该显示类似: git version 2.x.x
```

## 🐙 第二步: 创建GitHub仓库

### 在线操作:
1. 访问 [GitHub.com](https://github.com)
2. 登录或注册账号
3. 点击右上角 "+" → "New repository"
4. 设置仓库信息：
   - **Repository name**: `hansonpage` 或您喜欢的名称
   - **Description**: "Personal portfolio website with Supabase"
   - **Visibility**: Public (推荐) 或 Private
   - **不要**勾选 "Add a README file"
   - **不要**勾选 ".gitignore" 和 "license"

5. 点击 "Create repository"
6. **保存页面显示的仓库URL**，类似：
   ```
   https://github.com/YOUR_USERNAME/hansonpage.git
   ```

## 📦 第三步: 初始化本地Git仓库

在项目目录中运行：

```bash
# 1. 初始化Git仓库
git init

# 2. 设置用户信息（首次使用Git时需要）
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 3. 添加所有文件到Git
git add .

# 4. 创建第一次提交
git commit -m "Initial commit: Hanson portfolio website"

# 5. 设置主分支名称
git branch -M main

# 6. 连接到GitHub仓库（替换为您的仓库URL）
git remote add origin https://github.com/YOUR_USERNAME/hansonpage.git

# 7. 推送代码到GitHub
git push -u origin main
```

## 🚀 第四步: 通过Vercel部署

### 方法1: 自动连接（推荐）
1. 访问 [Vercel.com](https://vercel.com)
2. 使用GitHub账号登录Vercel
3. 点击 "New Project"
4. 选择您的 `hansonpage` 仓库
5. 配置项目设置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 方法2: 手动导入
1. 在Vercel中点击 "Import Git Repository"
2. 粘贴您的GitHub仓库URL
3. 按照相同的配置进行设置

## ⚙️ 第五步: 配置环境变量

在Vercel项目设置中添加：

```
VITE_SUPABASE_URL = https://skccgzdelwvujfzphfur.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrY2NnemRlbHd2dWpmenBoZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjM2NTIsImV4cCI6MjA2ODEzOTY1Mn0.FYtY4RurLm-aT5-B0eAgqJuEsCl__R4LIATATxTouHc
```

## 🔄 第六步: 自动部署设置

连接完成后，GitHub仓库会自动触发Vercel部署：

- ✅ **推送到main分支** → 自动部署到生产环境
- ✅ **推送到其他分支** → 自动创建预览部署
- ✅ **Pull Request** → 自动创建预览链接

## 📝 日常更新流程

以后修改代码时，只需：

```bash
# 1. 修改代码后，添加到Git
git add .

# 2. 提交更改
git commit -m "Update: 描述您的更改"

# 3. 推送到GitHub
git push

# 4. Vercel会自动部署新版本！
```

## 🎯 优势总结

### GitHub的优势:
- 🔒 **版本控制**: 代码历史记录和回滚
- 👥 **协作**: 支持多人协作开发
- 🔄 **分支管理**: 功能开发和测试分离
- 📱 **移动访问**: 随时查看代码

### Vercel + GitHub的优势:
- ⚡ **自动部署**: 推送代码即自动部署
- 🔗 **预览链接**: 每个分支都有独立预览
- 📊 **部署日志**: 详细的构建和部署信息
- 🌐 **全球CDN**: 快速的全球访问速度

## 🚨 注意事项

1. **敏感信息**: 不要将`.env.local`推送到GitHub
2. **大文件**: `node_modules`已在`.gitignore`中排除
3. **分支策略**: 建议使用`main`分支用于生产，`develop`分支用于开发
4. **提交信息**: 使用清晰的提交信息，方便后续维护

## 🎉 完成！

部署完成后，您将拥有：
- 📦 **GitHub仓库**: 代码托管和版本控制
- 🌐 **Vercel网站**: 全球可访问的网站
- 🔄 **自动化流程**: 推送代码即自动部署
- 📱 **内容管理**: 通过Supabase管理网站内容

现在您的网站具备了专业级的开发和部署流程！


