<script>
import { ref, reactive, defineComponent, computed } from "vue";

const STEP_1 = "choose-box";
const STEP_2 = "choose-product";
const STEP_3 = "write-card";

export default defineComponent({
  setup() {
    const step1 = ref(STEP_1);
    const step2 = ref(STEP_2);
    const step3 = ref(STEP_3);
    const step = computed(() => steps.find((s) => s.key === activeStep.value));
    const steps = reactive([
      {
        key: STEP_1,
        title: "外盒",
        options: reactive([
          {
            id: 1,
            title: "box 1",
            description: '經典禮盒',
            slotsCount: 9
          },
          {
            id: 2,
            title: "box 2",
            description: '可愛的米老鼠正在與他的好友們一起歡慶跨年。',
            slotsCount: 6
          },
          {
            id: 3,
            title: "box 3",
            description: '迷你小禮盒',
            slotsCount: 4
          },
        ]),
      },
      {
        key: STEP_2,
        title: "產品",
        options: reactive([
            {
                id: 1,
                title: '經典奶油泡芙'
            }, {
                id: 1,
                title: '宇治某茶泡芙'
            }, {
                id: 1,
                title: '泡芙'
            }
        ]),
      },
      {
        key: STEP_3,
        title: "卡片",
        options: reactive([]),
      },
    ]);

    const activeStep = ref(STEP_1);

    function selectStep(step) {
      activeStep.value = step;
    }

    return { selectStep, step, steps };
  },
});
</script>

<template>
  <div id="ColorfulApp">
    <div>
      <span v-for="(step, i) of steps" :key="step.key">
        {{ step.title }}<span v-if="i < 2">&nbsp;>&nbsp;</span>
      </span>
    </div>
    <div id="RenderContainer">
      <div id="Render">div 1</div>
    </div>
    <div id="ControlPanelContainer">
      <div id="ControlPanel">
        <button
          v-for="step of steps"
          :key="step.key"
          @click="selectStep(step.key)"
        >
          {{ step.title }}
        </button>
      </div>
      <div>
        <span v-for="opt of step.options" :key="opt.id">{{ opt.title }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#ColorfulApp {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #4185ce;
}

#RenderContainer {
}

#ControlPanelContainer {
  right: 0;
  top: 0;
  height: 100%;
  width: 320px;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
}
</style>