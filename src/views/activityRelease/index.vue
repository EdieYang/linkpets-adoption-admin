<template>

  <d2-container>
    <template slot="header">

      <h2>活动管理</h2>
      <div class="header-cover">
        <p>发布近期活动，微信公众号文章。</p>
        <el-button type="primary"
                   size="medium"
                   @click="dialogFormVisible = true">发布新的活动</el-button>
      </div>

    </template>

    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column fixed
                       prop="id"
                       width="100px"
                       label="活动ID">

      </el-table-column>
      <el-table-column fixed
                       prop="title"
                       label="公众号文章标题">

      </el-table-column>
      <el-table-column label="公众号文章封面">
        <template slot-scope="scope">
          <img :src="scope.row.activityCover"
               alt=""
               style="width: 200px;height: 100px">
        </template>

      </el-table-column>
      <el-table-column label="公众号文章链接"
                       width="500px">
        <template slot-scope="scope">
          <p class="hightlight">{{scope.row.activityPath}}</p>
        </template>

      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="140px">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"
                     type="text"
                     size="medium">查看</el-button>
          <el-button type="text"
                     size="medium">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Form -->
    <el-dialog title="活动发布"
               :visible.sync="dialogFormVisible"
               :closeOnClickModal="closeOnClickModal"
               :closeOnPressEscape="closeOnPressEscape"
               :showClose="showClose">
      <el-form :model="form">
        <el-form-item label="公众号文章标题"
                      :label-width="formLabelWidth">
          <el-input v-model="form.title"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公众号文章链接"
                      :label-width="formLabelWidth">
          <el-input v-model="form.activityPath"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公众号文章封面"
                      :label-width="formLabelWidth">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                     list-type="picture-card"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"
                   @click="save">上 传</el-button>
      </div>
    </el-dialog>

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
import { listActivities, postActivity } from '@/api/activity/activityApi.js'
var pageNum = 1
var pageSize = 10

export default {
  name: "index",
  methods: {
    handleClick (row) {
      console.log(row);
    },
    handleSizeChange (val) {
      pageSize = val
      this.listActivities()
    },
    handleCurrentChange (val) {
      pageNum = val
      this.listActivities()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    listActivities () {
      let actInfo = {
        orgId: "2",
        pageNum: pageNum,
        pageSize: pageSize,
      };
      listActivities(actInfo).then(res => {
        console.log(res)
        this.currentPage = res.pageNum
        this.total = res.total
        this.tableData = res.list

      }).catch(err => {
        // 异常情况
      })
    },
    save () {
      let actInfo = {
        orgId: "2",
        title: this.form.title,
        activityPath: this.form.activityPath,
        activityCover: this.form.activityCover
      };
      postActivity(actInfo).then(res => {
        console.log(res)
        this.currentPage = res.pageNum
        this.total = res.total
        this.tableData = res.list

      }).catch(err => {
        // 异常情况
      })
    },
    cancel () {
      this.dialogFormVisible = false
    }

  },
  mounted: function () {
    this.listActivities()
  },
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        title: '',
        activityPath: '',
        activityCover: ''
      },
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage: 1,
      total: 0
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

.hightlight {
  height: 40px;
  /* line-height: 40px; */
  background-color: #ddeeff;
  color: #2d2d2d;
  padding: 10px 10px;
  border-radius: 5px;
  border: 1px dashed #409eff;
  text-decoration: underline;
}
</style>