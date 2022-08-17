import * as type from "./types";
import axios from "axios";
export function setDecks(decks: type.Deck[]) {
  localStorage.setItem("decks", JSON.stringify(decks));
}
export function getDecks(): type.Deck[] {
  return JSON.parse(localStorage.getItem("decks") || "false");
}
export function setDeck(deck: type.Deck) {
  localStorage.setItem("deck", JSON.stringify(deck));
}
export function getDeck(): type.Deck {
  const deck = JSON.parse(localStorage.getItem("deck"));
  if (deck) {
    for (const cardMaindeck of deck.cards
      .concat(deck.sideCards)
      .concat(deck.alternativeCards)) {
      if (cardMaindeck.src && cardMaindeck.id != cardMaindeck.src) {
        const newId = cardMaindeck.src;
        console.log(newId);
        for (const combo of deck.combos) {
          for (const card of combo.cards) {
            if (card == cardMaindeck.id)
              combo.cards[combo.cards.findIndex((e) => e == cardMaindeck.id)] =
                newId;
          }
        }
        for (const cardGroup of deck.cardGroups) {
          for (const card of cardGroup.cards) {
            if (card == cardMaindeck.id) {
              cardGroup.cards[
                cardGroup.cards.findIndex((e) => e == cardMaindeck.id)
              ] = newId;
            }
          }
        }
        cardMaindeck.id = newId;
      }
    }
    // for (const card of deck.extraCards.concat(deck.alternativeExtraCards)) {
    //   if (card.id != card.src) card.id = card.src;
    // }
  }
  return (deck || false) as type.Deck;
}
export function setOwnCards(ownCards: any) {
  localStorage.setItem("ownCards", JSON.stringify(ownCards));
}
export function getOwnCards(): any {
  return JSON.parse(localStorage.getItem("ownCards") || "false") as string[];
}
export function setDB(db: any) {
  localStorage.setItem("db", JSON.stringify(db));
}
export function getDB(): any {
  return JSON.parse(localStorage.getItem("db") || "false") as string[];
}
export function setGermanDB(germandb: any) {
  localStorage.setItem("germandb", JSON.stringify(germandb));
}
export function getGermanDB(): any {
  return JSON.parse(localStorage.getItem("germandb") || "false") as string[];
}
export function setBanList(banList: any) {
  localStorage.setItem("banList", JSON.stringify(banList));
}
export function getBanList(): any {
  return JSON.parse(localStorage.getItem("banList") || "false") as string[];
}

function createType(type: string) {
  if (type.includes("XYZ")) return "xyz";
  if (type.includes("Fusion")) return "fusion";
  if (type.includes("Synchro")) return "synchro";
  if (type.includes("Link")) return "link";
  if (type.includes("Monster")) return "monster";
  if (type.includes("Spell")) return "spell";
  if (type.includes("Trap")) return "trap";
}
export let db = getDB();
//7 days
if (
  db &&
  (db.timeStamp < Date.now() - 6.048e8 ||
    !db.data[0].type ||
    db.data.length < 12000 ||
    !db.data[0].id)
)
  db = false;
else db = db.data;
if (!db) {
  try {
    axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php").then((resp) => {
      db = resp.data.data.map((e) =>
        Object.fromEntries([
          ["name", e.name],
          ["type", createType(e.type)],
          ["id", e.card_images[0].id],
        ])
      );
      setDB({ timeStamp: Date.now(), data: db });
    });
  } catch {
    if (getDB()) db = getDB().data;
    else db = [];
  }
}
export let germandb = getGermanDB();
//7 days
if (
  germandb &&
  (germandb.timeStamp < Date.now() - 6.048e8 ||
    !germandb.data[0].type ||
    germandb.data.length < 11000 ||
    !germandb.data[0].id)
)
  germandb = false;
else germandb = germandb.data;
if (!germandb) {
  try {
    axios
      .get("https://db.ygoprodeck.com/api/v7/cardinfo.php?language=de")
      .then((resp) => {
        germandb = resp.data.data.map((e) =>
          Object.fromEntries([
            ["name", e.name],
            ["type", createType(e.type)],
            ["id", e.card_images[0].id],
          ])
        );
        setGermanDB({ timeStamp: Date.now(), data: germandb });
      });
  } catch {
    if (getGermanDB()) germandb = getGermanDB().data;
    else germandb = [];
  }
}
export const mainCardDB = [];
export const extraCardDB = [];
console.log(germandb);
if (db.length > 1 && germandb.length > 1) {
  for (const card of db.concat(germandb)) {
    switch (card.type) {
      case "link":
      case "xyz":
      case "fusion":
      case "synchro":
        extraCardDB.push(card);
        break;
      case "monster":
      case "spell":
      case "trap":
        mainCardDB.push(card);
        break;
    }
  }
}
function createMax(max: string) {
  if (max.includes("Semi-Limited")) return 2;
  if (max.includes("Limited")) return 1;
  if (max.includes("Banned")) return 0;
}
export let banList = getBanList();
//7 days
if (
  banList &&
  (banList.timeStamp < Date.now() - 6.048e8 ||
    !banList.data[0].type ||
    !banList.data[0].id)
)
  banList = false;
else banList = banList.data;
if (!banList) {
  try {
    axios
      .get("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg")
      .then((resp) => {
        banList = resp.data.data.map((e) =>
          Object.fromEntries([
            ["name", e.name],
            ["type", createType(e.type)],
            ["id", e.id],
            ["max", createMax(e.banlist_info.ban_tcg)],
          ])
        );
        setBanList({ timeStamp: Date.now(), data: banList });
      });
  } catch {
    if (getBanList()) banList = getBanList().data;
    else banList = [];
  }
}
