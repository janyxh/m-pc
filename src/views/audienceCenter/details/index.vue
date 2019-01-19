<template>
  <div class="details-page">
    <div class="detail-wrap">
      <div class="d-left">
        <div class="d-base-info">
          <base-info :detailsData="detailsData"></base-info>
        </div>
        <div class="d-id">
          <external-id :detailsData="detailsData"></external-id>
        </div>
        <div class="d-attr-info">
          <attr-setting :detailsData="detailsData"></attr-setting>
        </div>
      </div>
      <div class="d-right">
        <div class="d-tag">
          <details-set-tags :id="detailsData.id"></details-set-tags>
        </div>
        <div class="d-list">
          <details-list></details-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getDetails } from "@/api/audienceCenter/audienceDetails";
import baseInfo from "@/components/private/audience/baseInfo";
import detailsSetTags from "@/components/private/audience/detailsSetTags";
import externalId from "@/components/private/audience/externalId";
import attrSetting from "@/components/private/audience/attrSetting";
import detailsList from "@/components/private/audience/detailsList";
export default {
  components: {
    baseInfo,
    detailsSetTags,
    externalId,
    attrSetting,
    detailsList
  },
  data() {
    return {
      aId: "",
      detailsData: {}
    };
  },
  created() {
    this.aId = this.$route.query.id;
    this.getDetails();
    console.log(">>>", this.aId);
  },
  methods: {
    /**
     * 获取详情信息
     */
    getDetails() {
      let getData = {
        id: this.aId
      };
      getDetails(getData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.detailsData = res.data;
            this.detailsData.sex = String(this.detailsData.sex);
            this.detailsData.audienceStage
              ? (this.detailsData.audienceStage = String(
                  this.detailsData.audienceStage
                ))
              : this.$set(this.detailsData, "audienceStage", "0");
            this.detailsData.marryFlag = String(this.detailsData.marryFlag);
            this.detailsData.createTime = moment(
              this.detailsData.createTime
            ).format("YYYY-MM-DD HH:mm");
            this.detailsData.birth = moment(this.detailsData.birth).format(
              "YYYY-MM-DD"
            );
            console.log("asdfasdfsdafas", this.detailsData);
          }
        })
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/css/audience/details";
</style>
