// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  siteDescription: "大前端",
  pathPrefix: '',  // 路径前缀
  siteUrl: '', //配置默认的url地址
  titleTemplate: '', // 标题模板
  templates: {
    Post: [
      {
        path: '/post/:id',
        component: './src/templates/Post.vue'
      }
    ]
  } ,  // 路由模板
  metadata: {} , //全局的meta

  plugins: []   // 插件
}
