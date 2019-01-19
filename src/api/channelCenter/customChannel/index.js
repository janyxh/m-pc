import fetch from "@/api/fetch";
export default {
  //获取渠道列表数据
  fetchList(params) {
    return fetch.post("/channel-info/list", params);
  },
  //解禁
  unForbidChannel(params) {
    return fetch.post("/channel-info/update/status", params);
  },
  //新增渠道
  addChannel(params) {
    return fetch.post("/channel-info/add", params);
  },
  //下载范例模板
  downLoadTemplate(params) {
    return fetch.get("/channel-info/download", params);
  },
  //删除渠道
  deleteChannel(params) {
    return fetch.post("/channel-info/delete", params);
  },
  //获取传播平台信息
  fetchPlatform() {
    return fetch.post("/channel-info/get/platform");
  },
  //获取单个渠道信息
  fetchChannelInfo(channelId) {
    return fetch.get("/channel-info/get", {
      params: {
        channelId: channelId
      }
    });
  },
  //复制新建
  dublicateChannel(params) {
    return fetch.post("/channel-info/copy", params);
  },
  //获取详情
  fetchDetail(params) {
    return fetch.post("/channel-detail/list", params);
  },
  //分发日志
  fetchLogStatistics(params) {
    return fetch.post("/channel-detail/statis", params);
  },
  //导入
  channelImport(params) {
    return fetch.post("/channel-info/import", params);
  },
  //模糊查询
  fuzzySearch(params) {
    return fetch.post("/channel-info/get/name", params);
  },
  //更新渠道信息
  updateChannelInfo(params) {
    return fetch.post("/channel-info/update/info", params);
  }
};
