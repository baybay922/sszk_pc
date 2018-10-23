<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.orgName" placeholder="请输入供应商名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="orgName" label="名称">
			</el-table-column>
			<el-table-column label="地区">
				<template scope="scope">
					<p>{{scope.row.supplierProvince}} - {{scope.row.supplierCity}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="leaderName" label="负责人姓名">
			</el-table-column>
			<el-table-column prop="leaderPhone" label="负责人手机号">
			</el-table-column>
			<el-table-column prop="sellNum" label="月售单数"></el-table-column>
			<el-table-column prop="remarkName" label="市场经理"></el-table-column>
			<el-table-column prop="createtime" label="注册日期">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">					
					<el-button @click="toediproduct(scope.row.orgId)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small" @click="lockAccount(scope.row.orgId, 1)" v-if="scope.row.lockFlag == 0">已启用</el-button>
					<el-button type="text" size="small" @click="lockAccount(scope.row.orgId, 0)" v-else>已禁用</el-button><br/>
					<el-button @click="separate(scope.row.orgId)" type="text" size="small">账期</el-button>
					<el-button @click="rhortcut(scope.row.orgId)" type="text" size="small">快捷下单</el-button>			
				</template>
			</el-table-column>
		</el-table>
<!-- 	   -->
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<div class="rhortcutMask" v-if="showRhortcut">
			<div class="hortcutWrapper">
				<h3>请输入下单信息</h3>
				<div class="orderInfoWrapper">
					<p>渠道商手机号：</p>
					<el-input v-model="channelPhone" class="channelPhone" placeholder="请输入渠道商手机号"></el-input>
				</div>
				<div class="orderInfoWrapper">
					<p>产品ID：</p>
					<el-select v-model="value" placeholder="请选择" @change="getSupplierId">
						<el-option
						v-for="item in options"
						:key="item.productId"
						:label="item.productName"
						:value="item.productId">
						</el-option>
					</el-select>
				</div>
				<el-button @click="submitOrderInfo" class="suerBtn" type="primary">确定</el-button>
				<div class="closeBtn" @click="hideRhortcut"></div>
			</div>
		</div>
	</section>
</template>

<script>
import util from '../../common/js/util'
import { getsuppliers, lockAccount, quickcreate, getAllpdoduct} from '../../api/api';

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
			restaurants:[],
			state1:'',
			channelPhone:'',
			showRhortcut:false,
			orderId:'',
			options:[],
			value:'',
			productId:''
		}
	},
	methods: {
		getSupplierId(value){
			this.productId = value
		},
		submitOrderInfo(){//确认提交信息
			let para = {
					agentPhone:this.channelPhone,
					productId:this.productId,
					supplierId:this.orderId
			}
			quickcreate(para).then((res)=>{
				if(res.flag == 20000){
					this.hideRhortcut();
					this.$message({
						message: '创建成功',
						type: 'success'
            		});
				}else{
					this.hideRhortcut();
					this.$message({
						message: res.msg,
						type: 'error'
            		});
				}
			})
		},
		hideRhortcut(){//隐藏输入框
			this.showRhortcut = false;
			this.channelPhone = "";
			this.productId = "";
			this.orderId = "";
			this.value = "";
		},
		rhortcut(orgId){//快捷下单
			this.orderId = orgId;
			let supplierId = orgId;
			getAllpdoduct(supplierId).then((res)=>{
				if(res.flag == 20000){
					this.showRhortcut = true;
					this.options = res.data
				}else if(res.flag == 40000){
					this.hideRhortcut();
					this.$message({
						message: res.msg,
						type: 'error'
            		});
				}else{
					this.$message({
						message: res.msg,
						type: 'error'
            		});
				}
			})
		},
		separate(orgId){
          let path = {path:'/separate',query:{orgId:orgId,orgType:'P'}}
          this.$router.push(path)
        },
		lockAccount(orgId, lockStart){//禁用或启用账户
			let para = {
					orgId: orgId,
					lockFlag: lockStart
				}
			lockAccount(para).then((res) =>{
				if(res.flag == 20000){					
					 this.$message({
						message: '操作成功',
						type: 'success'
					});
					setTimeout(()=>{
						window.location.reload();
					},1000) 
				}else{
					this.$message({
						message: res.msg,
						type: 'error'
            		});
				}
			})
		},
		handleCurrentChange(val) {
			this.pageNo = val;
			this.getUsers();
		},
		toediproduct(orgId) {
				let path = {path: '/supplierAdd', query: {orgId: orgId}};
				this.$router.push(path);
		},
				//获取用户列表
		getUsers() {
			let para = {
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				keywords: this.filters.orgName,
				orgRoleType: this.orgRoleType,
				status:1
			};
			this.listLoading = true;
			getsuppliers(para).then((res) => {
				this.total = res.data.total;
				this.users = res.data.list;
				this.listLoading = false;
			});
		}
	},
	mounted() {
		this.getUsers();
		
	}
}

</script>

<style scoped>
.rhortcutMask{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.5);
}
.hortcutWrapper{
	width: 420px;
	height: auto;
	margin: 150px auto 0;
	background: #fff;
	border-radius: 5px;
	padding: 15px;
	position: relative;
}
.hortcutWrapper h3{
	width: 100%;
	text-align: center;
	font-size: 16px;
	font-weight: normal;
}
.orderInfoWrapper{
	width: 100%;
	display: -webkit-flex;
	align-items: center;
}
.orderInfoWrapper p{
	width: 100px;
	text-align: right;
	margin-right: 20px;
}
.suerBtn{
	margin: 10px auto 0;
	text-align: center;
	display: block;
}
.channelPhone{
	width: 193px;
}
.closeBtn{
	width: 20px;
	height: 20px;
	position: absolute;
	top: 0;
	right: 0;
	margin: 10px;
	cursor: pointer;
}
.closeBtn:after{
	content: '';
	width: 1px;
	height: 100%;
	background: #dcdfe6;
	position: absolute;
	display: block;
	-webkit-transform: rotate(45deg);
}
.closeBtn:before{
	content: '';
	width: 1px;
	height: 100%;
	background: #dcdfe6;
	position: absolute;
	display: block;
	-webkit-transform: rotate(-45deg);
}
</style>