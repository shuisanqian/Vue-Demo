<template>
    <transition name="slide-fade">
        <div class="left" v-if="menuActive">
            <ul class="u-list">
                <li><div class="l-header"><img src="../assets/img/timg.jpg"></div></li>
                <router-link tag="li" :to="{'name':'main',query:{type:'29'}}"> <span class="iconfont">&#xe604;</span> 内涵段子</router-link>
                <router-link tag="li" :to="{'name':'main',query:{type:'10'}}"> <span class="iconfont">&#xe674;</span> 内涵图片</router-link>
                <router-link tag="li" :to="{'name':'main',query:{type:'41'}}"> <span class="iconfont">&#xe622;</span> 内涵视频</router-link>
            </ul>
        </div>
    </transition>
</template>
<script>
    export default {
        props:['menuActive'],
        data () {
            return {
               
            }
        }
    }


</script>
<style type="text/css">
    .slide-fade-enter-active {
      transition: all .5s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateX(-10px);
      opacity: 0;
    }
    .left{
        position: fixed;
        left: 0px;
        top:0px;
        width:180px;
        height:100%;
        background-color: #fff;
        border:1px solid #cccccc;
        z-index: 9999;
    }
    .u-list{
        width:100%;
    }
    .u-list>li{
        line-height: 45px;
        position:relative;
        font-size: 14px;
        padding-left: 16px;
    }
    .u-list>li:hover{
        background-color: rgba(239, 239, 239, 0.99);
        cursor:pointer;
    }
    .u-list>li:before{
        position:absolute;
        content:'';
        left:0px;
        bottom: 0;
        right: 0;
        height:1px;
        background-color: #e5e5e5;
    }
    .u-list>li:first-child{
        padding-top:5px;
        padding-bottom: 5px;
        margin-left:-16px;
    }
    .u-list>li .iconfont{
        color: #56e5d3;
        font-size: 24px;
    }
    .l-header{
        width: 60px;
        height: 60px;
        border-radius: 100%;
        border: 1px solid #e5e5e5;
        margin:0 auto;
    }
    .l-header>img{
        width: 100%;
        height:100%;
        margin: 0 auto;
        border-radius: 100%;
    }
</style>