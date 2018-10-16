<template>
  <div>
    <simple-table :table="dataTable"></simple-table>
  </div>
</template>
<script>
import SimpleTable from '@/components/table/simpleTable/SimpleTable'
export default {
  name: 'SysBasic',
  components: {
    SimpleTable
  },
  data () {
    return {
      dataTable: {
        hasMergeRowOrColumn: false, // 是否合并单元格
        loading: false, // 加载中动画
        hasShowSummary: false, // 是否显示表位合计行
        border: false, // 是否带有纵向边框，默认为false
        hasSelect: false, // 有无选中功能
        hasOperation: false, // 有无操作功能
        hasExpand: false, // 有无展开行功能
        tr: [
          {
            id: '1',
            label: '用户名',
            prop: 'username',
            show: 'template',
            className: 'username'
          },
          {
            id: '2',
            label: '真实姓名',
            prop: 'real_name'
          },
          {
            id: '3',
            label: '性别',
            prop: 'sex_value'
          },
          {
            id: '11',
            label: '客服',
            prop: 'agent_name'
          },
          {
            id: '7',
            label: '渠道',
            prop: 'channel_id'
          },
          {
            id: '8',
            label: '注册时间',
            prop: 'regist_time',
            minWidth: '150'
          },
          {
            id: '9',
            label: '上次登录时间',
            prop: 'login_time',
            minWidth: '150'
          },
          {
            id: '10',
            label: '用户状态',
            prop: 'status_value'
          }
        ],
        data: []
      }
    }
  },
  mounted () {
    // 获取grid数据
    this.loadEmps()
    // // 浏览器大小改变时调整grid的高度
    // const that = this
    // window.onresize = function temp () {
    //   that.height = that.getWindowClientWH().height - 300
    // }
  },

}
</script>
