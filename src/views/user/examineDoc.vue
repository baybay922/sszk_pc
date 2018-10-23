<template>
    <!-- 待/已审核医生资料 -->
    <div class="examine-docutor">
        <div class="resiger">
            <h2 class="title" v-if="status == 1">注册信息</h2>
            <div class="detail">
                <p>医生姓名</p>
                <p>{{leaderName}}</p>
            </div>
            <div class="detail">
                <p>医生身份证号</p>
                <p>{{leaderCardId}}</p>
            </div>
            <div class="detail">
                <p>服务地区</p>
                <p>{{serviceAddress}}</p>
            </div>
            <div class="detail">
                <p>主要领域</p>
                <p>{{mainField}}</p>
            </div>
            <div class="detail">
                <p>主要产品</p>
                <p>{{mainProduct}}</p>
            </div>
            <div class="detail">
                <p>推荐人手机号/市场经理</p>
                <p>{{number}}</p>
            </div>
            <div class="detail">
                <p>身份证照</p>
                <div class="imgbox" v-for="(item,index) in identityCard" :key="index">
                    <img :src="item" alt="">
                    <div class="mark" v-if="item">
                        <el-button class="enlarge" @click="enlarge(item)">放大</el-button>
                    </div>
                </div>
            </div>
            <div class="docutor detail">
                <p>医生资格证书</p>
                <div class="imgbox">
                    <img :src="orgImgUrls" alt="">
                    <div class="mark" v-if="orgImgUrls">
                        <el-button class="enlarge" @click="enlarge(orgImgUrls)">放大</el-button>
                    </div>
                </div>
            </div>
            <div  class="detail">
                <p>医师执业证书</p>
                <div class="imgbox">
                    <img :src="homePage" alt="">
                    <div class="mark">
                        <el-button class="enlarge" @click="enlarge(homePage)">放大</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="content" v-if="status == 1">  
            <h2 class="title">医生信息</h2>
            <div class="detail">
                <p>医生照片</p>
                <div class="imgbox">
                    <div class="aptitude"  style="display:inline-block">
                        <img @click="logo ==''? uploadimg():''" v-bind:src="logo" width="100px" height="100px" class="upimgbg">
                        <div id="ossfile">加载上传插件失败!请刷新页面</div>
                        <div class="mark" v-if="logo !== ''">
                            <button class="enlarge" @click="enlarge(logo)">放大</button>
                            <button class="modify" @click="uploadimg">修改</button>
                            <button class="del" @click="delImg('10')">删除</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail" style="margin-top:20px;">
                <p>医生介绍</p>
                <quill-editor
                    v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption">
                    <div id="toolbar" slot="toolbar">
                        <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                        <span class="ql-formats">
                        <select class="ql-color">
                        <option selected="selected"></option>
                        <option value="#e60000"></option>
                        <option value="#ff9900"></option>
                        <option value="#ffff00"></option>
                        <option value="#008a00"></option>
                        <option value="#0066cc"></option>
                        <option value="#9933ff"></option>
                        <option value="#ffffff"></option>
                        <option value="#facccc"></option>
                        <option value="#ffebcc"></option>
                        <option value="#ffffcc"></option>
                        <option value="#cce8cc"></option>
                        <option value="#cce0f5"></option>
                        <option value="#ebd6ff"></option>
                        <option value="#bbbbbb"></option>
                        <option value="#f06666"></option>
                        <option value="#ffc266"></option>
                        <option value="#ffff66"></option>
                        <option value="#66b966"></option>
                        <option value="#66a3e0"></option>
                        <option value="#c285ff"></option>
                        <option value="#888888"></option>
                        <option value="#a10000"></option>
                        <option value="#b26b00"></option>
                        <option value="#b2b200"></option>
                        <option value="#006100"></option>
                        <option value="#0047b2"></option>
                        <option value="#6b24b2"></option>
                        <option value="#444444"></option>
                        <option value="#5c0000"></option>
                        <option value="#663d00"></option>
                        <option value="#666600"></option>
                        <option value="#003700"></option>
                        <option value="#002966"></option>
                        <option value="#3d1466"></option>
                        </select>
                        </span>
                    <!-- 图片按钮点击事件 -->
                    <span class="ql-formats"><button type="button" @click="ediimgup">
                        <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
                    </button></span>
                    </div>
                </quill-editor>
            </div>
            <div class="detail" style="margin-top:60px">
                <p>信用分</p>
                <p>{{ form.creditRate }} + <span style="color: red;">{{ form.manualScore }}</span> = {{ parseInt(form.manualScore)+parseInt(form.creditRate) }}</p>
                <span style="margin-left: 30px;">加权分
                    <el-input ref="inputBox" v-model="form.manualScore" type="number" placeholder="0" style="width: 120px;margin-left:20px;"></el-input>
                </span>
            </div>
            <div class="detail">
                <p>月售单数</p>
                <p>{{ form.sellNum }} + <span style="color: red;">{{ form.manualSellNum}}</span> = {{ parseInt(form.manualSellNum)+parseInt(form.sellNum) }}</p>
                <span style="margin-left: 30px;">加权分
                    <el-input ref="inputBox" v-model="form.manualSellNum" type="number" placeholder="0" style="width: 120px;margin-left:20px;"> </el-input>
                </span>
                </div>
            
            <div class="detail">
                <p>平台推荐</p>
                <p><el-checkbox v-model="isRecommendbool">勾选此项会在医生主页显示“金牌医生”</el-checkbox></p>
            </div>
            <h2 class="title">账期信息</h2>
            <div class="detail">
                <p>账期(T+N)</p>
                <p>
                    <el-input v-model="form.accountPeriod" placeholder="请输入有效的账期" style="width:200px;" :disabled='true'></el-input>
                </p>
            </div>
            <div class="detail">
                 <p>奖金比例(%)</p>
                <p>
                    <el-input v-model="form.returnRate" placeholder="请输入有效的奖励比例(%)" style="width:200px;" :disabled="true"></el-input>
                </p>
            </div>
            <h2 class="title">收账信息</h2>

            <div class="detail" v-if="show">
                <p>收账银行卡号</p>
                <p>
                    <el-input ref="inputBox" v-model="form.bankCardId" style="width:200px;" placeholder="请输入收账用的银行卡号" :disabled="true"></el-input>
                </p>
            </div>   
            <div class="detail" v-if="show">
                <p>持卡人姓名</p>
                <p>
                    <el-input ref="inputBox" v-model="form.bankCardName" style="width:200px;" placeholder="请输入持卡人姓名" :disabled="true"></el-input>
                </p>
            </div>
           <div class="detail" v-if="show">
                <p>持卡人身份证号 </p>
                <p>
                    <el-input ref="inputBox" v-model="form.cardId" style="width:200px;" placeholder="请输入持卡人身份证号" :disabled='true'></el-input>
                </p>
           </div>
           <p v-else class="tips">暂未绑定个人银行卡</p>
           <el-button @click="submit()" type="primary" class="submit">保存</el-button>
        </div>
      
        <!-- 上传图片oss -->
        <div style="display:none">
            <div id="container"><a id="selectfiles" href="javascript:void(0);" class='btn'>上传营业执照照片</a></div>
            <form name=theform>
                <input type="radio" name="myradio" value="local_name"/>
                <input type="radio" name="myradio" value="random_name" checked=true/>
                <br/>
                <input type="text" id='dirname' placeholder="如果不填，默认是上传到根目录" size=50>
            </form>
            <br/>
            <div id="container">
            </div>
            <pre id="console"></pre>
            <p>&nbsp;</p>
        </div>
        <div class="imgMark" v-if="markShow" @click="markHide()">
            <img :src="markUrl" alt="" ref="imgBox" style="transition:transform 1s">
            <div class="icon">
                <div style="margin-right:10px" @click="rotateR($event)"><img :src="require('../../images/rotateR.png')" alt=""></div>
                <div @click="rotateL($event)"><img :src="require('../../images/rotateL.png')" alt=""></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getorginfo } from '../../api/api.js'
    import Quill from 'quill';
    export default{
        name:'ExamineDoc',
        data(){
            return {
                orgId:this.$route.query.orgId,
                leaderName:"",
                leaderCardId:"",
                serviceAddress:"",
                mainField:"",
                mainProduct:"",
                number:"",
                identityCard:[],
                orgImgUrls:"",
                homePage:"",
                change:"",
                markUrl:"",
                markShow:false,
                status:this.$route.query.status,
                logo:"",
                content:"",
                imgstatus:"",
                isRecommendbool: 0,
                form:{
                    creditRate:"",
                    manualScore:"",
                    sellNum:"",
                    returnRate:"",
                    accountPeriod:"",
                    bankCardId:"",
                    bankCardName:"",
                    cardId:"",
                    manualSellNum:""
                },
                show:false,
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                    },
                },
                
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
		},
        methods:{
            getInfo(){
                getorginfo(this.orgId).then( r =>{
                    console.log(r)
                    if(r.flag === 20000){
                        this.leaderName = r.data.doctorRegistrationInformation.leaderName;
                        this.leaderCardId = r.data.doctorRegistrationInformation.leaderCardId;
                        this.serviceAddress = r.data.doctorRegistrationInformation.servieAddress;
                        this.mainField = r.data.doctorRegistrationInformation.mainField;
                        this.mainProduct = r.data.doctorRegistrationInformation.mainProduct;
                        this.number = r.data.doctorRegistrationInformation.number;
                        this.identityCard.push(r.data.doctorRegistrationInformation.identityCard1)
                        this.identityCard.push(r.data.doctorRegistrationInformation.identityCard2)
                        this.orgImgUrls = r.data.doctorRegistrationInformation.orgImgUrls;
                        this.homePage = r.data.doctorRegistrationInformation.homePage;
                        this.change = r.data.doctorRegistrationInformation.change;
                        this.logo = r.data.institutionalInformation.logo;
                        this.content = r.data.institutionalInformation.content;
                        this.form.creditRate = r.data.institutionalInformation.creditRate;
                        this.form.manualScore = r.data.institutionalInformation.manualScore;
                        this.form.sellNum = r.data.institutionalInformation.sellNum;
                        this.form.manualSellNum = r.data.institutionalInformation.manualSellNum;
                        this.isRecommendbool = r.data.institutionalInformation.isRecommendbool;
                        this.form.accountPeriod = r.data.accountInfomation.accountPeriod;
                        this.form.returnRate = r.data.accountInfomation.returnRate;
                        this.form.bankCardId = r.data.bankInformation.bankCardId;
                        this.form.bankCardName = r.data.bankInformation.bankCardName;
                        this.form.cardId = r.data.bankInformation.cardId;
                        r.data.bankInformation.personalBankInformations?this.show = 1:this.show = 0;
                    }
                })
            },
            //提交修改
            submit(){
                let form = {
                    orgId:this.orgId,
                    name:this.leaderName,
                    contactPerson:"",
                    logo:this.logo,
                    content:this.content,
                    creditRate:this.form.creditRate,
                    manualScore:this.form.manualScore,
                    sellNum:this.form.sellNum,
                    manualSellNum:this.form.manualSellNum,
                    isRecommendbool:this.isRecommendbool,
                    accountPeriod:this.form.accountPeriod,
                    bankCardId:this.form.bankCardId,
                    backCardName:this.form.bankCardName,
                    cardId:this.form.cardId,
                   // phone:this.
                   type:"D"
                };
                console.log(form)
            },
            delImg(){
                this.logo =""
            },
             //图片放大
            enlarge(str){
                this.markShow = true;
                this.markUrl = str
            },
             //隐藏放大的图片
            markHide(){
                this.markShow = false;
                this.num1 = 0;
            },
            //向左旋转
            rotateR(e){
                e.stopPropagation();
                this.num1 -= 90;
                this.$refs.imgBox.style.transform="rotate("+this.num1+"deg)"       
            },
            //向右旋转
            rotateL(e){       
                e.stopPropagation();
                this.num1 += 90;
                this.$refs.imgBox.style.transform="rotate("+this.num1+"deg)" 
            },
            ediimgup(){
                this.imgstatus = 12;
                let obj = document.getElementById('selectfiles');
                obj.click();
            },
             imports() {//渲染dom后引入上传插件方法
                require("!!script-loader!../../common/uptooss/lib/crypto1/crypto/crypto.js")
                require("!!script-loader!../../common/uptooss/lib/crypto1/hmac/hmac.js")
                require("!!script-loader!../../common/uptooss/lib/crypto1/sha1/sha1.js")
                require("!!script-loader!../../common/uptooss/lib/base64.js")
                require("!!script-loader!../../common/uptooss/lib/plupload-2.1.2/js/plupload.full.min.js")
                require("!!script-loader!../../common/uptooss/upload.js")
            },
             uploadimg() {
                this.imgstatus = 10;
                let obj = document.getElementById('selectfiles');
                obj.click();
            },
        },
        mounted() {
            this.getInfo();
            this.imports();
            var self = this;
            var uploader = new plupload.Uploader({//上传图片
                runtimes : 'html5,flash,silverlight,html4',
                browse_button : 'selectfiles', 
                //multi_selection: false,
                container: document.getElementById('container'),
                flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
                silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
                url : 'http://oss.aliyuncs.com',

                init: {
                PostInit: function() {
                    document.getElementById('ossfile').innerHTML = ' ';
                },

                FilesAdded: function(up, files) {
                    if(up.total.queued == 2){
                        return;
                    }
                    plupload.each(files, function(file) {
                        document.getElementById('ossfile').innerHTML = '<div id="' + file.id + '"><b></b>'
                        +'</div>';
                    });
                    up.start();
                },

                BeforeUpload: function(up, file) {
                    check_object_radio();
                    get_dirname();
                    set_upload_param(up, file.name, true);
                },

                UploadProgress: function(up, file) {
                    var d = document.getElementById(file.id);
                },

                FileUploaded: function(up, file, info) {
                    var url = host + '/' + get_uploaded_object_name(file.name);
                    if (info.status == 200){
                        if(self.imgstatus == 10) {
                            self.logo = url;
                        }else if(self.imgstatus == 12) {
                            self.editor.insertEmbed(self.editor.getContents().index, 'image', url);
                        }
                    }else{
                        document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                    } 
                },

                Error: function(up, err) {
                    document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                }
                }
            });

            uploader.init();
        },
    }
