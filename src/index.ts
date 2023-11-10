import kaboom from "kaboom";
import { createCardSprite } from "./card";
import { smoothTo } from "./utils";

const WIDTH = 16*24
const HEIGHT = 16*13.5

kaboom({
  width: WIDTH,
  height: HEIGHT,
  scale: innerWidth/WIDTH
})

// assets
loadRoot("assets/")
loadSpriteAtlas("cardMask.png",{
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

const card = createCardSprite([
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
])

add(smoothTo(vec2(100,100))(card.sprite))
