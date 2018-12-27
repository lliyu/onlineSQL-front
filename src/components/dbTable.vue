<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="TABLE_SCHEMA"
      prop="TABLE_SCHEMA">
    </el-table-column>
    <el-table-column
      label="TABLE_NAME"
      prop="TABLE_NAME">
    </el-table-column>
    <el-table-column
          label="TABLE_ROWS"
          prop="TABLE_ROWS">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "dbTable",
    data() {
      return {
        tableData: [],
        options: [],
        dbselected:[]
      }
    },
    mounted: function() {
      this.getSelectData();
      this.loadTables();
  },
    methods: {
      loadTables: function() {
         var _this = this;
          _this.axios
            .get("/dbs/tables?dbName=information_schema&ip=127.0.0.1&tableName=tables")
            .then((res) => {
              //在请求执行成功后执行回调函数中的内容，回调函数处于其它函数的内部this不会与任何对象绑定，为undefined。
              //这里如果直接使用常规的赋值而不是使用箭头函数的话会报错 options  undefined
              //也可以将this在外面重新定义 var _this = this;
              _this.tableData = res.data.data;
            })
            .catch(function(error) {
              console.log(error);
            });
    },
    selectVal: function(value){
      alert(value);
    },
    getSelectData: function() {
      var _this = this;
      _this.axios
        .get("/dbs/list?dbName=information_schema&ip=127.0.0.1&tableName=tables")
        .then((res) => {
          //在请求执行成功后执行回调函数中的内容，回调函数处于其它函数的内部this不会与任何对象绑定，为undefined。
          //这里如果直接使用常规的赋值而不是使用箭头函数的话会报错 options  undefined
          //也可以将this在外面重新定义 var _this = this;
          _this.options = res.data.data;
              // alert(_this.options);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  
    },
  }
</script>