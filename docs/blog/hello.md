---
title: 你好世界
date: 2025-01-01
categories:
  - 学习笔记
tags:
  - 初学者
  - 日记
---

# 你好，世界！

这是我的第一篇博客文章...

## 第一篇我给我是怎么搭建的

为了记录，防止以后还得查资料

### node安装

1. 先得下载node.js,按步骤下载就行，然后重点！

   ![](https://picgo-1372933092.cos.ap-guangzhou.myqcloud.com/ima/12948571.webp)

2. 进行环境变量配置
   找到安装的目录，在安装目录下新建两个文件夹【node_global】和【node_cache】
   创建完毕后，使用管理员身份打开cmd命令窗口，输入
   npm config set prefix “你的路径\node_global”
   npm config set cache “你的路径\node_cache”

3. 环境变量的系统变量新建

   变量名：NODE_PATH

   变量值：C:\Program Files\nodejs\node_global\node_modules

4. 将用户变量的path进行一个编辑
   将默认的C换成node_global的路径

5. 系统变量的path也新建一个%NODE_PATH%

   ### 开始安装vuepress

   1. 创建项目文件夹，然后cd到那个文件夹

   2. npm init -y
      会生成`package.json` 文件

   3. npm install -D vuepress，但是国内好慢
      npm install -D vuepress --registry https://registry.npmmirror.com

   4. 目录结构如下
      可以用一下命令

      ```
      mkdir docs
      mkdir docs\.vuepress
      type nul > docs\.vuepress\config.js
      type nul > docs\README.md
      ```

   5. 编写 `config.js`

      ```
      // docs/.vuepress/config.js
      
      module.exports = {
        title: '我的个人博客',
        description: '记录学习与生活的点滴',
      
        // 基础路径（部署在根目录）
        base: '/',
      
        // 主题配置
        themeConfig: {
          // ========== 顶部导航栏 ==========
          nav: [
            { text: '🏠 首页', link: '/' },
            { text: '📚 文章', link: '/posts/' },
            { text: '👤 关于我', link: '/about/' }
          ],
      
          // ========== 左侧边栏（手动配置）==========
          sidebar: {
            // 当访问 /posts/ 开头的路径时，显示以下侧边栏
            '/posts/': [
              {
                title: '文章列表',
                collapsable: false,  // 是否可折叠
                children: [
                  '',                 // 对应 /posts/ → 显示 index.md
                  'hello',            // 对应 /posts/hello.md
                  'second'            // 对应 /posts/second.md
                ]
              }
            ],
      
            // 首页和其他页面的侧边栏（可选）
            '/': [
              {
                title: '导航',
                collapsable: false,
                children: [
                  '',
                  'about'
                ]
              }
            ]
          },
      
          // 显示最后更新时间
          lastUpdated: '最后更新时间',
      
          // 可选：显示编辑链接（如果你用 GitHub）
          // editLinks: true,
          // repo: 'https://github.com/你的用户名/my-blog',
          // repoLabel: 'GitHub'
        },
      
        // 打包输出目录
        dest: 'dist'
      }
      ```

   6. `docs/posts/index.md`（文章列表页）

      ```
      ---
      title: 所有文章
      ---
      
      ## 📚 欢迎来到文章列表
      
      这里列出我所有的博客文章，点击左侧边栏或下方链接阅读：
      
      - [我的第一篇文章](/posts/hello)
      - [我的第二篇文章](/posts/second)
      ```

   7. `package.json`这个很重要

      ```
      {
        "scripts": {
          "dev": "vuepress dev docs",
          "build": "vuepress build docs"
        },
        "devDependencies": {
          "vuepress": "^1.9.9"
        }
      }
      ```

   8. npm run dev启动！！！！！

      #### 传GitHub
   
      1. 在GitHub创建仓库
      
      2. 然后cd到根目录
      
         ```
         git init
         git add .
         git remote add origin https://github.com/你的用户名/your-vuepress-site.git
         git commit -m "Initial commit"
         git push -u origin master
         注意，master也可能是mian
         ```
      
      3. 这样应该完成了一部分
      
      4. 接下来为之后能git完hub自动帮我部署成为在线的网站
      
      5. 在根目录下创建`.github/workflows/deploy.yml` 文件
      
         ```
         name: Deploy VuePress to GitHub Pages
         
         on:
           push:
             branches:
               - master
         
         jobs:
           deploy:
             runs-on: ubuntu-latest
             steps:
               - name: Checkout
                 uses: actions/checkout@v4
         
               - name: Setup Node.js
                 uses: actions/setup-node@v4
                 with:
                   node-version: '18'
                   cache: 'npm'
         
               - name: Install Dependencies
                 run: |
                   echo "📦 安装依赖..."
                   npm install
                   echo "✅ 安装完成"
         
               # 👇 替换从这里开始
               - name: Build
                 run: |
                   echo "🚀 开始构建网站..."
                   echo "当前路径：$(pwd)"
                   echo "查看 docs 文件夹是否存在："
                   ls -la docs || echo "❌ docs 文件夹不存在！"
         
                   echo "查看 docs/.vuepress/config.js 是否存在："
                   ls -la docs/.vuepress/config.js || echo "❌ config.js 不存在！"
         
                   echo "运行 npm run build..."
                   npm run build --verbose
         
                   echo "查看构建输出目录："
                   ls -la ./docs/.vuepress/dist || echo "❌ 构建失败，没有生成 dist 文件夹！"
               # 👆 到这里结束
         
               - name: Deploy
                 uses: peaceiris/actions-gh-pages@v3
                 with:
                   github_token: ${{ secrets.GITHUB_TOKEN }}
                   publish_dir: ${{ github.workspace }}/docs/.vuepress/dist
         ```
      
         这里调太久了，mad
      
      6. 然后传git
      
         ```
         git add .
         git commit -m "Add GitHub Actions deploy config"
         git push origin main
         ```
      
      7. > [!IMPORTANT]
         >
         > 注意！！！！！config.js文件的默认bluid输出路径别改了
         > 用这个就行
         >
         > ```
         > // docs/.vuepress/config.js
         > 
         > module.exports = {
         >   title: '我的个人博客',
         >   description: '记录学习与生活的点滴',
         > 
         >   // ✅ 正确：base 是仓库名
         >   base: '/blogs/',
         > 
         >   // ========== 主题配置 ==========
         >   themeConfig: {
         >     // ========== 顶部导航栏 ==========
         >     nav: [
         >       { text: '🏠 首页', link: '/' },
         >       { text: '📚 文章', link: '/posts/' },
         >     ],
         > 
         >     // ========== 左侧边栏（手动配置）==========
         >     sidebar: {
         >       // 当访问 /posts/ 开头的路径时，显示以下侧边栏
         >       '/posts/': [
         >         {
         >           title: '文章列表',
         >           collapsable: false,  // 是否可折叠
         >           children: [
         >             '',                 // 对应 /posts/ → 显示 index.md
         >             'hello',            // 对应 /posts/hello.md
         >             'higuy'             // 对应 /posts/higuy.md
         >           ]
         >         }
         >       ],
         > 
         >       // 首页和其他页面的侧边栏
         >       '/': [
         >         {
         >           title: '导航',
         >           collapsable: false,
         >           children: [
         >             '',
         >           ]
         >         }
         >       ]
         >     },
         > 
         >     // 显示最后更新时间
         >     lastUpdated: '最后更新时间',
         > 
         >     // 可选：GitHub 编辑链接（可以打开）
         >     // editLinks: true,
         >     // repo: 'https://github.com/loyuner/blogs',
         >     // repoLabel: '查看源码'
         >   }
         > 
         >   // ❌ 删除了 dest: 'dist'
         >   // VuePress 默认输出到 .vuepress/dist，不要改！
         > }
         > ```
         >
         > 
      
      8. 到这就结束了，耗费我好长时间
   
   
