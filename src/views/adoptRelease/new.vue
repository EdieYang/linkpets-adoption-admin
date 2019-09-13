<template>
    <d2-container better-scroll >
        <div style="width:100%;text-align:center">
            <el-form ref="form" :model="form" label-width="90px" label-position="left"
                     style="width:720px;display: inline-block;text-align:left">
                <el-divider content-position="left">宠物信息</el-divider>
                <el-form-item label="昵称">
                    <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-select v-model="form.age" placeholder="请选择年龄" value="" style="width:100%;">
                        <el-option label="不详" value="unknown"></el-option>
                        <el-option label="0-3个月" value="01"></el-option>
                        <el-option label="4-6个月" value="02"></el-option>
                        <el-option label="7-12个月" value="03"></el-option>
                        <el-option label="1岁" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类别">
                    <el-radio-group v-model="form.type">
                        <el-radio label="0" border>狗狗</el-radio>
                        <el-radio label="1" border>猫咪</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="0" border>未知</el-radio>
                        <el-radio label="1" border>男孩</el-radio>
                        <el-radio label="2" border>女孩</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-divider content-position="left">宠物现状</el-divider>
            </el-form>
        </div>

    </d2-container>


</template>

<script>
    export default {
        name: "new",
        data() {
            return {
                form:{
                    name:"",
                    age:"",
                    type:"",
                    sex:""
                }
            }
        },
    }
</script>

<style scoped>
    .el-divider__text, .el-link{
        font-size:18px;
    }
</style>
