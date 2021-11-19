<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />

  <div class="container mt-2">
    <br />
    <div>
      <button
        type="submit"
        class="w-100 btn orange"
        @click="openCardAddModal()"
      >
        Add new Card
      </button>
    </div>

    <br />
    
    <div class="d-flex mb-1">
      <div class="w-25 rounded-start" style="border: 1px solid #ffa107">
        Handtraps:<br />{{ counts[0] }}({{ uniqueCounts[0] }})
      </div>
      <div class="w-25" style="border: 1px solid #ffa107">
        Seacher:<br />{{ counts[1] }}({{ uniqueCounts[1] }})
      </div>
      <div class="w-25" style="border: 1px solid #ffa107">
        Combo Starter:<br />{{ counts[2] }}({{ uniqueCounts[2] }})
      </div>
      <div class="w-25 rounded-end" style="border: 1px solid #ffa107">
        Negate:<br />{{ counts[6] }}({{ uniqueCounts[6] }})
      </div>
    </div>
    <div class="d-flex mb-1">
      <div class="w-25 rounded-start" style="border: 1px solid #ffa107">
        Once per Turn:<br />{{ counts[5] }}({{ uniqueCounts[5] }})
      </div>
      <div class="w-25" style="border: 1px solid #ffa107">
        Searchable:<br />{{ counts[4] }}({{ uniqueCounts[4] }})
      </div>
      <div class="w-25" style="border: 1px solid #ffa107">
        Combo Piece:<br />{{ counts[3] }}({{ uniqueCounts[3] }})
      </div>
      <div class="w-25 rounded-end" style="border: 1px solid #ffa107">
        Interaption:<br />{{ counts[7] }}({{ uniqueCounts[7] }})
      </div>
    </div>
    <br />
    <!-- new table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" class="w-50" style="text-align: left">Cards</th>
          <th class="w-25"></th>
          <th scope="col" class="w-25" style="text-align: left">Probability</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="card in deck.alternativeCards
