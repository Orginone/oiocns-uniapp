<template>
  <view>
    <headbar  url="/pages/work/menu/menu" basic="办事" right></headbar>
    <view class="main">
      <lostPage mode="noContent"></lostPage>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dealList: [
        {
          title: "这是一张审批单",
          sub: "资金审批，望通过",
          type: "单位审批",
        },
        {
          title: "“张三”想加入单位",
          sub: "你好，我是市场部新员工张三",
          type: "好友申请",
        },
        {
          title: "“张三”想加入单位",
          sub: "你好，我是市场部新员工张三",
          type: "好友申请",
        },
        {
          title: "“张三”想加入单位",
          sub: "你好，我是市场部新员工张三",
          type: "好友申请",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: 20upx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .dealList {
    margin-top: 20upx;
  }
}
</style>
