<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px" v-if="blog.id">
        <div slot="header">
          <span>{{ blog.title }}</span>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布 {{ blog.createTime }} <br />
          更新 {{ blog.updateTime }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            border-bottom: 1px solid #e4e7ed;
            padding: 5px 0px 5px 0px;
          "
        >
          <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
        </div>
        <div v-html="blog.content" class="markdown-body" style="padding-top: 20px"></div>
      </el-card>
      <el-card
        shadow="never"
        style="margin-bottom: 20px; padding: 20px 0px 20px 0px; text-align: center"
        v-if="!blog.id"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
    githubData {
      user {
        gists {
          nodes {
            id
            createdAt
            updatedAt
            description
            url
            files {
              name
              text
            }
          }
        }
      }
    }
  }
}

</page-query>

<script>
import util from "../../utils/util";

export default {
  data() {
    return {
      query: {
        page: 1,
        pageSize: 1,
      },
      loading: false,
    };
  },
  computed: {
    gists() {
      return this.$page.metadata.githubData.user.gists.nodes;
    },
    blogs() {
      const blogs = [];
      this.gists.forEach((g) => {
        g.files.forEach((f) => {
          blogs.push({
            id: g.id,
            title: f.name,
            createTime: util.utcToLocal(g.createdAt),
            updateTime: util.utcToLocal(g.updatedAt),
            description: g.description,
            content: this.$markdown(f.text),
          });
        });
      });
      return blogs;
    },
    blog() {
      return this.blogs[0] || {};
    },
  },
  mounted() {},
  metaInfo() {
    return {
      title: "最新动态",
    };
  },
};
</script>