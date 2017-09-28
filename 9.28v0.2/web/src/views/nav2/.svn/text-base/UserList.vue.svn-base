<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.user_name" getUsers placeholder="搜索"></el-input>
				</el-form-item>
				<input type="hidden" v-model="page">
				<el-form-item>
					<el-button :disabled="true" type="primary" v-on:click="getUsers('search')">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column label="用户名称">
				<template scope="scope">
					<div slot="reference" class="name-wrapper" @click="handleEdit(scope.row)">
						<a href="javascript:void(0)">{{ scope.row.user_name }}</a>
					</div>
				</template>
			</el-table-column>
			<!-- <el-table-column type="index" width="50">
			</el-table-column> -->
			<el-table-column prop="user_number" label="人事编号" >
			</el-table-column>
			<el-table-column prop="user_company" label="公司" :formatter="baseType1">
			</el-table-column>
			<el-table-column prop="user_bu_name" label="部门" >
			</el-table-column>
			<el-table-column prop="user_job" label="职位" :formatter="baseType2">
			</el-table-column>
			<el-table-column prop="user_phone" label="电话" :formatter="baseType3">
			</el-table-column>
			<el-table-column prop="user_mail" label="邮箱" :formatter="baseType4">
			</el-table-column>
		</el-table>
		<!--底部工具条-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-button type="info" @click="batchRemove" >增加</el-button>-->
            <el-pagination layout="total,sizes,prev, pager, next" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50]"  @size-change="handleSizeChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :inline="true" :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item v-if="role<=0" label="user_entry_time" prop="">
					<el-input v-model="editForm.user_entry_time" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=0" label="user_role" prop="">
					<el-input v-model="editForm.user_role" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=3 && user_id === editForm.user_id" label="user_mail" prop="">
					<el-input v-model="editForm.user_mail" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=2" label="人事编号" prop="">
					<el-input v-model="editForm.user_number" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=0" label="user_name" prop="">
					<el-input v-model="editForm.user_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=0" label="user_bu_name" prop="">
					<el-input v-model="editForm.user_bu_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=0" label="user_company" prop="">
					<el-input v-model="editForm.user_company" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=0" label="user_company_code" prop="">
					<el-input v-model="editForm.user_company_code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=0" label="user_id" prop="">
					<el-input v-model="editForm.user_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=2" label="部门编码" prop="">
					<el-input v-model="editForm.user_bu_code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=0" label="user_code" prop="">
					<el-input v-model="editForm.user_code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=3 && user_id === editForm.user_id" label="user_phone" prop="">
					<el-input v-model="editForm.user_phone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="role<=0" label="user_job" prop="">
					<el-input v-model="editForm.user_job" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="区域">
					<el-select v-model="editForm.user_company_code" @change="selected(editForm.user_company_code)" placeholder="请选择部门">
						<el-option
								v-for="item in parts"
								:key="item.o_parent_name"
								:label="item.o_parent_name"
								:value="item.o_parent_code">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="事业部" v-if="editForm.user_company_code">
					<el-select v-model="editForm.user_bu_code" placeholder="请选择部门">
						<el-option
								v-for="item in departments"
								:key="item.o_name"
								:label="item.o_name"
								:value="item.o_code">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--新增界面-->
		<!--<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>-->
	</section>
</template>

<script>
    import util from '../../common/js/util'
    import {checkRepeat} from '../../common/js/checkRepeat'
    import {statusFilter,dealWithTime,dealWithEmptyString} from '../../common/js/tableFilter'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
    export default {
        data() {
            return {
                oldData:{},
                parts:[],
                departments:[],
                role:'',
                filters: {},
                user_id:'',
                users: [],
                total: 0,
                page: 1,
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
            baseType1(row){
                return dealWithEmptyString(row.user_company);
            },
            baseType2(row){
				return dealWithEmptyString(row.user_job);
            },
            baseType3(row){
				return dealWithEmptyString(row.user_phone);
            },
            baseType4(row){
				return dealWithEmptyString(row.user_mail);
            },
            selected(p_code){
                let arr = this.parts;
                for(let value of arr){
                    if(value.o_parent_code == p_code){
                        this.departments = value.children;
                    }
				}
			},
            selsChange: function (sels) {
                this.sels = sels;
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
            getUsers(str) {
                let self = this,
                    para = Object.assign({},this.filters);
                self.listLoading = true;
                /*//NProgress.start();
                getUserListPage({limit:10,offset:0}).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });*/
				let intData = ['user_role','user_id'];
				for(let value of intData){
				    if(value in para){
				        para[value] ? para[value] = Number.parseInt(para[value]): delete para[value];
					}
				}
                self.$axios('userList_get',Object.assign({offset:(self.page-1)*10,limit:this.pageSize},para)).then(data => {
                    self.listLoading = false;
                    if(data.error===0){
                        self.total = data.other.total;
                        self.users = data.result;
                    } else {
						self.$message({
							message:data.result,
							type:'error'
						})
                    }

                });
                str!='search' && self.$axios('organizationList_get',{offset:0,limit:9999}).then(data => {
                     if(data.error===0){
                         let arr = data.result,
							 keys = [],
							 parts = [];
                         for(let obj of arr){
                             let o_parent_code = obj.o_parent_code,
                                 o_parent_name = obj.o_parent_name,
                                 o_code = obj.o_code,
                                 o_name = obj.o_name,
								 index = keys.indexOf(o_parent_code);
                             if(index===-1){
                                 keys.push(o_parent_code);
                                 parts.push({o_parent_code,o_parent_name,children:[{o_code,o_name}]})
							 } else {
                                 parts[index].children.push({o_code,o_name});
							 }
						 }
						 self.parts = parts;

					 } else {
                         self.$message({
                             message:data.result,
                             type:'error'
                         })
					 }
                });
            },
            //显示编辑界面
            handleEdit: function (obj) {
                this.$router.push({ name: '用户详情', params: { obj: obj }});
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let _obj = Object.assign({}, this.editForm),
								para = checkRepeat(this.oldData,_obj);
                            this.$axios('user_change',Object.assign(para,{'user_id':Number.parseInt(this.editForm.user_id)})).then(data => {
                                this.editLoading = false;
                                if(data.error===0){
                                    //NProgress.done();
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['editForm'].resetFields();
                                    this.editFormVisible = false;
                                    this.getUsers();
                                } else {
                                    this.$message({
                                        message:data.result,
                                        type:'error'
                                    })
								}

                            });
                        });
                    }
                });
            },
            /*//批量删除
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
            }*/
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

</style>