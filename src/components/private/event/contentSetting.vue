<template>
  <div class="mask-setting">
    <div class="window">
      <el-form :model="eventForm" :rules="rules" ref="eventForm" label-width="80px">
        <el-row :gutter="20" >
          <el-col :span="18" style="width: 100%">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="eventForm.name" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="活动背景"  prop="context">
              <el-input v-model="eventForm.context" type="textarea" :rows="3" placeholder="请输入活动背景内容说明"></el-input>
            </el-form-item>
            <el-form-item label="活动封面" prop="imageUrl">
              <!-- <img :src="eventForm.imageUrl" alt>-->
              <img src="@/assets/images/content/cover.png" class="event-item-img" alt>
              <div class="event-item-img-desc">
                <p class="event-item-img-desc-font">上传图片作为活动的封面，如果未上传，系统会将第一个作品的封面默认为活动封
                  面。封面仅用于提高操作者的辨识度。</p>
                <p class="event-item-img-desc-font" style="margin-top: 20px">建议尺寸：240px*240px；格式png和jpg</p>
              </div>
            </el-form-item>
            <el-form-item label="活动时间" prop="createTime">
              <el-date-picker
                      style="width: 100%"
                      v-model="eventForm.createTime"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="起始时间"
                      end-placeholder="终止时间"
                      :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动预算" prop="budget">
              <el-input v-model="eventForm.budget" placeholder="请输入活动预算，单位（元）"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="add-footer-setting">
        <el-button class="footer-button" type="primary" size="small" @click="submitForm('eventForm')">{{btnName}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { addMarketEvent, updateMarketEventContent } from "@/api/event/index";
import moment from "moment";
export default {
  props: ["isNew", "detailsData", "btnName"],
  data() {
    return {
      eventForm: {
        // 表单
        name: "", // 活动名称
        context: "", // 活动背景
        imageUrl: "@/assets/images/content/cover.png", // 活动封面
        createTime: "", // 创建时间
        budget: "" // 活动预算
      },
      rules: {
        // 验证规则
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          },
          {
            max: 48,
            message: "不能超过 48 个字符",
            trigger: "blur"
          }
        ]
      },
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
      },
      inputVisible: false,
      inputValue: ""
    };
  },
  computed: {},
  created() {
    this.getData();
  },
  methods: {
    // -----------------------------------------------------------------   获取数据    -------------------------------------------------------------------------------
    // 获取详情
    getData() {
      if (this.isNew === false) {
        this.eventForm.id = this.detailsData.id;
        this.eventForm.name = this.detailsData.name;
        this.eventForm.context = this.detailsData.context;
        this.eventForm.imageUrl = this.detailsData.imageUrl;
        this.eventForm.createTime = this.detailsData.createTime;
        this.eventForm.budget = this.detailsData.budget;
        this.eventForm.name = this.detailsData.name;
      }
    },
    // 保存设置
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          let startTime, endTime;
          if (formName.createTime !== "" && formName.createTime.length > 0) {
            startTime = moment(formName.createTime[0]).format("YYYY-MM-DD");
            endTime = moment(formName.createTime[1]).format("YYYY-MM-DD");
          }
          let params = {
            name: formName.name,
            context: formName.context,
            imageUrl: formName.imageUrl,
            startTime: startTime,
            endTime: endTime,
            budget: formName.budget
          };
          if (this.isNew === false) {
            params.id = this.detailsData.id;
            updateMarketEventContent(params)
              .then(res => {
                let { respCode, message } = res;
                if (respCode === "0000") {
                  this.$message.success(message);
                  this.$emit("saveEventData");
                } else {
                  this.$message.error(message);
                }
              })
              .catch(err => window.console.error(err));
          } else {
            addMarketEvent(params)
              .then(res => {
                let { respCode, message } = res;
                if (respCode === "0000") {
                  this.$message.success(message);
                  this.$emit("saveEventData");
                } else {
                  this.$message.error(message);
                }
              })
              .catch(err => window.console.error(err));
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>


<style lang="scss">
@import "../../../assets/css/event/contentSetting";
</style>
