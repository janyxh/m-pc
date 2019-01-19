<template>
  <div class="mask-setting">
    <div class="preview">
      <div class="phone">
        <!-- 预览类型 -->
        <ul class="type">
          <li>
            <a @click="handleContent" :class="{active:isContent}">详情预览</a>
          </li>
          <li>
            <a @click="handleCircle" :class="{active:isCircle}">分享到朋友圈</a>
          </li>
          <li>
            <a @click="handleWeChat" :class="{active:isWeChat}">发送给朋友</a>
          </li>
        </ul>
        <img src="@/assets/images/content/iphone.png">
        <!-- 标题 -->
        <h4 v-show="isContent">营销中心标题</h4>
        <h4 v-show="isCircle">朋友圈</h4>
        <h4 v-show="isWeChat">受赠方账号名称</h4>
        <!-- h5秀 -->
        <iframe v-show="isContent" class="show" width="296" height="560" frameborder="0" src="https://v6.rabbitpre.com/m2/aUe1ZjFIem"></iframe>
        <!-- 朋友圈 -->
        <div v-show="isCircle" class="circle">
          <div>
            <img class="head" src="@/assets/images/content/head.png" alt>
          </div>
          <div class="info">
            <cite>受赠方账号名称</cite>
            <div class="introduction">
              <img src="@/assets/images/content/mop.png" alt>
              <p>
                {{settingForm.weChatTitle === "作品标题" || !settingForm.setWeChatView ? settingForm.title :
                settingForm.weChatTitle}}
              </p>
            </div>
            <div class="comment">
              <time>9分钟前</time>
              <img src="@/assets/images/content/comment.png" alt>
            </div>
          </div>
        </div>
        <!-- 发送给朋友 -->
        <div v-show="isWeChat" class="wechat">
          <div class="head">
            <img src="@/assets/images/content/head.png" alt>
            <div class="info">
              <cite>
                {{settingForm.weChatTitle === "作品标题" || !settingForm.setWeChatView ? settingForm.title :
                settingForm.weChatTitle}}
              </cite>
              <div class="introduction">
                <p>
                  {{settingForm.weChatDescribe === "作品摘要" || !settingForm.setWeChatView ? settingForm.brief :
                  settingForm.weChatDescribe}}
                </p>
                <img src="@/assets/images/content/mop.png" alt>
              </div>
            </div>
          </div>
          <div class="action">
            <i class="iconfont icon-voice"></i>
            <span></span>
            <i class="iconfont icon-emoji"></i>
            <i class="iconfont icon-add"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="window">
      <el-form :model="settingForm" :rules="rules" ref="settingForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <img src="@/assets/images/content/cover.png" alt>
          </el-col>
          <el-col :span="18">
            <el-form-item label="标题" prop="title">
              <el-input v-model="settingForm.title"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="brief">
              <el-input v-model="settingForm.brief"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-checkbox-group v-model="settingForm.setWeChatView" @change="handleChangeSetWechat" class="chx-set-wechat">
          <el-checkbox label="设置微信分享时样式"></el-checkbox>
        </el-checkbox-group>
        <div v-if="settingForm.setWeChatView" class="bg-set-wechat">
          <el-form-item label="标题" prop="weChatTitle" ref="weChatTitle">
            <!-- <el-input v-model="contentStyle.weChatTitle"></el-input> -->
            <el-input placeholder="请输入内容" v-model="settingForm.weChatTitle" :disabled="settingForm.weChatTitleType === 0">
              <el-select v-model="settingForm.weChatTitleType" slot="prepend" placeholder="请选择" @change="changeTitle(settingForm.weChatTitleType)">
                <el-option label="标题" :value="0"></el-option>
                <el-option v-for="item in titleList" :key="item.id" :label="item.titleKey" :value="item.id"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="摘要" prop="weChatDescribe" ref="weChatDescribe">
            <!-- <el-input v-model="settingForm.weChatDescribe"></el-input> -->
            <el-input placeholder="请输入内容" v-model="settingForm.weChatDescribe" :disabled="settingForm.weChatDescribeType === 0">
              <el-select v-model="settingForm.weChatDescribeType" slot="prepend" placeholder="请选择" @change="changeDescribe(settingForm.weChatDescribeType)">
                <el-option label="摘要" :value="0"></el-option>
                <el-option v-for="item in describeList" :key="item.id" :label="item.titleKey" :value="item.id"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="settingForm.useHeadFlag">封面使用分享者微信头像</el-checkbox>
          </el-form-item>
        </div>
        <p>内容标签设置</p>
        <setTages :tagArray="tagList" :tagsList="tagListHistory" @addTag="addTag"></setTages>
      </el-form>
      <div class="footer-setting">
        {{getStatusText}}
        <p class="isSwitch">
          <el-tooltip :content="getStatus(settingForm.status)" placement="top">
            <i v-if="settingForm.status === 0" class="iconfont icon-switch-close" @click="handleDraft"></i>
            <i v-else-if="settingForm.status === 1" class="iconfont icon-switch-open" @click="handleReleased"></i>
            <i v-else-if="settingForm.status === 2" class="iconfont icon-switch-open icon-switch-relation"></i>
          </el-tooltip>
        </p>
        <el-button type="primary" size="small" @click="submitForm('settingForm')">保存设置</el-button>
        <!-- <el-button @click="resetForm('settingForm')">重置</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  getContentInfo,
  getDictStyleList,
  getTagInfoList,
  updateContentInfo,
  addTag
} from "@/api/content";
import setTages from "@/components/common/setTags";
import { getTagsList } from "@/mixins";
export default {
  props: ["id"],
  components: {
    setTages
  },
  data() {
    return {
      // idSetting: this.id,
      isContent: true, // h5秀
      isCircle: false, // 朋友圈
      isWeChat: false, // 微信
      titleList: [], // 微信设置 标题数组
      describeList: [], // 微信设置 摘要数组
      tagList: [], // 标签数组
      tagListHistory: [], // 历史标签数组
      settingForm: {
        // 表单
        title: "",
        brief: "",
        status: 0,
        weChatTitleType: 0,
        weChatTitle: "作品标题",
        weChatDescribeType: 0,
        weChatDescribe: "作品摘要",
        setWeChatView: true, // 设备微信分享样式
        useHeadFlag: 0 // 是否使用封面
      },
      rules: {
        // 验证规则
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          },
          {
            max: 48,
            message: "不能超过 48 个字符",
            trigger: "blur"
          }
        ],
        brief: [
          {
            required: true,
            message: "请输入摘要",
            trigger: "blur"
          },
          {
            max: 60,
            message: "不能超过 60 个字符",
            trigger: "blur"
          }
        ],
        weChatTitle: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          },
          {
            max: 48,
            message: "不能超过 48 个字符",
            trigger: "blur"
          }
        ],
        weChatDescribe: [
          {
            required: true,
            message: "请输入摘要",
            trigger: "blur"
          },
          {
            max: 60,
            message: "不能超过 60 个字符",
            trigger: "blur"
          }
        ]
      },
      inputVisible: false,
      inputValue: ""
    };
  },
  computed: {
    getStatusText: function() {
      let text;
      switch (this.settingForm.status) {
        case 0:
          text = "该内容为草稿状态，不可被营销事件引用";
          break;
        case 1:
          text = "该内容已发布，尚未关联任何营销事件";
          break;
        default:
          text = "该内容已关联";
      }
      return text;
    }
  },
  created() {
    this.getData();
    this.getDictStyleList();
    // this.getTagList();
  },
  methods: {
    // -----------------------------------------------------------------   获取数据    -------------------------------------------------------------------------------
    // 获取详情
    getData() {
      let params = {
        id: this.id
      };
      getContentInfo(params)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.setInfo(res);
            this.getTagList();
          }
        })
        .catch(err => console.error(err));
    },
    async setInfo(res) {
      this.settingForm.title = res.data.contentInfo.title;
      this.settingForm.brief = res.data.contentInfo.brief;
      this.settingForm.status = res.data.contentInfo.status;
      if (res.data.contentStyle) {
        this.settingForm.weChatTitle = res.data.contentStyle.title;
        this.settingForm.weChatDescribe = res.data.contentStyle.brief;
        this.settingForm.weChatDescribeType =
          res.data.contentStyle.briefDictStyleId;
        this.settingForm.weChatTitleType =
          res.data.contentStyle.titleDictStyleId;
        this.settingForm.useHeadFlag = res.data.contentStyle.useHeadFlag
          ? true
          : false;
        this.settingForm.setWeChatView = true;
      } else {
        this.settingForm.setWeChatView = false;
      }
      res.data.tagInfoList
        ? (this.tagList = res.data.tagInfoList.map(item => {
            item.isSelect = true;
            return item;
          }))
        : (this.tagList = []);
    },
    // 获取样式字典列表数据
    getDictStyleList() {
      // 获取标题
      let paramsTitle = {
        type: 0
      };
      getDictStyleList(paramsTitle)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.titleList = res.data;
          }
        })
        .catch(err => console.error(err));
      // 获取摘要
      let paramsDescribe = {
        type: 1
      };
      getDictStyleList(paramsDescribe)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.describeList = res.data;
          }
        })
        .catch(err => console.error(err));
    },
    // 获取历史标签列表
    async getTagList() {
      let params = {
        tagType: 1
      };
      getTagInfoList(params)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            if (res.data && res.data.length > 0) {
              this.tagListHistory = getTagsList(this.tagList, res.data);
            } else {
              this.tagListHistory = [];
            }
          }
        })
        .catch(err => console.error(err));
    },
    // 获取状态
    getStatus(status) {
      switch (status) {
        case 0:
          status = "草稿";
          break;
        case 1:
          status = "已发布";
          break;
        case 2:
          status = "已关联";
          break;
        default:
          status = "";
      }
      return status;
    },
    // -----------------------------------------------------------------   预览视图    -------------------------------------------------------------------------------
    // 详情预览
    handleContent() {
      this.isContent = true;
      this.isCircle = false;
      this.isWeChat = false;
    },
    // 分享到朋友圈
    handleCircle() {
      this.isContent = false;
      this.isCircle = true;
      this.isWeChat = false;
    },
    // 发送给朋友
    handleWeChat() {
      this.isContent = false;
      this.isCircle = false;
      this.isWeChat = true;
    },
    // -----------------------------------------------------------------   操作    -------------------------------------------------------------------------------
    // 添加标签
    addTag(tagName) {
      if (tagName.trim() !== "") {
        let params = {
          tagName: tagName,
          tagRuleId: 1,
          tagType: 1
        };
        addTag(params)
          .then(res => {
            let { respCode } = res;
            if (respCode === "0000") {
              let arr = res.data;
              arr.isSelect = true;
              this.tagList.push(res.data);
              this.tagListHistory.push(res.data);
            }
          })
          .catch(err => console.error(err));
      }
    },
    // 保存设置
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          let params = {
            contentInfo: {
              id: this.id,
              title: this.settingForm.title,
              brief: this.settingForm.brief,
              status: this.settingForm.status
            },
            tagInfoList: this.tagList
          };
          // 是否设置微信分享样式
          if (this.settingForm.setWeChatView) {
            params.contentStyle = {
              titleDictStyleId: this.settingForm.weChatTitleType,
              title: this.settingForm.weChatTitle,
              briefDictStyleId: this.settingForm.weChatDescribeType,
              brief: this.settingForm.weChatDescribe,
              useHeadFlag: this.settingForm.useHeadFlag ? 1 : 0
            };
          }
          updateContentInfo(params)
            .then(res => {
              let { respCode, message } = res;
              if (respCode === "0000") {
                this.$message.success(message);
                this.$emit("saveSetting");
              } else {
                this.$message.error(message);
              }
            })
            .catch(err => console.error(err));
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 设置微信分享时样式
    handleChangeSetWechat(val) {
      this.settingForm.setWeChatView = val;
    },
    // 选择标题
    changeTitle(id) {
      if (id === 0) {
        this.settingForm.weChatTitle = "作品标题";
      } else {
        const obj = this.titleList.find(item => {
          return item.id === id;
        });
        this.settingForm.weChatTitle = obj.titleValue;
      }
    },
    // 选择摘要
    changeDescribe(id) {
      if (id === 0) {
        this.settingForm.weChatDescribe = "作品摘要";
      } else {
        const obj = this.describeList.find(item => {
          return item.id === id;
        });
        this.settingForm.weChatDescribe = obj.titleValue;
      }
    },
    // 点击草稿，去发布
    handleDraft() {
      this.settingForm.status = 1;
      // this.$message.success("发布成功");
    },
    // 点击发布，转草稿
    handleReleased() {
      this.settingForm.status = 0;
      // this.$message("已转为草稿");
    }
  }
};
</script>


<style lang="scss">
@import "../../../assets/css/content/setting";
</style>
