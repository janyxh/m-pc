<template>
  <div class="asideNav">

    <el-aside width="180px">
      <div class="topImg">
        <img :src="open_logo_Url" v-if="!isCollapse">
        <img :src="shrink_logo_Url" v-if="isCollapse" class="shrink_img" />

      </div>
      <el-row class="aside_icon_list">
        <el-col :span="8" class="aside_icon">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse" router @select="handleSelect" active-text-color="#0763cd">

            <template v-for="(item,index) in navData">
              <el-menu-item :index="item.path" :key="index">
                <div class="icon">
                  <i :class="item.icon"></i>

                  <span slot="title">{{item.title}}</span>
                </div>
              </el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <el-col :span="16" class="secondNavList">
          <nav-menu-second :navTitle='navTitle' :secondNavData='secondNavData' v-on="$listeners"></nav-menu-second>
        </el-col>
      </el-row>

      <!-- <el-row class="navBottom">
        <el-col>
          <el-button
            type="text"
            @click="dialogVisible = true"
          >自定义导航</el-button>
        </el-col> -->
      <!-- <el-col :span="9">
          <el-radio-group v-model="isCollapse">
            <el-radio-button :label="!isCollapse">收起</el-radio-button>
          </el-radio-group>
        </el-col> -->
      <!-- </el-row> -->
      <div class="bottomImg">
        <img :src="openBottom_logo_Url" v-if="!isCollapse">
        <img :src="shrinkBottom_logo_Url" v-else class="shrink_img">
      </div>
    </el-aside>

  </div>
</template>
<script>
import navMenuSecond from "./navMenuSecond";
import { routes } from "@/routes/router";
import homeApi from "@/services/home";
export default {
  data() {
    return {
      open_logo_Url: require("assets/images/nav/open_top.png"),
      shrink_logo_Url: require("assets/images/nav/shrink_top.png"),
      openBottom_logo_Url: require("assets/images/nav/open_bottom.png"),
      shrinkBottom_logo_Url: require("assets/images/nav/shrink_bottom.png"),
      isCollapse: false,
      routerParams: this.$route.query,
      navData: [],
      secondNavData: [],
      navTitle: ""
    };
  },
  components: {
    navMenuSecond
  },
  created() {
    const routerNav = routes.find(item => {
      return item.name === "home";
    });
    this.navData = routerNav.children;
    // console.log(this.navData, "navData");
  },
  methods: {
    //点击导航触发的事件
    handleSelect(index, indexPath) {
      this.$emit("select", index, indexPath);
      this.isCollapse = !this.isCollapse;
      //获取二级导航的数据
      this.navData.forEach(item => {
        if (item.path === index) {
          if (index === "/event/list") {
            this.secondNavData = [item.children[0]];
            this.navTitle = item.title;
          } else {
            this.secondNavData = item.children;
            this.navTitle = item.title;
          }
        }
      });
      // console.log(this.$router.path, "this.$router.path");
    },
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
.asideNav {
  height: 100%;
  display: inline-block;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    box-sizing: border-box;
    background-color: #fff;
  }

  .topImg {
    text-align: left;

    .shrink_img {
      width: 64px;
    }
  }

  .bottomImg {
    position: absolute;
    bottom: 0;
    text-align: left;

    .shrink_img {
      width: 64px;
    }
  }

  .icon {
    span {
      display: inline-block;
      margin-left: 10px;
    }
  }

  .aside_icon_list {
    height: 88%;
  }

  .el-menu {
    height: 100%;
  }

  .aside_icon {
    height: 100%;
  }

  .secondNavList {
    background: #fff;
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    overflow: hidden;
    border-right: 1px solid #ddd;
    height: 100%;
    position: relative;

    .navBottom {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter,
    .slide-fade-leave-to

    /* .slide-fade-leave-active for below version 2.1.8 */
 {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
