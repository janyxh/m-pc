<template>
  <!-- 业绩统计 -->
  <div class="commission">
    <div class="list-screening">
      <div class="list-tatol">全部（{{listData.totalCount}}）</div>
      <div class="list-tatol" @click="isOpenScreen">
        筛选条件
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </div>
      <el-input
        placeholder="请输入关键字"
        v-model="keyword"
        class="input-with-select screen-input"
        size="small"
      >
        <el-select class="screen-input2" v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="按分销员手机号" :value="1"></el-option>
        </el-select>
        <el-button slot="append" @click="sosoList" icon="el-icon-search"></el-button>
      </el-input>

      <div class="screen-bar" v-show="isShowScreenList">
        <div class="screen-bar-nr">
          <div class="screen-list">
            <p>分销员等级</p>
            <el-select v-model="mainType" placeholder="请选择分销员等级" size="small">
              <el-option
                v-for="item in commission"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="screen-list">
            <p>成为分销员时间</p>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              value-format="yyyy-MM-dd"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
              size="small"
            ></el-date-picker>
          </div>
          <div class="soso-bar">
            <el-button class="soso-an" @click="reset" type="info" plain size="small">重置</el-button>
            <el-button class="soso-an" @click="sosoList" type="primary" plain size="small">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="list-content">
      <div class="content-bar">
        <el-table :data="tableData" header-cell-class-name="table-title" style="width: 100%">
          <el-table-column label="分销员">
            <template slot-scope="scope">
              <p>{{scope.row.name}}</p>
              <p>{{scope.row.phone}}</p>
            </template>
          </el-table-column>
          <el-table-column label="分销员等级">
            <template slot-scope="scope">
              <p>{{scope.row.levelName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="当前客户数  ">
            <template slot-scope="scope">
              <p class="color1">{{scope.row.customerTotal}}</p>
            </template>
          </el-table-column>
          <el-table-column label="下级分销员数">
            <template slot-scope="scope">
              <p>{{scope.row.juniorSalesmanTotal}}</p>
            </template>
          </el-table-column>
          <el-table-column label="累计推广金">
            <template slot-scope="scope">
              <p>{{scope.row.orderAmount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="累计成交金额" align="left">
            <template slot-scope="scope">
              <p>{{scope.row.orderAmount}}</p>
            </template>
          </el-table-column>
        </el-table>
        <div class="list-bottom">
          <div class="page-bar">
            <el-pagination
              :pager-count="5"
              :page-size="8"
              @current-change="handleCurrentChange"
              :current-page="this.pageNumber"
              background
              layout="prev, pager, next"
              :total="listData.totalCount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { achievementList } from "@/api/statistics/index";
import { getSalesLevelList } from "@/api/distribution/index";
export default {
  data() {
    return {
      type: 1,
      keyword: "",
      mainType: "",
      commission: [],
      isShowScreenList: false,
      dateRange: ["", ""],
      pageNumber: 1,
      pickerOptions2: {
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
      },
      tableData: [],
      listData: {
        totalCount: 0
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getOrderList();
    this.getLvList(this.id);
  },
  methods: {
    /**
     * 获取等级列表
     */
    getLvList(id) {
      let data = {
        contentId: id
      };
      getSalesLevelList(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            let data = res.data;
            this.commission = data;
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 获取分销订单列表
     */
    getOrderList() {
      let data = {
        contentId: this.id,
        listStatus: [1],
        selectType: this.type,
        selectValue: this.keyword,
        levelId: this.mainType,
        // startTime: this.dateRange[0],
        // endTime: this.dateRange[1]
        pageNumber: this.pageNumber,
        pageSize: 10
      };
      achievementList(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            let data = res.data;
            this.listData = data;
            this.tableData = data.items || [];
            this.isShowScreenList = false;
            console.log(data);
          }
        })
        .catch(err => console.error(err));
    },
    sosoList() {
      this.pageNumber = 1;
      this.getOrderList();
    },
    reset() {
      this.pageNumber = 1;
      this.type = 1;
      this.keyword = "";
      this.atType = "";
      this.status = "";
      this.dateRange = ["", ""];
      this.getOrderList();
    },
    /**
     * 分页
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNumber = val;
      // this.getList();
    },
    /**
     * 打开隐藏筛选条件
     */
    isOpenScreen() {
      this.isShowScreenList = !this.isShowScreenList;
    }
  }
};
</script>
<style lang="scss">
@import "../../../../assets/css/distribution/data.scss";

.tipss {
  .table-title {
    background: #f5f5f5;
  }
  .mr20 {
    margin-right: 10px;
  }
}
</style>
