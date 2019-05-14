<!--主页-->
<template>
  <div class="Dashboard">

  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    created() {
      var obj1 = {
        a: {
          a1: [1, 2, 3],
        },
      };

      var obj2 = {
        a: {
          a1: {
            a2: 123,
          },
        },
      };

      var obj3 = { b: 3 };
      var obj4 = {
        b: {
          b1: 2,
        },
      };
      console.log(99999999);
      console.log(Object.assign(obj1, obj2, obj3, obj4));//{ a : 1, b : 2, c:3 }

    },
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
