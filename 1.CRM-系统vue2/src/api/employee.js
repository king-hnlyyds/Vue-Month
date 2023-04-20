//第二层封装-接口层
// 账号管理模块
import instance from "@/utils/request";

//1.添加员工
export const userAdd = (data) =>
  instance({
    method: "post",
    url: "/users/add",
    data, 
  });

//2.员工列表
export const usersList = (params) =>
  instance({
    method: "get",
    url: "/users/list",
    params,
  });

//3.修改员工
export const usersEdit = (data) =>
  instance({
    method: "post",
    url: "/users/edit",
    data,
  });

//4.删除账号
export const usersDel = (params) =>
  instance({
    method: "get",
    url: "/users/del",
    params,
  });


  //5.删除商品列表
export const usersDelall = (params) =>
instance({
  method: "get",
  url: "/users/delall",
  params,
});  