" :key="card.cardName">
          <th style="text-align: left" :class="card.cardType">
            {{ card.cardName }}({{ card.cardCount }})
          </th>
          <td :class="card.cardType">
            <button
              @click="openCardEditModal(card.cardName)"
              class="me-2"
              style="background-color: #ffffff00; border: none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5.5vw"
                height="5.5vw"
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
            </button>
            <button
              @click="openCardDeleteModal(card.cardName)"
              class="me-2"
              style="background-color: #ffffff00; border: none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5.5vw"
                height="5.5vw"
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
            </button>
          </td>
          <td class="m-2" :class="card.cardType" style="text-align: left">
            {{
              (
                (1 -
                  ((deckNumber - card.cardCount) / deckNumber) *
                    ((deckNumber - (card.cardCount + 1)) / (deckNumber - 1)) *
                    ((deckNumber - (card.cardCount + 2)) / (deckNumber - 2)) *
                    ((deckNumber - (card.cardCount + 3)) / (deckNumber - 3)) *
                    ((deckNumber - (card.cardCount + 4)) / (deckNumber - 4))) *
                100
              ).toFixed(2)
            }}%({{
              (
                (1 - (deckNumber - (card.cardCount + 5)) / (deckNumber - 5)) *
                100
              ).toFixed(2)
            }}%)
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- new modal -->
  <div id="cardAddEditModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closeCardAddEditModal()"
        >&times;</span
      >
      <div class="container">
        <form @submit.prevent="editAddCard()">
          <div class="input-group mb-1">
            <span class="input-group-text w-25 orange" id="basic-addon1"
              >Name</span
            >
            <input
              type="text"
              class="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              v-model="cardNameInput"
              required
            />
          </div>
          <div class="input-group mb-1">
            <span class="input-group-text w-25 orange" id="basic-addon1"
              >Quantity</span
            >
            <input
              type="number"
              oninput="this.value = this.value.replace(/[^1-3.]/g, '').replace(/(\..*)\./g, '$1');"
              class="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              v-model="cardCountInput"
              min="1"
              max="3"
              required
            />
          </div>
          <div
            class="btn-group w-100 mb-1"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              class="btn-check"
              name="type"
              id="btnradio12"
              autocomplete="off"
              @change="type = 'monster'"
              :checked="type == 'monster'"
            />
            <label
              class="btn orange col-4"
              :class="{ monster: type == 'monster' }"
              for="btnradio12"
              >Monster</label
            >
            <input
              type="radio"
              class="btn-check"
              name="type"
              id="btnradio13"
              autocomplete="off"
              @change="type = 'spell'"
              :checked="type == 'spell'"
            />
            <label
              class="btn orange col-4"
              :class="{ spell: type == 'spell' }"
              for="btnradio13"
              >Spell</label
            >
            <input
              type="radio"
              class="btn-check"
              name="type"
              id="btnradio14"
              autocomplete="off"
              @change="type = 'trap'"
              :checked="type == 'trap'"
            />
            <label
              class="btn orange col-4"
              :class="{ trap: type == 'trap' }"
              for="btnradio14"
              >Trap</label
            >
     
          </div>
          <div
            class="btn-group rounded orange mb-1 w-100"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck9"
              autocomplete="off"
              v-model="properties[0]"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck9"
              >Handtrap</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck10"
              autocomplete="off"
              v-model="properties[1]"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck10"
              >Searcher</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck11"
              autocomplete="off"
              v-model="properties[2]"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck11"
              >Combo Starter</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck12"
              autocomplete="off"
              v-model="properties[6]"
            />

            <label class="btn btn-outline-primary w-25" for="btncheck12"
              >Negate</label
            >
          </div>
          <br />
          <div
            class="btn-group rounded orange mb-1 w-100"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck13"
              autocomplete="off"
              v-model="properties[5]"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck13"
              >Once per Turn</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck14"
              autocomplete="off"
              v-model="properties[4]"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck14"
              >Searchable</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck15"
              autocomplete="off"
              v-model="properties[3]"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck15"
              >Combo Piece</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck16"
              autocomplete="off"
              v-model="properties[7]"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck16"
              >Interaption</label
            >
          </div>
          <br />
          <div
            class="btn-group rounded w-100 orange"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio4"
              autocomplete="off"
              @change="value = -1"
              :checked="value == -1"
            />
            <label class="btn btn-outline-primary w-25" for="btnradio4"
              >-1</label
            >
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio5"
              autocomplete="off"
              @change="value = 0"
              :checked="value == 0"
            />
            <label class="btn btn-outline-primary w-25" for="btnradio5"
              >0</label
            >
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio6"
              autocomplete="off"
              @change="value = 0.5"
              :checked="value == 0.5"
            />
            <label class="btn btn-outline-primary w-25" for="btnradio6"
              >Maybe +1</label
            >
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio7"
              autocomplete="off"
              @change="value = 1"
              :checked="value == 1"
            />
            <label class="btn btn-outline-primary w-25" for="btnradio7"
              >+1</label
            >
          </div>
          <br />
          <button type="submit" class="btn w-100 mt-1 orange">Confirm</button>
        </form>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <div id="cardDeleteModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closeCardDeleteModal()"
        >&times;</span
      >
      <div class="container">
        <div class="d-flex justify-content: center mb-1">
          <div class="w-100">Are you sure to delete {{ cardNameInput }}</div>
        </div>
        <div class="d-flex justify-content: center">
          <button
            type="button"
            class="btn btn-success w-50"
            @click="deleteCard(deleteCardId)"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn btn-danger w-50"
            @click="closeCardDeleteModal()"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  selectedDeckGlobal,
  decks,
  deck,
  uniqueAllCards,
} from "@/components/global";
import {
  Card,
  CardType,
  Deck,
  getDecks,
  getDeck,
  setDecks,
  setDeck,
} from "@/API";
export default defineComponent({
  watch: { selectedDeckGlobal: "updateDeck" },
  setup() {
    return { selectedDeckGlobal, decks, deck, uniqueAllCards };
  },
  mounted() {
    this.updateDeck();
  },
  data() {
    return {
      allCards: [] as Card[],
      deckRating: 0,
      deckValue: 0,
      value: 0,
      deckNumber: 0,
      type: "monster" as CardType,

      properties: [false, false, false, false, false, false, false, false],
      counts: [0, 0, 0, 0, 0, 0, 0, 0],
      uniqueCounts: [0, 0, 0, 0, 0, 0, 0, 0],

      editCardId: 0,
      deleteCardId: 0,

      cardNameInput: "",
      cardCountInput: "",
      editAdd: "",
    };
  },
  methods: {
    updateDeck() {
      if (getDeck()) {
        this.deck = getDeck();
        this.uniqueCardDeck();
        this.countCard();
      }
    },
    editAddCard() {
      switch (this.editAdd) {
        case "add":
          this.addCard();
          break;
        case "edit":
          this.editCard();
          break;
      }
    },
    openCardDeleteModal(name: string) {
      this.deleteCardId = this.deck.alternativeCards
.findIndex((c) => c.cardName == name);
      this.cardNameInput = this.deck.alternativeCards
[this.deleteCardId].cardName;
      var modal = document.getElementById("cardDeleteModal");
      if (modal) modal.style.display = "block";
    },
    closeCardDeleteModal() {
      this.inputReset();
      var modal = document.getElementById("cardDeleteModal");
      if (modal) modal.style.display = "none";
    },
    openCardAddModal() {
      this.editAdd = "add";
      var modal = document.getElementById("cardAddEditModal");
      if (modal) modal.style.display = "block";
    },
    openCardEditModal(name: string) {
      this.editAdd = "edit";
      this.editCardId = this.deck.alternativeCards
.findIndex((c) => c.cardName == name);
      this.cardNameInput = this.deck.alternativeCards
[this.editCardId].cardName;
      this.cardCountInput = JSON.stringify(
        this.deck.alternativeCards
[this.editCardId].cardCount
      );
      this.properties = this.deck.alternativeCards
[this.editCardId].cardProperties;
      this.value = this.deck.alternativeCards
[this.editCardId].cardValue;
      this.type = this.deck.alternativeCards
[this.editCardId].cardType;
      var modal = document.getElementById("cardAddEditModal");
      if (modal) modal.style.display = "block";
    },
    closeCardAddEditModal() {
      this.inputReset();
      var modal = document.getElementById("cardAddEditModal");
      if (modal) modal.style.display = "none";
    },
    addCard() {
      while (this.cardNameInput.endsWith(" "))
        this.cardNameInput = this.cardNameInput.slice(0, -1);
      if (this.deck.alternativeCards
) {
        if (
          this.deck.alternativeCards
.findIndex((c) => c.cardName == this.cardNameInput) ==
          -1
        ) {
          this.deck.alternativeCards
.push({
            cardName: this.cardNameInput,
            cardType: this.type,
            cardCount: parseInt(this.cardCountInput),
            cardProperties: this.properties,
            cardValue: this.value,
          });
        }
        this.uniqueCardDeck();
        this.inputReset();
        this.countCard();
        this.sortDeck();
        this.safeDeck();
        this.closeCardAddEditModal();
      }
    },
    editCard() {
      while (this.cardNameInput.endsWith(" "))
        this.cardNameInput = this.cardNameInput.slice(0, -1);
      this.deck.alternativeCards
[this.editCardId] = {
        cardName: this.cardNameInput,
        cardType: this.type,
        cardCount: parseInt(this.cardCountInput),
        cardProperties: this.properties,
        cardValue: this.value,
      };

      this.uniqueCardDeck();
      this.countCard();
      this.sortDeck();
      this.safeDeck();
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
      ];
      this.value = 0;
      this.editCardId = 0;
      this.deleteCardId = 0;
      this.type = "monster";
      this.cardNameInput = "";
      this.cardCountInput = "";
    },
    deleteCard(cardIndex: number) {
      this.deck.alternativeCards
.splice(cardIndex, 1);
      this.countCard();
      this.safeDeck();
      this.closeCardDeleteModal();
    },
    countCard() {
      if (this.deck.alternativeCards
) {
        this.deckNumber = 0;
        this.counts = [0, 0, 0, 0, 0, 0, 0, 0];
        this.uniqueCounts = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let card of this.deck.alternativeCards
) {
          this.deckNumber += card.cardCount;
          for (let c in this.counts) {
            if (card.cardProperties[c]) this.counts[c] += card.cardCount;
          }
        }
        for (let card of this.uniqueAllCards) {
          for (let c in this.uniqueCounts) {
            if (card.cardProperties[c]) this.uniqueCounts[c]++;
          }
        }
      }
    },
    uniqueCardDeck() {
      this.allCards = [];
      for (let card of this.deck.alternativeCards
) {
        let count = card.cardCount;
        for (count; count; count--) {
          this.allCards.push(card);
        }
      }
      this.uniqueAllCards = [
        ...new Set(this.deck.alternativeCards
.filter((c) => c.cardName)),
      ];
    },
    safeDeck() {
      this.decks[this.decks.findIndex((d) => d.name == this.deck.name)] =
        this.deck;
      setDeck(this.deck);
      setDecks(this.decks);
    },
    sortDeck() {
      this.deck.alternativeCards

        .sort(function (a, b) {
          if (a.cardName < b.cardName) {
            return -1;
          }
          if (a.cardName > b.cardName) {
            return 1;
          }
          return 0;
        })
        .sort(function (a, b) {
          return b.cardCount - a.cardCount;
        })
        .sort(function (a, b) {
          let map = {
            monster: 1,
            spell: 2,
            trap: 3,
          };
          return map[a.cardType] - map[b.cardType];
        });
    },
    loadDeck() {
      if (this.selectedDeckGlobal) {
        if (
          this.decks[
            this.decks.findIndex((d) => d.name == this.selectedDeckGlobal)
          ]
        ) {
          this.deck =
            this.decks[
              this.decks.findIndex((d) => d.name == this.selectedDeckGlobal)
            ];
        } else {
          this.decks.push({
            name: this.selectedDeckGlobal,
            cards: [],
            extraCards: [],
            combos: [],
            cardGroups: [],
            sideCards:[],
            alternativeCards:[],
          });
          this.deck =
            this.decks[
              this.decks.findIndex((d) => d.name == this.selectedDeckGlobal)
            ];
        }
        this.uniqueCardDeck();
        this.countCard();
        setDeck(this.deck);
      }
    },
  },
});
</script>
