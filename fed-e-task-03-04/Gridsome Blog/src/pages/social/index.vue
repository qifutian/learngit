<template>
  <Layout>
    <div>
      <el-card shadow="never" style="min-height: 400px; margin-bottom: 20px; padding: 0px 0px 20px 0px">
        <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
          <el-tab-pane :label="'粉丝 ' + followers.length" name="followers" style="padding: 5px">
            <div v-loading="followersLoading">
              <div v-if="followers.length">
                <el-row style="min-height: 200px">
                  <el-col :span="8" v-for="(item, index) in followers" :key="'followers' + index" style="padding: 10px">
                    <el-card shadow="hover" style="font-size: 13px; color: #606266; line-height: 20px">
                      <i class="el-icon-star-off"></i>&emsp;
                      <a
                        @click="$router.push(`/user/social/details/${item.name}`)"
                        style="text-decoration: none; cursor: pointer"
                        >{{ item.name }}</a
                      >
                      <br />
                      <i class="el-icon-message"></i>&emsp;
                      <a :href="item.htmlUrl" target="_blank" style="text-decoration: none; cursor: pointer"
                        >TA的主页</a
                      >
                      <br />
                      <img :src="item.avatarUrl" style="width: 100%; border-radius: 5px; margin-top: 5px" />
                    </el-card>
                  </el-col>
                </el-row>
                <div style="text-align: center; margin-top: 10px">
                  <el-pagination
                    @current-change="onSelect"
                    background
                    layout="prev, pager, next"
                    :current-page.sync="followersQuery.page"
                    :page-size="followersQuery.pageSize"
                    :total="followersQuery.pageNumber * followersQuery.pageSize"
                  >
                  </el-pagination>
                </div>
              </div>
              <div
                style="min-height: 300px; margin-bottom: 20px; padding: 20px 0px 20px 0px; text-align: center"
                v-else
              >
                <font style="font-size: 30px; color: #dddddd">
                  <b>(￢_￢) 没有一个粉丝</b>
                </font>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'关注 ' + followings.length" name="following" style="padding: 5px">
            <div v-loading="followingsLoading">
              <div v-if="followings.length">
                <el-row style="min-height: 200px">
                  <el-col
                    :span="8"
                    v-for="(item, index) in followings"
                    :key="'following' + index"
                    style="padding: 10px"
                  >
                    <el-card shadow="hover" style="font-size: 13px; color: #606266; line-height: 20px">
                      <i class="el-icon-star-off"></i>&emsp;
                      <a
                        @click="$router.push(`/user/social/details/${item.name}`)"
                        style="text-decoration: none; cursor: pointer"
                        >{{ item.name }}</a
                      >
                      <br />
                      <i class="el-icon-message"></i>&emsp;
                      <a :href="item.htmlUrl" target="_blank" style="text-decoration: none; cursor: pointer"
                        >TA的主页</a
                      >
                      <br />
                      <img :src="item.avatarUrl" style="width: 100%; border-radius: 5px; margin-top: 5px" />
                    </el-card>
                  </el-col>
                </el-row>
                <div style="text-align: center; margin-top: 10px">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync="followingsQuery.page"
                    :page-size="followingsQuery.pageSize"
                    :total="followingsQuery.pageNumber * followingsQuery.pageSize"
                  >
                  </el-pagination>
                </div>
              </div>
              <div
                style="min-height: 300px; margin-bottom: 20px; padding: 20px 0px 20px 0px; text-align: center"
                v-else
              >
                <font style="font-size: 30px; color: #dddddd">
                  <b>(￢_￢) 还没有关注一个人</b>
                </font>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
    githubData {
      viewer {
        following {
          nodes {
            name
            url
            avatarUrl
          }
        }
        followers {
          nodes {
            name
            url
            avatarUrl
          }
        }
      }
    }
  }
}

</page-query>

<script>
export default {
  data() {
    return {
      activeTab: "followers",
      followersLoading: false,
      followersQuery: {
        page: 1,
        pageSize: 5,
        pageNumber: 1,
      },
      followingsLoading: false,
      followingsQuery: {
        page: 1,
        pageSize: 5,
        pageNumber: 1,
      },
    };
  },
  computed: {
    followers() {
      return this.$page.metadata.githubData.viewer.followers.nodes.map((n) => ({
        name: n.name,
        htmlUrl: n.url,
        avatarUrl: n.avatarUrl,
      }));
    },
    followings() {
      return this.$page.metadata.githubData.viewer.following.nodes.map((n) => ({
        name: n.name,
        htmlUrl: n.url,
        avatarUrl: n.avatarUrl,
      }));
    },
  },
  mounted() {},
  methods: {
    onSelect() {
      switch (this.activeTab) {
        case "followers":
          break;
        case "following":
          break;
        default:
          break;
      }
    },
  },
  metaInfo() {
    return {
      title: "社交圈",
    };
  },
};
</script>