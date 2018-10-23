<template>
    <!-- 发货 -->
    <el-form ref="form" label-width="120px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="申请供应商" class="orgInfo">{{pos.supplierName}}</el-form-item>
        <el-form-item label="收货人" class="orgInfo">{{pos.orgName}}</el-form-item>
        <el-form-item label="收货人电话" class="orgInfo">{{pos.orgPhone}}</el-form-item>
        <el-form-item label="收货地址">{{pos.address}}</el-form-item>
        <el-form-item label="POS机编号">
            <el-input ref="inputBox" v-model="pos.posCode" placeholder="请输入POS机编号" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="快递公司">
            <el-input ref="inputBox" v-model="pos.express" style="width:200px;" placeholder="请输入快递公司"></el-input>
        </el-form-item>
        <el-form-item label="快递单号">
            <el-input ref="inputBox" v-model="pos.courierNumber" style="width:200px;" placeholder="请输入快递单号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认发货</el-button>
            <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
import {confirmDelivery} from '../../api/api.js'
    export default {
        name:'deliver',
        data(){
            return {
                pos:{
                    orgId:this.$route.query.orgId,
                    orderNo:this.$route.query.orderNo,
                    supplierName:this.$route.query.supplierName,
                    orgName:this.$route.query.orgName,
                    orgPhone:this.$route.query.orgPhone,
                    address:this.$route.query.address,
                    posCode:"",
                    express:"",
                    courierNumber:""
                }
            }
        },
        methods:{
            onSubmit(){
                if(this.pos.posCode == "" || this.pos.express == "" || this.pos.courierNumber == ""){
                    this.$message({
                        message:"请完善发货信息",
                        type: 'error'
                    });
                }else{
                    confirmDelivery(this.pos).then( res =>{
                        if(res.flag === 20000){
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.$router.push('/stayDeliver')
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }
                
            }
        }
    }
</script>

<style scoped>
.remarks textarea{
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