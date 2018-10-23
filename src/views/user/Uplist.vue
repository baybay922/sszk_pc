<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.orgName" placeholder="请输入企业名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="orgName" label="名称" width="120">
			</el-table-column>
			<el-table-column prop="leaderName" label="负责人姓名" min-width="120">
			</el-table-column>
      <el-table-column prop="leaderPhone" label="负责人手机号" min-width="100">
			</el-table-column>
      <el-table-column prop="createTime" label="注册日期" width="120">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="showpasswindow(scope.row.orgId)">审核通过</el-button>
					<!-- <el-button type="danger" size="small" @click="auditrejection(scope.row.orgId)">审核拒绝</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

    <!-- 审核通过 -->
    <el-dialog title="审核通过" :visible.sync="passwindow" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="操作描述">
          <el-input type="textarea" v-model="editForm.optRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click.native="passwindow = false">取消</el-button>
				<el-button type="primary" @click="checkSubmit">确定</el-button>
			</div>
    </el-dialog>
		<!-- 审核拒绝 -->
    <el-dialog title="审核拒绝" :visible.sync="auditrewindow" :close-on-click-modal="false">
      <el-form :model="auditreForm" label-width="80px" ref="auditreForm">
        <el-form-item label="操作描述">
          <el-input type="textarea" v-model="auditreForm.optRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click.native="auditrewindow = false">取消</el-button>
				<el-button type="primary" @click="auditreSubmit">确定</el-button>
			</div>
    </el-dialog>

	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { get2pUserList, checkPass ,auditrePass} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					orgName: ''
				},
				users: [],
				pageSize: 10,
        pageNo: 1,
        total: 0,
        status: 2,
        listLoading: false,
        passwindow: false,
				auditrewindow:false,
        editForm: {
          optRemark: '',
          orgId: ''
        },
				auditreForm:{
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
      //审核通过auditreSubmit
      checkSubmit() {
        let para = this.editForm
        checkPass(para).then((res) => {
          if(res.flag == 20000) {
            this.$message({
							message: '操作成功',
							type: 'success'
            });
            this.passwindow = false;
            this.getUsers();
          } else {
            this.$message({
							message: res.msg,
							type: 'error'
						});
          }
        });
			},
			//审核拒绝
      auditreSubmit() {
        let para = this.auditreForm
        auditrePass(para).then((res) => {
          if(res.flag == 20000) {
            this.$message({
							message: '操作成功',
							type: 'success'
            });
            this.auditrewindow = false;
            this.getUsers();
          } else {
            this.$message({
							message: res.msg,
							type: 'error'
						});
          }
        });
      },
      showpasswindow(orgId) {
        this.passwindow = !this.passwindow;
        this.editForm.orgId = orgId;
      },
			auditrejection(orgId) {
        this.auditrewindow = !this.auditrewindow;
        this.auditreForm.orgId = orgId;
      },
			//获取用户列表
			getUsers() {
				let para = {
					pageNo: this.pageNo,
          pageSize: this.pageSize,
          orgName: this.filters.orgName,
          status: this.status
				};
        this.listLoading = true;
				get2bUserList(para).then((res) => {
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