/**
 * 修改一页显示的数量
 * @param {integer} size 一页显示的数量
 */
export function handlePageSize(size) {
  this.page.size = size;
  this.getSearchData();
}
/**
 * 点击分页时的事件
 * @param {*} current 当前页码
 */
export function handlePageCurrent(current) {
  this.page.current = current;
  this.getSearchData();
}
