<template>
  <div>
    <!--批量新增 > 第一步-->
    <el-dialog title="批量新增 " :visible.sync="visable" @close="$emit('closeAddBatch')" width="720px">
      <div class="batch-add-page">
        <div class="upload-bar">
          <el-upload class="upload-demo" drag :limit="1" :action="uploadUrl" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :before-upload="beforeAvatarUpload" :on-success="handleSuccess" :file-list="fileList" :on-remove="handleRemove">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('closeAddBatch')">取 消</el-button>
        <el-button type="primary" @click="onOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { importChannel } from "@/api/channelCenter";
export default {
  props: ["visable", "getData", "pageIndex"],
  data() {
    return {
      uploadUrl: process.env.VUE_APP_URL + "/channel-info/to/import",
      fileList: [],
      importList: [],
      clfs: "1"
    };
  },
  methods: {
    // 下载模板
    downModel() {
      window.open(process.env.VUE_APP_URL + "/channel-info/download");
    },
    // 移除文件
    handleRemove() {
      this.fileList = [];
    },
    // 上传前判断
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.warning("上传文件大小不能超过 2MB !");
        return false;
      } else {
        const typeIndex = file.name.indexOf("xls") || file.name.indexOf("xlsx");
        if (typeIndex < 0) {
          this.$message.warning("请上传正确的文件类型!");
          return false;
        }
      }
    },
    // 上传成功
    handleSuccess(res, file, fileList) {
      if (res.respCode === "0000") {
        this.fileInfo = file;
        this.importList = res.data;
        this.fileList = fileList;
      }
    },
    // 确定导入
    onOk() {
      if (this.importList.length > 0) {
        let params = {
          repeated: this.clfs,
          reqDTOList: this.importList
        };
        importChannel(params)
          .then(res => {
            let { respCode } = res;
            if (respCode === "0000") {
              this.clfs = "1";
              this.fileList = [];
              this.importList = [];
              this.$emit("closeAddBatch");
              this.$message.success(
                `导入成功${res.data.successNumber}条记录， 失败${
                  res.data.failNumber
                }条`
              );
              this.$emit("getData", {
                pageNumber: this.pageIndex.pageNumber,
                pageSize: this.pageIndex.pageSize
              });
            }
          })
          .catch(err => console.error(err));
      } else {
        this.$message.warning("请选择要导入的模板！");
      }
    }
  }
};
</script>


<style lang="scss">
@import "../../../assets/css/audience/index";
</style>
