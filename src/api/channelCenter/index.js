/**
 * 渠道中心 列表
 */

import service from "../fetch";
// -------------------------------------------------------------- 列表管理  ----------------------------------------------------------------------------

// 获取渠道中心列表
export const getChannelList = params => {
  return service.post(`/channel-info/list`, params).then(res => res.data);
};

// 获取传播平台列表
export const getPlatformList = params => {
  return service
    .post(`channel-info/get/platform`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 批量操作  ----------------------------------------------------------------------------

// 批量禁用/解禁
export const updateStatus = params => {
  return service
    .post(`/channel-info/update/status`, params)
    .then(res => res.data);
};

// 批量删除
export const batchDelete = params => {
  return service.post(`/channel-info/delete`, params).then(res => res.data);
};

// -------------------------------------------------------------- 操作  ----------------------------------------------------------------------------

// 复制新建
export const copy = params => {
  return service.post(`/channel-info/copy`, params).then(res => res.data);
};

// -------------------------------------------------------------- 单个添加渠道  ----------------------------------------------------------------------------

// 单个添加
export const add = params => {
  return service.post(`/channel-info/add`, params).then(res => res.data);
};

// 单个编辑
export const update = params => {
  return service
    .post(`/channel-info/update/info`, params)
    .then(res => res.data);
};

// 查看渠道信息
export const getInfo = params => {
  return service
    .get(`/channel-info/get`, {
      params: params
    })
    .then(res => res.data);
};

// -------------------------------------------------------------- 批量添加渠道  ----------------------------------------------------------------------------

// 批量导入
export const importChannel = params => {
  return service.post(`/channel-info/import`, params).then(res => res.data);
};

/*
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
*/
