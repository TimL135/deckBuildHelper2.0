<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />

  <div class="container mt-2">
    <div class="round mb-1" style="border: 1px solid #ffa107">
      {{ `Card amount: ${deckNumber}` }}
    </div>
    <ShowProperties
      :filter="filter"
      :uniqueCounts="uniqueCounts"
      :counts="counts"
    ></ShowProperties>
    <br />
    <div class="addViewButtons">
      <div>
        <Button
          type="button"
          class="btn orange round"
          @click="openCardAddModal()"
        >
          <template v-slot:button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </template>
        </Button>
      </div>
      <div>
        <Button
          type="button"
          class="btn orange round"
          @click="deckView = !deckView"
          ><template v-slot:button>
            <svg
              v-if="deckView"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-grid"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
              />
            </svg>
          </template>
        </Button>
      </div>
    </div>
    <br />
    <div class="deck" v-if="deckView">
      <div
        v-for="(card, index) of allCards.filter((card) =>
          filter.every((f, i) => (f ? f && card.properties[i] : true))
        )"
        :key="card.id + index"
        @click="openCardSelectModal(card)"
      >
        <img
          style="height: 5rem"
          class="mb-1"
          :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card.src}.jpg`"
          alt=""
        />
      </div>
    </div>
    <div v-else>
      <div class="cardTable p-2">
        <div>Cards</div>
        <div></div>
        <div></div>
      </div>
      <div
        class="cardTable p-2"
        v-for="card in deck.sideCards.filter((card) =>
          filter.every((f, i) => (f ? f && card.properties[i] : true))
        )"
        :key="card.name"
        :class="card.type"
        style="border-bottom: 1px solid black"
      >
        <div @dblclick="searchOnline(card.name)">
          {{ card.name }}({{ card.count }})
        </div>
        <div>
          <img
            style="height: 5rem"
            :src="`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card.src}.jpg`"
            alt=""
          />
        </div>
        <div style="margin-top: -0.5rem">
          <div>
            <Button
              @click="openCardEditModal(card.name)"
              style="background-color: #ffffff00; border: none"
            >
              <template v-slot:button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi bi-gear"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                  />
                  <path
                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                  />
                </svg>
              </template>
            </Button>
          </div>
          <div>
            <Button
              @click="openCardDeleteModal(card.name)"
              style="background-color: #ffffff00; border: none"
            >
              <template v-slot:button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <CardSelectModal
    :selectedCard="selectedCard"
    :openCardEditModal="openCardEditModal"
    :closeCardSelectModal="closeCardSelectModal"
    :openCardDeleteModal="openCardDeleteModal"
  ></CardSelectModal>
  <!-- new modal -->
  <DefaultCardInputModal
    :counts="counts"
    :properties="properties"
    :editAddCard="editAddCard"
    :alternativeCheck="alternativeCheck"
    :mainCardDB="mainCardDB"
    :deck="deck"
    :primitives="primitives"
  ></DefaultCardInputModal>
  <!-- new modal -->
  <DeleteCardModal
    :deleteCardId="deleteCardId"
    :nameInput="primitives.nameInput"
    :closeModal="closeCardDeleteModal"
    :deleteCard="deleteCard"
  ></DeleteCardModal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  decks,
  deck,
  uniqueAllCards,
  searchOnline,
  safeDeck,
  findCardByName,
} from "../../global";
import { mainCardDB, banList } from "../../API";
import * as type from "../../types";
import * as Inputs from "../../components/SexyInputs/index";
import ShowProperties from "./ShowProperties.vue";
import DefaultCardInputModal from "./DefaultCardInputModal.vue";
import DeleteCardModal from "./DeleteCardModal.vue";
import CardSelectModal from "./CardSelectModal.vue";
export default defineComponent({
  components: {
    ...Inputs,
    ShowProperties,
    DefaultCardInputModal,
    DeleteCardModal,
    CardSelectModal,
  },
  watch: { deck: "updateDeck" },
  setup() {
    return {
      decks,
      deck,
      uniqueAllCards,
      mainCardDB,
      searchOnline,
      findCardByName,
      banList,
    };
  },
  mounted() {
    this.updateDeck();
  },
  data() {
    return {
      primitives: {
        value: 0,
        error: {},
        nameInput: "",
        countInput: "",
        maxCount: 3,
        banListStatus: "",
      },
      allCards: [] as type.Card[],
      deckRating: 0,
      deckValue: 0,
      deckNumber: 0,
      type: "monster" as type.CardType,

      properties: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      filter: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      uniqueCounts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      editCardIndex: 0,
      deleteCardId: 0,

      editAdd: "",
      deckView: true,
      selectedCard: {},
    };
  },
  methods: {
    updateDeck() {
      if (this.deck) {
        this.uniqueCardDeck();
        this.countCard();
      }
    },
    editAddCard() {
      this.primitives.error = {};
      if (!this.primitives.nameInput)
        this.primitives.error.nameInput = "enter a name";
      if (this.primitives.countInput === 0)
        this.primitives.error.countInput = "this card is banned";
      else if (!this.primitives.countInput)
        this.primitives.error.countInput = "enter a amount";
      if (Object.keys(this.primitives.error).length > 0) return;
      switch (this.editAdd) {
        case "add":
          this.addCard();
          break;
        case "edit":
          this.editCard();
          break;
      }
    },
    openCardSelectModal(card: type.Card) {
      this.selectedCard = card;
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardSelectModal"))
          this.closeCardSelectModal();
      };
      let modal = document.getElementById("cardSelectModal");
      if (modal) modal.style.display = "block";
    },
    closeCardSelectModal() {
      this.selectedCard = {};
      let modal = document.getElementById("cardSelectModal");
      if (modal) modal.style.display = "none";
    },
    openCardDeleteModal(card: type.Card) {
      this.closeCardSelectModal();
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardDeleteModal"))
          this.closeCardDeleteModal();
      };
      this.deleteCardId = this.deck.sideCards.findIndex((c) => c.id == card.id);
      this.primitives.nameInput = card.name;
      var modal = document.getElementById("cardDeleteModal");
      if (modal) modal.style.display = "block";
    },
    closeCardDeleteModal() {
      this.inputReset();
      var modal = document.getElementById("cardDeleteModal");
      if (modal) modal.style.display = "none";
    },
    openCardAddModal() {
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardAddEditModal"))
          this.closeCardAddEditModal();
      };
      this.primitives.error = {};
      this.editAdd = "add";
      var modal = document.getElementById("cardAddEditModal");
      if (modal) modal.style.display = "block";
    },
    openCardEditModal(card: type.Card) {
      this.closeCardSelectModal();
      window.onclick = (event) => {
        if (event.target == document.getElementById("cardAddEditModal"))
          this.closeCardAddEditModal();
      };
      this.primitives.error = {};
      this.editAdd = "edit";
      this.editCardIndex = this.deck.sideCards.findIndex(
        (c) => c.id == card.id
      );
      this.primitives.nameInput = card.name;
      this.primitives.countInput = card.count;
      this.properties = card.properties;
      this.primitives.value = card.value;
      this.type = card.type;
      var modal = document.getElementById("cardAddEditModal");
      if (modal) modal.style.display = "block";
    },
    closeCardAddEditModal() {
      this.inputReset();
      var modal = document.getElementById("cardAddEditModal");
      if (modal) modal.style.display = "none";
    },
    alternativeCheck(card) {
      this.primitives.maxCount = 3;
      this.primitives.nameInput.trim();
      this.primitives.banListStatus = "";
      let map = {
        0: "Banned",
        1: "Limited",
        2: "Semi-Limited",
      };
      banList?.forEach((card) => {
        if (card.name == this.primitives.nameInput) {
          if (this.primitives.countInput > card.max)
            this.primitives.countInput = card.max;
          this.primitives.maxCount = card.max;
          this.primitives.banListStatus = map[card.max];
        }
      });
      this.type = card.type;
      this.deck.alternativeCards.forEach((card) => {
        if (card.name == this.primitives.nameInput) {
          this.type = card.type;
          this.primitives.countInput = card.count;
          this.properties = card.properties;
          this.primitives.value = card.value;
        }
      });
    },
    addCard() {
      this.primitives.nameInput.trim();
      if (this.deck.sideCards.length > 2) {
        if (
          this.deck.sideCards.map((c) => c.count).reduce((a, b) => a + b) +
            this.primitives.countInput >
          15
        ) {
          this.deck.alternativeCards = this.deck.alternativeCards.filter(
            (card) => card.name != this.primitives.nameInput
          );
          this.deck.alternativeCards.push({
            name: this.primitives.nameInput,
            type: this.type,
            count: parseInt(this.primitives.countInput),
            properties: this.properties,
            value: this.primitives.value,
            id: Math.random().toString().slice(-15),
          });
          safeDeck(this.deck);
          this.closeCardAddEditModal();
          return;
        }
      }
      if (this.deck.sideCards) {
        this.deck.alternativeCards = this.deck.alternativeCards.filter(
          (card) => card.name != this.primitives.nameInput
        );
        if (
          this.deck.sideCards.findIndex(
            (c) => c.name == this.primitives.nameInput
          ) == -1
        ) {
          this.deck.sideCards.push({
            name: this.primitives.nameInput,
            type: this.type,
            count: this.primitives.countInput,
            properties: this.properties,
            value: this.primitives.value,
            id: Math.random().toString(36).slice(),
          });
        }
        this.uniqueCardDeck();
        this.inputReset();
        this.countCard();
        this.sortDeck();
        safeDeck(this.deck);
        this.closeCardAddEditModal();
      }
    },
    editCard() {
      if (
        this.deck.sideCards.map((c) => c.count).reduce((a, b) => a + b) -
          this.deck.sideCards[this.editCardIndex].count +
          this.primitives.countInput >
        15
      )
        return this.closeCardAddEditModal();
      this.primitives.nameInput.trim();
      this.deck.sideCards[this.editCardIndex] = {
        name: this.primitives.nameInput,
        type: this.type,
        count: this.primitives.countInput,
        properties: this.properties,
        value: this.primitives.value,
        id: this.deck.cards[this.editCardIndex].id,
      };

      this.uniqueCardDeck();
      this.countCard();
      this.sortDeck();
      safeDeck(this.deck);
      this.closeCardAddEditModal();
    },
    inputReset() {
      this.properties = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      this.primitives.value = 0;
      this.editCardIndex = 0;
      this.deleteCardId = 0;
      this.type = "monster";
      this.primitives.nameInput = "";
      this.primitives.countInput = "";
    },
    deleteCard(cardIndex: number) {
      this.deck.alternativeCards.push(this.deck.sideCards[cardIndex]);
      this.deck.sideCards.splice(cardIndex, 1);
      this.uniqueCardDeck();
      this.countCard();
      safeDeck(this.deck);
      this.closeCardDeleteModal();
    },
    countCard() {
      if (this.deck.sideCards) {
        this.deckNumber = 0;
        this.counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.uniqueCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let card of this.deck.sideCards) {
          if (card.properties.length == 8)
            card.properties = card.properties.concat([
              false,
              false,
              false,
              false,
            ]);
          this.deckNumber += card.count;
          for (let c in this.counts) {
            if (card.properties[c]) this.counts[c] += card.count;
          }
        }
        for (let card of this.uniqueAllCards) {
          for (let c in this.uniqueCounts) {
            if (card.properties[c]) this.uniqueCounts[c]++;
          }
        }
      }
    },
    uniqueCardDeck() {
      this.allCards = [];
      for (let card of this.deck.sideCards) {
        if (!card.src)
          card.src = mainCardDB.find((e) => e.name == card.name)?.src;
        let count = card.count;
        for (count; count; count--) {
          this.allCards.push(card);
        }
      }
      this.uniqueAllCards = [
        ...new Set(this.deck.sideCards.filter((c) => c.name)),
      ];
    },

    sortDeck() {
      this.allCards
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .sort((a, b) => b.count - a.count)
        .sort(function (a, b) {
          let map = {
            monster: 1,
            spell: 2,
            trap: 3,
          };
          return map[a.type] - map[b.type];
        });

      this.deck.sideCards
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .sort((a, b) => b.count - a.count)
        .sort(function (a, b) {
          let map = {
            monster: 1,
            spell: 2,
            trap: 3,
          };
          return map[a.type] - map[b.type];
        });
    },
  },
});
</script>
<style lang="scss" scoped>
.cardTable {
  display: grid;
  grid-template-columns: 3fr 3fr 1fr;
}
</style>
