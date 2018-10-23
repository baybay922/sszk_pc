<template>
    <div class="detail">
        <div>
            <p>订单号：</p>
            <p>{{ orderNo }}</p>
        </div>
        <div>
            <p>订单产品：</p>
            <p>{{ orderName }}</p>
        </div>
        <div>
            <p>订单总金额：</p>
            <p>{{ totalPrice }}</p>
        </div>
        <div>
            <p>渠道商：</p>
            <p>{{ AgentOrgName }}</p>
        </div>
        <div>
            <p>订单分成：</p>
            <p>{{ returnRate }}</p>
        </div>
        <div>
            <p>成单奖励：</p>
            <p>{{groupBuyingRate}}</p>
        </div>
        <div>
            <p>账期：</p>
            <p>{{ agentAccountPeriod }}</p>
        </div>
        <div>
            <p>供应商：</p>
            <p>{{ SupplierOrgName }}</p>
        </div>
         <div>
            <p>订单分成：</p>
            <p>{{ pDivide }}</p>
        </div>
         <div>
            <p>账期：</p>
            <p>{{ supplierAccountPeriod }}</p>
        </div>
        <div>
            <p>当前状态：</p>
            <p v-html="getorderstat(agentBusiStatus)"></p>
        </div>
        <div>
            <p>详细流程：</p>
            <!--<ul class="process">
               <li v-for="(item, index) in orderLogInfoList" :key="index">
                    <p>
                        <span>{{item.createtime}}</span>
                    </p>
                    <p>
                        <span v-html="getstart(item.afterStatus)"></span>
                    </p>
                </li>
            </ul>-->
        </div>
    </div>
</template>
<script>
import { orderDetail } from '../../api/api'
export default {
    data(){
        return{
            orderNo: this.$route.query.orderNo,
            orderName:"",
            totalPrice:"",
            AgentOrgName:"",
            returnRate:"",
            groupBuyingRate:"",
            agentAccountPeriod:"",
            SupplierOrgName:"",
            pDivide:"",
            supplierAccountPeriod:"",
            agentBusiStatus:"",
            orderLogInfoList:"",//订单流程：
            isClient:0,//顾客信息是否填写
            isContract:0,//合同是否签订
            orderLogInfoList:[],
            clientDo:[],
            clientSex:0,
            orderLogInfoList:[]
        }
    },
    methods:{
        getOrderDetail(){
            orderDetail(this.orderNo).then(r =>{
                if(r.flag == 20000){
                    console.log(r.data,'orderDetail')
                    this.orderName = r.data.orderName
                    this.totalPrice = r.data.totalPrice
                    this.AgentOrgName = r.data.agentOrgName
                    this.returnRate = r.data.returnRate
                    this.groupBuyingRate = r.data.groupBuyingRate
                    this.agentAccountPeriod = r.data.agentAccountPeriod
                    this.SupplierOrgName = r.data.supplierOrgName
                    this.pDivide = r.data.pDivide
                    this.supplierAccountPeriod = r.data.supplierAccountPeriod
                    this.agentBusiStatus = r.data.agentBusiStatus
                    this.orderLogInfoList = r.data.orderLogInfoList
                    this.isClient = r.data.isClient
                    this.isContract = r.data.isContract
                    this.orderLogInfoList = r.data.orderLogInfoList
                    if(this.isClient){
                        this.clientDo = r.data.clientDo
                        this.clientSex = r.data.clientDo.clientSex
                    }
                    this.orderLogInfoList = r.data.orderLogInfoList;
                }else{
                    this.$message({
						message: r.msg,
						type: 'error'
            		});
                }
            })
        },
        /*getstart(index){
            switch(index) {//['0-初始;2-创建订单;3-顾客付款;4-确认分账;5-收款;6-评价;9-取消;1-完成']
                case 1:
                return '完成';
                break;
                case 2:
                var write = "",
                    contract= "",
                    sexuality = this.clientSex == 0?"先生":"女士"     
                    if(this.isClient !== 0){
                        write = "</br><span>已填写顾客信息</span></br><span>"+ this.clientDo.clientName +""+sexuality+"，现所在"+this.clientDo.clientProvince+""+this.clientDo.clientArea+""+this.clientDo.incomeLevel+"</br>本次预计消费"+this.clientDo.consumption+"元</br>需求描述："+this.clientDo.describeHealth+"</span>";
                    }
                    if(this.contract !== 0){
                        contract = "渠道商已签署订单合同"
                    }
                return '预定产品'+write+'</br>'+contract
                break;
                case 3:                
                    var str = "";
                    if(this.orderLogInfoList[1].afterStatus == 3){
                        str = "POS机刷卡 付款金额 ￥"+this.orderLogInfoList[1].opNotes
                    }
                    return '顾客付款</br>'+str;
                break;
                case 4:
                var str = "";
                    if(this.orderLogInfoList[2].afterStatus == 4){
                        str = "分账金额￥"+this.orderLogInfoList[2].opNotes
                    }
                return '确认分账</br>'+str;
                break;
                case 5:
                var str = "";
                    if(this.orderLogInfoList[3].afterStatus == 5){
                        str = "到账金额 ￥"+this.orderLogInfoList[3].opNotes
                    }
                return '供应商银行卡到账</br>'+str;
                break;
                case 6:
                return '评价';
                break;
                case 9:
                return '取消';
                break;
                case 0:
                return '初始';
                break;
            }
        },*/
        getorderstat(index){
            switch(index) {//['0-初始;2-创建订单;3-顾客付款;4-确认分账;5-收款;6-评价;9-取消;1-完成']
                case 1:
                return '完成';
                break;
                case 2:
                return '预定产品'
                break;
                case 3:                
                return '顾客付款</br>'+str;
                break;
                case 4:
                return '确认分账</br>';
                break;
                case 5:
                return '供应商银行卡到账</br>';
                break;
                case 6:
                return '评价';
                break;
                case 9:
                return '取消';
                break;
                case 0:
                return '初始';
                break;
            }
        }
    },
    mounted(){
        this.getOrderDetail()
    }
}
</script>
<style scoped>
*{list-style: none;}
.detail{
    width: 100%;
    height: auto;
}
.detail div{
    display: flex;
}
.detail div p:nth-child(1){
    width: 100px;
    text-align: right;
    margin-right: 15px;
}
.detail div p:nth-child(2){   
    text-align: left;
}
.process{
    height: auto;
}
.process li{
    display: flex;
}
.process li p:nth-child(2){
    width: 420px!important;
    line-height: 1.6;
}
</style>


