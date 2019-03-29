<template>
	<div>
		<el-container>
			<el-header>门店信息<span style="margin-left: 30px;color: #0091EA;">{{company}}</span></el-header>
			<el-main>
				<el-form ref="pylInto" :model="pylInto" :rules="pylIntoRules" label-width="200px" class="demo-ruleForm" style="display: flex;flex-direction: column;">
					<div style="display: flex;">
						<el-form-item label="法定代表人(正面)" prop="bossPositivePic" style="padding-bottom: 5%;">
							<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeBossPositivePic"
							 class="avatar-uploader">
								<img v-if="pylInto.bossPositivePic && imageUrl == 1" :src=" glApi + pylInto.bossPositivePic" class="avatar">
								<img v-else-if="pylInto.bossPositivePic && imageUrl == 0"  :src="pylInto.bossPositivePic" class="avatar" />
								<i v-else class="el-icon-plus avatar-uploader-icon" />
							</el-upload>
							<p style="line-height: 10px;">
								文件大小不得超过2M
							</p>
						</el-form-item>
						<el-form-item label="法定代表人(反面)" prop="bossBackPic" style="padding-bottom: 5%;">
							<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeBossBackPic"
							 class="avatar-uploader">
								<img v-if="pylInto.bossBackPic && imageUrl == 1" :src=" glApi + pylInto.bossBackPic" class="avatar">
								<img v-else-if="pylInto.bossBackPic && imageUrl == 0" :src="pylInto.bossBackPic" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon" />
							</el-upload>
							<p style="line-height: 10px;">
								文件大小不得超过2M
							</p>
						</el-form-item>							
					</div>
					
					<div style="display: flex;">					
						<el-form-item label="营业执照副本复印件" prop="blPic" style="padding-bottom: 5%;">
							<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeBlPic" class="avatar-uploader">
								<img v-if="pylInto.blPic && imageUrl == 1" :src=" glApi + pylInto.blPic" class="avatar">
								<img v-else-if="pylInto.blPic && imageUrl == 0" :src="pylInto.blPic" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon" />
							</el-upload>
							<p style="line-height: 10px;">
								文件大小不得超过2M
							</p>
						</el-form-item>						
					</div>

					<div style="display: flex;">
						
						<el-form-item label="开户许可证(二选一)" prop="bankAccountPic" style="padding-bottom: 5%;">
							<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeBankAccountPic"
							 class="avatar-uploader">
								<img v-if="pylInto.bankAccountPic && imageUrl == 1" :src=" glApi + pylInto.bankAccountPic" class="avatar">
								<img v-else-if="pylInto.bankAccountPic && imageUrl == 0" :src="pylInto.bankAccountPic" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon" />
							</el-upload>
							<p style="line-height: 10px;">
								文件大小不得超过2M
							</p>
						</el-form-item>
						<el-form-item label="银行账户复印件(二选一)" prop="bdPic" style="padding-bottom: 5%;">
							<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeBdPic" class="avatar-uploader">
								<img v-if="pylInto.bdPic && imageUrl == 1" :src=" glApi + pylInto.bdPic" class="avatar">
								<img v-else-if="pylInto.bdPic && imageUrl == 0" :src="pylInto.bdPic" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon" />
							</el-upload>
							<p style="line-height: 10px;">
								文件大小不得超过2M
							</p>
						</el-form-item>
						
					</div>

					<div style="display: flex;">						
						<el-form-item label="门店门头相片" prop="shopPic0" style="padding-bottom: 5%;">
							<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeShopPic0" class="avatar-uploader">
								<img v-if="pylInto.shopPic0 && imageUrl == 1" :src=" glApi + pylInto.shopPic0" class="avatar">
								<img v-else-if="pylInto.shopPic0 && imageUrl == 0" :src="pylInto.shopPic0" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon" />
							</el-upload>
							<p style="line-height: 10px;">
								文件大小不得超过2M
							</p>
						</el-form-item>
						<el-form-item label="办公场景相片" prop="shopPic1" style="padding-bottom: 5%;">
							<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeShopPic1" class="avatar-uploader">
								<img v-if="pylInto.shopPic1 && imageUrl == 1" :src=" glApi + pylInto.shopPic1" class="avatar">
								<img v-else-if="pylInto.shopPic1 && imageUrl == 0" :src="pylInto.shopPic1" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon" />
							</el-upload>
							<p style="line-height: 10px;">
								文件大小不得超过2M
							</p>
						</el-form-item>					
					</div>
					
					<div style="display: flex;">
						<el-form-item style="display: flex;justify-content: center;align-items: center;">
							<el-button type="primary" @click="backMerchants" plain>返回商户列表</el-button>
							<el-button :disabled="statusDisabled" type="success" @click="submitForm('pylInto')" plain>{{saveStatus}}</el-button>
						</el-form-item>
					</div>

				</el-form>
			</el-main>
		</el-container>
	</div>
