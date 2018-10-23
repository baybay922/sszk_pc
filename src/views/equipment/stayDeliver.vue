<template>
    <!-- 待发货POS机 -->
    <section class="stay-deliver">
		<el-table :data="poss" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="supplierName" label="申请供应商" min-width="100"></el-table-column>
			<el-table-column prop="orgName" label="收货人" min-width="100"></el-table-column>
			<el-table-column prop="orgPhone" label="收货人电话" min-width="100"></el-table-column>
            <el-table-column prop="address" label="收货地址" min-width="100"></el-table-column>
            <el-table-column prop="applytime" label="申请时间" min-width="100"></el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="toedipos(scope.row.supplierName,scope.row.orgName,scope.row.orgPhone,scope.row.address,scope.row.orderNo,scope.row.orgId)">发货</el-button>
				</template>
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
import {staydeliverPos} from '../../api/api.js'
    export default {
        name:"stayDeliver",
        data(){
            return {
                listLoading: false,
                poss:[],
                filters: {
					orgName:'',
					orgPhone:'',
                    pageNo: 1,
                    pageSize: 10
                },
                total:0,
                status:this.$route.query.status
            }
        },
        methods: {
            toedipos(supplierName,orgName,orgPhone,address,orderNo,orgId){
                this.$router.push({
                    path:"/deliver",
                    query:{
                        supplierName,
                        orgName,
                        orgPhone,
                        address,
                        orderNo,
                        orgId
                    }
                })
            },
            handleCurrentChange(val) {
				this.filters.pageNo = val;
				this.getposs();
            },
            getposs(){
                this.listLoading = true;
                staydeliverPos(this.filters).then( res =>{
                    if(res.flag === 20000 ){
                        this.total = res.data.total;
                        this.poss = res.data.list;
                        this.listLoading = false;
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
            }
        },
        mounted(){
            //请求列表数据
            this.getposs();
        }
    }
</script>

<style scoped>

</style>