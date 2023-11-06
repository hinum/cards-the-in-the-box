import kaboom from "kaboom";
import { smoothPos } from "./hud";
import { addChild } from "./utils";

const WIDTH = 16*24
const HEIGHT = 16*13.5

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