</script>
<style scoped>
.examine-docutor{
    width: 100%;
    height: auto;
}
.detail{
    display: flex;
}
.detail p:nth-child(1){
    width: 100px;
    text-align: right;
    margin-right: 15px;
}
.detail p:nth-child(2){   
    text-align: left;
}
/* .detail .imgbox img{
    width:100%;
    height:100%;
} */
.docutor{
    margin:20px 0;
}
.detail .imgbox{
    position: relative;
    width:100px;
    height:100px;
    margin-right:20px;
}
.imgbox img{
    width:100px;
    height:100px;
}
.detail .imgbox:hover .mark{
    display: flex; 
}
.detail .imgbox .mark{
    position: absolute;
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba(0,0,0,0.5);
    display: none;
    top:0;
    left:0;
}
.detail .imgbox .mark button{
    width:80%;
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    outline:none;
    background: #fff;
    /* height:40%; */
    /* padding:0; */
}
.mark button:nth-child(2){
    margin:10px 0;
}
.imgMark{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,0.8);
    z-index: 1;
    display:flex;
    justify-content: center;
    align-items: center;
}
.imgMark .icon{
  position:fixed;
  bottom:30px;
  margin:0 auto;
  height:50px;
  display:flex;
}
.imgMark .icon>div{
  height:100%;
  width:50px;
}
.imgMark .icon>div img{
  width:100%;
  height:100%;
}
.aptitude{
    display:inline-block;
    width:100px;
    height:100px;
    margin-right:10px;
    position:relative;
}
.upimgbg{
  background-image: url('https://duojia-video.oss-cn-hangzhou.aliyuncs.com/iPhone%208.png');
  background-repeat: no-repeat;
  background-size: 100%;  
 
}

.aptitude:hover .mark{
    display:block;
}
.quill-editor{
    width:900px;
    height:300px;
}
.tips{
    margin-left:50px;
}
.submit{
    margin-top:50px;
    margin-left:150px;
}
</style>
