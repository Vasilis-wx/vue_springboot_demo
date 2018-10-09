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
                <img :src="getImgUrl(scope.row.userfaceUUid)" width="60" height="60"/>
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

    <el-form :model="emp" :rules="rules" ref="addEmpForm" style="margin: 0px;padding: 0px;" :label-position="labelPosition" label-width="100px">
      <div style="text-align: left">
        <el-dialog :title="dialogTitle" style="padding: 0px;" :visible.sync="dialogVisible" :close-on-click-modal="false" width="800px" v-dialogDrag :before-close="cancelEidt">
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="姓名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.name" size="mini" placeholder="请输入员工姓名" resize="both"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="登录账号:" prop="username">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.username" size="mini" resize="both" placeholder="请输入员工登录账号"></el-input>
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
                  <el-date-picker v-model="emp.birthday" size="mini" value-format="yyyy-MM-dd HH:mm:ss" style="width: 150px" type="date" placeholder="出生日期">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="16">
              <div>
                <el-form-item label="地址:" prop="address">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.address" size="mini" resize="both" placeholder="请输入地址"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="电子邮箱:" prop="email">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.email" size="mini" resize="both" placeholder="请输入电子邮箱"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="16">
              <div>
                <el-form-item label="联系方式:" prop="phone">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.phone" size="mini" resize="both" placeholder="请输入联系方式"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <div>
                <el-form-item label="头像:" prop="userface">
                  <input type="hidden" v-model="emp.userfaceUUid"  />
                  <el-upload class="avatar-uploader"
                             action="api/upload/singleFile"
                             :show-file-list="false"
                             accept="image/png, image/jpeg"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                    <img v-if="emp.userface" :src="emp.userface" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <!--<img :src="emp.userface" style="width:90px;height: 90px"/>-->
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <el-form-item label="附件上传:" prop="attachments">
                  <el-upload class="upload-demo"
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             action="api/upload/singleFile"
                             :before-remove="beforeRemove"
                             multiple
                             :limit="3"
                             :on-exceed="handleExceed"
                             :on-success="uploadSuccess"
                             :file-list="fileList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
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
      fileList: [],
      height: '100', // grid 的高度
      // 排序
      prop: '',
      order: '',
      labelPosition: 'right', // 标签对齐方式
      emps: [], // grid数据
      dialogTitle: '', // dialog标题
      dialogVisible: false, // dialog是否可见
      multipleSelection: [], // 被勾选的数据
      totalCount: 0, // 总数量
      currentPage: 1, // 当前页码
      pageSize: 10,
      tableLoading: false,
      emp: {
        name: '',
        username: '',
        sex: '',
        birthday: '',
        userface: '',
        userfaceUUid: '',
        address: '',
        email: '',
        phone: ''
      },
      // form表单验证规则
      rules: {
        name: [{ required: true, message: '必填:姓名', trigger: 'blur' }],
        username: [{ required: true, message: '必填:登录账号', trigger: 'blur' }],
        sex: [{ required: true, message: '必填:性别', trigger: 'blur' }],
        birthday: [{ required: true, message: '必填:出生日期', trigger: 'blur' }],
        email: [{ required: true, message: '必填:电子邮箱', trigger: 'blur' }, {
          type: 'email',
          message: '邮箱格式不正确',
          trigger: 'blur'
        }],
        phone: [{ required: true, message: '必填:联系方式', trigger: 'blur' }],
        address: [{ required: true, message: '必填:联系地址', trigger: 'blur' }]
      }
    }
  },
  created: function () {
    this.height = this.getWindowClientWH().height - 300
  },
  mounted: function () {
    this.loadEmps()// 获取grid数据
    // 浏览器大小改变时调整grid的高度
    const that = this
    window.onresize = function temp () {
      that.height = that.getWindowClientWH().height - 300
    }
  },
  methods: {
    getImgUrl (uuid) {
      this.getRequest('/file/getFile', {uuid}).then(resp => {
        this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          console.info('http://localhost:8080/api/' + data.result.url)
          return 'http://localhost:8080/api/' + data.result.url
        }
      })
    },
    beforeAvatarUpload (file) {
      console.log(file)
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      //
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
      // window.open(URL.createObjectURL(file.raw), '_blank')
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    uploadSuccess (response, file, fileList) {
      console.info(response)
    },
    // 图片上传成功后调用
    handleAvatarSuccess (res, file) {
      this.emp.userface = URL.createObjectURL(file.raw)
      this.emp.userfaceUUid = res.result
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
    handleSizeChange (val) {
      this.pageSize = val
      this.loadEmps()
    },
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
                _this.$message({ type: data.status, message: data.msg })
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
    // 关闭form表单dialog是调用
    cancelEidt () {
      this.dialogVisible = false
      this.emptyEmpData()
      // 清除验证信息
      this.$refs['addEmpForm'].clearValidate()
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
        phone: ''
      }
    },
    // 编辑员工
    showEditEmpView (row) {
      this.dialogTitle = '编辑员工'
      this.emp = row
      this.emp.birthday = this.formatDate(row.birthday)
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
