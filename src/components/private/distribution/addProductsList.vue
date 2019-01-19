<template>
  <div class="add-products-list-page">
    <div class="list-screening">
      <div class="list-tatol">全部（{{listData.totalCount}}）</div>
      <div class="list-tatol" @click="isOpenScreen">
        筛选条件
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </div>
      <el-button class="add-an" @click="openAdd" type="primary" size="small">添加商品</el-button>
      <el-input
        placeholder="请输入关键字"
        v-model="keyword"
        class="input-with-select screen-input"
        size="small"
      >
        <el-select class="screen-input2" v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="按商品名称" value="1"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <div class="screen-bar" v-show="isShowScreenList">
        <div class="screen-bar-nr">
          <div class="screen-list">
            <p>佣金设置</p>
            <el-select v-model="mainType" placeholder="请选择内容" size="small">
              <el-option label="全部" :value="99"></el-option>
              <el-option label="自定义比例" :value="0"></el-option>
              <el-option label="默认比例" :value="1"></el-option>
            </el-select>
          </div>
          <div class="screen-list">
            <p>推广状态</p>
            <el-select v-model="mainType2" placeholder="请选择内容" size="small">
              <el-option label="全部" :value="99"></el-option>
              <el-option label="参与" :value="0"></el-option>
              <el-option label="不参与" :value="1"></el-option>
            </el-select>
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
        <el-table-column label="商品" width="390">
          <template slot-scope="scope">
            <img class="photo-img" :src="scope.row.imgUrl">
            <p class="table-name">{{scope.row.name}}</p>
            <p class="table-price">￥{{scope.row.amount}}</p>
          </template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">
            <p>{{scope.row.inventory}}</p>
          </template>
        </el-table-column>
        <el-table-column label="销量">
          <template slot-scope="scope">
            <p>{{scope.row.salesVolume}}</p>
          </template>
        </el-table-column>
        <el-table-column label="是否参加推广">
          <template slot-scope="scope">
            <p>{{typeArr[scope.row.status]}}</p>
          </template>
        </el-table-column>
        <el-table-column label="销售佣金/邀请奖励佣金">
          <template slot-scope="scope">
            <p>销售佣金：{{scope.row.saleCommissionMinRate===scope.row.saleCommissionMaxRate?scope.row.saleCommissionMaxRate+"%":scope.row.saleCommissionMinRate+"%~"+scope.row.saleCommissionMaxRate+"%"}}</p>
            <p>邀请奖励佣金：{{scope.row.invitationCommissionMinRate===scope.row.invitationCommissionMaxRate?scope.row.invitationCommissionMaxRate+"%":scope.row.invitationCommissionMinRate+"%~"+scope.row.invitationCommissionMaxRate+"%"}}</p>
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
                <span @click.stop="details(scope.row)">设置</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">查看</el-dropdown-item>
                <el-dropdown-item command="b">删除</el-dropdown-item>
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
    <!--删除-->
    <el-dialog title="删除" :visible.sync="isDelete" @close="resetChecked" width="460px">
      <div class="cancel-at2">
        <div class="at-left">
          <i class="el-icon-warning"></i>
        </div>
        <div class="at-right">
          <p>
            删除后，该商品不再出现在推广列表中，但不影响
            已经产生的订单
          </p>
          <p>
            <el-checkbox v-model="isChecked">是的，我要删除</el-checkbox>
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDelete = false" size="small">取 消</el-button>
        <el-button type="primary" @click="delProduct" size="small" :disabled="!isChecked">确 定</el-button>
      </span>
    </el-dialog>
    <!--设置-->
    <el-dialog title="修改商品佣金" :visible.sync="isShowEdit" width="914px">
      <div class="edit-products-pop">
        <div class="e-pop-list">
          <label>推广：</label>
          <el-radio-group v-model="lvInfo.status">
            <el-radio :label="0">参与</el-radio>
            <el-radio :label="1">不参与</el-radio>
          </el-radio-group>
        </div>
        <div class="e-pop-list" v-show="lvInfo.status === 0">
          <label>佣金：</label>
          <el-radio-group v-model="lvInfo.commissionStatus" @change="resetData(curItem)">
            <el-radio :label="0">默认佣金比例</el-radio>
            <el-radio :label="1">自定义佣金比例</el-radio>
          </el-radio-group>
          <el-tooltip placement="top" effect="light">
            <div slot="content">修改商品佣金，你可以让单个
              <br>商品设置不一样的返佣比例
            </div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
        <div class="e-pop-table" v-show="lvInfo.status === 0">
          <el-table
            :data="lvInfo.salesLevelInfoRespVOS"
            header-cell-class-name="table-title"
            border
            style="width: 100%"
          >
            <el-table-column label="分销员等级" width="125">
              <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="销售佣金比例">
              <template slot-scope="scope">
                <el-input
                  class="e-p"
                  v-model="scope.row.salesCommissionRate"
                  :disabled="lvInfo.commissionStatus === 0"
                  size="small"
                ></el-input>
                <label>%</label>
              </template>
            </el-table-column>
            <el-table-column label="邀请奖励佣金比例">
              <template slot-scope="scope">
                <el-input
                  class="e-p"
                  v-model="scope.row.invitationCommissionRate"
                  :disabled="lvInfo.commissionStatus === 0"
                  size="small"
                ></el-input>
                <label>%</label>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="e-pop-table fl-r" v-show="lvInfo.status === 0">
          <el-table
            :data="lvInfo.salesLevelInfoRespVOS"
            header-cell-class-name="table-title"
            border
            style="width: 100%"
          >
            <el-table-column label="分销员等级" width="125">
              <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="预计销售佣金比例">
              <template slot-scope="scope">
                <p class="h32">￥{{(Number(scope.row.salesCommissionRate)*dNum/100).toFixed(2)}}</p>
              </template>
            </el-table-column>
            <el-table-column label="预计邀请奖励佣金比例">
              <template slot-scope="scope">
                <p class="h32">￥{{(Number(scope.row.invitationCommissionRate)*dNum/100).toFixed(2)}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="clear"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false" size="small">取 消</el-button>
        <el-button type="primary" @click="keepEdit" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加商品-->
    <el-dialog title="添加商品" :visible.sync="isShowAdd" width="720px">
      <div class="add-pop">
        <div class="add-top">
          <div class="a-t-left">
            已经选择
            <span>{{this.selectProducts.length}}</span> 项
          </div>
          <el-input
            placeholder="请输入关键字"
            v-model="cName"
            class="input-with-select screen-input"
            size="small"
          >
            <el-select class="screen-input2" v-model="type" slot="prepend" placeholder="请选择">
              <el-option label="按商品名称" value="1"></el-option>
            </el-select>
            <el-button slot="append" @click="openAdd" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-table
          :data="commodityList"
          height="400"
          header-cell-class-name="table-title"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column label="商品" width="420">
            <template slot-scope="scope">
              <img class="photo-img" :src="scope.row.imgUrl">
              <p class="table-name">{{scope.row.name}}</p>
              <p class="table-price">￥{{scope.row.amount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="库存">
            <template slot-scope="scope">
              <p>{{scope.row.inventory}}</p>
            </template>
          </el-table-column>
        </el-table>
        <p class="tips">
          <i></i>注：仅显示未添加的商品
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false" size="small">取 消</el-button>
        <el-button type="primary" @click="trueAdd" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  delCommodityContent,
  pageCompCommodity,
  pageCommodity,
  addCommodityToContent,
  queryCommodityLevel,
  setCommodityLevel
} from "@/api/distribution/index";
export default {
  data() {
    return {
      type: "1",
      id: "",
      keyword: "",
      cName: "",
      dNum: "",
      lvInfo: {},
      pageNumber: 1,
      mainType: 99,
      mainType2: 99,
      isShowAdd: false,
      isShowEdit: false,
      isDelete: false,
      detailsDsb: false,
      isChecked: false,
      isShowScreenList: false,
      curItem: {},
      detailsData: {},
      selectProducts: [],
      commodityList: [],
      isCan: 1,
      isCustom: 1,
      listData: {
        totalCount: 0
      },
      typeArr: ["参与", "不参与"],
      ruleData: [
        {
          id: 1,
          name: "普通分销员",
          bonus: 2,
          Commission: 8
        },
        {
          id: 2,
          name: "青铜分销员",
          bonus: 3,
          Commission: 10
        },
        {
          id: 1,
          name: "白银分销员",
          bonus: 4,
          Commission: 12
        }
      ],
      tableData: []
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getProList();
  },
  methods: {
    /**
     * 获取分销商品列表
     */
    getProList() {
      let data = {
        contentId: this.id,
        name: this.keyword,
        commissionStatus: this.mainType,
        status: this.mainType2,
        pageNumber: this.pageNumber,
        pageSize: 10
      };
      if (data.commissionStatus === 99) {
        delete data.commissionStatus;
      }
      if (data.status === 99) {
        delete data.status;
      }
      pageCompCommodity(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            let list = res.data.items.map(item => {
              item.saleCommissionMinRate = Number(item.saleCommissionMinRate);
              item.saleCommissionMaxRate = Number(item.saleCommissionMaxRate);
              item.invitationCommissionMinRate = Number(
                item.invitationCommissionMinRate
              );
              item.invitationCommissionMaxRate = Number(
                item.invitationCommissionMaxRate
              );
              return item;
            });
            this.listData = res.data;
            this.tableData = list || [];
            console.log(this.tableData);
          }
        })
        .catch(err => console.error(err));
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
    },
    /**
     * 添加商品
     */
    openAdd() {
      this.isShowAdd = true;
      let data = {
        contentId: this.id,
        name: this.cName,
        pageNumber: 1,
        pageSize: 50
      };
      pageCommodity(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.commodityList = res.data.items || [];
          }
        })
        .catch(err => console.error(err));
    },
    handleSelectionChange(val) {
      this.selectProducts = val.map(item => {
        return item.id;
      });
      console.log(this.selectProducts);
    },
    trueAdd() {
      let data = {
        commodityIds: this.selectProducts,
        contentId: this.id
      };
      addCommodityToContent(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("添加成功！");
            this.getProList();
            this.isShowAdd = false;
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 打开下拉
     */
    setItem(item) {
      this.curItem = item;
    },
    /**
     * 设置》查询商品等级信息
     */
    details(row) {
      this.curItem = row;
      console.log(row);
      this.isShowEdit = true;
      this.dNum = row.amount;
      let data = {
        commissionStatus: row.commissionStatus,
        commodityContentRelationId: row.id,
        contentId: this.id
      };
      queryCommodityLevel(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            console.log(res.data);
            let data = res.data;
            data.status = row.status;
            this.lvInfo = data;
          }
        })
        .catch(err => console.error(err));
    },
    // 根据选项重置比例
    resetData(row) {
      let data = {
        commissionStatus: this.lvInfo.commissionStatus,
        commodityContentRelationId: row.id,
        contentId: this.id
      };
      queryCommodityLevel(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            console.log(res.data);
            let data = res.data;
            data.status = row.status;
            this.lvInfo = data;
          }
        })
        .catch(err => console.error(err));
    },
    // 保存编辑
    keepEdit() {
      let data = {
        commodityContentRelationId: this.curItem.id,
        contentId: this.id,
        commissionStatus: this.lvInfo.commissionStatus,
        status: this.lvInfo.status,
        setLevelInfoReqVOS: this.lvInfo.salesLevelInfoRespVOS
      };
      setCommodityLevel(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            console.log(res.data);
            this.$message.success("保存成功！");
            this.isShowEdit = false;
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 单行操作
     */
    handleCommand(command) {
      if (command === "a") {
        open(
          "https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F"
        );
      } else if (command === "b") {
        this.isDelete = true;
      }
    },
    /**
     * 删除商品
     */
    delProduct() {
      let data = {
        contentId: this.id,
        commodityId: this.curItem.commodityId
      };
      delCommodityContent(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("删除成功！");
            this.getProList();
            this.isDelete = false;
          }
        })
        .catch(err => console.error(err));
    },
    resetChecked() {
      this.isShowAdd;
    }
  }
};
</script>
<style lang="scss">
@import "../../../assets/css/distribution/index.scss";
</style>
