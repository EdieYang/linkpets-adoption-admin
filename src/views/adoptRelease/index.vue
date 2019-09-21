<template>
  <d2-container better-scroll>
    <template slot="header">
      <div class="header-cover">
        <p>发布领养信息。</p>
        <el-button type="primary" size="medium" @click="newAdopt">新增领养信息</el-button>
      </div>
    </template>
    <el-table :data="data" border fit style="width: 100%;">
      <el-table-column label="发布状态" align="center">
        <template slot-scope="scope">
          <el-tag effect="dark" type="" v-if="scope.row.adoptStatus == '0'"> 待审核 </el-tag>
          <el-tag effect="dark" type="danger" v-if="scope.row.adoptStatus == '1'"> 审核失败 </el-tag>
          <el-tag effect="dark" type="info" v-if="scope.row.adoptStatus == '2'"> 待发布 </el-tag>
          <el-tag effect="dark" type="warning" v-if="scope.row.adoptStatus == '3'"> 待领养 </el-tag>
          <el-tag effect="dark" type="success" v-if="scope.row.adoptStatus == '4'"> 已领养 </el-tag>
          <el-tag v-if="scope.row.adoptStatus == '5'"> 已删除 </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.petName }}</span>
        </template>
      </el-table-column>
<<<<<<< HEAD
      <el-table-column label="照片"
                       align="center">
        <template slot-scope="scope">
          <img :src="staticPath+scope.row.mediaList[0].mediaPath"
               alt=""
               style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column label="年龄"
                       width="150px"
                       align="center">
=======
      <el-table-column label="种类" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.petType==1">狗</span>
          <span v-else-if="scope.row.petType==2">猫</span>
        </template>
      </el-table-column>

      <el-table-column label="照片" align="center" width="120px;">
        <template slot-scope="scope">
          <img :src="scope.row.mediaList.length>0?picPath+scope.row.mediaList[0].mediaPath:''" alt="暂无图片" style="width: 90px;height: 90px;border-radius:5px;">
        </template>
      </el-table-column>

      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.petSex==1">未知</span>
          <span v-else-if="scope.row.petSex==2">男孩</span>
          <span v-else-if="scope.row.petSex==3">女孩</span>
        </template>
      </el-table-column>

      <el-table-column label="年龄" align="center">
>>>>>>> acb512ac981dcf48f499ee7112133a7f48a8ef1e
        <template slot-scope="scope">
          <span>{{ scope.row.petAge }}</span>
        </template>
      </el-table-column>
<<<<<<< HEAD
      <el-table-column label="年龄"
                       width="150px"
                       align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.petSex==1">男孩</span>
          <span v-if="scope.row.petSex==2">女孩</span>

        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       width="160px"
                       align="center">
