<template>
    <div class="wrap">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                msg: 'world'
            }
        },
        methods: {
            wxAuth: function() {
                alert('wx');
            }
        }
    }
</script>

<style lang='sass'>
    *{
        margin: 0;
        padding: 0;
    }
    body, html{
        width: 100%;
        height: 100%;
        font-family:"微软雅黑";
    }
    .wrap{
        width: 100%;
        height: 100%;
    }
</style>