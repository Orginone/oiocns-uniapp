<template>
  <view class="listArea">
    <view class="total" v-if="title">{{ title }}</view>
    <view class="itemArea">
      <view class="listItem" v-for="(item, index) in listInfo" :key="index">
        <view class="box"></view>
        <view class="name">{{ item.label }}</view>
        <view class="right">
          <!-- <img src="../../static/base/chat.png" alt="" v-if="chat"> -->
          <!-- <img :src="'../../static/base/add.png'" alt=""  v-if="icon.includes('add')" > -->
          <view class="dotPlus" @click="showTips($event)">
            <img :src="'../../static/base/dotPlus.png'" alt=""  @tap="turnDetailPage(item)" v-if="icon.includes('dotPlus')" >
          </view>
          <img
            src="../../static/base/right.png"
            alt=""
            @tap="turnDetailPage(item)"
            v-if="icon.includes('right')"
          />
        </view>
      </view>
    </view>
    <view class="show-tips" v-if="show" @click="show=false">
      <view class="show-box">
        <view class="show-list">
            <view class="show-item">新建目录</view> 
            <view class="show-item">新建应用</view>
            <view class="show-item">新建分类</view>
            <view class="show-item">新建字典</view>
            <view class="show-item">新建属性</view>
            <view class="show-item">新建实体配置</view>
            <view class="show-item">新建事项配置</view>
            <view class="show-item">新建群组</view>
            <view class="show-item">新建单位</view>
            <view class="show-item">更新信息</view>
            <view class="show-item">上传文件</view>
            <view class="show-item">打开回话</view>
            <view class="show-item">分享二维码</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "personList",
  props: {
    listInfo: {
      default: () => {
        return [];
      },
    },
    localList: {
      default: "",
    },
    title: {
      default: "",
    },
    chat: {
      default: false,
    },
    url: {
      default: "/pages/warehouse/page2/page2",
    },
    icon: {
      default: "right",
    },
  },
  data() {
    return {
      settingData: {},
      list: [],
      leftNum:0,
      topNum:0,
      show:false,
      dataList: ['选项1', '选项2', '选项3', '选项4']
    };
  },
  // watch: {
  // 	listInfo(newVal) {
  // 		this.list = newVal;
  // 	},
  // 	deep:true
  // },
  created() {
    // this.settingData = this.$store.setting
    // let arr = []
    // this.settingData.children.forEach(element => {
    // 	let obj = {
    // 		label:element.label,
    // 		key:element.key,
    // 	}
    // 	arr.push(obj);
    // });
    // console.log('arr',arr);
    // this.list = arr;
  },
  methods: {
    showTips(e) {
      this.show = true;
      this.leftNum = e.detail.x;
      this.topNum = e.detail.y;
    },
    turnDetailPage(item) {
      if (item.url) {
       uni.navigateTo({
          url: item.url+ "?data=" + JSON.stringify(item.key),
        });
      }else{
        uni.navigateTo({
          url: "/pages/setting/group/index"+ "?data=" + JSON.stringify(item.key),
        });
      }
    },
  },
};
</script>

<style lang="scss">
.listArea {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20upx;
  box-sizing: border-box;
  margin-top: 20upx;

  .total {
    padding: 0upx 30upx;
  }

  .itemArea {
    box-sizing: border-box;

    .listItem {
      display: flex;
      padding: 16upx 30upx;
      align-items: center;
      box-sizing: border-box;

      &:active {
        background-color: #edeffc;
        border-radius: 10upx;
      }
      .box {
        width: 84upx;
        height: 84upx;
        background-color: #3d5ed1;
        margin-right: 25upx;
        border-radius: 8upx;
      }

      .name {
        font-size: 32upx;
      }

      .right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        transform: translateY(2upx);

        img {
          margin-left: 28upx;
          height: 28upx;
          width: 28upx;
        }
        .dotPlus {
          position: relative;
          padding: 5upx 10upx;
          img {
            height: 30upx;
            width: 8upx;
          }
        }
      }
    }
  }
  .show-tips{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background: rgba($color: #fff, $alpha: .1);
    .show-box{
      position: absolute;
      right: 110upx;
      top: 70upx;
      width: 240upx;
      .show-list{
        width: 240upx;
        background: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        border-radius: 5upx;
        padding: 20upx 0;
        .show-item{
            padding: 10upx 25upx;
            height: 65upx;
            font-size: 32upx;
        }
      }
    }
  }
}
</style>
