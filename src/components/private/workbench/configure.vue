<template>
  <div>
    <p class="title">营销配置</p>
    <el-row :gutter="30">
      <el-col :span="6">
        <router-link to="/home">
          <div class="list">
            <el-row :gutter="20">
              <el-col :span="8">
                <img src="@/assets/images/workbench/work_btn_mess.png" alt>
              </el-col>
              <el-col :span="16">
                <p>第三方授权管理</p>
                <span>发布的内容可关联公众号/小程序</span>
              </el-col>
            </el-row>
          </div>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="/home">
          <div class="list">
            <el-row :gutter="20">
              <el-col :span="8">
                <img src="@/assets/images/workbench/work_btn_pub.png" alt>
              </el-col>
              <el-col :span="16">
                <p>短信配置</p>
                <span>通过短信配置营销内容</span>
              </el-col>
            </el-row>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>
