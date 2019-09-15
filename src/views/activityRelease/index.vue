<template>

  <d2-container>
    <template slot="header">

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
      <el-table-column prop="title"
                       width="200px"
                       label="公众号文章标题">

      </el-table-column>
      <el-table-column label="公众号文章封面"
                       width="220px">
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
      <el-table-column prop="createDate"
                       width="140px"
                       label="发布时间">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="180px">
        <template slot-scope="scope">
          <el-button v-clipboard:copy="scope.row.activityPath"
                     v-clipboard:success="onCopy"
                     type="text"
                     size="medium">复制链接</el-button>
          <el-button type="text"
                     size="medium"
                     @click="edit(scope.row)">编辑</el-button>
          <el-button type="text"
                     size="medium"
                     @click="delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Form -->
    <el-dialog title="活动发布"
               :visible.sync="dialogFormVisible"
               :closeOnClickModal="closeOnClickModal"
               :closeOnPressEscape="closeOnPressEscape"
               :showClose="showClose">
      <el-form :model="form"
               ref="ruleForm"
               :rules="rules">
        <el-form-item label="公众号文章标题"
                      :label-width="formLabelWidth"
                      prop="title">
          <el-input v-model="form.title"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公众号文章链接"
                      :label-width="formLabelWidth"
                      prop="activityPath">
          <el-input v-model="form.activityPath"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公众号文章封面"
                      :label-width="formLabelWidth"
                      prop="activityCover">
          <el-upload action="https://www.linchongpets.com/lpCmsTest/oss/image"
                     list-type="picture-card"
                     :multiple="multiple"
                     :limit="limit"
                     :data="uploadData"
                     :on-success="handleSuccess"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="form.activityCover"
                 alt="">

          </el-dialog>
          <el-input type="hidden"
                    v-model="form.activityCover" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('rulleForm')">取 消</el-button>
        <el-button type="primary"
                   @click="save('ruleForm')">上 传</el-button>
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
      activityDetail: false,
      activityPath: '',
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage: 1,
      total: 0,
      rules: {
        title: [
          { required: true, message: '请输入公众号文章标题', trigger: 'blur' }
        ],
        activityPath: [
          { required: true, message: '请输入公众号文章链接', trigger: 'blur' }
        ],
        activityCover: [
          { required: true, message: '请上传公众号文章封面', trigger: 'change' }
        ]
      },
      uploadData: {
        userId: "123123",
        ossZone: "organization"
      },
      multiple: false,
      limit: 1,
      fileList: []
    }
  },
  methods: {
    handleClick (row) {
      console.log(row);
      this.activityPath = row.activityPath
      this.activityDetail = true
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
      this.form.activityCover = ''
    },
    handlePictureCardPreview (file) {
      this.activityCover = file.url;
      this.dialogVisible = true;
    },
    handleSuccess (response, file, fileList) {
      console.log(response)
      this.form.activityCover = "https://pic.linchongpets.com/" + response.data
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
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.id != '') {
            let actInfo = {
              id: this.form.id,
              orgId: "2",
              title: this.form.title,
              activityPath: this.form.activityPath,
              activityCover: this.form.activityCover
            };
            uptActivity(actInfo).then(res => {
              console.log(res)
              this.$message({
                message: '上传成功！',
                type: 'success'
              })
              this.$refs[formName].resetFields();
              this.dialogVisible = false
              this.dialogFormVisible = false
              pageNum = 1
              this.listActivities()

            }).catch(err => {
              // 异常情况
            })
          } else {

            let actInfo = {
              orgId: "2",
              title: this.form.title,
              activityPath: this.form.activityPath,
              activityCover: this.form.activityCover
            };
            postActivity(actInfo).then(res => {
              console.log(res)
              this.$message({
                message: '上传成功！',
                type: 'success'
              })
              this.$refs[formName].resetFields();
              this.dialogVisible = false
              this.dialogFormVisible = false
              pageNum = 1
              this.listActivities()

            }).catch(err => {
              // 异常情况
            })

          }
        }
      })
    },
    cancel (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields();
    },
    onCopy () {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    edit (row) {
      this.form.activityPath = row.activityPath
      this.form.activityCover = row.activityCover
      var file = {
        name: '',
        url: this.form.activityCover
      }
      this.fileList.push(file)
      this.form.title = row.title
      this.form.id = row.id
      this.dialogFormVisible = true
    },
    delete (row) {
      console.log(row.id)
    }

  },
  mounted: function () {
    this.listActivities()
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