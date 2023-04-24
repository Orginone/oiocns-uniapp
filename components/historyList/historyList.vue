<template>
	<view class="BaseLayout">
		<view class="listArea">
			<view class="listItem" v-for="item,index in listForm" :key="index">
				<view class="top">
					<view class="state">{{'已通过'}}</view>
					<view class="name">{{'李虎'}}</view>
					<view class="phoneNumber">{{1367585.666}}</view>
					<view class="node">审核节点：{{'科传办审批'}}</view>
				</view>
				<view class="bottom">
					<view class="feedback">审批意见：{{'同意'}}</view>
					<view class="date">{{'2022-09-07 15:01:02'}}</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "historyList",
		props: {
			listForm: {
				default: () => {
					return []
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.BaseLayout {
		.listArea {
			.listItem {
				.top {}
			}
		}
	}
</style>