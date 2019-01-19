<template>
    <div class="event-details-page">
        <div class="detail-wrap">
            <div class="d-kpi">
                <div class="d-base-info">
                    <kpi-detail :detailsData="detailsData" @showContentSetting="showContentSetting" @saveEventData="saveEventData"></kpi-detail>
                </div>
            </div>
            <div class="d-content">
                <div class="d-left">
                    <content-list :id="detailsData.id" @handelContent="handelContent"></content-list>
                </div>
                <div class="d-right">
                    <guide-page v-if="showType === 1" ></guide-page>
                    <content-detail v-if="showType === 2" :id="detailsData.id" :contentInfoId="contentInfoId"></content-detail>
                    <channel-lists v-if="showType === 3" :id="detailsData.id" :contentInfoId="contentInfoId"></channel-lists>
                </div>
            </div>
        </div>
        <!-- 编辑 -->
        <el-dialog :title="dlgInfo.title" :visible.sync="isShowContentSetting" width="40%" top="0" class="dialog-setting">
            <content-setting :detailsData="detailsData" isNew="false" :btnName="dlgInfo.btnName" v-if="isShowContentSetting" @saveEventData="saveEventData"></content-setting>
        </el-dialog>
    </div>
</template>

<script>
import { getMarketEvent } from "@/api/event/index";
import kpiDetail from "@/components/private/event/kpiDetail";
import contentDetail from "@/components/private/event/contentDetail";
import contentList from "@/components/private/event/contentList";
import contentSetting from "@/components/private/event/contentSetting";
import channelLists from "@/components/private/event/channelLists";
import guidePage from "@/components/private/event/guidePage";
export default {
  components: {
    kpiDetail,
    contentList,
    contentDetail,
    contentSetting,
    channelLists,
    guidePage
  },
  data() {
    return {
      showType: 2, //1 空白页 2 为内容详情 3渠道列表
      isShowContentSetting: false, // 是否显示编辑
      dlgInfo: { title: "编辑营销活动", btnName: "保存编辑" },
      id: "",
      contentInfoId: "",
      detailsData: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    window.console.log(">>>", this.id);
    this.getDetails();
  },
  methods: {
    // 点击确定
    saveEventData() {
      this.isShowContentSetting = false;
    },
    showContentSetting() {
      this.isShowContentSetting = true;
    },
    /**
     * 获取详情信息
     */
    getDetails() {
      let params = {
        id: this.id
      };
      getMarketEvent(params)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.detailsData = res.data;
          }
        })
        .catch(err => window.console.error(err));
    },
    handelContent(item) {
      this.showType = item.showType;
      this.contentInfoId = item.contentInfoId || "";
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/css/event/details";
</style>
