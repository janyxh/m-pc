<template>
  <div class="login-container">
    <div class="login-content">
      <div class="backimg">
        <div class="box">
          <div class="left">
            <img src="@/assets/images/login/leftBack.jpg" alt>
          </div>
          <div class="right">
            <div class="head" style="border-bottom: 1px solid #dcdfe6;">
              <p
                class="password"
                :class="{'form-select': activity_tab === 1}"
                @click="onTabChange(1)"
              >密码登录</p>
              <!-- <p class="code" :class="{'form-select': activity_tab === 2}" @click="onTabChange(2)">验证码登录</p> -->
            </div>
            <div class="form-word" v-show="activity_tab === 1">
              <!-- <Input v-model="password_phone" placeholder="请输入账号" /> -->
              <el-input v-model="password_phone" placeholder="请输入账号" size="small"></el-input>
              <!-- <Input type='password' v-model="password_password" placeholder="请输入密码" /> -->
              <el-input
                type="password"
                v-model="password_password"
                placeholder="请输入密码"
                size="small"
              ></el-input>
              <div class="form-input">
                <!-- <Input style="width: 300px;vertical-align:middle;display: inline-block" @on-blur="onInputBlur()"
                @keyup.enter.native="login" v-model="password_img_value" placeholder="请输入图形验证码" />-->
                <el-input
                  style="width: 300px;vertical-align:middle;display: inline-block"
                  @on-blur="onInputBlur()"
                  @keyup.enter.native="login"
                  v-model="password_img_value"
                  placeholder="请输入图形验证码"
                  size="small"
                />
                <img :src="password_img_content" @click="getCodeReq()" alt>
              </div>
              <div style="text-align: left">
                <el-checkbox disabled label="github" v-model="weekCheck">
                  <span>一周内免登录</span>
                </el-checkbox>
              </div>
              <div style="margin-top: 18px" class="word-btn">
                <p style="color: red;font-size: 12px;margin-bottom: 20px">{{password_validate}}</p>
                <el-button
                  type="primary"
                  size="small"
                  id="login"
                  @click="login()"
                  @keyup.enter.native="login"
                  class="word-ivu-btn"
                >
                  登
                  录
                </el-button>
              </div>
            </div>
            <div class="form-code" v-show="activity_tab === 2">
              <Input v-model="code_phone" placeholder="请输入手机号码"/>
              <div class="form-input">
                <Input
                  style="width: 300px;vertical-align:middle;display: inline-block"
                  v-model="code_img_value"
                  placeholder="请输入图形验证码"
                />
                <img :src="code_img_content" @click="getCodeReq()" alt>
              </div>
              <div class="form-input">
                <Input
                  style="width: 300px;vertical-align:middle;display: inline-block"
                  v-model="code_password"
                  placeholder="请输入短信验证码"
                />
                <Button
                  class="code-btn"
                  :class="{'code-disabled':!isSendCode}"
                  :disabled="!isSendCode"
                  @click="getPhoneCode()"
                  type="default"
                >{{sendCodeText}}</Button>
              </div>
              <div style="text-align: left">
                <el-checkbox disabled label="github" v-model="weekCheck">
                  <span>一周内免登录</span>
                </el-checkbox>
              </div>
              <div style="margin-top: 18px" class="code-btn">
                <p style="color: red;font-size: 12px;margin-bottom: 20px">{{code_validate}}</p>
                <Button
                  @keyup.enter="codeLogin"
                  @click="codeLogin()"
                  class="code-ivu-btn"
                  type="primary"
                >登 录</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="markname">
        <img src="@/assets/images/login/markName.png" alt>
      </div>
      <div class="remark">
        <div class="center">
          <p>版权所有 © 1999-2018 中企动力科技股份有限公司 Copyright © 1999-2018 300.cn All Rights Reserved</p>
          <p>京公网安备11030102010293号 京ICP证010249-2</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendPhoneCode, getImgCode, login } from "@/api/login";
// import { vPhone, vPassword, vCode, vSMS } from "@/mixins/regCheck";
import CONST from "@/api/const";
// import data from "../../api/data";

