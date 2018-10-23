<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-select v-model="value" placeholder="请选择">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
				<el-button type="primary" v-on:click="getUser(value)">查询</el-button>
		</el-col>

		<!--列表-->
		<el-table :data="poss" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="posId" label="POS机订单id" min-width="100">
			</el-table-column>
			<el-table-column prop="posCode" label="POS机编号" min-width="100">
			</el-table-column>
			<el-table-column prop="posVendor" label="pos机类型" min-width="100">
			</el-table-column>
      <el-table-column prop="appkey" label="APPKEY" min-width="100">
			</el-table-column>
			<el-table-column prop="snNo" label="sn" min-width="100">
			</el-table-column>
			<el-table-column label="状态" min-width="100">
				<template scope="scope">
            <p v-html="getHtml(scope.row.status)"></p>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="isEnabled" label="是否启用" min-width="100">
			</el-table-column> -->
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="small" @click="scope.row.status == 0 ? toedipos(scope.row.posId,scope.row.posCode,scope.row.posVendor,scope.row.appkey,scope.row.orgId,scope.row.snNo):''" :disabled="scope.row.status != 0? true:false">修改</el-button>
					<el-button size="small" @click="scope.row.status == 0 ? toMarket(scope.row.posCode):''" :disabled="scope.row.status != 0? true:false">市场分配</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="filters.pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getPosList,marketShare } from '../../api/api';

	export default {
		data() {
			return {
        		posTypes: [],
				filters: {
					posVendor:'', //POS机商家类型
					venderNo: '', //POS机商家编号
					posId:'', //POS机id
					posCode:'', 
					appkey:'', //pos机appkey
					snNo:'',	//POS机条码
					price: '', //pos价格
					province:"", //pos机所在省
					city:"",//pos机所在市
          			pageNo: 1,
					pageSize: 10,
					status:""
				},
				poss: [],
				total: 0,
				listLoading: false,
				changeShow:false,
				options: [{
					value: '可发货',
					label: '可发货'
					}, {
						value: '使用中',
						label: '使用中'
					},{
						value: '待领取',
						label: '待领取'
					},{
						value: '退还中',
						label: '退还中'
				}],
				value: ''
			}
		},
		inject:['reload'],
		methods: {
			toedipos(posId,posCode,posVendor,appkey,orgId,snNo) {
				let path = {path: '/posadd', query: {posId:posId,posCode:posCode,appkey:appkey,posVendor:posVendor,orgId:orgId,snNo:snNo}};
				this.$router.push(path);
			},
			getposType() {
				getposType().then((res) => {
				this.posTypes = res.data;
				});
			},
			//分页器
			handleCurrentChange(val) {
				this.filters.pageNo = val;
				this.getposs();
			},
			//获取用户列表
			getposs() {
				this.listLoading = true;
				getPosList(this.filters).then((res) => {
					this.total = res.data.total;
					this.poss = res.data.list;
					this.listLoading = false;
				});
			},
			//市场分配
			toMarket(posCode){
				marketShare(posCode).then( res =>{
					if(res.flag === 20000){
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.reload()
					}else{
						this.$message({
							message: res.msg,
							type: 'error'
						});
					}
				})
			},
			//筛选
			getUser(val){
				switch(val){
					case '可发货':
						this.filters.status=0;
						this.getposs();
						break;
					case '待领取':
						this.filters.status=1;
						this.getposs();
						break;
					case '使用中':
						this.filters.status=2;
						this.getposs();
						break;
					case '退还中':
						this.filters.status=3;
						this.getposs();
						break;
				}
				
			},
			getHtml(code){
				switch(code){
					case '0':
						return '可发货';
					case '1':
						return '待领取';
					case '2':
						return '使用中';
					case '3':
						return '退还中';
				}
			}
		},
		computed: {
		
		},
		mounted() {
      //this.getposType();
			this.getposs();
		}
	}

</script>

<style scoped>

</style>