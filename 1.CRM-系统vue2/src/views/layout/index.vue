<template>
  <div class="layout">
    <!-- 顶部 -->
    <div class="layout-top">
      <h1>世&nbsp;纪&nbsp;江&nbsp;尚&nbsp;C&nbsp;R&nbsp;M&nbsp;系&nbsp;统</h1>
      <el-button type="info" @click="handLogout">退出登录</el-button>
    </div>
    <!-- 主体 -->
    <div class="layout-main">
      <!-- 左列表 -->
      <div class="main-left">
        <!-- 左logo -->
        <p class="logo">|||</p>
        <!-- 右导航 -->
        <el-menu
          router
          unique-opened
          :default-active="activePath"
          class="el-menu-vertical-demo"
          background-color="#333743"
          text-color="#fff"
          active-text-color="#183ac0"
        >
          <el-menu-item index="/layout/department">
            <i class="iconfont icon-structure"></i>
            <span slot="title">部门管理</span>
          </el-menu-item>

          <el-submenu index="/layout/PersonalList">
            <template slot="title">
              <i class="iconfont icon-userlist"></i>
              <span>员工管理</span>
            </template>
            <el-menu-item
              class="iconfont icon-useradd"
              index="/layout/PersonalList"
              >员工列表</el-menu-item
            >
            <el-menu-item
              class="iconfont icon-userlist"
              index="/layout/personaladd"
              >新增员工</el-menu-item
            >
          </el-submenu>

          <!-- <el-submenu index="/layout/PersonalList">
            <template slot="title">
              <i class="iconfont icon-commodity"></i>
              <span>导航2</span>
            </template>

            <el-menu-item index="/layout/PersonalList">
              <span slot="title">导航2-1</span>
            </el-menu-item>

            <el-menu-item index="/layout/personaladd">
              <span slot="title">导航2-2</span>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </div>
      <!-- 右边出口 -->
      <div class="main-right">
        <div class="main-right-text">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // # 获取路由路径作为默认激活的值
    activePath() {
      return this.$route.path;
    },
  },
  methods: {
    //退出登录
    handLogout() {
      this.$router.push("/login");
      localStorage.clear("token");
      // 刷新页面
      // location.reload();
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  .layout-top {
    height: 80px;
    background: #383d41;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 30px;
      color: #fff;
    }
  }
  .layout-main {
    flex: 1;
    display: flex;
    overflow-y: scroll;
    .main-left {
      background: #333743;
      width: 200px;
      height: 100%;
      .logo {
        background: #4b5064;
        width: 100%;
        padding: 10px 0;
        font-size: 18px;
        color: #fff;
        text-align: center;
      }
      .el-menu {
        width: 100%;
      }
    }
    .main-right {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;

      .main-right-text {
        flex: 1;
        padding: 10px;
        // background: #183ac0;
        overflow-y: scroll;
      }
    }
  }
}

//导航菜单
::v-deep.el-menu {
  //带儿子
  .el-submenu {
    color: #183ac0 !important;
    // # 1.修改子级背景色
    //子级ul
    .el-menu {
      //自己ul>li
      .el-menu-item {
        background: #707d89 !important;
      }
    }

    // # 2.子级激活父级同时激活
    &.is-active {
      .el-submenu__title {
        .iconfont,
        span {
          color: #183ac0;
        }
      }
    }
  }

  // # 3.去除白边
  border: none;

  // # 4.字体图标与文字距离
  .iconfont {
    margin-right: 5px;
  }
}
</style>