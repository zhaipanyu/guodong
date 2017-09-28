<!--待审核详情列表-->
<template>
    <section>
        <el-row class="top-title">
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">项目名称 ：{{dataInfo.proj_name}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">塔型 ：{{dataInfo.proj_tower_type}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">所属模块 ：{{dataInfo.proj_module_name_ls}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">项目编号 ：{{dataInfo.proj_code}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">塔高 ：{{dataInfo.proj_tower_height}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">所属部门 ：{{dataInfo.proj_bu_name}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">基站类型 ：{{dataInfo.proj_station_type}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">基础类型 ：{{dataInfo.proj_base_type}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">地址 ：{{dataInfo.proj_addr}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">经纬度 ：{{dataInfo.proj_lon}}，{{dataInfo.proj_lat}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark"></div></el-col>
        </el-row>
        <!--图片缩略图-->
        <div v-if="imgArrPic" class="img-wrap">
            <el-row class="img-title-wrap">
                <el-col v-if="textInfo" :span="12" >
                    <div class="grid-content bg-purple-dark"></div>审批环节 :  {{projectInfo.proj_link_name}}</el-col>
                <el-col v-if="textInfo" :span="12" >
                    <div class="grid-content bg-purple-dark"></div>提交人 :  {{projectInfo.proj_link_submit_user_name}}</el-col>
                 <el-col v-if="textInfo" :span="12" >
                    <div class="grid-content bg-purple-dark"></div>提交描述 :  {{projectInfo.proj_link_describe}}</el-col>
                <el-col v-if="textInfo" :span="12">
                    <div class="grid-content bg-purple-dark"></div>提交时间 : {{projectInfo.proj_link_submit_time|formatTime}}</el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark"></div>拍摄位置 : <el-tag  type="success"><a @click="displayMap" href="javascript:void(0)" style="color:inherit">{{displayInfo}}</a></el-tag></el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-dark"></div>位置异常图片数量 : <el-tag  type="warning"><a href="javascript:void(0)" style="color:inherit">{{warningCount}}</a></el-tag></el-col>
            </el-row>
            <ul id="wrapper" class="pr" style="text-align: center;width:80%;margin:auto;overflow:hidden;height:200px;">
                <li v-for="(itme,index) in imgArr" style="width:30%;height:100%" class="pr">
                    <a href="javascript:void(0)">
                        <img height="100%" :src="itme.pic" @click="clickImg(index,imgArr)" alt="图片无地址">
                    </a>
                </li>
                <a v-show="imgArr.length>3" href="javascript:void(0)"><span class="left pa" @click="changeImg('left')"></span></a>
                <a v-show="imgArr.length>3" href="javascript:void(0)"><span class="right pa" @click="changeImg('right')"></span></a>
                <!-- 放大图片 -->
                <big-img v-if="showImg" @clickit="viewImg" :bigImgs="bigImgs" :imgIndex="imgIndex"></big-img>
            </ul>
            <div class="pr">
                <a href="javascript:void(0)">
                    <img id="cancelMap" class="pa disNone" @click="displayMap" style="right:10px;width:40px;height:40px;z-index: 10;" src="../../assets/cancelMap.png" alt="">
                </a>
                <div id="map" style="height:264px;width:100%;margin:auto;display:none;"></div><!--根据隐藏文字高度而定-->
            </div>
        </div>
        <div v-else>
            <h6 class="tc">无图片显示</h6>
        </div>
        <!--审核意见-->
        <el-row class="submit-suggestion">

        </el-row>    
        <!--审核表单-->
        <el-row class="submit-content">
            <el-col >
                <el-form class="commit-form" ref="form" :model="form" label-width="100px">
                    <el-form-item label="审核状态">
                        <el-radio-group v-model="form.proj_link_status">
                            <el-radio label="3">通过</el-radio>
                            <el-radio label="5">条件通过</el-radio>
                            <el-radio label="2">不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="审核意见" >
                        <el-input class="audit-opinion" type="textarea" v-model="form.proj_link_review_describe"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="commit-button" type="danger" style="font-size:30px;font-weight:500;width:30%;color:#202020;background-color:#ff090f;" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import util from '../../common/js/util';
import BigImg from './comps/BigImg';
import {drawMap,addImgInfo} from '../../common/js/map';
export default {
    data() {
        return {
            warningCount:'',
            textInfo:true,
            linkId:'',
            imgArrPic:'',
            projectInfo:{},
            displayInfo:'地图信息',
            dataInfo:'',
            proj_info:{},
            showImg: false,
            imgArr :[],
            imgIndex: '',
            form: {
                "proj_link_reviewer_id": Number.parseInt(sessionStorage.getItem('user_id')),
                "proj_link_reviewer_code": sessionStorage.getItem('user_code'),
                "proj_link_reviewer_name": sessionStorage.getItem('user_name'),
                "proj_link_review_describe": "",
                "proj_link_status": ''
            }
        }
    },
    components: {
        'big-img': BigImg
    },
    methods: {
        warningCountInit(_arr_){//获取不在安全距离内图片数量和带此表示的新数组
            let gw = [this.dataInfo.proj_lon,this.dataInfo.proj_lat],
                arr = _arr_;
            let distanceArr = Object.assign([],addImgInfo(this.dataInfo.proj_link_max_distan,gw,arr)),
                _arr = distanceArr.newArr;
            this.warningCount = distanceArr.warningCount;
            _arr.unshift(gw);
            return _arr;
        },
        displayMap(){
            if(this.displayInfo === '地图信息'){
                this.textInfo = false;
                $('#cancelMap').show();
                $('#wrapper').hide();
                $('#map').fadeIn();
                this.displayInfo = '图片详情';
            } else {
                this.textInfo = !this.textInfo;
                $('#cancelMap').hide();
                $('#wrapper').show();
                $('#map').hide();
                this.displayInfo = '地图信息';
            }
            drawMap('map',this.warningCountInit(this.imgArr));
        },
        changeImg(str){
            switch(str){
                case 'left':
                    this.imgArr.unshift(this.imgArr.pop());
                    break;
                case 'right':
                    this.imgArr.push(this.imgArr.shift());
            }
        },
        clickImg(index,imgArr) {
            this.showImg = true;
            this.bigImgs = imgArr;
            // 获取当前图片在数组中位置
            this.imgIndex = index;
        },
        viewImg() {
            this.showImg = false;
        },
        maxImg(eve) {
        },
        getProjInfo(){
            this.$axios('projectList_get', {proj_code:this.$route.params.obj.proj_code}).then(data => {
                if (data.error === 0) {
                   this.dataInfo = data.result[0];
                } else {
                    this.$message({
                        message: data.result,
                        type: 'error'
                    });
                }
            });
        },
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        let para = {
                            proj_code: this.projectInfo.proj_code,
                            links: [Object.assign({"proj_link_id": Number.parseInt(this.linkId)}, this.form, { proj_link_status: Number.parseInt(this.form.proj_link_status) })]
                        };
                        this.$axios('projectLink_review', para).then(data => {
                            this.addLoading = false;
                            if (data.error === 0) {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            } else {
                                this.$message({
                                    message: data.result,
                                    type: 'error'
                                });
                            }
                        });
                    });
                }
            });
        }
    },
    mounted() {
        if(!this.$route.params.obj){
            this.$router.push('/Pending');
        } else {
            this.getProjInfo();
            this.projectInfo = this.$route.params.obj;
            this.linkId = this.projectInfo.proj_link_id;
            this.imgArr = this.projectInfo.proj_link_pic;
            this.imgArrPic = util.picLength(this.imgArr);
            this.warningCountInit(this.imgArr);
        }
           
    },
    updated(){
     //隐藏
			$('.bottom-fix').css('visibility','hidden');

    }
}

