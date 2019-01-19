export default [
  {
    path: "/thirdAuthorization/wxServiceList",
    name: "thirdAuthorization",
    title: "第三方授权管理",
    icon: "iconfont icon-left_dav_grou",
    component: () => import("@/views/thirdAuthorization"),
    meta: {
      breadData: "第三方授权管理",
      breadDataRoute: "/thirdAuthorization"
    },
    children: [
      {
        path: "/thirdAuthorization/wxServiceList",
        name: "wxServiceList",
        meta: {
          breadData: "微信服务号",
          breadDataRoute: "/thirdAuthorization/wxServiceList"
        },
        component: () => import("@/views/thirdAuthorization/wxServiceList")
      },
      {
        path: "/thirdAuthorization/appServiceList",
        name: "appServiceList",
        meta: {
          breadData: "微信小程序",
          breadDataRoute: "/thirdAuthorization/appServiceList"
        },
        component: () => import("@/views/thirdAuthorization/appServiceList")
      },
      {
        path: "/thirdAuthorization/merchantList",
        name: "merchantList",
        meta: {
          breadData: "微信商户号",
          breadDataRoute: "/thirdAuthorization/merchantList"
        },
        component: () => import("@/views/thirdAuthorization/merchantList")
      }
    ]
  }
];
