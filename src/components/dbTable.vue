<template>
    <table class="layui-hide" id="test"></table>
</template>

          
  <script>
  
    export default {
      name: 'dbTable',
      data() {
        return {
          tableData: {}
        }
      },
      mounted:function(){
          layui.use('table', function(){
  var table = layui.table;
  
  table.render({
    elem: '#test'
    ,url:'/dbs/list'
    ,page:true
    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    ,cols: [[
      {field:'id', width:80, title: 'ID', sort: true}
      ,{field:'dbName', title: '数据库名称', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
    ]]
  });
});
          }
    }
  </script>