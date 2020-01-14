<template>
  <div style="display: inline-block;position: relative;">
    <el-button
                type="primary"
                size="small"
                round=""
                icon="el-icon-download"
                @click="download"
                >{{btnTitle}}</el-button>
  </div>
</template>
<script>
export default {
  name: 'd2-export-csv',
  props: {
    tableData: {
      type: Array
    },
    csvTitle: {
      type: String
    },
    tableTitle: {
      type: Array
    },
    btnTitle: {
      type: String
    }
  },
  data() {
    return {
      headerData: [],
      headerKeys: []
    }
  },
  watch: {
    tableData: function() {
      if (!this.tableData) {
        return
      }
      this.reseverName = this.csvTitle
      if (this.tableTitle) {
        this.headerData = []
        this.headerKeys = []
        this.setHeader()
      }
    }
  },
  methods: {
    download: function(event) {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = this.headerData
        const filterVal = this.headerKeys
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.csvTitle)
      })
    },
    // 设置csv的表头
    setHeader: function() {
      for (var i = 0; i < this.tableTitle.length; i++) {
        this.headerData.push(this.tableTitle[i].name)
        this.headerKeys.push(this.tableTitle[i].key)
      }
    },
    // 设置csv的内容数组
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}

</script>
<style>
</style>
