// docs/.vuepress/config.js

module.exports = {
  title: '我的个人博客',
  description: '记录学习与生活的点滴',

  // 基础路径（部署在根目录）
  base: '/blogs/',

  // 主题配置
  themeConfig: {
    // ========== 顶部导航栏 ==========
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '📚 文章', link: '/posts/' },
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
            'higuy'            // 对应 /posts/second.md
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