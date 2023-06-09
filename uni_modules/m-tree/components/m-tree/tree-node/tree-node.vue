<template>
	<view class="tree-item">
        <view class="head h-flex">
            <view class="head-1 flex-1" @click="changeShow" @longpress="longPress" @touchstart="handletouchstart" @touchend="handletouchend">
                <image src="../../../static/down-rect.png" :class="show ? 'rt45' : ''" mode="scaleToFill" class="left-icon" 
                    v-if="item[defaultProps.children] && item[defaultProps.children].length > 0"></image>
                <text class="txt">{{item[defaultProps.label]}}</text>
            </view>
            <view v-if="edit" class="right p-t-20 p-r-30">
                <!-- <img class='dotPlus' src="@/static/base/dotPlus.png" alt=""   > -->
                <img src="@/static/base/right.png" alt="" @tap="link(item)" >
            </view>
        </view>
        <view class="content" 
            v-if="item[defaultProps.children] && item[defaultProps.children].length > 0"
            v-show="show"
            :key="item.id">
            <view v-if="divider" class="divider"></view>
            <tree-node v-for="(sitem, sindex) in item[defaultProps.children]" 
                :items="item[defaultProps.children]"
                :item="sitem"
                :index="sindex"
                :key="sitem[defaultProps.id]" :defaultProps="defaultProps"></tree-node>
        </view>
	</view>
</template>

<script>
	import TreeNode from './tree-node.vue';
	export default {
		name: 'TreeNode',
		componentName: 'TreeNode',
		components:{
			TreeNode
		},
		props: {
			items: {
				type: Array,
				default: () => {
					return []
				}
			},
			index: {
				type: Number,
				default: () => {
					return -1
				}
			},
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			unfold: {
				type: Boolean,
				default: false
			}
		},
		inject: [
            'unfold',
            'defaultProps',
            'divider', 
            'edit', 
            'onClickItem', 
            'upItem', 
            'downItem', 
            'addItem', 
            'editItem', 
            'deleteItem', 
            'fingerAction',
            'onlongPress'],
		data() {
			return {
                startX: 0,
                startY: 0,
                startTime: null,
                endX: 0,
                endY: 0,
				show: this.unfold,
                defaultProps: this.defaultProps,
                divider: this.divider,
                edit: this.edit,
                onClickItem: this.onClickItem,
                upItem: this.upItem,
                downItem: this.downItem,
                addItem: this.addItem,
                editItem: this.editItem,
                deleteItem: this.deleteItem,
                fingerAction: this.fingerAction,
                onlongPress: this.onlongPress
			}
		},
		methods: {
            link(item){
                console.log('link',item)
                if(item){
                    if(item.itemType == '部门'){
						uni.navigateTo({
							url: '/pages/setting/agency/agency'+'?data=' + JSON.stringify(item.key) + '&type=' + JSON.stringify(item.itemType)
						})
					}else{
                        uni.navigateTo({
                            url: '/pages/setting/baseForm/index'+'?data=' +item.key + '&type='+item.itemType
                        })
                    }
                }
            },
			changeShow() {
				this.onClickItem(this.item);
				if (this.item[this.defaultProps.children] && this.item[this.defaultProps.children].length > 0) {
					this.show = !this.show;
				}
			},
            longPress() {
                if(this.edit){
                    this.onlongPress(this.item);
                }
            },
            checkupitem() {
                let existItem = this.items.find(element=>element.id===this.item.id);
                if (existItem) {
                    // console.log('tree-node existItem:', existItem);
                    this.upItem({item: this.item, items: this.items, index: this.index});
                };
            },
            checkdownitem() {
                let existItem = this.items.find(element=>element.id===this.item.id);
                if (existItem) {
                    // console.log('tree-node existItem:', existItem);
                    this.downItem({item: this.item, items: this.items, index: this.index});
                };
            },
            checkadditem() {
                //console.log('check add id:', {id: id});
                this.addItem(this.item);
            },
            checkedititem() {
                //console.log('check add id:', {id: id});
                this.editItem(this.item);
            },
            checkdeleteitem() {
                //console.log('check delete id:', {id: id});
                this.deleteItem({id: this.item.id});
            },
            handletouchstart(event) {
                this.startX = event.changedTouches[0].clientX;
                this.startY = event.changedTouches[0].clientY;
                this.startTime = Date.now();
            },
            handletouchend(event) {
                this.endX = event.changedTouches[0].clientX;
                this.endY = event.changedTouches[0].clientY;
                this.getSlideDirction(this.startX, this.startY, this.endX, this.endY, this.startTime);
            },
            /* 获取滑动直线与水平线的夹角 */
            getLineAngle(x1, y1, x2, y2) {
                var x = x1 - x2,
                y = y1 - y2;
                if (!x && !y) {
                    return 0;
                }
                var angle = (180 + Math.atan2(-y, -x) * 180 / Math.PI + 360) % 360;
                return 360 - angle;
            },
            /* 判断滑动方向（上，下，左，右）*/
            getSlideDirction(startX, startY, endX, endY, startTime) {
                const subX = endX - startX;
                const subY = endY - startY;
                let noeTime = Date.now() - startTime;
                // console.log('滑动用时：', noeTime);
                let lineAngle = this.getLineAngle(startX, startY, endX, endY);
                let fingerAction = 0; 
                // console.log('角度：', lineAngle);
                // console.log('subX：', subX);
                // console.log('subY：', subY);
                if(noeTime > 50 && noeTime < 1000) {
                    if(subY > -280 && subY < - 50 && lineAngle > 250 && lineAngle < 290) {
                        /* 上滑 */
                        console.log('上滑');
                        this.fingerAction({item: this.item, items: this.items, index: this.index, action: 1});
                    }
                    if(subY < 280 && subY > 50 && lineAngle > 70 && lineAngle < 110) {
                        /* 下滑 */
                        console.log('下滑');
                        this.fingerAction({item: this.item, items: this.items, index: this.index, action: 2});
                    }
                    if(subX > - 280 && subX < - 50 && (lineAngle > 350 || lineAngle < 10)) {
                        /* 左滑 */
                        console.log('左滑');
                        this.fingerAction({item: this.item, items: this.items, index: this.index, action: 3});
                    }
                    if(subX < 280 && subX > 50 && lineAngle > 170 && lineAngle < 190) {
                        /* 右滑 */
                        console.log('右滑');
                        this.fingerAction({item: this.item, items: this.items, index: this.index, action: 4});
                    }
                }
            }
		}
	}
