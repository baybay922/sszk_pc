<template>
    <el-form ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;width:80%;min-width:600px;">
        <el-form-item label="渠道商姓名">
            <el-input v-model="form.name" placeholder="请输入渠道商姓名" style="width:200px"></el-input>
		</el-form-item>
        <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号" style="width:200px"></el-input>
		</el-form-item>
        <el-form-item label="电子邮箱">
            <el-input v-model="form.email" placeholder="请输入电子邮箱" style="width:200px"></el-input>
		</el-form-item>
        <el-form-item label="身份证号">
            <el-input v-model="form.cardId" placeholder="请输入身份证码" style="width:200px"></el-input>
		</el-form-item>
        <el-form-item label="账期">
            <span>T+</span><el-input ref="inputBox" type="number" v-model="form.accountPeriod" placeholder="0" style="width: 200px;margin-left:20px;"></el-input>
		</el-form-item>
        <el-form-item label="信用分">
			{{ form.creditRate }} + <span style="color: red;">{{ form.manualScore }}</span> = {{ parseInt(form.creditRate)+parseInt(form.manualScore) }}
            <span style="margin-left: 30px;">加权分<el-input ref="inputBox" v-model="form.manualScore" type="number" placeholder="0" style="width: 120px;margin-left:20px;"></el-input></span>
		</el-form-item>
        <!-- <el-form-item label="推荐人姓名">
            <el-input ref="inputBox" type="number" v-model="form.RecommendName" placeholder="0" style="width: 200px;margin-left:20px;"></el-input>
		</el-form-item> -->
        <el-form-item label="推荐人手机号">
            <el-input ref="inputBox" type="number" v-model="form.RecommendPhone" placeholder="0" style="width: 200px;margin-left:20px;"></el-input>
		</el-form-item>
        <el-button style="width:100px;" type="primary" @click="onSubmit">保存</el-button>
    </el-form>
</template>
<script>
	import { ChannelModify, ChanneUpdata } from '../../api/api';
export default {
    data(){
        return{
            orgId:this.$route.query.orgId,
            type: this.$route.query.type,
            form: {
                name: "",
                phone: "",
                email: "",
                cardId: "",
                accountPeriod: "0",
                manualScore: "0",
                creditRate: "0",
                RecommendName: "",
                RecommendPhone: ""
            }
        }
    },
    methods:{
        onSubmit(){
            let para = {
                orgId: this.orgId,
                agentCName: this.form.name,
                agentCPhone: this.form.phone,
                agentCEmail: this.form.email,
                agentCCard: this.form.cardId,
                agentCThare: this.form.accountPeriod,
                agentCCreditRate: this.form.manualScore,
                agentCManualScore: this.form.creditRate,
                agentCsellNum: 0,
                agentCManualSellNum: 0,
                // inviterName: this.form.RecommendName,
                inviterPhone: this.form.RecommendPhone,
                status:1
            }
            console.log(para)
            ChanneUpdata(para).then(r =>{
                console.log(this.type)
                if(r.flag == 20000){
                    if(this.type == 0){
                        let path = {path:'/uclistp',query:{}}
                        this.$router.push(path)
                    }else{
                        let path = {path:'/uclist',query:{}}
                        this.$router.push(path)
                    }
                    
                }else{
                    this.$message({
                        type: 'error',
                        message: r.msg
                    });
                }
            })
        }
    },
    mounted(){        
        this.listLoading = true;
        ChannelModify(this.orgId).then(r =>{
            console.log(r)
            if(r.flag == 20000){
                this.form.name = r.data.agentCName
                this.form.phone = r.data.agentCPhone
                this.form.email = r.data.agentCEmail
                this.form.cardId = r.data.agentCCard
                this.form.accountPeriod = r.data.agentCThare
                this.form.manualScore = r.data.agentCCreditRate
                this.form.creditRate = r.data.agentCManualScore
                // this.form.RecommendName = r.data.inviterName
                this.form.RecommendPhone = r.data.inviterPhone
            }else{
                this.$message({
                    type: 'error',
                    message: r.msg
                });
            }
        })
    }
}
</script>

