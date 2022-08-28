<template>
  <div class="container" style="margin-top: 3vh">
    <div>Banned</div>
    <div class="deck">
      <div
        v-for="card of allCards.filter((e) => e.max == 0)"
        :key="card.name"
        @dblclick="searchOnline(card?.id)"
      >
        <img
          v-if="navigator.onLine && card?.id"
          style="height: 5rem"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card?.id}.jpg`"
          alt=""
        />
        <div v-else :class="card?.type">
          {{ card?.name }}
        </div>
      </div>
    </div>
    <div>Limited</div>
    <div class="deck">
      <div
        v-for="card of allCards.filter((e) => e.max == 1)"
        :key="card.name"
        @dblclick="searchOnline(card?.id)"
      >
        <img
          v-if="navigator.onLine && card?.id"
          style="height: 5rem"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card?.id}.jpg`"
          alt=""
        />
        <div v-else :class="card?.type">
          {{ card?.name }}
        </div>
      </div>
    </div>
    <div>Semi-Limited</div>
    <div class="deck">
      <div
        v-for="card of allCards.filter((e) => e.max == 2)"
        :key="card.name"
        @dblclick="searchOnline(card?.id)"
      >
        <img
          v-if="navigator.onLine && card?.id"
          style="height: 5rem"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card?.id}.jpg`"
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
import { findCard, searchOnline } from "../global";
import { banList } from "../API";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {
      banList,
      navigator,
      findCard,
      searchOnline,
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
