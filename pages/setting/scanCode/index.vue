<template>
  <view class="camera">
    <!-- <image src="/images/border.png" mode="widthFix"></image> -->
    <!-- <camera
      device-position="back"
      flash="off"
      binderror="error"
      :style="cameraStyle"
    ></camera> -->
  </view>
</template>

<script>
import { kernelApi } from "common/app";

export default {
  data() {
    return {
      isAuth: false,
      src: "",
      modalType: false, //弹框默认不显示
      imgUrl: "", //模拟图片
      cameraStyle: {
        width: "100%",
        height: "100%",
      },
    };
  },
  async onLoad() {
    const _this = this;
    let res = await uni.authorize({ scope: "scope.camera" });
    var errMsgArr = res.map(function (obj) {
      return obj?.errMsg || "";
    });

    var hasAuthorizeOk = errMsgArr.includes("authorize:ok");
    if (!hasAuthorizeOk) {
      // 用户还没有授权，向用户发起授权请求
      _this.openSetting().then((res) => {
        this.isAuth = true;
        this.scanQRCode();
      });
    } else {
      this.isAuth = true;
      this.scanQRCode();
    }
  },
  onShow() {
    // 页面显示时启动扫码定时器
  },
  onHide() {
    // 页面隐藏时清除定时器
    // this.clearScanQRCode();
  },

  methods: {
    // startScanQRCode() {
    //     // 启动定时器，每隔一段时间执行扫码操作
    //     this.timer = setInterval(() => {
    //       this.scanQRCode();
    //     }, 1000); // 每2秒自动扫码一次，你可以根据需要调整时间间隔
    // },
    // clearScanQRCode() {
    //   // 清除定时器
    //   clearInterval(this.timer);
    // },
    // 打开授权设置界面
    openSetting() {
      const _this = this;
      let promise = new Promise((resolve, reject) => {
        wx.showModal({
          title: "授权",
          content: "请先授权获取摄像头权限",
          success(res) {
            if (res.confirm) {
              wx.openSetting({
                success(res) {
                  if (res.authSetting["scope.camera"]) {
                    // 用户打开了授权开关
                    resolve(true);
                  } else {
                    // 用户没有打开授权开关， 继续打开设置页面
                    _this.openSetting().then((res) => {
                      resolve(true);
                    });
                  }
                },
                fail(res) {
                  console.log(res);
                },
              });
            } else if (res.cancel) {
              _this.openSetting().then((res) => {
                resolve(true);
              });
            }
          },
        });
      });
      return promise;
    },
    scanQRCode() {
      uni.scanCode({
        onlyFromCamera: true,
        success: async (res) => {
          // 扫码成功，处理扫描结果
          let content = res.result;
          var lastSlashIndex = content.lastIndexOf("/");
          if (lastSlashIndex !== -1) {
            var numberString = content.slice(lastSlashIndex + 1);
            let userInfo =JSON.parse(uni.getStorageSync('currentUser'));
            let res = await kernelApi.applyJoinTeam({
              id: numberString,
              subId: userInfo.id,
            });
            console.log('res',res);
            if(res){
               uni.showToast({
                title: res.msg,
                icon: "none",
              });
            }
          } else {
            console.log("未找到斜杠");
          }
          // this.clearScanQRCode();
        },
        fail: (err) => {
          // 扫码失败，处理错误
          console.error(err);

          // 可以向用户展示扫码失败的提示信息
          uni.showToast({
            title: "扫码失败",
            icon: "none",
          });
          // this.clearScanQRCode();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  width: 500upx;
  height: 500upx;
  margin: 0 auto;
  margin-top: 200upx;
}
.name-text {
  margin-top: 30upx;
  font-size: 36upx;
  color: #333;
  text-align: center;
}
</style>
