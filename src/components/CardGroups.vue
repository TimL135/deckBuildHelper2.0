<template>
  <div class="container" style="margin-top: 3vh">
    <div>
      <button
        type="button"
        class="w-100 btn btn-primary"
        @click="openCardGroupAddModal()"
      >
        Add new Cardgroup
      </button>
    </div>
    <br />
    <!-- new table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th class="w-25">Cardgroup</th>
          <th class="w-25"></th>
          <th class="w-75">Cards</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cardGroup in deck.cardGroups" :key="cardGroup.name" >
          <td>{{ cardGroup.name }}</td>
          <td>
            <button
              @click="
                openCardGroupEditModal(
                  deck.cardGroups.findIndex((c) => c == cardGroup)
                )
              "
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
              @click="
                openCardGroupDeleteModal(
                  deck.cardGroups.findIndex((c) => c == cardGroup)
                )
              "
              class="me-2"
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
          <td>
            <div v-for="card in cardGroup.cards" :key="card" class="mb-1" :class="deck.cards.find((c) => c.cardName == card)?.cardType">
              {{ card }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- new modal -->
  <div id="cardGroupAddModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closeCardGroupAddModal()"
        >&times;</span
      >

      <form @submit.prevent="editAddCard()">
        <div class="input-group mb-1">
          <span class="input-group-text w-25" id="basic-addon1">Name</span>
          <input
           
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            v-model="cardGroupNameInput"
            required
          />
        </div>
        <div v-for="cardInput in this.cardInputs.length" :key="cardInput">
          <select
            class="form-select"
            :class="cardInputTypes[cardInput -1]"
            v-model="cardInputs[cardInput - 1]"
            @change="checkCardInputs()"
          >
            <option class="placeholder" selected>{{ cardInput }}. Card</option>
            <option
              v-for="card in helpDeck"
              :key="card.cardName"
              :class="card.cardType"
            >
              {{ card.cardName }}
            </option>
          </select>
        </div>
        <button
          type="submit"
          class="btn btn-primary w-100 mt-1"
          style="float: right"
        >
          Confirm
        </button>
      </form>
    </div>
  </div>
  <!-- new modal -->
  <div id="cardGroupDeleteModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closeCardGroupDeleteModal()"
        >&times;</span
      >
      <div class="container">
        <div class="d-flex justify-content: center">
          <div class="w-100 mb-1">
            Are you sure to delete Cardgroup {{ deleteCardGroupName }}
          </div>
        </div>
        <div class="d-flex justify-content: center">
          <button
            type="button"
            class="btn btn-success w-50"
            @click="deleteCardGroup(deleteCardGroupIndex)"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn btn-danger w-50"
            @click="closeCardGroupDeleteModal()"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Card, Deck, getData, getDeck, setData, setDeck } from "@/API";
import { defineComponent } from "vue";
export default defineComponent({
  mounted() {
    if (getData()) {
      this.decks = getData();
    }
    if (getDeck()) {
      this.deck = getDeck();
      this.uniqueCardDeck();
    }
  },
  data() {
    return {
      deleteCardGroupIndex: 0,
      editCardGroupIndex: 0,
      deleteCardGroupName: "",
      cardGroupNameInput: "",
      editAdd: "",
      cardInputs: ["1. Card"] as string[],
      cardInputTypes:[] as string[],
      helpDeck: [] as Card[],
      deck: {} as Deck,
      decks: [] as Deck[],
    };
  },
  methods: {
    editAddCard() {
      if (this.editAdd == "add") {
        this.addCardGroup();
      }
      if (this.editAdd == "edit") {
        this.editCardGroup();
      }
    },
    openCardGroupAddModal() {
      this.editAdd = "add";
      var modal = document.getElementById("cardGroupAddModal");
      modal!.style.display = "block";
    },
    closeCardGroupAddModal() {
      
      if(this.deck.cardGroups.length>0){
      if (
        this.deck.cardGroups[this.editCardGroupIndex].cards[
          this.deck.cardGroups[this.editCardGroupIndex].cards.length - 1
        ].includes(". Card")
      ) {
        this.deck.cardGroups[this.editCardGroupIndex].cards.pop();
      }}
      this.inputReset();
      this.changeType()
      var modal = document.getElementById("cardGroupAddModal");
      modal!.style.display = "none";
    },
    addCardGroup() {
      let tmp = [...this.cardInputs];
      tmp.pop();
      if (tmp) {
        if (this.deck.cardGroups) {
          this.deck.cardGroups.push({
            name: this.cardGroupNameInput,
            cards: tmp,
          });
        } else {
          this.deck = {
            name: this.deck.name,
            cards: this.deck.cards,
            combos: this.deck.combos,
            cardGroups: [
              {
                name: this.cardGroupNameInput,
                cards: tmp,
              },
            ],
          };
        }
      }
      this.closeCardGroupAddModal();
      this.safeDeck();
    },
    openCardGroupEditModal(index: number) {
      console.log(index)
      this.editAdd = "edit";
      this.editCardGroupIndex = index;
      this.cardGroupNameInput = this.deck.cardGroups[index].name;
      this.cardInputs = this.deck.cardGroups[index].cards;
      this.cardInputs.push(`${this.cardInputs.length + 1}. Card`);
      this.changeType()
      var modal = document.getElementById("cardGroupAddModal");
      modal!.style.display = "block";   
    },
    editCardGroup() {
      let tmp = [...this.cardInputs];
      tmp.pop();
      this.deck.cardGroups[this.editCardGroupIndex].cards = tmp;
      this.closeCardGroupAddModal();
      this.inputReset();
      this.safeDeck();
    },
    openCardGroupDeleteModal(index: number) {
      this.deleteCardGroupName = this.deck.cardGroups[index].name;
      this.deleteCardGroupIndex = index;
      var modal = document.getElementById("cardGroupDeleteModal");
      modal!.style.display = "block";
    },
    closeCardGroupDeleteModal() {
      this.inputReset();
      var modal = document.getElementById("cardGroupDeleteModal");
      modal!.style.display = "none";
    },
    deleteCardGroup() {
      this.deck.cardGroups.splice(this.deleteCardGroupIndex, 1);
      this.safeDeck();
      this.closeCardGroupDeleteModal();
    },
    checkCardInputs() {
      if (this.cardInputs[this.cardInputs.length - 1].includes(". Card")) {
        this.cardInputs.pop();
      }
      for (let cardInput in this.cardInputs) {
        if (this.cardInputs[cardInput].includes(". Card")) {
          for (
            let i = parseInt(cardInput) + 1;
            i < this.cardInputs.length;
            i++
          ) {
            if (!this.cardInputs[i].includes(". Card")) {
              this.cardInputs[i - 1] = this.cardInputs[i];
            }
          }
          this.cardInputs.pop();
        }
      }
      this.cardInputs.push(`${this.cardInputs.length + 1}. Card`);
    this.changeType()
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
    safeDeck() {
      this.decks[this.decks.findIndex((d) => d.name == this.deck.name)] =
        this.deck;
      setDeck(this.deck);
      setData(this.decks);
    },
    inputReset() {
      this.cardGroupNameInput = "";
      this.cardInputs = ["1. Card"];
    },
     changeType() {
      this.cardInputTypes=[] 
      for (let i = 0; i < this.cardInputs.length-1 ; i++) {
        let tmp = this.deck.cards.find((c) => c.cardName == this.cardInputs[i]);
        if (tmp) {
          this.cardInputTypes[i] = tmp.cardType;
        } else {
          this.cardInputTypes[i] = "";
        }
      }
      this.cardInputTypes.push("")
    },
  },
});
</script>

<style>
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