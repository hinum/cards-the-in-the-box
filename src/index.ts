import kaboom from "kaboom";
import { createCard, createCardRow } from "./card";
import { makeArray, goTo, moveTo, smoothTo, mapf } from "./utils";

const WIDTH = 16*16
const HEIGHT = 16*9

kaboom({
  width: WIDTH,
  height: HEIGHT,
  scale: innerWidth/WIDTH
})

// assets
loadRoot("assets/")
loadSpriteAtlas("card.png",{
  cardFront: {
    x: 0, y: 0,
    width: 32,
    height: 48,
  },
  cardMask: {
    x:32, y: 0,
    width: 32,
    height: 48,
  },
  resultFront: {
    x:64, y: 0,
    width: 64,
    height: 48,
  }
})

const card = makeArray(7,()=>createCard([
  {
    name: "test",
    description: "t3sting",
    type: "atk",
    onActive: ()=>{},
  },{
    name: "test",
    description: "t3sting",
    type: "def",
    onActive: ()=>{},
  }
]))

const cardRow = createCardRow(vec2(20,20))
add(cardRow.sprite)
card.forEach(o=>cardRow.addCard(o))
cardRow.onPick = cardRow.removeCard