=======

      <el-table-column label="绝育情况" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.petSterilization==1">已绝育</span>
          <span v-else-if="scope.row.petSterilization==2">未绝育</span>
          <span v-else-if="scope.row.petSterilization==3">不详</span>
        </template>
      </el-table-column>

      <el-table-column label="疫苗情况" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.petVaccine==1">已接种</span>
          <span v-else-if="scope.row.petVaccine==2">未接种</span>
          <span v-else-if="scope.row.petVaccine==3">不详</span>
          <span v-else-if="scope.row.petVaccine==4">接种中</span>
        </template>
      </el-table-column>

      <el-table-column label="驱虫情况" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.petParasite==1">已驱虫</span>
          <span v-else-if="scope.row.petParasite==2">未驱虫</span>
          <span v-else-if="scope.row.petParasite==3">不详</span>
        </template>
      </el-table-column>

      <el-table-column label="体型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.petSomatotype==1">迷你</span>
          <span v-else-if="scope.row.petSomatotype==2">小型</span>
          <span v-else-if="scope.row.petSomatotype==3">中型</span>
          <span v-else-if="scope.row.petSomatotype==4">大型</span>
        </template>
      </el-table-column>

      <el-table-column label="毛发" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.petHair==1">无毛</span>
          <span v-else-if="scope.row.petHair==2">短毛</span>
          <span v-else-if="scope.row.petHair==3">长毛</span>
          <span v-else-if="scope.row.petHair==4">卷毛</span>
        </template>
      </el-table-column>

      <el-table-column label="宠物特点" align="center" width="200px">
        <template slot-scope="scope">
          <el-tag v-for="item in JSON.parse(scope.row.petCharacteristic)" :label="item.name" :key="item.value" style="margin:0 2px;">
            {{item.name}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="送养人手机号" align="center" width="120px;">
        <template slot-scope="scope">
          <span>{{ scope.row.mobilePhone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="送养人微信" align="center" width="120px;">
        <template slot-scope="scope">
          <span v-if="scope.row.wxId !=''">{{ scope.row.wxId }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column label="送养人地区" align="center" width="160px;">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="领养要求" align="center" width="160px;">
        <template slot-scope="scope">
          <el-popover placement="right" width="400" trigger="click">
            <div class="tag-popover">
              <el-tag type="info" effect="plain" v-for="item in JSON.parse(scope.row.adoptRequirements)" :label="item.name" :key="item.value" class="tag-pop">{{item.name}}</el-tag>
            </div>
            <el-button slot="reference" size="mini" round>查看详情</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="送养故事" align="center" width="160px;">
        <template slot-scope="scope">
          <el-popover placement="right" width="400" trigger="click">
            <p>{{scope.row.story}}</p>
            <el-button slot="reference" size="mini" round>查看详情</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="送养人地区" align="center" width="160px;">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" align="center" width="260px;">
        <template slot-scope="scope">
          <span v-if="scope.row.memo !=null">{{ scope.row.memo }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="160px" align="center">
>>>>>>> acb512ac981dcf48f499ee7112133a7f48a8ef1e
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width " fixed="right">
        <template slot-scope="scope">
          <el-tooltip content="下线" placement="top-start" effect="light" v-if="scope.row.adoptStatus=='3'">
            <el-button type="primary" icon="el-icon-moon-night" circle size="small" @click="switchline(scope.row.petId,'2')"></el-button>
          </el-tooltip>
          <el-tooltip content="上线" placement="top-start" effect="light" v-if="scope.row.adoptStatus=='2'">
            <el-button type="primary" icon="el-icon-moon" circle size="small" @click="switchline(scope.row.petId,'3')"></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top-start" effect="light">
            <el-button type="success" icon="el-icon-edit" circle size="small" @click="edit(scope.row.petId)"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top-start" effect="light" v-if="scope.row.adoptStatus!='5'">
            <el-button type="danger" icon="el-icon-delete-solid" circle size="small" @click="switchline(scope.row.petId,'5')"></el-button>
          </el-tooltip>
          <el-tooltip content="激活" placement="top-start" effect="light" v-if="scope.row.adoptStatus=='5'">
            <el-button type="danger" icon="el-icon-magic-stick" circle size="small" @click="switchline(scope.row.petId,'0')"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,20,30,40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

    </template>

  </d2-container>

</template>

<script>
import { adoptList, adoptEdit } from "@/api/adoptRelease/adoptReleaseApi"
import util from '@/libs/util'
var pageNum = 1
var pageSize = 10

export default {
  data() {
    return {
      data: [],
      currentPage: 1,
      total: 0,
<<<<<<< HEAD
      staticPath: 'https://pic.linchongpets.com/'
=======
      picPath: "https://pic.linchongpets.com/"
>>>>>>> acb512ac981dcf48f499ee7112133a7f48a8ef1e
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let data = {
        orgId: util.cookies.get("orgId"),
        pageNum: pageNum,
        pageSize: pageSize,
      }
      adoptList(data).then(res => {
        console.log(res.list)
        this.data = res.list
        this.currentPage = res.pageNum
        this.total = res.total
      });
    },
    newAdopt() {
      this.$router.push({ path: '/adoptRelease/new', query: { type: "new" } })
    },
    switchline(petId, status) {
      let data = {
        petId: petId,
        adoptStatus: status
      }
      adoptEdit(data).then(res => {
        this.getList()
      });
    },
    edit(petId) {
      this.$router.push({ path: '/adoptRelease/new', query: { petId: petId, type: "edit" } });
    },
    handleSizeChange(val) {
      pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      pageNum = val
      this.getList()
    },
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
