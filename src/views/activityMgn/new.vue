<template>
  <d2-container better-scroll>
    <div style="width:100%;">
      <el-card v-loading="pageLoading">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          label-position="left"
          :rules="formRules"
          style="width:640px;display: inline-block;"
        >
          <el-form-item label="活动圈子" prop="groupId">
            <el-select
              v-model="form.groupId"
              placeholder="请选择活动圈子"
              style="width:100%;"
            >
              <el-option
                v-for="item in circles"
                :key="item.groupId"
                :label="item.groupName"
                :value="item.groupId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动标题" prop="activityTitle">
            <el-input
              v-model="form.activityTitle"
              placeholder="请输入活动标题"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="活动属性" prop="activityType">
            <el-select
              v-model="form.activityType"
              placeholder="请选择活动属性"
              style="width:100%;"
            >
              <el-option
                v-for="item in activityTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" prop="activityTime">
            <el-date-picker
              v-model="form.activityTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="参加活动时间" prop="joinTime">
            <div v-for="(item, index) in form.joinTime" :key="index">
              <el-date-picker
                v-model="form.joinTime[index]"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="margin-top:10px"
              >
              </el-date-picker>
            </div>
            <el-button type="primary" round="" size="small" @click="addTime"
              >添加活动时间</el-button
            >
          </el-form-item>
          <el-form-item label="活动报名时间" prop="applyTime">
            <el-date-picker
              v-model="form.applyTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动所在市区" prop="activityArea">
            <el-select
              v-model="form.activityArea"
              placeholder="请选择所在地（仅限上海市）"
              style="width:100%;"
            >
              <el-option
                v-for="value in addressRange"
                :label="value"
                :value="value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动地址" prop="activityAddress">
            <el-input
              v-model="form.activityAddress"
              placeholder="请输入活动地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="消耗积分" prop="activityCost">
            <el-input-number
              v-model="form.activityCost"
              :min="0"
              :step="1"
              step-strictly
              size="medium"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="获得积分" prop="activityPoint">
            <el-input-number
              v-model="form.activityPoint"
              :min="0"
              :step="1"
              step-strictly
              size="medium"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="活动banner图" prop="activityBanner">
            <el-upload
              :action="actionUrl"
              list-type="picture-card"
              :data="ossData"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :limit="1"
              :file-list="fileList"
              :class="{ disableUpload: disableUpload }"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
            <el-input v-model="form.activityBanner" v-show="false"></el-input>
          </el-form-item>
          <el-form-item label="活动管理员微信" prop="customerSupport">
            <el-input
              v-model="form.customerSupport"
              placeholder="请输入活动管理员微信"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否验证身份证" prop="activityShouldVerify">
            <el-switch v-model="form.activityShouldVerify"> </el-switch>
          </el-form-item>
          <el-form-item label="是否增加表单" prop="activityShouldQuestionnaire">
            <el-switch v-model="form.activityShouldQuestionnaire"> </el-switch>
            <el-select
              v-if="form.activityShouldQuestionnaire"
              v-model="form.questionnaireId"
              style="margin:0 20px"
            >
              <el-option
                v-for="item in questionnaireTypeOptions"
                :key="item.questionnaireId"
                :label="item.questionnaireTitle"
                :value="item.questionnaireId"
              >
              </el-option>
            </el-select>
            <el-button
              v-if="form.activityShouldQuestionnaire"
              type="primary"
              round=""
              size="small"
              @click="addQuestionnaire"
              >添加问卷</el-button
            >
          </el-form-item>
          <el-form-item label="活动详情" prop="activityContent">
            <div>
              <d2-ueditor
                :default-config="config"
                v-model="form.activityContent"
                style="width:100%"
              />
            </div>
          </el-form-item>

          <el-button class="form-sumbit" type="primary" @click="adoptNew"
            >提 交</el-button
          >
          <el-button
            class="form-sumbit"
            @click="cancel"
            style="margin-right: 20px"
            >取 消</el-button
          >
        </el-form>
        <br />
      </el-card>
    </div>
  </d2-container>
</template>

<script>
import {
  circleList,
  activityNew,
  activityEdit,
  activityDetail
} from "@/api/activityManage/activityManageApi";
import { questionnaireListAll } from "@/api/questionnaireManage/questionnaireManageApi";
import util from "@/libs/util";
var orgId = "";

