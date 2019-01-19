export default [
  {
    //渠道中心
    path: "/channelCenter/customChannel",
    name: "channelCenter",
    title: "渠道中心",
    icon: "iconfont icon-left_dav_data",
    component: () => import("@/views/channelCenter"),
    meta: {
      breadData: "渠道中心",
      breadDataRoute: "/channelCenter/customChannel"
    },
    children: [
      //这里将改造成nav和breadData.此处还可以优化,时间仓促
      {
        //自定义渠道
        path: "/channelCenter/customChannel",
        name: "customChannel_1",
        meta: {
          nav: ["自定义渠道"],
          breadData: "自定义渠道",
          breadDataRoute: "/channelCenter/customChannel"
        },
        component: () => import("@/views/channelCenter/customChannel/diylist")

        // component: () => import("@/views/channelCenter/customChannel/list"),
        // children: [
        //   {
        //     path: "/channelCenter/customChannel/detail",
        //     name: "customDetail",
        //     component: () =>
        //       import("@/views/channelCenter/customChannel/detail/detail"),
        //     meta: {
        //       breadData: "详情"
        //     }
        //   }
        // ]
      },
      {
        path: "/channelCenter/customChannel/detail",
        name: "customDetail",
        component: () =>
          import("@/views/channelCenter/customChannel/detail/detail"),
        meta: {
          breadData: "详情"
        }
      }
      // {
      //   //终端渠道
      //   path: "/channelCenter/terminalChannel",
      //   name: "terminalChannel",
      //   meta: {
      //     breadData: "终端渠道"
      //   },
      //   component: () => import("@/views/channelCenter/terminalChannel")
      // },
      // {
      //   //一物一码
      //   path: "/channelCenter/yiWuYiMa",
      //   name: "yiWuYiMa",
      //   meta: {
      //     breadData: "一物一码"
      //   }
      // },
      // {
      //   //员工渠道
      //   path: "/channelCenter/employeesChannels",
      //   name: "employeesChannels",
      //   meta: {
      //     breadData: "员工渠道"
      //   }
      // },
      // {
      //   //导购渠道
      //   path: "/channelCenter/shoppersChannels",
      //   name: "shoppersChannels",
      //   meta: {
      //     breadData: "导购渠道"
      //   }
      // },
      // {
      //   //其他渠道
      //   path: "/channelCenter/otherChannel",
      //   name: "otherChannel",
      //   meta: {
      //     breadData: "其他"
      //   }
      // }
    ]
  }
];
