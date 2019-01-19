<template>
  <div class="event-detail-page">
    <div class="event-title">
      <div class="event-titel-item">
        <label>{{detailsData.name}}</label>
      </div>
      <div class="event-titel-item">
        <el-tag >{{getStatusName(detailsData.status)}}</el-tag>
      </div>
      <div class="event-titel-item">
        <label>活动时间：<span>{{detailsData.startTime}}</span>至<span>{{detailsData.endTime}}</span></label>
      </div>
      <div class="event-titel-item">
        <label>活动预算：<span>{{!detailsData.budget ? '未设置': detailsData.budget}}</span></label>
      </div>
      <i @click="showContentSetting" class="iconfont icon-edit">修改</i>
    </div>
    <div class="event-kpi">
      <div class="event-kpi-head">
        <h5>核心指标</h5>
        <i @click="openKPIDeatails" class="iconfont icon-left_dav_mess_sel"><span class="text">详细分析</span></i>
        <i @click="openKPIConfig" class="iconfont icon-left_dav_data"><span class="text">指标设置</span></i>
      </div>
      <div class="event-kip-item" v-for="(item, index) in kpiItems" :key="index">
        <div class="top" >
          <h5>{{item.name}}</h5>
          <el-tooltip  class="tip" :content="item.desc" placement="top">
            <i class="iconfont icon-chan_pop_doubtsvg"></i>
          </el-tooltip>
        </div>
        <p class="center">{{item.total}}</p>
        <p class="bottom">已完成 <span>{{item.percent}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
import { getKpiData } from "@/api/event/index";
export default {
  data() {
    return {
      kpiItems: []
    };
  },
  props: {
    detailsData: {
      type: Object
    }
  },
  mounted() {
    this.getKpiData();
  },
  methods: {
    /**
     * 打开编辑
     */
    showContentSetting() {
      this.$emit("showContentSetting");
    },
    getStatusName(status) {
      if (status === 0) {
        return "草稿";
      } else if (status === 1) {
        return "上架";
      } else if (status === 2) {
        return "未开始";
      } else if (status === 3) {
        return "进行中";
      } else if (status === 4) {
        return "已结束";
      } else if (status === 5) {
        return "已归档";
      }
    },
    //跳转到详情分析
    openKPIDeatails() {
      this.$router.push({
        path: "details/analysis",
        query: {
          id: this.detailsData.id
        }
      });
    },
    //跳转到指标设置
    openKPIConfig() {
      this.$router.push({
        path: "details/quotaSetting",
        query: {
          id: this.detailsData.id
        }
      });
    },
    //获取kpi数据
    getKpiData() {
      let params = {
        id: this.detailsData.id
      };
      getKpiData(params)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.kpiItems = res.data.list;
          }
        })
        .catch(err => window.console.error(err));
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/event/details.scss";
</style>
