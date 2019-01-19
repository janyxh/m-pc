<template>
  <div class="home">
    <el-container>
      <nav-menu @select="selectHandle" @switchSecondNav="handleSecondNav"></nav-menu>
      <el-container>
        <el-header>
          <div>
            <el-row type="flex" justify="end" class="headerInfo">
              <el-col :span="1">
                <i class="iconfont icon-topdav_sea"></i>
              </el-col>
              <el-col :span="1">
                <i class="iconfont icon-topdav_news"></i>
              </el-col>
              <el-col :span="1">
                <i class="iconfont icon-emoji"></i>
              </el-col>
              <el-col :span="2">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <!-- 马云 -->
                    {{userInfo.userName}}
                    <i class="el-icon-arrow-down el-icon--right" style="cursor:pointer"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <a @click="_loginout">退出登录</a>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb class="self-elementui-breadcrumb" separator="/">
            <template v-for="(item,index) in levelList">
              <el-breadcrumb-item :to="{path:item.meta.breadDataRoute}" :key="index" v-if="item.meta.breadData">{{item.meta.breadData}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
          <router-view></router-view>
          <!--全局性配置异常变更-->
          <!-- <el-dialog title="全局性配置异常变更" :visible.sync="isShowTipsOne" width="640px">
            <div class="cancel-at2">
              <div class="at-left">
                <i class="el-icon-warning"></i>
              </div>
              <div class="at-right">
                <p>
                  为了保障贵司所有的用户均能正常使用平台提供的所有功能，避免因微信服务号或小
                  程序突然授权被取消而导致部分用户才完成相关操作时无法使用服务号或小程序，所
                  以系统会要求贵司配置全局性的服务号和小程序。
                </p>
                <p>
                  先系统检测到
                  <span>xxxx服务号/小程序</span>于2018年11月11日 12时31分取消了向平台的授权；
                  现平台自动将
                  <span>xxxx服务号/小程序</span>设置为全局性的服务号/小程序。如果此次“授权已取消”
                  会影响到贵司的业务开展，您可以绑定新的用于全局的服务号/小程序。如果此次“授权
                  已取消”会影响到贵司的业务开展，您可以绑定新的用于全局的服务号
                </p>
                <div class="go-to" @click="goToList">立即前往</div>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="isShowTipsOne = false" size="small">取 消</el-button>
              <el-button type="primary" @click="isShowTipsOne = false" size="small">确 定</el-button>
            </span>
          </el-dialog>-->
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
<script>
import navMenu from "./navMenu";
import { loginout } from "@/api/login";
import CONST from "@/api/const";
export default {
  data() {
    return {
      isShowTipsOne: true,
      levelList: null,
      userInfo: {}
    };
  },
  components: {
    navMenu
  },
  created() {
    // 获取用户信息
    this.getUserInfo();
  },
  methods: {
    selectHandle(index) {
      this.$router.push({
        path: index
      });
    },
    handleSecondNav(index, secondNavData) {
      this.$router.push({
        path: secondNavData[index].path
      });
    },
    getBreadcrumb() {
      // console.log(this.$route.matched, "matched");
      let matched = this.$route.matched.filter(item => item.name);
      // console.log(matched, "filter");
      // const first = matched[0]
      // if (first && first.name !== '首页') {
      //   matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
      // }
      this.levelList = matched;
    },
    // 退出登录
    _loginout() {
      localStorage.removeItem(CONST.local.TOKEN);
      localStorage.removeItem(CONST.local.USER_INFO);
      this.$router.push("/");
      loginout();
    },
    // 获取用户名
    getUserInfo() {
      let infoStr = localStorage.getItem(CONST.local.USER_INFO);
      if (infoStr) {
        this.userInfo = JSON.parse(infoStr);
      } else {
        this._loginout();
      }
    },
    goToList() {
      this.$router.push("/thirdAuthorization/wxServiceList");
      this.isShowTipsOne = false;
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/css/color.scss";

.home {
  // position: absolute;
  width: 100%;
  height: 100%;

  // min-width: 1200px;
  // overflow: auto;
  .el-header {
    padding: 0;
    height: 40px !important;
  }

  .headerInfo {
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
  }

  .el-container {
    height: 100%;

    .el-breadcrumb {
      font-size: 14px;
      line-height: 32px;
      background: #fff;
      padding: 0 20px;
    }
  }

  .cancel-at2 {
    .at-left {
      float: left;
      width: 30px;
      height: 230px;
      padding-top: 3px;
      margin-left: 20px;

      i {
        font-size: 20px;
        color: $mop-waring;
      }
    }

    .at-right {
      line-height: 25px;

      p {
        margin-bottom: 20px;

        span {
          color: $mop-danger;
        }
      }

      .go-to {
        color: $mop-primary;
        cursor: pointer;
      }
    }
  }
}
</style>
