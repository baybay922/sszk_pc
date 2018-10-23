<template>
    <el-form ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;">
        <el-form-item label="医生姓名">
            <el-input v-model="form.name" placeholder="请输入医生姓名" style="width:200px"></el-input>
		    </el-form-item>
        <el-form-item label="联系人电话">
            <el-input v-model="form.phone" placeholder="请输入联系人电话" style="width:200px"></el-input>
		    </el-form-item>
        <el-form-item label="选择地区：">  
            <el-select size="small" style="width: 100px"  
                        v-model="form.selectProv"  
                        placeholder="请选择省份"  
                        v-on:change="getProv($event)">  
                <el-option  
                        v-for="item in provs"  
                        :key="item.value"
                        :label="item.label"  
                        :value="item.value">  
                </el-option>  
            </el-select>  
            <el-select size="small" style="width: 100px"  
                        v-if="selectProv!=''"  
                        v-model="form.selectCity"  
                        placeholder="请选择城市"  
                        v-on:change="getCity($event)">  
                <el-option  
                        v-for="item in citys"  
                        :key="item.value"
                        :label="item.label"  
                        :value="item.value">  
                </el-option>  
            </el-select>  
        </el-form-item> 
        <el-form-item label="主营领域">
			<el-select v-model="form.mainField" placeholder="请选择">
        <el-option
          v-for="item in field"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
		</el-form-item>
    <el-form-item label="主营产品">
			<el-input  ref="inputBox" v-model="form.mainProduct" style="width:200px"></el-input>
		</el-form-item>
        <el-form-item label="医生照片">
          <div class="aptitude"  style="display:inline-block">
            <img v-bind:src="form.showUrl" width="100px" height="100px" @click="form.showUrl == ''?uploadshowurl():''" class="upimgbg"><div id="ossfile">加载上传插件失败!请刷新页面</div>
            <div class="mark" v-if="form.showUrl !== ''">
                <el-button class="enlarge" @click="enlarge(form.showUrl)">放大</el-button>
                <el-button class="modify" @click="uploadshowurl">修改</el-button>
                <el-button class="del" @click="delImg('10')">删除</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="资质证明照片">
          <!-- <img v-for="(item, index) in resourcesimg" v-bind:src="item.url" width="100px" height="100px" @click="uploadresourcesimg(index)" :key="index" style="margin-right: 20px;" class="upimgbg"> -->
          <el-col v-for="(item, index) in resourcesimg" :key="index" class="aptitude"  style="width:100px;margin-right:20px;position:relative;">
            <img @click="resourcesimg[index].url == '' ? uploadresourcesimg(index): ''" :src="item.url" width="100px" height="100px" class="upimgbg" >
            <div class="mark" v-if="resourcesimg[index].url !== '' ">
              <el-button class="enlarge" @click="enlarge(resourcesimg[index].url)">放大</el-button>
              <el-button class="modify" @click="uploadresourcesimg(index)">修改</el-button>
              <el-button class="del" @click="delImg(index)">删除</el-button>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item label="医生介绍">
          <quill-editor
                v-model="form.content"
                ref="myQuillEditor"
                :options="editorOption">
                <div id="toolbar" slot="toolbar">
                    <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                    <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
                    <span class="ql-formats" style='margin-top:-10px;'>
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
                    <!--图片按钮点击事件-->
                <span class="ql-formats">
                  <button type="button" @click="ediimgup">
                    <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
                  </button>
                </span>
                </div>
                </quill-editor>
        </el-form-item>
        <el-form-item label="账期">
            <span>T+</span><el-input ref="inputBox" type="number" v-model="form.accountPeriod" placeholder="0" style="width: 200px;margin-left:20px;"></el-input>
        </el-form-item>
        <el-form-item label="信用分">
          {{ form.creditRate }} + <span style="color: red;">{{ form.manualScore }}</span> = {{ parseInt(form.creditRate)+parseInt(form.manualScore) }}
                <span style="margin-left: 30px;">加权分<el-input ref="inputBox" v-model="form.manualScore" type="number" placeholder="0" style="width: 120px;margin-left:20px;"></el-input></span>
        </el-form-item>
        <el-form-item label="月售单数">
          {{ form.sellNum }} + <span style="color: red;">{{ form.manualSellNum }}</span> = {{ parseInt(form.sellNum)+parseInt(form.manualSellNum) }}
                <span style="margin-left: 30px;">加权分<el-input-number v-model="form.manualSellNum" controls-position="right" :min="0" :max="100"></el-input-number></span>
        </el-form-item>
        <el-form-item label="平台推荐">
          <el-checkbox v-model="isRecommendbool">勾选此项会在产品列表和产品详情显示“多+推荐”</el-checkbox>
        </el-form-item>
        <el-form-item label="收账银行卡号">
            <el-input ref="inputBox"  placeholder="请输入收账银行卡号" v-model="form.cardId" disabled="disabled" style="width: 250px;margin-left:20px;"></el-input>
        </el-form-item>
        <el-form-item label="持卡人姓名">
            <el-input ref="inputBox"  placeholder="请输入持卡人姓名" v-model="form.bankCardName" disabled="disabled" style="width: 250px;margin-left:20px;"></el-input>
        </el-form-item>
        <el-form-item label="持卡人身份证">
            <el-input ref="inputBox"  placeholder="请输入持卡人身份证号" v-model="form.bankCardId" disabled="disabled" style="width: 250px;margin-left:20px;"></el-input>
        </el-form-item>
        <el-form-item>      
          <el-button type="primary" @click="onSubmit"  v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
          <el-button type="primary" @click="onSubmit"  v-loading.fullscreen.lock="fullscreenLoading">修改</el-button>
        </el-form-item>

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

       <!-- 图片放大遮罩 -->
      <div class="imgMark" v-if="markShow" @click="markHide()">
          <img :src="markUrl" alt="" ref="imgBox" style="transition:transform 1s">
          <div class="icon">
            <div style="margin-right:10px" @click="rotateR($event)"><img :src="require('../../images/rotateR.png')" alt=""></div>
            <div @click="rotateL($event)"><img :src="require('../../images/rotateL.png')" alt=""></div>
          </div>
      </div>
    </el-form>
