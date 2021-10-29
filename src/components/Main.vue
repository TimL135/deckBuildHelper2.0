<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />

  <div class="container" style="margin-top: 3vh">
    <div class="input-group">
      <input
        autocomplete="off"
        type="text"
        class="form-control"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        placeholder="Deck"
        name="plan"
        list="plans"
        v-model="selectedDeck"
      />
      <datalist id="plans">
        <option
          v-for="deck in decks"
          :key="deck.name"
          :value="deck.name"
        ></option>
      </datalist>
      <button
        type="button"
        class="btn btn-primary w-25"
        id="button-addon2"
        @click="loadDeck()"
      >
        Confirm
      </button>
    </div>
    <br />
    <form @submit.prevent="addCard">
      <div class="input-group mb-1">
        <span class="input-group-text w-25" id="basic-addon1">Name</span>
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
        <span class="input-group-text w-25" id="basic-addon1">Quantity</span>
        <input
          type="text"
          class="form-control"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          v-model="cardCountInput"
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
          id="btnradio9"
          autocomplete="off"
          @change="type = 'monster'"
          :checked="type == 'monster'"
        />
        <label class="btn btn-outline-primary col-4" for="btnradio9"
          >Monster</label
        >
        <input
          type="radio"
          class="btn-check"
          name="type"
          id="btnradio10"
          autocomplete="off"
          @change="type = 'spell'"
          :checked="type == 'spell'"
        />
        <label class="btn btn-outline-primary col-4" for="btnradio10"
          >Spell</label
        >
        <input
          type="radio"
          class="btn-check"
          name="type"
          id="btnradio11"
          autocomplete="off"
          @change="type = 'trap'"
          :checked="type == 'trap'"
        />
        <label class="btn btn-outline-primary col-4" for="btnradio11"
          >Trap</label
        >
      </div>
      <div
        class="btn-group mb-1 w-100"
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <input
          type="checkbox"
          class="btn-check"
          id="btncheck1"
          autocomplete="off"
          v-model="handTrap"
        />
        <label class="btn btn-outline-primary w-25" for="btncheck1"
          >Handtrap</label
        >

        <input
          type="checkbox"
          class="btn-check"
          id="btncheck2"
          autocomplete="off"
          v-model="seacher"
        />
        <label class="btn btn-outline-primary w-25" for="btncheck2"
          >Searcher</label
        >

        <input
          type="checkbox"
          class="btn-check"
          id="btncheck3"
          autocomplete="off"
          v-model="comboStarter"
        />

        <label class="btn btn-outline-primary w-25" for="btncheck3"
          >Combo Starter</label
        >
        <input
          type="checkbox"
          class="btn-check"
          id="btncheck4"
          autocomplete="off"
          v-model="negate"
        />

        <label class="btn btn-outline-primary w-25" for="btncheck4"
          >Negate</label
        >
      </div>
      <br />
      <div
        class="btn-group mb-1 w-100"
        role="group"
        aria-label="Basic checkbox toggle button group"
      >
        <input
          type="checkbox"
          class="btn-check"
          id="btncheck5"
          autocomplete="off"
          v-model="oncePerTurn"
        />
        <label class="btn btn-outline-primary w-25" for="btncheck5"
          >Once per Turn</label
        >
        <input
          type="checkbox"
          class="btn-check"
          id="btncheck6"
          autocomplete="off"
          v-model="searchable"
        />
        <label class="btn btn-outline-primary w-25" for="btncheck6"
          >Searchable</label
        >
        <input
          type="checkbox"
          class="btn-check"
          id="btncheck7"
          autocomplete="off"
          v-model="comboPiece"
        />
        <label class="btn btn-outline-primary w-25" for="btncheck7"
          >Combo Piece</label
        >
        <input
          type="checkbox"
          class="btn-check"
          id="btncheck8"
          autocomplete="off"
          v-model="interaption"
        />
        <label class="btn btn-outline-primary w-25" for="btncheck8"
          >Interruption</label
        >
      </div>
      <br />
      <div
        class="btn-group w-100 mb-1"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio0"
          autocomplete="off"
          @change="value = -1"
          :checked="value == -1"
        />
        <label class="btn btn-outline-primary w-25" for="btnradio0">-1</label>
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          @change="value = 0"
          :checked="value == 0"
        />
        <label class="btn btn-outline-primary w-25" for="btnradio1">0</label>
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          autocomplete="off"
          @change="value = 0.5"
          :checked="value == 0.5"
        />
        <label class="btn btn-outline-primary w-25" for="btnradio2"
          >Maybe +1</label
        >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          autocomplete="off"
          @change="value = 1"
          :checked="value == 1"
        />
        <label class="btn btn-outline-primary w-25" for="btnradio3">+1</label>
      </div>
      <br />
      <button type="submit" class="w-100 btn btn-primary">Confirm</button>
    </form>
    <br />
    <div class="d-flex mb-1">
      <div class="col-4 border rounded border-primary">
        Card amount:<br />{{ deckNumber }}
      </div>
      <div class="col-4 border rounded border-primary">
        <div v-if="deckNumber > 39">Deckrating:<br />{{ deckRating }}%</div>
      </div>
      <div class="col-4 border rounded border-primary">
        <div v-if="deckNumber > 39">
          Deckvalue average:<br />{{ deckValue }}
        </div>
      </div>
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
        <tr v-for="card in deck.cards" :key="card.cardName">
          <th style="text-align: left" :class="card.cardType">
            {{ card.cardName }}({{ card.cardCount }})
          </th>
          <td :class="card.cardType">
            <button
              @click="openCardEditModal(card.cardId)"
              class="me-2"
              style="background-color: #ffffff00; border: none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
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
              @click="deletCard(card.cardId)"
              style="background-color: #ffffff00; border: none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
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
                (card.cardCount / deckNumber +
                  card.cardCount / (deckNumber - 1) +
                  card.cardCount / (deckNumber - 2) +
                  card.cardCount / (deckNumber - 3) +
                  card.cardCount / (deckNumber - 4)) *
                100
              ).toFixed(2)
            }}%({{ ((card.cardCount / (deckNumber - 5)) * 100).toFixed(2) }}%)
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- new modal -->
  <div id="cardEditModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closeCardEditModal"
        >&times;</span
      >
      <div class="container">
        <form @submit.prevent="editCard">
          <div class="input-group mb-1">
            <span class="input-group-text w-25" id="basic-addon1">Name</span>
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
            <span class="input-group-text w-25" id="basic-addon1"
              >Quantity</span
            >
            <input
              type="text"
              class="form-control"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              v-model="cardCountInput"
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
              id="btnradio9"
              autocomplete="off"
              @change="type = 'monster'"
              :checked="type == 'monster'"
            />
            <label class="btn btn-outline-primary col-4" for="btnradio9"
              >Monster</label
            >
            <input
              type="radio"
              class="btn-check"
              name="type"
              id="btnradio10"
              autocomplete="off"
              @change="type = 'spell'"
              :checked="type == 'spell'"
            />
            <label class="btn btn-outline-primary col-4" for="btnradio10"
              >Spell</label
            >
            <input
              type="radio"
              class="btn-check"
              name="type"
              id="btnradio11"
              autocomplete="off"
              @change="type = 'trap'"
              :checked="type == 'trap'"
            />
            <label class="btn btn-outline-primary col-4" for="btnradio11"
              >Trap</label
            >
          </div>
          <div
            class="btn-group mb-1 w-100"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck9"
              autocomplete="off"
              v-model="handTrap"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck9"
              >Handtrap</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck10"
              autocomplete="off"
              v-model="seacher"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck10"
              >Searcher</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck11"
              autocomplete="off"
              v-model="comboStarter"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck11"
              >Combo Starter</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck12"
              autocomplete="off"
              v-model="negate"
            />

            <label class="btn btn-outline-primary w-25" for="btncheck12"
              >Negate</label
            >
          </div>
          <br />
          <div
            class="btn-group mb-1 w-100"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck13"
              autocomplete="off"
              v-model="oncePerTurn"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck13"
              >Once per Turn</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck14"
              autocomplete="off"
              v-model="searchable"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck14"
              >Searchable</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck15"
              autocomplete="off"
              v-model="comboPiece"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck15"
              >Combo Piece</label
            >
            <input
              type="checkbox"
              class="btn-check"
              id="btncheck16"
              autocomplete="off"
              v-model="interaption"
            />
            <label class="btn btn-outline-primary w-25" for="btncheck16"
              >Interaption</label
            >
          </div>
          <br />
          <div
            class="btn-group w-100"
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
          <button
            type="submit"
            class="btn btn-primary w-25 mt-1"
            style="float: right"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  Card,
  cardType,
  Deck,
  getData,
  getDeck,
  setData,
  setDeck,
} from "@/API";

