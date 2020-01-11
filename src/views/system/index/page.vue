<template>
  <d2-container>
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span>总体统计</span>
      </div>
      <div class="statistic-cover">
        <div class="statistic-item">
          <p class="item-val">
            <ICountUp
              :delay="delay"
              :endVal="totalUserCount"
              :options="options"
            />
          </p>
          <p class="item-title">注册用户</p>
        </div>
        <div class="statistic-item">
          <p class="item-val">
            <ICountUp
              :delay="delay"
              :endVal="loginTodayCount"
              :options="options"
            />
          </p>
          <p class="item-title">今日活跃用户</p>
        </div>
        <div class="statistic-item">
          <p class="item-val">
            <ICountUp :delay="delay" :endVal="applyCount" :options="options" />
          </p>
          <p class="item-title">近7天申请领养数</p>
        </div>
        <div class="statistic-item">
          <p class="item-val">
            <ICountUp
              :delay="delay"
              :endVal="adoptTotalCount"
              :options="options"
            />
          </p>
          <p class="item-title">平台已送养成功</p>
        </div>
      </div>
    </el-card>

    <template>
      <ve-line :data="chartData"></ve-line>
    </template>
  </d2-container>
</template>
<script>
import ICountUp from 'vue-countup-v2'
import * as statisticService from '@/api/statistic/statisticApi.js'
import util from '@/libs/util'

var orgId = ''

export default {
  components: {
    ICountUp
  },
  data() {
    return {
      delay: 1500,
      totalUserCount: 0,
      loginTodayCount: 0,
      applyCount: 0,
      adoptTotalCount: 0,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
      chartData: {
        columns: ['日期', '访问用户', '申请领养数', '送养宠物数', '发布帖子数'],
        rows: []
      }
    }
  },
  methods: {
    getOrgStatistic() {
      getOrgStatistic(orgId)
        .then(res => {
          console.log(res)
          this.activityCountInMonth = res.activityCountInMonth
          this.adoptCountInWeek = res.adoptCountInWeek
          this.adoptCountTotal = res.adoptCountTotal
          this.applyCountInWeek = res.applyCountInWeek
          this.applyCountTotal = res.applyCountTotal
          this.fansCountInWeek = res.fansCountInWeek
          this.fansCountTotal = res.fansCountTotal
          this.galleryCountInMonth = res.galleryCountInMonth
          this.successAdoptCountInMonth = res.successAdoptCountInMonth
          this.successAdoptCountTotal = res.successAdoptCountTotal
        })
        .catch(err => {
          // 异常情况
        })
    },
    getStatistic() {
      statisticService.getStatisticList().then(res => {
        console.log(res)
        this.loginTodayCount = res.loginTodayCount
        this.totalUserCount = res.totalUserCount
        this.applyCount = res.applyCount
        this.chartData.rows = res.nearlyWeekCount
      })
    }
  },
  mounted: function() {
    this.getStatistic()
    // orgId = util.cookies.get('orgId')
    // if (orgId == '' || orgId == null || typeof orgId == 'undefined') {
    //   this.getOrgStatistic()
    // }
  }
}
</script>
<style scoped>
.card {
  margin-bottom: 30px;
}
.statistic-cover {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin-left: 5%;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: space-evenly;
  align-items: center;
}
.statistic-item {
  width: 33.33%;
  display: flex;
  flex-direction: column;
}
.item-title {
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
}
.item-val {
  font-size: 55px;
  color: #258cf7;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
