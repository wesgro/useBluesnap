<template>
  <HelloWorld msg="Hello Vue 3 in CodeSandbox!" />
</template>

<script>
import HelloWorldVue from "./components/HelloWorld.vue";
import { initBluesnap } from "./composables/useBluesnap";
const token =
  "b44b553f82290ad50eaec4a9ab333c810b57eb2e00075eb061282694ce77d74f_";
export default {
  name: "App",
  components: {
    HelloWorld: HelloWorldVue,
  },
  setup() {
    initBluesnap(token, {
      onBlur(tagId) {
        console.log("Blur is happening on", tagId);
      },
    });
    // const fields = reactive({
    //   ccn: {
    //     focus: false,
    //     error: false,
    //   },
    // });
    // provide("bs-fields", fields);
    // onMounted(() => {
    //   const bsObj = {
    //     //insert your Hosted Payment Fields token
    //     token:
    //       "b44b553f82290ad50eaec4a9ab333c810b57eb2e00075eb061282694ce77d74f_",
    //     onFieldEventHandler: {
    //       onFocus(tagId) {
    //         if (!fields[tagId]) {
    //           return;
    //         }
    //         fields[tagId].focus = true;
    //       },
    //       onBlur(tagId) {
    //         if (!fields[tagId]) {
    //           return;
    //         }
    //         fields[tagId].focus = false;
    //       },
    //     },
    //   };
    //   window.bluesnap.hostedPaymentFieldsCreate(bsObj);
    // });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
