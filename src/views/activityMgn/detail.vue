<template>
  <d2-container>
    <template slot="header">
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
            {{ activity.activityStartTime }} - {{activity.activityEndTime}}
          </div>
        </div>
         <div class="header-item">
          <div class="item-label">
            活动地址：
          </div>
          <div class="item-val">
            {{ activity.activityAddress }}
          </div>
        </div>
         <div class="header-item">
          <div class="item-label">
            活动属性：
          </div>
          <div class="item-val">
            {{ activity.activityTitle }}
          </div>
        </div>
      </div>
    </template>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="活动报名列表" name="first">
          <el-table :data="data" border fit style="width: 100%;">
            <el-table-column label="活动" width="420">
              <template slot-scope="scope">
                <div class="activity-cover">
                  <div class="activity-header">
                    {{ scope.row.activityTitle }}
                  </div>
                  <div class="activity-time">
                    {{
                      scope.row.activityStartTime +
                        " - " +
                        scope.row.activityEndTime
                    }}
                  </div>
                  <div class="activity-address">
                    {{ scope.row.activityArea }} {{ scope.row.activityAddress }}
                  </div>
                  <div class="activity-state">
                    <el-tag type="" effect="dark" class="activity-tag">
                      {{
                        activityTypeOptions[scope.row.activityType - 1].label
                      }}
                    </el-tag>
                    <el-tag type="success" effect="dark" class="activity-tag">
                      {{ scope.row.activityStatus }}
                    </el-tag>
                    <el-tag type="danger" effect="plain" class="activity-tag">
                      +{{ scope.row.activityPoint }}积分
                    </el-tag>
                    <el-tag type="warning" effect="plain" class="activity-tag">
                      -{{ scope.row.activityCost }}积分
                    </el-tag>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="活动banner图" align="center" width="120">
              <template slot-scope="scope">
                <img
                  :src="picturePrefix + scope.row.activityBanner"
                  alt="暂无图片"
                  style="width: 90px;height: 90px;border-radius:5px;"
                />
              </template>
            </el-table-column>

            <el-table-column label="活动报名时间" width="300" align="center">
              <template slot-scope="scope">
                <div>
                  <el-tag>
                    {{
                      scope.row.activityRegisterStartTime +
                        " - " +
                        scope.row.activityRegisterEndTime
                    }}</el-tag
                  >
                </div>
              </template>
            </el-table-column>

            <el-table-column label="参加活动时间段" width="300" align="center">
              <template slot-scope="scope">
                <div
                  v-for="item in scope.row.activityPickTimeArr"
                  style="margin-bottom:10px;"
                >
                  <el-tag> {{ item }}</el-tag>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="活动管理员微信"
              align="center"
              prop="customerSupport"
              width="150"
            >
            </el-table-column>

            <el-table-column
              label="创建时间"
              align="center"
              prop="createDate"
              width="200"
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
                <el-tooltip
                  :content="scope.row.isActive === 1 ? '下线' : '上线'"
                  placement="top-start"
                  effect="light"
                >
                  <el-button
                    :type="scope.row.isActive === 1 ? 'danger' : 'primary'"
                    icon="el-icon-moon-night"
                    circle
                    size="small"
                    @click="
                      switchline(scope.row.id, scope.row.isActive === 1 ? 0 : 1)
                    "
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="详情" placement="top-start" effect="light">
                  <el-button
                    type="warning"
                    icon="el-icon-reading"
                    circle
                    size="small"
                    @click="detail(scope.row.id)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="编辑" placement="top-start" effect="light">
                  <el-button
                    type="success"
                    icon="el-icon-edit"
                    circle
                    size="small"
                    @click="edit(scope.row.id)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="删除" placement="top-start" effect="light">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="small"
                    @click="deleteActivity(scope.row.id)"
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
        <el-tab-pane label="配置管理" name="second"> </el-tab-pane>
      </el-tabs>
    </template>
  </d2-container>
</template>

<script>
import * as activityService from "@/api/activityManage/activityManageApi";
import util from "@/libs/util";
var pageNum = 1;
var pageSize = 10;
var orgId = "";

export default {
  name: "ActivityDetail",
  data() {
    return {
      activityId: "",
      activity: {},
      data: [],
      currentPage: 1,
      total: 0,
      picturePrefix: util.picturePath
    };
  },
  mounted() {
    this.activityId = this.$route.query.activityId;
    this.getActivityDetail();
  },
  methods: {
    getActivityDetail() {
      let data = {
        activityId: this.activityId
      };
      activityService.activityDetail(data).then(res => {
        this.activity = res;
      });
    },

    handleSizeChange(val) {
      pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      pageNum = val;
      this.getList();
    },
    search() {
      this.getList();
    },
    reset() {
      this.formInline.activityType = "";
      this.formInline.isActive = "";
      this.getList();
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
  margin-bottom:10px;
}
.item-label {
  height: 20px;
  line-height: 20px;
  width: 90px;
  text-align: left;
  font-size: 13px;
}
.item-val{
  height: 20px;
  line-height: 20px;
  font-size: 13px;
}
.tag-popover {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
