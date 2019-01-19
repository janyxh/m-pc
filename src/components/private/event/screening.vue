<template>
  <div class="screen-bar select-panel">
    <div class="screen-bar-nr">
      <div class="screen-list">
        <p>状态</p>
        <el-select v-model="search.status" placeholder="请选择状态" size="small" clearable>
          <el-option value="" label="全部"></el-option>
          <el-option :value="0" label="草稿"></el-option>
          <el-option :value="1" label="未开始"></el-option>
          <el-option :value="2" label="进行中"></el-option>
          <el-option :value="3" label="已结束"></el-option>
          <el-option :value="4" label="归档"></el-option>
        </el-select>
      </div>
      <div class="screen-list">
        <p>分类</p>
        <el-select v-model="search.type" placeholder="请选择分类" size="small" clearable>
          <el-option value="" label="全部"></el-option>
          <el-option :value="0" label="我创建的"></el-option>
          <el-option :value="1" label="我参数的"></el-option>
          <el-option :value="2" label="我旁观的"></el-option>
        </el-select>
      </div>
      <div class="screen-list">
        <p>创建时间</p>
        <el-date-picker v-model="search.createTime" type="daterange" align="left" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                        placeholder="请选择日期" size="small" >
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
export default {
  props: ["search"],
  data() {
    return {
        pickerOptions: {
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
  },
  methods: {
  }
};
</script>


<style lang="scss">
  .el-input__prefix {
    right: -20px;
    text-align: right;
  }
</style>


