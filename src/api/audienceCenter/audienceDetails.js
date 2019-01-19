/**
 * 受众中心详情
 */

import service from "../fetch";

// -------------------------------------------------------------- 受众详情 ----------------------------------------------------------------------------

// 获取受众详情
export const getDetails = params => {
  return service
    .get(`/audience-info/get/audienceInfo`, { params: params })
    .then(res => res.data);
};

// 更新受众详情
export const changeDetails = params => {
  return service.post(`/audience-info/update`, params).then(res => res.data);
};

// 获取受众标签列表
export const getTagsList = params => {
  return service.post(`/audience-tag/list`, params).then(res => res.data);
};

// 移除受众标签
export const deleteTags = params => {
  return service.post(`/audience-tag/delete`, params).then(res => res.data);
};

// 编辑受众标签
export const editTags = params => {
  return service.post(`/tag_info/editTagInfo`, params).then(res => res.data);
};

// 新增受众标签
export const addTags = params => {
  return service
    .post(`/audience-tag/addAudienceTagRelation`, params)
    .then(res => res.data);
};
