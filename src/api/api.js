import axios from 'axios';

let base = '';
let headersCT = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};
//登录人员信息
export const getUserInfo = params => { return axios.post(`${base}/user/ucenter/myinfo/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//登录
export const login = params => { return axios.post(`${base}/user/ucenter/login/supplierpwd`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取个人未审核列表
export const get2cUserList = params => { return axios.post(`${base}/user/manager/2cagentlist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取企业未审核列表
export const get2bUserList = params => { return axios.post(`${base}/user/manager/2bagentlist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取供应商未审核列表
export const get2pUserList = params => { return axios.post(`${base}/user/manager/2pagentlist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//供应商审核通过
export const supplierCheck = params => { return axios.post(`${base}/user/manager/supplier/check`, JSON.stringify(params), headersCT).then(res => res.data); };
//供应商审核通过
export const supplierauditre = params => { return axios.post(`${base}/user/manager/supplier/auditre`, JSON.stringify(params), headersCT).then(res => res.data); };
//渠道商审核通过
export const checkPass = params => { return axios.post(`${base}/user/manager/agent/check`, JSON.stringify(params), headersCT).then(res => res.data); };
//渠道商审核拒绝
export const auditrePass = params => { return axios.post(`${base}/user/manager/agent/auditre`, JSON.stringify(params), headersCT).then(res => res.data); };
//渠道商个人升级大B
export const checkLevel = params => { return axios.post(`${base}/user/manager/2cinfo/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//渠道商企业升级大B
export const checkBLevel = params => { return axios.post(`${base}/user/manager/2binfo/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//增加供应商信息
export const supplierAdd = params => { return axios.post(`${base}/user/manager/supplier/add`, JSON.stringify(params), headersCT).then(res => res.data); };
//修改供应商信息
export const supplierUpdate = params => { return axios.post(`${base}/user/manager/supplier/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取供应商列表
export const getsuppliers = params => { return axios.post(`${base}/user/manager/orglist/query`, JSON.stringify(params), headersCT).then(res => res.data); };
//新增产品录入
export const productadd = params => { return axios.post(`${base}/product/manager/info/add`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取产品大类
export const getproducttype = params => { return axios.post(`${base}/product/info/producttype/listquery`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取待审核产品
export const getprolistdown = params => { return axios.post(`${base}/product/manager/productlist/query`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取下架产品
export const getprounderlistdown = params => { return axios.post(`${base}/product/manager/productlist/allquery`, JSON.stringify(params), headersCT).then(res => res.data); };
//待审核产品上架
export const dprocheckpass = params => { return axios.post(`${base}/product/manager/product/check`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取产品详情
export const getproductinfo = params => { return axios.get(`${base}/product/manager/detail/query?productId=`+params, params).then(res => res.data); };
//修改产品详情
export const productupdate = params => { return axios.post(`${base}/product/manager/info/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//订单列表查询
export const orderQuery = params => { return axios.post(`${base}/order/manager/list/query`, JSON.stringify(params), headersCT).then(res => res.data); };
//大B渠道商列表查询
export const orderallot = params => { return axios.post(`${base}/user/manager/Bagentlist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//分配选择大B关联订单
export const orderTypeUpdate = params => { return axios.post(`${base}/order/manager/ordertype/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//冻结订单
export const frzOrder = params => { return axios.post(`${base}/order/manager/info/frz`, JSON.stringify(params), headersCT).then(res => res.data); };
//取消订单
export const cancelOrder = params => { return axios.post(`${base}/order/update/agent/cancel`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取供应商详情
export const getorginfo = params => { return axios.get(`${base}/user/manager/detail/query?orgId=`+params, params).then(res => res.data); };
//禁用供应商账户
export const lockAccount = params => { return axios.post(`${base}/user/manager/detail/lock`, JSON.stringify(params), headersCT).then(res => res.data); };
//查看个人渠道商信息修改
export const ChannelModify = params =>  { return axios.get(`${base}/user/ucenter/agent/info?orgId=`+params, params).then(res => res.data); };
//未完善个人渠道商信息
export const getUcLatentList = params => { return axios.post(`${base}/user/manager/2cagentlist/imperfect`, JSON.stringify(params), headersCT).then(res => res.data); };
//查看个人渠道商信息修改  
export const ChanneUpdata = params => { return axios.post(`${base}/user/ucenter/agent/update`, JSON.stringify(params), headersCT).then(res => res.data); };
//企业个人渠道商信息修改
export const enterpriseModify = params =>  { return axios.get(`${base}/user/ucenter/agent/binfo?orgId=`+params, params).then(res => res.data); };
//未完善企业渠道商
export const getUbLatentList = params => { return axios.post(`${base}/user/manager/2cagentlist/imperfecb`, JSON.stringify(params), headersCT).then(res => res.data); };
//查看企业渠道商信息修改  
export const enterpriseUpdata = params => { return axios.post(`${base}/user/ucenter/agent/bupdate`, JSON.stringify(params), headersCT).then(res => res.data); };
//医生信息
export const doctorInfo = params => { return axios.post(`${base}/user/manager/supplierlist/get`, JSON.stringify(params), headersCT).then(res => res.data); };
//添加医生信息
export const AddDoctorInfo = params => { return axios.post(`${base}/user/manager/supplier/doctoradd`, JSON.stringify(params), headersCT).then(res => res.data); };
//未完善医生
export const doctorPerfect = params => { return axios.post(`${base}/user/manager/2cagentlist/imperfecd`, JSON.stringify(params), headersCT).then(res => res.data); };
//为完善机构
export const institutionPerfect = params => { return axios.post(`${base}/user/manager/2cagentlist/imperfecp`, JSON.stringify(params), headersCT).then(res => res.data); };
//订单详情
export const orderDetail = params => { return axios.post(`${base}/order/manager/detail/query?orderNo=`+params, params).then(res => res.data); };
//订单冻结
export const FrozenList = params => { return axios.post(`${base}/order/manager/frzlist/query`, JSON.stringify(params), headersCT).then(res => res.data); };
//订单完成。。
export const finishOrder = params => { return axios.post(`${base}/order/manager/endlist/query`, JSON.stringify(params), headersCT).then(res => res.data); };
//评论管理
export const getEvaluateList = params => { return axios.post(`${base}/product/operation/management/evaluation`, JSON.stringify(params), headersCT).then(res => res.data); };
//评论管理删除
export const deleteEvaluate = params => { return axios.get(`${base}/product/operation/management/delete?evaluationId=`+params, params).then(res => res.data); };
//客户管理列表
export const queryalluser = params => { return axios.post(`${base}/order/manager/agent/queryalluser`, JSON.stringify(params), headersCT).then(res => res.data); };
//查询所有市场人员
export const queryallmarket = params => { return axios.post(`${base}/order/manager/agent/queryallmarket`, JSON.stringify(params), headersCT).then(res => res.data); };
//查询所有市场人员列表
export const marketList = params => { return axios.post(`${base}/order/manager/agent/query`, JSON.stringify(params), headersCT).then(res => res.data); };
//分配、更换客户经理
export const distribution = params => { return axios.post(`${base}/order/manager/agent/allot`, JSON.stringify(params), headersCT).then(res => res.data); };
//审核拒绝
export const auditRejection = params => { return axios.get(`${base}/product/manager/product/rejection?productId=`+params, headersCT).then(res => res.data); };
//获取分成比例
export const getDistribution = params => { return axios.get(`${base}/user/manager/distribution/query?orgId=`+params, headersCT).then(res => res.data); };



//查询pos机列表
export const getPosList = params => { return axios.post(`${base}/pos/getPosList`, JSON.stringify(params), headersCT).then(res => res.data); };
//添加修改pos机列表
export const addorupdatePos = params => { return axios.post(`${base}/pos/addorupdatePos`, JSON.stringify(params), headersCT).then(res => res.data); };
//待发货pos机列表
export const staydeliverPos = params => { return axios.post(`${base}/pos/supplier/online/apply`, JSON.stringify(params), headersCT).then(res => res.data); };
//pos机确认发货
export const confirmDelivery = params => { return axios.post(`${base}/pos/supplier/online/delivery`, JSON.stringify(params), headersCT).then(res => res.data); };
//pos机退还列表
export const returnListPos = params => { return axios.post(`${base}/pos/supplier/online/sendback`, JSON.stringify(params), headersCT).then(res => res.data); };
//退还确认收货
export const returnCollect = params => { return axios.get(`${base}/pos/supplier/online/orderno?orderNo=`+ params, params).then(res => res.data); };
//退货确认收货保存
export const confirmCollect = params => { return axios.post(`${base}/pos/supplier/online/confirm`, JSON.stringify(params), headersCT).then(res => res.data); };
//我的pos机页面
export const minePos = params => { return axios.get(`${base}/pos/supplier/online/orgid?orgId=`+ params, params).then(res => res.data); };
//线下领取
export const underReceiving = params => { return axios.get(`${base}/pos/supplier/online/underline?posCode=`+ params, params).then(res => res.data); };
//在线申请
export const onlineApplication = params => { return axios.post(`${base}/pos/supplier/online/applypos`, JSON.stringify(params), headersCT).then(res => res.data); };
//前台确认收货
export const ReceptionCollect = params => { return axios.get(`${base}/pos/supplier/online/applyonline?orderNo=`+ params, params).then(res => res.data); };
//申请退还
export const applicationRefund = params => { return axios.post(`${base}/pos/supplier/online/forrefund`, JSON.stringify(params), headersCT).then(res => res.data); };
//使用中POS机列表
export const usingPosList = params => { return axios.post(`${base}/pos/supplier/pos/List`, JSON.stringify(params), headersCT).then(res => res.data); };
//posCode列表
export const getPosCodeList = params => { return axios.post(`${base}/pos/supplier/create/query`, JSON.stringify(params), headersCT).then(res => res.data); };
//生成posCode
export const createPosCode = params => { return axios.get(`${base}/pos/supplier/create/poscode?number=`+params,params).then(res => res.data); };
//posCode列表批量修改
export const changePosCode = params => { return axios.post(`${base}/pos/supplier/create/updateStatus`, JSON.stringify(params), headersCT).then(res => res.data); };
//已录入POS列表市场分配
export const marketShare = params => { return axios.get(`${base}/pos/supplier/online/allot?posCode=`+ params, params).then(res => res.data); };

//新增转账款项
export const getMoneyOrder = params => { return axios.get(`${base}/order/manager/detail/query?orderNo=`+params, params).then(res => res.data); };
//转账信息保存
export const bindingAmount = params => { return axios.post(`${base}/order/manager/orderprice/adminupdate`, JSON.stringify(params), headersCT).then(res => res.data); };
//银行卡转账列表
export const bankCardList = params => { return axios.post(`${base}/order/manager/orderprice/bankupdate`, JSON.stringify(params), headersCT).then(res => res.data); };
//待审核对公账户
export const enterAccount = params => { return axios.post(`${base}/bill/enterprise/wait/check`, JSON.stringify(params), headersCT).then(res => res.data); };
//企业对公审核
export const passAccount = params => { return axios.post(`${base}/bill/enterprise/wait/checkout`, JSON.stringify(params), headersCT).then(res => res.data); };
//获取企业对公银行详细信息
export const bankInfo = params => { return axios.post(`${base}/user/ucenter/details/enterprise/account`,JSON.stringify(params), headersCT).then(res => res.data);};
//渠道商设置奖励分成比例
export const setBounty = params => { return axios.post(`${base}/user/manager/user/bounty`,JSON.stringify(params), headersCT).then(res => res.data);};
//admin后台管理快捷下单
export const quickcreate = params => { return axios.post(`${base}/order/agent/info/quickcreate`,JSON.stringify(params), headersCT).then(res => res.data);};
//查询供应商获取所有的产品
export const getAllpdoduct = params => { return axios.get(`${base}/product/search/supplier/allproduct?supplierId=`+params, params).then(res => res.data); };
//提现待审核列表
export const orderRewardList = params => { return axios.post(`${base}/bill/order/reward/list`, JSON.stringify(params), headersCT).then(res => res.data); };
//提现待审核审核通过
export const orderRewardCheck = params => { return axios.post(`${base}/bill/agent/cash/OrdeRewardrMoney`, JSON.stringify(params), headersCT).then(res => res.data); };

//提现待审核审核拒绝
export const orderRewardCheckRefuse = params => { return axios.post(`${base}/bill/agent/refuse/OrdeRewardrMoney`, JSON.stringify(params), headersCT).then(res => res.data); };

//export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
//获取供应商详情
//export const getorginfo = params => { return axios.post(`${base}/user/manager/detail/query`, params, headersCT).then(res => res.data); };
// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };