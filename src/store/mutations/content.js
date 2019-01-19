/**
 * 类型：vuex mutations
 * 模块：内容中心
 * 作者：谢梅花
 */
export const contentMutations = {
  openGroupPanel(state) {
    state.isShowScreenGroup = true;
  },
  closeGroupPanel(state) {
    state.isShowScreenGroup = false;
  },
  getGroupList(state, newState) {
    state.groupList = newState.dataList;
  },
  setSearch(state, newState) {
    for (var i in newState) {
      state.search[i] = newState[i];
    }
  },
  clearSearch(state) {
    state.search = {
      searchType: 1, // 搜索类型
      keyword: "", // 关键字
      createUserName: "", // 创建人
      title: "", // 内容标题
      status: "", // 内容状态
      contentTypeId: "", // 模板功能分类id
      updateTime: "", // 时间
      contentGroupId: "" // 分组id} // 内容中心筛选内容
    };
  }
};
