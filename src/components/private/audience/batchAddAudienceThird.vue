<template>
  <div class="batch-add-page">
    <div class="step-bar">
      <div class="step-num-bar">
        <div class="step-num fl">1</div>
        <div class="step-line"></div>
        <div class="step-num fl">2</div>
        <div class="step-line"></div>
        <div class="step-num fr">3</div>
      </div>
      <div class="step-text">
        <p class="fl">导入数据</p>
        <p class="zj colr">导入确认</p>
        <p class="fr colr">其他设置</p>
      </div>
    </div>
    <div class="set-tag">
      <set-tags :tagArray="dataArr"></set-tags>
    </div>
  </div>
</template>
<script>
import setTags from "../../common/setTags";
export default {
  components: {
    setTags
  },
  data() {
    return {
      dataArr: [],
      externalSysId: "1",
      clfs: "1"
    };
  },
  props: {
    resultData: {
      type: Object
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
@import "@/assets/css/audience/index.scss";
</style>
