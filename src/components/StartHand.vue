<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />

  <div class="container">
    <select class="form-select" v-model="handCards[0]">
      <option selected>1. Karte</option>
      <option v-for="card in deck" :key="card.cardName">
        {{ card.cardName }}
      </option>
    </select>
    <select class="form-select" v-model="handCards[1]">
      <option selected>2. Karte</option>
      <option v-for="card in deck" :key="card.cardName">
        {{ card.cardName }}
      </option>
    </select>
    <select class="form-select" v-model="handCards[2]">
      <option selected>3. Karte</option>
      <option v-for="card in deck" :key="card.cardName">
        {{ card.cardName }}
      </option>
    </select>
    <select class="form-select" v-model="handCards[3]">
      <option selected>4. Karte</option>
      <option v-for="card in deck" :key="card.cardName">
        {{ card.cardName }}
      </option>
    </select>
    <select class="form-select" v-model="handCards[4]">
      <option selected>5. Karte</option>
      <option v-for="card in deck" :key="card.cardName">
        {{ card.cardName }}
      </option>
    </select>

    <button
      @click="randomStartHand()"
      type="button"
      class="btn btn-primary m-1"
    >
      Random
    </button>
    <div v-if="handTrapCount > 0">Handtraps({{ handTrapCount }})</div>
    <div v-if="brickCount > 0">Bricks({{ brickCount }})</div>
    <div v-if="comboStarterCount > 0">
      Combo Starter({{ comboStarterCount }})
    </div>
    <div v-if="value > 0">Value({{ value }})</div>
  </div>
</template>
<script lang="ts">
import { Card, Deck, getData, getDeck } from "@/API";
import { defineComponent } from "vue";
export default defineComponent({
  mounted() {
    if (getDeck()) {     
      this.deck = getDeck().cards
    }
  },
  data() {
    return {
      deck: [] as Card[],
      decks: [] as Deck[],
      allCards: [] as string[],
      handTrapCount: 0,
      brickCount: 0,
      comboStarterCount: 0,
      value: 0,
      handCards: ["1. Karte", "2. Karte", "3. Karte", "4. Karte", "5. Karte"],
    };
  },
  methods: {
    randomStartHand: function () {
      if (getDeck()) {     
      this.deck = getDeck().cards
    }
      this.allCards = [];
      for (let card of this.deck) {
        for (card.cardCount; card.cardCount > 0; card.cardCount--) {
          this.allCards.push(card.cardName);
        }
      }
      for (let i = 0; i < 5; i++) {
        let index = this.getRandomInt(this.allCards.length - 1);
        this.handCards[i] = this.allCards.splice(index, 1).toString();
      }
      this.countCard();
    },
    countCard: function () {
      this.handTrapCount = 0;
      this.brickCount = 0;
      this.comboStarterCount = 0;
      this.value = 0;
      let handValue = 0;
      let cards = [] as Card[];

      for (let i = 0; i < 5; i++) {
        let card = this.deck.find((x) => x.cardName == this.handCards[i]);
        if (card) {
          if (card.cardHandTrap) {
            this.handTrapCount++;
          }
          if (card.cardBrick) {
            this.brickCount++;
          }
          if (card.cardComboStarter) {
            this.comboStarterCount++;
          }
          if (card.cardValue < 0) cards.push(card);
          else if (card.cardValue > 0) {
            if (!cards.find((c) => c.cardName == card!.cardName)) {
              cards.push(card);
            }
          }
        }
      }
      if(cards.length>1){
      handValue = cards.map((c) => c.cardValue).reduce((a, b) => a + b);
      }
    },
    getRandomInt: function (max: number) {
      return Math.floor(Math.random() * max);
    },
  },
});
</script>
<style lang="css">
.btn-check:focus + .btn-primary,
.btn-primary:focus {
  box-shadow: none !important;
}
</style>