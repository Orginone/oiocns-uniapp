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
              <u-input v-model="form.code" />
            </u-form-item>
            <u-form-item prop="name">
              <view class="contentName">简称</view>
              <u-input v-model="form.teamName" />
            </u-form-item>
            <u-form-item prop="typeName">
              <view class="contentName"><span class="redColor">*</span>选择制定组织</view>
              <view @click="show2 = true" class="selectBox">
                <view>{{form.typeName}}</view>
                <img src="../../../static/base/right.png" alt="" class="rightImg"/>
              </view>
            </u-form-item>
            <u-form-item>
              <view class="contentName">标识</view>
              <u-input v-model="form.teamCode" />
            </u-form-item>
            <u-form-item prop="name">
              <view class="contentName"><span class="redColor">*</span>备注</view>
              <u-input v-model="form.remark" />
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
import * as config from "../../../pages/setting/config/menuOperate";
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
    itemKey:{
      default:""
    }
  },
  watch:{
    mode(newValue){
      if(newValue){
        switch (newValue) {
          case 'newCohort':
            this.form.typeName = '群组';
            this.list = [
              {
                label: '群组'
              },
            ]
            break;
          case 'newCompany':
            this.form.typeName = '单位';
            this.list = [
              {
                label: '单位'
              },
            ]
            break;
        }
      }
    },
    itemKey(newVal){
      this.newItemKey = newVal
    }
  },
  data(){
    return{
      customStyle: {
				width:'145px'
			},
      form: {
				name: '',
				code: '',
        typeName:'群组',
        teamName:'',
        teamCode:'',
        remark:'',
        newItemKey:'',
        belongId:this.belongId
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
          label: '群组'
        },
      ]
    }
  },
  methods:{
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
    async save(){
      let res = await config.loadSettingMenu();
      let itemx = this.searchObjectByKey(res.children, "key", this.newItemKey);
      console.log('itemx',itemx);
      this.belongId = itemx.item.belongId;
      this.form.belongId = itemx.item.belongId;
      let rex = await itemx.item.target.createTarget(this.form)
      if(rex != undefined){
        uni.showToast({
          title: '添加成功~',
          icon: 'none',
          duration: 2000
        })
      }else{
        uni.showToast({
          title: '添加失败~',
          icon: 'none',
          duration: 2000
        })
      }
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