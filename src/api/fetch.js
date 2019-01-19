import axios from "axios";
import base from "./basemop";
import { Message } from "element-ui";

console.log(">>>>>", window.location.host);
// 创建实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_URL,
  baseURL: base,
  timeout: 30000, // 请求超时时间
  withCredentials: true,
  headers: {
    token: localStorage.getItem("token") || ""
  }
});
// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    //添加时间戳
    // let url = config.url;
    // let timeStamp = "timeStamp=" + new Date().getTime.toString();
    // if (url.indexOf("?") === -1) {
    //   url = url + "?" + timeStamp;
    // } else {
    //   url = url + "&" + timeStamp;
    // }
    // config.url = url;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // 未登录
    if (response.data.respCode === "10020") {
      Message.error(response.data.message);
      setTimeout(() => {
        // router.push("/");
      }, 3000);
    } else if (response.data.respCode === "BSC10005") {
      Message.error(response.data.message);
      setTimeout(() => {
        if (process.env.NODE_ENV === "development") {
          location.href = "http://" + location.host;
        } else {
          location.href = "http://" + location.host + "/manage";
        }
      }, 1000);
      // Message.error("用户信息已过期，请重新登录");
    } else if (response.data.respCode !== "0000") {
      Message.error(response.data.message);
    }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    // console.log("error", error);
    if (
      error.request.readyState === 4 &&
      (error.request.status === 0 || error.request.status !== 200)
    ) {
      Message.error("系统繁忙，请稍后重试");
    }
    return Promise.reject(error);
  }
);

export default service;
