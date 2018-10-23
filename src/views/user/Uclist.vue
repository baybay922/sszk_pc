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
			<el-table-column prop="createtime" label="注册日期">
			</el-table-column>
			<!-- <el-table-column prop="idCardNo" label="身份证号">
			</el-table-column> -->
			<el-table-column prop="marketName" label="市场经理">
			</el-table-column>
			 
			<!-- <el-table-column prop="inviterName" label="推荐人姓名">
			</el-table-column>
      <el-table-column prop="inviterPhone" label="推荐人手机号">
			</el-table-column> -->
			 <el-table-column label="操作" width="400">
				<template scope="scope" >
					<el-button size="small" @click="modify(scope.row.orgId)">查看</el-button>
					<el-button size="small" @click="showpasswindow(scope.row.orgId)">审核通过</el-button>
					<el-button type="danger" size="small" @click="auditrejection(scope.row.orgId)">审核拒绝</el-button>
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
	import { get2cUserList, checkPass ,auditrePass} from '../../api/api';

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
				},
				SubmitBtn:false
			}
		},
		methods: {
			modify(orgId){
				let path = {path:'/PersonalModification',query:{orgId: orgId,type :1}}
        this.$router.push(path)
			},
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getUsers();
      },
      //审核通过
      checkSubmit() {
				let para = this.editForm;
				this.SubmitBtn = true;
        checkPass(para).then((res) => {
          if(res.flag == 20000) {
            this.$message({
							message: '操作成功',
							type: 'success'
            });
						this.passwindow = false;
						this.SubmitBtn = false;
            this.getUsers();
          } else {
						this.SubmitBtn = false;
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
          keywords: this.filters.phone,
          status: this.status
				};
        this.listLoading = true;
				get2cUserList(para).then((res) => {
					console.log(res,'待审核个人渠道-')
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