<script>
import { defineComponent, reactive, ref } from "vue";
import CustomCard from "./components/CustomCard.vue";
import CustomGiftBox from "./components/CustomGiftBox.vue";

export default defineComponent({
  name: "CustomApp",
  components: {
    CustomCard,
    CustomGiftBox,
  },
  setup() {
    const step1 = 'make-gift-box'
    const step2 = 'make-card'
    const data = reactive({});
    const activeStep = ref(step1)

    function toNextStep () {
      if (activeStep.value === step1) {
        activeStep.value = step2
      } else {
        activeStep.value = step1
      }
    }

    return { ...data, activeStep, step1, step2, toNextStep };
  },
});
</script>

<template>
  <div id="CustomApp">
    <div v-if="activeStep === step1">
      <CustomGiftBox />
    </div>
    <div v-if="activeStep === step2">
      <CustomCard />
    </div>
    <div class="control-panel">
      <button @click="toNextStep">下一步</button>
      <button v-if="activeStep === step2" style="margin-left: 30px;" @click="toNextStep">略過</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#CustomApp {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #f1f1f1;
}

.control-panel {
  bottom: 0;
  left: 0;
  right: 0;
  top: auto;
  width: 100%;
  height: 90px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px dashed gray;
  button {
    flex: none;
    color: white;
    font-size: 18px;
    background-color:blue;
    border: none;
    height: 40px;
    width: 120px;
  }
}
</style>
