<template>
  <div class="event-show-page">
    <div  class="show-guide">
      <div class="title">
        <p>请在左侧选择内容查看</p>
      </div>
      <div class="step">
        <el-steps :space="300" :active="4" align-center >
          <el-step title="添加推广内容" ></el-step>
          <el-step title="配置推广渠道" ></el-step>
          <el-step title="查看推广链接" ></el-step>
          <el-step title="API接口分发" ></el-step>
        </el-steps>
      </div>
      <div class="desc">
        <p>说明：</p>
        <p>1.添加想要推广的内容</p>
        <p>2.配置推广渠道</p>
        <p>3.查看推广链接。你可以把为自定义渠道等生成的链接设置到相应的入口</p>
        <p>4.API接口分发。如果相应的渠道已经将分发接口与MOP实现了集成，则可以实现自动将基于该类渠道生成的带参推广链接分发到具体的入口。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
  },
  created() {

  },
  mounted() {

  },
  methods: {}
};
</script>

<style lang="scss">
@import "@/assets/css/event/details.scss";
</style>
