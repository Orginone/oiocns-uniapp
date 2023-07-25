<template>
  <view class="listArea">
    <view class="itemArea">
      <view
        class="listItem"
        v-for="(item, index) in fileList"
        :key="index"
        @click="downloadFile(item.name, item.id)"
      >
        <div class="box-wrap">
          <div
            v-if="item.thumbnail"
            class="box"
            :style="{ 'background-image': 'url(' + item.thumbnail + ')' }"
          />
          <img v-else class="box" src="../../static/base/app-store-ios.png" />
        </div>
        <view class="name">{{ item.name }}</view>
        <view class="right"> </view>
      </view>
    </view>
    <view class="itemArea" v-if="showList">
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
    <view
      class="show-tips"
      v-if="show"
      :style="{ top: topNum + 50 + 'rpx' }"
      @click="show = false"
    >
      <view class="show-box">
        <view class="show-list">
          <view class="show-item" @click="showadd()">新建群组</view>
          <view class="show-item" @click="showdetail()">查看信息</view>
          <view class="show-item" @click="showadd()">上传文件</view>
          <view class="show-item" @click="jumpqrCode()">分享二维码</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapMutations } from "vuex";
import * as config from "../../pages/setting/config/menuOperate";
export default {
  name: "storeList",
  props: {
    listInfo: {
      default: () => {
        return [];
      },
    },
    fileList: {
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
      shows: false,
      topNum: 0,
      showList: false,
      listInfos: this.listInfo,
      show: false,
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
  onShow() {
    var localImgUrl = this.data.localImgUrl;
    if (localImgUrl) {
      var fs = wx.getFileSystemManager();
      fs.unlinkSync(localImgUrl);
      fs.closeSync();
    }
  },
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
          const children = flattenArray(item.childrean);
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
    async lookImg(url) {
      console.log("查看图片", "https://orginone.cn/" + url);
      uni.previewImage({
        urls: ["https://orginone.cn/" + url],
        current: "https://orginone.cn/" + url,
        success() {
          // 预览成功后的操作
        },
        fail(error) {
          // 预览失败后的操作
        },
      });
    },
    downloadFile(name, url) {
      const fileExt = name.match(/\.([^/.]+)$/)[1].toLowerCase(); // 获取文件的扩展名
      if (
        fileExt === "jpg" ||
        fileExt === "png" ||
        fileExt === "jpeg" ||
        fileExt === "webp"
      ) {
        this.lookImg(url);
        return;
      }
      if (fileExt === "docx" || fileExt === "xlsx") {
        uni.downloadFile({
          url: "https://orginone.cn/" + url,
          success(res) {
            if (res.statusCode === 200) {
              const filePath = res.tempFilePath; // 下载成功后的临时文件路径
              console.log("临时地址", filePath);
              uni.openDocument({
                filePath: filePath, //指定文件名
                showMenu: true,
                success: function (res) {
                  console.log("打开文档成功");
                },
              });
            }
          },
          fail(error) {
            console.error("文件下载失败", error);
          },
        });
      } else {
         wx.setClipboardData({
          data: "https://orginone.cn/" + url,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                wx.showToast({
                  title: '链接已复制,请在浏览器中打开'
                })
              }
            })
          }
        })
      }
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
      uni.navigateTo({
        url: "/pages/store/list/index" + "?data=" + item.key,
      });
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
      .box-wrap {
        width: 72upx;
        height: 72upx;
        margin-right: 25upx;
        border-radius: 8upx;
        overflow: hidden;
        .box {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          // background: #9499da;
        }
      }
      .box {
        width: 72upx;
        height: 72upx;
        margin-right: 25upx;
        border-radius: 8upx;
        object-fit: cover;
        // background: #9499da;
      }

      .name {
        font-size: 32upx;
        max-width: 500upx;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
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
