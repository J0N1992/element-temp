<template>
	<div class="addmerchants-contain">
		<el-container>
			<el-header>商户主体信息<span style="margin-left: 30px;color: #0091EA;">{{company}}</span></el-header>
			<el-container>
				<el-container>
					<el-main>
						<el-form ref="merchantsSubject" :model="merchantsSubject" :rules="rules" label-width="160px" class="demo-ruleForm"
						 style="display: flex;">

							<div style="width: 50%;padding: 0 10% 0 0;">
								<el-form-item label="商户名称" prop="mctName">
									<el-input v-model="merchantsSubject.mctName" placeholder="须同营业执照名称一致" />
								</el-form-item>
								<el-form-item label="所在地" required>
									<el-col :span="6">
										<el-form-item prop="location.province">
											<el-select v-model="merchantsSubject.location.province" placeholder="请选择省份" style="width: 110%;">
												<el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>
										<el-form-item v-if="!!city2" prop="location.city">
											<el-select v-model="merchantsSubject.location.city" placeholder="请选择城市" style="width: 110%;">
												<el-option label="城市" v-for="item in city2" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="location.city" v-else>
											<el-select v-model="merchantsSubject.location.city" placeholder="请选择城市" style="width: 110%;">
												<el-option label="城市" value="1" />
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6" :offset=1>
										<el-form-item v-if="!!county2" prop="location.county">
											<el-select v-model="merchantsSubject.location.county" placeholder="请选择区县" style="width: 110%;">
												<el-option label="区县" v-for="item in county2" :key="item.id" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
										<el-form-item prop="location.county" v-else>
											<el-select v-model="merchantsSubject.location.county" placeholder="请选择区县" style="width: 110%;">
												<el-option label="区县" value="2" />
											</el-select>
										</el-form-item>
									</el-col>
								</el-form-item>
								<el-form-item label="联系电话" prop="tel">
									<el-input v-model="merchantsSubject.tel" />
								</el-form-item>
								<el-form-item label="所属行业" required>
									<el-col :span="6">
										<el-form-item prop="industryInvolved.industryInvolved_classification">
											<el-select v-model="merchantsSubject.industryInvolved.industryInvolved_classification" placeholder="主分类">
												<el-option v-for="(item,index) in classification" :key="index" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6"  v-if="!!reclassify" :offset=1>
										<el-form-item prop="industryInvolved.industryInvolved_reclassify">
											<el-select v-model="merchantsSubject.industryInvolved.industryInvolved_reclassify" placeholder="二级分类">
												<el-option v-for="(item,index) in reclassify" :key="index" :label="item.value" :value="item.id" />
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="6"  v-else :offset=1>
										<el-form-item prop="industryInvolved.industryInvolved_reclassify">
											<el-select v-model="merchantsSubject.industryInvolved.industryInvolved_reclassify" placeholder="二级分类">
												<el-option  label="二级分类" value="0" />
											</el-select>
										</el-form-item>
									</el-col>
								</el-form-item>
								<el-form-item label="营业执照类型" prop="blType">
									<el-select v-model="merchantsSubject.blType" placeholder="请选择营业执照类型">
										<el-option label="三证合一" value="1" />
										<el-option label="非三证合一" value="2" />
									</el-select>
								</el-form-item>
								<el-form-item label="营业执照号" prop="blNo">
									<el-col :span="10">
										<el-input v-model="merchantsSubject.blNo" />
									</el-col>
									<el-col :span="6" :offset=1>
										<el-button type="danger">营业执照核查</el-button>
									</el-col>
								</el-form-item>
								<el-form-item v-if="merchantsSubject.blType == 2" label="组织机构代码证号">
									<el-input v-model="merchantsSubject.occNo" />
								</el-form-item>
								<el-form-item v-if="merchantsSubject.blType == 2" label="税务登记证号">
									<el-input v-model="merchantsSubject.trcNo" />
								</el-form-item>
								<el-form-item label="管护人">
									<el-input v-model="merchantsSubject.managementPeople" />
								</el-form-item>
								<el-form-item label="商户标记">
									<el-input v-model="merchantsSubject.tag" placeholder="可输入商户征信等信息, 支持文字、数字" />
								</el-form-item>
							</div>


							<div>
								<el-form-item label="招牌名" prop="brandName">
									<el-input v-model="merchantsSubject.brandName" />
								</el-form-item>
								<el-form-item label="地址" prop="address">
									<el-input v-model="merchantsSubject.address" placeholder="详细地址，不含省市区县名称" />
								</el-form-item>
								<el-form-item label="营业时间" prop="openHours">
									<el-input v-model="merchantsSubject.openHours" placeholder="多个以小写逗号分开(9:00-12:00,13:00-18:00)" />
								</el-form-item>
								<el-form-item label="商户简介">
									<el-input v-model="merchantsSubject.intro" type="textarea" />
								</el-form-item>
								<el-form-item label="营业执照有效期" required>
									<el-col :span="11">
										<el-form-item prop="blSdate">
											<el-date-picker v-model="merchantsSubject.blSdate" value-format="yyyy-MM-dd" type="date" placeholder="生效时间"
											 style="width: 100%;" />
										</el-form-item>
									</el-col>
									<el-col :span="2" class="line" style="text-align: center;">-</el-col>
									<el-col :span="11">
										<el-form-item prop="blEdate">
											<el-date-picker v-model="merchantsSubject.blEdate" value-format="yyyy-MM-dd" type="date" placeholder="过期时间"
											 style="width: 100%;" />
										</el-form-item>
									</el-col>
								</el-form-item>
								<el-form-item label="客户经理">
									<el-input v-model="merchantsSubject.admName" />
								</el-form-item>
								<el-form-item v-if="merchantsSubject.blType == 2" label="组织机构代码证有效期">
									<el-col :span="11">
										<el-form-item>
											<el-date-picker v-model="merchantsSubject.validityOrganizationCode.occSdate" value-format="yyyy-MM-dd" type="date"
											 placeholder="生效时间" style="width: 100%;" />
										</el-form-item>
									</el-col>
									<el-col :span="2" class="line" style="text-align: center;">-</el-col>
									<el-col :span="11">
										<el-form-item>
											<el-date-picker v-model="merchantsSubject.validityOrganizationCode.occEdate" value-format="yyyy-MM-dd" type="date"
											 placeholder="过期时间" style="width: 100%;" />
										</el-form-item>
									</el-col>
								</el-form-item>
								<el-form-item v-if="merchantsSubject.blType == 2" label="税务登记有效期">
									<el-col :span="11">
										<el-form-item>
											<el-date-picker v-model="merchantsSubject.taxRegistrationCertificate.trcSdate" value-format="yyyy-MM-dd"
											 type="date" placeholder="生效时间" style="width: 100%;" />
										</el-form-item>
									</el-col>
									<el-col :span="2" class="line" style="text-align: center;">-</el-col>
									<el-col :span="11">
										<el-form-item>
											<el-date-picker v-model="merchantsSubject.taxRegistrationCertificate.trcEdate" value-format="yyyy-MM-dd"
											 type="date" placeholder="过期时间" style="width: 100%;" />
										</el-form-item>
									</el-col>
								</el-form-item>
								<el-form-item>
									&nbsp;
								</el-form-item>
								<el-form-item label="外部商户标记">
									<el-input v-model="merchantsSubject.wtag" />
								</el-form-item>
							</div>

						</el-form>
					</el-main>
				</el-container>
			</el-container>
		</el-container>
		<el-container>
			<el-header>法人信息</el-header>
			<el-container>
				<el-container>
					<el-main>
						<el-form ref="legalPersonInformation" :model="legalPersonInformation" :rules="legalPersonInformationRules"
						 label-width="160px" class="demo-ruleForm" style="display: flex;">

							<div style="width: 50%;padding: 0 10% 0 0;">
								<el-form-item label="法人姓名" prop="bossName">
									<el-input v-model="legalPersonInformation.bossName" />
								</el-form-item>
								<el-form-item label="证件国别/地区" prop="bossIdCountry">
									<el-select v-model="legalPersonInformation.bossIdCountry" placeholder="中国">
										<el-option label="中国" value="CHN" />
										<el-option label="香港" value="HKG" />
										<el-option label="澳门" value="MAC" />
										<el-option label="台湾" value="CTN" />
									</el-select>
								</el-form-item>
								<el-form-item label="法人证件号码" prop="bossIdNo">
									<el-col :span="10">
										<el-input v-model="legalPersonInformation.bossIdNo" />
									</el-col>
									<el-col :span="6">
										<el-button type="danger">重号验证</el-button>
									</el-col>
								</el-form-item>
								<el-form-item label="法人联系电话" prop="bossTel">
									<el-input v-model="legalPersonInformation.bossTel" />
								</el-form-item>
								<el-form-item label="法人职业" prop="legalProfessional">
									<el-select v-model="legalPersonInformation.legalProfessional">
										<el-option label="" value="shanghai" />
									</el-select>
								</el-form-item>
							</div>

							<div>
								<el-form-item label="法人性别" prop="bossSex">
									<el-radio-group v-model="legalPersonInformation.bossSex">
										<el-radio label="1">男</el-radio>
										<el-radio label="2">女</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="证件类型" prop="bossIdType">
									<el-select v-model="legalPersonInformation.bossIdType" placeholder="请选择证件类型">
										<el-option label="居民身份证" value="1" />
										<el-option label="临时居民身份证" value="2" />
										<el-option label="居民户口簿" value="3" />
										<el-option label="护照" value="4" />
										<el-option label="港澳居民来往内地通行证" value="5" />
										<el-option label="回乡证" value="6" />
										<el-option label="军人证" value="7" />
										<el-option label="武警身份证" value="8" />
										<el-option label="其他法定文件" value="9" />
									</el-select>
								</el-form-item>
								<el-form-item label="法人证件有效期" required>
									<el-col :span="11">
										<el-form-item prop="bossSdate">
											<el-date-picker v-model="legalPersonInformation.bossSdate" value-format="yyyy-MM-dd" type="date" placeholder="生效时间"
											 style="width: 100%;" />
										</el-form-item>
									</el-col>
									<el-col :span="2" class="line" style="text-align: center;">-</el-col>
									<el-col :span="11">
										<el-form-item prop="bossEdate">
											<el-date-picker v-model="legalPersonInformation.bossEdate" value-format="yyyy-MM-dd" type="date" placeholder="过期时间"
											 style="width: 100%;" />
										</el-form-item>
									</el-col>
								</el-form-item>
								<el-form-item label="法人联系邮箱" prop="bossEmail">
									<el-input v-model="legalPersonInformation.bossEmail" />
								</el-form-item>
								<el-form-item label="法人住址" prop="bossAddress">
									<el-input v-model="legalPersonInformation.bossAddress" />
								</el-form-item>
							</div>

						</el-form>
					</el-main>
				</el-container>
			</el-container>
		</el-container>
		<el-container>
			<el-header>结算账户信息</el-header>
			<el-container>
				<el-container>
					<el-main>
						<el-form ref="settlementAccountInformation" :model="settlementAccountInformation" :rules="settlementAccountInformationRules"
						 label-width="160px" class="demo-ruleForm" style="display: flex;">
							<div style="width: 50%;padding: 0 10% 0 0;">
								<el-form-item label="结算账户类型" prop="accountType">
									<el-radio-group v-model="settlementAccountInformation.accountType">
										<el-radio label="2">对私</el-radio>
										<el-radio label="1">对公</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item v-if="settlementAccountInformation.accountBoss == 2 && settlementAccountInformation.accountType == 2"
								 label="法人亲属证件类型" prop="accountIdType">
									<el-select v-model="settlementAccountInformation.accountIdType" placeholder="请选择证件类型">
										<el-option label="居民身份证" value="1" />
										<el-option label="临时居民身份证" value="2" />
										<el-option label="居民户口簿" value="3" />
										<el-option label="护照" value="4" />
										<el-option label="港澳居民来往内地通行证" value="5" />
										<el-option label="回乡证" value="6" />
										<el-option label="军人证" value="7" />
										<el-option label="武警身份证" value="8" />
										<el-option label="其他法定文件" value="9" />
									</el-select>
								</el-form-item>
								<el-form-item label="开户行" prop="bankName">
									<el-input v-model="settlementAccountInformation.bankName" />
								</el-form-item>
								<el-form-item label="开户名" prop="accountName">
									<el-input v-model="settlementAccountInformation.accountName" />
								</el-form-item>
								<el-form-item label="财务联系人" prop="financialContact">
									<el-input v-model="settlementAccountInformation.financialContact" />
								</el-form-item>
							</div>

							<div>
								<el-form-item v-if="settlementAccountInformation.accountType == 2" label="结算账户人身份" prop="accountBoss" required>
									<el-radio-group v-model="settlementAccountInformation.accountBoss">
										<el-radio label="1">法人</el-radio>
										<el-radio label="2">法人直属亲属</el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item v-if="settlementAccountInformation.accountBoss == 2 && settlementAccountInformation.accountType == 2"
								 label="法人亲属证件号码" prop="accountIdNo">
									<el-input v-model="settlementAccountInformation.accountIdNo" />
								</el-form-item>
								<el-form-item label="清算联行号" prop="bankNo">
									<el-col :span="10">
										<el-input v-model="settlementAccountInformation.bankNo" />
									</el-col>
									<el-col :span="6">
										<el-button type="danger">查找清算联行号</el-button>
									</el-col>
								</el-form-item>
								<el-form-item label="账号" prop="accountNo">
									<el-col :span="18">
										<el-input v-model="settlementAccountInformation.accountNo" />
									</el-col>
									<el-col :span="6">
										<el-button type="danger">重号验证</el-button>
									</el-col>
								</el-form-item>
								<el-form-item label="财务联系电话" prop="financialTel">
									<el-input v-model="settlementAccountInformation.financialTel" />
								</el-form-item>
							</div>
						</el-form>
					</el-main>
				</el-container>
			</el-container>
		</el-container>
		<el-container>
			<el-header>资料上传<span style="margin-left: 30px;font-size: 10px">扫描件需法人签字并加盖公章</span></el-header>
			<el-container>
				<el-container>
					<el-main>
						<el-form ref="dataUpload" :model="dataUpload" :rules="dataUploadRules" label-width="160px" class="demo-ruleForm"
						 style="display: flex;">
							<div style="width: 50%;padding: 0 10% 0 0;">
								<el-form-item label="营业执照图片" prop="blPic" style="padding-bottom: 5%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeBlPic" class="avatar-uploader">
										<img v-if="dataUpload.blPic" :src=" glApi + dataUpload.blPic" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">文件大小不得超过2M</p>
								</el-form-item>
								<el-form-item label="法人身份证(正面)" prop="bossPositive" style="padding-bottom: 5%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeBossPositive"
									 class="avatar-uploader">
										<img v-if="dataUpload.bossPositive" :src=" glApi + dataUpload.bossPositive" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">文件大小不得超过2M</p>
								</el-form-item>
								<el-form-item label="行业许可证图片" prop="licencePic" style="padding-bottom: 5%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeLicencePic"
									 class="avatar-uploader">
										<img v-if="dataUpload.licencePic" :src=" glApi + dataUpload.licencePic" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 20px;">
										文件大小不得超过2M，例如：食品经营许可证、餐饮服务许可证、烟草专卖许可证、文化经营许可证、娱乐场所许可证、医疗机构执业许可证、酒类销售许可证等等证件，创建收单合同验证商户资质时需要。
									</p>
								</el-form-item>
								<el-form-item label="其他资料1" prop="otherPic1" style="padding-bottom: 5%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeOtherPic1"
									 class="avatar-uploader">
										<img v-if="dataUpload.otherPic1" :src=" glApi + dataUpload.otherPic1" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">
										文件大小不得超过2M
									</p>
								</el-form-item>
								<el-form-item label="其他资料3" prop="otherPic3" style="padding-bottom: 5%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeOtherPic3"
									 class="avatar-uploader">
										<img v-if="dataUpload.otherPic3" :src=" glApi + dataUpload.otherPic3" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">
										文件大小不得超过2M
									</p>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="backMerchants" plain>返回商户列表</el-button>
									<el-button :disabled="disabledStores" :loading="saveLoading" type="success" @click="submitForm(addmerchantRules)" plain>{{saveStatus}}</el-button>
									<el-button :disabled="disabledReset" type="warning" @click="resetForm('merchantsSubject')" plain>重置</el-button>
								</el-form-item>
							</div>
							<div>
								<el-form-item label="商户LOGO" prop="logo" style="padding-bottom: 10%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeLogo" class="avatar-uploader">
										<img v-if="dataUpload.logo" :src=" glApi + dataUpload.logo" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">
										文件大小不得超过2M
									</p>
								</el-form-item>
								<el-form-item label="法人身份证(背面)" prop="bossBack" style="padding-bottom: 10%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeBossBack"
									 class="avatar-uploader">
										<img v-if="dataUpload.bossBack" :src=" glApi + dataUpload.bossBack" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">
										文件大小不得超过2M
									</p>
								</el-form-item>
								<el-form-item label="授权文件" prop="licencePic2" style="padding-bottom: 10%;">
									<el-upload :action=" glApi +  requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeLicencePic2"
									 class="avatar-uploader">
										<img v-if="dataUpload.licencePic2" :src=" glApi + dataUpload.licencePic2" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">
										文件大小不得超过2M
									</p>
								</el-form-item>
								<el-form-item label="其他资料2" prop="otherPic2" style="padding-bottom: 10%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeOtherPic2"
									 class="avatar-uploader">
										<img v-if="dataUpload.otherPic2" :src=" glApi + dataUpload.otherPic2" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon" />
									</el-upload>
									<p style="line-height: 10px;">
										文件大小不得超过2M
									</p>
								</el-form-item>
								<el-form-item label="其他资料4" prop="otherPic4" style="padding-bottom: 10%;">
									<el-upload :action=" glApi + requestURL" :auto-upload="false" :show-file-list="false" :on-change="onChangeOtherPic4"
									 class="avatar-uploader">
										<img v-if="dataUpload.otherPic4" :src=" glApi + dataUpload.otherPic4" class="avatar">
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
	</div>
