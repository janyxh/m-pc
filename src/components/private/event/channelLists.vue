<template>
  <div class="event-show-page">
    <div class="show-channel">
      <div class="s-titel">
        <p>推广连接</p>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { getMarketEventChannelPageList } from "@/api/event/index";
export default {
  components: {},
  data() {
    return {
      dataList: [], // 数据
      total: 0,
      pageNumber: 1,
      pageSize: 10
    };
  },
  props: {
    id: {
      type: String
    },
    contentInfoId: {
      type: String
    }
  },
  created() {
    this.getChannelLists();
  },
  mounted() {},
  methods: {
    getChannelLists() {
      let params = {};
      getMarketEventChannelPageList(params)
        .then(res => {
          if (res.respCode === "0000") {
            this.dataList = res.data || [];
          }
        })
        .catch(err => {
          window.console.error(err);
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/event/details.scss";
</style>
