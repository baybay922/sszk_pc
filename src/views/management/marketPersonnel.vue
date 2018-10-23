<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.orgName" placeholder="请输入市场经理姓名、编号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsersInfo">查询</el-button>
				</el-form-item>
			</el-form>	
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="marketName" label="姓名">
			</el-table-column>
			<el-table-column prop="externalNumber" label="编号">
			</el-table-column>
			<el-table-column prop="phone" label="手机号">
			</el-table-column>
			<el-table-column prop="fatherName" label="上级">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">					
					<el-button type="text" size="small" @click="lockAccount(scope.row.internalNumber)">选择</el-button>					
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
import util from "../../common/js/util";
import { marketList, distribution } from "../../api/api";
//
export default {
  data() {
    return {
      filters: {
        orgName: ""
      },
      users: [],
      orgRoleType: "1",
      pageSize: 10,
      pageNo: 1,
      total: 0,
      listLoading: false,
      lockStart: 0,
      totalNum: "0",
      marketName: "",
      internalNumber: "",
      userNo: this.$route.query.userNo
    };
  },
  methods: {
    getUsersInfo() {
      //查寻用户
      if (this.filters.orgName == "") {
        this.$message({
          message: "请输入您要查询的客户手机号",
          type: "error"
        });
      } else {
        let para = {
            phone: this.filters.orgName,
            internalNumber: this.internalNumber,
            pageNo: this.pageNo,
            pageSize: this.pageSize
          };
        marketList(para).then(res => {
          if (res.flag == 20000) {
            this.users = res.data.list;
            this.listLoading = false;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      }
    },
    lockAccount(val) {//更换市场经理
      this.$confirm("此操作更换市场经理, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let para = {
            userId: this.userNo,
            internalNumber: val
          };
          distribution(para).then(res => {
            if (res.flag == 20000) {
              this.$message({
                type: "success",
                message: "更换成功!"
              });
              let path = {path:"./management",query:""};
			    this.$router.push(path)
            } else {
              this.$message({
                type: "error",
                message: res.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更换"
          });
        });
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getUsers();
    },
    getUsers() {
      //获取用户列表
      let para = {
        marketName: this.marketName,
        internalNumber: this.internalNumber,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      marketList(para).then(res => {
        console.log(res);
        this.total = res.data.total;
        this.users = res.data.list;
        this.listLoading = false;
      });
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>
</style>