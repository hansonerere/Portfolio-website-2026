#!/bin/bash

echo "🚀 创建轻量级部署包..."
echo ""

# 创建目标目录
DEPLOY_DIR="../hansonpage-deploy"
rm -rf "$DEPLOY_DIR"
mkdir "$DEPLOY_DIR"

echo "📁 复制源代码文件夹..."
cp -r components hooks lib src styles imports "$DEPLOY_DIR/"

echo "📄 复制配置文件..."
cp *.json *.js *.ts *.html App.tsx .env.local "$DEPLOY_DIR/"

echo "📊 检查部署包大小..."
cd "$DEPLOY_DIR"
SIZE=$(du -sh . | cut -f1)
echo ""
echo "✅ 部署包创建完成！"
echo "📦 大小: $SIZE (节省了 ~153MB!)"
echo "📍 位置: $(pwd)"
echo ""
echo "🎯 下一步:"
echo "1. 访问 https://vercel.com"
echo "2. 拖拽 hansonpage-deploy 文件夹到页面"
echo "3. 配置环境变量 (见 DEPLOYMENT_GUIDE.md)"
echo ""
echo "💡 或者可以压缩后上传:"
echo "   zip -r hansonpage-deploy.zip ."


