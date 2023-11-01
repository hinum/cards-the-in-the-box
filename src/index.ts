import kaboom from "kaboom";
declare const innerWidth: number

const WIDTH = 16*16
const HEIGHT = 16*9

const k = kaboom({
  width: WIDTH,
  height: HEIGHT,
  scale: innerWidth/WIDTH
})

k.add([k.rect(16,16)])
