<template>
  <div class="content">
      <!--工具条-->
		<el-col :span="50" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.orgName" placeholder="请输入订单号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="Search">查询</el-button>
				</el-form-item>
                <el-form-item class="Search">
					订单状态：
                    <el-select v-model="value" placeholder="请选择" @change="queryState(value)">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
                    </el-option>
                </el-select>
                </el-form-item>
			</el-form>
		</el-col>
    <!-- 搜素列表 -->
    <h5>全部进行中的订单（{{ totalNum }}单）</h5>
        <el-table :data="manage" style="width: 100%">
            <el-table-column fixed prop="orderNo" label="订单号" width="245">
            </el-table-column>
            <el-table-column prop="agentOrgName" label="渠道商" width="180">
            </el-table-column>
            <el-table-column prop="supplierOrgName" label="供应商" width="180">
            </el-table-column>
            <el-table-column prop="payStatusDesc" label="状态" width="180">
            </el-table-column>
            <el-table-column prop="contract" label="电子合同" width="300">
            </el-table-column>
            <el-table-column prop="supplierOrgId" label="订单产品" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
                <el-button type="text" @click="cancel">
                   取消订单
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
import { orderQuery } from '../../api/api'
export default {
    data(){
        return{
            filters:{
                orgName: '',
                productType:'',
                pageNo: 1,
                pageSize: 10
            },
             options: [
                 {
                    value: '1',
                    label: '预订产品'
                },
                {
                    value: '2',
                    label: '录入总金额'
                },
                {
                    value: '3',
                    label: '确认总金额'
                },
                {
                    value: '4',
                    label: '开始计算收益/缴纳质'
                },
                {
                    value: '5',
                    label: '评价'
                }
            ],
            value: '',
            manage: [],
            totalNum:[]    
        }
    },
    methods: {
        nextPage(val){
            console.log(val)
        
          let para = {
            "pageNo": val,
            "pageSize": 10,
            "agentBusiStatus": "",
            "supplierBusiStatus": "",
            "orderNo": ""
            }
        orderQuery(para).then((res => {
            if(res.flag == 20000){               
               this.manage = res.data.list;
               this.totalNum = res.data.total;
            }
        }))  
        },
        cancel(){
            this.$prompt('请填写取消原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(({ value }) => {
                this.$message({
                    type: 'success',
                    message: "操作成功"
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
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
        }
    },
    mounted () {
        let para = {
            "pageNo": 1,
            "pageSize": 10,
            "agentBusiStatus": "",
            "supplierBusiStatus": "",
            "orderNo": ""
            }
        orderQuery(para).then((res => {
            console.log()
            if(res.flag == 20000){               
               this.manage = res.data.list;
               this.totalNum = res.data.total;
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


