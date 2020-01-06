<template>
  <d2-container>
    <template slot="header">
      <div class="header-cover">
        <p>管理组织下系统用户</p>
      </div>
      <div>
        <el-button
          type="danger"
          size="small"
          round
          @click="dialogFormVisible = true"
          >完善组织信息</el-button
        >
        <el-button
          type="primary"
          size="small"
          round
          @click="dialogFormVisible = true"
          >创建账号</el-button
        >
      </div>
    </template>

    <el-table :data="tableData" style="width: 100%" height="450px;">
      <el-table-column prop="userAcc" label="系统账号" center width="200px">
      </el-table-column>
      <el-table-column prop="userAcc" label="初始密码" center width="200px">
        <p>123456</p>
      </el-table-column>
      <el-table-column prop="nickName" label="微信昵称" center width="200px">
      </el-table-column>
      <el-table-column label="微信头像" width="200px" center>
        <template slot-scope="scope">
          <img
            :src="scope.row.portrait"
            alt=""
            style="width: 80px;height: 80px;border-radius:10px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-tooltip content="编辑" placement="top-start" effect="light">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="small"
              @click="editUser(scope.row.petId)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- Form -->
    <el-dialog
      title="公益组织信息"
      :visible.sync="dialogFormVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      :showClose="showClose"
    >
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-form-item
          label="公益组织名称"
          :label-width="formLabelWidth"
          prop="orgName"
        >
          <el-input v-model="form.orgName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="公益组织简介"
          :label-width="formLabelWidth"
          prop="orgBrief"
        >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.orgBrief"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="公益组织背景图"
          :label-width="formLabelWidth"
          prop="orgImage"
        >
          <el-upload
            :action="actionUrl"
            ref="upload"
            list-type="picture-card"
            :multiple="multiple"
            :limit="limit"
            :data="uploadData"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            :before-upload="beforeThumbImageUpload"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              建议尺寸 支持bmp/png/jpeg/jpg/gif格式，大小不超过5M
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.orgImage" alt="" />
          </el-dialog>
          <el-input type="hidden" v-model="form.orgImage" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm')">上 传</el-button>
      </div>
    </el-dialog>

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
  listOrgUsers,
  getOrgInfo,
  saveOrgInfo
} from '@/api/orgManage/orgManageApi'
import util from '@/libs/util'
var pageNum = 1
var pageSize = 10
var orgId = ''

export default {
  name: 'Organization',
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      dialogFormVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        orgName: [
          { required: true, message: '请输入公益组织名称', trigger: 'blur' }
        ],
        orgBrief: [
          { required: true, message: '请输入公益组织简介', trigger: 'blur' }
        ],
        orgImage: [
          { required: true, message: '请上传公益组织背景图', trigger: 'change' }
        ]
      },
      form: {
        id: '',
        orgName: '',
        orgBrief: '',
        orgImage: ''
      },
      uploadData: {
        userId: util.cookies.get('userId'),
        ossZone: 'organization'
      },
      multiple: false,
      limit: 1,
      fileList: [],
      actionUrl: 'https://www.linchongpets.com/lpCmsTest/oss/image'
    }
  },
  methods: {
    listOrgUsers() {
      let req = {
        pageNum: pageNum,
        pageSize: pageSize
      }
      listOrgUsers(orgId, req)
        .then(res => {
          console.log(res)
          this.currentPage = res.pageNum
          this.total = res.total
          this.tableData = res.list
        })
        .catch(err => {
          // 异常情况
        })
    },
    getOrgInfo() {
      let req = {
        orgId: orgId
      }
      getOrgInfo(req).then(res => {
        var orgInfo = res
        this.form.orgName = orgInfo.orgName
        this.form.orgBrief = orgInfo.brief
        debugger
        this.form.orgImage = orgInfo.coverImg
        this.fileList = []
        if (orgInfo.coverImg != '') {
          var file = {
            name: '',
            url: this.form.orgImage
          }
          this.fileList.push(file)
        }
      })
    },
    handleSizeChange(val) {
      pageSize = val
      this.listOrgUsers()
    },
    handleCurrentChange(val) {
      pageNum = val
      this.listOrgUsers()
    },
    cancel() {
      this.dialogFormVisible = false
      this.getOrgInfo()
    },
    beforeThumbImageUpload(file) {
      const isType =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif' ||
        file.type === 'image/bmp' ||
        file.type === 'image/jpg'
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
      this.form.orgImage = ''
    },
    handlePictureCardPreview(file) {
      this.activityCover = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      this.form.orgImage = 'https://pic.linchongpets.com/' + response.data
    },
    save() {
      var req = {
        brief: this.form.orgBrief,
        coverImg: this.form.orgImage,
        orgName: this.form.orgName,
        orgId: orgId
      }
      saveOrgInfo(req).then(res => {
        this.dialogFormVisible = false
        this.$message.success('更新成功')
      })
    }
  },
  mounted: function() {
    orgId = util.cookies.get('orgId')
    if (orgId == '' || orgId == null || typeof orgId == 'undefined') {
    }
    pageNum = 1
    this.listOrgUsers()
    this.getOrgInfo()
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
</style>
