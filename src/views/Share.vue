<template>
    <div class="share-page">
        <div class="share-container">
            <div class="share-title">参加邢帅教育&汪汪配APP封面"微笑达人"招募赢马尔代夫旅游/免费个人写真大奖，快来支持我吧！</div>
            <div class="share-nick">昵称：XXX</div>
            <div class="share-img"><img src="../assets/images/upload.png" /></div>
            <div class="share-vote">
                <span>全国支持率10%</span>
                <a @click="vote()">投票</a>
            </div>
            <div class="share-link">
                <a class="link-item" href="javascript:;" @click="showShare()">分享给小伙伴拉票</a>
                <a class="link-item" v-link="{name: 'home'}">我也要参加</a>
                <a class="link-item" v-link="{path: '/rank', query:{ id: shareId }}">查看全国排行榜</a>
            </div>
            <span>传过来的id为：{{shareId}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        ready: function() {
            console.log('fdfsdf:'+this.shareId);
        },
        data: function() {
            return {
                shareId: '',
                nickname: '',
                pic: ''
            }
        },
        methods: {
            vote: function() {
                alert('投票成功！');
            },
            showShare: function() {
                alert('share');
            }
        },
        route: {
            data: function({to}) {
                if(to.query && to.query.id){
                    this.shareId = to.query.id;
                    console.log(to.query.id);
                }
            }
        }
    }
</script>

<style lang="sass">
    @import "../assets/scss/share.scss";
</style>