export default defineComponent({
  mounted() {
    if (getData()) {
      this.decks = getData();
    }
    if (getDeck()) {
      this.selectedDeck = getDeck().name;
      this.loadDeck();
      this.uniqueCardDeck();
      this.deckRatingValue();
      this.countCard();
    }
  },
  data() {
    return {
      helpDeck: [] as Card[],
      selectedDeck: "",
      deckRating: 0,
      deckValue: 0,
      value: 0,
      deckNumber: 0,
      type: "monster" as cardType,

      handTrap: false,
      seacher: false,
      comboStarter: false,
      comboPiece: false,
      searchable: false,
      oncePerTurn: false,
      negate: false,
      interaption: false,

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

      editCardId: 0,
      cardNameInput: "",
      cardCountInput: "",
      deck: {} as Deck,
      allCards: [] as Card[],
      decks: [] as Deck[],
    };
  },
  methods: {
    addCard: function () {
      this.deck.cards[this.deck.cards.length] = {
        cardId: this.deck.cards.length,
        cardName: this.cardNameInput,
        cardType: this.type,
        cardCount: parseInt(this.cardCountInput),
        cardHandTrap: this.handTrap,
        cardSeacher: this.seacher,
        cardComboStarter: this.comboStarter,
        cardComboPiece: this.comboPiece,
        cardSearchable: this.searchable,
        cardOncePerTurn: this.oncePerTurn,
        cardNegate: this.negate,
        cardInteraption: this.interaption,
        cardValue: this.value,
      };
      this.inputReset();
      this.countCard();
      this.deckRatingValue();
      this.sortDeck();
      this.safeDeck();
    },
    editCard: function () {
      this.deck.cards[this.editCardId] = {
        cardId: this.deck.cards[this.editCardId].cardId,
        cardName: this.cardNameInput,
        cardType: this.type,
        cardCount: parseInt(this.cardCountInput),
        cardHandTrap: this.handTrap,
        cardSeacher: this.seacher,
        cardComboStarter: this.comboStarter,
        cardComboPiece: this.comboPiece,
        cardSearchable: this.searchable,
        cardOncePerTurn: this.oncePerTurn,
        cardNegate: this.negate,
        cardInteraption: this.interaption,
        cardValue: this.value,
      };
      this.countCard();
      this.deckRatingValue();
      this.sortDeck();
      this.safeDeck();
      this.closeCardEditModal();
    },
    inputReset() {
      this.handTrap = false;
      this.seacher = false;
      this.comboStarter = false;
      this.comboPiece = false;
      this.searchable = false;
      this.oncePerTurn = false;
      this.negate = false;
      this.interaption = false;
      this.type = "monster";
      this.cardNameInput = "";
      this.cardCountInput = "";
    },
    deletCard(cardId: number) {
      this.deck.cards.splice(cardId, 1);
      for (cardId; cardId < this.deck.cards.length; cardId++) {
        this.deck.cards[cardId].cardId--;
      }
      this.countCard();
      this.deckRatingValue();
      this.safeDeck();
    },
    openCardEditModal(index: number) {
      this.editCardId = index;
      this.cardNameInput = this.deck.cards[index].cardName;
      this.cardCountInput = JSON.stringify(this.deck.cards[index].cardCount);
      this.handTrap = this.deck.cards[index].cardHandTrap;
      this.seacher = this.deck.cards[index].cardSeacher;
      this.comboStarter = this.deck.cards[index].cardComboStarter;
      this.comboPiece = this.deck.cards[index].cardComboPiece;
      this.searchable = this.deck.cards[index].cardSearchable;
      this.oncePerTurn = this.deck.cards[index].cardOncePerTurn;
      this.negate = this.deck.cards[index].cardNegate;
      this.interaption = this.deck.cards[index].cardInteraption;
      this.value = this.deck.cards[index].cardValue;
      var modal = document.getElementById("cardEditModal");
      modal!.style.display = "block";
    },
    closeCardEditModal() {
      this.inputReset();
      var modal = document.getElementById("cardEditModal");
      modal!.style.display = "none";
    },
    countCard: function () {
      if (this.deck.cards) {
        this.deckNumber = 0;

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

        for (let card of this.deck.cards) {
          this.deckNumber += card.cardCount;
          if (card.cardHandTrap) {
            this.handTrapCount += card.cardCount;
            this.uniqueHandTrapCount++;
          }
          if (card.cardSeacher) {
            this.seacherCount += card.cardCount;
            this.uniqueSeacherCount++;
          }
          if (card.cardComboStarter) {
            this.comboStarterCount += card.cardCount;
            this.uniqueComboStarterCount++;
          }
          if (card.cardComboPiece) {
            this.comboPieceCount += card.cardCount;
            this.uniqueComboPieceCount++;
          }
          if (card.cardSearchable) {
            this.searchableCount += card.cardCount;
            this.uniqueSearchableCount++;
          }
          if (card.cardOncePerTurn) {
            this.oncePerTurnCount += card.cardCount;
            this.uniqueOncePerTurnCount++;
          }
          if (card.cardNegate) {
            this.negateCount += card.cardCount;
            this.uniqueNegateCount++;
          }
          if (card.cardInteraption) {
            this.interaptionCount += card.cardCount;
            this.uniqueInteraptionCount++;
          }
        }
      }
    },
    uniqueCardDeck() {
      this.helpDeck = [];
      if (this.deck.cards) {
        for (let card of this.deck.cards) {
          if (!this.helpDeck.find((c) => c.cardName == card!.cardName)) {
            this.helpDeck.push(card);
          }
        }
      }
    },
    deckRatingValue() {
      if (this.helpDeck.length > 0) {
        this.deckValue =
          Math.round(
            (this.helpDeck.map((c) => c.cardValue).reduce((a, b) => a + b) /
              this.allCards.length) *
              10
          ) / 10;
      }
      this.deckRating =
        12.5 * (1 - Math.pow(Math.exp(1), -0.5 * this.deckValue));
      this.deckRating +=
        12.5 * (1 - Math.pow(Math.exp(1), -1 * this.handTrapCount));
      this.deckRating +=
        12.5 * (1 - Math.pow(Math.exp(1), -0.2 * this.seacherCount));
      this.deckRating +=
        12.5 * (1 - Math.pow(Math.exp(1), -1 * this.comboStarterCount));
      this.deckRating +=
        12.5 * (1 - Math.pow(Math.exp(1), -0.2 * this.comboPieceCount));
      this.deckRating +=
        12.5 * (1 - Math.pow(Math.exp(1), -0.2 * this.searchableCount));
      this.deckRating +=
        12.5 * (1 - Math.pow(Math.exp(1), -1 * this.negateCount));
      this.deckRating +=
        12.5 * (1 - Math.pow(Math.exp(1), -1 * this.interaptionCount));

      this.deckRating = Math.round(this.deckRating * 10) / 10;
    },
    safeDeck() {
      setDeck(this.deck);
      setData(this.decks);
    },
    loadDeck() {
      if (this.selectedDeck) {
        this.allCards = [];
        if (
          this.decks[this.decks.findIndex((d) => d.name == this.selectedDeck)]
        ) {
          this.deck =
            this.decks[
              this.decks.findIndex((d) => d.name == this.selectedDeck)
            ];
        } else {
          this.decks.push({
            name: this.selectedDeck,
            cards: [],
          });
          this.deck =
            this.decks[
              this.decks.findIndex((d) => d.name == this.selectedDeck)
            ];
        }
        for (let card of this.deck.cards) {
          let count = card.cardCount;
          for (count; count > 0; count--) {
            this.allCards.push(card);
          }
        }
        this.countCard();
        setDeck(this.deck);
      }
    },
    sortDeck() {
      this.deck.cards
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
      let counter = 0;
      for (let card of this.deck.cards) {
        card.cardId = counter;
        counter++;
      }
    },
  },
});
</script>
<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul {
  list-style: none;
}
.btn-check:focus + .btn-outline-primary,
.btn-outline-primary:focus + .btn-outline-primary {
  box-shadow: none !important;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 5px;
  border: 1px solid #888;
  width: 50%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.monster {
  background-color: #b5542c !important;
  border: none;
}
.spell {
  background-color: #289287 !important;
  border: none;
}
.trap {
  background-color: #a91475 !important;
  border: none;
}
</style>
