<script>
import { defineComponent, reactive, ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import RollcakeIcon from "../assets/icons/rollcake.png";
import PuffIcon from "../assets/icons/puff.png";
import CookieIcon from "../assets/icons/cookie.png";
import boxs from '../configs/box'

export default defineComponent({
  name: "CustomGiftBox",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const activeBox = reactive({})
    const onSwiper = (swiper) => {
      swiper.slideNext();
    };

    const onSlideChange = (swiper) => {
      activeBox.value = boxs[swiper.activeIndex]
    };

    const makeDummyProducts = function (title, length) {
      return Array.from({ length }).map((v, i) => {
        const n = i + 1;
        return {
          title: `${title} ${n}`,
          price: n * 5,
          inventory: 20,
        };
      });
    };

    const products = reactive({
      rollcake: {
        items: makeDummyProducts("Roll Cake", 12),
      },
      puff: {
        items: makeDummyProducts("Puff", 12),
      },
      cookie: {
        items: makeDummyProducts("Cookie", 12),
      },
    });

    const categories = reactive([
      {
        id: 1,
        key: "rollcake",
        icon: {
          url: RollcakeIcon,
        },
      },
      {
        id: 2,
        key: "puff",
        icon: {
          url: PuffIcon,
        },
      },
      {
        id: 3,
        key: "cookie",
        icon: {
          url: CookieIcon,
        },
      },
    ]);

    const activeProductCategory = ref('rollcake')

    function onChangeActiveProductCategory(key) {
      activeProductCategory.value = key
    }

    const activeProducts = computed(() => products[activeProductCategory.value].items)
  
    function toggleDescAreaSize() {
      const el = document.getElementById('ggg')
      if (el.offsetHeight === 90) {
        el.style.height = '35px'
      } else {
        el.style.height = '90px'
      }
    }
    return {
      onSwiper,
      onSlideChange,
      modules: [EffectCoverflow, Pagination],
      categories,
      activeProductCategory,
      activeProducts,
      onChangeActiveProductCategory,
      boxs,
      activeBox,
      toggleDescAreaSize
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
      <swiper-slide v-for="box of boxs" :key="box.title">
        <div class="ppp">
          <img :src="box.image_url">
        </div>
      </swiper-slide>
      <div id="ggg" v-if="activeBox.value" class="ggg" @click="toggleDescAreaSize">
        <div style="text-align:center;font-size:1.2rem;font-weight:bold;">{{ activeBox.value.title  }}</div>
        <div style="font-size:12px;">{{ activeBox.value.description }}</div>
      </div>
    </swiper>
    <div id="ProductCategorySection" style="background-color: #f3f3f3">
      <div class="category-icon-bar">
        <div
          v-for="category of categories"
          :key="category.id"
          class="icon-wrapper"
          @click="onChangeActiveProductCategory(category.key)"
        >
          <img :src="category.icon.url" />
        </div>
      </div>
    </div>
    <div id="ProductListSection">
      <div class="product-list-section-inner">
        <div class="product-list-section-inner__item" v-for="product of activeProducts" :key="product.title">
          <div class="product-list-section-inner__item__avatar">
            <img src="https://placehold.co/160x160/png" />
          </div>
          <div class="product-list-section-inner__item__body">
            {{ product.title }}
          </div>
          <div class="product-list-section-inner__item__footer">
            <span class="product-list-section-inner__item__footer__button"> - </span>
            <span class="product-list-section-inner__item__footer__number"> 0 </span>
            <span class="product-list-section-inner__item__footer__button"> + </span>
          </div>
        </div>
      </div>
    </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  overflow: hidden;
}
.ggg {
  color: #fff;
  height: 90px;
  width: 100%;
  bottom: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, .5);
  z-index: +1;
  padding: 5px;
}

.ppp img {
  height: 100%;
  width: auto;
}

.category-icon-bar {
  margin: 0 auto;
  width: 280px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  padding: 5px 0 5px 0;
  background-color: #f3f3f3;
}

.icon-wrapper {
  height: 100%;
  width: auto;
  flex: none;
  border: 5px solid rgb(243, 195, 132);
  border-radius: 50%;
  cursor: pointer;
  scale: 0.85;
  transition: all 0.2s linear;
  img {
    height: 100%;
    width: auto;
  }
}
.icon-wrapper:hover {
  scale: 1;
  background-color: rgb(243, 195, 132);
}

.product-list-section-inner {
  max-height: calc(100vh - 500px);
  overflow: auto;
  padding: 0 5px;
  display: flex;
  flex-wrap: wrap;
  background-color: #f3f3f3;
}
.product-list-section-inner__item {
  height: 60px;
  border: 2px solid rgb(243, 195, 132);
  display: flex;
  width: calc(100vw - 30px);
  flex: none;
  margin-bottom: 5px;
  padding-right: 5px;
}
.product-list-section-inner__item__avatar {
  height: 100%;
  width: 60px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
}
.product-list-section-inner__item__avatar img {
  height: 100%;
  width: auto;
}
.product-list-section-inner__item__body {
  height: 100%;
  width: auto;
  flex:auto;
}
.product-list-section-inner__item__footer {
  height: 100%;
  width: 120px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__button {
    font-size: 20px;
    border: 2px solid orange;
    width: 30px;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: orange;
    cursor: pointer;
    border-radius: 5px;
  }
  &__number {
    font-size: 32px;
  }
}
</style>