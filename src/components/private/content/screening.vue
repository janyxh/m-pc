<template>
  <div class="screen-bar select-panel">
    <div class="screen-bar-nr">
      <div class="screen-list">
        <p>内容状态</p>
        <el-select v-model="search.status" placeholder="请选择内容状态" size="small" clearable>
          <el-option value="" label="全部"></el-option>
          <el-option :value="0" label="草稿"></el-option>
          <el-option :value="1" label="已发布"></el-option>
          <el-option :value="2" label="已关联"></el-option>
        </el-select>
      </div>
      <div class="screen-list">
        <p>模板功能</p>
        <el-select v-model="search.contentTypeId" placeholder="请选择模板功能" size="small" clearable>
          <el-option value="" label="全部"></el-option>
          <el-option v-for="item in typeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="screen-list">
        <p>最近一次互动时间</p>
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
import { getContentTypeList } from "@/api/content";
export default {
  props: ["search"],
  data() {
    return {
      typeList: [],
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
    this.getContentTypeList();
  },
  methods: {
    // 获取模板功能分类列表
    getContentTypeList() {
      getContentTypeList({})
        .then(res => {
          this.typeList = res.data;
        })
        .catch(err => console.error(err));
    }
  }
};
</script>
