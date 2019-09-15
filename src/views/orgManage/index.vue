<template>
  <d2-container>
    <template slot="header">

      <div class="header-cover">
        <p>管理组织下系统用户</p>
      </div>

    </template>

    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column prop="userAcc"
                       label="系统账号">

      </el-table-column>
      <el-table-column prop="nickName"
                       label="微信昵称">

      </el-table-column>
      <el-table-column label="微信头像"
                       width="200px">
        <template slot-scope="scope">
          <img :src="scope.row.portrait"
               alt=""
               style="width: 80px;height: 80px;border-radius:10px">
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">

      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10,20,30,40]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>

    </template>
  </d2-container>
</template>

<script>
import { listOrgUsers } from '@/api/orgManage/orgManageApi'
var pageNum = 1
var pageSize = 10

export default {
  name: "orgMange",
  data () {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
    }
  },
  methods: {
    listOrgUsers (orgId) {
      let req = {
        pageNum: pageNum,
        pageSize: pageSize
      }
      listOrgUsers(orgId, req).then(res => {
        console.log(res)
        this.currentPage = res.pageNum
        this.total = res.total
        this.tableData = res.list
      }).catch(err => {
        // 异常情况
      })
    },
    handleSizeChange (val) {
      pageSize = val
      this.listOrgUsers('2')
    },
    handleCurrentChange (val) {
      pageNum = val
      this.listOrgUsers('2')
    }
  },
  mounted: function () {
    pageNum = 1
    this.listOrgUsers('2')
  }
}
</script>

<style scoped>
</style>
