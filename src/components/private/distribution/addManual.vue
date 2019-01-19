<template>
  <section class="manual-page">
    <div class="manual-left">
      <div class="left-title" v-text=" contentData.title"></div>
      <div class="left-content" v-html="contentData.content"></div>
    </div>
    <div class="manual-right">
      <div class="edit-title">
        <label>页面标题</label>
        <el-input v-model="contentData.title" maxlength="15" placeholder="请输入标题" size="small"></el-input>
        <span>{{getLength}}/15</span>
      </div>
      <div class="uedit-box">
        <div id="container" class="edit-bar" type="text/plain"></div>
      </div>
    </div>
  </section>
</template>

<script>
import UE from "UE";
export default {
  data() {
    return {
      ue: ""
    };
  },
  props: {
    contentData: {
      type: Object
    }
  },
  computed: {
    getLength: function() {
      if (this.contentData.title) {
        return this.contentData.title.length;
      }
    }
  },
  mounted() {
    console.log("contentData", this.contentData);
    // 初始化编辑器
    this.ue = UE.delEditor("container");
    this.ue = UE.getEditor("container");
    setTimeout(() => {
      this.setContent(this.contentData.content);
    }, 1000);
    // 编辑器变化时调用事件
    this.ue.addListener("contentChange", this.getText);
  },
  methods: {
    // 获取编辑器内容
    getText() {
      this.contentData.content = this.ue.getContent();
    },
    // 设置编辑器内容
    setContent(text) {
      this.ue.setContent(text);
    }
  }
};
</script>


<style lang="scss">
@import "../../../assets/css/distribution/index.scss";
.manual-page {
  .manual-left {
    background: url("../../../assets/images/distribution/phone.png") no-repeat;
  }
}
</style>
