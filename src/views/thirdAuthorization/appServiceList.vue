<template>
  <div class="service-list-page">
    <div class="list-screening">
      <div class="list-tatol">全部（{{listData.totalCount}}）</div>
      <div class="list-tatol" @click="isOpenScreen">
        筛选条件
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </div>
      <el-button @click="openCreatePop" class="add-an" type="primary" size="small">快速创建
        <el-tooltip class="item" effect="light" placement="top">
          <div slot="content">已认证的服务号可授权第三
            <br>方平台快速注册并认证小程
            <br>序，每月可注册5个。
          </div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-button>
      <el-button @click="openAtPop" class="add-an" type="primary" size="small">绑定小程序</el-button>
      <el-input
        placeholder="请输入关键字"
        v-model="keyword"
        class="input-with-select screen-input"
        size="small"
      >
        <el-select class="screen-input2" v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="按小程序名称" value="1"></el-option>
        </el-select>
        <el-button slot="append" @click="sosoList" icon="el-icon-search"></el-button>
      </el-input>

      <div class="screen-bar" v-show="isShowScreenList">
        <div class="screen-bar-nr">
          <div class="screen-list">
            <p>认证状态</p>
            <el-select v-model="atType" placeholder="请选择" size="small">
              <el-option label="全部" :value="99"></el-option>
              <el-option label="已认证" :value="0"></el-option>
              <el-option label="未认证" :value="1"></el-option>
              <el-option label="已过期" :value="3"></el-option>
            </el-select>
          </div>
          <div class="screen-list">
            <p>授权状态</p>
            <el-select v-model="status" placeholder="请选择" size="small">
              <el-option label="全部" :value="99"></el-option>
              <el-option label="授权已取消" :value="0"></el-option>
              <el-option label="已授权" :value="1"></el-option>
            </el-select>
          </div>
          <div class="soso-bar">
            <el-button class="soso-an" type="info" @click="reset" plain size="small">重置</el-button>
            <el-button class="soso-an" @click="sosoList" type="primary" plain size="small">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="list-content">
      <div class="content-tips" v-if="isShowTips">
        重要提示：未认证或认证已过期的服务号因部相关接口功能不全，所以会影响贵司的业务开展。系统会对使用做必要的提示，如果想要正常使用相关功能，请务必先完成认证。
        <i
          @click="closeTips"
          class="el-icon-close"
        ></i>
      </div>
      <el-table
        :data="tableData"
        header-cell-class-name="table-title"
        v-loading="fullscreenLoading"
        style="width: 100%"
      >
        <el-table-column label="名称" width="300">
          <template slot-scope="scope">
            <el-popover placement="top-start" width="150" trigger="hover">
              <div class="table-first">
                <img :src="scope.row.qrcodeUrl">
                <a :href="scope.row.qrcodeUrl" class="down" target="_blank">下载小程序二维码</a>
              </div>
              <div class="first-tabt" slot="reference">
                <img class="photo-img" :src="scope.row.headImg">
                <p class="table-name">{{scope.row.nickName}}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="appId">
          <template slot-scope="scope">
            <input class="copeInput" type="text" :value="scope.row.authorizationAppid">
            <p class="cp" @click="copeAppId(scope.$index)">复制</p>
          </template>
        </el-table-column>
        <el-table-column label="认证状态">
          <template slot-scope="scope">
            <span
              v-if="scope.row.verifyTypeInfo===0"
              class="color1"
            >{{atTypeArr[scope.row.verifyTypeInfo]}}</span>
            <el-tooltip
              v-else-if="scope.row.verifyTypeInfo===1"
              class="item"
              effect="light"
              content="查看认证指引"
              placement="top"
            >
              <span @click="atTypeClick()" class="cp color2">{{atTypeArr[scope.row.verifyTypeInfo]}}</span>
            </el-tooltip>
            <el-tooltip
              v-else-if="scope.row.verifyTypeInfo===2"
              class="item"
              effect="light"
              content="需重新认证"
              placement="top"
            >
              <span class="cp color3" @click="atTypeClick()">{{atTypeArr[scope.row.verifyTypeInfo]}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="权限集">
          <template slot-scope="scope">
            <el-tooltip
              v-if="(scope.row.verifyTypeInfo===0||scope.row.verifyTypeInfo===2) && scope.row.unauthorizedStatus == 1"
              class="item"
              effect="light"
              content="系统提供了更多的微信功能，需要补充授权"
              placement="top"
            >
              <span
                class="cp look2"
                :class="{'color3':scope.row.unauthorizedStatus===0}"
                @click="lookAt(scope.row)"
              >追加授权</span>
            </el-tooltip>
            <p
              v-else-if="(scope.row.verifyTypeInfo===0||scope.row.verifyTypeInfo===2) && !scope.row.isNewAt"
              class="cp look"
              :class="{'color3':scope.row.verifyTypeInfo===2}"
              @click="lookAt(scope.row)"
            >查看</p>
            <p v-else class="color3">无</p>
          </template>
        </el-table-column>
        <el-table-column label="授权状态">
          <template slot-scope="scope">
            <el-tooltip
              v-if="(scope.row.verifyTypeInfo===0||scope.row.verifyTypeInfo===2) && scope.row.plateformStatus == 0"
              class="item"
              effect="light"
              content="重新授权"
              placement="top"
            >
              <span
                class="cp"
                :class="{'color3':scope.row.verifyTypeInfo===2}"
                @click="atStatusClick()"
              >{{statusArr[scope.row.plateformStatus]}}</span>
            </el-tooltip>
            <p
              :class="{'color3':scope.row.verifyTypeInfo===2}"
              v-else-if="(scope.row.verifyTypeInfo===0||scope.row.verifyTypeInfo===2) && scope.row.plateformStatus == 1"
            >{{statusArr[scope.row.plateformStatus]}}</p>
            <p v-else class="color3">无</p>
          </template>
        </el-table-column>
        <el-table-column label="关联公众号">
          <template slot-scope="scope">
            <p
              class="cp"
              v-if="scope.row.verifyTypeInfo===0||scope.row.verifyTypeInfo===2"
              @click="openRelationApp(scope.row)"
              :class="{'color3':scope.row.verifyTypeInfo===2}"
            >{{scope.row.plateformStatus===0?"曾":"已"}}关联{{scope.row.accountsTotal?scope.row.accountsTotal:0}}个</p>
            <p v-else class="color3">无</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand" trigger="click" @visible-change="setItem(scope)">
              <div class="xl-bar">
                <span @click.stop="details(scope.row)">查看</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">关联公众号</el-dropdown-item>
                <el-dropdown-item command="b">取消授权</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottom">
        <div class="page-bar">
          <el-pagination
            :pager-count="5"
            :page-size="8"
            @current-change="handleCurrentChange"
            :current-page="this.pageNumber"
            background
            layout="prev, pager, next"
            :total="listData.totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--绑定/授权/重新授权-->
    <el-dialog title="授权流程说明" :visible.sync="isShowAt" width="640px">
      <div class="step-bar">
        <img src="@/assets/images/thirdAuthorization/atStep.png">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAt = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmStep" size="small">立即授权</el-button>
      </span>
    </el-dialog>
    <!--取消授权-->
    <el-dialog title="取消授权说明" :visible.sync="isShowCancelAt" width="640px">
      <div class="cancel-at">
        <div class="at-left">
          <i class="el-icon-warning"></i>
        </div>
        <div class="at-right">
          <p>
            删除公众号后，请到微信公众平台系统中的【功能—添加功能插件—授权管理】中取
            消授权，以防公众号的使用报错；
            <a
              href="https://note.youdao.com/ynoteshare1/index.html?id=d46187966632c1c0bc4e45fcda98fbb4&type=note#/"
              target="_blank"
            >查看操作指引</a>
          </p>
          <p>
            取消授权后若要重新绑定公众号，请点击页面右上角的【新增绑定】按钮重新走授权
            流程。
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowCancelAt = false" size="small">取 消</el-button>
        <el-button type="primary" @click="isShowCancelAt = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--查看详情-->
    <el-dialog class="details-dialog" title="查看内容" :visible.sync="isShowDetails" width="720px">
      <div class="details-bar">
        <div class="details-top">
          <img src="@/assets/images/content/qr_code.png">
          <ul class="top-right">
            <li>
              <label>AppID</label>
              <div class="top-nr">{{curItem.authorizationAppid}}</div>
              <input id="app_id" type="text" :value="curItem.authorizationAppid">
              <el-button type="primary" @click="copeThisId" size="small">复制</el-button>
            </li>
            <li>
              <label>服务号名称</label>
              <div class="top-nr2">{{curItem.nickName}}</div>
            </li>
          </ul>
        </div>
        <ul class="details-list">
          <li>
            <p>认证状态</p>
            <b>{{atTypeArr[curItem.verifyTypeInfo]}}</b>
            <span v-if="curItem.verifyTypeInfo !== 0" @click="atTypeClick()">去认证</span>
          </li>
          <li>
            <p>授权状态</p>
            <b
              v-if="curItem.verifyTypeInfo===0||curItem.verifyTypeInfo===2"
            >于{{curItem.updateTime}} {{statusArr[curItem.plateformStatus]}}</b>
            <!--TODO:精确到时分-->
            <b v-else>无</b>
            <span
              v-if="curItem.verifyTypeInfo===0||curItem.plateformStatus===0"
              @click="openAtPop()"
            >重新授权</span>
          </li>
          <li>
            <p>权限集</p>
            <b
              class="color1"
              @click="lookAt(curItem)"
              v-if="curItem.verifyTypeInfo===0||curItem.verifyTypeInfo===2"
            >查看
              <el-tooltip class="item" effect="light" placement="top">
                <div slot="content">注：为保证您在平台的各项
                  <br>功能使用正常，请保证您已
                  <br>将所有权限集授权给数商
                </div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </b>
            <b v-else>无</b>
            <span
              v-if="curItem.verifyTypeInfo===0||curItem.verifyTypeInfo===2"
              @click="lookWecatDoc"
            >查看微信API文档</span>
          </li>
          <li>
            <p>关联公众号</p>
            <b
              v-if="curItem.verifyTypeInfo===0||curItem.verifyTypeInfo===2"
            >{{curItem.plateformStatus===0?"曾":"已"}}关联{{curItem.accountsTotal?curItem.accountsTotal:0}}个</b>
            <b v-else>无</b>
            <span
              @click="openRelationApp(curItem)"
              v-if="curItem.verifyTypeInfo===0||curItem.verifyTypeInfo===2"
            >关联公众号</span>
          </li>
          <li>
            <p>功能介绍</p>
            <div>{{curItem.signature}}</div>
          </li>
          <li>
            <p>主体名称</p>
            <b>中企动力科技股份有限公司 (企业)</b>
          </li>
          <li>
            <p>服务类目</p>
            <b>--</b>
            <!--TODO:-->
          </li>
          <li>
            <p>成员管理</p>
            <b>
              已有{{tyList.length}}个微信体验者
              <!-- <el-popover placement="top" width="170" trigger="click">
                <ul class="wx-list">
                  <li v-for="(item, index) in tyList" :key="index">{{item.userstr}}</li>
                </ul>
                <a slot="reference">查看</a>
              </el-popover>-->
            </b>
            <span>
              <a @click="openBindWx">绑定</a>
              <a @click="openUnbindWx">解绑</a>
            </span>
          </li>
          <li></li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDetails = false" size="small">取消</el-button>
        <el-button type="primary" @click="isShowDetails = false" size="small">确定</el-button>
      </span>
    </el-dialog>
    <!--绑定体验者-->
    <el-dialog title="绑定体验者" :visible.sync="isShowBindWx" width="460px">
      <div class="details-pop-bar">
        <div class="edit-bar">
          <label>微信号码：</label>
          <el-input placeholder="请输入微信号" v-model="wxNum" maxlength="20" clearable size="small"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowBindWx = false" size="small">取消</el-button>
        <el-button type="primary" @click="_bandTy" size="small">确定</el-button>
      </span>
    </el-dialog>
    <!--解除体验者-->
    <el-dialog title="解绑体验者" :visible.sync="isShowUnbindWx" width="460px">
      <div class="details-pop-bar">
        <div class="edit-bar">
          <label>微信号码：</label>
          <el-input placeholder="请输入微信号" v-model="wxNum2" maxlength="20" clearable size="small"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowUnbindWx = false" size="small">取消</el-button>
        <el-button type="primary" @click="_unbandTy" size="small">确定</el-button>
      </span>
    </el-dialog>
    <!--权限集查询-->
    <el-dialog title="权限集查询" :visible.sync="isShowLookJurisdiction" width="720px">
      <div class="look-power">
        <div class="look">
          <h5>
            已授权的列表
            <span @click="gotoDoc">权限说明</span>
          </h5>
          <ul class="look-list">
            <li v-for="(item, index) in PermissionsList.authorizedFuncList" :key="index">
              <i></i>
              {{wxPermissions[item.id]}}
            </li>
          </ul>
        </div>
        <div class="look">
          <h5>未授权的列表</h5>
          <ul class="look-list not-look">
            <li v-for="(item, index) in PermissionsList.unauthorizedFuncList" :key="index">
              <i></i>
              {{wxPermissions[item.id]}}
            </li>
          </ul>
        </div>
        <div class="clear"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowLookJurisdiction = false" size="small">取 消</el-button>
        <el-button type="primary" @click="openReAt" size="small">重新授权</el-button>
      </span>
    </el-dialog>
    <!--关联小程序-->
    <el-dialog title="关联公众号说明" :visible.sync="isShowRelation" width="720px">
      <div class="relation">
        <div class="r-top">
          <div class="r-t-top">
            <img src="../../assets/images/nav/logo.png">
            <p>{{curItem.nickName}}公众号共关联{{curItem.accountsTotal?curItem.accountsTotal:0}}个小程序，其中有x个已关联到MOP</p>
            <span>小程序关联权限集</span>
          </div>
          <ul class="app-list">
            <li v-for="(item, index) in appList" :key="index">
              <i
                class="i-bar"
                :class="{'bg1':item.plateformStatus === 1,'bg2':item.plateformStatus === 0}"
              ></i>
              <img src="../../assets/images/nav/logo.png">
              <p>{{item.nickname}}</p>
              <span v-if="item.plateformStatus === 1" @click="copeAppId(index)">
                <input class="copeInput" type="text" :value="item.appAppletsId">复制AppID
              </span>
              <span v-else @click="openAtPop2()">授权给系统</span>
            </li>
          </ul>
          <ul class="remarks-list">
            <li>
              <span>注：</span>
              <i class="i-bar bg1"></i>已授权给系统的小程序
            </li>
            <li>
              <i class="i-bar bg2"></i>未授权给系统的小程序
            </li>
            <!-- <li>
              <i class="i-bar bg3"></i>已经发起关联邀请
            </li>-->
          </ul>
        </div>
        <p>该小程序还可以关联同主体服务号x个和不同主体服务号x个</p>
        <div>
          <i></i>
          方式一：关联已有小程序
          <span @click="justRelation">立即关联</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowRelation = false" size="small">取 消</el-button>
        <el-button type="primary" @click="openAtPop" size="small">重新授权</el-button>
      </span>
    </el-dialog>
    <!--立即关联-->
    <el-dialog class="app-dialog" title="小程序信息设置" :visible.sync="isShowRelationApp" width="640px">
      <div class="relation-app">
        <img src="@/assets/images/thirdAuthorization/app-step.png">
        <div class="rel-box">
          <p>
            <i></i>确定要关联的服务号
          </p>
          <div class="app-name">
            <label>小程序：</label>
            <div class="name-box">
              <img src="../../assets/images/nav/logo.png">
              <span>{{curItem.nickName}}</span>
            </div>
          </div>
          <div class="app-name">
            <label>关联公众号：</label>
            <div class="name-box2">
              <el-select v-model="linkAppID" placeholder="请选择要关联的服务号" size="small">
                <el-option
                  v-for="(item, index) in appWxList"
                  :key="index"
                  :label="item.nickName"
                  :value="item.authorizationAppid"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowRelationApp = false" size="small">取 消</el-button>
        <el-button type="primary" @click="setLink" size="small">发送关联邀请</el-button>
      </span>
    </el-dialog>
    <!--创建小程序 第一步-->
    <el-dialog title="选择复用的已认证服务号 " :visible.sync="isShowCreateFirst" width="720px">
      <div class="create-app">
        <img src="../../assets/images/thirdAuthorization/app-first.png">
        <div class="app-name">
          <label>主体服务账号：</label>
          <el-select v-model="AppID" placeholder="请选择要关联的服务号" size="small">
            <el-option
              v-for="(item, index) in appWxList"
              :key="index"
              :label="item.nickName"
              :value="item.authorizationAppid"
            ></el-option>
          </el-select>
        </div>
        <div class="app-name2">
          <p>注：</p>
          <div>为帮助已有公众号用户快速接入小程序服务，公众平台新增“快速注册小程序”权限集。公众号可授权第三方平台快速注册并认证小程序。查看微信相关说明：复用公众号主体快速注册小程序。</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowCreateFirst = false" size="small">取 消</el-button>
        <el-button type="primary" @click="gotoCreateDoc" size="small">扫码创建</el-button>
      </span>
    </el-dialog>
    <!--创建小程序 第二步-->
    <!-- <el-dialog title="选择复用的已认证服务号 " :visible.sync="isShowCreateSecond" width="720px">
      <div class="create-app">
        <img src="../../assets/images/thirdAuthorization/app-second.png">
        <div class="form-bar">
          <h5>
            <i></i>补充小程序的基本信息，如名称、图标、描述等。
          </h5>
          <ul class="create-list">
            <li>
              <label>小程序AppID：</label>
              <el-input v-model="keyword" placeholder="123123213" size="small" :disabled="true"></el-input>
            </li>
            <li>
              <label>小程序名称：</label>
              <el-input v-model="keyword" maxlength="30" placeholder="请输入小程序名称" size="small"></el-input>
              <span>{{keyword.length}}/30</span>
            </li>
            <li>
              <label>小程序图标：</label>
              <div class="up-bar">
                <div class="up-left">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
                  </el-upload>
                </div>
                <p>注：</p>
                <div class="text-bar">
                  1.新头像不允许涉及政治敏感与色情;
                  <br>2.图片格式必须为：png,bmp,jpeg,jpg,gif；不可
                  大于2M;建议使用png格式图片,以保持最佳效果
                  <br>3.建议图片尺寸为144px*144px
                </div>
              </div>
            </li>
            <li>
              <label>小程序介绍：</label>
              <el-input
                type="textarea"
                v-model="keyword"
                maxlength="120"
                :autosize="{ minRows: 3, maxRows: 5}"
                placeholder="请输入小程序介绍"
                size="small"
              ></el-input>
              <span>{{keyword.length}}/120</span>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowCreateSecond = false" size="small">取 消</el-button>
        <el-button type="primary" @click="openAtPop" size="small">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>
<script>
import {
  getWxAppList,
  gitAPPLinkList,
  authorityWx,
  getPermissionsList,
  createApp,
  getTyAppList,
  bandTy,
  unbandTy,
  createAfter,
  authorityWxAfter,
  gitWxGzhList,
  linkSmallApp
} from "@/api/thirdAuthorization/third";
import moment from "moment";
import { vWorld } from "@/mixins/regCheck.js";
import { getQueryString } from "@/mixins/index.js";
export default {
  data() {
    return {
      regx: /^[0-9a-zA-Z]*$/g,
      wxNum: "",
      wxNum2: "",
      linkAppID: "",
      AppID: "",
      type: "1",
      keyword: "",
      atType: 99,
      status: 99,
      imageUrl: "",
      isShowCreateSecond: false,
      isShowCreateFirst: false,
      isShowRelationApp: false,
      isShowRelation: false,
      isShowLookJurisdiction: false,
      isShowUnbindWx: false,
      isShowBindWx: false,
      isShowDetails: false,
      isShowCancelAt: false,
      isShowAt: false,
      isShowTips: true,
      fullscreenLoading: false,
      isShowScreenList: false,
      auth_code: "",
      auth_type: "",
      comp_id: "",
      appWxList: [],
      appList: [],
      tyList: [],
      PermissionsList: {
        authorizedFuncList: [],
        unauthorizedFuncList: []
      },
      curItem: {},
      listData: {
        totalCount: 0
      },
      pageNumber: 1,
      atTypeArr: ["已认证", "未认证", "已过期"],
      statusArr: ["授权已取消", "已授权"],
      tableData: [],
      wxPermissions: {
        1: "消息管理权限",
        2: "自定义菜单权限",
        3: "用户管理权限",
        4: "网页服务权限",
        5: "微信小店权限",
        6: "微信多客服权限",
        7: "群发与通知权限",
        8: "微信卡券权限",
        9: "微信扫一扫权限",
        10: "微信连WI-FI权限",
        11: "素材管理权限",
        12: "微信摇周边权限",
        13: "微信门店权限",
        15: "自定义菜单权限",
        22: "微信门店权限",
        24: "微信开放平台帐号绑定权限",
        26: "微信电子发票权限",
        27: "快速注册小程序权限",
        33: "小程序管理权限",
        17: "帐号管理权限", // 小程序权限
        18: "开发管理与数据分析权限",
        19: "客服消息管理权限",
        30: "小程序基本信息设置权限",
        31: "小程序认证权限",
        37: "小程序附近地点权限集",
        40: "小程序插件管理权限集"
      }
    };
  },
  mounted() {
    this.getList();
    this.auth_code = getQueryString("auth_code");
    this.auth_type = getQueryString("auth_type");
    this.comp_id = getQueryString("comp_id");
    this.ticket = getQueryString("ticket");
    this.aid = getQueryString("authorizerAppid");
    // 授权完成后调用
    if (this.auth_code && this.auth_type) {
      this._authorityWxAfter(this.auth_code, this.auth_type);
    }
    // 扫码创建后调用
    if (this.ticket && this.aid) {
      this._createAfter(this.ticket, this.aid);
    }
  },
  methods: {
    /**
     * 扫码创建后调用
     */
    _createAfter(a, b) {
      let getData = {
        ticket: a,
        authorizerAppid: b
      };
      createAfter(getData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.getList();
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 授权完成后调用
     */
    _authorityWxAfter(a, b, c) {
      let getData = {
        authCode: a,
        authType: b,
        comp_id: c
      };
      authorityWxAfter(getData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.getList();
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 获取列表
     */
    getList() {
      this.fullscreenLoading = true;
      let getData = {
        nickName: this.keyword,
        verifyTypeInfo: this.atType,
        plateformStatus: this.status,
        pageNumber: this.pageNumber,
        pageSize: 8
      };
      if (getData.verifyTypeInfo === 99) {
        delete getData.verifyTypeInfo;
      }
      if (getData.plateformStatus === 99) {
        delete getData.plateformStatus;
      }
      getWxAppList(getData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.fullscreenLoading = false;
            this.isShowScreenList = false;
            this.listData = res.data;
            this.tableData = res.data.items || [];
          }
        })
        .catch(err => console.error(err));
    },
    sosoList() {
      this.pageNumber = 1;
      this.getList();
    },
    reset() {
      this.keyword = "";
      this.atType = 99;
      this.status = 99;
      this.getList();
    },
    /**
     * 分页
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.getList();
    },
    /**
     * 打开隐藏筛选条件
     */
    isOpenScreen() {
      this.isShowScreenList = !this.isShowScreenList;
    },
    /**
     * 关闭提示
     */
    closeTips() {
      this.isShowTips = false;
    },
    /**
     * 复制appId
     */
    copeAppId(index) {
      let e = document.querySelectorAll(".copeInput")[index];
      e.select();
      document.execCommand("copy");
      this.$message.success("复制成功！");
    },
    copeThisId() {
      let e = document.getElementById("app_id");
      e.select();
      document.execCommand("copy");
      this.$message.success("复制成功！");
    },
    /**
     * 认证点击事件
     */
    atTypeClick() {
      window.open(
        "https://note.youdao.com/share/?id=b04df98a6b5c2ac4627ba5c29f3b63d7&type=note#/"
      );
    },
    /**
     * 查看权限集
     */
    lookAt(row) {
      console.log(">>>>>", row);
      this.isShowLookJurisdiction = true;
      let data = {
        authType: 2,
        authorizerAppid: row.authorizationAppid
      };
      getPermissionsList(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            console.log(res.data);
            this.PermissionsList = res.data;
          }
        })
        .catch(err => console.error(err));
    },
    gotoDoc() {
      window.open(
        "https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419318459&lang=zh_CN"
      );
    },
    openReAt() {
      this.isShowLookJurisdiction = false;
      this.openAtPop();
    },
    /**
     * 关联公众号
     */
    openRelationApp(item) {
      this.isShowRelation = true;
      this.curItem = item;
      let getData = {
        appAppletsId: item.authorizationAppid
      };
      gitAPPLinkList(getData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            console.log(res.data);
            this.appList = res.data;
          }
        })
        .catch(err => console.error(err));
    },
    justRelation() {
      this.isShowRelationApp = true;
      gitWxGzhList({})
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            console.log(res.data);
            this.appWxList = res.data || [];
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 发送关联邀请
     */
    setLink() {
      let data = {
        accountsAppId: this.curItem.authorizationAppid,
        appletsAppId: this.linkAppID
      };
      linkSmallApp(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            if (res.data.code === 0) {
              this.$message.success("关联成功");
              this.isShowRelation = false;
            } else {
              this.$message.error(res.data.msg);
            }
          }
        })
        .catch(err => console.error(err));
    },
    gotoCreateDoc() {
      let data = {
        authorizerAppid: this.AppID
      };
      createApp(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            location.href = res.data;
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 授权状态点击事件
     */
    atStatusClick() {
      this.openAtPop();
    },
    /**
     * 打开下拉
     */
    setItem(item) {
      this.curItem = item;
    },
    /**
     * 单行操作
     */
    handleCommand(command) {
      if (command === "a") {
        this.openRelationApp(this.curItem);
      } else if (command === "b") {
        this.isShowCancelAt = true;
      }
    },
    /**
     * 查看详情
     */
    details(row) {
      this.curItem = row;
      this.curItem.updateTime = moment(this.curItem.updateTime).format(
        "YYYY-MM-DD HH:mm"
      );
      this.isShowDetails = true;
      let data = {
        authorizerAppid: row.authorizationAppid
      };
      getTyAppList(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.tyList = res.data.members || [];
          }
        })
        .catch(err => console.error(err));
    },
    lookWecatDoc() {
      window.open(
        "https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419318459&lang=zh_CN"
      );
    },
    /**
     * 打开授权
     */
    openAtPop() {
      this.isShowAt = true;
    },
    openBindWx() {
      this.isShowBindWx = true;
    },
    _bandTy() {
      let data = {
        authorizerAppid: this.curItem.authorizationAppid,
        wechartid: this.wxNum
      };
      const a = vWorld(data.wechartid);
      if (a) {
        this.$message.warning("微信号只能是字母和数字！");
        return;
      }
      bandTy(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            if (res.data.code === 0) {
              this.$message.success("操作成功！");
              this.isShowBindWx = false;
            } else {
              this.$message.error("操作失败！");
            }
          }
        })
        .catch(err => console.error(err));
    },
    openUnbindWx() {
      this.isShowUnbindWx = true;
    },
    _unbandTy() {
      let data = {
        authorizerAppid: this.curItem.authorizationAppid,
        wechartid: this.wxNum2
      };
      const a = vWorld(data.wechartid);
      if (a) {
        this.$message.warning("微信号只能是字母和数字！");
        return;
      }
      unbandTy(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            if (res.data.code === 0) {
              this.$message.success("操作成功！");
              this.isShowUnbindWx = false;
            } else {
              this.$message.error("操作失败！");
            }
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 立即授权
     */
    confirmStep() {
      this.isShowAt = false;
      let data = {
        authType: 2
      };
      authorityWx(data)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            location.href = res.data;
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 创建第一步
     */
    openCreatePop() {
      this.isShowCreateFirst = true;
      gitWxGzhList({})
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            console.log(res.data);
            this.appWxList = res.data || [];
          }
        })
        .catch(err => console.error(err));
    },
    openCreateNext() {
      this.isShowCreateSecond = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/css/thirdAuthorization/index.scss";
</style>
