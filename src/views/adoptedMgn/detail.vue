<template>
  <d2-container>

    <h3>申请人信息</h3>
    <el-card>
      <el-row :gutter="20"
              class="info-cover">
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            微信昵称：
          </div>
          <div class="info-value">{{data.applyUser.nickName}}</div>
        </el-col>
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            真实姓名：
          </div>
          <div class="info-value">{{data.contractInfo.applyName}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            申请人手机号：
          </div>
          <div class="info-value">{{data.contractInfo.applyPhone}}</div>
        </el-col>
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            申请人详细地址：
          </div>
          <div class="info-value">{{data.contractInfo.applyAddress}}</div>
        </el-col>
      </el-row>
    </el-card>

    <h3>已送养宠物信息</h3>
    <el-card>
      <el-row class="info-cover">
        <img v-for="item in data.petInfo.mediaList"
             :src="picPath+item.mediaPath"
             alt="暂无图片"
             style="width: 60px;height: 60px;border-radius:5px;">
      </el-row>
      <el-row :gutter="20"
              class="info-cover">
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            宠物昵称：
          </div>
          <div class="info-value">{{data.petInfo.petName}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="info-cover">

        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            种类：
          </div>
          <div class="info-value">
            <span v-if="data.petInfo.petType==1">狗</span>
            <span v-else-if="data.petInfo.petType==2">猫</span>
          </div>
        </el-col>
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            性别：
          </div>
          <div class="info-value">
            <span v-if="data.petInfo.petSex==1">未知</span>
            <span v-else-if="data.petInfo.petSex==2">男孩</span>
            <span v-else-if="data.petInfo.petSex==3">女孩</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="info-cover">
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            年龄：
          </div>
          <div class="info-value">{{data.petInfo.petAge}}</div>
        </el-col>
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            绝育情况：
          </div>
          <div class="info-value">
            <span v-if="data.petInfo.petSterilization==1">已绝育</span>
            <span v-else-if="data.petInfo.petSterilization==2">未绝育</span>
            <span v-else-if="data.petInfo.petSterilization==3">不详</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="info-cover">
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            疫苗情况：
          </div>
          <div class="info-value">
            <span v-if="data.petInfo.petVaccine==1">已接种</span>
            <span v-else-if="data.petInfo.petVaccine==2">未接种</span>
            <span v-else-if="data.petInfo.petVaccine==3">不详</span>
            <span v-else-if="data.petInfo.petVaccine==4">接种中</span>
          </div>
        </el-col>
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            驱虫情况：
          </div>
          <div class="info-value">
            <span v-if="data.petInfo.petParasite==1">已驱虫</span>
            <span v-else-if="data.petInfo.petParasite==2">未驱虫</span>
            <span v-else-if="data.petInfo.petParasite==3">不详</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="info-cover">
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            体型：
          </div>
          <div class="info-value">
            <span v-if="data.petInfo.petSomatotype==1">迷你</span>
            <span v-else-if="data.petInfo.petSomatotype==2">小型</span>
            <span v-else-if="data.petInfo.petSomatotype==3">中型</span>
            <span v-else-if="data.petInfo.petSomatotype==4">大型</span>
          </div>
        </el-col>
        <el-col :span="12"
                class="info-item">
          <div class="info-label">
            毛发：
          </div>
          <div class="info-value">
            <span v-if="data.petInfo.petHair==1">无毛</span>
            <span v-else-if="data.petInfo.petHair==2">短毛</span>
            <span v-else-if="data.petInfo.petHair==3">长毛</span>
            <span v-else-if="data.petInfo.petHair==4">卷毛</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <h3>申请人证件</h3>
    <div class="idCard-cover">
      <img :src="data.contractInfo.idCardBackUrl"
           class="image" />
      <img :src="data.contractInfo.idCardFrontUrl"
           class="image" />
    </div>

    <el-dialog title="领养协议"
               :visible.sync="centerDialogVisible"
               width="50%"
               center>
      <div id="pdfCentent">
        <div class="contra-line">送养人将委托动物交由领养方领养</div>
        <h3>甲方（送养人）义务：</h3>
        <div class="contra-line">1、如实告知乙方被领养动物的健康状况，性格，行为习惯等。</div>
        <div class="contra-line">2、为乙方领养及日后喂养动物提供必要的咨询和协助。</div>
        <div class="contra-line">3、不以任何领养名义做商业行为甚至商业欺诈。</div>
        <h3>乙方（领养人）义务：</h3>
        <div class="contra-line">1、为领养动物提供适合的食物，提供洁净的饮用水，做到科学喂养。</div>
        <div class="contra-line">2、提供适当的活动空间，进行家庭喂养，并保证领养动物的安全，不得将所领养动物异用和商业用途。</div>
        <div class="contra-line">3、必要时为领养动物提供必要的医疗措施。</div>
        <div class="contra-line">4、接受领养后，协助甲方对喂养情况进行了解和回访。</div>
        <div class="contra-line">5、事先与家人或房东做好沟通，签署领养协议后，不得因为家人反对，婚姻，生育，工作变动，动物不听话，动物生病等原因随意抛弃或售卖领养动物。</div>
        <div class="contra-line">6、由于特殊原因，无法继续喂养领养动物的情况下，必须将动物交回甲方；或与甲方协商，为动物寻找新的领养人，未经甲方同意不得自行转交他人。</div>
        <div class="contra-line">7、任何情况下，乙方不得虐待领养动物。</div>
        <div class="contra-line">8、带领养动物出门必须做好安全措施，如拴好牵引绳，保障宠物安全。出现意外情况必须及时向甲方反馈，不得隐瞒。</div>
        <div class="contra-line">9、定期（成年后每年一次）为领养动物注射疫苗。</div>
        <div class="contra-line">10、领养人应当在动物适龄时带其去正规放心的宠物医院完成绝育手术。</div>
        <h3>补充协议</h3>
        <div class="contra-line">{{data.contractInfo.agreement!=''?data.contractInfo.agreement:'无'}}</div>
        <h3>宠物信息</h3>
        <div class="contra-line">宠物昵称：{{data.petInfo.petName}}</div>

        <div class="contra-line">宠物性别：
          <span v-if="data.petInfo.petSex==1">未知</span>
          <span v-else-if="data.petInfo.petSex==2">男孩</span>
          <span v-else-if="data.petInfo.petSex==3">女孩</span>
        </div>
        <div class="contra-line">宠物年龄：{{data.petInfo.petAge}}</div>
        <div class="contra-line">免疫情况：
          <span v-if="data.petInfo.petVaccine==1">已接种</span>
          <span v-else-if="data.petInfo.petVaccine==2">未接种</span>
          <span v-else-if="data.petInfo.petVaccine==3">不详</span>
          <span v-else-if="data.petInfo.petVaccine==4">接种中</span>
        </div>
        <div class="contra-line">驱虫情况：
          <span v-if="data.petInfo.petParasite==1">已驱虫</span>
          <span v-else-if="data.petInfo.petParasite==2">未驱虫</span>
          <span v-else-if="data.petInfo.petParasite==3">不详</span>
        </div>
        <div class="contra-line">绝育情况：
          <span v-if="data.petInfo.petSterilization==1">已绝育</span>
          <span v-else-if="data.petInfo.petSterilization==2">未绝育</span>
          <span v-else-if="data.petInfo.petSterilization==3">不详</span>
        </div>
        <div class="contra-line">体型：
          <span v-if="data.petInfo.petSomatotype==1">迷你</span>
          <span v-else-if="data.petInfo.petSomatotype==2">小型</span>
          <span v-else-if="data.petInfo.petSomatotype==3">中型</span>
          <span v-else-if="data.petInfo.petSomatotype==4">大型</span></div>
        <div class="contra-line">毛发：
          <span v-if="data.petInfo.petHair==1">无毛</span>
          <span v-else-if="data.petInfo.petHair==2">短毛</span>
          <span v-else-if="data.petInfo.petHair==3">长毛</span>
          <span v-else-if="data.petInfo.petHair==4">卷毛</span>
        </div>
        <h3>甲方（送养人）信息</h3>
        <div class="contra-line">姓名：{{data.contractInfo.adopterName}}</div>
        <div class="contra-line">手机号：{{data.contractInfo.adopterPhone}}</div>
        <div class="contra-line">联系地址：{{data.contractInfo.adopterAddress}}</div>
        <div class="contra-line">签名：</div>
        <img :src="picPath+data.contractInfo.adopterSign"
             class="image" />

        <div class="contra-line">日期：{{data.contractInfo.signTime}}</div>
        <h3>乙方（领养人）信息</h3>
        <div class="contra-line">姓名：{{data.contractInfo.applyName}}</div>
        <div class="contra-line">手机号：{{data.contractInfo.applyPhone}}</div>
        <div class="contra-line">联系地址：{{data.contractInfo.applyAddress}}</div>
        <div class="contra-line">签名：</div>
        <img :src="picPath+data.contractInfo.applySign"
             class="image" />

        <div class="contra-line">日期：{{data.contractInfo.signTime}}</div>

      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="ExportSavePdf(htmlTitle,nowTime)">下载 pdf</el-button>
      </span>
    </el-dialog>

    <template slot="footer">
      <el-button @click="centerDialogVisible=true">查看领养协议</el-button>
    </template>

  </d2-container>

</template>

<script>
import { detail } from "@/api/apply/applyApi"
import util from '@/libs/util'
var orgId = ''
var applyId = ''
export default {
  name:'AdoptionBackupDetail',
  data () {
    return {
      centerDialogVisible: false,
      data: {},
      picPath: 'https://pic.linchongpets.com/',
      htmlTitle: "领养协议",
      nowTime: ""
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
    applyId = this.$route.query.applyId
    this.getDetail()
  },
  methods: {
    getDetail () {
      let data = {
        applyId: applyId      }
      detail(data).then(res => {
        console.log(res)
        this.data = res
      });
    },
    downPdf () {

    }
  }
}
</script>

<style scoped>
.info-cover {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.info-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.info-label {
  width: 30%;
  font-size: 14px;
}
.info-value {
  width: 60%;
}
.idCard-cover {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.image {
  width: 300px;
  height: 300px;
  border-radius: 4px;
  margin-right: 10px;
}
.contra-line {
  width: 90%;
  margin-left: 5%;
  line-height: 38px;
  font-size: 16px;
}
</style>
