<template>
  <div class="content">
    <div class="marks" v-if='isShowNav' @click="isShowNavHide"></div>
    <header class="g-header">
        <div @click="isShowNavShow" class="nav iconfont">&#xe615;</div>
        <div class="logo">{{typename}}</div>
    </header>
    <navLeft :menuActive="isShowNav"></navLeft>
    <section class="container">
        <div class="content_text" v-for='item in searchArr'>
            <div v-if="searchType.type == 10" class="text images">
                <img :src="item.image2" />
            </div>
            <div v-else-if="searchType.type == 29" class="text">
                {{item.text}}
            </div>
            <div v-else  class="text videos">
                <video preload='none' :src="item.video_uri" autobuffer controls ></video>
                <p style="margin-top:10px;font-size:14px;">{{item.text}}</p>
            </div>
            <div class="author-timer">
                <div class="author">
                    <div><img :src="item.profile_image" /></div>
                    <div>{{item.name}}</div>
                </div>
                <div class="timer">
                    <div><span style="vertical-align: baseline;" class="iconfont">&#xe616;</span> {{item.love}}</div>
                    <div><span style="vertical-align: -webkit-baseline-middle;" class="iconfont">&#xe634;</span> {{item.hate}}</div>
                </div>
            </div>
        </div>
        <div class="back_top" @click="click_top"></div>
    </section>
  </div>
</template>
<script>
    require('../assets/iconfont.css')
    require('../assets/css/common.css')
    import navLeft from './Nav'
    import $ from 'jquery'
    import utils from '../util/util.js';

    export default {
        components:{ navLeft },
        data () {
            return {
                active:true,
                isShowNav:false,
                isOneScroll:true,
                typename:'内涵段子',
                searchArr:[],
                searchType: {
                    page: 1,
                    type: 29,
                    showapi_appid:32243,
                    showapi_timestamp:new Date().getTime(),
                    showapi_sign:'dba306c8687a47e7b511c74768249ff1'
                }
            }
        },
        mounted(){
            if(this.$route.query.type){
                this.searchType.type = this.$route.query.type
            }
            this.isOneScroll && this.getDatas();
            $(window).on('scroll', utils.throttle(this.getScrollData, 300, 1000));
        },
        methods:{
           isShowNavShow(){
                $('body').addClass('scroll-hide')
                this.isShowNav = !this.isShowNav
           },
           isShowNavHide(){
                $('body').removeClass('scroll-hide')
                this.isShowNav = !this.isShowNav
           },
           click_top(){
                $(window).scrollTop(0);
           },
           getTypeName(){
                switch(this.searchType.type){
                    case '10':
                        this.typename = '内涵图片'
                    break;
                    case '29':
                        this.typename = '内涵段子'
                    break;
                    case '41':
                        this.typename = '内涵视频'
                    break;
                }
           },
           //获取数据
           getDatas(){
                const parm = $.param(this.searchType)
                const self = this
                $.get('http://route.showapi.com/255-1?' + parm, function(data) {
                    switch(data.showapi_res_code){
                        case -3:
                            self.$alert('服务器出现异常请稍后再试')
                        break;
                        case -6:
                            self.$alert('系统异常。读取错误。')
                        break;
                    }
                    // delete data.showapi_res_body['ret_code']
                    self.mergeData(data.showapi_res_body.pagebean.contentlist);
                });
           },
           mergeData(data){
                const arr = []
                for(const item in data){
                    arr.push(data[item])
                }
                this.searchArr = this.isOneScroll ? arr : this.searchArr.concat(arr)
           },
           getScrollData(){
                let totalheight = parseInt($(window).height(), 20) + parseInt($(window).scrollTop(), 20);
                if ($(window).scrollTop() + 700 >= $('.container').height()) {
                    this.isOneScroll = false;
                    this.searchType.page += 1;
                    this.getDatas();
                }
           }
        },
        watch: {
            '$route' (to,from){
                this.searchArr = [];
                this.searchType.type = this.$route.query.type
                this.searchType.page = 1
                this.getDatas()
                this.isShowNav = !this.isShowNav
                $('body').removeClass('scroll-hide')
            },
            searchType : {
                handler () {
                    this.getTypeName()
                },
                deep:true
            }
        }
    }

</script>

<style type="text/css">
    * {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-user-select: none;
        outline: 0;
        -webkit-tap-highlight-color: transparent;
        -webkit-tap-highlight-color: transparent;
        margin: 0px;
        padding: 0px;
    }
    .isActive{
        display:none
    }
    #app{
        width: 100%;
        padding:0px;
        margin: 0px auto;
    }
    .content{
        position: absolute;
        left: 0;
        right: 0;
        height: 100%;
        top:45px;
    }
    .g-header{
        display:flex;
        flex-flow: row;
        justify-content: space-between;
        border-bottom:1px solid #cccccc;
        box-shadow: 0 0 .5px #cccccc;
        line-height: 44px;
        padding:0 10px;
        cursor: pointer;
        position:fixed;
        left:0;
        right:0;
        top:0;
        background-color: #ffffff;
        z-index:9;
    }
    .g-header .logo{
       margin: 0 auto;
       display: block;
    }
    .container{
        display:flex;
        flex-flow: wrap;
        width:100%;
        margin-top:10px;
        padding: 0 2%;
    }
    .content_text{
        box-sizing: border-box;
        width:100%;
        padding:2%;
        box-shadow: 0 0 .5px #cccccc;
        border-radius: 5px;
        position:relative;
        margin-bottom: 10px;
        border: 1px solid #cccccc;
    }
    .content_text .text{
        flex:1;
        font-size: 14px;
        letter-spacing: 1.5px;
        padding:5px;
    }
    .content_text .images>img,.content_text .videos>video{
        width:100%;
    }
    .content_text .author-timer{
        flex:1;
        display:flex;
        flex-flow: row;
        height:30px;
        margin-top:2%;
    }
    .author-timer .author, .author-timer .timer{
        flex:1;
        font-size: 12px;
        color:#666666;
    }
    .author-timer .author>div, .author-timer .timer>div{
        float:left;
        line-height: 30px;
    }
    .author-timer .timer>div{
        width:50%;
        text-align: center;
    }
    .author-timer .author>div:first-child{
        width:30px;
        height:30px;
    }
    .author-timer .author>div:last-child{
        padding-left:5px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 80%;
    }
    .author-timer .author>div:first-child img{
        width:100%;
        height:100%;
        border-radius: 100%;
    }
    .marks{
        position:fixed;
        left: 0;
        right:0;
        top:0;
        bottom:0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 999;
    }
    .scroll-hide {
        height: 100%;
        overflow: hidden;
    }
    .back_top{
        position:fixed;
        bottom:5%;
        width:32px;
        height:32px;
        background:url(../assets/img/top.png) no-repeat;
        background-size: cover;
        right:5%;
    }
</style>