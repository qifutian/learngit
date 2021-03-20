// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
// import mavonEditor from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
// import "mavon-editor/dist/markdown/github-markdown.min.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import MarkdownIt from "markdown-it";

import DefaultLayout from "~/layouts/Default.vue";

const md = new MarkdownIt();

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  Vue.use(ElementUI);
  // Vue.use(mavonEditor);

  Vue.prototype.$markdown = function(value) {
    return md.render(value);
  };

  Vue.mixin({
    metaInfo: {
      title: "Gridsome BLOG",
    },
  });
}
