<template>
    <div class="login-wrap">
        <div class="ms-title">注册</div>
        <div class="ms-login">
            <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input v-model="form.name" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="passwd">
                    <el-input type="password" placeholder="密码" v-model="form.passwd" ></el-input>
                </el-form-item>
                <el-form-item prop="passwd2">
                    <el-input type="password" placeholder="确认密码" v-model="form.passwd2" ></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('form')">注册</el-button>
                </div>
                <router-link to="/login" class="fl logR">返回</router-link>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    name: '',
                    passwd: '',
                    passwd2:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        {validator:(rule,value,callback)=>{
                            let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                            if(reg.test(value) == false){
                                callback(new Error("邮箱格式不正确！"));
                            } else {
                                callback();
                            }
                        }, trigger:'blur'}
                    ],
                    passwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {min:6,max:12, message:"6-12个字符", trigger:'blur'}
                    ],
                    passwd2: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        {validator:(rule,value,callback)=>{
                            if(value !== this.form.passwd){
                                callback(new Error("两次密码输入不一致！"));
                            }else{
                                callback();
                            }
                        }, trigger:'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$axios('User_Create',self[formName],function(){
                            localStorage.setItem('ms_username',self.ruleForm.username);
                            self.$router.push('/login');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:250px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
