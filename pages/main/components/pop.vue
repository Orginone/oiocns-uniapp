<template>
  <view class="index">
    <u-popup v-model="show" mode="center" border-radius="16">
      <view class="info">
        <view class="title">
          <view class="blueBox"></view>{{modalTitle}}
        </view>
        <view class="searchIpt">
          <u-input
            class="u-input"
            type="text"
            :placeholder="placeholder"
            placeholder-style="color:#999999"
            v-model="value"
            @input="input"
            :clearable="false"
          ></u-input>
          <img src="../../../static/base/search2.png" alt="" class="rightImg"/>
        </view>
        <view class="content" v-if="dataList.length>0">
          <view class="item" v-for="(item,index) in dataList" :key="index" @click="handleClick(index)" :class="{active:activeId == index}">
            <view v-if="modalTitle == '添加好友'">
              <view class="itemName">
                <span>{{item.name}}</span>
                <view class="itemCode">账号:{{item.code}}</view>
              </view>
              <view class="itemInfo">
                <view>姓名:{{item.name}}</view>
                <view>手机号:{{item.code}}</view>
              </view>
              <view class="remark">
                <view>座右铭:{{item.remark}}</view>
              </view>
            </view>
            <view v-if="modalTitle == '添加单位'">
              <view class="itemName">{{item.name}}</view>
              <view class="remark">
                <view>集团简介:{{item.remark}}</view>
              </view>
            </view>
            <view v-if="modalTitle == '添加群组'">
              <view class="itemName">{{item.name}}</view>
              <view class="remark">
                <view>群组简介:{{item.remark}}</view>
              </view>
            </view>
          </view>
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
      isShow:false,
      dataList:[],
      activeId:-1
    }
  },
  methods:{
    async input(){
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
      this.dataList = res
      console.log(res,'res')
    },
    handleClick(index){
      if(index == this.activeId){
        this.activeId = -1
      }else{
        this.activeId = index
      }
    },
    async save(){
      await orgCtrl.user.applyJoin([this.dataList[this.activeId]])
      this.closePop()
    },
    closePop(){
      this.value = ''
      this.dataList = []
      this.$emit("uploadPop", 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.index{
  width: 100%;
  height: auto;
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
    .searchIpt{
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
      .u-input{
        width: 500upx;
      }
      .rightImg{
        width: 36upx;
        height: 36upx;
        display: block;
      }
    }
    .content{
      margin: 30upx 0;
      width: 600upx;
      height: 500upx;
      overflow-y: auto;
      .item{
        width: 100%;
        height: auto;
        padding: 30upx 24upx;
        border: 2upx solid #dddddd;
        font-size: 34upx;
        border-radius: 16upx;
        color: #000;
        .itemName{
          display: flex;
          align-items: center;
          margin-bottom: 20upx;
          .itemCode{
            margin-left: 20upx;
            padding: 6upx;
            background-color: rgb(211, 234, 253);
            border: 1px solid rgb(110, 187, 247);
            border-radius: 12upx;
            font-size: 26upx;
            color: rgb(110, 187, 247);
          }
        }
        .itemInfo{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20upx;
        }
      }
      .active{
        background-color: rgb(216, 223, 246) !important;
        border:2upx solid rgb(120, 144, 223) !important
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