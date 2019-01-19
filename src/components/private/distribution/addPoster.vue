<template>
  <section class="poster-page">
    <div class="left" v-if="showBar===1">
      <div class="left-bg">
        <img class="bg-img" :src="pDefImg">
        <div class="style1" v-if="contentData.posterStyle === 1">
          <img v-show="contentData.posterHeadNickname === 1" class="photo-img" :src="defPhoto">
          <p
            v-show="contentData.posterHeadNickname === 1"
            :style="{color: contentData.posterNicknameColor}"
          >{{defName}}</p>
          <img class="qr-img" :src="defQrcode">
          <div class="shop-logo" v-show="contentData.posterLogoPosition === 1">
            <img :src="defLoge">
          </div>
        </div>
        <div class="style2" v-else-if="contentData.posterStyle === 2">
          <img v-show="contentData.posterHeadNickname === 1" class="photo-img" :src="defPhoto">
          <p
            v-show="contentData.posterHeadNickname === 1"
            :style="{color: contentData.posterNicknameColor}"
          >{{defName}}</p>
          <img class="qr-img" :src="defQrcode">
          <div class="shop-logo" v-show="contentData.posterLogoPosition === 1">
            <img :src="defLoge">
          </div>
        </div>
        <div class="style3" v-else-if="contentData.posterStyle === 3">
          <img class="qr-img" :src="defQrcode">
          <img v-show="contentData.posterHeadNickname === 1" class="photo-img" :src="defPhoto">
          <p
            v-show="contentData.posterHeadNickname === 1"
            :style="{color: contentData.posterNicknameColor}"
          >{{defName}}</p>
          <div class="shop-logo" v-show="contentData.posterLogoPosition === 1">
            <img :src="defLoge">
          </div>
        </div>
      </div>
    </div>
    <div class="left" v-else>
      <div class="left-invitation">
        <img class="bg-img" :src="iDefImg">
        <div class="style1" v-if="contentData.invitationStyle === 1">
          <div
            class="invitation-text"
            :style="{color: contentData.invitationFontColor}"
          >{{contentData.invitationCopywriting}}</div>
          <img class="photo-img" :src="defPhoto">
          <p :style="{color: contentData.invitationNicknameColor}">{{defName}}</p>
          <img class="qr-img" :src="defQrcode">
          <div class="shop-logo" v-show="contentData.invitationLogoPosition === 0">
            <img :src="defLoge">
          </div>
        </div>
        <div class="style2" v-if="contentData.invitationStyle === 2">
          <img class="photo-img" :src="defPhoto">
          <p :style="{color: contentData.invitationNicknameColor}">{{defName}}</p>
          <div
            class="invitation-text"
            :style="{color: contentData.invitationFontColor}"
          >{{contentData.invitationCopywriting}}</div>
          <img class="qr-img" :src="defQrcode">
          <div class="shop-logo" v-show="contentData.invitationLogoPosition === 0">
            <img :src="defLoge">
          </div>
        </div>
        <div class="style3" v-if="contentData.invitationStyle === 3">
          <img class="qr-img" :src="defQrcode">
          <div class="shop-logo" v-show="contentData.invitationLogoPosition === 0">
            <img :src="defLoge">
          </div>
          <img class="photo-img" :src="defPhoto">
          <p :style="{color: contentData.invitationNicknameColor}">{{defName}}</p>
          <div
            class="invitation-text"
            :style="{color: contentData.invitationFontColor}"
          >{{contentData.invitationCopywriting}}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="tab-bar">
        <ul class="tab-list">
          <li @click="selectTab(1)" :class="{actived:showBar===1}">商品列表海报</li>
          <li @click="selectTab(2)" :class="{actived:showBar===2}">邀请卡</li>
        </ul>
      </div>
      <ul class="list-content" v-if="showBar===1">
        <li>
          <label>布局样式：</label>
          <el-select
            class="pc-select"
            v-model="contentData.posterStyle"
            placeholder="请选择"
            size="small"
          >
            <el-option label="样式一" :value="1"></el-option>
            <el-option label="样式二" :value="2"></el-option>
            <el-option label="样式三" :value="3"></el-option>
          </el-select>
        </li>
        <li>
          <label>背景样式：</label>
          <div class="list-right">
            <img v-if="imageUrl" class="up-img" :src="imageUrl">
            <div class="up-img-bar" v-else>
              <i class="el-icon-picture-outline avatar-uploader-icon"></i>
            </div>
            <div class="up-right">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary" plain>点击上传</el-button>
              </el-upload>
              <div class="up-doc">
                <p>最佳尺寸：670x1060像素</p>
                <p>尺寸不匹配时图片将被压缩或拉伸</p>
                <p>设计海报背景时，预留微信头像昵称以及海报的位置和大小即可</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <label>二维码：</label>
          <div class="list-right2">
            <el-radio
              v-model="contentData.posterTwoDimensionCode"
              @change="resetLogo"
              :label="1"
            >微信参数二维码，如果扫码者未关注该公众号，则引导先关注；扫码后将获得含有“推广商品列表”的消息推送</el-radio>
            <div class="r-select-bar" v-show="contentData.posterTwoDimensionCode === 1">
              <label>选择服务号</label>
              <el-select
                v-model="contentData.posterServiceId"
                @change="setInfo"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in gzhList"
                  :key="index"
                  :label="item.nickName"
                  :value="item.authorizationAppid"
                ></el-option>
              </el-select>
            </div>
            <el-radio
              v-model="contentData.posterTwoDimensionCode"
              @change="resetLogo"
              :label="0"
            >小程序码，扫码可以直接打开小程序的“推广商品列表”页面</el-radio>
            <div class="r-select-bar mb0" v-show="contentData.posterTwoDimensionCode === 0">
              <label>选择小程序</label>
              <el-select
                v-model="contentData.posterServiceId"
                @change="setInfo2"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in appWxList"
                  :key="index"
                  :label="item.nickName"
                  :value="item.authorizationAppid"
                ></el-option>
              </el-select>
            </div>
          </div>
        </li>
        <li v-show="contentData.posterTwoDimensionCode === 1">
          <label>店铺LOGO：</label>
          <el-radio-group v-model="contentData.posterLogoPosition">
            <el-radio :label="0">不展示</el-radio>
            <el-radio :label="1">展示在二维码中</el-radio>
          </el-radio-group>
        </li>
        <li>
          <label>头像昵称：</label>
          <el-radio-group v-model="contentData.posterHeadNickname">
            <el-radio :label="0">不展示</el-radio>
            <el-radio :label="1">展示</el-radio>
          </el-radio-group>
        </li>
        <li>
          <label>昵称颜色1：</label>
          <el-color-picker
            v-model="contentData.posterNicknameColor"
            size="small"
            :predefine="predefineColors"
          ></el-color-picker>
        </li>
      </ul>
      <ul class="list-content" v-else>
        <li>
          <label>布局样式：</label>
          <el-select
            class="pc-select"
            v-model="contentData.invitationStyle"
            placeholder="请选择"
            size="small"
          >
            <el-option label="样式一" :value="1"></el-option>
            <el-option label="样式二" :value="2"></el-option>
            <el-option label="样式三" :value="3"></el-option>
          </el-select>
        </li>
        <li>
          <label>背景样式：</label>
          <div class="list-right">
            <img v-if="imageUrl2" class="up-img" :src="imageUrl2">
            <div class="up-img-bar" v-else>
              <i class="el-icon-picture-outline avatar-uploader-icon"></i>
            </div>
            <div class="up-right">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary" plain>点击上传</el-button>
              </el-upload>
              <div class="up-doc">
                <p>最佳尺寸：670x1060像素</p>
                <p>尺寸不匹配时图片将被压缩或拉伸</p>
                <p>设计海报背景时，预留微信头像昵称以及海报的位置和大小即可</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <label>邀请文案：</label>
          <el-input placeholder="请输入内容" v-model="contentData.invitationCopywriting" size="small"></el-input>
        </li>
        <li>
          <label>文字颜色：</label>
          <el-color-picker
            v-model="contentData.invitationFontColor"
            size="small"
            :predefine="predefineColors"
          ></el-color-picker>
        </li>
        <li>
          <label>二维码：</label>
          <div class="list-right2">
            <el-radio
              v-model="contentData.invitationTwoDimensionCode"
              @change="resetLogo2"
              :label="1"
            >微信参数二维码，如果扫码者未关注该公众号，则引导先关注；扫码后将获得含有“推广商品列表”的消息推送</el-radio>
            <div class="r-select-bar" v-show="contentData.invitationTwoDimensionCode === 1">
              <label>选择服务号</label>
              <el-select
                v-model="contentData.invitationServiceId"
                @change="setInfo"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in gzhList"
                  :key="index"
                  :label="item.nickName"
                  :value="item.authorizationAppid"
                ></el-option>
              </el-select>
            </div>
            <el-radio
              v-model="contentData.invitationTwoDimensionCode"
              @change="resetLogo2"
              :label="0"
            >小程序码，扫码可以直接打开小程序的“推广商品列表”页面</el-radio>
            <div class="r-select-bar mb0" v-show="contentData.invitationTwoDimensionCode === 0">
              <label>选择小程序</label>
              <el-select
                v-model="contentData.invitationServiceId"
                @change="setInfo2"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in appWxList"
                  :key="index"
                  :label="item.nickName"
                  :value="item.authorizationAppid"
                ></el-option>
              </el-select>
            </div>
          </div>
        </li>
        <li v-show="contentData.invitationTwoDimensionCode === 1">
          <label>店铺LOGO：</label>
          <el-radio-group v-model="contentData.invitationLogoPosition">
            <el-radio :label="0">展示在二维码中</el-radio>
            <el-radio :label="1">不展示</el-radio>
          </el-radio-group>
        </li>
        <li>
          <label>昵称颜色：</label>
          <el-color-picker
            v-model="contentData.invitationNicknameColor"
            size="small"
            :predefine="predefineColors"
          ></el-color-picker>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { gitWxAppList, gitWxGzhList } from "@/api/thirdAuthorization/third";
