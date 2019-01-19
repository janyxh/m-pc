<template>
  <div class="list-screening">
    <!-- 全部 -->
    <div class="list-tatol">
      <p class="el-dropdown-link dropdown-link-all" style="cursor: text;">
        全部({{eventTotal}})
      </p>
    </div>
    <div class="list-tatol">
      <span @click="isOpenScreen" @blur="isCloseScreen" class="dropdown-link-screening">
        筛选设置
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </span>
    </div>
    <el-button
            @click="$emit('contentSettingHandel')"
            class="add-an"
            type="primary"
            size="small"
            :loading="addLoading"
    >新建</el-button>
    <!-- 搜索 -->
    <el-input
      placeholder="请输入活动名称关键词"
      v-model="search.keyword"
      class="input-with-select screen-input"
      size="small"
      clearable
    >
      <el-select class="screen-input2" v-model="search.searchType" slot="prepend" placeholder="请选择">
        <el-option
          v-for="item in optionsSearchType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="submitSelect"></el-button>
    </el-input>
    <!-- 筛选面板 -->
    <screening
      v-show="isShowScreenList"
      :search="search"
      @resetSelect="resetSelect"
      @submitSelect="submitSelect"
    ></screening>
  </div>
</template>

<script>
import moment from "moment";
import { closest } from "@/mixins";
import screening from "./screening";
export default {
  props: ["eventTotal", "isAddContent"],
  components: {
    screening
  },
  data() {
    return {
      isShowScreenList: false, // 是否弹出筛选面板
      addLoading: false,
      search: {
        searchType: 1, // 搜索类型
        keyword: "", // 关键字
        createUserName: "", // 创建人
        title: "", // 内容标题
        status: "", // 内容状态
        type: "", // 模板功能分类id
        createTime: "" //创建时间
      },
      optionsSearchType: [
        // 搜索类型选项
        {
          value: 1,
          label: "按活动名称"
        },
        {
          value: 2,
          label: "按用户名称"
        }
      ]
    };
  },
  mounted() {
    document.onclick = e => {
      if (
        !closest(e.target, ".dropdown-link-all") &&
        !closest(e.target, ".dialog-add-group") &&
        !closest(e.target, ".dialog-del-group")
      ) {
        // console.log("未击中-分组面板");
      }
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
        ...this.search
      };
      if (params.createTime !== "" && params.createTime.length > 0) {
        params.startTime = moment(params.createTime[0]).format("YYYY-MM-DD");
        params.endTime = moment(params.createTime[1]).format("YYYY-MM-DD");
      }
      delete params.createTime
      this.isShowScreenList = false;
      this.$emit("getData", params);
    },
    // 重置
    resetSelect() {
      this.search = {
        searchType: 1,
        keyword: "", // 关键字
        createUserName: "", // 创建人
        title: "", // 内容标题
        status: "", // 内容状态
        type: "", // 模板功能
        createTime: "" // 创建时间
      };
      this.$emit("getData", {});
      this.isShowScreenList = false;
    }
  }
};
</script>
