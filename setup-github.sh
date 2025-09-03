#!/bin/bash

echo "🐙 GitHub仓库设置脚本"
echo "===================="
echo ""

# 检查Git是否可用
if ! command -v git &> /dev/null; then
    echo "❌ Git未安装或不可用"
    echo "请确保Xcode命令行工具安装完成后重新运行此脚本"
    exit 1
fi

echo "✅ Git已安装: $(git --version)"
echo ""

# 检查是否已经是Git仓库
if [ -d ".git" ]; then
    echo "📁 检测到现有Git仓库"
    git status
    echo ""
    echo "🔄 如需重新初始化，请先运行: rm -rf .git"
    exit 0
fi

echo "📝 设置Git用户信息..."
echo "请输入您的GitHub用户名:"
read -p "用户名: " username
echo "请输入您的邮箱:"
read -p "邮箱: " email

git config user.name "$username"
git config user.email "$email"
echo "✅ Git用户信息设置完成"
echo ""

echo "🚀 初始化Git仓库..."
git init
echo "✅ Git仓库初始化完成"
echo ""

echo "📦 添加文件到Git..."
git add .
echo "✅ 文件添加完成"
echo ""

echo "💾 创建初始提交..."
git commit -m "Initial commit: Hanson portfolio website with Supabase"
echo "✅ 初始提交完成"
echo ""

echo "🌟 设置主分支..."
git branch -M main
echo "✅ 主分支设置完成"
echo ""

echo "🔗 连接到GitHub仓库..."
echo "请输入您的GitHub仓库URL (例如: https://github.com/username/hansonpage.git):"
read -p "仓库URL: " repo_url

git remote add origin "$repo_url"
echo "✅ 远程仓库连接完成"
echo ""

echo "🚀 推送代码到GitHub..."
echo "注意: 首次推送可能需要输入GitHub用户名和密码/Token"
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 代码推送成功！"
    echo ""
    echo "📋 下一步:"
    echo "1. 访问 https://vercel.com"
    echo "2. 使用GitHub账号登录"
    echo "3. 点击 'New Project'"
    echo "4. 选择您的仓库: $(basename "$repo_url" .git)"
    echo "5. 配置环境变量 (见 GITHUB_DEPLOYMENT_GUIDE.md)"
    echo ""
    echo "🔄 以后更新代码只需运行:"
    echo "   git add ."
    echo "   git commit -m '更新描述'"
    echo "   git push"
else
    echo ""
    echo "❌ 推送失败，请检查:"
    echo "1. GitHub仓库URL是否正确"
    echo "2. 是否有推送权限"
    echo "3. 网络连接是否正常"
fi


