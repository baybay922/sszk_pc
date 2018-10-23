<template>
    <el-form ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;width:80%;min-width:600px;">
        <el-form-item label="企业名称">
            <el-input v-model="form.enterpriseName" placeholder="请输入企业名称" style="width:200px"></el-input>
		</el-form-item>
        <el-form-item label="营业执照">
			<img v-bind:src="form.showUrl" width="100px" height="100px" @click="uploadshowurl" class="upimgbg"><div id="ossfile">加载上传插件失败!请刷新页面</div>
		</el-form-item>
        <el-form-item label="负责人姓名">
            <el-input v-model="form.name" placeholder="请输入负责人姓名" style="width:200px"></el-input>
		</el-form-item>
        <el-form-item label="负责人手机号">
            <el-input v-model="form.phone" placeholder="请输入负责人手机号" style="width:200px"></el-input>
		</el-form-item>
        <el-form-item label="电子邮箱">
            <el-input v-model="form.email" placeholder="请输入电子邮箱" style="width:200px"></el-input>
		</el-form-item>
        <el-form-item label="账期">
            <span>T+</span><el-input ref="inputBox" type="number" v-model="form.accountPeriod" placeholder="0" style="width: 200px;margin-left:20px;"></el-input>
		</el-form-item>
        <el-form-item label="信用分">
			{{ form.creditRate }} + <span style="color: red;">{{ form.manualScore }}</span> = {{ parseInt(form.creditRate)+parseInt(form.manualScore) }}
            <span style="margin-left: 30px;">加权分<el-input ref="inputBox" v-model="form.manualScore" type="number" placeholder="0" style="width: 120px;margin-left:20px;"></el-input></span>
		</el-form-item>
        <!-- <el-form-item label="推荐人姓名">
            <el-input ref="inputBox" placeholder="请输入推荐人姓名" v-model="form.RecommendName" style="width: 250px;margin-left:20px;"></el-input>
		</el-form-item> -->
        <el-form-item label="推荐人手机号">
            <el-input ref="inputBox"  placeholder="请输入推荐人手机号" v-model="form.RecommendPhone" style="width: 250px;margin-left:20px;"></el-input>
		</el-form-item>
        <el-form-item label="收账银行卡号">
            <el-input ref="inputBox"  placeholder="请输入收账银行卡号" v-model="form.bankCard" style="width: 250px;margin-left:20px;"></el-input>
		</el-form-item>
        <el-form-item label="持卡人姓名">
            <el-input ref="inputBox"  placeholder="请输入持卡人姓名" v-model="form.bankName" style="width: 250px;margin-left:20px;"></el-input>
		</el-form-item>
        <el-form-item label="持卡人身份证">
            <el-input ref="inputBox"  placeholder="请输入持卡人身份证号" v-model="form.bankId" style="width: 250px;margin-left:20px;"></el-input>
		</el-form-item>
        <el-button style="width:100px;" type="primary" @click="onSubmit">保存</el-button>
        <div style="display:none">
            <div id="ossfile">加载上传插件失败!请刷新页面</div>
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
    </el-form>
</template>
<script>
import { enterpriseModify, enterpriseUpdata } from '../../api/api';
export default {
    data(){
        return{
            imgstatus: 1,
            orgId:this.$route.query.orgId,
            type: this.$route.query.type,
            form: {
                enterpriseName:"",
                showUrl: '',
                name: "",
                phone: "",
                email: "",
                accountPeriod: "0",
                manualScore: "0",
                creditRate: "0",
                RecommendName: "",
                RecommendPhone: "",
                bankCard:"",
                bankName:"",
                bankId:""
            }
        }
    },
    methods:{
        uploadshowurl() {
            this.imgstatus = 1;
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
        onSubmit(){
            let para = {
                orgId: this.orgId,
                agentCName: this.form.enterpriseName,
                agentCUrl: this.form.showUrl,
                agentCLaderName: this.form.name,
                agentCPhone: this.form.phone,
                agentCEmail: this.form.email,
                agentCThare: this.form.accountPeriod,
                agentCCreditRate: this.form.manualScore,
                agentCManualScore: this.form.creditRate,
                // inviterName: this.form.RecommendName,
                inviterPhone: this.form.RecommendPhone,
                agentCBankCrad: this.form.bankCard,
                agentCBankName: this.form.bankName,
                agentCBankID: this.form.bankId,
                agentCsellNum: 0,
                agentCManualSellNum: 0,
                status:1
            }
            enterpriseUpdata(para).then(r =>{
                if(r.flag == 20000){
                    if(this.type == 0){
                        let path = {path:'/ublistp',query:{}}
                        this.$router.push(path)
                    }else{
                        let path = {path:'/ublist',query:{}}
                        this.$router.push(path)
                    }
                    
                }else{
                    this.$message({
                        type: 'error',
                        message: r.msg
                    });
                }
            })
        }
    },
    mounted(){   
        enterpriseModify(this.orgId).then(r =>{
            if(r.flag == 20000){
                console.log(r)
                this.form.enterpriseName = r.data.agentCName
                this.form.showUrl = r.data.agentCUrl
                this.form.name = r.data.agentCLaderName
                this.form.phone = r.data.agentCPhone
                this.form.email = r.data.agentCEmail
                this.form.accountPeriod = r.data.agentCThare
                this.form.manualScore = r.data.agentCCreditRate
                this.form.creditRate = r.data.agentCManualScore
                // this.form.RecommendName = r.data.inviterName
                this.form.RecommendPhone = r.data.inviterPhone
                this.form.bankCard = r.data.agentCBankCrad
                this.form.bankName = r.data.agentCBankName
                this.form.bankId = r.data.agentCBankID
            }else{
                this.$message({
                    type: 'error',
                    message: r.msg
                });
            }
        })



        //图片上传
        this.imports();
      var self = this;
      var uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'selectfiles', 
          //multi_selection: false,
        container: document.getElementById('container'),
        flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
          url : 'http://oss.aliyuncs.com',

        init: {
          PostInit: function() {
            document.getElementById('ossfile').innerHTML = '';
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
            if(self.imgstatus == 25) {
              var d = document.getElementById('progress');
              //console.log(d);
              d.innerHTML = '<span>已完成上传:' + file.percent + "%</span>";
            }
          },

          FileUploaded: function(up, file, info) {
                  var url = host + '/' + get_uploaded_object_name(file.name);
                  if (info.status == 200)
                  {
                    if(self.imgstatus == 1) {
                      self.form.showUrl = url;
                    }else if(self.imgstatus == 10) {
                      self.resourcesimg[0].url = url
                    }else if(self.imgstatus == 11) {
                      self.resourcesimg[1].url = url
                    }else if(self.imgstatus == 12) {
                      self.resourcesimg[2].url = url
                    }else if(self.imgstatus == 13) {
                      self.resourcesimg[3].url = url
                    }else if(self.imgstatus == 14) {
                      self.resourcesimg[4].url = url
                    }else if(self.imgstatus == 25) {
                      self.resourcesvideo.url = url
                    }else if(self.imgstatus == 26) {
                      self.resourcesvideo.coverUrl = url
                    }else if(self.imgstatus == 50) {
                      self.editor.insertEmbed(self.editor.getSelection().index, 'image', url);
                    }
                  }
                  else
                  {
                      document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                  } 
          },

          Error: function(up, err) {
            document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
          }
        }
      });

      uploader.init();
    }
}
</script>