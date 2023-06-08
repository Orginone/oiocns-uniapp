<template>
  <view class="index">
    <view class="userInfo">
      <view class="userInfo_unit">
        <view class="userInfo_unit_fristName">{{
          userInfo.name?userInfo.name.substring(0, 1):''
        }}</view>
        <view class="userInfo_unit_name">{{ userInfo.name }}</view>
      </view>
      <view class="userInfo_img">
        <img :src="userInfo.userImg" alt="" srcset="" />
      </view>
    </view>
    <view class="topTab">
      <view class="topTab_box">
        <view class="topTab_item" v-for="(item, index) in tabList" :key="index" @click="tabActive=index">
          {{ item.name }}
          <view :class="tabActive==index?'topTab_item_line':''"></view>
        </view>
      </view>

      <view class="more">
        <view class="more_point"></view>
        <view class="more_point"></view>
        <view class="more_point"></view>
      </view>
    </view>
    <view class="banner">
      <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :indicator-color='color' :easing-function="'easeInOutCubic'">
        <swiper-item v-for="(item,index) in imgList" :key="index">
          <view class="swiper_item"><img :src="item" alt="" srcset=""></view>
        </swiper-item>
      </swiper>
    </view>
	  <view class="inlet">
      <linkBox></linkBox>
    </view>
    <view class="mune inlet">
      <userApp :appList="appList"></userApp>
	  </view>
  </view>
</template>

<script>
import orgCtrl from '../../ts/controller';
import { loadApps } from './config/config';
export default {
  data() {
    return {
      userInfo: {
        unit: "数据治理实验平台",
        userImg:
          "https://img.haote.com/upload/news/20190817/156601001342100.jpeg",
      },
      tabList: [
        { name: "首页" },
        { name: "工作台" },
        { name: "看板" },
        { name: "新闻" },
        { name: "共享" },
        { name: "交易" },
      ],
	    indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 500,
      imgList:['https://www.esensoft.com/data/upload/editer/image/2019/09/18/125d81ecc68bcf2.png',
      'https://www.esensoft.com/data/upload/editer/image/2019/09/18/125d81ecc68bcf2.png',
      'https://www.esensoft.com/data/upload/editer/image/2019/09/18/125d81ecc68bcf2.png'],
      color:"#fff",
      tabActive:0,
      todoList:[{name:'待办',number:''},{name:'已办',number:0},{name:'已完结',number:0},{name:'我发起的',number:0},],
      appList:[]
    };
  },
  async onLoad(options) {
    this.userInfo = uni.getStorageSync('currentUser')
    // console.log(this.userInfo,7777);
    this.loadAppList()
    let res = await orgCtrl.work.loadTodos({
      page: {offset:1,limit:999,filter:""},
      id: '0',
    });
    if(res && typeof res == 'object')this.todoList[0].number = res.length
    // let params = {
    //   id:this.userInfo.id,
    //   page:{offset:1,limit:999,filter:""},
    //   typeNames:['单位','大学','医院']
    // }
    // let res = await kernelApi.queryJoinedTargetById(params)
    // console.log(res)
    // let searchParams = {id:this.userInfo.id,page:{offset:1,limit:999,filter:""}}
    // let done =  await kernelApi.queryWorkRecord(searchParams) //查询已办
    // console.log(done,'done')
    // let todo =  await kernelApi.queryApproveTask(searchParams) //待办
    // console.log(todo,'todo')
    // // let post =  await kernelApi.queryMyWorkInstance(searchParams) //我发起的办事
    // let over =  await kernelApi.queryMyWorkInstance(searchParams) //审批通过
    // console.log(over,'over')
  },
  methods:{
    async loadAppList(){
      let arr = []
      let res = await loadApps()
      res.forEach(item => {
        item.metadata.icon = JSON.parse(item.metadata.icon)
        arr.push(item.metadata)
      })
      this.appList = arr
    }
  }
};
</script>

<style lang="scss" scope>
page {
  background: rgb(237, 239, 252);
  .index {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
	  padding-bottom: 20upx;
    .userInfo {
      width: 100%;
      padding: 20upx 32upx;
      background: #3d5ed1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .userInfo_unit {
        display: flex;
        align-items: center;
        .userInfo_unit_fristName {
          width: 62upx;
          height: 62upx;
          border-radius: 50%;
          background: #fff;
          font-size: 28upx;
          color: #3d5ed1;
          text-align: center;
          line-height: 62upx;
        }
        .userInfo_unit_name {
          font-size: 30upx;
          color: #ffffff;
          margin-left: 14upx;
        }
      }
      .userInfo_img {
        width: 62upx;
        height: 62upx;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .topTab {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #3d5ed1;
      padding: 26upx 0;
	  padding-bottom: 0;
      .more {
        padding-right: 26upx;
        .more_point {
          width: 4upx;
          height: 4upx;
          background: #ffffff;
          border-radius: 50%;
          margin-bottom: 4upx;
        }
      }
      .topTab_box {
		display: flex;
		width: 100%;
		justify-content: space-between;
      }
      .topTab_item {
        padding: 0 26upx;
        font-size: 22upx;
        color: #ffffff;
		text-align: center;
		.topTab_item_line{
			width: 36upx;
height: 4upx;
background: #FFFFFF;
opacity: 1;
margin: 0 auto;
margin-top: 13upx;
		}
      }
    }
    .banner{
      width: 100%;
      height: 300upx;
      .swiper_item{
        width: 100%;
          height: 300upx;
      img{
        width: 100%;
          height: 300upx;
      }
      }
    }
    .inlet{
      width: 100%;
      padding:  0 32upx;
      margin-top: 22upx;
    }
  }
}
</style>
