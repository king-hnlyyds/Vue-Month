// 账号登录模块
import instance from "@/utils/request";

// 1.登录接口
export const checkLogin = (data) =>
  instance({
    method: "post",
    url: "/users/checkLogin",
    data, 
  });