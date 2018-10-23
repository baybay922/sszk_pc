<template>
    <!-- 供应商对公账户 -->
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.companyName" placeholder="请输入企业名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="companyName" label="名称">
			</el-table-column>
			<el-table-column prop="" label="营业执照">
                <template scope="scope">
                   <el-button @click="showImg(scope.row.companyUrl)" :disabled="scope.row.companyUrl?false:true">查看图片</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="" label="开户银行许可证扫描件">
                <template scope="scope">
                   <el-button @click="showImg(scope.row.licenseImgUrl)" :disabled="scope.row.licenseImgUrl?false:true">查看图片</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="" label="法人身份证正反面扫描件">
                <template scope="scope">
                   <el-button @click="showImg(scope.row.idCardImgUrls)" :disabled="scope.row.idCardImgUrls.length > 0?false:true">查看图片</el-button>
                </template>
            </el-table-column>
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">					
					<el-button @click="auditRejection(scope.row.id,0)" type="text" size="small">审核通过</el-button>
                    <el-button @click="auditRejection(scope.row.id,1)" type="text" size="small">审核拒绝</el-button>
                    <el-button @click="toDetail(scope.row.id)" type="text" size="small">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="filters.pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="50%"
            :close-on-click-modal="false">
            <el-form :model="filters" label-width="80px" ref="auditreForm">
                <el-form-item label="操作描述">
                <el-input type="textarea" v-model="channel.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="reasonSubmit()">确 定</el-button>
            </span>
        </el-dialog>
        
		<div class="mark" v-if="markShow" @click="markHide()">
            <img v-for="(item,index) in imgUrl" :key="index"  :src="item" alt="">
        </div>
	</section>
</template>

<script>
import util from '../../common/js/util'
import { getsuppliers,lockAccount, enterAccount,passAccount } from '../../api/api';

export default {
	data() {
		return {
			filters: {
                companyName:'',
                orgType:"P",
                pageSize: 10,
			    pageNo: 1,
            },
			users: [],
			orgRoleType: '1',
			total: 0,
            listLoading: false,
            imgUrl:[],
            markShow:false,
            dialogVisible: false,
            channel:{
                checkOut:0,
                id:0,
                remark:""
            },
            title:""
		}
    },
    inject:['reload'], 
	methods: {
         toDetail(id){
            this.$router.push({path:"/viewCompanyInfo",query:{"id":id}})
        },
		handleCurrentChange(val) {
			this.filters.pageNo = val;
			this.getList();
        },
        auditRejection(id,ind){
            this.dialogVisible = true;
            this.channel.id = id;
            console.log(this.channel.id)
             if(ind == 1){
                this.title="审核拒绝"
            }else{
                this.title="审核通过"
            }
        },
        //审核确认
        reasonSubmit(){
            this.dialogVisible = false;
            if(this.title == '审核拒绝'){
                this.channel.checkOut = 1;
            }else{
                this.channel.checkOut = 0;
            }
            console.log(this.channel)
            passAccount(this.channel).then(r=>{
                if(r.flag === 20000){
                     this.$message({
                        message: '操作成功',
                        type: 'success'
                     });
                     this.reload()
                }else{
                    this.$message({
                        message:r.msg ,
						type: 'error'
                     });
                }
            })
            this.channel.remark = ""
        },
        //获取列表
        getList(){
            enterAccount(this.filters).then(r=>{
                this.users = r.data.list;
                console.log(this.users)
            })
        },
        //查看图片
        showImg(url){
            if(url instanceof Array){
                for(var i=0;i<url.length;i++){
                    this.imgUrl.push(url[i])
                }
            }else{
                this.imgUrl.push(url);
            }
            this.markShow = true;
        },
        //图片盒子隐藏
        markHide(){
            this.imgUrl = [];
            this.markShow = false;
        }
	},
	mounted() {
		this.getList()
	}
}

</script>

<style scoped>
.mark{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.7);
    z-index:1;
}
.mark img{
    margin-right:30px;
}
</style>