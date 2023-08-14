<template>
  <view class="baseLayout">
    <view class="header">
      <!-- 文字内容 -->
      <view class="content">
        <view class="append" v-for="(item, index) in localListPlus" :key="index">
          <!-- 连接点 -->
          <view
            class="dot"
            :style="{ color:'#000000'}"
            v-if="index"
          >
            .
          </view>
          <!-- 默认文字颜色 -->
          <view v-if="index !== localListPlus.length - 1">
            <view
              class="main"
              :style="{ color: '#000000' }"
              @click="turnHeadPage(index)"
            >
              {{ item }}
            </view>
          </view>
          <!-- 末尾文字颜色 -->
          <view v-if="index == localListPlus.length - 1">
            <view
              class="main"
              @click="turnHeadPage(index)"
              :style="{ color:'#3d5ed1' }"
            >
              {{ item }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "headbar",
  props: {
    localList: {
      defalut: "",
    }, //面包屑静态路径
    right: {
      default: false,
    }, //右侧标签展示
    last: {
      default: false,
    }, //文字末位蓝色展示
    url: {
      default: "back",
    }, //图标跳转链接
    basic: {
      default: "",
    }, //面包屑基础路径
  },
  computed: {
    ...mapState(['setting'])
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
     ...mapMutations(['setSetting']),
    //跳转面包屑页面
    turnHeadPage(index) {
      // let arr = []
      // for(let i = 0; i <= index;i++){
      //   arr.push(this.setting[i])
      // }
      // this.setSetting(arr);
      // if(this.localListPlus.length  == 1){
      //   uni.navigateBack({
      //     delta: this.localListPlus.length ,
      //   });
      // }else{
      //   uni.navigateBack({
      //     delta: this.localListPlus.length - index -1,
      //   });
      // }
      
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
      let arr = [];
       console.log(this.setting)
      this.setting.forEach((item, index) => {
        arr.push(item.name)
      });
      this.localListPlus = arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.baseLayout {
  width: 100%;
}

.header {
  width: 100%;
  display: flex;
  padding: 10upx 10upx;
  height: 80upx;
  box-sizing: border-box;
  align-items: center;
  background-color: #fff;
  position: relative;
  z-index: 999;

  .menu {
    padding-left: 20upx;

    img {
      height: 48upx;
      width: 48upx;
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
    color: #333;
    font-size: 26upx;
    align-items: center;
    white-space: nowrap;
    overflow-x: auto;
    text-overflow: ellipsis;
    &::-webkit-scrollbar{
      display: none;
    }

    .dot {
      margin: 0 15upx;
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
    align-items: center;

   
    img {
      height: 52upx;
      width: 52upx;
      margin: 0 15upx;
    }

    .add{
      img{
        height: 36upx;
      width: 36upx;
      }
    }

    .more{
      img{
        height: 52upx;
      width: 52upx;
      }
    }

   
  }
}
</style>
