// docs/.vuepress/config.js

module.exports = {
  title: '我的个人博客',
  description: '记录学习与生活的点滴',

  // ✅ 正确：base 是仓库名
  base: '/blogs/',

  // ========== 主题配置 ==========
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
            'higuy'             // 对应 /posts/higuy.md
          ]
        }
      ],

      // 首页和其他页面的侧边栏
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

    // 可选：GitHub 编辑链接（可以打开）
    // editLinks: true,
    // repo: 'https://github.com/loyuner/blogs',
    // repoLabel: '查看源码'
  }

  // ❌ 删除了 dest: 'dist'
  // VuePress 默认输出到 .vuepress/dist，不要改！
}