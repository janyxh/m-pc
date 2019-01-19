<template>
  <!-- 概览 -->
  <div class="overview">
    <div class="item">
      <el-popover placement="top" trigger="hover" content="浏览过推广商品的受众，含分销员">
        <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
      </el-popover>
      <el-row :gutter="20">
        <el-col :span="14">
          <b>12000</b>
          <div>客户人数(人)</div>
        </el-col>
        <el-col :span="10">
          <p>
            <i class="iconfont icon-data_btn_cust"></i>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <el-popover placement="top" trigger="hover" content="不含“待审核”、“已清退”和“审核不通过”的" width="200">
        <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
      </el-popover>
      <el-row :gutter="20">
        <el-col :span="14">
          <b>12000</b>
          <div>分销员总数(人)</div>
        </el-col>
        <el-col :span="10">
          <p>
            <i class="iconfont icon-data_btn_dist"></i>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <el-popover placement="top" trigger="hover" content="不含已关闭的和全额退款的订单">
        <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
      </el-popover>
      <el-row :gutter="20">
        <el-col :span="14">
          <b>12000</b>
          <div>订单总数(笔)</div>
        </el-col>
        <el-col :span="10">
          <p>
            <i class="iconfont icon-data_btn_order"></i>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <el-popover placement="top" trigger="hover" content="订单总额对应的金额，部分退款的订单中的退款金额要扣除" width="200">
        <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
      </el-popover>
      <el-row :gutter="20">
        <el-col :span="14">
          <b>12000</b>
          <div>订单总额(元)</div>
        </el-col>
        <el-col :span="10">
          <p>
            <i class="iconfont icon-data_btn_total"></i>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <el-popover placement="top" trigger="hover" content="成交金额 = 订单总额 - 运费金额">
        <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
      </el-popover>
      <el-row :gutter="20">
        <el-col :span="14">
          <b>12000</b>
          <div>成交金额(元)</div>
        </el-col>
        <el-col :span="10">
          <p>
            <i class="iconfont icon-data_btn_deal"></i>
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <el-popover placement="top" trigger="hover" content="含待结佣状态的佣金">
        <i class="iconfont icon-chan_pop_doubtsvg" slot="reference"></i>
      </el-popover>
      <el-row :gutter="20">
        <el-col :span="14">
          <b>12000</b>
          <div>累计佣金(元)</div>
        </el-col>
        <el-col :span="10">
          <p>
            <i class="iconfont icon-data_btn_comm"></i>
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../../assets/css/distribution/overview";
</style>
