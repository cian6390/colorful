<script>
import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import { defineComponent, ref, reactive, watch } from "vue";
import cards from "../configs/cards";

export default defineComponent({
  name: "CustomCard",
  setup() {
    const activeCard = ref(null);

    const design = reactive({
      fontFamily: "Nunito",
      sentences: [
        {
          text: "To mom ~",
          fontSize: 20,
          fontColor: {
            name: "Pink",
            hex: "pink",
          },
          position: {
            x: 50,
            y: 60,
          },
        },
        {
          text: "身體健康，事事順心，天天開心 ！！",
          fontSize: 12,
          fontColor: {
            name: "Dark Gray",
            hex: "#333",
          },
          position: {
            x: 80,
            y: 110,
          },
        },
      ],
    });

    let dragEventListeners = [];

    function cleanDragEventListeners() {
      if (dragEventListeners.length > 0) {
        dragEventListeners.forEach((el, i) => {
          el.off("dragend.namespace");
        });
        dragEventListeners = [];
      }
    }

    function reDraw() {
      const cardElement = document.getElementById("CardContent");
      cardElement.innerHTML = "";
      cleanDragEventListeners()

      var draw = SVG().addTo(cardElement).size(400, 260);

      design.sentences.forEach((sentence) => {
        draw.text((add) => {
          console.log(add)
          const tspan = add
            .fill(sentence.fontColor.hex)
            .font({ family: `${design.fontFamily}, Noto Sans TC` , size: `${sentence.fontSize}pt` })
            .tspan(sentence.text)
            .x(sentence.position.x)
            .y(sentence.position.y)
          tspan.draggable();

          const e = tspan.on("dragend.namespace", function (event) {
            const { x, y } = event.detail.box;
            sentence.position.x = x;
            sentence.position.y = y;
          });
          dragEventListeners.push(e);
        });
      });
    }

    let f = 0;
    function onCardChange(card) {
      activeCard.value = card;
      if (f === 0) {
        f = 1;
        setTimeout(() => {
          reDraw();
        }, 0);
      }
    }

    const fonts = [
      {
        title: 'Nunito',
        value: 'Nunito'
      }, {
        title: 'Roboto',
        value: 'Roboto'
      },{
        title: 'Press Start 2P',
        value: 'Press Start 2P'
      }, {
        title: 'Noto Sans TC',
        value: 'Noto Sans TC'
      }, {
        title: '仿宋體',
        value: '仿宋體'
      }, {
        title: '明體',
        value: '明體'
      }
    ]

    return { cards, onCardChange, activeCard, design, reDraw, fonts };
  },
});
</script>
<template>
  <div id="CustomCard">
    <div class="kkk">
      <div
        class="kkk__item"
        :class="{ active: activeCard && activeCard.title == card.title }"
        v-for="card of cards"
        :key="card.title"
        @click="onCardChange(card)"
      >
        <img :src="card.image_url" :alt="card.title" />
      </div>
    </div>
    <div v-if="activeCard">
      <div class="outer-jjj">
        <div
          id="CardContent"
          class="jjj"
          :style="{ 'background-image': `url(${activeCard.image_url})` }"
        >
          <!-- SVG will draw over here -->
        </div>
      </div>
      <div>
        <div style="text-align: center; margin-bottom: 15px">
          <label style="margin-right: 15px">Font style</label>
          <select v-model="design.fontFamily" @change="reDraw">
            <option v-for="font of fonts" :key="font.value" :value="font.value" :selected="design.fontFamily === font.value">{{ font.title }}</option>
          </select>
        </div>
        <div class="as" v-for="(sentence, i) of design.sentences" :key="i">
          <div>
            <textarea
              rows="4"
              v-model="sentence.text"
              @change="reDraw"
            ></textarea>
          </div>
          <div style="display: flex">
            <div style="margin-right: 15px">
              <div>
                <label for="">Font size</label>
              </div>
              <input type="text" v-model="sentence.fontSize" @change="reDraw" />
            </div>
            <div>
              <div>
                <label for="">Font color</label>
              </div>
              <input
                type="text"
                v-model="sentence.fontColor.name"
                @change="reDraw"
              />
            </div>
          </div>
        </div>
        <div
          style="
            text-align: center;
            height: 30px;
            line-height: 30px;
            margin-top: 30px;
          "
        >
          <span
            style="
              border: 1px solid rgb(145, 145, 245);
              padding: 5px 15px;
              color: rgb(145, 145, 245);
              font-weight: bold;
            "
            >Add new sentence</span
          >
        </div>
      </div>
    </div>
    <div v-else style="margin-top: 15px; margin-left: 15px">
      Please pick a card above. 👆👆
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kkk {
  width: 100%;
  height: 90px;
  padding: 5px 0;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  &__item {
    height: 100%;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    &.active {
      border: 2px solid gray;
      img {
        scale: 0.9;
      }
    }
    img {
      height: 100%;
      scale: 0.8;
      transition: scale 0.3s linear;
    }
    &:hover {
      img {
        scale: 1;
      }
    }
  }
}

.outer-jjj {
  // background-color: #f1f1f1;
}

.jjj {
  width: 400px;
  height: 226px;
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
}

.as {
  border-left: 5px solid rgb(135, 135, 246);
  margin: 5px 15px 15px;
  padding: 0 5px;
  textarea {
    width: 100%;
  }
}
</style>