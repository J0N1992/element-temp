<template>
	<div class="contain-padding">
		<el-container>
			<el-header>门店主体信息<span style="margin-left: 30px;color: #0091EA;">{{company}}</span></el-header>
			<el-container>
				<el-container>
					<el-main>
						<el-form ref="storeMainInformation" :model="storeMainInformation" :rules="storeMainInformationRules" label-width="150px"
						 class="demo-ruleForm" style="display: flex;">
							<div style="width: 50%;padding: 0 10% 0 0;">
								<el-form-item label="商户名称" prop="mctNo" v-if="!!storeMainInformation.mctName">
									<el-col :span="18">
										{{storeMainInformation.mctName}}
									</el-col>
								</el-form-item>
								<el-form-item label="商户名称" prop="mctNo" v-else>
									<el-col :span="6">
										<el-button type="danger" @click="visibleMerchant">选择商户</el-button>
									</el-col>
								</el-form-item>
								<el-form-item label="门店全称" prop="shopFullName">
									<el-input v-model="storeMainInformation.shopFullName" placeholder="须同营业执照名称一致" />
								</el-form-item>


								<el-form-item label="所在地" v-if="showCityList == 1" required>
									<el-col :span="6">
										<el-form-item prop="province" :rules="{
											required: true, message: '请选择省份', trigger: 'change'
										}" v-if="!location.province">
											<el-select v-model="location.province" placeholder="请选择省份">
												<el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="province" :rules="{
											required: false, message: '请选择省份', trigger: 'change'
										}" v-else-if="!!province  && location.province !== null">
											<el-select v-model="location.province" placeholder="请选择省份">
												<el-option label="省份" v-for="item in province" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="province" :rules="{
											required: true, message: '请选择省份', trigger: 'change'
										}" v-else>
											<el-select v-model="location.province" placeholder="请选择省份">
												<el-option label="省份" value="1" />
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>										
										<el-form-item prop="city" :rules="{
											required: true, message: '请选择城市', trigger: 'change'
										}" v-if="!location.city">
											<el-select v-model="location.city" placeholder="请选择城市">
												<el-option label="城市" v-for="item in city2" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="city" :rules="{
											required: false, message: '请选择城市', trigger: 'change'
										}" v-else-if="!!city2  && location.city !== null">
											<el-select v-model="location.city" placeholder="请选择城市">
												<el-option label="城市" v-for="item in city2" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="city" :rules="{
											required: true, message: '请选择城市', trigger: 'change'
										}" v-else>
											<el-select v-model="location.city" placeholder="请选择城市">
												<el-option label="城市" value="2" />
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>
										<el-form-item prop="cityid" v-if="!!county2">
											<el-select v-model="storeMainInformation.cityid" placeholder="请选择区县">
												<el-option label="区县" v-for="item in county2" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="cityid" v-else>
											<el-select v-model="storeMainInformation.cityid" placeholder="请选择区县">
												<el-option label="区县" value="3" />
											</el-select>
										</el-form-item>
									</el-col>
								</el-form-item>


								<el-form-item label="所在地" v-if="showCityList == 2" required>
									<el-col :span="6">
										<el-form-item prop="province" v-if="!!provinceTwo">
											<el-select v-model="showCity.province" placeholder="请选择省份">
												<el-option v-for="item in provinceTwo" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="province" v-else>
											<el-select value="1" placeholder="请选择省份">
												<el-option label="省份" value="1" />
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>
										<el-form-item prop="city" v-if="!!cityTwo">
											<el-select v-model="showCity.city" placeholder="请选择城市">
												<el-option label="城市" v-for="item in cityTwo" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="city" v-else>
											<el-select v-model="showCity.city" placeholder="请选择城市">
												<el-option label="城市" value="2" />
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>
										<el-form-item prop="county" v-if="!!countyTwo">
											<el-select v-model="storeMainInformation.cityid" placeholder="请选择区县" v-if="!showCity.county">
												<el-option label="区县" v-for="item in countyTwo" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
											<el-select v-model="storeMainInformation.cityid" placeholder="请选择区县" v-else>
												<el-option label="区县" v-for="item in countyTwo" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="city" v-else>
											<el-select v-model="storeMainInformation.cityid" placeholder="请选择区县">
												<el-option label="区县" value="3" />
											</el-select>
										</el-form-item>
									</el-col>
								</el-form-item>


								<el-form-item label="门店电话" prop="tel">
									<el-input v-model="storeMainInformation.tel" />
								</el-form-item>
								<el-form-item label="门店负责人" prop="contact">
									<el-input v-model="storeMainInformation.contact" />
								</el-form-item>
								<el-form-item label="人均消费" prop="rjxf">
									<el-col :span="10">
										<el-input v-model="storeMainInformation.rjxf" />
									</el-col>
									<el-col :span="3" style="margin-left: 5px;">
										元
									</el-col>
								</el-form-item>
								<el-form-item label="百度坐标">
									<el-col :span="6">
										<el-form-item prop="lng">
											<el-input v-model="storeMainInformation.lng" placeholder="经度" />
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>
										<el-form-item prop="lat">
											<el-input v-model="storeMainInformation.lat" placeholder="维度" />
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>
										<el-button type="danger">获取坐标</el-button>
									</el-col>
								</el-form-item>
							</div>

							<div>
								<el-form-item label="招牌名" prop="zpm">
									<span>{{storeMainInformation.zpm}}</span>
								</el-form-item>
								<el-form-item label="门店简称" prop="shopName">
									<el-input v-model="storeMainInformation.shopName" />
								</el-form-item>
								<el-form-item label="详细地址" prop="address">
									<el-input v-model="storeMainInformation.address" />
								</el-form-item>
								<el-form-item label="营业时间">
									<el-input v-model="storeMainInformation.openHours" />
								</el-form-item>
								<el-form-item label="负责人手机号码">
									<el-input v-model="storeMainInformation.contactTel" />
								</el-form-item>
								<el-form-item>
									&nbsp;
								</el-form-item>
								<el-form-item label="高德坐标">
									<el-col :span="6">
										<el-form-item prop="lng2">
											<el-input v-model="storeMainInformation.lng2" placeholder="经度" />
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>
										<el-form-item prop="lat">
											<el-input v-model="storeMainInformation.lat2" placeholder="维度" />
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>
										<el-button type="danger">获取坐标</el-button>
									</el-col>
								</el-form-item>
							</div>
						</el-form>
					</el-main>
				</el-container>
			</el-container>
		</el-container>
		<el-container>
			<el-header>门店照片</el-header>
			<el-container>
				<el-container>
					<el-main>
						<el-form ref="storePic" :model="storePic" :rules="storePicRules" label-width="150px" class="demo-ruleForm" style="display: flex;">
							<div style="width: 50%;padding: 0 10% 0 0;">
								<el-form-item label="整体门面(含招牌)" prop="pic1" style="padding-bottom: 10%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangePic1" class="avatar-uploader">
										<img v-if="storePic.pic1" :src="storePic.pic1" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">文件大小不得超过2M</p>
								</el-form-item>
								<el-form-item label="店内环境" prop="pic3" style="padding-bottom: 10%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangePic3" class="avatar-uploader">
										<img v-if="storePic.pic3" :src="storePic.pic3" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">文件大小不得超过2M</p>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="backMerchants" plain>返回商户列表</el-button>
									<el-button type="primary" @click="submitForm(addToreRules)">保存</el-button>
									<el-button @click="resetForm(addToreRules)">保存并继续添加合同</el-button>
								</el-form-item>
							</div>
							<div>
								<el-form-item label="收银台" prop="pic2" style="padding-bottom: 20%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangePic2" class="avatar-uploader">
										<img v-if="storePic.pic2" :src="storePic.pic2" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">
										文件大小不得超过2M
									</p>
								</el-form-item>
								<el-form-item label="其他照片" prop="pic4" style="padding-bottom: 10%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangePic4" class="avatar-uploader">
										<img v-if="storePic.pic4" :src="storePic.pic4" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">
										文件大小不得超过2M
									</p>
								</el-form-item>
							</div>
						</el-form>
					</el-main>
				</el-container>
			</el-container>
		</el-container>
		<el-dialog :visible.sync="dialogSelectMerchantsVisible" title="选择商户">

			<el-form>
				<el-form-item label="商户名称:">
					<el-col :span="10">
						<el-input v-model="searchMerchant" placeholder="关键字" />
					</el-col>
					<el-col :span="3" :offset=1>
						<el-button type="danger" @click="onSearchMerchant">搜索</el-button>
					</el-col>
				</el-form-item>
			</el-form>

			<el-table v-loading="listLoading" :data="merchantPagingData" border fit highlight-current-row style="width: 100%;">

				<el-table-column min-width="20%" align="center" label="商户号">
					<template slot-scope="scope">
						<span>{{ scope.row.mctName}}</span>
					</template>
				</el-table-column>

				<el-table-column min-width="30%" align="center" label="商户名称">
					<template slot-scope="scope">
						<span>{{ scope.row.brandName }}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="25%" align="center" label="所在地">
					<template slot-scope="scope">
						<span>{{ scope.row.createTime }}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="20%" align="center" label="详细地址">
					<template slot-scope="scope">
						<span>{{ scope.row.address }}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="20%" align="center" label="操作">
					<template slot-scope="scope">
						<el-button type="danger" @click="selectMerchantInformation(scope.row)">选择</el-button>
					</template>
				</el-table-column>

			</el-table>
			<el-pagination class="pagination-border" :total="total" :page-size="pagesize" :current-page="currentPage"
			 :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
			 @current-change="handleCurrentChange" />
		</el-dialog>
	</div>
