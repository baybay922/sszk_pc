<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.orgName" placeholder="请输入客户手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsersInfo">查询</el-button>
				</el-form-item>
				<el-form-item class="Search">
					市场经理：
                    <el-select v-model="value" placeholder="请选择" @change="queryState(value)">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                    </el-option>
                </el-select>
                </el-form-item>
			</el-form>
		</el-col>
        <p>全部未分配的客户（{{totalNum}}名）</p>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="name" label="客户名称">
			</el-table-column>
			<el-table-column prop="phone" label="手机号">
			</el-table-column>
			<el-table-column prop="clientType" label="客户类型">
			</el-table-column>
			<el-table-column prop="registTime" label="注册时间">
			</el-table-column>
            <el-table-column prop="marketName" label="市场经理">
			</el-table-column>
			<el-table-column label="操作">
				<!-- <template scope="scope">
					<el-button size="small" @click="showpasswindow(scope.row.orgId)">审核通过</el-button>
					<el-button type="danger" size="small">审核拒绝</el-button>
				</template> -->
				<!-- <el-button style="width:50px;height:30px;background:red;" size="small" @click="toediproduct(scope.row.orgId)">查看</el-button> -->
				<template slot-scope="scope">					
					<el-button type="text" size="small" @click="lockAccount(scope.row.userNo)" v-if="scope.row.isCheck == 1">更换市场经理</el-button>
					<el-button type="text" size="small" @click="lockAccount(scope.row.userNo)" v-else>分配市场经理</el-button>					
				</template>
			</el-table-column>
		</el-table>
<!-- 	   -->
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
	</section>
</template>

<script>
import util from '../../common/js/util'
import { queryalluser, queryallmarket } from '../../api/api';
// 
export default {
	data() {
		return {
			filters: {
				orgName: ''
			},
			users: [],
			orgRoleType: '1',
			pageSize: 10,
			pageNo: 1,
			total: 0,
			listLoading: false,
			lockStart:0,
			internalNumber:"",
			options: [],
			value:"",
			totalNum:"0"
		}
	},
	methods: {
		getUsersInfo(){//查寻用户
			if(this.filters.orgName == ""){
				this.$message({
					message:"请输入您要查询的客户手机号",
					type:"error"
				})
			}else{				
				let para = {
					phone: this.filters.orgName,
					internalNumber:this.internalNumber,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				};
			queryalluser(para).then((res) => {
				if(res.flag == 20000){
					this.users = res.data.list;
					this.listLoading = false;
				}else{
					this.$message({
						message:res.msg,
						type:"error"
					})
				}
			});
			}
		},
		lockAccount(userNo){
			let path = {path:"marketPersonnel",query:{userNo: userNo}};
			this.$router.push(path)
		},
		queryState(val){//搜索
		
			let para = {
					phone: "",
					internalNumber: val,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}
			queryalluser(para).then((res => {
				if(res.flag == 20000){
					this.total = res.data.total;
					this.users = res.data.list;
					this.totalNum = res.data.list.length
					this.listLoading = false;
				}else{
					this.$message({
						message:res.msg,
						type:"error"
					})
				}
			}))         
        },
		handleCurrentChange(val) {
			this.pageNo = val;
			this.getUsers();
		},			
		getUsers() {	//获取用户列表
			let para = {
					phone: this.filters.orgName,
					internalNumber:this.internalNumber,
					pageNo: this.pageNo,
					pageSize: this.pageSize
            	};
			this.listLoading = true;
			queryalluser(para).then((res) => {
				this.total = res.data.total;
				this.users = res.data.list;
				this.totalNum = res.data.list.length
				this.listLoading = false;
			});
		},
		getMarketList(){
			let para = {
				marketName:"",
				externalNumber:""
			}
			queryallmarket(para).then((res) =>{
				if(res.flag == 20000){
					this.options = res.data
				}else{
					this.$message({
						message:res.msg,
						type:"error"
					})
				}
			})
		}
	},
	mounted() {
		this.getUsers();
		this.getMarketList();
	}
}

</script>

<style scoped>

</style>