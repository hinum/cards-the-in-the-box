import { Color, PosComp, GameObj, AreaComp } from "kaboom"
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
  
  onActive: ()=>void //TODO
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
    case "def": return rgb(0,255,255)
  }
}

type CardSprite = ReturnType<typeof createCardSprite>
export const createCardSprite = (results: CardResult[])=>{
  const hPerResult = 48/results.length

  let isFocusable = true
  const focus = (index: number)=>{
    resultSprites.slice(0,index+1).forEach(o=>o.inSprite.smoothBy(0, -index* hPerResult))
    resultSprites.slice(  index-1).forEach(o=>o.inSprite.smoothBy(0, (results.length-index-1)* hPerResult))
    resultSprites[index].inSprite.description.smoothShow()
  }
  const unfocus = ()=>{
    resultSprites.forEach(o=>{
      o.inSprite.smoothTo(-32,0)
      o.inSprite.description.smoothHide()
    })
  }

  const resultSprites = 
    results.map(
      (result,index)=>{
        const heading = make([
          ...temText(result.name, {}),
          pos(3,3), z(999)
        ])
        const backgroud = make([
          pos(randi(0,32),0),
          color(decideBackColor(result.type)),
          sprite("resultFront"),
          {update(this: GameObj<PosComp>) {
            this.moveBy(index % 2? -dt()*8: dt()*8, 0)
            if (this.pos.x < 0) this.moveTo(32,0)
            if (this.pos.x >32) this.moveTo(0,0)
          }}
        ])
        const description = make([
          pos(3,11),
          ...temText(result.description, {}),
          ...smoothOpacity(0),
        ])
        const inSprite = addChildren([
          heading, description, backgroud
        ])(make([
            ...smoothPos(-32,0),
            { description }
          ]))
        return addChild(inSprite)(make([
          pos(0,index* hPerResult),
          rect(32,hPerResult,{fill: false}),
          area({ collisionIgnore: ["*"] }),
          {
            add( this: GameObj<AreaComp> ) {
              this.onHover(()=>isFocusable && focus(index))
              this.onHoverEnd(()=>isFocusable && unfocus())
            }, inSprite
          }
        ]))
    })

  const resultMask = addChildren(resultSprites)(make([
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










