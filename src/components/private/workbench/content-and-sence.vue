<template>
    <div>
        <p class="title">内容及场景应用</p>
        <el-row :gutter="30">
            <el-col :span="6">
                <router-link to="/home">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_reb.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>分销返利</p>
                                <span>分享内容获取利润</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/home">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_wechat.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>微信图文</p>
                                <span>在线编辑微信内容</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>
