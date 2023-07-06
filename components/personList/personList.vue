<template>
  <view class="listArea">
    <view class="total" v-if="title">{{ title }}</view>
    <view class="itemArea">
      <view
        class="listItem"
        v-for="(item, index) in listInfo"
        :key="index"
        @tap="turnDetailPage(item)"
      >
        <view class="box"></view>
        <view class="name">{{ item.label }}</view>
        <view class="right">
          <!-- <img src="../../static/base/chat.png" alt="" v-if="chat"> -->
          <!-- <img :src="'../../static/base/add.png'" alt=""  v-if="icon.includes('add')" > -->
          <view class="dotPlus" @click.stop="showTips($event, item)">
            <img
              :src="'../../static/base/dotPlus.png'"
              alt=""
              v-if="icon.includes('dotPlus')"
            />
          </view>
          <img
            src="../../static/base/right.png"
            alt=""
            v-if="icon.includes('right')"
          />
        </view>
      </view>
    </view>
    <view class="show-tips" v-if="show" @click="show = false">
      <view class="show-box">
        <view class="show-list">
          <view class="show-item" @click="showadd()">新建群组</view>
          <view class="show-item" @click="showadd()">查看信息</view>
          <view class="show-item" @click="showadd()">上传文件</view>
          <view class="show-item" @click="jumpqrCode()">分享二维码</view>
        </view>
      </view>
    </view>
    <formBox
      :show="isShow2"
      :mode="mode"
      :itemKey="itemKey"
      @uploadPop="uploadPop"
    />
  </view>
</template>

<script>
import formBox from "./box/form.vue";
import { mapMutations } from "vuex";
import * as config from "../../pages/setting/config/menuOperate";
export default {
  name: "personList",
  components: {
    formBox,
  },
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
      leftNum: 0,
      topNum: 0,
      show: false,
      isShow2: false,
      itemKey: "",
      mode: "",
      belongId: "",
      dataList: ["选项1", "选项2", "选项3", "选项4"],
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
    ...mapMutations(["pushSetting"]),
    flattenArray(arr) {
      let result = [];
      arr.forEach((item) => {
        result.push(item);
        if (item.children && item.children.length > 0) {
          const children = flattenArray(item.children);
          result = result.concat(children);
        }
      });

      return result;
    },
    showadd(item) {
      this.isShow2 = true;
    },
    async jumpqrCode() {
      let res = await config.loadSettingMenu();
      let itemx = this.searchObjectByKey(res.children, "key", this.itemKey);
      this.belongId = itemx.item.belongId;
      console.log('itemx',itemx)
      uni.navigateTo({
        url:
          "/pages/setting/qrcode/index?id=" +
          itemx.item.belongId +
          "&name=" +
          itemx.label,
      });
    },
    uploadPop() {
      this.isShow2 = false;
    },
    async showTips(e, item) {
      this.itemKey = item.key;
      this.show = true;
      this.leftNum = e.detail.x;
      this.topNum = e.detail.y;
    },
    searchObjectByKey(obj, key, value) {
      if (key === "icon") {
        obj[key] = "";
      }
      let queue = [obj];
      while (queue.length > 0) {
        let currentObj = queue.shift();
        if (currentObj.hasOwnProperty(key) && currentObj[key] === value) {
          return currentObj;
        }
        for (let prop in currentObj) {
          if (
            currentObj.hasOwnProperty(prop) &&
            typeof currentObj[prop] === "object"
          ) {
            queue.push(currentObj[prop]);
          }
        }
      }
      return null;
    },
    turnDetailPage(item) {
      this.pushSetting({ name: item.label });
      if (item.url) {
        uni.navigateTo({
          url: item.url + "?data=" + item.key,
        });
      } else {
        uni.navigateTo({
          url: "/pages/setting/group/index" + "?data=" + item.key,
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
  .show-tips {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background: rgba($color: #fff, $alpha: 0.1);
    .show-box {
      position: absolute;
      right: 110upx;
      top: 70upx;
      width: 240upx;
      .show-list {
        width: 240upx;
        background: #fff;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        border-radius: 5upx;
        padding: 20upx 0;
        .show-item {
          padding: 10upx 25upx;
          height: 65upx;
          font-size: 32upx;
        }
      }
    }
  }
}
</style>
