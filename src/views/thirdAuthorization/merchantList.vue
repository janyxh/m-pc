<template>
  <div class="service-list-page">
    <div class="list-screening">
      <div class="list-tatol">全部（{{listData.totalCount}}）</div>
      <div class="list-tatol" @click="isOpenScreen">
        筛选条件
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </div>
      <el-button @click="openbandPop" class="add-an" type="primary" size="small">绑定商户号</el-button>
      <el-input
        placeholder="请输入关键字"
        v-model="keyword"
        class="input-with-select screen-input"
        size="small"
      >
        <el-select class="screen-input2" v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="按微信主体名称" value="1"></el-option>
        </el-select>
        <el-button slot="append" @click="sosoList" icon="el-icon-search"></el-button>
      </el-input>

      <div class="screen-bar" v-show="isShowScreenList">
        <div class="screen-bar-nr">
          <div class="screen-list">
            <p>微信主体类型</p>
            <el-select v-model="mainType" placeholder="请选择" size="small">
              <el-option label="全部" :value="99"></el-option>
              <el-option label="服务号" :value="1"></el-option>
              <el-option label="小程序" :value="2"></el-option>
            </el-select>
          </div>
          <div class="soso-bar">
            <el-button class="soso-an" @click="reset" type="info" plain size="small">重置</el-button>
            <el-button class="soso-an" @click="sosoList" type="primary" plain size="small">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="list-content">
      <div class="content-tips" v-if="isShowTips">
        微信支付交易发起依赖于公众号、小程序、移动应用（即APPID）与商户号（即MCHID）的绑定关系，因此商户在完成签约后，需要确认当前商户号同 appid的绑定关系，方可使用。
        <span
          class="look2 cp"
          @click="openZyDoc"
        >授权绑定指引</span>
        <i @click="closeTips" class="el-icon-close"></i>
      </div>
      <el-table
        :data="tableData"
        v-loading="fullscreenLoading"
        header-cell-class-name="table-title"
        style="width: 100%"
      >
        <el-table-column label="微信主体名称（公众号、小程序）" width="300">
          <template slot-scope="scope">
            <img class="photo-img" :src="scope.row.headImg">
            <p class="table-name">{{scope.row.nickName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="微信主体类型">
          <template slot-scope="scope">
            <p>{{typeArr[Number(scope.row.authType)]}}</p>
          </template>
        </el-table-column>
        <el-table-column label="商户号">
          <template slot-scope="scope">
            <p>{{scope.row.merchantsAppid}}</p>
          </template>
        </el-table-column>
        <el-table-column label="商户简称">
          <template slot-scope="scope">
            <p>{{scope.row.merchantsShortName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="企业全称">
          <template slot-scope="scope">
            <p>{{scope.row.merchantsName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <p class="color3">{{scope.row.merchantsNote?scope.row.merchantsNote:"--"}}</p>
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
                <span @click.stop="details(scope.row)">查看</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">登录商户号</el-dropdown-item>
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
            :current-page="this.pageNumber"
            background
            layout="prev, pager, next"
            :total="listData.totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--删除-->
    <el-dialog title="删除" :visible.sync="isDelete" width="460px" @close="resetDisabled">
      <div class="cancel-at2">
        <div class="at-left">
          <i class="el-icon-warning"></i>
        </div>
        <div class="at-right">
          <p>您确定要从平台删除该商户号吗？</p>
          <p>
            <el-checkbox v-model="isChecked">是的，我要删除</el-checkbox>
          </p>
        </div>
        <div class="zs">* 删除不会影响该商户号与微信服务号或小程序等微信主体的绑定关系</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDelete = false" size="small">取 消</el-button>
        <el-button
          type="primary"
          @click="_delMerchantNumber"
          size="small"
          :disabled="!isChecked"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--查看详情-->
    <el-dialog
      class="details-dialog"
      @close="clearData"
      title="绑定商户号"
      :visible.sync="isShowDetails"
      width="720px"
    >
      <div class="details-bar">
        <h3>
          <i></i>选择已绑定的服务号/小程序
        </h3>
        <ul class="md-list">
          <li v-if="detailsDsb">
            <label>微信主体</label>
            <p>{{mainContent}}</p>
          </li>
          <li v-else>
            <label>*微信主体</label>
            <el-select
              v-model="mainContent"
              @change="setInfo"
              placeholder="请选择"
              size="small"
              :disabled="detailsDsb"
            >
              <el-option
                v-for="(item, index) in appWxList"
                :key="index"
                :label="item.nickName"
                :value="item.authorizationAppid"
              ></el-option>
            </el-select>
          </li>
          <li>
            <label>主体类型</label>
            <p>{{typeArr[selectData.authType]}}</p>
          </li>
          <li>
            <label>企业主体</label>
            <p>{{selectData.principalName}}</p>
          </li>
          <li>
            <label>公众平台</label>
            <p>
              <a href="https://mp.weixin.qq.com/" target="_blank">https://mp.weixin.qq.com/</a>
            </p>
          </li>
        </ul>
        <h3>
          <i></i>商户号
        </h3>
        <ul class="md-list mb0" v-show="!detailsDsb">
          <li>
            <label>绑定方式</label>
            <el-radio-group v-model="isNewMerchant" @change="reSetInfo">
              <el-radio :label="1">新的商户号</el-radio>
              <el-radio :label="2">已有商户号</el-radio>
            </el-radio-group>
          </li>
        </ul>
        <ul class="md-list" v-if="isNewMerchant === 1">
          <li>
            <label>*商户号</label>
            <el-input maxlength="20" v-model="merchantNo" placeholder="请输入商户号" size="small"></el-input>
          </li>
          <li>
            <label>商户简称</label>
            <el-input v-model="merchantJc" maxlength="20" placeholder="请输入商户简称" size="small"></el-input>
          </li>
          <li>
            <label>企业全称</label>
            <el-input v-model="merchantQc" maxlength="20" placeholder="请输入企业全称" size="small"></el-input>
          </li>
          <li>
            <label>公众平台</label>
            <p>
              <a href="https://pay.weixin.qq.com/" target="_blank">https://pay.weixin.qq.com/</a>
            </p>
          </li>
        </ul>
        <ul class="md-list" v-else>
          <li>
            <label>*商户号</label>
            <el-select
              v-model="merchantNo"
              @change="setMerchantInfo"
              placeholder="请选择"
              size="small"
              :disabled="detailsDsb"
            >
              <el-option
                v-for="(item, index) in shhList"
                :key="index"
                :label="item.merchantsAppid"
                :value="item.merchantsAppid"
              ></el-option>
            </el-select>
          </li>
          <li>
            <label>商户简称</label>
            <el-input v-model="merchantJc" maxlength="20" placeholder="请输入商户简称" size="small"></el-input>
          </li>
          <li>
            <label>企业全称</label>
            <el-input v-model="merchantQc" maxlength="20" placeholder="请输入商户简称" size="small"></el-input>
          </li>
          <li>
            <label>公众平台</label>
            <p>
              <a href="https://pay.weixin.qq.com/" target="_blank">https://pay.weixin.qq.com/</a>
            </p>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="_delMerchantNumber" size="small">删除</el-button>
        <el-button type="primary" @click="bindMerchant" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getMerchantList,
  bindMerchantNumber,
  gitWxGzhList,
  delMerchantNumber,
  gitWxAppList,
  gitMerchantList
} from "@/api/thirdAuthorization/third";
export default {
  data() {
    return {
      regx: /^[0-9]+$/,
      mainContent: "",
      type: "1",
      keyword: "",
      isNewMerchant: 1,
      mainType: 99,
      fullscreenLoading: false,
      detailsDsb: false,
      isShowDetails: false,
      isChecked: false,
      isDelete: false,
      isShowTips: true,
      merchantNo: "",
      merchantJc: "",
      merchantQc: "",
      isShowScreenList: false,
      shhList: [],
      appWxList: [],
      selectData: {},
      curItem: {},
      detailsData: {},
      listData: {
        totalCount: 280
      },
      pageNumber: 1,
      typeArr: ["", "服务号", "小程序"],
      tableData: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    resetDisabled() {
      this.isChecked = false;
    },
    /**
     * 获取列表
     */
    getList() {
      this.fullscreenLoading = true;
      let getData = {
        nickName: this.keyword,
        authType: this.mainType,
        pageNumber: this.pageNumber,
        pageSize: 8
      };
      if (getData.authType === 99) {
        delete getData.authType;
      }
      if (!getData.nickName) {
        delete getData.nickName;
      }
      getMerchantList(getData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.fullscreenLoading = false;
            this.isShowScreenList = false;
            this.listData = res.data;
            this.tableData = res.data.items || [];
          }
        })
        .catch(err => console.error(err));
    },
    sosoList() {
      this.pageNumber = 1;
      this.getList();
    },
    reset() {
      this.keyword = "";
      this.mainType = 99;
      this.getList();
    },
    /**
     * 分页
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.getList();
    },
    /**
     * 打开隐藏筛选条件
     */
    isOpenScreen() {
      this.isShowScreenList = !this.isShowScreenList;
    },
    /**
     * 关闭提示
     */
    closeTips() {
      this.isShowTips = false;
    },
    openZyDoc() {
      open("https://pay.weixin.qq.com/static/pay_setting/appid_protocol.shtml");
    },
    /**
     * 绑定商户号
     */
    openbandPop() {
      //获取公众号列表
      gitWxGzhList({})
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            console.log(res.data);
            this.appWxList = res.data || [];
          }
        })
        .catch(err => console.error(err));
      //获取小程序列表
      gitWxAppList({})
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            let data = res.data || [];
            this.appWxList = this.appWxList.concat(data);
            console.log(">>", this.appWxList);
          }
        })
        .catch(err => console.error(err));
      //获取商户号列表
      gitMerchantList({})
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            console.log(res.data);
            this.shhList = res.data;
          }
        })
        .catch(err => console.error(err));
      this.isShowDetails = true;
      this.detailsDsb = false;
    },
    //获取之后设置其他信息
    setInfo() {
      console.log(this.mainContent);
      this.selectData = this.appWxList.find(item => {
        return item.authorizationAppid === this.mainContent;
      });
      console.log(this.selectData);
    },
    setMerchantInfo() {
      let arr = this.shhList.find(item => {
        return item.merchantsAppid === this.merchantNo;
      });
      this.merchantJc = arr.merchantsShortName;
      this.merchantQc = arr.merchantsName;
    },
    // 绑定
    bindMerchant() {
      let setData = {
        authType: this.selectData.authType,
        authrozierAppId: this.selectData.authorizationAppid,
        merchantsAppid: this.merchantNo,
        merchantsShortName: this.merchantJc,
        merchantsName: this.merchantQc
      };
      console.log(setData);
      if (!setData.authrozierAppId) {
        this.$message.warning("请选择微信主体！");
        return;
      } else if (!setData.merchantsAppid) {
        this.$message.warning("商户号不能为空！");
        return;
      } else if (!this.regx.test(setData.merchantsAppid)) {
        this.$message.warning("商户号只能为数字！");
        return;
      }
      bindMerchantNumber(setData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("绑定成功！");
            this.isShowDetails = false;
            this.getList();
            this.mainContent = "";
            this.selectData.authType = "";
            this.selectData.principalName = "";
            this.merchantNo = "";
            this.merchantJc = "";
            this.merchantQc = "";
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
     * 查看详情
     */
    details(row) {
      console.log(row);
      this.isShowDetails = true;
      this.isNewMerchant = 1;
      this.detailsDsb = true;
      this.mainContent = row.nickName;
      this.selectData.authType = row.authType;
      this.selectData.principalName = row.principalName;
      this.selectData.authorizationAppid = row.authorizerAppid;
      this.merchantNo = row.merchantsAppid;
      this.merchantJc = row.merchantsShortName;
      this.merchantQc = row.merchantsName;
    },
    clearData() {
      this.mainContent = "";
      this.selectData.authType = "";
      this.selectData.principalName = "";
      this.merchantNo = "";
      this.merchantJc = "";
      this.merchantQc = "";
    },
    reSetInfo() {
      this.merchantNo = "";
      this.merchantJc = "";
      this.merchantQc = "";
    },
    /**
     * 单行操作
     */
    handleCommand(command) {
      if (command === "a") {
        window.open(
          "https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F"
        );
      } else if (command === "b") {
        this.isDelete = true;
      }
    },
    _delMerchantNumber() {
      let data = {
        id: this.curItem.id
      };
      delMerchantNumber(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("删除成功！");
            this.isDelete = false;
            this.isShowDetails = false;
            this.getList();
          }
        })
        .catch(err => console.error(err));
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/css/thirdAuthorization/index.scss";
</style>
