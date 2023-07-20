<script>
import { defineComponent, ref, reactive } from "vue";
import cards from "../configs/cards";

export default defineComponent({
  name: "CustomCard",
  setup() {
    const activeCard = ref(null);

    const sentences = reactive([
      {
        text: '祝親愛的媽媽',
        fontSize: 18,
        fontColor: {
          name: 'Dark Gray',
          hex: '#333'
        },
        position: {

        }
      },
      {
        text: '祝給我幸福生活的媽媽幸福每一天。',
        fontSize: 18,
        fontColor: {
          name: 'Dark Gray',
          hex: '#333'
        }
      }
    ])

    function onCardChange(card) {
      activeCard.value = card;
    }

    return { cards, onCardChange, activeCard, sentences };
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
      <div class="jjj">
        <img :src="activeCard.image_url" />
      </div>
      <div>
        <div style="text-align: center;margin-bottom: 15px;">
          <label style="margin-right: 15px">Font style</label>
          <input type="text" value="Roboto" />
        </div>
        <div class="as" v-for="(sentence, i) of sentences" :key="i">
          <div>
            <textarea rows="4" v-model="sentence.text"></textarea>
          </div>
          <div style="display: flex">
            <div style="margin-right: 15px">
              <div>
                <label for="">Font size</label>
              </div>
              <input type="text" v-model="sentence.fontSize" />
            </div>
            <div>
              <div>
                <label for="">Font color</label>
              </div>
              <input type="text"  v-model="sentence.fontColor.name" />
            </div>
          </div>
        </div>
        <div style="text-align:center;height:30px;line-height:30px;margin-top: 30px;">
          <span style="border: 1px solid rgb(145, 145, 245);padding: 5px 15px;color: rgb(145, 145, 245);font-weight:bold;">Add new sentence</span>
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

.jjj {
  padding: 15px 15px 0 15px;
  width: 100%;
  img {
    width: 100%;
  }
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