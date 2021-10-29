<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />

  <div class="container">
    <select class="form-select" v-model="handCards[0]" @change="countCard()">
      <option selected>1. Karte</option>
      <option v-for="card in deck" :key="card.cardName">
        {{ card.cardName }}
      </option>
    </select>
    <select class="form-select" v-model="handCards[1]" @change="countCard()">
      <option selected>2. Karte</option>
      <option v-for="card in deck" :key="card.cardName">
        {{ card.cardName }}
      </option>
    </select>
    <select class="form-select" v-model="handCards[2]" @change="countCard()">
      <option selected>3. Karte</option>
      <option v-for="card in deck" :key="card.cardName">
        {{ card.cardName }}
      </option>
    </select>
    <select class="form-select" v-model="handCards[3]" @change="countCard()">
      <option selected>4. Karte</option>
      <option v-for="card in deck" :key="card.cardName">
        {{ card.cardName }}
      </option>
    </select>
    <select class="form-select" v-model="handCards[4]" @change="countCard()">
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
    <div class="d-flex mb-1">
      <div class="w-100 border rounded border-primary">Value:{{ value }}</div>
    </div>
    <div class="d-flex mb-1">
      <div class="w-25 border rounded border-primary">
        Handtraps:<br />{{ handTrapCount }}({{ uniqueHandTrapCount }})
      </div>
      <div class="w-25 border rounded border-primary">
        Seacher:<br />{{ seacherCount }}({{ uniqueSeacherCount }})
      </div>
      <div class="w-25 border rounded border-primary">
        Combo Starter:<br />{{ comboStarterCount }}({{
          uniqueComboStarterCount
        }})
      </div>
      <div class="w-25 border rounded border-primary">
        Negate:<br />{{ negateCount }}({{ uniqueNegateCount }})
      </div>
    </div>
    <div class="d-flex mb-1">
      <div class="w-25 border rounded border-primary">
        Once per Turn:<br />{{ oncePerTurnCount }}({{ uniqueOncePerTurnCount }})
      </div>
      <div class="w-25 border rounded border-primary">
        Searchable:<br />{{ searchableCount }}({{ uniqueSearchableCount }})
      </div>
      <div class="w-25 border rounded border-primary">
        Combo Piece:<br />{{ comboPieceCount }}({{ uniqueComboPieceCount }})
      </div>
      <div class="w-25 border rounded border-primary">
        Interaption:<br />{{ interaptionCount }}({{ uniqueInteraptionCount }})
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Card, Deck, getData, getDeck } from "@/API";
import { defineComponent } from "vue";
export default defineComponent({
  mounted() {
    if (getDeck()) {
      this.deck = getDeck().cards;
    }
  },
  data() {
    return {
      deck: [] as Card[],
      decks: [] as Deck[],
      allCards: [] as string[],
      handTrapCount: 0,
      uniqueHandTrapCount: 0,

      seacherCount: 0,
      uniqueSeacherCount: 0,

      comboStarterCount: 0,
      uniqueComboStarterCount: 0,

      comboPieceCount: 0,
      uniqueComboPieceCount: 0,

      searchableCount: 0,
      uniqueSearchableCount: 0,

      oncePerTurnCount: 0,
      uniqueOncePerTurnCount: 0,

      negateCount: 0,
      uniqueNegateCount: 0,

      interaptionCount: 0,
      uniqueInteraptionCount: 0,
      value: 0,
      handCards: ["1. Karte", "2. Karte", "3. Karte", "4. Karte", "5. Karte"],
    };
  },
  methods: {
    randomStartHand: function () {
      if (getDeck()) {
        this.deck = getDeck().cards;
      }
      this.allCards = [];
      for (let card of this.deck) {
        for (card.cardCount; card.cardCount > 0; card.cardCount--) {
          this.allCards.push(card.cardName);
        }
      }
      for (let i = 0; i < 5; i++) {
        let index = this.getRandomInt(this.allCards.length);
        this.handCards[i] = this.allCards.splice(index, 1).toString();
      }
      this.countCard();
    },
    countCard: function () {
      this.handTrapCount = 0;
      this.uniqueHandTrapCount = 0;

      this.seacherCount = 0;
      this.uniqueSeacherCount = 0;

      this.comboStarterCount = 0;
      this.uniqueComboStarterCount = 0;

      this.comboPieceCount = 0;
      this.uniqueComboPieceCount = 0;

      this.searchableCount = 0;
      this.uniqueSearchableCount = 0;

      this.oncePerTurnCount = 0;
      this.uniqueOncePerTurnCount = 0;

      this.negateCount = 0;
      this.uniqueNegateCount = 0;

      this.interaptionCount = 0;
      this.uniqueInteraptionCount = 0;

      this.value = 0;
      let handValueCards = [] as Card[];
      let uniqueCards = [] as Card[];
      for (let i = 0; i < 5; i++) {
        let card = this.deck.find((x) => x.cardName == this.handCards[i]);
        if (card) {
          if (card.cardHandTrap) {
            this.handTrapCount++;
          }
          if (card.cardSeacher) {
            this.seacherCount++;
          }
          if (card.cardComboStarter) {
            this.comboStarterCount++;
          }
          if (card.cardComboPiece) {
            this.comboPieceCount++;
          }
          if (card.cardOncePerTurn) {
            this.oncePerTurnCount++;
          }
          if (card.cardSearchable) {
            this.searchableCount++;
          }
          if (card.cardNegate) {
            this.negateCount++;
          }
          if (card.cardInteraption) {
            this.interaptionCount++;
          }
          if (card.cardValue < 0) {
            handValueCards.push(card);
          } else {
            if (card.cardValue > 0) {
              if (!handValueCards.find((c) => c.cardName == card!.cardName)) {
                handValueCards.push(card);
              }
            }
          }
          if (!uniqueCards.find((c) => c.cardName == card!.cardName)) {
            uniqueCards.push(card);
          }
        }
      }
      if (handValueCards.length > 1) {
        this.value = handValueCards
          .map((c) => c.cardValue)
          .reduce((a, b) => a + b);
      }
      for (let card of uniqueCards) {
        if (card.cardHandTrap) {
          this.uniqueHandTrapCount++;
        }
        if (card.cardSeacher) {
          this.uniqueSeacherCount++;
        }
        if (card.cardComboStarter) {
          this.uniqueComboStarterCount++;
        }
        if (card.cardComboPiece) {
          this.uniqueComboPieceCount++;
        }
        if (card.cardOncePerTurn) {
          this.uniqueOncePerTurnCount++;
        }
        if (card.cardSearchable) {
          this.uniqueSearchableCount++;
        }
        if (card.cardNegate) {
          this.uniqueNegateCount++;
        }
        if (card.cardInteraption) {
          this.uniqueInteraptionCount++;
        }
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
