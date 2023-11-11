import { Color, PosComp, GameObj, AreaComp, Vec2 } from "kaboom"
import { Entity } from "./entity"
import { smoothOpacity, smoothPos } from "./smooth"
import { addChild, addChildren, goTo, gs, ncheck, smoothTo, temText, ucheck } from "./utils"
import { oneArea } from "./area"

type CardType =
  | "atk"
  | "def" //TODO
type CardResult = {
  name: string
  description: string
  type: CardType
  
  onActive: (game: any, caster: Entity, target: Entity)=>void //TODO
}

export type Card = {
  results: CardResult[]
  sprite: CardSprite
}

const decideBackColor = (type: CardType): Color=>{
  switch(type){
    case "atk": return rgb(255,0,0)
    case "def": return rgb(0,255,255)
  }
}

type CardSprite = ReturnType<typeof createCardSprite>
const createCardSprite = (results: CardResult[])=>{
  const hPerResult = 48/results.length

  let isFocusable = true
  const focus = (index: number, speed = 1)=>{
    resultSprites.slice(0,index+1).forEach(o=>o.inSprite.smoothBy(vec2(0, -index* hPerResult), speed))
    resultSprites.slice(  index-1).forEach(o=>o.inSprite.smoothBy(vec2(0, (results.length-index-1)* hPerResult), speed))
    resultSprites[index].inSprite.description.smoothShow(speed)
  }
  const unfocus = ()=>{
    resultSprites.forEach(o=>{
      o.inSprite.smoothTo(vec2(-32,0))
      o.inSprite.description.smoothHide()
    })
  }

  const resultSprites = 
    results.map(
      (result,index)=>{
        const heading = make([
          temText(result.name),
          pos(35,3), z(999),
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
          pos(35,11),z(999),
          temText(result.description, { size: 4 }),
          ...smoothOpacity(0),
        ])
        const inSprite = addChildren([
          heading, description, backgroud
        ])(make([
            ...smoothPos(-32,0),
            { description }
          ]))
        return addChild(inSprite)(make([
          pos(-1,index* hPerResult-2),
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
    rect(30,46),
    pos(1,1)
  ]))

  return {
    focus, unfocus,
    isFocusable: gs(()=>isFocusable, v=>isFocusable = v),
    sprite: addChildren([
      resultMask,
      make([sprite("cardMask"),z(999)])
    ])(make([
      ...smoothPos(0,0),
      oneArea(),area(),
      sprite("cardFront")
    ]))
  }
}

export const createCard = (results: CardResult[]): Card=>({
  results, sprite: createCardSprite(results)
})

const stillCardSpacing = 16
export const createCardRow = (vec: Vec2)=>({
  onPick: (_: Card)=>{},
  sprite: make(smoothPos(vec.x, vec.y)),

  addCard(card: Card){
    const traverse = (obj: GameObj)=>obj.children.length === 0? obj: obj.children[0]
    const { sprite: { sprite } } = card
    traverse(this.sprite).add(sprite)
    sprite.goTo(vec2(stillCardSpacing,0))
    sprite.hover = ()=>{}
    sprite.click = ()=>this.onPick(card)
  },
  removeCard({ sprite: {sprite} }: Card){
    const [cardChild] = sprite.children as CardSprite["sprite"][]
    goTo(sprite.pos.add(stillCardSpacing,0))(cardChild)
    smoothTo(sprite.pos)(cardChild)
    ncheck(sprite.parent).add(cardChild)
    destroy(sprite)
  },
})

















