<template>
  <div class="swiper-banner">
    <div
        ref="videoSwiper"
        class="swiper-container swiper-container-banner swiper-no-swiping"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide new-slide">
          <div class="item" style="cursor: pointer">
            <img class="img-banner" :src="ceshiImg" alt="demo" />
          </div>
        </div>
        <div class="swiper-slide new-slide">
          <div class="item" style="cursor: pointer">
            <video
                class="swpierClass video-js"
                muted
                poster
                preload
                loop
                autobufer="true"
                webkit-playsinline
                playsinline
                x5-video-player-type="h5"
            >
<!--              :style="`background-image: url(${ apiUrl + item.cover_clip });background-size:cover`"-->
              <source :src="ceshiVideo" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import $ from 'jquery'
import "swiper/css/swiper.min.css"
export default {
  name: "index",
  data(){
    return {
      ceshiImg: require('@/assets/images/1.jpg'),
      ceshiVideo: require('@/assets/video/1.mp4')
    }
  },
  mounted() {
    this.$nextTick(() => {
      const bullet = document.getElementsByClassName("swiper-pagination-bullet");
      const mySwiper = new Swiper(".swiper-container-banner", {
        direction: "horizontal", // Swiper的滑动方向,可设置为水平方向切换 horizontal（默认） 或垂直方向切换 vertical
        slidesPerView: 1, // Swiper的列数
        // 设置分页器
        pagination: {
          el: ".swiper-pagination",
          // 设置点击可切换
          clickable: true,
          renderBullet(index, className) {
            return (
                '<div class="' + className + '"><span></span><i></i></div>'
            );
          },
        },
        // 设置自动轮播
        // autoplay: {
        // 	delay: 8000, // 8秒切换一次
        // 	disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        // },
        preventClicksPropagation: true,
        loop: true, //无缝轮播
        on: {

          slideChangeTransitionStart: function(){
            var _target = this;
            var curVideo = this.$el.find(".swiper-slide-active").find("video");

            //暂停所有视频
            function pauseAll(ele){
              ele.find("video").each(function(){
                $(this)[0].pause();
              });
            }
            pauseAll(this.$el);
            //轮播间隔时间
            _target.params.autoplay.delay = 8000;
            //判断当前激活元素是否有视频
            if(curVideo.length > 0){
              this.autoplay.stop();
              curVideo[0].removeEventListener('canplay', function (){}, false);
              curVideo[0].addEventListener('canplay',function (){
                console.log("加载完");
                for (let i = 0; i < _target.pagination.bullets.length; i++) {
                  bullet[i].lastChild.style.animationPlayState = 'running'
                }
                _target.autoplay.start();
              })
              setTimeout(()=>{
                curVideo[0].currentTime = 0;
                curVideo[0].muted = true;
                curVideo[0].volume = 0;
                console.dir(curVideo[0])
                curVideo[0].play();
              },200);
              curVideo[0].removeEventListener('ended', function (){}, false);
              curVideo[0].addEventListener('ended', function (){
                _target.slideNext();
              }, false);
            }else{
              console.log("无视频！");
              setTimeout(()=>{
                for (let i = 0; i < _target.pagination.bullets.length; i++) {
                  bullet[i].lastChild.style.animationPlayState = 'running'
                }
              },0)
              _target.params.autoplay.delay = 8000;
              _target.autoplay.start();
            }
          },

        },
      });
      for (let i = 0; i < mySwiper.pagination.bullets.length; i++) {
        bullet[i].lastChild.style.animationPlayState = 'paused'
      }

    });
  }
}
</script>


<style scoped lang="scss">
::v-deep{
  .swiper-container {
    .swiper-pagination-bullet:only-child{
      display: none !important;
    }
    .swiper-slide {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      text-align: center;
      font-size: 18px;
      background: transparent;
      .item{
        width: 100%;
        height: 100%;
        display: inline-block;
        .pos-img{
          width: 473px;
          height: 391px;
          position: absolute;
          right: 100px;
          bottom: 72px;
          z-index: 1;
          object-fit: cover;
        }
      }
      .swpierClass{
        position: absolute;
        height: 100%;
        width: 100%;
        top: 50%;
        left: 50%;
        z-index: -1;
        transform: translate(-50%,-50%);
        object-fit: cover;
        background-size: cover;
        background-position: 50%;
        background-repeat: no-repeat
      }
      .img-banner{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      video {
        display: inline-block;
        height: 100vh;
        position: relative;
        transform: none;
        left: 0;
        top: 0;
        width: 100vw;
        object-fit: cover;
      }
    }
    .swiper-pagination{
      text-align: center;
      left :0;
      bottom:40px
    }
    .swiper-pagination-bullet {
      background-color: transparent;
      opacity: 1;
      margin: 0 6px !important;
      width: 36px;
      height: 5px;
      position: relative;
      outline: none;
      vertical-align: middle;
    }
    .swiper-pagination-bullet span {
      width: 36px;
      height: 5px;
      background-color: #fff;
      display: block;
      vertical-align: middle;
    }
    .swiper-pagination-bullet i {
      background-color: #cc000d;
      vertical-align: middle;
      width: 36px;
      height: 5px;
      position: absolute;
      top: 0px;
      transform: scaleX(0);
      transform-origin: left;
      z-index: 3;
      transition-timing-function: ease-in-out;
    }
    .swiper-pagination-bullet-active i {
      animation: middle 8s forwards; //与autoplay delay的时间保持一致
    }
  }

}
@keyframes middle {
  0% {
    transform: scaleX(0);
    left: 0;
  }
  100% {
    transform: scaleX(1);
    left: 0;
  }
}
</style>