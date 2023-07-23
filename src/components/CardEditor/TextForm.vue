<script>
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
} from "vue";

export default defineComponent({
  name: "TextForm",
  setup(props, { emit }) {
    const textForm = reactive({
      show: false,
      fields: {
        text: "",
        fontFamily: "Nunito",
        fontSize: 28,
        fill: "#333",
      },
    });

    function addNewText() {
      editor.addText(textForm.fields.text, textForm.fields);
      textForm.show = false;
      textForm.fields = {
        text: "",
        fontFamily: "Nunito",
        fontSize: 28,
        fill: "#333",
      };
    }
    return { textForm, addNewText };
  },
});
</script>
<template>
  <form @submit.prevent="addNewText">
    <input type="text" v-model="textForm.fields.text" />
    <input type="text" v-model="textForm.fields.fontFamily" />
    <input type="text" v-model="textForm.fields.fontSize" />
    <input type="text" v-model="textForm.fields.fill" />
    <button type="submit">Submit</button>
  </form>
</template>

<style lang="scss">

</style>