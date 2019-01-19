<template>
  <div class="batch-add-page">
    <div class="step-bar">
      <div class="step-num-bar">
        <div class="step-num fl">1</div>
        <div class="step-line"></div>
        <div class="step-num2 fl">2</div>
        <div class="step-line"></div>
        <div class="step-num2 fr">3</div>
      </div>
      <div class="step-text">
        <p class="fl">导入数据</p>
        <p class="zj">导入确认</p>
        <p class="fr">其他设置</p>
      </div>
    </div>
    <div class="add-tip">
      <el-tooltip placement="top">
        <div slot="content">温馨提示：外部ID是系统创建
          <br>受众的依据；系统支持通过手
          <br>机号和OpenID等确定是新建
          <br>还是为已存在的受众添加或更
          <br>新属性数
        </div>
        <div class="top-left el-icon-question"></div>
      </el-tooltip>
      <label>外部系统ID：</label>
      <el-select v-model="externalSysId" placeholder="请选择外部系统ID" size="small">
        <el-option label="openID" value="1"></el-option>
        <el-option label="手机号" value="2"></el-option>
      </el-select>
    </div>
    <div class="upload-bar">
      <el-upload
        class="upload-demo"
        drag
        :limit="1"
        :action="uploadUrl"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
        :file-list="fileList"
        :on-remove="handleRemove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
          <p>每次最大导入文件不超过2MB</p>
        </div>
        <div class="el-upload__tip" slot="tip">请按照系统提供的标准模板填写信息</div>
        <div class="el-upload__tip" slot="tip">
          <a @click="downModel">下载标准模板</a>
        </div>
      </el-upload>
    </div>
    <div class="up-bottom">
      <el-tooltip placement="top">
        <div slot="content">重复的判断是以“外部ID的值”
          <br>作为唯一值进行判断。 系统中
          <br>的辅助ID有：手机号、邮箱和
          <br>OpenID。
        </div>
        <div class="top-left el-icon-question"></div>
      </el-tooltip>
      <label>重复处理</label>
      <el-radio-group v-model="clfs">
        <el-radio label="1">跳过</el-radio>
        <el-radio label="2">覆盖</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
import { importAudiences } from "@/api/audienceCenter/audienceList";
export default {
  data() {
    return {
      importList: [],
      fileList: [],
      downUrl: process.env.VUE_APP_URL + "/audience-info/download",
      uploadUrl: process.env.VUE_APP_URL + "/audience-info/to/import",
      externalSysId: "1",
      clfs: "1",
      tIsShowBatchAdd: this.isShowBatchAdd,
      tIsShowBatchAddSecond: this.isShowBatchAddSecond
    };
  },
  props: {
    resultData: {
      type: Object
    },
    isShowBatchAdd: {
      type: Boolean
    },
    isShowBatchAddSecond: {
      type: Boolean
    }
  },
  mounted() {},
  methods: {
    //下载模板
    downModel() {
      window.open(this.downUrl);
    },
    handleRemove(file, fileList) {
      this.fileList = [];
    },
    handleProgress(event, file, fileList) {
      console.log(event, file, fileList, "handleProgress>>");
    },
    handleSuccess(res, file, fileList) {
      console.log(res, "res111", file, "file111", fileList, "fileList");
      if (res.respCode === "0000") {
        this.importList = res.data;
        this.fileList = fileList;
        console.log(this.fileList, "this.fileList");
      }
    },
    // 确定导入
    importListFun() {
      let params = {
        externalSysId: this.externalSysId,
        repeated: this.clfs,
        reqDTOList: this.importList
      };
      if (this.importList.length > 0) {
        importAudiences(params)
          .then(res => {
            if (res.data.respCode == "0000") {
              this.resultData = res.data;
              this.fileList = [];
              this.tIsShowBatchAdd = false;
              this.tIsShowBatchAddSecond = true;
            }
          })
          .catch(err => {});
      } else {
        this.$message.warning("请选择要导入的模板！");
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/audience/index.scss";
</style>
