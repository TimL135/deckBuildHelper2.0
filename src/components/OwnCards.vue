<template>
  <div class="container" style="margin-top: 3vh"></div>
</template>
<script lang="ts">
import { findCard, searchOnline } from "../global";
import { getOwnCards, setOwnCards } from "../API";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {
      navigator,
      findCard,
      searchOnline,
    };
  },
  data() {
    return {};
  },
  mounted() {},
});
</script>
<style lang="scss" scoped></style>
