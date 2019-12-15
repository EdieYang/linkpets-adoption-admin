<template>
  <d2-container>
    <template slot="header">
      <div class="header-cover">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="排序">
            <el-select v-model="formInline.orderBy"
                       placeholder="请选择">
              <el-option v-for="item in sortTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="圈子类型">
            <el-select v-model="formInline.groupType"
                       placeholder="请选择">
              <el-option v-for="item in circleTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上线状态">
            <el-select v-model="formInline.onlineStatus"
                       placeholder="请选择">
              <el-option v-for="item in onlineStatusOptions"
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
                       @click="addCircle">创建新圈子</el-button>
          </el-form-item>
        </el-form>

      </div>
    </template>
    <el-table :data="data"
              border
              fit
              style="width: 100%;">

      <el-table-column label="圈子名称"
                       align="center"
                       prop="groupName">
      </el-table-column>

      <el-table-column label="圈子banner图"
                       align="center">
        <template slot-scope="scope">
          <img :src="scope.row.groupBanner"
               alt="暂无图片"
               style="width: 90px;height: 90px;border-radius:5px;">
        </template>
      </el-table-column>

      <el-table-column label="粉丝数"
                       align="center"
                       prop="fansCount">
      </el-table-column>

      <el-table-column label="内容数"
                       align="center"
                       prop="contentCount">
      </el-table-column>

      <el-table-column label="圈子管理员微信"
                       align="center"
                       prop="customerSupport">
      </el-table-column>

      <el-table-column label="圈子创建时间"
                       width="160"
                       align="center"
                       prop="createDate">
      </el-table-column>

      <el-table-column label="排序"
                       align="center"
                       prop="sort">
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
                       @click="switchline(scope.row.groupId, scope.row.isActive === 1 ? 0 : 1)"></el-button>
          </el-tooltip>
          <el-tooltip content="排序"
                      placement="top-start"
                      effect="light">
            <el-button type="warning"
                       icon="el-icon-sort"
                       circle
                       size="small"
                       @click="editSort(scope.row)"></el-button>
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

    <el-dialog :title="form.groupId ? '编辑圈子' : '创建圈子'"
               :visible.sync="dialogFormVisible"
               :closeOnClickModal="closeOnClickModal"
               :closeOnPressEscape="closeOnPressEscape"
               :showClose="showClose">
      <el-form :model="form"
               ref="ruleForm"
               :rules="rules">
        <el-form-item label="圈子名称"
                      :label-width="formLabelWidth"
                      prop="groupName">
          <el-input v-model="form.groupName"
                    autocomplete="off"
                    maxlength="10"
                    show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="圈子简介"
                      :label-width="formLabelWidth"
                      prop="groupInfo">
          <el-input type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="form.groupInfo"
                    maxlength="20"
                    show-word-limit>
          </el-input>

        </el-form-item>
        <el-form-item label="圈子banner图"
                      :label-width="formLabelWidth"
                      prop="groupBanner">
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
              建议尺寸 支持bmp/png/jpeg/jpg/gif格式，大小不超过5M
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="圈子管理员微信"
                      :label-width="formLabelWidth"
                      prop="customerSupport">
          <el-input v-model="form.customerSupport"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('ruleForm')">取 消</el-button>
        <el-button type="primary"
                   @click="save('ruleForm')">{{form.groupId ? "确 定" : "创 建"}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置排序"
               :visible.sync="dialogSortVisible"
               :closeOnClickModal="closeOnClickModal"
               :closeOnPressEscape="closeOnPressEscape"
               :showClose="showClose"
               width="40%">
               <div>排序
                 <el-input-number v-model="form.sort" :min="1" :step="1" step-strictly size="medium"></el-input-number>
               </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancelSort">取 消</el-button>
        <el-button type="primary"
                   @click="changeSort">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>

</template>

<script>
import { circleList, circleNew, circleEdit } from "@/api/circleManage/circleManageApi"
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
      sortTypeOptions: [{
        label: '默认排序',
        value: '0'
      }, {
        label: '按创建时间排序',
        value: '1'
      }],
      circleTypeOptions: [{
        label: '活动圈',
        value: '1'
      }, {
        label: '普通圈子',
        value: '2'
      }],
      onlineStatusOptions: [{
        label: '上线',
        value: '1'
      }, {
        label: '下线',
        value: '0'
      }],
      formInline: {
        groupType: '',
        orderBy: '',
        onlineStatus: ''
      },
      form: {
        customerSupport: '',
        groupBanner: '',
        groupInfo: '',
        groupName: ''
      },
      dialogFormVisible: false,
      dialogSortVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      rules: {
        groupName: [
          { required: true, message: '请输入圈子名称', trigger: 'blur' }
        ],
        groupInfo: [
          { required: true, message: '请输入圈子简介', trigger: 'blur' }
        ],
        groupBanner: [
          { required: true, message: '请上传圈子banner图', trigger: 'change' }
        ],
        customerSupport: [
          { required: true, message: '请输入圈子管理员微信', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      actionUrl: 'https://www.linchongpets.com/lpCmsTest/oss/image',
      multiple: false,
      limit: 1,
      uploadData: {
        userId: util.cookies.get("userId"),
        ossZone: "organization"
      },
      fileList: []
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
        groupType: this.formInline.groupType,
        orderBy: this.formInline.orderBy,
        isActive: this.formInline.onlineStatus
      }
      circleList(data).then(res => {
        console.log(res.list)
        this.data = res.list
        this.currentPage = res.pageNum
        this.total = res.total
      });
    },
    switchline (groupId, status) {
      let data = {
        groupId: groupId,
        isActive: status
      }
      circleEdit(data).then(res => {
        this.getList()
      });
    },
    changeSort () {
      let data = {
        groupId: this.form.groupId,
        sort: this.form.sort
      }
      circleEdit(data).then(res => {
        this.dialogSortVisible = false
        this.getList()
      });
    },
    addCircle () {
      this.form = {}
      this.fileList = []
      this.dialogFormVisible = true
    },
    edit (val) {
      this.dialogFormVisible = true
      this.form = val
      this.fileList = [{url: this.form.groupBanner}]
    },
    editSort (val) {
      this.dialogSortVisible = true
      this.form = val
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
      this.formInline.groupType = ''
      this.formInline.onlineStatus = ''
      this.formInline.orderBy = ''
      this.getList()
    },
    handleSuccess (response, file, fileList) {
      console.log(response)
      this.form.groupBanner = "https://pic.linchongpets.com/" + response.data
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
      this.form.groupBanner = ''
    },
    beforeThumbImageUpload (file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/jpg';
      const isLt = file.size / 1024 / 1024 < 2
      if (!isType) {
        this.$message.error('上传图片格式不对!')
        return isType
      }
      if (!isLt) {
        this.$message.error('上传图片大小不能超过2M!')
      }
      return isType && isLt
    },
    cancel () {
      this.dialogFormVisible = false
      this.getList()
    },
    cancelSort () {
      this.dialogSortVisible = false
      this.getList()
    },
    save () {
      var req = {
        customerSupport: this.form.customerSupport,
        groupBanner: this.form.groupBanner,
        groupInfo: this.form.groupInfo,
        groupName: this.form.groupName
      }
      if (this.form.groupId) {
        req.groupId = this.form.groupId
        circleEdit(req).then(res => {
        this.dialogFormVisible = false
        this.$message.success('更新成功')
        })
      } else {
        circleNew(req).then(res => {
          this.dialogFormVisible = false
          this.$message.success('创建成功')
          this.getList()
        })
      }
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
