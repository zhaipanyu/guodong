<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div id="map">
        </div>
    </transition>
</template>
<script>
    export default {
        data(){
            return {
                imgHeight:'80%'
            }
        },
        props: ['mapData'],
        methods: {

        },
        mounted(){

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