<template>
  <div>
    <!-- 筛选 -->
    <form-select :eventTotal="pageIndex.total" @getData="getData" @contentSettingHandel="contentSettingClick"></form-select>
    <!-- 列表内容 -->
    <list :loadingIndex="isLoadingIndex" :dataListIndex="dataListIndex" :pageIndex="pageIndex" @getData="getData" @openDeatails="openDeatails"></list>
    <!-- 新建 -->
    <el-dialog :title="dlgInfo.title" :visible.sync="isShowContentSetting" width="40%" top="0" class="dialog-setting">
      <content-setting detailsData="{}" isNew="true" :btnName="dlgInfo.btnName" v-if="isShowContentSetting" @saveEventData="saveEventData"></content-setting>
    </el-dialog>
  </div>
</template>


<script>
import { mapState } from "vuex";
import moment from "moment";
import FormSelect from "@/components/private/event/form-select";
import contentSetting from "@/components/private/event/contentSetting";
import list from "@/components/private/event/list";
import { getMarketEventPageList } from "@/api/event/index";
export default {
  components: {
    "form-select": FormSelect,
    list,
    contentSetting
  },
  computed: mapState({
    dataListGroup: "groupList"
  }),
  data() {
    return {
      isShowContentSetting: false, // 是否显示新建
      isLoadingIndex: true, // 加载
      dataListIndex: [],
      dlgInfo: { title: "新建营销活动", btnName: "保存新建" },
      pageIndex: {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getData({});
  },
  methods: {
    // 新建
    contentSettingClick() {
      this.isShowContentSetting = true;
    },
    // 点击确定
    saveEventData() {
      this.isShowContentSetting = false;
    },
    openDeatails(id) {
      this.$router.push({
        path: "list/details",
        query: {
          id: id
        }
      });
    },
    // 获取列表数据
    getData(params) {
      getMarketEventPageList(params)
        .then(res => {
          if (res.respCode === "0000") {
            this.isLoadingIndex = false;
            this.dataListIndex = res.data.items.map(item => {
              item.isShowView = true;
              item.isShowQRCode = false;
              item.createTime = moment(item.createTime).format(
                "YYYY-MM-DD HH:mm"
              );
              return item;
            });
            this.pageIndex.total = res.data.totalCount;
          }
        })
        .catch(err => {
          this.loading = false;
          window.console.error(err);
        });
    }
  }
};
</script>


<style lang="scss">
@import "../../../assets/css/event/index";

// 底部
.content-li {
  background: url("../../../assets/images/event/bg_template.png") center center /
    cover no-repeat;
}
</style>
