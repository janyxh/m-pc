<template>
  <div>
    <!-- 单个添加 -->
    <el-dialog
      :title="isEdit ? '编辑自定义渠道':'新增自定义渠道'"
      :visible.sync="isVisable"
      @closed="$emit('closeAddSingle')"
      width="720px"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px">
        <el-form-item label="渠道名称：" prop="channelName">
          <el-col :span="14">
            <el-input v-model="ruleForm.channelName" clearable size="small"></el-input>
          </el-col>
          <el-col :span="10" class="form-item-right">
            <el-checkbox v-model="checkedChannelName">设为渠道标签</el-checkbox>
          </el-col>
        </el-form-item>
        <el-form-item label="传播平台" prop="transemissionPlatform">
          <el-col :span="14">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="ruleForm.transemissionPlatform"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              clearable
              size="small"
            >
              <i class="el-icon-arrow-down" slot="suffix"></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="10" class="form-item-right">
            <el-checkbox v-model="checkedPlatform">设为渠道标签</el-checkbox>
          </el-col>
        </el-form-item>
        <el-form-item label="渠道标签" class="tags-wrap">
          <el-popover
            placement="top"
            width="200"
            class="popover"
            trigger="hover"
            content="受众访问加了渠道标记的推广链接之后，渠道标签也将自动打到受众身上。"
          >
            <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
            <!-- <el-button slot="reference">hover 激活</el-button> -->
          </el-popover>
          <el-col :span="20">
            <div class="tag-channel">
              <span v-if="ruleForm.channelName && checkedChannelName">{{ruleForm.channelName}}</span>
              <span
                v-if="ruleForm.transemissionPlatform && checkedPlatform"
              >{{ruleForm.transemissionPlatform}}</span>
            </div>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPlatformList, add, update, getInfo } from "@/api/channelCenter";
