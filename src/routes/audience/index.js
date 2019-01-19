export default [
  {
    path: "/audienceCenter/list",
    name: "audienceCenter",
    title: "受众中心",
    icon: "iconfont icon-left_dav_card_sel",
    component: () => import("@/views/audienceCenter"),
    meta: {
      breadData: "受众中心",
      breadDataRoute: "/audienceCenter/list"
    },
    children: [
      // 二级导航
      {
        path: "/audienceCenter/list",
        name: "list",
        component: () => import("@/views/audienceCenter/list"),
        meta: {
          breadData: "受众列表",
          breadDataRoute: "/audienceCenter/list"
        }
      },
      {
        path: "/audienceCenter/details",
        name: "details",
        component: () => import("@/views/audienceCenter/details"),
        meta: {
          breadData: "受众详情",
          breadDataRoute: "/audienceCenter/details"
        }
      },
      {
        path: "/audienceCenter/group",
        name: "group",
        component: () => import("@/views/audienceCenter/group"),
        meta: {
          breadData: "受众分组",
          breadDataRoute: "/audienceCenter/group"
        }
      },
      {
        path: "/audienceCenter/groupEdit",
        name: "groupEdit",
        component: () => import("@/views/audienceCenter/group/edit/index.vue"),
        meta: {
          breadData: "分组条件(编辑)",
          breadDataRoute: "/audienceCenter/group"
        }
      },
      {
        path: "/audienceCenter/groupView",
        name: "groupView",
        component: () => import("@/views/audienceCenter/group/view/index.vue"),
        meta: {
          breadData: "分组条件(预览)",
          breadDataRoute: "/audienceCenter/group"
        }
      },
      {
        path: "/audienceCenter/groupDetails",
        name: "groupDetails",
        component: () =>
          import("@/views/audienceCenter/group/details/index.vue"),
        meta: {
          breadData: "分组详情",
          breadDataRoute: "/audienceCenter/group"
        }
      }
    ]
  }
];
