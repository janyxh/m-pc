<template>
    <div class="event-content-page">
        <div class="title">
            <h5>营销内容和自动化流程配置</h5>
            <p @click="openContentDialog">+内容</p>
            <p @click="openProcessDialog">+流程</p>
        </div>
        <div class="item" v-for="(item, index) in contentList" :key="index" >
            <el-row :gutter="20">
                <el-col :span="8"><img src="@/assets/images/event/cover.png" alt=""></el-col>
                <el-col :span="16"  class="c-left">
                    <el-tooltip content="删除营销内容" placement="top">
                        <i @click="delContent(item)" class="iconfont icon-del"></i>
                    </el-tooltip>
                    <p @click="handelContent(item)" style="cursor: pointer">营销内容：<span>{{item.contentInfoId}}</span></p>
                    <p @click="handelChannel(item)" style="cursor: pointer">推广链接：<span>{{item.contentInfoId}}</span></p>
                </el-col>
            </el-row>
        </div>
        <div class="item" @click="handelContent(null)" style="cursor: pointer">
            <el-row :gutter="20">
                <el-col :span="8" >
                    <div class="newBox">
                        <div class="logo">
                            <i class="iconfont icon-new-create"></i>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16" class="c-left">
                    <p>营销内容：未关联</p>
                    <p>推广链接：未设置</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import {
  getMarketEventContentList,
  deleteMarketEventContent
} from "@/api/event/index";
export default {
  data() {
    return {
      isOpenProcessDialog: false,
      isOpenContentDialog: false,
      contentList: []
    };
  },
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    this.getContentList();
  },
  methods: {
    openProcessDialog() {
      this.isOpenProcessDialog = true;
      alert("流程");
    },
    openContentDialog() {
      this.isOpenContentDialog = true;
      alert("内容");
    },
    delContent(item) {
      alert("删除");
      let params = { id: this.id, contentInfoId: item.contentInfoId };
      deleteMarketEventContent(params)
        .then(res => {
          if (res.respCode === "0000") {
            this.contentList = res.data || [];
          }
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    getContentList() {
      let params = { id: this.id };
      getMarketEventContentList(params)
        .then(res => {
          if (res.respCode === "0000") {
            this.contentList = res.data || [];
          }
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    handelChannel(item) {
      this.$emit("handelContent", {
        showType: 3,
        contentInfoId: item.contentInfoId || ""
      });
    },
    handelContent(item) {
      if (!item) {
        this.$emit("handelContent", {
          showType: 1,
          contentInfoId: ""
        });
      } else {
        this.$emit("handelContent", {
          showType: 2,
          contentInfoId: item.contentInfoId || ""
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/event/details.scss";
</style>
