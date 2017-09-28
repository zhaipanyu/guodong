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
                <div class="grid-content bg-purple-dark"></div>经纬度 ：{{dataInfo.proj_lon}}，{{dataInfo.proj_lat}}</el-col>
        </el-row>
        <template v-for="(item,index) in detail">
            <el-row class="projectlink-wrap" ><!--地址勘探包裹-->
            <el-row class="projectlink-title" pr><!--地址勘探标题-->
                <img src="../../assets/detail-down.png" alt="" class="detail-down pa">
                <el-tooltip class="item" effect="dark" content="单击标题展开详情" placement="left">
                <p style="display: inline;"><a href="javascript:void(0)" class="dis-block" @click="accordion(index)" style="font-weight:900; padding:0;width:100%;height:100%">{{item.name}}</a></p>
              </el-tooltip>
            </el-row>
            <div class="wrap" :id="'wrap'+index" :class="{default:index!==0}">
                <div v-for="(inner,_index) in item.sub"><!--遍历项目的子流程-->
                    <div :index="item.name">
                        <p class="projectItem-title">{{inner.name}}</p><!--钻孔照片等-->
                        <div v-if="inner.proj_link_pic instanceof Array" class="projectItem-content">
                            <el-row class="commit-content">
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-dark"></div>提交人 : {{inner.proj_link_submit_user_name}}</el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-dark"></div>提交时间 : {{inner.proj_link_submit_time |formatTime}}</el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-dark"></div>审核不通过历史次数 : 2次</el-col>    
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-dark"></div>位置异常图片数量 : <el-tag  type="warning"><a href="javascript:void(0)" style="color:inherit">{{addImgInfo(dataInfo.proj_link_max_distan,[dataInfo.proj_lon,dataInfo.proj_lat],inner.proj_link_pic).warningCount}}</a></el-tag></el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-dark"></div>拍摄位置 :  <el-tag  type="success"><a :class="''+index+_index" @click="displayMap(inner.proj_link_pic,''+index+_index)" href="javascript:void(0)" style="color:inherit">地图信息</a></el-tag></el-col>
                            </el-row>
                            <ul :class="'carousel'+index + _index" class="pr wrapper" style="text-align: center;width:80%;margin:auto;overflow:hidden;height:250px;"><!--轮播图-->
                                <li v-for="(itme,index) in inner.proj_link_pic" style="width:30%"><img width="70%" :src="itme.pic" @click="clickImg(index,inner.proj_link_pic)" alt="图片无地址"></li>
                                <span v-show="inner.proj_link_pic.length>3" class="left pa" @click="changeImg('left',inner.proj_link_pic)"></span>
                                <span v-show="inner.proj_link_pic.length>3" class="right pa" @click="changeImg('right',inner.proj_link_pic)"></span>
                                <!-- 放大图片 -->
                                <big-img v-if="showImg" @clickit="viewImg" :bigImgs="bigImgs" :imgIndex="imgIndex"></big-img>
                            </ul>
                            <div>
                                <a href="javascript:void(0)">
                                    <img id="cancelMap" class="pa disNone" @click="displayMap" style="right:10px;width:40px;height:40px;z-index: 10;" src="../../assets/cancelMap.png" alt="">
                                </a>
                                <div :id="'map'+index + _index" class="map"  style="height:250px;width:100%;margin:auto;display:none;"></div>
                            </div>
                            <el-row class="check-content"><!--审核意见-->
                                <el-col :span="8">审核状态 :{{inner.proj_link_status |transStatus}}</el-col>
                                <!-- <el-col :span="8">审核人 :{{inner.proj_link_status |transStatus}}</el-col> -->
                                <!-- <el-col :span="8">审核时间 :{{inner.proj_link_status |transStatus}}</el-col> -->
                                <el-col :span="24">审核意见 :{{inner.proj_link_review_describe |emptyChart}}</el-col>
                            </el-row>
                        </div>
                        <div v-else>
                            <h6 class="tc" style="color:red;">无图片显示  !</h6>
                        </div>
                    </div>
                </div>
            </div>
            </el-row ><!--地址勘探包裹-->
        </template>
        <!--审核表单-->
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import BigImg from './comps/BigImg';
    import {statusFilter} from '../../common/js/tableFilter';
    import {drawMap,addImgInfo} from '../../common/js/map';
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
                detail:[],
                navList:[],
                selectedOptions2:[],
                options:[],
                dataInfo:{},

                displayInfo:'地图信息',
                dataInfo:'',
                proj_info:{},
                showImg: false,
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
            warningCountInit(_arr_){//获取不在安全距离内图片数量和带此表示的新数组
                let gw = [this.dataInfo.proj_lon,this.dataInfo.proj_lat],
                    arr = _arr_;
                let distanceArr = Object.assign([],addImgInfo(this.dataInfo.proj_link_max_distan,gw,arr)),
                    _arr = distanceArr.newArr;
                this.warningCount = distanceArr.warningCount;
                _arr.unshift(gw);
                return _arr;
            },
            accordion(str){
                $('#wrap'+str).toggle().parent().siblings('div').children('div.wrap').hide();
            },
            displayMap(arr,index){
                let $map = $('#map'+index),
                    $carousel = $('.carousel'+index),
                    $cancelMap = $('.cancelMap'),
                    $textInfo = $('.'+index),
                    displayInfo = $textInfo.text();
                if(displayInfo === '地图信息'){
                    $carousel.hide();
                    $cancelMap.show();
                    $map.fadeIn();
                    $textInfo.text('图片详情');
                } else {
                    $cancelMap.hide();
                    $carousel.show();
                    $map.hide();
                    $textInfo.text('地图信息');
                }
                drawMap('map'+index,this.warningCountInit(arr));
            },
            changeImg(str,arr){
                switch(str){
                    case 'left':
                        arr.unshift(arr.pop());
                        break;
                    case 'right':
                        arr.push(arr.shift());
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

            /*handleChange(obj){
                for(let val of obj){
                    Array.isArray(val) && (this.imgArr = val);
                }
            },*/
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
                    this.detail = data.result.detail;
                });
            },
        },
        mounted() {
            if(!this.$route.params.obj){
                this.$router.push('/Table');
            } else {
                this.dataInfo = this.$route.params.obj;
                this.getUsers();
                this.addImgInfo = addImgInfo;
            }
        },
        updated(){
     //隐藏必须放在updated里才生效
	    $('.bottom-fix').css('visibility','hidden');
    }
    }

