<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div class="img-view">
            <!-- 遮罩层 -->
            <div class="img-layer ">
                <div class="img" style="height:100%;width:100%;overflow:hidden;">
                    <a href="javascript:void(0)"><span @click="bigImg" class="el-icon-close pa" style="z-index:99999;right:50px;top:50px; color:#fff;font-size:30px;"></span></a>
                    <div class="imgWrapper pr" style="height:100%;width:100%;overflow:hidden">
                        <a href="javascript:void(0)" style="display:none;" class="pa" v-for="item in bigImgs"><img height="100%" :src="item.pic"></a>
                        <span><a v-show="bigImgs.length!=1"  href="javascript:void(0)" @click="changeImg('left')" class=" pa big-leftbutton" style="padding:50px 20px; font-size:60px;left:10%;top:45%;color:#fff;"></a></span>
                        <span><a v-show="bigImgs.length!=1"  href="javascript:void(0)" @click="changeImg('right')"  class=" pa big-rightbutton" style="padding:50px 20px; font-size:60px;right:10%;top:45%;color:#fff;"></a></span>
                        <span><a href="javascript:void(0)" @click="changeImg('big')"  class=" pa changebig-button" style="left:45%;bottom:30px;color:#fff;"></a></span>
                        <!--<span><a href="javascript:void(0)" @click="changeImg('original')"  class=" pa original-picture-button" style="left:45%;margin-left:60px;bottom:30px;color:#fff;"></a></span>-->
                        <span><a href="javascript:void(0)" @click="changeImg('small')"  class=" pa changesmall-button" style="left:45%;margin-left:120px;bottom:30px;color:#fff;"></a></span>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>
<script>
    export default {
        data(){
          return {
              initScale:1,
              initTranslateX:0,
              initTranslateY:0,
              countLeft:0,
              countRight:0
          }
        },
        props: ['imgIndex','bigImgs'],
        methods: {
            changeHeight(num){
                let _y=0,_x=0,n=this.initScale,
                    $img = $('.imgWrapper>a>img');
                if(num instanceof Array){
                    _x = num[0];
                    _y = num[1];
                } else {
                    n += (Number.parseInt(num)/100||0);
                    if(n>3){
                        n = 3;
                    } else if(n<0.4){
                        n = 0.4;
                    } else if(num===0){
                        n = 1;
                    }
                    this.initScale = n;
                }
                $img.css('transform','scale('+n+','+n+')'+' translate('+_x/n+'px,'+_y/n+'px)');
            },
            getMousePos(event) {
                var e = event || window.event;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                var x = e.pageX || e.clientX + scrollX;
                var y = e.pageY || e.clientY + scrollY;
                return { 'x': x, 'y': y };
            },
            changeImg(str){
                switch (str){
                    case 'left':
                        this.countLeft++;
                        this.countRight = 0;
                        if(this.countLeft>this.bigImgs.length-1){
                            this.$message({
                                message: '已经浏览完毕！',
                                type: 'warning'
                            });
                            return;
                        }
                        this.bigImgs.unshift(this.bigImgs.pop());
                        break;
                    case 'right':
                        this.countRight++;
                        this.countLeft = 0;
                        if(this.countRight>this.bigImgs.length-1){
                            this.$message({
                                message: '已经浏览完毕！',
                                type: 'warning'
                            });
                            return;
                        }
                        this.bigImgs.push(this.bigImgs.shift());
                        break;
                    case 'big':
                        this.changeHeight(20);
                        break;
                    case 'small':
                        this.changeHeight(-20);
                        break;
                    case 'original':
                        this.changeHeight();
                        break;
                }
            },
            bigImg() {
                // 发送事件
                this.$emit('clickit')
            }
        },
        mounted(){
            let fn = this.changeHeight,
                $domImg = $('.imgWrapper> a').eq(this.imgIndex),
                $img = $domImg.children('img'),
                self = this;
            $domImg.fadeIn().siblings('a').fadeOut();
            $domImg.on("mousewheel DOMMouseScroll", function (e) {
                let num = e.originalEvent.wheelDelta / 6;
                fn(num);
            });
            let a = function() {
                let $document = $(document),
                    startX=0, startY=0,x,y;
                $domImg.css({
                            top:'0',
                            left:'0',
                            right:'0',
                            height:'100%'
                        });
                $img.on('mousedown', function(event) {
                        event.preventDefault();
                        let matrixArr = $(this).css('transform').replace(/[\)]|[\(]/g,'').split(',');
                        x = Number.parseInt(matrixArr[4])|| 0;
                        y = Number.parseInt(matrixArr[5])|| 0;
                        startX = event.clientX;
                        startY = event.clientY;
                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                    });
                function mousemove(event) {
                    let _width = $img.width(),
                        _height = $img.height(),
                        _offsetWidth = $img.offset().left,
                        _offsetHeight = $img.offset().top;
                    let __x = event.clientX - startX + x,
                        __y = event.clientY - startY + y;
                    if(_offsetWidth < -_width+20){
                        __x += 20;
                    }
                    if(_offsetWidth>event.clientX-20){
                        __x -=20
                    }
                    if(_offsetHeight < -_height+20){
                        __y += 20;
                    }
                    if(_offsetHeight>event.clientY-20){
                        __y -= 20
                    }
                    self.changeHeight([__x,__y]);

                }
                function mouseup(){
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }
            };
            a()
        }
    }
</script>
<style scoped>
    /*动画*/
    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s linear;
        transform: translate3D(0, 0, 0);
    }

    .fade-enter,
    .fade-leave-active {
        transform: translate3D(100%, 0, 0);
    }


    /* bigimg */

    .img-view {
        position: relative;
        width: 100%;
        height: 100%;
    }

    /*遮罩层样式*/
    .img-view .img-layer {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    .img-view .img{
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .img>img:hover{
             cursor:pointer
         }
    .img .big-leftbutton{
        background: url(../../../assets/big-leftbutton.png) no-repeat left;
    }
     .img .big-rightbutton{
         background: url(../../../assets/big-rightbutton.png) no-repeat right;
    }
    .img .changesmall-button{
        background: url(../../../assets/changesmall-button.png) no-repeat;
        width: 40px;
        height: 40px;
    }
    .img .original-picture-button{
        background: url(../../../assets/original-picture.png) no-repeat;
        width: 40px;
        height: 40px;
    }
    .img .changebig-button{
        background: url(../../../assets/changebig-button.png) no-repeat;
        width: 40px;
        height: 40px;
    }
    /*不限制图片大小，实现居中*/
   /* .img-view .img img {
        max-width: 100%;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top:0;
        margin: auto;
        z-index: 1000;
    }*/
    #left,#right{
        color:#fff;
        z-index:999;
    }
</style>