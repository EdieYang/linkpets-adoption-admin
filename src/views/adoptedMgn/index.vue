<template>
  <d2-container>
    <template slot="header">
      <div class="header-cover">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline"
                 label-width="80px">
          <el-form-item label="宠物种类">
            <el-select v-model="formInline.petType"
                       placeholder="请选择">
              <el-option v-for="item in petTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="送养时间">
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="formInline.adoptDateStart"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="2"
                    style="text-align:center">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="formInline.adoptDateEnd"
                              style="width: 100%;">
              </el-date-picker>
            </el-col>
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
          </el-form-item>
        </el-form>

      </div>
    </template>

    <el-table :data="data"
              border
              fit
              style="width: 100%;">
      <el-table-column label="宠物昵称"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.petName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="照片"
                       align="center"
                       width="120px;">
        <template slot-scope="scope">
          <img :src="picPath+scope.row.mediaPath"
               alt="暂无图片"
               style="width: 90px;height: 90px;border-radius:5px;">
        </template>
      </el-table-column>

      <el-table-column label="宠物性别"
                       align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.petSex==1">未知</span>
          <span v-else-if="scope.row.petSex==2">男孩</span>
          <span v-else-if="scope.row.petSex==3">女孩</span>
        </template>
      </el-table-column>

      <el-table-column label="宠物年龄"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.petAge }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人手机号"
                       align="center"
                       width="120px;">
        <template slot-scope="scope">
          <span>{{ scope.row.mobilePhone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人年龄"
                       align="center"
                       width="120px;">
        <template slot-scope="scope">
          <span v-if="scope.row.age==1">60后</span>
          <span v-else-if="scope.row.age==2">70后</span>
          <span v-else-if="scope.row.age==3">80后</span>
          <span v-else-if="scope.row.age==3">90后</span>
          <span v-else-if="scope.row.age==3">00后</span>
        </template>
      </el-table-column>

      <el-table-column label="养宠经验"
                       align="center"
                       width="120px;">
        <template slot-scope="scope">
          <span v-if="scope.row.keptPet==1">有</span>
          <span v-else-if="scope.row.keptPet==2">无</span>
        </template>
      </el-table-column>

      <el-table-column label="婚姻状况"
                       align="center"
                       width="120px;">
        <template slot-scope="scope">
          <span v-if="scope.row.maritalStatus==1">单身</span>
          <span v-else-if="scope.row.maritalStatus==2">恋爱中</span>
          <span v-else-if="scope.row.maritalStatus==2">结婚</span>
        </template>
      </el-table-column>
      <el-table-column label="住房状况"
                       align="center"
                       width="120px;">
        <template slot-scope="scope">
          <span v-if="scope.row.housingCondition==1">自有住房</span>
          <span v-else-if="scope.row.housingCondition==2">整租</span>
          <span v-else-if="scope.row.housingCondition==2">合租</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人工作"
                       align="center"
                       width="120px;">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请人所在区域"
                       align="center"
                       width="120px;">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="申请时间"
                       width="160px"
                       align="center">

        <template slot-scope="scope">
          <span>{{ scope.row.applyTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="180"
                       class-name="small-padding fixed-width "
                       fixed="right">
        <template slot-scope="scope">
          <el-tooltip content="查看备案信息"
                      placement="top-start"
                      effect="light">
            <el-button icon="el-icon-postcard"
                       circle
                       size="medium"
                       @click="agreement(scope.row.applyId)"></el-button>
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
import { listApplys } from "@/api/apply/applyApi"
import util from '@/libs/util'
var pageNum = 1
var pageSize = 10
var orgId = ''

export default {
  name:'AdoptionBackup',
  data () {
    return {
      data: [],
      currentPage: 1,
      total: 0,
      picPath: 'https://pic.linchongpets.com/',
      petTypeOptions: [{
        label: '猫',
        value: '2'
      }, {
        label: '狗',
        value: '1'
      }],
      formInline: {
        petType: '',
        applyStatus: '4',
        applyDateStart: '',
        applyDateEnd: ''
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
        orgId: orgId,
        pageNum: pageNum,
        pageSize: pageSize,
        applyStatus: this.formInline.applyStatus
      }
      listApplys(data).then(res => {
        console.log(res.rows)
        this.data = res.rows
        this.currentPage = res.page
        this.total = res.total
      });
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
      this.formInline.petType = ''
      this.formInline.adoptStatus = ''
      this.getList()
    },
    agreement (applyId) {
      this.$router.push({ path: '/adoptedMgn/detail', query: { applyId: applyId } })
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
.box-card {
  margin-bottom: 20px;
}
.pet-table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.pet-label {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
}
.label-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.header-clearfix {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.header-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.label-name {
  width: 100px;
}
</style>
