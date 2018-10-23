<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<h5>B类渠道商（{{ totalNum }}位）</h5>
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="phone" label="手机号">
			</el-table-column>
			<el-table-column prop="orgType" label="账号类型">
			</el-table-column>
			<el-table-column prop="createTime" label="注册日期">
			</el-table-column>
			<!--<el-table-column prop="totalPrice" label="销售额">
			</el-table-column>-->
			<el-table-column prop="creditRate" label="信用分">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button type="text" @click="choose(scope.row.orgId)">
						选择
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { orderallot ,orderTypeUpdate ,orderQuery } from '../../api/api';

	export default {
		data() {
			return {
				totalNum:"",
				orderNo: this.$route.query.orderNo,
				filters: {
					name: ''
				},
				users: [],
				pageSize: 10,
				pageNo: 1,
				total: 0,
				listLoading: false
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getUsers();
			},
			choose(orgId){            
				this.$prompt('请输入被分配的渠道商分成比例', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern:/^100$|^(\d|[1-9]\d)$/,
					inputErrorMessage: '请输入正确的分成比例'
					}).then(({ value }) => {						
						this.listLoading = true;
						let para = {
								orgId : orgId,
								orderNo : this.orderNo,
								proportion:value
						};
						console.log(para)
						orderTypeUpdate(para).then((res)=>{
						if(res.flag == 20000) {
							this.$message({
								message: '操作成功',
								type: 'success'
							});
							this.passwindow = false;
						let path = {path: '/ordermanager', query: {}};
						this.$router.push(path);
						}else {
							this.$message({
								message: res.msg,
								type: 'error'
							});
						}
					});
					}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});       
					});
				},
				getUsers() {
					let para = {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						orgName: this.filters.name,
					};
					this.listLoading = true;
					orderallot(para).then((res) => {
						this.total = res.data.total;
						this.users = res.data.list;
						this.listLoading = false;
					})
                
			}
			//获取用户列表
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>