</template>
<script>
	import {
		saveTlinxMerchant,
		commonUploadInterface,
		getCity,
		getMctClass
	} from '@/api/commonInterface'
	import glApi from '@/globalAPI'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	export default {
		data() {
			return {
				glApi: '',
				addmerchantRules: [],
				saveLoading: false,
				disabledStores: false,
				disabledReset:false,
				saveStatus: '保存',
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},				
				company: '',
				imageUrl: true,
				businessInformation: {},
				merchantsSubjectabc: {},
				// 商户主体信息
				merchantsSubject: {
					merchantId: '',
					mctName: '',
					location: {
						province: '',
						city: '',
						county: ''
					},
					tel: '',
					industryInvolved: {
						industryInvolved_classification: '',
						industryInvolved_reclassify: ''
					},
					clsid: [],
					cityid: '',
					blType: '1',
					blNo: '',
					occNo: '',
					trcNo: '',
					managementPeople: '',
					tag: '',
					wtag: '190515512306944327',
					brandName: '',
					address: '',
					openHours: '',
					intro: '',
					blSdate: '',
					blEdate: '',
					admName: '小丁智银测试',
					validityOrganizationCode: {
						occSdate: '',
						occEdate: ''
					},
					taxRegistrationCertificate: {
						trcSdate: '',
						trcEdate: ''
					},
					tag: ''
				},
				// 法人信息
				legalPersonInformation: {
					bossName: '',
					bossIdCountry: 'CHN',
					bossSdate: '',
					bossEdate: '',
					bossIdNo: '',
					bossTel: '',
					legalProfessional: '',
					bossSex: '',
					bossIdType: '1',
					validityLegalPersonCertificate: '',
					bossEmail: '',
					bossAddress: ''
				},
				// 结算账户信息
				settlementAccountInformation: {
					accountType: '2',
					accountIdType: '',
					bankName: '',
					accountName: '',
					financialContact: '',
					accountBoss: '1',
					accountIdNo: '',
					bankNo: '',
					accountNo: '',
					financialTel: ''
				},
				// 资料上传
				dataUpload: {
					formDate: '',
					blPic: '',
					bossPositive: '',
					licencePic: '',
					otherPic1: '',
					otherPic3: '',
					logo: '',
					bossBack: '',
					licencePic2: '',
					otherPic2: '',
					otherPic4: ''
				},
				requestURL: '/admin/saveTlinxMerchant',
				getTlinxMerchantByMerchantId: '/admin/getTlinxMerchantByMerchantId',
				formPic: '',
				param: new FormData(),
				fileList: [],
				imageUrl: '',
				dialogImageUrl: '',
				dialogVisible: false,
				province: '',
				city: '',
				city2: '',
				county: '',
				county2: '',
				// 主分类
				classification: [],
				// 二级分类
				reclassify: [],
				// 分类列表
				mctClass: [],
				rules: {
					mctName: [{
						required: true,
						message: '请填写商户名称',
						trigger: 'blur'
					}],
					location: {
						province: [{
							required: true,
							message: '请选择省份',
							trigger: 'change'
						}],
						city: [{
							required: true,
							message: '请选择城市',
							trigger: 'change'
						}],
						county: [{
							required: true,
							message: '请选择区县',
							trigger: 'change'
						}]
					},
					tel: [{
						required: true,
						message: '请填写联系电话',
						trigger: 'blur'
					}],
					industryInvolved: {
						industryInvolved_classification: [{
							required: true,
							message: '请选择所属行业主分类',
							trigger: 'change'
						}],
						industryInvolved_reclassify: [{
							required: true,
							message: '请选择所属行业二级分类',
							trigger: 'change'
						}]
					},
					blType: [{
						required: true,
						message: '请选择营业执照类型',
						trigger: 'change'
					}],
					blNo: [{
						required: true,
						message: '请填写营业执照号',
						trigger: 'blur'
					}],
					brandName: [{
						required: true,
						message: '请填写招牌名',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请填写地址',
						trigger: 'blur'
					}],
					openHours: [{
						required: true,
						message: '请填写营业时间',
						trigger: 'blur'
					}],
					blSdate: [{
						required: true,
						message: '请选择营业执照生效时间',
						trigger: 'change'
					}],
					blEdate: [{
						required: true,
						message: '请选择营业执照过期时间',
						trigger: 'change'
					}]
				},
				legalPersonInformationRules: {
					bossName: [{
						required: true,
						message: '请填写法人姓名',
						trigger: 'blur'
					}],
					bossIdCountry: [{
						required: true,
						message: '请选择证件国别/地区',
						trigger: 'change'
					}],
					bossIdNo: [{
						required: true,
						message: '请填写法人证件号码',
						trigger: 'blur'
					}],
					bossTel: [{
						required: true,
						message: '请填写法人联系电话',
						trigger: 'blur'
					}],
					bossSex: [{
						required: true,
						message: '请选择法人性别',
						trigger: 'change'
					}],
					bossIdType: [{
						required: true,
						message: '请选择证件类型',
						trigger: 'change'
					}],
					bossSdate: [{
						required: true,
						message: '请选择法人证件生效时间',
						trigger: 'change'
					}],
					bossEdate: [{
						required: true,
						message: '请选择法人证件过期时间',
						trigger: 'change'
					}]
				},
				settlementAccountInformationRules: {
					accountType: [{
						required: true,
						message: '请选择结算账户类型',
						trigger: 'change'
					}],
					accountIdType: [{
						required: true,
						message: '请选择证件类型',
						trigger: 'change'
					}],
					bankName: [{
						required: true,
						message: '请填写开户行',
						trigger: 'blur'
					}],
					accountName: [{
						required: true,
						message: '请填写开户名',
						trigger: 'blur'
					}],
					accountBoss: [{
						required: true,
						message: '请选择结算账户人身份',
						trigger: 'change'
					}],
					accountIdNo: [{
						required: true,
						message: '请填写法人亲属证件号码',
						trigger: 'blur'
					}],
					bankNo: [{
						required: true,
						message: '请填写清算联行号/开户行行号',
						trigger: 'blur'
					}],
					accountNo: [{
						required: true,
						message: '请填写银行卡号',
						trigger: 'blur'
					}]
				},
				dataUploadRules: {
					blPic: [{
						required: true,
						message: '请上传营业执照图片',
						trigger: 'blur'
					}],
					bossPositive: [{
						required: true,
						message: '请上传法人身份证（正面）',
						trigger: 'blur'
					}],
					bossBack: [{
						required: true,
						message: '请上传法人身份证（背面）',
						trigger: 'blur'
					}]
				}
			}
		},
		watch: {
			newValue(val, oldVal) {
				let t = val.substring(0, 2);
				let c1 = [];
				if(!!oldVal){
					this.merchantsSubject.location.city = "";
					this.merchantsSubject.location.county = "";
				}
				for (var i in this.city) {
					if (this.city[i].id.substring(0, 2) == t && this.city[i].value !== null) {
						c1.push({
							'id': this.city[i].id,
							'value': this.city[i].value
						});
					}
				}
				if(!!oldVal){
					this.city2 = c1;
				}			
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
				if (c2.length !== 0) {
					this.county2 = c2;
				}
				if(!!oldVal2){
					this.merchantsSubject.location.county = "";
				}

			},
			
			newValueClassification(val, oldVal){	
				let t =  this.mctClass;
				let c = [];
				if(!!oldVal){
					this.merchantsSubject.industryInvolved.industryInvolved_reclassify = "";
				}
				for (var i in t) {
					if(t[i].c == val){
						c.push({id:t[i].a,value:t[i].b})
					}
				}
				this.reclassify = c;
			}
		},
		computed: {
			newValue() {
				//计算省份
				return this.merchantsSubject.location.province;
			},
			newValueCounty() {
				//计算城市
				return this.merchantsSubject.location.city;
			},
			newValueClassification(){
				//计算主分类
				return this.merchantsSubject.industryInvolved.industryInvolved_classification;
			}
		},
		created() {			
			this.glApi = glApi.glApi;		
			//this.glApi = '/api/';		
						
			this.merchantsSubject.merchantId = this.$route.query.id;
			this.company = this.$route.query.company;

			this.addmerchantRules.push('merchantsSubject', 'legalPersonInformation', 'settlementAccountInformation',
				'dataUpload');

			this.dataUpload.formDate = new FormData();
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
			
			this.getMctClassMethod();
			
			/**
			 * null 未进件
			 * 0	已存储我方数据库
			 * 1	已提交审核
			 * 2	审核通过
			 * 3	审核失败，审核不通过
			 */
			
			if(this.$route.query.status == "0"){
				this.getTlinxMerchantByMerchantIdMethod();
				this.disabledStores = true,
				this.disabledReset = true,
				this.saveStatus = "保存成功";
			}
			if(this.$route.query.status == "1"){
				this.getTlinxMerchantByMerchantIdMethod();
				this.disabledStores = true,
				this.disabledReset = true,
				this.saveStatus = "已提交审核";
			}
			if(this.$route.query.status == "2"){
				this.getTlinxMerchantByMerchantIdMethod();
				this.disabledStores = true,
				this.disabledReset = true,
				this.saveStatus = "审核通过";
			}
			if(this.$route.query.status == "3"){
				this.getTlinxMerchantByMerchantIdMethod();
				this.disabledStores = true,
				this.disabledReset = true,
				this.saveStatus = "审核失败";
			}
			
		},


		methods: {
			getMctClassMethod(){
				getMctClass().then(response => {
					this.mctClass = response.data.Data;
					let t = response.data.Data;
					for(var i in t){
						if(t[i].c == "0"){
							this.classification.push({id:t[i].a,value:t[i].b})
						}
					}
				})
			},
			fun() {
				console.log('------------------------')
				console.log(this.fileList)
			},
			submitForm(formName) {
				// 添加行业分类编号列表				
				this.merchantsSubject.cityid = this.merchantsSubject.location.county;
				this.merchantsSubject.clsid.push(
					this.merchantsSubject.industryInvolved.industryInvolved_classification,
					this.merchantsSubject.industryInvolved.industryInvolved_reclassify
				)
				this.businessInformation = {
					'merchantsSubject': this.merchantsSubject,
					'legalPersonInformation': this.legalPersonInformation,
					'settlementAccountInformation': this.settlementAccountInformation
				}

				this.$refs[formName[0]].validate((valid) => {
					this.$refs[formName[1]].validate((valid1) => {
						this.$refs[formName[2]].validate((valid2) => {
							this.$refs[formName[3]].validate((valid3) => {
								if (valid && valid1 && valid2 && valid3) {
									this.saveLoading = true;
									let t = JSON.stringify(this.businessInformation)
									t = encodeURI(t)
									this.dataUpload.formDate.append('merchantJson', t);

									let config = {
										headers: {
											'Content-Type': 'multipart/form-data'
										}
									}
									axios.post(this.glApi + "/admin/saveTlinxMerchant", this.dataUpload.formDate, config).then(
										res => {
											console.log('上传商户信息');
											console.log(res)
											if (res.data.Code == "0") {
												this.$message({
													showClose: true,
													message: '提交成功'
												});
												this.saveLoading = false;
											} else {
												this.$message.error(res.data.Msg);
												this.saveLoading = false;
												return false;
											}
										}).catch(res => {
											console.log(res)
									})
								} else {
									return false
								}
							})
						})
					})
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields()
			},
			onChangeBlPic(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.blPic = file.url;
				this.dataUpload.formDate.append('blPic', file.raw);
				console.log('第一张图片');
				console.log(file);
			},
			onChangeLogo(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.logo = file.url;
				this.dataUpload.formDate.append('logo', file.raw);
			},
			onChangeBossPositive(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.bossPositive = file.url;
				this.dataUpload.formDate.append('bossPositive', file.raw);
			},
			onChangeBossBack(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.bossBack = file.url;
				this.dataUpload.formDate.append('bossBack', file.raw);
			},
			onChangeLicencePic(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.licencePic = file.url;
				this.dataUpload.formDate.append('licencePic', file.raw);
			},
			onChangeLicencePic2(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.licencePic2 = file.url;
				this.dataUpload.formDate.append('licencePic2', file.raw);
			},
			onChangeOtherPic1(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.otherPic1 = file.url;
				this.dataUpload.formDate.append('otherPic1', file.raw);
			},
			onChangeOtherPic2(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.otherPic2 = file.url;
				this.dataUpload.formDate.append('otherPic2', file.raw);
			},
			onChangeOtherPic3(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.otherPic3 = file.url;
				this.dataUpload.formDate.append('otherPic3', file.raw);
			},
			onChangeOtherPic4(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传文件大小不得超过 2M');
					return false;
				}
				this.dataUpload.otherPic4 = file.url;
				this.dataUpload.formDate.append('otherPic4', file.raw);
			},
			saveStores() {
				this.$router.push({path:'/addTore',query:{ id: this.$route.query.id, company: this.$route.query.company}})
			},
			backMerchants(){
				this.$router.push({path:'/'})
			},
			getTlinxMerchantByMerchantIdMethod(){
				commonUploadInterface(this.getTlinxMerchantByMerchantId,{'merchantId':this.$route.query.id}).then(response => {
					console.log(response)
					if(response.data.Code == "0"){
						
						let a = response.data.Data.clsid.substr(0,3);
						let c = response.data.Data.clsid.substr(4,6);
						let g = this.mctClass;	
						let classification = [];
						let	reclassifyName = [];
						let t = response.data.Data;
						let reclassifyList = [];
						
						let cityid = t.cityid;
						let province = [];
						let city = [];
						let city2 = [];
						let county = [];
						let county2 = [];
						
						for (var i in g) {
							if(g[i].a == a ){
								classification.push({"id":g[i].a,"value":g[i].b})
							}
							if(g[i].a == c){
								reclassifyName.push({"id":g[i].a,"value":g[i].b})
							}
							if(g[i].c == a){
								reclassifyList.push({"id":g[i].a,"value":g[i].b})
							}
						}	
						this.reclassify = reclassifyList;
											
						for (var i in this.province) {
							if (this.province[i].id.substring(0, 2) == cityid.substring(0, 2) && this.province[i].value !== null) {
								province.push({
									'id': this.province[i].id,
									'value': this.province[i].value
								});
							}
						}
														  
						for (var i in this.city) {
							if (this.city[i].id.substring(0, 2) == cityid.substring(0, 2) && this.city[i].value !== null) {
								city2.push({
									'id': this.city[i].id,
									'value': this.city[i].value
								});
							}
						}	
						
						this.city2 = city2;
						console.log("this.city2")
						console.log(this.city2)
						
						for (var i in this.city) {
							if (this.city[i].id.substring(0, 3) == cityid.substring(0, 3) && this.city[i].value !== null) {
								city.push({
									'id': this.city[i].id,
									'value': this.city[i].value
								});
							}
						}	
							  
						for (var i in this.county) {
							if (this.county[i].id.substring(0, 4) == cityid.substring(0, 4) && this.county[i].value !== null) {
								county2.push({
									'id': this.county[i].id,
									'value': this.county[i].value
								});
							}
						}
						
						this.county2 = county2;
												  
						for (var i in this.county) {
							if (this.county[i].id == cityid && this.county[i].value !== null) {
								county.push({
									'id': this.county[i].id,
									'value': this.county[i].value
								});
							}
						}		  
												
						t.location = {
							province: province[0].value,
							city: city[0].value,
							county: county[0].value
						}
						t.industryInvolved = {
							industryInvolved_classification: classification[0].value,
							industryInvolved_reclassify: reclassifyName[0].value
						}
						
						t.validityOrganizationCode = {
							occSdate: response.data.Data.occSdate,
							occEdate: response.data.Data.occEdate
						}
						t.taxRegistrationCertificate = {
							trcSdate: response.data.Data.occSdate,
							trcEdate: response.data.Data.trcEdate
						}
						this.merchantsSubject = response.data.Data;
						this.legalPersonInformation = response.data.Data;
						this.settlementAccountInformation = response.data.Data;
						this.dataUpload = response.data.Data;
					}else{
						this.$message.error(response.data.Msg);
					}
				})
			}

		}
	}
</script>
<style>
	.addmerchants-contain {
		padding: 20px;
	}

	.el-header {
		color: #333;
		text-align: left;
		line-height: 60px;
		position: relative;
	}

	.el-header::after {
		content: '';
		position: absolute;
		height: 1px;
		background-color: #E0E0E0;
		z-index: 3;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.el-main:nth-child(-n + 3) {
		/*
		width: 50%;
		*/
		width: 100%;
	}

	.el-main {
		/*background-color: #E9EEF3;*/
		color: #333;
		line-height: 160px;
		padding: 40px 7%;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
