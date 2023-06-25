<template>
  <view class="index">
    <u-popup v-model="show" mode="center" border-radius="16">
      <view class="info">
        <view class="title">
          <view class="blueBox"></view>添加好友
        </view>
        <view class="content">
          <u-input
            type="text"
            placeholder="请输入用户的账号"
            placeholder-style="color:#999999"
            v-model="userInfo.password"
          ></u-input>
          <img src="../../../static/base/search2.png" alt="" class="rightImg"/>
        </view>
        <view class="btns">
          <u-button :custom-style="customStyle">取消</u-button>
          <u-button type="primary" :custom-style="customStyle">确定</u-button>
        </view>
      </view>
    </u-popup>
  </view>  
</template>

<script>
export default {
  name: "popBox",
  props: {
    show: {
      default:()=>{
        return false
      }
    }
  },
  data(){
    return{
      customStyle: {
				width:'145px'
			}
    }
  }
}
</script>

<style lang="scss" scoped>
.index{
  width: 100%;
  height: 100vh;
  .info{
    padding: 20upx;
    .title{
      display: flex;
      align-items: center;
      font-size: 28upx;
      padding: 0 20upx;
      .blueBox{
        width: 8upx;
        height: 30upx;
        background-color: #3d5ed1;
        margin-right: 26upx;
      }
    }
    .content{
      margin: 30upx 0;
      width: 600upx;
      height: 80upx;
      border-radius: 12upx;
      background-color: #c8e2ff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20upx;
      font-size: 32upx;
      .rightImg{
        width: 36upx;
        height: 36upx;
        display: block;
      }
    }
    .btns{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>