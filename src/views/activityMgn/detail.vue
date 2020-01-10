<template>
  <d2-container>
    <div class="header-cover">
      <div class="header-item">
        <div class="item-label">
          活动标题：
        </div>
        <div class="item-val">
          {{ activity.activityTitle }}
        </div>
      </div>
      <div class="header-item">
        <div class="item-label">
          活动时间：
        </div>
        <div class="item-val">
          {{ activity.activityStartTime }} - {{ activity.activityEndTime }}
        </div>
      </div>
      <div class="header-item">
        <div class="item-label">
          活动地址：
        </div>
        <div class="item-val">
          {{ activity.activityArea }} {{ activity.activityAddress }}
        </div>
      </div>
      <div class="header-item">
        <div class="item-label">
          活动属性：
        </div>
        <div class="item-val">
          {{ activity.activityType == 1 ? "线上活动" : "线下活动" }}
        </div>
      </div>
      <div class="header-item">
        <div class="item-label">
          消耗积分：
        </div>
        <div class="item-val">{{ activity.activityCost }}积分</div>
      </div>
      <div class="header-item">
        <div class="item-label">
          奖励积分：
        </div>
        <div class="item-val">{{ activity.activityPoint }}积分</div>
      </div>
      <div class="header-item">
        <div class="item-label">
          活动报名时间：
        </div>
        <div class="item-val">
          {{ activity.activityRegisterStartTime }} -
          {{ activity.activityRegisterEndTime }}
        </div>
      </div>
      <div class="header-item">
        <div class="item-label">
          报名参加时间：
        </div>
        <div class="item-val">
          {{ activity.activityPickTime }}
        </div>
      </div>
      <div class="header-item">
        <div class="item-label">
          活动报名时间：
        </div>
        <div class="item-val">
          {{ activity.activityRegisterStartTime }} -
          {{ activity.activityRegisterEndTime }}
        </div>
      </div>
      <div class="header-item">
        <div class="item-label">
          管理员微信：
        </div>
        <div class="item-val">
          {{ activity.customerSupport }}
        </div>
      </div>
      <div class="header-item">
        <div class="item-label">
          活动状态：
        </div>
        <div class="item-val">
          {{ activity.activityStatus }}
        </div>
      </div>
    </div>

    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="活动报名列表" name="first">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户微信号">
              <el-input
                v-model="formInline.wxAccount"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input
                v-model="formInline.mobilePhone"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="报名参加时间">
              <el-select
                v-model="formInline.involvementTime"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in activityPickTimeArr"
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
                icon="el-icon-download"
                @click="downloadRegisterExcel"
                >下载报名列表</el-button
              >
            </el-form-item>
          </el-form>

          <el-table
            :data="data"
            border
            fit
            style="width: 100%;"
            max-height="600"
          >
            <el-table-column label="报名用户" width="300px">
              <template slot-scope="scope">
                <div class="user-cover">
                  <div class="user-portrait">
                    <img
                      :src="scope.row.portrait"
                      alt="暂无图片"
                      style="width: 90px;height: 90px;border-radius:5px;"
                    />
                  </div>
                  <div class="user-info">
                    <p class="user-detail">昵称：{{ scope.row.nickName }}</p>
                    <p class="user-detail">手机：{{ scope.row.mobilePhone }}</p>
                    <p class="user-detail">微信：{{ scope.row.wxAccount }}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="报名参加时间" align="center" width="320">
              <template slot-scope="scope">
                {{ scope.row.involvementTime }}
              </template>
            </el-table-column>

            <el-table-column label="当前用户积分" width="120" align="center">
              <template slot-scope="scope">
                <div>
                  <el-tag> {{ scope.row.points }}</el-tag>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="支付状态" width="120" align="center">
              <template slot-scope="scope">
                <div>
                  <el-tag>
                    {{ scope.row.isPaid == 0 ? "未支付" : "已支付" }}</el-tag
                  >
                </div>
              </template>
            </el-table-column>

            <el-table-column label="消耗积分" width="120" align="center">
              <template slot-scope="scope">
                <div>
                  <el-tag> - {{ scope.row.paymentAmount }}</el-tag>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="报名状态" width="120" align="center">
              <template slot-scope="scope">
                <div>
                  <el-tag>
                    {{ scope.row.isValid == 1 ? "已报名" : "已取消" }}</el-tag
                  >
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="备注"
              align="center"
              prop="memo"
              width="200"
            >
            </el-table-column>

            <el-table-column
              label="报名时间"
              align="center"
              prop="createDate"
              width="200"
            >
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="280"
              class-name="small-padding fixed-width "
              fixed="right"
            >
              <template slot-scope="scope">
                <el-tooltip
                  content="查看用户"
                  placement="top-start"
                  effect="light"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-user"
                    circle
                    size="small"
                    @click="userDetail(scope.row.userId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  content="查看问卷答案"
                  placement="top-start"
                  effect="light"
                  v-if="activity.activityShouldQuestionnaire == 1"
                >
                  <el-button
                    type="warning"
                    icon="el-icon-finished"
                    circle
                    size="small"
                    @click="questionnaireAnswer(scope.row.userId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  content="添加积分"
                  placement="top-start"
                  effect="light"
                >
                  <el-button
                    type="success"
                    icon="el-icon-magic-stick"
                    circle
                    size="small"
                    @click="addPoints(scope.row.userId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  content="取消报名"
                  placement="top-start"
                  effect="light"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="small"
                    @click="cancelRegist(scope.row.userId)"
                    :disabled="activity.activityStatus == '活动进行中' || activity.activityStatus == '活动已结束'?true:false"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

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
        </el-tab-pane>
        <el-tab-pane label="活动介绍" name="second">
          <div v-html="activity.activityContent" class="activity-info"></div>
        </el-tab-pane>
      </el-tabs>
    </template>

    <el-dialog
      title="添加积分"
      :visible.sync="pointsDialogFormVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form>
        <el-form-item label="活动奖励积分" label-width="120px">
          <el-input
            v-model="rewardPoints"
            autocomplete="off"
            type="number"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pointsDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            addUserPoints();
            pointsDialogFormVisible = false;
          "
          >充 值</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="取消报名"
      :visible.sync="cancelRegisterDialogFormVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="取消原因备注" label-width="120px" prop="memo">
          <el-input
            v-model="form.memo"
            autocomplete="off"
            max-length="20"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRegisterDialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="cancelUserRegister('ruleForm')"
          >提 交</el-button
        >
      </div>
    </el-dialog>

    <user-detail :userId="userId" v-model="userDetailDialogVisible" />
  </d2-container>
