<template>
  <!-- 推广趋势 -->
  <div class="item">
    <h3 class="title">
      推广趋势
      <el-popover placement="top" trigger="hover" content="新增分销员数为每日新增的分销员数量，清退后重新申请加入的也算。具体计算以分销员提交申请加入为准。" width="200">
        <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
      </el-popover>
    </h3>
    <div class="date-wrap">
      <span>{{ date }}</span>
      <el-date-picker v-model="dateExtension" @change="changeDate" type="daterange" :default-value="new Date()"
        :clearable="false" size="small" class="date-picker">
      </el-date-picker>
    </div>
    <div class="chart-wrap">
      <div class="charts" id="chartExtension" :style=" 'width:'+ chartWidth"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { chartsDraw, getChartWidth } from "@/mixins/chart.js";
import { getOption } from "@/mixins/chartOption/distribution/extension.js";
export default {
  props: ["isResize"],
  data() {
    return {
      date: "",
      dateExtension: "",
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
        document.querySelector("#chartExtension"),
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
            document.querySelector("#chartExtension"),
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
