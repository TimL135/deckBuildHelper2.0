<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />
  <div class="container" style="margin-top: 3vh">
    <div>Banned</div>
    <div class="deck">
      <div v-for="card of allCards.filter((e) => e.max == 0)" :key="card.name">
        <img
          v-if="navigator.onLine && card?.src"
          style="height: 5rem"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card?.src}.jpg`"
          alt=""
        />
        <div v-else :class="card?.type">
          {{ card?.name }}
        </div>
      </div>
    </div>
    <div>Limited</div>
    <div class="deck">
      <div v-for="card of allCards.filter((e) => e.max == 1)" :key="card.name">
        <img
          v-if="navigator.onLine && card?.src"
          style="height: 5rem"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card?.src}.jpg`"
          alt=""
        />
        <div v-else :class="card?.type">
          {{ card?.name }}
        </div>
      </div>
    </div>
    <div>Semi-Limited</div>
    <div class="deck">
      <div v-for="card of allCards.filter((e) => e.max == 2)" :key="card.name">
        <img
          v-if="navigator.onLine && card?.src"
          style="height: 5rem"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card?.src}.jpg`"
          alt=""
        />
        <div v-else :class="card?.type">
          {{ card?.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { banList, findCard } from "../global";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {
      banList,
      navigator,
      findCard,
    };
  },
  data() {
    return {
      allCards: [],
    };
  },
  mounted() {
    this.banList
      .sort((a, b) => a.max - b.max)
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    for (const card of banList) {
      this.allCards.push(card);
    }
  },
});
</script>
<style lang="scss" scoped></style>
