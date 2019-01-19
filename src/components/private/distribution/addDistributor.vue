<template>
  <div class="add-products-list-page">
    <div class="list-screening">
      <div class="list-tatol">全部（{{listData.totalCount}}）</div>
      <div class="list-tatol" @click="isOpenScreen">
        筛选条件
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </div>
      <el-button class="add-an" @click="openAdd" type="primary" size="small">邀请分销员</el-button>
      <el-badge :value="notList.length" class="add-an">
        <el-button class="add-an mp0" @click="openExamine" type="primary" size="small" plain>审核信息</el-button>
      </el-badge>
      <el-input
        placeholder="请输入关键字"
        v-model="keyword"
        class="input-with-select screen-input"
        size="small"
      >
        <el-select class="screen-input2" v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="按分销员手机号" value="1"></el-option>
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
            <el-button class="soso-an" type="info" plain size="small">重置</el-button>
            <el-button class="soso-an" type="primary" plain size="small">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="list-content">
      <el-table :data="tableData" header-cell-class-name="table-title" style="width: 100%">
        <el-table-column label="分销员">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p>{{scope.row.phone}}</p>
          </template>
        </el-table-column>
        <el-table-column label="微信信息 " width="300">
          <template slot-scope="scope">
            <img class="photo-img2" src="@/assets/images/audience/photo.png">
            <p class="table-name2">{{scope.row.nickName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="分销员等级">
          <template slot-scope="scope">
            <p>{{scope.row.levelName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="邀请方">
          <template slot-scope="scope">
            <p>{{scope.row.inviteName}}</p>
            <p>{{scope.row.invitePhone}}</p>
          </template>
        </el-table-column>
        <el-table-column label="累计成交">
          <template slot-scope="scope">
            <p>累计成交订单数：{{scope.row.orderCount}}</p>
            <p>累计成交金额：¥{{scope.row.orderAmount}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-dropdown
              @command="handleCommand"
              trigger="click"
              @visible-change="setItem(scope.row)"
            >
              <div class="xl-bar">
                <span @click.stop="details(scope.row)">等级设置</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">清退</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
            :total="listData.totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--清退-->
    <el-dialog title="清退" :visible.sync="isDelete" width="460px">
      <div class="cancel-at2">
        <div class="at-left">
          <i class="el-icon-warning"></i>
        </div>
        <div class="at-right">
          <p>确定要清退该分销员吗？</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDelete = false" size="small">取 消</el-button>
        <el-button type="primary" @click="isDelete = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--等级设置-->
    <el-dialog title="等级设置" :visible.sync="isShowEdit" width="640px">
      <div class="lv-setting-pop">
        <div class="tips">
          可以通过该功能，手动对分销员执行升级或降级；重新设置等级后，该分销员的累计推广金和累计个人消费金
          将重新计算
        </div>
        <ul class="set-list">
          <li>
            <label>原等级：</label>
            <el-input v-model="oldLv" :disabled="true" size="small"></el-input>
          </li>
          <li>
            <label>新设等级：</label>
            <el-select v-model="newLv" placeholder="请选择" size="small">
              <el-option
                v-for="item in commission"
                :key="item.value"
                :label="item.name"
                :value="item.id"
                :disabled="item.isDisabled"
              ></el-option>
            </el-select>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false" size="small">取 消</el-button>
        <el-button type="primary" @click="setNewLevel" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--邀请分销员-->
    <el-dialog title="邀请分销员" :visible.sync="isShowAdd" width="720px">
      <div class="add-pop-fxy">
        <div class="img-bar">
          <h5>小程序</h5>
          <img src="@/assets/images/content/qr_code.png">
          <el-button class="l-an" type="primary" size="small" plain>下载二维码</el-button>
        </div>
        <div class="img-bar">
          <h5>H5</h5>
          <img src="@/assets/images/content/qr_code.png">
          <el-button class="r-an" type="primary" size="small" plain>下载二维码</el-button>
          <el-button class="r-an" size="small" @click="copeAppId()">复制链接</el-button>
          <input class="copeInput" type="text" value="www.baidu.com">
        </div>
        <div class="clear"></div>
        <p>
          <i></i>1.将上列小程序码或者H5二维码发送到微信群、微信好友会话或者朋友圈，可以发展种子分销员。
        </p>
        <p>
          <i></i>2.微信用户扫码后，填写相应资料后即可成为成为分销员/填写相应资料审核通过后即可成为分销员。
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false" size="small">取 消</el-button>
        <el-button type="primary" @click="isShowAdd = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--分销员审核 -->
    <el-dialog title="分销员审核 " :visible.sync="isShowExamine" width="1160px">
      <div class="examine-pop">
        <div class="e-pop-title">
          <div class="t-list">
            <label>审核状态</label>
            <el-select v-model="examineStatus" placeholder="请选择" size="small">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="服务号" :value="1"></el-option>
              <el-option label="小程序" :value="2"></el-option>
            </el-select>
          </div>
          <div class="t-list">
            <label>申请加入时间</label>
            <el-date-picker
              v-model="dateRange2"
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
          <div class="t-list2">
            <el-input
              placeholder="请输入关键字"
              v-model="eKeyword"
              class="input-with-select"
              size="small"
            >
              <el-select class="screen-input2" v-model="eType" slot="prepend" placeholder="请选择">
                <el-option label="按分销员手机" :value="1"></el-option>
                <el-option label="按邀请方手机" :value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <el-table
          :data="notList"
          height="400"
          header-cell-class-name="table-title"
          style="width: 100%"
        >
          <el-table-column label="分销员">
            <template slot-scope="scope">
              <p>{{scope.row.name}}</p>
              <p>{{scope.row.phone}}</p>
            </template>
          </el-table-column>
          <el-table-column label="微信信息" width="200">
            <template slot-scope="scope">
              <img class="photo-img2" src="@/assets/images/audience/photo.png">
              <p class="table-name2">{{scope.row.nickName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="分销员等级">
            <template slot-scope="scope">
              <p>{{scope.row.levelName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="邀请方">
            <template slot-scope="scope">
              <p>{{scope.row.inviteName}}</p>
              <p>{{scope.row.invitePhone}}</p>
            </template>
          </el-table-column>
          <el-table-column label="申请加入时间" width="160">>
            <template slot-scope="scope">
              <p>{{scope.row.createTime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="scope">
              <p v-if="scope.row.status === 0">待审核</p>
              <p v-else-if="scope.row.status === 2">审核不通过</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="110">
            <template slot-scope="scope">
              <p class="color-t1" @click="openStatus(scope.row)" v-if="scope.row.status === 0">审核</p>
              <p
                class="color-t1"
                @click="openStatus(scope.row)"
                v-else-if="scope.row.status === 2"
              >重新审核</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowExamine = false" size="small">取 消</el-button>
        <el-button type="primary" @click="isShowExamine = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--审核-->
    <el-dialog title="审核" :visible.sync="isShowStatus" width="460px">
      <div class="status-pop">
        <el-radio-group v-model="popStatus">
          <el-radio :label="1">审核通过</el-radio>
          <el-radio :label="2">审核不通过</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowStatus = false" size="small">取 消</el-button>
        <el-button type="primary" @click="trueStatus" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getSalesmanList,
  updateSalesmanList,
  getSalesLevelList
} from "@/api/distribution/index";
import moment from "moment";
export default {
  data() {
    return {
      oldLv: "白银会员",
      newLv: "",
      type: "1",
      keyword: "",
      mainType: "",
      pageNumber: 1,
      examineStatus: 0,
      commission: [],
      notList: [],
      eType: 1,
      eKeyword: "",
      dateRange: ["", ""],
      dateRange2: ["", ""],
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
      isShowAdd: false,
      isShowExamine: false,
      isShowEdit: false,
      isDelete: false,
      isShowStatus: false,
      popStatus: "",
      isShowScreenList: false,
      curItem: {},
      curItem2: {},
      detailsData: {},
      isCan: 1,
      isCustom: 1,
      listData: {
        totalCount: 0
      },
      typeArr: ["参与", "不参与"],
      tableData: [],
      tableData2: []
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getDistibutorList();
    this.getNotList();
  },
  methods: {
    /**
     * 审核
     */
    openStatus(row) {
      console.log(row);
      this.curItem2 = row;
      this.popStatus = 1;
      this.isShowStatus = true;
    },
    trueStatus() {
      let data = {
        id: this.curItem2.id,
        contentId: this.id,
        status: this.popStatus
      };
      this.updataSalesman(data);
    },
    /**
     * 获取等级列表
     */
    getLvList() {
      let data = {
        contentId: this.id
      };
      getSalesLevelList(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            let data = res.data;
            let index = data.findIndex(item => {
              return item.name === this.oldLv;
            });
            console.log(index);
            if (index !== -1) {
              data[index].isDisabled = true;
            }
            this.commission = data;
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 获取已审核列表
     */
    getDistibutorList() {
      let data = {
        contentId: this.id,
        phone: this.keyword,
        joinTimeStart: this.dateRange[0],
        joinTimeEnd: this.dateRange[1],
        listStatus: [1],
        levelId: this.mainType,
        pageNumber: this.pageNumber,
        pageSize: 10
      };
      getSalesmanList(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.listData = res.data;
            this.tableData = res.data.items || [];
          }
        })
        .catch(err => console.error(err));
    },
    // 手动搜索
    sosoList() {
      this.pageNumber = 1;
      this.getDistibutorList();
    },
    /**
     * 获取待审核列表
     */
    getNotList() {
      let data = {
        contentId: this.id,
        phone: this.keyword,
        createTimeStart: this.dateRange2[0],
        createTimeEnd: this.dateRange2[1],
        listStatus: [0, 2],
        pageNumber: 1,
        pageSize: 50
      };
      getSalesmanList(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            let data = res.data.items.map(item => {
              item.createTime = moment(item.createTime).format(
                "YYYY-MM-DD HH:MM"
              );
              return item;
            });
            this.notList = data || [];
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 更新分销员
     */
    updataSalesman(data) {
      updateSalesmanList(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("操作成功！");
            this.getDistibutorList();
            this.getNotList();
            this.isShowStatus = false;
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 复制
     */
    copeAppId() {
      let e = document.querySelectorAll(".copeInput")[0];
      e.select();
      document.execCommand("copy");
      this.$message.success("复制成功！");
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
      this.getLvList();
    },
    /**
     * 邀请分销员
     */
    openAdd() {
      this.isShowAdd = true;
    },
    /**
     * 审核分销员
     */
    openExamine() {
      this.isShowExamine = true;
      this.getNotList();
    },
    /**
     * 打开下拉
     */
    setItem(item) {
      this.curItem = item;
    },
    /**
     * 等级设置
     */
    details(row) {
      console.log(row);
      this.curItem = row;
      this.oldLv = row.levelName;
      this.isShowEdit = true;
      this.getLvList();
    },
    setNewLevel() {
      let data = {
        id: this.curItem.id,
        contentId: this.id,
        levelId: this.newLv
      };
      this.updataSalesman(data);
    },
    /**
     * 单行操作
     */
    handleCommand(command) {
      if (command === "a") {
        let data = {
          id: this.curItem.id,
          contentId: this.id,
          deleteFlag: 1
        };
        this.updataSalesman(data);
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../../assets/css/distribution/index.scss";
</style>
