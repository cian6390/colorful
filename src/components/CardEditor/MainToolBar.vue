<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
} from "vue";
import cards from "../../configs/cards";
import {
  PhotoIcon,
  DocumentIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/outline";

export default defineComponent({
  name: "MainToolBar",
  components: {
    PhotoIcon,
    DocumentIcon,
    PencilSquareIcon,
  },
  setup(props, { emit }) {

    function pickToot(name) {
      emit('tool-picked', name)
    }

    return { cards, pickToot };
  },
});
</script>
<template>
  <div id="MainToolBar" style="display: flex">
    <div class="tool-panel__item" @click="pickToot('card-book')">
      <div>
        <DocumentIcon class="font-icon" style="transform: rotate(-90deg)" />
      </div>
      <div>卡片</div>
    </div>
    <div
      class="tool-panel__item"
      @click="pickToot('sticker-book')"
    >
      <div>
        <PhotoIcon class="font-icon" />
      </div>
      <div>貼圖</div>
    </div>
    <div class="tool-panel__item" @click="pickToot('text-form')">
      <div>
        <PencilSquareIcon class="font-icon" />
      </div>
      <div>文字</div>
    </div>
  </div>
</template>

<style lang="scss">
#MainToolBar {
  width: 100%;
  height: 80px;
  overflow-x: auto;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ccc;
}

.font-icon {
  height: 20px;
}

.tool-panel__item {
  width: 80px;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: gray;
  }
}
</style>