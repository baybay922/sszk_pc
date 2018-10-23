<style scoped>
.qrCode{
    width: 200px;
    height: 200px;
    position: fixed;
    right: 70px;
    top: 50%;
    text-align: center;
  }
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
.videoBox:hover .mark{
  display:block;
  z-index: 5555;
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
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .videoMark{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    z-index: 888;
    background: rgba(0, 0, 0, 0.8);
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .close{
    position:absolute;
    right:0;
    top:0;
    color:#Fff;
  }
</style>

<template>
	<el-form ref="form" :model="form" label-width="100px" @submit.prevent="onSubmit" style="margin:20px;width:80%;min-width:600px;">
		<el-form-item label="供应商">
      <el-select
        v-model="form.supplierOrgNo"
        filterable
        remote
        reserve-keyword
        :disabled="productId ? true : false"
        placeholder="请输入供应商名称"
        :remote-method="getsuppliers"
        :loading="loading">
        <el-option
          v-for="item in supplieroptions"
          :key="item.orgId"
          :label="item.orgName"
          :value="item.orgId">
        </el-option>
      </el-select>
		</el-form-item>
    <el-form-item label="渠道商分成">
      <el-input-number v-model="form.returnRate" controls-position="right" :min="0" :max="100"></el-input-number>
		</el-form-item>
    <el-form-item label="产品分类">
      <el-cascader
      :options="productTypes"
      v-model="value2"
      @change="handleChange">
      </el-cascader>
		</el-form-item>
    <el-form-item label="产品名称">
			<el-input v-model="form.productName"></el-input>
		</el-form-item>
    <el-form-item label="产品slogan">
			<el-input v-model="form.slogan"></el-input>
		</el-form-item>
    <el-form-item label="平台推荐">
			<el-checkbox v-model="isRecommendbool">勾选此项会在产品列表和产品详情显示“多+推荐”</el-checkbox>
		</el-form-item>
    <el-form-item label="月售单数">
			{{ form.sellNum }} + <span style="color: red;">{{ form.manualSellNum }}</span> = {{ parseInt(form.sellNum)+parseInt(form.manualSellNum) }}
      <span style="margin-left: 30px;">加权分<el-input-number v-model="form.manualSellNum" controls-position="right" :min="0" :max="100"></el-input-number></span>
		</el-form-item>
    <el-form-item label="列表封面图">
      <el-col class="aptitude" :span="3" style="margin-right:10px;position:relative;">
        <img v-bind:src="form.showUrl" width="100px" height="100px" @click="form.showUrl ==''?uploadshowurl():''" class="upimgbg"><div id="ossfile">加载上传插件失败!请刷新页面</div>
        <div class="mark" v-if="form.showUrl !== '' ">
          <el-button class="enlarge" @click="enlarge(form.showUrl)">放大</el-button>
          <el-button class="modify" @click="uploadshowurl()">修改</el-button>
          <el-button class="del" @click="delImg('5')">删除</el-button>
        </div>
      </el-col>
			
		</el-form-item>
    <el-form-item label="产品顶部图片">
      <el-col v-for="(item, index) in resourcesimg" :key="index" class="aptitude" style="width:100px;margin-right:20px;position:relative;">
        <img @click="resourcesimg[index].url == '' ? uploadresourcesimg(index): ''" :src="item.url" width="100px" height="100px" class="upimgbg" >
        <div class="mark" v-if="resourcesimg[index].url !== '' ">
          <el-button class="enlarge" @click="enlarge(resourcesimg[index].url)">放大</el-button>
          <el-button class="modify" @click="uploadresourcesimg(index)">修改</el-button>
          <el-button class="del" @click="delImg(index,item.id)">删除</el-button>
        </div>
      </el-col>
  	</el-form-item>
  
  
    <el-form-item label="产品顶部视频" style="position:relative;display:inline-block">
      <div style="width:100px;height:100px;position:absolute;top:0;z-index:222;border:1px solid #ccc;" @click="upvideo()" v-if="videoMark">
        <img :src="require('../../images/loading.gif')" alt="" style="width:100%" v-if="imgShow">
      </div>
      <div class="videoBox" style="display:inline-block;">
        <div class="mark"  v-if="btnMark">
          <el-button class="enlarge" @click="toPlay()">播放</el-button>
          <el-button class="modify" @click="upvideo('change')">修改</el-button>
          <el-button class="del" @click="delImg('25')">删除</el-button>
        </div>
          <video
            width="100px"
            height="100px"
            v-bind:src="resourcesvideo.url"
            playsinline="true"
            x-webkit-airplay="allow"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            style="object-fit:fill" 
            class="upimgbg"
            >
          您的浏览器不支持 video 标签。
          </video>
      </div>
      <b id="progress"></b>
		</el-form-item>



    <el-form-item label="视频封面图">			
      <el-col class="aptitude" :span="3" style="margin-right:10px;position:relative;">
        <img v-bind:src="resourcesvideo.coverUrl" width="100px" height="100px" @click="resourcesvideo.coverUrl==''?uploadcoverUrlimg():''" style="margin-right: 20px;" class="upimgbg">
        <div class="mark" v-if="resourcesvideo.coverUrl !== ''">
          <el-button class="enlarge" @click="enlarge(resourcesvideo.coverUrl)">放大</el-button>
          <el-button class="modify" @click="uploadcoverUrlimg()">修改</el-button>
          <el-button class="del" @click="delImg('26')">删除</el-button>
        </div>
      </el-col>
    </el-form-item>
    <el-form-item label="产品标签">
			<el-tag
        :key="tag"
        v-for="tag in label"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">点击添加</el-button>
		</el-form-item>
    <el-form-item label="地点">
			<el-input v-model="form.productPlace"></el-input>
		</el-form-item>
    <el-form-item label="主刀医生">
			<el-input v-model="form.productDoctor"></el-input>
		</el-form-item>
    <el-form-item label="产品客服电话">
			<el-input v-model="form.serviceCall" placeholder="请输入产品支持的客服电话"></el-input>
		</el-form-item>

    <el-form-item label="供应商介绍">
			<quill-editor
        v-model="form.descInfos[0].content"
        ref="myQuillEditor"
        :options="editorOption">
        <div id="toolbar" slot="toolbar">
            <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
            <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
            <span class="ql-formats" style="margin-top:-10px;">
              <select class="ql-color">
              <option selected="selected"></option><option value="#e60000"></option><option value="#ff9900"></option><option value="#ffff00"></option><option value="#008a00"></option><option value="#0066cc"></option><option value="#9933ff"></option><option value="#ffffff"></option><option value="#facccc"></option><option value="#ffebcc"></option><option value="#ffffcc"></option><option value="#cce8cc"></option><option value="#cce0f5"></option><option value="#ebd6ff"></option><option value="#bbbbbb"></option><option value="#f06666"></option><option value="#ffc266"></option><option value="#ffff66"></option><option value="#66b966"></option><option value="#66a3e0"></option><option value="#c285ff"></option><option value="#888888"></option><option value="#a10000"></option><option value="#b26b00"></option><option value="#b2b200"></option><option value="#006100"></option><option value="#0047b2"></option><option value="#6b24b2"></option><option value="#444444"></option><option value="#5c0000"></option><option value="#663d00"></option><option value="#666600"></option><option value="#003700"></option><option value="#002966"></option><option value="#3d1466"></option>
              </select>
            </span>
            <!--图片按钮点击事件-->
            <span class="ql-formats"><button type="button" @click="ediimgup">
              <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
            </button></span>
        </div>
      </quill-editor>
		</el-form-item>


    <el-form-item>
      <el-button type="primary" @click="preview">预览</el-button>
			<el-button type="primary" @click="onSubmit" v-if="!productId">保存</el-button>
      <el-button type="primary" @click="onSubmit" v-else>修改</el-button>
		</el-form-item>


    <!-- 上传图片oss -->
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
    <!-- 预览显示二维码 -->
      <div class="qrCode" v-if="showQrCode">
        <qrcode-vue :value="value" level="H"></qrcode-vue>
        <p>手机扫描二维码预览产品</p>
      </div>
    <!-- 图片放大遮罩 -->
      <div class="imgMark" v-if="markShow" @click="markHide()" style="z-index:888888">
         <img :src="markUrl" alt="" ref="imgBox" style="transition:transform 1s">
          <div class="icon">
            <div style="margin-right:10px" @click="rotateR($event)"><img :src="require('../../images/rotateR.png')" alt=""></div>
            <div @click="rotateL($event)"><img :src="require('../../images/rotateL.png')" alt=""></div>
          </div>
      </div>

    <!-- 上传视频点击播放全屏播放 -->
    <div class="videoMark" v-if="isPlay" @click="videoHide()">
      <video :src="videoSrc" autoplay='autoplay' controls="controls"></video>
    </div>
	</el-form>
</template>
<script>
import '../../common/uptooss/style.css';
import Quill from 'quill';
import QrcodeVue from 'qrcode.vue';
import { supplierAdd, getsuppliers, productadd, getproducttype, getproductinfo, productupdate } from '../../api/api';
	export default {
		data() {
			return {     
        videoMark:true,   
        markShow:false,
        videoSrc:'',
        isPlay:false,
        imgShow:false,
        btnMark:false,
        imgstatus: 1,
        supplierOrgNo: '',
        productId: this.$route.query.productId,
        productTypes: [],
        loading: false,
        supplieroptions: [],
        isRecommendbool: false,
        label: [],
        inputVisible: false,
        inputValue: '',
        resourcesimg: [
          {resourceName: '', resourceType: 1, url: ''},
          {resourceName: '', resourceType: 1, url: ''},
          {resourceName: '', resourceType: 1, url: ''},
          {resourceName: '', resourceType: 1, url: ''},
          {resourceName: '', resourceType: 1, url: ''},
        ],
        resourcesvideo: {resourceName: '', resourceType: 2, url: '', coverUrl: ''},
				form: {
          supplierOrgNo: '',
          returnRate: 50,
          groupBuyingRate: 3,
          productType: '',
          productName: '',
          slogan: '',
          serviceCall: '',
          manualSellNum: '0',
          sellNum: '0',
          isRecommend: 0,
          showUrl: '',
          resources: [],
          label: '',
          productPlace: '',
          productDoctor: '',
          descInfos: [{
            title: '',
            content: ''
          }]
				},
				editorOption: {
          modules: {
            toolbar: '#toolbar'
          }
        },
        value:"",
        value2:[],
        showQrCode:false,
        num1:0
			}
		},
		methods: {
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
      //上传的视频是否播放
      toPlay(){
        // let video = document.getElementsByTagName('video')[0];
        // video.play()
        this.isPlay = true;
        this.videoSrc = this.resourcesvideo.url;
      },
      //隐藏全屏的视频
      videoHide(){
        this.isPlay = false;
      },
      //删除图片
      delImg(index,delId){
        if(index >= 0 && index<5){
          this.imgstatus = index;
          this.resourcesimg.splice(index,1);
          this.resourcesimg.push({resourceName: '', resourceType: 1, url: '',id:delId,coverUrl:""})
        }else if(index == 5){
            this.form.showUrl = '';
        } else if(index == 25) {
          this.videoMark = true;
          this.resourcesvideo.url = '';
          this.btnMark = false;
          this.imgShow = false;
        }else if(index == 26) {
          this.resourcesvideo.coverUrl = ''
        }
      
      },
      preview(){
        if(this.resourcesimg[5]) {
          this.resourcesimg.splice(5,1);
        }
        this.resourcesimg.push(this.resourcesvideo);
        this.form.resources = this.resourcesimg;
        this.form.label = this.label.toString();
        this.form.isRecommend = this.isRecommendbool == true ? 1 : 0;
       //提交新增产品
        if(this.form.supplierOrgNo == '' && this.form.productName == ''){
            this.$message({
                message:'请输入供应商与产品名称',
                type: 'error'
            });
        }else if(this.form.supplierOrgNo == ''){
          this.$message({
                message:'请输入供应商',
                type: 'error'
            });
        }else if( this.form.productName == ''){
            this.$message({
                message:'请输入产品名称',
                type: 'error'
            });
        }else{
          if(this.productId){//提交修改产品
            this.form.productId = this.productId;
            this.form.supplierOrgNo = this.supplierOrgNo;
            productupdate(this.form).then((res) => {
             if(res.flag == 20000) {
                this.resourcesimg.splice(5,1);
                this.value = "https://m.dogotsn.com/#/productinfo?productId="+res.data.productId+"&type=p"
                this.showQrCode = true;
              }else{
                this.resourcesimg.splice(5,1);
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
            });
          }else{
            productadd(this.form).then((res) => {
              if(res.flag == 20000) {
                this.resourcesimg.splice(5,1);
                this.value = "https://m.dogotsn.com/#/productinfo?productId="+res.data.productId+"&type=p"
                this.showQrCode = true;
                if(res.data.productId){
                  this.productId = res.data.productId;
                  this.getproductinfo();
                }
              }else{
                this.resourcesimg.splice(5,1);
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
            })
          }        
       }
        
      },
      handleChange(value){
        let productType = value[0],
            productLabel = value[1];
        this.form.productType = productType;
        this.form.productLabel = productLabel;
      },
      getproductinfo() {
        getproductinfo(this.productId).then((res) => {
           let productType = res.data.productType,
              productLabel = res.data.productLabel;
             
          this.supplierOrgNo = res.data.supplierOrgNo;
          this.form = res.data;
          this.form.supplierOrgNo = res.data.supplierOrgNo;
          this.label = res.data.label;
          this.form.returnRate = parseInt(res.data.returnRate);
          this.isRecommendbool = res.data.isRecommend == 1 ? true : false;
          this.resourcesvideo = res.data.resources[5];
          if(this.resourcesvideo.url !== ''){
            this.videoMark=false;
            this.btnMark = true;
          }
          res.data.resources.splice(5,5);
          this.resourcesimg = res.data.resources;
          this.value2.push(productType,productLabel)
          this.form.productType = res.data.productType;
          this.form.productLabel = res.data.productLabel;
        });
      },
      //获取产品分类列表
      getproducttype() {
        getproducttype().then((res) => {
          this.productTypes = res.data;
          if(this.productId) {
            this.getproductinfo();
          }
        });
      },
      getsuppliers(query) {
        let self = this;
        this.loading = true;
        let para = {};
        para.keywords = query;
        para.pageNo = 1;
        para.pageSize = 20;        
        if(query !== '') {
          getsuppliers(para).then((res) => {
            console.log(para)
            this.supplieroptions = res.data.list;
            this.loading = false;
          });
        }
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.label.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
        this.imgstatus = 5;
        let obj = document.getElementById('selectfiles');
        obj.click();
      },
      uploadresourcesimg(index){
        this.imgstatus = index;
        let obj = document.getElementById('selectfiles');
        obj.click();
      },
      //上传视频
      upvideo(str) {
        this.imgstatus = 25;
        let obj = document.getElementById('selectfiles');
        obj.click();
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
      uploadcoverUrlimg() {
        this.imgstatus = 26;
        let obj = document.getElementById('selectfiles');
        obj.click();
      },
      ediimgup(){
        this.imgstatus = 50;
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
			onSubmit() {
        if(this.resourcesimg[5]) {
          this.resourcesimg.splice(5,1);
        }

        this.resourcesimg.push(this.resourcesvideo);
        this.form.resources = this.resourcesimg;

        this.form.label = this.label.toString();
        this.form.isRecommend = this.isRecommendbool == true ? 1 : 0;
        if(this.productId){//提交修改产品
          this.form.productId = this.productId;
          this.form.supplierOrgNo = this.supplierOrgNo;
          productupdate(this.form).then((res) => {
            if(res.flag == 20000) {
              this.resourcesimg.splice(5,1);
              this.$message({
                message: '修改成功!',
                type: 'success'
              });
              this.$router.push({path: '/prolistdown'});
            }else{
              this.resourcesimg.splice(5,1);
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          });
        }else{//提交新增产品
          productadd(this.form).then((res) => {
            if(res.flag == 20000) {
              this.resourcesimg.splice(5,1);
              this.$message({
                message: '添加成功!',
                type: 'success'
              });
              this.$router.push({path: '/prolistdown'});
            }else{
              this.resourcesimg.splice(5,1);
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          });
        }
        
			}
		},
		computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
		},
		mounted() {
      this.imports();
      this.getproducttype();
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
              document.getElementById('ossfile').innerHTML = '<div id="' + file.id + '"><b></b>'+'</div>';
            });
            up.start();
          },

          BeforeUpload: function(up, file) {
            let imgType = ['image/jpg','image/jpeg','image/png','image/bmp']
              if(self.imgstatus >=0 &&  self.imgstatus <= 5){
                   if(imgType.indexOf(file.type) == -1){       
                    self.$message({
                      message:"请上传jpg,jpeg,png,bmp格式的文件",
                      type:"error"
                    })
                    return;
                  }     
              }
                  check_object_radio();
                  get_dirname();
                  set_upload_param(up, file.name, true);
              },

          UploadProgress: function(up, file) {
             // var d = document.getElementById('progress');
              //console.log(d);
              if(self.imgstatus == 25 && file.percent >0){
                self.imgShow = true;
                self.videoMark= true;
                self.imgShow = true;
              }
              if(self.imgstatus == 25 && file.percent == 100){
                self.videoMark = false;
                self.btnMark = true;
                
              }
              //d.innerHTML = '<span>已完成上传:' + file.percent + "%</span>";
          },
          FileUploaded: function(up, file, info) {
                  var url = host + '/' + get_uploaded_object_name(file.name);
                  if (info.status == 200)
                  {
                    if(self.imgstatus == 5) {
                      self.form.showUrl = url;
                    }else if(self.imgstatus == 0) {
                      self.resourcesimg[0].url = url
                    }else if(self.imgstatus == 1) {
                      self.resourcesimg[1].url = url
                    }else if(self.imgstatus == 2) {
                      self.resourcesimg[2].url = url
                    }else if(self.imgstatus == 3) {
                      self.resourcesimg[3].url = url
                    }else if(self.imgstatus == 4) {
                      self.resourcesimg[4].url = url
                    }else if(self.imgstatus == 25) { 
                      let typeArr = ['video/mp4','video/avi', 'video/wma', 'video/rmvb','video/rm', 'video/flash','video/mid'];
                      if(typeArr.indexOf(file.type) == -1){
                        self.$message({
                          message:"请上传mp4,avi,wma,rmvb,rm,falsh,mid格式的文件",
                          type:"error"
                        }) 
                        self.btnMark = false;
                        self.videoMark = true;
                        self.imgShow = false;
                        return ;
                      }else{
                        self.resourcesvideo.url = url;
                        setTimeout(()=>{
                          self.imgShow = false;
                        },3000)
                      }       
                    }else if(self.imgstatus == 26) {
                      self.resourcesvideo.coverUrl = url
                    }else if(self.imgstatus == 50) {
                      self.editor.insertEmbed(self.editor.getContents().index, 'image', url);
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
    },
    components: {
      QrcodeVue
    }
	}

</script>