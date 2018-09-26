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
          <!--<el-upload-->
            <!--:show-file-list="false"-->
            <!--accept="application/vnd.ms-excel"-->
            <!--action="/employee/basic/importEmp"-->
            <!--style="display: inline">-->
            <!--<el-button size="mini" type="success" ><i class="fa fa-lg fa-level-up" style="margin-right: 5px"></i>导入数据-->
            <!--</el-button>-->
          <!--</el-upload>-->
          <!--<el-button type="success" size="mini" ><i class="fa fa-lg fa-level-down" style="margin-right: 5px"></i>导出数据-->
          <!--</el-button>-->
          <el-button type="primary" size="mini" icon="el-icon-plus" style=""
                     @click="showAddEmpView">
            添加员工
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table
            :data="emps"
            v-loading="tableLoading"
            border
            stripe
            @selection-change="handleSelectionChange"
            size="mini"
            style="width: 100%">
            <el-table-column
              type="selection"
              align="left"
              width="30">
            </el-table-column>
            <el-table-column
              type="index"
              :index="indexMethod"
              fixed
              align="center"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="name"
              fixed
              align="center"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="username"
              align="center"
              label="登录账号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
              :formatter="formatterSex"
              width="80">
            </el-table-column>
            <el-table-column
              width="150"
              align="center"
              label="出生日期">
              <!--<template slot-scope="scope">{{formatDateTime(scope.row.birthday, 'yyyy-MM-dd HH:mm:ss')}}</template>-->
              <template slot-scope="scope">{{scope.row.birthday | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="userface"
              label="头像"
              align="center"
              width="150">
              <template slot-scope="scope">
                <img :src="scope.row.userface" width="60" height="60"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              align="center"
              label="邮箱"
              width="170">
            </el-table-column>
            <el-table-column
              prop="phone"
              align="center"
              label="联系号码"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              align="center"
              width="300">
              <template slot-scope="scope">
                <el-popover v-if="scope.row.address && scope.row.address.length>10" trigger="hover" placement="top">
                  <p style="max-width: 300px"> {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.address.substring(0,10) }}</el-tag>
                  </div>
                </el-popover>
                <p v-else >{{ scope.row.address }}</p>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="195">
              <template slot-scope="scope">
                <!--<el-button style="padding: 3px 4px 3px 4px;margin: 2px"-->
                           <!--size="medium">编辑-->
                <!--</el-button>-->
                <el-button size="mini" @click="showEditEmpView(scope.row)">编辑
                </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteEmp(scope.row)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini"
                       v-if="emps.length>0"
                       :disabled="multipleSelection.length === 0"
                       @click="deleteManyEmps"
            >批量删除
            </el-button>
            <el-pagination
              background
              :page-size="pageSize"
              :current-page="currentPage"
              layout="prev, pager, next"
              @current-change="currentChange"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>

    <el-form :model="emp"
             :rules="rules"
             ref="addEmpForm"
             style="margin: 0px;padding: 0px;"
             :label-position="labelPosition"
             label-width="100px">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          width="50%"
        >
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="姓名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.name" size="mini" style="width: 150px"
                            placeholder="请输入员工姓名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="登录账号:" prop="username">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.username" size="mini" style="width: 150px"
                            placeholder="请输入员工登录账号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="性别:" prop="sex">
                  <el-radio-group v-model="emp.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio style="margin-left: 15px" :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="出生日期:" prop="birthday">
                  <el-date-picker
                    v-model="emp.birthday"
                    size="mini"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 150px"
                    type="date"
                    placeholder="出生日期">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="地址:" prop="address">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.address" size="mini" style="width: 150px"
                            placeholder="请输入地址"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="头像:" prop="userface">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.userface" size="mini" style="width: 150px"
                            placeholder="请输入头像图片网址"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="电子邮箱:" prop="email">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.email" size="mini" style="width: 150px"
                            placeholder="请输入电子邮箱"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="联系方式:" prop="phone">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.phone" size="mini" style="width: 150px"
                            placeholder="请输入联系方式"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      emps: [], // grid数据
      // keywords: '',
      // fileUploadBtnText: '导入数据',
      // beginDateScope: '',
      // faangledoubleup: 'fa-angle-double-up',
      // faangledoubledown: 'fa-angle-double-down',
      dialogTitle: '',
      dialogVisible: false,
      multipleSelection: [], // 被勾选的数据
      // depTextColor: '#c0c4cc',
      // nations: [],
      // politics: [],
      // positions: [],
      // joblevels: [],
      totalCount: 0, // 总数量
      currentPage: 1, // 当前页码
      pageSize: 10,
      // degrees: [{id: 4, name: '大专'}, {id: 5, name: '本科'}, {id: 6, name: '硕士'}, {id: 7, name: '博士'}, {
      //   id: 3,
      //   name: '高中'
      // }, {id: 2, name: '初中'}, {id: 1, name: '小学'}, {id: 8, name: '其他'}],
      // deps: [],
      // defaultProps: {
      //   label: 'name',
      //   isLeaf: 'leaf',
      //   children: 'children'
      // },
      tableLoading: false,
      // advanceSearchViewVisible: false,
      // showOrHidePop: false,
      // showOrHidePop2: false,
      emp: {
        name: '',
        username: '',
        sex: '',
        birthday: '',
        userface: '',
        address: '',
        email: '',
        phone: ''
      },
      rules: {
        name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
        username: [{required: true, message: '必填:登录账号', trigger: 'blur'}],
        sex: [{required: true, message: '必填:性别', trigger: 'blur'}],
        birthday: [{required: true, message: '必填:出生日期', trigger: 'blur'}],
        email: [{required: true, message: '必填:电子邮箱', trigger: 'blur'}, {
          type: 'email',
          message: '邮箱格式不正确',
          trigger: 'blur'
        }],
        phone: [{required: true, message: '必填:联系方式', trigger: 'blur'}],
        address: [{required: true, message: '必填:联系地址', trigger: 'blur'}]
      }
    }
  },
  mounted: function () {
    this.loadEmps()// 获取grid数据
  },
  methods: {
    indexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    formatterSex: function (row, column, cellValue, index) {
      if (cellValue === 1) {
        return '男'
      }
      if (cellValue === 2) {
        return '女'
      }
    },
    // fileUploadSuccess (response, file, fileList) {
    //   if (response) {
    //     this.$message({type: response.status, message: response.msg})
    //   }
    //   this.loadEmps()
    //   this.fileUploadBtnText = '导入数据'
    // },
    // // fileUploadError (err, file, fileList) {
    // //   this.$message({type: 'error', message: '导入失败!'})
    // //   this.fileUploadBtnText = '导入数据'
    // // },
    // beforeFileUpload (file) {
    //   this.fileUploadBtnText = '正在导入'
    // },
    // exportEmps () {
    //   window.open('/employee/basic/exportEmp', '_parent')
    // },
    // cancelSearch () {
    //   this.advanceSearchViewVisible = false
    //   this.emptyEmpData()
    //   this.beginDateScope = ''
    //   this.loadEmps()
    // },
    // showAdvanceSearchView () {
    //   this.advanceSearchViewVisible = !this.advanceSearchViewVisible
    //   this.keywords = ''
    //   if (!this.advanceSearchViewVisible) {
    //     this.emptyEmpData()
    //     this.beginDateScope = ''
    //     this.loadEmps()
    //   }
    // },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
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
    doDelete (ids) {
      this.tableLoading = true
      var _this = this
      this.deleteRequest('/user/delUser/' + ids).then(resp => {
        _this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.$message({type: data.status, message: data.msg})
          _this.loadEmps()
        }
      })
    },
    // keywordsChange (val) {
    //   if (val === '') {
    //     this.loadEmps()
    //   }
    // },
    // searchEmp () {
    //   this.loadEmps()
    // },
    currentChange (currentChange) {
      this.currentPage = currentChange
      this.loadEmps()
    },
    loadEmps () {
      var _this = this
      this.tableLoading = true
      let params = {
        page: this.currentPage,
        size: this.pageSize
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
    addEmp (formName) {
      var _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.emp.id) {
            // 更新
            this.tableLoading = true
            this.putRequest('/user/addUser', this.emp).then(resp => {
              _this.tableLoading = false
              if (resp && resp.status === 200) {
                var data = resp.data
                _this.$message({type: data.status, message: data.msg})
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
        } else {
          return false
        }
      })
    },
    cancelEidt () {
      this.dialogVisible = false
      this.emptyEmpData()
    },
    emptyEmpData () {
      this.emp = {
        name: '',
        username: '',
        sex: '',
        birthday: '',
        userface: '',
        address: '',
        email: '',
        phone: ''
      }
    },
    // showDepTree () {
    //   this.showOrHidePop = !this.showOrHidePop
    // },
    // showDepTree2 () {
    //   this.showOrHidePop2 = !this.showOrHidePop2
    // },
    // handleNodeClick (data) {
    //   this.emp.departmentName = data.name
    //   this.emp.departmentId = data.id
    //   this.showOrHidePop = false
    //   this.depTextColor = '#606266'
    // },
    // handleNodeClick2 (data) {
    //   this.emp.departmentName = data.name
    //   this.emp.departmentId = data.id
    //   this.showOrHidePop2 = false
    //   this.depTextColor = '#606266'
    // },
    showEditEmpView (row) {
      this.dialogTitle = '编辑员工'
      this.emp = row
      this.emp.birthday = this.formatDate(row.birthday)
      this.dialogVisible = true
    },
    showAddEmpView () {
      this.dialogTitle = '添加员工'
      this.dialogVisible = true
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
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
