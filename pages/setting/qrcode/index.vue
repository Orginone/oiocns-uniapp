<template>
  <view class="BaseLayout">
    <view class="canvas">
      <!-- 二维码插件 width height设置宽高 -->
      <canvas
        canvas-id="qrcode"
        :style="{ width: `${qrcodeSize}px`, height: `${qrcodeSize}px` }"
      />
      <div class="name-text">{{qrcodeName}}</div>
    </view>
  </view>
</template>

<script>
import uQRCode from "./uqrcode.js";

export default {
  data() {
    return {
      menu: [],
      // 二维码标识串
      qrcodeText: "eoruw20230528",
      // 二维码尺寸
      qrcodeSize: 250,

      // 最终生成的二维码图片
      qrcodeSrc: "",
    qrcodeName:"",
      myFormatData: {
        yyh: "eoruw20230528",
        bsdmc: "窗口1",
        Yylxmc: "租金缴纳",
        yyrq: "预约日期",
      },
    };
  },
  watch: {},
  onLoad(option) {
    console.log(option);
    this.qrcodeText = 'https://orginone.cn/'+option.id
    this.qrcodeName = option.name
    uni.showLoading({
      title: "二维码生成中",
      mask: true,
    });

    uQRCode.make({
      canvasId: "qrcode",
      text: this.qrcodeText,
      size: this.qrcodeSize,
      margin: 10,
      success: (res) => {
        this.qrcodeSrc = res;
        console.log("qrcodeSrc = " + this.qrcodeSrc);
      },
      complete: () => {
        uni.hideLoading();
      },
    });
  },
  onShow() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.canvas{
    width: 500upx;
    height: 500upx;
    margin:0 auto;
    margin-top: 200upx;
}
.name-text{
    margin-top: 30upx;
    font-size: 36upx;
    color: #333;
    text-align: center;
}
</style>
