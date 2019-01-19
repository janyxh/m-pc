/**
 * 内容中心》分销返利
 */

import service from "../fetch";

// -------------------------------------------------------------- 分销返利内容配置 ----------------------------------------------------------------------------

// 新增分销返利
export const addDistributionContent = params => {
  return service
    .post(`/sales/content/addConfigSummaryInfo`, params)
    .then(res => res.data);
};

// 获取分销返利信息
export const getDistributionContent = params => {
  return service
    .post(`/sales/content/getConfigSummaryInfo`, params)
    .then(res => res.data);
};

// 编辑分销返利
export const editDistributionContent = params => {
  return service
    .post(`/sales/content/updateConfigSummaryInfo`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 分销等级接口 ----------------------------------------------------------------------------
// 添加等级
export const addSalesLevel = params => {
  return service
    .post(`/sales/level/addSalesLevelInfo`, params)
    .then(res => res.data);
};

// 删除等级
export const delSalesLevel = params => {
  return service.post(`/sales/level/delete`, params).then(res => res.data);
};

// 等级列表
export const getSalesLevelList = params => {
  return service
    .post(`/sales/level/getListByCompAndContent`, params)
    .then(res => res.data);
};

// 编辑等级
export const editSalesLevel = params => {
  return service
    .post(`/sales/level/editSalesLevelInfo`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 分销商品接口 ----------------------------------------------------------------------------
// 商户内容分销商品列表
export const pageCompCommodity = params => {
  return service
    .post(`/sales/commodity/pageCompCommodity`, params)
    .then(res => res.data);
};

// 商户商品列表
export const pageCommodity = params => {
  return service
    .post(`/sales/commodity/pageCommodity`, params)
    .then(res => res.data);
};

// 添加分销商品
export const addCommodityToContent = params => {
  return service
    .post(`/sales/commodity/addCommodityToContent`, params)
    .then(res => res.data);
};

// 删除分销商品
export const delCommodityContent = params => {
  return service
    .post(`/sales/commodity/deleteCommodityContent`, params)
    .then(res => res.data);
};

// 查询商品分销等级信息
export const queryCommodityLevel = params => {
  return service
    .post(`/sales/commodity/queryCommodityLevelInfo`, params)
    .then(res => res.data);
};

// 设置商品等级信息
export const setCommodityLevel = params => {
  return service
    .post(`/sales/commodity/setCommodityLevelInfo`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 分销员接口 ----------------------------------------------------------------------------
// 分销员信息列表
export const getSalesmanList = params => {
  return service.post(`/salesman/page`, params).then(res => res.data);
};

// 更新分销员信息
export const updateSalesmanList = params => {
  return service.post(`/salesman/update`, params).then(res => res.data);
};
