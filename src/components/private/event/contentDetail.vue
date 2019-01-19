<template>
  <div class="event-show-page">
    <div class="show-content">
      <div class="left">
        <div class="mask">
          <img class="qr-code" src="@/assets/images/event/qr_code.png" alt>
          <h4>扫码预览</h4>
          <p @click="updateContentSkin">更换内容</p>
        </div>
        <div class="phone">
          <img src="@/assets/images/event/iphone.png">
          <!-- 标题 -->
          <h4 >招募令</h4>
          <!-- h5秀 -->
          <iframe class="show"  frameborder="0" src="https://v6.rabbitpre.com/m2/aUe1ZjFIem"></iframe>
        </div>
      </div>
      <div class="right">
        <div class="up">
          <p>内容</p>
          <i @click="openLinkDialog" class="iconfont icon-link">生成推广链接</i>
          <i @click="editContent" class="iconfont icon-edit">编辑内容</i>
        </div>
        <div class="down">
          <div class="item">
            <div class="label">内容名称：</div>
            <div class="value">
              <el-input v-model="contentData.name"  placeholder="请输入活动名称" size="small"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="label">微信主体：</div>
            <div class="value">
              <el-select size="small"  style="width: 100%" v-model="channelType" clearable placeholder="请选择小程序或服务号">
                <el-option v-for="item in channelLists" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </div>
          <div class="radio-item">
            <p>注：用于帮助企业获得受众的OpenID。</p>
            <div class="radio">
              <div class="line">
                <el-radio v-model="authType" label="1">静默授权</el-radio>
                <el-tooltip  style="margin-left: 10px" content="仅获得受众OpenID" placement="top">
                  <i class="iconfont icon-chan_pop_doubtsvg"></i>
                </el-tooltip>
              </div>
              <div class="line">
                <el-radio  v-model="authType" label="2">明文授权</el-radio>
                <el-tooltip style="margin-left: 10px" content="除了获得受众OpenID，还可获得受众头像、昵称等公开信息" placement="top">
                  <i class="iconfont icon-chan_pop_doubtsvg"></i>
                </el-tooltip>
              </div>
            </div>
            <div class="radio">
              <el-checkbox v-model="audienceChecked">受众不授权也可访问内容</el-checkbox>
            </div>
          </div>
          <div class="item" >
            <div class="label">推广时间：</div>
            <div class="value">
              <span>为内容设置多个推广时间段</span>
              <el-tooltip style="width: 20px" content="查看" placement="top">
                <i class="iconfont icon-view"></i>
              </el-tooltip>
              <el-tooltip content="添加活动时间段" placement="top">
                <i @click="addTimeLists" class="iconfont icon-new-item"></i>
              </el-tooltip>
            </div>
          </div>
          <div class="item" v-for="(item,index) in timesLists" :key="index">
            <div class="label"></div>
            <div class="value">
              <el-date-picker
                      style="width: 100%;height: 35px"
                      v-model="item.createTime"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="起始时间"
                      end-placeholder="终止时间"
                      :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <el-tooltip content="删除营销时间段" placement="top">
              <i v-if="index !== 0" @click="delTimeLists(index)" class="iconfont icon-del"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="footer">
          <el-button size="small" @click="saveContent" class="btn" type="primary">保存编辑</el-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import moment from "moment";
import {
  getMarketEventContent,
  getMarketEventContetChannelCfg,
  updateMarketEventContent
} from "@/api/event/index";
export default {
  components: {},
  data() {
    return {
      channelLists: [],
      channelType: "",
      authType: "",
      audienceChecked: "",
      timesLists: [{ createTime: "" }],
      contentData: {},
      createTime: "",
      pickerOptions: {
        //  时间选项
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
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
    this.getContentDetail();
  },
  mounted() {
    this.getChannelCfg();
  },
  methods: {
    getChannelCfg() {
      getMarketEventContetChannelCfg()
        .then(res => {
          if (res.respCode === "0000") {
            this.channelLists = res.data.list || {};
          }
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    addTimeLists() {
      this.timesLists.push({ createTime: "" });
    },
    delTimeLists(index) {
      this.timesLists.splice(index, 1);
    },
    getContentDetail() {
      let params = { id: this.id, contentInfoId: this.contentInfoId };
      getMarketEventContent(params)
        .then(res => {
          if (res.respCode === "0000") {
            this.contentData = res.data || {};
          }
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    saveContent() {
      updateMarketEventContent()
        .then(res => {
          if (res.respCode === "0000") {
            return 1;
          }
        })
        .catch(err => {
          window.console.error(err);
        });
    },
    editContent() {
      alert("编辑内容!");
    },
    openLinkDialog() {
      alert("生成推广链接!");
    },
    updateContentSkin() {
      alert("敬请期待");
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/event/details.scss";
</style>
