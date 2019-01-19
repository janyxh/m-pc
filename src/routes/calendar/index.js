export default [
  {
    path: "/calendar",
    name: "calendar",
    title: "营销日历",
    icon: "iconfont icon-left_dav_cal",
    component: () => import("@/views/calendar"),
    meta: {
      breadData: "营销日历",
      breadDataRoute: "/calendar"
    }
  }
];
