import fetch from "@/api/fetch";
export default {
  //获取二级导航数据
  fetchSecondNav(params) {
    return fetch.post("", params);
  }
};
