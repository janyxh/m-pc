<template>
  <section id="login-index">
    <!-- 头部 -->
    <login-header></login-header>
    <!-- 中间 -->
    <section>
      <div class="box">
        <img class="pic" src="@/assets/images/login/login_top.png" alt="">
        <div class="form">
          <p class="title">登录</p>
          <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-width="100px" label-position="top" class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
              <el-input v-model="loginForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input v-model="loginForm.code"></el-input>
              <img :src="loginForm.codeImg" alt="">
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')" class="btn-large btn-login">登录</el-button>
            </el-form-item>
            <!-- <el-form-item class="login-text">
              <router-link to="/">忘记密码?</router-link>
            </el-form-item> -->
          </el-form>
        </div>
      </div>
    </section>
    <!-- 底部 -->
    <login-footer></login-footer>
  </section>
</template>

<script>
import LoginHeader from "@/components/private/login/login-header";
import LoginFooter from "@/components/private/login/login-footer";
import { login, getImgCode } from "@/api/login";
import CONST from "@/api/const";
export default {
  components: {
    "login-footer": LoginFooter,
    "login-header": LoginHeader
  },
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (value.length < 2) {
        callback(new Error("账号不得少于2位"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不得少于6位"));
      } else {
        // if (this.loginForm.checkPass !== "") {
        //   this.$refs.loginForm.validateField("checkPass");
        // }
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value.length < 4) {
        callback(new Error("验证码不得少于4位"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        pass: "",
        account: "",
        code: "",
        codeImg: ""
      },
      rules2: {
        pass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        account: [
          {
            validator: validateAccount,
            trigger: "blur"
          }
        ],
        code: [
          {
            validator: validateCode,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    // 获取验证码
    getCode() {
      getImgCode()
        .then(res => {
          console.log(res);
        })
        .catch(err => console.error(err));
    },
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          // login(this.account, this.pass, codeId, code)
          login(this.loginForm.account, this.loginForm.pass, 4545, 4578)
            .then(function(loginInfo) {
              try {
                if (loginInfo.status === CONST.response.SUCCESS) {
                  const data = JSON.parse(loginInfo.data);
                  const token = loginInfo.accessToken;
                  const info = loginInfo.info;
                  let sysmenu = this._createMenuTress(data.msfList);
                  localStorage.setItem("sysmenu", JSON.stringify(sysmenu));
                  localStorage.setItem(
                    "upload_url",
                    /* loginInfo.uploadUrl */
                    "/api_file_remote_upload.do"
                  );
                  localStorage.setItem("token", token);
                  localStorage.setItem("info", info);
                  // this.$router.push("/");
                  this.password_validate = "";
                } else {
                  this.password_validate = loginInfo.msg;
                }
              } catch (e) {
                console.log(e);
              }
            })
            .catch(e => {
              // this.password_validate = "网络异常";
              this.$message.error = "网络异常";
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
#login-index {
  // 中间
  section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
      width: 1000px;
      height: 560px;
      display: flex;
      box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.2);
      border-radius: 10px;

      // 表单
      .form {
        width: 100%;
        padding: 50px 120px 0px 120px;

        .title {
          font-size: 36px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          text-align: center;
          color: #34a4dd;
          padding-bottom: 20px;
        }

        .btn-login {
          margin-top: 40px;
        }

        .login-text {
          text-align: right;

          a {
            color: #898989;
            font-size: 12px;
          }
        }
      }
    }
  }

  // 覆盖 表单样式
  .el-input__inner {
    border: 0;
    border-bottom: 1px solid #dcdfe6;
    border-radius: 0;
    padding: 0;
  }

  .el-form-item__label {
    font-size: 12px;
    line-height: 18px;
    color: #898989;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0;
  }

  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus {
    border-color: #f56c6c;
  }

  .el-input__inner:focus {
    outline: none;
    border-color: #34a4dd;
  }

  .el-form-item__error {
    left: inherit;
    right: 0;
  }

  .el-form-item__content {
    line-height: 30px;
  }
}
</style>
