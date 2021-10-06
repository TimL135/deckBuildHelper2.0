<template>
   <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
    crossorigin="anonymous"
  />
  
  <div style="margin-top:30px">
    <form @submit.prevent="addCard">
      <div class="container">
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            v-model="cardNameInput"
            required
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            v-model="cardCountInput"
            required
            min="1"
            max="3"
          />
        </div>
      </div>
      <div
        class="btn-group"
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
        <label class="btn btn-outline-primary" for="btncheck1">Handtrap</label>

        <input
          type="checkbox"
          class="btn-check"
          id="btncheck2"
          autocomplete="off"
          v-model="brick"
        />
        <label class="btn btn-outline-primary" for="btncheck2">Brick</label>

        <input
          type="checkbox"
          class="btn-check"
          id="btncheck3"
          autocomplete="off"
          v-model="comboStarter"
        />
        
        <label class="btn btn-outline-primary" for="btncheck3"
          >Combo starter</label
        >
      </div>
      <br>
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="btnradio" id="btnradio0" autocomplete="off" >
  <label class="btn btn-outline-primary" for="btnradio0" >-1</label>
  <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off"  checked>
  <label class="btn btn-outline-primary" for="btnradio1">0</label>
  <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
  <label class="btn btn-outline-primary" for="btnradio2">Maybe +1</label>
   <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" >
  <label class="btn btn-outline-primary" for="btnradio3">+1</label>
</div>
<br>

      <button type="submit" class="btn btn-primary m-1">Confirm</button>
    </form>
    <div>Kartenanzahl({{ deckNumber }})</div>

    <div>Deckvalue: ({{deckValue}})</div>

    <div> Deckrating: ({{deckRating}})</div>
     
    <div v-if="handTrapCount > 0">Handtraps({{ handTrapCount }})</div>

    <div v-if="brickCount > 0">Bricks({{ brickCount }})</div>

    <div v-if="comboStarterCount > 0">
      Combo Starter({{ comboStarterCount }})
    </div>

    <input id="DeckSelect" list="DeckList"/>
    <datalist v-for="deck in decks" :key="JSON.stringify(deck)">
      <option value=""></option>
    </datalist>
    <table class="table  table-striped">
      <thead>
        <tr>
          <th scope="col">Cards</th>
          <th></th>
          <th scope="col">Probability</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="card in deck" :key="card.cardName">
          <td>
             <th>
                {{ card.cardName }}({{ card.cardCount }})
             </th>
          </td>
          <td>         
                <button @click="openCardEditModal(card.cardId)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    class="bi bi-gear-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
                    />
                  </svg>
                </button>            
          </td>
          <td class="m-2">    
              <th v-if="deckNumber>39">
                {{
                  (
                    (card.cardCount / deckNumber +
                      card.cardCount / (deckNumber - 1) +
                      card.cardCount / (deckNumber - 2) +
                      card.cardCount / (deckNumber - 3) +
                      card.cardCount / (deckNumber - 4)) *
                    100
                  ).toFixed(2)
                }}%({{
                  ((card.cardCount / (deckNumber - 5)) * 100).toFixed(2)
                }}%)
              </th>          
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
          <div class="container">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                :placeholder="cardNameInput"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                v-model="cardNameInput"
                required
              />
            </div>
            <div class="input-group flex-nowrap">
              <input
                type="number"
                class="form-control"
                :placeholder="cardCountInput"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                v-model="cardCountInput"
                required
                min="1"
                max="3"
              />
            </div>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic checkbox toggle button group"
            >
              <input
                type="checkbox"
                class="btn-check "
                id="btncheck1"
                autocomplete="off"
                v-model="handTrap"
              />
              <label class="btn btn-outline-primary" for="btncheck1"
                >Handtrap</label
              >
              <input
                type="checkbox"
                class="btn-check "
                id="btncheck2"
                autocomplete="off"
                v-model="brick"
              />
              <label class="btn btn-outline-primary" for="btncheck2"
                >Brick</label
              >
              <input
                type="checkbox"
                class="btn-check "
                id="btncheck3"
                autocomplete="off"
                v-model="comboStarter"
              />
              <label class="btn btn-outline-primary" for="btncheck3"
                >Combo starter</label
              >
              
            </div>
            <br>
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" :checked="value== -1">
  <label class="btn btn-outline-primary" for="btnradio4" >-1</label>
  <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" :checked="value== 0">
  <label class="btn btn-outline-primary" for="btnradio5">0</label>
  <input type="radio" class="btn-check" name="btnradio" id="btnradio6" autocomplete="off" :checked="value== 0.5">
  <label class="btn btn-outline-primary" for="btnradio6">Maybe +1</label>
   <input type="radio" class="btn-check" name="btnradio" id="btnradio7" autocomplete="off" :checked="value== 1">
  <label class="btn btn-outline-primary" for="btnradio7">+1</label>
