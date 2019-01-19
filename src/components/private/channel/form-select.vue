<template>
  <div class="list-screening">
    <!-- <div class="list-tatol">全部（280）</div> -->
    <!-- 全部 -->
    <div class="list-tatol">全部({{ pageIndex.total }})</div>
    <div class="list-tatol">
      <span @click="isOpenScreen" @blur="isCloseScreen" class="dropdown-link-screening">
        筛选条件
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </span>
    </div>
    <el-button class="add-an" type="primary" plain size="small" @click="$emit('openAddSingle')">新建</el-button>
    <el-button class="add-an" type="primary" size="small" @click="$emit('openAddBatch')">批量添加</el-button>
    <!-- 搜索 -->
    <el-input placeholder="请输入关键字" v-model="search.keyword" class="input-with-select screen-input" size="small"
      clearable>
      <el-select class="screen-input2" v-model="search.searchType" slot="prepend" placeholder="请选择">
        <el-option v-for="item in optionsSearchType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="submitSelect"></el-button>
    </el-input>
    <!-- 筛选面板 -->
    <screening v-show="isShowScreenList" :search="search" @resetSelect="resetSelect" @submitSelect="submitSelect"></screening>
  </div>
</template>

<script>
import moment from "moment";
import { closest } from "@/mixins";
import screening from "./screening";

export default {
  props: ["contentTotal", "pageIndex"],
  components: {
    screening
  },
  data() {
    return {
      isShowScreenList: false, // 是否弹出筛选面板
      search: {
        searchType: 1, // 搜索类型
        keyword: "", // 关键字
        channelStatus: "", // 渠道状态
        transemissionPlatform: "", // 传播平台
        updateTime: "" // 时间
      },
      optionsSearchType: [
        // 搜索类型选项
        {
          value: 1,
          label: "按渠道名称"
        }
      ]
    };
  },
  mounted() {
    document.onclick = e => {
      if (
        !closest(e.target, ".select-panel") &&
        !closest(e.target, ".dropdown-link-screening")
      ) {
        this.isShowScreenList = false;
        // console.log("未击中-筛选面板");
      }
    };
  },
  beforeDestroy() {
    document.onclick = "";
  },
  methods: {
    //  ---------------------------------------------------------------  筛选面板  -------------------------------------------------------------------
    // 点击筛选条件
    isOpenScreen() {
      this.isShowScreenList = !this.isShowScreenList;
    },
    // 关闭筛选条件
    isCloseScreen() {
      this.isShowScreenList = false;
    },
    // 查询
    submitSelect() {
      let params = {
        ...this.search,
        ...this.pageIndex
      };
      if (params.updateTime !== "" && params.updateTime.length > 0) {
        params.lastDistributeTimeFrom = moment(params.updateTime[0]).format(
          "YYYY-MM-DD"
        );
        params.lastDistributeTimeTo = moment(params.updateTime[1]).format(
          "YYYY-MM-DD"
        );
      }
      if (params.searchType === 1) {
        params.channelName = params.keyword;
      }
      delete params.searchType;
      delete params.keyword;
      delete params.updateTime;
      this.isShowScreenList = false;
      this.$emit("getData", params);
    },
    // 重置
    resetSelect() {
      this.search = {
        searchType: 1, // 搜索类型
        keyword: "", // 关键字
        channelStatus: "", // 渠道状态
        transemissionPlatform: "", // 传播平台
        updateTime: "" // 时间
      };
      const pageInit = {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      };
      this.$emit("getData", {
        ...pageInit
      });
      this.$emit("resetPage", pageInit);
      this.isShowScreenList = false;
    }
  }
};
</script>
