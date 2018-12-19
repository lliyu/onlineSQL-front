   <template>
    <div id="db">
      <div class="layui-inline">
      <label class="layui-form-label">当前链接：</label>
        <div class="layui-form layui-input-inline">
            <select lay-verify="required">
              <!-- <option v-for="(option,index) in options" v-bind:key="index" v-bind:value="option.dbName">
                {{ option.dbName }}
              </option>  -->
              <option>127.0.0.1</option>
            </select>
        </div>
      </div>
      <div class="layui-inline">
        <label class="layui-form-label">数据表：</label>
        <div class="layui-form layui-input-inline">
            <select lay-verify="required" v-model="res">
              <option v-for="(option,index) in options" v-bind:key="index" v-bind:value="option.dbName">
                {{ option.dbName }}
              </option> 
            </select>
        </div>
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
      options: {},
      res:{}
    };
  },
  mounted: function() {
    this.getSelectData();
  },
  created:function(){
    this.loadTables();
  },
  methods: {
    loadTables: function() {
      layui.use(["table"], function() {
        console.log(this.res);
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
          this.res = res.data.data[0];
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>