<template>
<div>
<form action="/dbs/download" method="post" enctype="multipart/form-data">
        <p>选择文件: <input type="file" name="file"/></p>
        <p><input type="submit" value="提交"/></p>
    </form>
  </div>
</template>

<script>
export default {
  name: "download",
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }

}
</script>

