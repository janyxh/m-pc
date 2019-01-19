/*
* @Author: 陈炳廷
* @Desribe:点击页面单个增加按钮得弹框
* @Date: 2018-12-03 10:40:23
* @Last Modified by: mikey.zhaopeng
* @Last Modified time: 2018-12-07 11:57:34
*/

<template>
  <div class="singleChannel">

    <div class="addDiv">
      <el-button size="small" type="primary" @click="isSingleDialog" class="add-an">
        单个增加
      </el-button>
    </div>
    <el-dialog title="新增自定义渠道" :visible.sync="singleDialogVisible" width="40%" :before-close="handleClose">

      <el-row class="dialogContent" type="flex">

        <el-col :span="4" class="name">渠道名称:</el-col>
        <el-col :span="12">
          <el-input placeholder="请输入渠道名称" v-model="channelName" />
        </el-col>
        <el-col :span="6" class="label">
          <el-checkbox v-model="isChannelLabel" @change="setChannel">设为渠道标签</el-checkbox>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="4" class="name">传播平台:</el-col>
        <el-col :span="12">
          <el-autocomplete class="inline-input" v-model="platformName" :fetch-suggestions="querySearch" placeholder="请输入传播平台"
            value-key="name" @select="handleSelect" suffix-icon="el-icon-arrow-down"></el-autocomplete>
        </el-col>
        <el-col :span="6" class="label">
          <el-checkbox v-model="isPlatformLabel" @change="setPlatform">设为渠道标签</el-checkbox>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col
          :span="4"
          class="name"
        >广告组:</el-col>
        <el-col :span="12">
          <el-autocomplete
            class="inline-input"
            v-model="advName"
            :fetch-suggestions="querySearch_adv"
            placeholder="请输入广告组"
            @select="handleSelect_adv"
            suffix-icon="el-icon-arrow-down"
          ></el-autocomplete>
        </el-col>
        <el-col
          :span="6"
          class="label"
        >
          <el-checkbox
            v-model="isAdvLabel"
            @change="setAdv"
          >设为渠道标签</el-checkbox>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="4" class="name">渠道标签</el-col>
        <el-col :span="18">
          <div class="channelBorder">
            <el-row :gutter="20">
              <el-col v-for="(item,index) in channelSum" :span="6" :key="index">

                <el-input v-model="item.value" size='small' disabled></el-input>

              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!-- <el-row
        type="flex"
        justify="end"
      > -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSingle">取 消</el-button>

        <el-button type="primary" @click="singleSure">确 定</el-button>
      </span>
      <!-- </el-row> -->

    </el-dialog>

  </div>

</template>

