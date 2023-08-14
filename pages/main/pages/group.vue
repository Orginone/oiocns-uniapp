<template>
  <view class="index">
    <view class="group-box">
      <view class="main-box">
        <view class="main-head">
          <view class="main-title">最常浏览</view>
          <view class="main-more"
            >查看我的关注
            <img src="../../../static/base/right-arror.png" alt="" />
          </view>
        </view>
        <view class="main-list">
          <view class="main-item">
            <img
              src="https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh"
              alt=""
            />
            <view class="item-text">名字</view>
          </view>
          <view class="main-item">
            <img
              src="https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh"
              alt=""
            />
            <view class="item-text">名字</view>
          </view>
          <view class="main-item">
            <img
              src="https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh"
              alt=""
            />
            <view class="item-text">名字</view>
          </view>
          <view class="main-item">
            <img
              src="https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh"
              alt=""
            />
            <view class="item-text">名字</view>
          </view>
          <view class="main-item">
            <img
              src="https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh"
              alt=""
            />
            <view class="item-text">名字</view>
          </view>
        </view>
      </view>
    </view>
    <swiper
      class="swiper"
      circular
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      autoplay="true"
      interval="5000"
      duration="500"
      indicator-dots="true"
      indicator-color="rgba(255, 255, 255, .3)"
      indicator-active-color="#fff"
      :indicator-color="color"
      :easing-function="'easeInOutCubic'"
      next-margin="40px"
      previous-margin="40px"
    >
      <swiper-item>
        <view class="li">
          <img
            :src="'https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh'"
            class="itemSrc"
          />
        </view>
      </swiper-item>
      <swiper-item>
        <view class="li">
          <img
            :src="'https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh'"
            class="itemSrc"
          />
        </view>
      </swiper-item>
      <swiper-item>
        <view class="li">
          <img
            :src="'https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh'"
            class="itemSrc"
          />
        </view>
      </swiper-item>
    </swiper>
    <view class="trends-box">
      <view class="main-head">
        <view class="main-title">最新动态</view>
        <view class="main-more"
          >查看全部动态
          <img src="../../../static/base/right-arror.png" alt="" />
        </view>
      </view>
      <view class="trends-list">
        <view class="trends-item">
          <img
            src="https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh"
            alt=""
          />
          <view class="trends-right">
            <view class="tr-title">标题</view>
            <view class="tr-tag">
              <view class="tag-item">我是标签</view>
              <view class="tag-item">我是标签</view>
            </view>
            <view class="tr-content"
              >内容摘要内容摘要内容摘要内容摘要内容摘要内容摘要内容摘要内容摘要内容摘要</view
            >
            <view class="tr-foot">
              <view class="look-more">查看详情</view>
              <view class="tr-time">xxxxxxx</view>
            </view>
          </view>
        </view>
        <view class="trends-item">
          <img
            src="https://orginone.cn/orginone/anydata/bucket/load/6q6s2qnazonfzgezdjnzrhmz2zpj_gw22kontwsx2umnxhe-2hof-hi6lomjys9znewtsyhdzpobxxiylun6xgu6dfmh"
            alt=""
          />
          <view class="trends-right">
            <view class="tr-title">标题</view>
            <view class="tr-tag">
              <view class="tag-item">我是标签</view>
              <view class="tag-item">我是标签</view>
            </view>
            <view class="tr-content"
              >内容摘要内容摘要内容摘要内容摘要内容摘要内容摘要内容摘要内容摘要内容摘要</view
            >
            <view class="tr-foot">
              <view class="look-more">查看详情</view>
              <view class="tr-time">xxxxxxx</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showType: "群动态",
    };
  },
  components: {},
  onShow() {

  },
  async onLoad(options) {
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>

.swiper .li {
  margin: 0 20rpx;
}
.swiper .li img {
  width: 100%;
  border-radius: 8rpx;
}
.group-box {
  margin: 20rpx;
  border: 1px solid #eee;
  border-radius: 16rpx;
  padding: 20rpx;
  font-size: 32rpx;
  .main-box {
    .main-head {
      display: flex;
      justify-content: space-between;
      .main-title {
        font-weight: bold;
      }
      .main-more {
        font-size: 28rpx;
        display: flex;
        align-items: center;
        img {
          margin-left: 10rpx;
          width: 36rpx;
          height: 36rpx;
        }
      }
    }
  }
  .main-list {
    display: flex;
    margin-top: 20rpx;
    .main-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      img {
        border-radius: 10rpx;
        width: 84rpx;
        height: 84rpx;
      }
    }
  }
}
.trends-box {
  padding: 20rpx;
  .main-head {
    display: flex;
    justify-content: space-between;
    .main-title {
      border-left: 4rpx solid #154ab8;
      padding-left: 20rpx;
      font-weight: bold;
    }
    .main-more {
      font-size: 28rpx;
      display: flex;
      align-items: center;
      img {
        margin-left: 10rpx;
        width: 36rpx;
        height: 36rpx;
      }
    }
  }
  .trends-list {
    margin-top: 20rpx;
    .trends-item {
      padding: 20rpx;
      border-radius: 12rpx;
      border-bottom: 1px solid #eee;
      display: flex;
      margin-bottom: 20rpx;
      img {
        width: 300rpx;
        height: 250rpx;
        border-radius: 16rpx;
      }
      .trends-right {
        width: calc(100% - 200rpx);
        padding: 0 20rpx;
        .tr-title {
          font-size: 32rpx;
        }
        .tr-tag {
          margin: 12rpx 0;
          display: flex;
          .tag-item {
            margin-right: 20rpx;
            padding: 2rpx 14rpx;
            border-radius: 32rpx;
            font-size: 28rpx;
            background: #154ab8;
            color: #fff;
          }
        }
        .tr-content {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #154ab8;
        }
        .tr-foot {
          margin-top: 10rpx;
          display: flex;
          justify-content: space-between;
          font-size: 28rpx;
          .look-more {
            border: 1px solid #154ab8;
            color: #154ab8;
            border-radius: 32rpx;
            padding: 0 10rpx;
          }
          .tr-time {
            color: #666;
          }
        }
      }
    }
  }
}
</style>
