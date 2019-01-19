<template>
  <div>
    <!-- 筛选 -->
    <form-select :pageIndex="page" @getData="getData" :isAddContent="false" @resetPage="resetPage" @openAddSingle="openAddSingle"
      @openAddBatch="openAddBatch"></form-select>
    <!-- 列表内容 -->
    <section class="content channel-list">
      <div v-loading="loading" class="list-wrap">
        <el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column type="selection" width="60">
          </el-table-column>
          <el-table-column label="渠道名称">
            <template slot-scope="scope">
              <div class="name">
                <router-link :to="{path:'/channelCenter/customChannel/detail',query:{id:scope.row.id}}">{{
                  scope.row.channelName }}</router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="transemissionPlatformName" label="传播平台">
          </el-table-column>
          <el-table-column prop="channelDetailInfo.visitedNumber" label="浏览人数">
          </el-table-column>
          <el-table-column prop="channelDetailInfo.visitedTimes" label="浏览人次">
          </el-table-column>
          <el-table-column prop="channelDetailInfo.transmitTimes" label="转发人次">
          </el-table-column>
          <el-table-column prop="channelStatus" label="状态">
            <template slot-scope="scope">{{scope.row.channelStatus ? "正常 " :" 禁用"}}</template>
          </el-table-column>
          <el-table-column prop="" label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-dropdown trigger="click" @command="handleCommand">
                <div class="xl-bar">
                  <span @click.stop="openAddSingle(true,scope.row)">编辑</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{ id:scope.row.id, type:1 }">禁用/解禁</el-dropdown-item>
                  <el-dropdown-item :command="{ id:scope.row.id, type:2 }">复制新建</el-dropdown-item>
                  <el-dropdown-item :command="{ id:scope.row.id, type:3 }">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <div class="list-bottom">
          <el-checkbox class="all-check" v-model="isSelectAll" @change="handleSelectAll"></el-checkbox>
          <el-button class="bottom-an" @click="batchDel" type="info" plain size="small">批量删除</el-button>
          <el-button class="bottom-an" @click="openDisable" type="info" plain size="small">批量禁用</el-button>
          <el-button class="bottom-an" @click="openDisable" type="info" plain size="small">批量解禁</el-button>
          <div class="page-bar">
            <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.pageNumber"
              @current-change="handlePageChange" class="page"></el-pagination>
          </div>
        </div>
      </div>
      <!-- 确定批量解禁/解禁 -->
      <el-dialog :title="idDisable ? '禁用解禁' : '批量解禁/禁用'" :visible.sync="dialogFormVisibleDisable" @closed="handleClosed"
        width="460px">
        <i class="el-icon-info icon-info"></i>&nbsp;
        <span v-show="this.idDisable">是否要禁用/解禁该渠道？</span>
        <span v-show="!this.idDisable">已选中{{multipleSelection.length}}个渠道，其中{{ getDisableNum }}个已被禁用，{{ getNormalNum
          }}个正常可用</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleDisable = false">取 消</el-button>
          <el-button type="primary" @click="batchDisable" :loading="isDisable">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 复制内容 -->
      <el-dialog title="复制" :visible.sync="dialogFormVisibleCopy" @closed="isCopy = false" width="460px">
        <i class="el-icon-info icon-info"></i>&nbsp;
        <span>是否复制该内容？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleCopy = false">取 消</el-button>
          <el-button type="primary" @click="handleCopy">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 单个添加 -->
      <add-single :visable="isShowAddSingle" :pageIndex="page" :total="page.total" :isEdit="isEdit" :values="valuesSingle"
        @closeAddSingle="closeAddSingle" @getData="getData"></add-single>
      <!-- 批量添加 -->
      <add-batch :visable="isShowAddBatch" :pageIndex="page" @closeAddBatch="closeAddBatch" @getData="getData"></add-batch>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
