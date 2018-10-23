<template>
	<el-form ref="form" :model="form" label-width="120px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="POS机订单id">
			<el-input ref="inputBox" v-model="form.posId" placeholder="请输入POS机订单id" style="width:200px;" clearable></el-input>
		</el-form-item>
    <el-form-item label="POS机编号">
			<el-input ref="inputBox" v-model="form.posCode" placeholder="POS机编号" style="width:200px;" clearable></el-input>
		</el-form-item>
    <!-- <el-form-item label="供应商">
      <el-select
        v-model="form.orgId"
        filterable
        remote
        reserve-keyword
        :disabled="orgId ? true : false"
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
		</el-form-item> -->
    <el-form-item label="POS机类型">
			<el-input ref="inputBox" v-model="form.posVendor" style="width:200px;" placeholder="请输入POS机类型" clearable></el-input>
		</el-form-item>
    <el-form-item label="APPKEY">
			<el-input ref="inputBox" v-model="form.appkey" style="width:200px;" placeholder="请输入APPKEY" clearable></el-input>
		</el-form-item>
    <el-form-item label="S/N编号">
			<el-input ref="inputBox" v-model="form.snNo" style="width:200px;" placeholder="请输入S/N编号" clearable></el-input>
		</el-form-item>
    <el-form-item label="状态" style="width:200px" v-if="posId == ''? 1:0">
			<el-select v-model="value" placeholder="请选择" :disabled="posId == ''? true:false">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
		</el-form-item>
    
    <!-- <el-form-item label="状态">
			<el-checkbox v-model="isEnabledFlag">禁用</el-checkbox>
		</el-form-item> -->
    <el-form-item>
			<el-button type="primary" @click="onSubmit" v-if="!posId" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在添加，请稍后">立即创建</el-button>
      <el-button type="primary" @click="onSubmit" v-else>提交修改</el-button>
			<el-button @click="prevent">取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
import { addorupdatePos, getsuppliers} from '../../api/api';
	export default {
		data() {
			return { 
        supplieroptions: [],
        fullscreenLoading: false,
        isEnabledFlag: true,
        addorupdate:"",
        posId:'',
        posCode:'',
				form: {
          posId:this.$route.query.posId,
          posCode:this.$route.query.posCode,
          orgId:this.$route.query.orgId,
          posVendor:this.$route.query.posVendor,
          appkey:this.$route.query.appkey,
          snNo:this.$route.query.snNo,
          isEnabled:this.$route.query.isEnabled,
        },
        options: [{
          value: '选项1',
          label: '禁用'
        }, {
          value: '选项2',
          label: '启用'
        }],
        value: '禁用',
				editorOption: {
          modules: {
            toolbar: '#toolbar'
          }
        },
			}
		},
		methods: {
			onSubmit() {
        this.form.isEnabled = this.value == '禁用' ? 0 : 1;
        let curForm = {
            posId: this.form.posId,
            posCode: this.form.posCode,
            orgId: this.form.orgId,
            posVendor: this.form.posVendor,
            appkey: this.form.appkey,
            snNo:this.form.snNo,
            isEnabled: this.form.isEnabled,
            addorupdate:this.addorupdate,
        }
        
        if(curForm.posId == "" || curForm.posType == "" || curForm.appkey == "" || curForm.orgId == "" || curForm.snNo == ""){
          this.$message({
							message:"请完善POS机信息",
							type: 'error'
            });
        }else{
          this.fullscreenLoading = true;
          addorupdatePos(curForm).then((res) => {
            if(res.flag == 20000){
              this.fullscreenLoading = false;
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              let path = {path:'/poslist',query:{}}
              this.$router.push(path)
            }else{
              this.fullscreenLoading = false;
              this.$message({
                message: res.msg,
                type: 'error'
              });
             
            }
          })
        }
      },
      getsuppliers(query) {
        let self = this;
        this.loading = true;
        let para = {};
        para.orgName = query;
        para.pageNo = 1;
        para.pageSize = 20;        
        if(query !== '') {
          getsuppliers(para).then((res) => {
            this.supplieroptions = res.data.list;
            this.loading = false;
          });
        }
      },
      funaddorupdate() {
        // if(null!=this.isEnabled && this.isEnabled=="0"){
        //   this.isEnabledFlag = false;
        // }else{
        //   this.isEnabledFlag = true;
        // }
        
        if(null!=this.form.posId){
          this.addorupdate = 1;
        }else{
          this.addorupdate = 2;
        }
      },
      prevent(){
        this.$router.go(-1)
      }
		},
		computed: {
      
    },
    
		mounted() {
       this.funaddorupdate();
       this.posId = this.$route.query.posId==undefined?0:1;
    }
	}

</script>