export default {
  name: "ActivityNew",
  data() {
    var checkTime = (rule, value, callback) => {
      value.map(item => {
        if (!item[0] || !item[1]) {
          return callback(new Error("请选择参加活动时间"));
        }
      });
      callback();
    };
    return {
      pageLoading: false,
      pageType: "",
      actionUrl: "https://www.linchongpets.com/lpCmsTest/oss/image",
      form: {
        groupId: "",
        activityTitle: "",
        activityType: "",
        activityTime: "",
        applyTime: "",
        activityArea: "",
        activityAddress: "",
        activityCost: "",
        activityPoint: "",
        activityBanner: "",
        customerSupport: "",
        activityContent: "",
        activityPickTime: "",
        joinTime: [[]],
        activityShouldVerify: false,
        activityShouldQuestionnaire: false
      },
      config: {
        toolbars: [
          [
            "fullscreen",
            "source",
            "|",
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "fontborder",
            "strikethrough",
            "superscript",
            "subscript",
            "removeformat",
            "formatmatch",
            "autotypeset",
            "blockquote",
            "pasteplain",
            "|",
            "forecolor",
            "backcolor",
            "insertorderedlist",
            "insertunorderedlist",
            "selectall",
            "cleardoc",
            "|",
            "rowspacingtop",
            "rowspacingbottom",
            "lineheight",
            "|",
            "customstyle",
            "paragraph",
            "fontfamily",
            "fontsize",
            "|",
            "directionalityltr",
            "directionalityrtl",
            "indent",
            "|",
            "justifyleft",
            "justifycenter",
            "justifyright",
            "justifyjustify",
            "|",
            "touppercase",
            "tolowercase",
            "|",
            "link",
            "unlink",
            "anchor",
            "|",
            "imagenone",
            "imageleft",
            "imageright",
            "imagecenter",
            "|",
            "emotion",
            "map",
            "insertframe",
            "insertcode",
            "template",
            "|",
            "horizontal",
            "date",
            "time",
            "spechars",
            "|",
            "inserttable",
            "deletetable",
            "insertparagraphbeforetable",
            "insertrow",
            "deleterow",
            "insertcol",
            "deletecol",
            "mergecells",
            "mergeright",
            "mergedown",
            "splittocells",
            "splittorows",
            "splittocols",
            "charts",
            "|",
            "preview",
            "searchreplace"
          ]
        ],
        UEDITOR_HOME_URL: "/lib/UEditor/"
      },
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      ossData: { "userId ": util.cookies.get("userId"), "ossZone ": "adopt" },
      activityTypeOptions: [
        {
          label: "线下活动",
          value: "1"
        },
        {
          label: "线上活动",
          value: "2"
        }
      ],
      questionnaireTypeOptions: [],
      circles: [],
      addressRange: [
        "上海市 黄浦区",
        "上海市 徐汇区",
        "上海市 长宁区",
        "上海市 静安区",
        "上海市 普陀区",
        "上海市 虹口区",
        "上海市 杨浦区",
        "上海市 闵行区",
        "上海市 宝山区",
        "上海市 嘉定区",
        "上海市 浦东新区",
        "上海市 金山区",
        "上海市 松江区",
        "上海市 青浦区",
        "上海市 奉贤区",
        "上海市 崇明区"
      ],
      formRules: {
        groupId: [
          { required: true, message: "请选择活动圈子", trigger: "change" }
        ],
        activityTitle: [
          { required: true, message: "请输入活动标题", trigger: "blur" }
        ],
        activityType: [
          { required: true, message: "请选择活动属性", trigger: "change" }
        ],
        activityTime: [
          { required: true, message: "请选择活动时间", trigger: "change" }
        ],
        joinTime: [
          {
            required: true,
            validator: checkTime,
            message: "请选择参加活动时间",
            trigger: "change"
          }
        ],
        applyTime: [
          { required: true, message: "请选择活动报名时间", trigger: "change" }
        ],
        activityArea: [
          { required: true, message: "请选择活动所在市区", trigger: "change" }
        ],
        activityAddress: [
          { required: true, message: "请输入活动地址", trigger: "blur" }
        ],
        activityCost: [
          { required: true, message: "请输入消耗积分", trigger: "change" }
        ],
        activityPoint: [
          { required: true, message: "请输入获得积分", trigger: "change" }
        ],
        activityBanner: [
          { required: true, message: "请选择活动banner图", trigger: "change" }
        ],
        customerSupport: [
          { required: true, message: "请输入活动管理员微信", trigger: "blur" }
        ],
        activityContent: [
          { required: true, message: "请输入活动详情", trigger: "blur" }
        ]
      },
      disableUpload: false
    };
  },
  mounted() {
    orgId = util.cookies.get("orgId");
    if (orgId == "" || orgId == null || typeof orgId == "undefined") {
      this.$router.push({
        name: "login"
      });
      return;
    }
    this.pageType = this.$route.query.type;
    if (this.pageType === "edit") {
      this.activityDetail();
    }
    this.getCircleList();
    this.getQuestionnaireList();
  },
  methods: {
    activityDetail() {
      let data = {
        activityId: this.$route.query.activityId
      };
      this.pageLoading = true;
      activityDetail(data).then(res => {
        this.pageLoading = false;
        res.joinTime = [];
        this.form = JSON.parse(JSON.stringify(res));
        this.form.activityShouldVerify = this.form.activityShouldVerify === "1";
        this.form.activityShouldQuestionnaire =
          this.form.activityShouldQuestionnaire === "1";
        this.fileList = [{ url: this.form.activityBanner }];
        this.form.activityTime = [
          this.form.activityStartTime,
          this.form.activityEndTime
        ];
        this.form.applyTime = [
          this.form.activityRegisterStartTime,
          this.form.activityRegisterEndTime
        ];
        this.disableUpload = this.form.activityBanner !== "";
        let time = this.form.activityPickTime.split(",");
        time.map(item => {
          this.form.joinTime.push([item.split("-")[0], item.split("-")[1]]);
        });
      });
    },
    adoptNew() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.activityStartTime = this.formatTime(
            this.form.activityTime[0]
          );
          this.form.activityEndTime = this.formatTime(
            this.form.activityTime[1]
          );
          this.form.activityRegisterStartTime = this.formatTime(
            this.form.applyTime[0]
          );
          this.form.activityRegisterEndTime = this.formatTime(
            this.form.applyTime[1]
          );
          let pickTime = "";
          this.form.joinTime.map(item => {
            pickTime = pickTime
              .concat(this.formatTime(item[0]))
              .concat("-")
              .concat(this.formatTime(item[1]))
              .concat(",");
          });
          this.form.activityPickTime = pickTime.substring(
            0,
            pickTime.length - 1
          );
          this.form.activityShouldVerify = this.form.activityShouldVerify
            ? "1"
            : "0";
          this.form.activityShouldQuestionnaire = this.form
            .activityShouldQuestionnaire
            ? "1"
            : "0";
          delete this.form.activityTime;
          delete this.form.applyTime;
          delete this.form.joinTime;
          console.log(this.form);
          this.pageLoading = true;
          if (this.pageType === "edit") {
            this.form.activityId = this.$route.query.activityId;
            activityEdit(this.form).then(res => {
              console.log(res);
              this.pageLoading = false;
              this.$message.success("更新成功");
              this.$router.go(-1);
            });
          } else if (this.pageType === "new") {
            activityNew(this.form).then(res => {
              console.log(res);
              this.pageLoading = false;
              this.$message.success("创建成功");
              this.$refs["form"].resetFields();
              this.$router.go(-1);
            });
          }
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    formatTime(date) {
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    addQuestionnaire() {
      this.$router.push({
        path: "/questionnaireMgn/new",
        query: { type: "new" }
      });
    },
    addTime() {
      this.form.joinTime.push([]);
    },
    handleRemove(file, fileList) {
      console.log(file);
      this.form.activityBanner = "";
      this.disableUpload = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      this.form.activityBanner =
        "https://pic.linchongpets.com/" + file.response.data;
      this.disableUpload = true;
    },
    getCircleList() {
      let data = {
        groupType: 1,
        isActive: 1
      };
      circleList(data).then(res => {
        console.log(res);
        this.circles = res;
      });
    },
    getQuestionnaireList() {
      questionnaireListAll().then(res => {
        this.questionnaireTypeOptions = res;
      });
    }
  }
};
</script>

<style scoped>
.el-divider__text,
.el-link {
  font-size: 18px;
}
</style>
<style>
.disableUpload .el-upload {
  display: none;
}
</style>
