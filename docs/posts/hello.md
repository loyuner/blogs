---
title: 搭建此blog的记录
date: 2025-08-07
tags:
  - 日记
  - VuePress
summary: 这是我使用 VuePress 搭建博客的第一篇记录，分享搭建过程与心得。
---

# 你好，世界！

这是我的第一篇博客文章...

## 第一篇我给我是怎么搭建的

为了记录，防止以后还得查资料

### node安装

1. 先得下载node.js,按步骤下载就行，然后重点！
![我的图片](/images/2.png)   
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
      ![](C:\Users\Administrator\my-blog\docs\image\PixPin_2025-08-07_22-54-08.png)
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

   
