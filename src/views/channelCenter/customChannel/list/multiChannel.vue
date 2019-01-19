/*
* @Author: 陈炳廷
* @Describe:点击批量增加弹出框
* @Date: 2018-12-03 10:41:50
* @Last Modified time: 2018-12-03 10:41:50
*/

<template>
  <div class="multiChannel">
    <div class="addDiv">
      <el-button size="small" type="primary" plain class="add-an" @click="multiChanelVisible = true">
        批量增加
      </el-button>
    </div>
    <el-dialog :visible.sync="multiChanelVisible" width="30%">
      <div slot="title">
        批量新增
        <el-tooltip class="item" effect="dark" placement="top">
          <div slot="content">字段不满足你的需求<br />前往设置吧</div>
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item class="downLoadTemplate">
          <span @click="downLoad">下载标准模板</span>
        </el-form-item>
        <el-form-item prop="fileList">
          <el-upload class="upload-demo" drag :limit=1 :action="uploadUrl" :on-progress='handleProgress' :on-success="handleSuccess"
            :file-list="form.fileList" :on-remove="handleRemove">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处,或<em>点击上传</em></div>

          </el-upload>
        </el-form-item>

        <el-form-item prop="isCover">
          <el-row type="flex">
            <el-col :span="3">
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">重复的判断是以'渠道名称'作为唯一值进行判断。<br />如果选择'跳过',则不做处理,如果选择'覆盖', 则替换"</div>
                <i class="el-icon-info"></i>
              </el-tooltip>

            </el-col>
            <el-col :span="15">
              <el-radio-group v-model="form.isCover">
                <el-radio :label="0">跳过</el-radio>
                <el-radio :label="1">覆盖</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item style="text-align:right">
          <el-button @click="cancelMultiChannel('form')">取 消</el-button>
          <el-button type="primary" @click="submitUpload('form')">确认导入</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import API from "@/api/channelCenter/customChannel";
export default {
  data() {
    const checkFile = (rule, value, callback) => {
      if (value) {
        console.log(value, "value");
        if (value.length === 0) {
          callback(new Error("请上传文件"));
        }
      }
      callback();
    };
    return {
      multiChanelVisible: false,
      isCover: "",
      removeFile: {},
      host: process.env.VUE_APP_URL,
      uploadUrl: process.env.VUE_APP_URL + "/channel-info/to/import",
      channelList: [],
      form: {
        isCover: "",
        fileList: []
      },
      rules: {
        isCover: [
          {
            required: true,
            message: "请选择是否覆盖",
            trigger: "change"
          }
        ],
        fileList: [
          {
            validator: checkFile,
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    downLoad() {
      window.open(this.host + "/channel-info/download");
    },
    cancelMultiChannel(formName) {
      this.multiChanelVisible = false;
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      this.form.fileList = [];
    },
    handleProgress(event, file, fileList) {
      console.log(event, file, fileList, "1111111111");
    },
    handleSuccess(res, file, fileList) {
      console.log(res, "res111", file, "file111", fileList, "fileList");
      if (res.respCode === "0000") {
        this.channelList = res.data;
        this.form.fileList = fileList;
        console.log(this.form.fileList, "this.form.fileList");
        this.$refs["form"].validate(valid => {});
      }
    },
    submitUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //调用接口
          const params = {
            reqDTOList: this.channelList,
            repeated: this.form.isCover
          };
          API.channelImport(params)
            .then(res => {
              if (res.data.respCode == "0000") {
                this.multiChanelVisible = false;
                this.$message(
                  `导入成功${res.data.data.successNumber}条记录,失败${
                    res.data.data.failNumber
                  }条记录`
                );
                this.form.fileList = [];
              }
            })
            .catch(err => {});
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {}
};
</script>

<style lang='scss'>
.multiChannel {
  .addDiv {
    text-align: right;
  }

  .el-dialog__header {
    line-height: 28px;
  }

  .addBtn {
    border: 1px solid #34a4dd;
    color: #34a4dd;

    &:hover {
      color: #fff;
      background: #34a4dd;
    }
  }

  .downLoadTemplate {
    margin-bottom: 0;
    text-align: center;

    span {
      cursor: pointer;
    }

    span:hover {
      border-bottom: 1px solid #409eff;
    }
  }

  .el-upload {
    width: 100%;
  }

  .el-upload-dragger {
    width: 100%;
  }
}
</style>
