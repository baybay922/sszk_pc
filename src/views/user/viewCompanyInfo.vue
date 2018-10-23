<template>
    <div class="view-company-info">
        <div v-if="bankShow" class="list">
            <p>开户银行：</p>
            <p>{{ parentBankName }}</p>
        </div>

        <div class="bankCity" v-else>
            <div class="list">
                <p>开户行支行：</p>
                <p>{{ bankName }}</p>
            </div>
            <div class="list">
                <p>支付行号：</p>
                <p>{{ unionBank }}</p>
            </div>
            <div class="list">
                <p>开户行所在省市：</p>
                <p>{{ province }}{{city?"-"+city:""}}</p>
            </div>
        </div>


        <div class="list">
            <p>法人姓名：</p>
            <p>{{ legalName }}</p>
        </div>
        <div class="list">
            <p>法人身份证号：</p>
            <p>{{ legalIds }}</p>
        </div>
        <div class="list">
            <p>法人手机号：</p>
            <p>{{ legalPhone }}</p>
        </div>
        <div class="list">
            <p>是否未默认支付卡：</p>
            <p>{{ status == 1? "是":"否"}}</p>
        </div>
        <div class="list" v-if="authType == 2">
            <p>统一社会信用代码：</p>
            <p>{{ uniCredit }}</p>
        </div>
        <div v-else>
            <div class="list">
                <p>营业执照号：</p>
                <p>{{ businessLicense }}</p>
            </div>
            <div class="list">
                <p>组织机构代码：</p>
                <p>{{ organizationCode }}</p>
            </div>
            <div class="list">
                <p>税务登记号：</p>
                <p>{{ taxRegister }}</p>
            </div>
        </div>
        <div class="list">
            <p>开户许可证：</p>
            <p>
                <img :src="licenseImgUrl[0]" alt="">
            </p>
        </div>
        <div class="list">
            <p>法人身份证正反面扫描件：</p>
            <p>
                <img v-for="(item,index) in idCardImgUrls" :src="item" :key="index" alt="">
            </p>
        </div>
    </div>
</template>

<script>
    import { bankInfo } from '../../api/api.js'
    export default {
        name:"vieCompanyInfo",
        data(){
            return {
                id:this.$route.query.id,
                reason:"",
                authType:"",
                uniCredit:"",
                businessLicense:"",
                organizationCode:"",
                identityType:"",
                taxRegister:'',
                expLicense:'',
                legalName:'',
                legalIds:'',
                legalPhone:'',
                accountNo:"",
                parentBankName:"",
                bankImg:"",
                city:"",
                province:'',
                bankName:"",
                unionBank:"",
                licenseImgUrl:"",
                idCardImgUrls:"",
                status:'',
                bankShow:true
            }
        },
        mounted () {
            let submitObj = {};
            submitObj.id = this.id;
            console.log(typeof this.id)
            bankInfo(submitObj).then(r =>{
                console.log(r,'===============')
                if(r.flag === 20000){
                    this.reason = r.data.reason;
                    this.authType = r.data.authType;
                    this.uniCredit = r.data.uniCredit;
                    this.businessLicense = r.data.businessLicense;
                    this.organizationCode = r.data.organizationCode;
                    this.identityType = r.data.identityType;
                    this.taxRegister = r.data.taxRegister;
                    this.expLicense = r.data.expLicense;
                    this.legalName = r.data.legalName;
                    this.legalIds = r.data.legalIds;
                    this.legalPhone = r.data.legalPhone;
                    this.accountNo = r.data.accountNo;
                    this.parentBankName = r.data.parentBankName;
                    this.bankImg = r.data.bankLogo;
                    r.data.city==''?this.city = "" :this.city = r.data.city;
                    r.data.province==''?this.province = "" :this.province = r.data.province;
                    r.data.bankName==''?this.bankName = "" :this.bankName = r.data.bankName;
                    r.data.unionBank==''?this.unionBank = "" :this.unionBank = r.data.unionBank;
                    this.city = r.data.city;
                    this.licenseImgUrl = r.data.licenseImgUrlList;
                    this.idCardImgUrls = r.data.idCardImgUrlsList;
                    this.status = r.data.status;
                    if(this.status == 0){
                        $('.switch-btn').removeClass('ischecked')
                    }else{
                        $('.switch-btn').addClass('ischecked')
                    }
                }else{
                    this.$message({
                        message:r.msg,
                        type:"error"
                    })
                }
            })
            if(this.parentBankName == "其他银行"){
                this.bankShow = false;
            }
        }
    }
</script>

<style scoped>
.view-company-info{
    width: 100%;
    height: auto;
}
.view-company-info .list{
    display: flex;
}
.view-company-info div p:nth-child(1){
    width: 160px;
    text-align: right;
    margin-right: 15px;
}
.view-company-info div p:nth-child(2){   
    text-align: left;
}
</style>