<template>
  <el-form class="dynamic-form"
           :inline="formConfig.inline"
           :rules="formConfig.rules"
           :model="value"
           :label-position="formConfig.labelPosition"
           :label-width="formConfig.labelWidth"
           :size='formConfig.size'
           :status-icon="formConfig.statusIcon"
           :ref="formConfig.ref"
  >

    <el-row v-for="row in formConfig.rows" :key="row.index">
        <dynamic-form-item
          v-for="item in row.formItemList"
          :key="item.key"
          :item="item"
          :value="value[item.key]"
          @input="handleInput($event, item.key)"
          @changeImage="changeImage($event, item.key)"
          :style="{'min-width':columnMinWidth}"
        ></dynamic-form-item>
    </el-row>

    <slot/>

  </el-form>
</template>

<script>
export default {
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    columnMinWidth: {
      type: String
    }
  },
  methods: {
    handleInput (val, key) {
      // 这里element-ui没有上报event，直接就是value了
      this.$emit('input', {...this.value, [key]: val})
    },
    changeImage (val, key) {
      // 这里element-ui没有上报event，直接就是value了
      this.$emit('input', {...this.value, [key]: val})
    },
    setDefaultValue () {
      const formData = {...this.value}
      this.$emit('input', {...formData})
    }
  },
  mounted () {
    this.setDefaultValue()
  }
}
</script>
