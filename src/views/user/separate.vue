<template>
    <el-form ref="form" :model="form" label-width="120px" class="form-wrapper">
        <el-form-item label="账期(T+N工作日)">
            <el-input v-model="form.account" placeholder="请输入有效的账期" style="width:200px;" @blur="getAccountVal"></el-input>
        </el-form-item>
         <el-form-item label="奖金比例(%)">
            <el-input v-model="form.bonusRatio" placeholder="请输入有效的奖励比例(%)" style="width:200px;" @blur="getBonusRatioVal"></el-input>
        </el-form-item>
        <el-button size="primary" @click="submit" style="float:left;margin:0 10px;">保存</el-button>
    </el-form> 
</template>
<script>
import util from '../../common/js/util'
import { setBounty, getDistribution } from '../../api/api';
export default {
    data(){
        return{
            orgId : this.$route.query.orgId,
            orgType:this.$route.query.orgType,
            form:{
                account:'',
                bonusRatio:''
            }
        }
    },
    methods:{
        getAccountVal(){//检验是否未纯数
            if(isNaN(this.form.account)){
                this.$message({
                    message: '请输入纯数字的账期',
                    type: 'error'
                });
                this.form.account = ""
            }
        },
        getBonusRatioVal(){
            if(isNaN(this.form.account)){
                this.$message({
                    message: '请输入纯数字的比例',
                    type: 'error'
                });
                this.form.bonusRatio = ""
            }
            if(this.form.bonusRatio.toString().split(".")[1]){
                let len = this.form.bonusRatio.toString().split(".")[1].length || 0;
                if(len > 1){
                    this.$message({
                        message: '奖金比例仅支持最多1位小数',
                        type: 'error'
                    });
                }
            }
            
        },
        submit(){
            if(this.form.account == "" || this.form.bonusRatio == ""){
                 this.$message({
                    message: '请输入正确的信息',
                    type: 'error'
                });
            }else{
                let para = {
					orgId: this.orgId,
                    accountPeriod: this.form.account,
                    bountyPrice: this.form.bonusRatio
                };
				setBounty(para).then((res) => {
                    if(res.flag == 20000){
                        if(this.orgType == "B"){
                            this.$message({
                                message: '设置成功',
                                type: 'success'
                            });
                            let path = {path:'/Ublistp',query:{}}
                            this.$router.push(path)
                        }else if(this.orgType == "C"){
                            this.$message({
                                message: '设置成功',
                                type: 'success'
                            });
                            let path = {path:'/Uclistp',query:{}}
                            this.$router.push(path)
                        }else if(this.orgType == "P"){
                            this.$message({
                                message: '设置成功',
                                type: 'success'
                            });
                            let path = {path:'/suplierp',query:{}}
                            this.$router.push(path)
                        }else if(this.orgType == "D"){
                            this.$message({
                                message: '设置成功',
                                type: 'success'
                            });
                            let path = {path:'/AlreadyDoctor',query:{}}
                            this.$router.push(path)
                        }
                        
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
					
				});
            }
            
        },
        getDistribution(){
            getDistribution(this.orgId).then((res)=>{
                console.log(res)
                if(res.flag == 20000){
                    this.form.account = res.data.accountPeriod
                    this.form.bonusRatio = res.data.bountyPrice
                }else{
                    
                }
            })
        }
    },
    mounted() {
        this.getDistribution()
    },
}
</script>
<style>
    .form-wrapper{
        margin-top: 20px;
    }
    
</style>

