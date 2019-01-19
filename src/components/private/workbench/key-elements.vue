<template>
    <div>
        <p class="title">关键要素</p>
        <el-row :gutter="30">
            <el-col :span="6">
                <router-link to="/content">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_cont.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>内容中心</p>
                                <span>通过内容中心创建事件</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/channelCenter/customChannel">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_chan.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>渠道中心</p>
                                <span>通过不同渠道发布内容</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/audienceCenter/list">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_aud.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>受众中心</p>
                                <span>营销内容流程自动化</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/home">
                    <div class="list">
                        <el-row :gutter="20">
                            <el-col :span="8"><img src="@/assets/images/workbench/work_btn_tec.png" alt=""></el-col>
                            <el-col :span="16">
                                <p>自动化流程</p>
                                <span>营销内容流程自动化</span>
                            </el-col>
                        </el-row>
                    </div>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>
