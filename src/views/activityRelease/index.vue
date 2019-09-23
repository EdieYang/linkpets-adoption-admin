<template>

  <d2-container>
    <template slot="header">

      <div class="header-cover">
        <p>发布组织近期活动，微信公众号文章</p>
        <el-button type="primary"
                   size="medium"
                   @click="dialogFormVisible = true">发布新的活动</el-button>
      </div>

    </template>

    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column prop="title"
                       width="300px"
                       align="center"
                       label="公众号文章标题">

      </el-table-column>
      <el-table-column label="公众号文章封面"
                       align="center"
                       width="230px">
        <template slot-scope="scope">
          <img :src="scope.row.activityCover"
               alt=""
               style="width: 200px;height: 100px">
        </template>

      </el-table-column>
      <el-table-column label="公众号文章链接"
                       align="center">
        <template slot-scope="scope">
          <el-popover placement="top"
                      width="400"
                      trigger="click">
            <div class="tag-popover">
              {{scope.row.activityPath}}
            </div>
            <el-button slot="reference"
                       size="mini"
                       round>查看链接</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createDate"
                       width="170px"
                       align="center"
                       label="发布时间">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       align="center"
                       width="180px">
        <template slot-scope="scope">
          <el-tooltip content="预览"
                      placement="top-start"
                      effect="light">
            <el-button icon="el-icon-document"
                       circle
                       size="small"
                       @click="openLink(scope.row.activityPath)"></el-button>
          </el-tooltip>
          <el-tooltip content="编辑"
                      placement="top-start"
                      effect="light">
            <el-button type="success"
                       icon="el-icon-edit"
                       circle
                       size="small"
                       @click="edit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除"
                      placement="top-start"
                      effect="light">
            <el-button type="danger"
                       icon="el-icon-delete-solid"
                       circle
                       size="small"
                       @click="del(scope.row)"></el-button>
          </el-tooltip>
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
          <el-upload :action="actionUrl"
                     ref="upload"
                     list-type="picture-card"
                     :multiple="multiple"
                     :limit="limit"
                     :data="uploadData"
                     :on-success="handleSuccess"
                     :on-remove="handleRemove"
                     :file-list="fileList"
                     :before-upload="beforeThumbImageUpload">
            <i class="el-icon-plus"></i>
            <div slot="tip"
                 class="el-upload__tip">
              支持bmp/png/jpeg/jpg/gif格式，大小不超过5M
            </div>
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
        <el-button @click="cancel('ruleForm')">取 消</el-button>
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
import { listActivities, postActivity, uptActivity } from '@/api/activity/activityApi.js'
import util from '@/libs/util'

var pageNum = 1
var pageSize = 10
var orgId = ''

export default {
  name: "index",
  data () {
    return {
      tableData: [],
      actionUrl: 'https://www.linchongpets.com/lpCmsTest/oss/image',
      dialogFormVisible: false,
      form: {
        id: '',
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
        userId: util.cookies.get("userId"),
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
    beforeThumbImageUpload (file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/jpg';
      const isLt = file.size / 1024 / 1024 < 5
      debugger
      if (!isType) {
        this.$message.error('上传图片格式不对!')
        return isType
      }
      if (!isLt) {
        this.$message.error('上传图片大小不能超过2M!')
      }
      return isType && isLt
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
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
        orgId: orgId,
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
              orgId: orgId,
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
              this.$refs[formName].resetFields()
              this.dialogVisible = false
              this.dialogFormVisible = false
              pageNum = 1
              this.listActivities()

            }).catch(err => {
              // 异常情况
            })
          } else {

            let actInfo = {
              orgId: orgId,
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
              this.$refs[formName].resetFields()
              this.dialogVisible = false
              this.dialogFormVisible = false
              pageNum = 1
              this.listActivities()

            }).catch(err => {
              // 异常情况
              this.$message({
                message: '上传失败！',
                type: 'error'
              })
            })

          }
        }
      })
    },
    cancel (formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
      this.form.activityCover = ''
      this.form.title = ''
      this.form.activityPath = ''
      this.dialogFormVisible = false
      this.form.id = ''
    },
    onCopy () {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    edit (row) {
      this.fileList = []
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
    del (row) {
      console.log(row.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let actInfo = {
          id: row.id,
          isValid: 0
        };
        uptActivity(actInfo).then(res => {
          console.log(res)
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          pageNum = 1
          this.listActivities()
        })

      })

    },
    openLink (link) {
      window.open(link, '_blank');
    }

  },
  mounted: function () {
    orgId = util.cookies.get("orgId")
    if (orgId == '' || orgId == null || typeof orgId == 'undefined') {
      this.$router.push({
        name: 'login'
      })
      return
    }
    pageNum = 1
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