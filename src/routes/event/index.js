export default [
  {
    path: "/event/list",
    name: "event",
    title: "营销事件",
    icon: "iconfont icon-left_dav_comm",
    component: () => import("@/views/event"),
    meta: {
      breadData: "营销事件",
      breadDataRoute: "/event/list"
    },
    children: [
      // 二级导航
      {
        path: "/event/list",
        name: "eventList",
        component: () => import("@/views/event/list"),
        meta: {
          breadData: "营销事件",
          breadDataRoute: "/event/list"
        }
      },
      {
        path: "/event/list/details",
        name: "eventDetails",
        component: () => import("@/views/event/details"),
        meta: {
          breadData: "营销事件详情",
          breadDataRoute: "/event/list/details"
        },
        children: []
      },
      {
        path: "/event/list/details/quotaSetting",
        name: "quotaSetting",
        component: () => import("@/views/event/quotaSetting"),
        meta: {
          breadData: "指标设置",
          breadDataRoute: "/event/list/details/quotaSetting"
        }
      },
      {
        path: "/event/list/details/analysis",
        name: "analysis",
        component: () => import("@/views/event/analysis"),
        meta: {
          breadData: "详细分析",
          breadDataRoute: "/event/list/details/analysis"
        }
      }
    ]
  }
];
