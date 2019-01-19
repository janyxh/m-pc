<template>
  <section class="rule-page">
    <h2>分销员招募与管理</h2>
    <ul class="rule-list">
      <li>
        <label>邀请奖励：</label>
        <el-radio-group v-model="contentData.invitationReward">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
        <p>开启后，分销员可邀请好友成为其下级分销员。当下级分销员的客户发生购买，上级分销员可获得邀请奖励。简单说，开启时则是二级分销；关闭则为一级分销。</p>
      </li>
      <li>
        <label>分销员招募：</label>
        <el-radio-group v-model="contentData.salesmanRecruit">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
        <p>关闭后，用户无法通过“分销员招募手册页面”或者邀请好友加入，成为分销员；仅能通过“分销员”界面进行设置。</p>
      </li>
      <li>
        <label>分销员审核：</label>
        <el-radio-group v-model="contentData.audit">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
        <p>开启分销员审核功能后，消费者申请成为分销员需要经过运营在PC后台审核。相当于设了个门槛，可 以帮你调控分销员规模、人员品质，把握整体的佣金成本。</p>
      </li>
      <li>
        <label>链接有效期设置：</label>
        <el-radio-group v-model="contentData.termOfValidity">
          <el-radio :label="0">短期15天</el-radio>
          <el-radio :label="1">永久</el-radio>
        </el-radio-group>
        <span @click="openDocPop">详细说明</span>
        <p>短期15天：客户访问分销员的推广链接，若15天内发生了购买将计入分销员的业绩；超出15天，该客户的所有购买将不再计入分销员的业绩。永久：客户访问分销员的推广链接，发生的购买不受时间限制，都计入分销员的业绩。</p>
      </li>
      <li>
        <label>分销员保护期：</label>
        <el-checkbox v-model="contentData.protectedPeriodSet">开启分销员保护期</el-checkbox>
        <span @click="openDocPop">详细说明</span>
        <div class="bhq">
          <el-input v-model="contentData.protectedPeriod" size="small"></el-input>
          <span>天内，分销员发展的客户不会变更绑定关。</span>
        </div>
        <p>开启分销员保护期设置后，在保护期内，分销员发展的客户不会变更绑定关系。在此期间，如果分销员与客户保持持续互动，则保护期将被顺延。</p>
      </li>
      <li>
        <label>分销员建立客户关系：</label>
        <el-radio-group v-model="contentData.salesmanCustomerRelation">
          <el-radio :label="0">允许</el-radio>
          <el-radio :label="1">不允许</el-radio>
        </el-radio-group>
        <p>设置允许后，商家允许分销员之间建立客户关系，即分销员下单会对其上级分销员记销售佣金；设置为不允许，则分销员自己下单，自己可以获得销售佣金，而上级仅获得邀请奖励佣金。</p>
      </li>
    </ul>
    <h2>佣金结算与发放</h2>
    <ul class="rule-list">
      <li>
        <label>分销员购买权限：</label>
        <el-radio-group v-model="contentData.salesmanPurchase">
          <el-radio :label="0">开启</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
        <p>开启后，分销员即与自己绑定客户关系，且不受保护期限制；如果关闭，则该分销员购买了商品，对自己不贡献佣金，仍然视为上级分销员的客户。</p>
      </li>
      <li>
        <label>佣金设置：</label>
        <div class="tips-bar">关闭后，用户无法通过“分销员招募手册页面”或者邀请好友加入，成为分销员；仅能通过“分销员”界面进行设置。</div>
        <div class="kk-bar">
          <div class="kk-title">
            <div class="one">等级</div>
            <div class="two">等级名称</div>
            <div class="three">升级规则
              <el-tooltip placement="top" effect="light">
                <div slot="content">1.等级规则依据分销员带来的可以计算佣金的订单的订单
                  <br>额累加计算；如分销员A的客户（含A自己）和A的下级B
                  <br>的客户带来的订单金额
                  <br>
                  <br>2.每一次升级后，累加清零后再计算；假设分销员A的累
                  <br>加订单金额因为某一个订单金额巨大，符合等级2和等级
                  <br>3的条件，则自动升级为等级3，即升级到最高的等级；升
                  <br>级之前按原等级计算佣金，升级之后按新的等级计算佣金。
                </div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
            <div class="four">等级权益
              <el-tooltip placement="top" effect="light">
                <div slot="content">1.高等级的佣金比例必须大于等于低等级的佣金比例；
                  <br>
                  <br>2.高等级的升级规则必须大于等于低等级。
                  <br>
                  <br>3.删除的时候只能从高等级的规则开始删除。
                  <br>
                  <br>4.统一等级的销售佣金和邀请奖励佣金比例是独立的，及销售佣金
                  <br>比例可以小于邀请奖励佣金比例。
                  <br>
                  <br>5.销售佣金比例和邀请奖励佣金比例之不能大于100%。
                  <br>
                  <br>6.最多设置5个等级，含普通分销员。
                </div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </div>
          <!-- <div class="kk-list">
            <div class="one">1</div>
            <div class="two">
              <p>普通分销员</p>
            </div>
            <div class="three">
              <p>默认成为分销员后即是该等级</p>
            </div>
            <div class="four">
              <ul class="list-ul">
                <li>
                  <label>销售佣金比例</label>
                  <el-input v-model="input" maxlength="6" size="small"></el-input>
                  <p>%</p>
                </li>
                <li v-show="!contentData.invitationReward">
                  <label>邀请奖励佣金比例</label>
                  <el-input v-model="input" maxlength="6" size="small"></el-input>
                  <p>%</p>
                </li>
              </ul>
            </div>
          </div>-->
          <div class="kk-list" v-for="(item, index) in commission" :key="index">
            <div class="one">{{item.level}}</div>
            <div class="two">
              <p v-if="index === 0">普通分销员</p>
              <el-input v-else v-model="item.name" @blur="editLv(item,index)" size="small"></el-input>
            </div>
            <div class="three">
              <p v-if="index === 0">默认成为分销员后即是该等级</p>
              <ul class="list-ul" v-else>
                <li>
                  <!-- <el-checkbox v-model="checked"></el-checkbox> -->
                  <label>累计推广金达</label>
                  <el-input
                    v-model="item.popularizeAmount"
                    @blur="editLv(item,index)"
                    maxlength="6"
                    size="small"
                  ></el-input>
                  <p>元</p>
                </li>
                <li v-show="!contentData.invitationReward">
                  <!-- <el-checkbox v-model="checked"></el-checkbox> -->
                  <label>累计推广金和个消费金达</label>
                  <el-input
                    v-model="item.consumptionPopularizeAmount"
                    @blur="editLv(item,index)"
                    maxlength="6"
                    size="small"
                  ></el-input>
                  <p>元</p>
                </li>
              </ul>
            </div>
            <div class="four">
              <ul class="list-ul">
                <li>
                  <label>销售佣金比例</label>
                  <el-input
                    v-model="item.salesCommissionRate"
                    @blur="editLv(item,index)"
                    maxlength="6"
                    size="small"
                  ></el-input>
                  <p>%</p>
                </li>
                <li v-show="!contentData.invitationReward">
                  <label>邀请奖励佣金比例</label>
                  <el-input
                    v-model="item.invitationCommissionRate"
                    @blur="editLv(item,index)"
                    maxlength="6"
                    size="small"
                  ></el-input>
                  <p>%</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="kk-bottom">
            <a v-show="commission.length>1" @click="openDel">删除</a>
            <a v-show="commission.length<5" @click="addCommission">添加</a>
          </div>
        </div>
      </li>
      <li>
        <label>佣金计算特例：</label>
        <el-checkbox v-model="contentData.membershipNothingCommission">消费者以会员价购买，分销员无佣金</el-checkbox>
      </li>
      <li>
        <label>结算时间：</label>
        <el-radio-group v-model="contentData.settlementMethod">
          <el-radio :label="0">交易完成后结算</el-radio>
          <el-radio :label="1">售后维权处理期结束后再结算</el-radio>
        </el-radio-group>
        <p>交易结束后结算：一般情况下发货后7天内（含7天）给分销员结算佣金，期间发生的退款会自动扣除。风险提醒：若您选择交易完成结算的方式，则交易完成后发生的维权退款不影响已结算的佣金，可能会造成佣金亏损。
          <br>售后维权处理期结束后再结算：交易完成后需要再等15天，直到不会产生售后退款或处理完售后退款再给分销员结算佣金。
        </p>
      </li>
    </ul>
    <h2>个性化设置</h2>
    <ul class="rule-list">
      <li>
        <label>分销员代称：</label>
        <div class="set-input">
          <el-input v-model="contentData.salesmanNickname" maxlength="6" size="small"></el-input>
          <span>{{getLength}}/6</span>
        </div>
        <p>可自定义店铺分销员的名称，例如 代理人。名称不可超6个字。</p>
      </li>
      <li>
        <label>分销图标：</label>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="contentData.salesmanIconUrl" :src="contentData.salesmanIconUrl" class="avatar">
          <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
        </el-upload>
        <p>尺寸：100*100 png格式，不超过1M</p>
      </li>
    </ul>
    <!--删除佣金奖励规则-->
    <el-dialog title="删除内容" :visible.sync="isShowDel" width="460px">
      <div class="del-bar">
        <div class="at-left">
          <i class="el-icon-warning"></i>
        </div>
        <div class="at-right">删除该等级后，原本处于该等级的分销员将被自动降级为下一级分销员。</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDel = false" size="small">取消</el-button>
        <el-button type="primary" @click="delCommission" size="small">确定</el-button>
      </span>
    </el-dialog>
    <!--推广链接有效期设置和分销员保护期设置操作说明 -->
    <el-dialog title="推广链接有效期设置和分销员保护期设置操作说明 " :visible.sync="isShowDoc" width="720px">
      <div class="sm-bar">
        <h5>
          <i></i>推广链接业绩追踪有效期设置
        </h5>
        <table class="sm-table">
          <tr class="t-tt">
            <td width="70"></td>
            <td width="380">规则</td>
            <td>好处</td>
          </tr>
          <tr>
            <td width="70">
              <div class="dt">短期</div>
            </td>
            <td>
              <div class="dq">客户点击分销员分享出去的链接后15天有效期过期，失效后 即便客户不点 击分销员链接直接下单，拿不到佣金。</div>
            </td>
            <td>
              <div class="dq1">激励分销员，不断发展新客户</div>
            </td>
          </tr>
          <tr>
            <td width="70">
              <div class="dt">长期</div>
            </td>
            <td>
              <div class="dq">
                受众只要第一次点击分销员分享的推广链接，就会与该分销员
                绑定关系。其再次进入下单(无论是通过分销员的推广链接还是
                直接进店铺或者其他分销员的链接购买)都算该分销员业绩。
              </div>
            </td>
            <td>
              <div class="dq1">关系稳定，佣金结算方便</div>
            </td>
          </tr>
        </table>
        <h5>
          <i></i>分销员保护期
        </h5>
        <div class="bhq">
          避免分销员互相抢客的一个功能。选择开启分销员保护期，分销员与客户建立关系后，在保护期内不会变更绑定的关系。
          如果在保护期 内，分销员与客户能够持续地保持联系，则保护期的时间将会被顺延。
        </div>
        <h5>
          <i></i>设置示例
        </h5>
        <div class="bhq">示例①： 设置的有效期大于保护期，如有效期为短期15天，保护期为5天，则如图所示:</div>
        <img class="img-c" src="../../../assets/images/distribution/dist_pop_data_1.png">
        <p class="pp">
          <i></i>5天内，分销员A发展的客户不会被人抢走
        </p>
        <p class="pp mb">
          <i></i>5天后，分销员A将不再受保护，若客户点了其他分销员的推广链接，则被其他分销员抢走
        </p>
        <div class="bhq">示例②：设置有效期小于保护期，如有效期为15天，保护期20天，则如图所示</div>
        <img class="img-c" src="../../../assets/images/distribution/dist_pop_data_2.png">
        <p class="pp">
          <i></i>15天内，分销员A发展的客户不会被人抢走
        </p>
        <p class="pp mb">
          <i></i>15天后，分销员A将不再受保护，若客户点了其他分销员的推广链接，则被其他分销员抢走
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDoc = false" size="small">取消</el-button>
        <el-button type="primary" @click="isShowDoc = false" size="small">确定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import {
  addSalesLevel,
  editSalesLevel,
  delSalesLevel,
  getSalesLevelList
} from "@/api/distribution/index";
export default {
  data() {
    return {
      isShowDoc: false,
      isShowDel: false,
      imageUrl: "",
      id: "",
      input: "1",
      checked: false,
      level: 1,
      commission: []
    };
  },
  props: {
    contentData: {
      type: Object
    }
  },
  computed: {
    getLength: function() {
      if (this.contentData.salesmanNickname) {
        return this.contentData.salesmanNickname.length;
      } else {
        return 0;
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id;
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
            // this.commission = data.map(item => {
            //   item.salesCommissionRate *= 100;
            //   item.invitationCommissionRate *= 100;
            //   return item;
            // });
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 上传
     */
    handleAvatarSuccess(res, file) {
      this.contentData.salesmanIconUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传图片只能是 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    /**
     * 佣金规则增减
     */
    editLv(item, index) {
      item.contentId = this.id;
      if (index === 1) {
        if (
          Number(item.salesCommissionRate) <
          Number(this.commission[index - 1].salesCommissionRate)
        ) {
          this.$message.warning("销售佣金比例不能小于上一级");
          return;
        } else if (
          Number(item.invitationCommissionRate) <
          Number(this.commission[index - 1].invitationCommissionRate)
        ) {
          this.$message.warning("累计推广金和个消费金不能小于上一级");
          return;
        }
      } else if (index > 1) {
        if (
          Number(item.popularizeAmount) <
          Number(this.commission[index - 1].popularizeAmount)
        ) {
          this.$message.warning("累计推广金不能小于上一级");
          return;
        } else if (
          Number(item.consumptionPopularizeAmount) <
          Number(this.commission[index - 1].consumptionPopularizeAmount)
        ) {
          this.$message.warning("销售佣金比例不能小于上一级");
          return;
        } else if (
          Number(item.salesCommissionRate) <
          Number(this.commission[index - 1].salesCommissionRate)
        ) {
          this.$message.warning("销售佣金比例不能小于上一级");
          return;
        } else if (
          Number(item.invitationCommissionRate) <
          Number(this.commission[index - 1].invitationCommissionRate)
        ) {
          this.$message.warning("邀请奖励佣金比例不能小于上一级");
          return;
        }
      }
      editSalesLevel(item)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.getLvList(this.id);
          }
        })
        .catch(err => console.error(err));
    },
    delCommission() {
      let data = {
        contentId: this.id,
        id: this.commission[this.commission.length - 1].id
      };
      delSalesLevel(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.getLvList(this.id);
          }
        })
        .catch(err => console.error(err));
      this.isShowDel = false;
    },
    openDel() {
      this.isShowDel = true;
    },
    addCommission() {
      let data = JSON.parse(JSON.stringify(this.commission))[
        this.commission.length - 1
      ];
      data.level += 1;
      data.name = "";
      data.contentId = this.id;
      data.condtionType = 0;
      delete data.id;
      delete data.compId;
      addSalesLevel(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.getLvList(this.id);
          }
        })
        .catch(err => console.error(err));
    },
    openDocPop() {
      this.isShowDoc = true;
    }
  }
};
</script>


<style lang="scss">
@import "../../../assets/css/distribution/index.scss";
</style>
