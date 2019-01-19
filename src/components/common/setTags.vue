<template>
  <div class="tag-bar">
    <el-tag
      :key="index"
      v-for="(tag, index) in tagArray"
      closable
      :disable-transitions="false"
      :type="tag.isSelect ? 'success': ''"
      @close="handleClose(tag)"
    >{{tag.tagName}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
      maxlength="10"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
    <div class="tag-list">
      <div class="tag-nr" :key="index" v-for="(tag, index) in tagsList" @click="selectTag(tag)">
        <el-tag :type="tag.isSelect ? 'success': ''">{{tag.tagName}}</el-tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tagArray: {
      type: Array
    },
    tagsList: {
      type: Array
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  },
  // watch: {
  //   tagArray: function(newVal, oldVal) {
  //     if (newVal.length > 0) {
  //       debugger;
  //       this.tagArray = newVal.map(item => {
  //         item.isSelect = true;
  //         // this.$set(item, "isSelect", true);
  //         return item;
  //       });
  //     }
  //     console.log("tagArray", this.tagArray, "tagsList", this.tagsList);
  //   },
  //   tagsList: function(newVal, oldVal) {
  //     if (newVal.length > 0) {
  //       debugger;
  //       this.tagsList = newVal.map(item => {
  //         item.isSelect = false;
  //         // this.$set(item, "isSelect", false);
  //         return item;
  //       });
  //       console.log(
  //         "tagArray",
  //         this.tagArray,
  //         "tagsList",
  //         this.tagsList
  //       );
  //     }
  //   }
  // },
  methods: {
    handleClose(tag) {
      this.tagArray.splice(this.tagArray.indexOf(tag), 1);
      let index = this.tagsList.indexOf(tag);
      if (index !== -1) {
        this.tagsList[index].isSelect = false;
      }
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      // let tag = {
      //   tagName: this.inputValue,
      //   isSelect: false
      // };
      // if (tag.tagName) {
      // this.tagArray.push(tag);
      this.$emit("addTag", this.inputValue);
      // }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 选取标签
    selectTag(tag) {
      if (!tag.isSelect) {
        tag.isSelect = true;
        let index = this.tagsList.indexOf(tag);
        let newTag = this.tagsList.slice(index, index + 1);
        this.tagArray.push(newTag[0]);
      } else {
        tag.isSelect = false;
        let index = this.tagArray.findIndex(item => {
          return item.id === tag.id;
        });
        this.tagArray.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="scss">
.tag-bar {
  width: 100%;
  min-height: 100px;
  max-height: 300px;

  .el-tag {
    margin-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 10px;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
    margin-bottom: 10px;
  }

  .tag-list {
    // margin-top: 10px;
    padding: 10px 0;
    width: 100%;
    border-top: 1px solid #e7e7e7;

    .tag-nr {
      float: left;
    }
  }

  .tag-list::after {
    content: "";
    clear: both;
    display: block;
    height: 0;
  }
}
</style>
