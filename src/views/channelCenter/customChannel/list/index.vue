<template>
  <div class="customChannel">
    <dy-table :keys="colKey" :fetchData="fetchData" :isSelection="true" :actions="actions" @patchDelete="deleteItems"
      @patchForbid="forbidItems" @patchUnForbid="unForbidItems" @rowClick="rowClick" @cellClick="cellClick"
      :specialCell="specialCell" :rowClassName="rowClassName" v-if="$route.path!='/channelCenter/customChannel/detail'">
      <!-- <el-row class="chooseConditon" type="flex" justify="space-between">
        <el-col :span="3" class="summary">全部 ( {{totalCount}} )</el-col>
        <el-col :span="3">
          <div @click="chooseDetail" class="chooseDetail">
            筛选条件
            <i class="el-icon-arrow-down" :class="{active:isActive}"></i>
          </div>
        </el-col>
        <el-col :span="7"></el-col>

        <el-col :span="7" class="slurSearch">
          <el-autocomplete v-model="searchValue" :fetch-suggestions="querySearchAsync" placeholder="请输入关键词" @select="handleSelect"
            size="small">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="按渠道名称" value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
          </el-autocomplete>
        </el-col>

        <el-col :span="2">
          <multi-channel ref="multiChannel"></multi-channel>
        </el-col>
        <el-col :span="2">
          <single-channel ref="singleChannel" :channelId="channelId" :isEdit="isEdit" @addSuccess="addSuccess"
            @updateEdit="updateEditStatus" @channelIdAction="channelIdAction" @channelIdtoNull="channelIdtoNull"></single-channel>
        </el-col>
      </el-row>
      <el-row v-show="isShow" class="chooseList">
        <el-row>
          <el-col :span="8">
            <span class="name">渠道状态</span>
            <el-select size="small" v-model="chanelStatus" clearable placeholder="请选择渠道">
              <el-option v-for="item in chanelStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>

          <el-col :span="8">
            <span class="name">传播平台</span>
            <el-select size="small" v-model="platform" clearable placeholder="请选择渠道">
              <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span class="name">最近分发时间</span>
            <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="ditributeTime" type="daterange"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="btn">
          <el-col :span="4">
            <el-button type="info" size="small" @click="reset">重置</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small" @click="goSearch">查询</el-button>
          </el-col>
        </el-row>
      </el-row> -->

      <!-- 筛选 -->
      <!-- <form-select :contentTotal="totalCount" @goSearch="goSearch" @reset="reset" :isAddContent="false"></form-select> -->
      <div class="list-screening">
        <!-- 全部 -->
        <div class="list-tatol">全部({{totalCount}})</div>
        <div class="list-tatol">
          <span @click="isOpenScreen" @blur="isCloseScreen" class="dropdown-link-screening">
            筛选条件
            <i class="el-icon-arrow-down" :class="{active:isShowScreenList}"></i>
          </span>
        </div>
        <!-- 批量添加按钮 -->
        <multi-channel ref="multiChannel"></multi-channel>
        <!-- 单个添加按钮 -->
        <single-channel ref="singleChannel" :channelId="channelId" :isEdit="isEdit" @addSuccess="addSuccess"
          @updateEdit="updateEditStatus" @channelIdAction="channelIdAction" @channelIdtoNull="channelIdtoNull"></single-channel>
        <!-- 搜索 -->
        <el-input placeholder="请输入关键字" v-model="searchValue" class="input-with-select screen-input" size="small"
          clearable>
          <el-select class="screen-input2" v-model="search.searchType" slot="prepend" placeholder="请选择">
            <el-option v-for="item in optionsSearchType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="goSearch"></el-button>
        </el-input>
        <!-- 筛选面板 -->
        <!-- <screening v-show="isShowScreenList" :search="search" @resetSelect="reset" @submitSelect="goSearch"></screening> -->

        <div v-show="isShowScreenList" class="screen-bar select-panel">
          <div class="screen-bar-nr">
            <div class="screen-list">
              <p>渠道状态</p>
              <el-select size="small" v-model="chanelStatus" clearable placeholder="请选择渠道">
                <el-option v-for="item in chanelStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="screen-list">
              <p>传播平台</p>
              <el-select size="small" v-model="platform" clearable placeholder="请选择传播平台">
                <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="screen-list">
              <p>最近分发时间</p>
              <el-date-picker v-model="ditributeTime" type="daterange" align="left" unlink-panels range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" size="small"></el-date-picker>
            </div>
            <div class="soso-bar">
              <el-button class="soso-an" type="info" plain size="small" @click="reset">重置</el-button>
              <el-button class="soso-an" type="primary" plain size="small" @click="goSearch">查询</el-button>
            </div>
          </div>
        </div>

      </div>
    </dy-table>
    <!-- 删除 -->
    <el-dialog title="删除提示" :visible.sync="deleteVisible" width="30%">
      <span>是否要删除该渠道？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteChannel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <!-- 批量删除 -->
    <el-dialog title="批量删除提示" :visible.sync="patchDeleteVisible" width="30%">
      <span>已选中{{pathDeleteLength}}个渠道,是否要删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="patchDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="patchDeleteChannel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量删除 -->
    <!-- 复制新建 -->
    <el-dialog title="提示" :visible.sync="copyVisible" width="30%">
      <span>是否复制新建该渠道</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="copyVisible = false">取 消</el-button>
        <el-button type="primary" @click="copyChannel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 复制新建 -->
    <!-- 禁用 -->
    <el-dialog title="禁用" :visible.sync="forbidVisible" width="30%">
      <div>
        <div>是否要禁用该渠道？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="forbidVisible = false">取 消</el-button>
        <el-button type="primary" @click="forbidChannel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 禁用 -->
    <!-- 解禁 -->
    <el-dialog title="解禁" :visible.sync="unForbidVisible" width="30%">
      <div>
        <div>是否解禁该渠道？</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unForbidVisible = false">取 消</el-button>
        <el-button type="primary" @click="unForbidChannel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 解禁 -->
    <!-- 批量禁用 -->
    <el-dialog title="批量禁用" :visible.sync="patchForbidVisible" width="30%">
      <span>已选中{{channelSummary}}个渠道,其中{{forbidChannelSummaryLength}}个已被禁用,{{unForbidChannelSummaryLength}}个正常可用</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="patchForbidVisible = false">取 消</el-button>
        <el-button type="primary" @click="patchForbidDialogBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量禁用 -->
    <!-- 批量解禁 -->
    <el-dialog title="批量解禁" :visible.sync="patchUnForbidVisible" width="30%">
      <span>已选中{{channelSummary}}个渠道,其中{{forbidChannelSummaryLength}}个已被禁用,{{unForbidChannelSummaryLength}}个正常可用</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="patchUnForbidVisible = false">取 消</el-button>
        <el-button type="primary" @click="patchUnForbidDialogBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量解禁 -->
    <router-view></router-view>
  </div>
