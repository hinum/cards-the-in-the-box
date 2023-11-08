import { Color } from "kaboom"
import { Entity } from "./entity"
import { smoothOpacity, smoothPos } from "./smooth"
import { addChild, addChildren, addNamedChildren, gs, temText } from "./utils"

type CardType =
  | "atk"
  | "def" //TODO
type CardResult = {
  name: string
  description: string
  type: CardType
  
  onActive: ()=>{} //TODO
}

export type Card = UnplayedCard | PlayedCard
export type UnplayedCard = {
  faces: CardResult[]
  sprite: CardSprite
}
export type PlayedCard = UnplayedCard & {
  result: CardResult
  
  target: Entity
  caster: Entity
}

const decideBackColor = (type: CardType): Color=>{
  switch(type){
    case "atk": return rgb(255,0,0)
    case "def": return rgb(0,0,255)
  }
}

type CardSprite = ReturnType<typeof createCardSprite>
export const createCardSprite = (results: CardResult[])=>{
  const hPerResult = 48/results.length

  let isFocusable = true
  const focus = (index: number)=>{
    resultCon.smoothTo(0, index * -hPerResult)
    resultSprites.slice(index).forEach(o=>o.result.smoothTo(0, 48))
  }
  const unfocus = ()=>{
    resultCon.smoothTo(0,0)
    resultSprites.forEach(o=>o.result.smoothTo(0,0))
  }

  const resultSprites = 
    results.map(
      (result,index)=>
        addNamedChildren({
          result: addNamedChildren({
            heading: make([ ...temText(result.name, {}), pos(0,-8) ]),
            backgroud: make([
              pos(randi(0,32)-3,-12),
              color(decideBackColor(result.type)),
              sprite("resultFront"),
              {update() {
                this.moveBy(index % 2? -1: dt(), 0)
                if (this.pos.x < 0) this.moveTo(32,0)
                if (this.pos.x >64) this.moveTo(64,0)
              }}
            ]),
            description: make([
              pos(3,11),
              ...temText(result.description, {}),
              ...smoothOpacity(0),
            ])
          })(make(smoothPos(0,0)))
        })(make([
          rect(32, hPerResult, { fill: false }),
          pos(index* hPerResult),
          area({ collisionIgnore: ["*"] }),
          {add() {
            this.onHover(()=>isFocusable && focus(index))
            this.onHoverEnd(()=>isFocusable && unfocus())
          }}
        ])))

  const resultCon = addChildren(resultSprites)(make(smoothPos(0,0)))
  const resultMask = addChild(resultCon)(make([
    mask("intersect"),
    sprite("cardMask"),
  ]))

  return {
    focus, unfocus,
    isFocusable: gs(()=>isFocusable, v=>isFocusable = v),
    sprite: addChild(resultMask)(make([
      ...smoothPos(0,0),
      sprite("cardFront")
    ]))
  }
}










