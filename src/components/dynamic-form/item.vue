<style>
  .block {
    display: block !important;
    display: flex !important;
  }
</style>

<template>
  <el-form-item  :label="item.label" :prop="item.key" :class="{'block':item.block}">

    <el-input v-if="item.type==='input'" v-bind="$attrs" v-on="$listeners" :type="item.subtype"
              :placeholder="item.placeholder" :disabled="item.disable" :readonly="item.readonly"
              :autosize="item.autosize"></el-input>

    <input-number v-else-if="item.type==='number'" v-bind="$attrs" v-on="$listeners" :min="item.min" :max="item.max"
                  :decimal1="item.decimal1" :append="item.append" :prepend="item.prepend"
                  :disabled="item.disabled"></input-number>

    <el-checkbox v-else-if="item.type==='switch' && item.appearance==='checkbox'" v-bind="$attrs" v-on="$listeners"
                 :disabled="item.disabled"></el-checkbox>
    <el-switch v-else-if="item.type==='switch'" v-bind="$attrs" v-on="$listeners" :disabled="item.disabled"></el-switch>

    <el-rate v-else-if="item.type==='rate'" v-bind="$attrs" v-on="$listeners"
             :colors="['#99A9BF', '#F7BA2A', '#FF9900']" text-color="#ff9900"></el-rate>

    <el-color-picker v-else-if="item.type==='color'" v-bind="$attrs" v-on="$listeners" :show-alpha="item.showAlpha"
                     :color-format="item.format"></el-color-picker>

    <el-slider v-else-if="item.type==='slider'" v-bind="$attrs" v-on="$listeners" :range="item.isRange"
               :show-stops="item.showStops" :step="item.step" :min="item.min" :max="item.max"></el-slider>

    <el-radio-group v-else-if="item.type==='radio'" v-bind="$attrs" v-on="$listeners">
      <component :is="item.button?'el-radio-button':'el-radio'" v-for="o in item.options||ajaxOptions" :key='o.value'
                 :label="o.value" :disabled="o.disabled" :border="item.border">{{o.label}}
      </component>
    </el-radio-group>

    <el-checkbox-group v-else-if="item.type==='checkbox'" :min="item.min" :max="item.max" v-bind="$attrs"
                       v-on="$listeners">
      <component
        :is="item.button?'el-checkbox-button':'el-checkbox'"
        v-for="o in item.options||ajaxOptions"
        :key='o.value'
        :disabled="o.disabled"
        :label="o.value" :border="item.border">{{o.label}}
      </component>
    </el-checkbox-group>

    <el-select v-else-if="item.type==='select'" v-bind="$attrs" v-on="$listeners" :multiple="item.multiple"
               :disabled="item.disabled" :multiple-limit="item.multipleLimit">
      <el-option v-for="o in item.options||ajaxOptions" :key="o.value" :label="o.label" :value="o.value"
                 :disabled="o.disabled">
      </el-option>
    </el-select>

    <el-time-picker v-else-if="item.type==='time'" :is-range="item.isRange" range-separator="至" start-placeholder="开始时间"
                    end-placeholder="结束时间" :value-format="item.valueFormat" :format="item.valueFormat"
                    :placeholder="item.placeholder" v-bind="$attrs" v-on="$listeners"></el-time-picker>

    <el-date-picker v-else-if="item.type==='date'" :type="item.subtype" range-separator="至" start-placeholder="开始时间"
                    end-placeholder="结束时间" :value-format="item.valueFormat" :format="item.viewFormat||item.valueFormat"
                    :placeholder="item.placeholder" v-bind="$attrs" v-on="$listeners" style="width: 200px"
                    :disabled="item.disabled"></el-date-picker>

    <!--<richtext v-else-if="item.type==='richtext'" v-bind="$attrs" v-on="$listeners"></richtext>-->

    <el-upload v-else-if="item.type==='image'" class="avatar-uploader"
    :action="item.action"
    :show-file-list="item.show_file_list"
    :accept="item.accept"
    :on-success="handleAvatarSuccess"
    >
      <img v-if="thisValue" :src="imgUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <span v-else>未知控件类型</span>

  </el-form-item>
</template>

<script>
// import request from '@/utils/request'
// import Richtext from '@/components/tinymce'

export default {
  components: {
    // Richtext
  },
  props: {
    item: {
      type: Object,
      required: true
    // },
    // value: {
    //   type: String,
    //   required: false
    }
  },
  data () {
    return {
      ajaxOptions: []
    }
  },
  computed: {
    imgUrl () {
      return 'api/' + this.thisValue
    },
    thisValue: {
      get () {
        return this.$attrs.value
      },
      set (newValue) {
      }
    }
  },
  created () {
    // const {optionsUrl, key, type} = this.item
    // if (optionsUrl) {
    //   const url = type === 'cascader' ? '/api/cascader/options' : '/api/some/options'
    //   console.log(`本页面为模拟预览，已自动重定向到URL:${url}，查看Network以获取格式`)
    //   request(`${url}?key=${key}`, 'GET')
    //     .then(res => {
    //       // this.item.options = res
    //       // this.$set(this.item, 'options', res)
    //       this.ajaxOptions = res
    //     })
    //     .catch(err => {
    //       this.$message.error(err.message)
    //     })
    // }
  },
  mounted () {
    // console.info(this.$attrs)
  },
  methods: {
    // 图片上传成功后调用
    handleAvatarSuccess (res, file) {
      this.thisValue = res.result.url
      this.$emit('changeImage', res.result.url)
      // this.emp.userfaceUUid = res.result.uuid
    }
  }
}
</script>
