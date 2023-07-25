<template>
	<view class="tab_wrap">
		<scroll-view :scroll-x="true" class="top_wrap"  :style="{'background-color': options.top_backgroundcolor}">
			<view 
			:class="defaultIndex===index?'top_item_active' :'top_item'" 
			:style="{'color':defaultIndex===index?  options.top_itemselectcolor:  options.top_itemcolor }"
			v-for="(item,index) in tabItem" :key="index" @click="handleTabItem(index)">
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"top-tabbar",
		data() {
			return {
				defaultIndex: 0
			};
		},
		props: {
			tabItem: {
				type: Array,
				default: []
			},
			options:{
				type:Object,
				default:{
					top_backgroundcolor:'#e64d3a',
					top_itemcolor:'#000000',
					top_itemselectcolor:'#ffffff'
				}
			}
		},
		methods:{
			handleTabItem(index){
				this.defaultIndex = index
				this.$emit('tabItemClick',{index:this.tabItem[index].id})
			}
		}
	}
</script>

<style scoped lang="scss">
  @import './top-tabbar.scss';
</style>
