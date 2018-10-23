<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.keyWord" placeholder="请输入产品关键字"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getProducts">查询</el-button>
				</el-form-item>
        <el-form-item>
					产品分类：
          <el-select v-model="filters.productType" placeholder="请选择" @change="getProducts">
            <el-option
            v-for="item in productTypes"
            :key="item.productType"
            :label="item.productTypeName"
            :value="item.productType">
          </el-option>
        </el-select>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="products" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="productName" label="产品名称" width="200">
			</el-table-column>
			<el-table-column label="封面图" width="200">
        <template scope="scope">
          <img v-bind:src="scope.row.imgUrl" width="100px" height="100px">
        </template>
			</el-table-column>
      <el-table-column label="产品大类">
        <template scope="scope">
            <p>{{scope.row.productTypeName}} - {{scope.row.productLabelName}}</p>
        </template>
      </el-table-column>
			<el-table-column prop="supplierName" label="供应商" min-width="120">
			</el-table-column>
      <el-table-column prop="productDoctor" label="医生"></el-table-column>
      <el-table-column prop="returnRate" label="渠道商分成" width="120"></el-table-column>
      <!-- <el-table-column prop="sellNum" label="月售数量" min-width="100">
			</el-table-column>
      <el-table-column prop="isRecommend" label="多+推荐" width="120">
        <template scope="scope">
          <span v-if="scope.row.isRecommend == 1">是</span>
          <span v-if="scope.row.isRecommend == 0">否</span>
        </template>
			</el-table-column>
      <el-table-column prop="checkTime" label="上架日期" width="120">
			</el-table-column>
      <el-table-column prop="groupBuyingRate" label="订单奖励" width="120">
			</el-table-column> -->
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="toediproduct(scope.row.productId)">查看</el-button>
					<el-button type="danger" size="small" @click="gocheckpass(scope.row.productId)">上架</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="filters.pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { getprounderlistdown, dprocheckpass, getproducttype } from '../../api/api';

	export default {
		data() {
			return {
        productTypes: [],
				filters: {
          keyWord: '',
          productType: '',
          status: 2,
          orderField: 2,
          pageNo: 1,
          pageSize: 10
				},
				products: [],
        total: 0,
        listLoading: false
			}
		},
		methods: {
      toediproduct(productId) {
        let path = {path: '/productadd', query: {productId: productId}};
        this.$router.push(path);
      },
      getproducttype() {
        getproducttype().then((res) => {
          this.productTypes = res.data;
        });
      },
			handleCurrentChange(val) {
				this.filters.pageNo = val;
				this.getProducts();
      },
      gocheckpass(productId) {
        this.$confirm('此操作将上架该产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dprocheckpass(productId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上架'
          });          
        });
      },
      //审核通过
      dprocheckpass(productId) {
        this.listLoading = true;
        let para = {};
        para.productId = productId;
        para.checkType = 1;
        dprocheckpass(para).then((res) => {
          if(res.flag == 20000) { 
            this.$message({
              type: 'success',
              message: '产品上架成功!'
            });
            this.getProducts();
            this.listLoading = false;
          }else{
            this.$message({
              type: 'error',
              message: res.msg
            });
            this.listLoading = false;
          }
        })
      },
			//获取用户列表
			getProducts() {
        this.listLoading = true;
				getprounderlistdown(this.filters).then((res) => {
					this.total = res.data.total;
					this.products = res.data.list;
					this.listLoading = false;
				});
			}
		},
		mounted() {
      this.getproducttype();
			this.getProducts();
		}
	}

</script>

<style scoped>

</style>