/**
 * 受众中心列表
 */

import service from "../fetch";

// -------------------------------------------------------------- 受众列表 ----------------------------------------------------------------------------

// 获取受众列表
export const getAudienceList = params => {
  return service.post(`/audience-info/list`, params).then(res => res.data);
};

// 新增单个受众>判断手机是否存在
export const findCountByPhone = params => {
  return service
    .get(`/audience-info/findCountByPhone`, { params: params })
    .then(res => res.data);
};

// 新增单个受众
export const addAudience = params => {
  return service.post(`/audience-info/add`, params).then(res => res.data);
};

// 批量导入受众
export const importAudiences = params => {
  return service.post(`/audience-info/import`, params).then(res => res.data);
};

// 删除
export const deleteAudiences = params => {
  return service.post(`/audience-info/delete`, params).then(res => res.data);
};

// 根据受众人获取对应类型的标签
export const getAudiencesTagList = params => {
  return service.post(`/audience-tag/list`, params).then(res => res.data);
};

// 根据租户获取对应类型标签
export const getAudiencesCompTagList = params => {
  return service.post(`/tag_info/getTagInfoList`, params).then(res => res.data);
};

// 根据租户获取对应类型标签
export const addCompTag = params => {
  return service.post(`/tag_info/addTagInfo`, params).then(res => res.data);
};

// 根据租户保存编辑后的标签集合
export const keepTagArr = params => {
  return service
    .post(`/audience-tag/addTagListForSingleAudience`, params)
    .then(res => res.data);
};

// 批量导入受众后给批量数据打标签集合
export const batchAddAudienceTags = params => {
  return service
    .post(`/audience-info/batchAddAudienceTagByImport`, params)
    .then(res => res.data);
};
