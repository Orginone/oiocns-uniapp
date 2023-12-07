<template>
  <view>
    <uni-data-select
      v-model="value"
      :localdata="range"
      @change="change"
    ></uni-data-select>
  </view>
</template>
<script>

export default {
  data() {
    return {
      value: 0,
      range: [
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" },
      ],
    };
  },
  methods: {
    change(e) {
      console.log("e:", e);
    },
  },
};
</script>