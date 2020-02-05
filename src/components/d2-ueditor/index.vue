<template>
  <div>
    <input
      ref="uploadBtn"
      @change="uploadFile"
      type="file"
      class="selecte-img"
    />
    <vue-ueditor-wrap
      ref="ueditor"
      v-model="currentValue"
      :config="config"
      :destroy="true"
      :init="init"
      @ready="ready"
    />
  </div>
</template>

<script>
// 参考 https://github.com/HaoChuan9421/vue-ueditor-wrap
import Config from './ueditor.config'
import _ from 'lodash'
// import { getUploadToken } from '@/utils/tool'
import axios from 'axios'
import util from '@/libs/util'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    defaultConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      currentValue: '',
      editorInstance: null
      // ossData: { 'userId ': util.cookies.get('userId'), 'ossZone ': 'adopt' }
    }
  },
  computed: {
    config() {
      return _.merge(Config, this.defaultConfig)
    }
  },
  watch: {
    // 对外提供 v-model
    value: {
      handler(val) {
        if (this.currentValue !== val) {
          this.currentValue = val
        }
      },
      immediate: true
    },
    // 对外提供 v-model
    currentValue(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    init() {
      this.initCustomBtn()
    },
    // 上传图片
    async uploadFile(event) {
      var selectedFile = this.$refs['uploadBtn']
      if (selectedFile) {
        var file = event.target.files[0]
        var formData = new window.FormData()
        formData.append('file', file)
        formData.append('userId', util.cookies.get('userId'))
        formData.append('ossZone', 'adopt')
        let apiEntry = 'https://www.linchongpets.com/lpCms/oss/image'
        axios.post(apiEntry, formData).then(res => {
          this.editorInstance.execCommand('insertimage', {
            src: 'https://pic.linchongpets.com/' + res.data.data
          })
        })
        // event.target.value = null
      }
    },
    // 注册自定义上传图片按钮
    initCustomBtn() {
      let that = this
      window.UE.registerUI('button', function(editor, uiName) {
        editor.registerCommand(uiName, {
          execCommand: function() {
            let btn = that.$refs['uploadBtn']
            btn.click()
          }
        })
        var btn = new window.UE.ui.Button({
          name: uiName,
          // 提示
          title: '上传图片',
          cssRules: 'background-position: -380px 0;',
          onclick: function() {
            editor.execCommand(uiName)
          }
        })
        editor.addListener('selectionchange', function() {
          var state = editor.queryCommandState(uiName)
          if (state === -1) {
            btn.setDisabled(true)
            btn.setChecked(false)
          } else {
            btn.setDisabled(false)
            btn.setChecked(state)
          }
        })
        return btn
      })
    },
    ready(editorInstance) {
      this.editorInstance = editorInstance
    }
  }
}
</script>
<style scoped>
.selecte-img {
  position: absolute;
  z-index: -9999;
  opacity: 0;
}
.el-form-item__content {
  line-height: 1;
}
</style>
