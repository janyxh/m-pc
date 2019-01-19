<template>
  <section v-loading="loading" class="content content-list">
    <div v-if="dataList.length === 0" class="nodata">暂无数据</div>
    <div class="content-li-wrap">
      <div v-for="(item,index) in dataList" :key="index" class="content-li" :style=" item.bg ? `background:url('${item.bg}') 0% 0% / cover no-repeat;` : ''">
        <!-- 面板介绍 -->
        <div class="introduce">
          <p>{{item.title}}</p>
          <p>
            <cite>{{item.createUserName}}</cite>
            <time>{{item.createTime}}</time>
          </p>
        </div>
        <div class="mask">
          <div class="wrap">
            <!-- 预览 -->
            <div v-show="item.isShowView" class="view">
              <div class="actions">
                <a @click="handleSetting(item.id)">
                  <div>
                    <i class="iconfont icon-view"></i>
                  </div>
                  <span>预览</span>
                </a>
                <a v-if="isDistibution" @click="goToSetting(item.id)">
                  <div>
                    <i class="iconfont icon-edit"></i>
                  </div>
                  <span>编辑</span>
                </a>
              </div>
              <!-- <p class="associated">已关联营销事件</p>
              <p class="events-name">双11全渠道大促销</p>-->
            </div>
            <!-- 二维码 -->
            <img v-if="item.isShowQRCode" class="qr-code" src="@/assets/images/content/qr_code.png" alt>
          </div>
        </div>
        <!-- 面板信息 -->
        <div class="info">
          <p>{{item.title}}</p>
          <p class="describe">{{item.brief}}</p>
        </div>
        <!-- 底部操作栏 -->
        <div class="footer">
          <div class="p" :class="{active:item.isShowQRCode}">
            <el-tooltip content="二维码" placement="top">
              <i @mouseover="handleShowQRCode(index)" @mouseout="handleHiddenQRCode(index)" class="iconfont icon-QRcode"></i>
            </el-tooltip>
          </div>
          <div class="p" :class="{active:isShowSetting}">
            <el-tooltip content="设置" placement="top">
              <i class="iconfont icon-setting" @click="handleSetting(item.id)"></i>
            </el-tooltip>
          </div>
          <div class="p">
            <el-tooltip content="数据" placement="top">
              <i v-if="isDistibution" class="iconfont icon-chart" @click="handleStatistics(item.id)"></i>
              <i v-if="!isDistibution" class="iconfont icon-chart"></i>
            </el-tooltip>
          </div>
          <div class="p isSwitch">
            <el-tooltip :content="getStatus(item.status)" placement="top">
              <i v-if="item.status === 0" class="iconfont icon-switch-close" @click="handleStatus(item,1)"></i>
              <i v-else-if="item.status === 1" class="iconfont icon-switch-open" @click="handleStatus(item,0)"></i>
              <i v-else-if="item.status === 2" class="iconfont icon-switch-open icon-switch-relation"></i>
            </el-tooltip>
          </div>
          <div class="p isAction">
            <span class="icon-arrow">
              <i class="iconfont icon-arrow-down"></i>
            </span>
            <ul>
              <li>
                <a @click="openMove(item)">移动到分组</a>
              </li>
              <li>
                <a @click="openCopy(item.id)">复制</a>
              </li>
              <!-- <li><a @click="dialogFormVisibleGive = true">转赠</a></li> -->
              <li>
                <ul>
                  <li>
                    <a @click="handleDel(item)">删除</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="pageIndex.total || 0" :current-page="pageIndex.pageNumber"
      @current-change="handlePageChange" class="page"></el-pagination>
    <!-- 设置 -->
    <!-- <setting v-if="isShowSetting"></setting> -->
    <el-dialog title="编辑内容" :visible.sync="isShowSetting" width="40%" top="0" class="dialog-setting">
      <setting :id="curId" v-if="isShowSetting" @saveSetting="saveSetting"></setting>
    </el-dialog>
    <!-- 移动到分组 -->
    <el-dialog title="移动内容" :visible.sync="dialogFormVisibleMove" width="460px">
      <el-form :model="formMove" :rules="rulesMove" ref="formMove">
        <el-form-item prop="groupId" label="移动到：" :label-width="formLabelWidth">
          <el-select v-model="formMove.groupId" placeholder="请选择分组">
            <el-option v-for="item in dataListGroup" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetMove('formMove')">取 消</el-button>
        <el-button type="primary" @click="handleMove('formMove')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 复制内容 -->
    <el-dialog title="复制" :visible.sync="dialogFormVisibleCopy" width="460px">
      <i class="el-icon-info icon-info"></i>&nbsp;
      <span>是否复制该内容？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCopy = false">取 消</el-button>
        <el-button type="primary" @click="handleCopy">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 转赠内容 -->
    <el-dialog title="转赠内容" :visible.sync="dialogFormVisibleGive" width="460px">
      <el-form :model="form">
        <el-form-item label="转赠账号：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择受赠方账号">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <p>* 转出后将不再拥有此作品</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleGive = false">取 消</el-button>
        <el-button type="primary" @click="handleGive">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { mapState } from "vuex";
