<template>
  <section class="add-page">
    <!-- tab-title -->
    <div class="tab-bar">
      <ul class="tab-list">
        <li @click="selectTab(1)" :class="{actived:showBar===1}">招募手册</li>
        <li @click="selectTab(2)" :class="{actived:showBar===2}">分销规则</li>
        <li @click="selectTab(3)" :class="{actived:showBar===3}">海报/邀请卡</li>
        <li @click="selectTab(4)" :class="{actived:showBar===4}">分销商品</li>
        <li @click="selectTab(5)" :class="{actived:showBar===5}">分销员</li>
      </ul>
      <el-button class="add-an" type="primary" size="small" @click="saveContent">保存</el-button>
      <el-button class="add-an" type="primary" size="small">预览和设置</el-button>
    </div>
    <!-- tab-content -->
    <div class="content" :class="{pd0:showBar===4 || showBar===5}">
      <div v-show="showBar===1" class="tab-nr">
        <add-manual :contentData="contentData"></add-manual>
      </div>
      <div v-show="showBar===2" class="tab-nr">
        <add-rule ref="ruleInfo" :contentData="contentData"></add-rule>
      </div>
      <div v-show="showBar===3" class="tab-nr">
        <add-poster :contentData="contentData"></add-poster>
      </div>
      <div v-show="showBar===4" class="tab-nr">
        <add-products-list></add-products-list>
      </div>
      <div v-show="showBar===5" class="tab-nr">
        <add-distributor></add-distributor>
      </div>
    </div>
  </section>
</template>

<script>
import {
  editDistributionContent,
  getDistributionContent
} from "@/api/distribution/index";
import addManual from "@/components/private/distribution/addManual";
import addRule from "@/components/private/distribution/addRule";
import addPoster from "@/components/private/distribution/addPoster";
import addProductsList from "@/components/private/distribution/addProductsList";
import addDistributor from "@/components/private/distribution/addDistributor";
export default {
  components: {
    addManual,
    addRule,
    addPoster,
    addProductsList,
    addDistributor
  },
  data() {
    return {
      showBar: 1,
      id: "",
      contentData: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getContent();
  },
  methods: {
    /**
     * 选项卡
     */
    selectTab(num) {
      this.showBar = num;
      if (this.showBar === 2) {
        this.$refs.ruleInfo.getLvList(this.id);
      }
    },
    /**
     * 获取分销内容
     */
    getContent() {
      let data = {
        contentId: this.id
      };
      getDistributionContent(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            let data = res.data;
            data.salesmanIconUrl = "";
            if (!data.posterServiceId) {
              data.posterServiceId = "";
            }
            if (!data.invitationServiceId) {
              data.invitationServiceId = "";
            }
            this.contentData = data;
            this.contentData.protectedPeriodSet = Boolean(
              this.contentData.protectedPeriodSet
            );
            this.contentData.membershipNothingCommission = Boolean(
              this.contentData.membershipNothingCommission
            );
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 保存
     */
    saveContent() {
      this.contentData.protectedPeriodSet = Number(
        this.contentData.protectedPeriodSet
      );
      this.contentData.membershipNothingCommission = Number(
        this.contentData.membershipNothingCommission
      );
      if (this.contentData.content.length > 4000) {
        this.$message.warning("手册内容长度不能超过4000个！");
        return;
      }
      editDistributionContent(this.contentData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("保存成功！");
          }
        })
        .catch(err => console.error(err));
    }
  }
};
</script>


<style lang="scss">
@import "../../assets/css/distribution/index";
</style>
