<template>
  <!-- 分销订单统计 -->
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
          <el-option label="按订单号" :value="2"></el-option>
        </el-select>
        <el-button slot="append" @click="sosoList" icon="el-icon-search"></el-button>
      </el-input>

      <div class="screen-bar" v-show="isShowScreenList">
        <div class="screen-bar-nr">
          <div class="screen-list">
            <p>返佣状态</p>
            <el-select v-model="status" placeholder="请选择内容" size="small">
              <el-option label="待结算" :value="1"></el-option>
              <el-option label="待结算，部分退款" :value="2"></el-option>
              <el-option label="订单关闭" :value="3"></el-option>
              <el-option label="不结算，订单全额退款" :value="4"></el-option>
              <el-option label="可结算" :value="5"></el-option>
              <el-option label="销售/邀请返利佣金小于1分钱，不计佣金" :value="6"></el-option>
              <el-option label="会员价购买，不计佣金" :value="7"></el-option>
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
          <el-table-column label="订单号">
            <template slot-scope="scope">
              <p class="color4">{{scope.row.tradeNo}}</p>
            </template>
          </el-table-column>
          <el-table-column label="成交金额（不含运费）  ">
            <template slot-scope="scope">
              <p>{{scope.row.amount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="销售佣金 ">
            <template slot-scope="scope">
              <el-popover placement="top" popper-class="tipss" trigger="hover">
                <p>
                  <span class="mr20">{{scope.row.salesmanName}}</span>
                  {{scope.row.salesmanPhone}}
                </p>
                <p
                  slot="reference"
                  v-if="scope.row.brokerageStatus === 1 || scope.row.brokerageStatus === 2 "
                >
                  --
                  <span class="mlr">|</span>
                  --
                </p>
                <p class="cp" slot="reference" v-else>
                  {{scope.row.salesCommissionPercentage}}%
                  <span class="mlr">|</span>
                  ￥{{scope.row.salesCommissionAmount}}
                </p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="邀请奖励佣金">
            <template slot-scope="scope">
              <p v-if="scope.row.brokerageStatus === 1 || scope.row.brokerageStatus === 2 ">
                --
                <span class="mlr">|</span>
                --
              </p>
              <p v-else>
                {{scope.row.invitationCommissionPercentage}}%
                <span class="mlr">|</span>
                ￥{{scope.row.invitationCommissionAmount}}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="返佣状态" align="right">
            <template slot-scope="scope">
              <p class="color1">{{statusText[scope.row.brokerageStatus]}}</p>
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
import { distributionOrderList } from "@/api/statistics/index";
export default {
  data() {
    return {
      id: "",
      type: 1,
      keyword: "",
      status: "",
      statusText: [
        "",
        "待结算",
        "待结算，部分退款",
        "订单关闭",
        "不结算，订单全额退款",
        "可结算",
        "销售/邀请返利佣金小于1分钱，不计佣金",
        "会员价购买，不计佣金"
      ],
      isShowScreenList: false,
      dateRange: ["", ""],
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
      pageNumber: 1,
      listData: {
        totalCount: 0
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getOrderList();
  },
  methods: {
    /**
     * 获取分销订单列表
     */
    getOrderList() {
      let data = {
        contentId: this.id,
        selectType: this.type,
        selectValue: this.keyword,
        brokerageStatus: this.status,
        startTime: this.dateRange[0],
        endTime: this.dateRange[1],
        pageNumber: this.pageNumber,
        pageSize: 10
      };
      distributionOrderList(data)
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