</template>
<script>
	import {
		commonUploadInterface
	} from '@/api/commonInterface'
	import  glApi  from '@/globalAPI'
	import axios from 'axios'
	export default {
		data() {
			return {
				glApi: '',
				merchantId: '',
				imageUrl: 0,
				company: '',
				statusDisabled: false,
				saveStatus: "保存",
				requestURL: '/admin/saveYplMerchant',
				pylInto: {
					formDate: '',
					bossPositivePic: '',
					bossBackPic: '',
					blPic: '',
					bdPic: '',
					bankAccountPic: '',
					shopPic0: '',
					shopPic1: ''
				},
				pylIntoRules: {
					bossPositivePic: [
						{ required: true, message: '请选择法定代表人(正面)相片', trigger: 'change' }
					],
					bossBackPic: [
						{ required: true, message: '请选择法定代表人(反面)相片', trigger: 'change' }
					],
					blPic: [
						{ required: true, message: '请选择营业执照副本复印件相片', trigger: 'change' }
					],
					shopPic0: [
						{ required: true, message: '请选择门店门头相片', trigger: 'change' }
					]
				}
			}
		},
		created() {
			this.glApi = glApi.glApi;
			//this.glApi = '/api';
			console.log(this.imageUrl)
			
			this.pylInto.formDate = new FormData();
			this.merchantId = this.$route.query.id;
			this.company = this.$route.query.company;
			/**
			 * null 未进件
			 * 0	已存储我方数据库
			 * 1	已提交审核
			 * 2	审核通过
			 * 3	审核失败，审核不通过
			 */
			if(this.$route.query.status == "0"){
				this.getYplMerchantInfoMethod();
				this.statusDisabled = true;
				this.saveStatus = "保存成功";
			}
			if(this.$route.query.status == "1"){
				this.getYplMerchantInfoMethod();
				this.statusDisabled = true;
				this.saveStatus = "已提交审核";
			}
			if(this.$route.query.status == "2"){
				this.getYplMerchantInfoMethod();
				this.statusDisabled = true;
				this.saveStatus = "审核通过";
			}
			if(this.$route.query.status == "3"){
				this.getYplMerchantInfoMethod();
				this.statusDisabled =  true;
				this.saveStatus = "审核失败";
			}
		},
		methods: {
			submitForm(formName) {
				this.pylInto.formDate.append('merchantId',this.merchantId);								
				this.$refs[formName].validate((valid) => {
				  if (valid) {
				    let config = {
				    		 headers: {
				    				 'Content-Type': 'multipart/form-data'
				    		 }
				     }
				     axios.post(this.glApi + "/admin/saveYplMerchant", this.pylInto.formDate,config).then( res => {
							if(res.data.Code == "0"){
								this.$message({
								  message: '提交成功',
								  type: 'success'
								});				
								var that = this;
								setTimeout(function(){
									that.$router.push({path:'/'})
								},1000)		
							}else{
								this.$message({
								  message: res.data.Msg,
								  type: 'warning'
								});
							}
				     }).catch( res => {
				    		 //console.log(res)
				     })
				  } else {
				    return false;
				  }
				})
			},  
			onChangeBossPositivePic(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.pylInto.bossPositivePic = file.url;
				this.pylInto.formDate.append('bossPositivePic', file.raw);
			},
			onChangeBossBackPic(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.pylInto.bossBackPic = file.url;
				this.pylInto.formDate.append('bossBackPic', file.raw);
			},
			onChangeBlPic(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.pylInto.blPic = file.url;
				this.pylInto.formDate.append('blPic', file.raw);
			},
			onChangeBdPic(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.pylInto.bdPic = file.url;
				this.pylInto.formDate.append('bdPic', file.raw);
			},
			onChangeBankAccountPic(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.pylInto.bankAccountPic = file.url;
				this.pylInto.formDate.append('bankAccountPic', file.raw);
			},
			onChangeShopPic0(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.pylInto.shopPic0 = file.url;
				this.pylInto.formDate.append('shopPic0', file.raw);
			},
			onChangeShopPic1(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.pylInto.shopPic1 = file.url;
				this.pylInto.formDate.append('shopPic1', file.raw);
			},
			backMerchants(){
				this.$router.push({path:'/'})
			},
			getYplMerchantInfoMethod(){
				commonUploadInterface('/admin/getYplMerchantInfo',{'merchantId':this.merchantId}).then(response => {
					if(response.data.Code == "0"){
						this.pylInto = response.data.Data;
						this.imageUrl = 1;
					}else{
						this.$message.error(response.data.Msg);
					}
				})
			}
		}
	}
</script>
