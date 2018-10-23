<template>
	<section>
		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.orgName" placeholder="请输入供应商名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col> -->

		<!--列表-->
		<el-table :data="evaluates" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="productName" label="产品名称">
			</el-table-column>
			<el-table-column prop="supplierName" label="供应商">
			</el-table-column>
			<el-table-column prop="createtime" label="评价时间">
			</el-table-column>
			<el-table-column prop="evaNotes" label="评价内容">
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template scope="scope">
					<el-button size="small" @click="deleteEvaluation(scope.row.evaluatiomId)">删除</el-button>
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
	import { getEvaluateList,deleteEvaluate} from '../../api/api';

	export default {
		data() {
			return {
				// filters: {
				// 	orgName: ''
				// },
        evaluates: [],
				pageSize: 10,
        pageNo: 1,
        total: 0,
				listLoading: false
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getEvaluations();
			},
			deleteEvaluation(evaluatiomId) {
             this.$confirm('此操作将删除该条评论, 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
							 
               this.deleteEvaluate(evaluatiomId);
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消删除'
               });
             });
           },
     deleteEvaluate(evaluatiomId) {
						 this.listLoading = true;
             deleteEvaluate(evaluatiomId).then((res) => {
               if(res.flag == 20000) {
                 this.$message({
                   type: 'success',
                   message: '评价删除成功!'
                 });
                 this.getEvaluations();
                 this.listLoading = false;
               }else{
                 this.$message({
                   type: 'error',
                   message: res.msg
                 });
                 this.listLoading = false;
               }
             })
           },
			//获取评论列表
			getEvaluations() {
				let para = {
					pageNo: this.pageNo,
					pageSize: this.pageSize,
				};
        this.listLoading = true;
				getEvaluateList(para).then((res) => {
					console.log(res)
					this.total = res.data.total;
					this.evaluates = res.data.list;
					this.listLoading = false;
				});
			},
		
		},
		mounted() {
			this.getEvaluations();
		}
	}

</script>

<style scoped>

</style>