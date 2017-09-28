<!--个人设置页面-->
<template>
    <el-tabs type="border-card">
        <el-tab-pane label="修改密码">
            <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="dev_request_type">
                    <el-input v-model="form.dev_request_type" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="old_password">
                    <el-input type="password" placeholder="原密码" v-model="form.old_password" ></el-input>
                </el-form-item>
                <el-form-item prop="newPasswd">
                    <el-input type="password" placeholder="确认密码" v-model="form.newPasswd" ></el-input>
                </el-form-item>
                <el-form-item prop="new_password">
                    <el-input type="password" placeholder="确认密码" v-model="form.new_password" ></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </div>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="消息设置">消息设置</el-tab-pane>
    </el-tabs>
</template>

<script>
    const CryptoJS = require('crypto-js');
    export default {
        data: function(){
            return {
                form: {
                    dev_request_type: '',
                    old_password: '',
                    newPasswd:'',
                    newPasswd2:''
                },
                rules: {
                    dev_request_type: [
                        { required: true, message: '请输入用户', trigger: 'blur' },
                    ],
                    old_password: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                        {min:6,max:12, message:"6-12个字符", trigger:'blur'}
                    ],
                    newPasswd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {min:6,max:12, message:"6-12个字符", trigger:'blur'}
                    ],
                    newPasswd2: [
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
                        self.$axios('userPassword_change',{new_password:CryptoJS.MD5(self[formName].new_password).toString(),old_password:CryptoJS.MD5(self[formName].old_password).toString()}).then(function(data){
                            if(data.error === 0){
                                localStorage.removeItem('ms_username');
                                self.$router.push('/login');
                            } else {
                                self.$message({
                                    message: data.result,
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted(){
            $(document).ready(function() {

                $('#imageFullScreen').smartZoom({'containerClass':'zoomableContainer'});

                $('#topPositionMap,#leftPositionMap,#rightPositionMap,#bottomPositionMap').bind("click", moveButtonClickHandler);
                $('#zoomInButton,#zoomOutButton').bind("click", zoomButtonClickHandler);

                function zoomButtonClickHandler(e){
                    var scaleToAdd = 0.8;
                    if(e.target.id == 'zoomOutButton')
                        scaleToAdd = -scaleToAdd;
                    $('#imageFullScreen').smartZoom('zoom', scaleToAdd);
                }

                function moveButtonClickHandler(e){
                    var pixelsToMoveOnX = 0;
                    var pixelsToMoveOnY = 0;

                    switch(e.target.id){
                        case "leftPositionMap":
                            pixelsToMoveOnX = 50;
                            break;
                        case "rightPositionMap":
                            pixelsToMoveOnX = -50;
                            break;
                        case "topPositionMap":
                            pixelsToMoveOnY = 50;
                            break;
                        case "bottomPositionMap":
                            pixelsToMoveOnY = -50;
                            break;
                    }
                    $('#imageFullScreen').smartZoom('pan', pixelsToMoveOnX, pixelsToMoveOnY);
                }

            });
        }
    }
</script>