import setting from "@/components/private/content/setting";
import {
  getGroup,
  copyContentInfo,
  updateContentInfoGroup,
  deleteContentInfo,
  updateContentInfoStatus
} from "@/api/content";
export default {
  props: ["isDistibution", "loadingIndex", "dataListIndex", "pageIndex"],
  components: {
    setting
  },
  computed: mapState({
    dataListGroup: "groupList",
    search: "search"
  }),
  data() {
    return {
      loading: true, // 加载
      dataList: this.dataListIndex, // 列表
      isShowSetting: false, // 是否显示设置
      dialogFormVisibleMove: false, // 弹出移动到分组
      dialogFormVisibleCopy: false, // 弹出复制
      dialogFormVisibleGive: false, // 弹出转赠内容
      formMove: {
        id: null,
        groupId: ""
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rulesMove: {
        // 验证规则
        groupId: [
          {
            required: true,
            message: "请选择分组",
            trigger: "change"
          }
        ]
      },
      formLabelWidth: "120px",
      curId: null,
      idCopy: null
    };
  },
  created() {
    this.$emit("getData", {
      pageNumber: this.pageIndex.pageNumber,
      pageSize: this.pageIndex.pageSize
    });
    this.getGroup();
  },
  watch: {
    loadingIndex: function(val) {
      this.loading = val;
    },
    dataListIndex: function(val) {
      this.dataList = val;
    }
  },
  methods: {
    // 跳转编辑
    goToSetting(id) {
      this.$router.push({
        name: "addDistribution",
        query: {
          id: id
        }
      });
    },
    // 获取分组
    getGroup() {
      getGroup()
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$store.dispatch("getGroupList", {
              dataList: res.data
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 获取状态
    getStatus(status) {
      switch (status) {
        case 0:
          status = "发布内容？";
          break;
        case 1:
          status = "已发布";
          break;
        case 2:
          status =
            "该内容已关联营销事件；如需下架，请先到营销事件取解除与该内容的关联。";
          break;
        default:
          status = "";
      }
      return status;
    },
    // 切换分页
    handlePageChange(page) {
      this.pageIndex.pageNumber = page;
      let search = {
        ...this.$store.state.search
      };
      delete search.searchType;
      delete search.keyword;
      delete search.updateTime;
      this.$emit("getData", {
        ...search,
        pageNumber: this.pageIndex.pageNumber,
        pageSize: this.pageIndex.pageSize
      });
    },
    // 显示二维码
    handleShowQRCode(index) {
      this.dataList[index].isShowView = false;
      this.dataList[index].isShowQRCode = true;
    },
    // 隐藏二维码
    handleHiddenQRCode(index) {
      this.dataList[index].isShowView = true;
      this.dataList[index].isShowQRCode = false;
    },
    // 点击设置
    handleSetting(id) {
      this.curId = id;
      this.isShowSetting = true;
    },
    // 点击数据
    handleStatistics(id) {
      this.$router.push({
        path: "/distribution/distributionStatistics",
        query: {
          id: id
        }
      });
    },
    // 点击内容状态
    handleStatus(item, status) {
      let params = {
        status: status,
        id: item.id
      };
      updateContentInfoStatus(params)
        .then(res => {
          let { respCode, message } = res;
          if (respCode === "0000") {
            this.pageIndex.pageNumber = 1;
            this.$message.success(message);
            this.$emit("resetForm");
            this.$emit("getData", {
              pageNumber: this.pageIndex.pageNumber,
              pageSize: this.pageIndex.pageSize
            });
          }
        })
        .catch(err => console.error(err));
    },
    // 打开 移动到分组
    openMove(item) {
      this.formMove.id = item.id;
      this.dialogFormVisibleMove = true;
      this.formMove.groupId = item.contentGroupId;
    },
    // 移动到分组
    handleMove(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            id: this.formMove.id,
            contentGroupId: this.formMove.groupId
          };
          updateContentInfoGroup(params)
            .then(res => {
              let { respCode, message } = res;
              if (respCode === "0000") {
                this.idCopy = null;
                this.dialogFormVisibleMove = false;
                this.$refs[formName].resetFields();
                this.$message.success(message);
                this.$emit("resetForm");
                this.$emit("getData", {
                  pageNumber: this.pageIndex.pageNumber,
                  pageSize: this.pageIndex.pageSize
                });
                this.$message.success(message);
              }
            })
            .catch(err => console.error(err));
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置移动到分组表单
    resetMove(formName) {
      this.dialogFormVisibleMove = false;
      this.$refs[formName].resetFields();
    },
    // 打开复制内容
    openCopy(id) {
      this.idCopy = id;
      this.dialogFormVisibleCopy = true;
    },
    // 复制内容
    handleCopy() {
      let params = {
        id: this.idCopy
      };
      copyContentInfo(params)
        .then(res => {
          let { respCode, message } = res;
          if (respCode === "0000") {
            this.idCopy = null;
            this.dialogFormVisibleCopy = false;
            this.$emit("resetForm");
            this.$emit("getData", {
              pageNumber: this.pageIndex.pageNumber,
              pageSize: this.pageIndex.pageSize
            });
            this.$message.success(message);
          }
        })
        .catch(err => console.error(err));
    },
    // 转赠作品
    handleGive() {
      if (this.form.region) {
        this.dialogFormVisibleGive = false;
        this.$message.success("转赠成功");
      } else {
        this.$message.success("请选择受赠人");
      }
    },
    // 是否删除内容
    handleDel(item) {
      if (item.status !== 2) {
        this.$confirm("是否确定要删除？", "删除内容", {
          type: "warning"
        })
          .then(() => {
            let params = {
              id: item.id
            };
            deleteContentInfo(params)
              .then(res => {
                let { respCode, message } = res;
                if (respCode === "0000") {
                  this.$message.success(message);
                  this.$emit("resetForm");
                  this.$emit("getData", {
                    pageNumber: this.pageIndex.pageNumber,
                    pageSize: this.pageIndex.pageSize
                  });
                }
              })
              .catch(err => console.error(err));
          })
          .catch(() => {
            this.$message("取消删除");
          });
      } else {
        this.$alert("该内容已被营销事件关联，不能被删除", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    // 保存设置
    saveSetting() {
      this.isShowSetting = false;
      this.pageIndex.pageNumber = 1;
      this.$emit("resetForm");
      this.$emit("getData", {
        pageNumber: this.pageIndex.pageNumber,
        pageSize: this.pageIndex.pageSize
      });
    }
  }
};
</script>


<style lang="scss">
@import "../../../assets/css/content/index";

// 底部
.content-li {
  background: url("../../../assets/images/content/bg_template.png") center
    center / cover no-repeat;
}
</style>
