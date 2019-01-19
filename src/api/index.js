/**
 * 对象转换为请求的param
 * @param {object} json 对象
 * @param {string} url http请求地址
 */
export function jsonToQuery(json, url) {
  const keys = Object.keys(json);
  const query = [];
  keys.forEach(key => {
    const item = [key, json[key]].join("=");
    query.push(item);
  });
  let result = query.join("&");
  if (url) {
    if (url.indexOf("?") > -1) {
      result = url + (url.endsWith("&") ? result : ["&", result].join(""));
    } else {
      result = [url, "?", result].join("");
    }
  }
  return result;
}
