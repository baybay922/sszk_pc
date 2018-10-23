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
		<el-table :data="users" highlight-current-row v-loading="listLoading">
			<el-table-column prop="orgName" label="企业名称">
			</el-table-column>
      <el-table-column label="身份">
        <template scope="scope">
          {{scope.row.clientType == 'b'? "异业合伙人":"同业合伙人"}}
        </template>
			</el-table-column>
			<!-- <el-table-column prop="idCardNo" label="社保登记证" >
        <template scope="scope">
          <a v-bind:href="scope.row.imgUrl" target="blank">查看照片</a>
        </template>
			</el-table-column> -->
			<!-- <el-table-column prop="leaderName" label="负责人姓名">
			</el-table-column> -->
      <el-table-column prop="leaderPhone" label="负责人手机号">
			</el-table-column>
      <el-table-column prop="creditRate" label="信用分">
			</el-table-column>
      <el-table-column prop="sellNumber" label="月售单数">
			</el-table-column>
      <el-table-column prop="marketName" label="市场经理">
			</el-table-column>
      <el-table-column prop="createtime" label="注册日期">
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template scope="scope">
					<div style="float:left"><el-button size="small" @click="modify(scope.row.orgId)">修改</el-button></div>
					<div v-if="scope.row.clientType == 'b'" style="float:left;margin:0 10px;">
                <el-button type="danger" size="small" @click="gochecklevel(scope.row.orgId)">升级</el-button>
              </div>
					    <div v-if="scope.row.clientType == 'B'" style="float:left;margin:0 10px;">
                <el-button type="danger" size="small" @click="updownlevel(scope.row.orgId)">降级</el-button>
            </div>
            <div style="float:left">
              <el-button size="small" @click="lockAccount(scope.row.orgId, 1)" v-if="scope.row.lockFlag == 0">已启用</el-button>
					    <el-button size="small" @click="lockAccount(scope.row.orgId, 0)" v-else>已禁用</el-button>
            </div>
             <div style="float:left;">
                <el-button size="small" @click="separate(scope.row.orgId)" style="float:left;margin:0 10px;">账期</el-button>
             </div>
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
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { get2bUserList, checkPass,checkBLevel,lockAccount } from '../../api/api';

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
        status: 1,
        listLoading: false,
        passwindow: false,
        editForm: {
          optRemark: '',
          orgId: ''
        }
			}
		},
		methods: {
      separate(orgId){
          let path = {path:'/separate',query:{orgId:orgId,orgType:'B'}}
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
			modify(orgId){
				let path = {path:'/enterpriseModification',query:{orgId: orgId,type :0}}
        this.$router.push(path)
			},
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getUsers();
			},
			//升级大B开始
      gochecklevel(orgId) {
        this.$confirm('此操作将升级用户为大B, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checkLevel(orgId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消升级'
          });
        });
      },
      checkLevel(orgId) {
        this.listLoading = true;
        let para = {};
        para.orgId = orgId;
        para.userLevel = 'B';
        checkBLevel(para).then((res) => {
          if(res.flag == 20000) {
            this.$message({
              type: 'success',
              message: '用户升级成功!'
            });
            this.getUsers();
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
       //升级大B结束
       //降级小b开始
      updownlevel(orgId) {
        this.$confirm('此操作将降级用户为小b, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updown(orgId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消升级'
          });
        });
      },
      updown(orgId) {
        this.listLoading = true;
        let para = {};
        para.orgId = orgId;
        para.userLevel = 'b';
        checkBLevel(para).then((res) => {
          if(res.flag == 20000) {
            this.$message({
              type: 'success',
              message: '用户降级成功!'
            });
            this.getUsers();
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
      //降级小b结束
      //审核通过
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
      showpasswindow(orgId) {
        this.passwindow = !this.passwindow;
        this.editForm.orgId = orgId;
      },
			//获取用户列表
			getUsers() {
				let para = {
					pageNo: this.pageNo,
          pageSize: this.pageSize,
          keywords: this.filters.orgName,
          status: this.status
				};
        this.listLoading = true;
				get2bUserList(para).then((res) => {
          console.log(res,'已审核企业渠道商')
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