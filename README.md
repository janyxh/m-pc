# marketing-pc

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 产品资料

#### 参照资料

免展，易企秀

```
https://www.rrxiu.net/my#/wsite

http://www.eqxiu.com/h5/list

账号：
18929391040

密码：
maozedong1976

数商MOP使用的第三方账号

https://note.youdao.com/share/?id=c83569d1f3851aa02a0bfd2244bd5635&type=note#/

小程序
zhongqidong123456@163.com
zhongqi123456


```

#### 产品原型

```
svn://10.12.52.76/数商事业部/营销平台/产品

```

### 目录结构

    ├── public                          静态资源
    │   └── index.html                  页面入口
    ├── src                             项目源码目录
    │   ├── main.js                         入口js文件
    │   ├── app.vue                         根组件
    |   └──mock                            mock数据目录
    │     └── hello.js
    │   ├── api                         接口文件
    |   |   └── fetch.js                    接口通用配置文件
    |   |   └── fetchAuth.js                接口通用配置文件（权限，登录等，与会员通用的）
    |   |   └── base.js                     http请求地址配置（权限，登录等，与会员通用的）
    │   ├── components                  组件
    │   │   └── common                      公用组件（全局）
    │   │   └── private                     私有组件（与页面（view目录）对应）
    │   ├── assets                      资源目录，这里的资源会被wabpack构建
    │   │   └── images                       图片
    │   │   └── css                          css
    │   │       └── common.scss                 公用css
    │   │       └── color.scss                  系统颜色变量
    |   |       └── reset.scss                  覆盖element-ui的样式（此修改用于全局）
    |   |       └── element-variables.scss      element-ui 组件主题色
    |   |   └── iconfont                     iconfont字体图标
    │   ├── mixins                      工程函数（即js文件目录）
    |   |   └── index.js                    常用公用js
    │   ├── routes                          前端路由
    │   │   └── index.js
    │   ├── store                           应用级数据（state）
    │   │   └── index.js
    │   └── views                           页面目录
    │       └── hello.vue
    |── .env.production                      生产环境http请求地址配置
    |__ .env.development                     开发环境http请求地址配置
