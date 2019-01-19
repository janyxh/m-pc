<template>
  <section class="add-page">
    <!-- tab-title -->
    <div class="tab-bar">
      <ul class="tab-list">
        <li @click="selectTab(1)" :class="{actived:showBar===1}">概览</li>
        <li @click="selectTab(2)" :class="{actived:showBar===2}">佣金统计</li>
        <li @click="selectTab(3)" :class="{actived:showBar===3}">分销订单统计</li>
        <li @click="selectTab(4)" :class="{actived:showBar===4}">业绩统计</li>
      </ul>
      <el-select v-model="value" placeholder="全部营销事件" class="add-an add-an2" size="small">
        <el-option
          v-for="item in marketingEvents"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- tab-content -->
    <div class="content" :class="{pd0:showBar===2 || showBar===3 || showBar===4}">
      <div v-show="showBar===1" class="tab-nr">
        <overview/>
      </div>
      <div v-show="showBar===2" class="tab-nr">
        <commission></commission>
      </div>
      <div v-show="showBar===3" class="tab-nr">
        <order></order>
      </div>
      <div v-show="showBar===4" class="tab-nr">
        <achievement></achievement>
      </div>
    </div>
  </section>
</template>
<script>
import overview from "@/components/private/distribution/overview/index.vue";
import commission from "@/components/private/distribution/overview/commission.vue";
import order from "@/components/private/distribution/overview/order.vue";
import achievement from "@/components/private/distribution/overview/achievement.vue";
export default {
  components: {
    overview,
    commission,
    order,
    achievement
  },
  data() {
    return {
      showBar: 4,
      marketingEvents: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  created() {},
  methods: {
    /**
     * 选项卡
     */
    selectTab(num) {
      this.showBar = num;
    },
    /**
     * 保存
     */
    saveContent() {
      if (this.showBar === 1) {
        this.selectTab();
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/distribution/index";
.add-an2 {
  margin-right: 30px !important;
}
</style>
