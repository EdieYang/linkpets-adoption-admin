<template>
  <d2-container>
    <div style="width:100%;">
      <el-card v-loading="pageLoading">
        <el-form ref="form" label-width="120px" label-position="left">
          <el-form-item label="问卷标题" required>
            <el-col :span="15">
              <p v-if="isPreview">{{ title }}</p>
              <el-input v-else v-model="title" placeholder="请输入问卷标题" />
            </el-col>
          </el-form-item>
          <el-form-item label="问卷说明" required>
            <div v-if="isPreview" v-html="desc" class="desc"></div>
            <d2-ueditor
              v-else
              :default-config="config"
              v-model="desc"
              style="width:100%"
            />
          </el-form-item>
          <el-form-item label-width="0">
            <el-row :gutter="20" v-if="!isPreview">
              <el-col :span="8">
                <el-button
                  plain
                  type="primary"
                  icon="el-icon-success"
                  style="width:100%;"
                  @click="addSingle"
                  >添加单选问题</el-button
                >
              </el-col>
              <el-col :span="8">
                <el-button
                  plain
                  type="primary"
                  icon="el-icon-s-operation"
                  style="width:100%;"
                  @click="addMultiple"
                  >添加多选问题</el-button
                >
              </el-col>
              <el-col :span="8">
                <el-button
                  plain
                  type="primary"
                  icon="el-icon-edit"
                  style="width:100%;"
                  @click="addFill"
                  >添加填空题</el-button
                >
              </el-col>
            </el-row>
            <draggable v-model="topics">
              <el-form-item
                v-for="(item, index) in topics"
                :key="index"
                style="margin-top:20px;padding: 10px 10px;"
                :class="{ 'topic-content': !isPreview }"
              >
                <el-form-item
                  style="margin-top:10px"
                  required
                  :label="index + 1 + ''"
                  label-width="30"
                >
                  <el-row>
                    <el-col
                      :class="{ 'show-hover': !isPreview }"
                      :span="18"
                      style="display:flex;position:relative;display:flex;flex-direction:row;align-items: center"
                    >
                      <input
                        type="text"
                        style="height:36px;background-color:#ffffff;border:none;outline:none;padding-left:10px;padding-right:10px"
                        v-autowidth="{
                          maxWidth: '75%',
                          minWidth: '250px',
                          comfortZone: 0
                        }"
                        placeholder="请输入题目内容"
                        v-model="item.questionnaireItemTitle"
                        :disabled="isPreview ? true : false"
                      />
                      <div>
                        <span
                          v-if="
                            item.questionnaireItemType === 2 ||
                              item.questionnaireItemType === 3
                          "
                          >{{
                            item.questionnaireItemType === 2
                              ? '（单选）'
                              : '（多选）'
                          }}</span
                        >
                      </div>
                    </el-col>
                    <el-col :span="1" :offset="1" class="remove">
                      <el-button
                        class="btn-delete"
                        type="text"
                        @click="removeTopic(index)"
                        v-if="!isPreview"
                      ></el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <draggable>
                    <el-row
                      v-if="
                        item.questionnaireItemType === 2 ||
                          item.questionnaireItemType === 3
                      "
                      :key="optionIndex"
                      v-for="(option,
                      optionIndex) in item.questionnaireItemContent"
                      class="option"
                    >
                      <el-col
                        :class="{ 'show-hover': !isPreview }"
                        :span="17"
                        :offset="1"
                        style="padding-left:10px"
                      >
                        <input
                          :class="
                            item.questionnaireItemType === 2
                              ? option.isCheck
                                ? 'single-icon-check'
                                : 'single-icon'
                              : option.isCheck
                              ? 'multiple-icon-check'
                              : 'multiple-icon'
                          "
                          type="text"
                          style="height:36px;border:none;outline:none"
                          v-autowidth="{
                            maxWidth: '100%',
                            minWidth: '100%',
                            comfortZone: 0
                          }"
                          placeholder="请填写选项内容"
                          v-model="option.content"
                          :disabled="isPreview ? true : false"
                        />
                      </el-col>
                      <el-col :span="1" :offset="1" class="del-option">
                        <el-button
                          class="btn-ban"
                          type="text"
                          @click="removeOption(index, optionIndex)"
                          v-if="!isPreview"
                        ></el-button>
                      </el-col>
                    </el-row>
                  </draggable>
                  <el-col
                    v-if="
                      (item.questionnaireItemType === 2 ||
                        item.questionnaireItemType === 3) &&
                        item.questionnaireItemContent &&
                        item.questionnaireItemContent.length < 10 &&
                        !isPreview
                    "
                    :span="20"
                    :offset="1"
                  >
                    <div
                      @click="addOption(index)"
                      style="padding-left:10px"
                      class="blue-text"
                    >
                      + 添加选项
                    </div>
                  </el-col>
                  <el-col
                    v-if="item.questionnaireItemType === 1"
                    :class="{ 'show-hover': !isPreview }"
                    :span="19"
                    :offset="1"
                  >
                    <input
                      type="text"
                      style="height:36px;background-color:#ffffff;border:none;outline:none"
                      v-autowidth="{
                        maxWidth: '75%',
                        minWidth: '150px',
                        comfortZone: 0
                      }"
                      :disabled="isPreview ? true : false"
                      placeholder="输入提示"
                      v-model="item.questionnaireItemContent"
                    />
                  </el-col>
                </el-form-item>
              </el-form-item>
            </draggable>
          </el-form-item>
          <el-form-item v-if="!(isPreview && pageType === 'answer')">
            <div class="btn-wrapper">
              <el-button class="btn-style" type="primary" @click="handleSave"
                >保存</el-button
              >
              <el-button
                class="btn-style"
                type="success"
                @click="handlePreview"
                v-if="!isPreview"
                >预览</el-button
              >
              <el-button class="btn-style operate-btn" @click="handleCancel">{{
                isPreview ? '取消预览' : '取消'
              }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </d2-container>
</template>

<script>
import Vue from 'vue'
import {
  questionnaireNew,
  questionnaireEdit,
  questionnaireDetail,
  answerDetail
} from '@/api/questionnaireManage/questionnaireManageApi'
import util from '@/libs/util'
import VueInputAutowidth from 'vue-input-autowidth'
import draggable from 'vuedraggable'
Vue.use(VueInputAutowidth)
var orgId = ''

export default {
  name: 'QuestionnaireNew',
  components: { draggable },
  data() {
    return {
      pageLoading: false,
      pageType: '',
      title: '',
      desc: '',
      topics: [],
      isPreview: false, // 是否预览
      config: {
        toolbars: [
          [
            'fullscreen',
            'source',
            '|',
            'undo',
            'redo',
            '|',
            'bold',
            'italic',
            'underline',
            'fontborder',
            'strikethrough',
            'removeformat',
            'formatmatch',
            'autotypeset',
            'blockquote',
            'pasteplain',
            '|',
            'forecolor',
            'backcolor',
            'insertorderedlist',
            'insertunorderedlist',
            'selectall',
            'cleardoc',
            '|',
            'rowspacingtop',
            'rowspacingbottom',
            'lineheight',
            '|',
            'customstyle',
            'paragraph',
            'fontfamily',
            'fontsize',
            '|',
            'directionalityltr',
            'directionalityrtl',
            'indent',
            '|',
            'justifyleft',
            'justifycenter',
            'justifyright',
            'justifyjustify',
            '|',
            'touppercase',
            'tolowercase',
            '|',
            'unlink',
            'anchor',
            '|',
            'imagenone',
            'imageleft',
            'imageright',
            'imagecenter',
            '|',
            'map',
            'insertframe',
            'template',
            '|',
            'horizontal',
            'date',
            'time',
            'spechars',
            '|',
            'inserttable',
            'deletetable',
            'insertparagraphbeforetable',
            'insertrow',
            'deleterow',
            'insertcol',
            'deletecol',
            'mergecells',
            'mergeright',
            'mergedown',
            'splittocells',
            'splittorows',
            'splittocols',
            'charts',
            '|',
            'preview',
            'searchreplace'
          ]
        ],
        UEDITOR_HOME_URL: '/lib/UEditor/'
      }
    }
  },
  mounted() {
    orgId = util.cookies.get('orgId')
    if (orgId == '' || orgId == null || typeof orgId == 'undefined') {
      this.$router.push({
        name: 'login'
      })
      return
    }
    this.pageType = this.$route.query.type
    if (this.pageType === 'edit') {
      this.questionnaireDetail(this.$route.query.questionnaireId)
    } else if (this.pageType === 'answer') {
      document.title = '问卷详情'
      this.answerDetail()
    }
    Array.prototype.slice
      .call(document.getElementsByName('editorValue'))
      .map(item => {
        this.$nextTick(() => {
          item.style.display = 'none'
        })
      })
  },
  methods: {
    addSingle: function() {
      this.$message.success('已添加一个单选题')
      this.topics.push({
        questionnaireItemTitle: '',
        questionnaireItemType: 2,
        sort: this.topics.length + 1,
        questionnaireItemContent: [
          {
            content: '',
            sort: 1
          }
        ]
      })
    },
    addMultiple: function() {
      this.$message.success('已添加一个多选题')
      this.topics.push({
        questionnaireItemTitle: '',
        questionnaireItemType: 3,
        sort: this.topics.length + 1,
        questionnaireItemContent: [
          {
            content: '',
            sort: 1
          }
        ]
      })
    },
    addFill: function() {
      this.$message.success('已添加一个填空题')
      this.topics.push({
        questionnaireItemTitle: '',
        sort: this.topics.length + 1,
        questionnaireItemType: 1
      })
    },
    addOption: function(index) {
      this.$message.success('已添加一个选项')
      this.topics[index].questionnaireItemContent.push({
        content: '',
        sort: this.topics[index].questionnaireItemContent.length + 1
      })
    },
    removeTopic: function(index) {
      this.topics.splice(index, 1)
      for (var i = 0, len = this.topics.length; i < len; i++) {
        this.topics[i].sort = i + 1
      }
    },
    removeOption: function(index, optionIndex) {
      this.topics[index].questionnaireItemContent.splice(optionIndex, 1)
      for (
        var i = 0, len = this.topics[index].questionnaireItemContent.length;
        i < len;
        i++
      ) {
        this.topics[index].questionnaireItemContent[i].sort = i + 1
      }
    },
    handleSave: function() {
      if (!this.title) {
        this.$message.warning('请填写问卷标题')
        return
      }
      if (!this.desc) {
        this.$message.warning('请填写问卷说明')
        return
      }
      if (this.topics.length === 0) {
        this.$message.warning('请完善问卷题目')
        return
      }
      for (let i = 0, len = this.topics.length; i < len; i++) {
        if (!this.topics[i].questionnaireItemTitle) {
          this.$message.warning('请输入题目标题')
          return
        }
        if (
          this.topics[i].questionnaireItemType === 2 ||
          this.topics[i].questionnaireItemType === 3
        ) {
          if (this.topics[i].questionnaireItemContent.length <= 1) {
            this.$message.warning('还有题目没有填写完整，请查看')
            return
          } else {
            for (
              let j = 0, len = this.topics[i].questionnaireItemContent.length;
              j < len;
              j++
            ) {
              if (!this.topics[i].questionnaireItemContent[j].content) {
                this.$message.warning('请输入选项内容')
                return
              }
            }
          }
        }
      }
      for (let i = 0; i < this.topics.length; i++) {
        const element = this.topics[i]
        element.sort = i + 1
        if (
          this.topics[i].questionnaireItemType === 2 ||
          this.topics[i].questionnaireItemType === 3
        ) {
          for (
            let j = 0;
            j < this.topics[i].questionnaireItemContent.length;
            j++
          ) {
            const e = this.topics[i].questionnaireItemContent[j]
            e.sort = j + 1
          }
        }
      }
      let questionnaire = {
        questionnaireContent: this.desc,
        questionnaireTitle: this.title
      }
      if (this.pageType === 'edit') {
        questionnaire.questionnaireId = this.$route.query.questionnaireId
      }
      this.topics.map(item => {
        item.questionnaireItemContent = JSON.stringify(
          item.questionnaireItemContent
        )
      })
      let data = {
        questionnaire,
        questionnaireItemList: this.topics
      }
      this.pageLoading = true
      if (this.pageType === 'edit') {
        questionnaireEdit(data).then(res => {
          console.log(res)
          this.pageLoading = false
          this.$message.success('更新成功')
          this.$router.go(-1)
        })
      } else if (this.pageType === 'new') {
        questionnaireNew(data).then(res => {
          console.log(res)
          this.pageLoading = false
          this.$message.success('创建成功')
          this.$router.go(-1)
        })
      }
    },
    handlePreview() {
      if (!this.isPreview) {
        this.isPreview = true
        Array.prototype.slice
          .call(document.getElementsByName('editorValue'))
          .map(item => {
            this.$nextTick(() => {
              item.style.display = 'none'
            })
          })
      }
    },
    handleCancel() {
      if (this.isPreview) {
        this.isPreview = false
      } else {
        this.$router.back()
      }
    },
    questionnaireDetail(questionnaireId, answerDetail) {
      let data = {
        questionnaireId: questionnaireId
      }
      this.pageLoading = true
      questionnaireDetail(data).then(res => {
        this.pageLoading = false
        this.title = res.questionnaire.questionnaireTitle
        this.desc = res.questionnaire.questionnaireContent
        this.topics = res.questionnaireItemList
        this.topics.map(item => {
          item.questionnaireItemContent = JSON.parse(
            item.questionnaireItemContent
          )
        })
        if (answerDetail) {
          answerDetail = JSON.parse(answerDetail)
          this.topics.map(item => {
            answerDetail.map(answer => {
              if (item.questionnaireItemId === answer.id) {
                if (
                  item.questionnaireItemType === 2 ||
                  item.questionnaireItemType === 3
                ) {
                  item.questionnaireItemContent.map(option => {
                    if (
                      answer.content.split(',').indexOf(option.content) !== -1
                    ) {
                      option.isCheck = true
                    }
                  })
                } else {
                  item.questionnaireItemContent = answer.content
                }
              }
            })
          })
        }
      })
    },
    answerDetail() {
      let data = {
        userId: this.$route.query.userId,
        activityId: this.$route.query.activityId
      }
      this.pageLoading = true
      answerDetail(data).then(res => {
        this.pageLoading = false
        this.isPreview = true
        this.questionnaireDetail(res.questionnaireId, res.answerDetail)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-divider__text,
.el-link {
  font-size: 18px;
}
.box-content {
  background-color: #eff2f7;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
}
.box-content span {
  background-size: 20px 20px;
  padding-left: 24px;
  color: #324148;
  font-size: 16px;
}
.single-tag {
  background: url('../../images/select_single.png') no-repeat left center;
}
.multiple-tag {
  background: url('../../images/select_multiple.png') no-repeat left center;
}
.fill-tag {
  background: url('../../images/fill_blank.png') no-repeat left center;
}
.show-hover:hover {
  background-color: #fafafa;
}
.blue-text {
  color: #409eff;
  cursor: pointer;
  margin-top: 10px;
}
.single-icon {
  background: url('../../images/btn_round.png') no-repeat left center;
  background-size: 14px 14px;
  padding-left: 24px;
}
.single-icon-check {
  background: url('../../images/btn_round_check.png') no-repeat left center;
  background-size: 14px 14px;
  padding-left: 24px;
}
.multiple-icon {
  background: url('../../images/btn_square.png') no-repeat left center;
  background-size: 14px 14px;
  padding-left: 24px;
}
.multiple-icon-check {
  background: url('../../images/btn_square_check.png') no-repeat left center;
  background-size: 14px 14px;
  padding-left: 24px;
}
.btn-delete {
  background: url('../../images/btn_delete.png') center no-repeat;
  background-size: 20px 20px;
}
.btn-delete:active {
  background: url('../../images/btn_delete_pre.png') center no-repeat;
  background-size: 20px 20px;
}
.btn-delete:before {
  content: '口';
  font-size: 20px;
  visibility: hidden;
}
.btn-ban {
  background: url('../../images/btn_ban.png') center no-repeat;
  background-size: 20px 20px;
}
.btn-ban:active {
  background: url('../../images/btn_ban_pre.png') center no-repeat;
  background-size: 20px 20px;
}
.btn-ban:before {
  content: '口';
  font-size: 20px;
  visibility: hidden;
}
.btn-wrapper {
  text-align: right;
}
.topic-content:hover {
  border: #409eff dashed 2px;
  border-radius: 5px;
}
.topic-content .copy {
  display: none;
}
.topic-content:hover .copy {
  display: inline;
}
.topic-content .remove {
  display: none;
}
.topic-content:hover .remove {
  display: inline;
}
.option .del-option {
  display: none;
}
.option:hover .del-option {
  display: inline;
}
.desc {
  margin-top: 14px;
}
</style>
<style>
.el-form-item__content {
  line-height: 1;
}
</style>
