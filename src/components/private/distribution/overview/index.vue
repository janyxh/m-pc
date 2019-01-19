<template>
  <!-- 分销返利 - 概览 -->
  <section class="overview-wrap">
    <!-- 概览 -->
    <overview></overview>
    <!-- 概要对比 -->
    <contrast></contrast>
    <!-- 趋势图表 -->
    <trend></trend>
  </section>
</template>

<script>
import overview from "@/components/private/distribution/overview/overview.vue";
import contrast from "@/components/private/distribution/overview/contrast.vue";
import trend from "@/components/private/distribution/overview/trend/index.vue";
export default {
  components: {
    overview,
    contrast,
    trend
  }
};
</script>


<style lang="scss" scoped>
@import "../../../../assets/css/distribution/overview";
</style>
