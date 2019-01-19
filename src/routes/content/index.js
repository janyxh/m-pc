export default [
  {
    path: "/content",
    name: "content",
    title: "内容中心",
    icon: "iconfont icon-left_dav_gra",
    component: () => import("@/views/content"),
    meta: {
      breadData: "内容中心",
      breadDataRoute: "/content"
    }
  }
];
