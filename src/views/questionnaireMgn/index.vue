<template>
  <d2-container>
    <template slot="header">
      <div class="header-cover">
        <el-button
          type="primary"
          size="small"
          round=""
          icon="el-icon-folder-add"
          @click="addQuestionnaire"
          >新建问卷</el-button
        >
      </div>
    </template>
    <el-table :data="data" border fit style="width: 100%;">
      <el-table-column
        label="问卷标题"
        align="center"
        prop="questionnaireTitle"
      >
      </el-table-column>

      <el-table-column label="创建时间" align="center" prop="createDate">
      </el-table-column>

      <el-table-column label="匹配的活动" align="center" prop="matchActivity">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="180"
        class-name="small-padding fixed-width "
        fixed="right"
      >
        <template slot-scope="scope">
          <el-tooltip content="设置" placement="top-start" effect="light">
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              size="small"
              @click="edit(scope.row.questionnaireId)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top-start" effect="light">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
              @click="deleteQuestionnaire(scope.row.questionnaireId)"
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
  questionnaireList,
  questionnaireDelete
} from '@/api/questionnaireManage/questionnaireManageApi'
import util from '@/libs/util'
var pageNum = 1
var pageSize = 10
var orgId = ''

export default {
  name: 'QuestionnaireIndex',
  data() {
    return {
      data: [],
      currentPage: 1,
      total: 0
    }
  },
  mounted() {
    orgId = util.cookies.get('orgId')
    if (orgId == '' || orgId == null || typeof orgId == 'undefined') {
      this.$router.push({
        name: 'login'
      })
      return
    }
    this.getList()
  },
  methods: {
    getList() {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize
      }
      questionnaireList(data).then(res => {
        console.log(res.list)
        this.data = res.list
        this.currentPage = res.pageNum
        this.total = res.total
      })
    },
    deleteQuestionnaire(id) {
      this.$confirm('确认删除此问卷?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let data = {
            questionnaireId: id
          }
          questionnaireDelete(data).then(res => {
            this.getList()
          })
        })
        .catch(() => {})
    },
    addQuestionnaire() {
      this.$router.push({
        path: '/group/questionnaire/new',
        query: { type: 'new' }
      })
    },
    edit(val) {
      this.$router.push({
        path: '/group/questionnaire/new',
        query: { questionnaireId: val, type: 'edit' }
      })
    },
    handleSizeChange(val) {
      pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      pageNum = val
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
