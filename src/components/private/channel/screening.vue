<template>
  <div class="screen-bar select-panel">
    <div class="screen-bar-nr">
      <div class="screen-list">
        <p>渠道状态</p>
        <el-select v-model="search.channelStatus" placeholder="请选择内容状态" size="small" clearable>
          <el-option value="" label="全部"></el-option>
          <el-option :value="1" label="正常"></el-option>
          <el-option :value="0" label="已禁用"></el-option>
        </el-select>
      </div>
      <div class="screen-list">
        <p>传播平台</p>
        <el-select v-model="search.transemissionPlatform" placeholder="请选择模板功能" size="small" clearable>
          <el-option value="" label="全部"></el-option>
          <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="screen-list" width="50%">
        <p>最近一次分发时间</p>
        <el-date-picker v-model="search.updateTime" type="daterange" align="left" unlink-panels range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" size="small">
        </el-date-picker>
      </div>
      <div class="soso-bar">
        <el-button class="soso-an" type="info" plain size="small" @click="$emit('resetSelect')">重置</el-button>
        <el-button class="soso-an" type="primary" plain size="small" @click="$emit('submitSelect')">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlatformList } from "@/api/channelCenter";
export default {
  props: ["search"],
  data() {
    return {
      platformList: [],
      pickerOptions2: {
        //  时间选项
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    this.getPlatformList();
  },
  methods: {
    // 获取传播平台列表
    getPlatformList() {
      getPlatformList({})
        .then(res => {
          this.platformList = res.data;
        })
        .catch(err => console.error(err));
    }
  }
};
</script>
