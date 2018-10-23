import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Uclist from './views/user/Uclist.vue'
import Uclistp from './views/user/Uclistp.vue'
import Ublist from './views/user/Ublist.vue'
import Ublistp from './views/user/Ublistp.vue'
import suplierp from './views/user/suplierp'
import supliernp from './views/user/supliernp'
import supplierAdd from './views/user/supplierAdd.vue'
import productaAdd from './views/product/productadd.vue'
import lowerFrame from './views/product/lowerFrame.vue'
import prolistDown from './views/product/prolistdown'
import prolistDownp from './views/product/prolistdownp'
import Form from './views/nav1/Form.vue'
import ordermanager from './views/order/ordermanager.vue'
import orderallot from './views/order/orderallot.vue'
import poslist from './views/equipment/poslist.vue'
import posadd from './views/equipment/posadd.vue'
import PersonalModification from './views/user/PersonalModification.vue'
import enterpriseModification from './views/user/enterpriseModification.vue'
import AlreadyDoctor from './views/user/AlreadyDoctor.vue'
import notAlreadyDoctor from './views/user/notAlreadyDoctor.vue'
import doctorMaterial from './views/user/doctorMaterial.vue'
import AlreadyFrozen from './views/order/AlreadyFrozen'
import finishOrder from './views/order/finishOrder'
import checkOrder from './views/order/checkOrder'
import evaluatelist from './views/operation/evaluatelist.vue'
import management from './views/management/management'
import marketPersonnel from './views/management/marketPersonnel'
import stayDeliver from './views/equipment/stayDeliver.vue' //代发货POS机
import usingPos from './views/equipment/usingPOS.vue' //使用中POS机
import returnPosList from './views/equipment/returnPosList.vue' //退还pos机列表
import returnPos from './views/equipment/ReturnPOS.vue'  //pos机退还确认收货
import deliver from './views/equipment/deliver.vue' //POS机发货
import poscode from './views/equipment/posCodeList.vue' //POS机发货
import institution from './views/user/institution.vue'  //潜在机构用户
import docutor from './views/user/docutor.vue' //潜在医生用户
import uclistLatent from './views/user/uclistLatent.vue' //潜在个体渠道商
import ublistLatent from './views/user/ublistLatent.vue' //潜在企业渠道商
import newMoney from './views/Finance/newMoney.vue'  //新增款项
import bankTransfer from './views/Finance/bankTransfer.vue' //银行卡转账款项
import enterpriseAccount from './views/user/enterpriseAccount.vue' //供应商对公账户
import channelAccount from './views/user/channelAccount.vue' //渠道商对公账户
import viewCompanyInfo from './views/user/viewCompanyInfo.vue' //查看企业对公信息
import separate from './views/user/separate.vue' //查看企业对公信息
import orderRewardDo from './views/order/orderRewardDo.vue' //提现审核

// import user from './views/nav1/user.vue'
// import Page4 from './views/nav2/Page4.vue'
// import Page5 from './views/nav2/Page5.vue'
// import Page6 from './views/nav3/Page6.vue'
// import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/main',
        component: Home,
        name: '供应商管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path:'/institution',component: institution, name:'待完善机构'},
            { path: '/supliernp', component: supliernp, name: '待审核机构' },
            { path:'/enterpriseAccount', component:enterpriseAccount, name:"待审核企业对公账户"},

            { path: '/suplierp', component: suplierp, name: '已审核机构' },
            { path: '/supplierAdd', component: supplierAdd, name: '新机构资料录入' },
            { path:"/docutor", component:docutor, name:"待完善医生" },
            { path: '/notAlreadyDoctor', component: notAlreadyDoctor, name: '待审核医生' },
            { path: '/AlreadyDoctor', component: AlreadyDoctor, name: '已审核医生' },
            { path: '/doctorMaterial', component: doctorMaterial, name: '新医生资料录入' }
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '渠道商管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path:'/uclistLatent', component:uclistLatent, name:"待完善个人渠道商"},
            { path: '/uclist', component: Uclist, name: '待审核个人渠道商' },
            { path:'/channelAccount', component:channelAccount, name:"待审核企业对公账户"},
            { path:'/viewCompanyInfo', component:viewCompanyInfo, name:"", hidden:true},
            { path: '/uclistp', component: Uclistp, name: '已审核个人渠道商' },
            { path:"/ublistLatent", component:ublistLatent, name:"待完善企业渠道商"},
            { path: '/ublist', component: Ublist, name: '待审核企业渠道商' },
            { path: '/ublistp', component: Ublistp, name: '已审核企业渠道商' },
            { path: '/enterpriseModification', component: enterpriseModification, name: '待审核企业渠道商',hidden: true},
            { path: '/PersonalModification', component: PersonalModification, name: '个人渠道商资料修改',hidden: true },
            { path: '/separate', component: separate, name: '设置账期奖金',hidden: true }

        ]
    },
    {
        path: '/main',
        component: Home,
        name: '产品管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/prolistdown', component: prolistDown, name: '待审核产品' },
            { path: '/prolistdownp', component: prolistDownp, name: '已上架产品' },
            { path: '/lowerFrame', component: lowerFrame, name: '已下架产品' },
            { path: '/productadd', component: productaAdd, name: '新产品资料录入' }
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '订单管理',
        iconCls: 'el-icon-tickets',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/ordermanager', component: ordermanager, name: '进行中的订单' },
            { path: '/orderallot', component: orderallot, name: 'B渠道商列表',hidden: true },
            { path: '/AlreadyFrozen', component: AlreadyFrozen, name: '已冻结的订单',hidden: false },
            { path: '/finishOrder', component: finishOrder, name: '已结束的订单',hidden: false },
            { path: '/checkOrder', component: checkOrder, name: '订单',hidden: true },
            
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '设备管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/poslist', component: poslist, name: '已录入pos机' },
            { path: '/posadd', component: posadd, name: '新pos机录入' },
            { path: '/stayDeliver', component: stayDeliver, name: '待发货POS机'},
            { path: "/deliver",component:deliver,name:"",hidden:true},
            { path: '/usingPos', component: usingPos, name: '使用中POS机' },
            { path: '/returnPosList', component: returnPosList, name: 'POS机退还' },
            { path: "/returnPos",component:returnPos,name:"",hidden:true},
            { path: "/poscode",component:poscode,name:"",name:'pos机编号列表'}
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '财务',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/newMoney', component: newMoney, name: '新增转账款项' },
            { path: '/bankTransfer', component: bankTransfer, name: '银行卡转账款项'},
            { path: '/orderRewardDo', component: orderRewardDo, name: '提现审核' }
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '运营管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/evaluatelist', component: evaluatelist, name: '评价管理' }
        ]
    },
    {
        path: '/main',
        component: Home,
        name: '客户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/management', component: management, name: '客户管理' },
            { path: '/marketPersonnel', component: marketPersonnel, name: '分配市场经理',hidden: true},
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;