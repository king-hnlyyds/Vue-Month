import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  //1.一级路由
  //登录页
  { path: "/login", component: () => import("@/views/login") },

  //后台
  {
    path: "/layout",
    component: () => import("@/views/layout"),
    redirect: "/layout/department",
    //2.二级路由
    children: [
      //部门管理
      {
        path: "/layout/department",
        component: () => import("@/views/layout/department"),
      },
      //员工管理
      {
        path: "/layout/PersonalList",
        component: () => import("@/views/layout/employee/PersonalList.vue"),
      },
      //员工新增
      {
        path: "/layout/personaladd",
        component: () => import("@/views/layout/employee/PersonalAdd.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

//全局前置路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  //获取token
  let token = localStorage.getItem("token");
  // 判断访问的路径是不是登录页, 是就通过
  if (to.path === "/login") {
    next();
  } else {
    // 不是就判断是否有token,有token才允许访问后台页面,否则打回登录页
    token ? next() : next({ path: "/login" });
  }
});

export default router;
