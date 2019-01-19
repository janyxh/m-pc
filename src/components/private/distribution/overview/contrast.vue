<template>
  <!-- 概要对比 -->
  <div class="contrast">
    <div class="item">
      <h3 class="title">
        1个分销员带来1.32个客户
        <el-popover placement="top" trigger="hover" content="成交客户是指有过购买行为的客户，不含订单关闭和全额退款的" width="200">
          <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
        </el-popover>
      </h3>
      <div class="data">
        <div class="data-item">
          <div class="name">
            客户数
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: 50 + '%' }">
              <span class="precent" :class="{less:0 > 10}">80</span>
            </div>
          </div>
        </div>
        <div class="data-item">
          <div class="name">
            成为客户数
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: 80 + '%' }">
              <span class="precent" :class="{less:0 > 10}">80</span>
            </div>
          </div>
        </div>
        <div class="data-item">
          <div class="name">
            分销员
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: 20 + '%' }">
              <span class="precent" :class="{less:20 > 10}">80</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <h3 class="title">1元佣金换来23.52元成交额</h3>
      <div class="data">
        <div class="data-item">
          <div class="name">
            成交金额
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: 50 + '%' }">
              <span class="precent" :class="{less:0 > 10}">80</span>
            </div>
          </div>
        </div>
        <div class="data-item">
          <div class="name">
            累计佣金
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: 80 + '%' }">
              <span class="precent" :class="{less:0 > 10}">80</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <h3 class="title">客单价353.00元</h3>
      <div class="data">
        <div class="data-item">
          <div class="name">
            成交金额
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: 50 + '%' }">
              <span class="precent" :class="{less:0 > 10}">80</span>
            </div>
          </div>
        </div>
        <div class="data-item">
          <div class="name">
            成为客户数
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: 80 + '%' }">
              <span class="precent" :class="{less:0 > 10}">80</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/css/distribution/overview";
</style>
