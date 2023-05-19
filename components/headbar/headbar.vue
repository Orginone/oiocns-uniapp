<template>
  <view class="baseLayout">
    <view class="header">
      <!-- 返回 -->
      <!-- <view class="back" @tap="back()" v-if="left=='back'">
				<img :src="'../../static/base/back.png'" alt="" >
			</view> -->
      <!-- 更多 -->
      <view class="more" v-if="left == 'more'" @tap="turnUrl()">
        <img :src="'../../static/base/more.png'" alt="" />
      </view>
      <!-- 文字内容 -->
      <view class="content">
        <view
          class="append"
          v-for="(item, index) in localListPlus"
          :key="index"
        >
          <!-- 连接点 -->
          <view
            class="dot"
            :style="{ color: color ? '#000000' : '#9A9A9A' }"
            v-if="index"
          >
            .
          </view>
          <!-- 文字颜色 -->
          <view v-if="index !== localListPlus.length - 1">
            <view
              class="main"
              :style="{ color: color ? '#000000' : '#9A9A9A' }"
              @click="turnHeadPage(index)"
            >
              {{ item }}
            </view>
          </view>
          <!-- 末尾文字颜色 -->
          <view v-if="index == localListPlus.length - 1 && !last">
            <view
              class="main"
              :style="{ color: color ? '#000000' : '#9A9A9A' }"
            >
              {{ item }}
            </view>
          </view>
          <view v-if="index == localListPlus.length - 1 && last">
            <view class="main">
              {{ item }}
            </view>
          </view>
        </view>
      </view>
      <!-- 右侧标签 -->
      <view class="right">
        <view class="search">
          <img src="../../static/base/search2.png" alt="" />
        </view>
        <view class="add" v-if="right">
          <img src="../../static/base/add.png" alt="" />
        </view>
        <view class="dotPlus" v-if="right">
          <img src="../../static/base/dotPlus.png" alt="" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "headbar",
  props: {
    localList: {
      defalut: "",
    }, //面包屑静态路径
    color: {
      default: false,
    }, //是否为深色
    left: {
      default: "back",
    }, //左侧标签
    right: {
      default: false,
    }, //右侧标签展示
    last: {
      default: false,
    }, //文字末位蓝色展示
    url: {
      default: "",
    }, //图标跳转链接
    basic: {
      default: "",
    }, //面包屑基础路径
  },
  data() {
    return {
      localListPlus: [], //面包屑数组
    };
  },
  mounted() {
    this.loadHeader();
  },
  methods: {
    //跳转面包屑页面
    turnHeadPage(index) {
      uni.navigateBack({
        delta: this.localListPlus.length - index - 1,
      });
    },
    // 跳转路由
    turnUrl() {
      if (this.url == "back") {
        return uni.navigateBack();
      } else {
        let arr = this.url.split("/");
        if (arr.length == 4) {
          uni.switchTab({
            url: this.url,
          });
        } else {
          uni.navigateTo({
            url: this.url,
          });
        }
      }
    },
    // 返回上一页
    back() {
      uni.navigateBack();
    },
    //加载处理面包屑
    loadHeader() {
      if (this.localList) {
        return (this.localListPlus = this.localList.split(","));
      }
      let comps = getCurrentPages();
      let arr = [];
      comps.forEach((item, index) => {
        //访问历史前两级固定不带参数不用判断，若携带basic,手动添加面包屑路径
        if(index <= 1  && this.basic !== "") {
          arr = [this.basic]
        }
		// 判断路径是否携带name参数，携带则添加面包屑路径
        if (index > 1) {
          let data = JSON.parse(item.options.data);
          if ("name" in data) {
            arr.push(data.name);
          }
        }
      });
      this.localListPlus = arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.baseLayout{
	width: 100%;
}
.header {
  width: 100%;
  display: flex;
  padding: 10upx 10upx;
  box-sizing: border-box;
  align-items: center;
  background-color: #fff;
  position: relative;
  z-index: 999;

  .back,
  .more {
    padding-left: 20upx;

    img {
      height: 40upx;
      width: 42upx;
    }

    transform: translateY(5upx);
  }

  .more {
    img {
      width: 46upx;
    }
  }

  .content {
    display: flex;
    margin-left: 20upx;
    color: #9a9a9a;
    font-size: 26upx;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .dot {
      margin: 0 10upx;
      transform: translateY(-20upx) scale(2);
    }

    .append {
      display: flex;

      &:last-child {
        .main {
          color: #3d5ed1;
        }
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 20upx;

    img {
      height: 40upx;
      width: 40upx;
      margin: 0 15upx;
    }

    .search {
      transform: translateY(2upx);
    }

    .dotPlus {
      img {
        width: 10upx;
        height: 42upx;
      }
    }
  }
}
</style>
