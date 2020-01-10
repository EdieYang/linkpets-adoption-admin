<template>
  <el-dialog :visible.sync="dialogVisible" @open="dialogOpen" width="30%">
    <div slot="title">
      用户信息
    </div>
    <div class="user_header">
      <el-avatar
        class="header-portrait"
        :src="userInfo.portrait"
        icon="el-icon-user-solid"
      ></el-avatar>
      <div class="header-name">{{ userInfo.nickName }}</div>
    </div>
    <div class="user-body">
      <div class="head">基本信息</div>
      <div class="body-info">
        <div class="info-item">
          <div class="item-label">手机号：</div>
          <div class="item-val">{{ userInfo.mobilePhone }}</div>
        </div>
        <div class="info-item">
          <div class="item-label">微信号：</div>
          <div class="item-val">{{ userInfo.wxAccount }}</div>
        </div>
        <div class="info-item">
          <div class="item-label">当前积分：</div>
          <div class="item-val">{{ userInfo.points }}</div>
        </div>
      </div>
      <div class="head">实名信息</div>
      <div class="body-info">
        <div class="info-item">
          <div class="item-label">实名状态：</div>
          <div class="item-val">
            {{ userInfo.authenticated == 1 ? "已实名" : "未实名" }}
          </div>
        </div>
        <div class="info-item">
          <div class="item-label">身份证：</div>
          <div class="item-val">{{ userInfo.idCard }}</div>
        </div>
        <div class="info-item-img">
          <div class="item-label">身份证照片：</div>
          <div class="item-val-img">
            <el-image v-for="pic in idCardList" :src="pic" :preview-src-list="idCardList" class="idCard-img" fit="contain">
            </el-image>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import * as userService from "@/api/user/userApi";
export default {
  name: "userDetail",
  props: {
    userId: String,
    value: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      userInfo: {},
      idCardList:[]
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    dialogOpen() {
      this.getUserDetail();
    },
    getUserDetail() {
      let query = {
        userId: this.userId
      };
      userService.userDetail(query).then(data => {
        this.userInfo = data;
        this.idCardList=[data.idCardImageFront,data.idCardImageBack]
      });
    }
  }
};
</script>

<style scoped>
.user_header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.header-portrait {
  width: 80px;
  height: 80px;
}
.header-name {
  font-size: 18px;
  margin-left: 20px;
}
.head {
  font-size: 14px;
  color: #000;
  font-weight: bold;
  margin: 10px 0;
  margin-top: 20px;
}
.user-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.info-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 24px;
}
.item-label {
  width: 120px;
  margin-right: 10px;
  text-align: right;
}
.info-item-img{
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
}
.item-val-img {
  margin-top:20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.idCard-img{
  width:40%;
  height: 150px;
  border-radius: 5px;
}
</style>
