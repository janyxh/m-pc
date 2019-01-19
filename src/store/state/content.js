/**
 * 类型：vuex state
 * 模块：内容中心
 * 作者：谢梅花
 */
export const contentState = {
  isShowScreenGroup: false, // 是否打开分组面板
  groupList: [], // 分组列表
  search: {
    searchType: 1, // 搜索类型
    keyword: "", // 关键字
    createUserName: "", // 创建人
    title: "", // 内容标题
    status: "", // 内容状态
    contentTypeId: "", // 模板功能分类id
    updateTime: "", // 时间
    contentGroupId: "" // 分组id} // 内容中心筛选内容
  }
};
