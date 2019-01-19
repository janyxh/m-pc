<template>
  <div class="list-screening">
    <!-- <div class="list-tatol">全部（280）</div> -->
    <!-- 全部 -->
    <div class="list-tatol">
      <el-dropdown trigger="click" @visible-change="handleAll" @command="handleCommand">
        <span class="el-dropdown-link dropdown-link-all">
          全部({{ pageIndex.total || 0 }})
          <i class="el-icon-arrow-down el-icon--right" :class="{active:isShowAll}"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in dataListGroup" :key="item.id" :command="item.id">{{item.name}}</el-dropdown-item>
          <el-dropdown-item divided>
            <el-button type="primary" @click="openGroup" size="small">管理分组</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="list-tatol">
      <span @click="isOpenScreen" @blur="isCloseScreen" class="dropdown-link-screening">
        筛选条件
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </span>
    </div>
    <el-button v-if="isAddContent" class="add-an" @click="goToUrl" type="primary" plain size="small">前往内容中心</el-button>
    <el-button v-if="isAddContent" @click="addDistribution" class="add-an" type="primary" size="small" :loading="addLoading">新建</el-button>
    <!-- 搜索 -->
    <el-input placeholder="请输入关键字" v-model="search.keyword" class="input-with-select screen-input" size="small"
      clearable>
      <el-select class="screen-input2" v-model="search.searchType" slot="prepend" placeholder="请选择">
        <el-option v-for="item in optionsSearchType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="submitSelect"></el-button>
    </el-input>
    <!-- 分组管理面板 -->
    <group v-show="isShowScreenGroup"></group>
    <!-- 筛选面板 -->
    <screening v-show="isShowScreenList" :search="search" @resetSelect="resetSelect" @submitSelect="submitSelect"></screening>
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";
import { closest } from "@/mixins";
import group from "./group";
import screening from "./screening";
import { addDistributionContent } from "@/api/distribution/index";
export default {
  props: ["pageIndex", "isAddContent"],
  components: {
    group,
    screening
  },
  computed: mapState({
    isShowScreenGroup: "isShowScreenGroup",
    dataListGroup: "groupList",
    search: "search"
  }),
  data() {
    return {
      isShowAll: false,
      isShowScreenList: false, // 是否弹出筛选面板
      addLoading: false,
      // search: {
      //   searchType: 1, // 搜索类型
      //   keyword: "", // 关键字
      //   createUserName: "", // 创建人
      //   title: "", // 内容标题
      //   status: "", // 内容状态
      //   contentTypeId: "", // 模板功能分类id
      //   updateTime: "", // 时间
      //   contentGroupId: "" // 分组id
      // },
      optionsSearchType: [
        // 搜索类型选项
        {
          value: 1,
          label: "按内容名称"
        },
        {
          value: 2,
          label: "按作者名称"
        },
        {
          value: 3,
          label: "按关联营销事情"
        }
      ]
    };
  },
  mounted() {
    document.onclick = e => {
      if (
        !closest(e.target, ".group-panel") &&
        !closest(e.target, ".dropdown-link-all") &&
        !closest(e.target, ".dialog-add-group") &&
        !closest(e.target, ".dialog-del-group")
      ) {
        this.$store.dispatch("closeGroupPanel");
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
    ...mapActions(["openGroupPanel"]),
    handleAll(show) {
      this.isShowAll = show;
    },
    openGroup() {
      this.openGroupPanel();
    },
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
      let search = {
        ...this.$store.state.search
      };
      if (search.updateTime !== "" && search.updateTime.length > 0) {
        search.startTime = moment(search.updateTime[0]).format("YYYY-MM-DD");
        search.endTime = moment(search.updateTime[1]).format("YYYY-MM-DD");
      }
      if (search.searchType === 1) {
        search.title = search.keyword;
        search.createUserName = "";
      } else {
        search.createUserName = search.keyword;
        search.title = "";
      }
      this.$store.commit("setSearch", {
        ...search
      });
      delete search.searchType;
      delete search.keyword;
      delete search.updateTime;
      this.isShowScreenList = false;
      this.pageIndex.pageNumber = 1;
      let params = {
        ...search,
        pageNumber: this.pageIndex.pageNumber,
        pageSize: this.pageIndex.pageSize
      };

      this.$emit("getData", params);
    },
    // 重置
    resetSelect() {
      const pageInit = {
        pageNumber: 1,
        pageSize: 10
      };
      this.$emit("getData", {
        ...pageInit
      });
      this.$emit("resetForm");
      this.isShowScreenList = false;
    },
    // 选择分组筛选
    handleCommand(command) {
      if (command) {
        this.$store.commit("setSearch", {
          contentGroupId: command
        });
        this.submitSelect();
      }
    },
    // 跳转内容中心
    goToUrl() {
      this.$router.push("/content");
    },
    // 新建分销返利
    addDistribution() {
      this.addLoading = true;
      let data = {
        title: "招募令",
        content: `<section data-role="outer" label="Powered by 135editor.com" style="font-size:16px;font-family:微软雅黑;"><p>以下计划说明模板，请根据情况自行修改，仅供参考。</p><p>———————————</p><p><br></p><p>小伙伴，欢迎加入我们</p><p>我们是XXX运营团队，竭诚为你的销售工作提供完善的支持。</p><p><br></p><p>我们诚挚邀请你加入我们的分销员推广计划，无任何成本即可成为XXX的分销员，一起分享收获的喜悦。你只需将高品质商品分享推荐给他人，收获他人的感谢的同时，挣得属于自己的利润。</p><p><br></p><p><br></p><p>1. 业绩说明</p><p>1）买家通过分销员分享链接成交，即算作分销员的业绩；</p><p>2）订单交易完成前发生退款的订单，相应的分销员业绩将扣除相应的退款金额；</p><p>3）仅在线支付的订单算作业绩，不包括货到付款订单。</p><p><br></p><p><br></p><p>2. 结算说明</p><p>1）推广订单金额在XXX元以下，获得X%的业绩提成；</p><p>2）推广订单金额在XXX元～XXX元之间，获得X%的业绩提成；</p><p>3）推广订单金额在XXX元～XXX元之间，获得X%的业绩提成；</p><p>4）每月XX号前，我们将会和各分销员核算业绩；</p><p>5）每月XX号前，我们会将业绩奖励打入各分销员提供的银行账号。</p><p><br></p><p><br></p><p>3. 其他说明</p><p>1）分享前，请确定商品页面有【···】按钮；</p><p>2）销售过程中有任何疑问，请直接在微信公众号内询问或直接致电；</p><p>3）已售出商品的任何售后问题，由本商城处理；</p><p>4）不传播或者扩散有关于政治、色情等任何违法的信息，一经发现，直接踢你出局，如果触犯任何法律相关问题，商城不负任何责任；</p><p>5）以上内容解释权归本商城所有。</p><p><br></p><p><br></p><p>4. 联系方式</p><p>1）联络人：XXX</p><p>2）手机：1234567889</p><p>3）分销员QQ交流群：12345678</p><p>4）邮箱：xxx@xxx.com</p><p>无论是销售、对账，还是结算问题，请通过以上方式咨询。</p><p><br></p></section>`,
        contentTypeId: 1,
        posterStyle: 1,
        contentGroupId: "153583152126754816",
        invitationStyle: 1,
        posterNicknameColor: "#0B132E",
        invitationFontColor: "#ffffff",
        invitationCopywriting: "邀你一起加入，推广赢奖励",
        invitationNicknameColor: "#0B132E"
      };
      addDistributionContent(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.addLoading = false;
            let contentId = res.data.contentId;
            this.$router.push({
              name: "addDistribution",
              query: {
                id: contentId
              }
            });
          }
        })
        .catch(err => console.error(err));
    }
  }
};
</script>
