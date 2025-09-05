# 🌐 自定义域名绑定完整指南

## 🎯 域名选择建议

### 推荐域名格式：
- `hansonwu.com` - 个人姓名（最推荐）
- `hanson.design` - 专业领域
- `hansonportfolio.com` - 作品集专用
- `hansonwork.com` - 工作展示

## 🛒 购买域名步骤

### 方案1：阿里云（推荐国内用户）
1. 访问 [万网](https://wanwang.aliyun.com)
2. 搜索您想要的域名
3. 选择合适的后缀（.com 最推荐）
4. 添加到购物车并完成支付
5. 实名认证（必需）

### 方案2：Namecheap（推荐海外）
1. 访问 [namecheap.com](https://namecheap.com)
2. 搜索域名
3. 购买并完成注册
4. 无需实名认证

## 🔗 绑定到Netlify

### 第一步：在Netlify中添加域名
1. 登录 Netlify
2. 进入您的站点
3. 点击 "Domain settings"
4. 点击 "Add custom domain"
5. 输入您的域名（如：hansonwu.com）

### 第二步：配置DNS记录
在您的域名提供商（阿里云/Namecheap等）中设置：

#### 主域名配置：
```
类型: A记录
主机记录: @
记录值: 75.2.60.5  (Netlify的IP)
```

#### www子域名配置：
```
类型: CNAME
主机记录: www
记录值: your-site-name.netlify.app
```

### 第三步：等待生效
- DNS生效时间：10分钟 - 24小时
- Netlify会自动配置HTTPS证书

## 🔗 绑定到Vercel

### Vercel域名配置：
1. 登录 Vercel
2. 进入项目设置
3. 点击 "Domains"
4. 添加您的域名
5. 按照提示配置DNS

#### Vercel DNS配置：
```
类型: A记录  
主机记录: @
记录值: 76.76.19.61  (Vercel的IP)

类型: CNAME
主机记录: www
记录值: cname.vercel-dns.com
```

## 🌍 多平台域名策略

### 推荐配置：
- **主域名** → Netlify (中国用户优先)
- **子域名** → Vercel (海外用户)

#### 示例配置：
```
hansonwu.com → Netlify (主站)
global.hansonwu.com → Vercel (海外加速)
```

## 📱 域名配置验证

### 检查域名是否生效：
1. 打开浏览器访问您的域名
2. 确认显示正确的网站
3. 检查HTTPS是否启用（绿色锁图标）

### 工具验证：
- 使用 [dnschecker.org](https://dnschecker.org) 检查DNS传播
- 使用 [ssllabs.com](https://ssllabs.com) 检查SSL证书

## 💡 域名购买建议

### 如果预算有限：
**暂时不买域名也完全没问题！**
- Netlify和Vercel的免费域名完全够用
- 可以先用免费域名测试和展示
- 等有需要时再购买

### 如果想要专业形象：
**推荐购买 .com 域名**
- 最权威和认可度最高
- 价格合理（约¥70-120/年）
- 便于记忆和分享

## 🎯 快速决策指南

### 🚀 立即行动（推荐）：
1. 购买一个简短的 .com 域名
2. 绑定到Netlify作为主站
3. 配置HTTPS和DNS

### 📅 延后考虑：
1. 先用免费域名
2. 测试网站效果
3. 确定需要后再购买

### 💼 求职导向：
如果您的作品集主要用于求职，**强烈建议购买自定义域名**！
- 显示专业态度
- 便于HR记住和分享
- 提升整体印象

## 🔧 我可以帮您：

1. **域名选择建议** - 分析哪个域名最适合
2. **购买指导** - 一步步教您购买
3. **配置协助** - 帮助设置DNS和绑定
4. **问题解决** - 解决配置过程中的问题

您现在想要购买域名，还是先用免费域名测试一段时间？
