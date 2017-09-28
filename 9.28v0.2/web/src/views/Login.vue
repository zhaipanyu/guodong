<!--登录界面-->
<template>
  <div class="login-wrap">
    <!-- <div class="ms-title">国动集团现场管理系统</div> -->
    <div class="ms-login "><!--登录白色界面-->
      <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="demo-ruleForm">
       <el-form-item>
       <img src="../assets/loginTitle.png" alt="" class="loginTitle">
       </el-form-item>
          <!--饿了吗input-->
        <!-- <el-form-item prop="user_name">
          <input v-model="form.user_name" type="text" placeholder="用户名" class="login-input">
          <el-input v-model="form.user_name" placeholder="用户名" ></el-input>
        </el-form-item>
        <el-form-item prop="user_password">
          <el-input type="password" placeholder="密码" v-model="form.user_password"></el-input>
        </el-form-item> --><!--饿了吗input-->

        <!--重写input-->
            <el-form-item prop="user_name" class="pr">
             <!-- <div class="pr"> -->
                 <img src="../assets/user-icon.png" alt="" class="username-img">
                 <input  type="text" placeholder="用户名" v-model="form.user_name" class="login-input">
             <!-- </div> -->
             </el-form-item>
          <el-form-item prop="user_password" class="pr">
              <img src="../assets/password-icon.png" alt="" class="password-img">
              <input  type="password" placeholder="密码" v-model="form.user_password" class="login-input">
           </el-form-item> <!--重写input-->


        <!--<el-form-item prop="dev_request_type" v-show="false">
          <el-input type="dev_request_type" placeholder="" v-model="form.dev_request_type"></el-input>
        </el-form-item>-->
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </div>
        <!-- <router-link to="/register" class="fl logR">注册</router-link>
        <router-link to="/reset" class="fr logR">重置密码</router-link> -->
      </el-form>
    </div>
  </div>
</template>

<script>
    import {email} from '../common/js/regExp';
    const CryptoJS = require('crypto-js');
    export default {
        data: function(){
            return {
                form: {
                    user_name: '',
                    user_password: '',
                    dev_request_type:'user_web_token'
                },
                rules: {
                    user_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        {message: '请输入正确格式', trigger: 'blur'},
                        /*{validator:(rule,value,callback)=>{
                            let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                            if(reg.test(value) == false){
                                callback(new Error("邮箱格式不正确！"));
                            }else{
                                callback();
                            }
                        }, trigger:'blur'}*/
                    ],
                    user_password: [
                        {required: true, message: '请输入密码', trigger: 'blur' },
                        /*{min:6,max:12, message:"6-12个字符", trigger:'blur'}*/
                    ]
                }
            }
        },
        methods: {
            submitForm(form) {
                const self = this;
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        let formdata = self[form];
                        self.$axios('user_login',Object.assign({},formdata,{user_password:CryptoJS.MD5(formdata.user_password).toString()})).then(data => {
                            if(data.error===0){
                                let info = data.result;
                                sessionStorage.setItem('user',JSON.stringify({
                                    id: info.user_id,
                                    /*isRoot: info.is_root,*/
                                    name : info.user_name,
                                    token:info.user_web_token,
                                    user_id:info.user_id
                                }));
                                sessionStorage.setItem('user_role',info.user_role);
                                sessionStorage.setItem('user_id',info.user_id);
                                sessionStorage.setItem('user_name',info.user_name);
                                sessionStorage.setItem('user_code',info.user_code);
                                self.$router.push('/pending');
                            } else {
                                self.$message({
                                    message: data.result,
                                    type: 'error'
                                })
                            }

                        });
                    } else {
                        console.log('error submit!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .login-wrap{/*背景图*/
    position: relative;
    width:100%;
    height:100%;
    background: url(../assets/loginImage.png) no-repeat 0 0;
    background-size: cover;
  }
 
  .ms-login{/*登录框*/
    position: absolute;
    top:40%;
    right:20%;
    /* margin:-150px 0 0 -190px; */
    /* padding:40px; */
    /* width:300px; */
    /* height:180px; */
    /* border-radius: 5px; */
    /* background: #fff; */
    /* box-shadow:0px 0px 1px 1px rgba(23, 23, 23,0.4); */
  }
.loginTitle{/*标题*/
      position: absolute;
      bottom: 50px;
      right: -50px;
      /* display: inline-block; */
      width: 400px;
      /* transform: translateX(-50%); */
  }
  .login-input{/*输入框*/
    /* background: url(../assets/input-border.png) no-repeat; */
    /* border:  transparent; */
    padding: 3px 10px;
    padding-left: 40px;
    margin-bottom: 20px;
    background-color:rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    border-style: none;
    box-sizing: border-box;
    color: #fff;
    font-size: 17px;
    height: 56px;
    width: 300px;
    line-height: 1;
    outline: 0;
    box-shadow: -1px 2px 1px 1px rgba(0, 0, 0, 0.1);
  }
  /*小图标*/
  .username-img{
      position: absolute;
      bottom:34px;
      left: 8px;
  }
/*图标*/
.password-img{
    position: absolute;
    left: 8px;
    top:12px;
}
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    /* width:100%; */
    width: 300px;
    height:40px;
    background-color:rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    height: 42px;
    border-style: none;
    color: #fff;
    font-size: 23px;
    box-shadow: -1px 2px 1px 1px rgba(0, 0, 0, 0.1);
  }
  .login-btn button:hover{
      /* box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2); */
      background-color: #2572ca;
  }

  ::-webkit-input-placeholder { /* Chrome */
  color: #ccc;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #ccc;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #ccc;
  opacity: 1;
}
:-moz-placeholder { /* Firefox 4 - 18 */
  color: #ccc;
  opacity: 1;
}

</style>
