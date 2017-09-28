<!--项目列表-->
<template>
	<section>
		<el-col :span="24" class="content-wrapper">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</el-col>
		<div v-show="$route.name=='项目列表'">
			<!--工具条-->
			<el-col :span="24" class="toolbar pr">
				<el-form :inline="true" :model="filters">
					<el-form-item>
						<el-input title="模糊查询至少3个字符" @keyup.enter.native="getUsers"  class="search-input" v-model="filters.fuzzy_searche_key" placeholder="可搜索字段:项目编号、项目名称、基站类型、地址"></el-input>
					</el-form-item>
					<el-form-item class="search">
						<el-button type="primary" @click="getUsers">查询</el-button>
					</el-form-item>
					<el-alert class="pa" style="top:10px;left:500px;width:200px;color:#aa0004" :class="{disNone:searchTips}"
							  title="请输入至少3个字符"
							  type="warning"
							  show-icon>
					</el-alert>
				</el-form>
			</el-col>
			<!--列表580-->
			<el-table max-height="" @row-dblclick="detail" :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
				<!--<el-table-column type="selection">
                </el-table-column>-->
				<el-table-column label="项目编号" width="180">
					<template scope="scope">
						<div slot="reference" class="name-wrapper" @click="detail(scope.row)">
							<a href="javascript:void(0)">{{ scope.row.proj_code }}</a>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="proj_name" label="项目名称" min-width="150">
				</el-table-column>

				<el-table-column prop="proj_station_type" label="基站类型" >
				</el-table-column>
				<el-table-column prop="proj_base_type" label="基础类型" :formatter="baseType" >
				</el-table-column>
				<el-table-column prop="proj_link_name_ls" label="最近提交环节" :formatter="currentSubmitLink">
				</el-table-column>
				<el-table-column prop="proj_submit_time" label="最近提交时间" :formatter="currentSubmitTime">
				</el-table-column>
				<el-table-column prop="proj_addr" label="地址" width="350">
				</el-table-column>
				<!--<el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="primary" >详情</el-button>
                        &lt;!&ndash;<el-button size="small" @click="handleEdit(scope.proj_code, scope.row)">审批</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>&ndash;&gt;
                    </template>
                </el-table-column>-->

			</el-table>
			<!--底部工具条-->
			<el-col :span="24" class="toolbar toolbar-bottom  ">
				<el-pagination class="toolbar-pagination " layout="prev, pager, next,total,sizes" @size-change="handleSizeChange" :page-size="pageSize" @current-change="handleCurrentChange" :total="total"  :page-sizes="[10, 20, 50]" style="float:right;">
				</el-pagination>
			</el-col>
		</div>



	</section>
</template>

<script>
	import util from '../../common/js/util'
	import {statusFilter,dealWithTime,dealWithEmptyString} from '../../common/js/tableFilter'
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
                searchTips:true,
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 0,
                pageSize:10,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
            baseType(row){
                return dealWithEmptyString(row.proj_base_type);
			},
			currentSubmitTime(row){//最近提交时间
				return dealWithTime(row.proj_submit_time,'yyyy-MM-dd HH:mm:ss');
			},
			currentSubmitLink(row){//最近提交环节,处理返回为空时,显示为-
				return dealWithEmptyString(row.proj_link_name_ls);
			},
            linkStatus(row){
                return statusFilter(row.proj_status);
            },
		    detail(obj){
                this.$router.push({ name: '项目详情', params: { obj: obj }});
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
            handleSizeChange(val) {
                this.pageSize = val;
                this.getUsers();
            },
			//获取用户列表
			getUsers() {
				let self = this,
					para = this.filters;
                self.listLoading = true;
                if(para.fuzzy_searche_key && para.fuzzy_searche_key.length<3){
                    self.searchTips=false;
                    self.listLoading = false;
                    setTimeout(function(){self.searchTips=true;},1500)
                    return;
                }
				/*//NProgress.start();
				getUserListPage({limit:10,offset:0}).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});*/
                self.$axios('projectList_get',Object.assign({offset:(self.page-1)*10,limit:this.pageSize},para)).then(data => {
                    self.listLoading = false;
					if(data.error===0){
                        self.total = data.other.total;
                        self.users =  Array.isArray(data.result) ? data.result:[];
					} else {
                        self.$message({
                            message: data.result,
                            type: 'error'
                        });
					}

				});
                return false;
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
                    this.$axios('User_Delete',para).then(data => {
                        this.listLoading = false;
                        if(data.error === 0){
                            this.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            this.getUsers();
						}
                    });
					/*removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});*/
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
        mounted() {
			this.getUsers();
            $('form').submit(function(){
                return false;
            });
		}
	}
</script>

<style scoped>
.search-input{/*搜索框*/
    width: 380px;
}
/*高度百分比 container,.main,.grid-content section,.content-wrapper,.wrap-el-table*/
html, body, #app{
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-table,section {
  max-height: 85%;
}

/*底部工具条*/
.toolbar-bottom{
        position: fixed;
        bottom: 5px; 
        height: 50px;
        background-color: transparent;
}
/*底部d分页*/
.toolbar-pagination{
    position: absolute;
    right:50%;
}
</style>