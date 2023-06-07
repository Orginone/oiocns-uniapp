<template>
	<view class="BaseLayout">
    <headbar :localList="'组织,浙江省财政厅'" :left="'none'"></headbar>
		<view class="main">
			<sideForm :datalist="datalist" :title="'当前部门'"></sideForm>
			<!-- 子表信息 -->
			<view class="formArea">
				<view class="head">
					<view class="title">部门成员</view>
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
					key:'createUser',
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
			formList:[]
		};
	},
	watch:{
		
	},
	onLoad(option){
		let newOption = JSON.parse(decodeURIComponent(option.data)).item;
		this.datalist.forEach(element => {
			for(var item in newOption?.metadata){
				if(element.key == item){
					element.value = newOption?.metadata[item]
				}
				if(element.key == 'public'){
					element.value = newOption?.metadata['public']?'开放加入':'需申请加入'
				}
			}
		});
		let json = {}
		newOption?.members.forEach(item=>{
			json.code = item.code
			json.name = item.name
			json.remark = item.remark
			this.formList.push(json)
		})
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
.main{
	padding: 0 22upx;
	padding-bottom: 40upx;
}
</style>