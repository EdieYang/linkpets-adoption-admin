<template>
  <d2-container>
    <template slot="header">
      <div class="header-cover">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户微信号">
            <el-input v-model="formInline.wxAccount"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formInline.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="实名状态">
            <el-select v-model="formInline.authenticated" placeholder="请选择">
              <el-option
                v-for="item in authenticateOptions"
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
          </el-form-item>
        </el-form>
      </div>
    </template>
    <el-table :data="data" border fit style="width: 100%;">
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <img
            :src="scope.row.portrait"
            alt="暂无图片"
            style="width: 90px;height: 90px;border-radius:5px;"
          />
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center" prop="nickName">
      </el-table-column>
      <el-table-column label="微信号" align="center" prop="wxAccount">
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="mobilePhone">
      </el-table-column>
      <el-table-column
        label="所在地"
        align="center"
        prop="location"
        width="200"
      >
      </el-table-column>
      <el-table-column label="实名状态" align="center" width="120">
        <template slot-scope="scope">
          {{ scope.row.authenticated == 0 ? "未实名" : "已实名" }}
        </template>
      </el-table-column>
      <el-table-column
        label="账户积分"
        align="center"
        prop="points"
        width="120"
      >
      </el-table-column>
      <el-table-column label="备注" align="center" prop="memo" width="200">
      </el-table-column>
      <el-table-column
        label="用户注册时间"
        width="160"
        align="center"
        prop="createDate"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="180"
        class-name="small-padding fixed-width "
        fixed="right"
      >
        <template slot-scope="scope">
          <el-tooltip content="查看用户" placement="top-start" effect="light">
            <el-button
              type="primary"
              icon="el-icon-user"
              circle
              size="small"
              @click="userDetail(scope.row.userId)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="添加积分" placement="top-start" effect="light">
            <el-button
              type="success"
              icon="el-icon-magic-stick"
              circle
              size="small"
              @click="addPoints(scope.row.userId)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="添加备注" placement="top-start" effect="light">
            <el-button
              type="danger"
              icon="el-icon-date"
              circle
              size="small"
              @click="addMemo(scope.row.userId)"
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
      title="手动添加积分"
      :visible.sync="pointsDialogFormVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form>
        <el-form-item label="输入积分" label-width="120px">
          <el-input
            v-model="rewardPoints"
            type="number"
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
    <user-detail :userId="userId" v-model="userDetailDialogVisible" />
  </d2-container>
</template>

<script>
import * as userService from "@/api/user/userApi";
import util from "@/libs/util";
import userDetail from "./userDetail";
var pageNum = 1;
var pageSize = 10;

export default {
  name: "UserIndex",
  components: { userDetail },
  data() {
    return {
      data: [],
      currentPage: 1,
      total: 0,
      authenticateOptions: [
        {
          label: "未实名",
          value: "0"
        },
        {
          label: "已实名",
          value: "1"
        }
      ],
      formInline: {
        wxAccount: "",
        mobilePhone: "",
        authenticated: ""
      },
      picturePrefix: util.picturePath,
      userId:"",
      userDetailDialogVisible:false,
      pointsDialogFormVisible:false
    };
  },
  mounted() {
    this.getUserPage();
  },
  methods: {
    getUserPage() {
      let data = {
        pageNum: pageNum,
        pageSize: pageSize,
        wxAccount: this.formInline.wxAccount,
        mobilePhone: this.formInline.mobilePhone,
        authenticated: this.formInline.authenticated
      };
      userService.userPage(data).then(res => {
        console.log(res.list);
        this.data = res.list;
        this.currentPage = res.pageNum;
        this.total = res.total;
      });
    },

    handleSizeChange(val) {
      pageSize = val;
      this.getUserPage();
    },
    handleCurrentChange(val) {
      pageNum = val;
      this.getUserPage();
    },
    search() {
      this.getUserPage();
    },
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
    reset() {
      this.formInline.wxAccount = "";
      this.formInline.mobilePhone = "";
      this.formInline.authenticated = "";
      this.getUserPage();
    }
  }
};
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
