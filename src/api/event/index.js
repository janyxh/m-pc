/**
 * 营销事件
 */

import service from "../fetch";

// -------------------------------------------------------------- 营销事件start ----------------------------------------------------------------------------
// 查询营销事件分页列表
export const getMarketEventPageList = params => {
  /* return service
    .post(`/marketEvent/getMarketEventPageList`, params)
    .then(res => res.data);*/
  return service
    .post(`/content_info/getContentInfoList`, params)
    .then(res => res.data);
};

// 查询营销事件详情
export const getMarketEvent = params => {
  let data = {
    data: {
      budget: 0,
      compId: 0,
      context: "",
      createTime: "2018-12-01 10:00:00",
      createUserId: 0,
      createUserName: "",
      deleteFlag: false,
      endTime: 0,
      id: "111111",
      imageUrl: "",
      name: "xxxx 活动名称",
      startTime: 0,
      status: 0,
      updateTime: 0,
      updateUserId: 0,
      updateUserName: ""
    },
    message: "success",
    respCode: "0000"
  };
  return new Promise((resolve, reject) => {
    resolve(data);
  });
  /*  return service
        .post(`/marketEvent/getMarketEvent`, params)
        .then(res =>  res.data ); */
};

// 添加营销事件
export const addMarketEvent = params => {
  return service
    .post(`/marketEvent/addMarketEvent`, params)
    .then(res => res.data);
};

// 修改营销事件
export const updateMarketEvent = params => {
  return service
    .post(`/marketEvent/updateMarketEvent`, params)
    .then(res => res.data);
};

// 删除营销事件
export const deleteMarketEvent = params => {
  return service
    .post(`/marketEvent/deleteMarketEvent`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 营销事件内容start ----------------------------------------------------------------------------

// 查询营销事件内容列表
export const getMarketEventContentList = params => {
  let data = {
    data: [
      {
        channelCount: 0,
        compId: 0,
        contentInfoId: 1,
        contentInfoImage: "",
        contentInfoTitle: "",
        createTime: 0,
        createUserId: 0,
        createUserName: "",
        deleteFlag: false,
        grantType: 0,
        id: 0,
        mainId: 0,
        mainType: 0,
        marketEventId: 0,
        noGrantVisit: 0,
        spreadTimes: "",
        updateTime: 0,
        updateUserId: 0,
        updateUserName: ""
      },
      {
        channelCount: 0,
        compId: 0,
        contentInfoId:
          "浪费是昌是是进地奋 垮塌 进城城城城城城城城城城城城在地在",
        contentInfoImage: "",
        contentInfoTitle: "",
        createTime: 0,
        createUserId: 0,
        createUserName: "",
        deleteFlag: false,
        grantType: 0,
        id: 0,
        mainId: 0,
        mainType: 0,
        marketEventId: 0,
        noGrantVisit: 0,
        spreadTimes: "",
        updateTime: 0,
        updateUserId: 0,
        updateUserName: ""
      }
    ],
    message: "success",
    respCode: "0000"
  };
  return new Promise((resolve, reject) => {
    resolve(data);
  });
  /* return service
       .post(`/marketEvent/getMarketEventContentList`, params)
       .then(res => res.data);*/
};

// 查询营销事件内容详情
export const getMarketEventContent = params => {
  return service
    .post(`/marketEvent/getMarketEventContent`, params)
    .then(res => res.data);
};

// 添加营销事件内容
export const addMarketEventContent = params => {
  return service
    .post(`/marketEvent/addMarketEventContent`, params)
    .then(res => res.data);
};

// 查询营销事件内容对应的状态展示信息
export const getMarketEventStatusText = params => {
  return service
    .post(`/marketEvent/getMarketEventStatusText`, params)
    .then(res => res.data);
};

// 设置营销事件内容对应的状态展示信息
export const setMarketEventStatusText = params => {
  return service
    .post(`/marketEvent/setMarketEventStatusText`, params)
    .then(res => res.data);
};

// 修改营销事件内容
export const updateMarketEventContent = params => {
  return service
    .post(`/marketEvent/updateMarketEventContent`, params)
    .then(res => res.data);
};

// 删除营销事件内容
export const deleteMarketEventContent = params => {
  return service
    .post(`/marketEvent/deleteMarketEventContent`, params)
    .then(res => res.data);
};

// 获取微信主题配置
export const getMarketEventContetChannelCfg = params => {
  let data = {
    data: {
      list: [
        {
          id: 1,
          name: "服务号：已认证的服务号一"
        },
        {
          id: 2,
          name: "小程序：隆庆翔小程序一"
        }
      ]
    },
    message: "success",
    respCode: "0000"
  };
  return new Promise((resolve, reject) => {
    resolve(data);
  });
  /*    return service
            .post(`/marketEvent/------`, params)
            .then(res => res.data);*/
};

// -------------------------------------------------------------- 营销事件内容渠道start ----------------------------------------------------------------------------

// 查询营销事件内容渠道的分页列表
export const getMarketEventChannelPageList = params => {
  return service
    .post(`/marketEvent/getMarketEventChannelPageList`, params)
    .then(res => res.data);
};

// 添加营销事件内容关联的渠道
export const addMarketEventChannel = params => {
  return service
    .post(`/marketEvent/addMarketEventChannel`, params)
    .then(res => res.data);
};

// 移出营销事件内容关联的渠道
export const deleteMarketEventChannel = params => {
  return service
    .post(`/marketEvent/deleteMarketEventChannel`, params)
    .then(res => res.data);
};

// -------------------------------------------------------------- 指标数据start ----------------------------------------------------------------------------
//获取指标数据
export const getKpiData = params => {
  let data = {
    data: {
      list: [
        {
          name: "新受众数",
          desc: "新增加的受众人数",
          total: 5260,
          percent: "10%"
        },
        { name: "访问人次", desc: "访问人次", total: 89, percent: "10%" },
        { name: "访问人次", desc: "访问人次", total: 89, percent: "10%" },
        { name: "访问人次", desc: "访问人次", total: 89, percent: "10%" },
        { name: "访问人次", desc: "访问人次", total: 89, percent: "10%" }
      ]
    },
    message: "success",
    respCode: "0000"
  };
  return new Promise((resolve, reject) => {
    resolve(data);
  });
  /* return service.post(`/audience-info/list`, params).then(res => res.data);*/
};
