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
			<el-table-column prop="leaderName" label="负责人姓名"></el-table-column>
			<el-table-column prop="leaderPhone" label="负责人手机号"></el-table-column>
			<el-table-column label="地区">
				<template scope="scope">
					<p>{{scope.row.province?scope.row.province:""}}{{scope.row.city?" - " + scope.row.city:""}}</p>
				</template>
			</el-table-column>
			<el-table-column label="营业执照">
				<template scope="scope">
					<el-button :disabled="scope.row.imgUrl?false:true" @click="showImg(scope.row.imgUrl)">查看图片</el-button>
				</template>
			</el-table-column>
			<el-table-column label="资质照片">
				<template scope="scope">
					<el-button @click="showImg(scope.row.orgImgUrls)" :disabled="(scope.row.orgImgUrls==null || scope.row.orgImgUrls.length == 0)? true:false">查看图片</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="bankNumber" label="银行卡号"></el-table-column>
			<el-table-column prop="bankName" label="持卡人姓名"></el-table-column>
			<el-table-column prop="bankIdcard" label="身份证号"></el-table-column>
			<el-table-column prop="marketName" label="市场经理"></el-table-column>
			<el-table-column prop="createtime" label="注册日期" width="200">
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
				<el-button type="primary" @click="checkSubmit"  :disabled="SubmitBtn">确定</el-button>
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
		
		<div class="imgbox" v-if="imgBox" @click="imgBox = false" style="overflow:hidden;overflow-x:scroll">
			<div class="imgbox-wrapper" style="">
				<div v-for="(item,index) in imgUrl" :key="index" class="slide">
					<img :src="item" alt="">
				</div>
			</div>
		</div>

		<!-- <div class="imgMark" v-if="markShow" @click="lookMore()">
          <img :src="markUrl" alt="" ref="imgBox" style="transition:transform 1s">
          <div class="icon">
            <div style="margin-right:10px" @click="rotateR($event)"><img :src="require('../../images/rotateR.png')" alt=""></div>
            <div @click="rotateL($event)"><img :src="require('../../images/rotateL.png')" alt=""></div>
          </div>
      </div> -->
	</section>
</template>

<script>
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';
	import 'element-ui/lib/index.js'
	import util from '../../common/js/util'
	import { institutionPerfect,supplierCheck,supplierauditre} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					orgName: ''
				},
				imgBox:false,
				markShow:false,
        users: [],
        orgRoleType: '1',
				pageSize: 10,
        pageNo: 1,
        total: 0,
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
				SubmitBtn:false,
				imgUrl:[]
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNo = val;
				this.getUsers();
			},
			//审核通过auditreSubmit
      checkSubmit() {
				let para = this.editForm;
				this.SubmitBtn = true;
        supplierCheck(para).then((res) => {
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
        supplierauditre(para).then((res) => {
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
			imgHide(e){
				this.imgBox = false;
			},
      showpasswindow(orgId) {
        this.passwindow = !this.passwindow;
        this.editForm.orgId = orgId;
      },
			auditrejection(orgId) {
        this.auditrewindow = !this.auditrewindow;
        this.auditreForm.orgId = orgId;
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
					status: 0
				};
        this.listLoading = true;
				institutionPerfect(para).then((res) => {
						this.total = res.data.total;
						this.users = res.data.list;
						console.log(this.users,'待完善机构------------')
						this.listLoading = false;
				});
			},
			//查看
			lookMore(){
				this.markShow = true;
			},
			closeMark(){
				this.markShow = false;
			},
			showImg(imgArr){
				this.imgBox = true;
				this.imgUrl = imgArr;
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>
.contentMark{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,.1);
	z-index: 3333;
	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.contentMark .content{
	width:50%;
	height:300px;
	background: #fff;
	box-sizing:border-box;
	padding:20px;
	box-shadow: 0 0 5px #cac6c6;
	position: relative;
}
.content .title{
	border-bottom: 1px solid #ccc;
	padding-bottom: 5px;
	margin-top: 0;
}
.closeBtn{
	position: absolute;
	bottom:20px;right:50px;
}
.imgbox{
	width:100%;
	height:100%;
	position: fixed;
	top:0;
	left:0;
	z-index:1111;
	background: rgba(0,0,0,.7);
	text-align: center;
}

.imgbox-wrapper{
	margin-left:54%;
	display:flex;
	transform:translateX(-50%)
}
.slide{
	display:flex;align-items:center;
}
</style>