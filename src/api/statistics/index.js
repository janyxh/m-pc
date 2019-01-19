/**
 * 内容中心》分销返利》数据统计
 */

import service from "../fetch";

// -------------------------------------------------------------- 数据统计 ----------------------------------------------------------------------------

// 分销订单统计
export const distributionOrderList = params => {
  return service.post(`/salesman/order/list`, params).then(res => res.data);
};

// 业绩统计
export const achievementList = params => {
  return service.post(`/salesman/pageList`, params).then(res => res.data);
};
