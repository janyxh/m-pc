/**
 * 公共方法js
 */

// 找到祖辈元素, el:子元素，selector:需要查找的祖辈元素
export const closest = (el, selector) => {
  var matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
};
import date from "./date";
export default {
  ...date
};

// 标签库管理 标记打上的的标签 返回有标志的标签库数组
export const getTagsList = (tagArr, tagsList) => {
  for (let i = 0; i < tagArr.length; i++) {
    for (let j = 0; j < tagsList.length; j++) {
      if (tagArr[i].id === tagsList[j].id) {
        tagsList[j].isSelect = true;
        break;
      } else if (tagsList[j].isSelect === undefined) {
        tagsList[j].isSelect = false;
      }
    }
  }
  return tagsList;
};

// 获取url中的参数
export const getQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
