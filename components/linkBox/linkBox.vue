<template>
	<view class="baseLayout">
		<view class="title">常用</view>
        <scroll-view class="box" scroll-x="true"  >
		    <view class="item" :class="activeId == index?'active':''" v-for="(item,index) in linkList" :key="index" @click="handleShow(item,index)">
                <view class="item_btn">+</view>
                <view class="item_name">{{item.name}}</view>
            </view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "linkBox",
		data() {
			return {
              linkList:[{name:'定标准'},{name:'加好友',value:'joinFriend'},{name:'建群组'},{name:'加群组',value:'joinCohort'},{name:'建单位'},{name:'加单位',value:'joinCompany'}],
              activeId:''
			};
		},
        methods: {
            // jumpDetail(index){
            //     console.log('inde',index)
            //     if(index == 3){
            //         uni.navigateTo({ url: '/pages/setting/group/addGroup'})
            //     }
            // }
            handleShow(item,index){
                this.activeId = index
                if(index == 0){
                    uni.switchTab({
                        url: '/pages/setting/index'
                    })
                }else{
                    this.$emit('handle',item)
                }
            }
        },
	}
</script>

<style lang="scss" scope>
	.title {
		padding-left: 8upx;
		font-size: 28upx;
		color: #000;
		margin-bottom: 16upx;
	}
    .box{
        width: 100%;
        height: 100%;
        white-space: nowrap;
        .item{
            display: inline-block;
            width: 116upx;
            height: 136upx;
            border-radius: 16upx;
            background: rgba(223,224,239,.8);
            margin-right:20rpx ;
            .item_btn{
                font-size: 70upx;
                color: rgba(57,109,178,1);
                text-align: center;
                margin-top: 0rpx;
                margin-bottom: 0rpx
            }
            .item_name{
                font-size: 22upx; 
                text-align: center;
                color: rgba(57,109,178,1);
            }
        }
    }
    .active{
        background-color: rgb(33, 150, 243);
    }
</style>