</template>
<script>
import "../../common/uptooss/style.css";
import Quill from "quill";
import { AddDoctorInfo, getorginfo, supplierUpdate} from '../../api/api';
import allCity from '../../assets/city.json'
export default {
  data() {
    return {
      isRecommendbool: false,
      orgId: this.$route.query.orgId,
      fullscreenLoading:false,
      imgstatus: 1,
      markShow:false,
      num:0,
      form: {
          name: "",
          phone: "",
          showUrl: "",
          content: "",
          accountPeriod: "0",
          manualScore: "0",
          creditRate:"0",
          manualSellNum: '0',
          sellNum: '0',
          bankCardId:"",
          bankCardName:"",
          cardId:"",
          isRecommend:"0",
          selectProv: '', 
          selectCity:"",
           mainField:"",
          mainProduct:"",
      },
      editorOption: {
          modules: {
          toolbar: "#toolbar"
        }
      },
      resourcesimg: [
        { resourceName: "", resourceType: 1, url: "" },
        { resourceName: "", resourceType: 1, url: "" },
        { resourceName: "", resourceType: 1, url: "" },
        { resourceName: "", resourceType: 1, url: "" },
        { resourceName: "", resourceType: 1, url: "" },
        { resourceName: "", resourceType: 1, url: "" },
        { resourceName: "", resourceType: 1, url: "" },
        { resourceName: "", resourceType: 1, url: "" },
        { resourceName: "", resourceType: 1, url: "" }
      ],
      provs:[{label:"北京市",value:"北京市"},  
          {label:"天津市",value:"天津市"},  
          {label:"河北省",value:"河北省"},  
          {label:"山西省",value:"山西省"},  
          {label:"内蒙古自治区",value:"内蒙古自治区"},  
          {label:"辽宁省",value:"辽宁省"},  
          {label:"吉林省",value:"吉林省"},  
          {label:"黑龙江省",value:"黑龙江省"},  
          {label:"上海市",value:"上海市"},  
          {label:"江苏省",value:"江苏省"},  
          {label:"浙江省",value:"浙江省"},  
          {label:"安徽省",value:"安徽省"},  
          {label:"福建省",value:"福建省"},  
          {label:"江西省",value:"江西省"},  
          {label:"山东省",value:"山东省"},  
          {label:"河南省",value:"河南省"},  
          {label:"湖北省",value:"湖北省"},  
          {label:"湖南省",value:"湖南省"},  
          {label:"广东省",value:"广东省"},  
          {label:"广西壮族自治区",value:"广西壮族自治区"},  
          {label:"海南省",value:"海南省"},  
          {label:"重庆市",value:"重庆市"},  
          {label:"四川省",value:"四川省"},  
          {label:"贵州省",value:"贵州省"},  
          {label:"云南省",value:"云南省"},  
          {label:"西藏自治区",value:"西藏自治区"},  
          {label:"陕西省",value:"陕西省"},  
          {label:"甘肃省",value:"甘肃省"},  
          {label:"青海省",value:"青海省"},  
          {label:"宁夏回族自治区",value:"宁夏回族自治区"},  
          {label:"新疆维吾尔自治区",value:"新疆维吾尔自治区"},  
          {label:"台湾省",value:"台湾省"},  
          {label:"香港特别行政区",value:"香港特别行政区"},  
          {label:"澳门特别行政区",value:"澳门特别行政区"},
          {label:"海外",value:"海外"}] ,  
          citys: [],  
          selectProv: this.selectProv,  
          selectCity: this.selectCity,
          field: [{
            value: '选项1',
            label: '大健康类产品'
          }, {
            value: '选项2',
            label: '整形类产品'
          }, {
            value: '选项3',
            label: '皮肤类产品'
          }, {
            value: '选项4',
            label: '其他'
          }],
          fieldVal: '大健康类产品'
    };
  },
  methods: {
    //向左旋转
    rotateR(e){
      e.stopPropagation();
      this.num -= 90;
      this.$refs.imgBox.style.transform="rotate("+this.num+"deg)"       
    },
    //向右旋转
    rotateL(e){       
      e.stopPropagation();
      this.num += 90;
      this.$refs.imgBox.style.transform="rotate("+this.num+"deg)" 
    },
    getCity(){

    },
    /*二级联动选择地区*/  
    getProv: function (prov) {  
      let tempCity=[];                
      this.citys=[];  
      this.selectCity=''; 
      for (var val of allCity){  
          if (prov == val.prov){  
              tempCity.push({label: val.label, value: val.label})  
          }  
      }  
      this.citys = tempCity;  
      this.form.selectCity = this.citys[0].value
    },
     //图片放大
    enlarge(str){
        this.markShow = true;
        this.markUrl = str;
    },
    //删除图片
    delImg(ind){
      if(ind >=0 && ind < 9){
        this.resourcesimg.splice(ind,1)
        this.resourcesimg.push({ resourceName: "", resourceType: 1, url: "" })
      }else if(ind == 10){
        this.form.showUrl = ""
      }
    },
    onSubmit() {//提交信息
        this.form.isRecommend = this.isRecommendbool == true ? 1 : 0;
        let params = {
            name: this.form.name,
            logo: this.form.showUrl,
            strings: this.resourcesimg,
            content: this.form.content,
            creditRate: this.form.creditRate,
            manualScore: this.form.manualScore,
            sellNum: this.form.sellNum,
            manualSellNum: this.form.manualSellNum,
            isRecommend: this.form.isRecommend,
            phone: this.form.phone,
            accountPeriod: this.form.accountPeriod,
            bankCardId: this.form.bankCardId,
            bankCardName: this.form.bankCardName,
            cardId:this.form.cardId,
            type:"D",
            selectProv: this.form.selectProv,  
            selectCity: this.form. selectCity,
            orgId:this.orgId
        }
        if(this.orgId){
          this.form.orgId=this.orgId
          this.fullscreenLoading = true;
          supplierUpdate(params).then((res) => {
              if(res.flag == 20000){
                this.fullscreenLoading = false;
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
                let path = {path:'/notAlreadyDoctor',query:{}}
                this.$router.push(path)
              }else{
                this.fullscreenLoading = false;
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
          });
        }else{
          this.fullscreenLoading = true;
          AddDoctorInfo(params).then((res) => {
            if(res.flag == 20000) {
              this.fullscreenLoading = false;
              this.resourcesimg.splice(3,1);
              this.$message({
                message: '添加成功!',
                type: 'success'
              });
              this.$router.push({path: '/notAlreadyDoctor'});
            }else{
              this.fullscreenLoading = false;
              this.resourcesimg.splice(3,1);
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          });
        }
        
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.label.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleClose(tag) {
      this.label.splice(this.label.indexOf(tag), 1);
    },
    uploadshowurl() {
      this.imgstatus = 10;
      let obj = document.getElementById("selectfiles");
      obj.click();
    },
    uploadresourcesimg(index) {
      this.imgstatus = index;
      let obj = document.getElementById("selectfiles");
      obj.click();
    },
    upvideo() {
      this.imgstatus = 25;
      let obj = document.getElementById("selectfiles");
      obj.click();
    },
    uploadcoverUrlimg() {
      this.imgstatus = 26;
      let obj = document.getElementById("selectfiles");
      obj.click();
    },
    ediimgup() {
      this.imgstatus = 50;
      let obj = document.getElementById("selectfiles");
      obj.click();
    },
    imports() {
      //渲染dom后引入上传插件方法
      require("!!script-loader!../../common/uptooss/lib/crypto1/crypto/crypto.js");
      require("!!script-loader!../../common/uptooss/lib/crypto1/hmac/hmac.js");
      require("!!script-loader!../../common/uptooss/lib/crypto1/sha1/sha1.js");
      require("!!script-loader!../../common/uptooss/lib/base64.js");
      require("!!script-loader!../../common/uptooss/lib/plupload-2.1.2/js/plupload.full.min.js");
      require("!!script-loader!../../common/uptooss/upload.js");
    },
    //隐藏放大的图片
    markHide(){
      this.markShow = false;
      this.num = 0;
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    if(this.orgId !== undefined){//从已审核供应商点击查看
       getorginfo(this.orgId).then((res) =>{
         if(res.flag == 20000){
          if(res.data.orgImgUrls.length >0){
            for(var i=0;i<res.data.orgImgUrls.length;i++){
                this.$set(this.resourcesimg[i], 'url', res.data.orgImgUrls[i])
            }
          }
           this.form.BusLicense=res.data.orgImg
           this.form.name = res.data.name
           this.form.contactPerson = res.data.contactPerson
           this.form.showUrl = res.data.logo
           this.form.content = res.data.content
           this.form.creditRate = res.data.creditRate
           this.form.manualScore = res.data.manualScore
           this.form.sellNum = res.data.sellNum
           this.form.manualSellNum = res.data.manualSellNum
           if(res.data.isRecommend == "1"){
             this.isRecommendbool = true
           }else{
             this.isRecommendbool = false
           }
           
           this.form.phone = res.data.phone
           this.form.accountPeriod = res.data.accountPeriod
           this.form.bankCardId = res.data.bankCardId
           this.form.bankCardName = res.data.bankCardName
           this.form.cardId = res.data.cardId
           this.form.bankPhone = res.data.bankPhone    
           this.form.orgRemark = res.data.orgRemark      
           this.form.selectProv = res.data.supplierProvince
           this.form.selectCity  = res.data.supplierCity;
            this.form.mainField = res.data.mainField
           this.form.mainProduct = res.data.mainProduct
          }else{
            this.$message({
							message: res.msg,
							type: 'error'
            });
          }
       })
     }






    //图片上传
    this.imports();
    var self = this;
    var uploader = new plupload.Uploader({
      runtimes: "html5,flash,silverlight,html4",
      browse_button: "selectfiles",
      //multi_selection: false,
      container: document.getElementById("container"),
      flash_swf_url: "lib/plupload-2.1.2/js/Moxie.swf",
      silverlight_xap_url: "lib/plupload-2.1.2/js/Moxie.xap",
      url: "http://oss.aliyuncs.com",

      init: {
        PostInit: function() {
          document.getElementById("ossfile").innerHTML = "";
        },

        FilesAdded: function(up, files) {
          if (up.total.queued == 2) {
            return;
          }
          plupload.each(files, function(file) {
            document.getElementById("ossfile").innerHTML =
              '<div id="' + file.id + '"><b></b>' + "</div>";
          });
          up.start();
        },

        BeforeUpload: function(up, file) {
          check_object_radio();
          get_dirname();
          set_upload_param(up, file.name, true);
        },

        UploadProgress: function(up, file) {
          if (self.imgstatus == 25) {
            var d = document.getElementById("progress");
            //console.log(d);
            d.innerHTML = "<span>已完成上传:" + file.percent + "%</span>";
          }
        },

        FileUploaded: function(up, file, info) {
          var url = host + "/" + get_uploaded_object_name(file.name);
          if (info.status == 200) {
            if (self.imgstatus == 10) {
              self.form.showUrl = url;
            } else if (self.imgstatus == 0) {
              self.resourcesimg[0].url = url;
            } else if (self.imgstatus == 1) {
              self.resourcesimg[1].url = url;
            } else if (self.imgstatus == 2) {
              self.resourcesimg[2].url = url;
            } else if (self.imgstatus == 3) {
              self.resourcesimg[3].url = url;
            } else if (self.imgstatus == 4) {
              self.resourcesimg[4].url = url;
            } else if (self.imgstatus == 5) {
              self.resourcesimg[5].url = url;
            } else if (self.imgstatus == 6) {
              self.resourcesimg[6].url = url;
            } else if (self.imgstatus == 7) {
              self.resourcesimg[7].url = url;
            } else if (self.imgstatus == 8) {
              self.resourcesimg[8].url = url;
            } else if (self.imgstatus == 26) {
              self.resourcesvideo.coverUrl = url;
            } else if (self.imgstatus == 50) {
              self.editor.insertEmbed(
                self.editor.getContents().index,
                "image",
                url
              );
            }
          } else {
            document
              .getElementById(file.id)
              .getElementsByTagName("b")[0].innerHTML =
              info.response;
          }
        },

        Error: function(up, err) {
          document
            .getElementById("console")
            .appendChild(
              document.createTextNode("\nError xml:" + err.response)
            );
        }
      }
    });

    uploader.init();
  }
};
</script>
<style scoped>
aptitude{
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
.mark{
    position: absolute;
    background: rgba(0,0,0,0.5);
    width: 100px;
    height: 100px;
    top: 0;
    left:0;
    display:none;
}
.mark button{
    padding: 4px 20px;
    display: block;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 7px;
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
.doctor{
    position: relative;
}
.doctor .mark{
    position: absolute;
    top:0;
    left:0;
}
.doctor:hover .mark{
    display: block;
}
</style>


