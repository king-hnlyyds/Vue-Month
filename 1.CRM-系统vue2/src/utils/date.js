/** 时间处理**/

export const handleTime = (val) => {
  //转换成时间对象
  let d = new Date(val);
  //获取年月日
  let Y = d.getFullYear();
  let M = d.getMonth() + 1;
  let D = d.getDate();
  //获取时分秒
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  //  2023-03-12  09:19:22
  // [2023,03,12] -> 2023-03-12  // [09,19,22] -> 09:19:22
  return zero([Y, M, D], "-") 
};
//补0函数
function zero(arr, sy) {
  return arr.map((v) => (v < 10 ? "0" + v : v)).join(sy);
}
