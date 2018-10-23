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
                    <div v-if="scope.row.orderType == 1 && scope.row.cooperationOrgId == 0">
                        <el-button type="text" @click="orderallotB(scope.row.orderNo)" >
                            分配渠道商
                        </el-button>
                    </div>
                    <!-- <div v-if="scope.row.agentBusiStatus == 2">
                        
                    </div> -->
                    <el-button type="text" @click="cancel(scope.row.orderNo)">
                        取消订单
                    </el-button>
                    <el-button type="text" @click="frzcal(scope.row.orderNo)">
                    冻结
                    </el-button>
                    <el-button type="text" @click="checkOrder(scope.row.orderNo)">
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

      <!-- 订单冻结 -->
      <el-dialog title="订单冻结" :visible.sync="passwindow" :close-on-click-modal="false">
          <el-form :model="editForm" label-width="80px" ref="editForm">
              <el-form-item label="操作描述">
                  <el-input type="textarea" v-model="editForm.frzNotes"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click.native="passwindow = false">取消</el-button>
              <el-button type="primary" @click="checkSubmit">确定</el-button>
          </div>
      </el-dialog>
      <!-- 订单取消 -->
      <el-dialog title="订单取消" :visible.sync="passwindow1" :close-on-click-modal="false">
          <el-form :model="cancelForm" label-width="80px" ref="cancelForm">
              <el-form-item label="操作描述">
                  <el-input type="textarea" v-model="cancelForm.reason"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click.native="passwindow1 = false">取消</el-button>
              <el-button type="primary" @click="checkSubmito">确定</el-button>
          </div>
      </el-dialog>
  </div>
</template>
<script>
import util from '../../common/js/util'
import { orderQuery ,frzOrder,cancelOrder} from '../../api/api'
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
                    value: '2',
                    label: '预订产品'
                },
                {
                    value: '3',
                    label: '顾客付款'
                },
                {
                    value: '4',
                    label: '确认分账'
                },
                {
                    value: '5',
                    label: '收款'
                },
                {
                    value: '6',
                    label: '评价'
                }
            ],
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
                console.log(res)
               this.manage = res.data.list;
               this.totalNum = res.data.total;
            }
        }))
        },
        //订单冻结
        checkSubmit() {
            let para = this.editForm
            frzOrder(para).then((res) => {
                if(res.flag == 20000) {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                this.passwindow = false;
                this.getOrderList();
            } else {
                this.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        });
        },
        frzcal(orderNo){
            this.passwindow = !this.passwindow;
            this.editForm.orderNo = orderNo;
            this.editForm.type = 1;
        },
        //订单取消
        checkSubmito() {
            let para1 = this.cancelForm
            console.log(111)
            cancelOrder(para1).then((res) => {
                if(res.flag == 20000) {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                this.passwindow1 = false;
                this.getOrderList();
            } else {
                this.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        });
        },
        cancel(orderNo){
            this.passwindow1 = !this.passwindow1;
            this.cancelForm.orderNo = orderNo;
            this.cancelForm.cancelType = 4;
        },
        /*cancel(){
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
        },*/
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
        },
        getOrderList(){
            let para = {
                pageNo: 1,
                pageSize: 10,
                agentBusiStatus: "",
                supplierBusiStatus: "",
                orderNo: ""
            }
            this.listLoading = true;
            orderQuery(para).then((res) => {
                if(res.flag == 20000){
                this.manage = res.data.list;
                this.totalNum = res.data.total;
            }
        });
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
            console.log(res)
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


