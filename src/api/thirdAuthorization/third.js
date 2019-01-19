/**
 * 受众中心列表
 */

import service from "../fetch";

// -------------------------------------------------------------- 服务号列表 ----------------------------------------------------------------------------

// 获取服务号列表
export const getWxServiceList = params => {
  return service
    .post(`/wx/plate_form/getAccountsList`, params)
    .then(res => res.data);
};

// 关联小程序
export const linkSmallApp = params => {
  return service
    .post(`/wx/plate_form/associateApplets`, params)
    .then(res => res.data);
};

// 授权
export const authorityWx = params => {
  return service.post(`/wx/plate_form/authUrl`, params).then(res => res.data);
};

// 授权完成后
export const authorityWxAfter = params => {
  return service
    .post(`/wx/plate_form/receive_authcode`, params)
    .then(res => res.data);
};

// 获取公众号关联的小程序列表
export const linkAppList = params => {
  return service
    .post(`/wx/plate_form/getAccountsAppletsList`, params)
    .then(res => res.data);
};

// 获取复用公众号快速注册小程序功能
export const createApp = params => {
  return service
    .post(`/wx/plate_form/registerAppletsUrl`, params)
    .then(res => res.data);
};

// 快速注册小程序完成后
export const createAfter = params => {
  return service
    .post(`/wx/plate_form/register/receive_register_ticket`, params)
    .then(res => res.data);
};

// 获取权限列表
export const getPermissionsList = params => {
  return service
    .post(`/wx/plate_form/getPlateformFuncInfoList`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 小程序列表 ----------------------------------------------------------------------------

// 获取服务号列表
export const getWxAppList = params => {
  return service
    .post(`/wx/plate_form/getAppletsInfoPageList`, params)
    .then(res => res.data);
};

// 获取体验者列表
export const getTyAppList = params => {
  return service
    .post(`/wx/plate_form/bindUserList`, params)
    .then(res => res.data);
};

// 绑定体验者
export const bandTy = params => {
  return service.post(`/wx/plate_form/bindUser`, params).then(res => res.data);
};

// 解绑体验者
export const unbandTy = params => {
  return service
    .post(`/wx/plate_form/unBindUser`, params)
    .then(res => res.data);
};

// 获取小程序关联的公众号列表
export const gitAPPLinkList = params => {
  return service
    .post(`/wx/plate_form/getAppletsAccountsList`, params)
    .then(res => res.data);
};

// 获取公众号列表
export const gitWxGzhList = params => {
  return service
    .post(`/wx/plate_form/findAccountsList`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 商户号列表 ----------------------------------------------------------------------------
// 获取商户号列表
export const getMerchantList = params => {
  return service
    .post(`/wx/plate_form/getMerchantsList`, params)
    .then(res => res.data);
};

// 绑定商户号
export const bindMerchantNumber = params => {
  return service
    .post(`/wx/plate_form/addMerchantsInfo`, params)
    .then(res => res.data);
};

// 删除商户号
export const delMerchantNumber = params => {
  return service
    .post(`/wx/plate_form/delMerchantsInfo`, params)
    .then(res => res.data);
};

// 获取公众号列表
export const gitWxAppList = params => {
  return service
    .post(`/wx/plate_form/findAppletsList`, params)
    .then(res => res.data);
};

// 获取商户号列表
export const gitMerchantList = params => {
  return service
    .post(`/wx/plate_form/findMerchantsList`, params)
    .then(res => res.data);
};
