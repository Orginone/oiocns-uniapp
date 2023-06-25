<template>
  <view class="index">
    <u-popup v-model="show" mode="center" border-radius="16">
      <view class="info">
        <view class="title">
          <view class="blueBox"></view>{{modalTitle}}
        </view>
        <view class="content">
          <u-input
            type="text"
            :placeholder="placeholder"
            placeholder-style="color:#999999"
            v-model="value"
          ></u-input>
          <img src="../../../static/base/search2.png" alt="" class="rightImg" @click="search" />
        </view>
        <view class="btns">
          <u-button :custom-style="customStyle" @click="closePop">取消</u-button>
          <u-button type="primary" :custom-style="customStyle" @click="save">确定</u-button>
        </view>
      </view>
    </u-popup>
  </view>  
</template>

<script>
import orgCtrl from '@/ts/controller';
import { TargetType, companyTypes } from '@/ts/core';
export default {
  name: "popBox",
  props: {
    show: {
      default:()=>{
        return false
      }
    },
    mode:{
      default:''
    },
  },
  watch:{
    mode(newValue){
      if(newValue){
        switch (newValue) {
          case 'joinFriend':
            this.modalTitle = '添加好友';
            this.placeholder = '请输入用户的账号'
            break;
          case 'joinCohort':
            this.modalTitle = '添加群组';
            this.placeholder = '请输入群组的编码'
            break;
          case 'joinCompany':
            this.modalTitle = '添加单位';
            this.placeholder = '请输入单位的社会统一代码'
            break;
          case 'joinGroup':
            this.modalTitle = '申请加入集团';
            break;
        }
      }
    }
  },
  data(){
    return{
      customStyle: {
				width:'145px'
			},
      value:'',
      modalTitle:'',
      placeholder:'',
      isShow:false
    }
  },
  methods:{
    async search(){
      let res = []
      switch(this.mode){
        case 'joinFriend' :
          res = await orgCtrl.user.searchTargets(this.value, [TargetType.Person])
          break;
        case 'joinCohort' :
          res = await orgCtrl.user.searchTargets(this.value, [TargetType.Cohort])
          break;
        case 'joinCompany' :
          res = await orgCtrl.user.searchTargets(this.value, companyTypes)
      }
      console.log(res,'res')
    },
    save(){
      this.closePop()
    },
    closePop(){
      this.$emit("uploadPop", false);
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
      background-color: rgb(232, 244, 254);
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