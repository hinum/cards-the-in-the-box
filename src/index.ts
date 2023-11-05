import kaboom from "kaboom";
import { smoothPos } from "./hud";

const WIDTH = 16*24
const HEIGHT = 16*13.5

kaboom({
  width: WIDTH,
  height: HEIGHT,
  scale: innerWidth/WIDTH
})

const test = add([
  rect(100,100),
  ...smoothPos(0,0,easings.easeInOutQuad)
])

test.speed = vec2(5)
test.smoothTo(200,100)
