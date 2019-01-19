<template>
    <div>
        <p class="title">营销事件</p>
        <el-row :gutter="30">
            <el-col :span="6">
                <router-link to="/home">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_have.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>我拥有的</p>
                                <span>已经创建过的营销事件</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/home">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_par.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>我参与的</p>
                                <span>我参与的过的内容事件</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/home">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_file.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>已归档营销事件</p>
                                <span>随时查看整理归档的内容</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/home">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_reco.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>事件回收站</p>
                                <span>已删除的内容保存在回收站</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>
