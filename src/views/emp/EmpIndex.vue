<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <!--<el-input-->
          <!--placeholder="通过员工名搜索员工,记得回车哦..."-->
          <!--clearable-->
          <!--style="width: 300px;margin: 0px;padding: 0px;"-->
          <!--size="mini"-->
          <!--prefix-icon="el-icon-search"-->
          <!--v-model="keywords">-->
          <!--</el-input>-->
          <!--<el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search">搜索-->
          <!--</el-button>-->
          <!--<el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"><i-->
          <!--class="fa fa-lg"-->
          <!--style="margin-right: 5px"></i>高级搜索-->
          <!--</el-button>-->
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="primary" size="mini" icon="el-icon-plus" style="" @click="showAddEmpView">
            添加员工
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table :data="emps" v-loading="tableLoading" border stripe :height="height" @sort-change="sortChange"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="left" width="30">
            </el-table-column>
            <el-table-column type="index" :index="indexMethod" fixed align="center" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="name" fixed align="center" label="姓名" width="150" sortable="custom">
            </el-table-column>
            <el-table-column prop="username" align="center" label="登录账号" width="150">
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center" :formatter="formatterSex" width="80" sortable="custom">
            </el-table-column>
            <el-table-column width="150" align="center" label="出生日期">
              <!--<template slot-scope="scope">{{formatDateTime(scope.row.birthday, 'yyyy-MM-dd HH:mm:ss')}}</template>-->
              <template slot-scope="scope">{{scope.row.birthday | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="userface" label="头像" align="center" width="150">
              <template slot-scope="scope">
                <img :src="getImgUrl(scope.row.userface)" width="60" height="60" />
              </template>
            </el-table-column>
            <el-table-column prop="email" align="center" label="邮箱" width="170">
            </el-table-column>
            <el-table-column prop="phone" align="center" label="联系号码" width="100">
            </el-table-column>
            <el-table-column prop="address" label="地址" align="center" width="300">
              <template slot-scope="scope">
                <el-popover v-if="scope.row.address && scope.row.address.length>10" trigger="hover" placement="top">
                  <p style="max-width: 300px"> {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.address.substring(0,10) }}</el-tag>
                  </div>
                </el-popover>
                <p v-else>{{ scope.row.address }}</p>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="195">
              <template slot-scope="scope">
                <!--<el-button style="padding: 3px 4px 3px 4px;margin: 2px"-->
                <!--size="medium">编辑-->
                <!--</el-button>-->
                <el-button size="mini" @click="showEditEmpView(scope.row)">编辑
                </el-button>
                <el-button type="danger" size="mini" @click="deleteEmp(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="emps.length>0" :disabled="multipleSelection.length === 0" @click="deleteManyEmps">批量删除
            </el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>

    <el-dialog :title="dialogTitle" style="padding: 0px;" :visible.sync="dialogVisible" :close-on-click-modal="false"
               width="50%" v-dialogDrag :before-close="cancelEidt">

      <dynamic-form :form-config="form" v-model="emp" ref="dynamic-form" ></dynamic-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelEidt">取 消</el-button>
        <el-button size="mini" type="primary" @click="addEmp(form.ref)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import form from './form'

export default {
  data () {
    return {
      form,
      emp: {
        name: '',
        username: '',
        sex: '',
        birthday: '',
        userface: '',
        userfaceUUid: '',
        address: '',
        email: '',
        phone: '',
        attachments: ''
      },
      height: '100', // grid 的高度
      // 排序
      prop: '',
      order: '',
      emps: [], // grid数据
      dialogTitle: '添加员工', // dialog标题
      dialogVisible: false, // dialog是否可见
      multipleSelection: [], // 被勾选的数据
      totalCount: 0, // 总数量
      currentPage: 1, // 当前页码
      pageSize: 10,
      tableLoading: false
    }
  },
  computed: {
    imgUrl () {
      return 'api/' + this.emp.userface
    }
  },
  created: function () {
    this.height = this.getWindowClientWH().height - 300
  },
  mounted: function () {
    // 获取grid数据
    this.loadEmps()
    // 浏览器大小改变时调整grid的高度
    const that = this
    window.onresize = function temp () {
      that.height = that.getWindowClientWH().height - 300
    }
  },
  methods: {
    // 初始化附件
    init_fileList () {
      this.getRequest('/file/getFile', {
        uuids: this.emp.attachments
      }).then(resp => {
        this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          this.form.rows[4].formItemList[0].fileList = data.result
        }
      })
    },
    // 计算数据的序号
    indexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    // 格式化性别
    formatterSex: function (row, column, cellValue, index) {
      if (cellValue === 1) {
        return '男'
      }
      if (cellValue === 2) {
        return '女'
      }
    },
    // checkbox勾选变化
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除
    deleteManyEmps () {
      this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var ids = ''
        for (var i = 0; i < this.multipleSelection.length; i++) {
          ids += this.multipleSelection[i].id + ','
        }
        this.doDelete(ids)
      }).catch(() => {
      })
    },
    // 删除单个
    deleteEmp (row) {
      this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDelete(row.id)
      }).catch(() => {
      })
    },
    // 访问后台删除数据
    doDelete (ids) {
      this.tableLoading = true
      var _this = this
      this.deleteRequest('/user/delUser/' + ids).then(resp => {
        _this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.$message({ type: data.status, message: data.msg })
          _this.loadEmps()
        }
      })
    },
    // 更改grid每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.loadEmps()
    },
    // grid页面变化
    currentChange (currentChange) {
      this.currentPage = currentChange
      this.loadEmps()
    },
    // 加载grid数据
    loadEmps () {
      let _this = this
      this.tableLoading = true
      let params = {
        page: this.currentPage,
        size: this.pageSize,
        order: this.order,
        prop: this.prop
      }
      this.getRequest('/user/list', params).then(resp => {
        this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.emps = data.data.emps
          _this.totalCount = data.data.totalCount
        }
      })
    },
    // 添加
    addEmp (formName) {
      let _this = this
      this.$refs['dynamic-form'].$refs[formName].validate((valid) => {
        if (valid) {
          if (this.emp.id) {
            // 更新
            this.tableLoading = true
            this.putRequest('/user/editUser', this.emp).then(resp => {
              _this.tableLoading = false
              if (resp && resp.status === 200) {
                var data = resp.data
                _this.$message({
                  type: data.status,
                  message: data.msg
                })
                _this.dialogVisible = false
                _this.emptyEmpData()
                _this.loadEmps()
              }
            })
          } else {
            // 添加
            this.tableLoading = true
            this.postRequest('/user/addUser', this.emp).then(resp => {
              _this.tableLoading = false
              if (resp && resp.status === 200) {
                var data = resp.data
                _this.$message({
                  type: data.status,
                  message: data.msg
                })
                _this.dialogVisible = false
                _this.emptyEmpData()
                _this.loadEmps()
              }
            })
          }
          this.$refs['dynamic-form'].$refs[this.form.ref].clearValidate()
        } else {
          return false
        }
      })
    },
    // 关闭form表单dialog是调用
    cancelEidt () {
      this.dialogVisible = false
      this.emptyEmpData()
      // 清除验证信息
      this.$refs['dynamic-form'].$refs[this.form.ref].clearValidate()
      // 清除附件信息
      this.form.rows[4].formItemList[0].fileList = []
    },
    // 清空form表单内容
    emptyEmpData () {
      this.emp = {
        name: '',
        username: '',
        sex: '',
        birthday: '',
        userface: '',
        userfaceUUid: '',
        address: '',
        email: '',
        phone: '',
        attachments: ''
      }
    },
    // 编辑员工
    showEditEmpView (row) {
      this.dialogTitle = '编辑员工'
      this.emp = row
      this.emp.birthday = this.formatDate(row.birthday)
      // 初始化附件数据
      if (this.emp.attachments) {
        this.init_fileList()
      }
      this.dialogVisible = true
    },
    // 添加员工
    showAddEmpView () {
      this.dialogTitle = '添加员工'
      this.dialogVisible = true
    },
    // 点击列头排序时调用
    sortChange (sortData) {
      this.prop = sortData.prop
      this.order = sortData.order
      this.loadEmps()
    }
  }
}
</script>
<style>
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }

  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
