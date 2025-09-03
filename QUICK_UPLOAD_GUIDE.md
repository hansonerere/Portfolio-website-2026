# 📦 快速上传部署指南

如果您没有安装Git或GitHub访问权限，可以直接通过拖拽方式部署：

## 🎯 方法1: 直接上传到Vercel

1. **访问**: [vercel.com](https://vercel.com)
2. **登录/注册**: 使用GitHub、GitLab或Email
3. **选择**: "Deploy with Vercel"
4. **拖拽**: 将整个 `hansonpage` 文件夹直接拖拽到Vercel页面
5. **配置**: 
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 🎯 方法2: 创建ZIP文件

```bash
# 在项目目录中运行
zip -r hansonpage.zip . -x "node_modules/*" "dist/*" ".git/*"
```

然后上传ZIP文件到Vercel。

## ⚙️ 重要配置

无论使用哪种方法，都需要在Vercel项目设置中添加环境变量：

### Environment Variables:
```
VITE_SUPABASE_URL = https://skccgzdelwvujfzphfur.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrY2NnemRlbHd2dWpmenBoZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NjM2NTIsImV4cCI6MjA2ODEzOTY1Mn0.FYtY4RurLm-aT5-B0eAgqJuEsCl__R4LIATATxTouHc
```

## 📋 文件清单

确保包含以下重要文件：
- ✅ `package.json`
- ✅ `vite.config.ts` 
- ✅ `vercel.json`
- ✅ `index.html`
- ✅ `App.tsx`
- ✅ `components/` 文件夹
- ✅ `lib/` 文件夹
- ✅ `hooks/` 文件夹
- ✅ `styles/` 文件夹
- ✅ `.env.local` (本地开发用，部署时用环境变量)

## 🚫 不需要上传的文件

- `node_modules/` (自动安装)
- `dist/` (自动构建)
- `.git/` (如果存在)

## 🎉 部署完成后测试

1. **动态数据**: 网站直接从Supabase加载您的真实数据
2. **About页面**: 点击About me应显示全屏页面
3. **项目详情**: 点击项目查看详细内容
4. **响应式**: 在不同设备上测试布局
5. **内容管理**: 通过Supabase Dashboard可直接编辑网站内容

完成！您的网站现在可以在全球访问了🌍
