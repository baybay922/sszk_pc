<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.phone" placeholder="请输入渠道商手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		
    <!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="name" label="姓名">
			</el-table-column>	
			<el-table-column label="身份">
        <template scope="scope">
          {{scope.row.clientType == 'b'? "异业合伙人":"同业合伙人"}}
        </template>
			</el-table-column>
			<el-table-column prop="phone" label="手机号码">
			</el-table-column>
			<el-table-column prop="idCardNo" label="身份证号">
			</el-table-column>
			<el-table-column prop="marketName" label="市场经理">
			</el-table-column>
			<el-table-column prop="createtime" label="注册日期">
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
	import { getUcLatentList, checkPass ,checkLevel ,lockAccount} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					phone: ''
				},
				users: [],
				pageSize: 10,
        pageNo: 1,
        total: 0,
        status: 0,
        listLoading: false,
        passwindow: false,
        editForm: {
          optRemark: '',
          orgId: ''
        }
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getUsers();
      },
			//获取用户列表
			getUsers() {
				let para = {
					pageNo: this.pageNo,
          pageSize: this.pageSize,
          keywords: this.filters.phone,
          status: this.status
				};
        this.listLoading = true;
				getUcLatentList(para).then((res) => {
          console.log(res,'待完善个人渠道----------')
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

</style>