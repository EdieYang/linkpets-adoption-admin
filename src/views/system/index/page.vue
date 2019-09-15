<template>
  <d2-container>
    <el-card class="card">
      <div slot="header"
           class="clearfix">
        <span>总体统计</span>
      </div>
      <div class="statistic-cover">
        <div class="statistic-item">
          <p class="item-title">成功领养总数</p>
          <p class="item-val">
            <ICountUp :delay="delay"
                      :endVal="endVal"
                      :options="options" />
          </p>
        </div>
        <div class="statistic-item">
          <p class="item-title">发布领养总数</p>
          <p class="item-val">
            <ICountUp :delay="delay"
                      :endVal="endVal"
                      :options="options" />
          </p>
        </div>
        <div class="statistic-item">
          <p class="item-title">申请领养总数</p>
          <p class="item-val">
            <ICountUp :delay="delay"
                      :endVal="endVal"
                      :options="options" />
          </p>
        </div>
      </div>
    </el-card>
    <el-card class="card">
      <div slot="header"
           class="clearfix">
        <span>周统计</span>
      </div>
      <div class="statistic-cover">
        <div class="statistic-item">
          <p class="item-title">一周内发布领养数</p>
          <p class="item-val">
            <ICountUp :delay="delay"
                      :endVal="endVal"
                      :options="options" />
          </p>
        </div>
        <div class="statistic-item">
          <p class="item-title">一周内粉丝增长数</p>
          <p class="item-val">
            <ICountUp :delay="delay"
                      :endVal="endVal"
                      :options="options" />
          </p>
        </div>
        <div class="statistic-item">
          <p class="item-title">一周内领养申请数</p>
          <p class="item-val">
            <ICountUp :delay="delay"
                      :endVal="endVal"
                      :options="options" />
          </p>
        </div>
      </div>
    </el-card>

    <el-card class="card">
      <div slot="header"
           class="clearfix">
        <span>月统计</span>
      </div>
      <div class="statistic-cover">
        <div class="statistic-item">
          <p class="item-title">一个月内成功领养数</p>
          <p class="item-val">
            <ICountUp :delay="delay"
                      :endVal="endVal"
                      :options="options" />
          </p>
        </div>
        <div class="statistic-item">
          <p class="item-title">一个月内上传照片数</p>
          <p class="item-val">
            <ICountUp :delay="delay"
                      :endVal="endVal"
                      :options="options" />
          </p>
        </div>
        <div class="statistic-item">
          <p class="item-title">一个月内发布活动数</p>
          <p class="item-val">
            <ICountUp :delay="delay"
                      :endVal="endVal"
                      :options="options" />
          </p>
        </div>
      </div>
    </el-card>

  </d2-container>
</template>
<script>
import ICountUp from 'vue-countup-v2';
export default {
  components: {
    ICountUp
  },
  data () {
    return {
      delay: 2000,
      endVal: 12,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      }
    }
  },
  methods: {

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
  font-size: 23px;
  font-weight: bold;
  text-align: center;
}
.item-val {
  font-size: 44px;
  color: #258cf7;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

