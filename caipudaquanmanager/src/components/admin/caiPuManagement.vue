<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜谱管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜谱列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--菜谱列表主体部分-->
    <el-card>
      <el-row :gutter="50">
        <!--搜索区域-->
        <!--搜索添加-->
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="input" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchCaipu"></el-button>
          </el-input>
        </el-col>
        <!--搜索按钮-->

        <el-col :span="5">
          <el-button type="primary" @click="dialogFormVisible = true">添加菜谱</el-button>
          <!--          <el-button type="primary" @click="addDialogVisible = true">删除菜谱</el-button>-->
        </el-col>
        <div>
          <el-dialog title="菜谱信息" :visible.sync="dialogFormVisible">
            <el-form :model="caipuList">
              <el-form-item label="菜谱名称" :label-width="formLabelWidth">
                <el-input v-model="caipuList.caiPuName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="菜谱类型" :label-width="formLabelWidth">
                <el-input v-model="caipuList.caiPuType" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="菜谱上传者" :label-width="formLabelWidth">
                <el-input v-model="caipuList.caiPuUpload" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="使用主料" :label-width="formLabelWidth">
                <el-input v-model="caipuList.caiPuMain" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="使用辅料" :label-width="formLabelWidth">
                <el-input v-model="caipuList.caiPuFu" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="菜谱做法" :label-width="formLabelWidth">
                <el-input v-model="caipuList.caiPuText" autocomplete="off" type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-row>
    </el-card>
    <el-table :data="caipuList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border>
      <el-table-column fixed type="index"></el-table-column> <!--索引列-->
      <el-table-column fixed prop="caiPuName" label="菜谱名称" width="200"></el-table-column>
      <el-table-column prop="caiPuType" label="菜谱类别" width="160"></el-table-column>
      <el-table-column prop="caiPuMain" label="使用主料" width="270"></el-table-column>
      <el-table-column prop="caiPuFu" label="使用辅料" width="270"></el-table-column>
      <el-table-column prop="caiPuUpload" label="菜谱上传者" width="230"></el-table-column>
      <el-table-column prop="shouCangNum" label="收藏数量" width="150"></el-table-column>
      <!--        <template>-->
      <!--          <el-switch>{{row.state}}</el-switch>-->
      <!--        </template>-->
      <el-table-column fixed="right" label="操作" width="350">
        <!--作用域插槽-->
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-search" @click="open(scope.row)">查看
          </el-button>

          <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="primary" size="small" icon="el-icon-delete" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="margin-top: 15px">
      <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="1"
                     :page-size="8"
                     layout="total,prev, pager, next,jumper"
                     :total="caipuList.length">
      </el-pagination>
    </div>
    <div>

      <el-dialog title="菜谱信息" :visible.sync="dialogFormVisible1">
        <el-descriptions class="margin-top" title="菜谱信息" :column="3" :size="size">
          <el-descriptions-item label="菜谱名字">{{ this.caipuList1[0].caiPuName }}</el-descriptions-item>
          <el-descriptions-item label="caiPuType">{{ this.caipuList1[0].caiPuType }}</el-descriptions-item>
          <el-descriptions-item label="caiPuUpload">{{  this.caipuList1[0].caiPuUpload }}</el-descriptions-item>
          <el-descriptions-item label="caiPuMain">{{  this.caipuList1[0].caiPuMain }}</el-descriptions-item>
          <el-descriptions-item label="caiPuFu">{{  this.caipuList1[0].caiPuFu }}</el-descriptions-item>
          <el-descriptions-item label="shouCangNum">{{  this.caipuList1[0].shouCangNum }}</el-descriptions-item>
          <el-descriptions-item label="caiPuText">{{  this.caipuList1[0].caiPuText }}</el-descriptions-item>
        </el-descriptions>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getRequest, getRequest1, postRequest1} from "@/utils/api";

export default {
  name: "caiPuManagement",
  //onload方法
  created() {
    this.getCaipuList()
  },
  data() {
    return {
      input: '',
      cid: '',
      size: '',
      caiPuName: '',
      currentPage: '1',
      pageSize: '8',
      //查询信息封装的实体
      caipuList1:
          [{
            "cid": '',
            "caiPuName": '',
            "caiPuType": '',
            "caiPuMain": '',
            "caiPuFu": '',
            "shouCangNum": '',
            "caiPuUpload": '',
            "caiPuText": ''
          }], //菜谱列表
      caipuList:
          [{
            "cid": '',
            "caiPuName": '',
            "caiPuType": '',
            "caiPuMain": '',
            "caiPuFu": '',
            "shouCangNum": '',
            "caiPuUpload": '',
            "caiPuText": ''
          }], //菜谱列表
      multipleSelection: [],
      dialogTableVisible: false,
      dialogFormVisible: false,

      dialogFormVisible1: false,
      formLabelWidth: '120px',
      textarea: ''
    }
  },
  methods: {
    //获取所有菜谱
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getCaipuList() {
      getRequest("/caiPu/getCaiPuList").then(res => {
        this.caipuList = res.data
      })
    },

    open(row) {
      this.caiPuName = row.caiPuName
      let params = {
        caiPuName: this.caiPuName
      }
      getRequest1("/caiPu/searchCaipu", params).then(res => {
        this.caipuList1 = res.data
      })
      this.dialogFormVisible1 = true


    },
    searchCaipu() {
      let params = {
        caiPuName: this.input
      }
      getRequest1("/caiPu/searchCaipu", params).then(res => {
        this.caipuList = res.data
      })

    },
    delete1(row) {
      this.cid = row.cid
      this.$confirm('此操作将永久删除该菜谱, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let params = {
          cid: this.cid
        }
        console.log(params)
        postRequest1("/caiPu/deleteCaipu", params).then(res => {
          if (res.code === "200") {
            this.$message.success(res.message)
            this.getCaipuList();
          } else {
            this.$message.error(res.message)
          }
        })
        this.getCaipuList();

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  },

}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 17px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>