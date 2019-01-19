export default [
  {
    path: "/distribution/distributionList",
    name: "distribution",
    title: "返利分销",
    icon: "iconfont icon-left_dav_mark",
    component: () => import("@/views/distribution"),
    meta: {
      breadData: "返利分销",
      breadDataRoute: "/distribution"
    },
    children: [
      {
        path: "/distribution/distributionList",
        name: "distributionList",
        meta: {
          breadData: "总部模式",
          breadDataRoute: "/distribution/distributionList"
        },
        component: () => import("@/views/distribution/distributionList")
      },
      {
        path: "/distribution/addDistribution",
        name: "addDistribution",
        meta: {
          breadData: "新建",
          breadDataRoute: "/distribution/addDistribution"
        },
        component: () => import("@/views/distribution/addDistribution")
      },
      {
        path: "/distribution/distributionStatistics",
        name: "distributionStatistics",
        meta: {
          breadData: "数据",
          breadDataRoute: "/distribution/distributionStatistics"
        },
        component: () => import("@/views/distribution/distributionStatistics")
      }
    ]
  }
];
