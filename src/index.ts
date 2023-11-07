import kaboom from "kaboom";
import { smoothPos } from "./smooth";
import { addChild } from "./utils";

const WIDTH = 16*24
const HEIGHT = 16*13.5

// assets
loadRoot("asset")
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

kaboom({
  width: WIDTH,
  height: HEIGHT,
  scale: innerWidth/WIDTH
})

const test = 
  addChild
    (make([rect(100,100)]))
    (add(smoothPos(0,0,easings.easeInOutQuad)))

test.speed.s(5)
test.dPos.s(vec2(200,100))
console.log(test.dPos.g())