export default {
  data() {
    return {
      code_phone: "",
      /* 验证码登录-手机号 */
      code_password: "",
      /* 验证码登录-密码 */
      code_img_value: "",
      /* 校验码_验证码_值 */
      code_img_content: "",
      /* 校验码_验证码_图片 */
      code_img_id: "",
      code_validate: "",
      password_phone: "",
      /* 密码登录-手机号 */
      password_password: "",
      /* 密码登录-密码 */
      password_img_value: "",
      /* 密码_验证码_值 */
      password_img_content: "",
      /* 校验码_验证码_图片 */
      password_img_id: "",
      password_validate: "",
      weekCheck: false,
      backImg: "./combackImg",
      /* 公司背景图 */
      activity_tab: 1,
      isSendCode: true,
      sendCodeText: "获取验证码"
    };
  },
  created() {
    this.getCodeReq();
  },
  methods: {
    onInputBlur() {
      document.getElementById("login").focus();
    },
    onTabChange(index) {
      this.activity_tab = index;
      this.getCodeReq();
    },
    // _createMenuTress(lists) {
    //   /* 创建菜单权限 */
    //   let menuSys;
    //   let datas = {};
    //   if (lists) {
    //     lists.forEach(function(itor) {
    //       if (!datas[itor.parentId]) {
    //         datas[itor.parentId] = [];
    //       }
    //       var item = {};
    //       item.parentId = itor.parentId;
    //       item.id = itor.id;
    //       item.eleValue = itor.eleValue;
    //       item.name = itor.name;
    //       item.navType = itor.navType;
    //       item.seqnum = itor.seqnum;
    //       datas[item.parentId].push(item);
    //       if (!menuSys) {
    //         menuSys = item;
    //       } else if (parseInt(menuSys.parentId) > parseInt(item.parentId)) {
    //         menuSys = item;
    //       }
    //     });
    //   }
    //   for (const key in datas) {
    //     let items = datas[key];
    //     items.forEach(function(item) {
    //       item.children = datas[item.id];
    //     });
    //   }
    //   return menuSys;
    // },
    getCodeReq() {
      getImgCode()
        .then(res => {
          if (res.status === CONST.response.SUCCESS) {
            if (this.activity_tab === 1) {
              this.password_img_content = res.data.img;
              this.password_img_id = res.data.key;
            } else {
              console.log(res.data.img);
              this.code_img_content = res.data.img;
              this.code_img_id = res.data.key;
            }
          } else {
            if (this.activity_tab === 1) {
              this.password_validate = res.msg;
            } else {
              this.code_validate = res.msg;
            }
          }
        })
        .catch(() => {
          if (this.activity_tab === 1) {
            this.password_validate = "网络异常";
          } else {
            this.code_validate = "网络异常";
          }
        });
    },
    getPhoneCode() {
      if (!this.code_phone) {
        this.code_validate = "手机号码不可以为空 ";
        return false;
      }
      if (vPhone(this.code_phone)) {
        this.code_validate = "手机号或短信验证码输入错误，请重新输入！";
        return false;
      }
      this.code_validate = "";
      if (!this.isSendCode) {
        return false;
      }
      sendPhoneCode();
      this.isSendCode = false;
      let count = 60;
      this.sendCodeText = count + "s后获取";
      let timer = setInterval(() => {
        count--;
        this.sendCodeText = "重新获取" + count + "s";
        if (count <= 0) {
          clearInterval(timer);
          this.sendCodeText = "获取验证码";
          this.isSendCode = true;
        }
      }, 1000);
    },
    codeLogin() {
      /* 验证码登录 */
      if (!this.code_phone) {
        this.code_validate = "手机号码不可以为空 ";
        return false;
      }
      if (vPhone(this.code_phone)) {
        this.code_validate = "手机号输入错误，请重新输入！ ";
        return false;
      }
      if (!this.code_img_value) {
        this.code_validate = "图形验证码不可以为空 ";
        return false;
      }
      if (vCode(this.code_img_value)) {
        this.code_validate = "图形验证码格式错误，请重新输入！ ";
        return false;
      }
      if (!this.code_password) {
        this.code_validate = "短信验证码不可以为空 ";
        return false;
      }
      if (vSMS(this.code_password)) {
        this.code_validate = "短信验证码格式错误，请重新输入！ ";
        return false;
      }
      this.code_validate = "";
      this.$router.push("/");
    },
    login() {
      /* 密码登录 */
      if (!this.password_phone) {
        this.password_validate = "账户号码不可以为空 ";
        return false;
      }
      /* if (vPhone(this.password_phone)) {
                                          this.password_validate = '手机号输入错误，请重新输入！'
                                          return false
                                        } */
      if (!this.password_password) {
        this.password_validate = "密码不可以为空 ";
        return false;
      }
      /* if (vPassword(this.password_password)) {
                                          this.password_validate = '密码需为6-20位数字、字母和特殊符号的组合,不含空格，请重新输入！ '
                                          return false
                                        } */
      if (!this.password_img_value) {
        this.password_validate = "图形验证码不可以为空 ";
        return false;
      }
      /* if (vCode(this.password_img_value)) {
                                          this.password_validate = '图形验证码格式错误，请重新输入！ '
                                          return false
                                        } */
      const self = this;
      // localStorage.setItem('sysmenu', JSON.stringify(data))
      // self.$router.push('/')
      let phone = this.password_phone;
      let password = this.password_password;
      let code = this.password_img_value;
      let codeId = this.password_img_id;
      login(phone, password, codeId, code)
        .then(function(loginInfo) {
          try {
            if (loginInfo.status === CONST.response.SUCCESS) {
              // const data = JSON.parse(loginInfo.data);
              console.log("loginInfo", loginInfo);
              const token = loginInfo.accessToken;
              const info = loginInfo.info;
              // let sysmenu = self._createMenuTress(data.msfList);
              // localStorage.setItem("sysmenu", JSON.stringify(sysmenu));
              localStorage.setItem(
                "upload_url",
                /* loginInfo.uploadUrl */
                "/api_file_remote_upload.do"
              );
              localStorage.setItem("token", token);
              localStorage.setItem("info", info);
              self.$router.push("/");
              self.password_validate = "";
              self.$router.push("/workbench");
            } else {
              self.password_validate = loginInfo.msg;
            }
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => {
          self.password_validate = "网络异常";
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/login/index";
</style>
