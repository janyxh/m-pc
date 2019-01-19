import axios from "axios";
import md5 from "md5";
import CONST from "@/api/const";
// import router from "../../router/index";
import moment from "moment";
import base from "./base";
import { Message } from "element-ui";

/**
 * http
 * @type {number}
 */

// let SERVER_URL = `http://192.168.2.70:8080/mip-web/matrix/api.do`; // webpack全局变量
let SERVER_URL = base; // webpack全局变量

// 需要本地联调，直接给SERVER_URL赋值，例如：

const VERSION = "vsesion-2.0.0.1"; // 固定写
const CHANNEL = "mip会员平台PC前端"; // 固定写
const KEY = "13413A318D0C"; // 固定写
const VALUE = "F176B61F96514A5D93FB4BA581D5D1F8"; // 通过key获取，可以直接写
const CLIENT = 3; // 固定写

// 根据后端接口重置请求
let setRequestParams = config => {
  let head = {
    target: config.target,
    accessToken: localStorage.getItem("token") || "",
    client: CLIENT,
    version: VERSION,
    requestTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    channel: CHANNEL,
    key: KEY
  };
  head.value = md5(VALUE + head.target + head.requestTime);
  let data = config.data;
  config.data = `json=${JSON.stringify({ head, data })}`;
};

axios.defaults.baseURL = SERVER_URL;
// 访问超时配置
axios.defaults.timeout = 30000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-login-form-urlencoded'
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// http request拦截器
axios.interceptors.request.use(
  config => {
    setRequestParams(config);
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === "10019") {
      Message.error("用户信息已过期，请重新登录");
    }
    if (response && response.data && response.data.code) {
      switch (response.data.code) {
        case CONST.code.TOKEN_NULL:
        case CONST.code.LOGIN_TIMEOUT:
          localStorage.removeItem(CONST.local.TOKEN);
          localStorage.removeItem(CONST.local.USER_INFO);
          // router.push("/");
          break;
      }
    }
    if (response && response.data) {
      return response.data;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
