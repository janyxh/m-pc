<template>
  <!-- 订单趋势 -->
  <div class="item">
    <h3 class="title">
      订单趋势
      <el-popover placement="top" trigger="hover" content="订单总数:不包含已关闭订单和全额退款订单。具体计算以订单提交日期为准。
订单金额:不包含已关闭订单、全额退款订单和已退款订单部分的已退款部分的金额，不包含运费。"
        width="200">
        <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
      </el-popover>
    </h3>
    <div class="date-wrap">
      <span>{{ date }}</span>
      <el-date-picker v-model="dateOrder" @change="changeDate" type="daterange" :default-value="new Date()" :clearable="false"
        size="small" class="date-picker">
      </el-date-picker>
    </div>
    <div class="chart-wrap">
      <div class="charts" id="chartOrder" :style=" 'width:'+ chartWidth"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { chartsDraw, getChartWidth } from "@/mixins/chart.js";
import { getOption } from "@/mixins/chartOption/distribution/order.js";
export default {
  props: ["isResize"],
  data() {
    return {
      date: "",
      dateOrder: "",
      chartWidth: getChartWidth(),
      dataName: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      dataList0: [11, 11, 15, 13, 12, 13, 10],
      dataList1: [1, -2, 2, 5, 3, 2, 0]
    };
  },
  watch: {
    isResize: function() {
      this.chartResize();
    }
  },
  created() {
    this.date =
      moment(Date.now())
        .subtract(10, "days")
        .format("YYYY/MM/DD") +
      "-" +
      moment().format("YYYY/MM/DD");
  },
  mounted() {
    this.load();
  },
  methods: {
    // 加载
    load() {
      chartsDraw(
        document.querySelector("#chartOrder"),
        getOption(this.dataName, this.dataList0, this.dataList1)
      );
      // this.getData();
    },
    // 重绘
    chartResize() {
      const promise = new Promise(function(resolve) {
        resolve();
      });
      promise
        .then(() => {
          this.chartWidth = getChartWidth();
        })
        .then(() => {
          chartsDraw(
            document.querySelector("#chartOrder"),
            getOption(this.dataName, this.dataList0, this.dataList1)
          ).resize();
        });
    },
    // 选择日期
    changeDate(val) {
      this.date =
        moment(val[0]).format("YYYY/MM/DD") +
        "-" +
        moment(val[1]).format("YYYY/MM/DD");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../assets/css/distribution/overview";
</style>
