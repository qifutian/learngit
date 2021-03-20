<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active">
        <el-menu-item v-for="item in menus" :key="item.path" :index="item.path" @click="() => onClickMenuItem(item)">
          <!-- <g-link :to="item.path"> -->
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
          <!-- </g-link> -->
        </el-menu-item>
        <!-- <template v-for="item in menus" :index="item.path">
          <g-link :to="item.path" :key="item.path">
            <el-menu-item>
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </g-link>
        </template> -->
      </el-menu>
    </el-card>

    <!-- <el-card shadow="never" style="margin-top: 20px; text-align: center">
      <div v-if="!token" style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
        <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token未绑定&nbsp;&nbsp;
        <el-button type="text" @click="openTokenDialog">绑定</el-button>
      </div>
      <div v-if="token" style="font-size: 0.9rem; line-height: 1.5; color: #303133">
        <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token已绑定&nbsp;&nbsp;
        <el-button type="text" @click="cancellation">注销</el-button>
      </div>
      <div style="margin-top: 10px; text-align: left">
        <el-alert
          title="Token获取"
          type="info"
          description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
          :closable="false"
        >
        </el-alert>
      </div>
    </el-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "",
      parentUrl: "",
      token: "",
      menuList: [],
      menus: [
        {
          path: "/new",
          icon: "el-icon-star-off",
          title: "最新动态",
        },
        {
          path: "/social",
          icon: "el-icon-mobile-phone",
          title: "社交圈",
        },
        {
          path: "/blog",
          icon: "el-icon-edit-outline",
          title: "博客列表",
        },
        {
          path: "/project",
          icon: "el-icon-service",
          title: "开源项目",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    let arr = window.location.pathname.split("/");
    this.active = "/" + arr[1] + "/" + arr[2];
  },
  methods: {
    onClickMenuItem(item) {
      window.location.href = item.path;
    },
  },
};
</script>