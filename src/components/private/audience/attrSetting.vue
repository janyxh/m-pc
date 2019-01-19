<template>
  <div class="attr-setting-page">
    <div class="title">
      <h5>属性设置</h5>
      <span @click="openEditBox">修改</span>
    </div>
    <ul class="base-list" :style="{height: defHeight+'px'}">
      <li>
        <span>生日：</span>
        <p>{{detailsData.birth}}</p>
      </li>
      <li>
        <span>年龄：</span>
        <p>{{detailsData.age}}</p>
      </li>
      <li>
        <span>QQ：</span>
        <p>{{detailsData.qq}}</p>
      </li>
      <li>
        <span>婚姻状况：</span>
        <p>{{marry[Number(detailsData.marryFlag)]}}</p>
      </li>
      <li>
        <span>爱好：</span>
        <p>{{detailsData.hobby}}</p>
      </li>
      <li>
        <span>月收入：</span>
        <p>{{detailsData.monthIncome}}</p>
      </li>
      <li>
        <span>教育程度：</span>
        <p>{{detailsData.eduLevel}}</p>
      </li>
      <li>
        <span>所在行业：</span>
        <p>{{detailsData.industry}}</p>
      </li>
      <li>
        <span>家庭成员数：</span>
        <p>{{detailsData.folks}}</p>
      </li>
      <li>
        <span>联系地址：</span>
        <div class="attr-div">
          <p>{{detailsData.address}}</p>
        </div>
      </li>
      <li>
        <span>备注：</span>
        <p>{{detailsData.remark}}</p>
      </li>
      <li>
        <span>宠物：</span>
        <p>{{detailsData.pet}}</p>
      </li>
    </ul>
    <div class="atrr-bottom" @click="isOpenMore">
      {{isOpen?'收起':'展开'}}
      <i v-if="isOpen" class="el-icon-arrow-up"></i>
      <i v-else class="el-icon-arrow-down"></i>
    </div>
    <el-dialog title="属性设置 " :visible.sync="isShowEdit" width="720px">
      <div class="edit-attr-info">
        <ul class="edit-list">
          <li>
            <label>生日：</label>
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="detailsData.birth"
              type="date"
              placeholder="选择出生日期"
              size="small"
            ></el-date-picker>
          </li>
          <li>
            <label>年龄：</label>
            <el-input
              v-model="detailsData.age"
              @blur="resetAge()"
              type="number"
              placeholder="请输入年龄"
              size="small"
            ></el-input>
          </li>
          <li>
            <label>QQ：</label>
            <el-input
              v-model="detailsData.qq"
              type="number"
              @blur="resetQQ()"
              placeholder="请输入QQ"
              size="small"
            ></el-input>
          </li>
          <li>
            <label>婚姻状况：</label>
            <el-radio-group v-model="detailsData.marryFlag">
              <el-radio label="0">未知</el-radio>
              <el-radio label="1">已婚</el-radio>
              <el-radio label="2">未婚</el-radio>
              <el-radio label="3">其他</el-radio>
            </el-radio-group>
          </li>
          <li>
            <label>爱好：</label>
            <el-input v-model="detailsData.hobby" maxlength="20" placeholder="请输入兴趣" size="small"></el-input>
          </li>
          <li>
            <label>月收入：</label>
            <el-input
              v-model="detailsData.monthIncome"
              maxlength="20"
              placeholder="请输入月收入"
              size="small"
            ></el-input>
            <!-- <el-select v-model="sex" placeholder="请选择月收入" size="small">
              <el-option label="印象认知阶段 " value="1"></el-option>
              <el-option label="潜在兴趣阶段" value="2"></el-option>
              <el-option label="意向考虑阶段 " value="3"></el-option>
              <el-option label="行动购买阶段" value="4"></el-option>
              <el-option label="售后维护阶段 " value="5"></el-option>
              <el-option label="扩大销售阶段" value="6"></el-option>
            </el-select>-->
          </li>
          <li>
            <label>教育程度：</label>
            <el-input
              v-model="detailsData.eduLevel"
              maxlength="20"
              placeholder="请输入教育程度"
              size="small"
            ></el-input>
            <!-- <el-select v-model="sex" placeholder="请选择月收入" size="small">
              <el-option label="印象认知阶段 " value="1"></el-option>
              <el-option label="潜在兴趣阶段" value="2"></el-option>
              <el-option label="意向考虑阶段 " value="3"></el-option>
              <el-option label="行动购买阶段" value="4"></el-option>
              <el-option label="售后维护阶段 " value="5"></el-option>
              <el-option label="扩大销售阶段" value="6"></el-option>
            </el-select>-->
          </li>
          <li>
            <label>所在行业：</label>
            <el-input
              v-model="detailsData.industry"
              maxlength="20"
              placeholder="请输入所在行业"
              size="small"
            ></el-input>
            <!-- <el-select v-model="sex" placeholder="请选择月收入" size="small">
              <el-option label="印象认知阶段 " value="1"></el-option>
              <el-option label="潜在兴趣阶段" value="2"></el-option>
              <el-option label="意向考虑阶段 " value="3"></el-option>
              <el-option label="行动购买阶段" value="4"></el-option>
              <el-option label="售后维护阶段 " value="5"></el-option>
              <el-option label="扩大销售阶段" value="6"></el-option>
            </el-select>-->
          </li>
          <li>
            <label>家庭成员数：</label>
            <el-input
              v-model="detailsData.folks"
              type="number"
              @blur="resetFolks"
              placeholder="请输入家庭成员数"
              size="small"
            ></el-input>
          </li>
          <li>
            <label>联系地址：</label>
            <el-input
              v-model="detailsData.address"
              maxlength="50"
              placeholder="请输入详细地址"
              size="small"
            ></el-input>
            <!-- <el-select class="adr-select" v-model="sex" placeholder="请选择省份" size="small">
              <el-option label="广东省 " value="1"></el-option>
              <el-option label="广西省" value="2"></el-option>
            </el-select>
            <el-select class="adr-select" v-model="sex" placeholder="请选择城市" size="small">
              <el-option label="深圳市 " value="1"></el-option>
              <el-option label="广州市" value="2"></el-option>
            </el-select>
            <el-select class="adr-select" v-model="sex" placeholder="请选择区/县" size="small">
              <el-option label="南山区 " value="1"></el-option>
              <el-option label="福田区" value="2"></el-option>
            </el-select>-->
            <!-- <el-input
              class="adr-input"
              v-model="detailsData.address"
              placeholder="请输入详细地址"
              size="small"
            ></el-input>-->
            <!-- <el-input class="adr-input2" v-model="name" placeholder="请输入联系人" size="small"></el-input>
            <el-input class="adr-input3" v-model="name" placeholder="请输入联系人手机号" size="small"></el-input>-->
          </li>
          <li>
            <label>备注：</label>
            <el-input v-model="detailsData.remark" maxlength="20" placeholder="请输入备注" size="small"></el-input>
          </li>
          <li>
            <label>宠物：</label>
            <el-input v-model="detailsData.pet" maxlength="20" placeholder="请输入宠物" size="small"></el-input>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmEdit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { changeDetails } from "@/api/audienceCenter/audienceDetails";
export default {
  data() {
    return {
      marry: ["未知", "未婚", "已婚", "离异", "其他"],
      dataArr: [],
      isShowEdit: false,
      isOpen: false,
      defHeight: 94,
      externalSysId: "1",
      clfs: "1"
    };
  },
  props: {
    detailsData: {
      type: Object
    }
  },
  mounted() {},
  methods: {
    resetAge() {
      this.detailsData.age = this.detailsData.age.slice(0, 3);
    },
    resetQQ() {
      this.detailsData.qq = this.detailsData.qq.slice(0, 20);
    },
    resetFolks() {
      this.detailsData.folks = this.detailsData.folks.slice(0, 3);
    },
    isOpenMore() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.defHeight = 450;
      } else {
        this.defHeight = 94;
      }
    },
    /**
     * 打开编辑
     */
    openEditBox() {
      this.isShowEdit = true;
    },
    confirmEdit() {
      changeDetails(this.detailsData)
        .then(res => {
          let { respCode } = res;
          if (respCode === "0000") {
            this.$message.success("修改成功！");
            this.isShowEdit = false;
          }
        })
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/audience/details.scss";
</style>