</script>

<style scoped lang="scss">
    @import '../../styles/detail.scss';//引入详情基础样式
$wrapborder-color:#8391a5;//内容阴影的颜色
$content-boxborder:1px solid $wrapborder-color;//最外层内容框的边框样式
$seconde-content-boxborder:1px solid rgba($wrapborder-color,.65);//第二层内容框的边框样式
$boxshadow-color:#ccc;//阴影色
$content-boxshadow:0px 0px 1px $boxshadow-color; //内容框的box-show样式
$section-fontfamily: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei";//section字体样式
$content-padding :15px; //内容padding
$content-border-radius: 4px;//内容的边框圆角
$updown-size:30px;//内容上下间距
$leftright-size:30px;//内容左右间距

/*顶部文字内容*/
.top-title {
  border: $content-boxborder;
  box-shadow: $content-boxshadow;
  padding: $content-padding 15px;
  line-height: 2em;
  margin-bottom: $updown-size;
  border-radius: $content-border-radius;
}
/*地址勘探包裹*/
.projectlink-wrap{
  border: $content-boxborder;
  box-shadow: $content-boxshadow;
//   padding-left: $content-padding;
  margin-bottom: $updown-size;
  border-radius: $content-border-radius;
}
/*地址勘探标题*/
    .projectlink-title{
        padding-left: 5px;
        padding-top: 5px;
        &:hover{
            background-color: rgba(47, 163, 210,0.4);
        }
    }
/*图标*/
    .detail-down{
        right: 20px;
        // height: ;
    }
    //钻孔照片-标题
    .projectItem-title{
        margin-left: 20px;
        font-weight:800;
    }
    //第二层钻孔照片-内容-
    .projectItem-content{
        border: $seconde-content-boxborder;
        box-shadow: $content-boxshadow;
        padding-left: $content-padding;
        margin-left: 40px;
        margin-right: 40px;
        margin-bottom: $updown-size;
        border-radius: $content-border-radius;
    }
    //钻孔照片-提交人内容
    .commit-content{
        border:1px solid #ccc;
        padding: $content-padding ;
        margin: 15px 15px 15px 0;
        border-radius: $content-border-radius;
        line-height: 2em;
    }
    //钻孔照片-审核意见
    .check-content{
        border:1px solid #ccc;
        padding: $content-padding ;
        margin: 15px 15px 15px 0;
        border-radius: $content-border-radius;
        line-height: 2em;
   }
    .img{
        height:300px;
        text-align:center;
    }
    .grid{
        padding:6px;
    }
    .map{
        width:100%;
        height:300px;
    }
     ul.wrapper li {
        display: inline-block;
    }
    .default{
        display:none;
    }
    .active{
        display:block;
    }
    // .overlay{
    //     position: fixed;
    //     width: 100%;
    //     height: 100%;
    //     visibility: hidden;
    //     top: 0;
    //     left: 0;
    //     z-index: 9999995;
    //     opacity: 0;
    //     background: rgba(1,1,1,0.6);
    //     -webkit-transition: width 0.3s;
    //     -moz-transition: width 0.3s;
    //     transition: width 0.3s;
    // }
    // .overlay-active{
    //     background-repeat:no-repeat;
    //     background-position:center;
    //     background-size:auto 80%;
    //     opacity: 1;
    //     visibility: visible;
    // }
    // .imgClose{
    //     position:absolute;
    //     right:5%;
    //     top:5%;
    //     color:#fff;
    //     font-size:20px;
    //     padding:20px;
    // }
   

</style>