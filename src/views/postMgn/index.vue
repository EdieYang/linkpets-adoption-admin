<template>
  <d2-container>
    <template slot="header">
      <div class="header-cover">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="所在圈子">
            <el-select v-model="formInline.groupId"
                       placeholder="请选择">
              <el-option v-for="item in circleList"
                         :key="item.groupId"
                         :label="item.groupName"
                         :value="item.groupId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="formInline.nickName"
              autocomplete="off"></el-input>
            </el-option>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.isValid"
                       placeholder="请选择">
              <el-option v-for="item in isValidOptions"
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
          </el-form-item>
        </el-form>
      </div>
    </template>
    <el-table :data="data"
              border
              fit
              style="width: 100%;">

      <el-table-column label="昵称"
                       align="center"
                       prop="nickName">
      </el-table-column>

      <el-table-column label="微信号"
                       align="center"
                       prop="wxAccount">
      </el-table-column>

      <el-table-column label="被赞数"
                       align="center"
                       prop="likeAmount">
      </el-table-column>

      <el-table-column label="发帖时间"
                       align="center"
                       prop="createDate">
      </el-table-column>

      <el-table-column label="备注"
                       align="center"
                       prop="memo">
      </el-table-column>

      <el-table-column label="状态"
                       align="center">
        <template slot-scope="scope">{{scope.row.isValid === 1 ? '有效' : '无效'}}
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       align="center"
                       width="180"
                       class-name="small-padding fixed-width "
                       fixed="right">
        <template slot-scope="scope">
          <el-tooltip content="查看"
                      placement="top-start"
                      effect="light">
            <el-button type="success"
                       icon="el-icon-view"
                       circle
                       size="small"
                       @click="scan(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="删帖"
                      placement="top-start"
                      effect="light"
                      :style="{'visibility' : scope.row.isValid === 1 ? 'visible' : 'hidden'}">
            <el-button type="danger"
                       icon="el-icon-moon-night"
                       circle
                       size="small"
                       @click="showDelete(scope.row.postId)"></el-button>
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

    <el-dialog :visible.sync="dialogVisible">
               <div class="info">
                 <img :src='selectPost.portrait' class="head"/>
                 <div style="font-weight:bold;">{{selectPost.nickName}}</div>
                 <div>{{selectPost.createDate}}</div>
               </div>
               <div style="padding-left:80px">{{selectPost.postContent}}</div>
               <ul class="img-list">
                <li v-for="item in selectPost.groupPostImgList" :key="item.sort">
                  <div class="zoom-img" :style="{'background-image': 'url('+item.imgUrl+')'}"></div>
                </li>
               </ul>
      <div slot="footer"
           class="dialog-footer" 
           v-if="selectPost.isValid === 1">
        <el-button type="danger" @click="showDelete(selectPost.postId)">删 帖</el-button>
      </div>
    </el-dialog>
  </d2-container>

</template>

<script>
import { postList, postDelete } from "@/api/postManage/postManageApi"
import { circleListAll } from "@/api/circleManage/circleManageApi"
import util from '@/libs/util'
var pageNum = 1
var pageSize = 10
var orgId = ''

export default {
  data () {
    return {
      data: [],
      currentPage: 1,
      total: 0,
      circleList: [],
      isValidOptions: [{
        label: '有效',
        value: '1'
      }, {
        label: '无效',
        value: '0'
      }],
      formInline: {
        groupId: '',
        nickName: '',
        isValid: ''
      },
      dialogVisible: false,
      selectPost: {}
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
    this.getCircleList()
  },
  methods: {
    getList () {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize,
        groupId: this.formInline.groupId,
        nickName: this.formInline.nickName,
        isValid: this.formInline.isValid
      }
      postList(data).then(res => {
        console.log(res.list)
        this.data = res.list
        this.currentPage = res.pageNum
        this.total = res.total
      });
    },
    showDelete (id) {
      this.$prompt('填写删帖备注', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: function(v){return v !== null && v !== ''},
        inputErrorMessage: '请填写删帖备注'
      }).then(({ value }) => {
        this.deletePost(id, value)
      }).catch(() => {
      });
    },
    deletePost (id, memo) {
      let data = {
        postId: id,
        memo: memo
      }
      postDelete(data).then(res => {
        this.getList()
      });
    },
    scan (val) {
      this.dialogVisible = true
      this.selectPost = val
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
      this.formInline.groupId = ''
      this.formInline.isValid = ''
      this.formInline.nickName = ''
      this.getList()
    },
    getCircleList () {
      let data = {
        groupType: 2,
        orderBy: 1,
        isActive: 1
      }
      circleListAll(data).then(res => {
        console.log(res)
        this.circleList = res
      });
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
.img-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 40px
}
.img-list li {
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.img-list li .zoom-img {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.info {
  display: flex;
}
.info div {
  margin-left:20px;
  align-self:center;
}
.head {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}
</style>
<style>

</style>
