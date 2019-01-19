<template>
  <div>
    <!-- 筛选 -->
    <form-select :isAddContent="isDistibution" :pageIndex="pageIndex" @getData="getData" @resetForm="resetForm"></form-select>
    <!-- 列表内容 -->
    <list :isDistibution="isDistibution" :loadingIndex="loadingIndex" :dataListIndex="dataListIndex" :pageIndex="pageIndex"
      @getData="getData" @resetForm="resetForm"></list>
  </div>
</template>

<script>
import moment from "moment";
import FormSelect from "@/components/private/content/form-select";
import list from "@/components/private/content/list";
import { getContentList } from "@/api/content";
export default {
  components: {
    "form-select": FormSelect,
    list
  },
  props: ["isDistibution"],
  data() {
    return {
      loadingIndex: true, // 加载
      dataListIndex: [],
      pageIndex: {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    // 获取列表数据
    getData(params) {
      this.loadingIndex = true;
      getContentList(params)
        .then(res => {
          this.loadingIndex = false;
          this.dataListIndex = res.data.items.map(item => {
            item.isShowView = true;
            item.isShowQRCode = false;
            item.createTime = moment(item.createTime).format(
              "YYYY-MM-DD HH:mm"
            );
            return item;
          });
          this.pageIndex.total = res.data.totalCount;
        })
        .catch(err => {
          this.pageIndex.total = false;
          console.error(err);
        });
    },
    // 重置分页
    resetForm() {
      this.pageIndex = {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      };
      this.$store.commit("clearSearch");
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/content/index";

// 底部
.content-li {
  background: url("../../assets/images/content/bg_template.png") center center /
    cover no-repeat;
}
</style>
