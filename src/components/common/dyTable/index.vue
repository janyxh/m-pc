<template>
  <div class="dytable-view" v-loading='isLoading'>
    <div class="dytable-view-operation">
      <slot></slot>
    </div>
    <div class="dytable-view-body" ref="dytableBody">
      <el-table ref="multipleTable" @cell-click='cellClick' @row-click="rowClick" @selection-change="handleSelectionChange"
        :cell-class-name='specialCell' :data='list' :row-class-name='rowClassName'>
        <el-table-column type="selection" width="60" v-if="isSelection"></el-table-column>
        <template v-for="(value,key) in keys">
          <el-table-column :label="(typeof value ==='string')?value:value.label" :key="'col'+key" :prop="key" :width="value.width||''">
          </el-table-column>
        </template>
        <el-table-column v-if="actions.length" :label="actionsFieldset" :class="'op'" :width="actions[0].width||''">
          <template slot-scope="scope">
            <div class="action-list">
              <template v-for="(action, index) in actions">
                <el-button v-if="!action.handle" :key="'action' + index" @click="e => { e.stopPropagation();action.action(scope.row, e);}"
                  type="text" size="small" style="text-align: left">{{action.label}}</el-button>
                <dyitem v-else :key="'action' + index" :render-item="(createElement) => actionHandle(action, scope, createElement)" />
              </template>

            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-row class='dytable-view-bottom' type="flex" justify="space-between" v-show="list.length > 0">
      <el-col :span="10" class="dytable-custom-btn" v-if="isPatchAcitons">
        <el-checkbox @change="chooseAll(list)" v-model="isChoose"></el-checkbox>
        <el-button class="deleteItem" size="small" @click="pathchDeleteAction">批量删除</el-button>
        <el-button class="batchForbid" size="small" @click="patchForbidAction">批量禁用</el-button>
        <el-button class="batchForbid" size="small" @click="patchUnForbidAction">批量解禁</el-button>
      </el-col>
      <el-col :span="14" v-if="isPatchAcitons">
        <div class="dytable-view-paging" v-show="list.length > 0">
          <el-pagination @size-change="handlePageSize" @current-change="handlePageCurrent" layout="prev, pager, next"
            ref="pager" background :total="page.total">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="24" v-if="!isPatchAcitons">
        <div class="dytable-view-paging" v-show="list.length > 0">
          <el-pagination @size-change="handlePageSize" @current-change="handlePageCurrent" layout="prev, pager, next"
            ref="pager" background :total="page.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handlePageSize, handlePageCurrent } from "./pageAction";
import Dyitem from "./dyitem";
export default {
  components: {
    Dyitem
  },
  data() {
    return {
      list: [],
      isLoading: false,
      page: {
        size: 10,
        sizes: [10, 20],
        current: 1,
        total: 0
      },
      isChoose: false,
      multipleSelection: []
    };
  },
  props: {
    filter: {
      type: Object,
      default: () => {
        return {
          searchValue: ""
        };
      }
    },
    actionsFieldset: {
      type: String,
      default: "操作"
    },
    isPatchAcitons: {
      type: Boolean,
      default: true
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: () => []
    },
    fetchData: {
      type: Function,
      default: null
    },
    keys: {
      type: Object,
      default: () => ({})
    },
    //为单元格添加类名
    specialCell: {
      type: Function,
      default: () => ({})
    },
    //为每行添加类名
    rowClassName: {
      type: Function,
      default: () => ({})
    }
  },
  methods: {
    cellClick(row, column, cell, event) {
      this.$emit("cellClick", row, column, cell, event);
    },
    rowClick(row, event, column) {
      //this.$emit("rowClick", row, event, column);
    },
    pathchDeleteAction() {
      this.$emit("patchDelete", this.multipleSelection);
    },
    patchForbidAction() {
      this.$emit("patchForbid", this.multipleSelection);
    },
    patchUnForbidAction() {
      this.$emit("patchUnForbid", this.multipleSelection);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("selectDataEvent", this.multipleSelection);
      if (this.multipleSelection.length == this.list.length) {
        this.isChoose = true;
      } else {
        this.isChoose = false;
      }
    },
    chooseAll(list) {
      if (this.isChoose) {
        this.$refs.multipleTable.toggleAllSelection();
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    getSearchData() {
      this.isLoading = true;
      const filter = {
        pageNumber: this.page.current,
        pageSize: this.page.size
      };
      let _this = this;
      this.fetchData(filter)
        .then(json => {
          _this.isLoading = false;
          const data = json.data.data;
          data.items.forEach((item, index) => {
            // let number = (data.current - 1) * data.size + index + 1;
            // if (number < 10) {
            //   number = "0" + number;
            // }
            // item.index = number;
          });
          _this.list = data.items;
          // ({ total: _this.page.total, size: _this.page.size } = data);
          _this.page.total = parseInt(data.totalCount);
        })
        .catch(e => {
          this.isLoading = false;
        });
    },
    search() {
      this.page.current = 1;
      this.getSearchData();
    },
    actionHandle(action, scope, createElement) {
      return action.handle(scope, createElement, this);
    },
    handlePageSize,
    handlePageCurrent
  },
  created() {
    this.getSearchData(1);
  }
};
</script>

<style lang="scss">
.dytable-view {
  .el-table__body-wrapper {
    overflow-y: auto;
  }
}

.dytable-view-body {
  margin-left: 30px;
  margin-right: 30px;
}

.dytable-view-operation {
  background: #fff;
  margin-bottom: 10px;
  position: relative;
}

.dytable-view-bottom {
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #fff;
  padding-left: 14px;

  .deleteItem {
    margin-left: 20px;
  }
}

.dytable-view-paging {
  text-align: right;
}
</style>
