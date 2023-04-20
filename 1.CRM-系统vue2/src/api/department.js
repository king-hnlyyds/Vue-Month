// 部门管理模块
import instance from "@/utils/request";

//1.部门列表
export const departmentList = (params) =>
  instance({
    method: "get",
    url: "/department/list",
    params,
  });

// 2. 新增部门
export const departmentAdd = (data) =>
  instance({
    method: "post",
    url: "/department/add",
    data,
  });
//3.修改部门
export const departmentEdit = (data) =>
  instance({
    method: "post",
    url: "/department/edit",
    data,
  });
//4.删除部门
export const departmentDel = (params) =>
  instance({
    method: "get",
    url: "/department/del",
    params,
  });