<template>
  <el-form :model="addData" :rules="rules" ref="ruleForm2" label-width="160px" size="small">
    <el-dialog title="单个导入受众数据 " @closed="clearDataPop" :visible.sync="isShowAddNext" width="720px">
      <div class="audience-add-page">
        <div class="step-one2">
          <div class="step-bar">
            <div class="step-num-bar">
              <div class="step-num fl">1</div>
              <div class="step-line"></div>
              <div class="step-num fr">2</div>
            </div>
            <div class="step-text">
              <p class="fl">辅助ID输入</p>
              <p class="fr colr">导入提交</p>
            </div>
          </div>
          <div class="h30"></div>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="addData.name" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="addData.sex">
              <el-radio :label="0">未知</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="微信昵称：">
            <el-input v-model="addData.nickName" maxlength="20" placeholder="请输入微信昵称" size="small"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input
              v-model="addData.phone"
              maxlength="11"
              placeholder="请输入手机号"
              :disabled="isNotEdit"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="addData.email" placeholder="请输入邮箱" size="small"></el-input>
          </el-form-item>
          <el-form-item label="openID：">
            <el-input
              v-model="addData.openId"
              placeholder="请输入OpenID"
              :disabled="!isNotEdit"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户阶段：">
            <el-select v-model="addData.audienceStage" placeholder="请选择客户阶段" size="small">
              <el-option label="未知 " :value="0"></el-option>
              <el-option label="印象认知阶段 " :value="1"></el-option>
              <el-option label="潜在兴趣阶段" :value="2"></el-option>
              <el-option label="意向考虑阶段 " :value="3"></el-option>
              <el-option label="行动购买阶段" :value="4"></el-option>
              <el-option label="售后维护阶段 " :value="5"></el-option>
              <el-option label="扩大销售阶段" :value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="addData.birth"
              type="date"
              placeholder="选择出生日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="addData.age" maxlength="3" placeholder="请输入年龄" size="small"></el-input>
          </el-form-item>
          <el-form-item label="QQ：" prop="qq">
            <el-input v-model="addData.qq" maxlength="15" placeholder="请输入QQ号" size="small"></el-input>
          </el-form-item>
          <el-form-item label="微博：">
            <el-input v-model="addData.weibo" maxlength="20" placeholder="请输入微博号" size="small"></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况：">
            <el-select v-model="addData.marryFlag" placeholder="请选择婚姻状况" size="small">
              <el-option label="未知" :value="0"></el-option>
              <el-option label="未婚" :value="1"></el-option>
              <el-option label="已婚" :value="2"></el-option>
              <el-option label="离异" :value="3"></el-option>
              <el-option label="其他" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="兴趣爱好：">
            <el-input v-model="addData.hobby" maxlength="20" placeholder="请输入兴趣爱好" size="small"></el-input>
          </el-form-item>
          <el-form-item label="月收入：">
            <el-input
              v-model="addData.monthIncome"
              maxlength="20"
              placeholder="请选择月收入"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="教育程度：">
            <el-input v-model="addData.eduLevel" maxlength="20" placeholder="请选择教育程度" size="small"></el-input>
          </el-form-item>
          <el-form-item label="所在行业：">
            <el-input v-model="addData.industry" maxlength="20" placeholder="请选择所在行业" size="small"></el-input>
          </el-form-item>
          <el-form-item label="家庭成员数：" prop="folks">
            <el-input v-model="addData.folks" maxlength="3" placeholder="请输入家庭成员数" size="small"></el-input>
          </el-form-item>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddNext = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmAddPop('ruleForm2')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>
<script>
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      let regx = /^1\d{10}$/;
      if (!regx.test(value)) {
        return callback(new Error("请输入正确手机号码！"));
      }
      callback();
    };
    var validateOpenId = (rule, value, callback) => {
      let regx = /^[0-9a-zA-Z]*$/g;
      if (!regx.test(value)) {
        return callback(new Error("OpenID只能是字母或数字！"));
      }
      callback();
    };
    var validateAge = (rule, value, callback) => {
      let regx = /^[0-9]*$/g;
      if (!regx.test(value)) {
        return callback(new Error("请输入数字！"));
      }
      callback();
    };
    var validateQQ = (rule, value, callback) => {
      let regx = /^[0-9]*$/g;
      if (!regx.test(value)) {
        return callback(new Error("请输入正确的QQ！"));
      }
      callback();
    };
    var validateFolks = (rule, value, callback) => {
      let regx = /^[0-9]*$/g;
      if (!regx.test(value)) {
        return callback(new Error("请输入正确的家庭成员数！"));
      }
      callback();
    };
    return {
      isShowAddNext: false,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        openId: [{ validator: validateOpenId, trigger: "blur" }],
        age: [{ validator: validateAge, trigger: "blur" }],
        qq: [{ validator: validateQQ, trigger: "blur" }],
        folks: [{ validator: validateFolks, trigger: "blur" }]
      }
    };
  },
  props: {
    addData: {
      type: Object
    }
  },
  computed: {
    isNotEdit: function() {
      if (this.addData.externalSysId === 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {},
  methods: {
    showPop() {
      this.isShowAddNext = true;
    },
    hidePop() {
      this.isShowAddNext = false;
    },
    confirmAddPop(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("confirmAdd");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clearDataPop() {
      this.$emit("clearData");
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/css/audience/index.scss";
</style>
