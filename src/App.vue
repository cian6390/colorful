<script>
import { defineComponent, reactive, ref } from "vue";
import CardEditor from "./components/CardEditor/CardEditor.vue";
import CustomGiftBox from "./components/CustomGiftBox.vue";

export default defineComponent({
  name: "CustomApp",
  components: {
    CardEditor,
    CustomGiftBox,
  },
  setup() {
    const step1 = "make-gift-box";
    const step2 = "make-card";
    const data = reactive({});
    const activeStep = ref(step1);

    const idea = reactive({});

    function toNextStep() {
      if (activeStep.value === step1) {
        activeStep.value = step2;
      } else {
        activeStep.value = step1;
      }
    }

    function onGiftBoxUpdate(data) {
      console.log(data);
    }

    return { ...data, activeStep, step1, step2, toNextStep, onGiftBoxUpdate };
  },
});
</script>

<template>
  <div id="CustomApp">
    <CardEditor />
  </div>
</template>

<style lang="scss" scoped>
#CustomApp {
  width: 100vw;
  height: 100vh;
  max-height: -webkit-fill-available;
  position: relative;
  background-color: #fff;
}

.control-panel {
  bottom: 0;
  left: 0;
  right: 0;
  top: auto;
  width: 100%;
  height: 60px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  background-color: rgba(255, 198, 129, 0.3);
}
</style>