export default {
  props: ["visable", "total", "pageIndex", "isEdit", "values"],
  data() {
    var checkPlatform = (rule, value, callback) => {
      if (value.trim() === "") {
        return callback(new Error("请输入或选择传播平台名称"));
      } else {
        callback();
      }
    };
    return {
      isVisable: false, // 是否显示弹出框
      platformList: [], // 传播平台列表
      checkedChannelName: true, // 渠道名称是否设为渠道标签
      checkedPlatform: true, // 传播平台是否设为渠道标签
      tagList: [],
      channelId: null,
      ruleForm: {
        // 表单数据
        channelName: "", //  渠道名称
        transemissionPlatform: "" // 传播平台
      },
      rules: {
        // 表单验证规则
        channelName: [
          {
            required: true,
            message: "请输入渠道名称",
            trigger: "blur"
          },
          {
            max: 20,
            message: "长度不能超过20个字",
            trigger: "blur"
          }
        ],
        transemissionPlatform: [
          {
            required: true,
            message: "请输入或选择传播平台名称",
            trigger: "blur"
          },
          {
            validator: checkPlatform,
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    visable: function(val) {
      this.isVisable = val;
    },
    total: function(val) {
      if (this.ruleForm.channelName === "") {
        this.ruleForm.channelName = `自定义渠道${val + 1}`;
      }
    },
    values: function(val) {
      if (val.id) {
        let params = {
          channelId: val.id
        };
        getInfo(params)
          .then(res => {
            this.channelId = res.data.id;
            this.ruleForm.channelName = res.data.channelName;
            this.ruleForm.transemissionPlatform =
              res.data.transemissionPlatformName;
            // 渠道标签列表
            this.tagList = res.data.channelTagList;
            if (!this.tagList) {
              this.checkedChannelName = false;
              this.checkedPlatform = false;
            } else {
              // 是否有渠道名称标签
              const hadTagChannelName = this.tagList.find(item => {
                return item.tagInfoRespDto.tagRuleId === 2;
              });
              this.checkedChannelName = hadTagChannelName ? true : false;
              // 是否有传播平台标签
              const hadTagPlatform = this.tagList.find(item => {
                return item.tagInfoRespDto.tagRuleId === 3;
              });
              this.checkedPlatform = hadTagPlatform ? true : false;
            }
          })
          .catch(err => console.error(err));
      }
    }
  },
  created() {
    this.getPlatformList();
  },
  methods: {
    // -----------------------------------------------------------------------  获取数据  --------------------------------------------------------
    // 传播平台输入返回列表
    querySearch(queryString, cb) {
      var platformList = this.platformList;
      var results = platformList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 获取传播平台列表
    getPlatformList() {
      getPlatformList({})
        .then(res => {
          this.platformList = res.data.map(item => {
            item.value = item.name;
            return item;
          });
          this.ruleForm.transemissionPlatform = this.platformList[0].value;
        })
        .catch(err => console.error(err));
    },
    // -----------------------------------------------------------------------  保存和取消  --------------------------------------------------------
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("closeAddSingle");

          // 平台
          let transmissionPlatformReq = {};
          const hadPlatform = this.platformList.find(item => {
            return item.name === this.ruleForm.transemissionPlatform;
          });
          if (hadPlatform) {
            transmissionPlatformReq = hadPlatform;
          } else {
            transmissionPlatformReq = {
              id: "",
              name: this.ruleForm.transemissionPlatform
            };
          }
          // 渠道标签
          let channelTagList = [];
          if (this.checkedChannelName && this.ruleForm.channelName) {
            // 是否有渠道名称标签
            const hadTagChannelName = this.tagList.find(item => {
              return item.tagInfoRespDto.tagRuleId === 2;
            });
            if (hadTagChannelName) {
              channelTagList.push({
                tagInfoReqDto: {
                  id: hadTagChannelName.tagInfoRespDto.id,
                  tagName: this.ruleForm.channelName,
                  tagRuleId: 2
                }
              });
            } else {
              channelTagList.push({
                tagInfoReqDto: {
                  tagName: this.ruleForm.channelName,
                  tagRuleId: 2
                }
              });
            }
          }
          debugger;
          if (this.checkedPlatform && this.ruleForm.transemissionPlatform) {
            // 是否有传播平台标签
            const hadTagPlatform = this.tagList.find(item => {
              return item.tagInfoRespDto.tagRuleId === 3;
            });
            if (hadTagPlatform) {
              channelTagList.push({
                tagInfoReqDto: {
                  id: hadTagPlatform.tagInfoRespDto.id,
                  tagName: this.ruleForm.transemissionPlatform,
                  tagRuleId: 3
                }
              });
            } else {
              channelTagList.push({
                tagInfoReqDto: {
                  tagName: this.ruleForm.transemissionPlatform,
                  tagRuleId: 3
                }
              });
            }
          }

          let params = {
            channelName: this.ruleForm.channelName,
            transmissionPlatformReq: transmissionPlatformReq,
            channelTagList: channelTagList
          };
          if (this.isEdit) {
            params.id = this.channelId;
            update(params)
              .then(res => {
                let { respCode, message } = res;
                if (respCode === "0000") {
                  this.$emit("closeAddSingle");
                  this.$message.success(message);
                  this.pageIndex.pageIndex = 1;
                  this.$emit("getData", {
                    pageNumber: this.pageIndex.pageNumber,
                    pageSize: this.pageIndex.pageSize
                  });
                  this.$refs[formName].resetFields();
                  this.tagList = [];
                }
              })
              .catch(err => console.error(err));
          } else {
            add(params)
              .then(res => {
                let { respCode, message } = res;
                if (respCode === "0000") {
                  this.$emit("closeAddSingle");
                  this.$message.success(message);
                  this.pageIndex.pageIndex = 1;
                  this.$emit("getData", {
                    pageNumber: this.pageIndex.pageNumber,
                    pageSize: this.pageIndex.pageSize
                  });
                  this.$refs[formName].resetFields();
                  this.tagList = [];
                }
              })
              .catch(err => console.error(err));
          }
        }
      });
    },
    resetForm(formName) {
      this.$emit("closeAddSingle");
      this.$refs[formName].resetFields();
      this.ruleForm = {
        channelName: `自定义渠道${this.total + 1}`, //  渠道名称
        transemissionPlatform: this.platformList[0].value // 传播平台
      };
      this.checkedChannelName = true;
      this.checkedPlatform = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/color";

.el-autocomplete {
  width: 100%;
}

.form-item-right {
  padding-left: 20px;
}

.tags-wrap {
  .popover {
    position: absolute;
    left: -100px;

    i {
      color: $mop-text-gray;
      font-size: 14px;
    }
  }
}

.tag-channel {
  min-height: 100px;
  padding: 10px;
  border: 1px solid $mop-bg-dark;

  span {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    padding: 0 10px;
    border-radius: 4px;
    color: #e6a23c;
    background-color: rgba(230, 162, 60, 0.1);
    border-width: 1px;
    border-style: solid;
    border-color: rgba(230, 162, 60, 0.2);
    margin-right: 10px;
  }
}
</style>
