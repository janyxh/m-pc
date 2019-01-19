/**
 * 受众中心详情 表格
 */

import service from "../fetch";

// -------------------------------------------------------------- 受众中心详情 列表  ----------------------------------------------------------------------------

// 获取内容列表
export const getAudienceDetailsList = params => {
  return service.post(`/audience-locus/list`, params).then(res => res.data);
};

// 获取 受众轨迹 标签
export const getTagList = params => {
  return service
    .get(`/audience-locus/list/tag`, {
      params: params
    })
    .then(res => res.data);
};

// 保存 受众轨迹 标签
export const getAudienceDetailsTagAdd = params => {
  return service.post(`/audience-locus/add/tag`, params).then(res => res.data);
};
