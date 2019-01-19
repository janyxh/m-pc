<template>
  <div class="customDetail">
    <div class="header">
      <el-row :gutter="10">
        <el-col :span="5">
          <div class="myChannel">
            <span class="title">我的营销渠道</span>
            <ul class="list">
              <li>
                <span>创建时间:</span>
                <em>{{createTime}}</em>
              </li>
              <li>
                <span>最近一次修改:</span>
                <em>{{updateTime}}</em>
              </li>
              <li>
                <span>传播渠道:</span>
                <em>{{channelName}}</em>
              </li>
              <li>
                <span>其他字段:</span>
                <em>--</em>
              </li>
              <li>
                <span>渠道状态:</span>
                <em>{{channelStatus}}</em>
              </li>
              <li>
                <span>最后一次分发:</span>
                <em>--</em>
              </li>

            </ul>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="channelData">
            <span>渠道数据</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <dy-table
        :keys="colKey"
        :fetchData="fetchData"
        :isSelection="false"
        :actions="actions"
        :isPatchAcitons='false'
        :actionsFieldset='actionsFieldset'
      ></dy-table>
    </div>
  </div>
</template>

<script>
import dyTable from "@/components/common/dyTable";
import API from "@/api/channelCenter/customChannel";
export default {
  components: {
    dyTable
  },
  data() {
    return {
      colKey: {
        eventName: "事件名称",
        distributeUrl: "分发链接",
        distributeTime: "分发时间",
        visitedNumber: "浏览人数",
        transmitTimes: "转发人次"
      },
      actionsFieldset: "更多数据",
      actions: [
        {
          label: "详情"
        }
      ],
      id: this.$route.query.id,
      //创建时间
      createTime: "",
      //最后一次修改时间
      updateTime: "",
      channelName: "",
      channelStatus: ""
    };
  },
  methods: {
    fetchData() {
      const params = {
        channelDetailReqVO: this.id
      };
      return API.fetchDetail(params)
        .then(res => {
          res.data.data.items.forEach((item, index) => {
            item.distributeTime = this.timestampToDate(item.distributeTime);
          });
          return res;
        })
        .catch(e => {});
    },
    getLog() {
      // const timestamp = "1544668334000";
      // const date = moment(timestamp).format("YYYY-MM-DD HH:mm");
      // console.log(this.timestampToDate(timestamp).format();
      // console.log(date, "date");
      API.fetchChannelInfo(this.id)
        .then(res => {
          this.createTime = this.timestampToDate(res.data.data.createTime);
          this.updateTime = this.timestampToDate(res.data.data.updateTime);
          this.channelName = res.data.data.channelName;
          if (res.data.data.channelStatus) {
            this.channelStatus = "正常";
          } else {
            this.channelStatus = "禁用";
          }
        })
        .catch(err => {});
    }
  },
  created() {
    this.getLog();
  }
};
</script>

<style lang='scss'>
.customDetail {
  margin-top: 15px;
  .header {
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 15px;
  }
  .channelData {
    background: #fff;
    height: 261px;
    span {
      display: inline-block;
      width: 100%;
      border-bottom: 1px solid #ddd;
      line-height: 60px;
      padding-left: 16px;
    }
  }
  .el-table__body td {
    padding-left: 16px;
  }
  .el-table th {
    padding-left: 16px;
  }
  .myChannel {
    background: #fff;
    box-sizing: content-box;
    .title {
      font-size: 14px;
      padding-left: 20px;
      line-height: 60px;
      display: inline-block;
      width: 100%;
      border-bottom: 1px solid #ddd;
    }
    .list {
      padding: 10px 0;
      span {
        color: #898989;
        font-size: 9px;
        line-height: 30px;
        width: 100px;
        display: inline-block;
        text-align: right;
      }
      em {
        font-size: 12px;
        line-height: 18px;
        margin-left: 10px;
        color: #0b132e;
        display: inline-block;
      }
    }
  }
}
</style>
