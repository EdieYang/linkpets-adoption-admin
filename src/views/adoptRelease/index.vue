<template>
    <div class="container">
        <h4>领养发布</h4>
        <el-button slot="header" type="primary" style="margin-bottom: 5px" @click="newAdopt">新增领养信息</el-button>
        <d2-crud
                ref="d2Crud"
                :columns="columns"
                :data="data"/>
    </div>

</template>

<script>
    // import {getAdopt}
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '日期',
                        key: 'date',
                        width: '180'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width: '180'
                    },
                    {
                        title: '详情',
                        key: 'detail'
                    },{
                        title: '是否已领养',
                        key: 'tag',
                        width: '180',
                        filters: [
                            { text: '是', value: '是' },
                            { text: '否', value: '否' }
                        ],
                        filterMethod (value, row) {
                            return row.tag === value
                        },
                        filterPlacement: 'bottom-end'
                    }

                ],
                data: [
                    {
                        date: '2016-05-02',
                        name: '狗1',
                        detail: '这是一条狗',
                        tag:'是'
                    },
                    {
                        date: '2016-05-04',
                        name: '猫1',
                        detail: '这是一只猫',
                        tag:'否'
                    },
                    {
                        date: '2016-05-01',
                        name: '兔1',
                        detail: '这是一只兔子',
                        tag:'否'
                    },
                    {
                        date: '2016-05-03',
                        name: '牛1',
                        detail: '这是一只牛',
                        tag:'否'
                    }
                ]
            }
        },
        mounted() {
            console.log(this.$refs.d2Crud.d2CrudData)
        },
        methods: {
            getList(){

            },
            newAdopt(){
                this.$router.push('/adoptRelease/new')
            }
        }
    }
</script>

<style scoped>
.container{
    padding:20px;
}
</style>
