/**
 * 营销开放平台接口 http请求项目地址
 */

let base = "http://10.12.52.69:8090/market-manage";

if (process.env.NODE_ENV === "development") {
  // base = "http://192.168.0.31:8090/market-manage";
  // base = "http://192.168.2.70:8090/market-manage";
  base = "http://10.12.52.69:8090/market-manage";
} else if (process.env.NODE_ENV === "test") {
  base = "http://10.12.52.69:8090/market-manage";
}

export default base;
