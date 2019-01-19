/**
 * 权限类接口 http请求项目地址
 */

let base = "http://10.12.52.68:8080/mop-web-api/matrix/api.do";

if (process.env.NODE_ENV === "development") {
  base = "http://10.12.52.68:8080/mop-web-api/matrix/api.do";
  // base = "http://192.168.2.70:8080/mop-web-api/matrix/api.do";
} else if (process.env.NODE_ENV === "test") {
  base = "http://192.168.2.70:8080/mip-web/matrix/api.do";
}

export default base;
