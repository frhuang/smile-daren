<template>
    <div class="su-page">
        <div class="su-container">
            <div class="su-input"><span>昵称：</span><input type="text" class="su-name"></div>
            <div class="su-input"><span>手机：</span><input type="tel" class="su-tel"></div>
            <div class="su-input su-clear">
                <p class="su-title">范例：</p>
                <ul>
                    <li class="li-item"><img src="../assets/images/2.jpg" /></li>
                    <li class="li-item"><img src="../assets/images/3.jpg") /></li>
                    <li class="li-item"><img src="../assets/images/4.jpg" /></li>
                </ul>
            </div>
            <div class="su-upload">
                <span>提交照片:</span>
                <img class="upload-img" src="../assets/images/upload.png"/>
                <input name="fileToUpload" id="upload-file" style="display: none;" accept="image/*" type="file" />
            </div>
            <a class="su-input su-welfare" href="javascript:;" @click="showWelfare()">点这里送福利：线下免费拍摄照片写真</a>
            <a class="su-submit" href="javascript:;" @click="submit()">点击提交</a>
        </div>
        <div class="welfare-page" @click="hideWelfare()">
            <div class="welfare-container">
                <p>汪汪配APP限时福利：免费拍摄个人写真 </p>
                <p>1、请发送个人简历+照片至邮箱：</p>
                <p>252724496@qq.com</p>
                <p>如有疑问，可拨打电话：15017541509或联系QQ：252724496   or  QQ群报名：562940029</p>
                <p>2、拍摄地点：广东省广州市中山大道西305号邢帅教育大厦(请自带拍摄服装，仅限广州地区)</p>
            </div>
        </div>
        <div class="pic-mask">
            <img class="mask-img" />
        </div>
    </div>
</template>
<script>
    export default{
        data: function() {
            return {
                uploadImg: "",
                isSubmit: false
            }
        },
        ready: function() {
            var self = this;
            $('.upload-img').click(function() {
                $('#upload-file').click();
            })
            $('#upload-file').on('change', function() {
                if(this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e){
                        self.uploadImg = e.target.result;
                        $('.upload-img').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            });

            $('.li-item img').click(function() {
                $('.pic-mask').show();
                $('.mask-img').attr('src', $(this).attr('src'));
            });

            $('.pic-mask').click(function() {
                $(this).hide();
            });

        },
        methods: {
            showImg: function(e) {
                console.log(e);
            },
            showWelfare: function() {
                $('.welfare-page').show();
            },
            hideWelfare: function(){
                $('.welfare-page').hide();
            },
            submit: function() {
                var name = $('.su-name').val();
                var tel = $('.su-tel').val();
                var reg = /^1[0-9]{10}$/;
                console.log(name, tel, reg.test(tel));
                if(name == '') {
                    alert('请填写昵称！');
                    return;
                }else if(!reg.test(tel) || tel == '') {
                    alert('请填写正确的电话号码！')
                    return;
                }else if(this.uploadImg == "") {
                    alert('请上传图片！')
                    return;
                }
                this.$route.router.go({name: "share", query: {id: new Date().getTime()}});
            }
        }
    }
</script>
<style lang='sass' scoped>
    @import "../assets/scss/signup.scss";
</style>