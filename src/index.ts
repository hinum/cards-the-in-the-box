import kaboom from "kaboom";
import { createCardRow, createCard } from "./card";

const WIDTH = 16*16
const HEIGHT = 16*9

kaboom({
  width: WIDTH,
  height: HEIGHT,
  scale: innerWidth/WIDTH
})

loadSprite("cardOutline", "assets/cardOutline.png")

const cards = Array(7).fill(0).map(()=>createCard([
  {
    name: "test",
    description: "testing",
    type: "atk",
    onActive: ()=>{}
  },{
    name: "test",
    description: "testing",
    type: "def",
    onActive: ()=>{}
  }
]))

const cardRow = add(createCardRow(vec2(128,144-48)))
cards.forEach(async (c,i)=>{
  await wait(i/2)
  cardRow.addChild(c, ()=>{
    add(cardRow.removeChild(c))
    c.smoothBy(vec2(0,-64))
    c.isHoverable = false
    c.unfocus()
    c.focus(randi(0,2))
    wait(1, ()=>destroy(c))
  })
})
