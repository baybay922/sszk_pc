<template>
	<section>
		<!--列表-->
		<el-table :data="orderRewards" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="agentName" label="渠道商">
			</el-table-column>	
			<el-table-column label="用户类型">
                <template scope="scope">
                {{scope.row.userType == '0'? "个人":"企业"}}
                </template>
			</el-table-column>
			<el-table-column prop="bankNo" label="提现银行卡号">
			</el-table-column>
			<el-table-column prop="createtime" label="提交时间">
			</el-table-column>
			 <el-table-column label="操作" width="400">
				<template scope="scope">
					<!-- <el-button size="small" @click="modify(scope.row.orgId)">查看</el-button> -->
					<el-button size="small" @click="showpasswindow(scope.row.id)">审核通过</el-button>
					<el-button type="danger" size="small" @click="auditrejection(scope.row.id)">审核拒绝</el-button>
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
	import { orderRewardList, orderRewardCheck ,orderRewardCheckRefuse} from '../../api/api';

	export default {
		data() {
			return {
				orderRewards: [],
				pageSize: 10,
                pageNo: 1,
                total: 0,
                status: 1,
                listLoading: false,
				passwindow: false,
				auditrewindow:false,
                editForm: {
                    optRemark: '',
                    id: ''
                },
                auditreForm:{
                    optRemark: '',
                    id: ''
                },
				SubmitBtn:false
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getOrderRewards();
            },
            //审核通过
            checkSubmit() {
                let para = this.editForm;
                this.SubmitBtn = true;
                orderRewardCheck(para).then((res) => {
                    if(res.flag == 20000) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.passwindow = false;
                        this.SubmitBtn = false;
                        this.getOrderRewards();
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
                orderRewardCheckRefuse(para).then((res) => {
                    if(res.flag == 20000) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.auditrewindow = false;
                        this.getOrderRewards();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            showpasswindow(id) {
                this.passwindow = !this.passwindow;
                this.editForm.id = id;
            },
            auditrejection(id) {
                this.auditrewindow = !this.auditrewindow;
                this.auditreForm.id = id;
            },
            //获取用户列表
            getOrderRewards() {
                let para = {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    status: this.status
                };
                this.listLoading = true;
                orderRewardList(para).then((res) => {
                        this.total = res.data.total;
                        this.orderRewards = res.data.list;
                        this.listLoading = false;
                });
            }
        },
        mounted() {
            this.getOrderRewards();
        }
	}

</script>

<style scoped>

</style>