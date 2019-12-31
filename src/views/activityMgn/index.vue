<template>
  <d2-container>
    <template slot="header">
      <div class="header-cover">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="活动种类">
            <el-select v-model="formInline.activityType"
                       placeholder="请选择">
              <el-option v-for="item in activityTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上线状态">
            <el-select v-model="formInline.isActive"
                       placeholder="请选择">
              <el-option v-for="item in isActiveOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       round=""
                       size="small"
                       @click="search">查询</el-button>
            <el-button type=""
                       round=""
                       size="small"
                       @click="reset">重置</el-button>
            <el-button type="primary"
                       size="small"
                       round=""
                       icon="el-icon-folder-add"
                       @click="addActivity">新增活动</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <el-table :data="data"
              border
              fit
              style="width: 100%;">

      <el-table-column label="活动标题"
                       align="center"
                       prop="activityTitle">
      </el-table-column>

      <el-table-column label="活动报名时间"
                       width="160"
                       align="center">
        <template slot-scope="scope">
          <div>{{scope.row.activityRegisterStartTime+"-"+scope.row.activityRegisterEndTime}}</div>
        </template>
      </el-table-column>

      <el-table-column label="活动时间"
                       width="160"
                       align="center">
        <template slot-scope="scope">
          <div>{{scope.row.activityStartTime+"-"+scope.row.activityEndTime}}</div>
        </template>
      </el-table-column>

      <el-table-column label="参加活动时间"
                       width="160"
                       align="center">
        <template slot-scope="scope">
          <div>{{scope.row.activityPickTime}}</div>
        </template>
      </el-table-column>

      <el-table-column label="活动地址"
                       width="160"
                       align="center"
                       prop="activityAddress">
      </el-table-column>

      <el-table-column label="活动banner图"
                       align="center"
                       width="120">
        <template slot-scope="scope">
          <img :src="scope.row.activityBanner"
               alt="暂无图片"
               style="width: 90px;height: 90px;border-radius:5px;">
        </template>
      </el-table-column>

      <el-table-column label="活动管理员微信"
                       align="center"
                       prop="customerSupport">
      </el-table-column>

      <el-table-column label="活动获得积分"
                       align="center"
                       prop="activityPoint">
      </el-table-column>
      <el-table-column label="活动消耗积分"
                       align="center"
                       prop="activityCost">
      </el-table-column>

      <el-table-column label="创建时间"
                       align="center"
                       prop="createDate"
                       width="120">
      </el-table-column>

      <el-table-column label="发布状态"
                       align="center"
                       prop="activityStatus"
                       width="120">
      </el-table-column>

      <el-table-column label="活动属性"
                       align="center"
                       prop="activityType">
        <template slot-scope="scope">
          <div>{{activityTypeOptions[scope.row.activityType - 1].label}}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="180"
                       class-name="small-padding fixed-width "
                       fixed="right">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.isActive === 1 ? '下线' : '上线'"
                      placement="top-start"
                      effect="light">
            <el-button :type="scope.row.isActive === 1 ? 'danger' : 'primary'"
                       icon="el-icon-moon-night"
                       circle
                       size="small"
                       @click="switchline(scope.row.id, scope.row.isActive === 1 ? 0 : 1)"></el-button>
          </el-tooltip>
          <el-tooltip content="编辑"
                      placement="top-start"
                      effect="light">
            <el-button type="success"
                       icon="el-icon-edit"
                       circle
                       size="small"
                       @click="edit(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除"
                      placement="top-start"
                      effect="light">
            <el-button type="danger"
                       icon="el-icon-delete"
                       circle
                       size="small"
                       @click="deleteActivity(scope.row.id)"></el-button>
          </el-tooltip>
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
import { activityList, activityEdit, activityDelete } from "@/api/activityManage/activityManageApi"
import util from '@/libs/util'
var pageNum = 1
var pageSize = 10
var orgId = ''

export default {
  name:'ActivityIndex',
  data () {
    return {
      data: [],
      currentPage: 1,
      total: 0,
      activityTypeOptions: [{
        label: '线上活动',
        value: '1'
      }, {
        label: '线下活动',
        value: '2'
      }],
      isActiveOptions: [{
        label: '上线',
        value: '1'
      }, {
        label: '下线',
        value: '0'
      }],
      formInline: {
        activityType: '',
        isActive: ''
      }
    }
  },
  mounted () {
    orgId = util.cookies.get("orgId")
    if (orgId == '' || orgId == null || typeof orgId == 'undefined') {
      this.$router.push({
        name: 'login'
      })
      return
    }
    this.getList()
  },
  methods: {
    getList () {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize,
        activityType: this.formInline.activityType,
        isActive: this.formInline.isActive
      }
      activityList(data).then(res => {
        console.log(res.list)
        this.data = res.list
        this.currentPage = res.pageNum
        this.total = res.total
      });
    },
    switchline (id, status) {
      let data = {
        id: id,
        isActive: status
      }
      activityEdit(data).then(res => {
        this.getList()
      });
    },
    deleteActivity (id) {
      let data = {
        activityId: id
      }
      activityDelete(data).then(res => {
        this.getList()
      });
    },
    addActivity () {
      this.$router.push({ path: '/group/activity/new', query: { type: "new" } })
    },
    edit (val) {
      this.$router.push({ path: '/group/activity/new', query: { activityId: val, type: "edit" } })
    },
    handleSizeChange (val) {
      pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      pageNum = val
      this.getList()
    },
    search () {
      this.getList()
    },
    reset () {
      this.formInline.activityType = ''
      this.formInline.isActive = ''
      this.getList()
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
.tag-popover {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.tag-pop {
  margin-bottom: 5px;
}
</style>
