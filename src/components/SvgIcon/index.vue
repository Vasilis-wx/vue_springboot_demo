<template>
  <icon :name="iconClass"  class="myIcon"></icon>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    // 图标文件名
    iconClass: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.myIcon {
  width: 1.4em;
  height: 1.5em;
  margin-right: 0.7em;
  fill: currentColor;
  cursor:pointer; //手指样式
  overflow: hidden;
}
</style>