import moment from "moment";
import FormSelect from "@/components/private/channel/form-select";
import AddSingle from "@/components/private/channel/add-single";
import AddBatch from "@/components/private/channel/add-batch";
import {
  getChannelList,
  updateStatus,
  batchDelete,
  copy
} from "@/api/channelCenter";
export default {
  components: {
    "form-select": FormSelect,
    AddSingle,
    AddBatch
  },
  data() {
    return {
      loading: true, // 加载
      dataList: [], // 数据
      page: {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      },
      search: {},
      multipleSelection: [], // 选中
      isSelectAll: false, // 是否全选
      dialogFormVisibleDisable: false, // 是否批量解禁/禁用
      dialogFormVisibleCopy: false,
      idCopy: null, // 复制新建选择的id
      idDisable: null, // 禁止/解禁的id
      isCopy: false, // 是否正在调用复制接口
      isDisable: false, // 是否正在调用禁止/解禁接口
      isShowAddSingle: false, // 是否显示单个添加面板
      isShowAddBatch: false, // 是否显示批量添加面板
      isEdit: false, // 是否为编辑状态
      valuesSingle: {} // 编辑项的数据
    };
  },
  computed: {
    getDisableNum: function() {
      let arr = this.multipleSelection.filter(item => {
        return item.channelStatus === 0;
      });
      return arr.length;
    },
    getNormalNum: function() {
      let arr = this.multipleSelection.filter(item => {
        return item.channelStatus === 1;
      });
      return arr.length;
    }
  },
  created() {
    this.getData(this.page);
  },
  methods: {
    // 获取列表数据
    getData(params) {
      this.loading = true;
      if (params.pageNumber) {
        let search = JSON.parse(JSON.stringify(params));
        delete search.pageNumber;
        delete search.total;
        delete search.pageSize;
        this.search = search;
      }
      getChannelList(params)
        .then(res => {
          this.loading = false;
          this.dataList = res.data.items.map(item => {
            item.createTime = moment(item.createTime).format(
              "YYYY-MM-DD HH:mm"
            );
            return item;
          });
          this.page.total = res.data.totalCount;
        })
        .catch(err => {
          this.page.loading = false;
          console.error(err);
        });
    },
    // 重置分页
    resetPage() {
      this.page = {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      };
    },
    // 切换分页
    handlePageChange(page) {
      this.isSelectAll = false;
      this.page.pageNumber = page;
      this.getData({
        ...this.search,
        ...this.page
      });
    },
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 全选
    handleSelectAll(val) {
      if (val) {
        this.isSelectAll = true;
        this.$refs.multipleTable.toggleAllSelection();
      } else {
        this.isSelectAll = false;
        this.$refs.multipleTable.clearSelection();
      }
      console.log(this.multipleSelection);
    },
    // 操作- 下拉菜单选择
    handleCommand(command) {
      switch (command.type) {
        case 1:
          this.openDisable(command);
          break;
        case 2:
          this.openCopy(command);
          break;
        default:
          this.batchDel(command);
          break;
      }
    },
    // 打开复制内容
    openCopy(command) {
      this.idCopy = command.id;
      this.dialogFormVisibleCopy = true;
    },
    // 复制内容
    handleCopy() {
      this.isCopy = true;
      let params = {
        id: this.idCopy
      };
      copy(params)
        .then(res => {
          let { respCode, message } = res;
          if (respCode === "0000") {
            this.idCopy = null;
            this.dialogFormVisibleCopy = false;
            this.page.pageNumber = 1;
            this.getData({
              ...this.page
            });
            this.$message.success(message);
          }
        })
        .catch(err => console.error(err));
    },
    // 关闭禁用/解禁弹出框
    handleClosed() {
      this.isDisable = false;
      this.idDisable = null;
    },
    // 打开批量解禁/禁用
    openDisable(command) {
      if (command.id) {
        this.idDisable = command.id;
        this.dialogFormVisibleDisable = true;
      } else if (this.multipleSelection.length === 0) {
        this.$message.warning(`请至少选择一项`);
      } else {
        this.dialogFormVisibleDisable = true;
      }
    },
    // 批量解禁/禁用
    batchDisable() {
      this.isDisable = true;
      let params = {};
      // 单个禁用/解禁，传入id，批量则使用选择数组
      let arr = [];
      if (this.idDisable) {
        arr.push({
          id: this.idDisable
        });
      } else {
        this.multipleSelection.forEach(item => {
          arr.push({
            id: item.id
          });
        });
      }
      params = {
        reqDTOList: arr
      };
      updateStatus(params)
        .then(res => {
          let { respCode, message } = res;
          if (respCode === "0000") {
            this.isSelectAll = false;
            this.dialogFormVisibleDisable = false;
            this.idDisable = null;
            this.page.pageNumber = 1;
            this.getData({
              ...this.page
            });
            this.$message.success(message);
          }
        })
        .catch(err => console.error(err));
    },
    // 是否删除内容
    batchDel(command) {
      // 单个删除传入id，批量删除不传，直接取选择的数组
      this.$confirm(
        command.id
          ? "是否要删除该渠道？"
          : `已选中 ${this.multipleSelection.length} 个渠道，是否要删除？`,
        "删除内容",
        {
          type: "warning"
        }
      )
        .then(() => {
          // 如果id不存在 ，则为批量删除
          let arrDel = [];
          if (command.id) {
            arrDel.push(command.id);
          } else {
            this.multipleSelection.forEach(item => {
              arrDel.push(item.id);
            });
          }
          let params = {
            idList: arrDel
          };
          batchDelete(params)
            .then(res => {
              let { respCode, message } = res;
              if (respCode === "0000") {
                this.isSelectAll = false;
                this.page.pageNumber = 1;
                this.getData({
                  ...this.page
                });
                this.$message.success(message);
              }
            })
            .catch(err => console.error(err));
        })
        .catch(() => {
          this.$message("取消删除");
        });
    },
    //  ---------------------------------------------------------------  单个添加  -------------------------------------------------------------------
    // 打开弹出框
    openAddSingle(isEdit, values) {
      if (isEdit) {
        this.isEdit = true;
        this.valuesSingle = values;
      }
      this.isShowAddSingle = true;
    },
    // 关闭弹出框
    closeAddSingle() {
      this.isShowAddSingle = false;
      this.isEdit = false;
      this.valuesSingle = {};
    },
    //  ---------------------------------------------------------------  批量添加  -------------------------------------------------------------------
    // 打开弹出框
    openAddBatch() {
      this.isShowAddBatch = true;
    },
    // 关闭弹出框
    closeAddBatch() {
      this.isShowAddBatch = false;
    }
  }
};
</script>

<style lang="scss">
@import "../../../../assets/css/color";

.name {
  a {
    color: $mop-primary;
    text-decoration: none;
  }
}
</style>