</template>
<script>
	import {
		getCity,
		commonInterface
	} from '@/api/commonInterface'
	import Cookies from 'js-cookie'
	import glApi from '@/globalAPI'
	import axios from 'axios'
	//import Pagination from '@/components/Pagination'
	export default {
		//components: {
			//Pagination
		//},
		data() {
			return {
				glApi: '',
				requestURL: '/admin/saveTlinxShop',
				addTore: '',
				addToreRules: [],
				dialogSelectMerchantsVisible: false,
				listLoading: true,
				total: 0,
				currentPage: 1, //	初始页
				pagesize: 5, //    每页的数据
				searchMerchant: '',
				merchantPagingData: [],
				traId: '',
				showCityList: 1,
				company: '',
				showCity: {
					province: '',
					city: '',
					county: ''
				},
				location: {
					province: '',
					city: '',
					county: ''
				},
				storeMainInformation: {
					mctName: '',
					mctNo: '',
					shopFullName: '',
					cityid: '',
					tel: '',
					contact: '',
					rjxf: '',
					zpm: '',
					shopName: '',
					address: '',
					openHours: '',
					contactTel: '',
					lng: '',
					lat: '',
					lng2: '',
					lat2: ''
				},
				province: '',
				city: '',
				city2: '',
				county: '',
				county2: '',
				provinceTwo: '',			
				cityTwo: '',
				countyTwo: '',
				imageUrl: '',
				storePic: {
					formDate: '',
					pic1: '',
					pic2: '',
					pic3: '',
					pic4: ''
				},
				storeMainInformationRules: {
					shopFullName: [{
						required: true,
						message: '请填写门店全称',
						trigger: 'blur'
					}],
					cityid: [{
						required: true,
						message: '请选择所在地',
						trigger: 'change'
					}],
					tel: [
						{
							required: true,
							message: '请填写门店电话',
							trigger: 'blur'
						}
					],
					contact: [
						{
							required: true,
							message: '请填写门店负责人',
							trigger: 'blur'
						}
					],
					shopName: [
						{
							required: true,
							message: '请填写门店简称',
							trigger: 'blur'
						}
					],
					address: [
						{
							required: true,
							message: '请填写详细地址',
							trigger: 'blur'
						}
					]					
				},
				storePicRules: {
					pic1: [
						{
							required: true,
							message: '请上传整体门面(含招牌)相片',
							trigger: 'blur'
						}
					],
					pic2: [
						{
							required: true,
							message: '请上传收银台相片',
							trigger: 'blur'
						}
					],
					pic3: [
						{
							required: true,
							message: '请上传店内环境相片',
							trigger: 'blur'
						}
					]
				}
			}
		},
		watch: {
			newValue(val, oldVal) {
				let t = val.substring(0, 2);
				let c1 = [];
				//this.city2 = "";
				this.location.city = "";
				this.storeMainInformation.cityid = "";
				for (var i in this.city) {
					if (this.city[i].id.substring(0, 2) == t && this.city[i].value !== null) {
						c1.push({
							'id': this.city[i].id,
							'value': this.city[i].value
						});
					}
				}
				this.city2 = c1;
			},
			newValueCounty(val2, oldVal2) {
				let g = val2.substring(0, 4);
				let c2 = [];
				for (var i in this.county) {
					if (this.county[i].id.substring(0, 4) == g && this.county[i].value !== null) {
						c2.push({
							'id': this.county[i].id,
							'value': this.county[i].value
						});
					}
				}
				this.county2 = c2;
			},
			newshowprovince2(val, oldVal2){
				if(!!oldVal2){
					let h = val.substring(0, 2);
					let c1 = [];
					this.showCity.city = "";
					this.storeMainInformation.cityid = "";
					for (var i in this.city) {
						if (this.city[i].id.substring(0, 2) == h && this.city[i].value !== null) {
							c1.push({
								'id': this.city[i].id,
								'value': this.city[i].value
							});
						}
					}
					this.cityTwo = c1;
				}				
			},
			newshowCounty2(val2, oldVal2){	
				console.log("===>测试第二遍城市改变");
				console.log(oldVal2)
				if(!!val2){
					let g2 = val2.substring(0, 4);					
					let c3 = [];
					for (var i in this.county) {
						if (this.county[i].id.substring(0, 4) == g2 && this.county[i].value !== null) {
							c3.push({
								'id': this.county[i].id,
								'value': this.county[i].value
							});
						}
					}
					this.countyTwo = c3;
					console.log("countyTwo")
					console.log(this.countyTwo)
				}
			}
		},
		computed: {
			newValue() {
				return this.location.province;
			},
			newValueCounty() {
				return this.location.city;
			},
			newshowprovince2(){
				return this.showCity.province;
			},
			newshowCounty2(){
				return this.showCity.city;
			}
		},
		created() {
			this.glApi = glApi.glApi;		
			//this.glApi = '/api/';	
			
			this.company = this.$route.query.company;
			
			this.addToreRules.push('storeMainInformation','storePic');

			this.storePic.formDate = new FormData();
			var that = this;
			var arr;
			var arr2 = localStorage.getItem('nationalRgions');
			if (!!arr2) {
				let p = [];
				let c = [];
				let y = [];
				arr2 = JSON.parse(arr2);
				for (var item in arr2) {
					if (!!arr2[item].p && arr2[item].c == null && arr2[item].y == null) {
						p.push({
							'value': arr2[item].p,
							'id': arr2[item].id
						});
					}

					if (!!arr2[item].p && arr2[item].y == null) {
						c.push({
							'value': arr2[item].c,
							'id': arr2[item].id
						});
					}

					if (!!arr2[item].p && !!arr2[item].c && !!arr2[item].y) {
						y.push({
							'value': arr2[item].y,
							'id': arr2[item].id
						});
					}

				}
				this.province = p;
				this.city = c;
				this.county = y;
			} else {
				getCity().then(response => {
					let t = response.data.Data;
					t = JSON.stringify(t);
					localStorage.setItem('nationalRgions', t);
				})
			}
			
		},
		methods: {
			handleSizeChange: function(size) {
				this.pagesize = size //	每页下拉显示数据
				this.getTlinxMerchantByPage();
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage //	点击第几页
				this.getTlinxMerchantByPage();
			},
			getTlinxMerchantByPage() {
				//获取已推送银联审核的商户
				commonInterface('/admin/getTlinxMerchantByPage', {
					'pageNo': this.currentPage,
					'pageSize': this.pagesize
				}).then(response => {
					this.total = response.data.Data.TotalPage;
					this.merchantPagingData = response.data.Data.Rows;
					setTimeout(() => {
						this.listLoading = false
					}, 1.5 * 1000)
				})
			},
			visibleMerchant() {
				//选择商户
				this.dialogSelectMerchantsVisible = true;
				this.getTlinxMerchantByPage();
			},
			onSearchMerchant() {
				//输入关键词搜索商户
				if (!!this.searchMerchant) {
					//通过商店名关键字获取已推送银联审核的商户
					commonInterface('/admin/getAllMerchantByName', {
						'name': this.searchMerchant
					}).then(response => {
						this.listLoading = true;
						this.total = response.data.Data.TotalPage;
						this.merchantPagingData = response.data.Data.Rows;
						setTimeout(() => {
							this.listLoading = false
						}, 1.5 * 1000)
					})
				} else {
					this.$message.error('请输入关键词');
					return false;
				}
			},
			showCityListMethods(provice, city, county) {
				let arr3 = localStorage.getItem('nationalRgions');
				if (!!arr3) {
					let p = [];
					let c = [];
					let y = [];
					let p2 = [];
					let c2 = [];
					let y2 = [];
					arr3 = JSON.parse(arr3);
					for (var item in arr3) {
						if (!!arr3[item].p && arr3[item].c == null && arr3[item].y == null) {
							p.push({
								'value': arr3[item].p,
								'id': arr3[item].id
							});
						}

						if (!!arr3[item].p && arr3[item].y == null) {
							c.push({
								'value': arr3[item].c,
								'id': arr3[item].id
							});
						}

						if (!!arr3[item].p && !!arr3[item].c && !!arr3[item].y) {
							y.push({
								'value': arr3[item].y,
								'id': arr3[item].id
							});
						}
					}

					for (var g in p) {
						if (p[g].value == provice && p[g].value !== null) {
							p2.push({
								'value': p[g].value,
								'id': p[g].id
							});
						}
					}
					for (var h in c) {
						if (c[h].id.substring(0, 2) == p2[0].id.substring(0, 2) && c[h].value !== null) {
							c2.push({
								'value': c[h].value,
								'id': c[h].id
							});
						}
					}
					for (var i in y) {
						if (y[i].id.substring(0, 4) == c2[0].id.substring(0, 4) && y[i].value !== null) {
							y2.push({
								'value': y[i].value,
								'id': y[i].id
							});
						}
					}

					//this.provinceTwo = p2;
					this.provinceTwo = p;
					this.cityTwo = c2;
					this.countyTwo = y2;

				}
			},
			selectMerchantInformation(row) {
				//选择商户分页查询中的一个商户	

				commonInterface('/admin/getTlinxMerchantByMerchantId', {
					'merchantId': row.traId
				}).then(response => {
					let city = localStorage.getItem('nationalRgions');
					let t = [];
					city = JSON.parse(city);
					for (var item in city) {
						if (city[item].id == response.data.Data.cityid) {
							t.push(city[item])
						}
					}
					this.showCity.province = t[0].p;
					this.showCity.city = t[0].c;
					this.showCity.county = t[0].y;
					this.storeMainInformation.cityid = t[0].id;
					this.showCityList = 2;
					this.showCityListMethods(t[0].p, t[0].c, t[0].y);

					this.traId = response.data.Data.traId;
					this.storeMainInformation.mctNo = response.data.Data.mctNo;
					this.storeMainInformation.mctName = response.data.Data.mctName;
					this.storeMainInformation.shopFullName = response.data.Data.brandName;
					this.storeMainInformation.shopName = response.data.Data.brandName;
					this.storeMainInformation.zpm = response.data.Data.brandName;
					this.storeMainInformation.contact = response.data.Data.bossName;
					this.storeMainInformation.address = response.data.Data.address;
					this.storeMainInformation.tel = response.data.Data.tel;
					this.storeMainInformation.openHours = response.data.Data.openHours;
					this.dialogSelectMerchantsVisible = false;
				})

			},
			submitForm(formName) {
				this.addTore = {
					'storeMainInformation': this.storeMainInformation,
					'merchantId': this.traId
				}
				
				console.log(formName)
				this.$refs[formName[0]].validate((valid) => {
					this.$refs[formName[1]].validate((valid1) => {
						if (valid && valid1) {
							let t = JSON.stringify(this.addTore)
							t = encodeURI(t)
							this.storePic.formDate.append('storePic', t);
							
							let config = {
								headers: {
									'Content-Type': 'multipart/form-data'
								}
							}
							axios.post(glApi + "/admin/saveTlinxShop", this.storePic.formDate, config).then(res => {
								console.log('上传图片后的文件');
								console.log(res)
							}).catch(res => {
								console.log(res)
							})
						} else {
							return false;
						}
					})
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
			},
			
			onChangePic1(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.storePic.pic1 = file.url;
				this.storePic.formDate.append('pic1', file.raw);
			},
			onChangePic2(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.storePic.pic2 = file.url;
				this.storePic.formDate.append('pic2', file.raw);
			},
			onChangePic3(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.storePic.pic3 = file.url;
				this.storePic.formDate.append('pic3', file.raw);
			},
			onChangePic4(file, fileList) {
				console.log(this.storePic.formDate)
				console.log(file)
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.storePic.pic4 = file.url;
				this.storePic.formDate.append('pic4', file.raw);
			},
			backMerchants(){
				this.$router.push({path:'/'})
			}
		}
	}
</script>
<style>
	.pagination-border {
		border-bottom: 1px solid #ebeef5;
		border-left: 1px solid #ebeef5;
		border-right: 1px solid #ebeef5;
		padding: 40px 40px;
		text-align: right;
	}
</style>
