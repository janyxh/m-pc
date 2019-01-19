// import axios from "axios";
import service from "./fetch";
// import "@/mock/content";

// -------------------------------------------------------------- 列表管理  ----------------------------------------------------------------------------

// 获取内容列表
export const getContentList = params => {
  return service
    .post(`/content_info/getContentInfoList`, params)
    .then(res => res.data);
};

// 获取功能分类列表
export const getContentTypeList = params => {
  return service
    .post(`/content_info/getContentTypeList`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 分组管理  ----------------------------------------------------------------------------

// 获取分组列表
export const getGroup = params => {
  return service
    .post(`/content_group/getContentGroupList`, {
      params: params
    })
    .then(res => res.data);
};

// 添加分组
export const addGroup = params => {
  return service
    .post(`/content_group/addContentGroup`, params)
    .then(res => res.data);
};

// 编辑分组
export const editGroup = params => {
  return service
    .post(`/content_group/updateContentGroup`, params)
    .then(res => res.data);
};

// 编辑分组
export const delGroup = params => {
  return service
    .post(`/content_group/deleteContentGroup`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 内容状态切换  ----------------------------------------------------------------------------
// 内容状态切换
export const updateContentInfoStatus = params => {
  return service
    .post(`/content_info/updateContentInfoStatus`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 移动到分组  ----------------------------------------------------------------------------
// 移动到分组
export const updateContentInfoGroup = params => {
  return service
    .post(`/content_info/updateContentInfoGroup`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 复制内容  ----------------------------------------------------------------------------
// 复制内容
export const copyContentInfo = params => {
  return service
    .post(`/content_info/copyContentInfo`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 删除内容  ----------------------------------------------------------------------------
// 删除内容
export const deleteContentInfo = params => {
  return service
    .post(`/content_info/deleteContentInfo`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 设置  ----------------------------------------------------------------------------

// 获取内容详情
export const getContentInfo = params => {
  return service
    .post(`/content_info/getContentInfo`, params)
    .then(res => res.data);
};

// 获取样式字典列表
export const getDictStyleList = params => {
  return service
    .post(`/content_info/getDictStyleList`, params)
    .then(res => res.data);
};

// 获取标签列表数据
export const getTagInfoList = params => {
  return service.post(`/tag_info/getTagInfoList`, params).then(res => res.data);
};

// 添加标签
export const addTag = params => {
  return service.post(`/tag_info/addTagInfo`, params).then(res => res.data);
};

// 保存设置
export const updateContentInfo = params => {
  return service
    .post(`/content_info/updateContentInfo`, params)
    .then(res => res.data);
};
