<template>
  <div class="external-id-page">
    <div class="title">
      <h5>外部ID</h5>
      <el-tooltip placement="top">
        <div slot="content">温馨提示：外部ID是系统创建受众的
          <br>依据；系统支持通过手机号和OpenID
          <br>等确定是新建还是为已存在的受众添
          <br>加或更新属性数据
        </div>
        <i class="el-icon-question"></i>
      </el-tooltip>
    </div>
    <ul class="base-list">
      <li>
        <span>AudID：</span>
        <p>o7kepwRi8sCLlh54T5Zgo</p>
      </li>
      <li>
        <span>AudID稳定性：</span>
        <p>超稳态</p>
      </li>
      <li>
        <span>手机号：</span>
        <p>13828883444</p>
      </li>
      <li>
        <span>Unionid：</span>
        <p>o7kepwRi8sCLlh54T5Zgo</p>
      </li>
      <li>
        <span>微信授权主体：</span>
        <div>
          <p>服务号 | 隆庆祥官方服务号</p>
          <p>小程序 | 这就是隆庆祥</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataArr: [],
      externalSysId: "1",
      clfs: "1"
    };
  },
  // props: {
  //   addData: {
  //     type: Object
  //   },
  //   isShowPhoneTips: {
  //     type: Boolean
  //   },
  //   isShowIdTips: {
  //     type: Boolean
  //   }
  // },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
@import "@/assets/css/audience/details.scss";
</style>
