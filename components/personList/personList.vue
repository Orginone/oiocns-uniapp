<template>
  <view class="listArea">
    <view class="total" v-if="title">{{ title }}</view>
    <view class="itemArea">
      <view
        class="listItem"
        v-for="(item, index) in listInfos"
        :key="index"
        @tap="turnDetailPage(item)"
      >
        <img class="box" :src="'' + item.icon + ''" />
        <view class="name">{{ item.label }}</view>
        <view class="right">
          <!-- <img src="../../static/base/chat.png" alt="" v-if="chat"> -->
          <!-- <img :src="'../../static/base/add.png'" alt=""  v-if="icon.includes('add')" > -->
          <!-- <view class="dotPlus" @click.stop="showTips($event, item)">
            <img
              :src="'../../static/base/dotPlus.png'"
              alt=""
              v-if="icon.includes('dotPlus')"
            />
          </view> -->
          <img
            src="../../static/base/right.png"
            alt=""
            v-if="icon.includes('right')"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import formBox from "./box/form.vue";
import formdetail from "./box/detail.vue";

import { mapMutations } from "vuex";
import * as config from "../../pages/setting/config/menuOperate";
export default {
  name: "personList",
  components: {
    formBox,
    formdetail,
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
    listType: {
      default: "",
    },
  },
  data() {
    return {
      settingData: {},
      list: [],
      leftNum: 0,
      topNum: 0,
      show: false,
      listInfos: this.listInfo,
      isShow2: false,
      isShow3: false,
      itemKey: "",
      mode: "",
      belongId: "",
      dataList: ["选项1", "选项2", "选项3", "选项4"],
    };
  },
  watch: {
    listInfo(newVal) {
      this.listInfos = newVal;
      
      this.listInfos.forEach((element) => {
        if (!element.icon) {
          this.getIcon(element.key, element.itemType);
        }
      });
    },
    deep: true,
  },
  // watch: {
  // 	listType(newVal) {
  //     console.log(newV)
  // 		this.showList = newVal;
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
    getIcon(key, itemType) {
      this.listInfos.forEach((element, index) => {
        if (element.key == key) {
          console.log("itemType", itemType);
          if (itemType == "目录") {
            this.listInfos[index].icon = "../../static/base/folder-fill.png";
          } else if (itemType == "单位") {
            this.listInfos[index].icon = "../../static/base/office.png";
          } else if (itemType == "人员") {
            this.listInfos[index].icon = "../../static/base/user-tie.png";
          } else if (itemType == "群组") {
            this.listInfos[index].icon = "../../static/base/chat.png";
          } else {
            this.listInfos[index].icon = "";
          }
        }
      });
      this.showList = true;
    },
    showadd(item) {
      this.isShow2 = true;
    },
    showdetail() {
      this.isShow3 = true;
    },
    async jumpqrCode() {
      let res = await config.loadSettingMenu();
      let itemx = this.searchObjectByKey(res.children, "key", this.itemKey);
      this.belongId = itemx.item.belongId;
      console.log("itemx", itemx);
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
      this.isShow3 = false;
    },
    async showTips(e, item) {
      this.itemKey = item.key;
      this.show = true;
      this.leftNum = e.detail.x;
      this.topNum = e.detail.y;
      console.log(this.topNum);
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
      border-bottom: 1px solid #eee;
      &:active {
        background-color: #edeffc;
        border-radius: 10upx;
      }
      .box {
        width: 72upx;
        height: 72upx;
        margin-right: 25upx;
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
