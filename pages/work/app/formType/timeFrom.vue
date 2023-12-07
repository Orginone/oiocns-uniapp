<template>
	<view class="page container">
		<view class="example-body">
			<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick" />
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				single: '',
				datetimesingle: '',
				range: ['2021-02-1', '2021-3-28'],
				datetimerange: [],
				start: Date.now() - 1000000000,
				end: Date.now() + 1000000000
			}
		},

		watch: {
			datetimesingle(newval) {
				console.log('单选:', this.datetimesingle);
			},
			range(newval) {
				console.log('范围选:', this.range);
			},
			datetimerange(newval) {
				console.log('范围选:', this.datetimerange);
			}
		},
		mounted() {
			setTimeout(() => {
				this.datetimesingle = Date.now() - 2*24*3600*1000
				this.single = '2021-2-12'
				this.datetimerange = ["2021-07-08 0:01:10", "2021-08-08 23:59:59"]
			},3000)
		},

		methods:{
			change(e) {
				this.single = e
				console.log('change事件:', this.single = e);
			},
			changeLog(e) {
				console.log('change事件:', e);
			},
			maskClick(e){
				console.log('maskClick事件:', e);
			}
		}
	}
</script>
