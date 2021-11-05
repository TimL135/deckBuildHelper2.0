<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />

  <div class="container" style="margin-top: 3vh">
    <select
      class="form-select"
      v-model="handCards[0]"
      :class="handCardsType[0]"
      @change="countCard()"
    >
      <option class="placeholder" selected>1. Card</option>
      <option
        v-for="card in deck.cards"
        :key="card.cardName"
        :class="card.cardType"
      >
        {{ card.cardName }}
      </option>
    </select>
    <select
      class="form-select"
      v-model="handCards[1]"
      :class="handCardsType[1]"
      @change="countCard()"
    >
      <option class="placeholder" selected>2. Card</option>
      <option
        v-for="card in deck.cards"
        :key="card.cardName"
        :class="card.cardType"
      >
        {{ card.cardName }}
      </option>
    </select>
    <select
      class="form-select"
      v-model="handCards[2]"
      :class="handCardsType[2]"
      @change="countCard()"
    >
      <option class="placeholder" selected>3. Card</option>
      <option
        v-for="card in deck.cards"
        :key="card.cardName"
        :class="card.cardType"
      >
        {{ card.cardName }}
      </option>
    </select>
    <select
      class="form-select"
      v-model="handCards[3]"
      :class="handCardsType[3]"
      @change="countCard()"
    >
      <option class="placeholder" selected>4. Card</option>
      <option
        v-for="card in deck.cards"
        :key="card.cardName"
        :class="card.cardType"
      >
        {{ card.cardName }}
      </option>
    </select>
    <select
      class="form-select"
      v-model="handCards[4]"
      :class="handCardsType[4]"
      @change="countCard()"
    >
      <option class="placeholder" selected>5. Card</option>
      <option
        v-for="card in deck.cards"
        :key="card.cardName"
        :class="card.cardType"
      >
        {{ card.cardName }}
      </option>
    </select>
    <div>
      <button
        @click="randomStartHand()"
        type="button"
        class="btn btn-primary w-100 mt-1"
      >
        Random
      </button>
    </div>
    <br />
    <div class="d-flex mb-1">
      <div class="w-100 border rounded border-primary">Value:{{ value }}</div>
    </div>
    <div class="d-flex mb-1">
      <div class="w-25 border rounded-start border-primary">
        Handtraps:<br />{{ counts[0] }}({{ uniqueCounts[0] }})
      </div>
      <div class="w-25 border border-primary">
        Seacher:<br />{{ counts[1] }}({{ uniqueCounts[1] }})
      </div>
      <div class="w-25 border border-primary">
        Combo Starter:<br />{{ counts[2] }}({{ uniqueCounts[2] }})
      </div>
      <div class="w-25 border rounded-end border-primary">
        Negate:<br />{{ counts[6] }}({{ uniqueCounts[6] }})
      </div>
    </div>
    <div class="d-flex mb-1">
      <div class="w-25 border rounded-start border-primary">
        Once per Turn:<br />{{ counts[5] }}({{ uniqueCounts[5] }})
      </div>
      <div class="w-25 border border-primary">
        Searchable:<br />{{ counts[4] }}({{ uniqueCounts[4] }})
      </div>
      <div class="w-25 border border-primary">
        Combo Piece:<br />{{ counts[3] }}({{ uniqueCounts[3] }})
      </div>
      <div class="w-25 border rounded-end border-primary">
        Interaption:<br />{{ counts[7] }}({{ uniqueCounts[7] }})
      </div>
    </div>

    <br />
    <!-- new table -->
    <h1>Possible Combos</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="w-25">Combo</th>
          <th class="w-75">Cards</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="combo in possibleCombos" :key="combo">
          <td>
            {{ possibleCombos.findIndex((cardName) => cardName == combo) + 1 }}
          </td>
          <td>
            <div
              v-for="card in combo"
              :key="card"
              class="mb-1"
              :class="deck.cards.find((c) => c.cardName == card)?.cardType"
            >
              {{ typeof card === "object" ? card.name : card }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Card, Combo, Deck, getDeck } from "@/API";
import { defineComponent } from "vue";
export default defineComponent({
  mounted() {
    if (getDeck()) {
      this.deck = getDeck();
    }
  },
  data() {
    return {
      deck: {} as Deck,
      allCards: [] as string[],
      possibleCombos: [] as Combo[],
      counts: [0, 0, 0, 0, 0, 0, 0, 0] as number[],
      uniqueCounts: [0, 0, 0, 0, 0, 0, 0, 0] as number[],
      value: 0,
      handCards: ["1. Card", "2. Card", "3. Card", "4. Card", "5. Card"],
      handCardsType: [] as string[],
    };
  },
  methods: {
    randomStartHand() {
      this.allCards = [];
      for (let card of this.deck.cards) {
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
    countCard() {
      this.counts = [0, 0, 0, 0, 0, 0, 0, 0];
      this.uniqueCounts = [0, 0, 0, 0, 0, 0, 0, 0];
      this.value = 0;
      let handValueCards = [] as Card[];
      let uniqueCards = [] as Card[];
      for (let i = 0; i < 5; i++) {
        let tmp = this.deck.cards.find((c) => c.cardName == this.handCards[i]);
        if (tmp) {
          this.handCardsType[i] = tmp.cardType;
        } else {
          this.handCardsType[i] = "";
        }
        let card = this.deck.cards.find((x) => x.cardName == this.handCards[i]);
        if (card) {
          for (let c in this.counts) {
            if (card.cardProperties[c]) {
              this.counts[c]++;
            }
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
        for (let c in this.uniqueCounts) {
          if (card.cardProperties[c]) {
            this.uniqueCounts[c]++;
          }
        }
      }
      this.checkCombos();
    },
    checkCombos() {
      this.possibleCombos = [];
      for (let combo of this.deck.combos) {
        let comboHandCards = [...this.handCards];
        if (
          combo.every((cardName) =>
            typeof cardName === "object"
              ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cardName.cards.some((cardInCardGroup) =>
                  comboHandCards.includes(cardInCardGroup)
                    ? comboHandCards.splice(
                        comboHandCards.findIndex((card) => card == cardInCardGroup),
                        1
                      )
                    : null
                )
              : comboHandCards.includes(cardName)
              ? comboHandCards.splice(
                  comboHandCards.findIndex((card) => card == cardName),
                  1
                )
              : null
          )
        ) {
          this.possibleCombos.push(combo);
        }
      }
    },
    getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    },
  },
});
</script>