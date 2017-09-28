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
                <div class="grid-content bg-purple-dark">项目编号 ：{{dataInfo.proj_bu_code}}</div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark"></div>塔高 ：{{dataInfo.proj_tower_height}}</el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark"></div>所属部门 ：{{dataInfo.proj_bu_name}}</el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark"></div>基站类型 ：{{dataInfo.proj_station_type}}</el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark"></div>基础类型 ：{{dataInfo.proj_base_type}}</el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark"></div>地址 ：{{dataInfo.proj_addr}}</el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark"></div>经度 ：{{dataInfo.proj_lon}}</el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-dark"></div>纬度 ：{{dataInfo.proj_lat}}</el-col>
        </el-row>
        <div class="block">
            <span class="demonstration">项目环节</span>
            <el-cascader
                    expand-trigger="hover"
                    :options="navList"
                    v-model="selectedOptions2"
                    @change="handleChange(selectedOptions2)">
            </el-cascader>
        </div>
        <template>
            <el-input
                    icon="search"
                    v-model="input2"
                    :on-icon-click="handleIconClick">
            </el-input>
            <p>上传照片列表，点击可查看大图。<el-tag  type="success"><a @click="displayMap" href="javascript:void(0)" style="color:inherit">{{displayInfo}}</a></el-tag></p>
            <ul id="wrapper" class="pr" style="text-align: center;width:80%;margin:auto;overflow:hidden;height:250px;">
                <li v-for="(itme,index) in imgArr" style="width:30%"><img width="70%" :src="itme.pic" @click="clickImg(index,imgArr)"></li>
                <span id="left" @click="changeImg('left')" class="el-icon-arrow-left pa"></span>
                <span id="right" @click="changeImg('right')" class="el-icon-arrow-right pa"></span>
                <!-- 放大图片 -->
                <big-img v-if="showImg" @clickit="viewImg" :bigImgs="bigImgs" :imgIndex="imgIndex"></big-img>
            </ul>
            <div id="map" style="height:250px;width:100%;margin:auto;display:none;"></div>

        </template>
        <!--审核表单-->
        <el-row class="submit-content">
            <el-col >
                <el-form class="commit-form" ref="form" :model="form" label-width="100px">
                    <el-form-item class="commitAuthor">
                        <el-col :span="24">
                            <div class="grid-content bg-purple-dark"></div>提交者姓名 :</el-col>
                        <el-col :span="24">
                            <div class="grid-content bg-purple-dark"></div>提交者时间 :</el-col>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-radio-group v-model="form.proj_link_status">
                            <el-radio label="0">通过</el-radio>
                            <el-radio label="1">条件通过</el-radio>
                            <el-radio label="2">不通过</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="审核意见" >
                        <el-input class="audit-opinion" type="textarea" v-model="form.proj_link_review_describe"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>

        </el-row>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import BigImg from './comps/BigImg';
    import * as map from '../../common/js/map';
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
    export default {
        data() {
            return {
                navList:[],
                selectedOptions2:[],
                options:[],
                dataInfo:{},

                displayInfo:'地图信息',
                dataInfo:'',
                proj_info:{},
                showImg: false,
                imgArr :[],
                imgIndex: '',
                form: {
                    "proj_link_id": Number.parseInt(this.linkId),
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
            displayMap(){
                if(this.displayInfo === '地图信息'){
                    $('#wrapper').hide();
                    $('#map').show();
                    this.displayInfo = '图片详情';
                } else {
                    $('#wrapper').show();
                    $('#map').hide();
                    this.displayInfo = '地图信息';
                }
                let gw = [this.dataInfo.proj_lon,this.dataInfo.proj_lat],
                    arr = [];
                for(let val of this.imgArr){
                    let lat = val.localtion.lat,
                        lon = val.localtion.lon;
                    arr.push([lon,lat]);
                }
                arr.unshift(gw);
                map.drawMap('map',arr);
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
                console.log(eve)
            },

            handleChange(obj){
                for(let val of obj){
                    Array.isArray(val) && (this.imgArr = val);
                }
                console.log(this.imgArr)
            },
            //获取用户列表
            getUsers(code) {
                function changeAttr(obj){
                    let _obj_ = {
                        label : obj.name,
                        value : eval(obj.proj_link_pic) || obj.name,
                    }
                    if(obj.hasOwnProperty('sub')){
                        _obj_.children = obj.sub;
                    }
                    return _obj_;
                }
                let self = this;
                self.listLoading = true;
                /*//NProgress.start();
                getUserListPage({limit:10,offset:0}).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });*/
                let id = self.id = this.code = this.$route.params.obj.proj_code;
                self.$axios('projectLink_get',{proj_code:id}).then(data => {
                    self.listLoading = false;
                    let detail = data.result.detail,
                        tree = [];
                    for(let val of detail){
                        let obj = changeAttr(val);
                        if(obj.children){
                            let children = obj.children,
                                arr =[];
                            for(let item of children){
                                let _obj = changeAttr(item);
                                arr.push(_obj);
                                if(_obj.hasOwnProperty('children')){
                                    let arr_obj = _obj.children,
                                        __arr =[];
                                    for(let obj of arr_obj){
                                        let __obj = changeAttr(obj);
                                        __arr.push(__obj);
                                    }
                                    _obj.children = __arr;

                                    /*obj.children = [];
                                    for(let j in data){
                                        let _obj = data[j];
                                        obj.children.push({label:_obj.name,value:_obj.sub});
                                    }*/
                                }
                            }
                            obj.children = arr;
                        }

                        tree.push(obj);
                        /*if(i==0 && !obj.children){
                            self.users = data;
                            self.primary = JSON.stringify(detail[i]);
                        }
                        tree.push(obj);*/
                    }
                    self.navList = tree;
                });
            },
        },
        mounted() {
            this.dataInfo = this.$route.params.obj;
            this.getUsers();
        }
    }

</script>

<style scoped>
    .img{
        height:300px;
        text-align:center;
    }
    .grid{
        padding:6px;
    }
    #map{
        width:100%;
        height:300px;
    }
    .overlay{
        position: fixed;
        width: 100%;
        height: 100%;
        visibility: hidden;
        top: 0;
        left: 0;
        z-index: 9999995;
        opacity: 0;
        background: rgba(1,1,1,0.6);
        -webkit-transition: width 0.3s;
        -moz-transition: width 0.3s;
        transition: width 0.3s;
    }
    .overlay-active{
        background-repeat:no-repeat;
        background-position:center;
        background-size:auto 80%;
        opacity: 1;
        visibility: visible;
    }
    .imgClose{
        position:absolute;
        right:5%;
        top:5%;
        color:#fff;
        font-size:20px;
        padding:20px;
    }
    ul#wrapper li {
        display: inline-block;
    }
    #left {
        top: 40%;
        left: 20px;
        padding: 5% 10px;
    }

    #right {
        top: 40%;
        right: 20px;
        padding: 5% 10px;
    }

</style>