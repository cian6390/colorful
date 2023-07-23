<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
} from "vue";

import { CloudArrowUpIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "StickerBook",
  components: {
    CloudArrowUpIcon,
  },
  props: ["stickers"],
  setup(props, { emit }) {
    const stickers = reactive(props.stickers);
    const ownStickers = reactive([]);

    function onImageSelect(e) {
      const files = e.target.files;
      if (files.length > 0) {
        Object.values(files).map((file, i) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            ownStickers.push({
              id: Math.random().toString(16).slice(2),
              file_path: event.target.result,
            });
          };
          reader.readAsDataURL(file);
        });
      }
      document.getElementById("FileUploadForm").reset();
    }

    function clickFileInput() {
      document.getElementById('FileInput').click()
    }

    function pickSticker(sticker) {
      emit('sticker-picked', sticker)
    }

    return {
      stickers,
      ownStickers,
      clickFileInput,
      onImageSelect,
      pickSticker
    };
  },
});
</script>
<template>
  <div>
    <form v-show="false" id="FileUploadForm">
      <input
        type="file"
        multiple
        id="FileInput"
        accept="image/gif, image/jpeg, image/png"
        @change="onImageSelect"
      />
    </form>
    <div class="sticker-list">
      <div
        class="sticker-list__item"
        v-for="sticker of stickers"
        :key="sticker.id"
        @click="pickSticker(sticker)"
      >
        <img :src="sticker.file_path" />
      </div>
    </div>
    <div class="sticker-list">
      <div class="my-upload" @click="clickFileInput">
        <div><CloudArrowUpIcon style="height: 20px" /></div>
        <div>上傳</div>
      </div>
      <div
        class="sticker-list__item"
        v-for="sticker of ownStickers"
        :key="sticker.id"
        @click="pickSticker(sticker)"
      >
        <img :src="sticker.file_path" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sticker-list {
  display: flex;
  width: 100%;
  padding: 0 15px;
  &__item {
    width: 90px;
    height: 90px;
    margin-right: 15px;
    scale: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    &:hover {
      scale: 0.9;
      cursor: pointer;
    }
    img {
      height: 100%;
      width: auto;
    }
  }
}

.my-upload {
  width: 90px;
  height: 90px;
  margin-right: 15px;
  border: 2px solid orange;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: orange;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
}
</style>