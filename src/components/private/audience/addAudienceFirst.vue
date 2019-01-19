<template>
  <div class="audience-add-page">
    <div class="add-tip">温馨提示：外部ID是系统创建受众的依据；系统支持通过手机号和OpenID等确定是新建还是为已存在的受众添加或更新属性 数据</div>
    <div class="step-bar">
      <div class="step-num-bar">
        <div class="step-num fl">1</div>
        <div class="step-line"></div>
        <div class="step-num2 fr">2</div>
      </div>
      <div class="step-text">
        <p class="fl">辅助ID输入</p>
        <p class="fr">导入提交</p>
      </div>
    </div>
    <ul class="step-one">
      <li>
        <label>外部ID类型：</label>
        <el-select
          v-model="addData.externalSysId"
          @change="changeType"
          placeholder="请选择外部ID类型"
          size="small"
        >
          <el-option label="手机号" :value="1"></el-option>
          <el-option label="OpenID" :value="0"></el-option>
        </el-select>
      </li>
      <li v-if="addData.externalSysId === 1">
        <label>手机号：</label>
        <el-input v-model="addData.phone" placeholder="请输入手机号" maxlength="11" size="small"></el-input>
        <p v-show="isShowPhoneTips">
          提示：以该手机号作为辅助ID的受众已经存在。需要为其更新数据？
          <span>立即前往</span>
        </p>
      </li>
      <li v-if="addData.externalSysId === 0">
        <label>所属服务号/小程序：</label>
        <el-select v-model="addData.appId" placeholder="请选择所属服务号/小程序" size="small">
          <el-option label="微信公众号" value="1"></el-option>
          <el-option label="微信小程序" value="2"></el-option>
        </el-select>
      </li>
      <li v-if="addData.externalSysId === 0">
        <label>OpenID：</label>
        <el-input v-model="addData.openId" maxlength="40" placeholder="请输入OpenID" size="small"></el-input>
        <p v-show="isShowIdTips">提示：导入的OpenID必须与服务号或小程序的appId对应；否则无法使用微信的 客服消息和模板消息等功能</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    addData: {
      type: Object
    },
    isShowPhoneTips: {
      type: Boolean
    },
    isShowIdTips: {
      type: Boolean
    }
  },
  mounted() {},
  methods: {
    changeType() {
      this.$emit("changeTips");
      if (this.addData.externalSysId === 1) {
        this.isType = true;
        this.addData.appId = "";
        this.addData.openId = "";
      } else {
        this.isType = false;
        this.addData.phone = "";
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/audience/index.scss";
</style>