</script>

<style scoped lang="scss">

@import '~scss_vars';

$wrapborder-color:#8391a5;//内容阴影的颜色
$content-boxborder:1px solid $wrapborder-color;//内容框的边框样式
$boxshadow-color:#ccc;//阴影色
$content-boxshadow:0px 0px 1px $boxshadow-color; //内容框的box-show样式
$section-fontfamily: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei";//section字体样式
$content-padding :10px; //内容padding
$content-border-radius: 4px;//内容的边框圆角
$common-size:20px;//常用像素
section {
    font-family:$section-fontfamily;
    font-size: 16px;
}
/*顶部文字内容*/
.top-title {
    border: $content-boxborder;
    box-shadow: $content-boxshadow;
    padding: $content-padding $common-size;
    line-height: 2em;
    margin-bottom: $common-size;
    border-radius: $content-border-radius;
}

/*轮播部分*/
.img-wrap{/*UI*/
    border: $content-boxborder;
    box-shadow: $content-boxshadow;
    padding: $content-padding;
    line-height: 2em;
    margin-bottom: $common-size;
    margin-top: 0;
    border-radius: $content-border-radius;
}
/*提交人内容*/
.img-title-wrap{
    border:1px solid #ccc;
    padding: $content-padding;
    margin-bottom: 8px;
    border-radius: $content-border-radius;
}
/*轮播*/
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
/*轮播*/
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
/*轮播*/
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
/*轮播左击*/
#left {
    top: 30%;
    left: $common-size;
    padding: 40px;
    background: url(../../assets/left-button.png) no-repeat ;/*左切换图*/
    &:hover{/*轮播左悬浮*/
        transform: scale(1.2,1.2);
        transition: all 0.2s;
        z-index: 100;
    }
}

/*轮播右击*/
#right {
    top: 30%;
    right: $common-size;
    padding: 40px;
    background: url(../../assets/right-button.png) no-repeat ;/*右切换图*/
    &:hover{/*轮播右悬浮*/
        transform: scale(1.2,1.2);
        transition: all 0.2s;
        z-index: 100; 
    }
}

/**/
ul#wrapper li {
    display: inline-block;
}
/*审核表单*/
.submit-content{
    margin-top: 0px;
    padding: $common-size;
    border:$content-boxborder;
    box-shadow: $content-boxshadow;
    border-radius: $content-border-radius;
}
/*提交内容*/
.commit-form{
    margin-left: -$common-size;
   
}

/*提交者*/
.commitAuthor{
     margin-left: -70px;
}
/*提交按钮*/
.commit-button{
    width:150px;
    /* height: 40px; */
}

@import '../../styles/detail.scss';

</style>