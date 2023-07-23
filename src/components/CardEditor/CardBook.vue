<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  defineEmits,
} from "vue";

export default defineComponent({
  name: "CardBook",
  props: ["cards"],
  setup(props, { emit }) {
    const cards = reactive(props.cards);

    function onCardPicked(card) {
      emit("card-selected", { card });
    }

    return { onCardPicked, cards };
  },
});
</script>
<template>
  <div id="CardBook" class="card-book">
    <div
      class="card-book__item-card"
      :class="{ active: card.selected }"
      v-for="card of cards"
      :key="card.title"
      @click="onCardPicked(card)"
    >
      <img :src="card.image_url" :alt="card.title" />
    </div>
  </div>
</template>

<style lang="scss">
.card-book {
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}

.card-book__item-card {
  height: 90px;
  scale: 0.7;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 15px;
  }
  &:hover {
    scale: 0.9;
  }
  &.active {
    scale: 0.9;
    border: 1px solid orange;
  }
  img {
    height: 100%;
    width: auto;
  }

}
</style>