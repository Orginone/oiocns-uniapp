<template>
	<view class="BaseLayout">
    <headbar :localList="'组织,浙江省财政厅'" :left="'none'"></headbar>
		<view class="main">
			<basicForm :formData="datalist" :title="title"></basicForm>
			<!-- 子表信息 -->
			<view class="formArea" v-if="type == '部门'">
				<view class="head">
					<view class="title">部门成员</view>
					<view class="more" @click="getMore">
						<view class="more_point"></view>
						<view class="more_point"></view>
						<view class="more_point"></view>
					</view>
				</view>
				<view class="item">
					<uni-table>
						<uni-tr>
							<uni-th v-for="item,index in formTitle" :key="index" style="color: #333;font-weight: normal;">{{item.name}}</uni-th>
						</uni-tr>
						<uni-tr v-for="item,index in formList" :key="index" >
							<uni-td v-for="it,ind in Object.values(item)" :key="ind" style="color: #9A9A9A;">{{it}}</uni-td>
						</uni-tr>
					</uni-table>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as config from "../config/menuOperate";
export default {
	data() {
		return {
			datalist:[
				{
					name:'名称',
					key:'name',
					value:''
				},
				{
					name:'代码',
					key:'code',
					value:''
				},
				{
					name:'加入',
					key:'public',
					value:''
				},
				{
					name:'归属',
					key:'belongName',
					value:''
				},
				{
					name:'创建人',
					key:'creater',
					value:''
				},
				{
					name:'创建时间',
					key:'createTime',
					value:''
				},
				{
					name:'描述信息',
					key:'remark',
					value:''
				}
			],
			formTitle:[{
					name: '账号',
					value: 'code'
				},
				{
					name: '昵称',
					value: 'name'
				},
				{
					name: '签名',
					value: 'remark'
				}],
			formList:[],
			title:'',
			type:'',
			members:[]
		};
	},
	watch:{
		
	},
	async onLoad(option){
		let key = JSON.parse(option.data)
		let type
		if(option.type){
			type = JSON.parse(option.type)
		}
		if(type != undefined){
			this.type = '部门'
		}else{
			this.type = '单位'
			this.datalist.splice(3,1)
		}
		let res = await config.loadSettingMenu();
		this.findObject(res.children,key)
	},
	methods: {
		findObject(arr,key){
			if(arr && arr.length >0){
				arr.forEach(element => {
					if(element.key == key){
						this.dataCompare(element)
						return
					}
					if(element.children && element.children.length>0){
						this.findObject(element.children,key)
					}
				});
			}
		},

		dataCompare(data){
			this.title = this.type + '[' + data?.item?.metadata.name + ']基本信息'
			this.datalist.forEach(element => {
				for(var item in data?.item?.metadata){
					if(element.key == item){
						element.value = data?.item?.metadata[item]
					}
					if(element.key == 'belongName'){
						element.value = data?.item?.belong.name
					}
					if(element.key == 'creater'){
						element.value = data?.item?.creater.name
					}
					if(element.key == 'public'){
						element.value = data?.item?.metadata['public']?'开放加入':'需申请加入'
					}
				}
			});
			let json = {}
			data?.item?.members.forEach(item=>{
				json.code = item.code
				json.name = item.name
				json.remark = item.remark
				this.formList.push(json)
				delete item.belong
				delete item.team
			})
			this.members = data?.item?.members
		},

		getMore(){
			uni.navigateTo({
				url: '/pages/setting/agency/detail'+'?data=' + encodeURIComponent(JSON.stringify(this.members))
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.main{
	padding: 0 22upx;
	padding-bottom: 40upx;
}
.head{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.more {
	.more_point {
		width: 6upx;
		height: 6upx;
		background: #999;
		border-radius: 50%;
		margin-bottom: 6upx;
	}
}
</style>