<script>
import API from "@/api/channelCenter/customChannel";
export default {
  data() {
    return {
      singleDialogVisible: false,
      //是否设置为渠道名称
      isChannelLabel: true,
      //是否传播平台
      isPlatformLabel: true,
      //是否广告
      isAdvLabel: false,
      //传播平台
      platformName: "",
      platformNameId: "",
      //广告组
      advName: "",
      //传播平台数据
      restaurants: [],
      transemissionPlatformArray: [],
      //广告组平台数据
      advs: [],
      //渠道标签汇总
      channelSum: [],
      channelName: ""
    };
  },
  props: {
    channelId: {
      type: String,
      default: ""
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 取消绑定
    cancelBind() {
      this.singleDialogVisible = false;
      this.platformName = "";
      this.advName = "";
      this.channelName = "";
      this.isChannelLabel = true;
      this.isAdvLabel = true;
      this.isPlatformLabel = true;
      this.channelSum = [];
    },
    handleClose() {
      this.singleDialogVisible = false;
      this.platformName = "";
      this.advName = "";
      this.channelName = "";
      this.isChannelLabel = true;
      this.isAdvLabel = true;
      this.isPlatformLabel = true;
      this.channelSum = [];
      this.$emit("channelIdAction");
    },
    cancelSingle() {
      this.singleDialogVisible = false;
      this.platformName = "";
      this.advName = "";
      this.channelName = "";
      this.isChannelLabel = true;
      this.isAdvLabel = true;
      this.isPlatformLabel = true;
      this.channelSum = [];
      this.$emit("channelIdAction");
    },
    //将渠道设置为标签
    setChannel() {
      const that = this;
      if (!this.channelName) {
        this.$message("渠道名称不能为空");
        this.isChannelLabel = false;
        return;
      }
      if (this.isChannelLabel) {
        this.channelSum.push({
          value: this.channelName
        });
      } else {
        const i = this.channelSum.findIndex(function(item, index, arr) {
          return item.value === that.channelName;
        });
        this.channelSum.splice(i, 1);
      }
    },
    //将传播平台设置为标签
    setPlatform() {
      if (!this.platformName) {
        this.$message("传播平台不能为空");
        this.isPlatformLabel = false;
        return;
      }
      const that = this;
      if (this.isPlatformLabel) {
        this.channelSum.push({
          value: this.platformName
        });
      } else {
        const i = this.channelSum.findIndex(function(item, index, arr) {
          return item.value === that.platformName;
        });
        this.channelSum.splice(i, 1);
      }
    },
    //将广告组设置为标签
    setAdv() {
      if (!this.advName) {
        this.$message("广告组不能为空");
        this.isAdvLabel = false;
        return;
      }
      const that = this;
      if (this.isAdvLabel) {
        this.channelSum.push({
          value: this.advName
        });
      } else {
        const i = this.channelSum.findIndex(function(item, index, arr) {
          return item.value === that.advName;
        });
        this.channelSum.splice(i, 1);
      }
    },
    isSingleDialog() {
      this.singleDialogVisible = !this.singleDialogVisible;
      //判断是否是点击编辑进来还是单个增加按钮进来
      this.$emit("updateEdit");
    },
    singleSure() {
      if (!this.channelName) {
        this.$message("请输入渠道名称");
        return;
      } else if (!this.platformName) {
        this.$message("请输入传播平台名称");
        return;
      }
      if (!this.isEdit) {
        console.log("点击单个增加按钮进来");
        const that = this;
        this.singleDialogVisible = !this.singleDialogVisible;

        if (this.channelSum.length === 2) {
          var params = {
            channelName: this.channelName,
            transmissionPlatformReq: {
              name: this.platformName,
              id: this.platformNameId
            },
            channelTagList: [
              {
                tagInfoReqDto: {
                  tagName: this.channelSum[0].value
                }
              },
              {
                tagInfoReqDto: {
                  tagName: this.channelSum[1].value
                }
              }
            ]
          };
        } else if (this.channelSum.length === 1) {
          var params = {
            channelName: this.channelName,
            transmissionPlatformReq: {
              name: this.platformName,
              id: this.platformNameId
            },
            channelTagList: [
              {
                tagInfoReqDto: {
                  tagName: this.channelSum[0].value
                }
              }
            ]
          };
        } else {
          var params = {
            channelName: this.channelName,
            transmissionPlatformReq: {
              name: this.platformName,
              id: this.platformNameId
            }
          };
        }

        API.addChannel(params)
          .then(res => {
            if (res.data.data.respCode === "0000") {
              that.$message("成功添加渠道");
              that.cancelBind();
              // that.isEdit = false;
              that.$emit("addSuccess");
            }
          })
          .catch(err => {});
      } else {
        //更新渠道信息
        console.log("是点击编辑进来");
        if (this.channelSum.length === 2) {
          var params = {
            channelName: this.channelName,
            transmissionPlatformReq: {
              name: this.platformName,
              id: this.platformNameId
            },
            channelTagList: [
              {
                tagInfoReqDto: {
                  tagName: this.channelSum[0].value
                }
              },
              {
                tagInfoReqDto: {
                  tagName: this.channelSum[1].value
                }
              }
            ]
          };
        } else if (this.channelSum.length === 1) {
          var params = {
            channelName: this.channelName,
            transmissionPlatformReq: {
              name: this.platformName,
              id: this.platformNameId
            },
            channelTagList: [
              {
                tagInfoReqDto: {
                  tagName: this.channelSum[0].value
                }
              }
            ]
          };
        } else {
          var params = {
            channelName: this.channelName,
            transmissionPlatformReq: {
              name: this.platformName,
              id: this.platformNameId
            }
          };
        }
        API.updateChannelInfo(params)
          .then(res => {
            if (res.data.data.respCode === "0000") {
              this.$message("成功更新渠道");
              this.cancelBind();
              this.singleDialogVisible = false;
              this.$emit("channelIdtoNull");
              this.$emit("addSuccess");
            }
          })
          .catch(err => {});
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      this.platformNameId = item.id;
    },
    // handleChange(value) {
    //   console.log(value, "value");
    // },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    // querySearch_adv(queryString, cb) {
    //   var advs = this.advs;
    //   var results_adv = queryString
    //     ? advs.filter(this.createFilter_adv(queryString))
    //     : advs;
    //   // 调用 callback 返回建议列表的数据
    //   cb(results_adv);
    // },
    // handleSelect_adv(item) {
    //   //console.log(item);
    // },
    // createFilter_adv(queryString) {
    //   return restaurant => {
    //     return (
    //       restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
    //       0
    //     );
    //   };
    // },

    loadAll() {
      //请求传播平台的下拉数据
      API.fetchPlatform()
        .then(res => {
          console.log(res, "传播平台数据");
          if (res.data.respCode == "0000") {
            this.restaurants = res.data.data;
          }
        })
        .catch(err => {});
    },
    loadAll_adv() {
      //请求广告组的下拉数据
      return [
        {
          value: "广告111",
          address: "长宁区新渔路144号"
        },
        {
          value: "广告222",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "广告333",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        {
          value: "广告444",
          address: "天山西路438号"
        }
      ];
    },
    //获取编辑信息
    getChannelInfo() {
      API.fetchChannelInfo(this.channelId)
        .then(res => {
          // 渠道名称
          this.channelName = res.data.data.channelName;
          //平台名称
          this.platformName = res.data.data.transemissionPlatformName;
          //平台id
          this.platformNameId = res.data.data.transemissionPlatform;
          res.data.data.channelTagList.forEach((item, index) => {
            this.channelSum.push({
              value: item.tagInfoRespDto.tagName
            });
          });
          //后端需要返回个状态值判断是否勾选了设为渠道标签
          if (
            this.channelSum[0].value === this.channelName ||
            this.channelSum[0].value === `副本-${this.channelName}`
          ) {
            this.isChannelLabel = true;
          }

          if (this.channelSum[1].value === this.platformName) {
            this.isPlatformLabel = true;
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.loadAll();

    //判断是否是点击编辑进来
    //this.advs = this.loadAll_adv();
    // if (this.channelId) {
    //   console.log("已经点击父组件");
    // }
    console.log(this.isEdit, "第一次进来的edit");
  },
  watch: {
    channelId(current, old) {
      if (current) {
        this.getChannelInfo();
      }
    },
    isEdit(current, old) {
      console.log(current, "isedit");
    },
    channelName(current, old) {
      if (current) {
        this.$set(this.channelSum, 0, {
          value: current
        });
      }
    },
    platformName(current, old) {
      // if (current) {
      //   this.channelSum.push({ value: current });
      // }
      //这个索引不能这样写，如果渠道名称没选
      if (current) {
        this.$set(this.channelSum, 1, {
          value: current
        });
      }
    }
  }
};
</script>

<style lang='scss'>
.singleChannel {
  .set {
    text-align: center;
  }

  .addDiv {
    text-align: right;
  }

  .el-dialog__header {
    line-height: 28px;
  }

  .addBtn {
    margin-left: 10px;
    border: 1px solid #34a4dd;
    color: #34a4dd;

    &:hover {
      color: #fff;
      background: #34a4dd;
    }
  }

  .name {
    text-align: center;
  }

  .inline-input {
    width: 100%;
  }

  .channelBorder {
    border: 1px dashed #dddddd;
    height: 100px;
    box-sizing: border-box;
    padding: 10px;

    .el-input {
    }

    .el-input__inner {
      border-radius: 20px;
      border: 1px solid #ff8a0c;
      background: #fff;
    }
  }

  .el-row {
    margin-bottom: 20px;
  }

  .label {
    text-align: right;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
