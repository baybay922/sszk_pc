<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.num" placeholder="请输入生成编码条数"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="generate()">生成</el-button>
				</el-form-item>
				<el-button type="primary" @click="exportTable()">导出Excel</el-button>
				<el-button type="primary" @click="changeCode()">批量启用</el-button>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="poscode" highlight-current-row v-loading="listLoading" style="width: 100%;"  @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="100"></el-table-column>
			<el-table-column prop="batch" label="POS机编号批次" min-width="100">
			</el-table-column>
			<el-table-column prop="code" label="pos机编号" min-width="100">
			</el-table-column>
			<el-table-column label="状态" min-width="100">
				<template scope="scope">
            		<p>{{scope.row.status == 0 ?'未启用':'已启用'}}</p>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="changeCode(scope.row.code)" :disabled="scope.row.status == 0? false:true">启用</el-button>
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
	import { getPosCodeList, createPosCode, changePosCode} from '../../api/api';

	export default {
		data() {
			return {
        		posTypes: [],
				filters: {
					batch:'', //POS机编号批次
					code: '', //pos机编号
          			pageNo: 1,
					pageSize: 10,
					status:"",//是否启用
					num:""
				},
				poscode: [],
        		total: 0,
				listLoading: false,
				 multipleSelection: [],
				 hasGutter:""
			}
		},
		inject:['reload'], //
		methods: {
			//分页器
			handleCurrentChange(val) {
				this.filters.pageNo = val;
				this.getposcode();
			},
			//获取posCode列表
			getposcode() {
				this.listLoading = true;
				getPosCodeList(this.filters).then((res) => {
					this.total = res.data.total;
					this.poscode = res.data.list;
					this.listLoading = false;
				});
			},
			//生成POS编码数据
			generate(){
				createPosCode(this.filters.num).then( res => {
					 if(res.flag === 20000){
						 this.getposcode()
					 }else{
						this.$message({
							message: res.msg,
							type: 'error'
						});
					 }
				})
			},
			//获取多选框选中数据
			handleSelectionChange(val){
				this.multipleSelection = []
				for(var i=0;i<val.length;i++){
					this.multipleSelection.push(val[i].code)
				}
			},
			//导出Excel表格
			exportTable() {
				require.ensure([], () => {
					const { export_json_to_excel } = require('../../excel/Export2Excel');
					const tHeader = ['POS机编号批次', 'pos机编号', '状态'];
					const filterVal = ['batch', 'code', 'status'];
					const list = this.poscode;
					const data = this.formatJson(filterVal, list);
					export_json_to_excel(tHeader, data, 'pos机编码列表');
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},
			//批量修改
			changeCode(code){
				var obj = {}
				if(code){
					let codeArr = [];
					codeArr.push(code)
					obj = { posCodes:codeArr }
				}else{
					obj = { posCodes:this.multipleSelection }
				}

				changePosCode(obj).then( res =>{
					if(res.flag === 20000){
						
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.$nextTick ( () => {
							this.reload()
						})
					}else{
						this.$message({
							message: res.msg,
							type: 'error'
						});
					}
				})
			}
		},
		mounted() {
			this.getposcode();
			this.$nextTick( res => {
				this.hasGutter = document.getElementsByClassName('has-gutter')[0];
				let tableCheck = this.hasGutter.getElementsByClassName('el-checkbox__inner')[0]
				tableCheck.innerHTML = '<i style="font-style:normal;margin-left:15px;">全选</i>';
			})
		}
	}

</script>

<style scoped>
	
</style>