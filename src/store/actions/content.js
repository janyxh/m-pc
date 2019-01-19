/**
 * 类型：vuex actions
 * 模块：内容中心
 * 作者：谢梅花
 */
export const contentActions = {
  // 打开分组面板
  openGroupPanel(context) {
    context.commit("openGroupPanel");
  },
  // 关闭分组面板
  closeGroupPanel(context) {
    context.commit("closeGroupPanel");
  },
  // 获取列表
  getGroupList({ commit }, data) {
    commit("getGroupList", data);
  }
};
