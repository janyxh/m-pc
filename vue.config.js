module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/manage" : "/",
  devServer: {
    host: "0.0.0.0",
    port: 8081
  },
  configureWebpack: {
    externals: {
      UE: "UE"
    },
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        views: "@/views"
      }
    }
  }
};
