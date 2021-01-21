<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <!-- <el-card shadow="never" style="margin-bottom: 20px">
      <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
      <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
      <el-button
        @click="$share()"
        style="margin-left: 10px"
        icon="el-icon-share"
        type="warning"
        plain
        circle
      ></el-button>
      <el-button type="primary" icon="el-icon-edit" round plain style="float: right" @click="goAdd">写博文</el-button>
    </el-card> -->

      <div v-if="blogs && blogs.length > 0">
        <el-card shadow="hover" v-for="(item, index) in blogs" :key="'p' + index" style="margin-bottom: 20px">
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a style="text-decoration: none; cursor: pointer" @click="goDetails(item.id)">
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{ item.title }}
                  </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right">
                  <el-button
                    @click="$share('/user/blog/details/' + item.id)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                  ></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">最近更新 {{ item.updateTime }}</div>
          <div style="font-size: 1.1rem; line-height: 1.5; color: #303133; padding: 10px 0px 0px 0px">
            {{ item.description }}
          </div>
        </el-card>
        <div style="text-align: center">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="query.page"
            :page-size="query.pageSize"
            :total="totalCount"
          >
          </el-pagination>
        </div>
      </div>

      <el-card
        shadow="never"
        style="margin-bottom: 20px; padding: 20px 0px 20px 0px; text-align: center"
        v-if="!blogs || blogs.length == 0"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
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
          totalCount
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
        pageSize: 5,
      },
      loading: false,
      searchKey: "",
    };
  },
  computed: {
    totalCount() {
      return this.query.pageSize;
      // return this.$page.metadata.githubData.user.gists.totalCount;
    },
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
  methods: {
    search() {
      for (let i = 0; i < this.blogs.length; i++) {
        this.blogs[i].hide = this.blogs[i].title.indexOf(this.searchKey) < 0;
      }
    },

    goDetails(id) {
      this.$router.push("/user/blog/details/" + id);
    },
  },
  metaInfo: {
    title: "博客列表",
  },
};
</script>