</template>

<script>
import dyTable from "@/components/common/dyTable";
// import screening from "@/components/private/channelCenter/screening";
import singleChannel from "./singleChannel";
import multiChannel from "./multiChannel";
import API from "@/api/channelCenter/customChannel";
import { closest } from "@/mixins";
// import PullDown from "./pullDown";
export default {
  components: {
    dyTable,
    // screening,
    singleChannel,
    multiChannel
    //PullDown
  },
  data() {
    const that = this;
    return {
      isShowScreenList: false, // 是否弹出筛选面板
      search: {
        searchType: 1, // 搜索类型
        keyword: "", // 关键字
        createUserName: "", // 创建人
        title: "", // 内容标题
        status: "", // 内容状态
        contentTypeId: "", // 模板功能分类id
        updateTime: "" // 时间
      },
      optionsSearchType: [
        // 搜索类型选项
        {
          value: 1,
          label: "按渠道名称"
        }
      ],
      pickerOptions2: {
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
      isEdit: false,
      select: "",
      channelId: "",
      totalCount: "",
      forbidChannelSummary: "",
      channelSummary: "",
      forbidArray: [],
      //批量禁用弹框状态
      patchForbidVisible: false,
      //批量解禁弹框状态
      patchUnForbidVisible: false,
      //批量删除弹框状态
      patchDeleteVisible: false,
      deleteIdList: [],
      pathDeleteLength: "",
      forbidChannelSummaryLength: "",
      unForbidChannelSummaryLength: "",
      deleteVisible: false,
      copyVisible: false,
      forbidVisible: false,
      unForbidVisible: false,
      colKey: {
        channelName: "渠道名称",
        transemissionPlatformName: "传播平台",
        mutilVisitedNumber: "浏览人数",
        mutilVisitedTimes: "浏览人次",
        mutilTransmitTimes: "转发人数"
      },
      actions: [
        {
          label: "编辑",
          width: "80",
          action: row => {
            //console.log(row, "row");
            //点击编辑按钮弹框
            this.$refs.singleChannel.singleDialogVisible = true;
            //点击编辑请求数据回来，将每一行的id传给后端
            this.channelId = row.id;
            this.isEdit = true;
          }
        },
        {
          handle(scope, h, context) {
            //判断是否是禁用还是解禁止
            if (scope.row.channelStatus) {
              return h("el-dropdown", [
                h(
                  "span",
                  {
                    class: "el-dropdown-link"
                  },
                  [
                    h("i", {
                      class: "el-icon-arrow-down el-icon--right"
                    })
                  ]
                ),
                h(
                  "el-dropdown-menu",
                  {
                    slot: "dropdown"
                  },
                  [
                    // h(
                    //   "el-dropdown-item",
                    //   {
                    //     nativeOn: {
                    //       click: () => {
                    //         console.log("一期不做");
                    //       }
                    //     }
                    //   },
                    //   "查看数据"
                    // ),
                    h(
                      "el-dropdown-item",
                      {
                        nativeOn: {
                          click: () => {
                            that.forbidVisible = true;
                            that.id = scope.row.id;
                          }
                        }
                      },
                      "禁用"
                    ),
                    h(
                      "el-dropdown-item",
                      {
                        nativeOn: {
                          click: () => {
                            that.copyVisible = true;
                            that.id = scope.row.id;
                          }
                        }
                      },
                      "复制新建"
                    ),
                    h(
                      "el-dropdown-item",
                      {
                        nativeOn: {
                          click: () => {
                            that.deleteVisible = true;
                            that.id = scope.row.id;
                          }
                        }
                      },
                      "删除"
                    )
                  ]
                )
              ]);
            } else {
              return h("el-dropdown", [
                h(
                  "span",
                  {
                    class: "el-dropdown-link"
                  },
                  [
                    h("i", {
                      class: "el-icon-arrow-down el-icon--right"
                    })
                  ]
                ),
                h(
                  "el-dropdown-menu",
                  {
                    slot: "dropdown"
                  },
                  [
                    // h(
                    //   "el-dropdown-item",
                    //   {
                    //     nativeOn: {
                    //       click: () => {
                    //         console.log("一期不做");
                    //       }
                    //     }
                    //   },
                    //   "查看数据"
                    // ),
                    h(
                      "el-dropdown-item",
                      {
                        nativeOn: {
                          click: () => {
                            that.unForbidVisible = true;
                            that.id = scope.row.id;
                          }
                        }
                      },
                      "解禁"
                    ),
                    h(
                      "el-dropdown-item",
                      {
                        nativeOn: {
                          click: () => {
                            that.copyVisible = true;
                            that.id = scope.row.id;
                          }
                        }
                      },
                      "复制新建"
                    ),
                    h(
                      "el-dropdown-item",
                      {
                        nativeOn: {
                          click: () => {
                            that.deleteVisible = true;
                            that.id = scope.row.id;
                          }
                        }
                      },
                      "删除"
                    )
                  ]
                )
              ]);
            }

            //return h("i", [<PullDown />]);
          }
        }
      ],
      restaurants: [],
      timeout: null,
      isActive: true,
      searchValue: "",
      infoCheckList: [],
      systemCheckList: [],
      dialogVisible: false,
      isShow: false,
      //每一行的id
      id: "",
      //渠道名称
      channelName: "",
      //渠道状态
      chanelStatus: "",
      //传播平台
      platform: "",
      //最近分发时间
      ditributeTime: "",
      // channelNameList: [
      //   {
      //     value: "选项1",
      //     label: "黄金糕"
      //   },
      //   {
      //     value: "选项2",
      //     label: "双皮奶"
      //   },
      //   {
      //     value: "选项3",
      //     label: "蚵仔煎"
      //   },
      //   {
      //     value: "选项4",
      //     label: "龙须面"
      //   },
      //   {
      //     value: "选项5",
      //     label: "北京烤鸭"
      //   }
      // ],
      chanelStatusList: [
        {
          value: "1",
          label: "正常"
        },
        {
          value: "0",
          label: "禁用"
        }
      ],
      platformList: []
    };
  },
  beforeDestroy() {
    document.onclick = "";
  },

  methods: {
    // 点击筛选条件
    isOpenScreen() {
      this.isShowScreenList = !this.isShowScreenList;
    },
    // 关闭筛选条件
    isCloseScreen() {
      this.isShowScreenList = false;
    },
    //点击确认导入后将channelId置为''
    channelIdtoNull() {
      this.channelId = "";
    },
    //获取传播平台信息
    getPlatformInfo() {
      API.fetchPlatform()
        .then(res => {
          this.platformList = res.data.data;
        })
        .catch(err => {});
    },
    updateEditStatus() {
      this.isEdit = false;
      console.log("点击单个增加按钮的isEdit", this.isEdit);
    },
    //筛选查询
    goSearch() {
      this.$children[0].search();
      this.isShowScreenList = false;
    },

    handleSearch() {
      const params = {
        channelName: this.searchValue
      };
      API.fuzzySearch(params)
        .then(res => {
          if (res.data.respCode === "000") {
            this.restaurants = res.data.data;
          }
        })
        .catch(err => {});
    },
    handleSelect(item) {},
    //弹框关闭的时候讲channelId置空
    channelIdAction() {
      this.channelId = "";
    },
    //刷新该页面
    addSuccess() {
      this.$children[0].search();
    },
    rowClassName({ row, rowIndex }) {
      if (!row.channelStatus) {
        return "bgGray";
      } else {
        return "";
      }
    },
    copyChannel() {
      this.copyVisible = false;

      API.dublicateChannel({
        id: this.id
      })
        .then(res => {
          if (res.data.data.respCode === "0000") {
            this.$message("复制新建成功");
            this.addSuccess();
          }
        })
        .catch(err => {});
    },
    //单个禁止
    forbidChannel() {
      this.forbidVisible = false;
      API.unForbidChannel([
        {
          id: this.id,
          channelStatus: "1"
        }
      ])
        .then(res => {
          if (res.data.data.respCode === "0000") {
            this.$message("该渠道已经禁止");
            this.addSuccess();
          }
        })
        .catch(err => {});
    },
    //单个解禁
    unForbidChannel() {
      this.unForbidVisible = false;
      API.unForbidChannel([
        {
          id: this.id,
          channelStatus: "0"
        }
      ])
        .then(res => {
          if (res.data.data.respCode === "0000") {
            this.$message("该渠道已经解禁");
            this.addSuccess();
          }
        })
        .catch(err => {});
    },
    specialCell({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 1) {
        return "special";
      }
    },
    cellClick(row, column, cell, event) {
      if (column.label == "渠道名称") {
        this.$router.push({
          path: `/channelCenter/customChannel/detail`,
          query: {
            id: row.id
          }
        });
      }
    },
    rowClick(row, event, column) {
      this.$router.push({
        path: `/channelCenter/customChannel/detail`,
        query: {
          id: row.id
        }
      });
    },
    //单个删除
    deleteChannel() {
      this.deleteVisible = false;
      API.deleteChannel({
        idList: [this.id]
      })
        .then(res => {
          if (res.data.data.respCode === "0000") {
            this.$message("已删除该渠道");
            this.addSuccess();
          }
        })
        .catch(err => {});
    },
    //点击批示删除弹框
    deleteItems(items) {
      const that = this;
      this.patchDeleteVisible = true;
      this.pathDeleteLength = items.length;
      items.forEach(function(item, index) {
        that.deleteIdList.push(item.id);
      });
    },
    //点击批量删除确定按钮
    patchDeleteChannel() {
      API.deleteChannel({
        idList: this.deleteIdList
      })
        .then(res => {
          if (res.data.data.respCode === "0000") {
            this.patchDeleteVisible = false;
            this.$message("已批量删除该渠道");
            this.addSuccess();
          }
        })
        .catch(err => {});
    },
    //批量禁用弹框
    forbidItems(items) {
      this.patchForbidVisible = true;
      //选中总共多少个渠道
      this.channelSummary = items.length;
      //选中多少个禁用渠道
      const forbidChannelSummary = [];
      //选中多少个未禁用渠道
      const unForbidChannelSummary = [];
      items.forEach(function(item, index) {
        if (!item.channelStatus) {
          forbidChannelSummary.push(item);
        } else {
          unForbidChannelSummary.push(item);
        }
      });

      this.forbidChannelSummaryLength = forbidChannelSummary.length;
      this.unForbidChannelSummaryLength = unForbidChannelSummary.length;
      this.forbidArray = items;
    },
    //点击确定批量禁止
    patchForbidDialogBtn() {
      API.unForbidChannel(this.forbidArray)
        .then(res => {
          if (res.data.data.respCode == "0000") {
            this.patchForbidVisible = false;
            this.addSuccess();
            this.$message("已禁用所选渠道");
          }
        })
        .catch(err => {});
    },
    //批量解禁弹框
    unForbidItems(items) {
      console.log(items, "解禁");
      this.patchUnForbidVisible = true;
      //选中总共多少个渠道
      this.channelSummary = items.length;
      //选中多少个禁用渠道
      const forbidChannelSummary = [];
      //选中多少个未禁用渠道
      const unForbidChannelSummary = [];
      items.forEach(function(item, index) {
        if (!item.channelStatus) {
          //0是禁用
          forbidChannelSummary.push(item);
        } else {
          unForbidChannelSummary.push(item);
        }
      });

      this.forbidChannelSummaryLength = forbidChannelSummary.length;
      this.unForbidChannelSummaryLength = unForbidChannelSummary.length;
      this.forbidArray = items;
      console.log(this.forbidArray, "items");
      console.log(forbidChannelSummary, "forbidChannelSummary");
      console.log(unForbidChannelSummary, "forbidChannelSummary");
    },
    //点击确定批量解禁
    patchUnForbidDialogBtn() {
      API.unForbidChannel(this.forbidArray)
        .then(res => {
          if (res.data.data.respCode == "0000") {
            this.patchUnForbidVisible = false;
            this.addSuccess();
            this.$message("已解禁所选渠道");
          }
        })
        .catch(err => {});
    },
    chooseSet() {
      this.dialogVisible = !this.dialogVisible;
    },
    chooseDetail() {
      this.isShow = !this.isShow;
      this.isActive = !this.isActive;
    },
    fetchData(filter) {
      const queryParams = {
        channelStatus: this.chanelStatus,
        transemissionPlatform: this.platform,
        lastDistributeTimeTo: this.ditributeTime[0],
        lastDistributeTimeFrom: this.ditributeTime[1],
        channelName: this.searchValue
      };
      const params = {
        ...filter,
        ...queryParams
      };

      return API.fetchList(params)
        .then(json => {
          // const list = json.data.items;
          // json.data.list = list;
          this.totalCount = json.data.data.totalCount;
          // console.log(json.data.data.totalCount, "totalCount");
          return json;
        })
        .catch(e => {});
    },
    reset() {
      this.channelName = "";
      this.chanelStatus = "";
      this.platform = "";
      this.ditributeTime = "";
      this.goSearch();
    },
    querySearchAsync(queryString, cb) {
      const params = {
        channelName: this.searchValue
      };
      API.fuzzySearch(params)
        .then(res => {
          if (res.data.respCode == "0000") {
            this.restaurants = res.data.data;
            for (var i = 0; i <= res.data.data.length; i++) {
              this.$set(
                this.restaurants[i],
                "value",
                res.data.data[i].channelName
              );
            }
          }
        })
        .catch(err => {});

      var restaurants = this.restaurants;

      // var restaurants = [{ value: "111" }];
      console.log(restaurants, "restaurantsrestaurantsrestaurants");
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },
    loadAll() {
      return [
        {
          value: "阳阳麻辣烫",
          address: "天山西路389号"
        },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    }
  },
  created() {
    this.getPlatformInfo();
  },
  mounted() {
    document.onclick = e => {
      if (
        !closest(e.target, ".select-panel") &&
        !closest(e.target, ".dropdown-link-screening")
      ) {
        this.isShowScreenList = false;
        // console.log("未击中-筛选面板");
      }
    };
  },
  watch: {
    searchValue(current, value) {
      console.log(current);
    }
  }
};
</script>

<style lang="scss">
.customChannel {
  min-height: 800px;

  .slurSearch {
    .el-input-group__prepend .el-input__inner {
      width: 120px;
    }
  }

  .input-with-select .el-input-group__prepend {
    // background-color: #fff;

    .el-select .el-input {
      width: 130px;
    }
  }

  .special {
    color: #1f7fb2;
    cursor: pointer;

    .cell:hover {
      color: red;
    }
  }

  .bgGray {
    background: #f4f4f5;
  }

  .chooseConditon {
    line-height: 60px;
    padding: 0 30px;

    .summary {
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      color: #595757;
      cursor: pointer;
    }
  }

  .btn {
    margin-top: 30px;
    margin-bottom: 30px;

    .el-button--info {
      width: 80px;
      border-radius: 0;
      display: inline-block;
      color: #909399;
      background: #f4f4f5;
      border-color: #d3d4d6;
    }

    .el-button--primary {
      width: 80px;
      border-radius: 0;
      display: inline-block;
      background: #eaf6fc;
      border-color: #b3d8ff;
      color: #1f7fb2;
    }
  }

  .chooseDetail {
    cursor: pointer;
    color: #595757;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
  }

  // .el-icon-arrow-down {
  //   transform: rotate(-180deg);
  //   transition: 500ms;
  // }
  i.active {
    transform: rotate(-180deg);
    transition: 500ms;
  }

  .chooseList {
    width: 96%;
    padding: 0 60px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 999;
    margin: 0 30px;

    .el-input__inner {
      border: none !important;
      border-bottom: 1px solid #eee !important;
      width: 310px;
      padding-left: 0;
    }

    span.name {
      display: block;
      color: #898989;
      font-size: 6px;
      line-height: 28px;
    }
  }
}
</style>