</template>

<script>
import * as activityService from "@/api/activityManage/activityManageApi";
import * as activityRegisterService from "@/api/activityManage/activityRegisterApi";
import * as userService from "@/api/user/userApi";
import util from "@/libs/util";
import userDetail from "./userDetail";
var pageNum = 1;
var pageSize = 10;
var orgId = "";

export default {
  name: "ActivityDetail",
  components: { userDetail },
  data() {
    return {
      activityId: "",
      activity: {},
      activeName: "first",
      formInline: {
        wxAccount: "",
        mobilePhone: "",
        involvementTime: ""
      },
      activityPickTimeArr: [],
      rewardPoints: 0,
      userId: "",
      form:{
        memo: "系统取消",
      },
      data: [],
      currentPage: 1,
      total: 0,
      picturePrefix: util.picturePath,
      userDetailDialogVisible: false,
      pointsDialogFormVisible: false,
      cancelRegisterDialogFormVisible: false,
      rules: {
        memo: [
          { required: true, message: "请输入取消原因备注", trigger: "blur" },
          { max: 20, message: "小于20个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.activityId = this.$route.query.activityId;
    this.getActivityDetail();
    this.getGroupActivityRegisterPage();
  },
  methods: {
    getActivityDetail() {
      let data = {
        activityId: this.activityId
      };
      activityService.activityDetail(data).then(res => {
        this.activity = res;
        this.activityPickTimeArr = [];
        var picArr = res.activityPickTime.split(",");
        picArr.forEach(element => {
          let pickItem = {
            label: element,
            value: element
          };
          this.activityPickTimeArr.push(pickItem);
        });
        this.rewardPoints = res.activityPoint;
      });
    },
    getGroupActivityRegisterPage() {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize,
        activityId: this.activityId,
        wxAccount: this.formInline.wxAccount,
        mobilePhone: this.formInline.mobilePhone,
        involvementTime: this.formInline.involvementTime
      };
      activityRegisterService.getGroupActivityRegisterPage(data).then(res => {
        this.data = res.list;
        this.currentPage = res.pageNum;
        this.total = res.total;
      });
    },
    downloadRegisterExcel() {},
    userDetail(id) {
      this.userId = id;
      this.userDetailDialogVisible = true;
    },
    addPoints(userId) {
      this.userId = userId;
      this.pointsDialogFormVisible = true;
    },
    addUserPoints() {
      let data = {
        userId: this.userId,
        channel: 7,
        targetId: this.activityId
      };
      userService.addUserPointStatement(data).then(res => {
        if (res != 0) {
          this.$notify({
            title: "操作成功",
            message: "添加积分",
            type: "success"
          });
        } else {
          this.$notify({
            title: "操作失败",
            message: "已添加积分",
            type: "error"
          });
        }
        this.getGroupActivityRegisterPage();
      });
    },
    cancelRegist(userId) {
      this.userId = userId;
      this.cancelRegisterDialogFormVisible = true;
    },
    cancelUserRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            userId: this.userId,
            memo: this.form.memo,
            activityId: this.activityId
          };
          activityRegisterService.delGroupActivityRegister(data).then(res => {
            this.$notify({
              title: "操作成功",
              message: "取消报名",
              type: "success"
            });
            this.cancelRegisterDialogFormVisible = false;
            this.getGroupActivityRegisterPage()
          });
        }
      });
    },
    handleSizeChange(val) {
      pageSize = val;
      this.getGroupActivityRegisterPage();
    },
    handleCurrentChange(val) {
      pageNum = val;
      this.getGroupActivityRegisterPage();
    },
    search() {
      this.getGroupActivityRegisterPage();
    },
    reset() {
      this.formInline.wxAccount = "";
      this.formInline.mobilePhone = "";
      this.formInline.involvementTime = "";
      this.getGroupActivityRegisterPage();
    }
  }
};
</script>

<style scoped>
.header-cover {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.header-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
  align-items: center;
}
.item-label {
  height: 20px;
  width: 100px;
  text-align: right;
  font-size: 13px;
}
.item-val {
  margin-left: 10px;
  height: 20px;
  font-size: 13px;
}
.activity-info {
  width: 600px;
  margin: 20px auto;
}
.user-cover {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.user-portrait {
  width: 100px;
  margin-right: 20px;
}
.user-info {
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 13px;
}
.user-detail {
  line-height: 20px;
  margin: 0 0;
}
</style>
