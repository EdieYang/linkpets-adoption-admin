<template>

  <d2-container>
    <template slot="header">

      <div class="header-cover">
        <p>照片墙，发布最新的组织活动照片</p>
      </div>

    </template>

    <el-upload :action="actionUrl"
               ref="upload"
               list-type="picture-card"
               :multiple="multiple"
               :data="uploadData"
               :on-success="handleSuccess"
               :on-remove="handleRemove"
               :on-preview="handelPreview"
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
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
    </el-upload>
  </d2-container>
</template>


<script>
import { listGallery, postGallery, uptGallery } from '@/api/gallery/galleryApi.js'
import util from '@/libs/util'

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
      uploadData: {
        userId: util.cookies.get("userId"),
        ossZone: "organization"
      },
      multiple: false,
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
      var picReq = {
        orgId: orgId,
        id: file.mediaId,
        isValid: 0
      }
      uptGallery(picReq).then(res => {
        console.log(res)
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        this.fileList.forEach(_data => {
          var index = 0
          if (_data.mediaId == file.mediaId) {
            this.fileList.splice(index, 1)
          }
          index++
        });
      }).catch(err => {

        // 异常情况
        this.$message({
          message: '删除失败！',
          type: 'error'
        })
      })
    },
    handlePictureCardPreview (file) {
      this.activityCover = file.url;
      this.dialogVisible = true;
    },
    handleSuccess (response, file, fileList) {

      console.log(response)
      var tempPic = {
        orgId: orgId,
        image: "https://pic.linchongpets.com/" + response.data
      }
      postGallery(tempPic).then(res => {
        console.log(res)
        this.$message({
          message: '上传成功！',
          type: 'success'
        })

        let file = {
          name: '',
          mediaId: res.id,
          url: tempPic.image
        }
        this.fileList.push(file)

      }).catch(err => {
        // 异常情况
        this.$message({
          message: '上传失败！',
          type: 'error'
        })
      })

      this.fileList.push()
    },
    handelPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    listGallery () {
      let picReq = {
        orgId: orgId
      };
      listGallery(picReq).then(res => {
        console.log(res)
        this.currentPage = res.pageNum
        this.total = res.total
        this.tableData = res.list
        res.list.forEach(_data => {
          let file = {
            name: '',
            mediaId: _data.id,
            url: _data.image
          }
          this.fileList.push(file)
        });
      }).catch(err => {
        // 异常情况
      })
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
    this.uploadData.ossZone = this.uploadData.ossZone + '/' + orgId
    this.listGallery()
  }
}
</script>
<style scoped>
</style>