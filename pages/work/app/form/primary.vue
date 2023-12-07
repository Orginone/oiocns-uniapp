<template>
  <view>22222</view>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
    };
  },
  props: {
    apply: {
      type: Object,
      default: {},
    },
  },
  watch: {
    apply: {
      deep: true,
      handler(newVal, oldVal) {
        this.getList();
      },
    },
  },
  created() {
    // this.getList();
  },
  methods: {
    getList() {
      console.log("this--->", this.apply);
      
    },
  },
};
</script>

<style lang="scss" scoped>
.BaseLayout {
  background: #aaaaaa3d;
}
.head {
  height: 80rpx;
  line-height: 80rpx;
  font-size: 36rpx;
  color: #154ad8;
  padding: 0 20rpx;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.head-check {
}
.foot {
  position: fixed;
  bottom: 0;
  height: 150rpx;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 9;

  .nocheck {
    background: rgb(246, 57, 57);
    margin-right: 80rpx;
  }
  .passcheck {
    background: #154ad8;
  }
  .nocheck,
  .passcheck {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    font-size: 32rpx;
    border-radius: 8rpx;
    text-align: center;
  }
}
.child-title {
  color: #154ad8;
  margin-bottom: 16rpx;
  font-size: 32rpx;
}
.main-outside {
  padding: 16rpx;
  padding-bottom: 20rpx;
  font-size: 32rpx;
  background: #fff;
  .row {
    margin-bottom: 16rpx;
    .row-title {
      margin-bottom: 16rpx;
    }
    .row-text {
      margin-bottom: 16rpx;
    }
    border-bottom: 1px solid #eee;
  }
  margin-bottom: 20rpx;
}

.child-outside {
  padding: 16rpx;
  font-size: 32rpx;
  margin-bottom: 20rpx;
  background: #fff;
  .child-table {
    overflow-x: scroll;
    display: flex;
    border-left: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    .row {
      width: 300rpx;
      border-right: 1px solid #eee;
      text-align: center;
      .row-text {
        margin-top: 16rpx;
      }
    }
  }
}
.describe {
  background: #fff;
  padding: 20rpx;
  .describe-title {
    margin: 16rpx 0;
  }
  .describe-text {
    width: 100%;
    border-radius: 8rpx;
    border: 1px solid #ccc;
    padding: 20rpx;
    box-sizing: border-box;
  }
}
</style>
