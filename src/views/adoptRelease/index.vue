<template>
    <d2-container better-scroll >
        <template slot="header">

            <h2>领养管理</h2>
            <div class="header-cover">
                <p>发布领养信息。</p>
                <el-button type="primary"
                           size="medium"
                           @click="newAdopt">新增领养信息</el-button>
            </div>
        </template>
        <el-table :data="data" border fit style="width: 100%;">
            <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
            <el-table-column label="昵称"  align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.petName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="年龄" width="150px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.petAge }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="160px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width ">
                <template slot-scope="scope">
                    <el-tooltip content="查看" placement="top-start" effect="light">
                        <el-button icon="el-icon-document" circle size="small" @click="check(scope.row.petId)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="编辑" placement="top-start" effect="light">
                        <el-button type="success" icon="el-icon-edit" circle size="small" @click="edit(scope.row.petId)"></el-button>
                    </el-tooltip>
                    <el-tooltip content="取消" placement="top-start" effect="light">
                        <el-button type="danger" icon="el-icon-delete-solid" circle size="small" @click=""></el-button>
                    </el-tooltip>

                </template>
            </el-table-column>
        </el-table>

    </d2-container>

</template>

<script>
    import {adoptList} from "@/api/adoptRelease/adoptReleaseApi"
    import util from '@/libs/util'
    export default {
        data() {
            return {
                data: []
            }
        },
        mounted() {
            // console.log(this.$refs.d2Crud.d2CrudData)
            this.getList()
        },
        methods: {
            getList(){
                let data = {
                    orgId:util.cookies.get("orgId"),
                    pageNum:"1",
                    pageSize:"10",
                }
                adoptList(data).then(res => {
                    this.data = res.list
                });
            },
            newAdopt(){
                this.$router.push('/adoptRelease/new')
            },
            check(){

            }
        }
    }
</script>

<style scoped>
    .header-cover {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

</style>
