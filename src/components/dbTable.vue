<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-aside class="scroll"  width="300px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1','2','3']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>IP
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">127.0.0.1</el-menu-item>
            <el-menu-item index="1-2">localhost</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>数据库
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="item in options"
              @click="selectVal(item.dbName)"
              :key="item.dbName"
              index="3-1"
            >{{item.dbName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>数据表
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="item in tables"
              @click="getTableInfo(item)"
              :key="item"
              index="3-1"
            >{{item}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>admin</span>
      </el-header>

<div>
      <el-main>
        <div class="sql-state">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10}"
            placeholder="请输入内容"
            v-model="sql" class="sql-state-input"></el-input>
          <el-button type="primary" @click="format">格式化SQL</el-button>
          <el-button type="primary" @click="select">查询</el-button>
        </div>
        <el-table class="tables" :data="tableData" border>
          <!-- 动态表头 -->
          <el-table-column
            align="center"
            v-for="(item, index) in header"
            :key="item.columnName"
            :label="item.columnName"
            :property="item.columnName"
            width="150">
            <template slot-scope="scope">
              <center>{{scope.row[header[index].columnName]}}</center>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" circle ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="limit"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "dbTable",
  data() {
    return {
      page: 1,
      limit: 10,
      count: 0,
      sql: "",
      tableData: [],
      options: [],
      tables: [],
      header: [],
      dbselected: "",
      dbName: "information_schema",
      ip: "127.0.0.1",
      tableName: "tables"
    };
  },
  created: function() {
    this.getSelectData();
  },
  methods: {
    loadRows: function() {
      var _this = this;
      var url =
        "/dbs/rows" + "?dbName=" + _this.dbName + "&ip=" + _this.ip + "&tableName=" + _this.tableName;
      //分页
      url = url + "&page=" + _this.page + "&limit=" + _this.limit;
      _this.axios
        .get(url)
        .then(res => {
          //在请求执行成功后执行回调函数中的内容，回调函数处于其它函数的内部this不会与任何对象绑定，为undefined。
          //这里如果直接使用常规的赋值而不是使用箭头函数的话会报错 options  undefined
          //也可以将this在外面重新定义 var _this = this;
          _this.header = [];
          //填充表头
          _this.headers();
          _this.tableData = res.data.data;
          _this.count = res.data.count;
          
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTables: function() {
      var _this = this;
      var url =
        "/dbs/tables" + "?dbName=" + _this.dbName + "&ip=" + _this.ip + "&tableName=" + _this.tableName;
      _this.axios
        .get(url)
        .then(res => {
          _this.tables = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取数据库列表
    getSelectData: function() {
      var _this = this;
      var url =
        "/dbs/list" + "?dbName=" + _this.dbName + "&ip=" + _this.ip + "&tableName=" + _this.tableName;
      //分页
      url = url + "&page=" + _this.page + "&limit=" + _this.limit;
      _this.axios
        .get(url)
        .then(res => {
          _this.options = res.data.data;
          this.dbselected = _this.options[0].dbName;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //sql语句查询
    select: function() {
      var _this = this;
      var url =
        "/dbs/select" + "?dbName=" + _this.dbName + "&ip=" + _this.ip + "&tableName=" + _this.tableName;
      //sql 查询
      url = url + "&sql=" + this.sql;
        _this.axios.get(url).then(res => {
            if(res.data.code != 200){
              _this.$message({
                showClose:true,
                message:res.data.msg,
                type:'error'
            });
          }else{
            _this.tableData = res.data.data;
            _this.count = res.data.count;
            _this.header = [];
            for (var i in res.data.data[0]) {
              //构造对象
              _this.header.push({columnName:i});
            }
          }
          
        })
        .catch(function(error) {
          _this.$message({
              showClose:true,
              message:error.msg,
              type:'error'
          });
        });
    },
    format: function() {
      var _this = this;
      _this.axios.get('/dbs/format?sql='+_this.sql).then(function(res){
      _this.sql = res.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    //填充表头
    headers: function() {
      var _this = this;
      var url =
        "/dbs/table/header" + "?dbName=" + _this.dbName + "&ip=" + _this.ip + "&tableName=" + _this.tableName;
        _this.axios.get(url).then(function(res){
        _this.header = res.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    selectVal: function(value) {
      this.dbName = value;
      this.getTables();
    },
    getTableInfo: function(value) {
      //初始化数据
      this.page = 1;
      // this.tableData = [];
      // this.header = [];
      this.tableName = value;
      this.loadRows();
    },
    handleCurrentChange: function(value) {
      this.page = value;
      this.loadRows();
    },
    handleDelete: function(index, row){
      console.log(index);
    }
  }
};
</script>