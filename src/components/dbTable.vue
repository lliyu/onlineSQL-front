   <template>
    <div id="db">
        <div class="layui-form layui-input-block">
            <select lay-verify="required">
              <option v-for="(option,index) in options" v-bind:key="index" v-bind:value="option.dbName">
                {{ option.dbName }}
              </option> 
            </select>
        </div>
        <table class="layui-hide" id="tables"></table>
    </div>
</template>

          
<script>
export default {
  name: "dbTable",
  data() {
    return {
      tableData: {},
      options: {}
    };
  },
  mounted: function() {
    this.loadTables();
    this.getSelectData();
  },
  methods: {
    loadTables: function() {
      layui.use(["table"], function() {
        var table = layui.table;
        table.render({
          elem: "#tables",
          url: "/dbs/tables",
          width:905,
          page:true,
          cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
          cols: [
            [
              { field: "dbName", title: "数据库名称", width: 200 }, //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
              { field: "tableName", title: "数据表名称", width: 350 },
              { field: "tableType", title: "数据表类型", width: 150 },
              { field: "engine", title: "引擎", width: 100 },
              { field: "rows", title: "数据行数", width: 100 }
            ]
          ]
        });
      });
    },
    getSelectData: function() {
      
      this.axios
        .get("/dbs/list")
        .then((res) => {
          //在请求执行成功后执行回调函数中的内容，回调函数处于其它函数的内部this不会与任何对象绑定，为undefined。
          //这里如果直接使用常规的赋值而不是使用箭头函数的话会报错 options  undefined
          //也可以将this在外面重新定义 var _this = this;
          this.options = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>