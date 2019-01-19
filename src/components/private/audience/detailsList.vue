<template>
  <div class="details-list-page">
    <!-- 标题 -->
    <div class="title">
      <h5>受众轨迹</h5>
    </div>
    <!-- 筛选 -->
    <el-checkbox-group v-model="locusTypeIds" @change="changeChx">
      <el-checkbox :label="0">系统及运营</el-checkbox>
      <el-checkbox :label="1">内容互动</el-checkbox>
      <el-checkbox :label="2">公众号互动</el-checkbox>
    </el-checkbox-group>
    <!-- 表格 -->
    <el-table :data="dataList" stripe header-cell-class-name="table-header-sss" style="width: 100%">
      <el-table-column prop="updateTime" label="时间" width="180"></el-table-column>
      <el-table-column prop="interactiveScene" label="互动场景" width="180"></el-table-column>
      <el-table-column prop="eventDesc" label="事件描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a @click="handleTag(scope.row)">打标签</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 加载更多 -->
    <div @click="getData('more')" class="footer">{{moreText}}</div>
    <!-- 打标签 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <setTags :tagArray="tagArray" :tagsList="TagsList" @addTag="addCompTag"></setTags>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import {
  getAudienceDetailsList,
  getTagList,
  getAudienceDetailsTagAdd
} from "@/api/audienceCenter/audienceCenterDetailsList";
import {
  getAudiencesCompTagList,
  addCompTag
} from "@/api/audienceCenter/audienceList";
import { getTagsList } from "@/mixins";
import setTags from "@/components/common/setTags";
export default {
  components: {
    setTags
  },
  data() {
    return {
      locusTypeIds: [0, 1, 2],
      audienceInfoId: this.$route.query.id,
      dataList: [],
      page: {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      },
      hasMore: true,
      moreText: "加载更多",
      dialogVisible: false,
      TagsList: [],
      tagArray: [],
      curId: 0 // 当前id
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取列表
    getData(more) {
      if (this.hasMore || !more) {
        if (more) {
          this.page.pageNumber++;
        }
        let params = {
          audienceInfoId: this.audienceInfoId,
          locusTypeIds: this.locusTypeIds,
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize
        };
        getAudienceDetailsList(params)
          .then(res => {
            let { respCode } = res;
            if (respCode === "0000") {
              if (res.data.items && res.data.items.length < 10) {
                this.moreText = "没有更多了";
                this.hasMore = false;
              } else {
                this.moreText = "加载更多";
                this.hasMore = true;
              }
              if (more) {
                let data = [];
                if (res.data.items.length > 0) {
                  data = res.data.items.map(item => {
                    item.updateTime = moment(item.updateTime).format(
                      "YYYY-MM-DD HH:MM"
                    );
                    return item;
                  });
                }
                this.dataList = this.dataList.concat(data);
              } else {
                if (res.data.items.length > 0) {
                  this.dataList = res.data.items.map(item => {
                    item.updateTime = moment(item.updateTime).format(
                      "YYYY-MM-DD HH:MM"
                    );
                    return item;
                  });
                } else {
                  this.dataList = res.data.items;
                }
              }
              this.page.total = res.data.totalCount;
            }
          })
          .catch(err => console.error(err));
      }
    },
    // 获取标签列表
    getTagList(id) {
      let params = {
        // audienceInfoId: this.audienceInfoId,
        locusId: id
      };
      getTagList(params)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.tagArray = res.data;
            if (this.tagArray.length > 0) {
              this.tagArray = this.tagArray.map(item => {
                item.isSelect = true;
                return item;
              });
            } else {
              this.tagArray = [];
            }
          }
        })
        .catch(err => console.error(err));
      let getAudiencesCompTagData = {
        tagTypeList: [3]
      };
      // 获取当前租户标签
      getAudiencesCompTagList(getAudiencesCompTagData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            if (res.data && res.data.length > 0) {
              this.TagsList = getTagsList(this.tagArray, res.data);
            } else {
              this.TagsList = [];
            }
          }
        })
        .catch(err => console.error(err));
    },
    //新增租户标签
    addCompTag(tagName) {
      if (tagName.trim() !== "") {
        let params = {
          tagName: tagName,
          tagType: 3
        };
        addCompTag(params)
          .then(res => {
            let { respCode } = res;
            if (respCode === "0000") {
              this.tagArray.push(res.data);
              this.TagsList.push(res.data);
            }
          })
          .catch(err => console.error(err));
      }
    },
    // 保存标签
    submitTag() {
      let params = {
        audienceInfoId: this.audienceInfoId,
        audienceLocusId: this.curId,
        tagInfoReqList: this.tagArray
      };
      getAudienceDetailsTagAdd(params)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            // this.tagArray = res.data.items;
            this.dialogVisible = false;
          }
        })
        .catch(err => console.error(err));
    },

    // 筛选
    changeChx() {
      this.getData();
    },
    // 点击打标签
    handleTag(item) {
      this.curId = item.id;
      this.dialogVisible = true;
      this.getTagList(item.id);
      // console.log(item.id);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/audience/details.scss";
@import "@/assets/css/audience/detailsList.scss";
</style>
