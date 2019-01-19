<template>
  <div class="details-tags-page">
    <div class="title">
      <h5>受众标签</h5>
      <span @click="addTag">运营打标签</span>
    </div>
    <div :style="{height: defHeight,overflow: isHide}">
      <div class="tags-contetn">
        <h5>
          <el-checkbox-group v-model="checkList" @change="getTagsList">
            <el-checkbox :class="{'nr-tag-color':checkList.indexOf('1') !== -1}" label="1">内容标签</el-checkbox>
            <el-checkbox :class="{'qd-tag-color':checkList.indexOf('2') !== -1}" label="2">渠道标签</el-checkbox>
            <el-checkbox :class="{'yy-tag-color':checkList.indexOf('3') !== -1}" label="3">运营标签</el-checkbox>
          </el-checkbox-group>
        </h5>
        <div v-if="tagArray.length === 0">暂无数据！</div>
        <div
          class="tag-nr"
          :key="index"
          v-for="(tag, index) in tagArray"
          @mousemove="selectTag(tag)"
          @mouseout="unSelectTag(tag)"
        >
          <el-tag :type="tag.type">
            {{tag.tagName}}
            <span v-show="tag.isSelect">
              <i class="el-icon-edit" @click="eidtTag(tag)"></i>
              <i class="el-icon-delete" @click="deleteTag(tag,index)"></i>
            </span>
          </el-tag>
        </div>
      </div>
    </div>
    <div class="atrr-bottom" @click="isOpenMore">
      {{isOpen?'收起':'展开'}}
      <i v-if="isOpen" class="el-icon-arrow-up"></i>
      <i v-else class="el-icon-arrow-down"></i>
    </div>
    <!--标签删除-->
    <el-dialog title="删除标签" :visible.sync="isShowDel" width="470px">
      <div class="batch-content">
        <div class="batch-text">
          <p>
            <i class="el-icon-warning"></i>
            你确定要将“{{tagName}}”标签从该受众身上移出？
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDel = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmDel" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--标签编辑-->
    <el-dialog title="修改标签名称 " :visible.sync="isShowEditBOx" width="470px">
      <div class="edit-content">
        <p>
          <label>标签ID：</label>
          <span>{{editTag.id}}</span>
        </p>
        <p>
          <label>标签名称：</label>
          <el-input v-model="editTag.tagName" placeholder="请输入标签名称" size="small"></el-input>
        </p>
        <div class="is-gou">
          <el-checkbox v-model="isGou"></el-checkbox>
          <span>修改标签名称会对其他含有该标签的受众进行统一修
            <br>改，如果只要修改该受众，你可以去执行删除操作
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditBOx = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmEditTag" size="small" :disabled="!isGou">确 定</el-button>
      </span>
    </el-dialog>
    <!--标签新增-->
    <el-dialog title="运营打标签" :visible.sync="isShowAddBOx" width="470px">
      <div class="edit-content">
        <p>
          <label>标签名称：</label>
          <el-input v-model="tagName" maxlength="10" placeholder="请输入标签名称" size="small"></el-input>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddBOx = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmAddTag" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTagsList,
  addTags,
  editTags,
  deleteTags
} from "@/api/audienceCenter/audienceDetails";
export default {
  data() {
    return {
      tagId: "",
      tagName: "",
      editTag: {},
      delIndex: "",
      tagArray: [],
      checkList: ["1", "2", "3"],
      dataArr: [],
      isGou: false,
      isShowAddBOx: false,
      isShowEditBOx: false,
      isShowDel: false,
      isOpen: true,
      isHide: "visible",
      defHeight: "auto",
      externalSysId: "1",
      clfs: "1"
    };
  },
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    setTimeout(() => {
      this.getTagsList();
    }, 1000);
  },
  methods: {
    /**
     * 获取标签列表
     */
    getTagsList() {
      let getData = {
        audienceInfoId: this.id,
        tagTypeList: this.checkList
      };
      getTagsList(getData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.tagArray = res.data.map(item => {
              this.$set(item, "isSelect", false);
              if (item.tagType === 1) {
                this.$set(item, "type", "");
              } else if (item.tagType === 2) {
                this.$set(item, "type", "success");
              } else if (item.tagType === 3) {
                this.$set(item, "type", "warning");
              }
              return item;
            });

            console.log("adfdsf>>>", this.tagArray);
          }
        })
        .catch(err => console.error(err));
    },

    selectTag(tag) {
      tag.isSelect = true;
    },
    unSelectTag(tag) {
      tag.isSelect = false;
    },
    eidtTag(tag) {
      this.editTag = tag;
      this.isShowEditBOx = true;
    },
    deleteTag(tag, index) {
      this.tagName = tag.tagName;
      this.delIndex = index;
      this.tagId = tag.id;
      this.isShowDel = true;
    },
    confirmDel() {
      let delData = {
        tagId: this.tagId,
        audienceInfoId: this.id
      };
      deleteTags(delData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("移除成功！");
            this.tagArray.splice(this.delIndex, 1);
            this.isShowDel = false;
          }
        })
        .catch(err => console.error(err));
    },
    confirmEditTag() {
      let editData = {
        id: this.editTag.id,
        tagName: this.editTag.tagName
      };
      editTags(editData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("修改成功！");
            this.getTagsList();
            this.isShowEditBOx = false;
          }
        })
        .catch(err => console.error(err));
    },
    // 新增
    addTag() {
      this.isShowAddBOx = true;
    },
    confirmAddTag() {
      let tag = {
        tagRuleId: 4,
        audienceInfoId: this.id,
        tagName: this.tagName,
        tagType: "3"
      };
      addTags(tag)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("新增成功！");
            this.getTagsList();
            this.isShowAddBOx = false;
            this.tagName = "";
          }
        })
        .catch(err => console.error(err));
    },
    // 收起/展开
    isOpenMore() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.isHide = "visible";
        this.defHeight = "auto";
      } else {
        this.isHide = "hidden";
        this.defHeight = 0 + "px";
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/audience/details.scss";
</style>
