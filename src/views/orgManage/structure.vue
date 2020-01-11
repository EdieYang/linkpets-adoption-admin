<template>
  <d2-container>
    <template slot="header" v-if="!orgPermission">
      <div>
        <el-button
          type="primary"
          size="small"
          round
          @click="
            crtOrg()
            dialogFormVisible = true
          "
          >创建组织</el-button
        >
      </div>
    </template>

    <el-table :data="tableData" style="width: 100%" height="650">
      <el-table-column
        prop="orgName"
        label="组织名称"
        align="center"
        width="200px"
      >
      </el-table-column>
      <el-table-column label="组织logo" width="250px" align="center">
        <template slot-scope="scope">
          <img
            :src="picturePrefix + scope.row.logo"
            alt=""
            style="width: 120px;height: 120px;border-radius:5px"
          />
        </template>
      </el-table-column>

      <el-table-column label="组织背景照" width="250px" align="center">
        <template slot-scope="scope">
          <img
            :src="picturePrefix + scope.row.coverImg"
            alt=""
            style="width: 160px;height: 120px;border-radius:5px"
          />
        </template>
      </el-table-column>

      <el-table-column prop="brief" label="组织简介" align="center" width="600">
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-tooltip
            content="修改组织信息"
            placement="top-start"
            effect="light"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="small"
              @click="edit(scope.row.orgId)"
            ></el-button>
          </el-tooltip>

          <el-tooltip content="删除组织" placement="top-start" effect="light">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
              @click="delOrg(scope.row.orgId)"
            ></el-button>
          </el-tooltip>

          <el-tooltip content="组织成员" placement="top-start" effect="light">
            <el-button
              type="warning"
              icon="el-icon-s-custom"
              circle
              size="small"
              @click="orgMember(scope.row.orgId, scope.row.orgName)"
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
          label="公益组织logo"
          :label-width="formLabelWidth"
          prop="orgLogo"
        >
          <el-upload
            :action="actionUrl"
            ref="upload"
            list-type="picture-card"
            :multiple="multiple"
            :limit="limit"
            :data="uploadData"
            :on-success="handleLogoSuccess"
            :on-remove="handleLogoRemove"
            :file-list="logoFileList"
            :before-upload="beforeThumbImageUpload"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              建议尺寸 支持bmp/png/jpeg/jpg/gif格式，大小不超过5M
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.orgLogo" alt="" />
          </el-dialog>
          <el-input type="hidden" v-model="form.orgLogo" />
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
    <org-member :org="org" v-model="orgMemberDialogVisible" />
  </d2-container>
</template>

<script>
import * as orgService from '@/api/orgManage/orgManageApi'
import util from '@/libs/util'
import orgMember from './orgMember'
var pageNum = 1
var pageSize = 10
var orgId = ''