</div>
<br>
            <button
              type="submit"
              class="btn btn-primary mt-1"
              style="float: right"
            >
              Bestätigen
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Card, Deck, getData, setData } from "@/API";

export default defineComponent({
  mounted() {
    if (getData().length > 0) {
      this.deck = getData();
      for (let card of this.deck) {
        let count = card.cardCount;
        for (count; count > 0; count--) {
          this.allCards.push(card);
        }
      }
      this.deckRatingValue();
    }

    this.countCard();
  },
  name: "App",
  data() {
    return {
      deckRating: 0,
      deckValue: 0,
      value: 0,
      handTrap: false,
      brick: false,
      comboStarter: false,
      deckNumber: 0,
      handTrapCount: 0,
      brickCount: 0,
      comboStarterCount: 0,
      editCardId: 0,
      cardNameInput: "",
      cardCountInput: "",
      deck: [] as Card[],
      allCards: [] as Card[],
      decks: [] as Deck[],
    };
  },
  methods: {
    addCard: function () {
      this.checkRadio(0);
      this.deck[this.deck.length] = {
        cardId: this.deck.length,
        cardName: this.cardNameInput,
        cardCount: parseInt(this.cardCountInput),
        cardHandTrap: this.handTrap,
        cardBrick: this.brick,
        cardComboStarter: this.comboStarter,
        cardValue: this.value,
      };
      this.handTrap = false;
      (this.brick = false),
        (this.comboStarter = false),
        (this.cardNameInput = "");
      this.cardCountInput = "";
      this.countCard();
      this.deckRatingValue();
      setData(this.deck);
    },
    openCardEditModal(index: number) {
      this.editCardId = index;
      this.cardNameInput = this.deck[index].cardName;
      this.cardCountInput = JSON.stringify(this.deck[index].cardCount);
      this.handTrap = this.deck[index].cardHandTrap;
      this.brick = this.deck[index].cardBrick;
      this.comboStarter = this.deck[index].cardComboStarter;
      this.value = this.deck[index].cardValue;
      var modal = document.getElementById("cardEditModal");
      modal!.style.display = "block";
    },
    closeCardEditModal() {
      this.cardNameInput = "";
      this.cardCountInput = "";
      this.handTrap = false;
      this.brick = false;
      this.comboStarter = false;
      var modal = document.getElementById("cardEditModal");
      modal!.style.display = "none";
    },

    editCard: function () {
      this.checkRadio(4);
      this.deck[this.editCardId] = {
        cardId: this.deck[this.editCardId].cardId,
        cardName: this.cardNameInput,
        cardCount: parseInt(this.cardCountInput),
        cardHandTrap: this.handTrap,
        cardBrick: this.brick,
        cardComboStarter: this.comboStarter,
        cardValue: this.value,
      };
      setData(this.deck);
      this.countCard();
      this.deckRatingValue();
      this.closeCardEditModal();
    },
    countCard: function () {
      this.deckNumber = 0;
      this.handTrapCount = 0;
      this.brickCount = 0;
      this.comboStarterCount = 0;
      for (let card of this.deck) {
        this.deckNumber += card.cardCount;
        if (card.cardHandTrap) {
          this.handTrapCount += card.cardCount;
        }
        if (card.cardBrick) {
          this.brickCount += card.cardCount;
        }
        if (card.cardComboStarter) {
          this.comboStarterCount += card.cardCount;
        }
      }
    },
    checkRadio: function (help: number) {
      let i = help;
      for (i; i < 4 + help; i++) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (document.getElementById(`btnradio${i}`).checked) {
          break;
        }
      }
      i -= help;

      switch (i) {
        case 0:
          this.value = -1;
          break;
        case 1:
          this.value = 0;
          break;
        case 2:
          this.value = 0.5;
          break;
        case 3:
          this.value = 1;
          break;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`btnradio${1}`).checked = true;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`btnradio${5}`).checked = true;
    },
    deckRatingValue() {
      let helpDeck = [] as Card[];

      helpDeck = this.deck.filter((c) => c.cardValue == -1);
      for (let card of this.deck) {
        if (card.cardValue > 0) {
          if (!helpDeck.find((c) => c.cardName == card!.cardName)) {
            helpDeck.push(card);
          }
        }
      }

      this.deckValue =
        helpDeck.map((c) => c.cardValue).reduce((a, b) => a + b) /
        this.allCards.length;
      this.deckRating = Math.round((this.deckValue + 1) * 5 * 10) / 10;
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
.btn-outline-primary:focus {
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
</style>
