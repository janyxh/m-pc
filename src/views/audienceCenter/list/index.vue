<template>
  <div class="audience-list-page">
    <div class="list-screening">
      <div class="list-tatol">全部（{{listData.totalCount}}）</div>
      <div class="list-tatol" @click="isOpenScreen">
        筛选条件
        <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
      </div>
      <el-button class="add-an" @click="openAdd" type="primary" size="small">手动创建</el-button>
      <el-button class="add-an" @click="openBatchAdd" type="primary" size="small" plain>批量导入</el-button>
      <el-input
        placeholder="请输入关键字"
        v-model="keyword"
        class="input-with-select screen-input"
        size="small"
      >
        <el-select class="screen-input2" v-model="type" slot="prepend" placeholder="请选择">
          <el-option label="按名字" :value="1"></el-option>
          <el-option label="按昵称" :value="2"></el-option>
          <el-option label="按手机" :value="3"></el-option>
        </el-select>
        <el-button @click="soso" slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <div class="screen-bar" v-show="isShowScreenList">
        <div class="screen-bar-nr">
          <div class="screen-list">
            <p>选择性别</p>
            <el-select v-model="sex" placeholder="请选择" size="small">
              <el-option label="全部" value></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
              <el-option label="未知" value="0"></el-option>
            </el-select>
          </div>
          <div class="screen-list">
            <p>创建方式</p>
            <el-select v-model="creatFuc" placeholder="请选择" size="small">
              <el-option label="全部" value="0"></el-option>
              <el-option label="服务号" value="1"></el-option>
              <el-option label="小程序" value="2"></el-option>
              <el-option label="手动创建" value="3"></el-option>
              <el-option label="批量导入" value="4"></el-option>
            </el-select>
          </div>
          <div class="screen-list">
            <p>授权主体</p>
            <el-select v-model="subject" placeholder="请选择" size="small">
              <el-option label="全部" value="0"></el-option>
              <el-option label="服务号" value="1"></el-option>
              <el-option label="小程序" value="2"></el-option>
            </el-select>
          </div>
          <div class="screen-list">
            <p>辅助ID</p>
            <el-select v-model="auxiliary" placeholder="请选择" size="small">
              <el-option label="全部" value="0"></el-option>
              <el-option label="无" value="1"></el-option>
              <el-option label="有手机号" value="2"></el-option>
              <el-option label="有OpenId" value="3"></el-option>
              <el-option label="有UnionId" value="4"></el-option>
            </el-select>
          </div>
          <div class="screen-list">
            <p>近30天的互动次数</p>
            <div class="hd-num-bar">
              <input type="number" v-model="minNum" min="0" placeholder="请输入最小值">
              <span>—</span>
              <input type="number" v-model="maxNum" min="1" placeholder="最大值">
              <i class="el-icon-date"></i>
            </div>
          </div>
          <div class="screen-list">
            <p>最近一次互动时间</p>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              value-format="yyyy-MM-dd"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
              size="small"
            ></el-date-picker>
          </div>
          <div class="soso-bar">
            <el-button class="soso-an" @click="resetSelectList" type="info" plain size="small">重置</el-button>
            <el-button class="soso-an" @click="soso" type="primary" plain size="small">查询</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="list-content">
      <ul class="list-bar" v-loading="fullscreenLoading">
        <li class="l-title">
          <div class="check-box"></div>
          <div class="l-t-tit">客户</div>
          <div class="l-t-tit2">联系方式</div>
          <div class="l-t-tit2 sort-css">
            <span>最近一次互动</span>
            <div class="sort-bar">
              <div class="sort-up" @click="setInteractionOrder(0)">
                <p class="s-up" :class="{'sort-up-hover':this.orderByLastTime === 0}"></p>
              </div>
              <div class="sort-down" @click="setInteractionOrder(1)">
                <p class="s-down" :class="{'sort-down-hover':this.orderByLastTime === 1}"></p>
              </div>
            </div>
          </div>
          <div class="l-t-tit sort-css">
            <span>互动次数</span>
            <div class="sort-bar">
              <div class="sort-up" @click="setTimsOrder(0)">
                <p class="s-up" :class="{'sort-up-hover':this.orderByInteractionTimes === 0}"></p>
              </div>
              <div class="sort-down" @click="setTimsOrder(1)">
                <p class="s-down" :class="{'sort-down-hover':this.orderByInteractionTimes === 1}"></p>
              </div>
            </div>
          </div>
          <div class="l-t-tit3">操作</div>
        </li>
        <li class="not-list" v-if="listData.items.length === 0">暂无数据！</li>
        <li v-for="(item, index) in listData.items" :key="index">
          <div class="check-box">
            <el-checkbox v-model="item.selected" @change="isSelect(item)"></el-checkbox>
          </div>
          <div class="l-tit cp" @click="openDeatails(item)">
            <div class="photo-bar">
              <img
                class="photo-img"
                :src="item.headPhotoUrl?item.headPhotoUrl:''"
                :onerror="errImg"
              >
              <img
                v-if="item.sex === 1"
                class="icon-img"
                src="../../../assets/images/audience/sex-nan.png"
              >
              <img
                v-else-if="item.sex === 2"
                class="icon-img"
                src="../../../assets/images/audience/sex-nv.png"
              >
            </div>
            <p>{{item.nickName}}</p>
          </div>
          <div class="l-tit2">
            <h5>{{item.name}}</h5>
            <p>{{item.phone}}</p>
          </div>
          <div class="l-tit2">
            <h5>{{item.recentInteraction}}</h5>
            <span>{{item.updateTime}}</span>
          </div>
          <div class="l-tit3">{{item.interactionTimes}}</div>
          <div class="l-tit4">
            <el-dropdown @command="handleCommand" trigger="click" @visible-change="setItem(item)">
              <div class="xl-bar">
                <span @click.stop="openDeatails(item)">查看</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">运营打标签</el-dropdown-item>
                <el-dropdown-item command="b">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </li>
      </ul>
      <div class="list-bottom" v-if="listData.items.length !== 0">
        <el-checkbox class="all-check" v-model="allCheck" @change="isSelectAll"></el-checkbox>
        <el-button class="bottom-an" @click="batchDel" type="info" plain size="small">批量删除</el-button>
        <div class="page-bar">
          <el-pagination
            :pager-count="5"
            :page-size="8"
            @current-change="handleCurrentChange"
            background
            :current-page="this.pageNumber"
            layout="prev, pager, next"
            :total="listData.totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--批量删除-->
    <el-dialog title="删除提示" :visible.sync="isShowBatchDel" width="20%">
      <div class="batch-content">
        <div class="batch-text">
          <p>
            <i class="el-icon-warning"></i>
            已选中 {{delArr.length}}个受众，是否要删除
          </p>
          <p>
            <el-checkbox class="is-can-checkbox" v-model="isCanDel"></el-checkbox>是的，我要删除这些受众
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelBatchDel" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmBatchDel" size="small" :disabled="!isCanDel">确 定</el-button>
      </span>
    </el-dialog>
    <!--单行删除-->
    <el-dialog title="删除" :visible.sync="isShowDel" width="20%">
      <div class="batch-content">
        <div class="batch-text">
          <p>
            <i class="el-icon-warning"></i>是否删除该受众？
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDel = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDel" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--单行打标签-->
    <el-dialog title="运营打标签" :visible.sync="isShowTag" width="30%">
      <div class="tags-bar">
        <set-tags :tagArray="dynamicTags" :tagsList="TagsList" @addTag="addCompTag"></set-tags>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowTag = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmTags" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--单个新增 > 第一步-->
    <el-dialog title="单个导入受众数据 " @close="changeTips" :visible.sync="isShowAdd" width="720px">
      <add-audience-first
        :addData="addData"
        :isShowPhoneTips="isShowPhoneTips"
        :isShowIdTips="isShowIdTips"
        @changeTips="changeTips"
      ></add-audience-first>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false" size="small">取 消</el-button>
        <el-button type="primary" @click="openAddNext" size="small">下一步</el-button>
      </span>
    </el-dialog>
    <!--单个新增 > 第二步-->
    <add-audience-second
      ref="add"
      :addData="addData"
      @confirmAdd="confirmAdd"
      @clearData="clearData"
    ></add-audience-second>

    <!--批量新增 > 第一步-->
    <el-dialog title="批量新增 " :visible.sync="isShowBatchAdd" width="720px">
      <div class="batch-add-page">
        <div class="step-bar">
          <div class="step-num-bar">
            <div class="step-num fl">1</div>
            <div class="step-line"></div>
            <div class="step-num2 fl">2</div>
            <div class="step-line"></div>
            <div class="step-num2 fr">3</div>
          </div>
          <div class="step-text">
            <p class="fl">导入数据</p>
            <p class="zj">导入确认</p>
            <p class="fr">其他设置</p>
          </div>
        </div>
        <div class="add-tip">
          <el-tooltip placement="top">
            <div slot="content">温馨提示：外部ID是系统创建
              <br>受众的依据；系统支持通过手
              <br>机号和OpenID等确定是新建
              <br>还是为已存在的受众添加或更
              <br>新属性数
            </div>
            <div class="top-left el-icon-question"></div>
          </el-tooltip>
          <label>外部系统ID：</label>
          <el-select v-model="externalSysId" placeholder="请选择外部系统ID" size="small">
            <el-option label="openID" :value="0"></el-option>
            <el-option label="手机号" :value="1"></el-option>
          </el-select>
        </div>
        <div class="upload-bar">
          <el-upload
            class="upload-demo"
            drag
            :limit="1"
            :action="uploadUrl"
            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
            :file-list="fileList"
            :on-remove="handleRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
              <p>每次最大导入文件不超过2MB</p>
            </div>
            <div class="el-upload__tip" slot="tip">请按照系统提供的标准模板填写信息</div>
            <div class="el-upload__tip" slot="tip">
              <a @click="downModel">下载标准模板</a>
            </div>
          </el-upload>
        </div>
        <div class="up-bottom">
          <el-tooltip placement="top">
            <div slot="content">重复的判断是以“外部ID的值”
              <br>作为唯一值进行判断。 系统中
              <br>的辅助ID有：手机号、邮箱和
              <br>OpenID。
            </div>
            <div class="top-left el-icon-question"></div>
          </el-tooltip>
          <label>重复处理</label>
          <el-radio-group v-model="clfs">
            <el-radio :label="1">跳过</el-radio>
            <el-radio :label="2">覆盖</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowBatchAdd = false" size="small">取 消</el-button>
        <el-button type="primary" @click="batchNextStep" size="small">下一步</el-button>
      </span>
    </el-dialog>
    <!--批量新增 > 第二步-->
    <el-dialog title="批量新增 " :visible.sync="isShowBatchAddSecond" width="720px">
      <batch-add-audience-second :resultData="resultData" :fileInfo="fileInfo"></batch-add-audience-second>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openBatchAdd" size="small">上一步</el-button>
        <el-button type="primary" @click="batchNextStepLast" size="small">下一步</el-button>
      </span>
    </el-dialog>
    <!--批量新增 > 第三步-->
    <el-dialog title="批量新增 " :visible.sync="isShowBatchAddThird" width="720px">
      <div class="batch-add-page">
        <div class="step-bar">
          <div class="step-num-bar">
            <div class="step-num fl">1</div>
            <div class="step-line"></div>
            <div class="step-num fl">2</div>
            <div class="step-line"></div>
            <div class="step-num fr">3</div>
          </div>
          <div class="step-text">
            <p class="fl">导入数据</p>
            <p class="zj colr">导入确认</p>
            <p class="fr colr">其他设置</p>
          </div>
        </div>
        <div class="set-tag">
          <set-tags :tagArray="dynamicTags" :tagsList="TagsList" @addTag="addCompTag"></set-tags>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowBatchAddThird = false" size="small">取 消</el-button>
        <el-button type="primary" @click="batchSetTags" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAudienceList,
  addAudience,
  deleteAudiences,
  findCountByPhone,
  getAudiencesTagList,
  getAudiencesCompTagList,
  addCompTag,
  keepTagArr,
  importAudiences,
  batchAddAudienceTags
} from "@/api/audienceCenter/audienceList";
import { getTagsList } from "@/mixins";
import moment from "moment";
import setTags from "@/components/common/setTags";
import addAudienceFirst from "@/components/private/audience/addAudienceFirst";
import addAudienceSecond from "@/components/private/audience/addAudienceSecond";
import { vWorld } from "@/mixins/regCheck.js";
import batchAddAudienceSecond from "@/components/private/audience/batchAddAudienceSecond";
export default {
  components: {
    setTags,
    addAudienceFirst,
    addAudienceSecond,
    // batchAddAudienceFirst,
    batchAddAudienceSecond
    // batchAddAudienceThird
  },
  data() {
    return {
      fileInfo: {},
      resultData: {},
      importList: [],
      fileList: [],
      downUrl: process.env.VUE_APP_URL + "/audience-info/download",
      uploadUrl: process.env.VUE_APP_URL + "/audience-info/to/import",
      externalSysId: 1,
      clfs: 1,
      dynamicTags: [], //当前受众标签
      TagsList: [], // 租户所有标签
      fullscreenLoading: false,
      isShowAdd: false,
      isShowAddNext: false,
      isShowBatchAdd: false,
      isShowBatchAddSecond: false,
      isShowBatchAddThird: false,
      isShowTag: false,
      isShowDel: false,
      isShowBatchDel: false,
      isCanDel: false,
      isShowPhoneTips: false,
      isShowIdTips: false,
      addLoading: false,
      keyword: "",
      type: 1,
      sex: "",
      checked: "",
      creatFuc: "",
      subject: "",
      auxiliary: "",
      dateRange: ["", ""],
      minNum: "",
      maxNum: "",
      delArr: [],
      curItem: [],
      pageSize: 8,
      pageNumber: 1,
      orderByInteractionTimes: "",
      orderByLastTime: "",
      allCheck: false,
      errImg:
        'this.src="' +
        require("../../../assets/images/audience/photo.png") +
        '"',
      listData: {
        items: []
      },
      isShowScreenList: false,
      pickerOptions2: {
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
      addData: {
        externalSysId: 1,
        isType: true,
        phone: "",
        appId: "",
        openId: "",
        name: "",
        sex: 0,
        nickName: "",
        email: "",
        audienceStage: "",
        birth: "",
        age: "",
        qq: "",
        weibo: "",
        marryFlag: 0,
        hobby: "",
        monthIncome: "",
        eduLevel: "",
        industry: "",
        folks: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    soso() {
      this.pageNumber = 1;
      this.getList();
    },
    /**
     * 获取列表
     */
    getList() {
      this.fullscreenLoading = true;
      let getData = {
        selectType: this.type,
        selectValue: this.keyword.trim(),
        sex: this.sex,
        fromTo: this.creatFuc,
        appId: this.subject,
        assistId: this.auxiliary,
        interactionTimesFrom: this.minNum,
        interactionTimesTo: this.maxNum,
        lastInteractionTimeFrom: this.dateRange[0],
        lastInteractionTimeTo: this.dateRange[1],
        orderByInteractionTimes: this.orderByInteractionTimes,
        orderByLastTime: this.orderByLastTime,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      };
      getAudienceList(getData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.fullscreenLoading = false;
            this.isShowScreenList = false;
            this.listData = res.data;
            this.listData.items = this.listData.items.map(item => {
              item.updateTime = moment(item.updateTime).format(
                "YYYY-MM-DD HH:mm"
              );
              this.$set(item, "selected", false);
              return item;
            });
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 分页
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNumber = val;
      this.getList();
    },
    resetSelectList() {
      this.type = 1;
      this.keyword = "";
      this.sex = "";
      this.creatFuc = "";
      this.subject = "";
      this.auxiliary = "";
      this.minNum = "";
      this.maxNum = "";
      this.dateRange = [];
      this.orderByInteractionTimes = "";
      this.orderByLastTime = "";
      this.getList();
    },
    /**
     * 单个新增
     */
    changeTips() {
      this.isShowPhoneTips = false;
      this.isShowIdTips = false;
    },
    openAdd() {
      this.isShowAdd = true;
    },
    openAddNext() {
      if (this.addData.externalSysId === 1) {
        let regx = /^1\d{10}$/;
        if (!regx.test(this.addData.phone)) {
          this.$message.warning("请输入正确手机号码！");
          return;
        }
        let phone = {
          phoneNumber: this.addData.phone
        };
        findCountByPhone(phone)
          .then(res => {
            let { respCode } = res;
            if (respCode === "0000") {
              if (res.data === 0) {
                this.isShowAdd = false;
                this.$refs.add.showPop();
              } else {
                this.isShowPhoneTips = true;
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(err => console.error(err));
      } else {
        const a = vWorld(this.addData.openId);
        if (!this.addData.appId) {
          this.$message.warning("请选择所属服务号/小程序！");
          return;
        } else if (!this.addData.openId) {
          this.$message.warning("请输入OpenID！");
          return;
        }
        //  else if (a) {
        //   this.$message.warning("OpenID只能是字母或数字！");
        //   return;
        // }
        this.isShowIdTips = true;
        this.isShowAdd = false;
        this.$refs.add.showPop();
      }
    },
    confirmAdd() {
      if (!this.addData.name) {
        this.$message.warning("姓名不能为空！");
        return;
      }
      addAudience(this.addData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("新增成功！");
            this.$refs.add.hidePop();
            this.getList();
          }
        })
        .catch(err => console.error(err));
    },
    clearData() {
      this.addData = {
        externalSysId: 1,
        isType: true,
        phone: "",
        appId: "",
        openId: "",
        name: "",
        sex: 0,
        nickName: "",
        email: "",
        audienceStage: "",
        birth: "",
        age: "",
        qq: "",
        weibo: "",
        marryFlag: 0,
        hobby: "",
        monthIncome: "",
        eduLevel: "",
        industry: "",
        folks: ""
      };
    },
    /**
     * 批量新增
     */
    openBatchAdd() {
      this.isShowBatchAdd = true;
      this.isShowBatchAddSecond = false;
    },
    batchNextStep() {
      let params = {
        externalSysId: this.externalSysId,
        repeated: this.clfs,
        reqDTOList: this.importList
      };
      if (this.importList.length > 0) {
        importAudiences(params)
          .then(res => {
            let { respCode } = res;
            if (respCode === "0000") {
              this.resultData = res.data;
              this.fileList = [];
              this.isShowBatchAdd = false;
              this.isShowBatchAddSecond = true;
              console.log(this.resultData);
            }
          })
          .catch(err => console.error(err));
      } else {
        this.$message.warning("请选择要导入的模板！");
      }
    },

    batchNextStepS() {
      this.isShowBatchAdd = false;
      this.isShowBatchAddSecond = true;
    },
    batchNextStepLast() {
      this.dynamicTags = [];
      let getAudiencesCompTagData = {
        // compId: this.compId,
        tagTypeList: [3]
      };
      // 获取当前租户标签
      getAudiencesCompTagList(getAudiencesCompTagData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            if (res.data && res.data.length > 0) {
              this.TagsList = getTagsList(this.dynamicTags, res.data);
            } else {
              this.TagsList = [];
            }
          }
        })
        .catch(err => console.error(err));
      this.isShowBatchAddSecond = false;
      this.isShowBatchAddThird = true;
    },
    batchSetTags() {
      let params = {
        audienceIdList: this.resultData.audienceIdList,
        tagInfoList: this.dynamicTags
      };
      batchAddAudienceTags(params)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("操作成功");
            this.isShowBatchAddThird = false;
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 打开隐藏筛选条件
     */
    isOpenScreen() {
      this.isShowScreenList = !this.isShowScreenList;
    },
    /**
     * 升降序
     */
    setTimsOrder(num) {
      this.orderByInteractionTimes = num;
    },
    setInteractionOrder(num) {
      this.orderByLastTime = num;
    },
    /**
     * 全选or取消
     */
    isSelect(el) {
      let index = this.delArr.indexOf(el.id);
      if (el.selected && index === -1) {
        this.delArr.push(el.id);
      } else {
        this.delArr.splice(index, 1);
        this.allCheck = false;
      }
    },
    isSelectAll() {
      if (this.allCheck) {
        for (let i = 0; i < this.listData.items.length; i++) {
          this.listData.items[i].selected = true;
          let index = this.delArr.indexOf(this.listData.items[i].id);
          if (index === -1) {
            this.delArr.push(this.listData.items[i].id);
          }
        }
      } else {
        for (let i = 0; i < this.listData.items.length; i++) {
          this.listData.items[i].selected = false;
          this.delArr = [];
        }
      }
    },
    /**
     * 批量删除
     */
    batchDel() {
      if (this.delArr.length > 0) {
        this.isShowBatchDel = true;
      } else {
        this.$message.warning("请选择需要删除的列表！");
      }
    },
    cancelBatchDel() {
      this.isShowBatchDel = false;
      this.isCanDel = false;
    },
    confirmBatchDel() {
      let delArr = {
        idList: this.delArr
      };
      deleteAudiences(delArr)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.soso();
            this.$message.success("删除成功！");
            this.isShowBatchDel = false;
          }
        })
        .catch(err => console.error(err));
    },
    /**
     * 打开详情
     */
    openDeatails(item) {
      this.$router.push({
        path: "details",
        query: {
          id: item.id
        }
      });
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
        this.isShowTag = true;
        let getAudiencesTagData = {
          audienceInfoId: this.curItem.id,
          tagTypeList: [3]
        };
        // 获取当前受众标签
        getAudiencesTagList(getAudiencesTagData)
          .then(res => {
            let { respCode } = res;
            if (respCode === "0000") {
              this.dynamicTags = res.data;
              if (this.dynamicTags.length > 0) {
                this.dynamicTags = this.dynamicTags.map(item => {
                  item.isSelect = true;
                  return item;
                });
              } else {
                this.dynamicTags = [];
              }
            }
          })
          .catch(err => console.error(err));
        let getAudiencesCompTagData = {
          // compId: this.compId,
          tagTypeList: [3]
        };
        // 获取当前租户标签
        getAudiencesCompTagList(getAudiencesCompTagData)
          .then(res => {
            let { respCode } = res;
            if (respCode === "0000") {
              if (res.data && res.data.length > 0) {
                this.TagsList = getTagsList(this.dynamicTags, res.data);
              } else {
                this.TagsList = [];
              }
            }
          })
          .catch(err => console.error(err));
      } else if (command === "b") {
        this.isShowDel = true;
      }
    },
    // 保存受众标签集合
    confirmTags() {
      let keepData = {
        audienceInfoId: this.curItem.id,
        tagInfoList: this.dynamicTags
      };
      keepTagArr(keepData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("操作成功！");
            this.isShowTag = false;
          }
        })
        .catch(err => console.error(err));
    },
    //新增租户标签
    addCompTag(tagName) {
      if (tagName.trim() !== "") {
        let params = {
          tagRuleId: 4,
          tagName: tagName,
          tagType: 3
        };
        addCompTag(params)
          .then(res => {
            let { respCode } = res;
            if (respCode === "0000") {
              let arr = res.data;
              arr.isSelect = true;
              this.dynamicTags.push(arr);
              this.TagsList.push(arr);
            }
          })
          .catch(err => console.error(err));
      }
    },
    // 单行删除
    confirmDel() {
      let delArr = {
        idList: []
      };
      delArr.idList.push(this.curItem.id);
      console.log(delArr);
      deleteAudiences(delArr)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("删除成功！");
            this.isShowDel = false;
            this.getList();
          }
        })
        .catch(err => console.error(err));
    },
    //下载模板
    downModel() {
      window.open(this.downUrl);
    },
    handleRemove() {
      this.fileList = [];
    },
    // 上传前判断
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.warning("上传文件大小不能超过 2MB !");
        return false;
      } else {
        const typeIndex = file.name.indexOf("xls") || file.name.indexOf("xlsx");
        if (typeIndex < 0) {
          this.$message.warning("请上传正确的文件类型!");
          return false;
        }
      }
    },
    handleSuccess(res, file, fileList) {
      if (res.respCode === "0000") {
        this.fileInfo = file;
        this.importList = res.data;
        this.fileList = fileList;
        console.log(this.fileList, "this.fileList");
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/css/audience/index";
</style>
