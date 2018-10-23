<template>
    <!-- pos机退还列表 -->
      <section class="stay-deliver">
		<el-table :data="poss" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="supplierName" label="申请退还供应商" min-width="100"></el-table-column>
			<el-table-column prop="orgName" label="发货人" min-width="100"></el-table-column>
			<el-table-column prop="orgPhone" label="发货人电话" min-width="100"></el-table-column>
            <el-table-column prop="applytime" label="申请退还时间" min-width="100"></el-table-column>
            <el-table-column prop="posCode" label="pos机编号" min-width="100"></el-table-column>
            <el-table-column prop="express" label="快递公司" min-width="100"></el-table-column>
            <el-table-column prop="courierNumber" label="快递单号" min-width="100"></el-table-column>
			<el-table-column label="状态" width="200">
				<template scope="scope">
					<el-button size="small" @click="toCollect(scope.row.causeOfReturn, scope.row.courierNumber, scope.row.express, scope.row.orderNo, scope.row.orgId, scope.row.orgName,scope.row.orgPhone, scope.row.posCode,scope.row.reclaimRemark,scope.row.supplierName)">确认收货</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="form.pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
import {returnListPos,returnCollect} from '../../api/api.js'
    export default {
        name:"returnPosList",
        data(){
            return {
                poss:[],
                form:{
                    orgName:"",
                    orgPhone:"",
                    posCode:"",
                    express:"",
                    courierNumber:'',
                    pageNo:1,
                    pageSize:10
                },
                total:0,
                listLoading: false,
            }
        },
        methods:{
            handleCurrentChange(val){
                this.form.pageNo = val;
				this.getposs();
            },
            getposs(){
                this.listLoading = true;
                returnListPos(this.form).then( res => {
                    if(res.flag === 20000){
                        this.poss = res.data.list;
                        this.total = res.data.total;
                        this.listLoading = false;
                    }
                })
            },
            //确认收货按钮
            toCollect(causeOfReturn, courierNumber, express, orderNo, orgId, orgName,orgPhone, posCode,reclaimRemark,supplierName){
                this.$router.push({
                    path:"/returnPos",
                    query:{
                        causeOfReturn,
                        courierNumber,
                        express,
                        orderNo,
                        orgId,
                        orgName,
                        orgPhone,
                        posCode,
                        reclaimRemark,
                        supplierName
                    }
                })
                
            }
        },
        mounted() {
            this.getposs()
        },
    }
</script>

<style scoped>

</style>