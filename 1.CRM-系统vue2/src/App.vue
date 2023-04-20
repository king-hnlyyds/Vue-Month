<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/login">登录</router-link>
      <router-link to="/layout">后台</router-link>
    </nav> -->
    <!-- 一级路由出口 -->
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
  height: 100%;
  background: rgb(218, 227, 231);
}
</style>