export default {
  name: 'OrganizationStructure',
  components: { orgMember },
  data() {
    return {
      org: {},
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
      orgMemberDialogVisible: false,
      rules: {
        orgName: [
          { required: true, message: '请输入公益组织名称', trigger: 'blur' }
        ],
        orgBrief: [
          { required: true, message: '请输入公益组织简介', trigger: 'blur' }
        ],
        orgImage: [
          { required: true, message: '请上传公益组织背景图', trigger: 'change' }
        ],
        orgLogo: [
          { required: true, message: '请上传公益组织logo', trigger: 'change' }
        ]
      },
      form: {
        id: '',
        orgName: '',
        orgBrief: '',
        orgImage: '',
        orgLogo: ''
      },
      uploadData: {
        ossZone: 'organization'
      },
      multiple: false,
      limit: 1,
      fileList: [],
      logoFileList: [],
      actionUrl: '/api/oss/image/backend',
      picturePrefix: util.picturePath,
      orgPermission: false,
      type: 'new'
    }
  },
  methods: {
    listOrg() {
      let req = {
        pageNum: pageNum,
        pageSize: pageSize
      }
      orgService
        .getOrgPage(req)
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
    getOrgInfo(orgId) {
      let req = {
        orgId: orgId
      }
      orgService.getOrgInfo(req).then(res => {
        var orgInfo = res
        this.form.orgName = orgInfo.orgName
        this.form.orgBrief = orgInfo.brief
        this.form.orgImage = orgInfo.coverImg
        this.form.orgLogo = orgInfo.logo
        this.fileList = []
        this.logoFileList = []
        if (orgInfo.coverImg != '') {
          var file = {
            name: 'coverImg',
            url: util.picturePath + this.form.orgImage
          }
          this.fileList.push(file)
        }
        if (orgInfo.logo != '') {
          var file = {
            name: 'logo',
            url: util.picturePath + this.form.orgLogo
          }
          this.logoFileList.push(file)
        }
      })
    },
    getOrgDetail() {
      let req = {
        orgId: orgId
      }
      orgService.getOrgInfo(req).then(res => {
        var orgInfo = res
        this.currentPage = res.pageNum
        this.total = res.total
        var list = []
        list.push(orgInfo)
        this.tableData = list
      })
    },
    crtOrg() {
      this.type = 'new'
    },
    handleSizeChange(val) {
      pageSize = val
      this.listOrg()
    },
    handleCurrentChange(val) {
      pageNum = val
      this.listOrg()
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.fileList = []
      this.logoFileList = []
      this.$refs[formName].resetFields()
    },
    beforeThumbImageUpload(file) {
      const isType =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif' ||
        file.type === 'image/bmp' ||
        file.type === 'image/jpg'
      const isLt = file.size / 1024 / 1024 < 5
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
    handleSuccess(response, file, fileList) {
      console.log(response)
      this.form.orgImage = response.data
    },
    handleLogoRemove(file, fileList) {
      console.log(file, fileList)
      this.logoFileList = fileList
      this.form.orgLogo = ''
    },
    handleLogoSuccess(response, file, fileList) {
      console.log(response)
      this.form.orgLogo = response.data
    },
    save() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (orgId != '' && this.type == 'edit') {
            this.editOrg(orgId)
            return
          }
          var req = {
            brief: this.form.orgBrief,
            coverImg: this.form.orgImage,
            logo: this.form.orgLogo,
            orgName: this.form.orgName
          }
          orgService.saveOrgInfo(req).then(res => {
            this.dialogFormVisible = false
            this.$message.success('创建成功')
            orgId = ''
            this.cancel('ruleForm')
            this.listOrg()
          })
        }
      })
    },
    delOrg(orgId) {
      this.$confirm('确认删除该组织?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var req = {
            orgId: orgId
          }
          orgService.delOrg(req).then(res => {
            this.dialogFormVisible = false
            this.$message.success('删除成功')
            this.listOrg()
          })
        })
        .catch(() => {})
    },
    edit(id) {
      orgId = id
      this.getOrgInfo(id)
      this.type = 'edit'
      this.dialogFormVisible = true
    },
    editOrg(id) {
      var req = {
        orgName: this.form.orgName,
        brief: this.form.orgBrief,
        logo: this.form.orgLogo,
        coverImg: this.form.orgImage,
        orgId: id
      }
      orgService.uptOrgInfo(req).then(res => {
        this.dialogFormVisible = false
        this.$message.success('更新成功')
        this.cancel('ruleForm')
        if (!this.orgPermission) {
          orgId = ''
          this.listOrg()
        } else {
          this.getOrgDetail()
        }
      })
    },
    orgMember(id, orgName) {
      orgId = id
      this.org = {
        orgId: id,
        orgName: orgName
      }
      this.orgMemberDialogVisible = true
    }
  },
  mounted: function() {
    orgId = util.cookies.get('orgId')
    if (
      orgId == '' ||
      orgId == null ||
      typeof orgId == 'undefined' ||
      orgId == 'null'
    ) {
      this.listOrg()
    } else {
      this.getOrgDetail(orgId)
      this.orgPermission = true
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
</style>
