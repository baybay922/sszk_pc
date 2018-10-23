<template>
  <div class="content">
      <!--工具条-->
      <el-col>
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.orgName" placeholder="请输入订单号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="Search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <!-- 搜素列表 -->
    <h5>全部进行中的订单（{{ totalNum }}单）</h5>
        <el-table :data="manage" style="width: 100%">
            <el-table-column fixed prop="orderNo" label="订单号">
            </el-table-column>
            <el-table-column prop="agentOrgName" label="渠道商">
            </el-table-column>
            <el-table-column prop="supplierOrgName" label="供应商">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.agentBusiStatus == 0">
                        初始
                    </div>
                     <div v-if="scope.row.agentBusiStatus == 1">
                        完成
                    </div>
                     <div v-if="scope.row.agentBusiStatus == 2">
                        创建订单
                    </div>
                     <div v-if="scope.row.agentBusiStatus == 3">
                        顾客付款
                    </div>
                     <div v-if="scope.row.agentBusiStatus == 4">
                        确认分账
                    </div>
                     <div v-if="scope.row.agentBusiStatus == 5">
                        收款
                    </div>
                     <div v-if="scope.row.agentBusiStatus == 6">
                        评价
                    </div>
                     <div v-if="scope.row.agentBusiStatus == 9">
                        取消
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="电子合同">
                <template slot-scope="scope">
                    <div v-if="scope.row.isContract == 2 || scope.row.isContract ==1 ">
                        是
                    </div>
                    <div v-if="scope.row.isContract == 0">
                        否
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="orderName" label="订单产品">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
                <el-button type="text"  @click="checkOrder(scope.row.orderNo)">
                   查看
                </el-button>
            </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination
            small
            layout="prev, pager, next"
            :total="totalNum"
            :page-size="filters.pageSize"
            @current-change="nextPage">
            </el-pagination>
        </div>
  </div>
</template>


<script>
import util from '../../common/js/util'
import { orderQuery ,frzOrder,cancelOrder, finishOrder} from '../../api/api'
export default {
    data(){
        return{
            filters:{
                orgName: '',
                productType:'',
                pageNo: 1,
                pageSize: 10
            },
            passwindow1: false,
            cancelForm: {
                orderNo: '',
                reason: '',
                cancelType:''
            },
            value: '',
            manage: [],
            totalNum:[],
            passwindow: false,
            editForm: {
                orderNo: '',
                frzNotes: '',
                type:''
            }
        }
    },
    methods: {
        checkOrder(orderNo){
            let path = {path: './checkOrder',query:{orderNo: orderNo}}
            this.$router.push(path)
        },
        nextPage(val){
          let para = {
            "pageNo": val,
            "pageSize": 10,
            "agentBusiStatus": "",
            "supplierBusiStatus": "",
            "orderNo": ""
            }
        finishOrder(para).then((res => {
            if(res.flag == 20000){
               this.manage = res.data.list;
               this.totalNum = res.data.total;
            }
        }))
        },
        Search(){//搜索
            let orderVal = this.filters.orgName;
            if(orderVal == ""){
                this.$message('请输入您要查询的账单号');
            }else{
                let para = {
                    "pageNo": 1,
                    "pageSize": 10,
                    "agentBusiStatus": "",
                    "supplierBusiStatus": "",
                    "orderNo": this.filters.orgName
                }
                orderQuery(para).then((res => {
                    if(res.flag == 20000){
                        console.log(res)
                        this.manage = res.data.list
                    }else{
                        this.$message('请输入正确的账单号');
                    }
                }))
            }
        },
        queryState(val){
            let para = {
                    "pageNo": 1,
                    "pageSize": 10,
                    "agentBusiStatus": val,
                    "supplierBusiStatus": val,
                    "orderNo": this.filters.orgName
                }
                orderQuery(para).then((res => {
                    if(res.flag == 20000){
                        this.manage = res.data.list
                    }
                }))
        },
        orderallotB(orderNo){
            let path = {path: '/orderallot', query: {orderNo: orderNo}};
            this.$router.push(path);
        }
    },
    mounted () {
        let para = {
            "pageNo": 1,
            "pageSize": 10,
            "orderNo": ""
            }
        finishOrder(para).then((res => {
            console.log(res)
            if(res.flag == 20000){
               this.manage = res.data.list;
               this.totalNum = res.data.list.length;
            }
        }))
    }

}
</script>
<style scoped>
.content{
    position: relative;
    padding-bottom: 50px;
}
.el-col-50{
    width: 100%;
}
.Search{
    margin-left: 50px;
}
.block{
    position: absolute;
    bottom: 20px;
    right: 20px;
}
</style>


