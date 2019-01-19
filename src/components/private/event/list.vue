<template>
  <section v-loading="loading" class="content event-content-list">
    <div v-if="dataList.length === 0" class="nodata">暂无数据</div>
    <div class="event-content-li-wrap">
      <div v-for="(item,index) in dataList" :key="index" class="content-li" :style=" item.bg ? `background:url('${item.bg}') 0% 0% / cover no-repeat;` : ''">
        <div class="mask">
          <div class="wrap">
            <!-- 预览 -->
            <div v-show="item.isShowView" class="view">
              <div class="actions">
                <p>参与者</p>
                <div class="lists">
                  <div class="l-line">
                    <p style="width: 60px">创建者</p>
                    <p style="width: 120px">创建于</p>
                    <p style="width: 67px;border-right:0px">协作人数</p>
                  </div>
                  <div class="l-line" style="border-bottom:0px">
                    <div class="data" style="width: 60px">
                      <span>{{curTeam.name}}</span>
                    </div>
                    <div class="data" style="width: 120px">
                      <span>{{curTeam.createTime}}</span>
                    </div>
                    <div class="data" style="width: 67px;border-right:0px none">
                      <span>{{curTeam.number}}</span>
                    </div>
                  </div>
                </div>
                <div class="l-btn">
                  <a @click="getTeam(item.id)">查看协作组</a>
                  <a @click="addTem(item.id)">添加协作组</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <p class="title">{{item.title}}</p>
          <!--<p>{{item.title}}</p>-->
          <p class="time">{{item.createTime}}</p>
        </div>
        <!-- 底部操作栏 -->
        <div class="footer">
          <div class="p" :class="{active:item.isShowQRCode}">
            <el-tooltip content="设置活动" placement="top">
              <i @click="openDeatails(item.id)" class="iconfont icon-edit"></i>
            </el-tooltip>
          </div>
          <!--:class="{active:isShowSetting}"-->
          <div class="p" >
            <el-tooltip content="查看活动推广链接" placement="top">
              <i class="iconfont icon-link" @click="handleSetting(item.id)"></i>
            </el-tooltip>
          </div>
          <div class="p">
            <el-tooltip content="查看活动数据" placement="top">
              <i class="iconfont icon-chart" @click="handleSetting(item.id)"></i>
            </el-tooltip>
          </div>
          <div class="p">
            <el-tooltip content="P3仅占位，标识协作操作" placement="top">
              <i class="iconfont icon-data_btn_dist" @click="handleSetting(item.id)"></i>
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
                <a @click="openMove(item)">归档</a>
              </li>
              <li>
                <a @click="handleDel(item)">删除</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="page.total" @current-change="handlePageChange" class="page"></el-pagination>
  </section>
</template>

<script>
export default {
  props: ["loadingIndex", "dataListIndex", "pageIndex"],
  components: {},
  data() {
    return {
      loading: true, // 加载
      dataList: this.dataListIndex,
      page: this.pageIndex,
      curId: null,
      curTeam: {
        name: "周星驰",
        number: "1099",
        createTime: "2018.10.28 11:30"
      }
    };
  },
  created() {
    this.$emit("getData", {
      ...this.page
    });
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
      this.page.pageNumber = page;
      this.$emit("getData", {
        ...this.page
      });
    },
    openDeatails(id) {
      this.$emit("openDeatails", id);
    },
    //添加协作组
    addTem(id) {
      alert("敬请期待");
    },
    //查看协作组
    getTeam(id) {
      alert("敬请期待");
    },
    // 点击设置
    handleSetting(id) {
      this.curId = id;
    },
    // 点击内容状态
    handleStatus(item, status) {
      /* let params = {
                            status: status,
                            contentContentId: item.id
                          }; */
    },
    // 打开 移动到分组
    openMove(item) {},
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
    }
  }
};
</script>


<style lang="scss">
@import "../../../assets/css/event/list";

// 底部
.content-li {
  background: url("../../../assets/images/content/bg_template.png") center
    center / cover no-repeat;
}
</style>
