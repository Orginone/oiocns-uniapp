<template>
  <view class="bg-color">
    <u-input style="width:100%" :readonly="true" v-model="form.name" />
  </view>
</template>
<script>

export default {
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    change(e) {
      console.log("e:", e);
    },
  },
};
</script>
<style scoped>
  .bg-color{
    background: #fff;
  }
</style>