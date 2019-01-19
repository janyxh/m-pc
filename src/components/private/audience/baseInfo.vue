<template>
  <div class="base-info-page">
    <div class="title">
      <h5>基本信息</h5>
      <span @click="openEditBox">修改</span>
    </div>
    <div class="info-photo">
      <div class="photo-bar">
        <img :src="detailsData.headPhotoUrl?detailsData.headPhotoUrl:''" :onerror="errImg">
        <img
          v-if="detailsData.sex === '1'"
          class="icon-img"
          src="../../../assets/images/audience/sex-nan.png"
        >
        <img
          v-else-if="detailsData.sex === '2'"
          class="icon-img"
          src="../../../assets/images/audience/sex-nv.png"
        >
      </div>
      <div class="name-bar">
        <p>{{detailsData.nickName}}</p>
        <p>
          成为客户：
          <span>{{detailsData.createTime}}</span>
        </p>
      </div>
    </div>
    <ul class="base-list">
      <li>
        <span>创自：</span>
        <p>{{from[detailsData.fromTo?detailsData.fromTo:0]}}</p>
      </li>
      <li>
        <span>姓名：</span>
        <p>{{detailsData.name}}</p>
      </li>
      <li>
        <span>客户阶段：</span>
        <p>{{stage[Number(detailsData.audienceStage)]}}</p>
      </li>
      <li>
        <span>最近一次互动：</span>
        <div>
          <p>{{detailsData.createTime}}</p>
          <p>{{detailsData.recentInteraction}}</p>
        </div>
      </li>
      <li>
        <span>近30天互动：</span>
        <p>{{detailsData.interactionTimes}}</p>
      </li>
    </ul>
    <el-dialog title="基本信息 " :visible.sync="isShowEdit" width="720px">
      <div class="edit-base-info">
        <h3>
          <label>头像：</label>
          <div class="photo">
            <img :src="detailsData.headPhotoUrl?detailsData.headPhotoUrl:''" :onerror="errImg">
          </div>
        </h3>
        <ul class="edit-list">
          <li>
            <label>昵称：</label>
            <div class="edit-input">
              <el-input
                v-model="detailsData.nickName"
                maxlength="10"
                placeholder="请输入年龄"
                size="small"
              ></el-input>
              <span>{{detailsData.nickName?detailsData.nickName.length:0}}/10</span>
            </div>
          </li>
          <li>
            <label>性别：</label>
            <div class="edit-input">
              <div v-if="showSex" class="sex-bar">未知</div>
              <el-radio-group v-else v-model="detailsData.sex">
                <el-radio label="0">未知</el-radio>
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
              <el-checkbox v-model="showSex">同微信</el-checkbox>
            </div>
          </li>
          <li>
            <label>姓名：</label>
            <div class="edit-input">
              <el-input v-model="detailsData.name" maxlength="10" placeholder="请输入年龄" size="small"></el-input>
              <span>{{detailsData.name?detailsData.name.length:0}}/10</span>
            </div>
          </li>
          <li>
            <label>客户阶段：</label>
            <el-select v-model="detailsData.audienceStage" placeholder="请选择客户阶段" size="small">
              <el-option label="未知 " value="0"></el-option>
              <el-option label="印象认知阶段 " value="1"></el-option>
              <el-option label="潜在兴趣阶段" value="2"></el-option>
              <el-option label="意向考虑阶段 " value="3"></el-option>
              <el-option label="行动购买阶段" value="4"></el-option>
              <el-option label="售后维护阶段 " value="5"></el-option>
              <el-option label="扩大销售阶段" value="6"></el-option>
            </el-select>
          </li>
          <li>
            <label>成为客户：</label>
            <el-input v-model="detailsData.createTime" placeholder size="small" :disabled="true"></el-input>
          </li>
          <li>
            <label>创自：</label>
            <el-input v-model="from[detailsData.fromTo]" placeholder size="small" :disabled="true"></el-input>
          </li>
        </ul>
      </div>
      <!-- <pre>{{detailsData}}</pre> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmEdit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { changeDetails } from "@/api/audienceCenter/audienceDetails";
export default {
  data() {
    return {
      stage: [
        "未知",
        "印象认知阶段",
        "潜在兴趣阶段",
        "意向考虑阶段",
        "行动购买阶段",
        "售后维护阶段",
        "扩大销售阶段"
      ],
      from: ["", "", "", "手动创建"],
      errImg:
        'this.src="' +
        require("../../../assets/images/audience/photo.png") +
        '"',
      showSex: true,
      isShowEdit: false
    };
  },
  props: {
    detailsData: {
      type: Object
    }
  },
  mounted() {
    console.log(">>>>>>12321312", this.detailsData);
  },
  methods: {
    /**
     * 打开编辑
     */
    openEditBox() {
      this.isShowEdit = true;
    },
    confirmEdit() {
      changeDetails(this.detailsData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("修改成功！");
            this.isShowEdit = false;
          }
        })
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/audience/details.scss";
</style>
