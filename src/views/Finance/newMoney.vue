<template>
    <section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="订单查询">
					<el-input v-model="filters.orderNo" placeholder="请输入订单号码"></el-input>
				</el-form-item>
                <el-form-item>
                    <el-button @click="getData">搜索</el-button>
                </el-form-item>
			</el-form>
		</el-col>

        <el-col class="detail" v-if="productList">
            <div>
                <p>供应商</p>
                <p class="content" style="margin-left:25px;">{{supplierOrgName}}</p>
            </div>
            <div>
                <p>渠道商</p>
                <p class="content" style="margin-left:25px;">{{agentOrgName}}</p>
            </div>
            <div>
                <p>产品</p>
                <p class="content" style="margin-left:44px;">{{orderName}}</p>
            </div>
            <div>
                <p>转账金额</p>
                <el-form class="content" style="width:220px;">
                    <el-form-item>
                        <el-input placeholder="请输入转账金额，单位元" v-model="filters.orderPrice"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <p>转账时间</p>
                <div class="block content">
                    <el-date-picker
                    v-model="filters.paytime"
                    type="datetime"
                    @change="getTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                    </el-date-picker>
                </div>
            </div>
            <el-form>
                <el-form-item>
                    <el-button @click="submit" type="primary" style="margin-left: 132px;margin-top: 30px;">保存</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        
    </section>
</template>

<script>
    import {getMoneyOrder, bindingAmount} from '../../api/api.js'
    export default {
        name:"newMoney",
        data(){
            return {
                filters:{
                    orderNo:"",
                    orderPrice:"",
                    paytime:""
                },
                productList:false,
                supplierOrgName:"",
                agentOrgName:"",
                orderName:""
            }
        },
        methods:{
            //搜索按钮
            getData(){
                this.filters.orderNo = this.filters.orderNo * 1;
                getMoneyOrder(this.filters.orderNo).then(res => {
                    if(res.flag === 20000){
                        this.productList = true;
                        this.supplierOrgName = res.data.supplierOrgName;
                        this.agentOrgName = res.data.agentOrgName;
                        this.orderName = res.data.orderName;
                    }else{
                        this.$message({
							message: res.msg,
							type: 'error'
						});
                    }
                })
            },
            //提交按钮
            submit(){
                bindingAmount(this.filters).then(res => {
                    console.log(res);
                    if(res.flag === 20000){
                        this.$message({
							message: '操作成功',
							type: 'success'
                        });
                        this.$router.push('/bankTransfer')
                    }else{
                        this.$message({
							message: res.msg,
							type: 'error'
						});
                    }
                })
            },
            getTime(date){
               this.filters.paytime = date;
               console.log(this.filters.paytime)
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>
    .toolbar{
        background: transparent;
    }
    .detail{
        padding-left:10px;
    }
    .detail>div{
        padding:5px 0;
        display:flex;
    }
    .detail>div .content{
        margin-left:16px;
    }
</style>