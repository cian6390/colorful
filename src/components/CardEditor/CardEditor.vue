<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
} from "vue";
import { useCardEditor } from "./CardEditor";

/** child components */
import MainToolBar from "./MainToolBar.vue";
import CardBook from "./CardBook.vue";
import TextForm from "./TextForm.vue";
import StickerBook from './StickerBook.vue'

/** data and assets */
import cardsSource from "../../configs/cards";
import stickersSource from "../../configs/stickers";
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/vue/24/outline'

export default defineComponent({
  name: "CardEditor",
  components: {
    CardBook,
    TextForm,
    MainToolBar,
    StickerBook,
    MagnifyingGlassMinusIcon,
    MagnifyingGlassPlusIcon
  },
  setup() {
    let editor;
    let canvas;
    let cardImage;
    let canvasSize = ref('large')

    const isDevMode = ref(import.meta.env.MODE === "development")

    const cards = reactive(cardsSource)
    const stickers = reactive(stickersSource)

    const fontsAreReady = ref(false);
    const sampleIsReady = ref(false);

    const targetObject = ref(null);
    const targetObjectIndex = ref(null);
    const targetDetailPanel = ref(null);

    const initialed = computed(() => {
      return fontsAreReady.value && sampleIsReady.value;
    });

    function toggleCanvasSize() {

      if (canvasSize.value === 'large') {
        const dWidth = window.innerWidth
        const dHeight = dWidth * (4/7)

        canvas.setDimensions({ width: `${dWidth}px`, height: `${dHeight}px` }, { cssOnly: true })
        cardImage.style.width = `${dWidth}px`
        canvasSize.value = 'small'
      } else {
        canvas.setDimensions({ width: `700px`, height: `400px` }, { cssOnly: true })
        cardImage.style.width = `700px`
        canvasSize.value = 'large'
      }
      canvas.renderAll()
    }

    onMounted(() => {
      editor = useCardEditor("CardEditorCanvas", 700, 400);
      canvas = editor.canvas;

      onToolPicked("card-book");

      function handleSelected(e) {
        if (e.selected.length > 1) {
          return;
        } else {
          const selectObject = e.selected[0];
          targetObject.value = selectObject;
          targetObjectIndex.value = canvas.getObjects().indexOf(selectObject);
        }
      }

      canvas.on("selection:created", (e) => {
        handleSelected(e);
      });

      canvas.on("selection:updated", (e) => {
        handleSelected(e);
      });

      canvas.on("selection:cleared", (e) => {
        targetObject.value = null;
        targetObjectIndex.value = null;
      });

      document.fonts.ready.then((fontFaceSet) => {

        fontsAreReady.value = true;

        changeCanvasBackground({ card: cards[0] })

        // example 裡面會有字型，所以要等自行準備好後才可以放置
        editor.setupExample()

        sampleIsReady.value = true

        selectTool('text-form')

        calcViewHeight()
      });
    });

    function calcViewHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    function onToolPicked(target) {
      if (target === 'text-form') {
        const text = editor.addText('新增文字', {
          fontSize: 24,
          left: 100,
          top: 50,
          width: 150,
          fill: '#333',
          fontFamily: 'Nunito'
        })
        editor.canvas.setActiveObject(text);
      }
      selectTool(target)
    }

    function selectTool(target) {
      targetDetailPanel.value = target;
    }

    function download() {
      editor.download();
    }

    function changeCanvasBackground(data) {

      cards.forEach(c => {
        c.selected = c.title === data.card.title
      })

      const card = data.card;
      let img = document.getElementById("CardImage");
      if (!img) {
        img = document.createElement("img");
        img.setAttribute("id", "CardImage");
        img.style.width = "700px";
        img.style.height = "auto";
        document.querySelector(".canvas-container").append(img);
      }
      cardImage = img
      img.src = card.image_url;
    }

    const vw = window.innerWidth
    window.addEventListener('resize', e => {
      e.preventDefault()
      if (vw === window.innerWidth) {
        return
      }

      calcToolPanelHeight()
    })

    function onStickerPicked(sticker) {
      const img = new Image
      img.addEventListener('load', () => {
        editor.addImage(img)
      })
      img.src = sticker.file_path
    }

    function deleteTargetObject() {
      const _targetObject = canvas.getActiveObject()
      canvas.remove(_targetObject);
      targetObject.value = null
    }

    return {
      canvasSize,
      isDevMode,
      cards,
      stickers,
      initialed,
      download,
      targetObject,
      targetObjectIndex,
      targetDetailPanel,
      changeCanvasBackground,
      onToolPicked,
      onStickerPicked,
      toggleCanvasSize,
      deleteTargetObject
    };
  },
});
</script>
<template>
  <div id="CardEditorApp">
    <div id="TopBar">
      <div v-if="canvasSize === 'large'" @click="toggleCanvasSize">
        <MagnifyingGlassMinusIcon style="height: 20px" />
      </div>
      <div v-if="canvasSize === 'small'" @click="toggleCanvasSize">
        <MagnifyingGlassPlusIcon style="height: 20px" />
      </div>
      <div v-if="isDevMode" class="top-bar__item" @click="download">download</div>
    </div>
    <div id="CardEditorCanvasContainer">
      <canvas id="CardEditorCanvas"></canvas>
    </div>
    <div id="DetailPanel" style="overflow: auto;">
      <button v-if="targetObject" @click="deleteTargetObject">刪除物件</button>
      <div v-show="targetDetailPanel === 'card-book'">
        <CardBook :cards="cards" @cardSelected="changeCanvasBackground" />
      </div>
      <div v-show="targetDetailPanel == 'sticker-book'">
        <StickerBook :stickers="stickers" @stickerPicked="onStickerPicked" />
      </div>
      <div v-if="targetDetailPanel === 'text-form'">
        <TextForm />
      </div>
    </div>
    <div class="main-tool-bar-container">
      <MainToolBar @toolPicked="onToolPicked" />
    </div>
  </div>
</template>
<style lang="scss">
#CardEditorApp {
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

#CardEditorCanvasContainer {
  flex: none;
  width: 100%;
  height: 400px;
  overflow-x: auto;
}

#TopBar {
  flex: none;
  height: 45px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 15px;
}

.main-tool-bar-container {
  flex: none;
  height: 80px;
}

#DetailPanel {
  flex: auto;
}
</style>