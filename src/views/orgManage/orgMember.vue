<template>
  <el-dialog :visible.sync="dialogVisible" @open="dialogOpen">
    <div slot="title">
      维护组织 <el-tag>{{ org.orgName }}</el-tag
      >成员
    </div>
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchForm"
      size="mini"
      style="margin-bottom: -18px"
    >
      <el-form-item label="微信号" prop="wxAccount">
        <el-input
          v-model="searchForm.wxAccount"
          placeholder="微信号"
          style="width: 120px"
        />
      </el-form-item>

      <el-form-item label="手机号" prop="mobilePhone">
        <el-input
          v-model="searchForm.mobilePhone"
          placeholder="手机号"
          style="width: 120px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearchFormSubmit">
          <d2-icon name="search" /> 查询
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="handleSearchFormReset">
          <d2-icon name="refresh" /> 重置
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSearchOrgMembers">
          <d2-icon name="search" /> 查询组织成员
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      v-loading="loading"
      size="small"
      stripe
      highlight-current-row
      style="width: 100%"
      @sort-change="handleSortChange"
    >
      <el-table-column label="微信号" prop="wxAccount" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.wxAccount }}
        </template>
      </el-table-column>

      <el-table-column
        label="昵称"
        prop="nickName"
        sortable="custom"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>

      <el-table-column label="手机号" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.mobilePhone }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="isAdd">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAdd == 0" size="mini" type="info"
            >未添加</el-tag
          >
          <el-tag v-if="scope.row.isAdd == 1" size="mini" type="success"
            >已添加</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="角色" prop="roleCode">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.roleCode == 'ORG_STAFF'"
            size="mini"
            type="info"
            >组织志愿者</el-tag
          >
          <el-tag
            v-if="scope.row.roleCode == 'ORG_ADMIN'"
            size="mini"
            type="danger"
            >组织管理者</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isAdd == 0"
            type="primary"
            title="添加"
            size="mini"
            icon="el-icon-plus"
            circle
            @click="addOrgMember(scope.row.userId)"
          ></el-button>
          <el-button
            v-if="scope.row.isAdd == 1"
            type="danger"
            title="移除"
            size="mini"
            icon="el-icon-minus"
            circle
            @click="delOrgMember(scope.row.userId)"
          ></el-button>
          <el-button
            v-if="scope.row.roleCode != 'ORG_ADMIN'"
            type="warning"
            title="设置组织管理员"
            size="mini"
            icon="el-icon-setting"
            circle
            @click="addOrgUserAdminRole(scope.row.sysUserId)"
          ></el-button>
          <el-button
            v-if="scope.row.roleCode == 'ORG_ADMIN'"
            type="info"
            title="设置组织志愿者"
            size="mini"
            icon="el-icon-setting"
            circle
            @click="delOrgUserAdminRole(scope.row.sysUserId)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
        :page-sizes="[1, 100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: -10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>
<script>
import * as orgService from '@/api/orgManage/orgManageApi'
import * as userService from '@/api/sys/user'
import * as roleService from '@/api/sys/role'
export default {
  name: 'orgMember',
  props: {
    org: Object,
    value: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      searchForm: {
        mobilePhone: '',
        wxAccount: ''
      },
      loading: false,
      tableData: [],
      page: {
        current: 1,
        size: 100,
        total: 0
      },
      sort: {
        prop: '',
        order: ''
      },
      orgAdminRoleId: ''
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val
    },
    dialogVisible(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.getAdminRoleId()
  },
  methods: {
    dialogOpen() {
      this.getTableData()
    },
    getTableData() {
      let query = {
        pageNum: this.page.current,
        pageSize: this.page.size,
        wxAccount: this.searchForm.wxAccount,
        mobilePhone: this.searchForm.mobilePhone
      }
      orgService.getOrgUserPage(query).then(data => {
        this.tableData = data.list
        this.page.total = data.total
      })
    },
    getOrgTableData() {
      let query = {
        pageNum: this.page.current,
        pageSize: this.page.size,
        wxAccount: this.searchForm.wxAccount,
        mobilePhone: this.searchForm.mobilePhone,
        orgId: this.org.orgId
      }
      orgService.getOrgUserPage(query).then(data => {
        this.tableData = data.list
        this.page.total = data.total
      })
    },
    handleSearchFormSubmit() {
      this.getTableData()
    },
    handleSearchOrgMembers() {
      this.getOrgTableData()
    },
    handleSearchFormReset() {
      this.$refs.searchForm.resetFields()
    },
    handleSortChange(val) {
      this.sort.prop = val.prop
      this.sort.order = val.order
      this.getTableData()
    },
    handleSizeChange(val) {
      this.page.size = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.getTableData()
    },
    addOrgMember(userId) {
      userService
        .saveOrgUser({
          userId: userId,
          orgId: this.org.orgId
        })
        .then(() => {
          this.$notify({
            title: '操作成功',
            message: '已添加',
            type: 'success'
          })
          this.getTableData()
        })
    },
    delOrgMember(userId) {
      userService
        .delOrgUser({
          userId: userId,
          orgId: this.org.orgId
        })
        .then(() => {
          this.$notify({
            title: '操作成功',
            message: '已删除',
            type: 'success'
          })
          this.getTableData()
        })
    },
    getAdminRoleId() {
      roleService.getRoleByRoleCode({ roleCode: 'ORG_ADMIN' }).then(res => {
        this.orgAdminRoleId = res.roleId
      })
    },
    addOrgUserAdminRole(userId) {
      roleService
        .crtUserRole({ userId: userId, roleId: this.orgAdminRoleId })
        .then(res => {
          this.$notify({
            title: '操作成功',
            message: '已成为管理员',
            type: 'success'
          })
          this.getOrgTableData()
        })
    },
    delOrgUserAdminRole(userId) {
      roleService
        .delUserRole({ userId: userId, roleId: this.orgAdminRoleId })
        .then(res => {
          this.$notify({
            title: '操作成功',
            message: '已成为志愿者',
            type: 'success'
          })
          this.getOrgTableData()
        })
    }
  }
}
</script>
