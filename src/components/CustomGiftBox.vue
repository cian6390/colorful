<script>
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
export default defineComponent({
  name: "CustomGiftBox",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
        swiper.slideNext()
    //   console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [EffectCoverflow, Pagination],
    };
  },
});
</script>
<template>
  <div id="CustomGiftBox">
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="false"
      :modules="modules"
      class="mySwiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide><div class="ppp">Box 1</div></swiper-slide>
      <swiper-slide><div class="ppp">Box 2</div></swiper-slide>
      <swiper-slide><div class="ppp">Box 3</div></swiper-slide>
      ...
    </swiper>
  </div>
</template>

<style lang="scss">
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 280px;
  height: 280px;
}
.ppp {
  width: 100%;
  height: 100%;
  text-align: center;
  border: 2px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
}
</style>