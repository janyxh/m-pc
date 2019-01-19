<template>
  <!-- 佣金提示 -->
  <div class="commission">
    <div class="list-screening">
      <div class="list-tatol">全部（{{listData.totalCount}}）</div>
      <div class="list-tatol" @click="isOpenScreen">
        筛选条件
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </div>
      <el-button class="add-an" @click="openExport" type="primary" size="small">导出所查数据</el-button>
      <el-button class="add-an" @click="openExport" type="primary" size="small" plain>查看已导出列表</el-button>
      <el-input
        placeholder="请输入关键字"
        v-model="keyword"
        class="input-with-select screen-input"
        size="small"
      >
        <el-select class="screen-input2" v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="按分销员手机号" value="1"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <div class="screen-bar" v-show="isShowScreenList">
        <div class="screen-bar-nr">
          <div class="screen-list">
            <p>分销员等级</p>
            <el-select v-model="mainType" placeholder="请选择内容" size="small">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="普通分销员" :value="1"></el-option>
              <el-option label="青铜分销员" :value="2"></el-option>
              <el-option label="白银分销员" :value="3"></el-option>
              <el-option label="黄金分销员" :value="4"></el-option>
              <el-option label="钻石分销员" :value="5"></el-option>
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
            <el-button class="soso-an" type="info" plain size="small">重置</el-button>
            <el-button class="soso-an" type="primary" plain size="small">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="list-content">
      <div class="c-top">
        <div class="ct-left">
          待结算佣金+可提现佣金约计:
          <b>￥3.15</b>
          <span>余额不足，请及时充值</span>
        </div>
        <ul class="c-right">
          <li>切换商户号</li>
          <li>自动提现已开启</li>
        </ul>
        <el-button class="top-an" @click="openRecharge" type="primary" size="small">立即充值</el-button>
      </div>
      <div class="content-bar">
        <el-table :data="tableData" header-cell-class-name="table-title" style="width: 100%">
          <el-table-column label="分销员">
            <template slot-scope="scope">
              <p>{{scope.row.name}}</p>
              <p>{{scope.row.phone}}</p>
            </template>
          </el-table-column>
          <el-table-column label="已结佣">
            <template slot-scope="scope">
              <p class="color1">￥{{scope.row.paidMoney}}</p>
            </template>
          </el-table-column>
          <el-table-column label="待结算">
            <template slot-scope="scope">
              <p class="color2">￥{{scope.row.settlementMoney}}</p>
            </template>
          </el-table-column>
          <el-table-column label="可提现">
            <template slot-scope="scope">
              <p>￥{{scope.row.extractMoney}}</p>
            </template>
          </el-table-column>
          <el-table-column label="当前提现账户" width="220">
            <template slot-scope="scope">
              <el-popover placement="top" popper-class="tipss" width="600" trigger="hover">
                <el-table :data="gridData" header-cell-class-name="table-title">
                  <el-table-column width="230" property="name" label="账户名"></el-table-column>
                  <el-table-column width="210" property="date" label="最近一次绑定时间"></el-table-column>
                  <el-table-column width="160" property="money" label="历史提现金额"></el-table-column>
                </el-table>
                <p class="cp" slot="reference">
                  {{scope.row.actName}}
                  <i class="el-icon-arrow-down"></i>
                </p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="提现申请金额">
            <template slot-scope="scope">
              <el-popover placement="top" popper-class="tipss" width="420" trigger="hover">
                <el-table :data="gridData2" header-cell-class-name="table-title">
                  <el-table-column width="210" property="date" label="提现申请时间"></el-table-column>
                  <el-table-column width="200" property="money" label="当次申请提现金额"></el-table-column>
                </el-table>
                <p class="color3" slot="reference">
                  {{scope.row.applyMoney}}
                  <i class="el-icon-arrow-down"></i>
                </p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <p class="color4" @click="openDetails">提现</p>
            </template>
          </el-table-column>
        </el-table>
        <div class="list-bottom">
          <div class="page-bar">
            <el-pagination
              :pager-count="5"
              :page-size="8"
              @current-change="handleCurrentChange"
              background
              layout="prev, pager, next"
              :total="40"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--查看已导出列表-->
    <el-dialog title="查看已导出列表" :visible.sync="isShowExport" width="720px">
      <div class="export-list">
        <div class="elist">
          <p>
            <i></i>提交时间：2018-11-12 11：32：21
          </p>
          <div class="el-d">导出数据时间范围：2018-10-01 - 2018-12-01
            <div class="an-down">下载</div>
          </div>
        </div>
        <div class="elist">
          <p>
            <i></i>提交时间：2018-11-12 11：32：21
          </p>
          <div class="el-d">导出数据时间范围：2018-10-01 - 2018-12-01
            <div class="an-down">下载</div>
          </div>
        </div>
        <div class="elist">
          <p>
            <i></i>提交时间：2018-11-12 11：32：21
          </p>
          <div class="el-d">导出数据时间范围：2018-10-01 - 2018-12-01
            <div class="an-down">下载</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowExport = false" size="small">取 消</el-button>
        <el-button type="primary" @click="isShowExport = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--充值 -->
    <el-dialog title="充值 " :visible.sync="isShowRecharge" width="720px">
      <div class="recharge-bar">
        <p>
          <i></i>企业账户概况
        </p>
        <table class="r-table">
          <tr class="table-t">
            <td>当前账户可用余额</td>
            <td>可提现佣金和待结算佣金共计</td>
            <td>建议充值金额</td>
          </tr>
          <tr class="table-b">
            <td>¥ 256.00</td>
            <td>¥ 200，560.00</td>
            <td class="cor">¥ 200，560.00</td>
          </tr>
        </table>
        <p>
          <i></i>待充值账户信息
        </p>
        <table class="r-table">
          <tr class="table-t">
            <td>企业名称</td>
            <td>商户简称</td>
            <td>微信支付商户号[MCHID]</td>
          </tr>
          <tr class="table-b2">
            <td>绑定时填写</td>
            <td>绑定时填写</td>
            <td>绑定时填写</td>
          </tr>
        </table>
        <p>
          <i></i>充值操作步骤
          <a href="http://kf.qq.com/faq/140225MveaUz141215MFv6Vb.html" target="_blank">操作指引</a>
        </p>
        <div class="last-d">操作路径： 【登录商户平台->交易中心->资金管理->充值/转入】</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowRecharge = false" size="small">取 消</el-button>
        <el-button type="primary" @click="isShowRecharge = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--提现-->
    <el-dialog class="details-dialog" title="提现" :visible.sync="isShowDetails" width="720px">
      <div class="details-bar">
        <ul class="tx-list">
          <li>
            <div class="tx-left">
              <p>企业账户可用余额</p>
              <div class="t-text">
                <b>￥253.00</b>
                <span>余额不足</span>
              </div>
            </div>
            <div class="tx-right">
              <el-button class="top-an" @click="openRecharge" type="primary" size="small">立即充值</el-button>
            </div>
          </li>
          <li>
            <div class="l-d mt10">分销员</div>
            <div class="l-d cor2">赵提天 | 18929391040</div>
          </li>
          <li>
            <div class="l-d mt10">提现账户</div>
            <div class="l-d cor2">微信支付（东北安琪拉）</div>
          </li>
          <li>
            <div class="l-d mt10">申请提现金额</div>
            <div class="l-d cor2">¥ 220.00</div>
          </li>
          <li>
            <div class="l-d mt10">提现方式</div>
            <div class="l-d cor2">
              <el-radio-group v-model="radio2">
                <el-radio :label="0">线上转账支付</el-radio>
                <el-radio :label="1">线下转账</el-radio>
              </el-radio-group>
            </div>
            <div class="l-dd">
              <label>提现金额</label>
              <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
            </div>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDetails = false" size="small">取消</el-button>
        <el-button type="primary" @click="isShowDetails = false" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "200",
      type: "1",
      keyword: "",
      radio2: 0,
      mainType: 0,
      isShowScreenList: false,
      isShowDetails: false,
      isShowExport: false,
      isShowRecharge: false,
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
      tableData: [
        {
          id: "12321313",
          name: "王小二",
          paidMoney: "1000",
          phone: "138****3445",
          settlementMoney: "5000",
          extractMoney: "100",
          applyMoney: "50000",
          actName: "微信支付（东北安琪拉）"
        },
        {
          id: "12321313",
          name: "王小二",
          paidMoney: "1000",
          phone: "138****3445",
          settlementMoney: "5000",
          extractMoney: "100",
          applyMoney: "50000",
          actName: "微信支付（东北安琪拉）"
        }
      ],
      gridData: [
        {
          date: "2018-11-11 12：32",
          name: "东北安琪拉",
          money: "1518"
        },
        {
          date: "2018-11-11 12：32",
          name: "中路赵云",
          money: "100"
        },
        {
          date: "2018-11-11 12：32",
          name: "爵士乐马",
          money: "500"
        }
      ],
      gridData2: [
        {
          date: "2018-11-11 12：32",
          money: "1518"
        },
        {
          date: "2018-11-11 12：32",
          money: "100"
        },
        {
          date: "2018-11-11 12：32",
          money: "500"
        }
      ],
      listData: {
        totalCount: 280
      }
    };
  },
  created() {},
  methods: {
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
    },
    /**
     * 查看导出列表
     */
    openExport() {
      this.isShowExport = true;
    },
    /**
     * 充值
     */
    openRecharge() {
      this.isShowRecharge = true;
    },
    /**
     * 提现
     */
    openDetails() {
      this.isShowDetails = true;
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
}
</style>
