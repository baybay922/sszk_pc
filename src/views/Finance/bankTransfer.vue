<template>
    <section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item >
					<el-input v-model="filters.num" placeholder="请输入订单号码"></el-input>
				</el-form-item>
                <el-form-item>
                    <el-button>搜索</el-button>
                </el-form-item>
			</el-form>
		</el-col>
        <el-col class="listNum">全部银行卡转账的款项（{{listNum}}笔）</el-col>
		<!--列表-->
		<el-table :data="transferList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="orderNo" label="订单号" >
			</el-table-column>
			<el-table-column prop="agentOrgName" label="渠道商" min-width="100">
			</el-table-column>
            <el-table-column prop="supplierOrgName" label="供应商"></el-table-column>
            <el-table-column prop="totalPrice" label="转账金额"></el-table-column>
            <el-table-column prop="paytime" label="转账时间"></el-table-column>
            <el-table-column prop="orderName" label="订单产品">

            </el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="filters.pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
	</section>
</template>

<script>
    import { bankCardList } from '../../api/api.js'
    export default {
        name:"bankTransfer",
        data(){
            return {
                filters:{
                    pageNo:1,
                    pageSize:10,
                    orderNo:""
                },
                total:0,
                transferList:[],
                listLoading: false,
                listNum:0
            }
        },
        methods:{
            handleCurrentChange(){
                this.filters.pageNo = val;
				this.getBankTransfer();
            },
            getBankTransfer(){
                this.listLoading = true;
                bankCardList(this.filters).then( res => {
                    console.log(res)
                    if(res.flag === 20000){
                        this.total = res.data.total;
                        this.listNum = res.data.total;
                        this.transferList = res.data.list;
                        this.listLoading = false;
                    }
                })
            }
        },
        mounted(){
            this.getBankTransfer();
        }
    }
</script>

<style scoped>
    .listNum{
        padding:15px 0;
        border-top:1px solid #EEE;
        border-bottom:1px solid #EEE;
        font-size:14px;
        color:#909399;
    }
</style>