<template>
    <!-- pos机退还确认收货 -->
    <el-form ref="form" label-width="120px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="供应商机构">{{form.supplierName}}</el-form-item>
        <el-form-item label="机构负责人">{{form.orgName}}</el-form-item>
        <el-form-item label="收货人电话">{{form.orgPhone}}</el-form-item>
        <el-form-item label="快递公司" >{{form.express}}</el-form-item>
        <el-form-item label="订单编号" >{{form.courierNumber}}</el-form-item>
        <el-form-item label="POS机编号" >{{form.posCode}}</el-form-item>
        <el-form-item label="退还原因" >{{form.causeOfReturn}}</el-form-item>
        <el-form-item label="退还备注" v-if="form.causeOfReturn=='其他'? 1:0">{{form.reclaimRemark}}</el-form-item>
        <el-form-item label="是否损坏" >
        <!-- 是否损坏 -->
            <el-select v-model="form.value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item label="扣除押金" class="deductMoney">
            <el-input style="width:217px;" v-model="form.deductDeposit" :disabled="form.value == '否'? true:false"></el-input>
            <span class="money">元</span>
        </el-form-item>

        <el-form-item label="收货备注">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.textarea"
                style="width:300px;height:150px;">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认收货</el-button>
            <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
import {confirmCollect} from '../../api/api.js'
    export default {
        name:"ReturnPOS",
        data(){
            return {
                form:{
                    causeOfReturn:this.$route.query.causeOfReturn,
                    courierNumber:this.$route.query.courierNumber,
                    express:this.$route.query.express,
                    orderNo:this.$route.query.orderNo,
                    orgId:this.$route.query.orgId,
                    orgName:this.$route.query.orgName,
                    orgPhone:this.$route.query.orgPhone,
                    posCode:this.$route.query.posCode,
                    reclaimRemark:this.$route.query.reclaimRemark,
                    supplierName:this.$route.query.supplierName,
                    textarea:"",
                    deductDeposit:"",
                    value: '否'  
                },
                options: [{
                        value: '是',
                        label: '是'
                    }, {
                        value: '否',
                        label: '否'
                }],
                             
            }
        },
        methods:{
            onSubmit(){
                let curForm = {
                    causeOfReturn:this.form.causeOfReturn,
                    courierNumber:this.form.courierNumber,
                    express:this.form.express,
                    orderNo:this.form.orderNo,
                    orgId:this.form.orgId,
                    orgName:this.form.orgName,
                    orgPhone:this.form.orgPhone,
                    posCode:this.form.posCode,
                    reclaimRemark:this.form.reclaimRemark,
                    supplierName:this.form.supplierName,
                    remark:this.form.textarea,
                    deductDeposit:this.form.value == '否'? '':this.form.deductDeposit,
                    isDamaged:this.form.value == '否' ? 0 : 1
                }
               confirmCollect(curForm).then( res => {
                   if(res.flag === 20000){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.$router.push('/returnPosList')
                   }else{
                       this.$message({
                            message:res.msg,
                            type: 'error'
                        });
                   }
               })
            }
        }
    }
</script>

<style scoped>
textarea{
    height:100%!important;
}
.deductMoney{
    position: relative;
}
.deductMoney .money{
    position:absolute;
    left:190px;
    z-index: 1;
}
</style>