</script>


<style scoped lang="scss">
	@mixin animate2 {
	    -moz-transition: all .2s linear;
	    -webkit-transition: all .2s linear;
	    -o-transition: all .2s linear;
	    -ms-transition: all .2s linear;
	    transition: all .2s linear;
	}
    .divider {
        align-self: center;
        width: 93%;
        height: 2rpx;
        color: #987cb9;
        background-color: gray;
    }
	.tree-item{
		.head{
			display: flex;
			align-items: center;
			line-height: 60rpx;
            .head-1{
                display: flex;
                flex-basis: auto;
                margin-top: 10rpx;
                .txt{
                    font-size: 30rpx;
                    color: #222;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1; /* 这里是超出几行省略 */
                    overflow: hidden;
                }
            }
            .flex-1{
                flex: 1;
            }
           .p-r-30{
                margin-right: 30rpx;
            }
           .p-t-20{
                margin-top: 20rpx;
            }
		}
        .h-flex{
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
        }
		.left-icon{
			width: 40rpx;
			height: 40rpx;
            margin-top: 10rpx;
            margin-bottom: 10rpx;
			@include animate2;
			transform: rotate(-90deg);
			-ms-transform:rotate(-90deg);
			-moz-transform:rotate(-90deg);
			-webkit-transform: rotate(-90deg);
			-o-transform:rotate(-90deg);
			&.rt45{
                width: 40rpx;
                height: 40rpx;
				transform: rotate(0deg);
				-ms-transform:rotate(0deg);
				-moz-transform:rotate(0deg);
				-webkit-transform: rotate(0deg);
				-o-transform:rotate(0deg);
			}
		}
        .edit-icon{
                width: 40rpx;
                height: 40rpx;
                padding-right: 10rpx;
        }
		.content{
			padding-left: 40rpx;
		}
	}
	.right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 20upx;

    img {
      height: 40upx;
      width: 40upx;
      margin: 0 15upx;
    }

    .search {
      transform: translateY(2upx);
    }

    .dotPlus {
        width: 10upx;
        height: 42upx;
    }
  }
</style>
