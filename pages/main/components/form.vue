<template>
  <view class="index">
    <u-popup v-model="show" mode="center" border-radius="16">
      <view class="info">
        <view class="title">
          <view class="blueBox"></view>新建
        </view>
        <view class="content">
          <u-form :model="form" ref="uForm">
            <u-form-item prop="name" class="contentInfo">
              <view class="contentName"><span class="redColor">*</span>名称</view>
              <u-input v-model="form.name" />
            </u-form-item>
            <u-form-item prop="name">
              <view class="contentName"><span class="redColor">*</span>代码</view>
              <u-input v-model="form.name" />
            </u-form-item>
            <u-form-item prop="name">
              <view class="contentName">简称</view>
              <u-input v-model="form.name" />
            </u-form-item>
            <u-form-item prop="name">
              <view class="contentName"><span class="redColor">*</span>选择制定组织</view>
              <view @click="show2 = true" class="selectBox">
                <view>群组</view>
                <img src="../../../static/base/right.png" alt="" class="rightImg"/>
              </view>
            </u-form-item>
            <u-form-item>
              <view class="contentName">标注</view>
              <u-input v-model="form.name" />
            </u-form-item>
            <u-form-item prop="name">
              <view class="contentName"><span class="redColor">*</span>备注</view>
              <u-input v-model="form.name" />
            </u-form-item>
          </u-form>
        </view>
        <view class="btns">
          <u-button :custom-style="customStyle" @click="closePop">取消</u-button>
          <u-button type="primary" :custom-style="customStyle" @click="save">确定</u-button>
        </view>
      </view>
    </u-popup>
    <u-select v-model="show2" :list="list"></u-select>
  </view>  
</template>

<script>
import orgCtrl from '@/ts/controller';
import { TargetType, companyTypes } from '@/ts/core';
export default {
  name: "formBox",
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
      form: {
				name: '',
				intro: '',
			},
			rules: {
				name: [
					{ 
						required: true, 
						message: '请输入姓名', 
						trigger: ['change','blur'],
					}
				],
				intro: [
					{
						min: 5, 
						message: '简介不能少于5个字', 
						trigger: 'change'
					}
				]
			},
      show2:false,
      list:[
        {
          value: '1',
          label: '群组'
        },
      ]
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
    async save(){
      this.closePop()
    },
    closePop(){
      this.$emit("uploadPop", 2);
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
    .content{
      padding: 10upx 20upx;
      width: 600upx;
      height: 860upx;
      overflow-y: auto;
      .contentInfo{
        border-bottom: 2upx solid #000;
      }
      .selectBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28upx;
        color: #000;
        .rightImg{
          width: 28upx;
          height: 28upx;
          display: block;
        }
      }
      .contentName{
        height: 28upx;
        line-height: 28upx;
      }
      .redColor{
        color: rgb(255, 77, 79);
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