<template>
  <div class="batch-add-page">
    <div class="step-bar">
      <div class="step-num-bar">
        <div class="step-num fl">1</div>
        <div class="step-line"></div>
        <div class="step-num fl">2</div>
        <div class="step-line"></div>
        <div class="step-num2 fr">3</div>
      </div>
      <div class="step-text">
        <p class="fl">导入数据</p>
        <p class="zj colr">导入确认</p>
        <p class="fr">其他设置</p>
      </div>
    </div>
    <div class="confirm-bar">
      <div class="result-bar">
        <div class="fiels-bar">
          <i class="iconfont icon-chan_pop_form1"></i>
        </div>
        <p>{{fileInfo.name}}</p>
      </div>
      <p>导入成功{{resultData.successNumber}}条记录， 失败{{resultData.failNumber}}条 查看
        <span>错误日志</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    resultData: {
      type: Object
    },
    fileInfo: {
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
