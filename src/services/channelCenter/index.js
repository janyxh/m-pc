import fetch from "@/api/fetch";
export default {
  //获取渠道列表数据
  fetchList(params) {
    return fetch.post("/channel-info/list", params);
  }
  //点击编辑获取当前行的自定义渠道的数据
};
