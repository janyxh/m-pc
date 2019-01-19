<template>
  <div>
    <!-- 分组面板 -->
    <div class="screen-bar group-panel">
      <div class="screen-bar-nr screen-bar-padding">
        <div>
          <el-button type="primary" size="small" @click="openAddGroup" :disabled="dataListGroup.length > 8">添加分组</el-button>
          <el-button type="primary" plain size="small" @click="handleCompleteGroup">完成分组管理</el-button>
        </div>
        <div class="group-list">
          <span v-for="(item,index) in dataListGroup" :key="index">
            {{item.name}}
            <el-tooltip content="编辑" placement="top" v-if="!item.defaultFlag">
              <i class="iconfont icon-edit" @click="editGruop(item.id,item.name)"></i>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" v-if="!item.defaultFlag">
              <i class="iconfont icon-del" @click="isShowDelGroup(item.id)"></i>
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>

    <!-- 添加分组 -->
    <el-dialog :title="isEdit ? '编辑分组名称' :'添加分组名称'" :visible.sync="dialogFormVisibleAddGroup" @close="clearData" width="460px"
      class="dialog-add-group">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="addGroup('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除分组 -->
    <el-dialog title="删除分组" :visible.sync="dialogFormVisibleDelGroup" width="460px" class="dialog-del-group">
      <i class="el-icon-info icon-info"></i>&nbsp;
      <span>删除后该分组下的作品将移动至“未分组”下</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleDelGroup = false">取 消</el-button>
        <el-button type="primary" @click="delGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getGroup, addGroup, editGroup, delGroup } from "@/api/content";
export default {
  computed: mapState({
    dataListGroup: "groupList"
  }),
  data() {
    return {
      total: 0,
      id: null,
      isEdit: false,
      dialogFormVisibleDelGroup: false, // 是否显示 删除分组弹出框
      dialogFormVisibleAddGroup: false, // 是否显示 添加分组弹出框
      ruleForm: {
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入分组名称",
            trigger: "blur"
          },
          {
            max: 8,
            message: "不得超过 8 个字符",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "0px"
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    // 获取列表
    getData() {
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
    // 添加分组
    addGroup(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            ...this.ruleForm
          };
          if (this.isEdit) {
            params.id = this.id;
            editGroup(params)
              .then(res => {
                let { respCode } = res;
                if (respCode === "0000") {
                  this.dialogFormVisibleAddGroup = false;
                  this.$message.success("编辑成功");
                  this.resetForm("ruleForm");
                  this.getData();
                }
              })
              .catch(err => {
                console.error(err);
              });
          } else {
            addGroup(params)
              .then(res => {
                let { respCode } = res;
                if (respCode === "0000") {
                  this.dialogFormVisibleAddGroup = false;
                  this.$message.success("添加成功");
                  this.resetForm("ruleForm");
                  this.getData();
                }
              })
              .catch(err => {
                console.error(err);
              });
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.dialogFormVisibleAddGroup = false;
      this.$refs[formName].resetFields();
      this.clearData();
    },
    // 清除数据
    clearData() {
      this.ruleForm.name = "";
      this.id = null;
      this.isEdit = false;
    },
    // 点击 添加分组
    openAddGroup() {
      this.ruleForm.name = `分组${this.dataListGroup.length}`;
      this.dialogFormVisibleAddGroup = true;
    },
    // 点击 编辑分组
    editGruop(id, name) {
      this.id = id;
      this.ruleForm.name = name;
      this.isEdit = true;
      this.dialogFormVisibleAddGroup = true;
    },
    // 点击 删除分组
    isShowDelGroup(id) {
      this.id = id;
      this.dialogFormVisibleDelGroup = true;
    },
    // 删除分组
    delGroup() {
      let params = {
        id: this.id
      };
      delGroup(params)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.dialogFormVisibleDelGroup = false;
            this.$message.success("删除成功");
            this.getData();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 完成分组
    handleCompleteGroup() {
      this.$store.dispatch("closeGroupPanel");
    }
  }
};
</script>
