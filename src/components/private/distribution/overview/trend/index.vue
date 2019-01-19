<template>
  <div class="trend">
    <!-- 推广趋势 -->
    <extension :isResize="isResize"></extension>
    <!-- 订单趋势 -->
    <order :isResize="isResize"></order>
    <!-- 佣金趋势 -->
    <commission :isResize="isResize"></commission>
  </div>
</template>

<script>
import extension from "@/components/private/distribution/overview/trend/extension.vue";
import order from "@/components/private/distribution/overview/trend/order.vue";
import commission from "@/components/private/distribution/overview/trend/commission.vue";
export default {
  components: {
    extension,
    order,
    commission
  },
  data() {
    return {
      isResize: false
    };
  },
  mounted() {
    window.onresize = () => {
      this.isResize = Date.now();
    };
  },
  destroyed() {
    window.onresize = "";
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../assets/css/distribution/overview";
</style>
