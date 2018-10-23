<template>
    <!-- 使用中POS机 -->
    <section class="usingPOS">
		<el-table :data="poss" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="supplierName" label="使用供应商" min-width="100"></el-table-column>
			<el-table-column prop="orgName" label="负责人" min-width="100"></el-table-column>
			<el-table-column prop="orgPhone" label="负责人电话" min-width="100"></el-table-column>
            <el-table-column prop="posCode" label="pos机编号" min-width="100"></el-table-column>
            <el-table-column prop="expressStatus" label="状态" min-width="100">
                <template scope="scope">
                    <el-col v-if="scope.row.expressStatus == 0">未申请</el-col>
                    <el-col v-if="scope.row.expressStatus == 1">等待配送</el-col>
                    <el-col v-if="scope.row.expressStatus == 2">使用中</el-col>
                    <el-col v-if="scope.row.expressStatus == 4">退还中</el-col>
                </template>
            </el-table-column>
            <el-table-column prop="paytime" label="付款时间" min-width="100">
                <template scope="scope">
                    <p>{{scope.row.paytime}}</p>
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
import {usingPosList} from '../../api/api.js'
    export default {
        name:'usingPOS',
        data(){
            return {
                listLoading: false,
                poss:[],
                filters: {
                    orgName:'',
                    orgPhone:'',
                    posCode:'',
                    pageNo: 1,
                    pageSize: 10
                },
                total:0,
                status:0
            }
        },
        methods: {
            handleCurrentChange(val) {
				this.filters.pageNo = val;
				this.getUsingList();
            },
            getUsingList(){
                this.listLoading = true;
                usingPosList(this.filters).then( res => {
                    console.log(res,'使用中…………………………')
                    if(res.flag === 20000){
                        this.total = res.data.total;
                        this.poss = res.data.list;
                        this.listLoading = false;
                    }
                })
            },
            formatDate(timestamp){
                let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())+ " ";
                let H = (date.getHours()< 10 ? "0" + date.getHours(): date.getHours()) +':';
                let Min = (date.getMinutes <10 ? "0" + date.getMinutes():date.getMinutes()) + ':';
                if(Min == "0:") Min = "00:";
                let S = (date.getSeconds <10 ? "0" + date.getSeconds():date.getSeconds()) ;
                if(S == 0)S = "00";
                return Y+M+D+H+Min+S;
            }
        },
        mounted () {
            this.getUsingList()
        }
    }
</script>

<style scoped>

</style>