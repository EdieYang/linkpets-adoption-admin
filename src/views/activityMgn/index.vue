<template>
  <d2-container>
    <template slot="header">
      <div class="header-cover">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="活动种类">
            <el-select v-model="formInline.activityType" placeholder="请选择">
              <el-option
                v-for="item in activityTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上线状态">
            <el-select v-model="formInline.isActive" placeholder="请选择">
              <el-option
                v-for="item in isActiveOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round="" size="small" @click="search"
              >查询</el-button
            >
            <el-button type="" round="" size="small" @click="reset"
              >重置</el-button
            >
            <el-button
              type="primary"
              size="small"
              round=""
              icon="el-icon-folder-add"
              @click="addActivity"
              >新增活动</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </template>
    <el-table :data="data" border fit style="width: 100%;">
      <el-table-column label="活动" width="420">
        <template slot-scope="scope">
          <div class="activity-cover">
            <div class="activity-header">{{ scope.row.activityTitle }}</div>
            <div class="activity-time">
              {{
                scope.row.activityStartTime + ' - ' + scope.row.activityEndTime
              }}
            </div>
            <div class="activity-address">
              {{ scope.row.activityArea }} {{ scope.row.activityAddress }}
            </div>
            <div class="activity-state">
              <el-tag type="" effect="dark" class="activity-tag">
                {{ activityTypeOptions[scope.row.activityType - 1].label }}
              </el-tag>
              <el-tag type="success" effect="dark" class="activity-tag">
                {{ scope.row.activityStatus }}
              </el-tag>
              <el-tag type="danger" effect="plain" class="activity-tag">
                +{{ scope.row.activityPoint }}积分
              </el-tag>
              <el-tag type="warning" effect="plain" class="activity-tag">
                -{{ scope.row.activityCost }}积分
              </el-tag>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="活动banner图" align="center" width="120">
        <template slot-scope="scope">
          <img
            :src="picturePrefix + scope.row.activityBanner"
            alt="暂无图片"
            style="width: 90px;height: 90px;border-radius:5px;"
          />
        </template>
      </el-table-column>

      <el-table-column label="活动报名时间" width="300" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag>
              {{
                scope.row.activityRegisterStartTime +
                  ' - ' +
                  scope.row.activityRegisterEndTime
              }}</el-tag
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column label="参加活动时间段" width="300" align="center">
        <template slot-scope="scope">
          <div
            v-for="item in scope.row.activityPickTimeArr"
            style="margin-bottom:10px;margin-top:10px;"
          >
            <el-tag> {{ item }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="活动管理员微信"
        align="center"
        prop="customerSupport"
        width="150"
      >
      </el-table-column>

      <el-table-column
        label="创建时间"
        align="center"
        prop="createDate"
        width="200"
      >
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="200"
        class-name="small-padding fixed-width "
        fixed="right"
      >
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.isActive === 1 ? '下线' : '上线'"
            placement="top-start"
            effect="light"
          >
            <el-button
              :type="scope.row.isActive === 1 ? 'danger' : 'primary'"
              icon="el-icon-moon-night"
              circle
              size="small"
              @click="
                switchline(scope.row.id, scope.row.isActive === 1 ? 0 : 1)
              "
            ></el-button>
          </el-tooltip>
          <el-tooltip content="详情" placement="top-start" effect="light">
            <el-button
              type="warning"
              icon="el-icon-reading"
              circle
              size="small"
              @click="detail(scope.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top-start" effect="light">
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              size="small"
              @click="edit(scope.row.id, scope.row.isActive)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top-start" effect="light">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
              @click="deleteActivity(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </template>
  </d2-container>
</template>

<script>
import {
  activityList,
  activityEdit,
  activityDelete
} from '@/api/activityManage/activityManageApi'
import util from '@/libs/util'
var pageNum = 1
var pageSize = 10
var orgId = ''

export default {
  name: 'ActivityIndex',
  data() {
    return {
      data: [],
      currentPage: 1,
      total: 0,
      activityTypeOptions: [
        {
          label: '线上活动',
          value: '1'
        },
        {
          label: '线下活动',
          value: '2'
        }
      ],
      isActiveOptions: [
        {
          label: '上线',
          value: '1'
        },
        {
          label: '下线',
          value: '0'
        }
      ],
      formInline: {
        activityType: '',
        isActive: ''
      },
      picturePrefix: util.picturePath
    }
  },
  mounted() {
    orgId = util.cookies.get('orgId')
    this.getList()
  },
  methods: {
    getList() {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize,
        activityType: this.formInline.activityType,
        isActive: this.formInline.isActive
      }
      activityList(data).then(res => {
        console.log(res.list)
        var activityList = res.list
        activityList.forEach(element => {
          element.activityPickTimeArr = []
          let arr = element.activityPickTime.split(',')
          element.activityPickTimeArr = arr
        })
        this.data = activityList
        this.currentPage = res.pageNum
        this.total = res.total
      })
    },
    switchline(id, status) {
      let data = {
        id: id,
        isActive: status
      }
      activityEdit(data).then(res => {
        this.getList()
      })
    },
    deleteActivity(id) {
      let data = {
        activityId: id
      }
      activityDelete(data).then(res => {
        this.getList()
      })
    },
    addActivity() {
      this.$router.push({ path: '/group/activity/new', query: { type: 'new' } })
    },
    detail(val) {
      this.$router.push({
        path: '/group/activity/detail',
        query: { activityId: val }
      })
    },
    edit(val, isActive) {
      if (isActive === 1) {
        this.$message({
          message: '请先下线活动再进行编辑',
          type: 'warning'
        })
      } else {
        this.$router.push({
          path: '/group/activity/new',
          query: { activityId: val, type: 'edit' }
        })
      }
    },
    handleSizeChange(val) {
      pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      pageNum = val
      this.getList()
    },
    search() {
      this.getList()
    },
    reset() {
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
.activity-cover {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.activity-header {
  color: #2d2d2d;
  font-size: 17px;
  margin-bottom: 10px;
}
.activity-time {
  margin-bottom: 10px;
  font-size: 14px;
}
.activity-address {
  margin-bottom: 10px;
}
.activity-tag {
  margin-right: 10px;
}
.activity-state {
  margin-bottom: 10px;
}
</style>
