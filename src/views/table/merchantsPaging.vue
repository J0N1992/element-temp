<template>
	<div class="app-container">

		<div class="filter-container">
			<!--
			<el-form class="filter-item" label-position="left" style="width: 600px; margin-left:10px;display: -webkit-inline-box!important;vertical-align: top!important;display:inline-flex;">
				<el-form-item label="开始时间" style="display: flex;">
					<el-date-picker v-model="infoData.beginTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择开始时间" />
				</el-form-item>
				<el-form-item label="结束时间" style="display: flex;margin-left: 10px;">
					<el-date-picker v-model="infoData.endTime" value-format="yyyy-MM-dd" type="date" placeholder="请选择结束时间" />
				</el-form-item>
			</el-form>
			<el-select v-model="infoData.status" placeholder="状态" clearable style="width: 110px" class="filter-item">
				<el-option v-for="item in infoStatus" :key="item.key" :label="item.label" :value="item.key" />
			</el-select>
			<el-form class="filter-item" label-position="left" style="width:600px; margin-left:10px;display: -webkit-inline-box!important;vertical-align: top!important;display:inline-flex;">
				<el-form-item label="联系人姓名" style="display: flex;">
					<el-input v-model="infoData.name" placeholder="请输入相关关键字" clearable></el-input>
				</el-form-item>
				<el-form-item label="企业名称" style="display: flex;margin-left: 10px;">
					<el-input v-model="infoData.company" placeholder="请输入相关关键字" clearable></el-input>
				</el-form-item>
			</el-form>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
			-->
		</div>
		<el-table v-loading="listLoading" class="tb-edit" :data="list" border fit highlight-current-row style="width: 100%">

			<el-table-column align="center" prop="createTime" label="创建时间" min-width="20%"></el-table-column>

			<el-table-column align="center" prop="id" label="商户id" min-width="20%"></el-table-column>

			<el-table-column align="center" prop="nsrsbh" label="纳税人识别号" min-width="20%"></el-table-column>

			<el-table-column align="center" prop="address" label="地址" min-width="20%"></el-table-column>

			<el-table-column align="center" prop="phone" label="联系方式" min-width="20%"></el-table-column>
			
			<el-table-column align="center" prop="nsrmc" label="纳税人名称" min-width="20%"></el-table-column>

			<!--
			<el-table-column align="center" label="评分" min-width="20%">
				<template slot-scope="scope">
					<span v-if="!!scope.row.info.rating">{{ scope.row.info.rating }}分</span>
					<span v-else>暂无评分</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="问题解决/回答" min-width="20%">
				<template slot-scope="scope">
					<span v-if="scope.row.info.status == 0">未回答</span>
					<span v-else-if="scope.row.info.status == 1">已回答</span>
					<span v-if="scope.row.info.status == 2">已解决</span>
					<span v-else-if="scope.row.info.status == 3">未解决</span>
				</template>
			</el-table-column>

			<el-table-column align="center" label="纳税等级" min-width="20%">
				<template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.info.level" placeholder="纳税等级" @change="handleEdit(scope.$index, scope.row)"></el-input> 
					<span v-if="!!scope.row.info.level">{{scope.row.info.level}}</span>
					<span v-else>请编辑纳税等级</span>
                </template>
			</el-table-column>
			-->

			<el-table-column align="center" label="操作" min-width="40%">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="unionpayPieces(scope.row.id,scope.row.nsrmc,scope.row.tlinxStatus)">银联进件</el-button>
					<el-button type="success" size="small" @click="transferTicketsParts(scope.row.id,scope.row.nsrmc,scope.row.yplStatus)">易票联进件</el-button>
					<el-button type="info" size="small" @click="viewList(scope.row)">查看</el-button>
				</template>
			</el-table-column>

		</el-table>
		
		<el-dialog :visible.sync="dialogshowContentVisible" title="商户内容:">
			<el-form :model="this.showContent">
				<el-form-item :label-width="formLabelWidth" label="创建时间:">
					<span>{{showContent.createTime}}</span>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="商户id:">
					<span>{{showContent.id}}</span>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="纳税人识别号:">
					<span>{{showContent.nsrsbh}}</span>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="地址:">
					<span>{{showContent.address}}</span>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="联系方式:">
					<span>{{showContent.phone}}</span>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="纳税人名称:">
					<span>{{showContent.nsrmc}}</span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogshowContentVisible = false">关闭</el-button>
			</div>
		</el-dialog>

		<el-pagination :total="total" :page-size="pageSize" :current-page="pageNo" :page-sizes="[5, 10, 15, 20]"
		 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
	</div>
</template>

<script>
	import {
		commonInterface
	} from '@/api/commonInterface'
	export default {
		name: 'question',
		data() {
			return {				
				formLabelWidth: '120px',
				list: null,
				total: 0,
				pageNo: 1, //	初始页
				pageSize: 5, //    每页的数据
				listLoading: true,
				showContent: {
					id: "",
					nsrsbh: "",
					address: "",
					phone: "",
					createTime: "",
					nsrmc: ""
				},
				findTopMerchantByPage: '/admin/findTopMerchantByPage',
				dialogshowContentVisible:false
			}
		},
		created() {
			this.getList();
		},
		methods: {
			handleSizeChange: function(size) {
				this.pageSize = size //	每页下拉显示数据
				this.getList()
			},
			handleCurrentChange: function(currentPage) {
				//this.page = currentPage
				this.pageNo = currentPage //	点击第几页
				this.getList()
			},
			getList() {
				this.listLoading = true;
				commonInterface(this.findTopMerchantByPage, {'pageNo': this.pageNo, 'pageSize': this.pageSize}).then(response => {
					this.list = response.data.Data.Rows;
					this.total = response.data.Data.TotalRecord;
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
				})
			},
			unionpayPieces(id,company,status){
				//银联进件
				this.$router.push({path: '/addmerchants',query:{ id: id, company: company, status: status }})
			},
			transferTicketsParts(id,company,status){
				//易票联进件
				this.$router.push({path: '/pylInto',query:{ id: id, company: company, status: status }})
			},
			viewList(row){
				//查看
				this.showContent = row;
				this.dialogshowContentVisible = true;				
			}
		}
	}
</script>

<style>

</style>
