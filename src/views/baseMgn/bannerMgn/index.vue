<template>
  <d2-container>
    <template slot="header">
      <div class="header-cover">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="banner类型">
            <el-select v-model="formInline.type" placeholder="请选择">
              <el-option
                v-for="item in bannerTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="banner位置">
            <el-select v-model="formInline.position" placeholder="请选择">
              <el-option
                v-for="item in bannerPositionOptions"
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
              @click="addBanner"
              >创建banner</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </template>
    <el-table :data="data" border fit style="width: 100%;">
      <el-table-column label="banner图" align="center" width="350">
        <template slot-scope="scope">
          <img
            :src="picturePrefix + scope.row.bannerImgUrl"
            alt="暂无图片"
            style="width: 280px;height: 100px;border-radius:5px;"
          />
        </template>
      </el-table-column>

      <el-table-column
        label="banner类型"
        align="center"
        prop="type"
        width="150"
      >
        <template slot-scope="scope">
          {{
            scope.row.type == 1
              ? '纯图'
              : scope.row.type == 2
              ? '跳转小程序'
              : '跳转公众号文章'
          }}
        </template>
      </el-table-column>

      <el-table-column
        label="banner位置"
        align="center"
        prop="position"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.position == 1 ? '首页顶部' : '圈子顶部' }}
        </template>
      </el-table-column>

      <el-table-column
        label="banner跳转信息"
        align="center"
        prop="extraData"
        width="580"
      >
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="260"
        align="center"
        prop="createDate"
      >
      </el-table-column>

      <el-table-column label="排序" align="center" prop="sort" width="180">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="180"
        class-name="small-padding fixed-width "
        fixed="right"
      >
        <template slot-scope="scope">
          <el-tooltip content="排序" placement="top-start" effect="light">
            <el-button
              type="warning"
              icon="el-icon-sort"
              circle
              size="small"
              @click="editSort(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top-start" effect="light">
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              size="small"
              @click="edit(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top-start" effect="light">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
              @click="delBanner(scope.row.bannerId)"
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

    <el-dialog
      :title="form.bannerId ? '编辑banner' : '创建banner'"
      :visible.sync="dialogFormVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      :showClose="showClose"
    >
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-form-item
          label="banner类型"
          :label-width="formLabelWidth"
          prop="type"
        >
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in bannerTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="banner位置"
          :label-width="formLabelWidth"
          prop="position"
        >
          <el-select v-model="form.position" placeholder="请选择">
            <el-option
              v-for="item in bannerPositionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="banner图"
          :label-width="formLabelWidth"
          prop="bannerImgUrl"
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
            :class="{ disableUpload: disableUpload }"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              建议尺寸 支持bmp/png/jpeg/jpg/gif格式，大小不超过5M
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="banner跳转数据"
          :label-width="formLabelWidth"
          prop="extraData"
        >
          <el-input
            v-model="form.extraData"
            autocomplete="off"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm')">{{
          form.bannerId ? '确 定' : '创 建'
        }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="设置排序"
      :visible.sync="dialogSortVisible"
      :closeOnClickModal="closeOnClickModal"
      :closeOnPressEscape="closeOnPressEscape"
      :showClose="showClose"
      width="40%"
    >
      <div>
        排序
        <el-input-number
          v-model="form.sort"
          :min="1"
          :step="1"
          step-strictly
          size="medium"
        ></el-input-number>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSort">取 消</el-button>
        <el-button type="primary" @click="changeSort">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import * as bannerService from '@/api/baseMgn/bannerApi'
import util from '@/libs/util'
var pageNum = 1
var pageSize = 10
var orgId = ''

export default {
  name: 'BannerIndex',
  data() {
    return {
      data: [],
      currentPage: 1,
      total: 0,
      bannerTypeOptions: [
        {
          label: '纯图',
          value: 1
        },
        {
          label: '跳转小程序',
          value: 2
        },
        {
          label: '跳转公众号文章',
          value: 3
        }
      ],
      bannerPositionOptions: [
        {
          label: '首页顶部',
          value: 1
        },
        {
          label: '圈子顶部',
          value: 2
        }
      ],
      formInline: {
        type: '',
        position: ''
      },
      form: {
        type: '',
        position: '',
        bannerImgUrl: '',
        extraData: '',
        sort: 999
      },
      dialogFormVisible: false,
      dialogSortVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      rules: {
        type: [
          { required: true, message: '请选择banner类型', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请选择banner展示位置', trigger: 'change' }
        ],
        bannerImgUrl: [
          { required: true, message: '请上传banner图', trigger: 'change' }
        ]
      },
      formLabelWidth: '150px',
      actionUrl: util.uploadPath,
      picturePrefix: util.picturePath,
      multiple: false,
      limit: 1,
      uploadData: {
        ossZone: 'banner'
      },
      fileList: [],
      disableUpload: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize,
        type: this.formInline.type,
        position: this.formInline.position
      }
      bannerService.bannerPage(data).then(res => {
        console.log(res.list)
        this.data = res.list
        this.currentPage = res.pageNum
        this.total = res.total
      })
    },
    delBanner(id) {
      let data = {
        bannerId: id,
        isValid: 0
      }
      bannerService.delBanner(data).then(res => {
        this.getList()
      })
    },
    changeSort() {
      let data = {
        bannerId: this.form.bannerId,
        sort: this.form.sort
      }
      bannerService.uptBanner(data).then(res => {
        this.dialogSortVisible = false
        this.getList()
      })
    },
    addBanner() {
      this.form = {}
      this.fileList = []
      this.dialogFormVisible = true
      this.disableUpload = false
    },
    edit(val) {
      this.dialogFormVisible = true
      this.form = val
      this.fileList = [{ url: this.picturePrefix + this.form.bannerImgUrl }]
      this.disableUpload = this.form.bannerImgUrl !== ''
    },
    editSort(val) {
      this.dialogSortVisible = true
      this.form = val
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
      this.formInline.type = ''
      this.formInline.position = ''
      this.getList()
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      this.form.bannerImgUrl = response.data
      this.disableUpload = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
      this.form.bannerImgUrl = ''
      this.disableUpload = false
    },
    beforeThumbImageUpload(file) {
      const isType =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif' ||
        file.type === 'image/bmp' ||
        file.type === 'image/jpg'
      const isLt = file.size / 1024 / 1024 <= 5
      if (!isType) {
        this.$message.error('上传图片格式不对!')
        return isType
      }
      if (!isLt) {
        this.$message.error('上传图片大小不能超过5M!')
      }
      return isType && isLt
    },
    cancel() {
      this.dialogFormVisible = false
      this.getList()
    },
    cancelSort() {
      this.dialogSortVisible = false
      this.getList()
    },
    save() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var req = {
            type: this.form.type,
            position: this.form.position,
            bannerImgUrl: this.form.bannerImgUrl,
            extraData: this.form.extraData,
            sort: this.form.sort
          }
          if (this.form.bannerId) {
            req.bannerId = this.form.bannerId
            bannerService.uptBanner(req).then(res => {
              this.dialogFormVisible = false
              this.$message.success('更新成功')
            })
          } else {
            bannerService.crtBanner(req).then(res => {
              this.dialogFormVisible = false
              this.$message.success('创建成功')
              this.getList()
            })
          }
        }
      })
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
<style>
.disableUpload .el-upload {
  display: none;
}
</style>
