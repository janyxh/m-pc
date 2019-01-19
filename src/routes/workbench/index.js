export default [
  {
    // 工作台
    path: "/workbench",
    name: "workbench",
    title: "工作台",
    icon: "iconfont icon-left_dav_work",
    component: () => import("@/views/workbench"),
    meta: {
      breadData: "工作台",
      breadDataRoute: "/workbench"
    }
  }
];
