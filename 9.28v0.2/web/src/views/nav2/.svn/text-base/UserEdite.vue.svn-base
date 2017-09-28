<!--用户编辑-->
<template>
    <section>
        <el-row class="user-detail">
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 入职时间 :</span> {{dataInfo.user_entry_time}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 用户权限 :</span> {{dataInfo.user_role|roleFilter}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 用户邮箱 :</span> {{dataInfo.user_mail}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 人事编号 :</span> {{dataInfo.user_number}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 用户登录账号 :</span> {{dataInfo.user_name}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 部门名称 :</span> {{dataInfo.user_bu_name}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 公司名称 :</span> {{dataInfo.user_company}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 公司编码 :</span> {{dataInfo.user_company_code}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 部门编码 :</span> {{dataInfo.user_bu_code}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 用户编码 :</span> {{dataInfo.user_code}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 用户电话 :</span> {{dataInfo.user_phone}}</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><span style="font-size:15px;color:dimgrey"> 职位 :</span>{{dataInfo.user_job}}</div></el-col>
        </el-row>
        <el-button  type="primary" @click="editFormVisible = true">编辑</el-button>
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="rules" ref="editForm">
                <el-form-item label="姓名" prop="user_name">
                    <el-input v-model="editForm.user_name"></el-input>
                </el-form-item>
                <el-form-item label="公司" prop="user_company">
                    <el-input v-model="editForm.user_company"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="user_bu_name">
                    <el-input v-model="editForm.user_bu_name"></el-input>
                </el-form-item>
                <el-form-item label="人事编号" prop="user_number">
                    <el-input v-model="editForm.user_number"></el-input>
                </el-form-item>
                <el-form-item label="id" prop="user_id">
                    <el-input v-model="editForm.user_id"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="user_job">
                    <el-input v-model="editForm.user_job"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop=user_roler>
                    <el-select v-model="editForm.user_role">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机" v-if="USER_ROLE<=3 && USER_ID == editForm.user_id" prop="user_phone">
                    <el-input v-model="editForm.user_phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" v-if="USER_ROLE<=3 && USER_ID == editForm.user_id" prop="user_mail">
                    <el-input v-model="editForm.user_mail"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>

</template>
<script>
    import {checkRepeat} from '../../common/js/checkRepeat'
    import {userRole} from '../../common/js/tableFilter'
    import {email,phone} from '../../common/js/regExp'
    export default {
        data() {
            return {
                editLoading:false,
                editFormVisible:false,
                user_id:'',
                options: userRole,
                oldData: {},
                dataInfo:{},
                editForm: {
                    user_name: '',
                    user_company: '',
                    user_bu_name: '',
                    user_number: '',
                    user_id: '',
                    user_job: '',
                    user_roler: '',
                    user_phone: '',
                    user_mail: '',
                },
                rules: {
                    /*user_name: [],
                    user_company: [],
                    user_bu_name: [],
                    user_number: [],
                    user_id: [],
                    user_job: [],
                    user_roler: [],*/
                    user_phone: [{
                        validator: (rule, value, callback) => {
                            if (value && !phone.regexp.test(value)) {
                                callback(new Error("格式不正确！"));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                    user_mail: [{
                        validator: (rule, value, callback) => {
                            if (value && !email.regexp.test(value)) {
                                callback(new Error("格式不正确！"));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }]
                },
            }
        },
        methods: {
            resetForm(form) {
                this.$refs[form].resetFields();
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
            onSubmit() {

            }
        },
        mounted(){
            if(!this.$route.params.obj){
                this.$router.push('/userList');
            } else {
                this.dataInfo = this.editForm = this.$route.params.obj;
                this.user_id = sessionStorage.getItem('user_id');
                this.oldData = Object.assign({},this.$route.params.obj);
            }
        }
    }
</script>
<style>
    .user-detail{
    border: 1px solid #8391a5;
    box-shadow: 0px 0px 1px #ccc;
    padding: 10px 30px;
    line-height: 2em;
    margin-bottom: 30px;
    border-radius: 4px;
    font-size: 16px;
    }
</style>