export default {
  data() {
    return {
      appWxList: [],
      gzhList: [],
      mainBody: "1",
      showBar: 1,
      defLoge: "", // require("@/assets/images/nav/logo.png"),
      defQrcode: "", // require("@/assets/images/content/qr_code.png"),
      defName: "没有梦想的咸鱼",
      defPhoto: require("@/assets/images/audience/photo.png"),
      pDefImg: require("@/assets/images/distribution/dist_pop_bg.png"),
      iDefImg: require("@/assets/images/distribution/dist_bg.png"),
      imageUrl: "",
      imageUrl2: "",
      predefineColors: [
        "#000000",
        "#ffffff",
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "#1f7fb2"
      ]
    };
  },
  props: {
    contentData: {
      type: Object
    }
  },
  mounted() {
    this.getGzhList();
    this.getAppList();
  },
  methods: {
    /**
     * 获取公众号
     */
    getGzhList() {
      gitWxGzhList({})
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.gzhList = res.data || [];
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 获取小程序
     */
    getAppList() {
      gitWxAppList({})
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.appWxList = res.data || [];
          }
        })
        .catch(err => console.error(err));
    },
    setInfo() {
      let arr = this.gzhList.find(item => {
        return item.authorizationAppid === this.contentData.posterServiceId;
      });
      this.defLoge = arr.headImg;
      this.defQrcode = arr.qrcodeUrl;
    },
    setInfo2() {
      let arr = this.appWxList.find(item => {
        return item.authorizationAppid === this.contentData.posterServiceId;
      });
      this.defLoge = arr.headImg;
      this.defQrcode = arr.qrcodeUrl;
    },
    /**
     * 上传
     */
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.pDefImg = URL.createObjectURL(file.raw);
      this.contentData.posterBackgroundImage = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw);
      this.iDefImg = URL.createObjectURL(file.raw);
      this.contentData.invitationBackgroundImage = URL.createObjectURL(
        file.raw
      );
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传图片只能是 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    /**
     * 选项卡
     */
    selectTab(num) {
      this.showBar = num;
    },
    // 重置显示logo
    resetLogo() {
      if (this.contentData.posterTwoDimensionCode === 0) {
        this.contentData.posterLogoPosition = 0;
        if (this.appWxList.length > 0) {
          this.contentData.posterServiceId = this.appWxList[0].authorizationAppid;
        } else {
          this.contentData.posterServiceId = "";
        }
      }
      if (this.contentData.posterTwoDimensionCode === 1) {
        if (this.gzhList.length > 0) {
          this.contentData.posterServiceId = this.gzhList[0].authorizationAppid;
        } else {
          this.contentData.posterServiceId = "";
        }
      }
    },
    resetLogo2() {
      if (this.contentData.invitationTwoDimensionCode === 0) {
        this.contentData.invitationLogoPosition = 1;
        if (this.appWxList.length > 0) {
          this.contentData.invitationServiceId = this.appWxList[0].authorizationAppid;
        } else {
          this.contentData.invitationServiceId = "";
        }
      }
      if (this.contentData.invitationTwoDimensionCode === 1) {
        if (this.gzhList.length > 0) {
          this.contentData.invitationServiceId = this.gzhList[0].authorizationAppid;
        } else {
          this.contentData.invitationServiceId = "";
        }
      }
    }
  }
};
</script>


<style lang="scss">
@import "../../../assets/css/distribution/index.scss";
.poster-page {
  .left {
    background: url("../../../assets/images/distribution/phone.png") no-repeat;
  }
}
</style>
