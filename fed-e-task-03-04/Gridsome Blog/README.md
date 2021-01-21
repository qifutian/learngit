# lg-hw-3-4-blog

拉勾前端训练营 3-4 课后练习

TODO:

- [ ] 侧边栏随 path 高亮
- [ ] social, blog, project 页面的分页<sup>1</sup>
- [ ] 实现分享功能
- [ ] 实现搜索功能
- [ ] 研究 title 没有正确改变的问题<sup>2</sup>

1. 因为使用的 github-api-plugin 将数据挂载到了 metadata 下, 不能像集合一样使用`@paginate`, 可能需要自己手动实现

2. 访问页面, title 一开始是正确的, 页面加载完成之后 title 会消失, 只剩下 titleTemplate, 也就是`- Gridsome BLOG`. 本地 develop 不能复现, 但 build 使用`npm serve`会复现
